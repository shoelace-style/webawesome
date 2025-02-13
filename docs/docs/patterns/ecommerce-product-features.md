---
title: Product Features
description: 'Create focus landing pages for your store with detailed descriptions'
parent: ecommerce
tags: e-commerce
---

### With Carousel

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
  <wa-radio-group label="Select Color" hint="Select an option that makes you proud." name="a" value="1">
  <wa-radio-button value="1">Black
  </wa-radio-button>
  <wa-radio-button value="2">White</wa-radio-button>
  <wa-radio-button value="3">Gray</wa-radio-button>
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



