---
title: E-commerce - Product Reviews
description: TODO
layout: pattern.njk
---

TODO Page Description

## With images grid
```html{.example}
<div class="with-image-grid">
  <wa-breadcrumb>
    <wa-breadcrumb-item>Clothing</wa-breadcrumb-item>
    <wa-breadcrumb-item>Men's</wa-breadcrumb-item>
    <wa-breadcrumb-item>Shirts &amp; Tops</wa-breadcrumb-item>
  </wa-breadcrumb>
  <div class="image-grid">
    <img src="/assets/images/patterns/gervyn-louis-IS03ajI00Fc-unsplash.jpg" />
    <img src="/assets/images/patterns/gervyn-louis-KXvd7y7AU6Q-unsplash.jpg" />
    <img src="/assets/images/patterns/gervyn-louis-semwwyXFQho-unsplash.jpg" />
    <img src="/assets/images/patterns/mad-rabbit-tattoo-7N4FMowSGek-unsplash.jpg" />
  </div>
  <div>
    <h2>Tank top</h2>
    <p>The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.</p>
    <h3>Highlights</h3>
    <ul>
      <li>Hand cut and sewn locally</li>
    </ul>

    <h3>Highlights</h3>
    <p>The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.</p>

    <span>$192</span>
    <div>
      <wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating>
      <a href="#">117 Reviews</a>
    </div>
    <wa-radio-group label="Select an option" help-text="Select an option that makes you proud." name="a" value="1">
  <wa-radio-button value="1">Option 1</wa-radio-button>
  <wa-radio-button value="2">Option 2</wa-radio-button>
  <wa-radio-button value="3">Option 3</wa-radio-button>
</wa-radio-group>
  <wa-radio-group label="Select an option" help-text="Select an option that makes you proud." name="a" value="1">
  <wa-radio-button value="1">Option 1</wa-radio-button>
  <wa-radio-button value="2">Option 2</wa-radio-button>
  <wa-radio-button value="3">Option 3</wa-radio-button>
</wa-radio-group>
  <wa-button>Add to Cart</wa-button>
  </div>
</div>
<style>
  .with-image-grid {
    wa-breadcrumb::part(base) {
      margin-bottom: 1rem;
    }

    .image-grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 1rem;
    }

    .image-grid img:nth-of-type(1) {
      grid-column: 1/-1;
    }

    .image-grid img:nth-of-type(2) {
      grid-column: 1/7;
    }
    .image-grid img:nth-of-type(3) {
      grid-column: 7/-1;
    }
     .image-grid img:nth-of-type(4) {
      grid-column: 1/-1;
    }
  }
</style>
```

## With Tiered Images

```html{.example}
<div class="with-tiered-images">
  <wa-breadcrumb>
    <wa-breadcrumb-item>Clothing</wa-breadcrumb-item>
    <wa-breadcrumb-item>Men's</wa-breadcrumb-item>
    <wa-breadcrumb-item>Shirts &amp; Tops</wa-breadcrumb-item>
  </wa-breadcrumb>
  <div>
    <div class="heading">
      <h2>Basic Tee</h2>
      <span style="font-size: var(--wa-font-size-2xl)">$35</span>
    </div>
    <div class="rating">
      <span>3.9</span>
       <wa-rating label="Rating" precision="0.5" value="3.9"></wa-rating>
      <a href="#">117 Reviews</a>
    </div>
    <div class="tiered-images">
      <img src="/assets/images/patterns/gervyn-louis-IS03ajI00Fc-unsplash.jpg" />
      <img src="/assets/images/patterns/gervyn-louis-KXvd7y7AU6Q-unsplash.jpg" />
      <img src="/assets/images/patterns/gervyn-louis-semwwyXFQho-unsplash.jpg" />
    </div>
  </div>
  <wa-radio-group label="Select an option" help-text="Select an option that makes you proud." name="a" value="1">
  <wa-radio-button value="1">Option 1</wa-radio-button>
  <wa-radio-button value="2">Option 2</wa-radio-button>
  <wa-radio-button value="3">Option 3</wa-radio-button>
</wa-radio-group>
  <wa-radio-group label="Select an option" help-text="Select an option that makes you proud." name="a" value="1">
  <wa-radio-button value="1">Option 1</wa-radio-button>
  <wa-radio-button value="2">Option 2</wa-radio-button>
  <wa-radio-button value="3">Option 3</wa-radio-button>
</wa-radio-group>
 <wa-button>Add to Cart</wa-button>
 <h3>Description</h3>
 <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
 <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
 <hr />
 <h3>Highlights</h3>
    <ul>
      <li>Hand cut and sewn locally</li>
    </ul>
  <div>
    <wa-card>
      <wa-icon family="solid" name="earth-americas"></wa-icon>
      <h3>International delivery</h3>
      <p>Get your order in 2 years</p>
    </wa-card>
    <wa-card>
      <wa-icon family="solid" name="earth-americas"></wa-icon>
      <h3>International delivery</h3>
      <p>Get your order in 2 years</p>

    </wa-card>
  </div>
</div>
<style>
  .with-tiered-images {
    wa-breadcrumb::part(base) {
      margin-bottom: 1rem;
    }
    .heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .rating {
      display: flex;

      span {
        display: inline-block;
        margin-right: 1rem;
      }

      wa-rating {
        margin-right: 1rem;
      }
    }

    .tiered-images {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 1rem;
    }

    .tiered-images img:nth-of-type(1) {
      grid-column: 1/-1;
    }

    .tiered-images img:nth-of-type(2) {
      grid-column: 1/7;
    }
    .tiered-images img:nth-of-type(3) {
      grid-column: 7/-1;
  }
</style>
```
## with images and expandable details

