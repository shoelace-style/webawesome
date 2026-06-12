# Visual composition

This is how you make Web Awesome output look **designed** rather than merely functional: consistent
spacing rhythm, the right layout utility for each job, a typographic scale, and deliberate use of
surfaces and elevation. The throughline: **use the scales and tokens; never improvise raw values.**

For the _why_ behind these scales — when to vary weight instead of size, why the spacing scale jumps
non-linearly, how to keep depth meaningful — see [principles.md](principles.md).

---

## Spacing rhythm

All spacing comes from one scale (`--wa-space-*`). Apply it with `wa-gap-*` on layout containers, or
reference the tokens directly. **Never use raw `px`.**

| Token            | Value |
| ---------------- | ----- |
| `--wa-space-3xs` | 2px   |
| `--wa-space-2xs` | 4px   |
| `--wa-space-xs`  | 8px   |
| `--wa-space-s`   | 12px  |
| `--wa-space-m`   | 16px  |
| `--wa-space-l`   | 24px  |
| `--wa-space-xl`  | 32px  |
| `--wa-space-2xl` | 40px  |
| `--wa-space-3xl` | 48px  |
| `--wa-space-4xl` | 64px  |
| `--wa-space-5xl` | 80px  |

Scale everything at once with `--wa-space-scale` (default `1`).

Guidance:

- Pick a **base rhythm** for a section and stick to it. `wa-gap-m` (16px) between related items,
  `wa-gap-xl` (32px) between distinct blocks, `wa-gap-2xl`+ between major page sections.
- Tighten lists/related controls (`wa-gap-2xs`/`wa-gap-xs`); loosen between unrelated groups.
- Consistency reads as "designed." Three arbitrary gaps read as "thrown together."

### Sizing fixed elements with tokens (don't fall back to raw `rem`/`px`)

Rule 5 forbids raw `px`/`rem`, but the moment you build a fixed-size element — a round icon badge, an
avatar, a content column's `max-width`, a hairline border — it's tempting to type `3.5rem` or `1px`.
Don't. Use the scales instead:

| You're sizing…            | Use                                                                                                                                         |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| A round icon "chip"/badge | `width`/`height` from `--wa-space-*` (e.g. `--wa-space-2xl`), `--wa-border-radius-circle`, center the glyph with `wa-cluster`               |
| An avatar                 | The `<wa-avatar>` component (sizes itself); set `--size` only if needed                                                                     |
| A readable content column | A reused class with `max-width` in `ch` for prose (`60ch`–`75ch`) or a `--wa-space-*` multiple — define it **once**, not inline per section |
| A hairline border / rule  | `var(--wa-border-width-s)` + `var(--wa-color-surface-border)`, or just `<wa-divider>`                                                       |
| A glyph's size            | `font-size: var(--wa-font-size-*)` — icons inherit it (see Icons below)                                                                     |

```css
/* ✓ Token-based circular icon badge — no raw rem, themes correctly. */
.icon-badge {
  inline-size: var(--wa-space-2xl);
  block-size: var(--wa-space-2xl);
  border-radius: var(--wa-border-radius-circle);
  background: var(--wa-color-brand-fill-quiet);
  color: var(--wa-color-brand-on-quiet);
}
```

If you globally rescale a token (`--wa-space-scale`, `--wa-border-radius-scale`), **everything must then
flow through tokens** or the scale silently won't apply to your raw values.

---

## Layout-utility decision guide

Reach for a utility class before writing flexbox/grid by hand.

