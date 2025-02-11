---
title: Category Preview
description: 'Showcase different product categories, help customers find what you have to offer in your storefront'
parent: ecommerce
tags: e-commerce
icon: preview
---

## Three Column (WIP)
```html{.example}
<div class="three-column wa-stack">
  <div class="wa-split" sty>
    <h1>Shop by Category</h1>
    <a href="#">Browse all Categories</a>
  </div>
  <div class="category-grid wa-grid">
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
<style>
  .three-column {
     [class*='wa-grid'] div:empty {
    background-color: var(--wa-color-indigo-60);
    border-radius: var(--wa-border-radius-m);
    min-block-size: 4rem;
    min-inline-size: 4rem;
    aspect-ratio: 1/1;
  }
    
  }
</style>
```

```html{.example}
<div class="mosaic wa-stack">
  <div class="wa-split" sty>
    <h1>Shop by Category</h1>
    <a href="#">Browse all Categories</a>
  </div>
  <div class="category-grid wa-grid" style="grid-template-rows: 1fr 1fr 1fr 1fr;">
    <div style="grid-row: 1/-1"></div>
    <div style="grid-row-start: span 2"></div>
    <div style="grid-column-start: 2; grid-row-start: span 2"></div>
  </div>
</div>
<style>
  .mosaic {
     [class*='wa-grid'] div:empty {
    background-color: var(--wa-color-indigo-60);
    border-radius: var(--wa-border-radius-m);
    min-block-size: 10rem;
    min-inline-size: 4rem;
  }
    
  }
</style>
```
