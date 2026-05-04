-- =========================================================
-- Migracja: utworzenie tabeli ads (Promoted Listings — v1)
-- =========================================================
-- Cel: pierwszy realny obiekt bazy w projekcie. Mocki katalogu
-- (sellers, products) zostają w src/lib/data.ts; tabela ads
-- przechowuje płatne promocje produktów (flat fee, tylko v1).
--
-- ŚWIADOME UPROSZCZENIA v1 (do rozszerzenia w kolejnych spec'ach):
--  - seller_id i product_slug są typu TEXT, zgodne z formatem
--    mocków ("s1".."s12", slug produktu). Brak FOREIGN KEY-ów,
--    bo tabel sellers/products jeszcze nie ma.
--  - 'expired' to wartość statusu, ale baza go *automatycznie
--    nie nadaje*. Wygasanie wyliczamy w query (now() > end_date).
--    Brak triggera/cron-a — to świadoma rezygnacja z prostoty.
--  - RLS ownership (seller_id = auth.uid()) wraca w v2 razem
--    z logowaniem Magic Link. W v1 każdy zalogowany może CRUD.
--  - Brak rate-limitingu na impressions/clicks. W produkcji
--    wymagałoby tabeli ad_views z UNIQUE (ad_id, viewer, day).
-- =========================================================


-- ---------------------------------------------------------
-- 1) Tabela ads
-- ---------------------------------------------------------
create table public.ads (
  id            uuid          primary key default gen_random_uuid(),
  seller_id     text          not null,
  product_slug  text          not null,
  start_date    timestamptz   not null default now(),
  end_date      timestamptz   not null,
  status        text          not null default 'active'
                  check (status in ('active', 'expired')),
  impressions   integer       not null default 0 check (impressions >= 0),
  clicks        integer       not null default 0 check (clicks >= 0),
  created_at    timestamptz   not null default now(),
  updated_at    timestamptz   not null default now(),

  constraint ads_dates_chk check (end_date > start_date)
);

comment on table public.ads is
  'Promoted Listings v1: płatne promocje produktów. seller_id/product_slug to TEXT zgodne z mockami w src/lib/data.ts (brak FK).';
comment on column public.ads.status is
  'Tylko active|expired w v1. Wygasanie wyliczamy w query (now() > end_date), nie przez trigger.';
comment on column public.ads.impressions is
  'Brak rate-limitingu w v1 — każde wywołanie RPC zwiększa licznik bez deduplikacji.';


-- ---------------------------------------------------------
-- 2) Indeksy
-- ---------------------------------------------------------
-- Kompozytowy: szybki lookup "wszystkie active ads dla danego produktu"
-- przy renderowaniu listingu/wyników wyszukiwania.
create index ads_product_slug_status_idx
  on public.ads (product_slug, status);

-- Wsparcie dla seller dashboardu (wszystkie reklamy danego sprzedawcy).
create index ads_seller_id_idx
  on public.ads (seller_id);


-- ---------------------------------------------------------
-- 3) Trigger: aktualizacja updated_at przy każdym UPDATE
-- ---------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger ads_set_updated_at
  before update on public.ads
  for each row
  execute function public.set_updated_at();


-- ---------------------------------------------------------
-- 4) Row Level Security
-- ---------------------------------------------------------
alter table public.ads enable row level security;

-- 4a) PUBLIC READ (anon + authenticated):
--     każdy może czytać reklamy aktualnie aktywne (status='active'
--     I now() w oknie dat). To zasila publiczne sortowanie wyników
--     wyszukiwania bez konieczności logowania.
create policy "ads_select_public_active"
  on public.ads
  for select
  to anon, authenticated
  using (
    status = 'active'
    and now() between start_date and end_date
  );

-- 4b) AUTHENTICATED READ (wszystko):
--     zalogowany użytkownik widzi również reklamy expired,
--     przyszłe i poza oknem dat — potrzebne dla seller dashboardu.
--     v2: zawęzić do seller_id = mapping(auth.uid()).
create policy "ads_select_authenticated_all"
  on public.ads
  for select
  to authenticated
  using (true);

-- 4c) INSERT: każdy zalogowany może dodawać.
--     v2: with check seller_id = mapping(auth.uid()).
create policy "ads_insert_authenticated"
  on public.ads
  for insert
  to authenticated
  with check (true);

-- 4d) UPDATE: każdy zalogowany może edytować.
--     v2: using + with check seller_id = mapping(auth.uid()).
create policy "ads_update_authenticated"
  on public.ads
  for update
  to authenticated
  using (true)
  with check (true);

-- 4e) DELETE: każdy zalogowany może usuwać.
--     v2: using seller_id = mapping(auth.uid()).
create policy "ads_delete_authenticated"
  on public.ads
  for delete
  to authenticated
  using (true);


-- ---------------------------------------------------------
-- 5) RPC: tracking impressions / clicks
-- ---------------------------------------------------------
-- security definer = funkcja wykonuje się jako jej WŁAŚCICIEL
-- (postgres), więc omija RLS. Dzięki temu anon użytkownik może
-- inkrementować liczniki bez UPDATE policy dla anon.
-- set search_path = '' = obrona przed search-path injection
-- (modern Supabase best practice — wymaga pełnego kwalifikowania).

create or replace function public.increment_ad_impression(ad_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.ads
  set impressions = impressions + 1
  where id = ad_id;
end;
$$;

create or replace function public.increment_ad_click(ad_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.ads
  set clicks = clicks + 1
  where id = ad_id;
end;
$$;

-- Domyślne uprawnienia dla PUBLIC (≈ "ktokolwiek") odbieramy,
-- a EXECUTE dajemy świadomie tylko anon + authenticated.
revoke all on function public.increment_ad_impression(uuid) from public;
revoke all on function public.increment_ad_click(uuid) from public;
grant execute on function public.increment_ad_impression(uuid) to anon, authenticated;
grant execute on function public.increment_ad_click(uuid) to anon, authenticated;


-- ---------------------------------------------------------
-- 6) Seed: 5 aktywnych reklam dla istniejących mocków
-- ---------------------------------------------------------
-- Produkty wybrane z src/lib/data.ts (różni sprzedawcy, różne
-- kategorie/płcie). Zakresy dat zróżnicowane, by w dashboardzie
-- widać było różny "wiek" reklamy. Liczniki impressions/clicks
-- niezerowe, by od razu były dane do wyświetlenia.
insert into public.ads
  (seller_id, product_slug,        start_date,                  end_date,                    status,   impressions, clicks)
values
  ('s1',     'cloud-runner',        now() - interval '20 days', now() + interval '10 days', 'active', 1240,        87),
  ('s2',     'cloud-runner-womens', now() - interval '7 days',  now() + interval '14 days', 'active',  430,        21),
  ('s3',     'dash-sport-womens',   now() - interval '3 days',  now() + interval '11 days', 'active',  198,         9),
  ('s5',     'lab-runner-001',      now() - interval '12 days', now() + interval '18 days', 'active',  876,        64),
  ('s7',     'stride-loafer',       now() - interval '5 days',  now() + interval '5 days',  'active',  312,        18);
