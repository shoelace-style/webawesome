---
title: E-commerce
description: TODO
layout: page
---

TODO Page Description

## Examples

## Coupon

```html{.example}
<wa-dialog label="New Here?" with-header class="coupon" style="--width: 50rem;">
  <div class="coupon-split">
    <img style="height: 100%" src="/assets/images/patterns/coupon.jpg" />
    <div>
      <span>help us start you off on the right foot.</span>
      <h1 style="margin-bottom: 0;">Get 15% Off...*</h1>
      <p>...your first online order when you signup for emails.</p>
      <wa-input label="Email" style="margin-bottom: 1rem;">
        <div slot="hint">What would you <a href='#'>link</a> like people to call you?</div>
      </wa-input>
      <wa-button size="medium" style="width: 100%; margin-bottom: 1rem;" variant="danger">Email me discount</wa-button>
      <p style="font-size: xx-small;font-style: italic;">*The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.</p>
    </div>
  </div>
</wa-dialog>

<wa-button>Open Dialog</wa-button>

<style>
  .coupon {
    .coupon-split {
      display: grid;
      grid-template-columns: 40% 1fr;
      gap: 1rem;
    }
  }
</style>
<script>
  const dialog = document.querySelector('.coupon');
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener('click', () => dialog.open = true);
</script>

```

## Mega Menu

```html{.example}
<wa-dropdown>
  <wa-button slot="trigger" caret>Shop</wa-button>
  <wa-menu class="mm-grid">
    <div>
      <wa-menu-label>Shop by Department</wa-menu-label>
      <wa-menu-item value="apple">Mens</wa-menu-item>
      <wa-menu-item value="banana">Womens</wa-menu-item>
      <wa-menu-item value="orange">Kids</wa-menu-item>
      <wa-menu-item value="orange">
        Infants
         <wa-menu slot="submenu">
      <wa-menu-item value="uppercase">Newborns</wa-menu-item>
      <wa-menu-item value="lowercase">6 Months</wa-menu-item>
      <wa-menu-item value="capitalize">12 Months</wa-menu-item>
    </wa-menu>
      </wa-menu-item>
      <wa-menu-item value="orange">Big & Tall</wa-menu-item>
    </div>
  <div>
    <wa-menu-label>Shop by Category</wa-menu-label>
    <wa-menu-item value="apple">Shirts</wa-menu-item>
    <wa-menu-item value="banana">Pants</wa-menu-item>
    <wa-menu-item value="orange">Shoes</wa-menu-item>
  </div>

  <div>
    <wa-menu-label>Just Arrived</wa-menu-label>


    <wa-menu-item>
      <a href="#">
       <img style="width: 100%; max-width: 200px;" src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDIzNDd8&ixlib=rb-4.0.3&q=80&w=1080" />
     </a>

    </wa-menu-item>



  </div>


    <wa-menu-item style="grid-column: 1/-1;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <p style="margin:0;">footer with something cool in it</p>
        <wa-button variant="brand" size="small">Signup now</wa-button>
      </div>

    </wa-menu-item>

  </wa-menu>


</wa-dropdown>
<style>
  .mm-grid {
        display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 1rem;



  .card-overview small {
    color: var(--wa-color-text-quiet);
  }

  .card-overview [slot='footer'] {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  }


</style>
```
### Slide Over

