---
meta:
  title: Menu Label
  description: Menu labels are used to describe a group of menu items.
layout: component
---

```html:preview
<wa-menu style="max-width: 200px;">
  <wa-menu-label>Fruits</wa-menu-label>
  <wa-menu-item value="apple">Apple</wa-menu-item>
  <wa-menu-item value="banana">Banana</wa-menu-item>
  <wa-menu-item value="orange">Orange</wa-menu-item>
  <wa-divider></wa-divider>
  <wa-menu-label>Vegetables</wa-menu-label>
  <wa-menu-item value="broccoli">Broccoli</wa-menu-item>
  <wa-menu-item value="carrot">Carrot</wa-menu-item>
  <wa-menu-item value="zucchini">Zucchini</wa-menu-item>
</wa-menu>
```

{% raw %}

```jsx:react
import WaDivider from '@shoelace-style/shoelace/dist/react/divider';
import WaMenu from '@shoelace-style/shoelace/dist/react/menu';
import WaMenuLabel from '@shoelace-style/shoelace/dist/react/menu-label';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => (
  <WaMenu style={{ maxWidth: '200px' }}>
    <WaMenuLabel>Fruits</WaMenuLabel>
    <WaMenuItem value="apple">Apple</WaMenuItem>
    <WaMenuItem value="banana">Banana</WaMenuItem>
    <WaMenuItem value="orange">Orange</WaMenuItem>
    <WaDivider />
    <WaMenuLabel>Vegetables</WaMenuLabel>
    <WaMenuItem value="broccoli">Broccoli</WaMenuItem>
    <WaMenuItem value="carrot">Carrot</WaMenuItem>
    <WaMenuItem value="zucchini">Zucchini</WaMenuItem>
  </WaMenu>
);
```

{% endraw %}
