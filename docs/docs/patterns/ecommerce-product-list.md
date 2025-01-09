---
title: Product Lists
description: TODO
parent: ecommerce
tags: e-commerce
---

TODO Page Description
## With Product Grid

```html{.example}
  <div class="with-product-grid">
    <div class="grid-item">
      <img class="grid-item-image" src="/assets/images/patterns/mad-rabbit-tattoo-7N4FMowSGek-unsplash.jpg" />
      <div class="grid-item-name">Shirt</div>
      <wa-rating label="Rating" readonly value="3"></wa-rating>
      <a class="grid-item-reviews" href="#">38 Reviews</a>
      <div class="grid-item-price">$170</div>
    </div>
    <div class="grid-item">
      <img class="grid-item-image" src="/assets/images/patterns/mad-rabbit-tattoo-7N4FMowSGek-unsplash.jpg" />
      <div class="grid-item-name">Shirt</div>
      <wa-rating label="Rating" readonly value="3"></wa-rating>
      <a class="grid-item-reviews" href="#">38 Reviews</a>
      <div class="grid-item-price">$170</div>
    </div>
    <div class="grid-item">
      <img class="grid-item-image" src="/assets/images/patterns/mad-rabbit-tattoo-7N4FMowSGek-unsplash.jpg" />
      <div class="grid-item-name">Shirt</div>
      <wa-rating label="Rating" readonly value="3"></wa-rating>
      <a class="grid-item-reviews" href="#">38 Reviews</a>
      <div class="grid-item-price">$170</div>
    </div>
    <div class="grid-item">
      <img class="grid-item-image" src="/assets/images/patterns/mad-rabbit-tattoo-7N4FMowSGek-unsplash.jpg" />
      <div class="grid-item-name">Shirt</div>
      <wa-rating label="Rating" readonly value="3"></wa-rating>
      <a class="grid-item-reviews" href="#">38 Reviews</a>
      <div class="grid-item-price">$170</div>
    </div>
  </div>
  <style>
    .with-product-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      border: var(--wa-panel-border-width) var(--wa-border-style) var(--wa-color-neutral-border-quiet);

      .grid-item {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .grid-item:nth-of-type(odd) {

        border-right: var(--wa-panel-border-width) var(--wa-border-style) var(--wa-color-neutral-border-quiet);
      }
      .grid-item:not(:nth-last-child(-n + 2)) {
        border-bottom: var(--wa-panel-border-width) var(--wa-border-style) var(--wa-color-neutral-border-quiet);
      }

      .grid-item-image {
        width: 100%;
        object-fit: cover;
      }

      .grid-item-name {
        margin-top: 1rem;
        font-weight: var(--wa-font-weight-bold);
      }

      .grid-item wa-rating {
        --symbol-size: var(--wa-font-size-m);
        margin-top: .5rem;
      }
      .grid-item-reviews {
        --wa-link-decoration-default: none;
        --wa-color-text-link: var(--wa-color-gray-50);
        font-size: var(--wa-font-size-m);
      }
      .grid-item-price {
        font-size: var(--wa-font-size-2xl);
        font-weight: var(--wa-font-weight-bold);
      }
    }
  </style>
```
## Card with full details
```html{.example}
  <div class="card-with-details">
   <wa-card with-footer>
    <img class="grid-item-image" src="/assets/images/patterns/mad-rabbit-tattoo-7N4FMowSGek-unsplash.jpg" />
    <div slot="footer" class="card-footer details">
      <span class="detail-name">Basic Tee 8-pack</span>
      <p class="detail-description">Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.</p>
      <span class="detail-color">8 colors</span>
      <span class="detail-price">$256</span>
    </div>
   </wa-card>
   <wa-card with-footer>
    <img class="grid-item-image" src="/assets/images/patterns/mad-rabbit-tattoo-7N4FMowSGek-unsplash.jpg" />
    <div slot="footer" class="card-footer details">
      <span class="detail-name">Basic Tee 8-pack</span>
      <p class="detail-description">Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.</p>
      <span class="detail-color">8 colors</span>
      <span class="detail-price">$256</span>
    </div>
   </wa-card>
   <wa-card with-footer>
    <img class="grid-item-image" src="/assets/images/patterns/mad-rabbit-tattoo-7N4FMowSGek-unsplash.jpg" />
    <div slot="footer" class="card-footer details">
      <span class="detail-name">Basic Tee 8-pack</span>
      <p class="detail-description">Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.</p>
      <span class="detail-color">8 colors</span>
      <span class="detail-price">$256</span>
    </div>
   </wa-card>
   <wa-card with-footer>
    <img class="grid-item-image" src="/assets/images/patterns/mad-rabbit-tattoo-7N4FMowSGek-unsplash.jpg" />
    <div slot="footer" class="card-footer details">
      <span class="detail-name">Basic Tee 8-pack</span>
      <p class="detail-description">Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.</p>
      <span class="detail-color">8 colors</span>
      <span class="detail-price">$256</span>
    </div>
   </wa-card>
  </div>
  <style>
    .card-with-details {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
    .card-with-details wa-card::part(body) {
        padding: 0;
      }
    .card-with-details .card-footer {
      display: flex;
      flex-direction: column;
    }

    .details {
      .detail-description {
        color: var(--wa-color-gray-50);
      }
      .detail-name {
        font-size: var(--wa-font-size-l);
        font-weight: var(--wa-font-weight-action);
      }
      .detail-color {
        color: var(--wa-color-gray-50);
        font-style: italic;
      }
      .detail-price {
        font-size: var(--wa-font-size-xl);
        font-weight: var(--wa-font-weight-action);
      }
    }

  </style>
```
## With color swatches (WIP)
```html{.example}

```
