---
title: Cluster
description: Browse the library of customizable, framework-friendly web components included in Web Awesome.
layout: page-outline
---

Use the `wa-cluster` class to arrange elements inline with even spacing, allowing items to wrap when space is limited.

```html {.example}
<div class="layout-example-mixed-sizing wa-cluster">
  <div class="layout-example-block"></div>
  <div class="layout-example-block"></div>
  <div class="layout-example-block"></div>
  <div class="layout-example-block"></div>
  <div class="layout-example-block"></div>
  <div class="layout-example-block"></div>
  <div class="layout-example-block"></div>
  <div class="layout-example-block"></div>
  <div class="layout-example-block"></div>
</div>
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
  <h3 class="wa-heading-xl">Withywindle Pub and Eatery</h3>
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
    <span class="wa-caption-m">&bull;</span>
    <wa-tag size="small">Comfort Food</wa-tag>
    <wa-tag size="small">Gastropub</wa-tag>
    <wa-tag size="small">Cocktail Bar</wa-tag>
    <wa-tag size="small">Vegetarian</wa-tag>
    <wa-tag size="small">Gluten Free</wa-tag>
  </div>
</div>
```

## Align Items

By default, items are centered in the block direction of the `wa-cluster` container. You can add any of the following [`wa-align-*`](/docs/layout/align) classes to an element with `wa-cluster` to specify how items are aligned in the block direction:
- `wa-align-start`
- `wa-align-end`
- `wa-align-center`
- `wa-align-stretch`
- `wa-align-baseline`

```html {.example}
<div class="layout-example-mixed-sizing wa-stack">
  <div class="layout-example-boundary wa-cluster wa-align-start" style="min-height: 8rem;">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
  <div class="layout-example-boundary wa-cluster wa-align-end" style="min-height: 8rem;">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
  <div class="layout-example-boundary wa-cluster wa-align-center" style="min-height: 8rem;">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
  <div class="layout-example-boundary wa-cluster wa-align-stretch" style="min-height: 8rem;">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
</div>
```

## Gap

By default, the gap between cluster items uses `--wa-space-m` from your theme. You can add any of the following [`wa-gap-*`](/docs/layout/gap) classes to an element with `wa-cluster` to specify the gap between items:
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
<div class="layout-example-mixed-sizing wa-stack">
  <div class="layout-example-boundary wa-cluster wa-gap-2xs">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
  <div class="layout-example-boundary wa-cluster wa-gap-2xl">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
</div>
```