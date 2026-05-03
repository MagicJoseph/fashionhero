# Konfiguracja Claude Code dla projektu — README

Ten folder zawiera dwa kluczowe pliki konfiguracyjne dla Claude Code:

- `CLAUDE.md` — kontekst projektu (wklej do głównego folderu projektu)
- `settings.json` — uprawnienia + automatyczne hooki (wklej do `.claude/settings.json` w projekcie)

> **Kontekst:** ta konfiguracja została przygotowana dla **kursu AI Product Heroes** — projektant UX uczący się Claude Code w środowisku piaskownicy (case study: fikcyjny FashionHero). Pliki są celowo pełne wyjaśnień i komentarzy edukacyjnych. Gdy projektant nabierze wprawy, można je odchudzić — ale **dla początkującego więcej kontekstu = lepsze odpowiedzi Claude'a**.

---

## Jak zainstalować

```bash
# W folderze projektu
cd ~/Documents/projekty/fashionhero

# CLAUDE.md trafia do roota projektu
cp /pobrane/CLAUDE.md ./CLAUDE.md

# settings.json trafia do .claude/
mkdir -p .claude
cp /pobrane/settings.json .claude/settings.json

# Sprawdź wymagane narzędzia (potrzebne do hooków)
which jq          # JSON processor — instalacja: brew install jq
which prettier    # formatter (jeśli chcesz auto-format)
which eslint      # linter (jeśli chcesz auto-fix)

# Restart Claude Code żeby wczytał nowe settings
claude
```

> **Wymagane narzędzie:** `jq` — używane przez wszystkie hooki do parsowania JSON ze stdin. Bez niego hooki nie działają. Zainstaluj: `brew install jq` (macOS).

---

## Co robią hooki w tym `settings.json`

W tym configu są **5 hooków pogrupowanych w 4 lifecycle eventach**. Każdy ma konkretną wartość biznesową, żaden nie jest "na zapas".

### 🔒 PreToolUse — Hook 1: Blokada `git add .env*`

**Co robi:** zatrzymuje próbę dodania pliku `.env`, `.env.local`, `.env.production` do gita.

**Dlaczego ważny (kontekst szkoleniowy):** `.env.local` zawiera klucze do Twojej piaskownicy Supabase. W środowisku nauki nikt nie zaatakuje tego konta — ale **nawyk niewrzucania sekretów do gita to jeden z najważniejszych nawyków programisty**. Po wycieku do publicznego repo sekret jest tam na zawsze (nawet po usunięciu commita — historia gita zostaje). Lepiej nauczyć się tego na piaskownicy, niż popełnić ten błąd na pierwszym realnym projekcie.

**Przykład działania:**
```
> Claude, dodaj wszystkie pliki do gita

[Claude próbuje wykonać]: git add .env.local
[Hook blokuje]: "Blocked: attempting to add .env file to git. Secrets must never be committed."
```

**False positive guard:** hook rozróżnia `git add .env.local` (blokuje) od `git add config.env-template.txt` (przepuszcza), bo używa wzorca `\.env(\.local|\.production)?[[:space:]]` — pełna nazwa pliku ze spacją lub końcem stringa.

### 🔒 PreToolUse — Hook 2: Ochrona istniejących migracji Supabase

**Co robi:** blokuje edycję plików w `supabase/migrations/` które **już istnieją na dysku**. Pozwala tworzyć nowe.

**Dlaczego ważny (kontekst szkoleniowy):** zastosowane migracje są niezmienne — modyfikacja powoduje rozsynchronizowanie historii bazy z plikami. W solo-projekcie szkoleniowym to jeszcze do odzyskania, ale w realnym zespole to przyczyna katastrof: kolega po pull-u dostaje "migration not found" albo, gorzej, niespójną bazę. Hook wymusza nawyk **"poprawka = nowa migracja"**, który chroni Cię później.

