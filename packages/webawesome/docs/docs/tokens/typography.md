---
title: Typography
description: Get consistent font styles and vertical rhythm with Web Awesome's typography properties.
layout: page-outline
---

## Font Family

Font families are assigned specific roles &mdash; like heading or code &mdash; to help keep text styles consistent and easy to customize. By default, these properties use system fonts and generic fallbacks to maximize performance.

| Custom Property             | Default Value                          | Preview                                                                                              |
| --------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `--wa-font-family-body`     | `ui-sans-serif, system-ui, sans-serif` | <div style="font-family: var(--wa-font-family-body)">Sphinx of black quartz, judge my vow.</div>     |
| `--wa-font-family-heading`  | `var(--wa-font-family-body)`           | <div style="font-family: var(--wa-font-family-heading)">Sphinx of black quartz, judge my vow.</div>  |
| `--wa-font-family-code`     | `ui-monospace, monospace`              | <div style="font-family: var(--wa-font-family-code)">Sphinx of black quartz, judge my vow.</div>     |
| `--wa-font-family-longform` | `ui-serif, serif`                      | <div style="font-family: var(--wa-font-family-longform)">Sphinx of black quartz, judge my vow.</div> |

## Font Size

Font sizes use a ratio of 1.125 to scale sizes proportionally. Starting with the medium (`m`) font size, smaller sizes (`s` through `2xs`) are 1.125x smaller as the sizes decrease, and larger sizes (`l` through `4xl`) are _twice_ 1.125x larger as sizes increase — here, the ratio is doubled to maximize impact between sizes.

