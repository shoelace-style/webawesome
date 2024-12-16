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
