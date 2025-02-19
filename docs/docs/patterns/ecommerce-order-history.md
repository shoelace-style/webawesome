---
title: Order History
description: 'Empower your customers to view past purchases and track upcoming orders with comprehensive order histories.'
parent: ecommerce
tags: e-commerce
---

## List
```html {.example}
<div style="max-width: 960px; margin: 0 auto;">
  <h2>Order History</h2>
  <p>Check the status of recent orders, manage returns, and download invoices.</p>
  <div class="order-history-meta wa-split" style="margin-bottom: var(--wa-space-xl);">
    <span class="wa-stack wa-gap-0">
      <strong>Order number</strong>
      <span>WU88191111</span>
    </span>
    <span class="wa-stack wa-gap-0">
      <strong>Date placed</strong>
      <span>January 22, 2021</span>
    </span>
    <span class="wa-stack wa-gap-0">
      <strong>Total amount</strong>
      <span>$590.00</span>
    </span>
      <span style="display: grid;grid-template-columns: 1fr 1fr;column-gap: 1rem;">
        <wa-button variant="neutral" appearance="outlined">View Order</wa-button>
        <wa-button variant="neutral" appearance="outlined">View Invoice</wa-button>
      </span>
  </div>
  <div class="wa-stack">
    <div class="wa-flank" style="border-bottom: 1px solid var(--border-color);padding-bottom: 1rem;">
      <img src="https://img.fortawesome.com/cfa83f3c/light-fixtures.jpg" style="max-width: 215px">
      <div>
        <span class="wa-split">
          <span><strong>Dome Light Fixtures</strong></span>
          <span><strong>$215.00</strong></span>
        </span>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae tincidunt nulla. Suspendisse eu augue mauris. Morbi ut euismod sem.</p>
        <div class="wa-split">
          <span>
            <wa-button appearance="plain" variant="neutral">View Product</wa-button><wa-button appearance="accent" variant="brand">Buy Again</wa-button>
        </span>
        <wa-badge appearance="filled" variant="success">Delivered</wa-badge>
        </div> 
      </div>
    </div>
    <div class="wa-flank" style="border-bottom: 1px solid var(--border-color);padding-bottom: 1rem;">
      <img src="https://img.fortawesome.com/cfa83f3c/modern-chair.jpg" style="max-width: 215px">
      <div>
        <span class="wa-split">
          <span><strong>Reading Chair</strong></span>
          <span><strong>$115.00</strong></span>
        </span>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae tincidunt nulla. Suspendisse eu augue mauris. Morbi ut euismod sem.</p>
        <div class="wa-split">
          <span>
          <wa-button appearance="plain" variant="neutral">View Product</wa-button><wa-button appearance="accent" variant="brand">Buy Again</wa-button>
        </span>
        <wa-badge appearance="filled" variant="brand">Out for delivery</wa-badge>
        </div>
      </div>
    </div>
    <div class="wa-flank" style="border-bottom: 1px solid var(--border-color);padding-bottom: 1rem;">
      <img src="https://img.fortawesome.com/cfa83f3c/sofa.jpg" style="max-width: 215px">
      <div>
        <span class="wa-split">
          <span><strong>Custom Sofa</strong></span>
          <span><strong>$260.00</strong></span>
        </span>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae tincidunt nulla. Suspendisse eu augue mauris. Morbi ut euismod sem.</p>
        <div class="wa-split">
          <span>
          <wa-button appearance="plain" variant="neutral">View Product</wa-button><wa-button appearance="accent" variant="brand">Buy Again</wa-button>
        </span>
         <wa-badge appearance="filled" variant="neutral">Preparing to ship</wa-badge>
        </div>
      </div>
    </div>
  </div>
</div>
<style>
   :root {
    --border-color: var(--wa-color-surface-border);
  }
</style>
```

## Invoice Table
```html{.example}
<div style="max-width: 960px; margin: 0 auto;">
  <div class="invoice-totals wa-split" style="background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)); padding-inline: 1rem; padding-block: 1rem;">
    <dl class="wa-grid" style="grid-template-columns: repeat(3, 1fr); --wa-space-xl: 0;">
      <div>
        <dt>Date Placed</dt>
        <dd style="--wa-space-m: 0;">
          <time datetime="2021-01-22">January 22, 2021</time>
        </dd>
      </div>
      <div>
        <dt>Order Number</dt>
        <dd style="--wa-space-m: 0;">
          WU88191111
        </dd>
      </div>
      <div>
        <dt>Total Amount</dt>
        <dd style="--wa-space-m: 0;">
          $590.00
        </dd>
      </div>
    </dl>
    <wa-button>View Invoice</wa-button>
  </div>
  <table class="wa-zebra-rows wa-brand">
    <caption>Order History</caption>
    <thead>
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Status</th>
        <th>info</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div class="wa-split wa-align-items-start" style="justify-content: flex-start;">
            <img src="https://img.fortawesome.com/cfa83f3c/light-fixtures.jpg" style="width: calc(1rem* 8);margin-right: .5rem;" />
            <div>
              <div>Dome Light Fixtures</div>
            </div>
          </div>
        </td>
        <td>$215.00</td>
        <td>Delivered Jan 25, 2021</td>
        <td><a href="#">View</a></td>
      </tr>
      <tr>
        <td>
          <div class="wa-split wa-align-items-start" style="justify-content: flex-start;">
            <img src="https://img.fortawesome.com/cfa83f3c/modern-chair.jpg" style="width: calc(1rem* 8);margin-right: .5rem;" />
            <div>
              <div>Reading Chair</div>
            </div>
          </div>
        </td>
        <td>$115.00</td>
        <td>Delivered Jan 25, 2021</td>
        <td><a href="#">View</a></td>
      </tr>
      <tr>
        <td>
          <div class="wa-split wa-align-items-start" style="justify-content: flex-start;">
            <img src="https://img.fortawesome.com/cfa83f3c/sofa.jpg" style="width: calc(1rem* 8);margin-right: .5rem;" />
            <div>
              <div>Custom Sofa</div>   
            </div>
          </div>
        </td>
        <td>$260.00</td>
        <td>Delivered Jan 25, 2021</td>
        <td><a href="#">View</a></td>
      </tr>
    </tbody>
  </table>
</div>
```

<!-- ## List with Quick Actions
```html{.example}
``` -->
