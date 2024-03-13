---
title: Typography
description: Typography tokens are used to maintain a consistent set of font styles throughout your app.
---

Typography tokens are used to maintain a consistent set of font styles throughout your app.

## Font Family

The default font stack is designed to be simple and highly available on as many devices as possible.

| Token                       | Value                                                                              | Example                                                                                                        |
| --------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `--wa-font-family-heading`  | system-ui                                                                          | <span style="font-family: var(--wa-font-family-heading)">The quick brown fox jumped over the lazy dog.</span>  |
| `--wa-font-family-body`     | system-ui                                                                          | <span style="font-family: var(--wa-font-family-body)">The quick brown fox jumped over the lazy dog.</span>     |
| `--wa-font-family-code`     | 'Noto Sans Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; | <span style="font-family: var(--wa-font-family-code)">The quick brown fox jumped over the lazy dog.</span>     |
| `--wa-font-family-longform` | 'Lora', serif;                                                                     | <span style="font-family: var(--wa-font-family-longform)">The quick brown fox jumped over the lazy dog.</span> |

## Font Size

Font sizes use `rem` units so they scale with the base font size. The pixel values displayed are based on a 16px font size.

| Token                 | Value            | Example                                                       |
| --------------------- | ---------------- | ------------------------------------------------------------- |
| `--wa-font-size-root` | 16px             | <span style="font-size: var(--wa-font-size-root)">AaBb</span> |
| `--wa-font-size-2xs`  | 0.6875rem (11px) | <span style="font-size: var(--wa-font-size-xs)">AaBb</span>   |
| `--wa-font-size-xs`   | 0.75rem (12px)   | <span style="font-size: var(--wa-font-size-xs)">AaBb</span>   |
| `--wa-font-size-s`    | 0.875rem (14px)  | <span style="font-size: var(--wa-font-size-s)">AaBb</span>    |
| `--wa-font-size-m`    | 1rem (16px)      | <span style="font-size: var(--wa-font-size-m)">AaBb</span>    |
| `--wa-font-size-l`    | 1.25rem (20px)   | <span style="font-size: var(--wa-font-size-l)">AaBb</span>    |
| `--wa-font-size-xl`   | 1.625rem (26px)  | <span style="font-size: var(--wa-font-size-xl)">AaBb</span>   |
| `--wa-font-size-2xl`  | 2rem (32px)      | <span style="font-size: var(--wa-font-size-2xl)">AaBb</span>  |
| `--wa-font-size-3xl`  | 2.5625rem (41px) | <span style="font-size: var(--wa-font-size-3xl)">AaBb</span>  |
| `--wa-font-size-4xl`  | 3.25rem (52px)   | <span style="font-size: var(--wa-font-size-4xl)">AaBb</span>  |

## Font Weight

| Token                      | Value                          | Example                                                                                                        |
| -------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `--wa-font-weight-light`   | 300                            | <span style="font-weight: var(--wa-font-weight-light);">The quick brown fox jumped over the lazy dog.</span>   |
| `--wa-font-weight-normal`  | 400                            | <span style="font-weight: var(--wa-font-weight-normal);">The quick brown fox jumped over the lazy dog.</span>  |
| `--wa-font-weight-medium`  | 500                            | <span style="font-weight: var(--wa-font-weight-medium);">The quick brown fox jumped over the lazy dog.</span>  |
| `--wa-font-weight-heavy`   | 600                            | <span style="font-weight: var(--wa-font-weight-heavy);">The quick brown fox jumped over the lazy dog.</span>   |
| `--wa-font-weight-heading` | `var(--wa-font-weight-medium)` | <span style="font-weight: var(--wa-font-weight-heading);">The quick brown fox jumped over the lazy dog.</span> |
| `--wa-font-weight-body`    | `var(--wa-font-weight-normal)` | <span style="font-weight: var(--wa-font-weight-body);">The quick brown fox jumped over the lazy dog.</span>    |

## Line Height

| Token                          | Value | Example                                                                                                                                                                                                                 |
| ------------------------------ | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--wa-line-height-compact`     | 1.25  | <div style="line-height: var(--wa-font-line-height-compact);">The quick brown fox jumped over the lazy dog.<br>The quick brown fox jumped over the lazy dog.<br>The quick brown fox jumped over the lazy dog.</div>     |
| `--wa-line-height-regular`     | 1.6   | <div style="line-height: var(--wa-font-line-height-regular);">The quick brown fox jumped over the lazy dog.<br>The quick brown fox jumped over the lazy dog.<br>The quick brown fox jumped over the lazy dog.</div>     |
| `--wa-line-height-comfortable` | 2     | <div style="line-height: var(--wa-font-line-height-comfortable);">The quick brown fox jumped over the lazy dog.<br>The quick brown fox jumped over the lazy dog.<br>The quick brown fox jumped over the lazy dog.</div> |
