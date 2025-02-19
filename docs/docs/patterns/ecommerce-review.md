---
title: Product Reviews
description: 'Help shoppers make informed decisions with ratings, reviews, and testimonials from your customers.'
parent: ecommerce
tags: e-commerce
---

## With Ratings Distribution

```html {.example}
<div style="max-width: 960px; margin: 0 auto;">
  <div class="wa-stack">
    <h2>Customer Reviews</h2>
    <div>
      <wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating> Based on 1624 reviews
    </div>
    <div class="wa-stack" style="margin-bottom: 2rem;">
      <span><wa-progress-bar value="50"></wa-progress-bar></span>
      <h3>Share your Thoughts</h3>
      <p>If you’ve used this product, share your thoughts with other customers</p>
      <wa-button size="medium">Write a Review</wa-button>
    </div>
  </div>
  <div style="margin-top: 1rem;">
    <div>
      <div style="border-bottom: 1px solid var(--border-color);margin-bottom: 1rem;">
        <span class="wa-flank">
          <wa-avatar image="https://source.unsplash.com/bman-wearing-henley-top-portrait-7YVZYZeITc8" label="customer-avatar"></wa-avatar>
          <span style="display: flex; flex-direction: column">Mark Henry <wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating></span>
        </span>
        <p><em>I initially had my doubts, but once I got the widgets and played around with them, I became a believer.</em></p>
      </div>
      <div style="border-bottom: 1px solid var(--border-color);margin-bottom: 1rem;">
        <span class="wa-flank">
          <wa-avatar image="https://source.unsplash.com/woman-wearing-black-crew-neck-shirt-3TLl_97HNJo" label="customer-avatar"></wa-avatar>
          <span style="display: flex; flex-direction: column">Liz Michaels <wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating></span>
        </span>
        <p><em>I'd definitely but these again.</em></p>
      </div>
      <div>
        <span class="wa-flank">
          <wa-avatar image="https://source.unsplash.com/man-with-index-finger-on-lips-RukI4qZGlQs" label="customer-avatar"></wa-avatar>
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
</style>
```

### Two Column

```html{.example}
<div class="wa-stack" style="max-width: 960px; margin: 0 auto;">
  <div class="wa-flank" style="border-bottom: 1px solid var(--border-color);padding-bottom: 1rem;">
    <div class="wa-stack wa-align-items-center">
      <wa-avatar label="User avatar"></wa-avatar>
      <p>Mr. Morale</p>
      <wa-rating label="Rating" precision="0.5" value="5"></wa-rating>
      <div>
      <wa-icon-button name="thumbs-up" label="I don't like this review" style="color: var(--wa-color-success-fill-loud);"></wa-icon-button>
      <wa-icon-button name="thumbs-down" label="I like this review" style="color: var(--wa-color-danger-fill-loud);"></wa-icon-button>
    </div>
    </div>
    <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Nascetur cubilia platea proin; elit consectetur porta? Inceptos nunc consectetur aptent ut ridiculus faucibus per eu egestas. Feugiat feugiat sem consequat magnis primis enim mattis. Scelerisque diam pretium felis primis auctor placerat tempus cras. Non morbi himenaeos vitae hendrerit fringilla. Mauris donec cursus netus pulvinar cras congue dictum quisque. Himenaeos eleifend per gravida dapibus primis ac. Egestas lectus penatibus ullamcorper, aliquam volutpat ullamcorper natoque arcu.</p>
  </div>
  <div class="wa-flank" style="border-bottom: 1px solid var(--border-color);padding-bottom: 1rem;">
    <div class="wa-stack wa-align-items-center">
      <wa-avatar label="User avatar"></wa-avatar>
      <p>Metal Face DOOM</p>
      <wa-rating label="Rating" precision="0.5" value="5"></wa-rating>
      <div>
      <wa-icon-button name="thumbs-up" label="I don't like this review" style="color: var(--wa-color-success-fill-loud);"></wa-icon-button>
      <wa-icon-button name="thumbs-down" label="I like this review" style="color: var(--wa-color-danger-fill-loud);"></wa-icon-button>
    </div>
    </div>
    <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Nascetur cubilia platea proin; elit consectetur porta? Inceptos nunc consectetur aptent ut ridiculus faucibus per eu egestas. Feugiat feugiat sem consequat magnis primis enim mattis. Scelerisque diam pretium felis primis auctor placerat tempus cras. Non morbi himenaeos vitae hendrerit fringilla. Mauris donec cursus netus pulvinar cras congue dictum quisque. Himenaeos eleifend per gravida dapibus primis ac. Egestas lectus penatibus ullamcorper, aliquam volutpat ullamcorper natoque arcu.</p>
  </div>
  <div class="wa-flank" style="border-bottom: 1px solid var(--border-color);padding-bottom: 1rem;">
    <div class="wa-stack wa-align-items-center">
      <wa-avatar label="User avatar"></wa-avatar>
      <p>Tyler Baudelaire</p>
      <wa-rating label="Rating" precision="0.5" value="5"></wa-rating>
      <div>
      <wa-icon-button name="thumbs-up" label="I don't like this review" style="color: var(--wa-color-success-fill-loud);"></wa-icon-button>
      <wa-icon-button name="thumbs-down" label="I like this review" style="color: var(--wa-color-danger-fill-loud);"></wa-icon-button>
    </div>
    </div>
    <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Nascetur cubilia platea proin; elit consectetur porta? Inceptos nunc consectetur aptent ut ridiculus faucibus per eu egestas. Feugiat feugiat sem consequat magnis primis enim mattis. Scelerisque diam pretium felis primis auctor placerat tempus cras. Non morbi himenaeos vitae hendrerit fringilla. Mauris donec cursus netus pulvinar cras congue dictum quisque. Himenaeos eleifend per gravida dapibus primis ac. Egestas lectus penatibus ullamcorper, aliquam volutpat ullamcorper natoque arcu.</p>
  </div>
</div>
```