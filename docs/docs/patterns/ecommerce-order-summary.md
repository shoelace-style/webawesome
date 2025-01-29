---
title: Order Summary
description: TODO
parent: ecommerce
tags: e-commerce
---

TODO Page Description

## With image
```html{.example}
<div class="order-summary">
 <wa-card with-image with-footer class="card-overview">
  <img
    slot="image"
    src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
    alt="A kitten sits patiently between a terracotta pot and decorative grasses."
  />

  <span>Payment Successful</span>
  <h1>Thanks for Ordering</h1>
  <p>We appreciate your order, we’re currently processing it. So hang tight and we’ll send you confirmation very soon!</p>
  <dl>
    <dt>Tracking number</dt>
    <dd style="--wa-space-m: 0;">51547878755545848512</dd>
  </dl>
  <ul style="list-style-type: none; margin: 0">
    <li class="wa-split">
      <img style="object-fit: cover; margin-inline-end: 1rem;" src="https://images.unsplash.com/photo-1687539203170-907f641c35fc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRhaXN5fGVufDB8MXwwfHx8Mg%3D%3D" alt="" width="96" />
      <div style="flex:auto;">
        <h3 style="margin: 0">Basic Tee</h3>
        <p style="margin: 0">Charcoal</p>
        <p style="margin: 0">L</p>
      </div>
      <div style="flex:none;">$36.00</div>
    </li>
     <li class="wa-split">
      <img style="object-fit: cover; margin-inline-end: 1rem;" src="https://images.unsplash.com/photo-1687539203170-907f641c35fc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRhaXN5fGVufDB8MXwwfHx8Mg%3D%3D" alt="" width="96" />
      <div style="flex:auto;">
        <h3 style="margin: 0">Basic Tee</h3>
        <p style="margin: 0">Charcoal</p>
        <p style="margin: 0">L</p>
      </div>
      <div style="flex:none;">$36.00</div>
    </li>
  </ul>
  <dl>
    <div class="wa-split">
      <dt>Subtotal</dt>
      <dd class="baw">$72.00</dd>
    </div>
    <div class="wa-split">
      <dt>Shipping</dt>
      <dd class="baw">$8.00</dd>
    </div>
    <div class="wa-split">
      <dt>Taxes</dt>
      <dd class="baw">$6.40</dd>
    </div>
    <div class="wa-split" style="border-top: var(--wa-panel-border-width) var(--wa-panel-border-style) var(--wa-color-surface-border);margin-top: 1rem;padding-top: 1rem;">
      <dt class="ayn">Total</dt>
      <dd class="ayn">$86.40</dd>
    </div>
  </dl>
  <dl class="wa-grid">
    <div>
      <dt>Shipping Address</dt>
      <dd style="margin: 0;">
        <address class="bdw">
          <span class="ky">Kristin Watson</span>
          <span class="ky">7363 Cynthia Pass</span>
          <span class="ky">Toronto, ON N3Y 4H8</span>
        </address>
      </dd>
    </div>
    <div>
      <dt>Payment Information</dt>
      <dd class="wa-split" style="margin: 0; justify-content: flex-start;">
        <div>
          <wa-icon family="brands" name="cc-visa" style="color: #224DBA; margin-right: 1rem;"></wa-icon>
        </div>
        <div>
          <p style="margin: 0">Ending with 4242</p>
          <p style="margin: 0">Expires 12 / 21</p>
        </div>
      </dd>
    </div>
  </dl>
<div slot="footer">
    <wa-button size="large" style="width: 100%;" appearance="plain">
      <wa-icon slot="suffix" name="arrow-right" variant="solid"></wa-icon>
    Continue Shopping
  </wa-button>
  </div>
  
</wa-card>
</div>
<style>
  .order-summary {
    max-width: 960px;
    margin: 0 auto;
    
    ul {
    :where(& > :not(:last-child)) {
      border-top: var(--wa-panel-border-width) var(--wa-panel-border-style) var(--wa-color-surface-border);
      border-bottom: var(--wa-panel-border-width) var(--wa-panel-border-style) var(--wa-color-surface-border);
    }
    li {
      padding-block: 1rem;
    }
    }
  }
</style>
```

