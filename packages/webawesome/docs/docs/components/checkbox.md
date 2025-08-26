---
title: Checkbox
description: Checkboxes allow the user to toggle an option on or off.
layout: component
category: Form Controls
---

```html {.example}
<wa-checkbox>Checkbox</wa-checkbox>
```

:::info
This component works with standard `<form>` elements. Please refer to the section on [form controls](/docs/form-controls) to learn more about form submission and client-side validation.
:::

## Examples

### Checked

Use the `checked` attribute to activate the checkbox.

```html {.example}
<wa-checkbox checked>Checked</wa-checkbox>
```

### Indeterminate

Use the `indeterminate` attribute to make the checkbox indeterminate.

```html {.example}
<wa-checkbox indeterminate>Indeterminate</wa-checkbox>
```

### Disabled

Use the `disabled` attribute to disable the checkbox.

```html {.example}
<wa-checkbox disabled>Disabled</wa-checkbox>
```

### Sizes

Use the `size` attribute to change a checkbox's size.

```html {.example}
<wa-checkbox size="small">Small</wa-checkbox>
<br />
<wa-checkbox size="medium">Medium</wa-checkbox>
<br />
<wa-checkbox size="large">Large</wa-checkbox>
```

### Hint

Add descriptive hint to a switch with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html {.example}
<wa-checkbox hint="What should the user know about the checkbox?">Label</wa-checkbox>
```

### Custom Validity

Use the `setCustomValidity()` method to set a custom validation message. This will prevent the form from submitting and make the browser display the error message you provide. To clear the error, call this function with an empty string.

```html {.example}
<form class="custom-validity">
  <wa-checkbox>Check me</wa-checkbox>
  <br />
  <wa-button type="submit" variant="brand" style="margin-top: 1rem;">Submit</wa-button>
</form>
<script>
  const form = document.querySelector('.custom-validity');
  const checkbox = form.querySelector('wa-checkbox');
  const errorMessage = `Don't forget to check me!`;

  // Set initial validity as soon as the element is defined
  customElements.whenDefined('wa-checkbox').then(async () => {
    await checkbox.updateComplete;
    checkbox.setCustomValidity(errorMessage);
  });

  // Update validity on change
  checkbox.addEventListener('change', () => {
    checkbox.setCustomValidity(checkbox.checked ? '' : errorMessage);
  });

  // Handle submit
  customElements.whenDefined('wa-checkbox').then(() => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      alert('All fields are valid!');
    });
  });
</script>
```
