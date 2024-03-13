---
title: Menu
description: Menus provide a list of options for the user to choose from.
layout: ../../../layouts/ComponentLayout.astro
---

You can use [menu items](/components/menu-item), [menu labels](/components/menu-label), and [dividers](/components/divider) to compose a menu. Menus support keyboard interactions, including type-to-select an option.

```html:preview
<wa-menu style="max-width: 200px;">
  <wa-menu-item value="undo">Undo</wa-menu-item>
  <wa-menu-item value="redo">Redo</wa-menu-item>
  <wa-divider></wa-divider>
  <wa-menu-item value="cut">Cut</wa-menu-item>
  <wa-menu-item value="copy">Copy</wa-menu-item>
  <wa-menu-item value="paste">Paste</wa-menu-item>
  <wa-menu-item value="delete">Delete</wa-menu-item>
</wa-menu>
```

```jsx:react
import WaDivider from '@shoelace-style/shoelace/dist/react/divider';
import WaMenu from '@shoelace-style/shoelace/dist/react/menu';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => (
  <WaMenu style={{ maxWidth: '200px' }}>
    <WaMenuItem value="undo">Undo</WaMenuItem>
    <WaMenuItem value="redo">Redo</WaMenuItem>
    <WaDivider />
    <WaMenuItem value="cut">Cut</WaMenuItem>
    <WaMenuItem value="copy">Copy</WaMenuItem>
    <WaMenuItem value="paste">Paste</WaMenuItem>
    <WaMenuItem value="delete">Delete</WaMenuItem>
  </WaMenu>
);
```

:::tip
Menus are intended for system menus (dropdown menus, select menus, context menus, etc.). They should not be mistaken for navigation menus which serve a different purpose and have a different semantic meaning. If you're building navigation, use `<nav>` and `<a>` elements instead.
:::

## Examples

### In Dropdowns

Menus work really well when used inside [dropdowns](/components/dropdown).

```html:preview
<wa-dropdown>
  <wa-button slot="trigger" caret>Edit</wa-button>
  <wa-menu>
    <wa-menu-item value="cut">Cut</wa-menu-item>
    <wa-menu-item value="copy">Copy</wa-menu-item>
    <wa-menu-item value="paste">Paste</wa-menu-item>
  </wa-menu>
</wa-dropdown>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaDropdown from '@shoelace-style/shoelace/dist/react/dropdown';
import WaMenu from '@shoelace-style/shoelace/dist/react/menu';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => (
  <WaDropdown>
    <WaButton slot="trigger" caret>Edit</WaButton>
    <WaMenu>
      <WaMenuItem value="cut">Cut</WaMenuItem>
      <WaMenuItem value="copy">Copy</WaMenuItem>
      <WaMenuItem value="paste">Paste</WaMenuItem>
    </WaMenu>
  </WaDropdown>
);
```

### Submenus

To create a submenu, nest an `<wa-menu slot="submenu">` in any [menu item](/components/menu-item).

```html:preview
<wa-menu style="max-width: 200px;">
  <wa-menu-item value="undo">Undo</wa-menu-item>
  <wa-menu-item value="redo">Redo</wa-menu-item>
  <wa-divider></wa-divider>
  <wa-menu-item value="cut">Cut</wa-menu-item>
  <wa-menu-item value="copy">Copy</wa-menu-item>
  <wa-menu-item value="paste">Paste</wa-menu-item>
  <wa-divider></wa-divider>
  <wa-menu-item>
    Find
    <wa-menu slot="submenu">
      <wa-menu-item value="find">Find…</wa-menu-item>
      <wa-menu-item value="find-previous">Find Next</wa-menu-item>
      <wa-menu-item value="find-next">Find Previous</wa-menu-item>
    </wa-menu>
  </wa-menu-item>
  <wa-menu-item>
    Transformations
    <wa-menu slot="submenu">
      <wa-menu-item value="uppercase">Make uppercase</wa-menu-item>
      <wa-menu-item value="lowercase">Make lowercase</wa-menu-item>
      <wa-menu-item value="capitalize">Capitalize</wa-menu-item>
    </wa-menu>
  </wa-menu-item>
</wa-menu>
```

```jsx:react
import WaDivider from '@shoelace-style/shoelace/dist/react/divider';
import WaMenu from '@shoelace-style/shoelace/dist/react/menu';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => (
  <WaMenu style={{ maxWidth: '200px' }}>
    <WaMenuItem value="undo">Undo</WaMenuItem>
    <WaMenuItem value="redo">Redo</WaMenuItem>
    <WaDivider />
    <WaMenuItem value="cut">Cut</WaMenuItem>
    <WaMenuItem value="copy">Copy</WaMenuItem>
    <WaMenuItem value="paste">Paste</WaMenuItem>
    <WaDivider />
    <WaMenuItem>
      Find
      <WaMenu slot="submenu">
        <WaMenuItem value="find">Find…</WaMenuItem>
        <WaMenuItem value="find-previous">Find Next</WaMenuItem>
        <WaMenuItem value="find-next">Find Previous</WaMenuItem>
      </WaMenu>
    </WaMenuItem>
    <WaMenuItem>
      Transformations
      <WaMenu slot="submenu">
        <WaMenuItem value="uppercase">Make uppercase</WaMenuItem>
        <WaMenuItem value="lowercase">Make lowercase</WaMenuItem>
        <WaMenuItem value="capitalize">Capitalize</WaMenuItem>
      </WaMenu>
    </WaMenuItem>
  </WaMenu>
);
```

:::caution
As a UX best practice, avoid using more than one level of submenus when possible.
:::