## With Progress Bar
```html{.example}
<div class="order-summary-progress-bar">
  <div>
    <div>
      <h1>Order #54879</h1>
      <a href="#">View Invoice <wa-icon fixed-width name="arrow-right"></wa-icon></a>
      <p>Order placed March 22, 2021</p>
    </div>
    
  </div>
  <wa-card with-image with-footer>
    <img slot="image" src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"/>
    <div>
      
      <div>
        <h3>Title</h3>
        <span>subtitle</span>
        <p>This durable and portable insulated tumbler will keep your beverage at the perfect temperature during your next adventure.</p>
      </div>
    </div>
    <div>
      <dl class="wa-grid">
        <div>
          <dt>Delivery Address</dt>
          <dd style="--wa-space-m: 0;">
            <address>
              Floyd Miles
              7363 Cynthia Pass
              Toronto, ON N3Y 4H8
            </address>
          </dd>
        </div>
        <div>
          <dt>Shipping Updates</dt>
          <dd style="--wa-space-m: 0;">
            <p style="--wa-space-xl: 0">email</p>
            <p style="--wa-space-xl: 0">phone number</p>
            <wa-button size="small" appearance="plain" style="--wa-space: 0;--wa-space-m: 0;">Update</wa-button>
          </dd>
        </div>
      </dl>
    </div>
    <div slot="footer">
      <p style="--wa-space-xl: 0.75rem;">Preparing to ship soon!</p>
    <wa-progress-bar value="50" label="Upload progress"></wa-progress-bar>
    <div class="wa-grid">
      <p>Order Received</p>
      <p style="text-align: center;">Preparing Shipment</p>
      <p style="text-align: center;">In Transit</p>
      <p style="text-align: right;">Delivered</p>
    </div>
  </div>
  </wa-card>
</div>
<style>
  .order-summary-progress-bar {
    max-width: 960px;
    margin: 0 auto;
  }
</style>
```

## Split Image
```html{.example}
<div class="split-image">
<wa-card>
  <img src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" style="border-top-left-radius: var(--wa-panel-border-radius); border-bottom-left-radius: var(--wa-panel-border-radius); height: 100%; object-fit: cover;"/>
  <div style="padding: var(--spacing);">
    <span>Payment Successful</span>
    <h1>Thanks for Ordering</h1>
    <p>We appreciate your order, we’re currently processing it. So hang tight and we’ll send you confirmation very soon!</p>
    <dl>
    <dt>Tracking number</dt>
    <dd style="--wa-space-m: 0;">51547878755545848512</dd>
  </dl>
    <ul style="list-style-type: none; margin: 0">
    <li style="display: flex;">
      <img style="object-fit: cover; margin-inline-end: 1rem;" src="https://images.unsplash.com/photo-1687539203170-907f641c35fc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRhaXN5fGVufDB8MXwwfHx8Mg%3D%3D" alt="" width="96" />
      <div style="flex:auto;">
        <h3 style="margin: 0">Basic Tee</h3>
        <p style="margin: 0">Charcoal</p>
        <p style="margin: 0">L</p>
      </div>
      <div style="flex:none;">$36.00</div>
    </li>
    <li style="display: flex;">
      <img style="object-fit: cover; margin-inline-end: 1rem;" src="https://images.unsplash.com/photo-1687539203170-907f641c35fc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRhaXN5fGVufDB8MXwwfHx8Mg%3D%3D" alt="" width="96" />
      <div style="flex:auto;">
        <h3 style="margin: 0">Basic Tee</h3>
        <p style="margin: 0">Charcoal</p>
        <p style="margin: 0">L</p>
      </div>
      <div style="flex:none;">$36.00</div>
    </li>
    
  </ul>
   <dl>
    <div style="display:flex; justify-content: space-between">
      <dt>Subtotal</dt>
      <dd class="baw">$72.00</dd>
    </div>
    <div style="display:flex; justify-content: space-between">
      <dt>Shipping</dt>
      <dd class="baw">$8.00</dd>
    </div>
    <div style="display:flex; justify-content: space-between">
      <dt>Taxes</dt>
      <dd class="baw">$6.40</dd>
    </div>
    <div style="display:flex;justify-content: space-between;border-top: var(--wa-panel-border-width) var(--wa-panel-border-style) var(--wa-color-surface-border);margin-top: 1rem;padding-top: 1rem;">
      <dt class="ayn">Total</dt>
      <dd class="ayn">$86.40</dd>
    </div>
  </dl>
  </div>
</wa-card>
</div>

<style>
  .split-image {
    wa-card::part(body) {
    display: grid;
    grid-template-columns: 40% 1fr;
    padding: 0;

    
  }

  ul {
    :where(& > :not(:last-child)) {
      border-top: var(--wa-panel-border-width) var(--wa-panel-border-style) var(--wa-color-surface-border);
      border-bottom: var(--wa-panel-border-width) var(--wa-panel-border-style) var(--wa-color-surface-border);
    }
    li {
      padding-block: 1rem;
    }
    }
  }
  
</style>
```