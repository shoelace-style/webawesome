---
title: Order History
description: 'Empower your customers to view past purchases and track upcoming orders with comprehensive order histories.'
parent: ecommerce
tags: e-commerce
---

## Order Panels
```html {.example}
<div>
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
      <span>$95.00</span>
    </span>
      <span style="display: grid;grid-template-columns: 1fr 1fr;column-gap: 1rem;">
        <wa-button variant="neutral" appearance="outlined">View Order</wa-button>
        <wa-button variant="neutral" appearance="outlined">View Invoice</wa-button>
      </span>
  </div>
  <div class="wa-stack">
    <div class="wa-flank">
      <img src="https://images.unsplash.com/photo-1628304433247-804066a9864c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDMxODN8&ixlib=rb-4.0.3&q=80&w=1080" style="max-width: 215px">
      <div>
        <span class="wa-split">
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
    <div class="wa-flank">
      <img src="https://images.unsplash.com/photo-1628304433247-804066a9864c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDMxODN8&ixlib=rb-4.0.3&q=80&w=1080" style="max-width: 215px">
      <div>
        <span class="wa-split">
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
    <div class="wa-flank">
      <img src="https://images.unsplash.com/photo-1628304433247-804066a9864c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDMxODN8&ixlib=rb-4.0.3&q=80&w=1080" style="max-width: 215px">
      <div>
        <span class="wa-split">
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
    <div class="wa-flank">
      <img src="https://images.unsplash.com/photo-1628304433247-804066a9864c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDMxODN8&ixlib=rb-4.0.3&q=80&w=1080" style="max-width: 215px">
      <div>
        <span class="wa-split">
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
<div class="invoice-table">
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
          $238.00
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
            <img src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&q=80" style="width: calc(1rem* 8);margin-right: .5rem;" />
            <div>
              <div>Machined Pen and Pencil Set</div>
              <div>$70.00</div>
            </div>
          </div>
        </td>
        <td>$70.00</td>
        <td>Delivered Jan 25, 2021</td>
        <td><a href="#">View</a></td>
      </tr>
      <tr>
        <td>
          <div class="wa-split wa-align-items-start" style="justify-content: flex-start;">
            <img src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&q=80" style="width: calc(1rem* 8);margin-right: .5rem;" />
            <div>
              <div>Machined Pen and Pencil Set</div>
              <div>$70.00</div>
            </div>
          </div>
        </td>
        <td>$70.00</td>
        <td>Delivered Jan 25, 2021</td>
        <td><a href="#">View</a></td>
      </tr>
      <tr>
        <td>
          <div class="wa-split wa-align-items-start"" style="justify-content: flex-start;">
            <img src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&q=80" style="width: calc(1rem* 8);margin-right: .5rem;" />
            <div>
              <div>Machined Pen and Pencil Set</div>
              <div>$70.00</div>
            </div>
          </div>
        </td>
        <td>$70.00</td>
        <td>Delivered Jan 25, 2021</td>
        <td><a href="#">View</a></td>
      </tr>
      <tr>
        <td>
          <div class="wa-split wa-align-items-start" style="justify-content: flex-start;">
            <img src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&q=80" style="width: calc(1rem* 8);margin-right: .5rem;" />
            <div>
              <div>Machined Pen and Pencil Set</div>
              <div>$70.00</div>
            </div>
          </div>
        </td>
        <td>$70.00</td>
        <td>Delivered Jan 25, 2021</td>
        <td><a href="#">View</a></td>
      </tr>
    </tbody>
  </table>
</div>
```

## List with Quick Actions
```html{.example}
```
