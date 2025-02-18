---
title: Product Overviews
description: 'Showcase your products with overviews including images, ratings, features, options, and more.'
parent: ecommerce
tags: e-commerce
---

## With Image Grid
```html{.example}
<div class="with-image-grid" style="max-width: 960px;margin: 0 auto;">
  <wa-breadcrumb style="margin-bottom: 1rem; display: block;">
    <wa-breadcrumb-item>Clothing</wa-breadcrumb-item>
    <wa-breadcrumb-item>Women's</wa-breadcrumb-item>
    <wa-breadcrumb-item>Shirts &amp; Tops</wa-breadcrumb-item>
  </wa-breadcrumb>
  <div class="wa-stack wa-gap-xs" style="margin-bottom: var(--wa-space-l);">
    <img src="https://images.unsplash.com/photo-1614792568992-ded1c487c1dd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    <div class="wa-grid wa-gap-xs">
      <img src="https://images.unsplash.com/photo-1614725078749-29c421fd0e51?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <img src="https://images.unsplash.com/photo-1614725808713-e6bbe418fc5d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    </div>
    <img src="https://images.unsplash.com/photo-1614725078379-9d1330a08c95?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
  </div>
  <div>
    <h2>Tank top</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae tincidunt nulla. Suspendisse eu augue mauris. Morbi ut euismod sem. In efficitur nisl nec tincidunt mollis. Nulla eu velit porta, tincidunt erat a, scelerisque neque. Quisque tincidunt, erat sit amet cursus posuere, nisi mi aliquam ligula, non pulvinar augue eros eget ligula. Nullam sed molestie magna. Suspendisse porta blandit massa in suscipit. Nulla ultricies purus convallis, tincidunt orci ut, auctor sem. Suspendisse ornare orci lectus. Fusce eu orci et sem sollicitudin pharetra et eu purus. Quisque interdum, ante nec euismod consequat, ante leo maximus dui, ut commodo massa urna et nisi. Proin placerat augue in consequat fringilla.</p>
    <div class="wa-flank">
      <span style="font-size: var(--wa-font-size-2xl); margin-bottom: var(--wa-space-l);">$192</span>
      <div style="margin-bottom: var(--wa-space-l);">
      <wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating>
      <a href="#">117 Reviews</a>
    </div>
    </div>
    
    <div class="wa-flank" style="margin-bottom: var(--wa-space-l);">
      <wa-radio-group orientation="horizontal" label="Color" name="colors" value="gray">
        <wa-radio-button value="gray">Gray</wa-radio-button>
        <wa-radio-button value="black">Black</wa-radio-button>
        <wa-radio-button value="white">White</wa-radio-button>
      </wa-radio-group>
      <wa-radio-group orientation="horizontal" label="Size" name="size" value="small">
        <wa-radio-button value="small">Small</wa-radio-button>
        <wa-radio-button value="medium">Medium</wa-radio-button>
        <wa-radio-button value="large">Large</wa-radio-button>
      </wa-radio-group>
    </div>
    <wa-button variant="brand" size="large">
      <wa-icon slot="suffix" name="cart-plus" variant="solid"></wa-icon>
      Add to Cart
    </wa-button>
  </div>
</div>
```

## With Tiered Images