```html {.example}
<wa-card with-header with-footer class="card-header" style="width: 500px;">
  <div slot="header">
    <strong>Shopping Cart</strong>
    <wa-icon-button name="close" variant="solid" label="Settings"></wa-icon-button>
  </div>
    <section class="cart-item">
    <img src="https://images.unsplash.com/photo-1704677982224-89cd6d039fa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDEwOTJ8&ixlib=rb-4.0.3&q=80&w=1080" alt="" width="300">
    <div>
      <div style="display:flex; justify-content: space-between; font-weight: 600;">
        <span>AJ1</span>
        <span>$170.00</span>
      </div>
      <div style="font-size: small;">Off-white Jordan One</div>
      <div style="display:flex; justify-content: space-between; align-items: center;">
        <span>Qty: 1</span>
        <wa-button appearance="plain" size="small">Remove</wa-button>
      </div>
    </div>
  </section>
   <section class="cart-item">
    <img src="https://plus.unsplash.com/premium_photo-1707932485795-1d0aed727376?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDE2NDl8&ixlib=rb-4.0.3&q=80&w=1080" alt="" width="300">
    <div>
      <div style="display:flex; justify-content: space-between; font-weight: 600;">
        <span>The Trails</span>
        <span>$35.00</span>
      </div>
      <div style="font-size: small;">50/50 Cotton Poly Blend</div>
      <div style="display:flex; justify-content: space-between; align-items: center;">
        <span>Qty: 1</span>
        <wa-button appearance="plain" size="small">Remove</wa-button>
      </div>
    </div>
  </section>
   <section class="cart-item">
    <img src="https://plus.unsplash.com/premium_photo-1690347839113-b5db143123b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDE5MTB8&ixlib=rb-4.0.3&q=80&w=1080" alt="" width="300">
    <div>
      <div style="display:flex; justify-content: space-between; font-weight: 600;">
        <span>Outcast</span>
        <span>$27.00</span>
      </div>
      <div style="font-size: small;">100% Cotton</div>
      <div style="display:flex; justify-content: space-between; align-items: center;">
        <span>Qty: 1</span>
        <wa-button appearance="plain" size="small">Remove</wa-button>
      </div>
    </div>
  </section>

  <div slot="footer">
    <div style="display:flex; justify-content: space-between; font-weight: 600;">
      <span>Subtotal</span>
      <span>$232.00</span>
    </div>
    <div style="font-size: small; margin-bottom: 1rem;">Shipping and taxes calculated at checkout.</div>
   <wa-button size="medium" variant="brand" style="width: 100%; margin-bottom: 1rem;">Medium</wa-button>
    or <a href="#">Continue shopping <wa-icon-button name="arrow-right" variant="solid" label="Settings"></wa-icon-button></a>
  </div>

</wa-card>

<style>


  .card-header [slot='header'] {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-header h3 {
    margin: 0;
  }

  .card-header wa-icon-button {
    font-size: var(--wa-font-size-m);
  }

  .cart-item {
    display: flex;
    gap: 2rem;
    margin-bottom: 1rem;

    &:not(:last-of-type) {
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
    }


    img {
      width: 6rem;
      flex-grow: 1;
    }

    div {
      flex-grow: 11;
    }
  }


</style>
```

### Two Column Cart

