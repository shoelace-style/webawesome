---
title: Tag
layout: component
category: Feedback
synonyms:
  - chip
  - label
  - pill
  - token
  - badge
use-cases:
  - filter tag
  - removable tag
  - category label
  - keyword
---

```html {.example}
<wa-tag>Featured</wa-tag>
```

## Examples

### Variants

Set the `variant` attribute to match the tag to its meaning.

```html {.example}
<wa-tag variant="brand">Brand</wa-tag>
<wa-tag variant="success">Success</wa-tag>
<wa-tag variant="neutral">Neutral</wa-tag>
<wa-tag variant="warning">Warning</wa-tag>
<wa-tag variant="danger">Danger</wa-tag>
```

### Appearance

Use the `appearance` attribute to change the tag's visual style. The default is `filled-outlined`.

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
<wa-tag size="xs">Extra Small</wa-tag>
<wa-tag size="s">Small</wa-tag>
<wa-tag size="m">Medium</wa-tag>
<wa-tag size="l">Large</wa-tag>
<wa-tag size="xl">Extra Large</wa-tag>
```

### Pill

Use the `pill` attribute to give tags rounded edges.

```html {.example}
<wa-tag size="xs" pill>Extra Small</wa-tag>
<wa-tag size="s" pill>Small</wa-tag>
<wa-tag size="m" pill>Medium</wa-tag>
<wa-tag size="l" pill>Large</wa-tag>
<wa-tag size="xl" pill>Extra Large</wa-tag>
```

### Removable

Use the `with-remove` attribute to add a remove button to the tag. The button carries a built-in `Remove` label for assistive technology, and activating it emits the `wa-remove` event so you can handle the removal.

```html {.example}
<div class="tags-removable">
  <wa-tag size="xs" with-remove>Extra Small</wa-tag>
  <wa-tag size="s" with-remove>Small</wa-tag>
  <wa-tag size="m" with-remove>Medium</wa-tag>
  <wa-tag size="l" with-remove>Large</wa-tag>
  <wa-tag size="xl" with-remove>Extra Large</wa-tag>
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
