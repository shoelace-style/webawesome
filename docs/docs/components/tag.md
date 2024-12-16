---
title: Tag
description: Tags are used as labels to organize things or to indicate a selection.
tags: component
---

```html {.example}
<wa-tag variant="brand">Brand</wa-tag>
<wa-tag variant="success">Success</wa-tag>
<wa-tag variant="neutral">Neutral</wa-tag>
<wa-tag variant="warning">Warning</wa-tag>
<wa-tag variant="danger">Danger</wa-tag>
```

## Examples

### Sizes

Use the `size` attribute to change a tab's size.

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

Use the `removable` attribute to add a remove button to the tag.

```html {.example}
<div class="tags-removable">
  <wa-tag size="small" removable>Small</wa-tag>
  <wa-tag size="medium" removable>Medium</wa-tag>
  <wa-tag size="large" removable>Large</wa-tag>
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
