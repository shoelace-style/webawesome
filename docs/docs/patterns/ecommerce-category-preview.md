---
title: Category Preview
description: 'Help shoppers discover your product offerings with showcases of product categories.'
parent: ecommerce
tags: e-commerce
icon: preview
---

## 2 Column
```html{.example}
<div class="wa-flank wa-align-items-start" style="--flank-size: 320px;">
  <div class="wa-gap-2xl wa-stack">
    <div class="wa-stack">
      <span class="wa-heading-xl">Casual Collection</span>
      <p class="wa-caption-l" style="--wa-line-height-condensed: 24px;">Look good - without looking like you're trying too hard. Our casual collection includes laid back styles that work in <em>almost</em> any situation</p>
    </div>
    <wa-button variant="brand">View the collection</wa-button>
  </div>
  <div>
  <img class="wa-frame:landscape" src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
  </div>
</div>
```

## 3 Column
```html{.example}
<div class="wa-stack">
    <h2 class="wa-heading-l">Shop by Category</h2>
  <div class="wa-grid">
    <a  href="*"class="wa-stack" style="--wa-link-decoration-default: none;">
      <img src="https://uploads.webawesome.com/organization.jpg" />
      <span class="wa-caption-xl">Organization</span>
    
    </a>
    <a href="*" class="wa-stack" style="--wa-link-decoration-default: none;">
      <img src="https://uploads.webawesome.com/bags.jpg" />
        <span class="wa-caption-xl">Bags</span>
  
    </a>
    <a href="*" class="wa-stack" style="--wa-link-decoration-default: none;">
      <img src="https://uploads.webawesome.com/outdoor-2.jpg" />
      <span class="wa-caption-xl">Outdoor</span>
     
    </a>
  </div>
</div>
```

## 3 Column with Card

```html{.example}
<div class="wa-stack">
  <div class="wa-split">
    <h1>Shop by Category</h1>
    <a href="#" class="wa-cluster">Browse all Categories  <wa-icon name="arrow-right"></wa-icon></a>
  </div>
  <div class="wa-grid">
    <a href="*" style="--wa-link-decoration-default: none;">
      <wa-card with-image>
        <img
          slot="image"
          src="https://img.fortawesome.com/cfa83f3c/outdoor-3x.jpg"
          alt="Durable gear for all conditions"
        />
        <span class="wa-heading-m">Outdoor</span>
        <p class="wa-caption-l" style="margin:0"><em>Durable gear for all conditions</em></p>
      </wa-card>
    </a>
    <a href="*" style="--wa-link-decoration-default: none;">
      <wa-card with-image>
        <img
          slot="image"
          src="https://img.fortawesome.com/cfa83f3c/home.jpg"
          alt="Cozy up on the couch and relax"
        />
      <span class="wa-heading-m">Home</span>
      <p class="wa-caption-l" style="margin:0"><em>Cozy up on the couch and relax</em></p>
      </wa-card>
    </a>
    <a href="*" style="--wa-link-decoration-default: none;">
      <wa-card with-image>
        <img
          slot="image"
          src="https://img.fortawesome.com/cfa83f3c/fitness.jpg"
          alt="Get fit in style with our breathable poly blends"
        />
        <span class="wa-heading-m">Active</span>
        <p class="wa-caption-l" style="margin:0"><em>Get fit in style with our breathable poly blends</em></p>
      </wa-card>
    </a>
  </div>
</div>
```
## Split Panel

```html{.example}
<div class="wa-stack" style="max-width: 960px; margin: 0 auto;">
  <div class="wa-stack wa-gap-xs wa-align-items-center">
    <h2 class="wa-heading-xl">New Arrivals</h2>
    <p class="wa-caption-l">We have brand new furniture for you to choose from that will accentuate your home aesthetic</p>
  </div>
<div class="wa-grid">
  <div class="wa-stack">
  <img class="wa-frame" src="https://uploads.webawesome.com/indoor-furniture.jpg" />
    <div class="wa-gap-2xl wa-stack">
    <wa-button appearance="outlined">View Indoor Furniture</wa-button>
  </div>
  </div>
  <div class="wa-stack">
    <img class="wa-frame" src="https://uploads.webawesome.com/outdoor-furniture.jpg" />
    <div class="wa-gap-2xl wa-stack">
    <wa-button appearance="outlined">View Outdoor Furniture</wa-button>
  </div>
  </div>
</div>
</div>
```
