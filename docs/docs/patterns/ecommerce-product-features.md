---
title: Product Features
description: 'Create focus landing pages for your store with detailed descriptions'
parent: ecommerce
tags: e-commerce
---

### With Carousel

```html {.example}
<div class="wa-stack wa-gap-3xl">
  <wa-carousel pagination navigation loop style="--aspect-ratio: 3 / 2;">
    <wa-carousel-item>
      <img
        alt="Knit sweater in sand color sleeve detail, showing the seamless design"
        src="/assets/examples/carousel/pullover-1.jpg"
      />
    </wa-carousel-item>
    <wa-carousel-item>
      <img
        alt="Knit sweater in sand color sleeve detail, showing loose fit around the arms"
        src="/assets/examples/carousel/pullover-2.jpg"
      />
    </wa-carousel-item>
    <wa-carousel-item>
      <img
        alt="Knit sweater in sand color shoulder detail, showing relaxed fit on broader shoulders"
        src="/assets/examples/carousel/pullover-3.jpg"
      />
    </wa-carousel-item>
    <wa-carousel-item>
      <img
        alt="Knit sweater in sand color full view, showing waffle knit pattern, relaxed fit, and crew neckline"
        src="/assets/examples/carousel/pullover-4.jpg"
      />
    </wa-carousel-item>
    <wa-carousel-item>
      <img
        alt="Knit sweater in sand color sleeve detail, showing rolled sleeves and ribbed cuffs"
        src="/assets/examples/carousel/pullover-5.jpg"
      />
    </wa-carousel-item>
  </wa-carousel>
  <div class="wa-grid wa-gap-3xl" style="--min-column-size: 30ch;">
    <div class="wa-stack">
      <h3>Pullover Sweater</h3>
      <span class="wa-heading-l">$140</span>
      <wa-rating label="Rating" precision="0.5" value="4.5" readonly></wa-rating>
      <p>Wrap yourself in warmth and effortless style with this wool knit Pullover Sweater. Designed for unparalleled comfort. The relaxed fit and classic crew neckline make it a versatile staple for layering or wearing solo.</p>
      <wa-radio-group label="Color" name="color" value="sand" orientation="horizontal">
        <wa-radio-button value="sand">
          <wa-icon slot="prefix" name="circle" style="color: burlywood;"></wa-icon>
          Sand
        </wa-radio-button>
        <wa-radio-button value="slate">
          <wa-icon slot="prefix" name="circle" style="color: dimgray;"></wa-icon>
          Slate
        </wa-radio-button>
        <wa-radio-button value="shale">
          <wa-icon slot="prefix" name="circle" style="color: silver;"></wa-icon>
          Shale
        </wa-radio-button>
      </wa-radio-group>
      <wa-radio-group label="Size" name="size" value="s" orientation="horizontal">
        <wa-radio-button value="xs">XS</wa-radio-button>
        <wa-radio-button value="s">S</wa-radio-button>
        <wa-radio-button value="m">M</wa-radio-button>
        <wa-radio-button value="l">L</wa-radio-button>
        <wa-radio-button value="xl">XL</wa-radio-button>
      </wa-radio-group>
      <wa-button variant="brand">Add to cart</wa-button>
    </div>
    <div class="wa-stack">
      <wa-details summary="Size and Fit" open>
        <ul class="wa-caption-m">
          <li>True to size with a relaxed fit</li>
          <li>Fits all shoulder shapes, broad to narrow</li>
          <li>No pinching in the arms or irritating seams</li>
          <li>Ribbed cuffs and hem</li>
        </ul>
      </wa-details>
      <wa-details summary="Materials and Care">
        <ul class="wa-caption-m">
          <li>Durable Merino and Yak wool blend</li>
          <li>Machine wash cold on delicate cycle</li>
          <li>Lay flat to dry</li>
          <li>Made with <wa-icon name="heart" label="love"></wa-icon> in Bentonville, USA</li>
        </ul>
      </wa-details>
      <wa-details summary="Shipping">
        <ul class="wa-caption-m">
          <li>Flat $9 shipping free for orders under $200.</li>
          <li>Free shipping on orders over $200, anywhere in the world.</li>
        </ul>
      </wa-details>
    </div>
  </div>
</div>
```