```html {.example}
<div class="two-column">
  <h1>Shopping Cart</h1>
  <div class="first-column">
    <section class="cart-item">
     <img class="cart-item-image" src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDIzNDd8&ixlib=rb-4.0.3&q=80&w=1080" alt="" width="300">
    <div class="cart-item-info">
      <div class="cart-item-meta">
        <div>
          <span style="font-size: larger">Classic</span>
          <div>White - L</div>
          <span style="font-size: larger">$15.00</span>
        </div>

          <wa-select placeholder="1">
            <wa-option value="option-1">1</wa-option>
            <wa-option value="option-2">2</wa-option>
            <wa-option value="option-3">3</wa-option>
          </wa-select>
          <wa-icon-button name="close" variant="solid" label="Settings"></wa-icon-button>

      </div>
       <div style="display: flex;justify-content: flex-start;align-items: baseline;">
        <wa-icon name="check" style="color: green; margin-right: 0.5rem;"></wa-icon> In Stock
        </div>

    </div>
  </section>
  <section class="cart-item">
     <img class="cart-item-image" src="https://images.unsplash.com/photo-1624378440847-4a64ee1a889d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDI0MDd8&ixlib=rb-4.0.3&q=80&w=1080" alt="" width="300">
    <div class="cart-item-info">
      <div class="cart-item-meta">
        <div>
          <span style="font-size: larger">Button Up</span>
          <div>Blue - L</div>
          <span style="font-size: larger">$20.00</span>
        </div>

          <wa-select placeholder="1">
            <wa-option value="option-1">1</wa-option>
            <wa-option value="option-2">2</wa-option>
            <wa-option value="option-3">3</wa-option>
          </wa-select>
          <wa-icon-button name="close" variant="solid" label="Settings"></wa-icon-button>

      </div>
       <div style="display: flex;justify-content: flex-start;align-items: baseline;">
        <wa-icon name="check" style="color: green; margin-right: 0.5rem;"></wa-icon> In Stock
        </div>

    </div>
  </section>
  <section class="cart-item">
     <img class="cart-item-image" src="https://images.unsplash.com/photo-1511551203524-9a24350a5771?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDI0OTB8&ixlib=rb-4.0.3&q=80&w=1080" alt="" width="300">
    <div class="cart-item-info">
      <div class="cart-item-meta">
        <div>
          <span style="font-size: larger">Kitten</span>
          <div>Egg - L</div>
          <span style="font-size: larger">$20.00</span>
        </div>

          <wa-select placeholder="1">
            <wa-option value="option-1">1</wa-option>
            <wa-option value="option-2">2</wa-option>
            <wa-option value="option-3">3</wa-option>
          </wa-select>
          <wa-icon-button name="close" variant="solid" label="Settings"></wa-icon-button>

      </div>
       <div style="display: flex;justify-content: flex-start;align-items: baseline;">
        <wa-icon name="check" style="color: green; margin-right: 0.5rem;"></wa-icon> In Stock
        </div>

    </div>
  </section>


  </div>
  <wa-card with-header class="card-header second-column">
  <div slot="header">
    Order Summary

  </div>
  <div style="display:flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
    <span>Subtotal</span>
    <span>$55.00</span>
  </div>
  <div style="display:flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
    <span>Shipping</span>
    <span>$5.00</span>
  </div>
  <div style="display:flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
    <span>Tax</span>
    <span>$5.50</span>
  </div>
  <div style="display:flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
    <span>Order Total</span>
    <span>$65.50</span>
  </div>

  <wa-button size="medium" variant="brand" style="width: 100%; margin-bottom: 1rem;">Checkout</wa-button>




</wa-card>

<style>
  :root {
    --border-color: var(--wa-color-surface-border);
  }
  .two-column {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: 1rem;

    .first-column {
      grid-column: 1/8;
    }

    .second-column {
      grid-column: 8/14
    }

    .cart-item {
      display: grid;
      grid-template-columns: 30% 61%;
      column-gap: 0.5rem;
      margin-bottom: 1rem;

       &:not(:last-of-type) {
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
    }


    }

    .cart-item-meta {
            display: grid;
    grid-template-columns: 45% 35% 20%;
    column-gap: 1rem;
      }


    h1 {
      width: 100%;
    grid-column: 1 / end;
    }
  }
</style>
</div>
```

### Single Column Cart

```html {.example}
<div class="single-column">
  <h1>Shopping Cart</h1>
  <div class="first-half half">
    <section class="cart-item">
    <img class="cart-item-image" src="https://images.unsplash.com/photo-1594787317357-dcda50fd1d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDI4MDd8&ixlib=rb-4.0.3&q=80&w=1080" alt="" >
    <div>
      <span style="display: flex;justify-content: space-between;">
        <span><strong>Convertible</strong></span>
        <span>$32.00</span>
      </span>
      <div>Eggplant</div>

       <div style="display: flex;justify-content: space-between;align-items: baseline;">
        <span><wa-icon name="check" style="color: green; margin-right: 0.5rem;"></wa-icon> In Stock</span>
        <wa-button appearance="plain" size="small">Remove</wa-button>
        </div>
    </div>


  </section>
  <section class="cart-item">
    <img class="cart-item-image" src="https://images.unsplash.com/photo-1597670250484-0e9aff7f8804?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDI4NTB8&ixlib=rb-4.0.3&q=80&w=1080" alt="" >
    <div>
      <span style="display: flex;justify-content: space-between;">
        <span><strong>Pickup</strong></span>
        <span>$32.00</span>
      </span>
      <div>Sky Blue</div>

       <div style="display: flex;justify-content: space-between;align-items: baseline;">
        <span><wa-icon name="check" style="color: green; margin-right: 0.5rem;"></wa-icon> In Stock</span>
        <wa-button appearance="plain" size="small">Remove</wa-button>
        </div>
    </div>


  </section>
  <section class="cart-item">
    <img class="cart-item-image" src="https://images.unsplash.com/photo-1594787826350-19386fdb2363?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDI4ODV8&ixlib=rb-4.0.3&q=80&w=1080" alt="" >
    <div>
      <span style="display: flex;justify-content: space-between;">
        <span><strong>Volkswagon T2</strong></span>
        <span>$32.00</span>
      </span>
      <div>Red/White</div>

       <div style="display: flex;justify-content: space-between;align-items: baseline;">
        <span><wa-icon name="check" style="color: green; margin-right: 0.5rem;"></wa-icon> In Stock</span>
        <wa-button appearance="plain" size="small">Remove</wa-button>
        </div>
    </div>


  </section>
   <div slot="footer">
    <div style="display:flex; justify-content: space-between; font-weight: 600;">
      <span>Subtotal</span>
      <span>$96.00</span>
    </div>
    <div style="font-size: small; margin-bottom: 1rem;">Shipping and taxes calculated at checkout.</div>
   <wa-button size="medium" variant="brand" style="width: 100%; margin-bottom: 1rem;">Medium</wa-button>
    or <a href="#">Continue shopping <wa-icon-button name="arrow-right" variant="solid" label="Settings"></wa-icon-button></a>
  </div>

  </div>
</div>
<style>
  :root {
    --border-color: var(--wa-color-surface-border);
  }
  .single-column {
    .cart-item {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      column-gap: 1rem;
      margin-bottom: 1rem;

       &:not(:last-of-type) {
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
    }

    img {
      grid-column: 1/4;
      width: 100%;
      object-fit: cover;
      height: 90px;
    }

    div {
      grid-column: 4/-1;
      align-content: center;
    }


    }
  }
</style>
```

