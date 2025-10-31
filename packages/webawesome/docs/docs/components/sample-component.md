---
title: Sample Component
description: A simple slider component that displays the current value.
layout: component
category: Form Controls
---

```html {.example}
<wa-sample-component></wa-sample-component>
```

## Examples

### Setting min and max

Use the `min` and `max` attributes to define the component's range.

```html {.example}
<wa-sample-component min="0" max="150"></wa-sample-component>
```

### Starting value

Use the `value` attribute to set the initial value.

```html {.example}
<wa-sample-component value="75"></wa-sample-component>
```

### Updating the value programmatically

Set the component's `value` property to update it programmatically.

```html {.example}
<div class="wa-stack">
  <wa-sample-component id="sample__programmatic" min="0" max="100" value="25"></wa-sample-component>
  <div>
    <wa-button pill appearance="filled" id="sample__decrease">
      <wa-icon name="minus" label="Decrease"></wa-icon>
    </wa-button>
    <wa-button pill appearance="filled" id="sample__increase">
      <wa-icon name="plus" label="Increase"></wa-icon>
    </wa-button>
  </div>
</div>

<script>
  const el = document.getElementById('sample__programmatic');
  const dec = document.getElementById('sample__decrease');
  const inc = document.getElementById('sample__increase');

  dec.addEventListener('click', () => {
    el.value = Math.max(el.min, el.value - 5);
  });

  inc.addEventListener('click', () => {
    el.value = Math.min(el.max, el.value + 5);
  });
</script>
```

### Styling

Use [CSS parts](#css-parts) to style the component. This example adjusts spacing and typography via the `base` part.

```html {.example}
<wa-sample-component class="styled" value="40"></wa-sample-component>

<style>
  wa-sample-component.styled::part(base) {
    display: inline-flex;
    gap: var(--wa-space-s);
    align-items: center;
    font: var(--wa-font-text-2);
  }
</style>
```