Each value uses `rem` units and is rounded to the nearest whole pixel when rendered with [`round()`](https://developer.mozilla.org/en-US/docs/Web/CSS/round).

You can use `--wa-font-size-scale` to increase or decrease all font sizes at once. By default, this multiplier is `1`. 

The calculations for each size and the resulting pixel value (assuming a 16px root font size) are listed below.

| Custom Property      | Default Value                     | Preview                                                    |
| -------------------- | --------------------------------- | ---------------------------------------------------------- |
| `--wa-font-size-2xs` | `round(calc(var(--wa-font-size-xs) / 1.125), 1px)` <small>(11px)</small> | <div style="font-size: var(--wa-font-size-2xs)">AaBb</div> |
| `--wa-font-size-xs`  | `round(calc(var(--wa-font-size-s) / 1.125), 1px)` <small>(12px)</small>   | <div style="font-size: var(--wa-font-size-xs)">AaBb</div>  |
| `--wa-font-size-s`   | `round(calc(var(--wa-font-size-m) / 1.125), 1px)` <small>(14px)</small>  | <div style="font-size: var(--wa-font-size-s)">AaBb</div>   |
| `--wa-font-size-m`   | `calc(1rem * var(--wa-font-size-scale))` <small>(16px)</small>      | <div style="font-size: var(--wa-font-size-m)">AaBb</div>   |
| `--wa-font-size-l`   | `round(calc(var(--wa-font-size-m) * 1.125 * 1.125), 1px)` <small>(20px)</small>   | <div style="font-size: var(--wa-font-size-l)">AaBb</div>   |
| `--wa-font-size-xl`  | `round(calc(var(--wa-font-size-l) * 1.125 * 1.125), 1px)` <small>(25px)</small>  | <div style="font-size: var(--wa-font-size-xl)">AaBb</div>  |
| `--wa-font-size-2xl` | `round(calc(var(--wa-font-size-xl) * 1.125 * 1.125), 1px)` <small>(32px)</small>      | <div style="font-size: var(--wa-font-size-2xl)">AaBb</div> |
| `--wa-font-size-3xl` | `round(calc(var(--wa-font-size-2xl) * 1.125 * 1.125), 1px)` <small>(41px)</small> | <div style="font-size: var(--wa-font-size-3xl)">AaBb</div> |
| `--wa-font-size-4xl` | `round(calc(var(--wa-font-size-3xl) * 1.125 * 1.125)` <small>(52px)</small>   | <div style="font-size: var(--wa-font-size-4xl)">AaBb</div> |

You can also use these two custom properties make any font size proportionally smaller or larger to its parent.

| Custom Property          | Default Value                           |
| ------------------------ | --------------------------------------- |
| `--wa-font-size-smaller` | `round(calc(1em / 1.125), 1px)`         |
| `--wa-font-size-larger`  | `round(calc(1em * 1.125 * 1.125), 1px)` |

## Font Weight

Font weight properties are given common names or assigned specific roles.

Common weights let you easily adjust the full range of weights for your theme.

| Custom Property             | Default Value | Preview                                                             |
| --------------------------- | ------------- | ------------------------------------------------------------------- |
| `--wa-font-weight-light`    | `300`         | <div style="font-weight: var(--wa-font-weight-light)">AaBb</div>    |
| `--wa-font-weight-normal`   | `400`         | <div style="font-weight: var(--wa-font-weight-normal)">AaBb</div>   |
| `--wa-font-weight-semibold` | `500`         | <div style="font-weight: var(--wa-font-weight-semibold)">AaBb</div> |
| `--wa-font-weight-bold`     | `600`         | <div style="font-weight: var(--wa-font-weight-bold)">AaBb</div>     |

Role-based weights allow you to uniformly adjust the weight of certain types of text to keep styles consistent.

| Custom Property             | Default Value                    | Preview                                                            |
| --------------------------- | -------------------------------- | ------------------------------------------------------------------ |
| `--wa-font-weight-body`     | `var(--wa-font-weight-normal)`   | <div style="font-weight: var(--wa-font-weight-body)">AaBb</div>    |
| `--wa-font-weight-heading`  | `var(--wa-font-weight-bold)`     | <div style="font-weight: var(--wa-font-weight-heading)">AaBb</div> |
| `--wa-font-weight-code`     | `var(--wa-font-weight-normal)`   | <div style="font-weight: var(--wa-font-weight-code)">AaBb</div> |
| `--wa-font-weight-longform` | `var(--wa-font-weight-normal)`   | <div style="font-weight: var(--wa-font-weight-longform)">AaBb</div> |
| `--wa-font-weight-action`   | `var(--wa-font-weight-semibold)` | <div style="font-weight: var(--wa-font-weight-action)">AaBb</div>  |

In Web Awesome, we use `--wa-font-weight-action` for interactive text, such as button labels and tab names. We also recommend using `--wa-font-weight-action` for text that uses color alone to signal interactivity, such as links without text decoration.

## Line Height

Line heights control the distance between lines of text and are unitless to scale proportionately with text size. For readability, `--wa-line-height-normal`, recommended for paragraph text, should be 1.5 or greater.


| Custom Property              | Default Value | Preview                                                                                                                      |
| ---------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `--wa-line-height-condensed` | `1.2`       | <div style="line-height: var(--wa-line-height-condensed); border-block-color: var(--wa-color-neutral-border-loud)">AaBb</div> |
| `--wa-line-height-normal`    | `1.6`         | <div style="line-height: var(--wa-line-height-normal); border-block-color: var(--wa-color-neutral-border-loud)">AaBb</div>    |
| `--wa-line-height-expanded`  | `2`           | <div style="line-height: var(--wa-line-height-expanded); border-block-color: var(--wa-color-neutral-border-loud)">AaBb</div>  |

## Links

Together with [`--wa-color-link`](/docs/tokens/color/#text), these tokens add text decoration to `<a>` elements to signal their role as hyperlinks.

| Custom Property                | Default Value                                                                      |
| ------------------------------ | ---------------------------------------------------------------------------------- |
| `--wa-link-decoration-default` | `underline color-mix(in oklab, var(--wa-color-text-link) 70%, transparent) dotted` |
| `--wa-link-decoration-hover`   | `underline`                                                                        |