<!-- ## Product Quickviews

### Basic

```html {.example}
<wa-card with-header class="card-header">
  <div slot="header">
    <strong>Quickview</strong>
    <wa-icon-button name="close" variant="solid" label="Settings"></wa-icon-button>
  </div>
  <div style="
    display: grid;
    grid-template-columns: 35% 1fr;
    grid-column-gap: 1rem;
">
  <img class="cart-item-image" src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDI5OTJ8&ixlib=rb-4.0.3&q=80&w=1080" alt="" >
  <div>
    <h3>Quality Cotton Tee</h3>
    <span>$45.00</span>
    <div style="display: flex;justify-content: space-between;">
      <wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating>
      <a href="#">See all ratings</a>
    </div>
    <wa-radio-group label="Color" name="a" value="1" style="margin-bottom: 1rem">
      <wa-radio-button value="1">White</wa-radio-button>
      <wa-radio-button value="2">Gray</wa-radio-button>
      <wa-radio-button value="3">Black</wa-radio-button>
    </wa-radio-group>
    <wa-radio-group label="Size"  name="a" value="1" style="margin-bottom: 1rem">
      <wa-radio-button value="1">Small</wa-radio-button>
      <wa-radio-button value="2">Medium</wa-radio-button>
      <wa-radio-button value="3">Large</wa-radio-button>
    </wa-radio-group>
    <wa-button size="medium" variant="brand" style="width: 100%; margin: 1rem 0;">Add to Cart</wa-button>

  </div>
  </div>
</wa-card>
``` -->

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

### Order History

