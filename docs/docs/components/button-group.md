---
title: Button Group
description: Button groups can be used to group related buttons into sections.
tags: component
---

```html {.example}
<wa-button-group label="Alignment">
  <wa-button>Left</wa-button>
  <wa-button>Center</wa-button>
  <wa-button>Right</wa-button>
</wa-button-group>
```

## Examples

### Button Sizes

All button sizes are supported, but avoid mixing sizes within the same button group.

```html {.example}
<wa-button-group label="Alignment">
  <wa-button size="small">Left</wa-button>
  <wa-button size="small">Center</wa-button>
  <wa-button size="small">Right</wa-button>
</wa-button-group>

<br /><br />

<wa-button-group label="Alignment">
  <wa-button size="medium">Left</wa-button>
  <wa-button size="medium">Center</wa-button>
  <wa-button size="medium">Right</wa-button>
</wa-button-group>

<br /><br />

<wa-button-group label="Alignment">
  <wa-button size="large">Left</wa-button>
  <wa-button size="large">Center</wa-button>
  <wa-button size="large">Right</wa-button>
</wa-button-group>
```

### Vertical button groups

Set the `orientation` attribute to `vertical` to make a vertical button group.

```html {.example}
<wa-button-group orientation="vertical" label="Options" style="max-width: 80px;">
  <wa-button>
    <wa-icon slot="prefix" name="plus"></wa-icon>
    New
  </wa-button>
  <wa-button>
    <wa-icon slot="prefix" name="folder-open"></wa-icon>
    Open
  </wa-button>
  <wa-button>
    <wa-icon slot="prefix" name="save"></wa-icon>
    Save
  </wa-button>
  <wa-button>
    <wa-icon slot="prefix" name="print"></wa-icon>
    Print
  </wa-button>
</wa-button-group>
```

### Theme Buttons

Theme buttons are supported through the button's `variant` attribute.

```html {.example}
<wa-button-group label="Alignment">
  <wa-button variant="brand">Left</wa-button>
  <wa-button variant="brand">Center</wa-button>
  <wa-button variant="brand">Right</wa-button>
</wa-button-group>

<br /><br />

<wa-button-group label="Alignment">
  <wa-button variant="success">Left</wa-button>
  <wa-button variant="success">Center</wa-button>
  <wa-button variant="success">Right</wa-button>
</wa-button-group>

<br /><br />

<wa-button-group label="Alignment">
  <wa-button>Left</wa-button>
  <wa-button>Center</wa-button>
  <wa-button>Right</wa-button>
</wa-button-group>

<br /><br />

<wa-button-group label="Alignment">
  <wa-button variant="warning">Left</wa-button>
  <wa-button variant="warning">Center</wa-button>
  <wa-button variant="warning">Right</wa-button>
</wa-button-group>

<br /><br />

<wa-button-group label="Alignment">
  <wa-button variant="danger">Left</wa-button>
  <wa-button variant="danger">Center</wa-button>
  <wa-button variant="danger">Right</wa-button>
</wa-button-group>
```

### Pill Buttons

Pill buttons are supported through the button's `pill` attribute.

```html {.example}
<wa-button-group label="Alignment">
  <wa-button size="small" pill>Left</wa-button>
  <wa-button size="small" pill>Center</wa-button>
  <wa-button size="small" pill>Right</wa-button>
</wa-button-group>

<br /><br />

<wa-button-group label="Alignment">
  <wa-button size="medium" pill>Left</wa-button>
  <wa-button size="medium" pill>Center</wa-button>
  <wa-button size="medium" pill>Right</wa-button>
</wa-button-group>

<br /><br />

<wa-button-group label="Alignment">
  <wa-button size="large" pill>Left</wa-button>
  <wa-button size="large" pill>Center</wa-button>
  <wa-button size="large" pill>Right</wa-button>
</wa-button-group>
```

### Dropdowns in Button Groups

Dropdowns can be placed inside button groups as long as the trigger is an `<wa-button>` element.

