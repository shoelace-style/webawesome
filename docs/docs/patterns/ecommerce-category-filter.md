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
    <wa-select placeholder="Sort">
      <wa-option value="option-1">Most Popular</wa-option>
      <wa-option value="option-2">Best Rating</wa-option>
      <wa-option value="option-3">Newest</wa-option>
    </wa-select>
  </div>
  <div class="category-filter-container">
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
  </div>
  <div class="product-list">
    <wa-card with-image with-footer class="card-overview">
  <img
    slot="image"
    src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
    alt="A kitten sits patiently between a terracotta pot and decorative grasses."
  />

  <strong>Mittens</strong><br />
  This kitten is as cute as he is playful. Bring him home today!<br />
  <small>6 weeks old</small>

  <div slot="footer">
    <wa-button variant="brand" pill>More Info</wa-button>
    <wa-rating></wa-rating>
  </div>
</wa-card>
<wa-card with-image with-footer class="card-overview">
  <img
    slot="image"
    src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
    alt="A kitten sits patiently between a terracotta pot and decorative grasses."
  />

  <strong>Mittens</strong><br />
  This kitten is as cute as he is playful. Bring him home today!<br />
  <small>6 weeks old</small>

  <div slot="footer">
    <wa-button variant="brand" pill>More Info</wa-button>
    <wa-rating></wa-rating>
  </div>
</wa-card>
  </div>
</div>

<style>
  .category-filter {
    wa-details::part(content) {
      display: flex;
      flex-direction: column;

     
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
  }
  .category-filter-container {
     margin-bottom: 1rem;
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
