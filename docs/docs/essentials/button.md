---
title: Button
---

```html {.example}
<button>Button</button>
```

## Examples

### Variants

Use the variant utility classes to set the button's semantic variant.

```html {.example}
<button class="wa-neutral">Neutral</button>
<button class="wa-brand">Brand</button>
<button class="wa-success">Success</button>
<button class="wa-warning">Warning</button>
<button class="wa-danger">Danger</button>
```

### Appearance

Use the appearance utility classes to change the button's visual appearance:

```html {.example}
<div style="margin-block-end: 1rem;">
  <button class="wa-filled wa-neutral">Filled</button>
  <button class="wa-tinted wa-neutral">Tinted</button>
  <button class="wa-outlined wa-neutral">Outlined</button>
  <button class="wa-text wa-neutral">Text</button>
</div>
<div style="margin-block-end: 1rem;">
  <button class="wa-filled wa-brand">Filled</button>
  <button class="wa-tinted wa-brand">Tinted</button>
  <button class="wa-outlined wa-brand">Outlined</button>
  <button class="wa-text wa-brand">Text</button>
</div>
<div style="margin-block-end: 1rem;">
  <button class="wa-filled wa-success">Filled</button>
  <button class="wa-tinted wa-success">Tinted</button>
  <button class="wa-outlined wa-success">Outlined</button>
  <button class="wa-text wa-success">Text</button>
</div>
<div style="margin-block-end: 1rem;">
  <button class="wa-filled wa-warning">Filled</button>
  <button class="wa-tinted wa-warning">Tinted</button>
  <button class="wa-outlined wa-warning">Outlined</button>
  <button class="wa-text wa-warning">Text</button>
</div>
<div>
  <button class="wa-filled wa-danger">Filled</button>
  <button class="wa-tinted wa-danger">Tinted</button>
  <button class="wa-outlined wa-danger">Outlined</button>
  <button class="wa-text wa-danger">Text</button>
</div>
```

### Sizes

Use `wa-size-*` classes to change a button's size.

```html {.example}
<button class="wa-size-s">Small</button>
<button class="wa-size-m">Medium</button>
<button class="wa-size-l">Large</button>
```

### Pill Buttons

Use the `wa-pill` class to give buttons rounded edges.

```html {.example}
<button class="wa-size-s wa-pill">Small</button>
<button class="wa-size-m wa-pill">Medium</button>
<button class="wa-size-l wa-pill">Large</button>
```

### Link Buttons

It's often helpful to have a link that looks like a button.
This is possible by adding a `wa-button` class to your link.

```html {.example}
<a href="https://example.com/" class="wa-button">Link</a>
<a href="https://example.com/" target="_blank" class="wa-button">New Window</a>
<a href="/assets/images/logo.svg" download="shoelace.svg" class="wa-button">Download</a>
```

### Setting a Custom Width

As expected, buttons can be given a custom width by setting the `width` CSS property. This is useful for making buttons span the full width of their container on smaller screens.

```html {.example}
<button class="wa-size-s" style="width: 100%; margin-bottom: 1rem;">Small</button>
<button class="wa-size-m" style="width: 100%; margin-bottom: 1rem;">Medium</button>
<button class="wa-size-l" style="width: 100%;">Large</button>
```
<!--

### Loading

Use the `loading` attribute to make a button busy. The width will remain the same as before, preventing adjacent elements from moving around.

```html {.example}
<button class="wa-brand" loading>Brand</button>
<button class="wa-success" loading>Success</button>
<button class="wa-neutral" loading>Neutral</button>
<button class="wa-warning" loading>Warning</button>
<button class="wa-danger" loading>Danger</button>
```

### Disabled

Use the `disabled` attribute to disable a button.

```html {.example}
<button class="wa-brand" disabled>Brand</button>
<button class="wa-success" disabled>Success</button>
<button class="wa-neutral" disabled>Neutral</button>
<button class="wa-warning" disabled>Warning</button>
``` -->
