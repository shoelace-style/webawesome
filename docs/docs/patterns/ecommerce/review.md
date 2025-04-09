---
title: Product Reviews
description: 'Help shoppers make informed decisions with ratings, reviews, and testimonials from your customers.'
---
## Multi column

```html{.example}
<div style="max-width: 960px; margin: 0 auto;">
  <span class="wa-heading-m">Recent Reviews</span>
  <wa-divider></wa-divider>
  <div class="wa-flank wa-gap-s" style="--flank-size: 20%">
    <div class="wa-stack wa-gap-2xs">
      <span class="wa-heading-s">Viktor Vaughn</span>
      <wa-relative-time date="2020-07-15T09:17:00-04:00" class="wa-caption-m"></wa-relative-time>
    </div>
    <div class="wa-flank">
      <wa-rating label="Rating" readonly value="5"></wa-rating>
    <div class="wa-stack wa-gap-2xs">
      <span class="wa-heading-s">Solid treadmill for home workouts!</span>
      <p>Best treadmill I've ever owned! It has a sleek design, and the features are top-notch. I use it daily for my cardio workouts, and the motor is powerful enough to keep up with my running. It’s easy to adjust the speed and incline, and the display is clear and simple to read. Worth every penny!</p>
    </div>
    </div>
  </div>
  <wa-divider></wa-divider>
  <div class="wa-flank wa-gap-s" style="--flank-size: 20%">
    <div class="wa-stack wa-gap-2xs">
      <span class="wa-heading-s">Ben Grimm</span>
      <wa-relative-time date="2020-07-15T09:17:00-04:00" class="wa-caption-m"></wa-relative-time>
    </div>
    <div class="wa-flank">
      <wa-rating label="Rating" readonly value="4"></wa-rating>
    <div class="wa-stack wa-gap-2xs">
      <span class="wa-heading-s">Good value, a few minor flaws</span>
      <p>Decent treadmill for the price, but I feel like the belt could be a little wider for comfort. The cushioning is good, but sometimes I experience a slight wobble when running at high speeds. For casual walking, it's fine, but I’m not sure it’s built for intense runners.</p>
    </div>
    </div>
  </div>
  <wa-divider></wa-divider>
  <div class="wa-flank wa-gap-s" style="--flank-size: 20%">
    <div class="wa-stack wa-gap-2xs">
      <span class="wa-heading-s">Johnny Storm</span>
      <wa-relative-time date="2020-07-15T09:17:00-04:00" class="wa-caption-m"></wa-relative-time>
    </div>
    <div class="wa-flank">
      <wa-rating label="Rating" readonly value="4"></wa-rating>
    <div class="wa-stack wa-gap-2xs">
      <span class="wa-heading-s">Decent, but could use upgrades</span>
      <p>This treadmill has been a great addition to my home gym. It's sturdy, easy to use, and I like that it tracks my steps and heart rate. The only downside is that it's a bit bulky, so I had to rearrange my space to make room for it. Overall, I'm happy with the performance and would recommend it.</p>
    </div>
    </div>
  </div>
  <wa-divider></wa-divider>
  <div class="wa-flank wa-gap-s" style="--flank-size: 20%">
    <div class="wa-stack wa-gap-2xs">
      <span class="wa-heading-s">Sue Storm</span>
      <wa-relative-time date="2020-07-15T09:17:00-04:00" class="wa-caption-m"></wa-relative-time>
    </div>
    <div class="wa-flank">
      <wa-rating label="Rating" readonly value="4"></wa-rating>
    <div class="wa-stack wa-gap-2xs">
      <span class="wa-heading-s">Perfect for small spaces</span>
      <p>I absolutely love my new treadmill! It’s perfect for my daily workouts. The setup was quick, and it’s so quiet that I can use it while watching TV without any interruptions. The different incline levels really help mix up my routine, and the built-in programs keep things interesting. Highly recommend for anyone looking to stay fit at home!</p>
    </div>
    </div>
  </div>
</div>
```
## With Ratings Distribution

