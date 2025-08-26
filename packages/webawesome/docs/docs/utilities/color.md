---
title: Color Variants
description: Color utilities allow you to apply the brand, neutral, success, warning, and danger colors from your theme to any element.
layout: docs
tags: styleUtilities
---

Some Web Awesome components, like `<wa-button>`, allow you to change the color by using a `variant` attribute:

- [`<wa-badge>`](/docs/components/badge)
- [`<wa-button>`](/docs/components/button)
- [`<wa-button-group>`](/docs/components/button-group)
- [`<wa-callout>`](/docs/components/callout)
- [`<wa-tag>`](/docs/components/tag)

You can create the same effect on any element by using the color variant utility classes:

- `.wa-brand`
- `.wa-neutral`
- `.wa-success`
- `.wa-warning`
- `.wa-danger`

Using these classes is a two-way handshake:
they do not directly apply styles, but define generic color tokens modeled after our [Semantic Colors](/docs/tokens/color/#semantic-colors) but _without_ the group identifier (`neutral`, `brand`, `success`, `warning`, `danger`), defaulting to `neutral`.
This means that styles can be written to respond to variants by using e.g. `--wa-color-fill-loud` instead of e.g. `--wa-color-brand-fill-loud`,
and all of our [native styles](/docs/utilities/native/) do so (where it made sense).

For example, assume we wanted to make a custom `.callout` class with color variants.
This is all we need to do:

```html { .example }
<p class="callout">This is a callout.</p>
<p class="callout wa-brand">This is a callout.</p>
<p class="callout wa-success">This is a callout.</p>
<p class="callout wa-warning">This is a callout.</p>
<p class="callout wa-danger">This is a callout.</p>

<style>
  .callout {
    background-color: var(--wa-color-fill-quiet);
    border: 1px solid var(--wa-color-border-quiet);
    color: var(--wa-color-on-quiet);
    padding: var(--wa-space-m) var(--wa-space-l);
  }
</style>
```
