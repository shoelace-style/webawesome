---
meta:
  title: Nav Item
  description:
layout: component
---

`wa-nav-item` maps to a `role="listitem"` under the hood and should generally be used as part
of a `<wa-nav-group>` for accessibility purposes.

```html:preview
<wa-nav-item href="#">
  Nav Item
</wa-nav-item>
```

## Examples

### Active nav item

```html:preview
<wa-nav-item href="#" active>
  Active Nav Item
</wa-nav-item>
```

### Icon only

```html:preview
<wa-nav-item href="#">
  <wa-icon slot="prefix" name="house-door"></wa-icon>
  <wa-visually-hidden>Home</wa-visually-hidden>
</wa-nav-item>
```


### Nav items with prefix + suffix

```html:preview
<wa-nav-item href="#">
  <wa-icon slot="prefix" name="link-45deg"></wa-icon>
  Nav Item
  <wa-icon slot="suffix" name="box-arrow-up-right"></wa-icon>
</wa-nav-item>
```