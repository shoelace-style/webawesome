---
title: Checkbox
layout: component
category: Forms
synonyms:
  - check
  - tick
  - checkmark
use-cases:
  - boolean toggle
  - multi-select option
  - terms agreement
  - todo item
---

```html {.example}
<wa-checkbox>I agree to the terms and conditions</wa-checkbox>
```

:::info
This component works with standard `<form>` elements. See [form controls](/docs/form-controls) for form submission and client-side validation.
:::

## Examples

### Setting Initial Values

Use the `checked` attribute to activate the checkbox.

```html {.example}
<wa-checkbox checked>Remember me</wa-checkbox>
```

:::info
<strong>`checked` sets the initial value, not the current state.</strong><br />
Consistent with native checkboxes, it doesn't reflect later changes. To toggle the checked state with JavaScript, use the `checked` property instead. To target checked checkboxes with CSS, use the `:state(checked)` selector.
:::

### Hint

Add a descriptive hint with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html {.example}
<wa-checkbox hint="You can turn this off later in settings.">Subscribe to the newsletter</wa-checkbox>
```

### Indeterminate

Use the `indeterminate` attribute to make the checkbox indeterminate. This is typically used for a "select all" control when its associated checkboxes have a mix of checked and unchecked states.

```html {.example}
<wa-checkbox indeterminate>Select all</wa-checkbox>
```

### Disabled

Use the `disabled` attribute to disable the checkbox.

```html {.example}
<wa-checkbox disabled>I accept marketing emails</wa-checkbox>
```

### Sizes

Use the `size` attribute to change a checkbox's size.

```html {.example}
<div class="wa-stack">
  <wa-checkbox size="xs">Extra Small</wa-checkbox>
  <wa-checkbox size="s">Small</wa-checkbox>
  <wa-checkbox size="m">Medium</wa-checkbox>
  <wa-checkbox size="l">Large</wa-checkbox>
  <wa-checkbox size="xl">Extra Large</wa-checkbox>
</div>
```

### Custom Validity

Use the `setCustomValidity()` method to set a custom validation message. This will prevent the form from submitting and make the browser display the error message you provide. To clear the error, call this function with an empty string.

```html {.example}
<form class="custom-validity">
  <wa-checkbox>Check me</wa-checkbox>
  <br />
  <wa-button appearance="filled" type="submit" variant="neutral" style="margin-top: 1rem;">Submit</wa-button>
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
