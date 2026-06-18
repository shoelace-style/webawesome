---
title: Checkbox Group
description: Checkbox groups give a set of related checkboxes or switches a shared label, hint, and grouping semantics.
layout: component
category: Forms
synonyms:
  - checkbox list
  - option group
  - multi-select
use-cases:
  - interest pickers
  - permission lists
  - filter panels
---

Checkboxes in a group remain independent form controls with their own `name`, `value`, and validation. The group exists to provide a shared label, hint, and accessible grouping.

```html {.example}
<wa-checkbox-group label="Interests">
  <wa-checkbox name="design">Design</wa-checkbox>
  <wa-checkbox name="development">Development</wa-checkbox>
  <wa-checkbox name="marketing">Marketing</wa-checkbox>
</wa-checkbox-group>
```

## Examples

### Labels

Use the `label` attribute to give the group an accessible label. For labels that contain HTML, use the `label` slot instead.

```html {.example}
<wa-checkbox-group label="Toppings">
  <wa-checkbox name="pepperoni">Pepperoni</wa-checkbox>
  <wa-checkbox name="mushrooms">Mushrooms</wa-checkbox>
  <wa-checkbox name="onions">Onions</wa-checkbox>
  <wa-checkbox name="peppers">Peppers</wa-checkbox>
  <wa-checkbox name="sausage">Sausage</wa-checkbox>
  <wa-checkbox name="extra-cheese">Extra cheese</wa-checkbox>
</wa-checkbox-group>
```

### Hint

Add a descriptive hint to a checkbox group with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html {.example}
<wa-checkbox-group label="Workdays" hint="Choose as many as you like.">
  <wa-checkbox name="monday">Monday</wa-checkbox>
  <wa-checkbox name="wednesday">Wednesday</wa-checkbox>
  <wa-checkbox name="friday">Friday</wa-checkbox>
</wa-checkbox-group>
```

### Orientation

Checkbox groups stack vertically by default. Set the `orientation` attribute to `horizontal` to lay them out in a row.

```html {.example}
<wa-checkbox-group label="Sizes" orientation="horizontal">
  <wa-checkbox name="small">Small</wa-checkbox>
  <wa-checkbox name="medium">Medium</wa-checkbox>
  <wa-checkbox name="large">Large</wa-checkbox>
</wa-checkbox-group>
```

### Sizes

The size of grouped checkboxes and switches is determined by the checkbox group's `size` attribute. Any `size` set on individual items will be overridden.

```html {.example}
<wa-checkbox-group id="checkbox-group-size" label="Options" hint="Use the select below to change the size." size="m">
  <wa-checkbox>Option 1</wa-checkbox>
  <wa-checkbox>Option 2</wa-checkbox>
  <wa-checkbox>Option 3</wa-checkbox>
</wa-checkbox-group>

<wa-select label="Size" value="m" style="max-width: 200px; margin-top: 2rem;">
  <wa-option value="xs">Extra small</wa-option>
  <wa-option value="s">Small</wa-option>
  <wa-option value="m">Medium</wa-option>
  <wa-option value="l">Large</wa-option>
  <wa-option value="xl">Extra large</wa-option>
</wa-select>

<script>
  const checkboxGroup = document.getElementById('checkbox-group-size');
  const sizeSelect = checkboxGroup.nextElementSibling;

  sizeSelect.addEventListener('change', () => (checkboxGroup.size = sizeSelect.value));
</script>
```

### Disabling

A checkbox group itself can't be disabled. Add the `disabled` attribute to individual checkboxes to disable them.

```html {.example}
<wa-checkbox-group label="Add-ons">
  <wa-checkbox name="insurance" disabled>Insurance</wa-checkbox>
  <wa-checkbox name="gift-wrap" disabled>Gift wrap</wa-checkbox>
  <wa-checkbox name="express-shipping">Express shipping</wa-checkbox>
  <wa-checkbox name="extended-warranty">Extended warranty</wa-checkbox>
</wa-checkbox-group>
```

### Switches

A checkbox group also works with [switches](/docs/components/switch).

```html {.example}
<wa-checkbox-group label="Notifications" hint="Pick at least one channel.">
  <wa-switch name="email">Email</wa-switch>
  <wa-switch name="sms">SMS</wa-switch>
  <wa-switch name="push">Push</wa-switch>
</wa-checkbox-group>
```

### Required

The `required` attribute adds a visual indicator to the group's label. Because each checkbox is an independent control, the checkbox group doesn't enforce the requirement. Set the `required` property on the checkbox or call its `setCustomValidity()` method to control validation.

```html {.example}
<form>
  <wa-checkbox-group label="Accept terms" required>
    <wa-checkbox name="terms" required>I agree to the terms and conditions</wa-checkbox>
  </wa-checkbox-group>
  <br />
  <wa-button type="submit" appearance="filled">Submit</wa-button>
</form>
```
