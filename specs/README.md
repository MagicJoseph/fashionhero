# `specs/` — Specyfikacje funkcjonalności

Ten folder zawiera **specyfikacje funkcjonalności** projektu — pliki markdown opisujące **CO** ma robić każda większa zmiana, zanim Claude Code zacznie pisać **JAK**.

To jest implementacja workflow **spec-driven development** opisanego w **Części 14** głównego przewodnika (`docs/02-claude-code-dla-projektantow-ux.docx`).

---

## Po co ten folder

Bez spec-driven workflow typowy prompt do Claude'a wygląda tak:

> *"Dodaj profil użytkownika"*

Claude zgaduje pola, schemat bazy, RLS policies, edge cases. **Trafia w 80%, 20% trzeba przepisać.** Frustracja.

Z spec-driven:

1. Piszesz `specs/profil-uzytkownika.md` (15 minut) — precyzyjnie czego chcesz
2. Claude generuje `specs/profil-uzytkownika-plan.md` (5 minut) — jak to zrobi
3. Akceptujesz plan, Claude implementuje krok po kroku z osobnymi commitami

**Łączny czas: 1h zamiast 2h. Frustracja: niska.**

---

## Reguły tego folderu

- **Każda większa funkcjonalność = jeden plik `.md`** w głównym `specs/`
- **Plan implementacji** powstaje obok jako `[nazwa]-plan.md`
- **Wszystkie pliki commitowane do gita** razem z kodem (są dokumentacją projektu)
- **Po zaimplementowaniu** wracaj do specu i odznacz kryteria akceptacji + dodaj sekcję "Notes from implementation"

---

## Jak zacząć nowy spec

### Opcja A: Z templatu (rekomendowane)

```bash
# Skopiuj odpowiedni template
cp specs/_templates/feature.md specs/profil-sprzedawcy.md

# Otwórz w VS Code i wypełnij
code specs/profil-sprzedawcy.md
```

### Opcja B: Niech Claude zada pytania

W aktywnej sesji Claude Code:

```
> Pomóż mi napisać spec dla funkcjonalności "profil sprzedawcy".
  Użyj template z @specs/_templates/feature.md jako wzoru.
  Zadaj mi 5-7 pytań pogłębiających, potem zapisz spec
  w @specs/profil-sprzedawcy.md.
```

### Opcja C: Z istniejącego skilla (zaawansowane)

Jeśli masz skill `prompt-builder` (Część 5 instrukcji), wystarczy:

```
> chcę dodać profil sprzedawcy
```

Skill aktywuje się automatycznie i poprowadzi Cię przez spec.

---

## Kiedy używać spec-driven, a kiedy nie

### Tak, użyj spec-driven gdy

- Funkcjonalność dotyka **3+ plików**
- Ma **migrację bazy danych** + RLS policies
- Ma **nieoczywiste edge cases**
- Robisz to **w zespole** lub pokazujesz innym
- **Wracasz do tego po tygodniach** — spec to też dokumentacja

### Nie, pomiń spec-driven gdy

- Eksperyment / prototyp na 2 godziny
- Bug fix oczywisty (typo, kolor, padding)
- Refaktoring kosmetyczny
- Eksploracja "jak to się robi w X"

Spec-driven kosztuje czas z góry. Opłaca się dla większych zmian, **przegrywa dla drobiazgów.**

---

## Trzy templates dostępne w `_templates/`

| Template | Kiedy użyć |
|---|---|
| **`feature.md`** | Nowa funkcjonalność (np. profil sprzedawcy, system recenzji) |
| **`change.md`** | Modyfikacja istniejącej funkcjonalności (np. dodanie pola do formularza) |
| **`experiment.md`** | Czasowy eksperyment z planem rollbacku (np. nowa wersja checkout'a) |

---

## Konwencja nazewnictwa

```
specs/
├── README.md                          ← ten plik (nie kasuj)
├── _templates/                        ← szablony (nie kasuj)
│   ├── feature.md
│   ├── change.md
│   └── experiment.md
│
├── profil-sprzedawcy.md               ← spec
├── profil-sprzedawcy-plan.md          ← plan implementacji (auto-generowany przez Claude)
│
├── system-recenzji.md
├── system-recenzji-plan.md
│
└── ...
```

**Format nazwy:** `kebab-case`, opisowy, bez dat. Daty wynikają z gita.

---

## Twój pierwszy spec

Pierwsze podejście do spec-driven — **zacznij od czegoś małego**, żeby poczuć rytm. Dobre kryteria pierwszego spec'u:

- **Pojedynczy komponent lub mały widok** — np. karta produktu, formularz logowania, header strony
- **Bez bazy danych** — żebyś nie wpadł od razu na RLS i migracje. Te przyjdą w drugim spec'u.
- **Coś co realnie chcesz zaimplementować** — nie ćwiczenie dla ćwiczenia. Może to być pierwsza część rekomendacji którą przyniosłeś z Claude.ai, fragment scrapowanej strony FashionHero, lub konkretny element nowego prototypu.

Po 2-3 udanych spec'ach zaczniesz czuć kiedy spec-driven się opłaca, a kiedy "po prostu zrób to" jest szybsze.
