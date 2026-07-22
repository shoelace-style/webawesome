---
title: Dropdown Item
layout: component
category: Actions
parent: dropdown
hasAnatomy: true
synonyms:
  - menu item
  - action item
  - list item
use-cases:
  - dropdown option
  - menu option
  - command
---

This component must be used as a child of `<wa-dropdown>`. Please see the [Dropdown docs](/docs/components/dropdown) to see examples of this component in action.

```html {.example .anatomy-only}
<!-- dropdown is an overlay that won't render on a static stage, so the items show among dimmed siblings. -->
<div style="display: flex; flex-direction: column;">
  <wa-dropdown-item><wa-icon slot="icon" name="copy"></wa-icon>Copy<span slot="details">⌘C</span></wa-dropdown-item>
  <wa-dropdown-item data-anatomy-subject="true"
    ><wa-icon slot="icon" name="scissors"></wa-icon>Cut<span slot="details">⌘X</span></wa-dropdown-item
  >
  <wa-dropdown-item><wa-icon slot="icon" name="trash"></wa-icon>Delete</wa-dropdown-item>
</div>
```
