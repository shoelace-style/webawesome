---
title: Split Panel
description: Split panels display two adjacent panels, allowing the user to reposition them.
layout: component
category: Organization
---

```html {.example}
<wa-split-panel>
  <div
    slot="start"
    style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
  >
    Start
  </div>
  <div
    slot="end"
    style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
  >
    End
  </div>
</wa-split-panel>
```

## Examples

### Initial Position

To set the initial position, use the `position` attribute. If no position is provided, it will default to 50% of the available space.

```html {.example}
<wa-split-panel position="75">
  <div
    slot="start"
    style="
      height: 200px;
      background: var(--wa-color-surface-lowered);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    "
  >
    Start
  </div>
  <div
    slot="end"
    style="
      height: 200px;
      background: var(--wa-color-surface-lowered);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    "
  >
    End
  </div>
</wa-split-panel>
```

### Initial Position in Pixels

To set the initial position in pixels instead of a percentage, use the `position-in-pixels` attribute.

```html {.example}
<wa-split-panel position-in-pixels="150">
  <div
    slot="start"
    style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
  >
    Start
  </div>
  <div
    slot="end"
    style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
  >
    End
  </div>
</wa-split-panel>
```

### Orientation

Set the `orientation` attribute to `vertical` and provide a height to render the split panel in a vertical orientation where the start and end panels are stacked.

```html {.example}
<wa-split-panel orientation="vertical" style="height: 400px;">
  <div
    slot="start"
    style="height: 100%; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
  >
    Start
  </div>
  <div
    slot="end"
    style="height: 100%; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
  >
    End
  </div>
</wa-split-panel>
```

### Snapping

To snap panels at specific positions while dragging, add the `snap` attribute with one or more space-separated values. Values must be in pixels or percentages. For example, to snap the panel at `100px` and `50%`, use `snap="100px 50%"`. You can also customize how close the divider must be before snapping with the `snap-threshold` attribute.

```html {.example}
<div class="split-panel-snapping">
  <wa-split-panel snap="100px 50%">
    <div
      slot="start"
      style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
    >
      Start
    </div>
    <div
      slot="end"
      style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
    >
      End
    </div>
  </wa-split-panel>

  <div class="split-panel-snapping-dots"></div>
</div>

<style>
  .split-panel-snapping {
    position: relative;
  }

  .split-panel-snapping-dots::before,
  .split-panel-snapping-dots::after {
    content: '';
    position: absolute;
    bottom: -12px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--wa-color-neutral-fill-loud);
    transform: translateX(-3px);
  }

  .split-panel-snapping-dots::before {
    left: 100px;
  }

  .split-panel-snapping-dots::after {
    left: 50%;
  }
</style>
```

### Disabled

Add the `disabled` attribute to prevent the divider from being repositioned.

```html {.example}
<wa-split-panel disabled>
  <div
    slot="start"
    style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
  >
    Start
  </div>
  <div
    slot="end"
    style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
  >
    End
  </div>
</wa-split-panel>
```

### Setting the Primary Panel

By default, both panels will grow or shrink proportionally when the host element is resized. If a primary panel is designated, it will maintain its size and the secondary panel will grow or shrink to fit the remaining space. You can set the primary panel to `start` or `end` using the `primary` attribute.

Try resizing the example below with each option and notice how the panels respond.

```html {.example}
<div class="split-panel-primary">
  <wa-split-panel>
    <div
      slot="start"
      style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
    >
      Start
    </div>
    <div
      slot="end"
      style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
    >
      End
    </div>
  </wa-split-panel>

  <wa-select label="Primary Panel" value="" style="max-width: 200px; margin-top: 1rem;">
    <wa-option value="">None</wa-option>
    <wa-option value="start">Start</wa-option>
    <wa-option value="end">End</wa-option>
  </wa-select>
</div>

<script>
  const container = document.querySelector('.split-panel-primary');
  const splitPanel = container.querySelector('wa-split-panel');
  const select = container.querySelector('wa-select');

  select.addEventListener('change', () => (splitPanel.primary = select.value));
</script>
```

### Min & Max

To set a minimum or maximum size of the primary panel, use the `--min` and `--max` custom properties. Since the secondary panel is flexible, size constraints can only be applied to the primary panel. If no primary panel is designated, these constraints will be applied to the `start` panel.

This examples demonstrates how you can ensure both panels are at least 150px using `--min`, `--max`, and the `calc()` function.

```html {.example}
<wa-split-panel style="--min: 150px; --max: calc(100% - 150px);">
  <div
    slot="start"
    style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
  >
    Start
  </div>
  <div
    slot="end"
    style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
  >
    End
  </div>
</wa-split-panel>
```

### Nested Split Panels

Create complex layouts that can be repositioned independently by nesting split panels.

```html {.example}
<wa-split-panel>
  <div
    slot="start"
    style="height: 400px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden"
  >
    Start
  </div>
  <div slot="end">
    <wa-split-panel orientation="vertical" style="height: 400px;">
      <div
        slot="start"
        style="height: 100%; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden"
      >
        Top
      </div>
      <div
        slot="end"
        style="height: 100%; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden"
      >
        Bottom
      </div>
    </wa-split-panel>
  </div>
</wa-split-panel>
```

### Customizing the Divider

You can target the `divider` part to apply CSS properties to the divider. To add a custom handle, slot an icon into the `divider` slot. When customizing the divider, make sure to think about focus styles for keyboard users.

```html {.example}
<wa-split-panel style="--divider-width: 20px;">
  <wa-icon slot="divider" name="grip-vertical" variant="solid"></wa-icon>
  <div
    slot="start"
    style="
      height: 200px;
      background: var(--wa-color-surface-lowered);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    "
  >
    Start
  </div>
  <div
    slot="end"
    style="
      height: 200px;
      background: var(--wa-color-surface-lowered);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    "
  >
    End
  </div>
</wa-split-panel>
```

Here's a more elaborate example that changes the divider's color and width and adds a styled handle.

```html {.example}
<div class="split-panel-divider">
  <wa-split-panel>
    <wa-icon slot="divider" name="grip-vertical" variant="solid"></wa-icon>
    <div
      slot="start"
      style="
        height: 200px;
        background: var(--wa-color-surface-lowered);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      "
    >
      Start
    </div>
    <div
      slot="end"
      style="
        height: 200px;
        background: var(--wa-color-surface-lowered);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      "
    >
      End
    </div>
  </wa-split-panel>
</div>

<style>
  .split-panel-divider wa-split-panel {
    --divider-width: 4px;
  }

  .split-panel-divider wa-split-panel::part(divider) {
    background-color: var(--wa-color-red-50);
  }

  .split-panel-divider wa-icon {
    position: absolute;
    border-radius: var(--wa-border-radius-l);
    background: var(--wa-color-red-50);
    color: white;
    padding: 0.5rem 0.25rem;
  }

  .split-panel-divider wa-split-panel::part(divider):focus-visible {
    background-color: var(--wa-color-blue-50);
  }

  .split-panel-divider wa-split-panel:focus-within wa-icon {
    background-color: var(--wa-color-blue-50);
    color: white;
  }
</style>
```
