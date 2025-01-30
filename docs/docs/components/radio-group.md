---
title: Radio Group
description: Radio groups are used to group multiple radios or radio buttons so they function as a single form control.
tags: [inputs, forms]
icon: radio-group
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

[Radio buttons](/docs/components/radio-button) offer an alternate way to display radio controls. In this case, an internal [button group](/docs/components/button-group) is used to group the buttons into a single, cohesive control.

```html {.example}
<wa-radio-group 
  label="Horizontal options" 
  hint="Select an option that makes you proud." 
  orientation="horizontal" 
  name="a" 
  value="1"
>
  <wa-radio-button value="1">Option 1</wa-radio-button>
  <wa-radio-button value="2">Option 2</wa-radio-button>
  <wa-radio-button value="3">Option 3</wa-radio-button>
</wa-radio-group>

<br>

<wa-radio-group 
  label="Vertical options" 
  hint="Select an option that makes you proud." 
  orientation="vertical" 
  name="a" 
  value="1"
  style="max-width: 300px;"
>
  <wa-radio-button value="1">Option 1</wa-radio-button>
  <wa-radio-button value="2">Option 2</wa-radio-button>
  <wa-radio-button value="3">Option 3</wa-radio-button>
</wa-radio-group>
```

### Disabling Options

Radios and radio buttons can be disabled by adding the `disabled` attribute to the respective options inside the radio group.

```html {.example}
<wa-radio-group label="Select an option" name="a" value="1">
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

The size of [Radios](/docs/components/radio) and [Radio Buttons](/docs/components/radio-buttons) will be determined by the Radio Group's `size` attribute.

```html preview
<wa-radio-group label="Select an option" size="medium" value="medium" class="radio-group-size">
  <wa-radio value="small">Small</wa-radio>
  <wa-radio value="medium">Medium</wa-radio>
  <wa-radio value="large">Large</wa-radio>
</wa-radio-group>

<script>
  const radioGroup = document.querySelector('.radio-group-size');

  radioGroup.addEventlistener('change', () => {
    radioGroup.size = radioGroup.value;
  });
</script>
```

:::info
[Radios](/docs/components/radio) and [Radio Buttons](/docs/components/radio-button) also have a `size` attribute. This can be useful in certain compositions, but it will be ignored when used inside of a Radio Group.
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