```html {.example}
<div>
  <h2>Order History</h2>
  <p>Check the status of recent orders, manage returns, and download invoices.</p>
  <div class="order-history-meta">
    <span class="order-history-meta-item">
      <strong>Order number</strong>
      <span>WU88191111</span>
    </span>
       <span class="order-history-meta-item">
      <strong>Date placed</strong>
      <span>January 22, 2021</span>
    </span>
       <span class="order-history-meta-item">
      <strong>Total amount</strong>
      <span>$95.00</span>
    </span>
      <span style="display: grid;grid-template-columns: 1fr 1fr;column-gap: 1rem;">
        <wa-button variant="neutral" appearance="outlined">View Order</wa-button>
        <wa-button variant="neutral" appearance="outlined">View Invoice</wa-button>
      </span>
  </div>
  <div>
    <div class="order-history-list-item" style="align-items: center;">
      <img class="cart-item-image" src="https://images.unsplash.com/photo-1628304433247-804066a9864c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDMxODN8&ixlib=rb-4.0.3&q=80&w=1080" alt="">
      <div>
        <span style="display: flex;justify-content: space-between;">
          <span><strong>Kitchen Stool</strong></span>
          <span><strong>$55.00</strong></span>
        </span>
        <p>TODO: add a description</p>
        <span>
          <a href="#">View Product</a> |  <a href="#">Buy Again</a>
        </span>
        <br/>
        <span>Out for Delivery</span>
      </div>
    </div>
    <div class="order-history-list-item" style="margin-top: 1rem; align-items: center;">
      <img class="cart-item-image" src="https://plus.unsplash.com/premium_photo-1675705062445-0c14a42d4289?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDMwODJ8&ixlib=rb-4.0.3&q=80&w=1080" alt="">
      <div>
        <span style="display: flex;justify-content: space-between;">
          <span><strong>Succulent</strong></span>
          <span><strong>$5.00</strong></span>
        </span>
        <p>TODO: add a description</p>
        <span>
          <a href="#">View Product</a> |  <a href="#">Buy Again</a>
        </span>
        <br/>
        <span>Out for Delivery</span>
      </div>
    </div>
    <div class="order-history-list-item" style="margin-top: 1rem; align-items: center;">
      <img class="cart-item-image" src="https://images.unsplash.com/photo-1613536844480-ac5d7b1b6ed1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDMyMzh8&ixlib=rb-4.0.3&q=80&w=1080" alt="">
      <div>
        <span style="display: flex;justify-content: space-between;">
          <span><strong>French Roast</strong></span>
          <span><strong>$35.00</strong></span>
        </span>
        <p>TODO: add a description</p>
        <span>
          <a href="#">View Product</a> |  <a href="#">Buy Again</a>
        </span>
        <br/>
        <span>Out for Delivery</span>
      </div>
    </div>
  </div>
</div>
<style>
   :root {
    --border-color: var(--wa-color-surface-border);
  }
  .order-history-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;

    .order-history-meta-item {
      display: flex;
      flex-direction: column;
    }

  }

  .order-history-list-item {
        display: grid;
    grid-template-columns: 18% 79%;
    column-gap: 1rem;
        border-bottom: 1px solid var(--border-color);
    padding-bottom: 1rem;
  }
</style>
```

### Checkout

