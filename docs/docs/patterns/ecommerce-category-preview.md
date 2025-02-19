---
title: Category Preview
description: 'Help shoppers discover your product offerings with showcases of product categories.'
parent: ecommerce
tags: e-commerce
icon: preview
---

<style>
  [class*='wa-'] div:empty {
    --aspect-ratio: 1/1;
    background-color: var(--wa-color-indigo-60);
    border-radius: var(--wa-border-radius-m);
    min-block-size: 4rem;
    min-inline-size: 4rem;
    aspect-ratio: var(--aspect-ratio);
  }
</style>

## Grid Tiles

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
```

## Mosaic Tiles

```html{.example}
<div class="mosaic wa-stack">
  <div class="wa-split" sty>
    <h1>Shop by Category</h1>
    <a href="#">Browse all Categories</a>
  </div>
  <div class="wa-stack">
    <div style="--aspect-ratio: 1/.25"></div>
    <div class="wa-grid">
      <div></div>
      <div></div>
    </div>
     <div style="--aspect-ratio: 1/.25"></div>
  </div>
</div>
```
