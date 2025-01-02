---
title: Checkbox
description: Checkboxes allow the user to toggle an option on or off.
tags: forms
component: checkbox
icon: checkbox
elements:
  "<input type=checkbox>": https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
---

```html {.example}
<label><input type="checkbox"> Checkbox</label>
```

## Examples

### Checked

Use the `checked` attribute to activate the checkbox.

```html {.example}
<label><input type="checkbox" checked> Checked</label>
```

<!--
### Indeterminate

Use the `indeterminate` JS property to make the checkbox indeterminate.

```html {.example}
<label><input type="checkbox" class="indeterminate"> Indeterminate</label>
<script>
  document.querySelector(".indeterminate").indeterminate = true;
</script>
```
-->

### Disabled

Use the `disabled` attribute to disable the checkbox.

```html {.example}
<label><input type="checkbox" disabled> Disabled</label>
```

<!--
### Sizes

Use the [size utilities](/docs/utilities/size) to change a checkbox's size.

```html {.example}
<label><input type="checkbox" class="wa-size-s"> Small</label>
<br />
<label><input type="checkbox" class="wa-size-m"> Medium</label>
<br />
<label><input type="checkbox" class="wa-size-l"> Large</label>
```
-->

### Custom Validity

Use the `setCustomValidity()` method to set a custom validation message. This will prevent the form from submitting and make the browser display the error message you provide. To clear the error, call this function with an empty string.

```html {.example}
<form class="custom-validity">
  <label><input type="checkbox"> Check me</label>
  <br />
  <button type="submit" variant="brand" style="margin-top: 1rem;">Submit</button>
</form>
<script>
  const form = document.querySelector('.custom-validity');
  const checkbox = form.querySelector('input[type=checkbox]');
  const errorMessage = `Don't forget to check me!`;

  // Set initial validity
  checkbox.setCustomValidity(errorMessage);

  // Update validity on change
  checkbox.addEventListener('change', () => {
    checkbox.setCustomValidity(checkbox.checked ? '' : errorMessage);
  });

  // Handle submit
  form.addEventListener('submit', event => {
    event.preventDefault();
    alert('All fields are valid!');
  });
</script>
```
