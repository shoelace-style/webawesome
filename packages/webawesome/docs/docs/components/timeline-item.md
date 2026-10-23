---
title: Timeline Item
layout: component
category: Layout
parent: timeline
hasAnatomy: true
synonyms:
  - timeline entry
  - event
use-cases:
  - order status
  - changelog entry
---

This component must be used as a child of `<wa-timeline>`. Please see the [Timeline docs](/docs/components/timeline) to see examples of this component in action.

```html {.example .anatomy-only}
<wa-timeline>
  <wa-timeline-item data-anatomy-subject="true">
    <wa-format-date slot="opposite" date="2026-07-22" month="short" day="numeric"></wa-format-date>
    <span class="wa-heading-m">Order placed</span>
    <p>We received your order and will begin processing it shortly.</p>
  </wa-timeline-item>
  <wa-timeline-item>
    <wa-format-date slot="opposite" date="2026-07-24" month="short" day="numeric"></wa-format-date>
    <span class="wa-heading-m">Out for delivery</span>
  </wa-timeline-item>
</wa-timeline>
```
