---
title: Borders
description: Change the edges and corners of your components with Web Awesome's border properties.
---

## Style

Border style controls the standard line shape of borders throughout Web Awesome.

| Custom Property     | Default Value | Preview                                                                 |
| ------------------- | ------------- | ----------------------------------------------------------------------- |
| `--wa-border-style` | `solid`       | <div class="swatch" style="border-style: var(--wa-border-style)"></div> |

## Width

Border widths use `rem` units in order to scale proportionately with the root font size.

| Custom Property       | Default Value                    | Preview                                                                   |
| --------------------- | -------------------------------- | ------------------------------------------------------------------------- |
| `--wa-border-width-s` | `0.0625rem` <small>(1px)</small> | <div class="swatch" style="border-width: var(--wa-border-width-s)"></div> |
| `--wa-border-width-m` | `0.125rem` <small>(2px)</small>  | <div class="swatch" style="border-width: var(--wa-border-width-m)"></div> |
| `--wa-border-width-l` | `0.1875rem` <small>(3px)</small> | <div class="swatch" style="border-width: var(--wa-border-width-l)"></div> |

To scale all borders at once, you can use the  `--wa-border-width-scale` property which specifies a multiplier on `border-width`.
Values < 1 make all borders uniformly thinner, while values > 1 make them thicker.

## Radius

Border radius controls the corners of Web Awesome components.

Common border radius properties allow you to achieve specific shapes beyond your theme's preferred corner styles.

| Custom Property             | Default Value | Preview                                                                                               |
| --------------------------- | ------------- | ----------------------------------------------------------------------------------------------------- |
| `--wa-border-radius-pill`   | `9999px`      | <div class="swatch" style="border-radius: var(--wa-border-radius-pill)"></div>                        |
| `--wa-border-radius-circle` | `50%`         | <div class="swatch" style="aspect-ratio: 1 / 1; border-radius: var(--wa-border-radius-circle)"></div> |
| `--wa-border-radius-square` | `0px`         | <div class="swatch" style="border-radius: var(--wa-border-radius-square)"></div>                      |

Size-based border radius properties allow you to customize the overall roundness of Web Awesome components. These use `rem` units in order to scale proportionately with the root font size.

| Custom Property         | Default Value                    |  Preview                                                                    |
| ----------------------- | -------------------------------- | --------------------------------------------------------------------------- |
| `--wa-border-radius-s`  | `0.1875rem` <small>(3px)</small> | <div class="swatch" style="border-radius: var(--wa-border-radius-s)"></div> |
| `--wa-border-radius-m`  | `0.375rem` <small>(6px)</small>  | <div class="swatch" style="border-radius: var(--wa-border-radius-m)"></div> |
| `--wa-border-radius-l`  | `0.75rem` <small>(12px)</small>  | <div class="swatch" style="border-radius: var(--wa-border-radius-l)"></div> |

To scale all border radii at once, you can use the  `--wa-border-radius-scale` property which specifies a multiplier on `border-radius`.
Values < 1 make corners sharper, while values > 1 make them rounder.
