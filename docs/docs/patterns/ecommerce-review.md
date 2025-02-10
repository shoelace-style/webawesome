---
title: Product Reviews
description: 'Display reviews, ratings and testimonials for potential customers.'
parent: ecommerce
tags: e-commerce
---

### Product Review

```html {.example}
<div>
  <div>
    <h2>Customer Reviews</h2>
    <div>
      <wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating> Based on 1624 reviews
    </div>
    <div style="margin-bottom: 2rem;">
      <span><wa-progress-bar value="50"></wa-progress-bar></span>
      <h3>Share your Thoughts</h3>
      <p>If you’ve used this product, share your thoughts with other customers</p>
      <wa-button size="medium">Write a Review</wa-button>
    </div>
  </div>
  <div style="margin-top: 1rem;">
    <div>
      <div class="customer-list-item">
        <span style="display: flex; align-items: center;">
          <wa-avatar image="https://source.unsplash.com/bman-wearing-henley-top-portrait-7YVZYZeITc8" label="man-wearing-henley" style="margin-right: 1rem;"></wa-avatar>
          <span style="display: flex; flex-direction: column">Mark Henry <wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating></span>
        </span>
        <p><em>I initially had my doubts, but once I got the widgets and played around with them, I became a believer.</em></p>
      </div>
      <div class="customer-list-item">
        <span style="display: flex; align-items: center;">
          <wa-avatar image="https://source.unsplash.com/woman-wearing-black-crew-neck-shirt-3TLl_97HNJo" label="lady-in-turtleneck" style="margin-right: 1rem;"></wa-avatar>
          <span style="display: flex; flex-direction: column">Liz Michaels <wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating></span>
        </span>
        <p><em>I'd definitely but these again.</em></p>
      </div>
      <div class="customer-list-item">
        <span style="display: flex; align-items: center;">
          <wa-avatar image="https://source.unsplash.com/man-with-index-finger-on-lips-RukI4qZGlQs" label="man-with-hair" style="margin-right: 1rem;"></wa-avatar>
          <span style="display: flex; flex-direction: column">Todd Smith <wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating></span>
        </span>
        <p><em>It was everything I wanted and more, would totally recommend.</em></p>
      </div>
    </div>
  </div>
</div>

<style>
  :root {
    --border-color: var(--wa-color-surface-border);
  }

  .customer-list-item {
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 1rem;
  }

  .cart-item-image {
    width: 100%;
  }
</style>
```