```html {.example}
<wa-carousel class="carousel-thumbnails" navigation loop>
  <wa-carousel-item>
    <img
      alt="The sun shines on the mountains and trees (by Adam Kool on Unsplash)"
      src="/assets/examples/carousel/pullover-1.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
      src="/assets/examples/carousel/pullover-2.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="The sun is setting over a lavender field (by Leonard Cotte on Unsplash)"
      src="/assets/examples/carousel/pullover-3.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A field of grass with the sun setting in the background (by Sapan Patel on Unsplash)"
      src="/assets/examples/carousel/pullover-4.jpg"
    />
  </wa-carousel-item>
  <wa-carousel-item>
    <img
      alt="A scenic view of a mountain with clouds rolling in (by V2osk on Unsplash)"
      src="/assets/examples/carousel/pullover-5.jpg"
    />
  </wa-carousel-item>
</wa-carousel>

<div class="thumbnails">
  <div class="thumbnails__scroller">
    <img alt="Thumbnail by 1" class="thumbnails__image active" src="/assets/examples/carousel/pullover-1.jpg" />
    <img alt="Thumbnail by 2" class="thumbnails__image" src="/assets/examples/carousel/pullover-2.jpg" />
    <img alt="Thumbnail by 3" class="thumbnails__image" src="/assets/examples/carousel/pullover-3.jpg" />
    <img alt="Thumbnail by 4" class="thumbnails__image" src="/assets/examples/carousel/pullover-4.jpg" />
    <img alt="Thumbnail by 5" class="thumbnails__image" src="/assets/examples/carousel/pullover-5.jpg" />
  </div>
</div>
<div>
  <h3 style="--wa-space-xl: 0;">Pullover Sweater</h3>
  <span class="price-big">$140</span>
  <wa-rating class="sweater-rating" label="Rating" precision="0.5" value="2.5"></wa-rating>
  <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  <wa-radio-group label="Select Color" help-text="Select an option that makes you proud." name="a" value="1">
  <wa-radio-button value="1"></wa-radio-button>
  <wa-radio-button value="2"></wa-radio-button>
  <wa-radio-button value="3"></wa-radio-button>
</wa-radio-group>
<div>
  <wa-button>Add to cart</wa-button>
  <wa-icon-button name="gear" label="Settings"></wa-icon-button>
</div>
<div class="details-group-example">
  <wa-details summary="First" open>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </wa-details>

  <wa-details summary="Second">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </wa-details>

  <wa-details summary="Third">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </wa-details>
</div>
</div>

<style>
  .carousel-thumbnails {
    --slide-aspect-ratio: 3 / 2;
  }

  wa-radio-button #shadow-root div .button--medium {
    padding: var(--wa-space-xs) var(--wa-space-xs);
  }

  .color-circle {
    --background: #000;
    background: var(--background);

    width: 50px;
    height: 100%;
  }

  .sweater-rating {
    margin-bottom: 1rem;
  }
  .price-big {
    display: block;
    font-size: 32px;
  }

  .thumbnails {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .thumbnails__scroller {
    display: flex;
    gap: var(--wa-space-s);
    overflow-x: auto;
    scrollbar-width: none;
    scroll-behavior: smooth;
    scroll-padding: var(--wa-space-s);
  }

  .thumbnails__scroller::-webkit-scrollbar {
    display: none;
  }

  .thumbnails__image {
    width: 64px;
    height: 64px;
    object-fit: cover;

    opacity: 0.3;
    will-change: opacity;
    transition: 250ms opacity;

    cursor: pointer;
  }

  .thumbnails__image.active {
    opacity: 1;
  }
  .details-group-example wa-details:not(:last-of-type) {
    margin-bottom: var(--wa-space-2xs);
  }
</style>

<script>
  {
    const carousel = document.querySelector('.carousel-thumbnails');
    const scroller = document.querySelector('.thumbnails__scroller');
    const thumbnails = document.querySelectorAll('.thumbnails__image');

    scroller.addEventListener('click', e => {
      const target = e.target;

      if (target.matches('.thumbnails__image')) {
        const index = [...thumbnails].indexOf(target);
        carousel.goToSlide(index);
      }
    });

    carousel.addEventListener('wa-slide-change', e => {
      const slideIndex = e.detail.index;

      [...thumbnails].forEach((thumb, i) => {
        thumb.classList.toggle('active', i === slideIndex);
        if (i === slideIndex) {
          thumb.scrollIntoView({
            block: 'nearest'
          });
        }
      });
    });
  }

    const container = document.querySelector('.details-group-example');

  // Close all other details when one is shown
  container.addEventListener('wa-show', event => {
    if (event.target.localName === 'wa-details') {
      [...container.querySelectorAll('wa-details')].map(details => (details.open = event.target === details));
    }
  });
</script>
```

