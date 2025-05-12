---
title: Shopping Cart
description: 'Give shoppers an overview of selected items with shopping carts that let them edit items and proceed to checkout.'
isPro: true
---

## Two Columns with Summary Card

```html {.example}
<div class="wa-stack wa-gap-2xl">
  <h2>Shopping Cart</h2>
  <div class="wa-grid wa-align-items-start wa-gap-2xl">
    <div class="wa-stack wa-gap-xl">
      <article class="wa-flank wa-gap-xl" style="--flank-size: 8rem">
        <div class="wa-frame wa-border-radius-m">
          <img
            src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDIzNDd8&ixlib=rb-4.0.3&q=80&w=1080"
            alt=""
          />
        </div>
        <div class="wa-flank:end wa-align-items-baseline">
          <div class="wa-stack wa-gap-xs">
            <h3 class="wa-heading-s">Classic Tee</h3>
            <span class="wa-caption-m">Sage Green</span>
            <span class="wa-caption-m">Large</span>
            <span>$20.00</span>
          </div>
          <wa-icon-button name="xmark" label="Remove" id="remove-1"></wa-icon-button>
          <wa-tooltip for="remove-1">Remove</wa-tooltip>
        </div>
      </article>
      <article class="wa-flank wa-gap-xl" style="--flank-size: 8rem">
        <div class="wa-frame wa-border-radius-m">
          <img
            src="https://images.unsplash.com/photo-1564859227552-81fde4a1df0b?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div class="wa-flank:end wa-align-items-baseline">
          <div class="wa-stack wa-gap-xs">
            <h3 class="wa-heading-s">RVCA Graphic</h3>
            <span class="wa-caption-m">White</span>
            <span class="wa-caption-m">Large</span>
            <span>$25.00</span>
          </div>
          <wa-icon-button name="xmark" label="Remove" id="remove-2"></wa-icon-button>
          <wa-tooltip for="remove-2">Remove</wa-tooltip>
        </div>
      </article>
      <article class="wa-flank wa-gap-xl" style="--flank-size: 8rem">
        <div class="wa-frame wa-border-radius-m">
          <img
            src="https://images.unsplash.com/photo-1503341733017-1901578f9f1e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div class="wa-flank:end wa-align-items-baseline">
          <div class="wa-stack wa-gap-xs">
            <h3 class="wa-heading-s">Stay Wild Graphic</h3>
            <span class="wa-caption-m">Black</span>
            <span class="wa-caption-m">Large</span>
            <span>$18.00</span>
          </div>
          <wa-icon-button name="xmark" label="Remove" id="remove-3"></wa-icon-button>
          <wa-tooltip for="remove-3">Remove</wa-tooltip>
        </div>
      </article>
    </div>
    <wa-card>
      <div slot="header">
        <h3 class="wa-heading-m">Order Summary</h3>
      </div>
      <div class="wa-stack">
        <div class="wa-split">
          <span class="wa-caption-l">Subtotal</span>
          <strong>$63.00</strong>
        </div>
        <wa-divider></wa-divider>
        <div class="wa-split">
          <span class="wa-caption-l">Shipping</span>
          <strong>$5.00</strong>
        </div>
        <wa-divider></wa-divider>
        <div class="wa-split">
          <span class="wa-caption-l">Tax</span>
          <strong>$5.50</strong>
        </div>
        <wa-divider></wa-divider>
        <div class="wa-split wa-body-l">
          <span>Total</span>
          <strong>$73.50</strong>
        </div>
        <wa-button variant="brand">Checkout</wa-button>
      </div>
    </wa-card>
  </div>
</div>
</div>
```

## Single Column

