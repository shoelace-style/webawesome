---
title: Product Detail
description: TODO
parent: ecommerce
tags: e-commerce
---

TODO Page Description

## With color and size selector
```html{.example}
  <div class="with-inline-price">
   <wa-card with-header>
    <div class="card-header" slot="header">
      <span class="card-title">Graphic Tank</span>
      <wa-icon-button name="close" label="close-modal"></wa-icon-button>
    </div>
    <div class="card-body">
      <img style="border-radius: var(--border-radius)" src="/assets/images/patterns/gervyn-louis-IS03ajI00Fc-unsplash.jpg" />
      <form class="detail">
        <span class="price">$32</span>
        <span class="rating"><wa-rating></wa-rating><a style="margin-left: .5rem; " href="*">36 Reviews</a></span>
        <wa-radio-group style="margin-bottom: 1rem;" label="Select an option" name="a" value="1">
  <wa-radio-button value="Black">Black</wa-radio-button>
  <wa-radio-button value="White">White</wa-radio-button>
  <wa-radio-button value="Gray">Gray</wa-radio-button>
</wa-radio-group>
<wa-select label="Sizes" placeholder="select size">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
<wa-button size="medium" style="width: 100%; margin-top: auto;">Medium</wa-button>
      </form>
    </div>
   </wa-card>
  </div>
  <style>
    .with-inline-price {
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
          display: grid;
          grid-template-columns: 35% 1fr;
          gap: 1rem;

          .detail {
            display: flex;
            flex-direction: column;

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
  </style>
```

## with large selector
```html{.example}
  <wa-card class="large-selector">
    <div class="card-body">
      <div style="grid-column: 1/6">
      <img style="border-radius: var(--border-radius); height: 100%; object-fit: cover;" src="/assets/images/patterns/gervyn-louis-IS03ajI00Fc-unsplash.jpg" />
      </div>
      <div style="grid-column: 6/-1" class="info">
        <h2>Basic Tank</h2>
        <wa-icon-button name="close" label="close-modal"></wa-icon-button>
        <section>
          <p style="font-size: x-large;font-weight: 600;">$32</p>
          <div style="display: flex; align-items: flex-start">
            <p>3.9</p>
            <wa-rating></wa-rating>
            <a href="*" style="margin-left: auto;">See all 512 Reviews</a>
          </div>
        </section>
        <section>
          <form>
            <wa-radio-group label="Color" hint="Choose the most appropriate option." name="a" value="black" style="margin-bottom: 1rem;">
              <wa-radio value="black">Black</wa-radio>
              <wa-radio value="gray">Gray</wa-radio>
            </wa-radio-group>
            <wa-radio-group label="Size" hint="Select an option that makes you proud." name="a" value="medium"  style="margin-bottom: 1rem;">
              <wa-radio-button value="small">S</wa-radio-button>
              <wa-radio-button value="medium">M</wa-radio-button>
              <wa-radio-button value="large">L</wa-radio-button>
              <wa-radio-button value="extra-large">XL</wa-radio-button>
            </wa-radio-group>
            <wa-button size="medium" style="width: 100%; margin-top: auto;margin-bottom: 1rem;">Medium</wa-button>
            <a href="*" style="display: inline-block;width: 100%;text-align: center;">View full details</a>
          </form>
        </section>
      </div>
    </div>
  </wa-card>
<style>
  .large-selector .card-body {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;

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
