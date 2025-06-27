---
title: Color Picker
description: Color pickers allow the user to select a color.
layout: component
category: Form Controls
---

```html {.example}
<wa-color-picker label="Select a color"></wa-color-picker>
```

:::info
This component works with standard `<form>` elements. Please refer to the section on [form controls](/docs/form-controls) to learn more about form submission and client-side validation.
:::

## Examples

### Initial Value

Use the `value` attribute to set an initial value for the color picker.

```html {.example}
<wa-color-picker value="#4a90e2" label="Select a color"></wa-color-picker>
```

### Opacity

Use the `opacity` attribute to enable the opacity slider. When this is enabled, the value will be displayed as HEXA, RGBA, HSLA, or HSVA based on `format`.

```html {.example}
<wa-color-picker value="#f5a623ff" opacity label="Select a color"></wa-color-picker>
```

### Formats

Set the color picker's format with the `format` attribute. Valid options include `hex`, `rgb`, `hsl`, and `hsv`. Note that the color picker's input will accept any parsable format (including CSS color names) regardless of this option.

To prevent users from toggling the format themselves, add the `without-format-toggle` attribute.

```html {.example}
<div class="wa-grid" style="--min-column-size: 12ch;">
  <wa-color-picker format="hex" value="#4a90e2" label="Pick a hex color"></wa-color-picker>
  <wa-color-picker format="rgb" value="rgb(80, 227, 194)" label="Pick an RGB color"></wa-color-picker>
  <wa-color-picker format="hsl" value="hsl(290, 87%, 47%)" label="Pick an HSL color"></wa-color-picker>
  <wa-color-picker format="hsv" value="hsv(55, 89%, 97%)" label="Pick an HSV color"></wa-color-picker>
</div>
```

### Swatches

Use the `swatches` attribute to add convenient presets to the color picker. Any format the color picker can parse is acceptable (including [CSS color names](https://www.w3schools.com/colors/colors_names.asp)), but each value must be separated by a semicolon (`;`). Alternatively, you can pass an array of color values to this property using JavaScript.

```html {.example}
<wa-color-picker
  label="Select a color"
  swatches="
    #d0021b; #f5a623; #f8e71c; #8b572a; #7ed321; #417505; #bd10e0; #9013fe;
    #4a90e2; #50e3c2; #b8e986; #000; #444; #888; #ccc; #fff;
  "
></wa-color-picker>
```

### Sizes

Use the `size` attribute to change the color picker's trigger size.

```html {.example}
<div class="wa-gap-m wa-align-items-baseline">
  <wa-color-picker size="small" label="Select a color"></wa-color-picker>
  <wa-color-picker size="medium" label="Select a color"></wa-color-picker>
  <wa-color-picker size="large" label="Select a color"></wa-color-picker>
</div>
```

### Disabled

The color picker can be rendered as disabled.

```html {.example}
<wa-color-picker disabled label="Select a color"></wa-color-picker>
```

### Hint

Add descriptive hint to a color picker with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html {.example}
<wa-color-picker label="Select a color" hint="Choose a color with appropriate contrast!"></wa-color-picker>
```
