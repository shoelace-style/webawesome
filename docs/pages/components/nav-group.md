---
meta:
  title: Nav Group
  description:
layout: component
---

```html:preview
<wa-nav-group
  style="
    --gap: var(--wa-space-m);
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

  <wa-divider style="margin: 0;"></wa-divider>

  <wa-nav-group label="Workspace">
    <wa-nav-item expandable>
      <div slot="label" style="display: flex; align-items: center; gap: 8px;">
        <wa-icon name="credit-card"></wa-icon>
        Payments
      </div>

      <wa-nav-item href="#" current="page">
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

  <wa-divider style="margin: 0;"></wa-divider>

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

  <wa-divider style="margin: 0;"></wa-divider>

  <wa-nav-item href="#">
    <wa-icon name="question-circle" slot="prefix"></wa-icon>
    Help
  </wa-nav-item>
</wa-nav-group>
```

## HTML Equivalent

```html:preview
<style>
  .nav-group {
    margin: 0;
    padding: 0;
    width: 100%;
  }

  ul.nav-group {
    list-style-type: '';
    display: grid;
    align-items: start;
    gap: 8px;
  }

  wa-details.nav-group {
    &::part(base) {
      border-color: transparent;
    }
  }

  .nav-group > li,
  .nav-group ul > li {
    width: 100%;
  }

  .nav-group h2 {
    font-size: 1em;
    margin: 0.25em 0;
  }

  .nav-group wa-button {
    width: 100%;

    &[aria-current]::part(base) {
      background-color: var(--wa-color-brand-fill-vivid);
      color: var(--wa-color-brand-text-on-vivid);
    }

    &::part(base) {
      justify-content: start;
      border-color: transparent;
    }
  }
</style>
<nav>
  <ul
    role="list"
    class="nav-group"
    style="
      border: var(--wa-panel-border-width) var(--wa-border-style) var(--wa-color-surface-outline);
      border-radius: var(--wa-panel-corners);
      padding: var(--wa-space-square-m);
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-m);
    "
  >
    <li>
      <wa-button href="#" outline>
        <wa-icon name="search" slot="prefix"></wa-icon>
        Search
      </wa-button>
    </li>

    <li>
      <wa-button href="#" outline>
        <wa-icon name="bell" slot="prefix"></wa-icon>
        Notifications
      </wa-button>
    </li>

    <li><wa-divider style="margin: 0;"></wa-divider></li>

    <li>
      <h2>
        Workspace
      </h2>
    </li>

    <li>
      <wa-details class="nav-group">
        <div slot="summary" style="display: flex; align-items: center; gap: 8px;">
          <wa-icon name="credit-card"></wa-icon>
          Payments
        </div>

        <ul class="nav-group">
          <li>
            <wa-button href="#" outline aria-current="page">
              Transactions
            </wa-button>
          </li>

          <li>
            <wa-button href="#" outline>
              Invoices
            </wa-button>
          </li>

          <li>
            <wa-button href="#" outline>
              Disputed Charges
            </wa-button>
          </li>
        </ul>
      </wa-details>
    </li>

    <li><wa-divider style="margin: 0;"></wa-divider></li>

    <li>
      <h2>Reports</h2>
    </li>

    <li>
      <wa-button href="#" outline>
        Sales
      </wa-button>
    </li>

    <li>
      <wa-button href="#" outline>
        Expenses
      </wa-button>
    </li>

    <li>
      <wa-button href="#" outline>
        Payroll
      </wa-button>
    </li>

    <li><wa-divider style="margin: 0;"></wa-divider></li>

    <li>
      <wa-button href="#" outline>
        <wa-icon name="question-circle" slot="prefix"></wa-icon>
        Help
      </wa-button>
    </li>
  </ul>
</nav>
```

## Examples

### Nav Group with label

```html:preview
<wa-nav-group label="Workspace">
  <wa-nav-item href="#" current="page">
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