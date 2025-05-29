---
title: Checkout Form
description: 'Let shoppers checkout with ease with streamlined forms to capture shipping and payment info.'
isPro: true
---

## Full Form with Order Summary Card

```html {.example}
<div class="wa-grid wa-gap-3xl">
  <div class="wa-stack">
    <h4>Contact</h4>
    <wa-input type="email" label="Email Address"></wa-input>
    <wa-divider></wa-divider>
    <h4>Shipping</h4>
    <wa-select label="Country" value="us">
      <wa-option value="ca">Canada</wa-option>
      <wa-option value="mx">Mexico</wa-option>
      <wa-option value="us">United States</wa-option>
    </wa-select>
    <div class="wa-grid">
      <wa-input label="First Name"></wa-input>
      <wa-input label="Last Name"></wa-input>
    </div>
    <wa-input label="Company"></wa-input>
    <wa-input label="Address"></wa-input>
    <div class="wa-grid" style="--min-column-size: 10ch;">
      <wa-input label="City"></wa-input>
      <wa-input label="State"></wa-input>
      <wa-input label="Postal Code"></wa-input>
    </div>
    <wa-input label="Phone"></wa-input>
    <wa-divider></wa-divider>
    <wa-radio-group label="Shipping Method" name="shipping-method" value="standard" orientation="horizontal">
      <wa-radio value="standard" hint="7-10  business days">Standard</wa-radio>
      <wa-radio value="express" hint="2-5 business days">Express</wa-radio>
    </wa-radio-group>
    <wa-divider></wa-divider>
    <h4>Payment</h4>
    <wa-radio-group label="Payment Method" name="payment-method" value="credit" orientation="horizontal">
      <wa-radio value="credit">Credit Card</wa-radio>
      <wa-radio value="paypal">Paypal</wa-radio>
    </wa-radio-group>
    <wa-input label="Card Number"></wa-input>
    <wa-input label="Name on Card"></wa-input>
    <div class="wa-grid">
      <wa-input label="Expiration Date" placeholder="MM/YY"></wa-input>
      <wa-input label="CVC"></wa-input>
    </div>
  </div>
  <div class="wa-stack">
    <h4>Order Summary</h4>
    <wa-card>
      <div class="wa-stack">
        <div class="wa-flank wa-align-items-start" style="--flank-size: 7rem">
          <div class="wa-frame wa-border-radius-s">
            <img
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDM1MzB8&ixlib=rb-4.0.3&q=80&w=1080"
              alt=""
            />
          </div>
          <div class="wa-stack wa-gap-xs">
            <div class="wa-split">
              <span class="wa-heading-s">Dolce Runners</span>
              <wa-icon-button name="trash" label="Remove from cart"></wa-icon-button>
            </div>
            <span class="wa-caption-m">Cream/Seafoam</span>
            <span class="wa-caption-m">12.5</span>
            <div class="wa-split">
              <span>$135.00</span>
              <wa-select value="1" size="small" style="max-width: 8ch">
                <wa-option value="1">1</wa-option>
                <wa-option value="2">2</wa-option>
                <wa-option value="3">3</wa-option>
              </wa-select>
            </div>
          </div>
        </div>
        <wa-divider></wa-divider>
        <div class="wa-flank wa-align-items-start" style="--flank-size: 7rem">
          <div class="wa-frame wa-border-radius-s">
            <img
              src="https://images.unsplash.com/photo-1514989940723-e8e51635b782?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDM1Njh8&ixlib=rb-4.0.3&q=80&w=1080"
              alt=""
            />
          </div>
          <div class="wa-stack wa-gap-xs">
            <div class="wa-split">
              <span class="wa-heading-s">Dunk High</span>
              <wa-icon-button name="trash" label="Remove from cart"></wa-icon-button>
            </div>
            <span class="wa-caption-m">Sand/Amber/Black</span>
            <span class="wa-caption-m">12.5</span>
            <div class="wa-split">
              <span>$180.00</span>
              <wa-select value="1" size="small" style="max-width: 8ch">
                <wa-option value="1">1</wa-option>
                <wa-option value="2">2</wa-option>
                <wa-option value="3">3</wa-option>
              </wa-select>
            </div>
          </div>
        </div>
        <wa-divider></wa-divider>
        <div class="wa-flank wa-align-items-start" style="--flank-size: 7rem">
          <div class="wa-frame wa-border-radius-s">
            <img
              src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDM2MTF8&ixlib=rb-4.0.3&q=80&w=1080"
              alt=""
            />
          </div>
          <div class="wa-stack wa-gap-xs">
            <div class="wa-split">
              <span class="wa-heading-s">NB Runner</span>
              <wa-icon-button name="trash" label="Remove from cart"></wa-icon-button>
            </div>
            <span class="wa-caption-m">Forrest Green</span>
            <span class="wa-caption-m">12.5</span>
            <div class="wa-split">
              <span>$48.99</span>
              <wa-select value="1" size="small" style="max-width: 8ch">
                <wa-option value="1">1</wa-option>
                <wa-option value="2">2</wa-option>
                <wa-option value="3">3</wa-option>
              </wa-select>
            </div>
          </div>
        </div>
        <wa-divider></wa-divider>
        <div class="wa-stack">
          <div class="wa-split wa-caption-m">
            <span>Subtotal</span>
            <span>$363.99</span>
          </div>
          <div class="wa-split wa-caption-m">
            <span>Shipping</span>
            <span>FREE</span>
          </div>
          <div class="wa-split wa-heading-m">
            <span>Total</span>
            <span>$363.99</span>
          </div>
        </div>
        <wa-divider></wa-divider>
        <wa-button variant="brand">Confirm Order</wa-button>
      </div>
    </wa-card>
  </div>
</div>
```

