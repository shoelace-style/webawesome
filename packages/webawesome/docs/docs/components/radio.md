---
title: Radio
layout: component
category: Forms
parent: radio-group
hasAnatomy: true
synonyms:
  - radio button
  - option button
use-cases:
  - single select
  - exclusive choice
---

This component must be used as a child of `<wa-radio-group>`. Please see the [Radio Group docs](/docs/components/radio-group) to see examples of this component in action.

```html {.example .anatomy-only}
<wa-radio-group label="Network">
  <wa-radio value="off">Off</wa-radio>
  <wa-radio value="wifi" data-anatomy-subject="true">Wi-Fi</wa-radio>
  <wa-radio value="all">Everything</wa-radio>
</wa-radio-group>
```
