---
title: Text
description: Text utility classes combine custom properties from your Web Awesome theme to conveniently style text content.
tags: ["utilities", "layout"]
---

Web Awesome includes classes to set multiple text properties at once to style body text, headings, and captions.

## Body

Use body classes to style the main content of your pages. Each `wa-body-*` class specifies the following properties:
- `font-family: var(--wa-font-family-body);`
- `font-weight: var(--wa-font-weight-body);`
- `line-height: var(--wa-line-height-normal);`

Additionally, each class specifies a `font-size` that corresponds to a [`--wa-font-size-*`](/docs/tokens/typography/#font-size) token from your theme.

| Class Name         | `font-size` Value    |  Preview                                                                  |
| ------------------ | -------------------- | ------------------------------------------------------------------------- |
| `wa-body-xs`  | `--wa-font-size-xs`  | <div class="wa-body-xs">Sphinx of black quartz, judge my vow.</div>  |
| `wa-body-s`   | `--wa-font-size-s`   | <div class="wa-body-s">Sphinx of black quartz, judge my vow.</div>   |
| `wa-body-m`   | `--wa-font-size-m`   | <div class="wa-body-m">Sphinx of black quartz, judge my vow.</div>   |
| `wa-body-l`   | `--wa-font-size-l`   | <div class="wa-body-l">Sphinx of black quartz, judge my vow.</div>   |
| `wa-body-xl`  | `--wa-font-size-xl`  | <div class="wa-body-xl">Sphinx of black quartz, judge my vow.</div>  |

## Headings

Use heading classes to style section titles and headings in your content. Each `wa-heading-*` class specifies the following properties:
- `font-family: var(--wa-font-family-heading);`
- `font-weight: var(--wa-font-weight-heading);`
- `line-height: var(--wa-line-height-condensed);`
- `text-wrap: balance;`

Additionally, each class specifies a `font-size` using a [`--wa-font-size-*`](/docs/tokens/typography/#font-size) token from your theme. Heading classes are one font size larger than the corresponding `wa-body-*` class.

| Class Name       | `font-size` Value    | Preview                                               |
| ---------------- | -------------------- | ----------------------------------------------------- |
| `wa-heading-xs`  | `--wa-font-size-s`   | <div class="wa-heading-xs">Five Boxing Wizards</div>  |
| `wa-heading-s`   | `--wa-font-size-m`   | <div class="wa-heading-s">Five Boxing Wizards</div>   |
| `wa-heading-m`   | `--wa-font-size-l`   | <div class="wa-heading-m">Five Boxing Wizards</div>   |
| `wa-heading-l`   | `--wa-font-size-xl`  | <div class="wa-heading-l">Five Boxing Wizards</div>   |
| `wa-heading-xl`  | `--wa-font-size-2xl` | <div class="wa-heading-xl">Five Boxing Wizards</div>  |
| `wa-heading-2xl` | `--wa-font-size-3xl` | <div class="wa-heading-2xl">Five Boxing Wizards</div> |
| `wa-heading-3xl` | `--wa-font-size-4xl` | <div class="wa-heading-3xl">Five Boxing Wizards</div> |

## Captions

Use caption classes to style descriptions or auxiliary text in your content. Each `wa-caption-*` class specifies the following properties:
- `color: var(--wa-color-text-quiet);`
- `font-family: var(--wa-font-family-body);`
- `font-weight: var(--wa-font-weight-body);`
- `line-height: var(--wa-line-height-condensed);`

Additionally, each class specifies a `font-size` using a [`--wa-font-size-*`](/docs/tokens/typography/#font-size) token from your theme. Caption classes are one font size smaller than the corresponding `wa-body-*` class.

| Class Name       | `font-size` Value    | Preview                                                                        |
| ---------------- | -------------------- | ------------------------------------------------------------------------------ |
| `wa-caption-xs`  | `--wa-font-size-2xs` | <div class="wa-caption-xs">The quick brown fox jumps over the lazy dog.</div>  |
| `wa-caption-s`   | `--wa-font-size-xs`  | <div class="wa-caption-s">The quick brown fox jumps over the lazy dog.</div>   |
| `wa-caption-m`   | `--wa-font-size-s`   | <div class="wa-caption-m">The quick brown fox jumps over the lazy dog.</div>   |
| `wa-caption-l`   | `--wa-font-size-m`   | <div class="wa-caption-l">The quick brown fox jumps over the lazy dog.</div>   |
| `wa-caption-xl`  | `--wa-font-size-l`   | <div class="wa-caption-xl">The quick brown fox jumps over the lazy dog.</div>  |
