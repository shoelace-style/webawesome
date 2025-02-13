---
title: Checkout Form
description: 'Let shoppers checkout with ease with streamlined forms to capture shipping and payment info.'
parent: ecommerce
tags: e-commerce
---


## With Order Summary Card

```html {.example}
<div style="max-width: 960px; margin: 0 auto;">
<div class="wa-stack">
  <h4 style="margin-top: 0.5rem;">Contact Info</h4>
  <wa-input type="email" label="Email Address" class=""></wa-input>
  <hr style="width: 100%" />
  <h4 class="full-row" style="margin-top: 0.5rem;">Shipping Information</h4>
  <div class="wa-grid">
    <wa-input label="First Name"></wa-input>
    <wa-input label="Last Name"></wa-input>
  </div>
 
  <wa-input label="Company"></wa-input>
  <div class="wa-grid">
    <wa-input label="Address"></wa-input>
  <wa-input label="City"></wa-input>
  <wa-select label="Country" placeholder="Country" >
    <wa-option value="option-1">Option 1</wa-option>
    <wa-option value="option-2">Option 2</wa-option>
    <wa-option value="option-3">Option 3</wa-option>
  </wa-select> 
  </div>
  <div class="wa-grid">
    <wa-input label="State"></wa-input>
    <wa-input label="Postal Code"></wa-input>
    <wa-input label="Phone"></wa-input>
  </div>
  
  <hr class="full-row" />
    <wa-radio-group orientation="horizontal" label="Delivery Method" hint="Select an option that makes you proud." name="a" value="1" class="full-row" style="margin-top: 1.5rem;">
    <wa-radio-button value="1">Standard</wa-radio-button>
    <wa-radio-button value="2">Express</wa-radio-button>
  </wa-radio-group>
  <hr class="full-row" />
  <h4 class="full-row">Payment</h4>
  <wa-radio-group label="Select an option" name="a" value="1">
    <wa-radio value="1">Credit Card</wa-radio>
    <wa-radio value="3">Paypal</wa-radio>
  </wa-radio-group>
  <wa-input label="Name on Card"></wa-input>
  <div class="wa-grid">
    <wa-input label="Card Number"></wa-input>

<wa-input label="Expiration Date"></wa-input>
<wa-input label="CVC"></wa-input>
  </div>
  
</div>
<div class="wa-stack" style="margin-top: 1rem">
  <hr class="full-row" />
  <h4>Order Summary</h4>
  <wa-card class="wa-stack">
    <div class="wa-grid" style="margin-bottom: 1rem;">
      <img src="https://img.fortawesome.com/cfa83f3c/air-forces.jpg" alt="">
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
    </div>
    <div class="wa-grid" style="margin-bottom: 1rem;">
      <img src="https://img.fortawesome.com/cfa83f3c/air-max.jpg" alt="">
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

    </div>
    <div class="wa-grid" style="margin-bottom: 1rem;">
      <img src="https://img.fortawesome.com/cfa83f3c/nike-runner.jpg" alt="">
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

    </div>
 <wa-button size="medium" variant="brand" style="width: 100%; margin-bottom: 1rem;">Confirm Order</wa-button>
</wa-card>
</div>
</div>

<!-- <style>
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

   
  }
</style> -->
```