---
meta:
  title: Breadcrumb Item
  description: Breadcrumb Items are used inside breadcrumbs to represent different links.
layout: component
---

```html:preview
<wa-breadcrumb>
  <wa-breadcrumb-item>
    <wa-icon slot="prefix" name="house"></wa-icon>
    Home
  </wa-breadcrumb-item>
  <wa-breadcrumb-item>Clothing</wa-breadcrumb-item>
  <wa-breadcrumb-item>Shirts</wa-breadcrumb-item>
</wa-breadcrumb>
```

```jsx:react
import WaBreadcrumb from '@shoelace-style/shoelace/dist/react/breadcrumb';
import WaBreadcrumbItem from '@shoelace-style/shoelace/dist/react/breadcrumb-item';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';

const App = () => (
  <WaBreadcrumb>
    <WaBreadcrumbItem>
      <WaIcon slot="prefix" name="house"></WaIcon>
      Home
    </WaBreadcrumbItem>
    <WaBreadcrumbItem>Clothing</WaBreadcrumbItem>
    <WaBreadcrumbItem>Shirts</WaBreadcrumbItem>
  </WaBreadcrumb>
);
```

:::tip
Additional demonstrations can be found in the [breadcrumb examples](/components/breadcrumb).
:::
