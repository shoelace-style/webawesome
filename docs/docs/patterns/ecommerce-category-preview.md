---
title: Category Preview
description: 'Help shoppers discover your product offerings with showcases of product categories.'
parent: ecommerce
tags: e-commerce
icon: preview
---

## Grid Tiles

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
        <p class="wa-caption-l"><em>Durable gear for all conditions</em></p>
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
      <p class="wa-caption-l"><em>Cozy up on the couch and relax</em></p>
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
        <p class="wa-caption-l"><em>Get fit in style with our breathable poly blends</em></p>
      </wa-card>
    </a>
  </div>
</div>
```

## Mosaic Tiles

```html{.example}
<div class="wa-stack" style="max-width: 960px; margin: 0 auto;">
  <div class="wa-split">
    <h1>Shop by Category</h1>
    <a href="#" class="wa-cluster">Browse all Categories  <wa-icon name="arrow-right"></wa-icon></a>
  </div>
  <div class="wa-stack">
    <div class="wa-grid">
      <a href="*" style="--wa-link-decoration-default: none;">
        <wa-card with-image class="card-image">
          <img
            slot="image"
            src="https://img.fortawesome.com/cfa83f3c/outdoor-3x.jpg"
            alt="Durable gear for all conditions"
          />
          <span class="wa-heading-m">Outdoor</span>
          <p class="wa-caption-l"><em>Durable gear for all conditions</em></p>
        </wa-card>
      </a>
      <a href="*" style="--wa-link-decoration-default: none;">
        <wa-card with-image class="card-image">
          <img
            slot="image"
            src="https://img.fortawesome.com/cfa83f3c/outdoor-3x.jpg"
            alt="Durable gear for all conditions"
          />
          <span class="wa-heading-m">Outdoor</span>
          <p class="wa-caption-l"><em>Durable gear for all conditions</em></p>
        </wa-card>
      </a>
      <a href="*" style="--wa-link-decoration-default: none;">
        <wa-card with-image class="card-image">
          <img
            slot="image"
            src="https://img.fortawesome.com/cfa83f3c/outdoor-3x.jpg"
            alt="Durable gear for all conditions"
          />
          <span class="wa-heading-m">Outdoor</span>
          <p class="wa-caption-l"><em>Durable gear for all conditions</em></p>
        </wa-card>
      </a>
    </div>
    <div class="wa-grid">
      <a href="*" style="--wa-link-decoration-default: none;">
        <wa-card with-image>
          <img
            slot="image"
            src="https://img.fortawesome.com/cfa83f3c/home.jpg"
            alt="Cozy up on the couch and relax"
          />
        <span class="wa-heading-m">Home</span>
        <p class="wa-caption-l"><em>Cozy up on the couch and relax</em></p>
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
          <p class="wa-caption-l"><em>Get fit in style with our breathable poly blends</em></p>
        </wa-card>
      </a>
    </div>
    <a href="*" style="--wa-link-decoration-default: none;">
     <wa-card with-image class="card-image">
      <img
        slot="image"
        src="https://img.fortawesome.com/cfa83f3c/pet.jpg"
        alt="Durable gear for all conditions"
      />
      <span class="wa-heading-m">Animal & Pet</span>
      <p class="wa-caption-l"><em>Don't forget about your four legged friends</em></p>
    </wa-card>
    </a>
  </div>
</div>
```