```html{.example}
<div style="max-width: 960px;margin: 0 auto;">
  <wa-breadcrumb style="margin-bottom: 1rem; display: block;">
    <wa-breadcrumb-item>Clothing</wa-breadcrumb-item>
    <wa-breadcrumb-item>Men's</wa-breadcrumb-item>
    <wa-breadcrumb-item>Shirts &amp; Tops</wa-breadcrumb-item>
  </wa-breadcrumb>
  <div>
    <div class="wa-split" style="margin-bottom: var(--wa-space-l);">
      <h2>Basic Tee</h2>
      <span style="font-size: var(--wa-font-size-2xl); margin-right: 1rem;">$35</span>
    </div>
    <div class="wa-split" style="margin-bottom: var(--wa-space-l);">
      <div>
        <span style="margin-right: 1rem;">3.9</span>
        <wa-rating label="Rating" precision="0.5" value="3.9"></wa-rating>
      </div>
      <a href="#">117 Reviews</a>
    </div>
    <div class="wa-stack wa-gap-xs" style="margin-bottom: var(--wa-space-l);">
    <img src="/assets/images/patterns/gervyn-louis-IS03ajI00Fc-unsplash.jpg" />
    <div class="wa-grid wa-gap-xs">
      <img src="/assets/images/patterns/gervyn-louis-KXvd7y7AU6Q-unsplash.jpg" />
      <img src="/assets/images/patterns/gervyn-louis-semwwyXFQho-unsplash.jpg" />
    </div>
  </div>
  </div>
  <div class="wa-grid" style="margin-bottom: var(--wa-space-l);">
    <wa-radio-group orientation="horizontal" label="Color"  name="color" value="black">
      <wa-radio-button value="black">Black</wa-radio-button>
      <wa-radio-button value="gray">Gray</wa-radio-button>
      <wa-radio-button value="white">White</wa-radio-button>
    </wa-radio-group>
    <wa-radio-group orientation="horizontal" label="Size"  name="size" value="large">
      <wa-radio-button value="small">Small</wa-radio-button>
      <wa-radio-button value="medium">Medium</wa-radio-button>
      <wa-radio-button value="large">Large</wa-radio-button>
    </wa-radio-group>
  </div>
 <h3>Description</h3>
 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae tincidunt nulla. Suspendisse eu augue mauris. Morbi ut euismod sem. In efficitur nisl nec tincidunt mollis. Nulla eu velit porta, tincidunt erat a, scelerisque neque. Quisque tincidunt, erat sit amet cursus posuere, nisi mi aliquam ligula, non pulvinar augue eros eget ligula. Nullam sed molestie magna. Suspendisse porta blandit massa in suscipit. Nulla ultricies purus convallis, tincidunt orci ut, auctor sem. Suspendisse ornare orci lectus. Fusce eu orci et sem sollicitudin pharetra et eu purus. Quisque interdum, ante nec euismod consequat, ante leo maximus dui, ut commodo massa urna et nisi. Proin placerat augue in consequat fringilla.</p>
 <hr />
 <h3>Highlights</h3>
    <ul>
      <li>Hand cut and sewn locally</li>
    </ul>
  <div class="wa-grid">
    <wa-card>
      <wa-icon family="solid" name="earth-americas"></wa-icon>
      <h3>International delivery</h3>
      <p>We ship anywhere</p>
    </wa-card>
    <wa-card>
      <wa-icon family="solid" name="arrow-right-arrow-left"></wa-icon>
      <h3>90 Returns</h3>
      <p>Not happy? Return your item and get a full refund.</p>
    </wa-card>
  </div>
  <wa-button variant="brand" size="large" style="margin-top: var(--wa-size);">
    <wa-icon slot="suffix" name="cart-plus" variant="solid"></wa-icon>
    Add to Cart
  </wa-button>
</div>
```
## With Image Carousel & Expandable Details

