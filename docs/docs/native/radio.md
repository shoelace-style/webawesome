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

<style>
	label {
		display: inline-block;
	}

	label + label {
		margin-inline-start: var(--wa-space);
	}
</style>

```html {.example}
<label><input type="radio" name="radio" value="1"> Option 1</label>
<label><input type="radio" name="radio" value="2"> Option 2</label>
```

## Examples

### Initial Value

To set the initial value and checked state, use the `checked` attribute on the corresponding radio.

```html {.example}
<label><input type="radio" name="radio" value="1"> Option 1</label>
<label><input type="radio" name="radio" value="2"> Option 2</label>
<label><input type="radio" name="radio" value="3" checked> Option 3</label>
```

### Disabled

Use the `disabled` attribute to disable a radio.

```html {.example}
<label><input type="radio" name="radio" value="1"> Option 1</label>
<label><input type="radio" name="radio" value="2" disabled> Option 2</label>
<label><input type="radio" name="radio" value="3"> Option 3</label>
```

### Sizes

Use the [size utilities](/docs/utilities/size) to change the radios' size.

```html {.example}
<fieldset class="wa-size-s">
	 <legend>Small</legend>
	<label><input type="radio" name="radio" value="1"> Option 1</label>
	<label><input type="radio" name="radio" value="2"> Option 2</label>
	<label><input type="radio" name="radio" value="3"> Option 3</label>
</fieldset>

<br />
<fieldset class="wa-size-m">
	 <legend>Medium</legend>
	<label><input type="radio" name="radio" value="1"> Option 1</label>
	<label><input type="radio" name="radio" value="2"> Option 2</label>
	<label><input type="radio" name="radio" value="3"> Option 3</label>
</fieldset>

<br />

<fieldset class="wa-size-l">
	 <legend>Large</legend>
	<label><input type="radio" name="radio" value="1"> Option 1</label>
	<label><input type="radio" name="radio" value="2"> Option 2</label>
	<label><input type="radio" name="radio" value="3"> Option 3</label>
</fieldset>
```
