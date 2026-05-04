# INSTRUCTOR-SETUP — Jak wgrać tę paczkę jako Template Repository

> **Ten plik jest dla instruktora kursu, nie dla kursantów.** Po wgraniu paczki na GitHub jako template repository — możesz **usunąć ten plik** ze swojego repo na GitHub (lub zostawić, kursanci go zignorują).

---

## Cel

Masz tę paczkę (rozpakowany ZIP albo folder). Chcesz, żeby kursanci mogli **jednym kliknięciem** stworzyć własne repo z tej zawartości — bez clonowania, bez git initu, bez kombinowania.

**Rozwiązanie:** wgrywasz paczkę raz jako **Template Repository** na GitHub. Kursanci klikają **"Use this template"** i mają własne repo w 5 sekund.

---

## Setup — 6 kroków, ~5 minut

### Krok 1: Sprawdź wymagane narzędzia

```bash
which gh        # GitHub CLI
which git       # git
gh auth status  # zalogowany do swojego GitHub?
```

Jeśli `gh auth status` mówi "not logged in":
```bash
gh auth login
# → wybierz GitHub.com → HTTPS → Login with web browser
```

### Krok 2: Wejdź do folderu paczki

```bash
cd /ścieżka/do/fashionhero-claude-starter
pwd     # weryfikacja — powinieneś być w głównym folderze paczki
ls -la  # zobaczysz CLAUDE.md, README.md, .claude/, specs/, docs/, .gitignore, .env.example, INSTRUCTOR-SETUP.md
```

### Krok 3: Inicjalizuj git i stwórz pierwszy commit

```bash
git init -b main
git add .
git commit -m "Initial template setup for AI Product Heroes course"
```

Sprawdzenie:
```bash
git log --oneline
# → 1 commit, wszystkie pliki w środku
```

### Krok 4: Stwórz repo na GitHub

Wybierz nazwę repo. Zalecam **opisową**, np. `fashionhero-claude-starter` lub `aiproductheroes-claude-template`.

```bash
# Repo PUBLICZNE (rekomendowane dla template'u — kursanci muszą widzieć)
gh repo create fashionhero-claude-starter --public --source=. --push --description "Template starter for AI Product Heroes course — Claude Code learning environment for UX designers"
```

Co się stanie:
1. Repo utworzone na Twoim koncie GitHub
2. Lokalne `origin` ustawione na to repo
3. `main` branch wypchnięty

Sprawdzenie:
```bash
gh repo view --web
# → otworzy w przeglądarce, zobaczysz README.md jako stronę startową
```

### Krok 5: ⭐ Włącz "Template repository"

To kluczowe — bez tego "Use this template" nie zadziała.

**Opcja A: Przez stronę GitHub (rekomendowana)**

1. Otwórz repo w przeglądarce: `gh repo view --web`
2. Kliknij **Settings** (zakładka u góry)
3. Scrolluj do sekcji **"General"** → znajdź checkbox **"Template repository"**
4. **Zaznacz** checkbox
5. (Strona zapisze automatycznie)

**Opcja B: Przez API (dla zaawansowanych)**

```bash
gh api -X PATCH repos/TwojLogin/fashionhero-claude-starter -f is_template=true
```

(Zamień `TwojLogin` na własny login GitHub.)

Sprawdzenie:
```bash
gh repo view --web
# → na górze repo zobaczysz zielony przycisk "Use this template"
# → repo pokazuje się z etykietą "Public template"
```

### Krok 6: Test z perspektywy kursanta

Sprawdź że "Use this template" działa:

1. Otwórz repo w przeglądarce
2. Kliknij **"Use this template"** → **"Create a new repository"**
3. Wybierz dowolną nazwę testową, np. `test-uzytkownika-X`
4. **Create repository**

Powinno powstać świeże repo na Twoim koncie z całą zawartością. Po sprawdzeniu — możesz to testowe repo skasować:

```bash
gh repo delete TwojLogin/test-uzytkownika-X --yes
```

✅ **Gotowe.** Teraz wystarczy podać kursantom URL do template'u, np.:
```
https://github.com/TwojLogin/fashionhero-claude-starter
```

