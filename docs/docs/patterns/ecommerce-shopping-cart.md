---
title: Shopping Cart
description: 'Give shoppers an overview of selected items with shopping carts that let them edit items and proceed to checkout.'
parent: ecommerce
tags: e-commerce
---

## Slide Over

```html {.example}
<wa-card with-header with-footer class="card-header" style="width: 500px; margin: 0 auto;">
  <div slot="header" class="wa-split">
    <strong>Shopping Cart</strong>
    <wa-icon-button name="close" variant="solid" label="Settings"></wa-icon-button>
  </div>
    <section class="cart-item wa-split" style="margin-bottom: 1rem;padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
    <img src="https://images.unsplash.com/photo-1704677982224-89cd6d039fa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDEwOTJ8&ixlib=rb-4.0.3&q=80&w=1080" alt="" width="300" style="width: 6rem;flex-grow: 1;">
    <div style="flex-grow: 11;"> 
      <div class="wa-split" style="font-weight: 600;">
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
   <section class="wa-split" style="margin-bottom: 1rem;padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
    <img src="https://plus.unsplash.com/premium_photo-1707932485795-1d0aed727376?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDE2NDl8&ixlib=rb-4.0.3&q=80&w=1080" alt="" width="300" style="width: 6rem;flex-grow: 1;">
    <div style="flex-grow: 11;"> 
      <div class="wa-split" style="font-weight: 600;">
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
   <section class="cart-item wa-split" style="margin-bottom: 1rem;padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
    <img src="https://plus.unsplash.com/premium_photo-1690347839113-b5db143123b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDE5MTB8&ixlib=rb-4.0.3&q=80&w=1080" alt="" width="300" style="width: 6rem;flex-grow: 1;">
    <div style="flex-grow: 11;"> 
      <div class="wa-split" style="font-weight: 600;">
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
```

## Two Columns

```html {.example}
<div style="max-width: 960px; margin: 0 auto;">
  <h1>Shopping Cart</h1>
  <div class="wa-grid">
    <div class="wa-stack">
      <section class="wa-grid" style="border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
        <img class="cart-item-image" src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDIzNDd8&ixlib=rb-4.0.3&q=80&w=1080" alt="" >
        <div class="wa-flank">
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
     <section class="wa-grid" style="border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
        <img class="cart-item-image" src="https://images.unsplash.com/photo-1564859227552-81fde4a1df0b?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" >
        <div class="wa-flank">
          <div>
            <div>
              <h3 style="margin-bottom: 0">RVCA Graphic</h3>
            <p style="margin: 0;">Large - White</p>
            </div>
            <span>$25.00</span>
          </div>
          <wa-icon-button name="trash-can" variant="solid" label="Remove item"></wa-icon-button>
        </div>
      </section>
      <section class="wa-grid">
        <img class="cart-item-image" src="https://images.unsplash.com/photo-1503341733017-1901578f9f1e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" >
        <div class="wa-flank">
          <div>
            <div>
              <h3 style="margin-bottom: 0">Made Wild Graphic</h3>
            <p style="margin: 0;">Large - Black</p>
            </div>
            <span>$18.00</span>
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
    <span>$63.00</span>
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
    <span>$73.50</span>
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

## Single Column

```html {.example}
<div style="max-width: 960px; margin: 0 auto;">
  <h1>Shopping Cart</h1>
  <div class="wa-stack">
    <section class="wa-grid" style="padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
    <img class="cart-item-image" src="https://images.unsplash.com/photo-1594787317357-dcda50fd1d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDI4MDd8&ixlib=rb-4.0.3&q=80&w=1080" alt="" >
    <div>
      <span class="wa-split" style="margin-bottom: var(--wa-size);">
        <h2>Convertible</h2>
        <wa-tag size="small" variant="brand" appearance="filled" pill>Cherry Red</wa-tag>
      </span>
      
        <span>$32.00</span>
      
       <div class="wa-split">
        <wa-badge appearance="filled" variant="success">In Stock</wa-badge>
        <wa-button appearance="plain" size="small" variant="danger"><wa-icon slot="suffix" name="trash-can" variant="solid"></wa-icon>Remove</wa-button>
        </div>
    </div>
  </section>
  <section class="wa-grid" style="padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
    <img class="cart-item-image" src="https://images.unsplash.com/photo-1597670250484-0e9aff7f8804?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDI4NTB8&ixlib=rb-4.0.3&q=80&w=1080" alt="" >
    <div>
      <span class="wa-split" style="margin-bottom: var(--wa-size);">
        <h2>Racers - 3 Pack</h2>
        <wa-tag size="small" variant="brand" appearance="filled" pill>Assorted Colors</wa-tag>
      </span>
      
        <span>$60.00</span>
      
       <div class="wa-split">
        <wa-badge appearance="filled" variant="success">In Stock</wa-badge>
        <wa-button appearance="plain" size="small" variant="danger"><wa-icon slot="suffix" name="trash-can" variant="solid"></wa-icon>Remove</wa-button>
        </div>
    </div>
  </section>
  <section class="wa-grid" style="padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
    <img class="cart-item-image" src="https://images.unsplash.com/photo-1594787826350-19386fdb2363?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDI4ODV8&ixlib=rb-4.0.3&q=80&w=1080" alt="" >
    <div>
      <span class="wa-split" style="margin-bottom: var(--wa-size);">
        <h2>Volkswagen T2</h2>
        <wa-tag size="small" variant="brand" appearance="filled" pill>Red/White</wa-tag>
      </span>
      
        <span>$80.00</span>
      
       <div class="wa-split">
        <wa-badge appearance="filled" variant="success">In Stock</wa-badge>
        <wa-button appearance="plain" size="small" variant="danger"><wa-icon slot="suffix" name="trash-can" variant="solid"></wa-icon>Remove</wa-button>
        </div>
    </div>
  </section>
   <div slot="footer">
    <div style="display:flex; justify-content: space-between; font-weight: 600;">
      <span>Subtotal</span>
      <span>$172.00</span>
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
</style>
```