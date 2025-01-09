---
title: Shopping Cart
description: TODO
parent: ecommerce
tags: e-commerce
---

TODO Page Description

## Examples

### Slide Over

```html {.example}
<wa-card with-header with-footer class="card-header" style="width: 500px;">
  <div slot="header">
    <strong>Shopping Cart</strong>
    <wa-icon-button name="close" variant="solid" label="Settings"></wa-icon-button>
  </div>
    <section class="cart-item">
    <img src="https://images.unsplash.com/photo-1704677982224-89cd6d039fa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDEwOTJ8&ixlib=rb-4.0.3&q=80&w=1080" alt="" width="300">
    <div>
      <div style="display:flex; justify-content: space-between; font-weight: 600;">
        <span>AJ1</span>
        <span>$170.00</span>
      </div>
      <div style="font-size: small;">Off-white Jordan One</div>
      <div style="display:flex; justify-content: space-between; align-items: center;">
        <span>Qty: 1</span>
        <wa-button appearance="plain" size="small">Remove</wa-button>
      </div>
    </div>
  </section>
   <section class="cart-item">
    <img src="https://plus.unsplash.com/premium_photo-1707932485795-1d0aed727376?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDE2NDl8&ixlib=rb-4.0.3&q=80&w=1080" alt="" width="300">
    <div>
      <div style="display:flex; justify-content: space-between; font-weight: 600;">
        <span>The Trails</span>
        <span>$35.00</span>
      </div>
      <div style="font-size: small;">50/50 Cotton Poly Blend</div>
      <div style="display:flex; justify-content: space-between; align-items: center;">
        <span>Qty: 1</span>
        <wa-button appearance="plain" size="small">Remove</wa-button>
      </div>
    </div>
  </section>
   <section class="cart-item">
    <img src="https://plus.unsplash.com/premium_photo-1690347839113-b5db143123b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDE5MTB8&ixlib=rb-4.0.3&q=80&w=1080" alt="" width="300">
    <div>
      <div style="display:flex; justify-content: space-between; font-weight: 600;">
        <span>Outcast</span>
        <span>$27.00</span>
      </div>
      <div style="font-size: small;">100% Cotton</div>
      <div style="display:flex; justify-content: space-between; align-items: center;">
        <span>Qty: 1</span>
        <wa-button appearance="plain" size="small">Remove</wa-button>
      </div>
    </div>
  </section>

  <div slot="footer">
    <div style="display:flex; justify-content: space-between; font-weight: 600;">
      <span>Subtotal</span>
      <span>$232.00</span>
    </div>
    <div style="font-size: small; margin-bottom: 1rem;">Shipping and taxes calculated at checkout.</div>
   <wa-button size="medium" variant="brand" style="width: 100%; margin-bottom: 1rem;">Medium</wa-button>
    or <a href="#">Continue shopping <wa-icon-button name="arrow-right" variant="solid" label="Settings"></wa-icon-button></a>
  </div>

</wa-card>

<style>


  .card-header [slot='header'] {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-header h3 {
    margin: 0;
  }

  .card-header wa-icon-button {
    font-size: var(--wa-font-size-m);
  }

  .cart-item {
    display: flex;
    gap: 2rem;
    margin-bottom: 1rem;

    &:not(:last-of-type) {
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
    }


    img {
      width: 6rem;
      flex-grow: 1;
    }

    div {
      flex-grow: 11;
    }
  }


</style>
```

### Two Column Cart