**Przykład działania:**
```
> Claude, dodaj kolumnę "rating" do tabeli products

[Claude próbuje wykonać]: Edit supabase/migrations/20240101_init.sql
[Hook blokuje]: "Blocked: editing an existing migration file. Create a NEW migration instead."

[Claude wykonuje poprawnie]: Write supabase/migrations/20240502_add_rating.sql
[Hook przepuszcza]: nowy plik, ok
```

### ✨ PostToolUse — Hook 3: Auto-format Prettier po każdej edycji

**Co robi:** uruchamia `npx prettier --write` na każdym edytowanym/utworzonym pliku `.ts`, `.tsx`, `.js`, `.jsx`, `.json`, `.css`, `.md`.

**Dlaczego ważny:** Claude pisze kod szybko, ale nie zawsze idealnie sformatowany (cudzysłowy, semikolony, długość linii). Po hooku — każdy plik ma identyczne formatowanie zgodne z Twoim `.prettierrc` (lub default). Brak ręcznego "Format Document" w VS Code.

**Działa nawet bez Prettier:** `|| true` na końcu komendy = jeśli Prettier nie zainstalowany, hook nie wybucha.

### ✨ PostToolUse — Hook 4: Auto-fix ESLint po edycji TypeScript

**Co robi:** uruchamia `npx eslint --fix` na edytowanych plikach `.ts`, `.tsx`.

**Dlaczego ważny:** ESLint łapie typowe błędy (unused vars, missing imports, console.log, react-hooks rules). `--fix` automatycznie naprawia te które potrafi (większość). Reszta zostanie pokazana w VS Code.

**Uwaga:** wymaga skonfigurowanego `.eslintrc` w projekcie — Next.js domyślnie tworzy.

### 📍 SessionStart — Hook 5: Wstrzyknięcie kontekstu git

**Co robi:** przy każdym uruchomieniu sesji Claude Code, hook automatycznie informuje Claude'a o:
- Aktualnym branchu git
- Pierwszych 5 niecommitowanych zmianach (`git status --short`)

**Dlaczego ważny:** Claude od razu wie czy jesteś na `main` (uważaj!) czy `feature/xyz`. Wie, że masz uncommitowane zmiany — zaproponuje commit przed dużą operacją. Nie musisz tego pisać w każdej sesji.

**Przykład co Claude "widzi" na początku sesji:**
```
[SessionStart context]: Current git branch: feature/seller-profile.
Recent uncommitted changes:  M src/app/page.tsx |?? src/components/profile.tsx |
```

### 🔔 Notification — Hook 6: Desktop notification (macOS)

**Co robi:** gdy Claude potrzebuje Twojej uwagi (pyta o zgodę, ukończył dłuższe zadanie) — pojawia się natywne powiadomienie macOS z dźwiękiem.

**Dlaczego ważny:** uruchamiasz długie zadanie ("zbuduj cały panel sprzedawcy"), przełączasz się do Slacka, i 5 minut później Claude czeka na Twoją odpowiedź a Ty tego nie widzisz. Z hookiem — `bing!` na desktopie, wracasz w 2 sekundy.

**Async:** `"async": true` = hook nie blokuje pracy Claude'a, leci w tle.

**Tylko macOS:** używa `osascript`. Na Linuxie zamień na `notify-send`, na Windows usuń.

---

## Hooki, których ŚWIADOMIE NIE dodałem

Te hooki są popularne, ale dla początkującego UX-owca = **over-engineering**:

| Hook | Czemu nie |
|---|---|
| **`Stop` + `npm test`** wymuszający testy przed końcem | Wymaga skonfigurowanego test suite. UX-owiec na początku **nie pisze testów**. Włącz, gdy masz min. 10 testów w projekcie. |
| **`SessionStart` z `gh issue list`** pobierający aktywne issues | Fajne, ale wymaga setupu GitHub i issue trackingu. Najpierw nauczcie się używać issues, potem automatyzujcie. |
| **`PreToolUse` blokujący `DROP TABLE`** w SQL | Już mam `supabase db reset` w `deny` permissions — to wystarcza dla 99% przypadków. Hook bashowy parsujący SQL ma za dużo edge case'ów. |
| **`PostToolUse` z `git add` po każdej edycji** | Auto-stage = łatwo wpaść w "ups, zacommitowałem coś czego nie chciałem". Lepiej manualnie. |
| **HTTP hooks do zewnętrznego serwisu** | Enterprise/team feature — dla solo developera niepotrzebny. |

