---
meta:
  title: Radio Group
  description: Radio groups are used to group multiple radios or radio buttons so they function as a single form control.
layout: component
---

```html:preview
<wa-radio-group label="Select an option" name="a" value="1">
  <wa-radio value="1">Option 1</wa-radio>
  <wa-radio value="2">Option 2</wa-radio>
  <wa-radio value="3">Option 3</wa-radio>
</wa-radio-group>
```

```jsx:react
import WaRadio from '@shoelace-style/shoelace/dist/react/radio';
import WaRadioGroup from '@shoelace-style/shoelace/dist/react/radio-group';

const App = () => (
  <WaRadioGroup label="Select an option" name="a" value="1">
    <WaRadio value="1">Option 1</WaRadio>
    <WaRadio value="2">Option 2</WaRadio>
    <WaRadio value="3">Option 3</WaRadio>
  </WaRadioGroup>
);
```

## Examples

### Help Text

Add descriptive help text to a radio group with the `help-text` attribute. For help texts that contain HTML, use the `help-text` slot instead.

```html:preview
<wa-radio-group label="Select an option" help-text="Choose the most appropriate option." name="a" value="1">
  <wa-radio value="1">Option 1</wa-radio>
  <wa-radio value="2">Option 2</wa-radio>
  <wa-radio value="3">Option 3</wa-radio>
</wa-radio-group>
```

```jsx:react
import WaRadio from '@shoelace-style/shoelace/dist/react/radio';
import WaRadioGroup from '@shoelace-style/shoelace/dist/react/radio-group';

const App = () => (
  <WaRadioGroup label="Select an option" help-text="Choose the most appropriate option." name="a" value="1">
    <WaRadio value="1">Option 1</WaRadio>
    <WaRadio value="2">Option 2</WaRadio>
    <WaRadio value="3">Option 3</WaRadio>
  </WaRadioGroup>
);
```

### Radio Buttons

[Radio buttons](/components/radio-button) offer an alternate way to display radio controls. In this case, an internal [button group](/components/button-group) is used to group the buttons into a single, cohesive control.

```html:preview
<wa-radio-group label="Select an option" help-text="Select an option that makes you proud." name="a" value="1">
  <wa-radio-button value="1">Option 1</wa-radio-button>
  <wa-radio-button value="2">Option 2</wa-radio-button>
  <wa-radio-button value="3">Option 3</wa-radio-button>
</wa-radio-group>
```

```jsx:react
import WaRadioButton from '@shoelace-style/shoelace/dist/react/radio-button';
import WaRadioGroup from '@shoelace-style/shoelace/dist/react/radio-group';

const App = () => (
  <WaRadioGroup label="Select an option" name="a" value="1">
    <WaRadioButton value="1">Option 1</WaRadioButton>
    <WaRadioButton value="2">Option 2</WaRadioButton>
    <WaRadioButton value="3">Option 3</WaRadioButton>
  </WaRadioGroup>
);
```

### Disabling Options

Radios and radio buttons can be disabled by adding the `disabled` attribute to the respective options inside the radio group.

```html:preview
<wa-radio-group label="Select an option" name="a" value="1">
  <wa-radio value="1">Option 1</wa-radio>
  <wa-radio value="2" disabled>Option 2</wa-radio>
  <wa-radio value="3">Option 3</wa-radio>
</wa-radio-group>
```

```jsx:react
import WaRadio from '@shoelace-style/shoelace/dist/react/radio';
import WaRadioGroup from '@shoelace-style/shoelace/dist/react/radio-group';

const App = () => (
  <WaRadioGroup label="Select an option" name="a" value="1">
    <WaRadio value="1">Option 1</WaRadio>
    <WaRadio value="2" disabled>
      Option 2
    </WaRadio>
    <WaRadio value="3">Option 3</WaRadio>
  </WaRadioGroup>
);
```

### Sizing Options

