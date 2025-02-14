---
title: Category Filter
description: 'Helps the user find the right products with filters to refine search results by specific attributes.'
parent: ecommerce
tags: e-commerce
icon: checkbox
---

<style>
  [class*='wa-grid'] div:empty {
    background-color: var(--wa-color-indigo-60);
    border-radius: var(--wa-border-radius-m);
    min-block-size: 4rem;
    min-inline-size: 4rem;
    aspect-ratio: 1/1;
  }
</style>

## Sidebar with Checkboxes & Expandable Filters

```html{.example}
<div class="category-filter">
  <div>
    <h1>New Arrivals</h1>
  </div>
  <div class="wa-flank wa-align-items-start" style="--flank-size: 200px;">
    <div style="margin-bottom: var(--wa-size);padding: var(--wa-size) 0;">
      <form>
        <wa-checkbox>All Products</wa-checkbox>
        <wa-checkbox>Sale</wa-checkbox>
        <wa-checkbox>Travel</wa-checkbox>
        <wa-checkbox>Organization</wa-checkbox>
        <wa-checkbox>Accessories</wa-checkbox>
        <wa-details summary="Color" style="margin-bottom:var(--wa-size);" open>
          <wa-checkbox>White</wa-checkbox>
          <wa-checkbox>Beige</wa-checkbox>
          <wa-checkbox>Blue</wa-checkbox>
          <wa-checkbox>Brown</wa-checkbox>
          <wa-checkbox>Green</wa-checkbox>
        </wa-details>
        <wa-details summary="Category" style="margin-bottom:var(--wa-size);">
          <wa-checkbox>Outdoor</wa-checkbox>
          <wa-checkbox>Indoor</wa-checkbox>
          <wa-checkbox>All Weather</wa-checkbox>
        </wa-details>
        <wa-details summary="Size" style="margin-bottom:var(--wa-size);">
          <wa-checkbox>Small</wa-checkbox>
          <wa-checkbox>Medium</wa-checkbox>
          <wa-checkbox>Large</wa-checkbox>
          <wa-checkbox>XL</wa-checkbox>
          <wa-checkbox>2XL</wa-checkbox>
        </wa-details>
      </form> 
    </div>
    <div class="wa-grid">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</div>
<style>
  .category-filter {
    wa-details::part(content) {
      display: flex;
      flex-direction: column;
    }
    form > wa-checkbox {
      display: block;
      margin-bottom: 1rem;
    }
    wa-details wa-checkbox {
      margin-bottom: 1rem;
    }
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

## Sidebar with Dropdowns

```html{.example}
<div class="filter-with-dropdowns">
  <div>
    <h1>New Arrivals</h1>
  </div>
  <div class="wa-flank wa-align-items-start">
    <div>
      <wa-select label="Product Type" placeholder="Products" value="all-products" style="padding-bottom: var(--wa-size); margin-bottom: var(--wa-size); border-bottom: var(--wa-panel-border-width) var(--wa-panel-border-style) var(--wa-color-surface-border)">
        <wa-option value="all-products">All Products</wa-option>
        <wa-option value="sale">Sale</wa-option>
        <wa-option value="travel">Travel</wa-option>
        <wa-option value="organization">Organization</wa-option>
        <wa-option value="accessories">Accessories</wa-option>
      </wa-select>
      <div>
        <wa-select label="Color" placeholder="pick a color" value="black" style="margin-bottom: var(--wa-size);">
          <wa-option value="black">Black</wa-option>
          <wa-option value="white">White</wa-option>
          <wa-option value="gray">Gray</wa-option>
        </wa-select>
        <wa-select label="Category" placeholder="Category" value="outdoor" style="margin-bottom: var(--wa-size);">
          <wa-option value="outdoor">Outdoor</wa-option>
          <wa-option value="indoor">Indoor</wa-option>
          <wa-option value="all-weather">All Weather</wa-option>
        </wa-select>
        <wa-select label="Size" placeholder="Size" value="extra-extra-large" style="margin-bottom: var(--wa-size);">
          <wa-option value="small">Small</wa-option>
          <wa-option value="medium">Medium</wa-option>
          <wa-option value="large">Large</wa-option>
          <wa-option value="extra-large">XL</wa-option>
          <wa-option value="extra-extra-large">XL</wa-option>
        </wa-select>
      </div>
    </div>
    <div class="wa-grid">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</div>
```