| You want…                          | Use          | Notes                                                                                      |
| ---------------------------------- | ------------ | ------------------------------------------------------------------------------------------ |
| Things stacked vertically          | `wa-stack`   | Children stretch to full width by default                                                  |
| Inline items that wrap             | `wa-cluster` | Vertically centered; wraps when tight. Great for buttons, tags, nav                        |
| Responsive columns                 | `wa-grid`    | Auto-fits columns; tune with `--min-column-size` (default `20ch`). No media queries        |
| A fixed item beside a flexible one | `wa-flank`   | Media object. `wa-flank:end` flanks the last child. `--flank-size` sets the fixed width    |
| Push items to opposite ends        | `wa-split`   | Toolbars, headers-with-action. `wa-split:column` stacks vertically                         |
| A fixed aspect ratio               | `wa-frame`   | `wa-frame:square` (default), `:landscape` (16:9), `:portrait` (9:16). Images cover the box |

Modifiers combine: `class="wa-cluster wa-gap-xs wa-align-items-start"`. Make one element span a full
`wa-grid` row with `wa-span-grid`.

```html
<!-- Stack of fields -->
<div class="wa-stack wa-gap-m">…</div>

<!-- Button row -->
<div class="wa-cluster wa-gap-xs">
  <wa-button variant="brand">Save</wa-button>
  <wa-button appearance="plain">Cancel</wa-button>
</div>

<!-- Responsive tiles -->
<div class="wa-grid wa-gap-l" style="--min-column-size: 14rem;">…</div>
```

---

## Companion utilities

The layout primitives above are the headlines. A set of small companion utility classes covers the
everyday refinements you'd otherwise reach for inline `style=""` to express — alignment, text
treatment, sizing, color, accessibility. Use these alongside the layout primitives instead of inline
styles (see Rule 8 in the main skill).

### Alignment modifiers

Combine with any layout utility to fine-tune cross-axis and main-axis placement.

| You want…                           | Use                                                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Vertical (cross-axis) alignment     | `wa-align-items-start` / `-end` / `-center` / `-stretch` / `-baseline`                                 |
| Horizontal (main-axis) distribution | `wa-justify-content-start` / `-end` / `-center` / `-space-between` / `-space-around` / `-space-evenly` |
| Control wrap                        | `wa-flex-wrap` / `wa-flex-nowrap` / `wa-flex-wrap-reverse`                                             |

`wa-split` and `wa-cluster` already center on the cross-axis by default (0-specificity); reach for
`wa-align-items-*` when you need something different. Never write `style="align-items: center;"` on top
of a utility class that already centers — it's redundant and breaks Rule 8.

### Text utilities

For text alignment, wrapping, and transformation, prefer `wa-text-*` over inline
`text-align` / `text-wrap` / `text-transform`.

| You want…                 | Use                                                                    |
| ------------------------- | ---------------------------------------------------------------------- |
| Text alignment            | `wa-text-start` / `wa-text-center` / `wa-text-end` / `wa-text-justify` |
| Avoid awkward line breaks | `wa-text-balance` (headings) / `wa-text-pretty` (paragraphs)           |
| Prevent wrapping          | `wa-text-nowrap`                                                       |
| Letter casing             | `wa-text-uppercase` / `wa-text-lowercase` / `wa-text-capitalize`       |

(Large blocks of uppercase text are harder to read for everyone, especially folks with dyslexia.
Reserve `wa-text-uppercase` for buttons, badges, or short headings.)

### Component sizing

Most components accept a `size` attribute (`xs` / `s` / `m` / `l` / `xl`). The `wa-size-*` utility
classes are the class-form equivalent — useful when sizing a non-component wrapper to match a
component's scale (e.g. a custom badge sitting next to `<wa-button size="s">`).

### Text color

For body text color, use the utility class instead of an inline `color` declaration.

| You want…          | Use                    |
| ------------------ | ---------------------- |
| Default text color | `wa-color-text-normal` |
| De-emphasized text | `wa-color-text-quiet`  |
| Link-styled color  | `wa-color-text-link`   |

For text **on colored backgrounds**, use the `*-on-*` semantic token instead (see the Custom CSS
playbook below) — those are WCAG-tuned for contrast.

### Accessibility

