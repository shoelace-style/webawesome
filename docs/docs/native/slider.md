---
title: Slider
description: Sliders allow the user to select a single value within a given range using a slider.
tags: forms
layout: element
icon: slider
component: slider
elements:
  "<input type=range>": https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
file: styles/native/slider.css
---

```html {.example}
<label>Select a value: <input type="range"></label>
```

### Min, Max, and Step

Use the `min` and `max` attributes to set the range's minimum and maximum values, respectively. The `step` attribute determines the value's interval when increasing and decreasing.

```html {.example}
<input type="range" min="0" max="10" step="1">
```

### Disabled

Use the `disabled` attribute to disable a slider.

```html {.example}
<input type="range" disabled>
```

<!--
### Custom Track Colors

You can customize the active and inactive portions of the track using the `--track-color-active` and `--track-color-inactive` custom properties.

```html {.example}
<input type="range"
  style="
  --track-color-active: var(--wa-color-brand-fill-loud);
  --track-color-inactive: var(--wa-color-brand-fill-normal);
"
>
```

### Right-to-Left languages

The styles adapt to right-to-left (RTL) languages as you would expect.

```html {.example}
<input type="range" dir=rtl>
```
-->