```html {.example}
<wa-button-group label="Example Button Group">
  <wa-button>Button</wa-button>
  <wa-button>Button</wa-button>
  <wa-dropdown>
    <wa-button slot="trigger" caret>Dropdown</wa-button>
    <wa-menu>
      <wa-menu-item>Item 1</wa-menu-item>
      <wa-menu-item>Item 2</wa-menu-item>
      <wa-menu-item>Item 3</wa-menu-item>
    </wa-menu>
  </wa-dropdown>
</wa-button-group>
```

### Split Buttons

Create a split button using a button and a dropdown. Use a [visually hidden](/docs/components/visually-hidden) label to ensure the dropdown is accessible to users with assistive devices.

```html {.example}
<wa-button-group label="Example Button Group">
  <wa-button variant="brand">Save</wa-button>
  <wa-dropdown placement="bottom-end">
    <wa-button slot="trigger" variant="brand" caret>
      <span class="wa-visually-hidden">More options</span>
    </wa-button>
    <wa-menu>
      <wa-menu-item>Save</wa-menu-item>
      <wa-menu-item>Save as&hellip;</wa-menu-item>
      <wa-menu-item>Save all</wa-menu-item>
    </wa-menu>
  </wa-dropdown>
</wa-button-group>
```

### Tooltips in Button Groups

Buttons can be wrapped in tooltips to provide more detail when the user interacts with them.

```html {.example}
<wa-button-group label="Alignment">
  <wa-button id="button-left">Left</wa-button>
  <wa-button id="button-center">Center</wa-button>
  <wa-button id="button-right">Right</wa-button>
</wa-button-group>

<wa-tooltip for="button-left">I'm on the left</wa-tooltip>
<wa-tooltip for="button-center">I'm in the middle</wa-tooltip>
<wa-tooltip for="button-right">I'm on the right</wa-tooltip>
```

### Toolbar Example

Create interactive toolbars with button groups.

```html {.example}
<div class="button-group-toolbar">
  <wa-button-group label="History">
    <wa-button id="undo-button"><wa-icon name="undo" variant="solid" label="Undo"></wa-icon></wa-button>
    <wa-button id="redo-button"><wa-icon name="redo" variant="solid" label="Redo"></wa-icon></wa-button>
  </wa-button-group>

  <wa-button-group label="Formatting">
    <wa-button id="button-bold"><wa-icon name="bold" variant="solid" label="Bold"></wa-icon></wa-button>
    <wa-button id="button-italic"><wa-icon name="italic" variant="solid" label="Italic"></wa-icon></wa-button>
    <wa-button id="button-underline"><wa-icon name="underline" variant="solid" label="Underline"></wa-icon></wa-button>
  </wa-button-group>

  <wa-button-group label="Alignment">
    <wa-button id="button-align-left"><wa-icon name="align-left" variant="solid" label="Align Left"></wa-icon></wa-button>
    <wa-button id="button-align-center"><wa-icon name="align-center" variant="solid" label="Align Center"></wa-icon></wa-button>
    <wa-button id="button-align-right"><wa-icon name="align-right" variant="solid" label="Align Right"></wa-icon></wa-button>
  </wa-button-group>
</div>

<wa-tooltip for="undo-button">Undo</wa-tooltip>
<wa-tooltip for="redo-button">Redo</wa-tooltip>
<wa-tooltip for="button-bold">Bold</wa-tooltip>
<wa-tooltip for="button-italic">Italic</wa-tooltip>
<wa-tooltip for="button-underline">Underline</wa-tooltip>

<wa-tooltip for="button-align-left">Align Left</wa-tooltip>
<wa-tooltip for="button-align-center">Align Center</wa-tooltip>
<wa-tooltip for="button-align-right">Align Right</wa-tooltip>

<style>
  .button-group-toolbar wa-button-group:not(:last-of-type) {
    margin-right: var(--wa-space-xs);
  }
</style>
```
