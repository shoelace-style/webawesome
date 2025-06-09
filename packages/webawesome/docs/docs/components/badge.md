---
title: Badge
description: Badges are used to draw attention and display statuses or counts.
tags: [feedback, content]
icon: badge
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
  <wa-badge appearance="accent outlined" variant="neutral">A+O</wa-badge>
  <wa-badge appearance="accent" variant="neutral">Accent</wa-badge>
  <wa-badge appearance="filled outlined" variant="neutral">F+O</wa-badge>
  <wa-badge appearance="filled" variant="neutral">Filled</wa-badge>
  <wa-badge appearance="outlined" variant="neutral">Outlined</wa-badge>
</div>
<div style="margin-block-end: 1rem;">
  <wa-badge appearance="accent outlined" variant="brand">A+O</wa-badge>
  <wa-badge appearance="accent" variant="brand">Accent</wa-badge>
  <wa-badge appearance="filled outlined" variant="brand">F+O</wa-badge>
  <wa-badge appearance="filled" variant="brand">Filled</wa-badge>
  <wa-badge appearance="outlined" variant="brand">Outlined</wa-badge>
</div>
<div style="margin-block-end: 1rem;">
  <wa-badge appearance="accent outlined" variant="success">A+O</wa-badge>
  <wa-badge appearance="accent" variant="success">Accent</wa-badge>
  <wa-badge appearance="filled outlined" variant="success">F+O</wa-badge>
  <wa-badge appearance="filled" variant="success">Filled</wa-badge>
  <wa-badge appearance="outlined" variant="success">Outlined</wa-badge>
</div>
<div style="margin-block-end: 1rem;">
  <wa-badge appearance="accent outlined" variant="warning">A+O</wa-badge>
  <wa-badge appearance="accent" variant="warning">Accent</wa-badge>
  <wa-badge appearance="filled outlined" variant="warning">F+O</wa-badge>
  <wa-badge appearance="filled" variant="warning">Filled</wa-badge>
  <wa-badge appearance="outlined" variant="warning">Outlined</wa-badge>
</div>
<div>
  <wa-badge appearance="accent outlined" variant="danger">A+O</wa-badge>
  <wa-badge appearance="accent" variant="danger">Accent</wa-badge>
  <wa-badge appearance="filled outlined" variant="danger">F+O</wa-badge>
  <wa-badge appearance="filled" variant="danger">Filled</wa-badge>
  <wa-badge appearance="outlined" variant="danger">Outlined</wa-badge>
</div>
```

### Size

Badges are sized relative to the current font size. You can set `font-size` on any badge (or an ancestor element) to change it.

```html {.example}
<wa-badge variant="brand" style="font-size: var(--wa-font-size-xs);">Brand</wa-badge>
<wa-badge variant="brand" style="font-size: var(--wa-font-size-s);">Brand</wa-badge>
<wa-badge variant="brand" style="font-size: var(--wa-font-size-m);">Brand</wa-badge>
<wa-badge variant="brand" style="font-size: var(--wa-font-size-l);">Brand</wa-badge>
<wa-badge variant="brand" style="font-size: var(--wa-font-size-xl);">Brand</wa-badge>
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

### Drawing Attention

Use the `attention` attribute to draw attention to the badge with a subtle animation. Supported effects are `bounce`, `pulse` and `none`.

```html {.example}
<div class="badge-attention">
  <wa-badge variant="brand" attention="pulse" pill>1</wa-badge>
  <wa-badge variant="success" attention="pulse" pill>1</wa-badge>
  <wa-badge variant="neutral" attention="pulse" pill>1</wa-badge>
  <wa-badge variant="warning" attention="pulse" pill>1</wa-badge>
  <wa-badge variant="danger" attention="pulse" pill>1</wa-badge>
</div>

<div class="badge-attention">
  <wa-badge variant="brand" attention="bounce" pill>1</wa-badge>
  <wa-badge variant="success" attention="bounce" pill>1</wa-badge>
  <wa-badge variant="neutral" attention="bounce" pill>1</wa-badge>
  <wa-badge variant="warning" attention="bounce" pill>1</wa-badge>
  <wa-badge variant="danger" attention="bounce" pill>1</wa-badge>
</div>

<style>
  .badge-attention {
    margin-block-end: var(--wa-space-m);

    wa-badge:not(:last-of-type) {
      margin-right: 1rem;
    }
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
<wa-dropdown style="max-width: 240px;">
  <wa-button slot="trigger" caret>Messages</wa-button>
  <h3>Messages</h3>
  <wa-dropdown-item>Comments <wa-badge slot="suffix" variant="neutral" pill>4</wa-badge></wa-dropdown-item>
  <wa-dropdown-item>Replies <wa-badge slot="suffix" variant="neutral" pill>12</wa-badge></wa-dropdown-item>
</wa-dropdown>
```
