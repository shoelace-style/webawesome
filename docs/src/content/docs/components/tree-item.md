---
title: Tree Item
description: A tree item serves as a hierarchical node that lives inside a tree.
layout: ../../../layouts/ComponentLayout.astro
---

```html:preview
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

<!-- prettier-ignore -->
```jsx:react
import WaTree from '@shoelace-style/shoelace/dist/react/tree';
import WaTreeItem from '@shoelace-style/shoelace/dist/react/tree-item';

const App = () => (
  <WaTree>
    <WaTreeItem>
      Item 1
      <WaTreeItem>Item A</WaTreeItem>
      <WaTreeItem>Item B</WaTreeItem>
      <WaTreeItem>Item C</WaTreeItem>
    </WaTreeItem>
    <WaTreeItem>Item 2</WaTreeItem>
    <WaTreeItem>Item 3</WaTreeItem>
  </WaTree>
);
```

## Examples

### Nested tree items

A tree item can contain other tree items. This allows the node to be expanded or collapsed by the user.

```html:preview
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

<!-- prettier-ignore -->
```jsx:react
import WaTree from '@shoelace-style/shoelace/dist/react/tree';
import WaTreeItem from '@shoelace-style/shoelace/dist/react/tree-item';

const App = () => (
  <WaTree>
    <WaTreeItem>
      Item 1
      <WaTreeItem>
        Item A
        <WaTreeItem>Item Z</WaTreeItem>
        <WaTreeItem>Item Y</WaTreeItem>
        <WaTreeItem>Item X</WaTreeItem>
      </WaTreeItem>
      <WaTreeItem>Item B</WaTreeItem>
      <WaTreeItem>Item C</WaTreeItem>
    </WaTreeItem>
    <WaTreeItem>Item 2</WaTreeItem>
    <WaTreeItem>Item 3</WaTreeItem>
  </WaTree>
);
```

### Selected

Use the `selected` attribute to select a tree item initially.

```html:preview
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

<!-- prettier-ignore -->
```jsx:react
import WaTree from '@shoelace-style/shoelace/dist/react/tree';
import WaTreeItem from '@shoelace-style/shoelace/dist/react/tree-item';

const App = () => (
  <WaTree>
    <WaTreeItem selected>
      Item 1
      <WaTreeItem>Item A</WaTreeItem>
      <WaTreeItem>Item B</WaTreeItem>
      <WaTreeItem>Item C</WaTreeItem>
    </WaTreeItem>
    <WaTreeItem>Item 2</WaTreeItem>
    <WaTreeItem>Item 3</WaTreeItem>
  </WaTree>
);
```

### Expanded

Use the `expanded` attribute to expand a tree item initially.

```html:preview
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

<!-- prettier-ignore -->
```jsx:react
import WaTree from '@shoelace-style/shoelace/dist/react/tree';
import WaTreeItem from '@shoelace-style/shoelace/dist/react/tree-item';

const App = () => (
  <WaTree>
    <WaTreeItem expanded>
      Item 1
      <WaTreeItem expanded>
        Item A
        <WaTreeItem>Item Z</WaTreeItem>
        <WaTreeItem>Item Y</WaTreeItem>
        <WaTreeItem>Item X</WaTreeItem>
      </WaTreeItem>
      <WaTreeItem>Item B</WaTreeItem>
      <WaTreeItem>Item C</WaTreeItem>
    </WaTreeItem>
    <WaTreeItem>Item 2</WaTreeItem>
    <WaTreeItem>Item 3</WaTreeItem>
  </WaTree>
);
```
