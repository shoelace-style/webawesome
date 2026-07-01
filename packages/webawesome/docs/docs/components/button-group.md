---
title: Button Group
layout: component
category: Actions
synonyms:
  - button bar
  - toolbar
  - action group
  - segmented control
use-cases:
  - toggle group
  - split button
  - grouped actions
---

```html {.example}
<wa-button-group label="Alignment">
  <wa-button appearance="filled">Left</wa-button>
  <wa-button appearance="filled">Center</wa-button>
  <wa-button appearance="filled">Right</wa-button>
</wa-button-group>
```

:::info
<strong>Give every button group a `label`.</strong><br />
It isn't shown on screen, but assistive devices announce it so people know what the grouped buttons control.
:::

## Examples

### Orientation

Set the `orientation` attribute to `vertical` to stack the buttons instead of placing them side by side.

```html {.example}
<wa-button-group orientation="vertical" label="Options">
  <wa-button appearance="filled">Top</wa-button>
  <wa-button appearance="filled">Middle</wa-button>
  <wa-button appearance="filled">Bottom</wa-button>
</wa-button-group>
```

### Pill

Add the `pill` attribute to each button to round the group's outer edges.

```html {.example}
<wa-button-group label="Alignment">
  <wa-button appearance="filled" size="m" pill>Left</wa-button>
  <wa-button appearance="filled" size="m" pill>Center</wa-button>
  <wa-button appearance="filled" size="m" pill>Right</wa-button>
</wa-button-group>
```

### Dropdowns

Place a [dropdown](/docs/components/dropdown) anywhere in the group to attach a menu of related actions.

```html {.example}
<wa-button-group label="Options">
  <wa-button appearance="filled">Edit</wa-button>
  <wa-dropdown>
    <wa-button appearance="filled" slot="trigger" with-caret>More</wa-button>
    <wa-dropdown-item>Cut</wa-dropdown-item>
    <wa-dropdown-item>Copy</wa-dropdown-item>
    <wa-dropdown-item>Paste</wa-dropdown-item>
  </wa-dropdown>
  <wa-button appearance="filled">Edit</wa-button>
</wa-button-group>
```

### Split Buttons

Pair a primary button with a dropdown to make a split button. Give the dropdown trigger an accessible label so people using assistive devices know what it opens.

```html {.example}
<wa-button-group label="Save">
  <wa-button appearance="filled" variant="brand">Save</wa-button>
  <wa-dropdown placement="bottom-end">
    <wa-button appearance="filled" slot="trigger" variant="brand">
      <wa-icon name="chevron-down" label="More options"></wa-icon>
    </wa-button>
    <wa-dropdown-item>Save</wa-dropdown-item>
    <wa-dropdown-item>Save as&hellip;</wa-dropdown-item>
    <wa-dropdown-item>Save all</wa-dropdown-item>
  </wa-dropdown>
</wa-button-group>
```

### Tooltips

Pair each button with a [tooltip](/docs/components/tooltip) to explain what it does on hover and focus.

```html {.example}
<wa-button-group label="Alignment">
  <wa-button appearance="filled" id="button-left">Left</wa-button>
  <wa-button appearance="filled" id="button-center">Center</wa-button>
  <wa-button appearance="filled" id="button-right">Right</wa-button>
</wa-button-group>

<wa-tooltip for="button-left">Align left</wa-tooltip>
<wa-tooltip for="button-center">Align center</wa-tooltip>
<wa-tooltip for="button-right">Align right</wa-tooltip>
```

### Toolbars

Combine several button groups into a toolbar of related action sets. Use icon-only buttons with `label` for compact controls, and tooltips to name each one.

```html {.example}
<div class="button-group-toolbar wa-cluster">
  <wa-button-group label="History">
    <wa-button appearance="filled" id="undo-button"><wa-icon name="undo" variant="solid" label="Undo"></wa-icon></wa-button>
    <wa-button appearance="filled" id="redo-button"><wa-icon name="redo" variant="solid" label="Redo"></wa-icon></wa-button>
  </wa-button-group>

  <wa-button-group label="Formatting">
    <wa-button appearance="filled" id="button-bold"><wa-icon name="bold" variant="solid" label="Bold"></wa-icon></wa-button>
    <wa-button appearance="filled" id="button-italic"><wa-icon name="italic" variant="solid" label="Italic"></wa-icon></wa-button>
    <wa-button appearance="filled" id="button-underline"><wa-icon name="underline" variant="solid" label="Underline"></wa-icon></wa-button>
  </wa-button-group>

  <wa-button-group label="Alignment">
    <wa-button appearance="filled" id="button-align-left"><wa-icon name="align-left" variant="solid" label="Align left"></wa-icon></wa-button>
    <wa-button appearance="filled" id="button-align-center"><wa-icon name="align-center" variant="solid" label="Align center"></wa-icon></wa-button>
    <wa-button appearance="filled" id="button-align-right"><wa-icon name="align-right" variant="solid" label="Align right"></wa-icon></wa-button>
  </wa-button-group>
</div>

<wa-tooltip for="undo-button">Undo</wa-tooltip>
<wa-tooltip for="redo-button">Redo</wa-tooltip>
<wa-tooltip for="button-bold">Bold</wa-tooltip>
<wa-tooltip for="button-italic">Italic</wa-tooltip>
<wa-tooltip for="button-underline">Underline</wa-tooltip>
<wa-tooltip for="button-align-left">Align left</wa-tooltip>
<wa-tooltip for="button-align-center">Align center</wa-tooltip>
<wa-tooltip for="button-align-right">Align right</wa-tooltip>
```

### Native Buttons

Button groups also work with native `<button>` elements when [Native Styles](/docs/utilities/native) are included.

```html {.example}
<wa-button-group label="Alignment">
  <button class="wa-filled">Left</button>
  <button class="wa-filled">Center</button>
  <button class="wa-filled">Right</button>
</wa-button-group>
```
