---
title: Text
description: Text utility classes use custom properties from your Web Awesome theme and other standard CSS properties to style text elements on the fly.
layout: docs
tags: styleUtilities
---

<style>
  th {
    min-inline-size: 15ch;
  }
</style>

{{ description }} 

## Body

Use `wa-body-*` classes to style the main content of your pages. Each class specifies a `font-size` that corresponds to a [font size token](/docs/tokens/typography/#font-size) from your theme.

Alternatively, use `wa-body` to apply the same styling without an explicit font size.

| Class Name    | Preview                                            |
| ------------- | -------------------------------------------------- |
| `wa-body-2xs` | <div class="wa-body-2xs">Five boxing wizards</div> |
| `wa-body-xs`  | <div class="wa-body-xs">Five boxing wizards</div>  |
| `wa-body-s`   | <div class="wa-body-s">Five boxing wizards</div>   |
| `wa-body-m`   | <div class="wa-body-m">Five boxing wizards</div>   |
| `wa-body-l`   | <div class="wa-body-l">Five boxing wizards</div>   |
| `wa-body-xl`  | <div class="wa-body-xl">Five boxing wizards</div>  |
| `wa-body-2xl` | <div class="wa-body-2xl">Five boxing wizards</div> |
| `wa-body-3xl` | <div class="wa-body-3xl">Five boxing wizards</div> |
| `wa-body-4xl` | <div class="wa-body-4xl">Five boxing wizards</div> |

## Headings

Use `wa-heading-*` classes to style section titles and headings in your content. Each class specifies a `font-size` that corresponds to a [font size token](/docs/tokens/typography/#font-size) from your theme.

Alternatively, use `wa-heading` to apply the same styling without an explicit font size.

| Class Name       | Preview                                               |
| ---------------- | ----------------------------------------------------- |
| `wa-heading-2xs` | <div class="wa-heading-2xs">Five boxing wizards</div> |
| `wa-heading-xs`  | <div class="wa-heading-xs">Five boxing wizards</div>  |
| `wa-heading-s`   | <div class="wa-heading-s">Five boxing wizards</div>   |
| `wa-heading-m`   | <div class="wa-heading-m">Five boxing wizards</div>   |
| `wa-heading-l`   | <div class="wa-heading-l">Five boxing wizards</div>   |
| `wa-heading-xl`  | <div class="wa-heading-xl">Five boxing wizards</div>  |
| `wa-heading-2xl` | <div class="wa-heading-2xl">Five boxing wizards</div> |
| `wa-heading-3xl` | <div class="wa-heading-3xl">Five boxing wizards</div> |
| `wa-heading-4xl` | <div class="wa-heading-4xl">Five boxing wizards</div> |

## Captions

Use `wa-caption-*` classes to style descriptions or auxiliary text in your content. Each class specifies a `font-size` that corresponds to a [font size token](/docs/tokens/typography/#font-size) from your theme.

Alternatively, use `wa-caption` to apply the same styling without an explicit font size.

| Class Name       | Preview                                               |
| ---------------- | ----------------------------------------------------- |
| `wa-caption-2xs` | <div class="wa-caption-2xs">Five boxing wizards</div> |
| `wa-caption-xs`  | <div class="wa-caption-xs">Five boxing wizards</div>  |
| `wa-caption-s`   | <div class="wa-caption-s">Five boxing wizards</div>   |
| `wa-caption-m`   | <div class="wa-caption-m">Five boxing wizards</div>   |
| `wa-caption-l`   | <div class="wa-caption-l">Five boxing wizards</div>   |
| `wa-caption-xl`  | <div class="wa-caption-xl">Five boxing wizards</div>  |
| `wa-caption-2xl` | <div class="wa-caption-2xl">Five boxing wizards</div> |
| `wa-caption-3xl` | <div class="wa-caption-3xl">Five boxing wizards</div> |
| `wa-caption-4xl` | <div class="wa-caption-4xl">Five boxing wizards</div> |

## Longform

Use `wa-longform-*` classes to style lengthy content like essays or blog posts. Each class specifies a `font-size` that corresponds to a [font size token](/docs/tokens/typography/#font-size) from your theme.

Alternatively, use `wa-longform` to apply the same styling without an explicit font size.

| Class Name        | Preview                                                |
| ----------------- | ------------------------------------------------------ |
| `wa-longform-2xs` | <div class="wa-longform-2xs">Five boxing wizards</div> |
| `wa-longform-xs`  | <div class="wa-longform-xs">Five boxing wizards</div>  |
| `wa-longform-s`   | <div class="wa-longform-s">Five boxing wizards</div>   |
| `wa-longform-m`   | <div class="wa-longform-m">Five boxing wizards</div>   |
| `wa-longform-l`   | <div class="wa-longform-l">Five boxing wizards</div>   |
| `wa-longform-xl`  | <div class="wa-longform-xl">Five boxing wizards</div>  |
| `wa-longform-2xl` | <div class="wa-longform-2xl">Five boxing wizards</div> |
| `wa-longform-3xl` | <div class="wa-longform-3xl">Five boxing wizards</div> |
| `wa-longform-4xl` | <div class="wa-longform-4xl">Five boxing wizards</div> |

## Links

Use `wa-link` to give interactive text a link-like appearance. Alternatively, use `wa-link-plain` to remove typical link styles from `<a>` elements.

| Class Name      | Preview                                                  |
| --------------- | -------------------------------------------------------- |
| `wa-link`       | <div class="wa-link">Five boxing wizards</div>           |
| `wa-link-plain` | <a href="" class="wa-link-plain">Five boxing wizards</a> |

## Lists

Ordered (`<ol>`) and unordered (`<ul>`) lists are given default styles by either Web Awesome's [native styles](/docs/utilities/native/) or your browser. Use `wa-list-plain` to clear any built-in list styles.

| Class Name      | Preview                                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| `wa-list-plain` | <ol class="wa-list-plain"><li>First list item</li><li>Second list item</li><li>Final list item</li></ol> |

## Form Controls

Use `wa-form-control-*` classes to style labels, values, placeholders, and hints outside of typical form control contexts with [form control tokens](/docs/tokens/component-groups/#form-controls) from your theme.

| Class Name                    | Preview                                                            |
| ----------------------------- | ------------------------------------------------------------------ |
| `wa-form-control-label`       | <div class="wa-form-control-label">Five boxing wizards</div>       |
| `wa-form-control-value`       | <div class="wa-form-control-value">Five boxing wizards</div>       |
| `wa-form-control-placeholder` | <div class="wa-form-control-placeholder">Five boxing wizards</div> |
| `wa-form-control-hint`        | <div class="wa-form-control-hint">Five boxing wizards</div>        |

## Font Size

Use single-purpose `wa-font-size-*` classes to apply a given [font size](/docs/tokens/typography/#font-size) from your theme to any element without additional styling.

| Class Name         | Preview                                                 |
| ------------------ | ------------------------------------------------------- |
| `wa-font-size-2xs` | <div class="wa-font-size-2xs">Five boxing wizards</div> |
| `wa-font-size-xs`  | <div class="wa-font-size-xs">Five boxing wizards</div>  |
| `wa-font-size-s`   | <div class="wa-font-size-s">Five boxing wizards</div>   |
| `wa-font-size-m`   | <div class="wa-font-size-m">Five boxing wizards</div>   |
| `wa-font-size-l`   | <div class="wa-font-size-l">Five boxing wizards</div>   |
| `wa-font-size-xl`  | <div class="wa-font-size-xl">Five boxing wizards</div>  |
| `wa-font-size-2xl` | <div class="wa-font-size-2xl">Five boxing wizards</div> |
| `wa-font-size-3xl` | <div class="wa-font-size-3xl">Five boxing wizards</div> |
| `wa-font-size-4xl` | <div class="wa-font-size-4xl">Five boxing wizards</div> |

## Font Weight

Use single-purpose `wa-font-weight-*` classes to apply a given [font weight](/docs/tokens/typography/#font-weight) from your theme to any element without additional styling.

| Class Name                | Preview                                                        |
| ------------------------- | -------------------------------------------------------------- |
| `wa-font-weight-light`    | <div class="wa-font-weight-light">Five boxing wizards</div>    |
| `wa-font-weight-normal`   | <div class="wa-font-weight-normal">Five boxing wizards</div>   |
| `wa-font-weight-semibold` | <div class="wa-font-weight-semibold">Five boxing wizards</div> |
| `wa-font-weight-bold`     | <div class="wa-font-weight-bold">Five boxing wizards</div>     |

## Text Color

Use single-purpose `wa-color-text-*` classes to apply a given [text color](/docs/tokens/color/#text) from your theme to any element without additional styling.

| Class Name             | Preview                                                     |
| ---------------------- | ----------------------------------------------------------- |
| `wa-color-text-quiet`  | <div class="wa-color-text-quiet">Five boxing wizards</div>  |
| `wa-color-text-normal` | <div class="wa-color-text-normal">Five boxing wizards</div> |
| `wa-color-text-link`   | <div class="wa-color-text-link">Five boxing wizards</div>   |

## Truncation

Use the `wa-text-truncate` class to truncate text with an ellipsis instead of letting it overflow or wrap.

| Class Name         | Preview                                                     |
| ------------------ | ----------------------------------------------------------- |
| `wa-text-truncate` | <div class="wa-text-truncate" style="max-width: 40ch;">The five boxing wizards jump quickly. How quickly daft jumping zebras vex!</div>  |