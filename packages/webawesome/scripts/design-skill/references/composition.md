# Visual composition

This is how you make Web Awesome output look **designed** rather than merely functional: consistent
spacing rhythm, the right layout utility for each job, a typographic scale, and deliberate use of
surfaces and elevation. The throughline: **use the scales and tokens; never improvise raw values.**

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

---

## Polish checklist

Before calling a layout done:

- [ ] Spacing comes from `wa-gap-*` / `--wa-space-*` (no raw `px`).
- [ ] Colors are semantic tokens (`--wa-color-brand-*`, `-surface-*`, `-text-*`), not hex.
- [ ] Layout uses utilities (`wa-stack`/`wa-cluster`/`wa-grid`/…) with minimal hand-rolled flex/grid.
- [ ] A theme + palette is set on `<html>`.
- [ ] Text on filled backgrounds uses `*-on-*` tokens (accessible contrast).
- [ ] One consistent border-radius scale across cards, inputs, buttons.
- [ ] Clear hierarchy: distinct heading/body/caption styles; generous whitespace between sections.
- [ ] A single primary action per view (`variant="brand"`); secondaries are quieter (`appearance="plain"`).
