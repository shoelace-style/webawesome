---
title: Option
description: Options define the selectable items within various form controls such as select.
tags: component
parent: select
icon: option
---

```html {.example}
<wa-select label="Select one">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
```

## Examples

### Disabled

Use the `disabled` attribute to disable an option and prevent it from being selected.

```html {.example}
<wa-select label="Select one">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2" disabled>Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
```

### Start & End Decorations

Use the `start` and `end` slots to add presentational elements like `<wa-icon>` next to the option label.

```html {.example}
<wa-select label="Select one">
  <wa-option value="option-1">
    <wa-icon slot="start" name="envelope"></wa-icon>
    Email
    <wa-icon slot="end" name="circle-check"></wa-icon>
  </wa-option>

  <wa-option value="option-2">
    <wa-icon slot="start" name="phone"></wa-icon>
    Phone
    <wa-icon slot="end" name="circle-check"></wa-icon>
  </wa-option>

  <wa-option value="option-3">
    <wa-icon slot="start" name="comment"></wa-icon>
    Chat
    <wa-icon slot="end" name="circle-check"></wa-icon>
  </wa-option>
</wa-select>
```
