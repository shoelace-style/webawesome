---
title: Badge
description: Badges are used to draw attention and display statuses or counts.
tags: component
---

```html {.example}
<wa-badge>Badge</wa-badge>
```

## Examples

### Variants

Set the `variant` attribute to change the badge's variant.

```html {.example}
<wa-badge variant="brand">Brand</wa-badge>
<wa-badge variant="success">Success</wa-badge>
<wa-badge variant="neutral">Neutral</wa-badge>
<wa-badge variant="warning">Warning</wa-badge>
<wa-badge variant="danger">Danger</wa-badge>
```

### Appearance

Use the `appearance` attribute to change the badge's visual appearance.

```html {.example}
<div style="margin-block-end: 1rem;">
  <wa-badge appearance="filled outlined" variant="neutral">F+O</wa-badge>
  <wa-badge appearance="filled" variant="neutral">Filled</wa-badge>
  <wa-badge appearance="tinted outlined" variant="neutral">T+O</wa-badge>
  <wa-badge appearance="tinted" variant="neutral">Tinted</wa-badge>
  <wa-badge appearance="outlined" variant="neutral">Outlined</wa-badge>
</div>
<div style="margin-block-end: 1rem;">
  <wa-badge appearance="filled outlined" variant="brand">F+O</wa-badge>
  <wa-badge appearance="filled" variant="brand">Filled</wa-badge>
  <wa-badge appearance="tinted outlined" variant="brand">T+O</wa-badge>
  <wa-badge appearance="tinted" variant="brand">Tinted</wa-badge>
  <wa-badge appearance="outlined" variant="brand">Outlined</wa-badge>
</div>
<div style="margin-block-end: 1rem;">
  <wa-badge appearance="filled outlined" variant="success">F+O</wa-badge>
  <wa-badge appearance="filled" variant="success">Filled</wa-badge>
  <wa-badge appearance="tinted outlined" variant="success">T+O</wa-badge>
  <wa-badge appearance="tinted" variant="success">Tinted</wa-badge>
  <wa-badge appearance="outlined" variant="success">Outlined</wa-badge>
</div>
<div style="margin-block-end: 1rem;">
  <wa-badge appearance="filled outlined" variant="warning">F+O</wa-badge>
  <wa-badge appearance="filled" variant="warning">Filled</wa-badge>
  <wa-badge appearance="tinted outlined" variant="warning">T+O</wa-badge>
  <wa-badge appearance="tinted" variant="warning">Tinted</wa-badge>
  <wa-badge appearance="outlined" variant="warning">Outlined</wa-badge>
</div>
<div>
  <wa-badge appearance="filled outlined" variant="danger">F+O</wa-badge>
  <wa-badge appearance="filled" variant="danger">Filled</wa-badge>
  <wa-badge appearance="tinted outlined" variant="danger">T+O</wa-badge>
  <wa-badge appearance="tinted" variant="danger">Tinted</wa-badge>
  <wa-badge appearance="outlined" variant="danger">Outlined</wa-badge>
</div>
```

### Pill Badges

Use the `pill` attribute to give badges rounded edges.

```html {.example}
<wa-badge variant="brand" pill>Brand</wa-badge>
<wa-badge variant="success" pill>Success</wa-badge>
<wa-badge variant="neutral" pill>Neutral</wa-badge>
<wa-badge variant="warning" pill>Warning</wa-badge>
<wa-badge variant="danger" pill>Danger</wa-badge>
```

### Pulsating Badges

Use the `pulse` attribute to draw attention to the badge with a subtle animation.

```html {.example}
<div class="badge-pulse">
  <wa-badge variant="brand" pill pulse>1</wa-badge>
  <wa-badge variant="success" pill pulse>1</wa-badge>
  <wa-badge variant="neutral" pill pulse>1</wa-badge>
  <wa-badge variant="warning" pill pulse>1</wa-badge>
  <wa-badge variant="danger" pill pulse>1</wa-badge>
</div>

<style>
  .badge-pulse wa-badge:not(:last-of-type) {
    margin-right: 1rem;
  }
</style>
```

### With Buttons

One of the most common use cases for badges is attaching them to buttons. To make this easier, badges will be automatically positioned at the top-right when they're a child of a button.

```html {.example}
<wa-button>
  Requests
  <wa-badge pill>30</wa-badge>
</wa-button>

<wa-button style="margin-inline-start: 1rem;">
  Warnings
  <wa-badge variant="warning" pill>8</wa-badge>
</wa-button>

<wa-button style="margin-inline-start: 1rem;">
  Errors
  <wa-badge variant="danger" pill>6</wa-badge>
</wa-button>
```

### With Menu Items

When including badges in menu items, use the `suffix` slot to make sure they're aligned correctly.

```html {.example}
<wa-menu style="max-width: 240px;">
  <wa-menu-label>Messages</wa-menu-label>
  <wa-menu-item>Comments <wa-badge slot="suffix" variant="neutral" pill>4</wa-badge></wa-menu-item>
  <wa-menu-item>Replies <wa-badge slot="suffix" variant="neutral" pill>12</wa-badge></wa-menu-item>
</wa-menu>
```
