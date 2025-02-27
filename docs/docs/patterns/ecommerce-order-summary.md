---
title: Order Summary
description: 'Give shoppers confidence in their purchases with summaries of everything included in their order.'
parent: ecommerce
tags: e-commerce
---

## Simple
```html{.example}
<div class="wa-stack" style="max-width: 960px;margin: 0 auto;">
  <div class="wa-align-items-center wa-callout wa-split wa-success"><em>Payment Successful</em><wa-icon name="circle-check"></wa-icon></div>
  <wa-card>
  <h2 class="wa-heading-l">Thank you for ordering from us!</h2>
  <p class="wa-caption-l">We appreciate your order, it's processing now. A confirmation email should be sent to you momentarily!</p>
  <dl class="wa-flank" style="--wa-space-xl: 0; margin-bottom: 1rem;">
    <dt>Order #</dt>
    <dd class="wa-caption-l" style="--wa-space-m: 0;"><em>49548790-24545</em></dd>
  </dl>
  <wa-divider></wa-divider>
  <div class="wa-flank:end wa-align-items-start" style="--flank-size: 200px;">
    <div>
      <ul style="list-style-type: none; margin: 0">
    <li>
      <div class="wa-flank wa-align-items-start">
      <img src="https://uploads.webawesome.com/vase-1.jpg" />
        <div class="wa-split">
          <span class="wa-heading-m">Spotted Flower Pot</span>
          <span>$75.00</span>
        </div>
        </div>
      <wa-divider></wa-divider>
    </li>
     <li>
      <div class="wa-flank wa-align-items-start">
      <img src="https://uploads.webawesome.com/decorative-vase.jpg" />
        <div class="wa-split">
          <span class="wa-heading-m">Decorative Vase</span>
          <span>$51.00</span>
        </div>
        </div>
      <wa-divider></wa-divider>
    </li>
  </ul>
  <dl class="wa-caption-l">
    <div class="wa-split">
      <dt>Subtotal</dt>
      <dd class="baw">$126.00</dd>
    </div>
    <div class="wa-split">
      <dt>Shipping</dt>
      <dd class="baw">$8.00</dd>
    </div>
    <div class="wa-split">
      <dt>Taxes</dt>
      <dd class="baw">$6.40</dd>
    </div>
    <div class="wa-split">
      <dt class="ayn">Total</dt>
      <dd class="ayn">$140.40</dd>
    </div>
  </dl>
    </div>
    <div class="wa-callout wa-neutral wa-outlined">
       <dl class="wa-stack" style="margin: 0;">
    <div >
      <dt>Shipping Address</dt>
      <dd style="margin: 0;">
        <address>
          Donna Noble<br />
          56 Front Street<br />
          Las Cruces, NM 56929<br />
        </address>
      </dd>
    </div>
    <div>
      <dt>Payment Information</dt>
      <dd class="wa-align-items-start wa-flank wa-gap-xs" style="margin: 0;">
        <div>
          <wa-icon class="wa-body-xl" family="brands" name="cc-visa" style="color: #224DBA;"></wa-icon>
        </div>
        <div>
          <span class="wa-caption-m">Ending with 9065</span>
        </div>
      </dd>
    </div>
  </dl>
    </div>
  </div>
</wa-card>
<wa-button size="large" style="width: 100%;" appearance="plain">
      <wa-icon slot="suffix" name="arrow-right" variant="solid"></wa-icon>
    Continue Shopping
  </wa-button>
</div>
```

## With Details

