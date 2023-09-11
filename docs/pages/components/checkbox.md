---
meta:
  title: Checkbox
  description: Checkboxes allow the user to toggle an option on or off.
layout: component
---

```html:preview
<wa-checkbox>Checkbox</wa-checkbox>
```

```jsx:react
import WaCheckbox from '@shoelace-style/shoelace/dist/react/checkbox';

const App = () => <WaCheckbox>Checkbox</WaCheckbox>;
```

:::tip
This component works with standard `<form>` elements. Please refer to the section on [form controls](/getting-started/form-controls) to learn more about form submission and client-side validation.
:::

## Examples

### Checked

Use the `checked` attribute to activate the checkbox.

```html:preview
<wa-checkbox checked>Checked</wa-checkbox>
```

```jsx:react
import WaCheckbox from '@shoelace-style/shoelace/dist/react/checkbox';

const App = () => <WaCheckbox checked>Checked</WaCheckbox>;
```

### Indeterminate

Use the `indeterminate` attribute to make the checkbox indeterminate.

```html:preview
<wa-checkbox indeterminate>Indeterminate</wa-checkbox>
```

```jsx:react
import WaCheckbox from '@shoelace-style/shoelace/dist/react/checkbox';

const App = () => <WaCheckbox indeterminate>Indeterminate</WaCheckbox>;
```

### Disabled

Use the `disabled` attribute to disable the checkbox.

```html:preview
<wa-checkbox disabled>Disabled</wa-checkbox>
```

```jsx:react
import WaCheckbox from '@shoelace-style/shoelace/dist/react/checkbox';

const App = () => <WaCheckbox disabled>Disabled</WaCheckbox>;
```

### Sizes

Use the `size` attribute to change a checkbox's size.

```html:preview
<wa-checkbox size="small">Small</wa-checkbox>
<br />
<wa-checkbox size="medium">Medium</wa-checkbox>
<br />
<wa-checkbox size="large">Large</wa-checkbox>
```

```jsx:react
import WaCheckbox from '@shoelace-style/shoelace/dist/react/checkbox';

const App = () => (
  <>
    <WaCheckbox size="small">Small</WaCheckbox>
    <br />
    <WaCheckbox size="medium">Medium</WaCheckbox>
    <br />
    <WaCheckbox size="large">Large</WaCheckbox>
  </>
);
```

### Custom Validity

Use the `setCustomValidity()` method to set a custom validation message. This will prevent the form from submitting and make the browser display the error message you provide. To clear the error, call this function with an empty string.

```html:preview
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
  checkbox.addEventListener('wa-change', () => {
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

{% raw %}

```jsx:react
import { useEffect, useRef } from 'react';
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaCheckbox from '@shoelace-style/shoelace/dist/react/checkbox';

const App = () => {
  const checkbox = useRef(null);
  const errorMessage = `Don't forget to check me!`;

  function handleChange() {
    checkbox.current.setCustomValidity(checkbox.current.checked ? '' : errorMessage);
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert('All fields are valid!');
  }

  useEffect(() => {
    checkbox.current.setCustomValidity(errorMessage);
  }, []);

  return (
    <form class="custom-validity" onSubmit={handleSubmit}>
      <WaCheckbox ref={checkbox} onWaChange={handleChange}>
        Check me
      </WaCheckbox>
      <br />
      <WaButton type="submit" variant="brand" style={{ marginTop: '1rem' }}>
        Submit
      </WaButton>
    </form>
  );
};
```

{% endraw %}
