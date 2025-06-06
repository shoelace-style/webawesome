---
title: Dropdown
description: Description of component.
layout: component
---

```html {.example}
<wa-dropdown>
  <wa-button slot="trigger" caret>
    <wa-icon slot="prefix" name="envelope"></wa-icon>
    Message
  </wa-button>

  <h3>Actions</h3>

  <wa-dropdown-item value="reply">
    <wa-icon slot="icon" name="reply"></wa-icon>
    Reply
    <kbd slot="details">⌘ R</kbd>
  </wa-dropdown-item>

  <wa-dropdown-item value="forward">
    <wa-icon slot="icon" name="forward"></wa-icon>
    Forward
    <kbd slot="details">⌘ F</kbd>
  </wa-dropdown-item>

  <wa-dropdown-item value="archive">
    <wa-icon slot="icon" name="archive"></wa-icon>
    Archive
  </wa-dropdown-item>

  <wa-dropdown-item value="delete" variant="danger">
    <wa-icon slot="icon" name="trash"></wa-icon>
    Delete
  </wa-dropdown-item>

  <wa-divider></wa-divider>

  <wa-dropdown-item value="images" type="checkbox" checked> Show images </wa-dropdown-item>

  <wa-dropdown-item value="wrap" type="checkbox" checked> Word wrap </wa-dropdown-item>

  <wa-divider></wa-divider>

  <wa-dropdown-item>
    <wa-icon slot="icon" name="tag"></wa-icon>
    Labels
    <wa-dropdown-item slot="submenu" value="add-label">
      <wa-icon slot="icon" name="plus"></wa-icon>
      Add label
    </wa-dropdown-item>
    <wa-dropdown-item slot="submenu" value="manage-labels">
      <wa-icon slot="icon" name="edit"></wa-icon>
      Manage labels
    </wa-dropdown-item>
  </wa-dropdown-item>

  <wa-dropdown-item value="preferences">
    <wa-icon slot="icon" name="gear"></wa-icon>
    Preferences
  </wa-dropdown-item>
</wa-dropdown>
```

## Examples

### First Example

TODO

### Second Example

TODO
