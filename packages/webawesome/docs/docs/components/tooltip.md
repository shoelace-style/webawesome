---
title: Tooltip
description: Tooltips display additional information based on a specific action.
layout: component
category: Feedback & Status
---

A tooltip's target is based on the `for` attribute which points to an element id.

```html {.example}
<wa-tooltip for="my-button">This is a tooltip</wa-tooltip> <wa-button id="my-button">Hover Me</wa-button>
```

## Examples

### Placement

Use the `placement` attribute to set the preferred placement of the tooltip.

```html {.example}
<div class="tooltip-placement-example">
  <div class="tooltip-placement-example-row">
    <wa-button id="tooltip-top-start"></wa-button>
    <wa-button id="tooltip-top"></wa-button>
    <wa-button id="tooltip-top-end"></wa-button>
  </div>

  <div class="tooltip-placement-example-row">
    <wa-button id="tooltip-left-start"></wa-button>
    <wa-button id="tooltip-right-start"></wa-button>
  </div>

  <div class="tooltip-placement-example-row">
    <wa-button id="tooltip-left"></wa-button>
    <wa-button id="tooltip-right"></wa-button>
  </div>

  <div class="tooltip-placement-example-row">
    <wa-button id="tooltip-left-end"></wa-button>
    <wa-button id="tooltip-right-end"></wa-button>
  </div>

  <div class="tooltip-placement-example-row">
    <wa-button id="tooltip-bottom-start"></wa-button>
    <wa-button id="tooltip-bottom"></wa-button>
    <wa-button id="tooltip-bottom-end"></wa-button>
  </div>
</div>

<wa-tooltip for="tooltip-top-start" placement="top-start">top-start</wa-tooltip>
<wa-tooltip for="tooltip-top" placement="top">top</wa-tooltip>
<wa-tooltip for="tooltip-top-end" placement="top-end">top-end</wa-tooltip>
<wa-tooltip for="tooltip-left-start" placement="left-start">left-start</wa-tooltip>
<wa-tooltip for="tooltip-right-start" placement="right-start">right-start</wa-tooltip>
<wa-tooltip for="tooltip-left" placement="left">left</wa-tooltip>
<wa-tooltip for="tooltip-right" placement="right">right</wa-tooltip>
<wa-tooltip for="tooltip-left-end" placement="left-end">left-end</wa-tooltip>
<wa-tooltip for="tooltip-right-end" placement="right-end">right-end</wa-tooltip>
<wa-tooltip for="tooltip-bottom-start" placement="bottom-start">bottom-start</wa-tooltip>
<wa-tooltip for="tooltip-bottom" placement="bottom">bottom</wa-tooltip>
<wa-tooltip for="tooltip-bottom-end" placement="bottom-end">bottom-end</wa-tooltip>

<style>
  .tooltip-placement-example {
    width: 250px;
    margin: 1rem;
  }

  .tooltip-placement-example wa-button {
    width: 2.5rem;
  }

  .tooltip-placement-example-row {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .tooltip-placement-example-row:nth-child(1),
  .tooltip-placement-example-row:nth-child(5) {
    justify-content: center;
  }
</style>
```

### Click Trigger

Set the `trigger` attribute to `click` to toggle the tooltip on click instead of hover.

```html {.example}
<wa-button id="toggle-button">Click to Toggle</wa-button>
<wa-tooltip for="toggle-button" trigger="click">Click again to dismiss</wa-tooltip>
```

### Manual Trigger

Tooltips can be controller programmatically by setting the `trigger` attribute to `manual`. Use the `open` attribute to control when the tooltip is shown.

```html {.example}
<wa-button style="margin-right: 4rem;">Toggle Manually</wa-button>

<wa-tooltip for="manual-trigger-tooltip" trigger="manual" class="manual-tooltip">This is an avatar!</wa-tooltip>
<wa-avatar id="manual-trigger-tooltip" label="User"></wa-avatar>

<script>
  const tooltip = document.querySelector('.manual-tooltip');
  const toggle = tooltip.previousElementSibling;

  toggle.addEventListener('click', () => (tooltip.open = !tooltip.open));
</script>
```

### Removing Arrows

You can control the size of tooltip arrows by overriding the `--wa-tooltip-arrow-size` design token. To remove the arrow, use the `without-arrow` attribute.

```html {.example}
<wa-button id="no-arrow">No Arrow</wa-button>
<wa-tooltip for="no-arrow" without-arrow>This is a tooltip with no arrow</wa-tooltip>
```

To override it globally, set it in a root block in your stylesheet after the Web Awesome stylesheet is loaded.

```css
:root {
  --wa-tooltip-arrow-size: 0;
}
```

### HTML in Tooltips

Use the default slot to create tooltips with HTML content. Tooltips are designed only for text and presentational elements. Avoid placing interactive content, such as buttons, links, and form controls, in a tooltip.

```html {.example}
<wa-button id="rich-tooltip">Hover me</wa-button>
<wa-tooltip for="rich-tooltip">
  <div>I'm not <strong>just</strong> a tooltip, I'm a <em>tooltip</em> with HTML!</div>
</wa-tooltip>
```

### Setting a Maximum Width

Use the `--max-width` custom property to change the width the tooltip can grow to before wrapping occurs.

```html {.example}
<wa-tooltip for="wrapping-tooltip" style="--max-width: 80px;">
  This tooltip will wrap after only 80 pixels.
</wa-tooltip>
<wa-button id="wrapping-tooltip">Hover me</wa-button>
```
