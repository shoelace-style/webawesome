---
title: Product Lists
description: 'Let shoppers browse and compare products with detailed lists of the products in your store.'
parent: ecommerce
tags: e-commerce
---

## With Product Grid

```html{.example}
  <div class="wa-grid wa-gap-0" style="--min-column-size: 50ch;border: var(--wa-panel-border-width) var(--wa-border-style) var(--wa-color-neutral-border-quiet);">
    <div class="wa-stack wa-align-items-center" style="padding: 1.5rem">
      <img style="width: 100%;object-fit: cover;height: 100%;" src="https://img.fortawesome.com/cfa83f3c/mad-rabbit-tattoo-7n4fmowsgek-unsplash.jpg" />
      <div style="margin-top: 1rem;font-weight: var(--wa-font-weight-bold);">Shirt</div>
      <wa-rating label="Rating" readonly value="3" style="--symbol-size: var(--wa-font-size-m);margin-top: .5rem;"></wa-rating>
      <a style="--wa-link-decoration-default: none;--wa-color-text-link: var(--wa-color-gray-50);font-size: var(--wa-font-size-m);" href="#">38 Reviews</a>
      <div style="font-size: var(--wa-font-size-2xl);font-weight: var(--wa-font-weight-bold);">$170</div>
    </div>
    <div class="wa-stack wa-align-items-center" style="padding: 1.5rem">
      <img style="width: 100%;object-fit: cover;height: 100%;" src="https://img.fortawesome.com/cfa83f3c/disruptivo-c2trroai5fa-unsplash.jpg" />
      <div style="margin-top: 1rem;font-weight: var(--wa-font-weight-bold);">Shirt</div>
      <wa-rating label="Rating" readonly value="3" style="--symbol-size: var(--wa-font-size-m);margin-top: .5rem;"></wa-rating>
      <a style="--wa-link-decoration-default: none;--wa-color-text-link: var(--wa-color-gray-50);font-size: var(--wa-font-size-m);" href="#">38 Reviews</a>
      <div style="font-size: var(--wa-font-size-2xl);font-weight: var(--wa-font-weight-bold);">$170</div>
    </div>
    <div class="wa-stack wa-align-items-center" style="padding: 1.5rem">
      <img style="width: 100%;object-fit: cover;height: 100%;" src="https://img.fortawesome.com/cfa83f3c/christian-bolt-vw5vjsknxz8-unsplash.jpg" />
      <div style="margin-top: 1rem;font-weight: var(--wa-font-weight-bold);">Shirt</div>
      <wa-rating label="Rating" readonly value="3" style="--symbol-size: var(--wa-font-size-m);margin-top: .5rem;"></wa-rating>
      <a style="--wa-link-decoration-default: none;--wa-color-text-link: var(--wa-color-gray-50);font-size: var(--wa-font-size-m);" href="#">38 Reviews</a>
      <div style="font-size: var(--wa-font-size-2xl);font-weight: var(--wa-font-weight-bold);">$170</div>
    </div>
    <div class="wa-stack wa-align-items-center" style="padding: 1.5rem">
      <img style="width: 100%;object-fit: cover;height: 100%;" src="https://img.fortawesome.com/cfa83f3c/marcel-j-uwrcdb5sm-unsplash.jpg" />
      <div style="margin-top: 1rem;font-weight: var(--wa-font-weight-bold);">Shirt</div>
      <wa-rating label="Rating" readonly value="3" style="--symbol-size: var(--wa-font-size-m);margin-top: .5rem;"></wa-rating>
      <a style="--wa-link-decoration-default: none;--wa-color-text-link: var(--wa-color-gray-50);font-size: var(--wa-font-size-m);" href="#">38 Reviews</a>
      <div style="font-size: var(--wa-font-size-2xl);font-weight: var(--wa-font-weight-bold);">$170</div>
    </div>
  </div>
```
## Card with Details
```html{.example}
  <div class="wa-grid card-with-details" style="--min-column-size: 50ch">
   <wa-card with-image with-footer>
    <img slot="image" src="https://img.fortawesome.com/cfa83f3c/mad-rabbit-tattoo-7n4fmowsgek-unsplash.jpg" alt="">
    <div slot="footer" class="wa-stack">
      <span style="font-size: var(--wa-font-size-l);font-weight: var(--wa-font-weight-action);">Basic Tee 8-pack</span>
      <p style="color: var(--wa-color-gray-50);">Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.</p>
      <span style="color: var(--wa-color-gray-50);font-style: italic;">8 colors</span>
      <span style="font-size: var(--wa-font-size-xl);font-weight: var(--wa-font-weight-action);">$256</span>
    </div>
   </wa-card>
    <wa-card with-image with-footer>
    <img slot="image" src="https://img.fortawesome.com/cfa83f3c/creative.jpg" />
    <div slot="footer" class="wa-stack">
      <span style="font-size: var(--wa-font-size-l);font-weight: var(--wa-font-weight-action);">Basic Tee 8-pack</span>
      <p style="color: var(--wa-color-gray-50);">Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.</p>
      <span style="color: var(--wa-color-gray-50);font-style: italic;">8 colors</span>
      <span style="font-size: var(--wa-font-size-xl);font-weight: var(--wa-font-weight-action);">$256</span>
    </div>
   </wa-card>
    <wa-card with-image with-footer>
    <img slot="image" src="https://img.fortawesome.com/cfa83f3c/christian-bolt-vw5vjsknxz8-unsplash.jpg" />
    <div slot="footer" class="wa-stack">
      <span style="font-size: var(--wa-font-size-l);font-weight: var(--wa-font-weight-action);">Basic Tee 8-pack</span>
      <p style="color: var(--wa-color-gray-50);">Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.</p>
      <span style="color: var(--wa-color-gray-50);font-style: italic;">8 colors</span>
      <span style="font-size: var(--wa-font-size-xl);font-weight: var(--wa-font-weight-action);">$256</span>
    </div>
   </wa-card>
    <wa-card with-image with-footer>
    <img slot="image" src="https://img.fortawesome.com/cfa83f3c/marcel-j-uwrcdb5sm-unsplash.jpg" />
    <div slot="footer" class="wa-stack">
      <span style="font-size: var(--wa-font-size-l);font-weight: var(--wa-font-weight-action);">Basic Tee 8-pack</span>
      <p style="color: var(--wa-color-gray-50);">Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.</p>
      <span style="color: var(--wa-color-gray-50);font-style: italic;">8 colors</span>
      <span style="font-size: var(--wa-font-size-xl);font-weight: var(--wa-font-weight-action);">$256</span>
    </div>
   </wa-card>
  </div>
  <style>
    .card-with-details wa-card::part(body) {
        padding: 0;
      }
  </style>
```
<!-- ## With Color Swatches (WIP)
```html{.example}

``` -->
