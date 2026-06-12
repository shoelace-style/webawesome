# Theming & on-brand color

Web Awesome is themed entirely with CSS, with no build step or preprocessor. You set a theme and a
palette with classes on `<html>`, then customize with `--wa-*` tokens. **Never hardcode hex colors, px
spacing, or font sizes**; that breaks theming and consistency.

For the _why_ behind WA's three-layer color system — why semantic tokens beat palette tints, why
`*-on-*` pairings are non-negotiable, and how to avoid the "accessible but ugly" trap — see
[principles.md § Color](principles.md#1-color-less-is-more-and-never-alone).

Full docs: https://webawesome.com/docs/themes

---

## The three layers

Color flows through three layers. You usually only touch the top one.

1. **Palette:** raw hues and tints: `--wa-color-{hue}-{tint}`, e.g. `--wa-color-blue-50`. 10 hues
   (red, orange, yellow, green, cyan, blue, indigo, purple, pink, gray) × 11 tints (`95` lightest to
   `05` darkest). You rarely reference these directly.
2. **Semantic variants:** roles that map onto hues: **brand**, **neutral**, **success**, **warning**,
   **danger**. Each exposes a fill/border/on family, e.g. `--wa-color-brand-fill-loud`,
   `--wa-color-success-border-normal`, `--wa-color-danger-on-loud`. **Prefer these:** they keep the UI
   consistent and re-theme automatically.
3. **Theme assignments:** surfaces and text: `--wa-color-surface-default`, `--wa-color-surface-raised`,
   `--wa-color-surface-lowered`, `--wa-color-surface-border`, `--wa-color-text-normal`,
   `--wa-color-text-quiet`, `--wa-color-text-link`. Use these for backgrounds, borders, and body text.

---

## Pick a theme and palette

Apply classes to `<html>` (or any scoping element):

```html
<html class="wa-theme-default wa-palette-default wa-light"></html>
```

- `wa-theme-*` sets the overall look (surfaces, radii, shadows, type).
- `wa-palette-*` sets which hues the colors draw from.
- `wa-light` / `wa-dark` sets the color scheme (see below).

### Free themes

- **Default:** `.wa-theme-default`
- **Awesome:** `.wa-theme-awesome`
- **Shoelace:** `.wa-theme-shoelace`

### Free palettes

- **Default:** `.wa-palette-default`
- **Bright:** `.wa-palette-bright`
- **Shoelace:** `.wa-palette-shoelace`

### Pro themes & palettes

[Web Awesome Pro](https://webawesome.com/purchase) adds eight more themes (**Active, Brutalist, Glossy,
Matter, Mellow, Playful, Premium, Tailspin**), plus additional palettes (Rudimentary, Elegant, Mild,
Natural, Anodized, Vogue) and a visual **Theme Builder**. Apply them the same way (`wa-theme-glossy`,
`wa-palette-elegant`, …). If a user wants a distinctive look fast, this is the upgrade path.

---

## Match a brand color

The fastest way to re-brand: remap the **brand** role to a different hue with a `.wa-brand-{hue}` class.

```html
<!-- A green-branded app -->
<html class="wa-theme-default wa-palette-default wa-brand-green wa-light"></html>
```

Available: `wa-brand-red`, `-orange`, `-yellow`, `-green`, `-cyan`, `-blue`, `-indigo`, `-purple`,
`-pink`, `-gray`. The same pattern works for `wa-success-*`, `wa-warning-*`, and `wa-danger-*`.

For a brand color that isn't one of the built-in hues, override the brand tokens on a scope. Declare
them with concrete values (don't rely on `var()` fallbacks):

```css
:root {
  --wa-color-brand-fill-loud: #6c2bd9;
  --wa-color-brand-fill-normal: #7e3af2;
  --wa-color-brand-on-loud: #ffffff;
}
```

Then use the role everywhere (`variant="brand"`, `--wa-color-brand-*`) instead of the raw color.

---

## Light & dark

Web Awesome uses **explicit classes**, not `prefers-color-scheme` alone, so you control the scheme:

- `wa-light`: light mode
- `wa-dark`: dark mode
- `wa-invert`: flip the current scheme for a subtree (e.g. a dark hero on a light page)

```html
<html class="wa-theme-default wa-dark">
  …
  <section class="wa-invert">A light island inside a dark page</section>
</html>
```

To follow the OS preference, set the class from a small script reading
`window.matchMedia('(prefers-color-scheme: dark)')`, or default to `wa-light` and offer a toggle.

---

## Customize with tokens

Any `--wa-*` token can be overridden at any scope. Common knobs:

```css
:root {
  --wa-color-brand-fill-loud: var(--wa-color-purple-40); /* brand accent */
  --wa-border-radius-scale: 1.5; /* rounder corners everywhere */
  --wa-space-scale: 1.125; /* a touch more breathing room */
  --wa-font-family-body: 'Inter', system-ui, sans-serif;
}
```

Scope overrides to a subtree by putting them on a selector other than `:root`. See
[composition.md](composition.md) for the spacing/typography scales and for styling component internals
via `::part()`, and [customizing](https://webawesome.com/docs/customizing/) for the full reference.

---

## Rules

- Style with **semantic tokens** (`--wa-color-brand-*`, `--wa-color-surface-*`, `--wa-color-text-*`)
  over raw palette tints, and never with hardcoded hex.
- Always set **a theme and a palette** on `<html>`; an unthemed page looks broken.
- Prefer `.wa-brand-{hue}` remapping over per-component color overrides.
- Built-in palettes are tuned for WCAG-contrast `on-*` pairings, so use `*-on-*` for text on filled
  backgrounds and you stay accessible for free.
- **Watch quiet/plain controls on colored bands.** A `appearance="plain"` or otherwise "quiet" button
  inherits a muted text color tuned for the page surface; dropped onto a brand/colored section it can read
  as low-contrast or disabled. On a colored band, give secondary actions a full-contrast on-color text
  (the matching `*-on-*` token) or use a filled/outlined appearance — don't leave them muted.