## Short Form with Order Summary

```html {.example}
<div class="wa-grid wa-gap-3xl">
  <div class="wa-stack wa-gap-xl">
    <h2>Payment</h2>
    <wa-input type="email" label="Email" placeholder="ex. tanderson@metacortex.com">
      <wa-icon slot="prefix" name="envelope"></wa-icon>
    </wa-input>
    <wa-input label="Card Number" placeholder="1234 1234 1234 1234">
      <wa-icon slot="prefix" name="credit-card"></wa-icon>
    </wa-input>
    <div class="wa-grid" style="--min-column-size: 12ch">
      <wa-input label="Expiration" placeholder="MM/YY">
        <wa-icon slot="prefix" name="calendar"></wa-icon>
      </wa-input>
      <wa-input label="CVC" placeholder="CVC">
        <wa-icon slot="prefix" name="lock"></wa-icon>
      </wa-input>
    </div>
    <wa-input label="Cardholder Name" placeholder="Thomas Anderson">
      <wa-icon slot="prefix" name="user"></wa-icon>
    </wa-input>
    <div class="wa-grid" style="--min-column-size: 12ch">
      <wa-select label="Country" value="us">
        <wa-icon slot="prefix" name="globe"></wa-icon>
        <wa-option value="ca">Canada</wa-option>
        <wa-option value="us">United States</wa-option>
        <wa-option value="mx">Mexico</wa-option>
      </wa-select>
      <wa-input label="ZIP" placeholder="12345">
        <wa-icon slot="prefix" name="location-dot"></wa-icon>
      </wa-input>
    </div>
    <wa-switch checked>Sign me up for more offers from this store</wa-switch>
    <wa-button variant="brand">Pay Now</wa-button>
  </div>
  <div class="wa-stack wa-gap-xl">
    <h2>Order Summary</h2>
    <div class="wa-split">
      <div class="wa-cluster">
        <div class="wa-frame wa-border-radius-m" style="max-width: 4rem">
          <img
            src="https://images.unsplash.com/photo-1618677366787-9727aacca7ea?q=80&w=3255&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Glasses with black wire frames and dark tinted, circular lenses (Photograph by Colin Lloyd)"
          />
        </div>
        <strong>Morpheus</strong>
      </div>
      <div class="wa-cluster">
        <wa-input type="number" value="1" style="max-width: 5rem"></wa-input>
        <span>$120.00</span>
      </div>
    </div>
    <div class="wa-split">
      <div class="wa-cluster">
        <div class="wa-frame wa-border-radius-m" style="max-width: 4rem">
          <img
            src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=3558&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Glasses with rose gold wire frames and green tinted, circular lenses (Photograph by Charles Deluvio)"
          />
        </div>
        <div class="wa-stack wa-gap-3xs">
          <strong>Seraph</strong>
          <em class="wa-caption-m">Tinted</em>
        </div>
      </div>
      <div class="wa-cluster">
        <wa-input type="number" value="1" style="max-width: 5rem"></wa-input>
        <span>$180.00</span>
      </div>
    </div>
    <div class="wa-split">
      <div class="wa-cluster">
        <div class="wa-frame wa-border-radius-m" style="max-width: 4rem">
          <img
            src="https://images.unsplash.com/photo-1547104442-a40f335740cb?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Glasses with tortoise shell half frames and large, rounded lenses (Photograph by Sincerely Media)"
          />
        </div>
        <div class="wa-stack wa-gap-3xs">
          <strong>Keymaker</strong>
          <em class="wa-caption-m">Glossy</em>
        </div>
      </div>
      <div class="wa-cluster">
        <wa-input type="number" value="1" style="max-width: 5rem"></wa-input>
        <span>$50.00</span>
      </div>
    </div>
    <div class="wa-flank:end">
      <wa-input placeholder="Discount code or gift card"></wa-input>
      <wa-button appearance="filled">Apply</wa-button>
    </div>
    <div class="wa-stack wa-gap-s">
      <div class="wa-split">
        <span>Subtotal</span>
        <strong>$530.00</strong>
      </div>
      <div class="wa-split">
        <span>Shipping</span>
        <span>$8.00</span>
      </div>
      <div class="wa-split">
        <strong>Total</strong>
        <strong>$538.00</strong>
      </div>
    </div>
  </div>
</div>
```
