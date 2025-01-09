---
title: Tree Item
description: A tree item serves as a hierarchical node that lives inside a tree.
tags: [navigation, disclosure, apps]
icon: tree
---

```html {.example}
<wa-tree>
  <wa-tree-item>
    Item 1
    <wa-tree-item>Item A</wa-tree-item>
    <wa-tree-item>Item B</wa-tree-item>
    <wa-tree-item>Item C</wa-tree-item>
  </wa-tree-item>
  <wa-tree-item>Item 2</wa-tree-item>
  <wa-tree-item>Item 3</wa-tree-item>
</wa-tree>
```

## Examples

### Nested tree items

A tree item can contain other tree items. This allows the node to be expanded or collapsed by the user.

```html {.example}
<wa-tree>
  <wa-tree-item>
    Item 1
    <wa-tree-item>
      Item A
      <wa-tree-item>Item Z</wa-tree-item>
      <wa-tree-item>Item Y</wa-tree-item>
      <wa-tree-item>Item X</wa-tree-item>
    </wa-tree-item>
    <wa-tree-item>Item B</wa-tree-item>
    <wa-tree-item>Item C</wa-tree-item>
  </wa-tree-item>
  <wa-tree-item>Item 2</wa-tree-item>
  <wa-tree-item>Item 3</wa-tree-item>
</wa-tree>
```

### Selected

Use the `selected` attribute to select a tree item initially.

```html {.example}
<wa-tree>
  <wa-tree-item selected>
    Item 1
    <wa-tree-item>Item A</wa-tree-item>
    <wa-tree-item>Item B</wa-tree-item>
    <wa-tree-item>Item C</wa-tree-item>
  </wa-tree-item>
  <wa-tree-item>Item 2</wa-tree-item>
  <wa-tree-item>Item 3</wa-tree-item>
</wa-tree>
```

### Expanded

Use the `expanded` attribute to expand a tree item initially.

```html {.example}
<wa-tree>
  <wa-tree-item expanded>
    Item 1
    <wa-tree-item expanded>
      Item A
      <wa-tree-item>Item Z</wa-tree-item>
      <wa-tree-item>Item Y</wa-tree-item>
      <wa-tree-item>Item X</wa-tree-item>
    </wa-tree-item>
    <wa-tree-item>Item B</wa-tree-item>
    <wa-tree-item>Item C</wa-tree-item>
  </wa-tree-item>
  <wa-tree-item>Item 2</wa-tree-item>
  <wa-tree-item>Item 3</wa-tree-item>
</wa-tree>
```
