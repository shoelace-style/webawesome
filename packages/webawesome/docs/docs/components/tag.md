---
title: Tag
description: Tags are used as labels to organize things or to indicate a selection.
layout: component
category: Feedback & Status
---

```html {.example}
<wa-tag variant="brand">Brand</wa-tag>
<wa-tag variant="success">Success</wa-tag>
<wa-tag variant="neutral">Neutral</wa-tag>
<wa-tag variant="warning">Warning</wa-tag>
<wa-tag variant="danger">Danger</wa-tag>
```

## Examples

### Appearance

Use the `size` attribute to change a tag's visual appearance.
The default appearance is `filled-outlined`.

```html {.example}
<div class="wa-stack">
  <p>
    <wa-tag variant="brand" appearance="accent">Accent</wa-tag>
    <wa-tag variant="brand" appearance="filled-outlined">Filled-Outlined</wa-tag>
    <wa-tag variant="brand" appearance="filled">Filled</wa-tag>
    <wa-tag variant="brand" appearance="outlined">Outlined</wa-tag>
  </p>
  <p>
    <wa-tag variant="success" appearance="accent">Accent</wa-tag>
    <wa-tag variant="success" appearance="filled-outlined">Filled-Outlined</wa-tag>
    <wa-tag variant="success" appearance="filled">Filled</wa-tag>
    <wa-tag variant="success" appearance="outlined">Outlined</wa-tag>
  </p>

  <p>
    <wa-tag variant="neutral" appearance="accent">Accent</wa-tag>
    <wa-tag variant="neutral" appearance="filled-outlined">Filled-Outlined</wa-tag>
    <wa-tag variant="neutral" appearance="filled">Filled</wa-tag>
    <wa-tag variant="neutral" appearance="outlined">Outlined</wa-tag>
  </p>

  <p>
    <wa-tag variant="warning" appearance="accent">Accent</wa-tag>
    <wa-tag variant="warning" appearance="filled-outlined">Filled-Outlined</wa-tag>
    <wa-tag variant="warning" appearance="filled">Filled</wa-tag>
    <wa-tag variant="warning" appearance="outlined">Outlined</wa-tag>
  </p>

  <p>
    <wa-tag variant="danger" appearance="accent">Accent</wa-tag>
    <wa-tag variant="danger" appearance="filled-outlined">Filled-Outlined</wa-tag>
    <wa-tag variant="danger" appearance="filled">Filled</wa-tag>
    <wa-tag variant="danger" appearance="outlined">Outlined</wa-tag>
  </p>
</div>
```

### Sizes

Use the `size` attribute to change a tag's size.

```html {.example}
<wa-tag size="small">Small</wa-tag>
<wa-tag size="medium">Medium</wa-tag>
<wa-tag size="large">Large</wa-tag>
```

### Pill

Use the `pill` attribute to give tabs rounded edges.

```html {.example}
<wa-tag size="small" pill>Small</wa-tag>
<wa-tag size="medium" pill>Medium</wa-tag>
<wa-tag size="large" pill>Large</wa-tag>
```

### Removable

Use the `with-remove` attribute to add a remove button to the tag.

```html {.example}
<div class="tags-removable">
  <wa-tag size="small" with-remove>Small</wa-tag>
  <wa-tag size="medium" with-remove>Medium</wa-tag>
  <wa-tag size="large" with-remove>Large</wa-tag>
</div>

<script>
  const div = document.querySelector('.tags-removable');

  div.addEventListener('wa-remove', event => {
    const tag = event.target;
    tag.style.opacity = '0';
    setTimeout(() => (tag.style.opacity = '1'), 2000);
  });
</script>

<style>
  .tags-removable wa-tag {
    transition: opacity var(--wa-transition-normal);
  }
</style>
```