---

## Jak wyłączyć poszczególne hooki

Jeśli któryś hook Cię irytuje:

```jsonc
// Tymczasowo — usuń odpowiednią sekcję z "hooks"
// Globalnie — dodaj na poziomie roota:
{
  "disableAllHooks": true,
  ...
}
```

Lub uruchom Claude Code z flagą:
```bash
$ claude --no-hooks
```

---

## Jak zweryfikować że hooki działają

Po pierwszym uruchomieniu sesji:

```
> /hooks
```

Pokaże listę aktywnych hooków z liczbą uruchomień. Jeśli widzisz `PreToolUse: 2 hooks, 0 fired` — hooki są wczytane ale jeszcze się nie odpaliły.

W trybie verbose (`Ctrl + O` w sesji) zobaczysz output hooków na bieżąco.

---

## Adaptacja do Linux / Windows

| Hook | macOS | Linux | Windows (WSL) |
|---|---|---|---|
| Notification | `osascript` (działa) | Zamień na `notify-send "Claude" "msg"` | Zamień na `powershell.exe -c "..."` lub usuń |
| Pozostałe (jq, grep, sed) | Działa | Działa | Działa w WSL |

---

## Pluginy — automatyczna instalacja przez `settings.json`

W `settings.json` są dwa pola, które razem tworzą **automat instalacyjny pluginów** — kursant otwiera projekt i Claude Code sam proponuje wszystkie potrzebne pluginy do instalacji.

### `enabledPlugins` — które pluginy mają być aktywne

Ta sekcja deklaruje 5 pluginów, które tworzą fundament workflow projektanta UX z naszego kursu:

| Plugin | Po co | Marketplace |
|---|---|---|
| **figma** | Czytanie makiet z Figmy, generowanie kodu z designów | `claude-plugins-official` |
| **supabase** | Praca z bazą, migracje, typy TypeScript | `claude-plugins-official` |
| **vercel** | Deployment, environment variables, preview URL-e | `claude-plugins-official` |
| **github** | Tworzenie PR-ów, review, issues | `claude-plugins-official` |
| **frontend-design** | Generowanie komponentów React/Tailwind w spójnym stylu (Anthropic skill) | `claude-plugins-official` |

Format: `"plugin-name@marketplace-name": true`. Możesz tymczasowo wyłączyć plugin zmieniając `true` na `false` (zostaje zainstalowany, ale nieaktywny).

### Co się dzieje przy pierwszym otwarciu projektu

Gdy kursant po raz pierwszy uruchomi `claude` w folderze projektu z tym `settings.json`:

1. Claude Code wykryje plik i zapyta: *"Trust this folder?"* → `yes`
2. **Plugins prompt:** *"Install plugins: figma, supabase, vercel, github, frontend-design — install?"* → `yes`
3. Po akceptacji — wszystkie pluginy są zainstalowane **bez ręcznego `/plugin install`**

Wartość edukacyjna: **kursant nie musi pamiętać 5 komend `/plugin install`**. Otwiera projekt → akceptuje monity → ma kompletne środowisko. Cały setup-overhead wycięty z pierwszej lekcji.

### Jak modyfikować — typowe scenariusze

**Dodanie nowego pluginu z oficjalnego marketplace:**

```json
"enabledPlugins": {
  ...istniejące...,
  "playwright@claude-plugins-official": true,
  "commit-commands@claude-plugins-official": true
}
```

