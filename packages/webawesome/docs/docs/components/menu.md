---
title: Menu
description: Menus provide a list of options for the user to choose from.
tags: [actions, apps]
icon: menu
---

You can use [menu items](/docs/components/menu-item), [menu labels](/docs/components/menu-label), and [dividers](/docs/components/divider) to compose a menu. Menus support keyboard interactions, including type-to-select an option.

```html {.example}
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

:::info
Menus are intended for system menus (dropdown menus, select menus, context menus, etc.). They should not be mistaken for navigation menus which serve a different purpose and have a different semantic meaning. If you're building navigation, use `<nav>` and `<a>` elements instead.
:::

## Examples

### In Dropdowns

Menus work really well when used inside [dropdowns](/docs/components/dropdown).

```html {.example}
<wa-dropdown>
  <wa-button slot="trigger" caret>Edit</wa-button>
  <wa-menu>
    <wa-menu-item value="cut">Cut</wa-menu-item>
    <wa-menu-item value="copy">Copy</wa-menu-item>
    <wa-menu-item value="paste">Paste</wa-menu-item>
  </wa-menu>
</wa-dropdown>
```

### Submenus

To create a submenu, nest an `<wa-menu slot="submenu">` in any [menu item](/docs/components/menu-item).

```html {.example}
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

:::warning
As a UX best practice, avoid using more than one level of submenus when possible.
:::
