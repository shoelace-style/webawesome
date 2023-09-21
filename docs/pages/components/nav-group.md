---
meta:
  title: Nav Group
  description:
layout: component
---

```html:preview
<wa-nav-group>
  <wa-nav-item href="#">
    <wa-icon name="search" slot="prefix"></wa-icon>
    Search
  </wa-nav-item>

  <wa-nav-item href="#">
    <wa-icon name="bell" slot="prefix"></wa-icon>
    Notifications
  </wa-nav-item>

  <wa-divider></wa-divider>

  <wa-nav-group expandable>
    <div slot="label" style="display: flex; align-items: center; gap: 8px;">
      <wa-icon name="credit-card"></wa-icon>
      Payments
    </div>

    <wa-nav-item href="#" active>
      Transactions
    </wa-nav-item>

    <wa-nav-item href="#">
      Invoices
    </wa-nav-item>

    <wa-nav-item href="#">
      Disputed Charges
    </wa-nav-item>
  </wa-nav-group>
</wa-nav-group>
```

## Examples

### First Example

TODO

### Second Example

TODO