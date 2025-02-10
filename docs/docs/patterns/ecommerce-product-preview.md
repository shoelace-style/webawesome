---
title: Product Preview
description: 'Gives Customers the ability to see more details about a product or service in a modal to get more information'
parent: ecommerce
tags: e-commerce
---

## With color and size selector
```html{.example}
  <div class="with-inline-price">
   <wa-card with-header>
    <div class="card-header" slot="header">
      <span class="card-title">Graphic Tank</span>
      <wa-icon-button name="close" label="close-modal"></wa-icon-button>
    </div>
    <div class="card-body wa-grid">
      <img style="height: 100%; object-fit: cover;" src="https://img.fortawesome.com/cfa83f3c/gervyn-louis-is03aji00fc-unsplash.jpg" alt="">
      <form class="detail wa-stack">
        <span class="price">$32</span>
        <span class="rating">
          <wa-rating label="Rating" precision="0.5" value="3.75"></wa-rating>
          <a style="margin-left: .5rem; " href="*">36 Reviews</a>
        </span>
        <wa-radio-group style="margin-bottom: 1rem;" label="Color" name="a" value="black">
          <wa-radio-button value="black">Black</wa-radio-button>
          <wa-radio-button value="white">White</wa-radio-button>
          <wa-radio-button value="gray">Gray</wa-radio-button>
        </wa-radio-group>
        <wa-select label="Sizes" placeholder="select size">
          <wa-option value="option-1">Small</wa-option>
          <wa-option value="option-2">Medium</wa-option>
          <wa-option value="option-3">Large</wa-option>
          <wa-option value="option-3">Extra Large</wa-option>
        </wa-select>
<wa-button variant="brand" size="medium" style="width: 100%; margin-top: auto;">
  <wa-icon slot="suffix" name="cart-shopping" variant="solid"></wa-icon>
  Add to Cart 
  </wa-button>
      </form>
    </div>
   </wa-card>
  </div>
  <style>
    .with-inline-price {
      max-width: 960px;
      margin: 0 auto;
      wa-card {
        width: 100%;
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .card-title {
            font-size: large;
            font-weight: 600;
          }
        }
        .card-body {
          grid-template-columns: 35% 1fr;
          .detail {
            .price {
              font-size: xx-large;
              font-weight: 600;
            }
            .rating {
              margin-bottom: 1rem;
            }
          }
        }
      }
    }
    @media (max-width: 1030px) {
      .with-inline-price {
        wa-card {
          .card-body {
        grid-template-columns: 1fr;
      }
        }
      
    }
    }
  </style>
```

## with large selector
```html{.example}
  <wa-card class="large-selector">
    <div class="card-body wa-grid">
      <div>
      <img style="border-radius: var(--border-radius); height: 100%; object-fit: cover;" src="https://img.fortawesome.com/cfa83f3c/gervyn-louis-is03aji00fc-unsplash.jpg" alt="">
      </div>
      <div class="info">
        <h2>Graphic Tank</h2>
        <wa-icon-button name="close" label="close-modal"></wa-icon-button>
        <section>
          <p style="font-size: x-large;font-weight: 600;">$32</p>
          <div class="wa-split">
            <p>3.9</p>
            <wa-rating value="3.9"></wa-rating>
            <a href="*" style="margin-left: auto;">See all 512 Reviews</a>
          </div>
        </section>
        <section>
          <form class="wa-stack">
            <wa-radio-group label="Color" hint="We've got more colors on the way!" name="a" value="black" style="margin: 1rem 0;">
              <wa-radio value="black">Black</wa-radio>
              <wa-radio value="gray">Gray</wa-radio>
            </wa-radio-group>
            <wa-radio-group label="Size" name="a" value="medium"  style="margin-bottom: 1rem;">
              <wa-radio-button value="small">S</wa-radio-button>
              <wa-radio-button value="medium">M</wa-radio-button>
              <wa-radio-button value="large">L</wa-radio-button>
              <wa-radio-button value="extra-large">XL</wa-radio-button>
            </wa-radio-group>
            <wa-button variant="brand" size="medium" style="width: 100%; margin-top: auto;margin-bottom: 1rem;">
              <wa-icon slot="suffix" name="cart-shopping" variant="solid"></wa-icon>
              Add to Cart
            </wa-button>
            <a href="*" style="display: inline-block;width: 100%;text-align: center;">View full details</a>
          </form>
        </section>
      </div>
    </div>
  </wa-card>
<style>
  .large-selector {
    max-width: 960px;
    margin: 0 auto;
  }
  .large-selector .card-body {

    .info {
      position: relative;

      wa-icon-button {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
</style>
```
