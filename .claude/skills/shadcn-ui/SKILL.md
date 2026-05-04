---
name: shadcn-ui
description: Add, customize, and compose shadcn/ui components in this project. Use whenever the user asks to add UI components, build forms, create dialogs, layout pages, or work with components/ui. Reads components.json to follow project conventions (style, base color, aliases, icon library).
---

# shadcn/ui — project-aware component skill

This skill gives Claude Code project-specific knowledge of how to find, install, compose, and customize shadcn/ui components in this project.

> **Note:** this is a project-bundled version of the shadcn/ui skill, modeled on the official skill at https://ui.shadcn.com/docs/skills. To replace it with the latest official version, run `pnpm dlx skills add shadcn/ui` (overwrites this file).

---

## Project context

Before adding any component, run:

```bash
npx shadcn@latest info --json
```

This returns the project's framework, Tailwind version, aliases, base library (radix or base), icon library, installed components, and resolved file paths. **Always check this first** — it confirms the configuration matches what's in `components.json`.

Defaults for this project (from `components.json`):

- **Style:** new-york
- **Base color:** slate
- **CSS variables:** yes
- **RSC (React Server Components):** yes
- **TypeScript:** yes
- **Icon library:** lucide
- **Aliases:** `@/components`, `@/components/ui`, `@/lib/utils`, `@/lib`, `@/hooks`

---

## Adding components — the right way

### Standard install

```bash
npx shadcn@latest add [component-name]
```

Examples:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add form
```

The CLI:
1. Reads `components.json`
2. Downloads the component source
3. Places it at `src/components/ui/[component-name].tsx`
4. Adds any required dependencies to `package.json`
5. Updates CSS variables in `src/app/globals.css` if needed

### Multiple components at once

```bash
npx shadcn@latest add button card input dialog
```

### Discovery

Use `shadcn search` and `shadcn docs` before adding components Claude doesn't recognize:

```bash
npx shadcn@latest search "form"
npx shadcn@latest docs button
```

### View source before installing

```bash
npx shadcn@latest view button
```

Useful when the user asks "what's in this component before I add it?"

---

## Composition rules — follow shadcn patterns

### Forms — use Field + FieldGroup

```tsx
import { Field, FieldGroup, FieldLabel, FieldControl } from "@/components/ui/field"

<FieldGroup>
  <Field>
    <FieldLabel htmlFor="email">Email</FieldLabel>
    <FieldControl>
      <Input id="email" type="email" />
    </FieldControl>
  </Field>
</FieldGroup>
```

**Avoid** custom `<div>` wrappers around inputs and labels. The shadcn primitives handle accessibility, error states, and spacing.

### Option sets — use ToggleGroup, not multiple Buttons

```tsx
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

<ToggleGroup type="single" defaultValue="medium">
  <ToggleGroupItem value="low">Low</ToggleGroupItem>
  <ToggleGroupItem value="medium">Medium</ToggleGroupItem>
  <ToggleGroupItem value="high">High</ToggleGroupItem>
</ToggleGroup>
```

### Semantic colors — never hard-code hex

Use the CSS variables from `globals.css`:

- `bg-background`, `text-foreground`
- `bg-primary`, `text-primary-foreground`
- `bg-destructive`, `text-destructive-foreground`
- `bg-muted`, `text-muted-foreground`
- `bg-accent`, `text-accent-foreground`
- `border-border`, `ring-ring`

This makes dark mode work for free.

---

## Tailwind v4 specifics

This project uses **Tailwind CSS v4**, which is fundamentally different from v3:

- **No `tailwind.config.ts`** — theme tokens live in `src/app/globals.css` under `@theme inline`
- **CSS-first config** — colors use OKLCH and are referenced via CSS custom properties
- **Automatic content detection** — no need to configure `content: []`
- **`@plugin` directive** for plugins like `tailwindcss-animate`

Common gotcha: don't define theme colors in JS config — they'll be ignored. Edit `globals.css` instead.

---

## What NOT to do

- ❌ **Don't manually edit `src/components/ui/*.tsx` after first install** — use `npx shadcn@latest add [name] --overwrite` to update with the upstream version
- ❌ **Don't import from `@radix-ui/*` directly** — always use the shadcn wrappers in `@/components/ui`
- ❌ **Don't hard-code colors** like `bg-blue-500` — use semantic tokens (`bg-primary`)
- ❌ **Don't skip the install step** by copy-pasting from docs — the CLI handles dependencies and registers the component
- ❌ **Don't use custom `<form>`-wrapping `<div>`s** — use `FieldGroup` and `Field` for accessibility and consistency
- ❌ **Don't introduce `tailwind.config.ts`** — this project uses Tailwind v4 with CSS-first config

---

## Theming and customization

To change colors, edit the OKLCH values in `src/app/globals.css`:

```css
:root {
  --primary: oklch(0.205 0 0);          /* default neutral */
  --primary-foreground: oklch(0.985 0 0);
}
```

For brand colors, use [oklch.com](https://oklch.com) to convert hex/HSL to OKLCH. Stay in the same lightness range as the default for accessibility.

To change border radius:

```css
:root {
  --radius: 0.625rem;  /* default — adjust globally */
}
```

---

## Dark mode

Already wired up via `.dark` class. To add a toggle:

```bash
npx shadcn@latest add button
```

Then create `src/components/mode-toggle.tsx` with `useTheme` from `next-themes` (install: `npm install next-themes`). The shadcn docs have the canonical implementation under [Dark Mode](https://ui.shadcn.com/docs/dark-mode).

---

## When to load this skill

This skill activates automatically when:
- Working in a project with `components.json` (this project)
- The user asks to add UI components, build forms, create dialogs
- Files in `src/components/ui/` are read or edited

When uncertain about a component's API, prefer:
1. `npx shadcn@latest docs [component]` — official docs from CLI
2. `npx shadcn@latest view [component]` — view source before install
3. https://ui.shadcn.com/docs/components/[component] — web docs

Don't rely on memory for component APIs — they evolve, and Tailwind v4 + new-york style differs from older versions.
