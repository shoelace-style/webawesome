---
title: Order History
description: 'Empower your customers to view past purchases and track upcoming orders with comprehensive order histories.'
isPro: true
---

## List

```html {.example}
<div class="wa-stack wa-gap-2xl">
  <h2>Order History</h2>
  <p class="wa-caption-m">Check the status of recent orders, manage returns, and download invoices.</p>
  <dl class="wa-split">
    <span class="wa-stack wa-gap-0">
      <dt>Order number</dt>
      <dd>WU88191111</dd>
    </span>
    <span class="wa-stack wa-gap-0">
      <dt>Date placed</dt>
      <dd>January 22, 2021</dd>
    </span>
    <span class="wa-stack wa-gap-0">
      <dt>Total amount</dt>
      <dd>$590.00</dd>
    </span>
    <span class="wa-cluster">
      <wa-button variant="neutral" appearance="outlined">View Order</wa-button>
      <wa-button variant="neutral" appearance="outlined">View Invoice</wa-button>
    </span>
  </dl>
  <wa-divider></wa-divider>
  <div class="wa-flank" style="--flank-size: 12rem">
    <div class="wa-frame wa-border-radius-s" style="aspect-ratio: 3 / 2">
      <img
        src="https://img.fortawesome.com/cfa83f3c/light-fixtures.jpg"
        alt=""
      />
    </div>
    <div class="wa-stack">
      <div class="wa-split">
        <span><strong>Dome Light Fixtures</strong></span>
        <span><strong>$215.00</strong></span>
      </div>
      <p class="wa-caption-m">Illuminate your space with elegance and style with stunning Dome Light Fixtures. The shape of these lights complements both modern and traditional interiors.</p>
      <div class="wa-split">
        <wa-badge appearance="filled" variant="success">Delivered</wa-badge>
        <div class="wa-cluster">
          <wa-button size="small" appearance="plain" variant="neutral">View Product</wa-button>
          <wa-button size="small" appearance="accent" variant="brand">Buy Again</wa-button>
        </div>
      </div>
    </div>
  </div>
  <wa-divider></wa-divider>
  <div class="wa-flank" style="--flank-size: 12rem">
    <div class="wa-frame wa-border-radius-s" style="aspect-ratio: 3 / 2">
      <img
        src="https://img.fortawesome.com/cfa83f3c/modern-chair.jpg"
        alt=""
      />
    </div>
    <div class="wa-stack">
      <div class="wa-split">
        <span><strong>Reading Chair</strong></span>
        <span><strong>$115.00</strong></span>
      </div>
      <p class="wa-caption-m">Add a pop of color and a touch of elegance to any room with our Reading Chair featuring vibrant yellow fabric upholstery.</p>
      <div class="wa-split">
        <wa-badge appearance="filled" variant="brand">Out for delivery</wa-badge>
        <div class="wa-cluster">
          <wa-button size="small" appearance="plain" variant="neutral">View Product</wa-button>
          <wa-button size="small" appearance="accent" variant="brand">Buy Again</wa-button>
        </div>
      </div>
    </div>
  </div>
  <wa-divider></wa-divider>
  <div class="wa-flank" style="--flank-size: 12rem">
    <div class="wa-frame wa-border-radius-s" style="aspect-ratio: 3 / 2">
      <img
        src="https://img.fortawesome.com/cfa83f3c/sofa.jpg"
        alt=""
      />
    </div>
    <div class="wa-stack">
      <div class="wa-split">
        <span><strong>Custom Sofa</strong></span>
        <span><strong>$260.00</strong></span>
      </div>
      <p class="wa-caption-m">Experience luxury and comfort like never before with our Custom Sofa, designed to elevate any living space. This sofa features exquisite velvet upholstery for an air of sophistication.</p>
      <div class="wa-split">
        <wa-badge appearance="filled" variant="neutral">Preparing to ship</wa-badge>
        <div class="wa-cluster">
          <wa-button size="small" appearance="plain" variant="neutral">View Product</wa-button>
          <wa-button size="small" appearance="accent" variant="brand">Buy Again</wa-button>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Invoice Table

```html {.example}
<div class="wa-stack wa-gap-2xl">
  <wa-callout appearance="filled" variant="neutral">
    <div class="wa-flank:end wa-align-items-center">
      <dl class="wa-grid">
        <div class="wa-stack wa-gap-0">
          <dt>Date Placed</dt>
          <dd>
            <wa-format-date date="2021-01-22" month="long" day="numeric" year="numeric"></wa-format-date>
          </dd>
        </div>
        <div class="wa-stack wa-gap-0">
          <dt>Order Number</dt>
          <dd>WU88191111</dd>
        </div>
        <div class="wa-stack wa-gap-0">
          <dt>Total Amount</dt>
          <dd>$590.00</dd>
        </div>
      </dl>
      <wa-button>View Invoice</wa-button>
    </div>
  </wa-callout>
  <table>
    <thead>
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Status</th>
        <th>Info</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div class="wa-cluster wa-align-items-start">
            <div class="wa-frame:landscape wa-border-radius-s" style="max-width: 8rem">
              <img
                src="https://img.fortawesome.com/cfa83f3c/light-fixtures.jpg"
                alt=""
              />
            </div>
            <span>Dome Light Fixtures</span>
          </div>
        </td>
        <td>$215.00</td>
        <td>Delivered Jan 25, 2021</td>
        <td><a href="">View</a></td>
      </tr>
      <tr>
        <td>
          <div class="wa-cluster wa-align-items-start">
            <div class="wa-frame:landscape wa-border-radius-s" style="max-width: 8rem">
              <img
                src="https://img.fortawesome.com/cfa83f3c/modern-chair.jpg"
                alt=""
              />
            </div>
            <span>Reading Chair</span>
          </div>
        </td>
        <td>$115.00</td>
        <td>Delivered Jan 25, 2021</td>
        <td><a href="">View</a></td>
      </tr>
      <tr>
        <td>
          <div class="wa-cluster wa-align-items-start">
            <div class="wa-frame:landscape wa-border-radius-s" style="max-width: 8rem">
              <img
                src="https://img.fortawesome.com/cfa83f3c/sofa.jpg"
                alt=""
              />
            </div>
            <span>Custom Sofa</span>
          </div>
        </td>
        <td>$260.00</td>
        <td>Delivered Jan 25, 2021</td>
        <td><a href="">View</a></td>
      </tr>
    </tbody>
  </table>
