---
title: Color Picker
layout: component
category: Forms
synonyms:
  - color chooser
  - color selector
  - colour picker
  - eyedropper
use-cases:
  - color input
  - hex picker
  - rgb picker
  - hsl picker
---

```html {.example}
<wa-color-picker label="Select a color"></wa-color-picker>
```

:::info
This component works with standard `<form>` elements. See [form controls](/docs/form-controls) for form submission and client-side validation.
:::

## Examples

### Labels

Use the `label` attribute to give the color picker an accessible label. For labels that contain HTML, use the `label` slot instead.

```html {.example}
<wa-color-picker label="Brand color"></wa-color-picker>
```

### Hint

Add a descriptive hint with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html {.example}
<wa-color-picker label="Accent" hint="Pick something with enough contrast to read against white."></wa-color-picker>
```

### Setting an Initial Value

Use the `value` attribute to set a starting color. The value's format follows the `format` attribute, but any parsable color (including CSS color names) is accepted as input.

```html {.example}
<wa-color-picker value="#4a90e2" label="Select a color"></wa-color-picker>
```

### Formats

Set the color picker's format with the `format` attribute. Valid options are `hex`, `rgb`, `hsl`, and `hsv`. The input still accepts any parsable format regardless of this setting.

To stop people from cycling through formats themselves, add the `without-format-toggle` attribute.

```html {.example}
<div class="wa-grid" style="--min-column-size: 12ch;">
  <wa-color-picker format="hex" value="#4a90e2" label="Pick a hex color"></wa-color-picker>
  <wa-color-picker format="rgb" value="rgb(80, 227, 194)" label="Pick an RGB color"></wa-color-picker>
  <wa-color-picker format="hsl" value="hsl(290, 87%, 47%)" label="Pick an HSL color"></wa-color-picker>
  <wa-color-picker format="hsv" value="hsv(55, 89%, 97%)" label="Pick an HSV color"></wa-color-picker>
</div>
```

### Opacity

Use the `opacity` attribute to add an opacity slider. With opacity enabled, the value is shown as HEXA, RGBA, HSLA, or HSVA to match the `format`.

```html {.example}
<wa-color-picker value="#f5a623ff" opacity label="Select a color"></wa-color-picker>
```

### Uppercase Values

By default, values are lowercase. Add the `uppercase` attribute to display them in uppercase instead.

```html {.example}
<wa-color-picker value="#4a90e2" uppercase label="Select a color"></wa-color-picker>
```

### Swatches

Use the `swatches` attribute to offer preset colors. Any format the picker can parse works (including [CSS color names](https://www.w3schools.com/colors/colors_names.asp)), and each value must be separated by a semicolon (`;`).

```html {.example}
<wa-color-picker
  label="Select a color"
  swatches="
    #d0021b; #f5a623; #f8e71c; #8b572a; #7ed321; #417505; #bd10e0; #9013fe;
    #4a90e2; #50e3c2; #b8e986; #000; #444; #888; #ccc; #fff;
  "
></wa-color-picker>
```

:::info
To give swatches accessible names, set the `swatches` property in JavaScript to an array of `{ color, label }` objects — each `label` becomes that swatch's accessible name instead of the raw color value.
:::

### Placement

Set the `placement` attribute to control where the dropdown opens. The actual position may shift to keep the panel inside the viewport.

```html {.example}
<div class="wa-cluster wa-align-items-baseline">
  <wa-color-picker placement="top-start" label="Select a color"></wa-color-picker>
  <wa-color-picker placement="bottom-end" label="Select a color"></wa-color-picker>
  <wa-color-picker placement="right" label="Select a color"></wa-color-picker>
  <wa-color-picker placement="left" label="Select a color"></wa-color-picker>
</div>
```

### Sizes

Use the `size` attribute to change the color picker's trigger size.

```html {.example}
<div class="wa-cluster wa-align-items-baseline">
  <wa-color-picker size="xs" label="Extra small"></wa-color-picker>
  <wa-color-picker size="s" label="Small"></wa-color-picker>
  <wa-color-picker size="m" label="Medium"></wa-color-picker>
  <wa-color-picker size="l" label="Large"></wa-color-picker>
  <wa-color-picker size="xl" label="Extra large"></wa-color-picker>
</div>
```

### Disabled

Use the `disabled` attribute to disable a color picker.

```html {.example}
<wa-color-picker disabled label="Select a color"></wa-color-picker>
```

### Applying the Selected Color

The color picker emits an `input` event as the user picks, so you can apply the chosen color to your UI in real time. Here, changing the color themes a preview card.

```html {.example}
<div class="color-apply-demo">
  <div class="color-apply-preview">
    <wa-icon name="palette"></wa-icon>
    <div>
      <strong>Brand preview</strong>
      <p>Pick a color to theme this card in real time.</p>
    </div>
  </div>

  <wa-divider></wa-divider>

  <wa-color-picker label="Accent color" value="#6e40c9"></wa-color-picker>
</div>

<script>
  const demo = document.querySelector('.color-apply-demo');
  const picker = demo.querySelector('wa-color-picker');
  const preview = demo.querySelector('.color-apply-preview');

  picker.addEventListener('input', () => {
    preview.style.setProperty('--accent', picker.value);
  });
</script>

<style>
  .color-apply-demo .color-apply-preview {
    --accent: #6e40c9;
    display: flex;
    align-items: center;
    gap: var(--wa-space-m);
    margin-block-end: 1rem;
    padding: var(--wa-space-l);
    border-radius: var(--wa-border-radius-l);
    border-inline-start: 4px solid var(--accent);
    background-color: color-mix(in srgb, var(--accent) 12%, transparent);
  }

  .color-apply-demo .color-apply-preview wa-icon {
    color: var(--accent);
    font-size: 1.5rem;
  }

  .color-apply-demo .color-apply-preview strong {
    color: var(--accent);
  }

  .color-apply-demo .color-apply-preview p {
    margin: 0.25rem 0 0;
  }
</style>
```
