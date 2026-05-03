# Experiment: [Nazwa eksperymentu]

> Zastąp tytuł rzeczywistą nazwą eksperymentu (np. "Nowa wersja checkout'a z jednym ekranem").
> Skasuj wskazówki w cytatach przed zapisaniem.

---

## Hipoteza

> Co zakładasz, że się stanie i dlaczego?
> Format: "Jeśli zrobimy X, to Y zwiększy się o Z, ponieważ [powód]".

**Założenie:** [Twoja hipoteza w jednym zdaniu]

**Dlaczego myślisz, że tak będzie:**

[2-3 zdania uzasadnienia — dane / obserwacje / analogie]

---

## Mierzona zmiana

> Co konkretnie modyfikujesz w aplikacji?
> Powinno być jasne — eksperyment to nie "zobaczmy co się stanie", tylko "testujemy konkretną zmianę X vs Y".

**Wariant kontrolny (jak jest):**
[Krótki opis aktualnej wersji]

**Wariant testowy (co robimy):**
[Krótki opis nowej wersji]

---

## Sukces / porażka

> Konkretne metryki i progi. Bez tego eksperyment to wishful thinking.

| Metryka | Próg sukcesu | Próg porażki | Jak mierzymy |
|---|---|---|---|
| [Metryka 1] | [≥ X] | [≤ Y] | [skąd dane — Posthog, Supabase logs, ręczna obserwacja?] |
| [Metryka 2] | [≥ X] | [≤ Y] | [skąd dane] |

**Decyzja:**
- ✅ **Sukces** — wdrażamy permanentnie, usuwamy stary wariant
- ⚠️ **Mieszane wyniki** — przedłużamy obserwację o [czas] / iterujemy
- ❌ **Porażka** — rollback do stanu przed eksperymentem

---

## Czas trwania

- **Start:** [YYYY-MM-DD]
- **Koniec:** [YYYY-MM-DD]
- **Minimalny czas potrzebny do statystycznej istotności:** [estymata — np. 14 dni / 1000 użytkowników]

> Środowisko nauki — czas eksperymentu może być krótszy, ale **zawsze go ustal z góry**, żeby nie ciągnąć w nieskończoność.

---

## Plan rollbacku

> KRYTYCZNE. Eksperyment bez planu rollbacku to nie eksperyment, tylko zmiana z fatalizmem.

**Mechanizm wycofania:**
- [ ] **Feature flag** — `experiment_X_enabled` w bazie / config (najsprawniejszy rollback)
- [ ] **Osobny branch** — `experiment/nazwa` zmerge'owany do `main` przez squash, łatwy revert
- [ ] **Wersja w URL-u** — `/checkout-v2` współistnieje z `/checkout-v1`
- [ ] **Inny mechanizm:** [opisz]

**Czas potrzebny do rollbacku:** [minuty / godziny]

**Kto wykonuje rollback:** [Ty / kursowa platforma / nikt — to learning sandbox]

---

## Edge cases eksperymentu

- **Co jeśli użytkownik jest w środku flow gdy eksperyment kończysz:** [zachowanie]
- **Co jeśli eksperyment łamie istniejące dane:** [migracja / izolacja]
- **Co jeśli wyniki są dwuznaczne (np. konwersja w górę, retencja w dół):** [decyzja])

---

## Kryteria akceptacji (że eksperyment dobrze postawiony)

- [ ] Hipoteza jest falsyfikowalna (da się powiedzieć "fałsz")
- [ ] Metryki sukcesu / porażki mają konkretne progi
- [ ] Plan rollbacku jest realny i przetestowany
- [ ] Czas trwania ustalony z góry
- [ ] Zarówno wariant kontrolny jak i testowy są obserwowalne równolegle

---

## Wyniki

> Wypełnij W TRAKCIE i PO eksperymencie.

**Dane:**
- [Metryka 1]: [wartość]
- [Metryka 2]: [wartość]

**Wniosek:** [Sukces / Mieszane / Porażka]

**Dlaczego (interpretacja):**
[2-3 zdania o tym co zaobserwowałeś i co to znaczy]

**Decyzja:**
[Wdrażamy permanentnie / Rollback / Iterujemy z modyfikacją X]

---

## Notes from implementation

- [Po implementacji uzupełnij]

---

**Status:** 📋 Planowany / 🚧 W trakcie / ✅ Zakończony / ⏸️ Wstrzymany
**Autor:** [Twoje imię]
**Data startu:** [YYYY-MM-DD]
