# Środowisko pracy z terminalem dla projektantów UX

**Kompletna instrukcja krok po kroku — od zera do uruchomienia własnej aplikacji**

---

## Zanim zaczniesz — przeczytaj to najpierw

### Dla kogo jest ta instrukcja
Dla projektantów UX/UI, którzy nigdy (albo prawie nigdy) nie pracowali z terminalem. Po przejściu wszystkich kroków będziesz mieć:
- Działający terminal
- Wszystkie narzędzia developerskie potrzebne do pracy z nowoczesną aplikacją webową
- Uruchomiony własny projekt Next.js z biblioteką komponentów shadcn/ui

### System operacyjny
Instrukcja jest pisana dla **macOS**. Jeśli masz Windows — wszystkie te narzędzia działają, ale ścieżka jest inna (potrzebujesz WSL2 — Windows Subsystem for Linux). W razie potrzeby napisz osobno do osoby technicznej z prośbą o wsparcie przy WSL.

### Ile to zajmie
- **Czysty setup od zera:** 60–90 minut
- **Założenie kont (jeśli ich nie masz):** dodatkowe 15–30 minut

### Co będzie Ci potrzebne
- Komputer Mac z administracyjnymi uprawnieniami (musisz móc instalować rzeczy)
- Stabilny internet
- Hasło do Twojego komputera (terminal poprosi przy instalacji)
- Konta na: GitHub, Anthropic (Claude), Vercel, Supabase — założymy je po drodze

### Złota zasada
**Nie panikuj jeśli coś nie zadziała za pierwszym razem.** Każdy programista przechodził przez ten setup i każdy się wkurzył co najmniej raz. Sekcja na końcu ma rozwiązania najczęstszych problemów.

---

## Część 1: Co to jest terminal i jak go otworzyć

### Co to jest terminal
Terminal to program, który pozwala wydawać komendy komputerowi pisząc tekst zamiast klikać. To wygląda staromodnie, ale jest **dużo szybsze** i pozwala automatyzować rzeczy, których przez kliknięcia byś nie zrobił/a w sensownym czasie.

W terminalu nic się nie dzieje "samo". Wpisujesz komendę → wciskasz Enter → komputer wykonuje → pokazuje rezultat. To wszystko.

### Jak otworzyć terminal na macOS

**Sposób 1 (zalecany — Spotlight):**
1. Wciśnij `⌘ + Spacja`
2. Wpisz: `Terminal`
3. Wciśnij Enter

**Sposób 2:** Finder → Applications → Utilities → Terminal

Powinieneś/aś zobaczyć okno z białym lub czarnym tłem i czymś takim:

```
twoj-komputer:~ twojeimie$
```

To się nazywa **prompt** — terminal czeka na Twoje polecenie.

### Pierwsze komendy do oswojenia (5 minut)

Wpisz każdą z poniższych i wciśnij Enter. **Nie kopiuj znaku `$`** — to tylko symbol promptu.

```bash
$ pwd
```
**Co to robi:** pokazuje gdzie aktualnie "jesteś" w systemie plików. Przy starcie zwykle `/Users/twojeimie`.

```bash
$ ls
```
**Co to robi:** listuje pliki i foldery w aktualnej lokalizacji.

```bash
$ cd Documents
```
**Co to robi:** wchodzi do folderu `Documents`. `cd` = "change directory".

```bash
$ cd ..
```
**Co to robi:** wraca do folderu wyżej. Dwie kropki = "katalog nadrzędny".

```bash
$ mkdir test-folder
```
**Co to robi:** tworzy folder `test-folder` w aktualnej lokalizacji.

### Mini-słownik znaków, które zobaczysz

| Znak | Co znaczy |
|---|---|
| `$` | Prompt — symbol że terminal czeka na Twoje polecenie. **Nie wpisujesz go.** |
| `~` | Twój folder domowy (`/Users/twojeimie`) |
| `/` | Separator w ścieżkach. `/Users/anna/Documents` to "Anna → Documents" |
| `.` | Aktualny folder |
| `..` | Folder wyżej |
| `Ctrl + C` | Przerywa działającą komendę. **Twój przyjaciel.** |

### Orientacja: "katalog/folder/directory" — gdzie aktualnie jesteś

To prawdopodobnie najważniejsza koncepcja w pracy z terminalem. Jeśli ją zrozumiesz, połowa "magii" przestanie być magią.

**Trzy słowa, jedno znaczenie:** "katalog", "folder" i "directory" to dokładnie to samo. Programiści używają ich wymiennie. W tej instrukcji będę głównie pisać **"folder"** (bo to słowo znasz z Findera), ale w komunikatach terminala częściej zobaczysz "directory".

**Twój terminal "siedzi" w jednym folderze na raz.** Wyobraź sobie, że masz Findera otwartego w jakimś folderze — wszystkie operacje (kopiowanie, tworzenie pliku) dotyczą tego folderu. Terminal działa identycznie. Różnica: w Finderze widzisz folder na ekranie, w terminalu musisz go sobie sprawdzić komendą.

**Dwie podstawowe komendy do orientacji:**

```bash
$ pwd
```
**Co to robi:** pokazuje pełną ścieżkę do folderu, w którym aktualnie jesteś. Wyobraź to sobie jako "GPS terminala" — pokazuje gdzie jesteś na mapie systemu plików.

Przykładowy wynik:
```
/Users/anna/Documents/projekty/moj-pierwszy-projekt
```
Czyli: jesteś w folderze `moj-pierwszy-projekt`, który jest w `projekty`, który jest w `Documents`, który jest w folderze użytkownika `anna`.

```bash
$ ls
```
**Co to robi:** pokazuje co jest w bieżącym folderze (pliki i podfoldery). Jak otwarcie Findera — widzisz zawartość.

### Jak się przemieszczać między folderami

Komenda `cd` (change directory) przenosi Cię do innego folderu:

