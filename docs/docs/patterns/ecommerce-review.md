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
  <div class="wa-align-items-start wa-flank wa-gap-2xl">
    <div>
      <span class="wa-heading-m">Customer Reviews</span>
      <div><wa-rating label="Rating" precision="0.5" value="2.5" size="small"></wa-rating> <span class="wa-caption-m">Based on 1624 reviews</span></div>
      <div class="wa-stack">
        <span class="wa-cluster wa-gap-2xs">
          <span>5</span>
          <wa-icon name="star"></wa-icon>
          <wa-progress-bar value="50" label="Upload progress" style="height: 6px; width: 70%"></wa-progress-bar>
          <span>75%</span>
        </span>
        <span class="wa-cluster wa-gap-2xs">
          <span>5</span>
          <wa-icon name="star"></wa-icon>
          <wa-progress-bar value="50" label="Upload progress" style="height: 6px; width: 70%"></wa-progress-bar>
          <span>75%</span>
        </span>
        <span class="wa-cluster wa-gap-2xs">
          <span>5</span>
          <wa-icon name="star"></wa-icon>
          <wa-progress-bar value="50" label="Upload progress" style="height: 6px; width: 70%"></wa-progress-bar>
          <span>75%</span>
        </span>
        <span class="wa-cluster wa-gap-2xs">
          <span>5</span>
          <wa-icon name="star"></wa-icon>
          <wa-progress-bar value="50" label="Upload progress" style="height: 6px; width: 70%"></wa-progress-bar>
          <span>75%</span>
        </span>
        <span class="wa-cluster wa-gap-2xs">
          <span>5</span>
          <wa-icon name="star"></wa-icon>
          <wa-progress-bar value="50" label="Upload progress" style="height: 6px; width: 70%"></wa-progress-bar>
          <span>75%</span>
        </span>
      </div>
    </div>
    <div>
      <div>
        <div class="wa-flank">
          <wa-avatar></wa-avatar>
          <div class="wa-stack wa-gap-2xs">
            <span>Emily Selman</span>
            <wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating>
          </div>
        </div>
        <p><em>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</em></p>
      </div>
      <wa-divider></wa-divider>
      <div>
        <div class="wa-flank">
          <wa-avatar></wa-avatar>
          <div class="wa-stack wa-gap-2xs">
            <span>Emily Selman</span>
            <wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating>
          </div>
        </div>
        <p><em>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</em></p>
      </div>
      <wa-divider></wa-divider>
      <div>
        <div class="wa-flank">
          <wa-avatar></wa-avatar>
          <div class="wa-stack wa-gap-2xs">
            <span>Emily Selman</span>
            <wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating>
          </div>
        </div>
        <p><em>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</em></p>
      </div>
      <wa-divider></wa-divider>
      <div>
        <div class="wa-flank">
          <wa-avatar></wa-avatar>
          <div class="wa-stack wa-gap-2xs">
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
  <div class="wa-flank wa-align-items-center">
    <div class="wa-stack wa-align-items-center wa-gap-xs">
      <wa-avatar label="User avatar" image="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></wa-avatar>
      <p>Ripley</p>
      <div>
      <wa-icon-button name="thumbs-up" label="I don't like this review" style="color: var(--wa-color-success-fill-loud);"></wa-icon-button>
      <wa-icon-button name="thumbs-down" label="I like this review" style="color: var(--wa-color-danger-fill-loud);"></wa-icon-button>
    </div>
    </div>
    <div>
      <wa-rating label="Rating" precision="0.5" value="5" readonly></wa-rating>
      <p>I recently purchased the Modern Sofa Couch, and I couldn't be happier with my decision! The process from ordering to delivery was smooth and hassle-free</p>
    </div>
   
  </div>
  <wa-divider></wa-divider>
  <div class="wa-flank wa-align-items-center">
    <div class="wa-stack wa-align-items-center wa-gap-xs">
      <wa-avatar label="User avatar" image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></wa-avatar>
      <p>Kane</p>
      <div>
      <wa-icon-button name="thumbs-up" label="I don't like this review" style="color: var(--wa-color-success-fill-loud);"></wa-icon-button>
      <wa-icon-button name="thumbs-down" label="I like this review" style="color: var(--wa-color-danger-fill-loud);"></wa-icon-button>
    </div>
    </div>
    <div>
      <wa-rating label="Rating" precision="0.5" value="3.4" readonly></wa-rating>
      <p>The cushions are soft yet supportive, and the sectional layout gives plenty of space to stretch out. It’s perfect for movie nights or just lounging with a good book.</p>
    </div>
    
  </div>
  <wa-divider></wa-divider>
  <div class="wa-flank wa-align-items-center">
    <div class="wa-stack wa-align-items-center wa-gap-xs">
      <wa-avatar label="User avatar" image="https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></wa-avatar>
      <p>Parker</p>
      <div>
      <wa-icon-button name="thumbs-up" label="I don't like this review" style="color: var(--wa-color-success-fill-loud);"></wa-icon-button>
      <wa-icon-button name="thumbs-down" label="I like this review" style="color: var(--wa-color-danger-fill-loud);"></wa-icon-button>
    </div>
    </div>
    <div>
      <wa-rating label="Rating" precision="0.5" value="3.8" readonly></wa-rating>
      <p>The leather is high quality, but it’s a little firmer than I thought. That said, after sitting on it for a while, it does soften up and feels more comfortable. It’s perfect if you’re looking for a more structured seating experience.</p>
    </div>
    
  </div>
  <wa-divider></wa-divider>
</div>
```