---
title: Category Filter
description: TODO
parent: ecommerce
tags: e-commerce
---

TODO Page Description

## With inline actions and expandable sidebar filters
```html{.example}
<div class="category-filter">
  <div style="display: flex; justify-content: space-between; align-itemst: flex-start;">
    <h1>New Arrivals</h1>
  </div>
  <div class="category-filter-container">
    <form>
      <wa-checkbox>All Products</wa-checkbox>
      <wa-checkbox>Sale</wa-checkbox>
      <wa-checkbox>Travel</wa-checkbox>
      <wa-checkbox>Organization</wa-checkbox>
      <wa-checkbox>Accessories</wa-checkbox>
    <wa-details summary="Color" open>
      <wa-checkbox>White</wa-checkbox>
      <wa-checkbox>Beige</wa-checkbox>
      <wa-checkbox>Blue</wa-checkbox>
      <wa-checkbox>Brown</wa-checkbox>
      <wa-checkbox>Green</wa-checkbox>
    </wa-details>
    <wa-details summary="Category">
      <wa-checkbox>Sale</wa-checkbox>
      <wa-checkbox>Travel</wa-checkbox>
      <wa-checkbox>Organization</wa-checkbox>
      <wa-checkbox>Accessories</wa-checkbox>
    </wa-details>
    <wa-details summary="Size">
      <wa-checkbox>Small</wa-checkbox>
      <wa-checkbox>Medium</wa-checkbox>
      <wa-checkbox>Large</wa-checkbox>
      <wa-checkbox>XL</wa-checkbox>
      <wa-checkbox>2XL</wa-checkbox>
    </wa-details>
    </form>
    
  </div>
  <div class="product-list wa-grid">
   <div></div>
   <div></div>
   <div></div>
   <div></div>
  <div></div>
  <div></div>
  </div>
</div>

<style>
  .category-filter {
    wa-details::part(content) {
      display: flex;
      flex-direction: column;
    }

    form > wa-details:not(:last-of-type) {
      margin-bottom: 1rem;
    }
    form > wa-checkbox {
      display: block;
      margin-bottom: 1rem;
    }
     wa-details wa-checkbox {
        margin-bottom: 1rem;
      }

      .card-overview {
    max-width: 300px;
  }

  .card-overview small {
    color: var(--wa-color-text-quiet);
  }

  .card-overview [slot='footer'] {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  [class*='wa-grid'] div:empty {
    background-color: var(--wa-color-indigo-60);
    border-radius: var(--wa-border-radius-m);
    min-block-size: 4rem;
    min-inline-size: 4rem;
    aspect-ratio: 1/1;
  }
  }
  .category-filter-container {
     margin-bottom: 1rem;
     padding-top: 1rem;
     padding-bottom: 1rem;
     border-top: var(--wa-panel-border-width) var(--wa-panel-border-style) var(--wa-color-surface-border);
     border-bottom: var(--wa-panel-border-width) var(--wa-panel-border-style) var(--wa-color-surface-border)
  }
</style>
<script>
  const container = document.querySelector('.category-filter-container');

  // Close all other details when one is shown
  container.addEventListener('wa-show', event => {
    if (event.target.localName === 'wa-details') {
      [...container.querySelectorAll('wa-details')].map(details => (details.open = event.target === details));
    }
  });
</script>
```