</div>
```
## Card separated
```html{.example}
<div class="wa-stack" style="max-width: 60ch; margin: 0 auto;">
  <wa-card>
    <div class="wa-flank:end">
      <div class="wa-stack">
        <div class="wa-cluster wa-gap-xs">
          <wa-avatar shape="rounded" label="Avatar with an image icon">
            <wa-icon slot="icon"family="brands" name="amazon"></wa-icon>
          </wa-avatar>
          <span class="wa-heading-s">Amazon</span>
        </div>
        <div class="wa-stack wa-gap-xs">
          <span>Expected Tomorrow</span>
          <wa-progress-bar value="75" label="delivery progress" style="height: 0.5rem;"></wa-progress-bar>
        </div>
      </div>
      <div class="wa-frame wa-border-radius-m" style="max-width: 6rem;">
        <img src="https://images.unsplash.com/photo-1589810635657-232948472d98?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank:end">
      <div class="wa-stack">
        <div class="wa-cluster wa-gap-xs">
          <wa-avatar shape="rounded" label="Avatar with an image icon">
            <wa-icon slot="icon" family="sharp" variant="light" name="shirt"></wa-icon>
          </wa-avatar>
          <span class="wa-heading-s">T-shirt Depot</span>
        </div>
        <div class="wa-stack wa-gap-xs">
          <span>Out for Delivery</span>
          <wa-progress-bar value="95" label="delivery progress" style="height: 0.5rem;"></wa-progress-bar>
        </div>
      </div>
      <div class="wa-frame wa-border-radius-m" style="max-width: 6rem;">
        <img src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank:end">
      <div class="wa-stack">
        <div class="wa-cluster wa-gap-xs">
          <wa-avatar shape="rounded" label="Avatar with an image icon">
            <wa-icon slot="icon"  variant="duotone" name="gamepad-modern"></wa-icon>
          </wa-avatar>
          <span class="wa-heading-s">Game Theory</span>
        </div>
        <div class="wa-stack wa-gap-xs">
          <span>Shipping Soon</span>
          <wa-progress-bar value="15" label="delivery progress" style="height: 0.5rem;"></wa-progress-bar>
        </div>
      </div>
      <div class="wa-frame wa-border-radius-m" style="max-width: 6rem;">
        <img src="https://images.unsplash.com/photo-1627421383054-488d9c9828f5?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </div>
    </div>
  </wa-card>
</div>
```