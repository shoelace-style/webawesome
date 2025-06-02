---
title: Size tests
---

Button size should default to `medium`:

```html {.example}
<wa-button size=small>Small</wa-button>
<wa-button>Medium</wa-button>
<wa-button size=medium>Medium</wa-button>
<wa-button size=large>Large</wa-button>
```

If no button size is specified, it should default to that of its ancestor:

```html {.example}
<wa-button-group size="small">
	<wa-button>Small 1</wa-button>
	<wa-button>Small 2</wa-button>
	<wa-button>Small 3</wa-button>
</wa-button-group>
<br><br>
<wa-button-group>
	<wa-button>Medium 1</wa-button>
	<wa-button>Medium 2</wa-button>
	<wa-button>Medium 3</wa-button>
</wa-button-group>
<br><br>
<wa-button-group size="large">
	<wa-button>Large 1</wa-button>
	<wa-button>Large 2</wa-button>
	<wa-button>Large 3</wa-button>
</wa-button-group>
```

Dropdown:

```html {.example}
<p>Small dropdown:
<wa-dropdown size="small">
  <wa-button slot="trigger" caret>Dropdown</wa-button>
  <wa-menu>
    <wa-menu-item>Dropdown Item 1</wa-menu-item>
    <wa-menu-item>Dropdown Item 2</wa-menu-item>
    <wa-menu-item>Dropdown Item 3</wa-menu-item>
  </wa-menu>
</wa-dropdown>
<p>Small menu:
<wa-dropdown>
  <wa-button slot="trigger" caret>Dropdown</wa-button>
  <wa-menu size="small">
    <wa-menu-item>Dropdown Item 1</wa-menu-item>
    <wa-menu-item>Dropdown Item 2</wa-menu-item>
    <wa-menu-item>Dropdown Item 3</wa-menu-item>
  </wa-menu>
</wa-dropdown>
<p>Small menu item:
<wa-dropdown>
  <wa-button slot="trigger" caret>Dropdown</wa-button>
  <wa-menu>
    <wa-menu-item size="small">Dropdown Item 1</wa-menu-item>
    <wa-menu-item size="small">Dropdown Item 2</wa-menu-item>
    <wa-menu-item size="small">Dropdown Item 3</wa-menu-item>
  </wa-menu>
</wa-dropdown>
<p>No size:
<wa-dropdown>
  <wa-button slot="trigger" caret>Dropdown</wa-button>
  <wa-menu>
    <wa-menu-item>Dropdown Item 1</wa-menu-item>
    <wa-menu-item>Dropdown Item 2</wa-menu-item>
    <wa-menu-item>Dropdown Item 3</wa-menu-item>
  </wa-menu>
</wa-dropdown>
```
