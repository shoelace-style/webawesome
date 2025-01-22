---
title: Select
description: Selects allow you to choose items from a menu of predefined options.
tags: forms
icon: select
component: select
elements:
  "<select>": https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
---

```html {.example}
<label>Select
  <select id="select">
    <option value="option-1">Option 1</option>
    <option value="option-2">Option 2</option>
    <option value="option-3">Option 3</option>
  </select>
</label>
```

## Examples

### Appearance

Use the [appearance utilities](/docs/utilities/appearance/) to change the select's visual appearance.

```html {.example}
<label>Select
  <select id="select" class="wa-filled">
    <option value="option-1">Option 1</option>
    <option value="option-2">Option 2</option>
    <option value="option-3">Option 3</option>
  </select>
</label>
```

### Grouping options

In [modern browsers](https://caniuse.com/mdn-html_elements_select_hr_in_select), you can use the `<hr>` element as a divider:

```html {.example}
<select>
  <small>Section 1</small>
  <option value="option-1">Option 1</option>
  <option value="option-2">Option 2</option>
  <option value="option-3">Option 3</option>
  <hr />
  <small>Section 2</small>
  <option value="option-4">Option 4</option>
  <option value="option-5">Option 5</option>
  <option value="option-6">Option 6</option>
</select>
```

To provide labels, you can use the `<optgroup>` element (with or without dividers):

```html {.example}
<select>
  <optgroup label="Section 1">
  <option value="option-1">Option 1</option>
  <option value="option-2">Option 2</option>
  <option value="option-3">Option 3</option>
  </optgroup>
  <optgroup label="Section 2">
  <option value="option-4">Option 4</option>
  <option value="option-5">Option 5</option>
  <hr />
  <option value="option-6">Option 6</option>
  </optgroup>
</select>
```
