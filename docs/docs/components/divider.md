---
title: Divider
description: Dividers are used to visually separate or group elements.
tags: component
---

```html {.example}
<wa-divider></wa-divider>
```

## Examples

### Width

Use the `--width` custom property to change the width of the divider.

```html {.example}
<wa-divider style="--width: 4px;"></wa-divider>
```

### Color

Use the `--color` custom property to change the color of the divider.

```html {.example}
<wa-divider style="--color: tomato;"></wa-divider>
```

### Spacing

Use the `--spacing` custom property to change the amount of space between the divider and it's neighboring elements.

```html {.example}
<div style="text-align: center;">
  Above
  <wa-divider style="--spacing: 2rem;"></wa-divider>
  Below
</div>
```

### Vertical

Add the `vertical` attribute to draw the divider in a vertical orientation. The divider will span the full height of its container. Vertical dividers work especially well inside of a flex container.

```html {.example}
<div style="display: flex; align-items: center; height: 2rem;">
  First
  <wa-divider vertical></wa-divider>
  Middle
  <wa-divider vertical></wa-divider>
  Last
</div>
```

### Menu Dividers

Use dividers in [menus](/docs/components/menu) to visually group menu items.

```html {.example}
<wa-menu style="max-width: 200px;">
  <wa-menu-item value="1">Option 1</wa-menu-item>
  <wa-menu-item value="2">Option 2</wa-menu-item>
  <wa-menu-item value="3">Option 3</wa-menu-item>
  <wa-divider></wa-divider>
  <wa-menu-item value="4">Option 4</wa-menu-item>
  <wa-menu-item value="5">Option 5</wa-menu-item>
  <wa-menu-item value="6">Option 6</wa-menu-item>
</wa-menu>
```