```html {.example}
<div class="two-column">
  <h1>Shopping Cart</h1>
  <div class="first-column">
    <section class="cart-item">
     <img class="cart-item-image" src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDIzNDd8&ixlib=rb-4.0.3&q=80&w=1080" alt="" width="300">
    <div class="cart-item-info">
      <div class="cart-item-meta">
        <div>
          <span style="font-size: larger">Classic</span>
          <div>White - L</div>
          <span style="font-size: larger">$15.00</span>
        </div>

          <wa-select placeholder="1">
            <wa-option value="option-1">1</wa-option>
            <wa-option value="option-2">2</wa-option>
            <wa-option value="option-3">3</wa-option>
          </wa-select>
          <wa-icon-button name="close" variant="solid" label="Settings"></wa-icon-button>

      </div>
       <div style="display: flex;justify-content: flex-start;align-items: baseline;">
        <wa-icon name="check" style="color: green; margin-right: 0.5rem;"></wa-icon> In Stock
        </div>

    </div>
  </section>
  <section class="cart-item">
     <img class="cart-item-image" src="https://images.unsplash.com/photo-1624378440847-4a64ee1a889d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDI0MDd8&ixlib=rb-4.0.3&q=80&w=1080" alt="" width="300">
    <div class="cart-item-info">
      <div class="cart-item-meta">
        <div>
          <span style="font-size: larger">Button Up</span>
          <div>Blue - L</div>
          <span style="font-size: larger">$20.00</span>
        </div>

          <wa-select placeholder="1">
            <wa-option value="option-1">1</wa-option>
            <wa-option value="option-2">2</wa-option>
            <wa-option value="option-3">3</wa-option>
          </wa-select>
          <wa-icon-button name="close" variant="solid" label="Settings"></wa-icon-button>

      </div>
       <div style="display: flex;justify-content: flex-start;align-items: baseline;">
        <wa-icon name="check" style="color: green; margin-right: 0.5rem;"></wa-icon> In Stock
        </div>

    </div>
  </section>
  <section class="cart-item">
     <img class="cart-item-image" src="https://images.unsplash.com/photo-1511551203524-9a24350a5771?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDI0OTB8&ixlib=rb-4.0.3&q=80&w=1080" alt="" width="300">
    <div class="cart-item-info">
      <div class="cart-item-meta">
        <div>
          <span style="font-size: larger">Kitten</span>
          <div>Egg - L</div>
          <span style="font-size: larger">$20.00</span>
        </div>

          <wa-select placeholder="1">
            <wa-option value="option-1">1</wa-option>
            <wa-option value="option-2">2</wa-option>
            <wa-option value="option-3">3</wa-option>
          </wa-select>
          <wa-icon-button name="close" variant="solid" label="Settings"></wa-icon-button>

      </div>
       <div style="display: flex;justify-content: flex-start;align-items: baseline;">
        <wa-icon name="check" style="color: green; margin-right: 0.5rem;"></wa-icon> In Stock
        </div>

    </div>
  </section>


  </div>
  <wa-card with-header class="card-header second-column">
  <div slot="header">
    Order Summary

  </div>
  <div style="display:flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
    <span>Subtotal</span>
    <span>$55.00</span>
  </div>
  <div style="display:flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
    <span>Shipping</span>
    <span>$5.00</span>
  </div>
  <div style="display:flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
    <span>Tax</span>
    <span>$5.50</span>
  </div>
  <div style="display:flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
    <span>Order Total</span>
    <span>$65.50</span>
  </div>

  <wa-button size="medium" variant="brand" style="width: 100%; margin-bottom: 1rem;">Checkout</wa-button>




</wa-card>

<style>
  :root {
    --border-color: var(--wa-color-surface-border);
  }
  .two-column {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: 1rem;

    .first-column {
      grid-column: 1/8;
    }

    .second-column {
      grid-column: 8/14
    }

    .cart-item {
      display: grid;
      grid-template-columns: 30% 61%;
      column-gap: 0.5rem;
      margin-bottom: 1rem;

       &:not(:last-of-type) {
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
    }


    }

    .cart-item-meta {
            display: grid;
    grid-template-columns: 45% 35% 20%;
    column-gap: 1rem;
      }


    h1 {
      width: 100%;
    grid-column: 1 / end;
    }
  }
</style>
</div>
```

### Single Column Cart

```html {.example}
<div class="single-column">
  <h1>Shopping Cart</h1>
  <div class="first-half half">
    <section class="cart-item">
    <img class="cart-item-image" src="https://images.unsplash.com/photo-1594787317357-dcda50fd1d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDI4MDd8&ixlib=rb-4.0.3&q=80&w=1080" alt="" >
    <div>
      <span style="display: flex;justify-content: space-between;">
        <span><strong>Convertible</strong></span>
        <span>$32.00</span>
      </span>
      <div>Eggplant</div>

       <div style="display: flex;justify-content: space-between;align-items: baseline;">
        <span><wa-icon name="check" style="color: green; margin-right: 0.5rem;"></wa-icon> In Stock</span>
        <wa-button appearance="plain" size="small">Remove</wa-button>
        </div>
    </div>


  </section>
  <section class="cart-item">
    <img class="cart-item-image" src="https://images.unsplash.com/photo-1597670250484-0e9aff7f8804?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDI4NTB8&ixlib=rb-4.0.3&q=80&w=1080" alt="" >
    <div>
      <span style="display: flex;justify-content: space-between;">
        <span><strong>Pickup</strong></span>
        <span>$32.00</span>
      </span>
      <div>Sky Blue</div>

       <div style="display: flex;justify-content: space-between;align-items: baseline;">
        <span><wa-icon name="check" style="color: green; margin-right: 0.5rem;"></wa-icon> In Stock</span>
        <wa-button appearance="plain" size="small">Remove</wa-button>
        </div>
    </div>


  </section>
  <section class="cart-item">
    <img class="cart-item-image" src="https://images.unsplash.com/photo-1594787826350-19386fdb2363?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDI4ODV8&ixlib=rb-4.0.3&q=80&w=1080" alt="" >
    <div>
      <span style="display: flex;justify-content: space-between;">
        <span><strong>Volkswagon T2</strong></span>
        <span>$32.00</span>
      </span>
      <div>Red/White</div>

       <div style="display: flex;justify-content: space-between;align-items: baseline;">
        <span><wa-icon name="check" style="color: green; margin-right: 0.5rem;"></wa-icon> In Stock</span>
        <wa-button appearance="plain" size="small">Remove</wa-button>
        </div>
    </div>


  </section>
   <div slot="footer">
    <div style="display:flex; justify-content: space-between; font-weight: 600;">
      <span>Subtotal</span>
      <span>$96.00</span>
    </div>
    <div style="font-size: small; margin-bottom: 1rem;">Shipping and taxes calculated at checkout.</div>
   <wa-button size="medium" variant="brand" style="width: 100%; margin-bottom: 1rem;">Medium</wa-button>
    or <a href="#">Continue shopping <wa-icon-button name="arrow-right" variant="solid" label="Settings"></wa-icon-button></a>
  </div>

  </div>
</div>
<style>
  :root {
    --border-color: var(--wa-color-surface-border);
  }
  .single-column {
    .cart-item {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      column-gap: 1rem;
      margin-bottom: 1rem;

       &:not(:last-of-type) {
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
    }

    img {
      grid-column: 1/4;
      width: 100%;
      object-fit: cover;
      height: 90px;
    }

    div {
      grid-column: 4/-1;
      align-content: center;
    }


    }
  }
</style>
```