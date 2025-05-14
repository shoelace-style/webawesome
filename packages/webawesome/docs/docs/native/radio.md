---
title: Radio
description: Radios allow the user to select a single option from a group.
tags: forms
icon: radio-group
component: radio
elements:
  "<input type=radio>": https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio
file: styles/native/radio.css
---

```html {.example}
<div class="wa-cluster">
  <label><input type="radio" name="a" value="1" checked> Option 1</label>
  <label><input type="radio" name="a" value="2"> Option 2</label>
</div>
```

## Examples

### Initial Value

To set the initial value and checked state, use the `checked` attribute on the corresponding radio.

```html {.example}
<div class="wa-cluster">
  <label><input type="radio" name="b" value="1" checked> Option 1</label>
  <label><input type="radio" name="b" value="2"> Option 2</label>
  <label><input type="radio" name="b" value="3"> Option 3</label>
</div>
```

### Disabled

Use the `disabled` attribute to disable a radio.

```html {.example}
<div class="wa-cluster">
  <label><input type="radio" name="c" value="1" checked> Option 1</label>
  <label><input type="radio" name="c" value="2" disabled> Option 2</label>
  <label><input type="radio" name="c" value="3"> Option 3</label>
</div>
```

### Sizes

Use the [size utilities](/docs/utilities/size) to change the radios' size.

```html {.example}
<fieldset class="wa-size-s wa-cluster">
  <legend>Small</legend>
  <label><input type="radio" name="d" value="1" checked> Option 1</label>
  <label><input type="radio" name="d" value="2"> Option 2</label>
  <label><input type="radio" name="d" value="3"> Option 3</label>
</fieldset>

<br />
<fieldset class="wa-size-m wa-cluster">
  <legend>Medium</legend>
  <label><input type="radio" name="e" value="1" checked> Option 1</label>
  <label><input type="radio" name="e" value="2"> Option 2</label>
  <label><input type="radio" name="e" value="3"> Option 3</label>
</fieldset>

<br />

<fieldset class="wa-size-l wa-cluster">
	  <legend>Large</legend>
    <label><input type="radio" name="f" value="1" checked> Option 1</label>
    <label><input type="radio" name="f" value="2"> Option 2</label>
    <label><input type="radio" name="f" value="3"> Option 3</label>
</fieldset>
```

### Orientation

You can wrap native radios in a flex container to give them a horizontal or vertical orientation with even spacing. The convenience [`wa-cluster`](/docs/utilities/cluster) and [`wa-stack`](/docs/utilities/stack) utilities make this easy.

```html {.example}
<div class="wa-cluster">
  <label><input type="radio" name="g" value="1" checked> Option 1</label>
  <label><input type="radio" name="g" value="2"> Option 2</label>
  <label><input type="radio" name="g" value="3"> Option 3</label>
</div>
```

```html {.example}
<div class="wa-stack">
  <label><input type="radio" name="h" value="1" checked> Option 1</label>
  <label><input type="radio" name="h" value="2"> Option 2</label>
  <label><input type="radio" name="h" value="3"> Option 3</label>
</div>
```
