---
meta:
  title: Nav Group
  description:
layout: component
---

```html:preview
<wa-nav-group
  style="
    --gap: var(--wa-space-2xl);
    border: var(--wa-panel-border-width) var(--wa-border-style) var(--wa-color-surface-outline);
    border-radius: var(--wa-panel-corners);
    padding: var(--wa-space-square-m);
  "
>
  <wa-nav-group>
    <wa-nav-item href="#">
      <wa-icon name="search" slot="prefix"></wa-icon>
      Search
    </wa-nav-item>

    <wa-nav-item href="#">
      <wa-icon name="bell" slot="prefix"></wa-icon>
      Notifications
    </wa-nav-item>
  </wa-nav-group>

  <wa-nav-group label="Workspace">
    <wa-nav-item expandable>
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
    </wa-nav-item>
  </wa-nav-group>

  <wa-nav-group label="Reports">
    <wa-nav-item href="#">
      Sales
    </wa-nav-item>

    <wa-nav-item href="#">
      Expenses
    </wa-nav-item>

    <wa-nav-item href="#">
      Payroll
    </wa-nav-item>
  </wa-nav-group>

  <wa-nav-item href="#">
    <wa-icon name="question-circle" slot="prefix"></wa-icon>
    Help
  </wa-nav-item>
</wa-nav-group>
```

## Examples

### Nav Group with label

```html:preview
<wa-nav-group label="Workspace">
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
```