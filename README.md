# FashionHero — projekt kursowy AI Product Heroes

> 🎓 **Template repozytorium dla kursantów AI Product Heroes**
>
> To środowisko nauki Claude Code dla projektantów UX. **FashionHero to spreparowana strona kursowa** dostępna pod `fashionhero.aiproductheroes.pl` — nie ma za nią realnego biznesu ani użytkowników. Każdy błąd jest tu lekcją, nie incydentem.

---

## Czym jest to repo

To jest **template repository** GitHub — **samobieżne** środowisko startowe do nauki Claude Code w stacku **Next.js + shadcn/ui + Supabase + Vercel**. Klikasz **"Use this template"** na górze strony GitHub, klonujesz, `npm install`, `npm run dev` — i już działa.

Co dostajesz:

- ✅ **Skonfigurowany Claude Code** — `CLAUDE.md` z kontekstem mentora, `.claude/settings.json` z permissions, 6 hookami i 7 pluginami, plus shadcn/ui skill w `.claude/skills/`
- ✅ **Gotowy szkielet Next.js 16** — TypeScript strict, Tailwind CSS v4, shadcn/ui zainicjalizowane (`components.json`, style New York, base Slate)
- ✅ **Strukturę dla spec-driven development** — folder `specs/` z 3 templates (feature, change, experiment)
- ✅ **Komplet dokumentacji kursowej** — 2 obszerne instrukcje (~62 strony) w `docs/`
- ✅ **`.gitignore` i `.env.example`** — gotowe do pracy z Supabase

> **Filozofia paczki:** dokumenty w `docs/` to **niezależna referencja wiedzy** opisująca proces tworzenia środowiska od zera. Ta paczka **nie zależy** od dokumentów — wszystko już jest skonfigurowane. Czytaj `docs/` gdy chcesz zrozumieć **dlaczego** coś jest tak ustawione.

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

# Sklonuj swoje świeże repo
# (zamień TwojLoginGitHub na swój username z GitHub, a nazwę repo na tę którą wybrałeś w Kroku 1)
gh repo clone TwojLoginGitHub/fashionhero-moj-prototyp
cd fashionhero-moj-prototyp
```

Lub, jeśli wolisz `git clone`:

```bash
git clone https://github.com/TwojLoginGitHub/fashionhero-moj-prototyp.git
cd fashionhero-moj-prototyp
```

> **Skąd wziąć swój login GitHub?** Otwórz https://github.com — w prawym górnym rogu kliknij awatar; pierwsza linijka w menu to Twój login. Lub w terminalu: `gh api user --jq .login`.

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
2. *"Install plugins: figma, supabase, vercel, github, frontend-design, context7, chrome-devtools?"* → **yes**

Po kilku sekundach masz kompletnie skonfigurowane środowisko z 7 pluginami, hookami i shadcn/ui skill aktywnymi.

### Krok 6: Zainstaluj zależności i uruchom projekt

Paczka zawiera **gotowy szkielet Next.js 16 + Tailwind v4 + shadcn**. Wystarczy:

```bash
# Zainstaluj zależności
npm install

# Uruchom dev server
npm run dev
```

Otwórz `http://localhost:3000` w przeglądarce — zobaczysz domyślną stronę gotową do edycji.

> **Co już jest skonfigurowane:**
> - ✅ Next.js 16 (App Router, Turbopack default, React 19)
> - ✅ TypeScript w trybie strict
> - ✅ Tailwind CSS v4 + shadcn/ui (style: New York, base: Slate, CSS variables OKLCH)
> - ✅ ESLint 9 z natywnym flat config (`eslint.config.mjs`) — `npm run lint` używa `eslint .` (w Next.js 16 `next lint` został usunięty)
> - ✅ Pusty folder `src/components/ui/` — dodawaj komponenty przez `npx shadcn@latest add [nazwa]`
> - ✅ shadcn skill w `.claude/skills/` — Claude wie jak korzystać z shadcn/ui w tym projekcie

