---
title: Cluster
description: 'Use the `wa-cluster` class to arrange elements inline with even spacing, allowing items to wrap when space is limited.'
layout: docs
tags: layoutUtilities
---

<style>
  :is(.wa-flank, .wa-grid, .wa-stack) > [class*='wa-cluster']:has(div:empty) {
    border: var(--layout-example-border);
    border-radius: var(--layout-example-border-radius);
    padding: var(--layout-example-padding);
  }

  [class*='wa-cluster'] div:empty {
    background-color: var(--layout-example-element-background);
    border-radius: var(--layout-example-element-border-radius);
    min-block-size: 4rem;
    min-inline-size: 4rem;
  }
</style>

{{ description }}

```html {.example}
<div class="wa-cluster">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>

<!-- We'll vary the div sizes to show the flow of cluster elements -->
<style>
  .wa-cluster div:empty:nth-child(3n) {
    min-inline-size: 6rem;
  }
  .wa-cluster div:empty:nth-child(3n + 2) {
    min-inline-size: 8rem;
  }
</style>
```

## Examples

Clusters are great for inline lists and aligning items of varying sizes.

```html {.example}
<div class="wa-cluster">
  <wa-icon name="web-awesome"></wa-icon>
  <a href="#">Components</a>
  <a href="#">Layout</a>
  <a href="#">Patterns</a>
  <a href="#">Theming</a>
</div>
```

```html {.example}
<div class="wa-stack">
  <h3 class="wa-heading-2xl">Withywindle Pub and Eatery</h3>
  <div class="wa-cluster wa-gap-xs">
    <wa-rating value="4.6" read-only></wa-rating>
    <strong>4.6</strong>
    <span>(419 reviews)</span>
  </div>
  <div class="wa-cluster wa-gap-xs">
    <div class="wa-cluster wa-gap-3xs">
      <wa-icon name="dollar" style="color: var(--wa-color-green-60);"></wa-icon>
      <wa-icon name="dollar" style="color: var(--wa-color-green-60);"></wa-icon>
      <wa-icon name="dollar" style="color: var(--wa-color-green-60);"></wa-icon>
    </div>
    <span class="wa-caption-s">&bull;</span>
    <wa-tag size="small">Comfort Food</wa-tag>
    <wa-tag size="small">Gastropub</wa-tag>
    <wa-tag size="small">Cocktail Bar</wa-tag>
    <wa-tag size="small">Vegetarian</wa-tag>
    <wa-tag size="small">Gluten Free</wa-tag>
  </div>
</div>
```

## Align Items

By default, items are centered in the block direction of the `wa-cluster` container. You can add any of the following [`wa-align-items-*`](/docs/utilities/align-items) classes to an element with `wa-cluster` to specify how items are aligned in the block direction:

- `wa-align-items-start`
- `wa-align-items-end`
- `wa-align-items-center`
- `wa-align-items-stretch`
- `wa-align-items-baseline`

```html {.example}
<div class="wa-stack">
  <div class="wa-cluster wa-align-items-start" style="min-height: 8rem;">
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div class="wa-cluster wa-align-items-end" style="min-height: 8rem;">
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div class="wa-cluster wa-align-items-center" style="min-height: 8rem;">
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div class="wa-cluster wa-align-items-stretch" style="min-height: 8rem;">
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
```

## Gap

By default, the gap between cluster items uses `--wa-space-m` from your theme. You can add any of the following [`wa-gap-*`](/docs/utilities/gap) classes to an element with `wa-cluster` to specify the gap between items:

- `wa-gap-0`
- `wa-gap-3xs`
- `wa-gap-2xs`
- `wa-gap-xs`
- `wa-gap-s`
- `wa-gap-m`
- `wa-gap-l`
- `wa-gap-xl`
- `wa-gap-2xl`
- `wa-gap-3xl`

```html {.example}
<div class="wa-stack">
  <div class="wa-cluster wa-gap-2xs">
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div class="wa-cluster wa-gap-2xl">
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
```
