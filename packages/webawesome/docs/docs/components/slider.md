---
title: Slider
description: Ranges allow the user to select a single value within a given range using a slider.
layout: component
category: Form Controls
---

```html {.example}
<wa-slider
  label="Number of users"
  hint="Limit six per team"
  name="value"
  value="3"
  min="0"
  max="6"
  with-markers
  with-tooltip
>
  <span slot="reference">Less</span>
  <span slot="reference">More</span>
</wa-slider>
```

:::info
This component works with standard `<form>` elements. Please refer to the section on [form controls](/docs/form-controls) to learn more about form submission and client-side validation.
:::

## Examples

### Labels

Use the `label` attribute to give the slider an accessible label. For labels that contain HTML, use the `label` slot instead.

```html {.example}
<wa-slider label="Volume" min="0" max="100"></wa-slider>
```

### Hint

Add descriptive hint to a slider with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html {.example}
<wa-slider label="Volume" hint="Controls the volume of the current song." min="0" max="100" value="50"></wa-slider>
```

### Showing tooltips

Use the `with-tooltip` attribute to display a tooltip with the current value when the slider is focused or being dragged.

```html {.example}
<wa-slider label="Quality" name="quality" min="0" max="100" value="50" with-tooltip></wa-slider>
```

### Setting min, max, and step

Use the `min` and `max` attributes to define the slider's range, and the `step` attribute to control the increment between values.

```html {.example}
<wa-slider label="Between zero and one" min="0" max="1" step="0.1" value="0.5" with-tooltip></wa-slider>
```

### Showing markers

Use the `with-markers` attribute to display visual indicators at each step increment. This works best with sliders that have a smaller range of values.

```html {.example}
<wa-slider label="Size" name="size" min="0" max="8" value="4" with-markers></wa-slider>
```

### Adding references

Use the `reference` slot to add contextual labels below the slider. References are automatically spaced using `space-between`, making them easy to align with the start, center, and end positions.

```html {.example}
<wa-slider
  label="Speed"
  name="speed"
  min="1"
  max="5"
  value="3"
  with-markers
  hint="Controls the speed of the thing you're currently doing."
>
  <span slot="reference">Slow</span>
  <span slot="reference">Medium</span>
  <span slot="reference">Fast</span>
</wa-slider>
```

:::info
If you want to show a reference next to a specific marker, you can add `position: absolute` to it and set the `left`, `right`, `top`, or `bottom` property to a percentage that corresponds to the marker's position.
:::

### Formatting the value

Customize how values are displayed in tooltips and announced to screen readers using the `valueFormatter` property. Set it to a function that accepts a number and returns a formatted string. The [`Intl.NumberFormat API`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) is particularly useful for this.

```html {.example}
<!-- Percent -->
<wa-slider
  id="slider__percent"
  label="Percentage"
  name="percentage"
  value="0.5"
  min="0"
  max="1"
  step=".01"
  with-tooltip
></wa-slider
><br />

<script>
  const slider = document.getElementById('slider__percent');
  const formatter = new Intl.NumberFormat('en-US', { style: 'percent' });

  customElements.whenDefined('wa-slider').then(() => {
    slider.valueFormatter = value => formatter.format(value);
  });
</script>

<!-- Duration -->
<wa-slider id="slider__duration" label="Duration" name="duration" value="12" min="0" max="24" with-tooltip></wa-slider
><br />

<script>
  const slider = document.getElementById('slider__duration');
  const formatter = new Intl.NumberFormat('en-US', { style: 'unit', unit: 'hour', unitDisplay: 'long' });

  customElements.whenDefined('wa-slider').then(() => {
    slider.valueFormatter = value => formatter.format(value);
  });
</script>

<!-- Currency -->
<wa-slider id="slider__currency" label="Currency" name="currency" min="0" max="100" value="50" with-tooltip></wa-slider>

