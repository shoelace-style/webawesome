---
title: Option
layout: component
category: Forms
parent: select
hasAnatomy: true
synonyms:
  - select option
  - list option
  - choice
use-cases:
  - dropdown option
  - select item
  - pick list item
---

This component must be used as a child of `<wa-select>`. Please see the [Select docs](/docs/components/select) to see examples of this component in action.

```html {.example .anatomy-only}
<!-- select is an overlay that won't render on a static stage, so the options show among dimmed siblings. -->
<div style="display: flex; flex-direction: column;">
  <wa-option><wa-icon slot="start" name="mug-hot"></wa-icon>Espresso</wa-option>
  <wa-option data-anatomy-subject="true"><wa-icon slot="start" name="star"></wa-icon>Cortado</wa-option>
  <wa-option><wa-icon slot="start" name="mug-saucer"></wa-icon>Cappuccino</wa-option>
</div>
```
