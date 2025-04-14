---
title: Category Filter
description: 'Helps the user find the right products with filters to refine search results by specific attributes.'
icon: checkbox
isPro: true
---

## Sidebar with Checkboxes & Expandable Filters

```html{.example}
  <h1>New Arrivals</h1>
  <div class="wa-flank wa-align-items-start" style="--flank-size: 200px;">
    <form class="wa-stack">
      <wa-checkbox checked>All Products</wa-checkbox>
      <wa-checkbox>Sale</wa-checkbox>
      <wa-checkbox>Travel</wa-checkbox>
      <wa-checkbox>Organization</wa-checkbox>
      <wa-checkbox>Accessories</wa-checkbox>
      <wa-details summary="Color" open>
        <div class="wa-stack">
          <wa-checkbox>White</wa-checkbox>
          <wa-checkbox>Beige</wa-checkbox>
          <wa-checkbox>Blue</wa-checkbox>
          <wa-checkbox>Brown</wa-checkbox>
          <wa-checkbox>Green</wa-checkbox>
        </div>
      </wa-details>
      <wa-details summary="Category">
        <div class="wa-stack">
          <wa-checkbox>Outdoor</wa-checkbox>
          <wa-checkbox>Indoor</wa-checkbox>
          <wa-checkbox>All Weather</wa-checkbox>
        </div>
      </wa-details>
      <wa-details summary="Size">
        <div class="wa-stack">
          <wa-checkbox>Small</wa-checkbox>
          <wa-checkbox>Medium</wa-checkbox>
          <wa-checkbox>Large</wa-checkbox>
          <wa-checkbox>XL</wa-checkbox>
          <wa-checkbox>XXL</wa-checkbox>
        </div>
      </wa-details>
    </form>
    <div class="wa-placeholder"></div>
  </div>
</div>
```

## Sidebar with Dropdowns

```html{.example}
  <h1>New Arrivals</h1>
 <div class="wa-flank wa-align-items-start">
  <div class="wa-stack">
    <wa-select label="Product Type" placeholder="Products" value="all-products">
      <wa-option value="all-products">All Products</wa-option>
      <wa-option value="sale">Sale</wa-option>
      <wa-option value="travel">Travel</wa-option>
      <wa-option value="organization">Organization</wa-option>
      <wa-option value="accessories">Accessories</wa-option>
    </wa-select>
    <wa-divider></wa-divider>
    <wa-select label="Color" placeholder="Color" value="black" multiple>
      <wa-option value="black">Black</wa-option>
      <wa-option value="white">White</wa-option>
      <wa-option value="gray">Gray</wa-option>
    </wa-select>
    <wa-select label="Category" placeholder="Category" value="outdoor" multiple>
      <wa-option value="outdoor">Outdoor</wa-option>
      <wa-option value="indoor">Indoor</wa-option>
      <wa-option value="all-weather">All Weather</wa-option>
    </wa-select>
    <wa-select label="Size" placeholder="Size" value="xl xxl" multiple>
      <wa-option value="s">Small</wa-option>
      <wa-option value="m">Medium</wa-option>
      <wa-option value="l">Large</wa-option>
      <wa-option value="xl">XL</wa-option>
      <wa-option value="xxl">XXL</wa-option>
    </wa-select>
  </div>
  <div class="wa-placeholder"></div>
</div>
```