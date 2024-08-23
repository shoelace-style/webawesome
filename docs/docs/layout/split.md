---
title: Split
description: Browse the library of customizable, framework-friendly web components included in Web Awesome.
layout: page-outline
---

Split distributes two or more items evenly across available space, either in a row or a column.

<style>
  .example-block {
    background-color: var(--wa-color-brand-fill-normal);
    border-radius: var(--wa-border-radius-s);
    min-block-size: 4rem;
    min-inline-size: 4rem;
  }
</style>

```html {.example}
<div class="wa-split">
  <div class="example-block"></div>
  <div class="example-block"></div>
</div>
```

## Direction

TODO: add deets about `:row` and `:column`

## Align Items

By default, items in a split use `align-items: center;` to stay centered in the available space. You can append any of the following modifiers to the `wa-split` class in your markup to specify how items are aligned in the block direction:
- `:align-start`
- `:align-end`
- `:align-center`
- `:align-stretch`

```html {.example}
<div class="wa-stack">
  <div class="wa-split:align-start">
    <div class="example-block" style="block-size: 4rem;"></div>
    <div class="example-block" style="block-size: 6rem;"></div>
  </div>
  <div class="wa-split:align-center">
    <div class="example-block" style="block-size: 4rem;"></div>
    <div class="example-block" style="block-size: 6rem;"></div>
  </div>
  <div class="wa-split:align-end">
    <div class="example-block" style="block-size: 4rem;"></div>
    <div class="example-block" style="block-size: 6rem;"></div>
  </div>
</div>
```

## Gap

TODO: add details about gap's necessity for responsiveness/wrapping, fix example

By default, the gap between items in a split uses your theme's medium space value with `gap: var(--wa-space-m);`. You can append any of the following modifiers to the `wa-split` class in your markup to specify the gap between items:
- `:gap-3xs`
- `:gap-2xs`
- `:gap-xs`
- `:gap-s`
- `:gap-m`
- `:gap-l`
- `:gap-xl`
- `:gap-2xl`
- `:gap-3xl`

Each modifier uses the corresponding space variable from your theme.

```html {.example}
<div class="wa-grid">
  <div class="wa-stack:gap-2xs">
    <div class="example-block"></div>
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
  <div class="wa-stack:gap-2xl">
    <div class="example-block"></div>
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
</div>
```

## Examples

TODO: nav examples might be good