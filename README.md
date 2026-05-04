# FashionHero — projekt kursowy AI Product Heroes

> 🎓 **Template repozytorium dla kursantów AI Product Heroes**
>
> To środowisko nauki Claude Code dla projektantów UX. **FashionHero to spreparowana strona kursowa** dostępna pod `fashionhero.aiproductheroes.pl` — nie ma za nią realnego biznesu ani użytkowników. Każdy błąd jest tu lekcją, nie incydentem.

---

## Czym jest to repo

To jest **template repository** GitHub — gotowe środowisko startowe do nauki Claude Code w stacku **Next.js + shadcn/ui + Supabase + Vercel**. Klikasz **"Use this template"** na górze strony GitHub i masz własne repozytorium z kompletną konfiguracją:

- ✅ **Skonfigurowany Claude Code** — `CLAUDE.md` z kontekstem mentora, `.claude/settings.json` z permissions, hookami i pluginami
- ✅ **Strukturę dla spec-driven development** — folder `specs/` z 3 templates
- ✅ **Komplet dokumentacji kursowej** — 2 obszerne instrukcje + przewodnik konfiguracji w `docs/`
- ✅ **`.gitignore` i `.env.example`** — gotowe do pracy z Supabase
- ✅ **Brak rzeczywistego kodu Next.js** — to świadome: kod tworzysz Ty z Claude Code

---

## Quick start (10 minut)

### Krok 1: Stwórz swoje repo z tego template'u

Na górze tej strony GitHub kliknij zielony przycisk **"Use this template"** → **"Create a new repository"**.

W formularzu wybierz:

- **Owner:** Twoje konto GitHub
- **Repository name:** np. `fashionhero-moj-prototyp` (możesz dowolną)
- **Visibility:** **Private** (rekomendowane na czas nauki) lub Public
- **Include all branches:** zostaw odznaczone (wystarczy `main`)

Kliknij **"Create repository"**. Po 2 sekundach masz własne repo z całą zawartością tego template'u.

> **Czemu nie "Fork":** fork tworzy powiązanie ze źródłowym repo (commity są widoczne między nimi, PR-y też). "Use this template" tworzy **świeże, niezależne repo** — Twoje od pierwszej minuty. Dla kursu chcemy tego drugiego.

### Krok 2: Sklonuj na lokalny komputer

W terminalu:

```bash
# Wejdź do folderu, w którym trzymasz projekty
cd ~/Documents/projekty

# Sklonuj swoje świeże repo (zamień nazwę na własną)
gh repo clone TwojLogin/fashionhero-moj-prototyp
cd fashionhero-moj-prototyp
```

Lub, jeśli wolisz `git clone`:

```bash
git clone https://github.com/TwojLogin/fashionhero-moj-prototyp.git
cd fashionhero-moj-prototyp
```

### Krok 3: Sprawdź wymagane narzędzia

Czy masz wszystko zainstalowane z poprzedniej instrukcji?

```bash
which node      # Node.js (>=20)
which npm       # npm
which git       # git
which gh        # GitHub CLI
which supabase  # Supabase CLI
which vercel    # Vercel CLI
which claude    # Claude Code
which jq        # JSON processor (potrzebny dla hooków)
```

Jeśli czegoś brakuje — wróć do **`docs/01-setup-terminala-dla-ux.docx`** i dokończ setup.

### Krok 4: Skopiuj zmienne środowiskowe

```bash
cp .env.example .env.local
```

Otwórz `.env.local` w edytorze i uzupełnij prawdziwymi wartościami z panelu Supabase (Project Settings → API).

> **Krytyczne:** `.env.local` jest w `.gitignore` i **NIGDY** nie powinien trafić do repozytorium. Sprawdź:
> ```bash
> git status   # .env.local NIE powinien się pojawić jako "untracked"
> ```

### Krok 5: Pierwsze uruchomienie Claude Code

```bash
claude
```

Przy pierwszym uruchomieniu Claude Code zapyta:

1. *"Trust this folder?"* → **yes** (ufamy konfiguracji w `.claude/`)
2. *"Install plugins: figma, supabase, vercel, github, frontend-design?"* → **yes**

Po kilku sekundach masz kompletnie skonfigurowane środowisko z 5 pluginami i wszystkimi hookami aktywnymi.

### Krok 6: Stwórz właściwy projekt Next.js

W aktywnej sesji Claude Code:

```
> Stwórz w tym folderze projekt Next.js 15 (App Router) + TypeScript +
  Tailwind + shadcn/ui zgodnie z konwencjami w @CLAUDE.md.
  Po skończeniu uruchom dev server i pokaż link.
```

Claude wykona setup, doda 4 podstawowe komponenty shadcn (button, card, input, label), uruchomi serwer.

### Krok 7: Wybierz swoją ścieżkę startu

Masz teraz działające środowisko — czas na pierwsze realne zadanie. Trzy najczęstsze ścieżki:

**A) Implementacja rekomendacji z Claude.ai**

Jeśli wcześniej rozmawiałeś z Claude.ai o FashionHero i masz konkretną rekomendację zmiany do wdrożenia:

```
> Mam rekomendację zmiany dla FashionHero, którą chcę zaimplementować.
  Zacznijmy od stworzenia spec'u w @specs/ — zadaj mi pytania pogłębiające,
  potem ułożymy plan implementacji.
```

**B) Scraping istniejącej strony FashionHero**

Jeśli chcesz pracować na klonie strony `fashionhero.aiproductheroes.pl`:

```
> Przeskrapuj stronę https://fashionhero.aiproductheroes.pl/ i przygotuj
  raport: struktura informacyjna, powtarzalne komponenty UI,
  schemat kolorystyczny, typografia. NIE pisz jeszcze kodu — najpierw raport.
```

(Zobacz Część 6 głównego przewodnika — `docs/02-claude-code-dla-projektantow-ux.md` — żeby zrozumieć pełen workflow scrapingu.)

**C) Budowa od zera**

Jeśli chcesz zbudować coś nowego z domeną FashionHero (sprzedawcy, kupujący, produkty) jako inspiracją:

```
> Chcę zbudować [nazwa funkcjonalności]. Pomóż mi napisać spec w @specs/
  — zadaj pytania pogłębiające, potem ułóż plan implementacji.
```

**Niezależnie od wybranej ścieżki** — Claude zada pytania, zaproponuje plan, zaimplementuje krok po kroku. **Zacznij małymi iteracjami.**

### Krok 8: Pierwszy commit i push

Po pierwszym działającym fragmencie kodu:

```bash
git add .
git commit -m "Initial Next.js scaffolding"
git push
```

Otwórz GitHub w przeglądarce — zobaczysz swoje pierwsze zmiany.

---

## Struktura projektu

```
fashionhero-moj-prototyp/
│
├── CLAUDE.md                    ← ⭐ "system prompt" dla Claude Code
│                                  (kontekst projektu + konwencje + mentor mode)
│
├── .claude/
│   └── settings.json            ← permissions + hooki + plugins
│
├── specs/                       ← spec-driven development (Część 14 instrukcji)
│   ├── README.md                ← jak używać tego folderu
│   └── _templates/              ← 3 szablony spec'ów
│       ├── feature.md           ← nowa funkcjonalność
│       ├── change.md            ← zmiana istniejącej
│       └── experiment.md        ← czasowy eksperyment
│
├── docs/                        ← materiały kursowe
│   ├── 01-setup-terminala-dla-ux.docx     ← przewodnik instalacji środowiska
│   ├── 01-setup-terminala-dla-ux.md       ← (markdown wersja)
│   ├── 02-claude-code-dla-projektantow-ux.docx  ← główny przewodnik (15 części)
│   ├── 02-claude-code-dla-projektantow-ux.md    ← (markdown wersja)
│   └── 03-konfiguracja-claude-code.md     ← dokumentacja .claude/settings.json
│
├── .env.example                 ← szablon zmiennych Supabase (skopiuj jako .env.local)
├── .gitignore                   ← Next.js + Supabase + Claude Code worktrees
└── README.md                    ← ten plik
```

---

## Mapa drogowa nauki

Pełna ścieżka rozpisana w `docs/02-claude-code-dla-projektantow-ux.md` (Podsumowanie). Tu wersja jednoekranowa:

### Tydzień 1-2: Fundamenty CLI
- Zainstaluj 5 pluginów (auto przez `enabledPlugins`)
- Skonfiguruj swój pierwszy `CLAUDE.md` (już masz szablon)
- Pierwsze 5 promptów → 5 commitów → 5 lekcji
- **Środowisko: Claude Code CLI**