```html {.example}
<div style="max-width: 960px;margin: 0 auto;">
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

<div class="thumbnails wa-split" style="margin-bottom: 1rem; justify-content: center">
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
  <span style="display: block;font-size: 32px;">$40</span>
  <wa-rating style="margin-bottom: 1rem;" label="Rating" precision="0.5" value="2.5"></wa-rating>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae tincidunt nulla. Suspendisse eu augue mauris. Morbi ut euismod sem. In efficitur nisl nec tincidunt mollis. Nulla eu velit porta, tincidunt erat a, scelerisque neque. Quisque tincidunt, erat sit amet cursus posuere, nisi mi aliquam ligula, non pulvinar augue eros eget ligula. Nullam sed molestie magna. Suspendisse porta blandit massa in suscipit. Nulla ultricies purus convallis, tincidunt orci ut, auctor sem. Suspendisse ornare orci lectus. Fusce eu orci et sem sollicitudin pharetra et eu purus. Quisque interdum, ante nec euismod consequat, ante leo maximus dui, ut commodo massa urna et nisi. Proin placerat augue in consequat fringilla.</p>
  <wa-radio-group orientation="horizontal" label="Select Color" name="color" value="beige" style="margin-bottom: var(--wa-size);">
    <wa-radio-button value="beige">Beige</wa-radio-button>
    <wa-radio-button value="gray">Gray</wa-radio-button>
    <wa-radio-button value="brown">Brown</wa-radio-button>
  </wa-radio-group>
<div>
</div>
<div class="details-group-example">
  <wa-details summary="Locally Sourced" open>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </wa-details>

  <wa-details summary="Hand Inspected">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </wa-details>
</div>
</div>
  <wa-button variant="brand" size="large" style="margin-top: var(--wa-size);">
      <wa-icon slot="suffix" name="cart-plus" variant="solid"></wa-icon>
      Add to Cart
  </wa-button>
</div>
<style>
  .carousel-thumbnails {
    --slide-aspect-ratio: 3 / 2;
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

<!-- ## Split with Image

```html {.example}
<div class="split-with-image" style="max-width: 960px;margin: 0 auto;">
  <div>
    <wa-breadcrumb style="margin-bottom: 1rem; display: block;">
    <wa-breadcrumb-item>Clothing</wa-breadcrumb-item>
    <wa-breadcrumb-item>Men's</wa-breadcrumb-item>
    <wa-breadcrumb-item>Shirts &amp; Tops</wa-breadcrumb-item>
    </wa-breadcrumb>
    <h2>Everyday Ruck Snack</h2>
    <div style="margin-bottom: 1rem;" class="wa-split">
      <span>$220</span>
      <span>
        <wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating>
        <span>1624 reviews</span>
      </span>
    </span>
    <p>Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.</p>
    <div style="margin-bottom: 1rem;"><wa-icon family="solid" name="check"></wa-icon> In stock and ready to ship</div>
  </div>
  <div>
    <img src="/assets/images/patterns/gervyn-louis-IS03ajI00Fc-unsplash.jpg" />
  </div>
  <div>
     <wa-radio-group orientation="horizontal" label="Select an option" hint="Select an option that makes you proud." name="a" value="1">
      <wa-radio-button value="1">Option 1</wa-radio-button>
      <wa-radio-button value="2">Option 2</wa-radio-button>
      <wa-radio-button value="3">Option 3</wa-radio-button>
    </wa-radio-group>
  </div>
</div>
``` -->
## With Tabs

```html{.example}
<div>
  <h2>Application UI Icon Pack</h2>
  <img alt="Sample of 30 icons with friendly and fun details in outline, filled, and brand color styles." src="https://img.fortawesome.com/cfa83f3c/icon-grid-wallpaper.png" class="icon grid">
  <p>The Application UI Icon Pack comes with over 200 icons in 3 styles: outline, filled, and branded. This playful icon pack is tailored for complex application user interfaces with a friendly and legible look.</p>
    <wa-button variant="brand" size="large" style="margin-top: var(--wa-size);">
      <wa-icon slot="suffix" name="cart-plus" variant="solid"></wa-icon>
      Add to Cart
  </wa-button>
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


<wa-icon family="brands" name="facebook" style="margin-right: var(--wa-size)"></wa-icon>
<wa-icon family="brands" name="instagram"></wa-icon>
  <wa-tab-group>
  <wa-tab panel="general">Reviews</wa-tab>
  <wa-tab panel="custom">Custom</wa-tab>
  <wa-tab panel="advanced">Advanced</wa-tab>
  <wa-tab-panel name="general">
    <div></div>
    <div>
      <h3>Victor Vaughn</h3>
      <p>July 12, 2021</p>
      <wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae tincidunt nulla. Suspendisse eu augue mauris. Morbi ut euismod sem. In efficitur nisl nec tincidunt mollis. Nulla eu velit porta, tincidunt erat a, scelerisque neque. Quisque tincidunt, erat sit amet cursus posuere, nisi mi aliquam ligula, non pulvinar augue eros eget ligula. Nullam sed molestie magna. Suspendisse porta blandit massa in suscipit. Nulla ultricies purus convallis, tincidunt orci ut, auctor sem. Suspendisse ornare orci lectus. Fusce eu orci et sem sollicitudin pharetra et eu purus. Quisque interdum, ante nec euismod consequat, ante leo maximus dui, ut commodo massa urna et nisi. Proin placerat augue in consequat fringilla.</p>
    </div>
  </wa-tab-panel>
  <wa-tab-panel name="custom">This is the custom tab panel.</wa-tab-panel>
  <wa-tab-panel name="advanced">This is the advanced tab panel.</wa-tab-panel>
</wa-tab-group>
</div>
```
