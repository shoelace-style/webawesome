---
title: Stack
description: 'Use `wa-stack` to arrange elements in the block direction with even spacing.'
layout: docs
tags: layoutUtilities
---

<style>
  :is(.wa-flank, .wa-grid, .wa-stack) > [class*='wa-stack']:has(div:empty) {
    border: var(--layout-example-border);
    border-radius: var(--layout-example-border-radius);
    padding: var(--layout-example-padding);
  }

  [class*='wa-stack'] div:empty {
    background-color: var(--layout-example-element-background);
    border-radius: var(--layout-example-element-border-radius);
    min-block-size: 4rem;
    min-inline-size: 4rem;
  }
</style>

{{ description }}

```html {.example}
<div class="wa-stack">
  <div></div>
  <div></div>
  <div></div>
</div>
```

## Examples

Stacks are well suited for forms, text, and ensuring consistent spacing between elements in the document flow.

```html {.example}
<div class="wa-stack">
  <wa-input label="Email">
    <wa-icon slot="start" name="envelope" variant="regular"></wa-icon>
  </wa-input>
  <wa-input label="Password" type="password">
    <wa-icon slot="start" name="lock" variant="regular"></wa-icon>
  </wa-input>
  <wa-checkbox>Remember me on this device</wa-checkbox>
  <wa-button>Log In</wa-button>
</div>
```

```html {.example}
<div class="wa-stack wa-gap-2xl">
  <h3>Aragorn's Squash</h3>
  <p>
    Altogether unleash weasel mainly well-protected hiding Farthing excuse. Falling pits oil em Hasufel levels weight
    rides vagabonds? Gamgee hard-won thunder merrier forests treasury. Past birthday lasts lowly there'd woe Woodland pa
    sun's slaying most handling.
  </p>
  <p>
    Even the smallest person can change the course of the future. They tempted completely other caves cloven wisest
    draught scrumptious cook Undómiel friends. Dory crunchy huge sleepless. Unmade took nerves liquor defeated Arathorn.
  </p>
</div>
```

## Align Items

By default, items stretch to fill the inline size of the `wa-stack` container. You can add any of the following [`wa-align-items-*`](/docs/utilities/align-items) classes to an element with `wa-stack` to specify how items are aligned in the inline direction:

- `wa-align-items-start`
- `wa-align-items-end`
- `wa-align-items-center`
- `wa-align-items-stretch`
- `wa-align-items-baseline`

```html {.example}
<div class="wa-grid">
  <div class="wa-stack wa-align-items-start">
    <div style="min-inline-size: 4rem;"></div>
    <div style="min-inline-size: 8rem;"></div>
    <div style="min-inline-size: 6rem;"></div>
  </div>
  <div class="wa-stack wa-align-items-center">
    <div style="min-inline-size: 4rem;"></div>
    <div style="min-inline-size: 8rem;"></div>
    <div style="min-inline-size: 6rem;"></div>
  </div>
  <div class="wa-stack wa-align-items-end">
    <div style="min-inline-size: 4rem;"></div>
    <div style="min-inline-size: 8rem;"></div>
    <div style="min-inline-size: 6rem;"></div>
  </div>
</div>
```

## Gap

By default, the gap between stack items uses `--wa-space-m` from your theme. You can add any of the following [`wa-gap-*`](/docs/utilities/gap) classes to an element with `wa-stack` to specify the gap between items:

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
<div class="wa-grid">
  <div class="wa-stack wa-gap-2xs">
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div class="wa-stack wa-gap-2xl">
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
```