<script>
  const slider = document.getElementById('slider__currency');
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol',
    maximumFractionDigits: 0,
  });

  customElements.whenDefined('wa-slider').then(() => {
    slider.valueFormatter = value => formatter.format(value);
  });
</script>
```

### Range selection

Use the `range` attribute to enable dual-thumb selection for choosing a range of values. Set the initial thumb positions with the `min-value` and `max-value` attributes.

```html {.example}
<wa-slider
  label="Price Range"
  hint="Select minimum and maximum price"
  name="price"
  range
  min="0"
  max="100"
  min-value="20"
  max-value="80"
  with-tooltip
  id="slider__range"
>
  <span slot="reference">$0</span>
  <span slot="reference">$50</span>
  <span slot="reference">$100</span>
</wa-slider>

<script>
  const slider = document.getElementById('slider__range');
  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  customElements.whenDefined('wa-slider').then(() => {
    slider.valueFormatter = value => formatter.format(value);
  });
</script>
```

For range sliders, the `minValue` and `maxValue` properties represent the current positions of the thumbs. When the form is submitted, both values will be included as separate entries with the same name.

```ts
const slider = document.querySelector('wa-slider[range]');

// Get the current values
console.log(`Min value: ${slider.minValue}, Max value: ${slider.maxValue}`);

// Set the values programmatically
slider.minValue = 30;
slider.maxValue = 70;
```

### Vertical Sliders

Set the `orientation` attribute to `vertical` to create a vertical slider. Vertical sliders automatically center themselves and fill the available vertical space.

```html {.example}
<div style="display: flex; gap: 1rem;">
  <wa-slider orientation="vertical" label="Volume" name="volume" value="65" style="width: 80px"></wa-slider>

  <wa-slider orientation="vertical" label="Bass" name="bass" value="50" style="width: 80px"></wa-slider>

  <wa-slider orientation="vertical" label="Treble" name="treble" value="40" style="width: 80px"></wa-slider>
</div>
```

Range sliders can also be vertical.

```html {.example}
<div style="height: 300px; display: flex; align-items: center; gap: 2rem;">
  <wa-slider
    label="Temperature Range"
    orientation="vertical"
    range
    min="0"
    max="100"
    min-value="30"
    max-value="70"
    with-tooltip
    tooltip-placement="right"
    id="slider__vertical-range"
  >
  </wa-slider>
</div>

<script>
  const slider = document.getElementById('slider__vertical-range');
  slider.valueFormatter = value => {
    return new Intl.NumberFormat('en', {
      style: 'unit',
      unit: 'fahrenheit',
      unitDisplay: 'short',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(value);
  };
</script>
```

### Size

Control the slider's size using the `size` attribute. Valid options include `small`, `medium`, and `large`.

```html {.example}
<wa-slider size="small" value="50" label="Small"></wa-slider><br />
<wa-slider size="medium" value="50" label="Medium"></wa-slider><br />
<wa-slider size="large" value="50" label="Large"></wa-slider>
```

### Indicator Offset

By default, the filled indicator extends from the minimum value to the current position. Use the `indicator-offset` attribute to change the starting point of this visual indicator.

```html {.example}
<wa-slider
  label="User Friendliness"
  hint="Did you find our product easy to use?"
  name="value"
  value="0"
  min="-5"
  max="5"
  indicator-offset="0"
  with-markers
  with-tooltip
>
  <span slot="reference">Easy</span>
  <span slot="reference">Moderate</span>
  <span slot="reference">Difficult</span>
</wa-slider>
```

### Disabled

Use the `disabled` attribute to disable a slider.

```html {.example}
<wa-slider label="Disabled" value="50" disabled></wa-slider>
```

### Required

Mark a slider as required using the `required` attribute. Users must interact with required sliders before the form can be submitted.

```html {.example}
<form action="about:blank" target="_blank" method="get">
  <wa-slider name="slide" label="Required slider" min="0" max="10" required></wa-slider>
  <br />
  <button type="submit">Submit</button>
</form>
```
