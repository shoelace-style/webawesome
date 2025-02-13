---
title: Checkout Form
description: 'streamline the payment process for your customers with well designed form that capture billing, shipping, and payment info.'
parent: ecommerce
tags: e-commerce
---


### Checkout

```html {.example}
<div class="checkout-form">
<div class="checkout-form-inputs">
  <h4 class="full-row" style="margin-top: 0.5rem;">Contact Info</h4>
  <wa-input type="email" label="Email Address" class="full-row"></wa-input>
  <hr class="full-row" />
  <h4 class="full-row" style="margin-top: 0.5rem;">Shipping Information</h4>
  <wa-input label="First Name" class="first-half"></wa-input>
  <wa-input label="Last Name" class="second-half" style="margin-top: 1.5rem;"></wa-input>
  <wa-input label="Company" class="full-row" style="margin-top: 1.5rem;"></wa-input>
  <wa-input label="Address" class="full-row" style="margin-top: 1.5rem;"></wa-input>
  <wa-input label="City" class="first-half" style="margin-top: 1.5rem;"></wa-input>
  <wa-select label="Country" placeholder="Country" class="second-half" style="margin-top: 1.5rem;">
    <wa-option value="option-1">Option 1</wa-option>
    <wa-option value="option-2">Option 2</wa-option>
    <wa-option value="option-3">Option 3</wa-option>
  </wa-select>
  <wa-input label="State" class="first-half" style="margin-top: 1.5rem;"></wa-input>
  <wa-input label="Postal Code" class="second-half" style="margin-top: 1.5rem;"></wa-input>
  <wa-input label="Phone" class=" full-row" style="margin-top: 1.5rem;"></wa-input>
  <hr class="full-row" />
    <wa-radio-group label="Delivery Method" hint="Select an option that makes you proud." name="a" value="1" class="full-row" style="margin-top: 1.5rem;">
    <wa-radio-button value="1">Standard</wa-radio-button>
    <wa-radio-button value="2">Express</wa-radio-button>
  </wa-radio-group>
  <hr class="full-row" />
  <h4 class="full-row" style="margin-top: 0.5rem;">Payment</h4>
  <wa-radio-group label="Select an option" name="a" value="1" class="full-row" style="margin-top: 1.5rem;">
    <wa-radio value="1">Credit Card</wa-radio>
    <wa-radio value="3">Paypal</wa-radio>
  </wa-radio-group>
  <wa-input label="Card Number" class="full-row" style="margin-top: 1.5rem;"></wa-input>
<wa-input label="Name on Card" class="full-row" style="margin-top: 1.5rem;"></wa-input>
<wa-input label="Expiration Date" class="first-half" style="margin-top: 1.5rem;"></wa-input>
<wa-input label="CVC" class="second-half" style="margin-top: 1.5rem;"></wa-input>
</div>
<div class="checkout-form-summary">
  <h4>Order Summary</h4>
  <wa-card class="card-basic">
    <div class="summary-item">
      <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDM1MzB8&ixlib=rb-4.0.3&q=80&w=1080">
      <div class="summary-item-info">
        <span style="display: flex; justify-content: space-between;">
          <span class="item-heading">Dolce Runners</span>
          <wa-icon-button name="trash" variant="solid" label="Settings"></wa-icon-button>
        </span>
        <span class="subtle">Cream/Seafoam</span>
        <br />
        <span class="subtle">12.5</span>
        <span style="display:flex;justify-content: space-between; width: 100%;margin: 1rem 0 2rem;">
          <span class="item-price">$0.00</span>
          <wa-select placeholder="1" style="width: 70px; margin-left: auto">
            <wa-option value="option-1">1</wa-option>
            <wa-option value="option-2">2</wa-option>
            <wa-option value="option-3">3</wa-option>
          </wa-select>
          </span>
        </div>
      <hr style="grid-column: 1 / -1;">
    </div>
    <div class="summary-item">
      <img src="https://images.unsplash.com/photo-1514989940723-e8e51635b782?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDM1Njh8&ixlib=rb-4.0.3&q=80&w=1080">
      <div class="summary-item-info">
        <span style="display: flex; justify-content: space-between;">
          <span class="item-heading">Dunk High</span>
          <wa-icon-button name="trash" variant="solid" label="Settings"></wa-icon-button>
        </span>
        <span class="subtle">Sand/Amber/Black</span>
        <br />
        <span class="subtle">12.5</span>
        <span style="display:flex;justify-content: space-between; width: 100%;margin: 1rem 0 2rem;">
          <span class="item-price">$180.00</span>
          <wa-select placeholder="1" style="width: 70px; margin-left: auto">
            <wa-option value="option-1">1</wa-option>
            <wa-option value="option-2">2</wa-option>
            <wa-option value="option-3">3</wa-option>
          </wa-select>
          </span>
        </div>
      <hr style="grid-column: 1 / -1;">
    </div>
    <div class="summary-item">
      <img src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDM2MTF8&ixlib=rb-4.0.3&q=80&w=1080">
      <div class="summary-item-info">
        <span style="display: flex; justify-content: space-between;">
          <span class="item-heading">NB Runner</span>
          <wa-icon-button name="trash" variant="solid" label="Settings"></wa-icon-button>
        </span>
        <span class="subtle">Forrest Green</span>
        <br />
        <span class="subtle">12.5</span>
        <span style="display:flex;justify-content: space-between; width: 100%;margin: 1rem 0 2rem;">
          <span class="item-price">$48.99</span>
          <wa-select placeholder="1" style="width: 70px; margin-left: auto">
            <wa-option value="option-1">1</wa-option>
            <wa-option value="option-2">2</wa-option>
            <wa-option value="option-3">3</wa-option>
          </wa-select>
          </span>
        </div>
      <hr style="grid-column: 1 / -1;">
    </div>
 <wa-button size="medium" variant="brand" style="width: 100%; margin-bottom: 1rem;">Confirm Order</wa-button>
</wa-card>
</div>
</div>

<style>
  .checkout-form {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 1rem;

    .checkout-form-inputs {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      grid-column-gap: 1rem;
    }
      .summary-item {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-column-gap: 1rem;

        img {
          grid-column: 1/4;
          width: 100%;
        }

        .summary-item-info {
          grid-column: 4/12;
        }
      }
    /* & hr {
      border-width: 1px;
      margin: 1rem 0;
    } */
    .subtle {
      font-size: small;
    }

    .item-heading {
      font-size: large:
    }

    /* Grid utilities */

    .full-row {
      grid-column: 1/-1
    }

    .first-half {
      grid-column: 1/4
    }

    .second-half {
      grid-column: 4/7
    }

    .first-third {
      rid-column: 1/3
    }
    .second-third {
      rid-column: 3/5
    }
    .last-third {
      rid-column: 5/7
    }
  }
</style>
```