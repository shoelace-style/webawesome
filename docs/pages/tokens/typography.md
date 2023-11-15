---
meta:
  title: Typography
  description: Typography tokens are used to maintain a consistent set of font styles throughout your app.
---

# Typography Tokens

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

| Token                 | Value           | Example                                                     |
| --------------------- | --------------- | ----------------------------------------------------------- |
| `--wa-font-size-root` | 16px            | <span style="font-size: var(--wa-font-size-root)">Aa</span> |
| `--wa-font-size-2xs`  | 0.625rem (10px) | <span style="font-size: var(--wa-font-size-2xs)">Aa</span>  |
| `--wa-font-size-xs`   | 0.75rem (12px)  | <span style="font-size: var(--wa-font-size-xs)">Aa</span>   |
| `--wa-font-size-s`    | 0.875rem (14px) | <span style="font-size: var(--wa-font-size-s)">Aa</span>    |
| `--wa-font-size-m`    | 1rem (16px)     | <span style="font-size: var(--wa-font-size-m)">Aa</span>    |
| `--wa-font-size-l`    | 1.375rem (22px) | <span style="font-size: var(--wa-font-size-l)">Aa</span>    |
| `--wa-font-size-xl`   | 1.875rem (30px) | <span style="font-size: var(--wa-font-size-xl)">Aa</span>   |
| `--wa-font-size-2xl`  | 2.625rem (42px) | <span style="font-size: var(--wa-font-size-2xl)">Aa</span>  |

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

| Token                          | Value | Example                                                                                                                                                                                                            |
| ------------------------------ | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--wa-line-height-compact`     | 1.25  | <div style="line-height: var(--wa-line-height-compact);">The quick brown fox jumped over the lazy dog.<br>The quick brown fox jumped over the lazy dog.<br>The quick brown fox jumped over the lazy dog.</div>     |
| `--wa-line-height-regular`     | 1.625 | <div style="line-height: var(--wa-line-height-regular);">The quick brown fox jumped over the lazy dog.<br>The quick brown fox jumped over the lazy dog.<br>The quick brown fox jumped over the lazy dog.</div>     |
| `--wa-line-height-comfortable` | 2     | <div style="line-height: var(--wa-line-height-comfortable);">The quick brown fox jumped over the lazy dog.<br>The quick brown fox jumped over the lazy dog.<br>The quick brown fox jumped over the lazy dog.</div> |