```html {.example}
<div class="wa-stack wa-gap-2xl" style="max-width: 60ch; margin: auto">
  <h2>Your Cart</h2>
  <wa-divider></wa-divider>
  <article class="wa-flank" style="--flank-size: 12rem">
    <div class="wa-frame wa-border-radius-m" style="aspect-ratio: 3 / 2">
      <img
        src="https://images.unsplash.com/photo-1594787317357-dcda50fd1d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDI4MDd8&ixlib=rb-4.0.3&q=80&w=1080"
        alt=""
      />
    </div>
    <div class="wa-split:column wa-align-items-stretch wa-gap-xs">
      <div class="wa-stack wa-gap-xs">
        <span class="wa-split wa-gap-xs">
          <h3 class="wa-heading-m">Convertible</h3>
          <span>$32.00</span>
        </span>
        <wa-tag size="small" variant="neutral" appearance="filled" pill style="width: fit-content">Cherry Red</wa-tag>
      </div>
      <div class="wa-split">
        <wa-badge appearance="filled" variant="success">In Stock</wa-badge>
        <wa-button appearance="plain" size="small" variant="danger">
          <wa-icon slot="suffix" name="trash"></wa-icon>
          Remove
        </wa-button>
      </div>
    </div>
  </article>
  <wa-divider></wa-divider>
  <article class="wa-flank" style="--flank-size: 12rem">
    <div class="wa-frame wa-border-radius-m" style="aspect-ratio: 3 / 2">
      <img
        src="https://images.unsplash.com/photo-1597670250484-0e9aff7f8804?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDI4NTB8&ixlib=rb-4.0.3&q=80&w=1080"
        alt=""
      />
    </div>
    <div class="wa-split:column wa-align-items-stretch wa-gap-xs">
      <div class="wa-stack wa-gap-xs">
        <span class="wa-split wa-gap-xs">
          <h3 class="wa-heading-m">Racers (3 Pack)</h3>
          <span>$80.00</span>
        </span>
        <wa-tag size="small" variant="neutral" appearance="filled" pill style="width: fit-content">Assorted Colors</wa-tag>
      </div>
      <div class="wa-split">
        <wa-badge appearance="filled" variant="success">In Stock</wa-badge>
        <wa-button appearance="plain" size="small" variant="danger">
          <wa-icon slot="suffix" name="trash"></wa-icon>
          Remove
        </wa-button>
      </div>
    </div>
  </article>
  <wa-divider></wa-divider>
  <article class="wa-flank" style="--flank-size: 12rem">
    <div class="wa-frame wa-border-radius-m" style="aspect-ratio: 3 / 2">
      <img
        src="https://images.unsplash.com/photo-1594787826350-19386fdb2363?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDI4ODV8&ixlib=rb-4.0.3&q=80&w=1080"
        alt=""
      />
    </div>
    <div class="wa-split:column wa-align-items-stretch wa-gap-xs">
      <div class="wa-stack wa-gap-xs">
        <span class="wa-split wa-gap-xs">
          <h3 class="wa-heading-m">Volkswagen T2</h3>
          <span>$60.00</span>
        </span>
        <wa-tag size="small" variant="neutral" appearance="filled" pill style="width: fit-content">Red/White</wa-tag>
      </div>
      <div class="wa-split">
        <wa-badge appearance="filled" variant="warning">Low Stock</wa-badge>
        <wa-button appearance="plain" size="small" variant="danger">
          <wa-icon slot="suffix" name="trash"></wa-icon>
          Remove
        </wa-button>
      </div>
    </div>
  </article>
  <wa-divider></wa-divider>
  <div class="wa-stack">
    <div class="wa-split">
      <h3 class="wa-heading-m">Subtotal</h3>
      <span class="wa-body-l">$172.00</span>
    </div>
    <span class="wa-caption-m">Shipping and taxes calculated at checkout</span>
    <wa-button size="large" variant="brand">Checkout</wa-button>
    <div class="cluster">
      <span class="wa-caption-m">Not quite ready?</span>
      <wa-button appearance="plain" size="small" variant="brand">
        Continue Shopping
        <wa-icon name="arrow-right"></wa-icon>
      </wa-button>
    </div>
  </div>
</div>
```

## Drawer

```html {.example viewport}
<wa-drawer label="Shopping Cart" open>
  <div class="wa-stack">
    <article class="wa-flank" style="--flank-size: 6rem">
      <div class="wa-frame wa-border-radius-m">
        <img
          src="https://images.unsplash.com/photo-1704677982224-89cd6d039fa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDEwOTJ8&ixlib=rb-4.0.3&q=80&w=1080"
          alt=""
        />
      </div>
      <div class="wa-stack wa-gap-2xs">
        <div class="wa-split wa-gap-2xs">
          <strong>AJ1 Low</strong>
          <strong>$170.00</strong>
        </div>
        <span class="wa-caption-m">Multi-color</span>
        <div class="wa-split wa-gap-2xs">
          <span class="wa-body-s">Qty: 1</span>
          <wa-button appearance="plain" size="small">Remove</wa-button>
        </div>
      </div>
    </article>
    <wa-divider></wa-divider>
    <article class="wa-flank" style="--flank-size: 6rem">
      <div class="wa-frame wa-border-radius-m">
        <img
          src="https://images.unsplash.com/photo-1672908615254-71a0b373eaba?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="(Photograph by Hamed darzi)"
        />
      </div>
      <div class="wa-stack wa-gap-2xs">
        <div class="wa-split wa-gap-2xs">
          <strong>The Trails</strong>
          <strong>$35.00</strong>
        </div>
        <span class="wa-caption-m">Twilight Blue</span>
        <div class="wa-split wa-gap-2xs">
          <span class="wa-body-s">Qty: 1</span>
          <wa-button appearance="plain" size="small">Remove</wa-button>
        </div>
      </div>
    </article>
    <wa-divider></wa-divider>
    <article class="wa-flank" style="--flank-size: 6rem">
      <div class="wa-frame wa-border-radius-m">
        <img
          src="https://images.unsplash.com/photo-1693443687750-611ad77f3aba?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="(Photograph by tian dayong)"
        />
      </div>
      <div class="wa-stack wa-gap-2xs">
        <div class="wa-split wa-gap-2xs">
          <strong>Outcast 2-pack</strong>
          <strong>$27.00</strong>
        </div>
        <span class="wa-caption-m">Black / White</span>
        <div class="wa-split wa-gap-2xs">
          <span class="wa-body-s">Qty: 1</span>
          <wa-button appearance="plain" size="small">Remove</wa-button>
        </div>
      </div>
    </article>
  </div>
  <div slot="footer" class="wa-stack" style="width: 100%">
    <div class="wa-split">
      <strong>Subtotal</strong>
      <strong>$232.00</strong>
    </div>
    <span class="wa-caption-m">Shipping and taxes calculated at checkout.</span>
    <wa-button variant="brand">Checkout</wa-button>
    <wa-button appearance="plain" size="small" variant="brand">
      Continue Shopping
      <wa-icon name="arrow-right"></wa-icon>
    </wa-button>
  </div>
</wa-drawer>
```