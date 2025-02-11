---
title: Product Preview
description: 'Gives Customers the ability to see more details about a product or service in a modal to get more information'
parent: ecommerce
tags: e-commerce
icon: preview
---
 
## With color and size selector
```html{.example}
  <div style="max-width: 960px;margin: 0 auto;">
   <wa-card with-header>
    <div class="wa-flank" slot="header">
      <span style="font-size: large;font-weight: 600;">Graphic Tank</span>
      <wa-icon-button name="close" label="close-modal" style="flex-basis: initial;flex-grow: initial;min-inline-size: auto;"></wa-icon-button>
    </div>
    <div class="card-body wa-grid">
      <img style="height: 100%; object-fit: cover;" src="https://img.fortawesome.com/cfa83f3c/gervyn-louis-is03aji00fc-unsplash.jpg" alt="">
      <div class="wa-stack">
        <div class="wa-split" style="margin-bottom: var(--wa-size);">
          <span style="font-size: xx-large;font-weight: 600;">$32</span>
          <wa-button variant="brand" size="medium">
            <wa-icon slot="suffix" name="cart-shopping" variant="solid"></wa-icon>Add to Cart 
          </wa-button>
        </div>
        <span class="wa-flank wa-align-start">
          <wa-rating label="Rating" precision="0.5" value="3.75"></wa-rating>
          <a style="margin-left: .5rem; " href="*">36 Reviews</a>
        </span>
         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet odio convallis, blandit ante sit amet, sagittis erat. Aliquam sodales luctus nibh, eu cursus est euismod in. Nullam ac ex iaculis est mattis sodales vel vitae tellus. Fusce dapibus malesuada blandit. Curabitur eu iaculis lectus. Maecenas vitae enim nisi. Integer in eros ex. Sed eu facilisis nibh. In nec leo lacus. Nunc eu diam quam. Mauris nec sem ex. Pellentesque vitae magna et magna ornare porttitor tincidunt ut nunc.</p>
        <form class="detail wa-flank">
          <wa-radio-group orientation="horizontal" style="margin-bottom: 1rem;" label="Color" name="a" value="black">
            <wa-radio-button value="black">Black</wa-radio-button>
            <wa-radio-button value="white">White</wa-radio-button>
            <wa-radio-button value="gray">Gray</wa-radio-button>
          </wa-radio-group>
          <wa-select label="Sizes" placeholder="select size">
            <wa-option value="option-1">Small</wa-option>
            <wa-option value="option-2">Medium</wa-option>
            <wa-option value="option-3">Large</wa-option>
            <wa-option value="option-3">Extra Large</wa-option>
          </wa-select>
        </form>
      <a href="*" style="display: inline-block;width: 100%;text-align: center;margin-top: auto">View full details</a>
      </div>
    </div>
   </wa-card>
  </div>
```

## with large selector
```html{.example}
  <wa-card style="max-width: 960px;margin: 0 auto;">
    <div class="card-body wa-grid">
      <div>
      <img style="border-radius: var(--border-radius); height: 100%; object-fit: cover;" src="https://img.fortawesome.com/cfa83f3c/gervyn-louis-is03aji00fc-unsplash.jpg" alt="">
      </div>
      <div style="position: relative">
        <h2>Graphic Tank</h2>
        <wa-icon-button name="close" label="close-modal" style="position: absolute;top: 0;right: 0;"></wa-icon-button>
        <section>
          <p style="font-size: x-large;font-weight: 600;">$32</p>
          <div class="wa-split">
            <p>3.9</p>
            <wa-rating value="3.9"></wa-rating>
            <a href="*" style="margin-left: auto;">See all 512 Reviews</a>
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet odio convallis, blandit ante sit amet, sagittis erat. Aliquam sodales luctus nibh, eu cursus est euismod in. Nullam ac ex iaculis est mattis sodales vel vitae tellus. Fusce dapibus malesuada blandit. Curabitur eu iaculis lectus. Maecenas vitae enim nisi. Integer in eros ex. Sed eu facilisis nibh. In nec leo lacus. Nunc eu diam quam. Mauris nec sem ex. Pellentesque vitae magna et magna ornare porttitor tincidunt ut nunc.</p>
        </section>
        <section>
          <form class="wa-stack">
            <wa-radio-group orientation="horizontal" label="Color" hint="We've got more colors on the way!" name="a" value="black" style="margin: 1rem 0;">
              <wa-radio value="black">Black</wa-radio>
              <wa-radio value="gray">Gray</wa-radio>
            </wa-radio-group>
            <wa-radio-group orientation="horizontal" label="Size" name="a" value="medium"  style="margin-bottom: 1rem;">
              <wa-radio-button value="small">S</wa-radio-button>
              <wa-radio-button value="medium">M</wa-radio-button>
              <wa-radio-button value="large">L</wa-radio-button>
              <wa-radio-button value="extra-large">XL</wa-radio-button>
            </wa-radio-group>
            <wa-button variant="brand" size="medium" style="width: 100%; margin-top: auto;margin-bottom: 1rem;">
              <wa-icon slot="suffix" name="cart-shopping" variant="solid"></wa-icon>
              Add to Cart
            </wa-button>
            <a href="*" style="display: inline-block;width: 100%;text-align: center;">View full details</a>
          </form>
        </section>
      </div>
    </div>
  </wa-card>
```
