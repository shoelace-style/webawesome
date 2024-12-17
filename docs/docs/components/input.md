---
title: Input
description: Inputs collect data from the user.
tags: component
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

Add the `clearable` attribute to add a clear button when the input has content.

```html {.example}
<wa-input placeholder="Clearable" clearable></wa-input>
```

### Toggle Password

Add the `password-toggle` attribute to add a toggle button that will show the password when activated.

```html {.example}
<wa-input type="password" placeholder="Password Toggle" password-toggle></wa-input>
```

### Filled Inputs

Add the `filled` attribute to draw a filled input.

```html {.example}
<wa-input placeholder="Type something" filled></wa-input>
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

### Prefix & Suffix Icons

Use the `prefix` and `suffix` slots to add icons.

```html {.example}
<wa-input placeholder="Small" size="small">
  <wa-icon name="house" variant="solid" slot="prefix"></wa-icon>
  <wa-icon name="comment" variant="solid" slot="suffix"></wa-icon>
</wa-input>
<br />
<wa-input placeholder="Medium" size="medium">
  <wa-icon name="house" variant="solid" slot="prefix"></wa-icon>
  <wa-icon name="comment" variant="solid" slot="suffix"></wa-icon>
</wa-input>
<br />
<wa-input placeholder="Large" size="large">
  <wa-icon name="house" variant="solid" slot="prefix"></wa-icon>
  <wa-icon name="comment" variant="solid" slot="suffix"></wa-icon>
</wa-input>
```

### Customizing Label Position

Use [CSS parts](#css-parts) to customize the way form controls are drawn. This example uses CSS grid to position the label to the left of the control, but the possible orientations are nearly endless. The same technique works for inputs, textareas, radio groups, and similar form controls.

```html {.example}
<wa-input class="label-on-left" label="Name" hint="Enter your name"></wa-input>
<wa-input class="label-on-left" label="Email" type="email" hint="Enter your email"></wa-input>
<wa-textarea class="label-on-left" label="Bio" hint="Tell us something about yourself"></wa-textarea>

<style>
  .label-on-left {
    --label-width: 3.75rem;
    --gap-width: 1rem;
  }

  .label-on-left + .label-on-left {
    margin-top: var(--wa-space-m);
  }

  .label-on-left::part(form-control) {
    display: grid;
    grid: auto / var(--label-width) 1fr;
    gap: var(--wa-space-3xs) var(--gap-width);
    align-items: center;
  }

  .label-on-left::part(form-control-label) {
    text-align: right;
  }

  .label-on-left::part(hint) {
    grid-column-start: 2;
  }
</style>
```
