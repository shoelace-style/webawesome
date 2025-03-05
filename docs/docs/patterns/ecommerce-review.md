---
title: Product Reviews
description: 'Help shoppers make informed decisions with ratings, reviews, and testimonials from your customers.'
parent: ecommerce
tags: e-commerce
---
## Multi column

```html{.example}
<div style="max-width: 960px; margin: 0 auto;">
  <span>Recent Reviews</span>
  <wa-divider></wa-divider>
  <div class="wa-flank wa-gap-s" style="--flank-size: 20%">
    <div class="wa-stack wa-gap-2xs">
      <span class="wa-heading-s">Viktor Vaughn</span>
      <span class="wa-caption-m"><em>May 5th, 2023</em></span>
    </div>
    <div class="wa-flank">
      <wa-rating label="Rating" readonly value="3"></wa-rating>
    <div class="wa-stack wa-gap-2xs">
      <span class="wa-heading-s">Rating Title</span>
      <p class="wa-caption-m">The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
    </div>
    </div>
  </div>
  <wa-divider></wa-divider>
  <div class="wa-flank wa-gap-s" style="--flank-size: 20%">
    <div class="wa-stack wa-gap-2xs">
      <span class="wa-heading-s">Viktor Vaughn</span>
      <span class="wa-caption-m"><em>May 5th, 2023</em></span>
    </div>
    <div class="wa-flank">
      <wa-rating label="Rating" readonly value="3"></wa-rating>
    <div class="wa-stack wa-gap-2xs">
      <span class="wa-heading-s">Rating Title</span>
      <p class="wa-caption-m">The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
    </div>
    </div>
  </div>
  <wa-divider></wa-divider>
  <div class="wa-flank wa-gap-s" style="--flank-size: 20%">
    <div class="wa-stack wa-gap-2xs">
      <span class="wa-heading-s">Viktor Vaughn</span>
      <span class="wa-caption-m"><em>May 5th, 2023</em></span>
    </div>
    <div class="wa-flank">
      <wa-rating label="Rating" readonly value="3"></wa-rating>
    <div class="wa-stack wa-gap-2xs">
      <span class="wa-heading-s">Rating Title</span>
      <p class="wa-caption-m">The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
    </div>
    </div>
  </div>
  <wa-divider></wa-divider>
  <div class="wa-flank wa-gap-s" style="--flank-size: 20%">
    <div class="wa-stack wa-gap-2xs">
      <span class="wa-heading-s">Viktor Vaughn</span>
      <span class="wa-caption-m"><em>May 5th, 2023</em></span>
    </div>
    <div class="wa-flank">
      <wa-rating label="Rating" readonly value="3"></wa-rating>
    <div class="wa-stack wa-gap-2xs">
      <span class="wa-heading-s">Rating Title</span>
      <p class="wa-caption-m">The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
    </div>
    </div>
  </div>
</div>
```
## With Ratings Distribution

```html {.example}
<div style="max-width: 960px; margin: 0 auto;">
  <div class="wa-flank">
    <div>
      <span class="wa-heading-l">Customer Reviews</span>
      <div><wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating>Based on 1624 reviews</div>
    </div>
    <div>
      <div>
        <div class="wa-flank">
          <wa-avatar></wa-avatar>
          <div class="wa-stack">
            <span>Emily Selman</span>
            <wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating>
          </div>
        </div>
        <p><em>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</em></p>
      </div>
    </div>
  </div>
</div>
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