The size of [Radios](/components/radio) and [Radio Buttons](/components/radio-buttons) will be determined by the Radio Group's `size` attribute.

```html preview
<wa-radio-group label="Select an option" size="medium" value="medium" class="radio-group-size">
  <wa-radio value="small">Small</wa-radio>
  <wa-radio value="medium">Medium</wa-radio>
  <wa-radio value="large">Large</wa-radio>
</wa-radio-group>

<script>
  const radioGroup = document.querySelector('.radio-group-size');

  radioGroup.addEventListener('wa-change', () => {
    radioGroup.size = radioGroup.value;
  });
</script>
```

```jsx react
import { useState } from 'react';
import WaRadio from '@shoelace-style/shoelace/dist/react/radio';
import WaRadioGroup from '@shoelace-style/shoelace/dist/react/radio-group';

const App = () => {
  const [size, setSize] = useState('medium');

  return (
    <>
      <WaRadioGroup
        label="Select an option"
        size={size}
        value={size}
        class="radio-group-size"
        onWaChange={event => setSize(event.target.value)}
      >
        <WaRadio value="small">Small</WaRadio>
        <WaRadio value="medium">Medium</WaRadio>
        <WaRadio value="large">Large</WaRadio>
      </WaRadioGroup>
    </>
  );
};
```

:::tip
[Radios](/components/radio) and [Radio Buttons](/components/radio-button) also have a `size` attribute. This can be useful in certain compositions, but it will be ignored when used inside of a Radio Group.
:::

### Validation

Setting the `required` attribute to make selecting an option mandatory. If a value has not been selected, it will prevent the form from submitting and display an error message.

```html:preview
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

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';
import WaRadio from '@shoelace-style/shoelace/dist/react/radio';
import WaRadioGroup from '@shoelace-style/shoelace/dist/react/radio-group';
const App = () => {
  function handleSubmit(event) {
    event.preventDefault();
    alert('All fields are valid!');
  }

  return (
    <form class="custom-validity" onSubmit={handleSubmit}>
      <WaRadioGroup label="Select an option" name="a" required onWaChange={handleChange}>
        <WaRadio value="1">
          Option 1
        </WaRadio>
        <WaRadiovalue="2">
          Option 2
        </WaRadio>
        <WaRadio value="3">
          Option 3
        </WaRadio>
      </WaRadioGroup>
      <br />
      <WaButton type="submit" variant="brand">
        Submit
      </WaButton>
    </form>
  );
};
```

### Custom Validity

Use the `setCustomValidity()` method to set a custom validation message. This will prevent the form from submitting and make the browser display the error message you provide. To clear the error, call this function with an empty string.

```html:preview
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
  customElements.whenDefined('wa-radio').then(() => {
    radioGroup.setCustomValidity(errorMessage);
  });

  // Update validity when a selection is made
  form.addEventListener('wa-change', () => {
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

```jsx:react
import { useEffect, useRef } from 'react';
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';
import WaRadio from '@shoelace-style/shoelace/dist/react/radio';
import WaRadioGroup from '@shoelace-style/shoelace/dist/react/radio-group';
const App = () => {
  const radioGroup = useRef(null);
  const errorMessage = 'You must choose this option';

  function handleChange() {
    radioGroup.current.setCustomValidity(radioGroup.current.value === '3' ? '' : errorMessage);
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert('All fields are valid!');
  }

  useEffect(() => {
    radio.current.setCustomValidity(errorMessage);
  }, []);

  return (
    <form class="custom-validity" onSubmit={handleSubmit}>
      <WaRadioGroup ref={radioGroup} label="Select an option" name="a" value="1" onWaChange={handleChange}>
        <WaRadio value="1">Not me</WaRadio>
        <WaRadio value="2">Me neither</WaRadio>
        <WaRadio value="3">Choose me</WaRadio>
      </WaRadioGroup>
      <br />
      <WaButton type="submit" variant="brand">
        Submit
      </WaButton>
    </form>
  );
};
```
