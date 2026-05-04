# Claude Code dla projektantów UX

**Praktyczny przewodnik: od pierwszego promptu do deployu produkcyjnej aplikacji**

---

## O tej instrukcji

Ta instrukcja zakłada, że masz już zainstalowane środowisko z poprzedniej części:
- Działający terminal (najlepiej Ghostty)
- Homebrew, Node.js, npm
- Claude Code CLI z aktywnym płatnym kontem (Pro / Max)
- GitHub CLI, Vercel CLI, Supabase CLI
- VS Code (lub inny edytor)

Jeśli czegoś nie masz — wróć do **"Środowisko pracy z terminalem dla projektantów UX"** i dokończ setup.

**Kim jest "AI-driven Product Builder" / vibe coder?**

To projektant, który nie pisze kodu od zera, ale używa AI (Claude Code) jako współpracownika, który ten kod pisze. Twoja rola to: **mieć wizję produktu, projektować doświadczenie, prompować precyzyjnie, weryfikować efekty, iterować.** Tak jak kiedyś designer przekazywał makietę developerowi — teraz przekazujesz prompt Claude'owi i jesteś jego "tech lead'em".

Ta instrukcja uczy jak być w tym dobrym.

---

## Spis treści

1. **Część 1:** Podstawy Claude Code
2. **Część 2:** Struktura katalogów i konfiguracja
3. **Część 3:** Permissions (uprawnienia) — co Claude może, a czego nie może
4. **Część 4:** Pluginy — instalacja i polecane
5. **Część 5:** Skille — jak działają i jak tworzyć własne
6. **Część 6:** Workflow — Scraping istniejącej strony
7. **Część 7:** Workflow — Budowa z makiet Figma
8. **Część 8:** Workflow — Dodawanie funkcjonalności (prompt engineering dla UX-owca)
9. **Część 9:** Workflow — Supabase (baza danych)
10. **Część 10:** Workflow — Deployment na Vercel
11. **Część 11:** Workflow — GitHub w całym procesie
12. **Część 12:** Best practices dla UX-owca — czego nie robić
13. **Część 13:** Najczęstsze problemy
14. **Część 14:** Techniki zaawansowane — Spec-driven development
15. **Część 15:** Trzy środowiska Claude Code — CLI, Desktop, IDE

---

## Część 1: Podstawy Claude Code

### Co to jest Claude Code i czym się różni od Claude.ai

| Cecha | Claude.ai (chat) | Claude Code (CLI) |
|---|---|---|
| **Gdzie żyje** | Przeglądarka | Twój terminal |
| **Widzi Twoje pliki?** | Nie (tylko to co wkleisz/wgrasz) | **Tak — całe drzewo projektu** |
| **Edytuje pliki?** | Nie | **Tak — bezpośrednio na dysku** |
| **Uruchamia komendy?** | Nie | **Tak — bash, npm, git** |
| **Płatny model** | Pro $20/mc → niesamodzielne wnioskowanie | Pro $20/mc → Sonnet 4.6, Max → Opus 4.7 |
| **Najlepszy do** | Pisania, brainstormingu, dokumentów | **Budowania produktu** |

Dla UX-owca = **Claude Code to Twój współpracownik z dostępem do kodu.** Mówisz mu co chcesz osiągnąć, on czyta projekt, edytuje pliki, uruchamia testy, deployuje.

### Pierwsze uruchomienie sesji

Otwórz terminal. Najpierw wejdź do folderu projektu (lub utwórz nowy):

```bash
$ cd ~/Documents/projekty/moj-pierwszy-projekt
$ pwd
/Users/twojeimie/Documents/projekty/moj-pierwszy-projekt
```

Uruchom Claude Code:

```bash
$ claude
```

Zobaczysz interaktywny prompt:

```
╭─────────────────────────────────────╮
│ ✻ Welcome to Claude Code             │
│                                      │
│ /help for commands • Esc to clear    │
╰─────────────────────────────────────╯

> _
```

To **interaktywna sesja** — jak czat, ale z dostępem do projektu. Wpisuj polecenia w języku naturalnym, naciskaj Enter.

> **Wyjście z sesji:** wpisz `/exit` albo `Ctrl + C` (czasem dwa razy).

### Anatomia interfejsu — co widzisz na ekranie

Podczas pracy zobaczysz coś takiego:

```
> Dodaj formularz logowania na stronę główną

⏺ I'll add a login form to your homepage. Let me first check the
  current structure...

⏺ Read(src/app/page.tsx)
  ⎿  Read 47 lines

⏺ I can see the current homepage. I'll create a login form using
  shadcn/ui components...

⏺ Update(src/app/page.tsx)
  ⎿  Updated src/app/page.tsx with 35 additions and 8 removals

  Continue? (y/n) > _
```

**Co tu się dzieje:**

- **Linie z `⏺`** — to Claude pokazuje co zamierza zrobić lub co zrobił
- **`Read(...)`, `Update(...)`** — wywołania narzędzi (czytanie pliku, edycja)
- **`Continue? (y/n)`** — pytanie o zgodę przed potencjalnie kosztowną/destrukcyjną akcją
- Na dole ekranu widzisz **status bar** z aktualnym trybem i modelem

### Tryby pracy — `Shift + Tab` to magiczny skrót

Claude Code ma trzy tryby. Przełączasz je naciskając `Shift + Tab`:

| Tryb | Co znaczy | Kiedy używać |
|---|---|---|
| **Normal** (domyślny) | Pyta o zgodę przed każdą edycją/komendą | Praca codzienna, krytyczne projekty |
| **Auto-accept** | Wykonuje akcje bez pytania | Eksperymenty, prototypy, masz świeży backup git |
| **Plan mode** | **Tylko planuje, nic nie wykonuje** | Przed dużą zmianą, gdy chcesz przemyśleć podejście |

**Dla UX-owca rekomendacja:** zostań w **Normal mode** dopóki nie nabierzesz wprawy. Auto-accept oszczędza czas, ale jeśli prompt jest niejednoznaczny, Claude może zrobić coś czego nie chciałeś — i naprawienie tego zabierze więcej czasu niż 20 razy "y" + Enter.

> **Plan mode jest niedoceniany.** Przed dużą zmianą w nieznanym kodzie wciśnij `Shift + Tab` dwa razy → Claude przedstawi plan działania. Czytasz, mówisz "zrób to", wraca do Normal. Oszczędza godziny.

### Podstawowe komendy slash (najważniejsze)

Komendy slash zaczynają się od `/`. Wpisz `/` żeby zobaczyć pełną listę z autouzupełnianiem.

| Komenda | Co robi | Kiedy używać |
|---|---|---|
| `/help` | Pokaż wszystkie komendy | Gdy zapomnisz nazwy komendy |
| `/init` | Stwórz `CLAUDE.md` dla projektu (ważne!) | Pierwsza rzecz po `claude` w nowym projekcie |
| `/clear` | Wyczyść kontekst rozmowy | Zmieniasz temat, zaczynasz nowe zadanie |
| `/compact` | Skompresuj kontekst, zachowaj najważniejsze | Długa sesja, kończy się "pamięć" Claude'a |
| `/context` | Pokaż jak duży jest aktualny kontekst | Sprawdzenie ile zostało miejsca |
| `/cost` | Ile tokenów / $ wydałeś w sesji | Świadomość kosztów |
| `/model` | Zmień model (opus / sonnet / haiku) | Trudne zadanie → opus, proste → haiku |
| `/plan` | Wejdź w tryb planowania | Złożone zmiany — najpierw plan |
| `/review` | Przegląd kodu (diff) | Przed commitowaniem |
| `/mcp` | Zarządzanie serwerami MCP (Figma, Supabase) | Łączenie zewnętrznych serwisów |
| `/plugin` | Zarządzanie pluginami | Instalacja narzędzi |
| `/exit` | Wyjdź z sesji | Koniec pracy |

### `@-mentions` — najskuteczniejszy sposób referowania plików

Zamiast wklejać kod do promptu — użyj `@`:

```
> @src/app/page.tsx zmień nagłówek na "Witaj"

> @src/components/ui/ dodaj ciemny motyw do wszystkich komponentów

> @https://www.example.com/landing zaprojektuj podobną stronę
```

| Składnia | Znaczenie |
|---|---|
| `@nazwa-pliku.tsx` | Załącz konkretny plik |
| `@nazwa-folderu/` | Załącz cały folder (uwaga na rozmiar) |
| `@https://...` | Pobierz zawartość URL-a |

**Czemu to jest lepsze od kopiowania:** Claude widzi nazwę pliku w historii audytu, lepsze tokenizowanie, możliwość wielokrotnego odwołania bez ponownego pastowania.

### Wybór modelu — kiedy który

```bash
> /model opus    # Najmocniejszy — złożone zadania, architektura
> /model sonnet  # Domyślny — codzienna praca, szybkość + jakość
> /model haiku   # Najszybszy/najtańszy — proste poprawki, szybkie pytania
```

**Praktyczny pattern UX-owca:**
- Sonnet 4.6 — 90% sesji
- Opus 4.7 — gdy projekt nie działa jak chcesz, lub przed kluczową decyzją architektoniczną
- Haiku 4.5 — szybkie pytania typu "jak nazywa się ta klasa Tailwind"

### Skróty klawiaturowe, które oszczędzają godziny

| Skrót | Co robi |
|---|---|
| `Ctrl + C` | Przerwij aktualną akcję Claude'a (gdy poszło w złą stronę) |
| `Esc` | Wyczyść aktualny prompt |
| `Shift + Tab` | Przełącz tryb (normal → auto-accept → plan) |
| `↑` / `↓` | Historia poprzednich promptów |
| `⌘ + V` (macOS) | Wklej zawartość schowka |

> **Złota zasada interakcji z Claude Code:** **Ctrl + C jest Twoim przyjacielem.** Jeśli widzisz że Claude idzie w złą stronę — przerwij. Reroll prompta. Lepiej zrestartować niż czekać i potem cofać 50 zmian.

---

## Część 2: Struktura katalogów i konfiguracja

Claude Code trzyma swoje rzeczy w dwóch miejscach. Zrozumienie różnicy = zrozumienie 70% jak Claude Code działa.

### `~/.claude/` vs `.claude/` — globalne vs projektowe

```
~/.claude/                  ← Twój folder DOMOWY (globalny — wszystkie projekty)
├── settings.json           ← ustawienia osobiste
├── skills/                 ← Twoje osobiste skille
│   └── moj-skill/
│       └── SKILL.md
├── plugins/                ← zainstalowane pluginy
└── commands/               ← (legacy) osobiste komendy slash

projekty/moj-projekt/.claude/  ← w KONKRETNYM projekcie
├── settings.json              ← ustawienia tylko tego projektu
├── skills/                    ← skille specyficzne dla projektu
├── CLAUDE.md                  ← "mózg" projektu (NAJWAŻNIEJSZE!)
└── .mcp.json                  ← konfiguracja MCP dla zespołu (commitowane do git)
```

**Reguła hierarchii:** ustawienia projektowe **nadpisują** globalne. Czyli jeśli masz globalnie pewne pluginy, ale w projekcie chcesz dodatkowy — dodajesz w `.claude/` w projekcie.

### `CLAUDE.md` — najważniejszy plik w Twoim projekcie

`CLAUDE.md` to **"system prompt" Twojego projektu.** Plik markdown w głównym folderze projektu, który Claude Code czyta automatycznie przy każdej sesji w tym projekcie.

**Po co?**
- Konteksty których Claude nie zgadnie (stack, konwencje, ważne zasady)
- Powtarzalne instrukcje (zamiast pisać je przy każdej sesji)
- Bramka jakości: "zawsze testuj przed commitem", "używaj polskich nazw zmiennych"

**Stwórz go automatycznie:**

```bash
> /init
```

Claude przeskanuje projekt i zaproponuje pierwszą wersję `CLAUDE.md`. Potem **edytuj ją ręcznie** — to Twój dokument.

**Przykładowy `CLAUDE.md` dla UX-owca pracującego nad projektem FashionHero:**

