---
title: Store Navigation
description: 'Help shoppers explore categories and find products with all of the links they need to navigate your store.'
unpublished: true
isPro: true
---

## Popup Menu

```html {.example}
<wa-dropdown>
  <wa-button slot="trigger" caret>Shop</wa-button>
  <wa-menu class="mm-grid">
    <div>
      <wa-menu-label>Shop by Department</wa-menu-label>
      <wa-menu-item value="apple">Mens</wa-menu-item>
      <wa-menu-item value="banana">Womens</wa-menu-item>
      <wa-menu-item value="orange">Kids</wa-menu-item>
      <wa-menu-item value="orange">
        Infants
        <wa-menu slot="submenu">
          <wa-menu-item value="uppercase">Newborns</wa-menu-item>
          <wa-menu-item value="lowercase">6 Months</wa-menu-item>
          <wa-menu-item value="capitalize">12 Months</wa-menu-item>
        </wa-menu>
      </wa-menu-item>
      <wa-menu-item value="orange">Big & Tall</wa-menu-item>
    </div>
    <div>
      <wa-menu-label>Shop by Category</wa-menu-label>
      <wa-menu-item value="apple">Shirts</wa-menu-item>
      <wa-menu-item value="banana">Pants</wa-menu-item>
      <wa-menu-item value="orange">Shoes</wa-menu-item>
    </div>

    <div>
      <wa-menu-label>Just Arrived</wa-menu-label>

      <wa-menu-item>
        <a href="#">
          <img
            style="width: 100%; max-width: 200px;"
            src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDIzNDd8&ixlib=rb-4.0.3&q=80&w=1080"
          />
        </a>
      </wa-menu-item>
    </div>

    <wa-menu-item style="grid-column: 1/-1;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <p style="margin:0;">footer with something cool in it</p>
        <wa-button variant="brand" size="small">Signup now</wa-button>
      </div>
    </wa-menu-item>
  </wa-menu>
</wa-dropdown>
<style>
  .mm-grid {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 1rem;

    .card-overview small {
      color: var(--wa-color-text-quiet);
    }

    .card-overview [slot='footer'] {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
```