```html {.example}
<div style="max-width: 960px; margin: 0 auto;">
  <div class="wa-align-items-start wa-flank wa-gap-2xl">
    <div class="wa-gap-s wa-stack">
      <span class="wa-heading-m">Customer Reviews</span>
      <div class="wa-stack wa-gap-xs"><wa-rating label="Rating" precision="0.5" value="4.6" size="small"></wa-rating> <span class="wa-caption-m">Based on 1624 reviews</span></div>
      <div class="wa-stack">
        <span class="wa-cluster wa-gap-2xs">
          <span>5</span>
          <wa-icon name="star" style="font-size: 12px;"></wa-icon>
          <wa-progress-bar value="63" label="Upload progress" style="height: 6px; width: 50%"></wa-progress-bar>
          <wa-format-number type="percent" value=".63"></wa-format-number>
        </span>
        <span class="wa-cluster wa-gap-2xs">
          <span>4</span>
          <wa-icon name="star" style="font-size: 12px;"></wa-icon>
          <wa-progress-bar value="17" label="Upload progress" style="height: 6px; width: 50%"></wa-progress-bar>
          <wa-format-number type="percent" value=".17"></wa-format-number>
        </span>
        <span class="wa-cluster wa-gap-2xs">
          <span>3</span>
          <wa-icon name="star" style="font-size: 12px;"></wa-icon>
          <wa-progress-bar value="15" label="Upload progress" style="height: 6px; width: 50%"></wa-progress-bar>
          <wa-format-number type="percent" value=".15"></wa-format-number>
        </span>
        <span class="wa-cluster wa-gap-2xs">
          <span>2</span>
          <wa-icon name="star" style="font-size: 12px;"></wa-icon>
          <wa-progress-bar value="3" label="Upload progress" style="height: 6px; width: 50%"></wa-progress-bar>
          <wa-format-number type="percent" value=".03"></wa-format-number>
        </span>
        <span class="wa-cluster wa-gap-2xs">
          <span>1</span>
          <wa-icon name="star" style="font-size: 12px;"></wa-icon>
          <wa-progress-bar value="2" label="Upload progress" style="height: 6px; width: 50%"></wa-progress-bar>
          <wa-format-number type="percent" value=".02"></wa-format-number>
        </span>
      </div>
    </div>
    <div>
      <div>
        <div class="wa-flank">
          <wa-avatar image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></wa-avatar>
          <div class="wa-stack wa-gap-2xs">
            <span class="wa-heading-s">Michelle Jasper</span>
            <wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating>
          </div>
        </div>
        <p>I bought this grow light for my herbs and succulents, and wow—what a difference. After just a week, my basil perked up, and new leaves started popping up. Super easy to set up and doesn’t get too hot. Highly recommend for anyone growing indoors!</p>
      </div>
      <wa-divider></wa-divider>
      <div>
        <div class="wa-flank">
          <wa-avatar image="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></wa-avatar>
          <div class="wa-stack wa-gap-2xs">
            <span class="wa-heading-s">Doug Michaels</span>
            <wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating>
          </div>
        </div>
        <p>This light really helps my plants grow during the winter months. The brightness is strong, and I love the adjustable height. The only downside is the timer—it resets if you unplug it. Otherwise, great value for the price!</p>
      </div>
      <wa-divider></wa-divider>
      <div>
        <div class="wa-flank">
          <wa-avatar image="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></wa-avatar>
          <div class="wa-stack wa-gap-2xs">
            <span class="wa-heading-s">Stephanie Hurst</span>
            <wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating>
          </div>
        </div>
        <p>I don’t get much natural light in my apartment, so this grow light has been a game-changer. I’m using it for my small tomato plants and some lettuce, and they’re growing faster than expected. Plus, the light isn’t too harsh on the eyes</p>
      </div>
      <wa-divider></wa-divider>
      <div>
        <div class="wa-flank">
          <wa-avatar image="https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></wa-avatar>
          <div class="wa-stack wa-gap-2xs">
            <span class="wa-heading-s">Miles Rogers</span>
            <wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating>
          </div>
        </div>
        <p>I’ve tried a few grow lights, and this one is my favorite. It stays cool, uses less power, and my peace lilies and spider plants are growing beautifully. I just wish it came in more color options for the stand, but performance-wise, it’s excellent.</p>
      </div>
    </div>
  </div>
</div>
```

## Two Column

```html{.example}
<div class="wa-stack" style="max-width: 960px; margin: 0 auto;">
  <div class="wa-flank wa-align-items-center">
    <div class="wa-stack wa-align-items-center wa-gap-xs">
      <wa-avatar label="User avatar" image="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></wa-avatar>
      <p>Ripley</p>
      <div>
      <wa-icon-button name="thumbs-up" label="I don't like this review"></wa-icon-button>
      <wa-icon-button name="thumbs-down" label="I like this review"></wa-icon-button>
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
      <wa-icon-button name="thumbs-up" label="I don't like this review"></wa-icon-button>
      <wa-icon-button name="thumbs-down" label="I like this review"></wa-icon-button>
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
      <wa-icon-button name="thumbs-up" label="I don't like this review"></wa-icon-button>
      <wa-icon-button name="thumbs-down" label="I like this review"></wa-icon-button>
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
