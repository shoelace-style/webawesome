---
title: Cluster
description: Browse the library of customizable, framework-friendly web components included in Web Awesome.
layout: page-outline
---

Cluster arranges elements in the inline direction with even spacing, allowing items to wrap when space is limited.

<style>
  .example-block {
    background-color: var(--wa-color-indigo-60);
    border-radius: var(--wa-border-radius-s);
    min-block-size: 4rem;
    min-inline-size: 4rem;
  }
  .example-set {
    border: var(--wa-border-width-s) dashed var(--wa-color-neutral-border-normal);
    border-radius: var(--wa-border-radius-m);
    padding: var(--wa-space-s);
  }
</style>

```html {.example}
<div class="wa-cluster mixed-sizing">
  <div class="example-block"></div>
  <div class="example-block"></div>
  <div class="example-block"></div>
  <div class="example-block"></div>
  <div class="example-block"></div>
  <div class="example-block"></div>
  <div class="example-block"></div>
  <div class="example-block"></div>
  <div class="example-block"></div>
</div>

<style>
  .mixed-sizing .example-block:nth-child(3n) {
    min-inline-size: 6rem;
  }
  .mixed-sizing .example-block:nth-child(3n + 2) {
    min-inline-size: 8rem;
  }
</style>
```

## Align Items

By default, items in a cluster use `align-items: center;`. You can append any of the following modifiers to the `wa-cluster` class in your markup to specify how items are aligned in the block direction:
- `:align-start`
- `:align-end`
- `:align-center`
- `:align-stretch`

```html {.example}
<div class="wa-stack mixed-sizing">
  <div class="example-set wa-cluster:align-start" style="min-height: 8rem;">
    <div class="example-block"></div>
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
  <div class="example-set wa-cluster:align-end" style="min-height: 8rem;">
    <div class="example-block"></div>
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
  <div class="example-set wa-cluster:align-center" style="min-height: 8rem;">
    <div class="example-block"></div>
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
  <div class="example-set wa-cluster:align-stretch" style="min-height: 8rem;">
    <div class="example-block"></div>
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
</div>
```

## Gap

By default, the gap between cluster items uses `--wa-space-m` from your theme. You can append any of the following modifiers to the `wa-cluster` class in your markup to specify the gap between items:
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
<div class="wa-stack mixed-sizing">
  <div class="example-set wa-cluster:gap-2xs">
    <div class="example-block"></div>
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
  <div class="example-set wa-cluster:gap-2xl">
    <div class="example-block"></div>
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
</div>
```

## Examples

Clusters are great for aligning groups of items of different sizes.

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
  <strong class="wa-font-size:2xl wa-line-height:condensed">Stone's Throw Pub & Eatery</strong>
  <div class="wa-cluster:gap-xs">
    <wa-rating value="4.5" read-only></wa-rating>
    <strong>4.5</strong>
    <span>(419 reviews)</span>
  </div>
  <div class="wa-cluster:gap-xs">
    <div class="wa-cluster:gap-3xs">
      <wa-icon name="dollar" style="color: var(--wa-color-green-60);"></wa-icon>
      <wa-icon name="dollar" style="color: var(--wa-color-green-60);"></wa-icon>
      <wa-icon name="dollar" style="color: var(--wa-color-green-60);"></wa-icon>
    </div>
    <wa-tag size="small">New American</wa-tag>
    <wa-tag size="small">Gastropub</wa-tag>
    <wa-tag size="small">Vegetarian</wa-tag>
    <wa-tag size="small">Gluten Free</wa-tag>
  </div>
</div>
```