`wa-visually-hidden` hides content from sighted users while keeping it available to screen readers.
Use it for labels on icon-only controls when there's no visible text:

```html
<wa-button>
  <wa-icon name="settings"></wa-icon>
  <span class="wa-visually-hidden">Settings</span>
</wa-button>
```

(For `<wa-icon>` itself, the `label` attribute is simpler — use `wa-visually-hidden` when you need
a span of extra text rather than a single icon label.)

---

## Typography

Font sizes follow a 1.125 modular scale (`--wa-font-size-*`):

| Token                | Value |
| -------------------- | ----- |
| `--wa-font-size-3xs` | 10px  |
| `--wa-font-size-2xs` | 11px  |
| `--wa-font-size-xs`  | 12px  |
| `--wa-font-size-s`   | 14px  |
| `--wa-font-size-m`   | 16px  |
| `--wa-font-size-l`   | 20px  |
| `--wa-font-size-xl`  | 25px  |
| `--wa-font-size-2xl` | 32px  |
| `--wa-font-size-3xl` | 41px  |
| `--wa-font-size-4xl` | 52px  |
| `--wa-font-size-5xl` | 66px  |

(`--wa-font-size-m` is the 16px base; `--wa-font-size-scale` scales the whole ramp.)

- Use the **text utilities** for quick, consistent type: `wa-heading-*`, `wa-body-*`, `wa-caption-*`
  (quiet, small), `wa-longform-*` (serif, for prose). Size utilities `wa-font-size-*` mirror the scale.
- Establish hierarchy with **size + weight + color**, not size alone. A quiet caption
  (`wa-caption-m`) beside a bold label communicates structure.
- Keep body text to a readable measure (~60–75 characters per line); constrain prose containers rather
  than letting text run full width.

---

## Icons

