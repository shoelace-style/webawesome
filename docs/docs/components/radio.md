---
title: Radio
description: Radios allow the user to select a single option from a group.
tags: component
parent: radio-group
native: radio
icon: radio-group
---

Radios are designed to be used with [radio groups](/docs/components/radio-group).

```html {.example}
<wa-radio-group label="Select an option" name="a" value="1">
  <wa-radio value="1">Option 1</wa-radio><br>
  <wa-radio value="2">Option 2</wa-radio><br>
  <wa-radio value="3">Option 3</wa-radio>
</wa-radio-group>
```

:::info
This component works with standard `<form>` elements. Please refer to the section on [form controls](/docs/form-controls) to learn more about form submission and client-side validation.
:::

## Examples

### Initial Value

To set the initial value and checked state, use the `value` attribute on the containing radio group.

```html {.example}
<wa-radio-group label="Select an option" name="a" value="3">
  <wa-radio value="1">Option 1</wa-radio><br>
  <wa-radio value="2">Option 2</wa-radio><br>
  <wa-radio value="3">Option 3</wa-radio>
</wa-radio-group>
```

### Disabled

Use the `disabled` attribute to disable a radio.

```html {.example}
<wa-radio-group label="Select an option" name="a" value="1">
  <wa-radio value="1">Option 1</wa-radio><br>
  <wa-radio value="2" disabled>Option 2</wa-radio><br>
  <wa-radio value="3">Option 3</wa-radio>
</wa-radio-group>
```

### Sizes

Add the `size` attribute to the [Radio Group](/docs/components/radio-group) to change the radios' size.

```html {.example}
<wa-radio-group size="small" value="1">
  <wa-radio value="1">Small 1</wa-radio><br>
  <wa-radio value="2">Small 2</wa-radio><br>
  <wa-radio value="3">Small 3</wa-radio>
</wa-radio-group>

<br />

<wa-radio-group size="medium" value="1">
  <wa-radio value="1">Medium 1</wa-radio><br>
  <wa-radio value="2">Medium 2</wa-radio><br>
  <wa-radio value="3">Medium 3</wa-radio>
</wa-radio-group>

<br />

<wa-radio-group size="large" value="1">
  <wa-radio value="1">Large 1</wa-radio><br>
  <wa-radio value="2">Large 2</wa-radio><br>
  <wa-radio value="3">Large 3</wa-radio>
</wa-radio-group>
```
