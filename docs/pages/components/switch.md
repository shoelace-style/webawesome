---
meta:
  title: Switch
  description: Switches allow the user to toggle an option on or off.
layout: component
---

```html:preview
<wa-switch>Switch</wa-switch>
```

```jsx:react
import WaSwitch from '@shoelace-style/shoelace/dist/react/switch';

const App = () => <WaSwitch>Switch</WaSwitch>;
```

:::tip
This component works with standard `<form>` elements. Please refer to the section on [form controls](/getting-started/form-controls) to learn more about form submission and client-side validation.
:::

## Examples

### Checked

Use the `checked` attribute to activate the switch.

```html:preview
<wa-switch checked>Checked</wa-switch>
```

```jsx:react
import WaSwitch from '@shoelace-style/shoelace/dist/react/switch';

const App = () => <WaSwitch checked>Checked</WaSwitch>;
```

### Disabled

Use the `disabled` attribute to disable the switch.

```html:preview
<wa-switch disabled>Disabled</wa-switch>
```

```jsx:react
import WaSwitch from '@shoelace-style/shoelace/dist/react/switch';

const App = () => <WaSwitch disabled>Disabled</WaSwitch>;
```

### Sizes

Use the `size` attribute to change a switch's size.

```html:preview
<wa-switch size="small">Small</wa-switch>
<br />
<wa-switch size="medium">Medium</wa-switch>
<br />
<wa-switch size="large">Large</wa-switch>
```

```jsx:react
import WaSwitch from '@shoelace-style/shoelace/dist/react/switch';

const App = () => (
  <>
    <WaSwitch size="small">Small</WaSwitch>
    <br />
    <WaSwitch size="medium">Medium</WaSwitch>
    <br />
    <WaSwitch size="large">Large</WaSwitch>
  </>
);
```

### Custom Styles

Use the available custom properties to change how the switch is styled.

```html:preview
<wa-switch style="--width: 80px; --height: 40px; --thumb-size: 36px;">Really big</wa-switch>
```

{% raw %}

```jsx:react
import WaSwitch from '@shoelace-style/shoelace/dist/react/switch';

const App = () => (
  <WaSwitch
    style={{
      '--width': '80px',
      '--height': '32px',
      '--thumb-size': '26px'
    }}
  />
);
```

{% endraw %}
