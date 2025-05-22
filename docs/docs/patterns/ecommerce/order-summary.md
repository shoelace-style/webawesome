---
title: Order Summary
description: 'Give shoppers confidence in their purchases with summaries of everything included in their order.'
isPro: true
---

## Simple

```html {.example}
<div class="wa-stack wa-gap-xl">
  <wa-callout variant="success">
    <em>Payment Successful</em>
    <wa-icon slot="icon" name="circle-check"></wa-icon>
  </wa-callout>
  <wa-card>
    <div class="wa-stack wa-gap-xl">
      <h2>Thank you for ordering from us!</h2>
      <p class="wa-caption-l">We're processing your order now. A confirmation email will be sent to you momentarily!</p>
      <dl class="wa-cluster">
        <dt>Order #</dt>
        <dd>49548790-24545</dd>
      </dl>
      <wa-divider></wa-divider>
      <div class="wa-flank:end wa-align-items-start wa-gap-xl" style="--flank-size: 14em">
        <div class="wa-stack wa-gap-xl">
          <ul class="wa-stack wa-gap-xl">
            <li class="wa-flank wa-align-items-start">
              <div class="wa-frame wa-border-radius-s">
                <img src="https://uploads.webawesome.com/vase-1.jpg" alt="" />
              </div>
              <div class="wa-split">
                <span class="wa-heading-s">Spotted Flower Pot</span>
                <span>$75.00</span>
              </div>
            </li>
            <wa-divider></wa-divider>
            <li class="wa-flank wa-align-items-start">
              <div class="wa-frame wa-border-radius-s">
                <img src="https://uploads.webawesome.com/decorative-vase.jpg" alt="" />
              </div>
              <div class="wa-split">
                <span class="wa-heading-s">Decorative Vase</span>
                <span>$51.00</span>
              </div>
            </li>
          </ul>
          <wa-divider></wa-divider>
          <dl class="wa-stack wap-gap-2xs wa-caption-l">
            <div class="wa-split">
              <dt>Subtotal</dt>
              <dd>$126.00</dd>
            </div>
            <div class="wa-split">
              <dt>Shipping</dt>
              <dd>$8.00</dd>
            </div>
            <div class="wa-split">
              <dt>Taxes</dt>
              <dd>$6.40</dd>
            </div>
            <div class="wa-split">
              <dt>Total</dt>
              <dd>$140.40</dd>
            </div>
          </dl>
        </div>
        <wa-callout variant="neutral" appearance="filled">
          <dl class="wa-stack" style="margin: 0">
            <dt>Shipping Address</dt>
            <dd>
              <address class="wa-stack wa-gap-2xs">
                <span>Donna Noble</span>
                <span>56 Front Street</span>
                <span>Las Cruces, NM 56929</span>
              </address>
            </dd>
            <dt>Payment Information</dt>
            <dd class="wa-flank wa-gap-s">
              <wa-icon label="Visa" class="wa-body-xl" family="brands" name="cc-visa" style="color: #224DBA;"></wa-icon>
              <span>Ending with 9065</span>
            </dd>
          </dl>
        </wa-callout>
      </div>
    </div>
  </wa-card>
  <wa-button size="large" variant="brand" appearance="plain">
    <wa-icon slot="suffix" name="arrow-right" variant="solid"></wa-icon>
    Continue Shopping
  </wa-button>
</div>
```

## With Details

