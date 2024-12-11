---
title: E-commerce - Order History
description: TODO
layout: pattern.njk
---

TODO Page Description


### Order History

```html {.example}
<div>
  <h2>Order History</h2>
  <p>Check the status of recent orders, manage returns, and download invoices.</p>
  <div class="order-history-meta">
    <span class="order-history-meta-item">
      <strong>Order number</strong>
      <span>WU88191111</span>
    </span>
       <span class="order-history-meta-item">
      <strong>Date placed</strong>
      <span>January 22, 2021</span>
    </span>
       <span class="order-history-meta-item">
      <strong>Total amount</strong>
      <span>$95.00</span>
    </span>
      <span style="display: grid;grid-template-columns: 1fr 1fr;column-gap: 1rem;">
        <wa-button variant="neutral" appearance="outlined">View Order</wa-button>
        <wa-button variant="neutral" appearance="outlined">View Invoice</wa-button>
      </span>
  </div>
  <div>
    <div class="order-history-list-item" style="align-items: center;">
      <img class="cart-item-image" src="https://images.unsplash.com/photo-1628304433247-804066a9864c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDMxODN8&ixlib=rb-4.0.3&q=80&w=1080" alt="">
      <div>
        <span style="display: flex;justify-content: space-between;">
          <span><strong>Kitchen Stool</strong></span>
          <span><strong>$55.00</strong></span>
        </span>
        <p>TODO: add a description</p>
        <span>
          <a href="#">View Product</a> |  <a href="#">Buy Again</a>
        </span>
        <br/>
        <span>Out for Delivery</span>
      </div>
    </div>
    <div class="order-history-list-item" style="margin-top: 1rem; align-items: center;">
      <img class="cart-item-image" src="https://plus.unsplash.com/premium_photo-1675705062445-0c14a42d4289?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDMwODJ8&ixlib=rb-4.0.3&q=80&w=1080" alt="">
      <div>
        <span style="display: flex;justify-content: space-between;">
          <span><strong>Succulent</strong></span>
          <span><strong>$5.00</strong></span>
        </span>
        <p>TODO: add a description</p>
        <span>
          <a href="#">View Product</a> |  <a href="#">Buy Again</a>
        </span>
        <br/>
        <span>Out for Delivery</span>
      </div>
    </div>
    <div class="order-history-list-item" style="margin-top: 1rem; align-items: center;">
      <img class="cart-item-image" src="https://images.unsplash.com/photo-1613536844480-ac5d7b1b6ed1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDMyMzh8&ixlib=rb-4.0.3&q=80&w=1080" alt="">
      <div>
        <span style="display: flex;justify-content: space-between;">
          <span><strong>French Roast</strong></span>
          <span><strong>$35.00</strong></span>
        </span>
        <p>TODO: add a description</p>
        <span>
          <a href="#">View Product</a> |  <a href="#">Buy Again</a>
        </span>
        <br/>
        <span>Out for Delivery</span>
      </div>
    </div>
  </div>
</div>
<style>
   :root {
    --border-color: var(--wa-color-surface-border);
  }
  .order-history-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;

    .order-history-meta-item {
      display: flex;
      flex-direction: column;
    }

  }

  .order-history-list-item {
        display: grid;
    grid-template-columns: 18% 79%;
    column-gap: 1rem;
        border-bottom: 1px solid var(--border-color);
    padding-bottom: 1rem;
  }
</style>
```