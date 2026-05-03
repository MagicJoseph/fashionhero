# Spec: [Nazwa funkcjonalności]

> Zastąp tytuł powyżej rzeczywistą nazwą funkcjonalności (np. "Profil sprzedawcy").
> Skasuj wszystkie wskazówki w cytatach (jak ta) przed zapisaniem spec'u.

---

## Po co (cel biznesowy)

> Jedno-dwa zdania: dlaczego dodajemy tę funkcjonalność?
> Co osiągamy biznesowo? Jaki problem użytkownika rozwiązuje?
> Bez tego — Claude nie wie co priorytetyzować przy trade-offach.

[Tu wpisz cel biznesowy]

---

## User stories

### US-1: [Krótka nazwa]
- **Jako:** [rola użytkownika — np. zalogowany sprzedawca, anonimowy kupujący]
- **Chcę:** [konkretne zachowanie, które ma być możliwe]
- **Aby:** [co dzięki temu osiągnę — wartość biznesowa]

### US-2: [Krótka nazwa]
- **Jako:** ...
- **Chcę:** ...
- **Aby:** ...

> Dodaj tyle user stories ile potrzebujesz. Trzymaj je krótko —
> jedno user story = jeden konkretny scenariusz użycia.

---

## Pola / dane

> Tabela wszystkich pól, które ta funkcjonalność wprowadza.
> Format jest gotowy do bezpośredniego użycia jako schema Supabase.

| Pole | Typ | Wymagane | Walidacja / opis |
|---|---|---|---|
| `id` | uuid | Tak | primary key, default `gen_random_uuid()` |
| [pole_1] | [typ] | [Tak/Nie] | [walidacja] |
| [pole_2] | [typ] | [Tak/Nie] | [walidacja] |
| `created_at` | timestamptz | Tak | default `now()` |
| `updated_at` | timestamptz | Tak | default `now()`, trigger on update |

---

## Reguły dostępu (RLS)

> Dla każdej operacji (SELECT, INSERT, UPDATE, DELETE) opisz kto może co.
> Pamiętaj: każda tabela MUSI mieć RLS — bez tego dane są publicznie dostępne.

- **SELECT:** [kto może czytać — np. każdy / zalogowany / tylko właściciel]
- **INSERT:** [kto może dodawać — np. zalogowany sprzedawca, w jego imieniu]
- **UPDATE:** [kto może edytować — np. tylko właściciel rekordu]
- **DELETE:** [kto może usuwać — np. nigdy / tylko admin]

---

## Edge cases

> Lista nieoczywistych przypadków: co jeśli dane są puste, błędne, użytkownik niezalogowany itp.
> To zamyka 80% problemów typu "a co jak…" które inaczej Claude by przegapił.

- **Co jeśli [warunek 1]:** [oczekiwane zachowanie]
- **Co jeśli [warunek 2]:** [oczekiwane zachowanie]
- **Co jeśli [warunek 3]:** [oczekiwane zachowanie]

Przykłady częstych edge cases:
- Brak danych w bazie (lista pusta) → komunikat zamiast pustej strony
- Niezalogowany użytkownik na chronionym widoku → redirect do logowania
- Niewalidne dane w formularzu → konkretny błąd przy każdym polu
- Zbyt długi tekst → trim albo komunikat
- Brak internetu → loading state nie wisi w nieskończoność

---

## Kryteria akceptacji

> Lista konkretnych warunków, które muszą być spełnione żeby uznać feature za skończony.
> Po implementacji wracasz tutaj i odznaczasz checkboxy.

- [ ] [Konkretny warunek 1]
- [ ] [Konkretny warunek 2]
- [ ] [Konkretny warunek 3]
- [ ] Walidacja działa po stronie klienta i serwera
- [ ] Wszystkie edge cases obsłużone
- [ ] Przeszło ręczny test na mobile (320px) i desktop (1280px+)

---

## Co JEST poza zakresem (świadomie)

> Lista rzeczy, które MOGŁYBY pasować, ale celowo ich nie robimy w tym feature.
> Chroni przed nadgorliwością Claude'a "skoro już tam jestem, to dodam też...".

- **[Rzecz X]:** [krótkie uzasadnienie czemu nie teraz, np. "osobny spec później"]
- **[Rzecz Y]:** [uzasadnienie]

---

## Notes from implementation

> Wypełnij PO zaimplementowaniu — co wyszło inaczej niż plan, co warto zapamiętać.
> Czyni spec żywą dokumentacją zamiast tylko intencji.

- [Po implementacji uzupełnij]

---

## Linki

- **Plan implementacji:** `[nazwa]-plan.md` (auto-generowany przez Claude)
- **PR:** [link po zmerge'owaniu]
- **Issue:** [opcjonalnie, jeśli prowadzicie issues]

---

**Status:** 📋 Draft / 🚧 W trakcie / ✅ Done
**Autor:** [Twoje imię]
**Data utworzenia:** [YYYY-MM-DD]