```html {.example}
<div class="wa-stack">
  <h2>Order Details</h2>
  <div class="wa-split">
    <div class="wa-cluster">
      <span
        >Order placed
        <wa-format-date date="2025-02-26T09:00:00-04:00" month="long" day="numeric" year="numeric"></wa-format-date
      ></span>
      <wa-divider orientation="vertical"></wa-divider>
      <span>Order # 45646456-4656-4542</span>
    </div>
    <wa-button size="small" appearance="outlined" pill>View Invoice</wa-button>
  </div>
  <wa-card>
    <div class="wa-split wa-align-items-start">
      <div class="wa-stack">
        <h3 class="wa-heading-s">Shipping Address</h3>
        <address class="wa-stack wa-gap-xs wa-caption-m">
          <span>Johnny Blaze</span>
          <span>200 Park Avenue</span>
          <span>Manhattan, NY 45789-3412</span>
          <span>United States</span>
        </address>
        <wa-button size="small" appearance="outlined" pill>Change</wa-button>
      </div>
      <div class="wa-stack">
        <h3 class="wa-heading-s">Payment Method</h3>
        <div class="wa-flank wa-gap-s">
          <wa-icon class="wa-body-xl" family="brands" name="cc-visa" style="color: #224DBA;"></wa-icon>
          <span class="wa-caption-m">Visa ending in 9542</span>
        </div>
      </div>
      <div class="wa-stack">
        <h3 class="wa-heading-s">Order Summary</h3>
        <dl class="wa-stack wa-gap-xs wa-caption-m">
          <div class="wa-split">
            <dt>Item(s) Subtotal</dt>
            <dd>$39.00</dd>
          </div>
          <div class="wa-split">
            <dt>Shipping & Handling</dt>
            <dd>$0.00</dd>
          </div>
          <div class="wa-split">
            <dt>Pre-tax Total</dt>
            <dd>$39.00</dd>
          </div>
          <div class="wa-split">
            <dt>Tax</dt>
            <dd>$39.00</dd>
          </div>
          <wa-divider></wa-divider>
          <div class="wa-split wa-body-m">
            <dt>Grand Total</dt>
            <dd>$39.00</dd>
          </div>
        </dl>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank:end wa-align-items-start" style="--flank-size: 12rem">
      <div class="wa-stack">
        <h3 class="wa-heading-s">Arriving Saturday</h3>
        <div class="wa-flank wa-align-items-start">
          <div class="wa-frame wa-border-radius-s">
            <img src="https://uploads.webawesome.com/sparkling-water.jpg" alt="" />
          </div>
          <div class="wa-stack">
            <a href="" class="wa-caption-m">Mineragua Sparkling Water 12 Count</a>
            <span class="wa-caption-s">Sold by: <a href="">Mineragua</a></span>
            <div class="wa-cluster">
              <span class="wa-heading-s">$39.00</span>
              <wa-button appearance="outlined" size="small" pill>
                <wa-icon slot="prefix" name="rotate" variant="solid"></wa-icon>
                Buy Again
              </wa-button>
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

```html {.example}
<div class="wa-stack wa-gap-xl">
  <div class="wa-split">
    <div class="wa-cluster">
      <h2>Order #7093</h2>
      <a href="">View Invoice</a>
    </div>
    <p class="wa-caption-m">
      Order placed
      <wa-format-date date="2025-06-12T09:00:00-04:00" month="long" day="numeric" year="numeric"></wa-format-date>
    </p>
  </div>
  <wa-card>
    <div class="wa-flank wa-align-items-start">
      <div class="wa-frame wa-border-radius-s">
        <img src="https://uploads.webawesome.com/vase-1.jpg" alt="" />
      </div>
      <div class="wa-stack wa-align-items-start wa-gap-s">
        <div class="wa-split wa-gap-s">
          <h3 class="wa-heading-m">Spotted Flower Pot</h3>
          <span>$75.00</span>
        </div>
        <p class="wa-caption-m">Wood fired, salt glaze</p>
        <wa-tag variant="success" appearance="filled" size="small">Delivered</wa-tag>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank wa-align-items-start">
      <div class="wa-frame wa-border-radius-s">
        <img src="https://uploads.webawesome.com/decorative-vase.jpg" alt="" />
      </div>
      <div class="wa-stack wa-align-items-start wa-gap-s">
        <div class="wa-split wa-gap-s">
          <h3 class="wa-heading-m">Decorative Vase</h3>
          <span>$51.00</span>
        </div>
        <p class="wa-caption-m">High quality Japanese Kutani-yaki ceramic-ware</p>
        <wa-tag variant="neutral" appearance="filled" size="small">Shipping Soon</wa-tag>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank wa-align-items-start">
      <div class="wa-frame wa-border-radius-s">
        <img src="https://uploads.webawesome.com/cuong-duyen-ceramic.jpg" alt="" />
      </div>
      <div class="wa-stack wa-align-items-start wa-gap-s">
        <div class="wa-split wa-gap-s">
          <h3 class="wa-heading-m">Cuong Duyen Ceramic</h3>
          <span>$48.00</span>
        </div>
        <p class="wa-caption-m">Koishiwara-yaki style with crystalline glaze</p>
        <wa-tag variant="brand" appearance="filled" size="small">Out for Delivery</wa-tag>
      </div>
    </div>
  </wa-card>
  <wa-divider></wa-divider>
  <wa-callout variant="neutral" appearance="filled">
    <div class="wa-grid">
      <div class="wa-stack">
        <h3 class="wa-heading-s">Shipping Address</h3>
        <address class="wa-stack wa-gap-xs wa-caption-m">
          <span>Donna Noble</span>
          <span>56 Front Street</span>
          <span>Las Cruces, NM 56929</span>
        </address>
      </div>
      <div class="wa-stack">
        <h3 class="wa-heading-s">Order Summary</h3>
        <dl class="wa-stack wa-gap-xs wa-caption-m">
          <div class="wa-split">
            <dt>Item(s) Subtotal</dt>
            <dd>$174.00</dd>
          </div>
          <div class="wa-split">
            <dt>Shipping & Handling</dt>
            <dd>$0.00</dd>
          </div>
          <div class="wa-split">
            <dt>Tax</dt>
            <dd>$17.40</dd>
          </div>
          <wa-divider></wa-divider>
          <div class="wa-split wa-body-m">
            <dt>Total</dt>
            <dd>$191.40</dd>
          </div>
        </dl>
      </div>
    </div>
  </wa-callout>
</div>
```
