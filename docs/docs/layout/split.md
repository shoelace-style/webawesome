---
title: Split
description: Browse the library of customizable, framework-friendly web components included in Web Awesome.
layout: page-outline
---

Use the `wa-split` class to distribute two or more items evenly across available space, either in a row or a column.

```html {.example}
<div class="wa-split">
  <div class="layout-example-block"></div>
  <div class="layout-example-block"></div>
</div>
```

## Direction

Items can be split across a row or a column by appending `:row` or `:column` to the `wa-split` class.

```html {.example}
<div class="wa-flank wa-align-start" style="block-size: 16rem;">
  <div class="layout-example-boundary wa-split:column">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
  <div class="layout-example-boundary wa-split:row">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
</div>
```

## Align Items

By default, items are centered on the cross axis of the `wa-split` container. You can add any of the following [`wa-align-*`](/docs/layout/align) classes to an element with `wa-split` to specify how items are aligned:
- `wa-align-start`
- `wa-align-end`
- `wa-align-center`
- `wa-align-stretch`
- `wa-align-baseline`

These modifiers specify how items are aligned in the block direction for `wa-split:row` and in the inline direction for `wa-split:column`.

```html {.example}
<div class="wa-stack">
  <div class="layout-example-boundary wa-split wa-align-start" style="height: 8rem;">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
  <div class="layout-example-boundary wa-split wa-align-end" style="height: 8rem;">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
  <div class="layout-example-boundary wa-split wa-align-center" style="height: 8rem;">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
  <div class="layout-example-boundary wa-split wa-align-stretch" style="height: 8rem;">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
</div>
```

## Gap

A split's gap determines how close items can be before they wrap. By default, the gap between split items uses `--wa-space-m` from your theme. You can add any of the following [`wa-gap-*`](/docs/layout/gap) classes to an element with `wa-split` to specify the gap between items:
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

These modifiers correspond with the `--wa-space-*` properties in your theme.

```html {.example}
<div class="wa-stack">
  <div class="layout-example-boundary wa-split wa-gap-3xs">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
  <div class="layout-example-boundary wa-split wa-gap-3xl">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
</div>
```

## Examples

Splits are especially helpful for navigation, header, and footer layouts.

```html {.example}
<div class="wa-flank">
  <div class="wa-split:column">
    <div class="wa-stack">
      <wa-icon-button name="house" label="Home"></wa-icon-button>
      <wa-icon-button name="calendar" label="Calendar"></wa-icon-button>
      <wa-icon-button name="envelope" label="Mail"></wa-icon-button>
    </div>
    <div class="wa-stack">
      <wa-divider></wa-divider>
      <wa-icon-button name="right-from-bracket"></wa-icon-button>
    </div>
  </div>
  <div class="placeholder">
  </div>
</div>

<style>
  .placeholder {
    min-block-size: 300px;
    background-color: var(--wa-color-neutral-fill-quiet);
    border: dashed var(--wa-border-width-s) var(--wa-color-neutral-border-normal);
    border-radius: var(--wa-border-radius-m);
  }
</style>
```

```html {.example}
<div class="wa-stack">
  <div class="wa-split">
    <wa-icon name="web-awesome" label="Web Awesome" style="font-size: var(--wa-font-size-xl);"></wa-icon>
    <div class="wa-cluster">
      <wa-button>Sign Up</wa-button>
      <wa-button appearance="outlined">Log In</wa-button>
    </div>
  </div>
  <div class="placeholder">
  </div>
</div>

<style>
  .placeholder {
    min-block-size: 300px;
    background-color: var(--wa-color-neutral-fill-quiet);
    border: dashed var(--wa-border-width-s) var(--wa-color-neutral-border-normal);
    border-radius: var(--wa-border-radius-m);
  }
</style>
```