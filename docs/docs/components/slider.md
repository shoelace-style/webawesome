---
title: Slider
description: Ranges allow the user to select a single value within a given range using a slider.
tags: [inputs, forms]
native: slider
icon: slider
---

```html {.example}
<wa-slider></wa-slider>
```

:::info
This component works with standard `<form>` elements. Please refer to the section on [form controls](/docs/form-controls) to learn more about form submission and client-side validation.
:::

## Examples

### Labels

Use the `label` attribute to give the range an accessible label. For labels that contain HTML, use the `label` slot instead.

```html {.example}
<wa-slider label="Volume" min="0" max="100"></wa-slider>
```

### Hint

Add descriptive hint to a range with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html {.example}
<wa-slider label="Volume" hint="Controls the volume of the current song." min="0" max="100"></wa-slider>
```

### Min, Max, and Step

Use the `min` and `max` attributes to set the range's minimum and maximum values, respectively. The `step` attribute determines the value's interval when increasing and decreasing.

```html {.example}
<wa-slider min="0" max="10" step="1"></wa-slider>
```

### Disabled

Use the `disabled` attribute to disable a slider.

```html {.example}
<wa-slider disabled></wa-slider>
```

### Tooltip Placement

By default, the tooltip is shown on top. Set `tooltip` to `bottom` to show it below the slider.

```html {.example}
<wa-slider tooltip="bottom"></wa-slider>
```

### Disable the Tooltip

To disable the tooltip, set `tooltip` to `none`.

```html {.example}
<wa-slider tooltip="none"></wa-slider>
```

### Custom Track Colors

You can customize the active and inactive portions of the track using the `--track-color-active` and `--track-color-inactive` custom properties.

```html {.example}
<wa-slider
  style="
  --track-color-active: var(--wa-color-brand-fill-loud);
  --track-color-inactive: var(--wa-color-brand-fill-normal);
"
></wa-slider>
```

### Custom Track Offset

You can customize the initial offset of the active track using the `--track-active-offset` custom property.

```html {.example}
<wa-slider
  min="-100"
  max="100"
  style="
  --track-color-active: var(--wa-color-brand-fill-loud);
  --track-color-inactive: var(--wa-color-brand-fill-normal);
  --track-active-offset: 50%;
"
></wa-slider>
```

### Custom Tooltip Formatter

You can change the tooltip's content by setting the `tooltipFormatter` property to a function that accepts the range's value as an argument.

```html {.example}
<wa-slider min="0" max="100" step="1" class="range-with-custom-formatter"></wa-slider>

<script>
  const range = document.querySelector('.range-with-custom-formatter');
  range.tooltipFormatter = value => `Total - ${value}%`;
</script>
```

### Right-to-Left languages

The component adapts to right-to-left (RTL) languages as you would expect.

```html {.example}
<wa-slider dir="rtl"
  label="مقدار"
  hint="التحكم في مستوى صوت الأغنية الحالية."
  style="--track-color-active: var(--wa-color-brand-fill-loud)" value="10"></wa-slider>
```