Use the [`<wa-icon>`](https://webawesome.com/docs/components/icon) component for icons. **Never use
emojis in the UI** unless the user explicitly asks for them — emojis render inconsistently across
platforms and don't inherit color, size, or weight the way icons do.

```html
<wa-icon name="star"></wa-icon>

<!-- In a button -->
<wa-button variant="brand">
  <wa-icon slot="start" name="plus"></wa-icon>
  Add item
</wa-button>
```

Icons inherit `color` and `font-size` from their surroundings, so they scale with the type scale and
theme automatically — set `font-size` (e.g. `--wa-font-size-l`) rather than hardcoding pixel
dimensions. Give standalone, meaningful icons a `label` for accessibility; decorative icons beside
text need none.

**Icon library.** By default, `<wa-icon>` draws from **Font Awesome Free**. Most common UI needs
(arrows, common actions, social, etc.) are covered. Use any [Font Awesome Free icon name](https://fontawesome.com/search?o=r&m=free).

**Picking the right icon.** If your tool has access to Font Awesome's
[official agent skills](https://github.com/FortAwesome/fontawesome-agent-tools) (`icons:suggest-icon`,
`icons:add-icon` from the Font Awesome team), prefer those over guessing an icon name.
`icons:suggest-icon` returns a recommendation for a concept, verb, or noun — pass the result to
`<wa-icon name="…">`. That picks icons by intent rather than by keyword match, which is usually how
guessing goes wrong. Both skills work with the Free library by default; with a Pro kit code (below),
they also surface Pro icons.

**Font Awesome Pro / Pro+.** If the user has a Font Awesome Pro kit, you can unlock the Pro and Pro+
icon families (`thin`, `light`, `sharp`, `duotone`, etc.) by setting their kit code. **Act on this — don't
just leave Free on the table:** if the user has told you they have Font Awesome Pro (or Web Awesome Pro,
which includes it), wire up their kit code and feel free to use Pro families. If a project clearly wants a
distinctive icon weight (thin/light/duotone) and you don't know whether they have a kit, **ask once**
("Do you have a Font Awesome Pro kit code?") rather than silently shipping only Free `solid` icons. Do
**not** invent or add a kit code otherwise — without one, stay on Font Awesome Free. Use any **one** of
these:

Option 1 — the `data-fa-kit-code` attribute on `<html>` (mirrors the theme/palette classes):

```html
<html class="wa-theme-default wa-palette-default wa-light" data-fa-kit-code="YOUR_KIT_CODE_HERE"></html>
```

Option 2 — the same attribute on the loader script (the canonical CDN URL is
`https://ka-f.webawesome.com/webawesome@<version>/dist/webawesome.loader.js`; substitute your
loader's actual URL or path):

```html
<script src="…/webawesome.loader.js" data-fa-kit-code="YOUR_KIT_CODE_HERE"></script>
```

Option 3 — the `setKitCode()` method. Import from the npm package, or from the CDN loader URL:

```js
// npm
import { setKitCode } from '@awesome.me/webawesome';
// or CDN: import { setKitCode } from 'https://ka-f.webawesome.com/webawesome@<version>/dist/webawesome.loader.js';
setKitCode('YOUR_KIT_CODE_HERE');
```

Once a kit code is set, select a Pro family with the `variant` attribute, e.g.
`<wa-icon variant="regular" name="grip-vertical"></wa-icon>`.

---

## Images & placeholders

Source images in this order — never an emoji or a broken `src`:

1. **Real assets the user gave you** (logo, product shots, a path/URL) — always win. If a design needs
   imagery and you don't have one, **ask the user** rather than picking a stock photo for them.
2. **A token-based placeholder** when no suitable image exists — a muted surface stating the intended size,
   not a broken `<img>` or an external placeholder service:
   ```html
   <div class="wa-frame wa-frame:landscape image-placeholder">1200 × 675</div>
   ```
   ```css
   .image-placeholder {
     display: grid;
     place-items: center;
     background-color: var(--wa-color-surface-lowered);
     color: var(--wa-color-text-quiet);
     font-size: var(--wa-font-size-s);
     border-radius: var(--wa-border-radius-m);
   }
   ```

Wrap images and placeholders in `wa-frame` (`:square`/`:landscape`/`:portrait`) to lock the aspect ratio so
the layout reserves the right space and doesn't reflow when the real image swaps in. For people, prefer
`<wa-avatar>` — it renders a clean initials/icon placeholder with no `image`.

---

## Surfaces & elevation

Layer the UI with surface tokens and shadows instead of arbitrary grays.

- `--wa-color-surface-default`: the base page surface.
- `--wa-color-surface-raised`: cards, popovers, things above the page.
- `--wa-color-surface-lowered`: wells, insets, recessed areas.
- `--wa-color-surface-border`: hairline separators.

Elevation via `--wa-shadow-*`, three ready-made shadows, smallest to largest:

| Token           | Use                                    |
| --------------- | -------------------------------------- |
| `--wa-shadow-s` | Subtle lift (hover, small cards)       |
| `--wa-shadow-m` | Standard elevation (cards, popovers)   |
| `--wa-shadow-l` | Prominent elevation (dialogs, drawers) |

Rounding via `--wa-border-radius-*`:

| Token                       | Value         |
| --------------------------- | ------------- |
| `--wa-border-radius-s`      | 3px           |
| `--wa-border-radius-m`      | 6px           |
| `--wa-border-radius-l`      | 12px          |
| `--wa-border-radius-pill`   | Fully rounded |
| `--wa-border-radius-circle` | Circle (50%)  |
| `--wa-border-radius-square` | Square (0)    |

Pick one radius scale for a UI and apply it consistently (cards, inputs, buttons should agree).
`--wa-border-radius-scale` adjusts them all at once. `wa-card` and form controls already use these
tokens, so they cohere by default.

Motion via `--wa-transition-*`: `--wa-transition-fast` (75ms), `--wa-transition-normal` (150ms),
`--wa-transition-slow` (300ms). Keep transitions short and consistent.

### Borders on colored backgrounds

Bordered elements (`<wa-card>`, `<wa-callout>`, inputs, anything using `--wa-color-surface-border`)
default to a neutral **gray** hairline tuned for the page surface. Dropped onto a colored band — a brand
hero, a dark section, an inverted block — that gray border reads as a dingy stray outline that doesn't
belong. **When you place a bordered element on a colored background, restyle its border to match, don't
leave it gray.** Two fixes, easiest first:

1. **Change the `appearance`.** A `<wa-card>` is `outlined` by default (gray border). On a colored band,
   switch to `appearance="filled"`, `"accent"`, or `"plain"` to drop the border entirely, so the card
   reads as a clean filled panel instead. Often this alone solves it.
2. **Recolor the border** when you want to keep one. The card's border lives on the host, so set
   `border-color` there to a band-appropriate token — the matching `*-on-*` color, or `transparent`:

```css
/* A card sitting on a brand-fill band: tint its border to the on-brand color
   (or use appearance="filled"/"plain" to remove it). */
.on-brand-band wa-card {
  border-color: var(--wa-color-brand-on-loud);
}
```

The same principle applies to any bordered surface on a colored field: align the border (and its text)
to that field with the field's `*-on-*` tokens, rather than leaving the page-surface gray. (For _text_ on
colored bands, see the quiet/plain-control note in [theming.md](theming.md).)

---

## Custom CSS

Lean on the system. Custom CSS is for genuine gaps the system doesn't cover — a one-off section
background, a specific accent, a layout the utilities can't express. When you need it, follow this
playbook so your CSS stays themed, accessible, and dark-mode-aware automatically.

### The playbook

1. **Every value is a token.** Spacing → `--wa-space-*`. Color → `--wa-color-*`. Radius, shadow, font
   size, transition — same. No raw `px`, hex, or stray `rem`. (Same rule as inline styles — see SKILL.md
   rule 5.)
2. **Use semantic color tokens, not palette tints.** Reference `--wa-color-brand-fill-loud`,
   `--wa-color-surface-raised`, `--wa-color-text-normal` — not `--wa-color-blue-50` and friends.
   **Semantic tokens flip automatically with `wa-light` / `wa-dark`; palette tints don't.** A custom rule
   built on palette tints stays the same color in dark mode and breaks the theme.
3. **Pair colors with their matching `*-on-*` for accessible contrast.** For text on a filled background,
   use the corresponding `-on-*` token — `--wa-color-brand-on-loud` for text on `--wa-color-brand-fill-loud`.
   The built-in palettes are WCAG-tuned for these pairings, so contrast is correct without manual checking.
4. **Pick `loud` / `normal` / `quiet` as a contrast lever.** Each semantic variant (`brand`, `neutral`,
   `success`, `warning`, `danger`) exposes three weight steps:

   - **`loud`** — boldest fill, highest visual weight. Use for primary actions and hero callouts.
   - **`normal`** — default mid-step. Use for secondary surfaces and standard emphasis.
   - **`quiet`** — softest fill, lowest visual weight. Use for backgrounds, hover states, and
     de-emphasized accents.

   Pair within a step: `fill-loud` with `on-loud`, `fill-quiet` with `on-quiet`. Mixing across steps
   breaks contrast (`on-loud` text on `fill-quiet` is too dark).

5. **Reusable classes in a `<style>` block, not inline.** A class named for the role (`.brand-callout`),
   defined once, reused wherever it applies. Inline styles can't be re-themed or reused (Rule 8 in the
   main skill).
6. **Don't re-alias tokens into your own namespace.** `--brand-dark: var(--wa-color-orange-30)` defeats
   theme overrides — if the user re-themes, your alias keeps pointing at orange. Reference `--wa-*`
   tokens directly so the cascade still works.
7. **Style your own elements, not component internals.** Custom CSS belongs in your page's `<style>`
   block, targeting **your own** elements (sections, classes you define, semantic HTML). It cannot
   reach inside a `<wa-*>` component's shadow DOM — those have their own internal styles your selectors
   can't see. If your rule isn't taking effect on a component, you're hitting the shadow boundary;
   switch to the component's tokens, attributes, or `::part()` (see "Styling components & CSS parts"
   below). **Avoid `!important`** — it's almost always a sign you should be using a part or token
   instead.