> **Uwaga o wersjach:** dokumenty w `docs/` zostały napisane dla Next.js 15. Paczka używa już **Next.js 16.2.4** — koncepcyjnie to ta sama architektura (App Router, Server Components, RSC), więc lekcje z docs nadal są aktualne. Drobne różnice (np. `next lint` → `eslint .`, `--turbopack` jest defaultem) są obsłużone przez samą paczkę.

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
git commit -m "First prototype changes"
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
│   ├── settings.json            ← permissions + hooki + plugins
│   └── skills/
│       └── shadcn-ui/
│           └── SKILL.md         ← shadcn/ui skill (auto-loaded gdy istnieje components.json)
│
├── src/                         ← kod aplikacji
│   ├── app/                     ← Next.js App Router
│   │   ├── layout.tsx           ← root layout (font Geist, html/body)
│   │   ├── page.tsx             ← strona startowa (do edycji)
│   │   └── globals.css          ← Tailwind v4 + shadcn CSS variables (OKLCH)
│   ├── components/
│   │   └── ui/                  ← shadcn components (pusty — dodawaj przez `npx shadcn add`)
│   └── lib/
│       └── utils.ts             ← `cn()` helper dla shadcn
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
│   └── 02-claude-code-dla-projektantow-ux.md    ← (markdown wersja)
│
├── public/                      ← statyczne pliki (obrazy, fonty, favicon)
│
├── .env.example                 ← szablon zmiennych Supabase (skopiuj jako .env.local)
├── .gitignore                   ← Next.js + Supabase + Claude Code worktrees
├── components.json              ← konfiguracja shadcn/ui (style: New York, base: Slate)
├── eslint.config.mjs            ← ESLint 9 (flat config) z next/typescript
├── next.config.ts               ← konfiguracja Next.js
├── next-env.d.ts                ← typy Next.js (auto-generowany)
├── package.json                 ← Next.js 16 + React 19 + Tailwind v4 + shadcn deps
├── postcss.config.mjs           ← PostCSS plugin dla Tailwind v4
├── tsconfig.json                ← TypeScript w trybie strict + alias @/*
└── README.md                    ← ten plik
```

---

## Mapa materiałów

> **Dwa formaty, ta sama treść.** Pliki `.md` i `.docx` w `docs/` są zsynchronizowane — wybierz format który Ci wygodniej czytać. `.docx` otwierasz w Wordzie/Pages (formatowanie, kolorowe nagłówki, callout boxy), `.md` w VS Code lub bezpośrednio na GitHubie. Edytuj `.md` — to source of truth, łatwiej go aktualizować.

### 1. Setup środowiska — `docs/01-setup-terminala-dla-ux.md`

Instalacja niezbędnych narzędzi: Node.js, Git, GitHub CLI, Vercel CLI, Supabase CLI, Claude Code, jq. **Zacznij tu, jeśli nie masz jeszcze zainstalowanego środowiska developerskiego.**

### 2. Główny przewodnik — `docs/02-claude-code-dla-projektantow-ux.md`

15 części, ~44 strony. Dokument do czytania **punktowo** — nie linearnie. Sięgaj po konkretną Część gdy potrzebujesz danej informacji:

| Grupa | Części | O czym |
|---|---|---|
| **Podstawy** | 1-4 | Jak działa Claude Code, struktura katalogów, permissions, pluginy |
| **Workflow** | 5-8 | Skille, scraping istniejących stron, Figma → kod, prompt engineering |
| **Integracje** | 9-11 | Supabase (baza + RLS), Vercel (deployment), GitHub (PR-y, code review) |
| **Best practices** | 12-13 | Czego nie robić + najczęstsze problemy i rozwiązania |
| **Zaawansowane** | 14-15 | Spec-driven development + wybór środowiska (CLI / Desktop / IDE) |

**Spis treści** znajdziesz na początku dokumentu, **Podsumowanie z sugerowaną ścieżką nauki** na końcu.

### 3. Konfiguracja paczki — sekcja "Konfiguracja w szczegółach" w tym README

Dokumentacja **konkretnej zawartości** `.claude/settings.json` w tej paczce — co robi każdy z 6 hooków, lista 7 polecanych pluginów + shadcn/ui skill, jak modyfikować permissions. Czytaj wtedy, gdy chcesz coś zmienić w configu lub gdy coś nie działa jak oczekujesz.

---

## Najczęstsze pytania na start

### "Czemu paczka zawiera już szkielet Next.js? Myślałem że zrobię to sam."

To świadoma decyzja: paczka jest **samobieżna**. Po `npm install` masz działający projekt — bez `npx create-next-app`, bez ręcznej konfiguracji shadcn. Twoja praca zaczyna się od **pierwszego sensownego promptu**, nie od setup'u środowiska.

Folder `src/components/ui/` jest **celowo pusty** — komponenty shadcn dodajesz w miarę potrzeb przez `npx shadcn@latest add [nazwa]`. Dzięki temu nie masz w projekcie 60 niepotrzebnych komponentów.

### "Po co `CLAUDE.md` skoro już mam wszystko w głowie?"

`CLAUDE.md` to nie notatka dla Ciebie — to **system prompt dla Claude Code**, czytany automatycznie przy każdej sesji. Bez niego Claude zgaduje stack, konwencje, intencje. Z nim — mówi Twoim językiem od pierwszej minuty.

### "Czy hooki w `settings.json` na pewno mi nie zepsują projektu?"

Hooki są **konserwatywne i auto-tolerujące błędy**. Każdy hook kończy się `|| true` — jeśli np. nie masz Prettiera, hook nie wybucha, po prostu nic nie robi. Pełna lista co który hook robi znajdziesz w sekcji **"Konfiguracja w szczegółach"** poniżej.

### "Skąd wezmę realne dane Supabase?"

Z **Twojego własnego konta Supabase** (darmowy plan wystarcza). Stwórz nowy projekt na supabase.com → skopiuj klucze do `.env.local` (`cp .env.example .env.local`). Część 9 instrukcji prowadzi krok po kroku.

### "Czy mogę usunąć fragment kursowy z `CLAUDE.md` po skończeniu kursu?"

Tak — co więcej, **powinieneś.** `CLAUDE.md` ma ewoluować razem z Tobą. Na początku potrzebujesz wyjaśnień ("Teaching note: Server Components vs Client Components..."), później chcesz tylko zwięzłych konwencji. To dobre ćwiczenie samo w sobie — zauważyć "Claude już to wie, mogę usunąć".

### "Co jeśli zrobię coś naprawdę złego?"

To środowisko nauki — masz git i `permissions.deny` w `settings.json` blokujące najgorsze operacje (`rm -rf`, `git reset --hard`, `supabase db reset`). Najgorsze co Ci grozi: `git reflog` + `git reset` na poprzedni stan. **Eksperymentuj śmiało.**

### "Mogę usunąć folder `docs/` ze swojego repo?"

Możesz, ale nie polecam — `docs/` to Twoja oficjalna kursowa dokumentacja, której będziesz wracał. Jeśli przeszkadza Ci w widoku — dodaj do `.gitignore` lokalnie tylko **nie commituj zmiany w `.gitignore`** (zostaw `docs/` w repo dla innych, ukryj tylko u siebie przez `.git/info/exclude`).

---

## Konfiguracja w szczegółach

Ta sekcja tłumaczy **dokładnie co znajduje się w `.claude/settings.json`** Twojej paczki — hooki, pluginy, permissions. Czytaj wtedy gdy chcesz coś zmodyfikować lub gdy coś nie działa jak oczekujesz.

> **Wymagane narzędzie dla hooków:** `jq` — JSON processor.
> Instalacja: `brew install jq` (macOS) lub `sudo apt install jq` (Linux/WSL).
> Bez niego hooki nie wybuchają, ale po prostu nic nie robią (`|| true` na końcu).

### Hooki — 6 automatyzacji w `settings.json`

#### 🔒 PreToolUse — Blokada `git add .env*`

Zatrzymuje próbę dodania pliku `.env`, `.env.local`, `.env.production` do gita.

**Dlaczego ważny:** `.env.local` zawiera klucze do Twojej piaskownicy Supabase. Nawyk niewrzucania sekretów do gita to jeden z najważniejszych nawyków programisty. Po wycieku do publicznego repo sekret jest tam na zawsze (nawet po usunięciu commita — historia gita zostaje).

**False positive guard:** hook rozróżnia `git add .env.local` (blokuje) od `git add config.env-template.txt` (przepuszcza), bo używa wzorca `\.env(\.local|\.production)?[[:space:]]` — pełna nazwa pliku ze spacją lub końcem stringa.

#### 🔒 PreToolUse — Ochrona istniejących migracji Supabase

Blokuje edycję plików w `supabase/migrations/` które **już istnieją na dysku**. Pozwala tworzyć nowe.

**Dlaczego ważny:** zastosowane migracje są niezmienne — modyfikacja powoduje rozsynchronizowanie historii bazy z plikami. Hook wymusza nawyk **"poprawka = nowa migracja"**.

#### ✨ PostToolUse — Auto-format Prettier po edycji

Uruchamia `npx prettier --write` na każdym edytowanym pliku `.ts`, `.tsx`, `.js`, `.jsx`, `.json`, `.css`, `.md`. Brak ręcznego "Format Document" w VS Code.

#### ✨ PostToolUse — Auto-fix ESLint po edycji TypeScript

Uruchamia `npx eslint --fix` na edytowanych plikach `.ts`, `.tsx`. ESLint łapie typowe błędy (unused vars, missing imports, react-hooks rules), `--fix` automatycznie naprawia te które potrafi.

#### 📍 SessionStart — Wstrzyknięcie kontekstu git

Przy każdym uruchomieniu sesji Claude Code automatycznie informuje Claude'a o aktualnym branchu git i pierwszych 5 niecommitowanych zmianach. Claude od razu wie czy jesteś na `main` (uważaj!) czy `feature/xyz`.

#### 🔔 Notification — Desktop notification (macOS)

Gdy Claude potrzebuje Twojej uwagi (pyta o zgodę, ukończył dłuższe zadanie) — pojawia się natywne powiadomienie macOS z dźwiękiem.

**Tylko macOS:** używa `osascript`. Na Linuxie zamień na `notify-send`, na Windows usuń.

### Hooki świadomie pominięte

Te są popularne, ale dla początkującego = over-engineering:

- **`Stop` + `npm test`** — wymaga skonfigurowanego test suite (UX-owiec na początku nie pisze testów)
- **`SessionStart` + `gh issue list`** — wymaga setupu GitHub i issue trackingu
- **`PreToolUse` blokujący `DROP TABLE`** — `supabase db reset` jest już w `permissions.deny`
- **`PostToolUse` z `git add` po każdej edycji** — auto-stage = ryzyko commitu czegoś niezamierzonego

### Jak wyłączyć hooki

Jeśli któryś hook Cię irytuje, usuń odpowiednią sekcję z `hooks` w `settings.json`. Lub uruchom Claude Code z flagą `--no-hooks`.

### Pluginy — `enabledPlugins`

Sekcja `enabledPlugins` w `settings.json` deklaruje 7 pluginów aktywowanych automatycznie:

| Plugin | Po co |
|---|---|
| **figma** | Czytanie makiet z Figmy, generowanie kodu z designów |
| **supabase** | Praca z bazą, migracje, typy TypeScript |
| **vercel** | Deployment, environment variables, preview URL-e |
| **github** | Tworzenie PR-ów, review, issues |
| **frontend-design** | Generowanie komponentów React/Tailwind w spójnym stylu (skill Anthropic) |
| **context7** | Aktualne dokumentacje bibliotek (Next.js 16, React 19, Tailwind v4, Supabase) — eliminuje hallucynacje API |
| **chrome-devtools** | Automatyzacja przeglądarki, screenshots, performance traces, console errors |

Format: `"plugin-name@marketplace-name": true`. Możesz tymczasowo wyłączyć plugin zmieniając `true` na `false` (zostaje zainstalowany, ale nieaktywny).

> **Plus:** w `.claude/skills/shadcn-ui/` znajduje się **shadcn/ui skill** — uruchamia się automatycznie gdy Claude widzi `components.json` w projekcie. Daje Claude'owi project-aware wiedzę o tym jak dodawać komponenty (`Field`/`FieldGroup` dla formularzy, `ToggleGroup`, semantic colors, Tailwind v4 patterns).

#### Co się dzieje przy pierwszym uruchomieniu

1. *"Trust this folder?"* → **yes** (ufamy konfiguracji w `.claude/`)
2. *"Install plugins: figma, supabase, vercel, github, frontend-design, context7, chrome-devtools?"* → **yes**
3. Po akceptacji — wszystkie pluginy zainstalowane bez ręcznego `/plugin install`

#### Modyfikacje pluginów

**Dodanie nowego pluginu z oficjalnego marketplace:**

```json
"enabledPlugins": {
  ...istniejące...,
  "code-review@claude-plugins-official": true
}
```

Po zmianie — restart Claude Code (`/exit` + `claude`) → monit instalacji pojawi się sam.

**Usunięcie pluginu na stałe:** w sesji Claude Code → `/plugin uninstall figma@claude-plugins-official` + usuń wpis z `enabledPlugins`.

#### ⚠️ Bezpieczeństwo pluginów

**Pluginy wykonują kod na komputerze z Twoimi uprawnieniami.** Konsekwencje:

- ✅ Marketplace `claude-plugins-official` jest **kuratorowany przez Anthropic** — bezpieczny
- ❌ **Nie dodawajcie losowych marketplace'ów z internetu** — to dosłownie odpowiednik `curl https://random.url | sh`

Reguła kciuka: *"Czy zaufał(a)bym tej osobie/organizacji żeby wykonała kod na moim komputerze? Jeśli nie — nie dodawaj jej marketplace'u."*

### Permissions — co Claude może / nie może

Sekcja `permissions` w `settings.json` zawiera trzy listy:

- **`allow`** — czego Claude może używać **bez pytania** (Read, Edit, npm, git, supabase, vercel, gh)
- **`deny`** — czego Claude **nigdy nie zrobi** (rm -rf, git push --force, supabase db reset, sudo, curl|sh)
- **`ask`** — co **wymaga Twojej zgody** (rm, npm audit fix, supabase db push --force)

Lista `deny` to Twoja siatka bezpieczeństwa — **nie ruszaj** chyba że dokładnie wiesz co robisz.

Możesz **rozszerzać `allow`** jeśli widzisz że Claude pyta o coś co robisz codziennie:

```json
"allow": [
  ...
  "Bash(docker:*)",        // jeśli używasz Docker
  "Bash(pnpm:*)",          // jeśli używasz pnpm zamiast npm
]
```

### Weryfikacja że konfiguracja działa

Po pierwszym uruchomieniu sesji:

```
> /plugin
```

Pokaże 4 zakładki: Discover / **Installed** / Marketplaces / Errors. W "Installed" powinieneś zobaczyć całą piątkę z `enabledPlugins`.

```
> /hooks
```

Pokaże listę aktywnych hooków z liczbą uruchomień. Jeśli widzisz `PreToolUse: 2 hooks, 0 fired` — hooki są wczytane ale jeszcze się nie odpaliły.

### Adaptacja do Linux / Windows

| Element | macOS | Linux | Windows (WSL) |
|---|---|---|---|
| Notification hook | `osascript` (działa) | Zamień na `notify-send "Claude" "msg"` | Usuń lub zamień na PowerShell |
| jq, grep, sed | Działa | Działa | Działa w WSL |

---

## Pomoc i kontakt

W razie problemów — najpierw uruchom Claude Code w projekcie i opisz problem. Claude ma kontekst całego projektu (przez `CLAUDE.md`) i konfiguracji (przez `settings.json`), więc 90% problemów rozwiązuje sam.

Jeśli Claude nie pomaga — zajrzyj do **Mapy materiałów** powyżej i znajdź odpowiednią Część przewodnika.

---

## Licencja

Materiały szkoleniowe AI Product Heroes. Kod własny kursanta — według uznania kursanta (zalecamy MIT na publiczne projekty).

---

**Wersja template'u:** 1.0 (April 2026, AI Product Heroes)
**Wymagana wersja Claude Code:** v2.1.x lub nowsza