Po zmianie pliku — restart Claude Code (`/exit` + `claude`) → monit instalacji pojawi się sam.

**Tymczasowe wyłączenie pluginu (bez deinstalacji):**

```json
"figma@claude-plugins-official": false
```

Plugin zostaje na dysku, ale nie jest aktywny w sesji. Przydatne gdy debugujesz "czy ten plugin coś psuje?".

**Usunięcie pluginu na stałe:**

Wewnątrz Claude Code: `/plugin uninstall figma@claude-plugins-official` — plus usuwasz wpis z `enabledPlugins`.

**Dodanie własnego marketplace'u (opcjonalnie, advanced):**

Domyślnie Claude Code zna tylko **oficjalny marketplace Anthropic** (`claude-plugins-official`). Jeśli chcesz korzystać z dodatkowego marketplace'u (firmowy, społecznościowy), dodaj pole `extraKnownMarketplaces`:

```json
"extraKnownMarketplaces": {
  "moja-firma-pluginy": {
    "source": {
      "source": "github",
      "repo": "moja-firma/claude-plugins"
    }
  }
}
```

Składnia: klucz to dowolna nazwa lokalna, `source.repo` to `owner/repo` na GitHub. Po dodaniu, Claude Code przy następnym uruchomieniu zapyta o zaufanie tego marketplace'u przed pierwszą instalacją.

> **W tym kursie nie używamy własnego marketplace'u** — wszystkie 5 polecanych pluginów jest w oficjalnym `claude-plugins-official`. Ta sekcja jest tu wyłącznie jako referencja.

### ⚠️ Bezpieczeństwo pluginów — co kursant musi rozumieć

**Pluginy wykonują kod na komputerze kursanta z jego uprawnieniami.** Jest to feature, nie bug — pluginy są pełnoprawnym rozszerzeniem Claude Code, nie tylko prompt'em. Konsekwencje:

- ✅ Marketplace `claude-plugins-official` jest **kuratorowany przez Anthropic** — bezpieczny
- ⚠️ Każdy dodatkowy marketplace dodany przez `extraKnownMarketplaces` — kursant ufa **wszystkim aktualnym i przyszłym** pluginom z tego marketplace'u
- ❌ **Nie dodawajcie losowych marketplace'ów z internetu** — to dosłownie odpowiednik `curl https://random.url | sh`

Reguła kciuka dla kursanta: *"Czy zaufał(a)bym tej osobie/organizacji żeby wykonała kod na moim komputerze? Jeśli nie — nie dodawaj jej marketplace'u."*

### Weryfikacja że pluginy działają

W aktywnej sesji Claude Code:

```
> /plugin
```

Zobaczysz interaktywny manager z 4 zakładkami: Discover / **Installed** / Marketplaces / Errors. W "Installed" powinieneś zobaczyć całą piątkę z `enabledPlugins`.

Jeśli pluginów brak — sprawdź zakładkę "Errors", najczęstsze przyczyny: brak internetu przy pierwszym uruchomieniu, projekt nie został trust'owany (`/trust`), literówka w `enabledPlugins`.

---

## Co modyfikować w `permissions`

`permissions.allow` są **konserwatywne**. Możesz rozluźnić jeśli widzisz że Claude pyta o coś co robisz codziennie:

```json
"allow": [
  ...
  "Bash(docker:*)",        // jeśli używasz Docker
  "Bash(pnpm:*)",          // jeśli używasz pnpm zamiast npm
  "Bash(turbo:*)"          // jeśli masz monorepo z Turborepo
]
```

`permissions.deny` **NIE rusz** chyba że dokładnie wiesz co robisz. To Twoja siatka bezpieczeństwa.

---

## Wersja

- **CLAUDE.md:** 1.0 (April 2026)
- **settings.json:** 1.0 (April 2026)
- **Wymagana wersja Claude Code:** v2.1.x lub nowsza (hooki z `permissionDecision` od v2.0.45)