```html {.example}
<div class="checkout-form">
<div class="checkout-form-inputs">
  <h4 class="full-row" style="margin-top: 0.5rem;">Contact Info</h4>
  <wa-input type="email" label="Email Address" class="full-row"></wa-input>
  <hr class="full-row" />
  <h4 class="full-row" style="margin-top: 0.5rem;">Shipping Information</h4>
  <wa-input label="First Name" class="first-half"></wa-input>
  <wa-input label="Last Name" class="second-half" style="margin-top: 1.5rem;"></wa-input>
  <wa-input label="Company" class="full-row" style="margin-top: 1.5rem;"></wa-input>
  <wa-input label="Address" class="full-row" style="margin-top: 1.5rem;"></wa-input>
  <wa-input label="City" class="first-half" style="margin-top: 1.5rem;"></wa-input>
  <wa-select label="Country" placeholder="Country" class="second-half" style="margin-top: 1.5rem;">
    <wa-option value="option-1">Option 1</wa-option>
    <wa-option value="option-2">Option 2</wa-option>
    <wa-option value="option-3">Option 3</wa-option>
  </wa-select>
  <wa-input label="State" class="first-half" style="margin-top: 1.5rem;"></wa-input>
  <wa-input label="Postal Code" class="second-half" style="margin-top: 1.5rem;"></wa-input>
  <wa-input label="Phone" class=" full-row" style="margin-top: 1.5rem;"></wa-input>
  <hr class="full-row" />
    <wa-radio-group label="Delivery Method" hint="Select an option that makes you proud." name="a" value="1" class="full-row" style="margin-top: 1.5rem;">
    <wa-radio-button value="1">Standard</wa-radio-button>
    <wa-radio-button value="2">Express</wa-radio-button>
  </wa-radio-group>
  <hr class="full-row" />
  <h4 class="full-row" style="margin-top: 0.5rem;">Payment</h4>
  <wa-radio-group label="Select an option" name="a" value="1" class="full-row" style="margin-top: 1.5rem;">
    <wa-radio value="1">Credit Card</wa-radio>
    <wa-radio value="3">Paypal</wa-radio>
  </wa-radio-group>
  <wa-input label="Card Number" class="full-row" style="margin-top: 1.5rem;"></wa-input>
<wa-input label="Name on Card" class="full-row" style="margin-top: 1.5rem;"></wa-input>
<wa-input label="Expiration Date" class="first-half" style="margin-top: 1.5rem;"></wa-input>
<wa-input label="CVC" class="second-half" style="margin-top: 1.5rem;"></wa-input>
</div>
<div class="checkout-form-summary">
  <h4>Order Summary</h4>
  <wa-card class="card-basic">
    <div class="summary-item">
      <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDM1MzB8&ixlib=rb-4.0.3&q=80&w=1080">
      <div class="summary-item-info">
        <span style="display: flex; justify-content: space-between;">
          <span class="item-heading">Dolce Runners</span>
          <wa-icon-button name="trash" variant="solid" label="Settings"></wa-icon-button>
        </span>
        <span class="subtle">Cream/Seafoam</span>
        <br />
        <span class="subtle">12.5</span>
        <span style="display:flex;justify-content: space-between; width: 100%;margin: 1rem 0 2rem;">
          <span class="item-price">$0.00</span>
          <wa-select placeholder="1" style="width: 70px; margin-left: auto">
            <wa-option value="option-1">1</wa-option>
            <wa-option value="option-2">2</wa-option>
            <wa-option value="option-3">3</wa-option>
          </wa-select>
          </span>
        </div>
      <hr style="grid-column: 1 / -1;">
    </div>
    <div class="summary-item">
      <img src="https://images.unsplash.com/photo-1514989940723-e8e51635b782?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDM1Njh8&ixlib=rb-4.0.3&q=80&w=1080">
      <div class="summary-item-info">
        <span style="display: flex; justify-content: space-between;">
          <span class="item-heading">Dunk High</span>
          <wa-icon-button name="trash" variant="solid" label="Settings"></wa-icon-button>
        </span>
        <span class="subtle">Sand/Amber/Black</span>
        <br />
        <span class="subtle">12.5</span>
        <span style="display:flex;justify-content: space-between; width: 100%;margin: 1rem 0 2rem;">
          <span class="item-price">$180.00</span>
          <wa-select placeholder="1" style="width: 70px; margin-left: auto">
            <wa-option value="option-1">1</wa-option>
            <wa-option value="option-2">2</wa-option>
            <wa-option value="option-3">3</wa-option>
          </wa-select>
          </span>
        </div>
      <hr style="grid-column: 1 / -1;">
    </div>
    <div class="summary-item">
      <img src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDM2MTF8&ixlib=rb-4.0.3&q=80&w=1080">
      <div class="summary-item-info">
        <span style="display: flex; justify-content: space-between;">
          <span class="item-heading">NB Runner</span>
          <wa-icon-button name="trash" variant="solid" label="Settings"></wa-icon-button>
        </span>
        <span class="subtle">Forrest Green</span>
        <br />
        <span class="subtle">12.5</span>
        <span style="display:flex;justify-content: space-between; width: 100%;margin: 1rem 0 2rem;">
          <span class="item-price">$48.99</span>
          <wa-select placeholder="1" style="width: 70px; margin-left: auto">
            <wa-option value="option-1">1</wa-option>
            <wa-option value="option-2">2</wa-option>
            <wa-option value="option-3">3</wa-option>
          </wa-select>
          </span>
        </div>
      <hr style="grid-column: 1 / -1;">
    </div>
 <wa-button size="medium" variant="brand" style="width: 100%; margin-bottom: 1rem;">Confirm Order</wa-button>
</wa-card>
</div>
</div>

<style>
  .checkout-form {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 1rem;

    .checkout-form-inputs {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      grid-column-gap: 1rem;
    }
      .summary-item {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-column-gap: 1rem;

        img {
          grid-column: 1/4;
          width: 100%;
        }

        .summary-item-info {
          grid-column: 4/12;
        }
      }
    /* & hr {
      border-width: 1px;
      margin: 1rem 0;
    } */
    .subtle {
      font-size: small;
    }

    .item-heading {
      font-size: large:
    }

    /* Grid utilities */

    .full-row {
      grid-column: 1/-1
    }

    .first-half {
      grid-column: 1/4
    }

    .second-half {
      grid-column: 4/7
    }

    .first-third {
      rid-column: 1/3
    }
    .second-third {
      rid-column: 3/5
    }
    .last-third {
      rid-column: 5/7
    }
  }
</style>
```
