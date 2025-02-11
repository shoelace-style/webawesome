---
title: Shopping Cart
description: 'Provide customers with an overview of selected items, with the ability to update and remove products'
parent: ecommerce
tags: e-commerce
---

## Examples

### Slide Over

```html {.example}
<wa-card with-header with-footer class="card-header" style="width: 500px; margin: 0 auto;">
  <div slot="header" class="wa-split">
    <strong>Shopping Cart</strong>
    <wa-icon-button name="close" variant="solid" label="Settings"></wa-icon-button>
  </div>
    <section class="cart-item wa-split">
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
   <section class="cart-item wa-split">
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
   <section class="cart-item wa-split">
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
   <wa-button appearance="plain" size="medium" variant="brand" style="width: 100%; margin-bottom: 1rem;">Continue Shopping</wa-button>
  </div>
</wa-card>
<style>
  .cart-item {
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
<div>
  <h1>Shopping Cart</h1>
  <div class="wa-grid">
    <div>
      <section class="cart-item wa-flank">
        <img class="cart-item-image" src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDIzNDd8&ixlib=rb-4.0.3&q=80&w=1080" alt="" >
        <div class="wa-split">
          <div>
            <div>
              <h3 style="margin-bottom: 0">Classic Tee</h3>
            <p style="margin: 0;">Large - green</p>
            </div>
            <span>$20.00</span>
          </div>
          <wa-icon-button name="trash-can" variant="solid" label="Remove item"></wa-icon-button>
        </div>
      </section>
     <section class="cart-item wa-flank">
        <img class="cart-item-image" src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDIzNDd8&ixlib=rb-4.0.3&q=80&w=1080" alt="" >
        <div class="wa-split">
          <div>
            <div>
              <h3 style="margin-bottom: 0">Classic Tee</h3>
            <p style="margin: 0;">Large - green</p>
            </div>
            <span>$20.00</span>
          </div>
          <wa-icon-button name="trash-can" variant="solid" label="Remove item"></wa-icon-button>
        </div>
      </section><section class="cart-item wa-flank">
        <img class="cart-item-image" src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDIzNDd8&ixlib=rb-4.0.3&q=80&w=1080" alt="" >
        <div class="wa-split">
          <div>
            <div>
              <h3 style="margin-bottom: 0">Classic Tee</h3>
            <p style="margin: 0;">Large - green</p>
            </div>
            <span>$20.00</span>
          </div>
          <wa-icon-button name="trash-can" variant="solid" label="Remove item"></wa-icon-button>
        </div>
      </section>
    </div>
    <wa-card with-header class="card-header second-column">
  <div slot="header">
    Order Summary

  </div>
  <div class="wa-split" style="border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
    <span>Subtotal</span>
    <span>$55.00</span>
  </div>
  <div class="wa-split" style="border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
    <span>Shipping</span>
    <span>$5.00</span>
  </div>
  <div class="wa-split" style="border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
    <span>Tax</span>
    <span>$5.50</span>
  </div>
  <div class="wa-split" style="border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
    <span>Order Total</span>
    <span>$65.50</span>
  </div>

  <wa-button size="medium" variant="brand" style="width: 100%; margin-bottom: 1rem;">Checkout</wa-button>




</wa-card>
  </div>
</div>


<style>
  :root {
    --border-color: var(--wa-color-surface-border);
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