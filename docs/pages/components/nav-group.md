---
meta:
  title: Nav Group
  description:
layout: component
---

```html:preview
<nav style="
  border: var(--wa-panel-border-width) var(--wa-border-style) var(--wa-color-surface-outline);
  border-radius: var(--wa-panel-corners);
  padding: var(--wa-space-square-m);
">
  <wa-nav-group>
    <wa-nav-item href="#">
      <wa-icon name="search" slot="prefix"></wa-icon>
      Search
    </wa-nav-item>

    <wa-nav-item href="#">
      <wa-icon name="bell" slot="prefix"></wa-icon>
      Notifications
    </wa-nav-item>

    <wa-nav-group heading="Workspace" expandable style="margin-top: 1rem;">
      <div slot="summary" style="display: flex; align-items: center; gap: 8px;">
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

    <wa-nav-item href="#">
      <wa-icon name="question-circle" slot="prefix"></wa-icon>
      Help
    </wa-nav-item>
  </wa-nav-group>

  <wa-nav-group heading="Reports" style="margin-top: 1rem;">
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
</nav>
```

## Examples

### Nav Group with heading

```html:preview
<wa-nav-group heading="Workspace">
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


### Nav group with nested nav items

Use the `expandable` attribute to mark a nav item as expandable. In addition,
you can add a `summary` slot or attribute to display in the `<wa-details>` element prior
to expanding the nav group.

```html:preview
<wa-nav-group expandable summary="Payments">
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