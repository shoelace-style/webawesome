---
title: Stack
description: 'Use `wa-stack` to arrange elements in the block direction with even spacing.'
layout: docs
tags: layoutUtilities
synonyms:
  - vertical stack
  - vstack
  - column layout
use-cases:
  - vertical spacing
  - stacked layout
  - card stack
  - vertical rhythm
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

A stack arranges its children in a vertical column with an equal gap between each item, so you don't have to add top or bottom margins to every element you put into it. It's the go-to layout for forms, paragraphs of text, card bodies, and anywhere you want consistent vertical rhythm.

By default, items stretch to fill the stack's width. Pair `wa-stack` with a [`wa-gap-*`](/docs/utilities/gap) class to control the spacing and a [`wa-align-items-*`](/docs/utilities/align-items) class to change how children line up horizontally.

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
    <wa-icon slot="start" name="lock"></wa-icon>
  </wa-input>
  <wa-checkbox>Remember me on this device</wa-checkbox>
  <wa-button appearance="filled">Log In</wa-button>
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

By default, items stretch to fill the inline size of the `wa-stack` container. Add any [`wa-align-items-*`](/docs/utilities/align-items) class to change how items line up in the inline direction.

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

By default, the gap between stack items uses `--wa-space-m` from your theme. Add any [`wa-gap-*`](/docs/utilities/gap) class to change the spacing between items.

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
