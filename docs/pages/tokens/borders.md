---
meta:
  title: Border Tokens
  description: Border tokens are used to control borders and corners.
---

# Border Tokens

Border radius tokens are used to give sharp edges a more subtle, rounded effect. They use rem units so they scale with the base font size. The pixel values displayed are based on a 16px font size.

| Token                      | Value                                         | Example                                                                              |
| -------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------ |
| `--wa-border-style`        | `solid`                                       |                                                                                      |
| `--wa-border-width-thin`   | `0.0625rem` (1px)                             | <div class="border-demo" style="border-width: var(--wa-border-width-thin);"></div>   |
| `--wa-border-width-medium` | `calc(var(--wa-border-width-thin) * 2)` (2px) | <div class="border-demo" style="border-width: var(--wa-border-width-medium);"></div> |
| `--wa-border-width-thick`  | `calc(var(--wa-border-width-thin) * 3)` (3px) | <div class="border-demo" style="border-width: var(--wa-border-width-thick);"></div>  |

## Corners

TODO

| Token             | Value                             | Example                                                                      |
| ----------------- | --------------------------------- | ---------------------------------------------------------------------------- |
| `--wa-corners-xs` | `calc(var(--wa-corners-s) * 0.5)` | <div class="corner-demo" style="border-radius: var(--wa-corners-xs);"></div> |
| `--wa-corners-s`  | `0.25rem`                         | <div class="corner-demo" style="border-radius: var(--wa-corners-s);"></div>  |
| `--wa-corners-m`  | `calc(var(--wa-corners-s) * 2)`   | <div class="corner-demo" style="border-radius: var(--wa-corners-m);"></div>  |
| `--wa-corners-l`  | `calc(var(--wa-corners-s) * 3)`   | <div class="corner-demo" style="border-radius: var(--wa-corners-l);"></div>  |

## Special Corners

TODO

| Token                 | Value    | Example                                                                                     |
| --------------------- | -------- | ------------------------------------------------------------------------------------------- |
| `--wa-corners-pill`   | `9999px` | <div class="corner-demo" style="width: 6rem; border-radius: var(--wa-corners-pill);"></div> |
| `--wa-corners-circle` | `50%`    | <div class="corner-demo" style="border-radius: var(--wa-corners-circle);"></div>            |
| `--wa-corners-sharp`  | `0`      | <div class="corner-demo" style="border-radius: var(--wa-corners-sharp);"></div>             |
