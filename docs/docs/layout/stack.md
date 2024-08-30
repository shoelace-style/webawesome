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

## Alignment

By default, items in a stack stretch to fill the inline size of the container. You can append any of the following modifiers to the `wa-stack` class in your markup to specify how items are aligned in the inline direction:
- `:align-start`
- `:align-end`
- `:align-center`
- `:align-stretch`

```html {.example}
<div class="wa-grid layout-example-mixed-sizing">
  <div class="layout-example-boundary wa-stack:align-start">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
  <div class="layout-example-boundary wa-stack:align-center">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
  <div class="layout-example-boundary wa-stack:align-end">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
</div>
```

## Gap

By default, the gap between stack items uses `--wa-space-m` from your theme. You can append any of the following modifiers to the `wa-stack` class in your markup to specify the gap between items:
- `gap:0`
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
  <div class="layout-example-boundary wa-stack:gap-2xs">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
  <div class="layout-example-boundary wa-stack:gap-2xl">
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
    <div class="layout-example-block"></div>
  </div>
</div>
```

## Examples

Stacks are well suited for forms, text, and organizing most elements in the document flow.

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
<div class="wa-stack:gap-2xl">
  <h3>Aragorn's Squash</h3>
  <p>Altogether unleash weasel mainly well-protected hiding Farthing excuse. Falling pits oil em Hasufel levels weight rides vagabonds? Gamgee hard-won thunder merrier forests treasury. Past birthday lasts lowly there'd woe Woodland pa sun's slaying most handling.</p>
  <p>Even the smallest person can change the course of the future. They tempted completely other caves cloven wisest draught scrumptious cook Undómiel friends. Dory crunchy huge sleepless. Unmade took nerves liquor defeated Arathorn.</p>
</div>
```