---
title: Breadcrumb Item
layout: component
category: Navigation
parent: breadcrumb
hasAnatomy: true
synonyms:
  - breadcrumb link
  - crumb
use-cases:
  - navigation link
  - path segment
---

This component must be used as a child of `<wa-breadcrumb>`. Please see the [Breadcrumb docs](/docs/components/breadcrumb) to see examples of this component in action.

```html {.example .anatomy-only}
<wa-breadcrumb>
  <wa-breadcrumb-item><wa-icon slot="start" name="house"></wa-icon>Home</wa-breadcrumb-item>
  <wa-breadcrumb-item data-anatomy-subject="true"><wa-icon slot="start" name="folder"></wa-icon>Projects</wa-breadcrumb-item>
  <wa-breadcrumb-item>Overview</wa-breadcrumb-item>
</wa-breadcrumb>
```