```bash
$ cd projekty            # wejdź do folderu "projekty" wewnątrz aktualnego
$ cd projekty/moj-projekt # wejdź dwa poziomy w głąb naraz
$ cd ..                   # wyjdź jeden poziom wyżej
$ cd ../..                # wyjdź dwa poziomy wyżej
$ cd ~                    # wróć do swojego folderu domowego (/Users/twojeimie)
$ cd                      # to samo co "cd ~" (skrót)
```

**Praktyczna zasada:** zanim wykonasz "ważną" komendę (np. `npm install`, `npx create-next-app`), zawsze sprawdź **gdzie jesteś** komendą `pwd`. Inaczej możesz zainstalować coś w niewłaściwym miejscu i potem szukać tego pół godziny.

### Co się dzieje, gdy zamkniesz i otworzysz terminal

Każde nowe okno terminala startuje **w Twoim folderze domowym** (`~`, czyli `/Users/twojeimie`). Nie pamięta, gdzie byłeś poprzednio.

**Co to oznacza w praktyce:**
- Jeśli pracowałeś nad projektem w `~/Documents/projekty/moj-projekt` i zamknąłeś terminal — następnym razem musisz tam **wrócić ręcznie** komendą `cd ~/Documents/projekty/moj-projekt`.
- To normalne. Profesjonaliści też tak robią — albo używają zakładek/profili w terminalu, żeby zapamiętać projekty.

### Sanity check — sprawdź że to rozumiesz

Otwórz terminal i wykonaj te 4 komendy po kolei. Po każdej zatrzymaj się i pomyśl, co się stało:

```bash
$ pwd                    # 1. Gdzie jestem na starcie?
$ cd Documents           # 2. Wchodzę do Documents
$ pwd                    # 3. Sprawdzam — czy faktycznie jestem w Documents?
$ cd ~                   # 4. Wracam do domu
```

Jeśli za każdym razem `pwd` pokazywało coś innego i wszystko miało sens — masz orientację. Możesz iść dalej.

### Ściągawka nawigacyjna

| Komenda | Co robi | Kiedy użyć |
|---|---|---|
| `pwd` | Pokaż gdzie jestem | **Zawsze** gdy nie masz pewności |
| `ls` | Pokaż co jest w bieżącym folderze | Gdy nie wiesz, czy jesteś w dobrym miejscu |
| `cd nazwa-folderu` | Wejdź do tego folderu | Po `ls` widzisz folder, do którego chcesz wejść |
| `cd ..` | Cofnij się o jeden poziom wyżej | Pomyłka — wszedłeś za głęboko |
| `cd ~` | Wróć do folderu domowego | Zgubiłeś się, chcesz zacząć od nowa |
| `cd ~/Documents/projekty` | Idź bezpośrednio do konkretnej ścieżki | Wiesz dokładnie, gdzie chcesz iść |

> **Złota zasada przed każdą komendą instalacyjną w tej instrukcji:** wpisz `pwd` i sprawdź, czy jesteś tam, gdzie powinieneś. To dosłownie 3 sekundy, a oszczędza godziny szukania błędów.

---

## Część 2: Konta, które założysz po drodze

Lepiej założyć je teraz niż przerywać instalację. Otwórz nową kartę w przeglądarce dla każdego.

