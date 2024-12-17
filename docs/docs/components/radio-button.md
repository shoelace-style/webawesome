---
title: Radio Button
description: Radios buttons allow the user to select a single option from a group using a button-like control.
tags: component
parent: radio-group
---

Radio buttons are designed to be used with [radio groups](/docs/components/radio-group). When a radio button has focus, the arrow keys can be used to change the selected option just like standard radio controls.

```html {.example}
<wa-radio-group label="Select an option" name="a" value="1">
  <wa-radio-button value="1">Option 1</wa-radio-button>
  <wa-radio-button value="2">Option 2</wa-radio-button>
  <wa-radio-button value="3">Option 3</wa-radio-button>
</wa-radio-group>
```

## Examples

### Checked States

To set the initial value and checked state, use the `value` attribute on the containing radio group.

```html {.example}
<wa-radio-group label="Select an option" name="a" value="1">
  <wa-radio-button value="1">Option 1</wa-radio-button>
  <wa-radio-button value="2">Option 2</wa-radio-button>
  <wa-radio-button value="3">Option 3</wa-radio-button>
</wa-radio-group>
```

### Disabled

Use the `disabled` attribute to disable a radio button.

```html {.example}
<wa-radio-group label="Select an option" name="a" value="1">
  <wa-radio-button value="1">Option 1</wa-radio-button>
  <wa-radio-button value="2" disabled>Option 2</wa-radio-button>
  <wa-radio-button value="3">Option 3</wa-radio-button>
</wa-radio-group>
```

### Sizes

Use the `size` attribute to change a radio button's size.

```html {.example}
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

### Pill Buttons

Use the `pill` attribute to give radio buttons rounded edges.

```html {.example}
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

### Prefix and Suffix Icons

Use the `prefix` and `suffix` slots to add icons.

```html {.example}
<wa-radio-group label="Select an option" name="a" value="1">
  <wa-radio-button value="1">
    <wa-icon slot="prefix" name="archive" variant="solid"></wa-icon>
    Option 1
  </wa-radio-button>

  <wa-radio-button value="2">
    <wa-icon slot="suffix" name="bag-shopping" variant="solid"></wa-icon>
    Option 2
  </wa-radio-button>

  <wa-radio-button value="3">
    <wa-icon slot="prefix" name="gift" variant="solid"></wa-icon>
    <wa-icon slot="suffix" name="shopping-cart" variant="solid"></wa-icon>
    Option 3
  </wa-radio-button>
</wa-radio-group>
```

### Buttons with Icons

You can omit button labels and use icons instead. Make sure to set a `label` attribute on each icon so screen readers will announce each option correctly.

```html {.example}
<wa-radio-group label="Select an option" name="a" value="neutral">
  <wa-radio-button value="angry">
    <wa-icon name="face-angry" variant="solid" label="Angry"></wa-icon>
  </wa-radio-button>

  <wa-radio-button value="sad">
    <wa-icon name="face-frown" variant="solid" label="Sad"></wa-icon>
  </wa-radio-button>

  <wa-radio-button value="neutral">
    <wa-icon name="face-meh" variant="solid" label="Neutral"></wa-icon>
  </wa-radio-button>

  <wa-radio-button value="happy">
    <wa-icon name="face-smile" variant="solid" label="Happy"></wa-icon>
  </wa-radio-button>

  <wa-radio-button value="laughing">
    <wa-icon name="face-laugh" variant="solid" label="Laughing"></wa-icon>
  </wa-radio-button>
</wa-radio-group>
```
