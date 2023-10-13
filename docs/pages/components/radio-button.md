---
meta:
  title: Radio Button
  description: Radios buttons allow the user to select a single option from a group using a button-like control.
layout: component
---

Radio buttons are designed to be used with [radio groups](/components/radio-group). When a radio button has focus, the arrow keys can be used to change the selected option just like standard radio controls.

```html:preview
<wa-radio-group label="Select an option" name="a" value="1">
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

## Examples

### Checked States

To set the initial value and checked state, use the `value` attribute on the containing radio group.

```html:preview
<wa-radio-group label="Select an option" name="a" value="1">
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

### Disabled

Use the `disabled` attribute to disable a radio button.

```html:preview
<wa-radio-group label="Select an option" name="a" value="1">
  <wa-radio-button value="1">Option 1</wa-radio-button>
  <wa-radio-button value="2" disabled>Option 2</wa-radio-button>
  <wa-radio-button value="3">Option 3</wa-radio-button>
</wa-radio-group>
```

```jsx:react
import WaRadioButton from '@shoelace-style/shoelace/dist/react/radio-button';
import WaRadioGroup from '@shoelace-style/shoelace/dist/react/radio-group';

const App = () => (
  <WaRadioGroup label="Select an option" name="a" value="1">
    <WaRadioButton value="1">Option 1</WaRadioButton>
    <WaRadioButton value="2" disabled>
      Option 2
    </WaRadioButton>
    <WaRadioButton value="3">Option 3</WaRadioButton>
  </WaRadioGroup>
);
```

### Sizes

Use the `size` attribute to change a radio button's size.

```html:preview
<wa-radio-group size="small" label="Select an option" name="a" value="1">
  <wa-radio-button value="1">Option 1</wa-radio-button>
  <wa-radio-button value="2">Option 2</wa-radio-button>
  <wa-radio-button value="3">Option 3</wa-radio-button>
</wa-radio-group>

<br />

<wa-radio-group size="medium" label="Select an option" name="a" value="1">
  <wa-radio-button value="1">Option 1</wa-radio-button>
  <wa-radio-button value="2">Option 2</wa-radio-button>
  <wa-radio-button value="3">Option 3</wa-radio-button>
</wa-radio-group>

<br />

<wa-radio-group size="large" label="Select an option" name="a" value="1">
  <wa-radio-button value="1">Option 1</wa-radio-button>
  <wa-radio-button value="2">Option 2</wa-radio-button>
  <wa-radio-button value="3">Option 3</wa-radio-button>
</wa-radio-group>
```

```jsx:react
import WaRadioButton from '@shoelace-style/shoelace/dist/react/radio-button';
import WaRadioGroup from '@shoelace-style/shoelace/dist/react/radio-group';

const App = () => (
  <WaRadioGroup size="small" label="Select an option" name="a" value="1">
    <WaRadioButton value="1">Option 1</WaRadioButton>
    <WaRadioButton value="2">Option 2</WaRadioButton>
    <WaRadioButton value="3">Option 3</WaRadioButton>
  </WaRadioGroup>

  <br />

  <WaRadioGroup size="medium" label="Select an option" name="a" value="1">
    <WaRadioButton value="1">Option 1</WaRadioButton>
    <WaRadioButton value="2">Option 2</WaRadioButton>
    <WaRadioButton value="3">Option 3</WaRadioButton>
  </WaRadioGroup>

  <br />

  <WaRadioGroup size="large" label="Select an option" name="a" value="1">
    <WaRadioButton value="1">Option 1</WaRadioButton>
    <WaRadioButton value="2">Option 2</WaRadioButton>
    <WaRadioButton value="3">Option 3</WaRadioButton>
  </WaRadioGroup>
);
```

### Pill Buttons

Use the `pill` attribute to give radio buttons rounded edges.

```html:preview
<wa-radio-group size="small" label="Select an option" name="a" value="1">
  <wa-radio-button pill value="1">Option 1</wa-radio-button>
  <wa-radio-button pill value="2">Option 2</wa-radio-button>
  <wa-radio-button pill value="3">Option 3</wa-radio-button>
</wa-radio-group>

<br />

<wa-radio-group size="medium" label="Select an option" name="a" value="1">
  <wa-radio-button pill value="1">Option 1</wa-radio-button>
  <wa-radio-button pill value="2">Option 2</wa-radio-button>
  <wa-radio-button pill value="3">Option 3</wa-radio-button>
</wa-radio-group>

<br />

<wa-radio-group size="large" label="Select an option" name="a" value="1">
  <wa-radio-button pill value="1">Option 1</wa-radio-button>
  <wa-radio-button pill value="2">Option 2</wa-radio-button>
  <wa-radio-button pill value="3">Option 3</wa-radio-button>
</wa-radio-group>
```

