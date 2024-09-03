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

## Alignment

By default, items are centered in the block direction of the `wa-cluster` container. You can append any of the following modifiers to the `wa-cluster` class in your markup to specify how to align items in the block direction:
- `:align-start`
- `:align-end`
- `:align-center`
- `:align-stretch`

```html {.example}
<div class="layout-example-mixed-sizing wa-stack">
  <div class="layout-example-boundary wa-cluster:align-start" style="min-height: 8rem;">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
  <div class="layout-example-boundary wa-cluster:align-end" style="min-height: 8rem;">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
  <div class="layout-example-boundary wa-cluster:align-center" style="min-height: 8rem;">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
  <div class="layout-example-boundary wa-cluster:align-stretch" style="min-height: 8rem;">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
</div>
```

## Gap

By default, the gap between cluster items uses `--wa-space-m` from your theme. You can append any of the following modifiers to the `wa-cluster` class in your markup to specify the gap between items:
- `:gap-0`
- `:gap-3xs`
- `:gap-2xs`
- `:gap-xs`
- `:gap-s`
- `:gap-m`
- `:gap-l`
- `:gap-xl`
- `:gap-2xl`
- `:gap-3xl`

These modifiers correspond with the `--wa-space-*` properties in your theme.

```html {.example}
<div class="layout-example-mixed-sizing wa-stack">
  <div class="layout-example-boundary wa-cluster:gap-2xs">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
  <div class="layout-example-boundary wa-cluster:gap-2xl">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
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
  <strong class="wa-font-size:2xl wa-line-height:condensed">Withywindle Pub and Eatery</strong>
  <div class="wa-cluster:gap-xs">
    <wa-rating value="4.6" read-only></wa-rating>
    <strong>4.6</strong>
    <span>(419 reviews)</span>
  </div>
  <div class="wa-cluster:gap-xs">
    <div class="wa-cluster:gap-3xs">
      <wa-icon name="dollar" style="color: var(--wa-color-green-60);"></wa-icon>
      <wa-icon name="dollar" style="color: var(--wa-color-green-60);"></wa-icon>
      <wa-icon name="dollar" style="color: var(--wa-color-green-60);"></wa-icon>
    </div>
    <span style="color: var(--wa-color-text-quiet)">&bull;</span>
    <wa-tag size="small">Comfort Food</wa-tag>
    <wa-tag size="small">Gastropub</wa-tag>
    <wa-tag size="small">Cocktail Bar</wa-tag>
    <wa-tag size="small">Vegetarian</wa-tag>
    <wa-tag size="small">Gluten Free</wa-tag>
  </div>
</div>
```