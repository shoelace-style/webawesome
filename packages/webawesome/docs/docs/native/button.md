---
title: Button
description: 'Button styles apply your Web Awesome theme to native HTML buttons. Buttons are activated by users to perform actions, such as submitting a form.'
tags: forms
component: button
icon: button
snippets:
  '<button>': https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
  '.wa-button': false
file: styles/native/button.css
---

```html {.example}
<button>Button</button>
<input type="button" value="Input (button)">
<input type="reset" value="Input (reset)">
<input type="submit" value="Input (submit)">
```

## Examples

### Variants

Use the [variant utility classes](../utilities/color.md) to set the button's semantic variant.

```html {.example}
<button class="wa-neutral">Neutral</button>
<button class="wa-brand">Brand</button>
<button class="wa-success">Success</button>
<button class="wa-warning">Warning</button>
<button class="wa-danger">Danger</button>
```

### Appearance

Use the [appearance utility classes](/docs/utilities/appearance) to change the button's visual appearance:

```html {.example}
<div style="margin-block-end: 1rem;">
  <button class="wa-accent wa-outlined wa-neutral">A + O</button>
  <button class="wa-accent wa-neutral">Accent</button>
  <button class="wa-outlined wa-neutral">Outlined</button>
  <button class="wa-filled wa-outlined wa-neutral">F + O</button>
  <button class="wa-filled wa-neutral">Filled</button>
  <button class="wa-plain wa-neutral">Plain</button>
</div>
<div style="margin-block-end: 1rem;">
  <button class="wa-accent wa-outlined wa-brand">A + O</button>
  <button class="wa-accent wa-brand">Accent</button>
  <button class="wa-outlined wa-brand">Outlined</button>
  <button class="wa-filled wa-outlined wa-brand">F + O</button>
  <button class="wa-filled wa-brand">Filled</button>
  <button class="wa-plain wa-brand">Plain</button>
</div>
<div style="margin-block-end: 1rem;">
  <button class="wa-accent wa-outlined wa-success">A + O</button>
  <button class="wa-accent wa-success">Accent</button>
  <button class="wa-outlined wa-success">Outlined</button>
  <button class="wa-filled wa-outlined wa-success">F + O</button>
  <button class="wa-filled wa-success">Filled</button>
  <button class="wa-plain wa-success">Plain</button>
</div>
<div style="margin-block-end: 1rem;">
  <button class="wa-accent wa-outlined wa-warning">A + O</button>
  <button class="wa-accent wa-warning">Accent</button>
  <button class="wa-outlined wa-warning">Outlined</button>
  <button class="wa-filled wa-outlined wa-warning">F + O</button>
  <button class="wa-filled wa-warning">Filled</button>
  <button class="wa-plain wa-warning">Plain</button>
</div>
<div>
  <button class="wa-accent wa-outlined wa-danger">A + O</button>
  <button class="wa-accent wa-danger">Accent</button>
  <button class="wa-outlined wa-danger">Outlined</button>
  <button class="wa-filled wa-outlined wa-danger">F + O</button>
  <button class="wa-filled wa-danger">Filled</button>
  <button class="wa-plain wa-danger">Plain</button>
</div>
```

### Sizes

Use the [size utility classes](../utilities/size.md) to change a button's size.

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
