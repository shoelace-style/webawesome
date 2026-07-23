---
title: Accordion Item
layout: component
category: Layout
parent: accordion
hasAnatomy: true
synonyms:
  - collapsible section
  - expandable section
  - disclosure item
  - panel
  - expandable panel
use-cases:
  - FAQ entry
  - FAQ item
  - settings section
  - collapsible content
---

This component must be used as a child of `<wa-accordion>`. Please see the [Accordion docs](/docs/components/accordion) to see examples of this component in action.

```html {.example .anatomy-only}
<wa-accordion>
  <wa-accordion-item label="Overview">The first section.</wa-accordion-item>
  <wa-accordion-item expanded data-anatomy-subject="true">
    <span slot="label">Shipping &amp; returns</span>
    Orders ship within two business days. Returns are free within 30 days.
  </wa-accordion-item>
  <wa-accordion-item label="Warranty">The third section.</wa-accordion-item>
</wa-accordion>
```
