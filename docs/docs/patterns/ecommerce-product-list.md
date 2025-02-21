---
title: Product Lists
description: 'Let shoppers browse and compare products with detailed lists of the products in your store.'
parent: ecommerce
tags: e-commerce
---

## With Product Grid

```html{.example}
  <div class="wa-grid wa-gap-0" style="max-width: 960px; margin: 0 auto;">
    <div class="wa-stack wa-align-items-center" style="padding: 1.5rem">
      <img class="wa-frame" style="object-fit: contain;" src="https://img.fortawesome.com/cfa83f3c/mad-rabbit-tattoo-7n4fmowsgek-unsplash.jpg" />
      <strong style="margin-top: 1rem;">Shirt</strong>
      <wa-rating label="Rating" readonly value="3" style="--symbol-size: var(--wa-font-size-m);margin-top: .5rem;"></wa-rating>
      <a class="wa-caption-l" href="#">38 Reviews</a>
      <strong style="font-size: var(--wa-font-size-2xl);">$170</strong>
    </div>
    <div class="wa-stack wa-align-items-center" style="padding: 1.5rem">
      <img class="wa-frame" style="object-fit: contain;" src="https://img.fortawesome.com/cfa83f3c/disruptivo-c2trroai5fa-unsplash.jpg" />
      <strong style="margin-top: 1rem;">Shirt</strong>
      <wa-rating label="Rating" readonly value="3" style="--symbol-size: var(--wa-font-size-m);margin-top: .5rem;"></wa-rating>
      <a style="--wa-link-decoration-default: none;--wa-color-text-link: var(--wa-color-gray-50);font-size: var(--wa-font-size-m);" href="#">38 Reviews</a>
      <strong style="font-size: var(--wa-font-size-2xl);">$170</strong>
    </div>
    <div class="wa-stack wa-align-items-center" style="padding: 1.5rem">
      <img class="wa-frame" style="object-fit: contain;" src="https://img.fortawesome.com/cfa83f3c/christian-bolt-vw5vjsknxz8-unsplash.jpg" />
      <strong style="margin-top: 1rem;">Shirt</strong>
      <wa-rating label="Rating" readonly value="3" style="--symbol-size: var(--wa-font-size-m);margin-top: .5rem;"></wa-rating>
      <a style="--wa-link-decoration-default: none;--wa-color-text-link: var(--wa-color-gray-50);font-size: var(--wa-font-size-m);" href="#">38 Reviews</a>
      <strong style="font-size: var(--wa-font-size-2xl);">$170</strong>
    </div>
    <div class="wa-stack wa-align-items-center" style="padding: 1.5rem">
      <img class="wa-frame" style="object-fit: contain;" src="https://img.fortawesome.com/cfa83f3c/marcel-j-uwrcdb5sm-unsplash.jpg" />
      <strong style="margin-top: 1rem;">Shirt</strong>
      <wa-rating label="Rating" readonly value="3" style="--symbol-size: var(--wa-font-size-m);margin-top: .5rem;"></wa-rating>
      <a style="--wa-link-decoration-default: none;--wa-color-text-link: var(--wa-color-gray-50);font-size: var(--wa-font-size-m);" href="#">38 Reviews</a>
      <strong style="font-size: var(--wa-font-size-2xl);">$170</strong>
    </div>

     <div class="wa-stack wa-align-items-center" style="padding: 1.5rem">
      <img class="wa-frame" style="object-fit: contain;" src="https://img.fortawesome.com/cfa83f3c/mad-rabbit-tattoo-7n4fmowsgek-unsplash.jpg" />
      <strong style="margin-top: 1rem;">Shirt</strong>
      <wa-rating label="Rating" readonly value="3" style="--symbol-size: var(--wa-font-size-m);margin-top: .5rem;"></wa-rating>
      <a style="--wa-link-decoration-default: none;--wa-color-text-link: var(--wa-color-gray-50);font-size: var(--wa-font-size-m);" href="#">38 Reviews</a>
      <strong style="font-size: var(--wa-font-size-2xl);">$170</strong>
    </div>
    <div class="wa-stack wa-align-items-center" style="padding: 1.5rem">
      <img class="wa-frame" style="object-fit: contain;" src="https://img.fortawesome.com/cfa83f3c/disruptivo-c2trroai5fa-unsplash.jpg" />
      <strong style="margin-top: 1rem;">Shirt</strong>
      <wa-rating label="Rating" readonly value="3" style="--symbol-size: var(--wa-font-size-m);margin-top: .5rem;"></wa-rating>
      <a style="--wa-link-decoration-default: none;--wa-color-text-link: var(--wa-color-gray-50);font-size: var(--wa-font-size-m);" href="#">38 Reviews</a>
      <strong style="font-size: var(--wa-font-size-2xl);">$170</strong>
    </div>
    <div class="wa-stack wa-align-items-center" style="padding: 1.5rem">
      <img class="wa-frame" style="object-fit: contain;" src="https://img.fortawesome.com/cfa83f3c/christian-bolt-vw5vjsknxz8-unsplash.jpg" />
      <strong style="margin-top: 1rem;">Shirt</strong>
      <wa-rating label="Rating" readonly value="3" style="--symbol-size: var(--wa-font-size-m);margin-top: .5rem;"></wa-rating>
      <a style="--wa-link-decoration-default: none;--wa-color-text-link: var(--wa-color-gray-50);font-size: var(--wa-font-size-m);" href="#">38 Reviews</a>
      <strong style="font-size: var(--wa-font-size-2xl);">$170</strong>
    </div>
    <div class="wa-stack wa-align-items-center" style="padding: 1.5rem">
      <img class="wa-frame" style="object-fit: contain;" src="https://img.fortawesome.com/cfa83f3c/marcel-j-uwrcdb5sm-unsplash.jpg" />
      <strong style="margin-top: 1rem;">Shirt</strong>
      <wa-rating label="Rating" readonly value="3" style="--symbol-size: var(--wa-font-size-m);margin-top: .5rem;"></wa-rating>
      <a style="--wa-link-decoration-default: none;--wa-color-text-link: var(--wa-color-gray-50);font-size: var(--wa-font-size-m);" href="#">38 Reviews</a>
      <strong style="font-size: var(--wa-font-size-2xl);">$170</strong>
    </div>
  </div>
```
## Card with Details
```html{.example}
  <div class="wa-grid card-with-details" style="--min-column-size: 32ch; max-width: 960px; margin: 0 auto;">
   <wa-card with-image with-footer>
    <img slot="image" src="https://img.fortawesome.com/cfa83f3c/mad-rabbit-tattoo-7n4fmowsgek-unsplash.jpg" alt="">
    <div slot="footer" class="wa-stack">
      <strong style="font-size: var(--wa-font-size-l);">Basic Tee 8-pack</strong>
      <p class="wa-caption-l">Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.</p>
      <span style="color: var(--wa-color-gray-50);font-style: italic;">8 colors</span>
      <strong style="font-size: var(--wa-font-size-xl);">$256</strong>
    </div>
   </wa-card>
    <wa-card with-image with-footer>
    <img slot="image" src="https://img.fortawesome.com/cfa83f3c/creative.jpg" />
    <div slot="footer" class="wa-stack">
      <strong style="font-size: var(--wa-font-size-l);">Basic Tee 8-pack</strong>
      <p class="wa-caption-l">Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.</p>
      <span style="color: var(--wa-color-gray-50);font-style: italic;">8 colors</span>
      <strong style="font-size: var(--wa-font-size-xl);">$256</strong>
    </div>
   </wa-card>
    <wa-card with-image with-footer>
    <img slot="image" src="https://img.fortawesome.com/cfa83f3c/christian-bolt-vw5vjsknxz8-unsplash.jpg" />
    <div slot="footer" class="wa-stack">
      <strong style="font-size: var(--wa-font-size-l);">Basic Tee 8-pack</strong>
      <p class="wa-caption-l">Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.</p>
      <span style="color: var(--wa-color-gray-50);font-style: italic;">8 colors</span>
      <strong style="font-size: var(--wa-font-size-xl);">$256</strong>
    </div>
   </wa-card>
    <wa-card with-image with-footer>
    <img slot="image" src="https://img.fortawesome.com/cfa83f3c/marcel-j-uwrcdb5sm-unsplash.jpg" />
    <div slot="footer" class="wa-stack">
      <strong style="font-size: var(--wa-font-size-l);">Basic Tee 8-pack</strong>
      <p class="wa-caption-l">Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.</p>
      <span style="color: var(--wa-color-gray-50);font-style: italic;">8 colors</span>
      <strong style="font-size: var(--wa-font-size-xl);">$256</strong>
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