### Tydzień 3-4: Pierwsze realne komponenty
- Stwórz pierwszy własny skill (`prompt-builder` — Część 5 instrukcji)
- Zaimplementuj swoją pierwszą rekomendację (z Claude.ai) lub fragment scrapowanej strony
- Pierwszy spec-driven feature (Część 14)
- **Środowisko: przerzuć się na Claude Code Desktop** (Część 15)

### Tydzień 5-8: Workflow end-to-end
- Pierwszy projekt zdeployowany na Vercel z domeną
- Kompletna baza Supabase z RLS (Część 9)
- Pierwsze code review zrobione przez Claude'a (Część 11)
- 3-5 własnych skilli + szablonów promptów

### Po 90 dniach
- `CLAUDE.md` projektu rozrasta się do 100+ linii
- Plan mode i auto-accept używasz świadomie
- Możesz prowadzić cały projekt: discovery → projekt → kod → deploy → iteracja

---

## Najczęstsze pytania na start

### "Czemu na początku nie ma kodu Next.js?"

To świadome — **proces tworzenia jest lekcją**. Gdyby paczka miała preinstalowany Next.js, ominąłbyś pierwszą wartość Claude Code: zlecasz mu setup, obserwujesz co robi, dyskutujesz wybory. To dokładnie ten workflow, którego się uczysz.

### "Po co `CLAUDE.md` skoro już mam wszystko w głowie?"

`CLAUDE.md` to nie notatka dla Ciebie — to **system prompt dla Claude Code**, czytany automatycznie przy każdej sesji. Bez niego Claude zgaduje stack, konwencje, intencje. Z nim — mówi Twoim językiem od pierwszej minuty.

### "Czy hooki w `settings.json` na pewno mi nie zepsują projektu?"

Hooki są **konserwatywne i auto-tolerujące błędy**. Każdy hook kończy się `|| true` — jeśli np. nie masz Prettiera, hook nie wybucha, po prostu nic nie robi. Pełna lista co który hook robi: `docs/03-konfiguracja-claude-code.md`.

### "Skąd wezmę realne dane Supabase?"

Z **Twojego własnego konta Supabase** (darmowy plan wystarcza). Stwórz nowy projekt na supabase.com → skopiuj klucze do `.env.local` (`cp .env.example .env.local`). Część 9 instrukcji prowadzi krok po kroku.

### "Czy mogę usunąć fragment kursowy z `CLAUDE.md` po skończeniu kursu?"

Tak — co więcej, **powinieneś.** `CLAUDE.md` ma ewoluować razem z Tobą. Na początku potrzebujesz wyjaśnień ("Teaching note: Server Components vs Client Components..."), później chcesz tylko zwięzłych konwencji. To dobre ćwiczenie samo w sobie — zauważyć "Claude już to wie, mogę usunąć".

### "Co jeśli zrobię coś naprawdę złego?"

To środowisko nauki — masz git i `permissions.deny` w `settings.json` blokujące najgorsze operacje (`rm -rf`, `git reset --hard`, `supabase db reset`). Najgorsze co Ci grozi: `git reflog` + `git reset` na poprzedni stan. **Eksperymentuj śmiało.**

### "Mogę usunąć folder `docs/` ze swojego repo?"

Możesz, ale nie polecam — `docs/` to Twoja oficjalna kursowa dokumentacja, której będziesz wracał. Jeśli przeszkadza Ci w widoku — dodaj do `.gitignore` lokalnie tylko **nie commituj zmiany w `.gitignore`** (zostaw `docs/` w repo dla innych, ukryj tylko u siebie przez `.git/info/exclude`).

---

## Pomoc i kontakt

- **Pełny przewodnik kursowy:** `docs/02-claude-code-dla-projektantow-ux.docx` (15 części, ~44 strony)
- **Konfiguracja krok po kroku:** `docs/03-konfiguracja-claude-code.md`
- **Spec-driven workflow:** Część 14 głównego przewodnika
- **Trzy środowiska Claude Code:** Część 15 głównego przewodnika

W razie problemów — kursant powinien najpierw uruchomić Claude Code w projekcie i opisać problem. Claude ma kontekst całego projektu (przez `CLAUDE.md`) i konfiguracji (przez `settings.json`), więc 90% problemów rozwiązuje sam.

---

## Licencja

Materiały szkoleniowe AI Product Heroes. Kod własny kursanta — według uznania kursanta (zalecamy MIT na publiczne projekty).

---

**Wersja template'u:** 1.0 (April 2026, AI Product Heroes)
**Wymagana wersja Claude Code:** v2.1.x lub nowsza
