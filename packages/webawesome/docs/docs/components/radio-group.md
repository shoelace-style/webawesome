---
title: Radio Group
description: Radio groups are used to group multiple radios so they function as a single form control.
layout: component
category: Form Controls
---

```html {.example}
<wa-radio-group label="Select an option" name="a" value="1">
  <wa-radio value="1">Option 1</wa-radio>
  <wa-radio value="2">Option 2</wa-radio>
  <wa-radio value="3">Option 3</wa-radio>
</wa-radio-group>
```

## Examples

### Hint

Add descriptive hint to a radio group with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html {.example}
<wa-radio-group label="Select an option" hint="Choose the most appropriate option." name="a" value="1">
  <wa-radio value="1">Option 1</wa-radio>
  <wa-radio value="2">Option 2</wa-radio>
  <wa-radio value="3">Option 3</wa-radio>
</wa-radio-group>
```

### Radio Buttons

Set the `appearance` attribute to `button` on all radios to render a radio button group.

```html {.example}
<wa-radio-group
  label="Horizontal options"
  hint="Select an option that makes you proud."
  orientation="horizontal"
  name="a"
  value="1"
>
  <wa-radio appearance="button" value="1">Option 1</wa-radio>
  <wa-radio appearance="button" value="2">Option 2</wa-radio>
  <wa-radio appearance="button" value="3">Option 3</wa-radio>
</wa-radio-group>

<br />

<wa-radio-group
  label="Vertical options"
  hint="Select an option that makes you proud."
  orientation="vertical"
  name="a"
  value="1"
  style="max-width: 300px;"
>
  <wa-radio appearance="button" value="1">Option 1</wa-radio>
  <wa-radio appearance="button" value="2">Option 2</wa-radio>
  <wa-radio appearance="button" value="3">Option 3</wa-radio>
</wa-radio-group>
```

### Disabling

To disable the entire radio group, add the `disabled` attribute to the radio group.

```html {.example}
<wa-radio-group label="Select an option" disabled>
  <wa-radio value="1">Option 1</wa-radio>
  <wa-radio value="2" disabled>Option 2</wa-radio>
  <wa-radio value="3">Option 3</wa-radio>
</wa-radio-group>
```

To disable individual options, add the `disabled` attribute to the respective options.

```html {.example}
<wa-radio-group label="Select an option">
  <wa-radio value="1">Option 1</wa-radio>
  <wa-radio value="2" disabled>Option 2</wa-radio>
  <wa-radio value="3">Option 3</wa-radio>
</wa-radio-group>
```

### Orientation

The default orientation for radio items is `vertical`. Set the `orientation` to `horizontal` to items on the same row.

```html {.example}
<wa-radio-group
  label="Select an option"
  hint="Choose the most appropriate option."
  orientation="horizontal"
  name="a"
  value="1"
>
  <wa-radio value="1">Option 1</wa-radio>
  <wa-radio value="2">Option 2</wa-radio>
  <wa-radio value="3">Option 3</wa-radio>
</wa-radio-group>
```

### Sizing Options

The size of radios will be determined by the Radio Group's `size` attribute.

```html {.example}
<wa-radio-group label="Select an option" size="medium" value="medium" onchange="this.size = this.value">
  <wa-radio value="small">Small</wa-radio>
  <wa-radio value="medium">Medium</wa-radio>
  <wa-radio value="large">Large</wa-radio>
</wa-radio-group>
```

:::info
[Radios](/docs/components/radio) also have a `size` attribute,
which will override the inherited size when used.
:::

### Validation

Setting the `required` attribute to make selecting an option mandatory. If a value has not been selected, it will prevent the form from submitting and display an error message.

```html {.example}
<form class="validation">
  <wa-radio-group label="Select an option" name="a" required>
    <wa-radio value="1">Option 1</wa-radio>
    <wa-radio value="2">Option 2</wa-radio>
    <wa-radio value="3">Option 3</wa-radio>
  </wa-radio-group>
  <br />
  <wa-button type="submit" variant="brand">Submit</wa-button>
</form>

<script>
  const form = document.querySelector('.validation');

  // Handle form submit
  form.addEventListener('submit', event => {
    event.preventDefault();
    alert('All fields are valid!');
  });
</script>
```

### Custom Validity

Use the `setCustomValidity()` method to set a custom validation message. This will prevent the form from submitting and make the browser display the error message you provide. To clear the error, call this function with an empty string.

```html {.example}
<form class="custom-validity">
  <wa-radio-group label="Select an option" name="a" value="1">
    <wa-radio value="1">Not me</wa-radio>
    <wa-radio value="2">Me neither</wa-radio>
    <wa-radio value="3">Choose me</wa-radio>
  </wa-radio-group>
  <br />
  <wa-button type="submit" variant="brand">Submit</wa-button>
</form>

<script>
  const form = document.querySelector('.custom-validity');
  const radioGroup = form.querySelector('wa-radio-group');
  const errorMessage = 'You must choose the last option';

  // Set initial validity as soon as the element is defined
  customElements.whenDefined('wa-radio-group').then(() => {
    radioGroup.setCustomValidity(errorMessage);
  });

  // Update validity when a selection is made
  form.addEventListener('change', () => {
    const isValid = radioGroup.value === '3';
    radioGroup.setCustomValidity(isValid ? '' : errorMessage);
  });

  // Handle form submit
  form.addEventListener('submit', event => {
    event.preventDefault();
    alert('All fields are valid!');
  });
</script>
```
