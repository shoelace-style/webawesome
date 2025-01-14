---
title: Shadows
description: Elevate your components with Web Awesome's shadow properties.
---

Shadows indicate elevation and, often, interactivity. Web Awesome offers highly modular shadow properties to easily create custom shadow effects or transform elements based on specific shadow qualities. Together with [`--wa-color-shadow`](/docs/tokens/color/#shadow), these tokens create realistic shadows for Web Awesome components.

Shadows are constructed using corresponding offset-x, offset-y, blur, and spread properties, detailed in the sections below. In Web Awesome, shadows use a size-based scale where larger shadows have greater offset and blur values to indicate greater distance from the surface below.

| Custom Property  |  Default Value                                                      |
| ---------------- | ------------------------------------------------------------------- |
| `--wa-shadow-s`  | <div class="swatch" style="box-shadow: var(--wa-shadow-s);"></div>  |
| `--wa-shadow-m`  | <div class="swatch" style="box-shadow: var(--wa-shadow-m);"></div>  |
| `--wa-shadow-l`  | <div class="swatch" style="box-shadow: var(--wa-shadow-l);"></div>  |

Any shadow may be implemented as an inner box shadow using the `inset` keyword, e.g. `box-shadow: inset var(--wa-shadow-s);`.

## Horizontal Offset (X)

Each offset-x property uses a `calc()` function with `--wa-shadow-offset-x-scale` to uniformly scale horizontal offset values. By default, this multiplier is `0`. The table below lists the result of the calculation.

| Custom Property           |  Default Value |
| ------------------------- | -------------- |
| `--wa-shadow-offset-x-s`  | `0rem`         |
| `--wa-shadow-offset-x-m`  | `0rem`         |
| `--wa-shadow-offset-x-l`  | `0rem`         |

## Vertical Offset (Y)

Each offset-y property uses a `calc()` function with `--wa-shadow-offset-y-scale` to uniformly scale vertical offset values. By default, this multiplier is `1`. The table below lists the result of the calculation.

| Custom Property           |  Default Value                   |
| ------------------------- | -------------------------------- |
| `--wa-shadow-offset-y-s`  | `0.125rem` <small>(2px)</small>  |
| `--wa-shadow-offset-y-m`  | `0.25rem` <small>(4px)</small>   |
| `--wa-shadow-offset-y-l`  | `0.5rem` <small>(8px)</small>    |

## Blur

Each blur property uses a `calc()` function with `--wa-shadow-blur-scale` to uniformly scale blur values. By default, this multiplier is `1`. The table below lists the result of the calculation.

| Custom Property       |  Default Value                   |
| --------------------- | -------------------------------- |
| `--wa-shadow-blur-s`  | `0.125rem` <small>(2px)</small>  |
| `--wa-shadow-blur-m`  | `0.25rem` <small>(4px)</small>   |
| `--wa-shadow-blur-l`  | `0.5rem` <small>(8px)</small>    |

## Spread

Each spread property uses a `calc()` function with `--wa-shadow-spread-scale` to uniformly scale spread values. By default, this multiplier is `-0.5`. The table below lists the result of the calculation.

| Custom Property         |  Default Value                       |
| ----------------------- | ------------------------------------ |
| `--wa-shadow-spread-s`  | `-0.0625rem` <small>(-1px)</small>    |
| `--wa-shadow-spread-m`  | `-0.125rem` <small>(-2px)</small>     |
| `--wa-shadow-spread-l`  | `-0.25rem` <small>(-4px)</small>      |