```jsx:react
import WaRadioButton from '@shoelace-style/shoelace/dist/react/radio-button';
import WaRadioGroup from '@shoelace-style/shoelace/dist/react/radio-group';

const App = () => (
  <WaRadioGroup size="small" label="Select an option" name="a" value="1">
    <WaRadioButton pill value="1">Option 1</WaRadioButton>
    <WaRadioButton pill value="2">Option 2</WaRadioButton>
    <WaRadioButton pill value="3">Option 3</WaRadioButton>
  </WaRadioGroup>

  <br />

  <WaRadioGroup size="medium" label="Select an option" name="a" value="1">
    <WaRadioButton pill value="1">Option 1</WaRadioButton>
    <WaRadioButton pill value="2">Option 2</WaRadioButton>
    <WaRadioButton pill value="3">Option 3</WaRadioButton>
  </WaRadioGroup>

  <br />

  <WaRadioGroup size="large" label="Select an option" name="a" value="1">
    <WaRadioButton pill value="1">Option 1</WaRadioButton>
    <WaRadioButton pill value="2">Option 2</WaRadioButton>
    <WaRadioButton pill value="3">Option 3</WaRadioButton>
  </WaRadioGroup>
);
```

### Prefix and Suffix Icons

Use the `prefix` and `suffix` slots to add icons.

```html:preview
<wa-radio-group label="Select an option" name="a" value="1">
  <wa-radio-button value="1">
    <wa-icon slot="prefix" name="archive"></wa-icon>
    Option 1
  </wa-radio-button>

  <wa-radio-button value="2">
    <wa-icon slot="suffix" name="bag"></wa-icon>
    Option 2
  </wa-radio-button>

  <wa-radio-button value="3">
    <wa-icon slot="prefix" name="gift"></wa-icon>
    <wa-icon slot="suffix" name="cart"></wa-icon>
    Option 3
  </wa-radio-button>
</wa-radio-group>
```

```jsx:react
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';
import WaRadioButton from '@shoelace-style/shoelace/dist/react/radio-button';
import WaRadioGroup from '@shoelace-style/shoelace/dist/react/radio-group';

const App = () => (
  <WaRadioGroup label="Select an option" name="a" value="1">
    <WaRadioButton value="1">
      <WaIcon slot="prefix" name="archive" />
      Option 1
    </WaRadioButton>

    <WaRadioButton value="2">
      <WaIcon slot="suffix" name="bag" />
      Option 2
    </WaRadioButton>

    <WaRadioButton value="3">
      <WaIcon slot="prefix" name="gift" />
      <WaIcon slot="suffix" name="cart" />
      Option 3
    </WaRadioButton>
  </WaRadioGroup>
);
```

### Buttons with Icons

You can omit button labels and use icons instead. Make sure to set a `label` attribute on each icon so screen readers will announce each option correctly.

```html:preview
<wa-radio-group label="Select an option" name="a" value="neutral">
  <wa-radio-button value="angry">
    <wa-icon name="emoji-angry" label="Angry"></wa-icon>
  </wa-radio-button>

  <wa-radio-button value="sad">
    <wa-icon name="emoji-frown" label="Sad"></wa-icon>
  </wa-radio-button>

  <wa-radio-button value="neutral">
    <wa-icon name="emoji-neutral" label="Neutral"></wa-icon>
  </wa-radio-button>

  <wa-radio-button value="happy">
    <wa-icon name="emoji-smile" label="Happy"></wa-icon>
  </wa-radio-button>

  <wa-radio-button value="laughing">
    <wa-icon name="emoji-laughing" label="Laughing"></wa-icon>
  </wa-radio-button>
</wa-radio-group>
```

```jsx:react
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';
import WaRadioButton from '@shoelace-style/shoelace/dist/react/radio-button';
import WaRadioGroup from '@shoelace-style/shoelace/dist/react/radio-group';

const App = () => (
  <WaRadioGroup label="Select an option" name="a" value="neutral">
    <WaRadioButton value="angry">
      <WaIcon name="emoji-angry" label="Angry" />
    </WaRadioButton>

    <WaRadioButton value="sad">
      <WaIcon name="emoji-frown" label="Sad" />
    </WaRadioButton>

    <WaRadioButton value="neutral">
      <WaIcon name="emoji-neutral" label="Neutral" />
    </WaRadioButton>

    <WaRadioButton value="happy">
      <WaIcon name="emoji-smile" label="Happy" />
    </WaRadioButton>

    <WaRadioButton value="laughing">
      <WaIcon name="emoji-laughing" label="Laughing" />
    </WaRadioButton>
  </WaRadioGroup>
);
```