## Split with image

```html {.example}
<div class="split-with-image">
  <div class="div-1">
    <wa-breadcrumb>
    <wa-breadcrumb-item>Clothing</wa-breadcrumb-item>
    <wa-breadcrumb-item>Men's</wa-breadcrumb-item>
    <wa-breadcrumb-item>Shirts &amp; Tops</wa-breadcrumb-item>
    </wa-breadcrumb>
    <h2>Everyday Ruck Snack</h2>
    <span>
      <span>$220</span> |
      <wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating>
      <span>1624 reviews</span>
    </span>
    <p>Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.</p>
    <span><wa-icon family="solid" name="check"></wa-icon> In stock and ready to ship</span>


  </div>
  <div class="div-2">
    <img src="/assets/images/patterns/gervyn-louis-IS03ajI00Fc-unsplash.jpg" />
  </div>
  <div class="div-3">
     <wa-radio-group label="Select an option" help-text="Select an option that makes you proud." name="a" value="1">
  <wa-radio-button value="1">Option 1</wa-radio-button>
  <wa-radio-button value="2">Option 2</wa-radio-button>
  <wa-radio-button value="3">Option 3</wa-radio-button>
</wa-radio-group>
  </div>
</div>
<style>
  .split-with-image {
    display: grid;
    /* grid-template-columns: repeat(2, 1fr); */
    /* height: 1000px; */
    /* gap: 1rem; */
    .div-1 {

    }
    .div-2 {
      /* background-color: black;
      grid-column-start: 2;
      grid-row: span 2 / span 2; */
    }
    .div-3 {

    }
  }
</style>
```
## With tabs

```html{.example}
<div>
  <wa-rating class="sweater-rating" label="Rating" precision="0.5" value="2.5"></wa-rating>
  <h2>Application UI Icon Pack</h2>
  <img alt="Sample of 30 icons with friendly and fun details in outline, filled, and brand color styles." src="https://tailwindui.com/img/ecommerce-images/product-page-05-product-01.jpg" class="aqk aql">
  <p>The Application UI Icon Pack comes with over 200 icons in 3 styles: outline, filled, and branded. This playful icon pack is tailored for complex application user interfaces with a friendly and legible look.</p>
  <wa-button variant="brand">Brand</wa-button>

<wa-button variant="success">Success</wa-button>
<hr />
<h3>Highlights</h3>
<ul>
  <li>200+ SVG icons in 3 unique styles</li>
  <li>Compatible with Figma, Sketch, and Adobe XD</li>
  <li>Drawn on 24 x 24 pixel grid</li>
</ul>
<hr />
<h3>License</h3>
<p>For personal and professional use. You cannot resell or redistribute these icons in their original or modified state. <a href="#">Read full license</a></p>
<hr />
<h3>Share</h3>


<wa-icon family="brands" name="facebook"></wa-icon>
<wa-icon family="brands" name="instagram"></wa-icon>
<wa-icon family="brands" name="x-twitter"></wa-icon>
  <wa-tab-group>
  <wa-tab panel="general">General</wa-tab>
  <wa-tab panel="custom">Custom</wa-tab>
  <wa-tab panel="advanced">Advanced</wa-tab>
  <wa-tab panel="disabled" disabled>Disabled</wa-tab>

  <wa-tab-panel name="general">
    <div></div>
    <div>
      <h3>Hector Gibbons</h3>
      <p>July 12, 2021</p>
      <wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating>
      <p>Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.</p>
    </div>
  </wa-tab-panel>
  <wa-tab-panel name="custom">This is the custom tab panel.</wa-tab-panel>
  <wa-tab-panel name="advanced">This is the advanced tab panel.</wa-tab-panel>
  <wa-tab-panel name="disabled">This is a disabled tab panel.</wa-tab-panel>
</wa-tab-group>

</div>

```