---
title: Input
layout: component
category: Forms
synonyms:
  - text field
  - text box
  - form field
  - text input
use-cases:
  - form input
  - search box
  - email field
  - password field
  - url field
---

```html {.example}
<wa-input label="Name"></wa-input>
```

:::info
This component works with standard `<form>` elements. See [form controls](/docs/form-controls) for form submission and client-side validation.
:::

## Examples

### Labels

Use the `label` attribute to give the input an accessible label. For labels that contain HTML, use the `label` slot instead.

```html {.example}
<wa-input label="What is your name?"></wa-input>
```

### Hint

Add descriptive hint to an input with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html {.example}
<wa-input label="Nickname" hint="What would you like people to call you?"></wa-input>
```

### Placeholders

Use the `placeholder` attribute to add a placeholder.

```html {.example}
<wa-input label="Search" placeholder="Search the docs"></wa-input>
```

### Clearable

Add the `with-clear` attribute to add a clear button when the input has content.

```html {.example}
<wa-input placeholder="Clearable" with-clear></wa-input>
```

### Toggle Password

Add the `password-toggle` attribute to add a toggle button that will show the password when activated.

```html {.example}
<wa-input type="password" placeholder="Password Toggle" password-toggle></wa-input>
```

### Appearance

Use the `appearance` attribute to change the input's visual appearance.

```html {.example}
<div class="wa-stack">
  <wa-input appearance="outlined" placeholder="outlined"></wa-input>
  <wa-input appearance="filled" placeholder="filled"></wa-input>
  <wa-input appearance="filled-outlined" placeholder="filled-outlined"></wa-input>
</div>
```

### Disabled

Use the `disabled` attribute to disable an input.

```html {.example}
<wa-input placeholder="Disabled" disabled></wa-input>
```

### Readonly

Use the `readonly` attribute to keep a value visible but uneditable. Unlike `disabled`, a readonly input stays focusable and its value is still submitted with the form.

```html {.example}
<wa-input label="Account ID" value="WA-2049" readonly></wa-input>
```

### Sizes

Use the `size` attribute to change an input's size.

```html {.example}
<div class="wa-stack">
  <wa-input size="xs" placeholder="Extra small"></wa-input>
  <wa-input size="s" placeholder="Small"></wa-input>
  <wa-input size="m" placeholder="Medium"></wa-input>
  <wa-input size="l" placeholder="Large"></wa-input>
  <wa-input size="xl" placeholder="Extra large"></wa-input>
</div>
```

### Pill

Use the `pill` attribute to give inputs rounded edges.

```html {.example}
<wa-input placeholder="Search" pill></wa-input>
```

### Input Types

The `type` attribute controls the type of input the browser renders.

```html {.example}
<div class="wa-stack">
  <wa-input type="email" placeholder="Email"></wa-input>
  <wa-input type="number" placeholder="Number"></wa-input>
  <wa-input type="date" placeholder="Date"></wa-input>
</div>
```

### Start & End Decorations

Use the `start` and `end` slots to add presentational elements like `<wa-icon>` within the input.

```html {.example}
<div class="wa-stack">
  <wa-input label="Search" placeholder="Search the docs">
    <wa-icon name="magnifying-glass" slot="start"></wa-icon>
  </wa-input>
  <wa-input label="Website" placeholder="example.com">
    <wa-icon name="globe" slot="start"></wa-icon>
    <wa-icon name="circle-info" slot="end"></wa-icon>
  </wa-input>
</div>
```

### Customizing Label Position

Use [CSS parts](#css-parts) to customize the way form controls are drawn. This example uses CSS grid to position the label to the left of the control, but the possible orientations are nearly endless. The same technique works for inputs, textareas, radio groups, and similar form controls.

```html {.example}
<div class="label-on-left">
  <wa-input label="Name" hint="Enter your name"></wa-input>
  <wa-input label="Email" type="email" hint="Enter your email"></wa-input>
  <wa-textarea label="Bio" hint="Tell us something about yourself"></wa-textarea>
</div>

<style>
  .label-on-left {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--wa-space-l);
    align-items: center;

    wa-input,
    wa-textarea {
      grid-column: 1 / -1;
      grid-row-end: span 2;
      display: grid;
      grid-template-columns: subgrid;
      gap: 0 var(--wa-space-l);
      align-items: center;
    }

    ::part(label) {
      text-align: right;
    }

    ::part(hint) {
      grid-column: 2;
    }
  }
</style>
```