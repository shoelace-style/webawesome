---
title: Checkout Form
description: 'Let shoppers checkout with ease with streamlined forms to capture shipping and payment info.'
parent: ecommerce
tags: e-commerce
---


## With Order Summary Card

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
            <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDM1MzB8&ixlib=rb-4.0.3&q=80&w=1080" alt="">
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
            <img src="https://images.unsplash.com/photo-1514989940723-e8e51635b782?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDM1Njh8&ixlib=rb-4.0.3&q=80&w=1080" alt="">
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
            <img src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDM2MTF8&ixlib=rb-4.0.3&q=80&w=1080" alt="">
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