```markdown
# FashionHero — Panel sprzedawcy

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui (style: New York, base: Slate)
- Supabase (PostgreSQL + Auth + Storage)
- Vercel (hosting)

## Konwencje
- Wszystkie komponenty UI z shadcn/ui — nie pisz własnych przycisków/inputów od zera
- Używaj polskich tekstów w UI (jesteśmy na rynku polskim)
- Wszystkie dane z Supabase pobieraj przez React Server Components
- Auth — używaj `supabase.auth.getUser()` w server components
- Zaokrąglenia: `rounded-2xl` jako default
- Spacing: bazujemy na 8pt grid (klasy `space-y-2`, `space-y-4`, `space-y-8`)

## Czego NIE robić
- Nie używaj `useState` dla danych z bazy — to ma być server-side
- Nie pisz inline CSS — tylko Tailwind classes
- Nie commituj `node_modules` ani `.env.local`

## Workflow
- Każda nowa funkcjonalność = osobny branch (`feature/nazwa`)
- Commit message po polsku, w trybie "co robi"
- PR description: 1) co zmienia, 2) screenshot, 3) jak testować

## Dane testowe
- Test user: test@fashionhero.pl / Test123!
- Supabase: zmienne środowiskowe w `.env.local`
```

> **Złota zasada CLAUDE.md:** Im lepszy `CLAUDE.md`, tym lepszy każdy prompt. Zacznij od 5 linijek, dodawaj rzeczy gdy widzisz że Claude czegoś nie wie / robi źle. **Ten plik to Twoja największa dźwignia.**

### `settings.json` — konfiguracja sesji

Plik `~/.claude/settings.json` (globalny) lub `.claude/settings.json` (projektowy):

```json
{
  "model": "claude-opus-4-7",
  "env": {
    "CLAUDE_CODE_MAX_OUTPUT_TOKENS": "32000"
  },
  "permissions": {
    "allow": [
      "Read",
      "Edit",
      "Bash(git status:*)",
      "Bash(git diff:*)",
      "Bash(npm run dev)",
      "Bash(npm test:*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(git push --force:*)"
    ]
  }
}
```

**Co tu się dzieje:**
- `model` — domyślny model dla tego projektu/użytkownika
- `permissions.allow` — czego Claude **może używać bez pytania**
- `permissions.deny` — czego Claude **nigdy nie zrobi** (nawet w auto-accept)

Więcej o permissions w następnej części.

---

## Część 3: Permissions (uprawnienia) — kontrola tego, co Claude może

To **najważniejsza** część dla osoby nietechnicznej. Bez dobrej konfiguracji Claude:
- Albo pyta o każdą drobną akcję ("można odczytać plik?") → frustracja
- Albo działa za swobodnie → ryzyko (Claude usunął coś czego nie chciałeś)

### Jak działają permissions

Każde narzędzie Claude'a (czytanie, edycja, bash, web) ma poziom autoryzacji:

| Poziom | Co znaczy |
|---|---|
| **allow** | Wykonuj bez pytania |
| **ask** (domyślny) | Zapytaj zanim wykonasz |
| **deny** | Nigdy nie wykonuj |

### Format permissions

```
Read                    ← czytanie wszystkich plików
Edit                    ← edycja wszystkich plików
Write                   ← tworzenie nowych plików
Bash(npm test:*)        ← wszystkie komendy zaczynające się od "npm test"
Bash(git status:*)      ← wszystkie warianty "git status"
Bash(rm -rf:*)          ← wszystkie warianty "rm -rf" (DENY!)
WebFetch                ← pobieranie URL-i
mcp__figma__*           ← wszystkie tooli Figma MCP
```

Gwiazdka `*` to wildcard — pasuje do dowolnego ciągu znaków.

### Rekomendowana konfiguracja dla UX-owca (start)

Stwórz `.claude/settings.json` w głównym folderze projektu z poniższą zawartością:

```json
{
  "permissions": {
    "allow": [
      "Read",
      "Edit",
      "Write",
      "Bash(npm install:*)",
      "Bash(npm run dev)",
      "Bash(npm run build)",
      "Bash(npm test:*)",
      "Bash(npx shadcn:*)",
      "Bash(git status:*)",
      "Bash(git diff:*)",
      "Bash(git log:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git checkout:*)",
      "Bash(git branch:*)",
      "Bash(supabase:*)",
      "Bash(vercel:*)",
      "Bash(gh:*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(git push --force:*)",
      "Bash(git reset --hard:*)",
      "Bash(supabase db reset:*)",
      "Bash(vercel rm:*)"
    ]
  }
}
```

**Co dostajesz tym konfigiem:**
- ✅ Claude może czytać/edytować pliki bez pytania
- ✅ Może uruchamiać dev/build/test, instalować paczki npm
- ✅ Może robić git commit, branche, ale **nie wymusi push'a**
- ✅ Może pracować z Supabase i Vercel
- ❌ Nie usunie folderu, nie wymusi git pusha, nie zresetuje bazy danych

### Auto-accept mode — kiedy włączyć

`Shift + Tab` raz → `auto-accept on`. **W tym trybie Claude wykonuje WSZYSTKO co ma w allow, nigdy nie pyta.**

Włączaj gdy:
- Pracujesz nad prototypem / piaskownicą
- Masz **świeży commit git** (możesz cofnąć każdą zmianę)
- Robisz duże, wieloetapowe zadanie i nie chcesz klikać "y" 50 razy

**Nie włączaj** gdy:
- Pracujesz na branchu produkcyjnym
- Nie masz backupu git
- Nie do końca rozumiesz prompt który puściłeś

### Plan mode — `Shift + Tab` x2

`auto-accept on` → kolejne `Shift + Tab` → `plan mode on`.

W tym trybie Claude **nic nie wykonuje** — tylko myśli na głos i prezentuje plan. Świetne kiedy:
- Wchodzisz w nieznany kod i chcesz zrozumieć zanim zmienisz
- Masz duże zadanie, chcesz najpierw zobaczyć kroki
- Chcesz nauczyć się jak Claude rozumuje

Po zaakceptowaniu planu — wracasz do normal mode i Claude wykonuje.

---


## Część 4: Pluginy — Twój zestaw narzędzi

### Co to jest plugin