---

## Dla kursantów — komunikat do skopiowania

Gdy template jest na GitHub, możesz wysłać kursantom takie info (mail / Slack / kursowa platforma):

> **Materiały do kursu Claude Code dla projektantów UX są gotowe.**
>
> 1. Otwórz: https://github.com/TwojLogin/fashionhero-claude-starter
> 2. Kliknij zielony przycisk **"Use this template"** → **"Create a new repository"**
> 3. Nazwij swoje repo (rekomendacja: `fashionhero-twoje-imie`)
> 4. Wybierz **Private** (wrażliwe dane Supabase będą w `.env.local`)
> 5. **Create repository**
>
> Po stworzeniu repo otwórz `README.md` — masz tam quick start (10 minut).
>
> Pełny przewodnik kursowy znajdziesz w folderze `docs/` swojego repo (44 strony, 15 części).
>
> Powodzenia w byciu AI-driven Product Builderem 🚀

---

## Aktualizacje template'u w przyszłości

Kiedy materiały kursowe się zmienią (nowa Część 16, poprawki w `CLAUDE.md`, dodatkowe template'y spec'ów), aktualizujesz **swoje** repo template'u — kursanci nie dostają automatycznych aktualizacji (to feature, nie bug — ich repo to ich kod).

Workflow aktualizacji:

```bash
# W swoim folderze template'u (lokalnie)
cd fashionhero-claude-starter

# Wprowadź zmiany (zaktualizuj CLAUDE.md, dorzuć nowy plik docs/, etc.)
# ...

# Commit + push
git add .
git commit -m "Update Part 16: Multi-agent workflows"
git push
```

Po push'u **nowi kursanci** dostaną zaktualizowaną wersję, **istniejące** repo kursantów zostają bez zmian.

Jeśli chcesz powiadomić istniejących kursantów o aktualizacji, możesz:
- Dodać sekcję "CHANGELOG.md" do template'u
- Wysłać im komunikat z linkiem do diff'a: `https://github.com/TwojLogin/fashionhero-claude-starter/compare/abc123...def456`
- Zaproponować selektywne kopiowanie zmienionych plików (np. tylko `CLAUDE.md`)

---

## Co usunąć z repo template'u przed publikacją

Przed wypchnięciem rozważ:

- **`INSTRUCTOR-SETUP.md`** (ten plik) — kursanci go nie potrzebują. Możesz usunąć przed `git add .` w kroku 3, lub zostawić (mały, nie przeszkadza).

- **Konkretne nazwy/loginy w `CLAUDE.md`** — sekcja "Suggested practice exercises" zawiera odniesienia do FashionHero. Jeśli pivotujesz na inny case study, zaktualizuj.

---

## Troubleshooting

### `gh repo create` zwraca błąd "name already exists"

Repo o tej nazwie już istnieje na Twoim koncie. Wybierz inną nazwę albo usuń istniejące:
```bash
gh repo delete TwojLogin/fashionhero-claude-starter --yes
```

### Po włączeniu "Template repository" przycisk "Use this template" nie pojawia się

1. Odśwież stronę (`Ctrl + Shift + R`)
2. Sprawdź `Settings → General → Template repository` — czy checkbox jest zaznaczony
3. Sprawdź widoczność repo — Private template wymaga, żeby kursanci byli dodani jako collaborators. **Public** template działa dla wszystkich.

### Kursanci klikają "Use this template" ale nic się nie dzieje

Najczęstsza przyczyna: **kursant nie jest zalogowany do GitHub**. Po zalogowaniu przycisk działa.

Druga przyczyna: **template jest Private** a kursant nie ma uprawnień. Rozwiązanie: zmień na Public lub dodaj kursantów jako collaborators.

### Mam zmiany lokalnie, których nie chcę w template

Użyj brancha `template`:

```bash
git checkout -b template
git push -u origin template
```

Następnie w `Settings → Branches → Default branch` ustaw `template` jako default. Lokalne `main` zachowujesz dla siebie.

---

**Powodzenia z kursem!** Masz pytania lub sugestie ulepszeń template'u — daj znać.