| Serwis | Po co | Link |
|---|---|---|
| **GitHub** | Hosting kodu, wersjonowanie | [github.com/signup](https://github.com/signup) |
| **Anthropic / Claude** | Płatne konto Claude (Pro lub Max) — wymagane do Claude Code | [claude.ai](https://claude.ai) → Settings → Plan |
| **Vercel** | Hosting aplikacji webowych | [vercel.com/signup](https://vercel.com/signup) — **zaloguj się przez GitHub**, oszczędzisz sobie roboty |
| **Supabase** | Baza danych + autoryzacja | [supabase.com](https://supabase.com) — **zaloguj się przez GitHub** |

> **Uwaga o Claude Code:** wymaga **płatnego** konta Claude (Pro $20/mc, Max $100-200/mc) lub konta API. Darmowy plan nie wystarczy.

---

## Część 3: Homebrew — menedżer paczek dla Maca

### Co to jest i po co
**Homebrew** to "App Store dla narzędzi developerskich". Zamiast szukać każdego programu osobno, klikać "Pobierz", instalować, aktualizować ręcznie — wpisujesz `brew install nazwa` i Homebrew robi całą robotę.

To **fundament** wszystkiego co dalej. Bez Homebrew większość kroków będzie boleć.

### Instalacja

Skopiuj poniższą komendę, wklej do terminala, wciśnij Enter:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Co się stanie:
1. Terminal poprosi o **hasło do Maca** — wpisz je (znaki **nie będą widoczne** podczas wpisywania, to normalne) i wciśnij Enter.
2. Instalacja potrwa 3–10 minut.
3. Na końcu zobaczysz "Installation successful!" i ewentualnie kilka linijek pod tytułem **"Next steps"** — to ważne.

### Krok po instalacji (na nowych Macach z procesorem Apple Silicon — M1/M2/M3/M4)

Homebrew na nowych Macach prosi o ręczne dodanie się do PATH (mówiąc po ludzku: powiedzenie systemowi "od teraz jak ktoś wpisuje brew, wiedz gdzie tego szukać"). Skopiuj **dwie komendy** które Homebrew Ci pokaże w sekcji "Next steps". Wyglądają tak (Twoje może się minimalnie różnić):

```bash
echo >> ~/.zprofile
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

Wklej i wykonaj.

### Weryfikacja

```bash
$ brew --version
```

Powinno pokazać coś jak `Homebrew 4.x.x`. Jeśli tak — masz Homebrew. Pierwszy bossfight pokonany. ✅

---

## Część 4: Node.js i npm — silnik JavaScriptu

### Co to jest
- **Node.js** to środowisko, które pozwala uruchamiać JavaScript poza przeglądarką (czyli w terminalu, na serwerze).
- **npm** (Node Package Manager) to narzędzie do instalowania bibliotek JavaScriptowych. Instaluje się **razem z Node**.

Bez Node nie zainstalujesz Claude Code, Vercel CLI ani Next.js. To kluczowy klocek.

### Instalacja

```bash
$ brew install node
```

Potrwa 1–3 minuty.

### Weryfikacja

```bash
$ node --version
v22.x.x

$ npm --version
10.x.x
```

Wymagane minimum dla Claude Code to **Node 18+**. Homebrew zainstaluje najnowszą stabilną wersję, więc spokojnie.

---

## Część 5: GitHub CLI (`gh`)

### Co to jest
**GitHub CLI** to oficjalne narzędzie GitHuba do pracy z poziomu terminala. Klonowanie repozytoriów, tworzenie pull requestów, przeglądanie issues — bez konieczności otwierania przeglądarki.

### Instalacja

```bash
$ brew install gh
```

### Logowanie

```bash
$ gh auth login
```

Terminal zada Ci kilka pytań:
1. **What account do you want to log into?** → wybierz `GitHub.com` (strzałkami + Enter)
2. **What is your preferred protocol for Git operations?** → wybierz `HTTPS` (prościej dla początku)
3. **Authenticate Git with your GitHub credentials?** → wybierz `Yes`
4. **How would you like to authenticate?** → wybierz `Login with a web browser`
5. Terminal pokaże Ci **8-znakowy kod**. Skopiuj go.
6. Wciśnij Enter — otworzy się przeglądarka. Wklej kod, autoryzuj.
7. Wróć do terminala — powinno pokazać `✓ Authentication complete.`

### Weryfikacja

```bash
$ gh auth status
```

Powinno pokazać `Logged in to github.com as twojnick`.

---

## Część 6: Supabase CLI

### Tak, Supabase ma CLI
Pełnoprawne, działa świetnie. Pozwala m.in. uruchomić lokalną kopię Supabase, generować typy TypeScript ze schematu bazy, robić migracje.

### Co to jest Supabase
Open-source'owa alternatywa dla Firebase — daje Ci bazę danych PostgreSQL, autoryzację użytkowników, storage plików i API "out of the box". UX-owo: hosting backendu który "po prostu działa".

### Instalacja

```bash
$ brew install supabase/tap/supabase
```

> Tu jest dwa razy słowo `supabase` z `/tap/` w środku — to nie literówka. `tap` to "kolekcja przepisów" Homebrewa, którą Supabase utrzymuje samodzielnie.

### Logowanie

```bash
$ supabase login
```

Otworzy się przeglądarka, zalogujesz się przez konto Supabase, dostaniesz token, potwierdzisz w terminalu.

### Weryfikacja

```bash
$ supabase --version
```

---

## Część 7: Claude Code CLI

### Co to jest
**Claude Code** to AI asystent kodowania od Anthropic, który działa w Twoim terminalu. Czyta Twój kod, edytuje pliki, uruchamia komendy — wszystko w odpowiedzi na polecenia w języku naturalnym ("dodaj przycisk z tym kolorem", "popraw layout na mobile").

### Wymagania
- Node 18+ (już masz ✅)
- **Płatne konto Claude** (Pro / Max / Teams / Enterprise) lub konto API z kredytami

### Instalacja

```bash
$ npm install -g @anthropic-ai/claude-code
```

> **Ważne:** jeśli zobaczysz błąd o uprawnieniach (`EACCES`), **NIE używaj `sudo`**. Idź do sekcji "Najczęstsze problemy" na końcu.

### Pierwsze uruchomienie i autoryzacja

Wejdź najpierw do jakiegoś folderu (Claude Code działa "w kontekście" folderu w którym go uruchomisz):

```bash
$ cd ~/Documents
$ mkdir test-claude
$ cd test-claude
$ claude
```

Przy pierwszym uruchomieniu otworzy się przeglądarka, zalogujesz się przez konto Claude, i wrócisz do terminala. Powinieneś/aś zobaczyć interaktywny prompt Claude'a.

Aby wyjść: napisz `/exit` lub `Ctrl + C` (czasem dwa razy).

### Weryfikacja

```bash
$ claude --version
```

---

## Część 8: Vercel CLI

### Co to jest Vercel
Hosting aplikacji webowych zoptymalizowany pod Next.js (oba narzędzia są od tej samej firmy). Wrzucasz kod → Vercel buduje i wystawia w internecie pod URL-em. Świetne do prototypów i produkcji.

### Instalacja

```bash
$ npm install -g vercel
```

### Logowanie

```bash
$ vercel login
```

Wybierz "Continue with GitHub" — najprościej. Otworzy się przeglądarka, autoryzujesz, wracasz do terminala.

### Weryfikacja

```bash
$ vercel --version
```

---

## Część 9: Twój pierwszy projekt — Next.js + shadcn/ui

Teraz wykorzystamy wszystko co zainstalowaliśmy. Ta część jest najbardziej szczegółowa, bo wymaga najwięcej kroków pod rząd. **Nie spiesz się.**

### Co to jest Next.js
**Next.js** to framework Reacta — zestaw konwencji i narzędzi, dzięki którym budowanie aplikacji webowej jest dużo szybsze niż "od zera". 90% nowoczesnych aplikacji webowych jest pisanych w Next.

### Co to jest shadcn/ui
**shadcn/ui** to zbiór gotowych komponentów UI (przyciski, formularze, dialogi, tabele) — ale **nie biblioteka** w klasycznym sensie. Zamiast `npm install`, kopiujesz kod komponentu **bezpośrednio do swojego projektu**, dzięki czemu możesz go modyfikować jak własny. Bardzo UX-friendly podejście — masz pełną kontrolę nad każdym pikselem każdego komponentu.

### Czego potrzebujesz przed startem

Edytora kodu, w którym zobaczysz pliki projektu. Jeśli jeszcze nie masz — zainstaluj **VS Code**, to najpopularniejszy darmowy edytor:

```bash
$ brew install --cask visual-studio-code
```

Po instalacji warto włączyć komendę `code` (otwieranie projektów z terminala). W VS Code: `⌘ + Shift + P` → wpisz `Shell Command: Install 'code' command in PATH` → Enter.

> **Możesz pominąć VS Code** i edytować pliki innym edytorem (np. Cursor, Sublime Text, nawet TextEdit). Ale w tej instrukcji zakładamy VS Code, bo jest najprostszy.

---

### Krok 1: Przejdź do miejsca, w którym chcesz trzymać projekty

**Sprawdź gdzie jesteś** (zawsze zaczynaj od tego):

```bash
$ pwd
/Users/twojeimie
```

Jesteś w folderze domowym. Teraz utwórz folder `projekty` (jeśli jeszcze go nie masz) i wejdź do niego:

```bash
$ cd ~/Documents
$ mkdir projekty
$ cd projekty
$ pwd
/Users/twojeimie/Documents/projekty
```

> **Co się stało:** wszedłeś do `Documents`, utworzyłeś tam nowy folder `projekty`, i wszedłeś do niego. Od teraz wszystko co zrobisz, dzieje się wewnątrz tego folderu.

### Krok 2: Utwórz nowy projekt Next.js

Wciąż będąc w `~/Documents/projekty` wpisz:

```bash
$ npx create-next-app@latest moj-pierwszy-projekt
```

Terminal zapyta najpierw "Ok to proceed? (y)" — wciśnij **y** + Enter. Potem zada serię pytań konfiguracyjnych:

| # | Pytanie | Odpowiedź | Dlaczego |
|---|---|---|---|
| 1 | Would you like to use **TypeScript**? | **Yes** | Dodaje typy do JS — łapie połowę błędów zanim odpalisz kod |
| 2 | Would you like to use **ESLint**? | **Yes** | Wskazuje błędy w kodzie na bieżąco |
| 3 | Would you like to use **Tailwind CSS**? | **Yes** | shadcn tego wymaga |
| 4 | Would you like your code inside a `src/` directory? | **Yes** | Czystsza struktura — kod oddzielony od configów |
| 5 | Would you like to use **App Router**? | **Yes** | Nowoczesny standard Next.js |
| 6 | Would you like to use **Turbopack**? | **Yes** | Szybszy bundler — krótsze czasy rebuilda |
| 7 | Would you like to customize the import alias? | **No** | Domyślny alias `@/*` jest standardem |

Po odpowiedzi na ostatnie pytanie zacznie się instalacja — potrwa 1–3 minuty. Zobaczysz dużo tekstu przewijającego się na ekranie. **To normalne.** Czekaj aż pojawi się `Success!` i powrót do prompta `$`.

### Krok 3: Wejdź do folderu projektu i sprawdź co się stworzyło

```bash
$ cd moj-pierwszy-projekt
$ pwd
/Users/twojeimie/Documents/projekty/moj-pierwszy-projekt

$ ls
README.md       package.json    src
next.config.ts  postcss.config.mjs  tsconfig.json
node_modules    public          ...
```

> **Wskazówka:** `ls` pokazuje listę "płaską". Jeśli chcesz zobaczyć drzewo, otwórz folder w VS Code (komenda w następnym kroku).

**Struktura folderu projektu, która Ciebie najbardziej interesuje:**

```
moj-pierwszy-projekt/
├── node_modules/          ← biblioteki (nie ruszaj, instaluje się samo)
├── public/                ← obrazki, fonty, ikony statyczne
├── src/
│   └── app/
│       ├── globals.css    ← style globalne (kolory, fonty)
│       ├── layout.tsx     ← wspólny layout (np. nawigacja na każdej stronie)
│       └── page.tsx       ← TWOJA STRONA GŁÓWNA — to będziesz edytować
├── package.json           ← lista bibliotek + skrypty
├── components.json        ← (pojawi się po kroku 5) konfiguracja shadcn
└── tsconfig.json          ← konfiguracja TypeScript
```

### Krok 4: Otwórz projekt w VS Code

W tym samym terminalu, **wciąż wewnątrz folderu projektu** (sprawdź `pwd` jeśli nie masz pewności):

```bash
$ code .
```

Kropka oznacza "aktualny folder". VS Code otworzy się i pokaże całe drzewo plików projektu po lewej stronie.

> **Jeśli `code .` nie zadziała** ("command not found"): wróć do podsekcji "Czego potrzebujesz przed startem" i włącz komendę `code` przez paletę poleceń VS Code. Alternatywnie możesz otworzyć VS Code ręcznie i przeciągnąć folder projektu na ikonę.

### Krok 5: Uruchom serwer deweloperski (sanity check)

Wracamy do terminala. Ciągle będąc w folderze projektu (`pwd` powinien pokazać ścieżkę z `moj-pierwszy-projekt` na końcu), uruchom:

```bash
$ npm run dev
```

Po kilku sekundach zobaczysz:

```
▲ Next.js 15.x.x
- Local:     http://localhost:3000
```

**Otwórz w przeglądarce:** [http://localhost:3000](http://localhost:3000)

Powinieneś/aś zobaczyć startową stronę Next.js z logo. ✅ Jeśli widzisz — Next.js działa.

> **Aby zatrzymać serwer:** w terminalu, w którym działa `npm run dev`, wciśnij `Ctrl + C`. Serwer się zatrzyma, prompt `$` wróci.

### Krok 6: Dodaj shadcn/ui do projektu

**Zatrzymaj serwer** (`Ctrl + C` w terminalu z `npm run dev`). Sprawdź, że wciąż jesteś w folderze projektu:

```bash
$ pwd
/Users/twojeimie/Documents/projekty/moj-pierwszy-projekt
```

Teraz uruchom inicjalizację shadcn:

```bash
$ npx shadcn@latest init
```

Jeśli pojawi się "Need to install the following packages: shadcn@x.x.x, Ok to proceed? (y)" — wciśnij **y** + Enter.

**Pytania, które zada CLI shadcn (CLI v4, stan na 2026):**

| # | Pytanie | Odpowiedź | Dlaczego |
|---|---|---|---|
| 1 | Which color would you like to use as the **base color**? | **Slate** (lub Zinc) | Slate ma lekko niebieskawy odcień, Zinc czysto szary. Oba dobre, kwestia gustu |
| 2 | Would you like to use **CSS variables for theming**? | **Yes** | Pozwala łatwo zmieniać motyw (jasny/ciemny) później |

> **CLI v4 dużo rzeczy auto-wykrywa** (lokalizację `globals.css`, ścieżki, styl) — w 2026 nie ma już większości pytań ze starszych wersji. Jeśli pojawi się dodatkowe pytanie, którego tu nie ma, w 95% przypadków odpowiedź to wartość domyślna (Enter).

**Co się fizycznie stało w projekcie po `init` (zobaczysz w VS Code):**

- ✅ Powstał plik `components.json` w głównym folderze projektu (config shadcn)
- ✅ Powstał plik `src/lib/utils.ts` (helper `cn()` do łączenia klas Tailwind)
- ✅ Plik `src/app/globals.css` został zaktualizowany — dodane zmienne CSS dla kolorów
- ✅ Zainstalowane zostały biblioteki Radix UI i `class-variance-authority` (silnik komponentów shadcn)

### Krok 7: Dodaj komponenty UI

Teraz dodajemy konkretne komponenty: **Button, Card, Input i Label** — to potrzebujemy do zbudowania ekranu logowania (efekt "wow").

```bash
$ npx shadcn@latest add button card input label
```

Każdy komponent dodaje pytanie potwierdzające. Wciśnij Enter (akceptujesz domyślne) lub odpowiedz **y**.

**Co się stało:**

- ✅ Pojawił się folder `src/components/ui/`
- ✅ Wewnątrz są 4 pliki: `button.tsx`, `card.tsx`, `input.tsx`, `label.tsx`
- ✅ To są **kompletne komponenty React**, które możesz teraz edytować jak własne (bo są twoje — nie zewnętrzna biblioteka)

Możesz je obejrzeć w VS Code: `src/components/ui/button.tsx` — to ~50 linii kodu, w pełni czytelnych.

### Krok 8: Wstaw przykładowy ekran logowania

Otwórz w VS Code plik `src/app/page.tsx`. Zobaczysz w nim domyślną stronę startową Next.js (sporo HTML i obrazków).

**Zaznacz całą zawartość pliku** (`⌘ + A`) i **skasuj** (`Delete`). Plik powinien być pusty.

**Wklej poniższy kod:**

```tsx
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Witaj w FashionHero</CardTitle>
          <CardDescription>
            Zaloguj się, aby przejść do panelu sprzedawcy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="ty@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Hasło</Label>
            <Input id="password" type="password" />
          </div>
          <Button className="w-full">Zaloguj się</Button>
          <p className="text-center text-sm text-muted-foreground">
            Nie masz konta? <span className="underline">Zarejestruj się</span>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
```

**Zapisz plik** (`⌘ + S`). To kluczowe — bez zapisu zmiany nie zadziałają.

### Krok 9: Zobacz efekt na żywo

W terminalu (sprawdź `pwd` że jesteś w folderze projektu):

```bash
$ npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000). Powinieneś/aś zobaczyć **wycentrowaną kartę z formularzem logowania**: tytuł, dwa pola (email + hasło), przycisk "Zaloguj się", link rejestracji. Wszystko z piękną typografią, zaokrąglonymi rogami, spójnymi spacingami. ✅

**Co właśnie osiągnąłeś/aś:**

- Działającą aplikację Next.js
- Profesjonalne komponenty shadcn/ui w pełni edytowalne
- Pierwszy realny ekran z design systemu — w 5 minut, nie w 5 godzinach

### Krok 10: Eksperymentuj

Spróbuj teraz coś zmienić, żeby poczuć rytm pracy:

1. W `src/app/page.tsx` zmień tekst `"Witaj w FashionHero"` na cokolwiek innego
2. **Zapisz** (`⌘ + S`)
3. Wróć do przeglądarki — strona się **automatycznie odświeży** z nowym tekstem (to magia Next.js + Turbopack)

Możesz też zmienić kolor tła karty: w `<main>` zamień `bg-slate-50` na `bg-rose-100` (różowy) albo `bg-emerald-100` (zielony) — Tailwind ma setki gotowych kolorów.

> **Uwaga:** Jeśli zmiana nie pojawia się w przeglądarce — sprawdź czy plik jest **zapisany** (kropka przy nazwie pliku w VS Code = niezapisany). I czy serwer `npm run dev` wciąż działa w terminalu.

Aby zatrzymać serwer: `Ctrl + C` w terminalu.

---

## Część 10: Najczęstsze problemy i jak je rozwiązać

### `command not found: brew` (po instalacji Homebrew)

Twój system nie wie, gdzie znaleźć `brew`. Wykonaj te 3 komendy:

```bash
echo >> ~/.zprofile
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

Potem zamknij i otwórz terminal od nowa.

### `EACCES: permission denied` przy `npm install -g`

**NIE używaj `sudo`** — to "rozwiąże" problem ale stworzy dziesięć innych. Zamiast tego skonfiguruj npm tak, żeby instalował w Twoim folderze domowym:

```bash
$ mkdir ~/.npm-global
$ npm config set prefix '~/.npm-global'
$ echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
$ source ~/.zshrc
```

Potem spróbuj `npm install -g ...` ponownie.

### `command not found: claude` (po instalacji Claude Code)

Twój PATH nie zawiera folderu npm-globalnego. Sprawdź gdzie npm trzyma komendy globalne:

```bash
$ npm config get prefix
```

Zobaczysz coś jak `/usr/local` albo `/opt/homebrew`. Dodaj `/bin` do PATH:

```bash
$ echo 'export PATH="/opt/homebrew/bin:$PATH"' >> ~/.zshrc
$ source ~/.zshrc
```

### `Port 3000 is already in use`

Inny proces blokuje port. Albo zatrzymaj go (jeśli wiesz co to), albo uruchom Next na innym porcie:

```bash
$ npm run dev -- -p 3001
```

### Terminal pokazuje "permission denied" przy uruchomieniu `claude` / `vercel` / etc.

```bash
$ chmod +x $(which claude)
```

(Zamień `claude` na nazwę komendy, która nie działa.)

### "Wszystko zepsułem, chcę zacząć od nowa"

Spokojnie. To rzadko jest tak źle, jak się wydaje. Skopiuj **dokładny komunikat błędu** (cały, nie tylko ostatnią linijkę) i wyślij do osoby technicznej lub wrzuć do Claude Code (`claude`) z pytaniem "co to znaczy i jak to naprawić".

### "Komenda nie działa albo robi coś dziwnego" — sprawdź najpierw `pwd`

90% problemów początkujących to bycie w niewłaściwym katalogu. Jeśli `npm run dev` daje błąd "no package.json found" — jesteś za wysoko. Jeśli `cd moj-pierwszy-projekt` daje "no such file or directory" — jesteś za nisko albo w zupełnie innym miejscu.

**Zasada uniwersalna:**

```bash
$ pwd        # gdzie jestem?
$ ls         # co jest wokół mnie?
```

Te dwie komendy powiedzą Ci co potrzebujesz wiedzieć. Po nich już wiesz, gdzie iść (`cd nazwa-folderu` w dół lub `cd ..` w górę).

### Strona nie odświeża się po zmianie pliku

Trzy rzeczy do sprawdzenia po kolei:

1. Czy plik jest **zapisany**? W VS Code kropka • przy nazwie pliku oznacza niezapisane zmiany — wciśnij `⌘ + S`.
2. Czy `npm run dev` wciąż działa w terminalu? Sprawdź — powinno być widać logi. Jeśli nie ma — uruchom ponownie.
3. **Twardy refresh przeglądarki:** `⌘ + Shift + R` (cache czasem trzyma starą wersję).

---

## Część 11: Git i GitHub — wersjonowanie kodu

### Co to jest Git i po co Ci to

**Git** to system kontroli wersji. Wyobraź sobie, że pracujesz nad makietą w Figmie i robisz "checkpoint" co kilka godzin — możesz wrócić do dowolnego z poprzednich stanów, a dwie osoby mogą pracować równolegle bez nadpisywania sobie zmian. Git robi dokładnie to dla kodu, ale **dużo dokładniej** — każda zmiana, kto ją wprowadził, kiedy, dlaczego.

**GitHub** to z kolei serwis, który hostuje repozytoria Gitowe online. Git działa lokalnie na Twoim komputerze, GitHub to "chmura" do współdzielenia.

**Dlaczego musisz to znać jako UX-owiec, który "tylko klikał":**
- Bez Gita nie wdrożysz projektu na Vercela (Vercel ciągnie kod z GitHuba).
- Pracując z developerami — będą mówić "wrzuć na branch", "zrób PR", "pull przed pushem". Bez kontekstu jesteś ślepy.
- Jeśli coś popsujesz w kodzie i nie masz wersji — możesz stracić godziny pracy. Z Gitem wracasz do poprzedniego commita w 5 sekund.

### Jak Git "myśli" — szybka mapa pojęć

| Pojęcie | Co to znaczy |
|---|---|
| **Repozytorium (repo)** | Folder Twojego projektu z włączonym śledzeniem zmian przez Git. |
| **Commit** | "Checkpoint" — zapisana zmiana z opisem co zrobiłeś. To podstawowa jednostka historii. |
| **Branch (gałąź)** | Równoległa wersja projektu. `main` to główna, ale możesz tworzyć nowe (np. do testowania pomysłu). |
| **Remote** | Zdalna kopia repozytorium — zwykle GitHub. Twoje lokalne `main` i zdalne `main` to dwie osobne rzeczy, które trzeba synchronizować. |
| **Push** | Wysłanie Twoich lokalnych commitów na GitHub. |
| **Pull** | Pobranie zmian z GitHuba do Ciebie (np. jak ktoś z zespołu dodał coś). |
| **Clone** | Pobranie istniejącego repozytorium z GitHuba na swój komputer (po raz pierwszy). |

### Konfiguracja Git (jednorazowa, po instalacji)

Git zostaje zainstalowany przy okazji `gh auth login` (Część 5) lub Xcode Command Line Tools. Sprawdź:

```bash
$ git --version
git version 2.x.x
```

Następnie ustaw swoje dane (będą widoczne w historii commitów):

```bash
$ git config --global user.name "Anna Kowalska"
$ git config --global user.email "anna@example.com"
```

> **Email** powinien być ten sam, co używasz na GitHubie. Inaczej Twoje commity będą wyglądać jak od "obcej osoby" w widoku na GitHubie.

Ustaw też `main` jako domyślną nazwę głównej gałęzi (zamiast starszego `master`):

```bash
$ git config --global init.defaultBranch main
```

### Codzienne komendy — pełen workflow

Załóżmy, że pracujesz nad swoim projektem `moj-pierwszy-projekt`. Wszystkie poniższe komendy uruchamiasz **wewnątrz folderu projektu** (`pwd` powinno pokazywać ścieżkę z `moj-pierwszy-projekt` na końcu).

#### 1. `git init` — pierwsza inicjalizacja repozytorium

Tylko **raz**, gdy zaczynasz nowy projekt (jeśli sklonowałeś z GitHuba — Git jest już zainicjalizowany):

```bash
$ git init
Initialized empty Git repository in /Users/twojeimie/projekty/moj-pierwszy-projekt/.git/
```

Co się stało: w folderze projektu pojawił się ukryty folder `.git/` (nie zobaczysz go w Finderze bez `Cmd + Shift + .`). Tam Git będzie trzymać całą historię.

> **Wskazówka:** projekty utworzone przez `create-next-app` mają już `git init` zrobiony automatycznie. Sprawdzisz to komendą `git status` — jeśli odpowiada bez błędu, Git już działa w tym folderze.

#### 2. `git status` — co aktualnie się zmieniło

Najczęściej używana komenda. Pokazuje, które pliki zostały zmienione od ostatniego commita:

```bash
$ git status
On branch main
Changes not staged for commit:
  modified:   src/app/page.tsx
  modified:   src/components/ui/button.tsx

Untracked files:
  new-file.tsx
```

**Co znaczą sekcje:**
- **Changes not staged** — pliki, które zmieniłeś, ale nie powiedziałeś jeszcze Gitowi "weź to do commita".
- **Untracked files** — nowe pliki, których Git jeszcze nie zna.
- **Changes to be committed** — pliki gotowe do zapisania w commicie (po `git add`).

Używaj `git status` **przed każdą inną komendą** — to Twój sanity check (jak `pwd` w terminalu).

#### 3. `git add` — wybierz pliki do następnego commita

```bash
$ git add src/app/page.tsx          # konkretny plik
$ git add src/components/            # cały folder
$ git add .                          # wszystko co się zmieniło (najczęstszy wariant)
```

**Co to robi:** Git dzieli pracę na dwa etapy — najpierw "stagujesz" pliki (mówisz "te zmiany chcę zapisać razem"), potem robisz commit. To pozwala robić selektywne commity (np. zapisać tylko zmiany w stylach, a layout zostawić na później).

Po `git add` sprawdź ponownie `git status` — pliki przeszły do sekcji "Changes to be committed".

#### 4. `git commit` — zapisz checkpoint

```bash
$ git commit -m "Dodaj formularz logowania na stronie głównej"
```

**Co to robi:** zapisuje "checkpoint" wszystkich plików w stage. Flaga `-m` (od "message") to opis commita. **Pisz konkretne, krótkie opisy** w czasie rozkazującym, np.:
- ✅ "Dodaj walidację email w formularzu rejestracji"
- ✅ "Popraw kontrast przycisków na ciemnym tle"
- ❌ "zmiany" (bez kontekstu)
- ❌ "wip" (skrót od work-in-progress, tylko Ty wiesz co tu jest)

> **Po co dobre opisy:** za 3 miesiące będziesz przeglądać historię szukając "kiedy ten przycisk zmienił kolor" — i albo znajdziesz w 5 sekund (dobry opis), albo będziesz przeglądać 50 commitów po kolei (zły opis).

#### 5. `git log` — zobacz historię commitów

```bash
$ git log --oneline
a3f2b1c (HEAD -> main) Dodaj formularz logowania na stronie głównej
8e1d4f2 Popraw kontrast przycisków
2c5a9b3 Initial commit
```

`--oneline` skraca do jednej linii. Bez tego flagi zobaczysz pełne dane (autor, data, pełna wiadomość).

Aby wyjść z widoku `git log`: wciśnij **`q`** (od "quit").

#### 6. `git push` — wyślij commity na GitHub

Najpierw musisz mieć **zdalne repozytorium** podłączone. Najprostszy sposób (przy pierwszym pushu) to użycie GitHub CLI:

```bash
$ gh repo create
```

Otworzy się interaktywny dialog:
1. **Push an existing local repository to GitHub** → wybierz tę opcję
2. Path: `.` (kropka — aktualny folder)
3. Nazwa repo: domyślnie nazwa folderu, możesz zostawić
4. Description: jednolinijkowy opis (opcjonalnie)
5. Visibility: **Private** (na początek — bezpieczniej)
6. Add remote? → **Yes**
7. Push commits? → **Yes**

Po tym wszystko poszło na GitHub. Otwórz w przeglądarce `gh repo view --web` (otworzy stronę repozytorium).

**Kolejne pushe** są już prostsze:

```bash
$ git push
```

#### 7. `git pull` — pobierz zmiany z GitHuba

Jeśli pracujesz z kimś, kto też pcha zmiany do tego samego repozytorium — przed rozpoczęciem swojej pracy synchronizuj się:

```bash
$ git pull
```

Git pobierze najnowsze commity i scali je z Twoją lokalną wersją. **Robisz to każdego ranka przed startem** (jeśli pracujesz w zespole) i **przed każdym pushem**, aby uniknąć konfliktów.

### Branche — równoległa praca nad różnymi rzeczami

Branche to równoległe wersje projektu. Praktyczny przykład: pracujesz na `main` (stabilna wersja), a chcesz przetestować przeprojektowanie nawigacji bez ryzyka, że coś popsujesz.

```bash
$ git checkout -b nowa-nawigacja      # utwórz nowy branch i przełącz się
$ git status                          # potwierdza: "On branch nowa-nawigacja"
```

Robisz zmiany, commitujesz normalnie. Potem:

```bash
$ git push -u origin nowa-nawigacja   # wyślij branch na GitHuba
```

Aby wrócić na główną gałąź:

```bash
$ git checkout main
```

> **Konwencja zespołowa:** developerzy często pracują **wyłącznie na branchach**, a `main` to "stabilna" wersja, do której trafia kod tylko przez **Pull Request** (mechanizm code review). Ale dla solo-projektów wystarczy commitować bezpośrednio na `main`.

### Plik `.gitignore` — co Git ma ignorować

Niektórych rzeczy **nie chcesz** wrzucać do repozytorium:
- Folder `node_modules/` (gigantyczny, każdy go sobie zainstaluje przez `npm install`)
- Pliki `.env` z hasłami i API keys
- Folder `.next/` (build cache)
- Pliki tymczasowe systemu (`.DS_Store` na macu)

`create-next-app` automatycznie tworzy plik `.gitignore` z sensownymi defaultami. Jeśli kiedykolwiek będziesz musiał coś dodać — otwórz `.gitignore` w VS Code i dopisz nazwę pliku/folderu w nowej linii.

### Najczęstsze potknięcia początkujących

| Problem | Rozwiązanie |
|---|---|
| `fatal: not a git repository` | Jesteś w folderze, w którym nie ma `.git/`. Zrób `git init` lub `cd` do właściwego folderu. |
| `Please tell me who you are` przy commicie | Nie ustawiłeś `user.name` i `user.email` (patrz "Konfiguracja Git" wyżej). |
| `rejected (non-fast-forward)` przy push | Ktoś pchnął wcześniej. Zrób najpierw `git pull`, potem `git push`. |
| Przypadkowo zacommitowałeś hasło/token | **PILNE:** zmień ten token natychmiast. Usunięcie z historii Gita to oddzielna operacja — poproś developera o pomoc. |
| `git status` pokazuje 200 zmienionych plików | Najpewniej zmieniłeś coś globalnie (np. format pliku) lub `node_modules/` zostało zacommitowane. Sprawdź `.gitignore`. |

### Workflow w 5 komendach (cheat sheet do druku)

Codzienna pętla wygląda tak:

```bash
$ git pull                                    # 1. pobierz zmiany z GitHuba
# ...robisz pracę w VS Code...
$ git status                                  # 2. zobacz co się zmieniło
$ git add .                                   # 3. zaznacz wszystko do commita
$ git commit -m "Krótki opis zmian"           # 4. zapisz checkpoint
$ git push                                    # 5. wyślij na GitHuba
```

To **80% pracy z Gitem**. Reszta (branche, merge, rebase) przyjdzie naturalnie, jak będziesz tego potrzebować.



Po zakończeniu setupu warto rozważyć:

| Narzędzie | Po co | Instalacja |
|---|---|---|
| **Ghostty** ⭐ | **Zalecany** zamiennik dla Terminala — szybki, nowoczesny, świetne defaults bez konfiguracji | `brew install --cask ghostty` |
| **VS Code** | Edytor kodu (lub edytor plików projektowych) | `brew install --cask visual-studio-code` lub [code.visualstudio.com](https://code.visualstudio.com) |
| **Oh My Zsh** | Ulepszenia dla powłoki Z (kolory, autouzupełnianie) | [ohmyz.sh](https://ohmyz.sh) |
| **iTerm2** | Alternatywa dla Ghostty — bardziej dojrzały, ale starszy i mniej wydajny | `brew install --cask iterm2` |

### Dlaczego Ghostty zamiast iTerm2

**Ghostty** to nowy terminal stworzony przez Mitchella Hashimoto (założyciela HashiCorp). Premiera w grudniu 2024, w ciągu roku zdobył 45 000+ gwiazdek na GitHubie i stał się domyślnym wyborem w nowych setupach developerskich w 2026 roku.

Dla projektantów UX kluczowe są trzy rzeczy:

1. **Świetne ustawienia domyślne** — od pierwszego uruchomienia wygląda i działa dobrze. Nie musisz nic konfigurować.
2. **GPU-accelerated renderowanie (Metal)** — zauważalnie płynniejsze niż iTerm2, szczególnie przy długich logach z `npm run dev`.
3. **Mniejsza złożoność** — iTerm2 ma 15 lat narośli funkcji (Triggers, Python API, tmux integration), których nie potrzebujesz. Ghostty robi mniej, ale to co robi — robi lepiej.

Jedyny minus: Ghostty konfiguruje się przez plik tekstowy (`~/.config/ghostty/config`), a nie przez GUI. W praktyce 80% użytkowników nigdy tego pliku nie otwiera, bo defaults są wystarczające. A jeśli kiedyś będziesz potrzebować coś zmienić — zapytaj Claude Code, da Ci gotową komendę.

### Jak zainstalować i uruchomić Ghostty

Po instalacji Homebrew (Część 3):

```bash
$ brew install --cask ghostty
```

Następnie otwórz Ghostty przez Spotlight (`⌘ + Spacja` → wpisz `Ghostty`) i od tego momentu używaj go zamiast Terminala — wszystkie komendy z tej instrukcji działają identycznie.

> **Uwaga:** Ghostty można zainstalować już po Części 3 (Homebrew), zanim przejdziesz do reszty kroków. To dobry moment na "upgrade" — reszta instalacji będzie się dziać w lepszym terminalu.

---

## Podsumowanie — co masz po przejściu instrukcji

✅ Działający terminal z orientacją w katalogach (`pwd`, `ls`, `cd`)
✅ Homebrew jako menedżer paczek
✅ Node.js + npm
✅ GitHub CLI zalogowane do Twojego konta
✅ Supabase CLI zalogowane
✅ Claude Code CLI zalogowane
✅ Vercel CLI zalogowane
✅ Pierwszy projekt Next.js + shadcn/ui działający lokalnie (z formularzem logowania)
✅ Podstawowy workflow Git (`status`, `add`, `commit`, `push`, `pull`)

Od tego momentu możesz pracować **jak developer**, nawet jeśli nie zamierzasz nim być. Twoje prototypy mogą być żywymi aplikacjami, nie tylko Figmą.

---

## Co dalej

Jeśli chcesz zacząć **realnie używać** tego setupu:

1. **Wrzuć projekt na GitHub** (Część 11) — `gh repo create` w folderze projektu i masz repozytorium online w 60 sekund.
2. **Wypróbuj Claude Code w realnym projekcie** — uruchom `claude` w folderze swojego Next.js i poproś go o dodanie konkretnej funkcjonalności (np. "dodaj walidację email w formularzu logowania").
3. **Wdróż projekt na Vercel** — w folderze projektu uruchom `vercel` i obserwuj jak Twoja aplikacja staje się publicznym URL-em w 60 sekund. Vercel automatycznie zaciągnie kod z Twojego repo na GitHubie.
4. **Eksperymentuj z shadcn** — dodaj kolejne komponenty (`dialog`, `dropdown-menu`, `data-table`) i przerabiaj swój ekran logowania w pełny dashboard.

Powodzenia! 🚀
