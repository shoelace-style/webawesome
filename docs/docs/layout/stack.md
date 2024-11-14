---
title: Stack
description: Browse the library of customizable, framework-friendly web components included in Web Awesome.
layout: page-outline
---

Use `wa-stack` to arrange elements in the block direction with even spacing.

```html {.example}
<div class="wa-stack">
  <div class="layout-example-block"></div>
  <div class="layout-example-block"></div>
  <div class="layout-example-block"></div>
</div>
```

## Examples

Stacks are well suited for forms, text, and ensuring consistent spacing between elements in the document flow.

```html {.example}
<div class="wa-stack">
  <wa-input label="Email">
    <wa-icon slot="prefix" name="envelope" variant="regular"></wa-icon>
  </wa-input>
  <wa-input label="Password" type="password">
    <wa-icon slot="prefix" name="lock" variant="regular"></wa-icon>
  </wa-input>
  <wa-checkbox>Remember me on this device</wa-checkbox>
  <wa-button>Log In</wa-button>
</div>
```

```html {.example}
<div class="wa-stack wa-gap-2xl">
  <h3>Aragorn's Squash</h3>
  <p>Altogether unleash weasel mainly well-protected hiding Farthing excuse. Falling pits oil em Hasufel levels weight rides vagabonds? Gamgee hard-won thunder merrier forests treasury. Past birthday lasts lowly there'd woe Woodland pa sun's slaying most handling.</p>
  <p>Even the smallest person can change the course of the future. They tempted completely other caves cloven wisest draught scrumptious cook Undómiel friends. Dory crunchy huge sleepless. Unmade took nerves liquor defeated Arathorn.</p>
</div>
```

## Align Items

By default, items stretch to fill the inline size of the `wa-stack` container. You can add any of the following [`wa-align-*`](/docs/layout/align) classes to an element with `wa-stack` to specify how items are aligned in the inline direction:
- `wa-align-start`
- `wa-align-end`
- `wa-align-center`
- `wa-align-stretch`
- `wa-align-baseline`

```html {.example}
<div class="wa-grid layout-example-mixed-sizing">
  <div class="layout-example-boundary wa-stack wa-align-start">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
  <div class="layout-example-boundary wa-stack wa-align-center">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
  <div class="layout-example-boundary wa-stack wa-align-end">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
</div>
```

## Gap

By default, the gap between stack items uses `--wa-space-m` from your theme. You can add any of the following [`wa-gap-*`](/docs/layout/gap) classes to an element with `wa-stack` to specify the gap between items:
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
  <div class="layout-example-boundary wa-stack wa-gap-2xs">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
  <div class="layout-example-boundary wa-stack wa-gap-2xl">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
</div>
```