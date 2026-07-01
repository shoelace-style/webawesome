---
title: Radio Group
layout: component
category: Forms
synonyms:
  - radio buttons
  - option group
  - button group
use-cases:
  - single select group
  - exclusive options
---

```html {.example}
<wa-radio-group label="Coffee roast" name="roast" value="medium">
  <wa-radio value="light">Light roast</wa-radio>
  <wa-radio value="medium">Medium roast</wa-radio>
  <wa-radio value="dark">Dark roast</wa-radio>
</wa-radio-group>
```

## Examples

### Setting Initial Values

Use the `value` attribute on the radio group to set the initially selected radio. Match it to the `value` of the radio that should start checked, just like native HTML.

```html {.example}
<wa-radio-group label="Coffee roast" name="roast" value="dark">
  <wa-radio value="light">Light roast</wa-radio>
  <wa-radio value="medium">Medium roast</wa-radio>
  <wa-radio value="dark">Dark roast</wa-radio>
</wa-radio-group>
```

:::info
To target checked radios with CSS, use the `:state(checked)` selector.
:::

### Hint

Add descriptive hint to a radio group with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html {.example}
<wa-radio-group label="Coffee roast" hint="Pick the roast we'll grind for your order." name="roast" value="medium">
  <wa-radio value="light">Light roast</wa-radio>
  <wa-radio value="medium">Medium roast</wa-radio>
  <wa-radio value="dark">Dark roast</wa-radio>
</wa-radio-group>
```

### Radio Buttons

Set the `appearance` attribute to `button` on all radios to render a radio button group.

```html {.example}
<div class="wa-stack">
  <wa-radio-group
    label="Color scheme"
    hint="Choose how the interface should appear."
    orientation="horizontal"
    name="scheme"
    value="auto"
  >
    <wa-radio appearance="button" value="light">Light</wa-radio>
    <wa-radio appearance="button" value="dark">Dark</wa-radio>
    <wa-radio appearance="button" value="auto">Auto</wa-radio>
  </wa-radio-group>

  <wa-radio-group
    label="Color scheme"
    hint="Choose how the interface should appear."
    orientation="vertical"
    name="scheme"
    value="auto"
    style="max-width: 300px;"
  >
    <wa-radio appearance="button" value="light">Light</wa-radio>
    <wa-radio appearance="button" value="dark">Dark</wa-radio>
    <wa-radio appearance="button" value="auto">Auto</wa-radio>
  </wa-radio-group>
</div>
```

### Disabled

To disable the entire radio group, add the `disabled` attribute to the radio group.

```html {.example}
<wa-radio-group label="Shipping speed" disabled>
  <wa-radio value="standard">Standard</wa-radio>
  <wa-radio value="express">Express</wa-radio>
  <wa-radio value="overnight">Overnight</wa-radio>
</wa-radio-group>
```

To disable individual options, add the `disabled` attribute to the respective options.

```html {.example}
<wa-radio-group label="Shipping speed">
  <wa-radio value="standard">Standard</wa-radio>
  <wa-radio value="express">Express</wa-radio>
  <wa-radio value="overnight" disabled>Overnight</wa-radio>
</wa-radio-group>
```

### Orientation

The default orientation for radio items is `vertical`. Set the `orientation` to `horizontal` to lay items out on the same row.

```html {.example}
<wa-radio-group
  label="Shipping speed"
  hint="Choose how fast you'd like your order."
  orientation="horizontal"
  name="shipping"
  value="standard"
>
  <wa-radio value="standard">Standard</wa-radio>
  <wa-radio value="express">Express</wa-radio>
  <wa-radio value="overnight">Overnight</wa-radio>
</wa-radio-group>
```

### Sizes

The size of radios will be determined by the Radio Group's `size` attribute.

```html {.example}
<div class="wa-stack">
  <wa-radio-group label="Extra small" size="xs" value="medium">
    <wa-radio value="light">Light roast</wa-radio>
    <wa-radio value="medium">Medium roast</wa-radio>
    <wa-radio value="dark">Dark roast</wa-radio>
  </wa-radio-group>
  <wa-radio-group label="Small" size="s" value="medium">
    <wa-radio value="light">Light roast</wa-radio>
    <wa-radio value="medium">Medium roast</wa-radio>
    <wa-radio value="dark">Dark roast</wa-radio>
  </wa-radio-group>
  <wa-radio-group label="Medium" size="m" value="medium">
    <wa-radio value="light">Light roast</wa-radio>
    <wa-radio value="medium">Medium roast</wa-radio>
    <wa-radio value="dark">Dark roast</wa-radio>
  </wa-radio-group>
  <wa-radio-group label="Large" size="l" value="dark">
    <wa-radio value="light">Light roast</wa-radio>
    <wa-radio value="medium">Medium roast</wa-radio>
    <wa-radio value="dark">Dark roast</wa-radio>
  </wa-radio-group>
  <wa-radio-group label="Extra large" size="xl" value="dark">
    <wa-radio value="light">Light roast</wa-radio>
    <wa-radio value="medium">Medium roast</wa-radio>
    <wa-radio value="dark">Dark roast</wa-radio>
  </wa-radio-group>
</div>
```

If you need to have radios of varying sizes, place the `size` attribute on individual radio items instead.

```html {.example}
<wa-radio-group label="Mixed sizes" value="m">
  <wa-radio value="xs" size="xs">Extra Small</wa-radio>
  <wa-radio value="s" size="s">Small</wa-radio>
  <wa-radio value="m" size="m">Medium</wa-radio>
  <wa-radio value="l" size="l">Large</wa-radio>
  <wa-radio value="xl" size="xl">Extra Large</wa-radio>
</wa-radio-group>
```

### Validation

Set the `required` attribute to make selecting an option mandatory. If a value has not been selected, it will prevent the form from submitting and display an error message.

```html {.example}
<form class="validation">
  <wa-radio-group label="Coffee roast" name="roast" required>
    <wa-radio value="light">Light roast</wa-radio>
    <wa-radio value="medium">Medium roast</wa-radio>
    <wa-radio value="dark">Dark roast</wa-radio>
  </wa-radio-group>
  <br />
  <wa-button appearance="filled" type="submit" variant="neutral">Submit</wa-button>
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
  <wa-radio-group label="Coffee roast" name="roast" value="light">
    <wa-radio value="light">Light roast</wa-radio>
    <wa-radio value="medium">Medium roast</wa-radio>
    <wa-radio value="dark">Dark roast</wa-radio>
  </wa-radio-group>
  <br />
  <wa-button appearance="filled" type="submit" variant="neutral">Submit</wa-button>
</form>

<script>
  const form = document.querySelector('.custom-validity');
  const radioGroup = form.querySelector('wa-radio-group');
  const errorMessage = 'Sorry, we only have dark roast today';

  // Set initial validity as soon as the element is defined
  customElements.whenDefined('wa-radio-group').then(() => {
    radioGroup.setCustomValidity(errorMessage);
  });

  // Update validity when a selection is made
  form.addEventListener('change', () => {
    const isValid = radioGroup.value === 'dark';
    radioGroup.setCustomValidity(isValid ? '' : errorMessage);
  });

  // Handle form submit
  form.addEventListener('submit', event => {
    event.preventDefault();
    alert('All fields are valid!');
  });
</script>
```
