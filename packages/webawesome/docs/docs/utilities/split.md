---
title: Split
description: 'Use the `wa-split` class to distribute two or more items evenly across available space, either in a row or a column.'
layout: docs
tags: layoutUtilities
---

<style>
  :is(.wa-flank, .wa-grid, .wa-stack) > [class*='wa-split']:has(div:empty) {
    border: var(--layout-example-border);
    border-radius: var(--layout-example-border-radius);
    padding: var(--layout-example-padding);
  }

  [class*='wa-split'] div:empty {
    background-color: var(--layout-example-element-background);
    border-radius: var(--layout-example-element-border-radius);
    min-block-size: 4rem;
    min-inline-size: 4rem;
  }
</style>

{{ description }}

```html {.example}
<div class="wa-split">
  <div></div>
  <div></div>
</div>
```

## Examples

Splits are especially helpful for navigation, header, and footer layouts.

```html {.example}
<div class="wa-flank">
  <div class="wa-split:column">
    <div class="wa-stack">
      <wa-button appearance="plain">
        <wa-icon name="house" label="Home"></wa-icon>
      </wa-button>
      <wa-button appearance="plain">
        <wa-icon name="calendar" label="Calendar"></wa-icon>
      </wa-button>
      <wa-button appearance="plain">
        <wa-icon name="envelope" label="Mail"></wa-icon>
      </wa-button>
    </div>
    <div class="wa-stack">
      <wa-divider></wa-divider>
      <wa-button appearance="plain">
        <wa-icon name="right-from-bracket" label="Sign Out"></wa-icon>
      </wa-button>
    </div>
  </div>
  <div class="placeholder"></div>
</div>

<style>
  .placeholder {
    min-block-size: 300px;
    background-color: var(--wa-color-neutral-fill-quiet);
    border: dashed var(--wa-border-width-s) var(--wa-color-neutral-border-normal);
    border-radius: var(--wa-border-radius-l);
  }
</style>
```

```html {.example}
<div class="wa-stack">
  <div class="wa-split">
    <wa-icon name="web-awesome" label="Web Awesome" class="wa-font-size-xl"></wa-icon>
    <div class="wa-cluster">
      <wa-button>Sign Up</wa-button>
      <wa-button appearance="outlined">Log In</wa-button>
    </div>
  </div>
  <div class="placeholder"></div>
</div>

<style>
  .placeholder {
    min-block-size: 300px;
    background-color: var(--wa-color-neutral-fill-quiet);
    border: dashed var(--wa-border-width-s) var(--wa-color-neutral-border-normal);
    border-radius: var(--wa-border-radius-l);
  }
</style>
```

## Direction

Items can be split across a row or a column by appending `:row` or `:column` to the `wa-split` class.

```html {.example}
<div class="wa-flank wa-align-items-start" style="block-size: 16rem;">
  <div class="wa-split:column">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split:row">
    <div></div>
    <div></div>
  </div>
</div>
```

## Align Items

By default, items are centered on the cross axis of the `wa-split` container. You can add any of the following [`wa-align-items-*`](/docs/utilities/align-items) classes to an element with `wa-split` to specify how items are aligned:

- `wa-align-items-start`
- `wa-align-items-end`
- `wa-align-items-center`
- `wa-align-items-stretch`
- `wa-align-items-baseline`

These modifiers specify how items are aligned in the block direction for `wa-split:row` and in the inline direction for `wa-split:column`.

```html {.example}
<div class="wa-stack">
  <div class="wa-split wa-align-items-start" style="height: 8rem;">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split wa-align-items-end" style="height: 8rem;">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split wa-align-items-center" style="height: 8rem;">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split wa-align-items-stretch" style="height: 8rem;">
    <div></div>
    <div></div>
  </div>
</div>
```

## Gap

A split's gap determines how close items can be before they wrap. By default, the gap between split items uses `--wa-space-m` from your theme. You can add any of the following [`wa-gap-*`](/docs/utilities/gap) classes to an element with `wa-split` to specify the gap between items:

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
  <div class="wa-split wa-gap-3xs">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split wa-gap-3xl">
    <div></div>
    <div></div>
  </div>
</div>
```
