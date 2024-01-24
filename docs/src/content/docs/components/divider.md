---
title: Divider
description: Dividers are used to visually separate or group elements.
layout: ../../../layouts/ComponentLayout.astro
---

```html:preview
<wa-divider></wa-divider>
```

```jsx:react
import WaDivider from '@shoelace-style/shoelace/dist/react/divider';

const App = () => <WaDivider />;
```

## Examples

### Width

Use the `--width` custom property to change the width of the divider.

```html:preview
<wa-divider style="--width: 4px;"></wa-divider>
```

```jsx:react
import WaDivider from '@shoelace-style/shoelace/dist/react/divider';

const App = () => <WaDivider style={{ '--width': '4px' }} />;
```

### Color

Use the `--color` custom property to change the color of the divider.

```html:preview
<wa-divider style="--color: tomato;"></wa-divider>
```

```jsx:react
import WaDivider from '@shoelace-style/shoelace/dist/react/divider';

const App = () => <WaDivider style={{ '--color': 'tomato' }} />;
```

### Spacing

Use the `--spacing` custom property to change the amount of space between the divider and it's neighboring elements.

```html:preview
<div style="text-align: center;">
  Above
  <wa-divider style="--spacing: 2rem;"></wa-divider>
  Below
</div>
```

### Vertical

Add the `vertical` attribute to draw the divider in a vertical orientation. The divider will span the full height of its container. Vertical dividers work especially well inside of a flex container.

```html:preview
<div style="display: flex; align-items: center; height: 2rem;">
  First
  <wa-divider vertical></wa-divider>
  Middle
  <wa-divider vertical></wa-divider>
  Last
</div>
```

```jsx:react
import WaDivider from '@shoelace-style/shoelace/dist/react/divider';

const App = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      height: '2rem'
    }}
  >
    First
    <WaDivider vertical />
    Middle
    <WaDivider vertical />
    Last
  </div>
);
```

### Menu Dividers

Use dividers in [menus](/components/menu) to visually group menu items.

```html:preview
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

```jsx:react
import WaDivider from '@shoelace-style/shoelace/dist/react/divider';
import WaMenu from '@shoelace-style/shoelace/dist/react/menu';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => (
  <WaMenu style={{ maxWidth: '200px' }}>
    <WaMenuItem value="1">Option 1</WaMenuItem>
    <WaMenuItem value="2">Option 2</WaMenuItem>
    <WaMenuItem value="3">Option 3</WaMenuItem>
    <wa-divider />
    <WaMenuItem value="4">Option 4</WaMenuItem>
    <WaMenuItem value="5">Option 5</WaMenuItem>
    <WaMenuItem value="6">Option 6</WaMenuItem>
  </WaMenu>
);
```