**Plugin** to paczka, która rozszerza Claude Code o:
- **Skille** (instrukcje dla Claude'a, jak coś robić)
- **MCP servery** (połączenia do zewnętrznych serwisów: Figma, Supabase, GitHub)
- **Slash commands** (własne komendy `/coś`)
- **Hooks** (automatyzacja: "po każdej edycji uruchom prettier")

Z perspektywy UX-owca: **plugin to "aplikacja w Twoim Claude Code"**. Instalujesz coś co rozumie Figmę, coś co rozumie Supabase — Claude od razu umie z tym pracować.

### Marketplace — skąd bierzesz pluginy

Są dwa typy źródeł:

| Marketplace | Status | Komenda |
|---|---|---|
| **`claude-plugins-official`** | Oficjalny — Anthropic + zweryfikowani partnerzy | Dostępny od razu, nie trzeba dodawać |
| **Społecznościowe** (GitHub repos) | Dowolne, **na własną odpowiedzialność** | `/plugin marketplace add owner/repo` |

> **⚠️ Bezpieczeństwo:** plugin to kod, który Claude Code wykonuje na Twoim komputerze. Nie instaluj losowych pluginów z internetu. **Zacznij od oficjalnych.**

### Jak instalować pluginy

W aktywnej sesji Claude Code:

```
> /plugin
```

Otworzy się interaktywny manager z 4 zakładkami:
- **Discover** — przeglądaj dostępne pluginy
- **Installed** — co masz zainstalowane
- **Marketplaces** — Twoje źródła
- **Errors** — problemy z pluginami (jeśli są)

Albo bezpośrednio z linii:

```
> /plugin install figma@claude-plugins-official
> /plugin install supabase@claude-plugins-official
> /plugin install github@claude-plugins-official
```

### Polecane pluginy dla AI-driven Product Buildera (UX-owca)

Lista zoptymalizowana pod **Twój** workflow: makiety → kod → baza → deploy.

#### Niezbędne (instaluj od pierwszego dnia)

| Plugin | Po co | Komenda |
|---|---|---|
| **figma** | Czytanie makiet z Figmy, generowanie kodu z designów | `/plugin install figma@claude-plugins-official` |
| **github** | Tworzenie PR-ów, review, issues | `/plugin install github@claude-plugins-official` |
| **frontend-design** | Skill od Anthropic — generowanie komponentów React/Tailwind w spójnym stylu | `/plugin install frontend-design@claude-plugins-official` |
| **supabase** | Praca z bazą, migracje, typy TypeScript | `/plugin install supabase@claude-plugins-official` |
| **vercel** | Deployment, environment variables | `/plugin install vercel@claude-plugins-official` |

#### Bardzo użyteczne (dorzuć po pierwszym tygodniu)

| Plugin | Po co |
|---|---|
| **chrome-devtools** | Automatyzacja przeglądarki, screenshots, performance traces, console errors. Używa Puppeteer + Chrome DevTools Protocol pod spodem — działa z headless Chrome, nic nie musisz instalować ręcznie. |
| **context7** | Aktualne dokumentacje bibliotek (Next.js, React, Tailwind, Supabase) — wstrzykiwane do kontekstu Claude'a, eliminuje halucynacje API. |
| **commit-commands** | Konwencjonalne commit messages (`/commit`, `/release`) |
| **code-review** | Automatyczne review przed PR-em |
| **feature-dev** | Strukturyzowany workflow rozwoju feature'a (wymagania → impl → testy) |
| **security-guidance** | Sprawdzanie bezpieczeństwa kodu (głównie pod kątem RLS Supabase, leaked secrets) |

#### Plugin do scrapingu / web

| Plugin | Po co |
|---|---|
| **chrome-devtools** | Najprostsza opcja: Claude otwiera headless Chrome, pobiera HTML/CSS/komponenty, robi screenshots. Idealne do scrapingu kursowego (Część 6 instrukcji). |
| **firecrawl** | Alternatywa dla scrapingu wielu stron z API (płatne po przekroczeniu free tier). Lepsze do mass scrapingu, słabsze do precyzyjnej rekonstrukcji UI. |

> **Ekstra opcja dla zaawansowanych: `Claude in Chrome` extension.** To **inne** narzędzie niż `chrome-devtools` plugin. Extension instaluje się w Twoim **rzeczywistym Chrome** (Chrome Web Store, plan Pro+) i daje Claude'owi dostęp do **Twoich zalogowanych sesji** — Gmail, Slack, Figma, Notion. Uruchamia się przez `claude --chrome`. Idealne do testowania prototypu z prawdziwym kontem testowym albo do automatyzacji workflow'ów z Twoimi danymi. **Trzymaj się jednak `chrome-devtools` plugin dla codziennej pracy** — jest prostszy, działa na headless Chrome, nie wymaga osobnej instalacji extension.

### Zarządzanie pluginami

```
> /plugin list                        # co mam zainstalowane
> /plugin update                      # aktualizuj wszystkie
> /plugin disable <nazwa>             # tymczasowo wyłącz
> /plugin enable <nazwa>              # włącz z powrotem
> /plugin uninstall <nazwa>           # usuń
```

### Reguła "mniej znaczy więcej"

> **Najlepsi użytkownicy Claude Code mają 2-3 pluginy. Niektórzy zero.** Każdy plugin dodaje "noise" do kontekstu — Claude widzi wszystkie ich instrukcje, nawet gdy ich nie używasz.

**Anti-pattern:** instalujesz 20 pluginów "bo może się przydadzą", po miesiącu Claude jest wolny i miesza odpowiedzi z różnych skilli.

**Wzorzec dobrego UX-owca:** zacznij od **figma + supabase + vercel + github + frontend-design**. Po dwóch tygodniach zobacz których nie używasz — wyłącz.

---

## Część 5: Skille — jak Claude uczy się Twoich procesów

### Czym różni się skill od pluginu

| | Plugin | Skill |
|---|---|---|
| Skala | Paczka kilku rzeczy (skille + MCP + komendy + hooks) | Pojedynczy plik z instrukcją |
| Lokalizacja | `~/.claude/plugins/` | `~/.claude/skills/<nazwa>/SKILL.md` |
| Skąd | Marketplace | Sam piszesz albo kopiujesz |
| Wywołanie | Auto (przez nazwę pluginu) | **Auto (Claude wybiera sam, gdy zadanie pasuje do `description`)** |

**Najważniejsze:** skille są wybierane **automatycznie** przez Claude'a na podstawie tego, co napisałeś w prompcie. Jak masz skill o opisie "Pisanie postów na LinkedIn", a poprosisz Claude'a "napisz post na LinkedIn o naszym launchu" — skill aktywuje się sam.

### Format SKILL.md

Skill to folder z plikiem `SKILL.md`:

```
~/.claude/skills/
└── komponenty-fashionhero/
    ├── SKILL.md             ← instrukcje dla Claude'a
    ├── tokens.md            ← (opcjonalnie) dodatkowe pliki referencyjne
    └── przyklady/           ← (opcjonalnie) przykłady kodu
        └── button.tsx
```

Plik `SKILL.md` ma stałą strukturę:

```markdown
---
name: komponenty-fashionhero
description: |
  Tworzenie komponentów React zgodnych z design systemem FashionHero.
  Używaj zawsze gdy użytkownik prosi o stworzenie nowego komponentu UI,
  nowej strony, lub modyfikację istniejących komponentów. Stosuj się
  ściśle do tokenów kolorystycznych i typograficznych.
---

# Komponenty FashionHero

## Zasady

1. Zawsze używaj komponentów z shadcn/ui jako bazy
2. Nazwy komponentów: PascalCase, w polskim języku (np. `KartaProduktu`)
3. Zawsze dodaj prop `className` do nadpisywania stylów

## Tokeny

- Kolor primary: `bg-rose-600` (FashionHero pink)
- Kolor secondary: `bg-slate-100`
- Border radius: `rounded-2xl`
- Spacing: `space-y-4` między sekcjami, `space-y-2` w sekcjach

## Przykład

Zobacz `przyklady/button.tsx` jak powinien wyglądać typowy komponent.
```

**Klucz: `description` w frontmatterze.** To po niej Claude zdecyduje, czy skill pasuje do aktualnego zadania. Im bardziej precyzyjna, tym lepiej skill się aktywuje.

### Reguły dobrego description

❌ **Złe:** `description: "Komponenty"` — zbyt ogólne, Claude nie wie kiedy użyć

✅ **Dobre:** `description: "Tworzenie komponentów React zgodnych z design systemem FashionHero. Używaj gdy użytkownik prosi o nowy komponent UI, nową stronę, lub modyfikację istniejących komponentów."`

**Wzorzec:** *"Co skill robi + Kiedy go aktywować + Słowa-klucze które uruchomią skill"*

### Polecane skille (zewnętrzne)

Najlepsze repozytoria skilli na 2026:
- `anthropics/anthropic-agent-skills` — oficjalne skille Anthropic (PDF, docx, xlsx)
- `obra/superpowers-dev` — testowanie, TDD workflows
- `eyaltoledano/taskmaster` — zarządzanie zadaniami w projekcie

Instalacja przez plugin:

```
> /plugin marketplace add anthropics/claude-plugins-official
> /plugin install <nazwa>
```

### Tworzenie własnego skilla — krok po kroku

Najlepszy UX-owy skill = automatyzacja **Twoich** procesów. Nie szukaj skilli w internecie, **zrób swoje** dopasowane do projektu.

**Przykład: skill `prompt-builder` — pomaga zamienić abstrakcyjny pomysł UX-owca na konkretny prompt do Claude'a.**

#### Krok 1: Stwórz folder

W terminalu (nie w Claude Code, w zwykłym terminalu):

```bash
$ mkdir -p ~/.claude/skills/prompt-builder
$ cd ~/.claude/skills/prompt-builder
```

#### Krok 2: Stwórz SKILL.md

```bash
$ code SKILL.md
```

W VS Code wklej:

```markdown
---
name: prompt-builder
description: |
  Pomaga zamienić abstrakcyjny pomysł UX-owca na precyzyjny prompt
  do implementacji. Aktywuj zawsze gdy użytkownik mówi "chcę zrobić X"
  ale brakuje technicznych szczegółów (jakie pola, jaka logika, gdzie
  zapisać dane). Zadaj 3-5 pytań pogłębiających, potem napisz prompt
  techniczny gotowy do wykonania.
---

# Prompt Builder dla UX-owca

Twoja rola: pomóc użytkownikowi zamienić abstrakcyjny pomysł na konkretny
prompt techniczny.

## Workflow

1. **Posłuchaj abstrakcyjnego pomysłu** ("chcę dodać profil użytkownika")

2. **Zadaj 3-5 pytań pogłębiających.** Skup się na:
   - Co dokładnie ma zawierać? (pola, dane)
   - Skąd pochodzą dane? (form, baza, API)
   - Gdzie się zapisują? (Supabase tabela, localStorage)
   - Kto ma dostęp? (zalogowani / publiczne / admin)
   - Jakie są edge cases? (puste, błędne, zbyt długie)

3. **Napisz prompt techniczny** w formacie:
   ```
   Dodaj funkcjonalność: <nazwa>

   ## Komponenty
   - <lista komponentów do stworzenia>

   ## Dane
   - Tabela Supabase: <schema>
   - RLS policy: <opis>

   ## UX
   - <kroki user flow>

   ## Edge cases
   - <co obsłużyć>

   Stack: Next.js + shadcn/ui + Supabase. Trzymaj się CLAUDE.md.
   ```

4. **Pokaż prompt użytkownikowi** i zapytaj "Wykonać czy poprawić?"

## Przykład rozmowy

Użytkownik: "chcę dodać profil użytkownika"
Ty: zadaj pytania, otrzymaj odpowiedzi, napisz prompt, wykonaj.
```

#### Krok 3: Test

Wróć do Claude Code w sesji projektowej i napisz:

```
> chcę dodać profil użytkownika
```

Claude **automatycznie** powinien zauważyć skill i zacząć zadawać pytania pogłębiające. Jeśli nie aktywuje — popraw `description`, dodaj więcej słów-kluczy.

### Kiedy skill, a kiedy CLAUDE.md

| Sytuacja | Lokalizacja |
|---|---|
| Reguły dotyczące **całego projektu** (stack, konwencje) | `CLAUDE.md` |
| **Powtarzalne workflow-y** (jak dodawać komponent, jak deployować) | Skill |
| **Wiedza domenowa** (jak działa nasz produkt biznesowo) | `CLAUDE.md` |
| **Procesy** (code review checklist, PR template) | Skill |

**Zasada kciuka:** jeśli zaczynasz pisać "Claude, postępuj zawsze tak..." — to powinno być w skillu albo CLAUDE.md, nie w prompcie.

---

## Część 6: Workflow — Scraping istniejącej strony

**Scenariusz:** widzisz świetną stronę konkurencji albo masz starą wersję swojej aplikacji w innym stacku. Chcesz zrobić odpowiednik na Next.js + shadcn/ui + Supabase + Vercel.

### Setup (jednorazowo)

Zainstaluj plugin do scrapingu:

```
> /plugin install chrome-devtools@claude-plugins-official
```

`chrome-devtools` używa Puppeteer + Chrome DevTools Protocol pod spodem. Otwiera headless Chrome, pozwala Claude'owi nawigować po stronie, czytać HTML/CSS, robić screenshots, inspektować DOM. **Niczego nie musisz instalować ręcznie** — plugin sam zarządza headless Chrome.

Lub alternatywnie Firecrawl (jeśli wolisz prostsze API i nie potrzebujesz pełnej kontroli nad przeglądarką):

```
> /plugin marketplace add firecrawl/claude-plugin
> /plugin install firecrawl
```

Stwórz nowy projekt Next.js (jeśli jeszcze nie masz):

```bash
$ cd ~/Documents/projekty
$ npx create-next-app@latest klon-strony
$ cd klon-strony
$ npx shadcn@latest init
$ npx shadcn@latest add button card input label form navigation-menu
$ code .
```

Uruchom Claude Code w folderze projektu i zrób `/init`:

```bash
$ claude
> /init
```

### Prompt 1: Pierwsza analiza strony

```
Przeanalizuj stronę https://www.zalando.pl/wyprzedaz-damska/ i przygotuj:

1. Strukturę informacyjną (sitemap najważniejszych elementów)
2. Listę komponentów UI które się powtarzają (np. karta produktu, filtr, breadcrumb)
3. Schemat kolorystyczny (top 5 kolorów + role: primary, accent, background, text)
4. Typografia (jakie fonty, hierarchia rozmiarów)
5. Pattern siatki (ile kolumn na desktop / tablet / mobile)
6. Ciekawe interakcje wymagające uwagi (hover, animacje, infinite scroll)

Pokaż mi to w formie raportu markdown PRZED zaczęciem pisania kodu.
```

> **Ważne:** **najpierw raport, potem kod.** UX-owiec powinien zobaczyć zrozumienie Claude'a zanim ten zacznie generować pliki. Łapiesz nieporozumienia wcześnie, oszczędzasz godziny.

### Prompt 2: Plan wdrożenia

```
Świetnie. Teraz przygotuj plan implementacji w naszym stacku
(Next.js 15 App Router + shadcn/ui + Tailwind + Supabase).

Format:
- Lista plików do stworzenia (ścieżki)
- Lista komponentów shadcn do dodania
- Schema bazy danych w Supabase (tabele + relacje + RLS policies)
- Lista routes (App Router)
- Estymacja: ile kroków będzie potrzebnych

NIE pisz jeszcze kodu. Pokaż plan i czekaj na akceptację.
```

> **Wskazówka:** włącz `Plan mode` (`Shift + Tab` x2) na ten prompt, żeby mieć pewność że Claude nic nie wykona.

### Prompt 3: Iteracyjna implementacja

Po akceptacji planu, dziel pracę na małe iteracje:

```
Implementuj punkt 1 z planu (struktura layoutu + nawigacja).
Po skończeniu pokaż mi co zrobiłeś, uruchom dev server, czekaj na feedback.
NIE przechodź do kolejnego punktu sam.
```

Powtarzaj dla każdego punktu. Po każdym kroku:
1. Sprawdź wizualnie w przeglądarce (`http://localhost:3000`)
2. Zrób commit git (`git add . && git commit -m "feat: nawigacja"`)
3. Daj feedback Claude'owi co poprawić

### Prompt 4: Iteracja na podstawie konkretnego elementu

Kiedy chcesz że coś wygląda **dokładnie tak**:

```
Patrz @screenshots/zalando-card.png.

Zmień nasz komponent KartaProduktu w @src/components/karta-produktu.tsx
żeby wyglądał DOKŁADNIE jak na screenshotcie:
- Białe tło, brak borderów
- Cena w prawym górnym rogu
- Serduszko (favorite) w prawym górnym rogu, nad ceną
- Nazwa marki bold, nazwa produktu zwykła, oba pod zdjęciem
- Hover: lekkie unoszenie (translate-y -2px) + cień

Zostaw resztę funkcjonalności bez zmian.
```

> **Trick:** robisz screenshot strony którą chcesz "skopiować", wrzucasz do folderu `screenshots/` w projekcie, i odwołujesz się przez `@screenshots/...`. Claude widzi obrazek i porównuje.

### Anti-patterns scrapingu

❌ **"Skopiuj 1:1 stronę X"** — Claude nie skopiuje "1:1", to nie kserokopiarka. Zrobi swoją interpretację. Frustrujący wynik.

❌ **Wrzucenie 50 stron na raz** — Claude zrobi powierzchowną pracę. Lepiej pokazać 3 kluczowe ekrany dokładnie.

❌ **Brak iteracji** — jeśli pierwszy efekt nie podoba Ci się, **nie zaczynaj od nowa**. Powiedz precyzyjnie co poprawić: "Spacing między kartami za mały, zwiększ do `gap-8`. Nazwa marki za blada, daj `text-slate-900 font-bold`."


---

## Część 7: Workflow — Budowa z makiet Figma

To Twój chleb powszedni jako UX-owca. **Setup i workflow tutaj decydują o tym, czy AI-driven Product Building Cię uszczęśliwi czy sfrustruje.**

### Setup (jednorazowo)

#### Krok 1: Sprawdź plan Figma

Figma MCP wymaga **Dev seat** lub **Full seat** na płatnym planie (Professional, Organization, Enterprise). Plan darmowy daje **6 wywołań tools/miesiąc** — to za mało do realnej pracy, ale wystarczy żeby przetestować.

#### Krok 2: Zainstaluj plugin Figma

```
> /plugin install figma@claude-plugins-official
```

Plugin zawiera MCP server + zestaw skilli do code generation z designów.

#### Krok 3: Autoryzuj połączenie

Po instalacji Claude Code zrestartuje się automatycznie. Potem:

```
> /mcp
```

Wybierz `figma` → `Authenticate` → otworzy się przeglądarka → zaloguj do Figma → `Allow Access`.

Wracasz do Claude Code — zobaczysz `Authentication successful. Connected to figma`.

Sprawdzenie czy działa:

```
> /mcp
```

Pod `figma` powinno być `connected ✓`.

### Workflow #1: Implementacja pojedynczego ekranu

#### Krok 1: Skopiuj link z Figmy

W Figmie zaznacz ramkę (`F` + klik) z ekranem, który chcesz zaimplementować. **Right-click → "Copy link to selection"**.

#### Krok 2: Prompt do Claude'a

```
Zaimplementuj ten ekran jako stronę w naszym Next.js:

https://www.figma.com/design/abc123XYZ/MojProjekt?node-id=123-456

Zasady:
- Stack: Next.js 15 App Router + shadcn/ui + Tailwind
- Lokalizacja: src/app/login/page.tsx (lub odpowiednia)
- Używaj komponentów z naszego @src/components/ui/
- Trzymaj się konwencji z @CLAUDE.md
- Polskie teksty (jak na designie)

Najpierw pokaż mi strukturę komponentu (drzewo elementów),
potem napisz kod. Po skończeniu uruchom dev server.
```

### Workflow #2: Implementacja design systemu (dla zaawansowanych)

Jeśli Twoja Figma ma **Design System** (komponenty, tokeny, variables), wykorzystaj to:

```
Przeanalizuj design system pod tym linkiem:

https://www.figma.com/design/abc123XYZ/DesignSystem

1. Wyciągnij design tokens:
   - Kolory (primary, secondary, semantic)
   - Typografię (rozmiary, font-family, font-weight)
   - Spacing (skala)
   - Border radius
   - Shadows

2. Zaktualizuj nasz @src/app/globals.css (Tailwind CSS variables)

3. Zaktualizuj @tailwind.config.js (custom theme)

4. Pokaż mi diff i NIE wprowadzaj zmian dopóki nie powiem "ok".
```

Po akceptacji tokenów:

```
Teraz dla każdego komponentu z design systemu (Button, Input, Card,
Modal, Badge, etc.) sprawdź:
1. Czy mamy go już w shadcn/ui (@src/components/ui/)
2. Jeśli tak — zmodyfikuj żeby pasował do designu
3. Jeśli nie — dodaj przez `npx shadcn add <name>`, potem zmodyfikuj

Pracuj komponent po komponencie. Po każdym pokaż mi rezultat.
```

### Workflow #3: Code-to-Canvas (eksport z Claude Code do Figmy)

Claude Code może też **wysłać** swój output do Figmy jako edytowalne warstwy. Świetne kiedy:
- Stworzyłeś coś prototypowo w kodzie i chcesz to dopieścić wizualnie w Figmie
- Designerka chce wprowadzić zmiany na canvasie zamiast prosić Cię o iterację

```
Mam działający komponent w @src/components/karta-produktu.tsx.
Wyrenderuj go w przeglądarce na localhost:3000/test-card,
zrób screenshot i prześlij do mojego pliku Figma:

https://www.figma.com/design/abc123XYZ/MojProjekt

Stwórz nową stronę "Generated from Code" i wstaw tam screenshot
jako edytowalne warstwy.
```

### Best practices przy pracy z Figma MCP

1. **Nazewnictwo komponentów w Figmie ma znaczenie.** Jeśli komponent w Figmie nazywa się "btn-primary-large/hover" — Claude tak go nazwie w kodzie. Komponenty nazywane "Frame 47" → kod będzie nieczytelny.

2. **Variables w Figmie = design tokens w kodzie.** Jeśli używasz Figma Variables, Claude przeniesie je 1:1 jako CSS custom properties. Bez Variables Claude zgadnie wartości.

3. **Auto Layout = Flexbox/Grid.** Komponenty z Auto Layout mapują się świetnie. Bez Auto Layout Claude próbuje pozycjonować absolutnie — często źle.

4. **Code Connect** (Figma feature) — jeśli zmapujesz komponenty Figmy do komponentów w kodzie, Claude użyje **Twoich** komponentów zamiast generować nowe. **Killer feature dla design systemu.**

5. **Zrzut ekranu działa wspólnie z linkiem.** Czasem wystarczy: link + screenshot + opis = lepszy efekt niż sam link.

### Anti-patterns

❌ **"Zaimplementuj cały produkt z 50 ramek Figma jednym promptem"** — nie zadziała. Iteruj ekran po ekranie.

❌ **"Niech wygląda dokładnie jak Figma"** — Claude robi swoją interpretację. Bądź gotów na 2-3 rundy poprawek per ekran. To wciąż 10x szybsze niż ręcznie.

❌ **Brak design tokenów** — jeśli każdy ekran ma inne kolory i fonty, Claude nie wybierze "głównego". Zrób design system zanim zaczniesz buildować.

---

## Część 8: Workflow — Dodawanie funkcjonalności (prompt engineering)

To **najważniejsza część** dla UX-owca. Twoje umiejętności promptowania = jakość Twojego produktu.

### Problem UX-owca: warstwa abstrakcji

UX-owiec myśli abstrakcjami:
- "Chcę profil użytkownika"
- "Chcę żeby był koszyk"
- "Chcę powiadomienia"

Claude potrzebuje **konkretu**:
- Jakie pola są w profilu? (imię, avatar, bio, …?)
- Czy koszyk jest persistent po wylogowaniu?
- Powiadomienia push czy w aplikacji? Jaki trigger?

**Bez konkretu Claude zgadnie**. Zgadnie tak, jak zrobiłby "typowy" deweloper. Zgadnie źle dla Twojego produktu.

### Rozwiązanie 1: Skill `prompt-builder` (zrobiłeś go w Części 5)

Pisałeś go w Części 5. Aktywuje się automatycznie kiedy zaczynasz prompt od "chcę dodać..." — Claude zadaje 3-5 pytań pogłębiających, dopiero potem pisze kod.

### Rozwiązanie 2: Wzorce promptów (template'y)

Trzymaj te szablony pod ręką. Kopiuj, wypełniaj, używaj.

#### Template A: Nowa funkcjonalność (czysta)

```
Dodaj funkcjonalność: [NAZWA]

## Po co (cel biznesowy)
[Jedno zdanie — dlaczego to dodajemy]

## User flow
1. Użytkownik [klika/widzi/wpisuje] X
2. Aplikacja [robi] Y
3. Użytkownik [widzi] Z

## Komponenty
- [Lista nowych komponentów do stworzenia, z lokalizacją plików]

## Dane (Supabase)
- Tabela [nazwa]:
  - [pole]: [typ] [constraints]
- RLS: [kto może czytać/pisać]

## Edge cases
- Co jeśli [pusta lista / błąd / brak uprawnień / …]

## Akceptacja
- [ ] [Lista warunków, które muszą być spełnione]

Stack: zgodnie z @CLAUDE.md. Trzymaj się konwencji.
Zacznij od planu, czekaj na akceptację, potem implementuj.
```

#### Template B: Modyfikacja istniejącego elementu

```
Zmodyfikuj @[ścieżka/do/pliku.tsx]:

## Co konkretnie zmienić
- [Punkt 1: opis zmiany]
- [Punkt 2: opis zmiany]

## Czego NIE ruszaj
- [Lista rzeczy które mają zostać]

## Dlaczego
[Krótkie uzasadnienie — pomaga Claude'owi gdy pojawia się dylemat]

Po zmianie: pokaż diff, uruchom build, czekaj na ok.
```

#### Template C: Bug fix

```
Bug: [krótki opis]

## Repro
1. Idę do [URL/route]
2. Klikam [element]
3. Spodziewam się [oczekiwane zachowanie]
4. Faktycznie dzieje się [aktualne zachowanie]

## Co już sprawdziłem
- [Lista — żeby Claude nie powtarzał]

## Pliki które prawdopodobnie są związane
- @[ścieżka/do/pliku1.tsx]
- @[ścieżka/do/pliku2.ts]

Najpierw zdiagnozuj (przeczytaj kod, znajdź przyczynę),
pokaż mi co znalazłeś, potem zaproponuj fix.
```

### Rozwiązanie 3: Iteracja przez `/plan`

Gdy nie masz pewności **jak** coś zrobić — niech Claude zrobi research:

```
> Shift + Tab Shift + Tab   (włączasz plan mode)

> Chcę żeby użytkownicy mogli komentować produkty.
  Przejrzyj nasz kod, zaproponuj 3 różne podejścia
  (od najprostszego do najbardziej rozbudowanego)
  z plusami i minusami każdego.

> Nie pisz kodu, tylko plan.
```

Claude pokaże 3 opcje. Wybierasz, wracasz do normal mode, mówisz "zrób opcję 2".

### Rozwiązanie 4: Voice notes → tekst → prompt

UX-owcom często łatwiej **mówić** niż **pisać**. Workflow:

1. **Otwórz nagranie głosowe** na telefonie/Macu
2. **Mów przez 2 minuty** o pomyśle (jak do kolegi)
3. **Transkrybuj** (Whisper przez ChatGPT, Wisprflow, lub macOS Dictation)
4. **Wklej do Claude'a** z prefixem:

```
To jest moje surowe rozumowanie głosowe na temat funkcjonalności,
którą chcę dodać. Przeczytaj, zadaj 3-5 pytań pogłębiających,
potem ułóż prompt techniczny w naszym formacie (Template A z
notatek):

[tu wklejona transkrypcja]
```

### Mistake-pattern: tworzenie 5 rzeczy jednocześnie

❌ **Nie:**
```
Dodaj profil użytkownika, koszyk, system płatności i powiadomienia.
```

Claude zrobi powierzchownie wszystkie 4 rzeczy. Każda będzie miała 80% kompletności. Razem to nie zadziała. **Frankenstein.**

✅ **Tak:**
```
Dziś robimy tylko profil użytkownika. Resztę robimy w kolejnych sesjach.
```

**Reguła:** **jedna funkcjonalność per sesja.** Po skończeniu — `/clear` albo nowa sesja Claude Code. Zaczyna z czystym kontekstem.

### Mistake-pattern: brak weryfikacji

Po kodzie Claude'a **zawsze**:
1. Otwórz w przeglądarce — sprawdź wizualnie
2. Kliknij na każdy element — sprawdź interakcje
3. Sprawdź **edge cases** które prosiłeś (puste, długie, błędne dane)
4. **Czytaj diff git** (`git diff`) zanim commitujesz

Claude potrafi:
- Stworzyć pliki które wyglądają dobrze, ale mają błędy w runtime
- Zignorować część Twojego prompta
- "Naprawić" coś czego nie prosiłeś

Twoja rola = **bramka jakości**. To Twój produkt, nie Claude'a.

---

## Część 9: Workflow — Supabase (baza danych)

### Setup (jednorazowo)

#### Krok 1: Stwórz projekt na supabase.com

W przeglądarce: [supabase.com](https://supabase.com) → New Project → wpisz nazwę → wybierz region (Frankfurt dla Europy) → silne hasło dla bazy → Create.

Poczekaj 2-3 minuty aż się stworzy.

#### Krok 2: Połącz projekt lokalny

W terminalu projektu (nie w Claude Code):

```bash
$ supabase login
$ supabase link --project-ref <twoj-project-ref>
```

Project ref znajdziesz w URL panelu Supabase: `https://supabase.com/dashboard/project/abcdefghijklm` → ref to `abcdefghijklm`.

#### Krok 3: Pobierz klucze i wstaw do `.env.local`

W panelu Supabase: **Project Settings → API → skopiuj Project URL i anon public key**.

```bash
$ touch .env.local
$ code .env.local
```

W VS Code wklej:

```
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

> **NIGDY nie commituj `.env.local`!** Sprawdź że jest w `.gitignore` (Next.js domyślnie tam wpisuje).

#### Krok 4: Zainstaluj plugin Supabase

W Claude Code:

```
> /plugin install supabase@claude-plugins-official
```

To podpina MCP server Supabase — Claude może czytać/zmieniać schemat bazy bezpośrednio.

### Workflow #1: Tworzenie tabeli od zera

```
Stwórz w Supabase tabelę `produkty` dla naszego marketplace'u modowego.

## Pola
- id: uuid primary key, default gen_random_uuid()
- nazwa: text, not null
- opis: text
- cena: numeric(10,2), not null, > 0
- waluta: text, default 'PLN'
- sprzedawca_id: uuid, foreign key do auth.users
- kategoria: text, enum (sukienki, buty, akcesoria, …)
- zdjecia: text[] (lista URL-i)
- created_at: timestamptz, default now()
- updated_at: timestamptz, default now()

## RLS Policies
- SELECT: każdy może czytać (publiczne katalog)
- INSERT: tylko zalogowany sprzedawca, w jego imieniu (sprzedawca_id = auth.uid())
- UPDATE: tylko właściciel produktu
- DELETE: tylko właściciel produktu

## Triggers
- updated_at: automatyczna aktualizacja przy każdym UPDATE

Wygeneruj migrację SQL (plik w supabase/migrations/),
uruchom ją na lokalnej bazie do testu, pokaż mi schema diff.
```

### Workflow #2: Generowanie typów TypeScript

Po każdej zmianie schematu wygeneruj typy, żeby kod TypeScript wiedział o tabelach:

```
Wygeneruj typy TypeScript ze schematu Supabase.
Zapisz w @src/types/supabase.ts.
Po wygenerowaniu pokaż mi przykład jak ich używać w komponencie.
```

Pod spodem Claude uruchomi:
```bash
$ supabase gen types typescript --linked > src/types/supabase.ts
```

### Workflow #3: Seed (dane testowe)

```
Wygeneruj plik seed dla naszej tabeli produkty:

- 30 realistycznych produktów modowych
- Mix kategorii: sukienki (10), buty (8), akcesoria (12)
- Ceny w zakresie 50-2000 PLN, realistyczne
- Polskie nazwy i opisy (3-4 zdania)
- Zdjęcia z Unsplash (placeholder URL-e w schemacie unsplash.com/...)
- Sprzedawca_id: użyj 3 testowych UUID-ów (zapisz na górze pliku)

Plik: supabase/seed.sql
Po stworzeniu uruchom: supabase db reset && supabase db push
```

### Workflow #4: Aktualizacja schematu (migracja)

```
Dodaj do tabeli produkty:
- pole: ocena (numeric, 0-5, nullable)
- pole: liczba_recenzji (integer, default 0)
- index na sprzedawca_id (dla szybkich query po sprzedawcy)

Stwórz nową migrację (NIE modyfikuj istniejącej!),
nazwa: 20240501_add_oceny_do_produktow.sql

Po stworzeniu zastosuj: supabase db push.
Wygeneruj nowe typy TypeScript.
Pokaż jak ten nowy schema mapuje się na nasz typ Produkt.
```

### Workflow #5: Pobieranie danych w Next.js

Po stworzeniu schematu — niech Claude napisze kod do pobierania:

```
Stwórz Server Component @src/app/produkty/page.tsx który:

1. Pobiera wszystkie produkty z Supabase (sortowane: created_at DESC)
2. Renderuje grid 3-kolumnowy (desktop) / 1-kolumnowy (mobile)
   z komponentami KartaProduktu
3. Każda karta linkuje do /produkty/[id]

Użyj:
- @supabase/ssr (Server Component pattern)
- Suspense boundary z Skeleton z shadcn/ui (loading state)
- Error boundary z error.tsx (jeśli pobranie się nie uda)

Po skończeniu uruchom dev server, sprawdź czy działa.
```

### Workflow #6: RLS — najwięcej błędów dla początkujących

Row Level Security to **paragraf**, w którym 90% UX-owców popełnia błędy. Claude pomoże, ale musisz wiedzieć kiedy go pytać.

```
Sprawdź wszystkie tabele w naszej bazie pod kątem RLS:

1. Wymień tabele które MAJĄ RLS włączone
2. Wymień tabele które NIE MAJĄ RLS (potencjalna dziura bezpieczeństwa)
3. Dla każdej z RLS — pokaż policies i oceń czy są sensowne
4. Wskaż tabele gdzie powinniśmy dodać RLS

Format raportu: tabela markdown.
```

> **Reguła kciuka:** **wszystkie** Twoje tabele aplikacyjne powinny mieć RLS. Bez RLS każdy z anonimowym kluczem może wszystko czytać/pisać. **To jeden z najczęstszych "głośnych" błędów AI-driven Product Builderów.**

### Anti-patterns Supabase

❌ **`supabase db reset` na produkcji** — kasuje wszystkie dane. Mamy w `deny` permissions, ale uważaj.

❌ **Edytowanie istniejącej migracji po jej zastosowaniu** — psuje historię. **Zawsze nowa migracja.**

❌ **`select *` w queries** — pobierasz pola których nie używasz. Selecting jawne kolumny.

❌ **Brak indexów na często-filtrowanych polach** — wolne queries. Pytaj Claude'a: *"Sprawdź czy mamy odpowiednie indexy na pola po których filtrujemy."*

---

## Część 10: Workflow — Deployment na Vercel

### Setup (jednorazowo)

Plugin Vercel:

```
> /plugin install vercel@claude-plugins-official
```

Login Vercel CLI (jeśli jeszcze nie):

```bash
$ vercel login
```

### Workflow #1: Pierwszy deploy

```
Wdróż nasz projekt na Vercel:

1. Sprawdź czy jest .gitignore (nie wrzucamy node_modules, .env.local)
2. Zrób commit wszystkiego w git (jeśli są niecommitowane zmiany)
3. Wepchnij do nowego repo GitHub (jeśli go nie ma — utwórz)
4. Połącz repo z Vercel (vercel link)
5. Skonfiguruj environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
6. Uruchom pierwszy deploy

Po skończeniu daj mi URL produkcyjnej aplikacji.
```

Claude poprowadzi Cię przez interaktywne pytania Vercel CLI — odpowiadasz "y" do większości.

### Workflow #2: Environment variables (sekrety)

```
Dodaj zmienne środowiskowe do projektu Vercel:

- NEXT_PUBLIC_SUPABASE_URL = [skopiuj z .env.local]
- NEXT_PUBLIC_SUPABASE_ANON_KEY = [skopiuj z .env.local]
- SUPABASE_SERVICE_ROLE_KEY = [TYLKO w server-side, NIE z prefiksem NEXT_PUBLIC]

Dodaj dla wszystkich środowisk: production, preview, development.

Nie pokazuj wartości w terminalu po dodaniu (security).
```

> **NEXT_PUBLIC_** prefix = zmienna dostępna w przeglądarce (frontend). Bez prefiksu = tylko server-side. **Nigdy** nie nadawaj prefiksu kluczowi `service_role` — to klucz administracyjny do bazy.

### Workflow #3: Preview deployments

Każdy push do brancha innego niż `main` daje **automatyczny preview URL**. Świetne do code review.

```
Stwórz nowego brancha "feature/nowy-checkout".
Zaimplementuj na nim funkcjonalność [opis].
Zrób commit i push.
Daj mi preview URL z Vercel po skończeniu.
```

Claude wykona:
1. `git checkout -b feature/nowy-checkout`
2. Implementacja
3. `git add . && git commit -m "feat: nowy checkout"`
4. `git push origin feature/nowy-checkout`
5. Vercel automatycznie zrobi preview build i da URL

### Workflow #4: Custom domain

Po pierwszym deploy:

```
Podepnij domenę fashionhero.pl do produkcyjnego deploymentu.

1. Pokaż mi co muszę dodać w panelu mojego rejestratora domeny (DNS records)
2. Po dodaniu DNS — zweryfikuj że Vercel widzi domenę
3. Skonfiguruj redirect: www.fashionhero.pl → fashionhero.pl
4. Wymuś HTTPS dla wszystkich requestów
```

### Anti-patterns Vercel

❌ **Pierwszy deploy bezpośrednio na production** — zawsze najpierw preview deployment, sprawdź wizualnie.

❌ **Build action local różny od production** — Vercel buduje w Linux, nie macOS. Pewne rzeczy działają lokalnie a fail-ują w deploy. **Zawsze przed deployem:** `npm run build` lokalnie.

❌ **Brak monitoringu** — Vercel wysyła emaile o failed deployach, ale logi runtime też warto sprawdzać. *"Pokaż mi logi z ostatnich 50 requestów na produkcji"*.

---

## Część 11: Workflow — GitHub w całym procesie

### Setup (jednorazowo)

```
> /plugin install github@claude-plugins-official
```

GitHub CLI już masz z poprzedniej instrukcji.

### Workflow standardowy: feature → PR → merge

#### Krok 1: Nowa praca = nowy branch

```
Zacznij pracę nad nową funkcjonalnością "system recenzji produktów".

1. Sprawdź czy jestem na main (jeśli nie — switchuj)
2. Pull najnowszy main
3. Stwórz nowy branch: feature/system-recenzji
4. Wypisz mi co zamierzasz zaimplementować
5. NIE pisz jeszcze kodu — czekaj na "ok"
```

#### Krok 2: Implementacja iteracyjnie z commitami

Po każdym logicznym kroku:

```
Zrób commit aktualnych zmian. Wiadomość commit:
- Po polsku
- Tryb opisowy ("dodaje formularz recenzji")
- Bez "feat:", "fix:" prefiksów (chyba że używamy konwencjonalnych commits)

Po commicie pokaż git log -5 żebym widział ostatnie commity.
```

Lub jeśli używasz konwencjonalnych commits (z pluginu `commit-commands`):

```
> /commit
```

#### Krok 3: Push i PR

```
Zrób push aktualnego brancha do origin.

Następnie utwórz PR (gh CLI):
- Tytuł: "Dodaje system recenzji produktów"
- Opis (markdown):
  ## Co zmienia
  [Lista zmian — wygeneruj z git log brancha]

  ## Jak testować
  1. [Konkretne kroki]

  ## Screenshots
  [Placeholder — uzupełnij po wrzuceniu screenshotów]

- Reviewer: [moj-loginek-github] (jeśli pracuję sam, jako self-review)
- Label: "feature"

Daj mi URL PR-a.
```

#### Krok 4: Code review (z asystą AI)

Claude może zrobić **wstępny review** Twojego kodu zanim wrzucisz na review zespołowi:

```
> /plugin install code-review@claude-plugins-official

> Zrób code review aktualnego brancha (vs main).
  Skup się na:
  - Czytelność (czy dobrze nazwane?)
  - Bezpieczeństwo (czy nie ma leaked secrets / SQL injection / XSS?)
  - Performance (czy nie ma N+1 queries / unnecessary re-renders?)
  - Zgodność z @CLAUDE.md (czy trzymamy konwencji?)

  Format: lista issues z priorytetem (high/medium/low) i sugerowaną poprawką.
```

#### Krok 5: Merge

Po akceptacji review:

```
Zmerge'uj PR #123 do main:
1. Squash & merge (zostawiamy czystą historię)
2. Skasuj branch po merge
3. Switchuj na main, pull najnowsze
4. Sprawdź że Vercel zaczął deploy production
```

### Workflow z Issues

GitHub Issues to świetny tracker zadań — Claude może czytać i implementować bezpośrednio z opisu issue:

```
Implementuj GitHub issue #45 z naszego repo.

1. Pobierz opis issue (gh issue view 45)
2. Stwórz nowy branch: feature/issue-45-[krótki-tytuł]
3. Zaimplementuj zgodnie z opisem
4. Po skończeniu — utwórz PR i podlinkuj issue ("Closes #45")
```

### Workflow: AI-asystent w Issues (advanced)

GitHub plugin daje też **odwrotny kierunek** — Claude może komentować issues, robić PR-y, etc.

```
Mam issue #67 "Strona główna ładuje się 8 sekund".

1. Zdiagnozuj problem (przejrzyj kod strony głównej)
2. Skomentuj issue z analizą:
   - Co znalazłeś
   - 3 propozycje poprawy (od najszybszej do najbardziej kompleksowej)
   - Sugerowany plan działania
3. NIE implementuj jeszcze — czekam na decyzję jaką opcję wybrać.
```

### Anti-patterns GitHub

❌ **Wszystko commitujesz na main** — pierwsze przy review znajdziesz kosztowne błędy. Branche są tanie. Używaj.

❌ **`git push --force` na shared branche** — niszczy historię cudzych zmian. Mamy w `deny`, ale ludzie i tak próbują.

❌ **Commit message "wip", "fix", "asdf"** — za miesiąc nie znajdziesz czego dotyczył commit. Pisz **co** robi commit, nie że "fix".

❌ **Brak PR description** — pusty PR = brak kontekstu dla reviewerów. Nawet self-review zasługuje na opis. Claude może to wygenerować z `git log` brancha.


---

## Część 12: Best practices dla UX-owca

Po roku pracy z Claude Code, oto wzorce które działają — i pułapki, które kosztują dni pracy.

### Co robić ✅

**1. Zacznij każdą sesję od `/init` lub aktualizacji `CLAUDE.md`.** Im lepszy CLAUDE.md, tym lepsze każde wykonanie. Spędź 30 minut tygodniowo na jego polerowaniu.

**2. Małe iteracje > duże skoki.** Jedna funkcjonalność per sesja. Po skończeniu — `/clear` i nowa sesja. Nie ciągnij 3-godzinnej rozmowy.

**3. Plan mode przed dużymi zmianami.** `Shift + Tab` x2. Pozwól Claude'owi zaproponować plan, krytykuj, potem wykonaj.

**4. Commit przed każdym dużym promptem.** Świeży `git commit` = możesz cofnąć **wszystko** co Claude zrobi w następnym kroku, jednym `git reset --hard HEAD`.

**5. Czytaj diff przed commitem.** `git diff` lub w VS Code Source Control. Claude pisze szybko, ale czasem dopisze rzeczy których nie prosiłeś.

**6. `/compact` co 30-60 minut aktywnej pracy.** Skompresuje historię, zostawi najważniejsze. Bez tego Claude zaczyna "zapominać" wcześniejsze ustalenia.

**7. Inwestuj w skille zamiast w długie prompty.** Jeśli powtarzasz tę samą instrukcję trzeci raz — zrób z niej skill. Raz piszesz, używasz wiecznie.

**8. Zostań w jednym stacku przez długi czas.** Claude jest dobry w Next.js + Tailwind + Supabase — bo cała społeczność tego używa. Nie kombinuj z egzotycznymi narzędziami zanim opanujesz mainstream.

**9. Voice-to-prompt dla pomysłów.** Mów do telefonu jak do kolegi, transkrybuj, wklejaj do Claude'a z prośbą o ułożenie technicznego prompta.

**10. Zapisuj udane prompty.** Trzymaj plik `prompty.md` w projekcie albo w Notion. Co 3 miesiące przeglądaj — które najczęściej używasz, które warto zamienić w skill.

### Czego nie robić ❌

**1. Nie wierz na ślepo.** Claude może napisać kod który "wygląda dobrze" ale nie działa. **Twoja rola:** uruchom, kliknij, sprawdź każdy edge case który prosiłeś.

**2. Nie pomijaj `git`.** Nawet w jednoosobowym projekcie używaj branche'y i commitów. Inaczej pierwszy zły prompt = wieczór odzyskiwania.

**3. Nie commituj `.env.local`.** Sekrety lecą do GitHuba i są tam **na zawsze** (nawet po usunięciu — historia zostaje). Sprawdź `.gitignore` przed pierwszym commitem.

**4. Nie ufaj że `npm install` jest darmowe.** Każda nowa biblioteka = nowy attack surface. **Pytaj Claude'a:** *"Pokaż mi co dodałeś do package.json i wyjaśnij każdą bibliotekę."*

**5. Nie deploy'uj bez `npm run build` lokalnie.** Vercel build zawodzi czasem, lokalnie złapiesz to za darmo.

**6. Nie pomijaj RLS w Supabase.** Każda tabela bez RLS = potencjalny wyciek danych. Pytaj Claude'a o RLS audit raz w miesiącu.

**7. Nie instaluj 20 pluginów "na zapas".** Każdy zżera kontekst. 3-5 dobrze dobranych > 20 nieużywanych.

**8. Nie pisz promptów w stylu "popraw to".** Co konkretnie poprawić? Co zostawić? Bez precyzji Claude zgadnie. Zła interpretacja = stracony czas.

**9. Nie trzymaj się Claude'a gdy idzie w złą stronę.** `Ctrl + C`. Nowy prompt. Lepszy prompt. Tani reset.

**10. Nie zapominaj że to wciąż Twój produkt.** Claude jest narzędziem. Zła decyzja architektoniczna podjęta przez Claude'a, którą zaakceptowałeś — to **Twoja** decyzja.

### Mental model: Claude jako stażysta

Wyobraź sobie, że masz utalentowanego stażystę-developera:
- **Pisze kod 100x szybciej niż Ty** (jeśli kiedyś próbowałeś)
- **Zna wszystkie biblioteki świata**, ale nie zna **Twojego** produktu
- **Robi co mu każesz**, czasem z nadgorliwością
- **Nie ma context'u biznesowego**, jeśli mu nie powiesz
- **Czasem się myli**, szczególnie w niuansach

Twoja rola = **lider techniczny**. Dajesz kierunek, weryfikujesz output, podejmujesz decyzje strategiczne. Stażysta wykonuje.

To brzmi jak ciężka praca i taka jest. Ale **dziesiątkom UX-owców** to pozwala dziś realizować pomysły, które wcześniej wymagały zatrudnienia developerów albo czekania pół roku w kolejce.

---

## Część 13: Najczęstsze problemy i rozwiązania

### "Claude nie widzi mojego pliku"

```
> Tak: @src/components/karta-produktu.tsx zmień...
```

Sprawdź:
1. Czy plik istnieje? (`ls src/components/`)
2. Czy ścieżka jest dokładna? (case-sensitive!)
3. Czy jesteś w głównym folderze projektu? (`pwd`)

### "Claude robi co innego niż prosiłem"

3 najczęstsze przyczyny:
1. **Niejednoznaczny prompt** — "popraw stronę" → co poprawić?
2. **Brak kontekstu w `CLAUDE.md`** — Claude zgaduje konwencje
3. **Pełen kontekst** — Claude zapomina to co było 100 wiadomości temu. `/compact` lub nowa sesja.

### "Claude zaczął nie odpowiadać / zamarł"

```
Ctrl + C    (przerwij aktualną akcję)
Ctrl + C    (przerwij ponownie jeśli trzeba)
/compact    (skompresuj kontekst)
```

Jeśli wszystko zawiedzie:

```
/exit
```

i uruchom `claude` od nowa. Stracisz historię tej sesji, ale projekt + `CLAUDE.md` zostaje.

### "Build/deploy nie działa, lokalnie ok"

99% to **różnica środowisk**:
- Lokalnie macOS, Vercel buduje na Linuxie (case-sensitive paths!)
- Lokalnie masz `.env.local`, na Vercel musisz dodać environment variables w panelu
- Lokalna baza Supabase ≠ produkcyjna (różne schematy, różne dane)

Prompt:
```
Build na Vercel zawodzi z błędem: [wklej całe logi z Vercel].
Lokalnie `npm run build` przechodzi.

Zdiagnozuj problem i zaproponuj fix.
```

### "Claude sugeruje rozwiązanie którego nie rozumiem"

To **ważny moment** dla UX-owca. **Nie akceptuj na ślepo.**

Prompt:
```
Wyjaśnij mi co zaproponowałeś jak komuś nietechnicznemu:
- Co ten kod robi w 2 zdaniach
- Dlaczego ta opcja a nie inna
- Jakie są ryzyka tej decyzji
- Czy istnieje prostsza alternatywa
```

Czasem prosta alternatywa istnieje. Czasem nie i Claude miał rację. Ale **rozumiesz** decyzję.

### "Skończyły mi się tokeny / sesja jest 'pełna'"

Claude Pro ma limity miesięczne. Gdy widzisz "session limit reached":

1. `/compact` — skompresuj aktualną sesję
2. `/exit` i `claude` od nowa — czysty start
3. Sprawdź `/cost` — ile zostało
4. Rozważ upgrade do Max ($100/mc) jeśli regularnie hitujesz limit

### "Claude pisze kod, który psuje istniejące funkcje"

Symptom: dodajesz X, ale Y przestało działać.

Przyczyna: Claude nie wie o całym kodzie, edytuje "z głowy".

**Prevention:**
1. Dobry `CLAUDE.md` z opisem ważnych miejsc
2. **Testy** (Claude może je napisać też) — łapią regresje
3. Po każdej dużej zmianie: kliknij wszystkie kluczowe ścieżki user-flow

**Fix gdy się stało:**
```
Po implementacji X — funkcja Y przestała działać.

Repro:
1. [kroki do błędu]

Przeanalizuj co zmieniłeś w ostatniej sesji
(@git log --since="1 hour ago" --stat)
i zaproponuj fix który nie psuje X.
```

### "Zainstalowałem plugin ale Claude go nie używa"

3 sprawdziany:
1. `/plugin list` — czy jest na liście "Installed"?
2. **Restart Claude Code** — pluginy wczytują się przy starcie
3. **`description` w pluginie** — może niepasujący do Twoich promptów

Jeśli wszystko ok ale plugin nie aktywuje się sam, **wywołaj go bezpośrednio**:

```
> Użyj skilla `figma-frame-to-code` do zaimplementowania tego ekranu...
```

### "Jak wrócić do stanu sprzed godziny?"

Git uratuje życie:

```bash
$ git log --oneline                    # zobacz commity
$ git reset --hard <hash-commita>      # wróć do tego commita (DESTRUKCYJNE!)
```

Lub bezpieczniej:
```bash
$ git checkout <hash-commita>          # wejdź w "stan z tamtego momentu" (read-only)
```

Jeśli **jeszcze nie commitowałeś** swoich zmian — `git stash` zachowuje pracę:

```bash
$ git stash                # schowaj aktualne zmiany
$ git stash pop            # przywróć je później
```

---

## Część 14: Techniki zaawansowane — Spec-driven development

> **Dla kogo ta część:** Masz za sobą pierwsze 5-10 zaimplementowanych funkcjonalności z Claude Code. Wiesz że "vibe coding" działa szybko, ale czasem produkuje 80% trafienia + 20% przepisywania. Szukasz wyższego biegu.

### Czym jest spec-driven development w jednym zdaniu

**Najpierw piszesz precyzyjną specyfikację tego CO chcesz zbudować (w języku naturalnym), Claude Code zamienia ją na plan techniczny, dopiero potem powstaje kod.**

To **przeciwieństwo** typowego workflow: prompt → kod → "hmm, nie tak miało być" → poprawki → znowu nie tak → frustracja.

### Trzy fazy

| Faza | Co robisz | Co dostajesz |
|---|---|---|
| **1. Specyfikacja** | Opisujesz CO ma robić produkt (user stories, kryteria akceptacji, edge cases) — bez słowa o tym JAK | Plik `specs/[nazwa].md` |
| **2. Plan** | Claude czyta spec i proponuje JAK (architektura, komponenty, schema bazy, kolejność implementacji) | Plik `specs/[nazwa]-plan.md` |
| **3. Implementacja** | Claude pisze kod według zatwierdzonego planu, krok po kroku, z osobnymi commitami | Działający kod + commity |

**Klucz:** między każdą fazą jest **bramka akceptacji** — Ty czytasz, krytykujesz, korygujesz. Claude nie idzie dalej, dopóki nie powiesz "ok".

### Czemu UX-owcowi to pasuje

To jest workflow, który **już znasz** — tylko z innej strony stołu:
- **Specyfikacja** = PRD / brief, który pisałeś dla developerów
- **Plan** = techniczny breakdown, który robił dla Ciebie tech lead
- **Implementacja** = robota, którą wykonywał zespół developerski

Spec-driven po prostu mówi: **prowadź Claude Code tak, jak prowadziłbyś zespół developerski w klasycznym procesie produktowym.** Nie wrzucaj Slackowych jednolinijkowców do AI z dostępem do Twojego kodu.

### Vibe coding vs spec-driven — porównanie czasu

```
VIBE CODING (typowy start):
"Dodaj profil użytkownika"
→ Claude zgaduje pola, schema, RLS, UX
→ 80% trafi, 20% trzeba przepisać
→ łączny czas: 2h, frustracja: wysoka

SPEC-DRIVEN:
1. Piszesz spec.md (15 min) — dokładne pola, kto widzi, edge cases
2. Claude tworzy plan.md (5 min) — Ty czytasz, korygujesz (10 min)
3. Claude implementuje według planu (30 min)
→ łączny czas: 1h, frustracja: niska
```

**Trade-off:** spec-driven wymaga, żebyś **pomyślał zanim zaczniesz**. Pierwsza godzina jest nudniejsza. Ale druga, trzecia i wszystkie kolejne są szybsze i mniej bolesne.

### Praktyczny workflow — krok po kroku

#### Krok 1: Stwórz folder `specs/` w projekcie

Spec-driven żyje w plikach markdown w Twoim repo. Razem z kodem, w gicie, dla Ciebie i Claude'a.

```bash
$ mkdir specs
$ touch specs/README.md
```

W `specs/README.md` jedna linijka kontekstu: *"Folder zawiera specyfikacje funkcjonalności. Każdy plik = jedna funkcjonalność. Pliki commitowane do gita razem z kodem."*

#### Krok 2: Napisz pierwszy `spec.md`

Wzór, którego polecam się trzymać (przykład dla profilu sprzedawcy w marketplace modowym):

```markdown
# Spec: Profil sprzedawcy

## Po co
Sprzedawcy potrzebują widocznej karty profilu, żeby kupujący widzieli
od kogo kupują (zwiększa zaufanie, zmniejsza zwroty).

## User stories

### US-1: Sprzedawca tworzy profil
- Jako: zalogowany sprzedawca
- Chcę: wypełnić dane mojego profilu (nazwa marki, opis, logo, lokalizacja)
- Aby: kupujący wiedzieli kim jestem

### US-2: Kupujący widzi profil sprzedawcy
- Jako: kupujący na karcie produktu
- Chcę: kliknąć w nazwę sprzedawcy i zobaczyć jego stronę
- Aby: ocenić wiarygodność przed zakupem

## Pola profilu

| Pole | Typ | Wymagane | Walidacja |
|---|---|---|---|
| nazwa_marki | text | Tak | 2-50 znaków |
| opis | text | Nie | max 500 znaków |
| logo_url | url | Nie | obrazek z Supabase Storage |
| miasto | text | Nie | lista miast PL |
| rok_zalozenia | int | Nie | 1900-aktualny rok |
| www | url | Nie | poprawny URL |

## Reguły dostępu (RLS)
- SELECT: każdy (publiczny katalog sprzedawców)
- UPDATE: tylko właściciel (user_id = auth.uid())
- INSERT: automatyczny przy rejestracji sprzedawcy
- DELETE: nigdy (deactivate flag zamiast usunięcia)

## Edge cases
- Sprzedawca bez produktów → pokaż "Ten sprzedawca nie ma jeszcze ofert"
- Brak logo → pokaż placeholder (inicjały marki)
- Niezalogowany kupujący patrzy na profil → wszystko widoczne, ale przycisk
  "Skontaktuj się" wymaga logowania
- Sprzedawca dezaktywowany → strona "Profil niedostępny"

## Kryteria akceptacji
- [ ] Sprzedawca może wypełnić profil w /panel/profil
- [ ] Profil jest widoczny pod /sprzedawca/[slug]
- [ ] Klik w nazwę sprzedawcy na karcie produktu → otwiera profil
- [ ] Walidacja działa po stronie klienta i serwera
- [ ] Profil ładuje się <500ms (server component, brak client fetch)

## Co JEST poza zakresem (świadomie)
- System wiadomości sprzedawca-kupujący (osobny spec)
- Recenzje sprzedawcy (osobny spec)
- Integracja z Instagramem (kiedyś, nie teraz)
```

**Dlaczego ten format działa:**
- **User stories** dają Claude'owi kontekst kto i po co
- **Tabela pól** to wprost schema do bazy — Claude odczyta 1:1
- **RLS jawnie wypisane** — nie zgaduje
- **Edge cases** zamykają 80% poprawek "a co jak..."
- **"Co JEST poza zakresem"** — chroni przed nadgorliwością Claude'a, który "skoro już tam jest, to dodam też..."

#### Krok 3: Niech Claude wygeneruje plan

```
> Przeczytaj @specs/profil-sprzedawcy.md i wygeneruj plan implementacji.

Plan zapisz w @specs/profil-sprzedawcy-plan.md w formacie:

## Pliki do stworzenia/edycji
- [ścieżka]: [co zawiera]

## Schema Supabase
- Migration SQL (skopiuj gotowy do uruchomienia)
- RLS policies (jawnie napisane)

## Kolejność implementacji (kroki)
1. [Krok atomowy — może być commitowany osobno]
2. ...

## Ryzyka / decyzje wymagające mojej zgody
- [Co? Dlaczego? Jakie opcje?]

NIE pisz jeszcze kodu. Czekam na akceptację planu.
```

Claude wytworzy plan. **Czytasz go uważnie.** Najczęstsze rzeczy do skorygowania:
- Pomylił/uprościł edge case
- Zaproponował 5 commitów, kiedy logiczniej zrobić 3
- Zignorował coś z "poza zakresem" i włożył to w plan
- Dodał technologię, której nie chcesz (np. zewnętrzna biblioteka)

Iteracja po planie:

```
> W kroku 3 zaproponowałeś użycie React Hook Form. Mamy w CLAUDE.md
że trzymamy się natywnego form action z Next.js Server Actions.
Popraw plan. Reszta ok.
```

#### Krok 4: Implementuj krok po kroku

```
> Wykonaj krok 1 z @specs/profil-sprzedawcy-plan.md.
Po skończeniu zrób commit z message zaczynającym się od
"[profil-sprzedawcy krok 1]". Nie przechodź do kroku 2.
```

Sprawdzasz w przeglądarce, czytasz diff, dajesz feedback lub:

```
> Krok 1 ok. Wykonaj krok 2.
```

I tak do końca. **Każdy krok = osobny commit z prefixem.** Łatwo się cofnąć, łatwo się odnaleźć w historii.

#### Krok 5: Po skończeniu — retrospekcja w spec'u

```
> Wszystkie kroki wykonane. Zaktualizuj @specs/profil-sprzedawcy.md:
- Odznacz wszystkie kryteria akceptacji jako spełnione
- Dodaj sekcję "Notes from implementation"
  z rzeczami, które wyszły inaczej niż plan
- Dodaj link do PR-a, który to dostarczył
```

Spec staje się **dokumentacją tego, co masz w produkcie.** Nie tylko intencji, ale też rzeczywistości.

### Trzy template'y warte trzymania w `specs/_templates/`

#### Template `feature.md` — nowa funkcjonalność
Format jak wyżej (User stories + Pola + RLS + Edge cases + Kryteria akceptacji + Co poza zakresem).

#### Template `change.md` — zmiana istniejącej funkcjonalności

```markdown
# Change: [nazwa]

## Aktualny stan
[Jak działa teraz — link do oryginalnego spec'u jeśli był]

## Co zmieniamy
[Konkretnie — przed → po]

## Czego NIE ruszamy
[Lista]

## Migracja danych
[Jeśli zmiana dotyka istniejących danych — co z nimi]

## Backward compatibility
[Stare API/URL/dane — łamiemy czy zachowujemy?]
```

#### Template `experiment.md` — eksperyment (czasowy)

```markdown
# Experiment: [nazwa]

## Hipoteza
[Co zakładamy, że się stanie i dlaczego]

## Sukces / porażka
- Sukces: [metryka i próg]
- Porażka: [metryka i próg]

## Czas trwania
[Od kiedy do kiedy — daty]

## Plan rollbacku
[Co i jak cofamy, jeśli porażka — feature flag? branch? wersja?]
```

### Spec Kit — narzędzie do automatyzacji (advanced)

**Spec Kit** to projekt open-source, który formalizuje ten workflow w postaci slash commands w Claude Code. Instalujesz go i dostajesz komendy:

| Komenda | Co robi |
|---|---|
| `/specify` | Pomaga napisać spec interaktywnie (zadaje pytania, ułożone w struktury) |
| `/plan` | Generuje plan z aktywnego spec'u |
| `/tasks` | Rozbija plan na atomowe zadania |
| `/implement` | Wykonuje zadania kolejno z checkpointami |

> **Dla początkującego UX-owca nie polecam zaczynać od Spec Kit.** Zacznij od ręcznego workflow opisanego wyżej — zrozumiesz **dlaczego** każda faza istnieje. Dopiero kiedy masz 5-10 zrobionych spec'ów manualnie i czujesz, co działa — sięgnij po Spec Kit jako automatyzację.
>
> Reguła: **najpierw zrozum proces, potem go zautomatyzuj.** Inaczej jesteś w sytuacji, w której narzędzie robi za Ciebie myślenie, a Ty nie wiesz, kiedy się wyłamać.

### Kiedy spec-driven NIE pasuje

Bądźmy uczciwi — to nie jest pattern na wszystko:

| Kiedy | Co robić zamiast |
|---|---|
| Eksperyment / prototyp na 2h | Vibe coding — jednolinijkowy prompt, szybki feedback |
| Bug fix oczywisty (typo, kolor, padding) | Bezpośredni prompt z `@plik` — bez ceremonii |
| Refaktoring kosmetyczny | Bezpośredni prompt — Claude widzi kod, wie co poprawić |
| Eksploracja "jak to się robi w X" | Czat / pytanie do Claude'a, bez plików spec |

**Spec-driven kosztuje czas z góry.** Opłaca się, gdy:
- Funkcjonalność dotyka wielu plików (3+)
- Są dane (Supabase, RLS, migracje)
- Są edge cases, które łatwo przeoczyć
- Robisz to w zespole / pokazujesz innym
- Wracasz do funkcjonalności po tygodniach (spec to też dokumentacja)

### Mental model

Tradycyjnie: PM pisał PRD → developer czytał → kodował → wracał z pytaniami.

Spec-driven z Claude Code: **Ty piszesz PRD → Claude czyta → koduje → wraca z pytaniami.** Identyczny proces, tylko developer jest inny (Claude). Twoja umiejętność pisania dobrego PRD przekłada się 1:1 na jakość kodu, który dostaniesz.

To **dobra wiadomość dla UX-owców** — pisanie wymagań jest naszym natywnym językiem. Vibe coding wymaga umiejętności technicznych (wiedzieć jak coś zbudować, żeby dobrze sprompować). **Spec-driven używa Twoich istniejących produktowych umiejętności** i przerzuca techniczność na Claude'a.

---

## Część 15: Trzy środowiska Claude Code — CLI, Desktop, IDE

W całej tej instrukcji mówiliśmy o Claude Code w **terminalu** (CLI). To nie jedyne miejsce, w którym Claude Code żyje. Od kwietnia 2026 dostępne są trzy środowiska, każde z innym charakterem i każde z innym workflow.

### Przegląd: trzy środowiska, jeden silnik

| Środowisko | Forma | Najlepsze do |
|---|---|---|
| **CLI** (`claude` w terminalu) | Czysty terminal, tekst | Skrypty, automatyzacja, voice commands, lekkie zadania |
| **Desktop** (aplikacja Claude → tab "Code") | GUI z panelami, sidebar, embedded browser | Wizualna praca, parallel sessions, podgląd aplikacji |
| **IDE Extension** (VS Code, Cursor, JetBrains) | Panel boczny w edytorze | Edycja kodu w preferowanym IDE |

> **Najważniejsza informacja:** wszystkie trzy środowiska **dzielą tę samą konfigurację**. `CLAUDE.md`, `settings.json`, pluginy, hooki, skille — działają identycznie wszędzie. Zbudowałeś konfigurację z poprzednich części? **Automatycznie działa w Desktop i IDE bez dodatkowej pracy.**

### Środowisko 1: CLI — to czego się uczyliśmy

To jest fundament — Claude Code w czystym terminalu. Cała ta instrukcja pisana z perspektywy CLI.

**Mocne strony:**
- Najlżejsze, najszybsze
- Nadaje się do skryptów (`claude --print "..."`)
- Voice commands (Whisper input)
- Pełna kontrola przez slash commands
- Działa na każdej platformie (macOS, Linux, Windows, SSH)

**Słabe strony dla UX-owca:**
- Brak wizualnego diff'a — `git diff` w terminalu jest trudno czytelny dla osoby nietechnicznej
- Brak wbudowanego podglądu aplikacji — `cmd+tab` do przeglądarki przy każdej zmianie
- Pojedyncza sesja — jak chcesz dwóch tasków równolegle, otwierasz dwa okna terminala

**Werdykt dla UX-owca:** zacznij tutaj, naucz się fundamentów, ale **nie zostawaj jako domyślne środowisko** jeśli wolisz pracę wizualną.

### Środowisko 2: Desktop — sweet spot dla projektanta

Aplikacja Claude (ta sama, którą znasz z claude.ai jako desktop app) ma **trzecią zakładkę: "Code"**. To jest pełnoprawne IDE Claude Code z GUI.

**Jak się tam dostać:**
1. Otwórz aplikację Claude na macOS / Windows
2. Najedź na ikonę "Chat" w lewym górnym rogu — pojawi się menu z trzema zakładkami: **Chat / Cowork / Code**
3. Kliknij "Code"
4. Pierwsza sesja: kliknij "+ New session", wybierz folder projektu

> **Mała pułapka UX:** zakładka "Code" jest schowana za hover'em ikony — wielu kursantów nie wie, że tam jest, dopóki im się tego nie pokaże. **Twoja pierwsza wizyta = znajdź tę zakładkę.**

**Mocne strony Desktop dla UX-owca:**

1. **Wizualny diff viewer** — Claude zmienia kod, widzisz przed/po jak w GitHubie. Można komentować pojedyncze linijki, prosić Claude o poprawki konkretnego fragmentu.

2. **Embedded browser preview** — Claude buduje stronę, **automatycznie uruchamia dev server i pokazuje aplikację w panelu obok**. Zmiana kodu → odświeżenie podglądu → widzisz efekt natychmiast. Bez `cmd+tab`.

3. **Multi-session sidebar** — sidebar po lewej z listą wszystkich aktywnych i archiwalnych sesji. Kliknięcie = przełączenie na inny task. **Każda sesja ma własny Git worktree** — możesz mieć równolegle "feature/auth" i "feature/checkout" bez kolizji.

4. **Drag-and-drop pane layout** — układasz panele jak chcesz: chat po lewej, diff w środku, browser preview po prawej, terminal na dole. Jak Figma — design swojego workspace.

5. **Side chat** (`⌘ + ;`) — boczny czat, który dziedziczy kontekst głównej sesji, ale **nie zaśmieca jej historii**. Idealne do pytań typu "wytłumacz mi co właśnie zrobiłeś" bez przerywania głównego flow.

6. **Integrated terminal** — terminal wbudowany w aplikację, otwierany `Ctrl + \``. Dzieli środowisko z sesją Claude'a — komendy widzą te same pliki, te same zmienne.

7. **Integrated file editor** — kliknij na plik w diff/chat → otwiera się w edytorze w aplikacji. Małe spot-edits bez wychodzenia do VS Code.

**Słabe strony:**

- **Wymaga Git for Windows** na Windows (jednorazowo, instalator)
- **Niedostępne na Linuxie** — tylko macOS i Windows
- **Integrated terminal ma latency** — według testów VentureBeat z kwietnia 2026, czasem nie nadąża z aktualizacją w czasie rzeczywistym. Native terminal jest szybszy.
- **Pierwsze "znalezienie" zakładki Code** wymaga pomocy (hover gesture nie jest oczywisty)

**Werdykt dla UX-owca:** **najprawdopodobniej Twoje docelowe środowisko.** Wizualne, intuicyjne, zachowuje wszystko czego CLI uczyło, dodaje warstwy wizualizacji, których brakowało.

### Środowisko 3: IDE Extension (VS Code / Cursor / JetBrains)

Trzecia opcja — Claude Code jako rozszerzenie w Twoim ulubionym edytorze. Boczny panel z czatem, który widzi pliki w aktualnym workspace.

**Dla kogo:**
- Już mieszkasz w VS Code, Cursor, lub JetBrains i nie chcesz wychodzić
- Wolisz inline diff (zmiany pojawiają się bezpośrednio w plikach edytora) niż osobne okno
- Chcesz mieć Claude jako "kolegę z boku ekranu", nie jako osobne IDE

**Mocne strony:**
- Zero context switch — Claude jest tam gdzie i tak pracujesz
- Inline diff w edytorze — akceptujesz/odrzucasz zmiany linijka po linijce
- Native ecosystem edytora — Twoje extensions, theme, keyboard shortcuts działają

**Słabe strony:**
- Brak wbudowanego browser preview (musisz mieć osobne okno)
- Brak multi-session sidebar (jedna sesja = jedno okno edytora)
- Dla projektanta UX który nie używa VS Code intensywnie — overhead

**Werdykt dla UX-owca:** **niszowe**, chyba że już jesteś biegły w VS Code i chcesz inline diff.

### Tabela porównawcza — szybka pomoc w wyborze

| Funkcja | CLI | Desktop | IDE Extension |
|---|---|---|---|
| **Visual diff** | ❌ (terminal) | ✅ Pełny viewer | ✅ Inline w edytorze |
| **Browser preview wbudowany** | ❌ | ✅ Tak | ❌ |
| **Parallel sessions** | ❌ (osobne okna) | ✅ Sidebar + Git worktrees | ❌ |
| **Plan mode** | ✅ | ✅ | ✅ |
| **Plugins (`enabledPlugins`)** | ✅ | ✅ Pełna parity | ✅ Pełna parity |
| **Hooki (`PreToolUse` etc.)** | ✅ | ✅ | ✅ |
| **CLAUDE.md** | ✅ | ✅ Identycznie | ✅ Identycznie |
| **Voice input** | ✅ Whisper | Limited | Limited |
| **Skryptowalność (`-p`)** | ✅ | ❌ | ❌ |
| **SSH / remote sessions** | ✅ | ✅ macOS+Linux | ❌ |
| **Computer use** (research preview) | ❌ | ✅ Tak | ❌ |
| **Side chat** (`⌘ + ;`) | ❌ | ✅ Tak | ❌ |
| **Linux** | ✅ | ❌ | ✅ |

### Konfiguracja jest WSPÓLNA — to nie wymaga osobnego setupu

Wszystkie pliki które stworzyłeś w poprzednich częściach **działają we wszystkich trzech środowiskach automatycznie**:

- `CLAUDE.md` w głównym folderze projektu — **odczytywane przez wszystkie trzy**
- `.claude/settings.json` (uprawnienia + hooki + plugins) — **stosowane wszędzie identycznie**
- `~/.claude/settings.json` (globalne) — **dotyczy wszystkich sesji**, niezależnie od środowiska
- Pluginy zainstalowane przez `enabledPlugins` — **dostępne w każdym środowisku**

> **To jest killer feature:** zbudujesz konfigurację raz (kursant: w trakcie kursu), potem **przełączasz się między CLI a Desktop a VS Code według potrzeby tej konkretnej sesji** bez powielania setupu.

### Przełączanie między środowiskami w trakcie pracy

Czasem zaczynasz w jednym środowisku, ale w trakcie sesji wolisz drugie.

#### CLI → Desktop

W aktywnej sesji CLI:

```
> /desktop
```

Sesja zostaje zapisana, otwiera się aplikacja Desktop z dokładnie tym samym stanem (chat history, kontekst, otwarte pliki). CLI się zamyka. **Działa tylko macOS i Windows.**

#### Desktop → CLI

Z poziomu sesji Desktop, w sidebarze toolbar'a (ikona VS Code w prawym dolnym rogu sesji): **"Continue in" → "Terminal"**. Sesja przechodzi do CLI.

#### Desktop → Web

Te same menu **"Continue in" → "Claude Code on the Web"** wysyła sesję na chmurę Anthropic. Możesz zamknąć laptopa, sesja działa dalej, sprawdzasz progress z telefonu (Claude iOS app) lub claude.ai/code.

#### Równoczesne uruchamianie

Można odpalić **CLI i Desktop jednocześnie na tym samym projekcie** — to dwie osobne sesje, ale dzielą `CLAUDE.md`, `settings.json`, plugins.

**Praktyczny wzorzec:** Desktop dla głównego buildowania (visual diff + browser preview), CLI dla szybkich poleceń typu "uruchom testy" albo skryptów.

### Rekomendowany workflow dla UX-owca w 2026

Po roku obserwacji jak projektanci uczą się Claude Code, **moja rekomendacja**:

1. **Tydzień 1-2: tylko CLI** — naucz się fundamentów. Slash commands, plan mode, permissions, hooki. Bez wizualnych ułatwień. To jest baza.

2. **Tydzień 3+: Desktop jako default** — przerzuć się do aplikacji Desktop dla codziennej pracy. Visual diff + browser preview to gigantyczna dźwignia. CLI zostaw do skryptów i automatyzacji.

3. **Opcjonalnie: VS Code extension** — tylko jeśli i tak intensywnie używasz VS Code i chcesz mieć Claude jako boczny panel.

**Dlaczego nie odwrotnie (Desktop → CLI):**
GUI ukrywa rzeczy, które warto rozumieć — co Claude robi pod spodem, jak działają tools, co znaczy `Continue? (y/n)`. Kursant uczący się tylko z Desktop często ma "magiczny" model myślowy ("klikam, działa") i potem nie wie co zrobić gdy coś się zepsuje. **CLI uczy fundamentów, Desktop daje produktywność.**

### Anti-pattern: zaczynanie od Desktop

Kuszące, bo Desktop wygląda przyjaźniej. Ale:

- Pierwsze błędy są w CLI bardziej zrozumiałe (widzisz dokładny output)
- W Desktop łatwo "zgubić się" w panelach i nie rozumieć co właśnie się stało
- Potem przejście CLI ← Desktop jest trudne, bo przyzwyczajasz się do GUI

**Zacznij od dyskomfortu CLI. Nagrodzisz się Desktop.**

---

## Podsumowanie — Twoja ścieżka

### Pierwsze 7 dni
1. Zainstaluj 5 podstawowych pluginów (figma, supabase, vercel, github, frontend-design)
2. Skonfiguruj permissions (Część 3)
3. Dla każdego nowego projektu — `/init` i edytuj `CLAUDE.md`
4. Zacznij pracować w Normal mode, czytaj każdy diff

### Pierwsze 30 dni
1. Stwórz pierwszy własny skill (np. `prompt-builder` z Części 5)
2. Wypracuj swój zestaw szablonów promptów (Template A/B/C z Części 8)
3. Pierwszy projekt zdeployowany na Vercel z domeną
4. Pierwsze code review zrobione przez Claude'a
5. **Przerzuć się na Desktop jako default środowisko** (Część 15) — visual diff + browser preview to gigantyczna dźwignia

### Pierwsze 90 dni
1. Masz 3-5 własnych skilli odzwierciedlających Twoje procesy
2. CLAUDE.md projektu na 100+ linii — pełen kontekst
3. Plan mode i auto-accept używasz świadomie
4. Możesz prowadzić cały projekt: discovery → projekt → kod → deploy → iteracja

### Co dalej

Zaawansowane tematy do zgłębienia w przyszłości:
- **Sub-agenty (Task tool)** — uruchamianie wielu Claude'ów równolegle dla różnych części zadania
- **Hooks** — automatyczne akcje przy edycji/komicie (np. auto-format, auto-test)
- **Custom MCP servers** — własne integracje z systemami firmowymi
- **Spec Kit** — automatyzacja workflow z Części 14 przez slash commands (`/specify`, `/plan`, `/tasks`, `/implement`)
- **Multi-agent orchestration** — bardziej złożone workflowy

---

**Powodzenia w byciu AI-driven Product Builderem. 🚀**

Pamiętaj: technologia daje Ci możliwości, ale **decyzje produktowe są wciąż Twoje.**