```html{.example}
<div class="wa-stack" style="max-width: 960px; margin: 0 auto">
  <h2>Order Details</h2>
  <div class="wa-split">
    <div style="display: flex; align-items: center; height: 2rem;">
      <span>Order placed February 26, 2025 </span>
      <wa-divider vertical></wa-divider>
      <span>Order # 45646456-4656-4542</span>
    </div>
    <wa-button size="small" appearance="outlined" pill>View Invoice</wa-button>
  </div>
  <wa-card>
    <div class="wa-flank:end wa-align-items-start" style="--flank-size: 192px;">
      <div class="wa-grid">
        <div>
          <span class="wa-heading-s">Shipping Address</span>
          <address class="wa-caption-m" style="--wa-space-xl: .5rem;">
            Johnny Blaze<br />
            200 Park Avenue<br />
            Manhattan, NY 45789-3412<br />
            United States
          </address>
          <wa-button size="small" appearance="outlined" pill>Change</wa-button>
        </div>
        <div>
          <span class="wa-heading-s">Payment Method</span>
          <div class="wa-cluster">
             <wa-icon class="wa-body-xl" family="brands" name="cc-visa" style="color: #224DBA;"></wa-icon>
             <span class="wa-caption-m">Visa ending in 9542</span>
          </div>
        </div>
      </div>
       <div class="wa-stack wa-gap-xs">
          <span class="wa-heading-s">Order Summary</span>
          <dl class="wa-caption-m">
            <div class="wa-split">
              <dt>Item(s) Subtotal:</dt>
              <dd>$39.00</dd>
            </div>
            <div class="wa-split">
              <dt>Shipping & Handling:</dt>
              <dd>$0.00</dd>
            </div>
            <div class="wa-split">
              <dt>Pre-tax total:</dt>
              <dd>$39.00</dd>
            </div>
            <div class="wa-split">
              <dt>Tax:</dt>
              <dd>$39.00</dd>
            </div>
            <div class="wa-split wa-heading-s">
              <dt>Grand Total</dt>
              <dd>$39.00</dd>
            </div>
          </dl>
        </div>
    </div>
  </wa-card>

  <wa-card>
    <div class="wa-flank:end wa-align-items-start" style="--flank-size: 181px;">

      <div>
        <h3 class="wa-heading-s" style="margin-bottom: var(--wa-space-s);">Arriving Saturday</h3>
        <div class="wa-flank wa-align-items-start">
      <img src="https://uploads.webawesome.com/sparkling-water.jpg" />
        <div class="wa-align-items-start wa-stack">
          <a href="#" class="wa-caption-m">Mineragua Sparkling Water 12 Count</a>
          <div class="wa-stack">
            <span class="wa-caption-s">Sold by: <a href="#">Mineragua</a></span>
            <div class="wa-flank">
              <span class="wa-heading-s">$39.00</span>
              <wa-button appearance="outlined" size="small" pill>
                <wa-icon slot="prefix" name="rotate" variant="solid"></wa-icon>
                Buy Again
              </wa-button>
            </div>
          </div>
        </div>
        </div>
      </div>

      <div class="wa-stack wa-gap-xs">
          <wa-button size="small" variant="brand" pill>Track Package</wa-button>
          <wa-button size="small" appearance="outlined" variant="neutral" pill>Cancel Item(s)</wa-button>
          <wa-button size="small" appearance="outlined" variant="neutral" pill>Ask Question</wa-button>
          <wa-button size="small" appearance="outlined" variant="neutral" pill>Write Review</wa-button>
        </div>
    </div>
  </wa-card>
</div>
```
## With Status & Description

```html{.example}
<div class="wa-stack" style="max-width: 960px; margin: 0 auto;">
  <div class="wa-flank">
    <h2>Order #7093</h2>
    <div class="wa-split">
      <a href="#">View invoice</a>
      <p class="wa-caption-m">Order placed June 12, 2024</p>
    </div>
  </div>
    <div class="wa-stack">
      <wa-card>
        <div>
          <div class="wa-flank wa-align-items-start">
            <img src="https://uploads.webawesome.com/vase-1.jpg" />
            <div class="wa-cluster wa-gap-xs">
              <div class="wa-split">
                <span class="wa-heading-m">Spotted Flower Pot</span>
                <span class="wa-heading-s">$75.00</span>
              </div>
              <p class="wa-caption-m">Wood fired, salt glaze</p>
              <wa-tag variant="success" appearance="filled" size="small">Delivered</wa-tag>
            </div>
          </div>   
        </div>  
      </wa-card>
      <wa-card>
        <div class="wa-flank wa-align-items-start">
      <img src="https://uploads.webawesome.com/decorative-vase.jpg" />
      <div class="wa-cluster wa-gap-xs">
        <div class="wa-split">
          <span class="wa-heading-m">Decorative Vase</span>
          <span class="wa-heading-s">$51.00</span>
        </div>
        <p class="wa-caption-m">High quality Japanese Kutani-yaki ceramic-ware</p>
        <wa-tag variant="neutral" appearance="filled" size="small">Shipping Soon</wa-tag>
      </div>
        </div>
      </wa-card>
      <wa-card>
        <div class="wa-flank wa-align-items-start">
      <img src="https://uploads.webawesome.com/cuong-duyen-ceramic.jpg" />
      <div class="wa-cluster wa-gap-xs">
        <div class="wa-split">
          <span class="wa-heading-m">Cuong Duyen Ceramic</span>
          <span class="wa-heading-s">$48.00</span>
        </div>
        <p class="wa-caption-m">Koishiwara-yaki style with crystalline glaze</p>
        <wa-tag variant="brand" appearance="filled" size="small">Out for Delivery</wa-tag>
      </div>     
        </div>
      </wa-card>
      <wa-divider></wa-divider>
      <div class="wa-callout wa-neutral wa-outlined wa-grid">
        <div>
          <span class="wa-heading-s">Shipping Address</span>
          <address class="wa-caption-m">
            Donna Noble<br />
            56 Front Street<br />
            Las Cruces, NM 56929<br />
          </address>
        </div>
        <div class="wa-stack wa-gap-xs">
          <span class="wa-heading-s">Order Summary</span>
          <dl class="wa-caption-m">
            <div class="wa-split">
              <dt>Item(s) Subtotal:</dt>
              <dd>$174.00</dd>
            </div>
            <div class="wa-split">
              <dt>Shipping & Handling:</dt>
              <dd>$0.00</dd>
            </div>
            <div class="wa-split">
              <dt>Pre-tax total:</dt>
              <dd>$174.00</dd>
            </div>
            <div class="wa-split">
              <dt>Tax:</dt>
              <dd>$17.40</dd>
            </div>
            <div class="wa-split wa-heading-s">
              <dt>Grand Total</dt>
              <dd>$191.40</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
</div>
```
