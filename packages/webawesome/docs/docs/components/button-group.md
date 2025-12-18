---
title: Button Group
description: Button groups can be used to group related buttons into sections.
layout: component
category: Actions
---

```html {.example}
<wa-button-group label="Alignment">
  <wa-button>Left</wa-button>
  <wa-button>Center</wa-button>
  <wa-button>Right</wa-button>
</wa-button-group>
```

## Examples

### Vertical Button Groups

Set the `orientation` attribute to `vertical` to make a vertical button group.

```html {.example}
<wa-button-group orientation="vertical" label="Options">
  <wa-button>
    <wa-icon slot="start" name="plus"></wa-icon>
    New
  </wa-button>
  <wa-button>
    <wa-icon slot="start" name="folder-open"></wa-icon>
    Open
  </wa-button>
  <wa-button>
    <wa-icon slot="start" name="save"></wa-icon>
    Save
  </wa-button>
  <wa-button>
    <wa-icon slot="start" name="print"></wa-icon>
    Print
  </wa-button>
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

Dropdowns can be placed into button groups.

```html {.example}
<wa-button-group label="Example Button Group">
  <wa-button>Button</wa-button>
  <wa-dropdown>
    <wa-button slot="trigger" with-caret>Dropdown</wa-button>
    <wa-dropdown-item>Item 1</wa-dropdown-item>
    <wa-dropdown-item>Item 2</wa-dropdown-item>
    <wa-dropdown-item>Item 3</wa-dropdown-item>
  </wa-dropdown>
  <wa-button>Button</wa-button>
</wa-button-group>
```

### Split Buttons

Create a split button using a button and a dropdown. Use a [visually hidden](/docs/utilities/visually-hidden) label to ensure the dropdown is accessible to users with assistive devices.

```html {.example}
<wa-button-group label="Example Button Group">
  <wa-button variant="brand">Save</wa-button>
  <wa-dropdown placement="bottom-end">
    <wa-button slot="trigger" variant="brand">
      <wa-icon name="chevron-down" label="More options"></wa-icon>
    </wa-button>
    <wa-dropdown-item>Save</wa-dropdown-item>
    <wa-dropdown-item>Save as&hellip;</wa-dropdown-item>
    <wa-dropdown-item>Save all</wa-dropdown-item>
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
    <wa-button id="button-align-left">
      <wa-icon name="align-left" variant="solid" label="Align Left"></wa-icon>
    </wa-button>
    <wa-button id="button-align-center">
      <wa-icon name="align-center" variant="solid" label="Align Center"></wa-icon>
    </wa-button>
    <wa-button id="button-align-right">
      <wa-icon name="align-right" variant="solid" label="Align Right"></wa-icon>
    </wa-button>
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