8. **Scope selectors to where you mean them.** A bare element selector (`blockquote`, `ul`, `a`)
   restyles **every** instance of that element on the page. Sometimes that's the point — you're
   restyling a default — but more often you want the treatment on specific markup, so scope to a
   class (`.pull-quote`), a section wrapper, or a `:is()` group. See
   [principles.md § Theme the browser defaults](principles.md#theme-the-browser-defaults) for a
   worked example.

### A working example

```html
<section class="brand-callout">
  <h3>Important update</h3>
  <p>A custom-styled section that respects theme, dark mode, and contrast automatically.</p>
</section>

<style>
  .brand-callout {
    background-color: var(--wa-color-brand-fill-quiet);
    color: var(--wa-color-brand-on-quiet);
    padding: var(--wa-space-l);
    border-radius: var(--wa-border-radius-l);
    border: var(--wa-border-width-s) solid var(--wa-color-brand-border-normal);
  }
  .brand-callout h3 {
    margin-block-end: var(--wa-space-xs);
  }
</style>
```

This callout uses the `quiet` step (low visual weight, sits comfortably alongside body content), pairs
`fill-quiet` with `on-quiet` for tuned contrast, and uses semantic tokens throughout. Switch `<html>` to
`wa-dark` and every value re-resolves — no separate dark-mode rule needed.

---

## Styling components & CSS parts

**This applies to every Web Awesome custom element** — any `<wa-*>` tag. They all have a **shadow DOM**:
their internal markup is encapsulated, so your page styles and class names don't reach inside them. A
rule like `.my-thing { border-radius: … }` won't touch the component's actual visual surface, because
that surface lives on an internal element you can't select normally. This is the single most common
reason "my CSS isn't working" on a component.

So you never style a Web Awesome component by guessing — you style it **according to that component's
API**. **Reading that component's reference is a prerequisite to styling it**, not optional polish: before
you write any visual CSS for a `<wa-*>`, open its `references/components/<name>.md` and confirm the part,
custom property, `variant`, or `appearance` you're about to use is actually listed there. If you can't cite
the doc, don't write the rule yet.

A second, subtler trap: **don't assume how a `variant` resolves to colors.** Setting (or theming) a
component and expecting its text/border to "just match" is where dark-on-dark and invisible-border bugs come
from — especially when a theme has remapped `--wa-color-*-quiet`/`-loud`. If you change a component's
background or fill, **verify which token its text and border actually use** (from the doc), or set them
explicitly through the documented part. Example: a `<wa-callout variant="brand">` on a theme that inverted
the brand `*-quiet` tokens rendered a dark panel with near-black body text. The callout reference documents
that host `background`/`color` are supported and exposes `message` and `icon` parts — so the fix was to set
the panel and text colors explicitly through those, not to hope a `variant` token cascaded correctly.

For whatever element you're touching, look up what it exposes and use it. Reach for these in
order, stopping at the first that does the job:

1. **A token or attribute.** Most restyling is exposed as a `--wa-*` custom property or a component
   attribute (`variant`, `appearance`, `size`, `pill`, …). These pierce the shadow boundary by design
   and survive theme changes. Prefer them. Custom properties inherit, so setting a value like
   `--wa-color-brand-fill-loud` or a component's own `--*` property on a container flows inward.
2. **A `::part()` selector.** When you need to style the component's _internal_ surface — its padding,
   border, border-radius, background, width — target one of its exposed **parts**. Most components
   expose a **`base`** part (the outer wrapper); many expose more (`content`, `label`, `caret`,
   `remove-button`, `checkbox`, `thumb`, …) — the set is **per-component**, so check that element's API.
   `::part()` is the correct, supported way through the shadow boundary.
3. **Host-level layout only, on the element itself.** Properties that act on the element _as a box in
   your layout_ — `margin`, and participation in a flex/grid parent — apply to the host normally. But
   `padding`, `border`, and `background` set on the host often sit _outside_ or _behind_ the rendered
   control and won't look right; those belong on `::part(base)`.

```css
/* ✗ Doesn't reach the component's visual surface (shadow DOM blocks it). */
.cta {
  border-radius: var(--wa-border-radius-pill);
  padding-inline: var(--wa-space-2xl);
}

/* ✓ Target the part that actually renders the surface. */
.cta::part(base) {
  border-radius: var(--wa-border-radius-pill);
  padding-inline: var(--wa-space-2xl);
}

/* ✓ Width is layout (host); the internal look is the part. */
.full-width-control {
  width: 100%;
}
.full-width-control::part(base) {
  justify-content: space-between;
}
```

**Look up each component's parts, custom properties, and attributes in the
[`webawesome` skill](https://webawesome.com/docs/ai/)** (the companion component-API skill) or that
component's docs page — every component lists its "CSS parts" and "CSS custom properties." Do this for
**whatever** `<wa-*>` element you're styling, not just the common ones; the right hook differs by
component. Don't guess internal class names — they aren't stable and aren't selectable. If a component
exposes neither a token nor a part for what you need, that styling generally isn't intended — reconsider
the approach rather than forcing it.

Keep these overrides in your stylesheet as **reusable classes**, not inline `style` attributes — see
the inline-styles rule in the main skill file.

---

## Polish checklist

After the **structural Final Pass** in SKILL.md (markup, slot decisions, rule compliance), walk this
**visual-quality pass** before calling a layout done. These check the things that make the output look
intentionally designed — spacing rhythm, hierarchy, contrast on surfaces, and brand presence.

- [ ] **Spacing rhythm is consistent within a section** — at most 2 distinct `wa-gap-*` values per section (a base gap for the main flow, optionally a tighter step for closely-related inner clusters). If you see 3+ different `wa-gap-*` classes in one section, consolidate.
- [ ] A theme + palette is set on `<html>`.
- [ ] Text on filled backgrounds uses `*-on-*` tokens (accessible contrast — WCAG-tuned pairings).
- [ ] Bordered elements (cards, callouts, inputs) on colored bands don't show the default gray border — change `appearance` or recolor `border-color` to match the band.
- [ ] Quiet/plain controls on colored bands have full-contrast on-color text, not the muted page-surface color (otherwise they read as low-contrast or disabled).
- [ ] One consistent border-radius scale across cards, inputs, buttons.
- [ ] Clear hierarchy: distinct heading/body/caption styles; generous whitespace between sections.
- [ ] A single primary action per view (`variant="brand"`); secondaries are quieter (`appearance="plain"`).
- [ ] No inline `style` attributes — reusable classes live in a `<style>` block.
- [ ] Before styling any `<wa-*>`, you read its `references/components/<name>.md` and every part / `--wa-*` property / `variant` you used is actually documented there — no guessed parts, tokens, or assumed `variant`→token mappings.
- [ ] Component overrides go through tokens, attributes, or `::part()` (per the component's API), not host CSS that the shadow DOM ignores.
- [ ] Any component whose background/fill you changed has readable body text **and** border against the new background (no dark-on-dark callout/card) — set the text color explicitly via the documented part if unsure.
- [ ] Any custom CSS uses **semantic** color tokens (`--wa-color-brand-*`, `-surface-*`, `-text-*`), not raw palette tints (`--wa-color-blue-50`) — so dark mode and re-theming work automatically.
