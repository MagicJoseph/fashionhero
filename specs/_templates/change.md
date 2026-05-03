# Change: [Nazwa zmiany]

> Zastąp tytuł rzeczywistym opisem zmiany (np. "Dodanie pola 'oceny' do produktów").
> Skasuj wskazówki w cytatach przed zapisaniem.

---

## Aktualny stan

> Jak ta funkcjonalność działa teraz?
> Jeśli był wcześniejszy spec — podlinkuj go.

[Opisz obecny stan w 2-3 zdaniach]

**Powiązany spec:** [ścieżka do spec'u jeśli istnieje, lub "brak — zmiana ad-hoc"]

---

## Co zmieniamy

> Konkretnie: przed → po.
> Im bardziej precyzyjnie, tym mniej ryzyka, że Claude zinterpretuje na opak.

| Element | Przed | Po |
|---|---|---|
| [Co] | [Jak teraz] | [Jak ma być] |
| [Co] | [Jak teraz] | [Jak ma być] |

---

## Czego NIE ruszamy

> Lista rzeczy, które celowo zostają bez zmian.
> Critical — chroni przed "Claude refaktoruje całą stronę przy okazji".

- **[Element X]:** zostaje bez zmian, bo [powód]
- **[Element Y]:** nie ruszamy nawet jeśli wygląda na podobny, bo [powód]

---

## Migracja danych

> Czy zmiana dotyka istniejących danych w bazie?
> Jeśli tak — co z nimi?

- **Czy są istniejące dane do migracji?** [Tak / Nie]
- **Jak migrujemy:** [opis — np. "default value dla nowego pola = 0", "trigger przelicza historyczne wartości"]
- **Czy migracja jest odwracalna?** [Tak / Nie / Częściowo]

> Jeśli "Nie" — masz problem. Pomyśl jeszcze raz, czy nie dałoby się zrobić odwracalnie.

---

## Backward compatibility

> Czy łamiemy stare API / URL / format danych?
> Czy aplikacja będzie działać po deploy'u, czy wszyscy użytkownicy muszą się przelogować?

- **Stare URL-e / API endpoints:** [zachowujemy / przekierowujemy / łamiemy z komunikatem]
- **Format danych w bazie:** [kompatybilny / wymaga migracji]
- **Cache klienta (localStorage / cookies):** [bez wpływu / wymaga wyczyszczenia]

---

## Edge cases tej zmiany

> Specyficzne dla tej modyfikacji.
> Często edge case = "co jeśli ktoś jest w środku flow gdy zmiana wchodzi".

- **Co jeśli użytkownik ma otwartą starą wersję strony i kliknie button:** [zachowanie]
- **Co jeśli istnieją dane w starym formacie:** [zachowanie]
- **Co jeśli zmiana coś psuje na mobile:** [zachowanie]

---

## Kryteria akceptacji

- [ ] [Stary scenariusz nadal działa: ...]
- [ ] [Nowy scenariusz działa: ...]
- [ ] [Migracja danych przeszła bez błędu]
- [ ] [Backward compatibility zachowana / komunikat o łamiącej zmianie]
- [ ] [Test na mobile + desktop]

---

## Plan rollbacku

> Co robimy jeśli zmiana okazuje się problematyczna na produkcji?
> Środowisko nauki — i tak dobry nawyk.

- **Jak cofnąć:** [git revert / nowa migracja odwracająca / feature flag off]
- **Czas reakcji potrzebny:** [minuty / godziny / wymaga downtime]

---

## Notes from implementation

> Wypełnij PO implementacji.

- [Po implementacji uzupełnij]

---

**Status:** 📋 Draft / 🚧 W trakcie / ✅ Done
**Autor:** [Twoje imię]
**Data:** [YYYY-MM-DD]
