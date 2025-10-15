---
title: Input
description: Inputs collect data from the user.
layout: component
category: Form Controls
---

```html {.example}
<wa-input></wa-input>
```

:::info
This component works with standard `<form>` elements. Please refer to the section on [form controls](/docs/form-controls) to learn more about form submission and client-side validation.
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
<wa-input placeholder="Type something"></wa-input>
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
<wa-input placeholder="Type something" appearance="filled"></wa-input><br />
<wa-input placeholder="Type something" appearance="filled-outlined"></wa-input><br />
<wa-input placeholder="Type something" appearance="outlined"></wa-input>
```

### Disabled

Use the `disabled` attribute to disable an input.

```html {.example}
<wa-input placeholder="Disabled" disabled></wa-input>
```

### Sizes

Use the `size` attribute to change an input's size.

```html {.example}
<wa-input placeholder="Small" size="small"></wa-input>
<br />
<wa-input placeholder="Medium" size="medium"></wa-input>
<br />
<wa-input placeholder="Large" size="large"></wa-input>
```

### Pill

Use the `pill` attribute to give inputs rounded edges.

```html {.example}
<wa-input placeholder="Small" size="small" pill></wa-input>
<br />
<wa-input placeholder="Medium" size="medium" pill></wa-input>
<br />
<wa-input placeholder="Large" size="large" pill></wa-input>
```

### Input Types

The `type` attribute controls the type of input the browser renders.

```html {.example}
<wa-input type="email" placeholder="Email"></wa-input>
<br />
<wa-input type="number" placeholder="Number"></wa-input>
<br />
<wa-input type="date" placeholder="Date"></wa-input>
```

### Start & End Decorations

Use the `start` and `end` slots to add presentational elements like `<wa-icon>` within the input.

```html {.example}
<wa-input placeholder="Small" size="small">
  <wa-icon name="house" slot="start"></wa-icon>
  <wa-icon name="comment" slot="end"></wa-icon>
</wa-input>
<br />
<wa-input placeholder="Medium" size="medium">
  <wa-icon name="house" slot="start"></wa-icon>
  <wa-icon name="comment" slot="end"></wa-icon>
</wa-input>
<br />
<wa-input placeholder="Large" size="large">
  <wa-icon name="house" slot="start"></wa-icon>
  <wa-icon name="comment" slot="end"></wa-icon>
</wa-input>
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
