---
title: Product Preview
description: 'Give shoppers a quick look at your products as they browse with modal previews.'
parent: ecommerce
tags: e-commerce
icon: preview
---
 
## With size & color options
```html{.example}
<div style="max-width: 960px;margin: 0 auto;">
  <wa-card with-header>
    <div class="wa-flank" slot="header">
      <h3>Stan Smith® Camo Tongue Tee</h3>
      <wa-icon-button name="close" label="close-modal" style="flex-basis: initial;flex-grow: initial;min-inline-size: auto;"></wa-icon-button>
    </div>
    <div class="wa-grid">
    <div class="wa-frame wa-border-radius-l" style="width: 100%; height: 100%">
      <img src="https://images.unsplash.com/photo-1660997351262-6c31d8a35b6c?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="stan smith graphic tee" />
    </div>
    <div class="wa-stack">
      <span class="wa-heading-2xl">$32</span>
      <span class="wa-flank wa-align-start">
          <wa-rating label="Rating" precision="0.5" value="3.75"></wa-rating>
          <a style="margin-left: .5rem; " href="*">36 Reviews</a>
        </span>
        <p>An ode to the “Sneaker that go with everything”… even this tee.</p>
        <wa-divider></wa-divider>
       <div class="wa-gap-s wa-stack">
        <span class="wa-heading-s">Categories</span>
        <div class="wa-cluster wa-gap-2xs">
          <a href="#"><wa-tag appearance="outlined" size="small" pill>Men's</wa-tag></a>
          <a href="#"><wa-tag appearance="outlined" size="small" pill>sneakers</wa-tag></a>
          <a href="#"><wa-tag appearance="outlined" size="small" pill>Tee Shirt</wa-tag></a>
          <a href="#"><wa-tag appearance="outlined" size="small" pill>Lifestyle</wa-tag></a>
          <a href="#"><wa-tag appearance="outlined" size="small" pill>Fashion</wa-tag></a>
          <a href="#"><wa-tag appearance="outlined" size="small" pill>Casual</wa-tag></a>
          <a href="#"><wa-tag appearance="outlined" size="small" pill>Stan Smith</wa-tag></a>
          <a href="#"><wa-tag appearance="outlined" size="small" pill>Tennis</wa-tag></a>
          <a href="#"><wa-tag appearance="outlined" size="small" pill>Sports</wa-tag></a>
        </div>
       </div>
       <wa-divider></wa-divider>
       <wa-select label="Color" value="honeydew">
          <wa-option value="hotpink">
            <wa-icon slot="prefix" name="circle" style="color: hotpink;"></wa-icon>
            Hot Pink
          </wa-option>
          <wa-option value="honeydew">
            <wa-icon slot="prefix" name="circle" style="color: honeydew;"></wa-icon>
            Honeydew
          </wa-option>
          <wa-option value="coral">
            <wa-icon slot="prefix" name="circle" style="color: lightcoral;"></wa-icon>
            Coral
          </wa-option>
          <wa-option value="wheat">
            <wa-icon slot="prefix" name="circle" style="color: wheat;"></wa-icon>
            Wheat
          </wa-option>
          <wa-option value="lilac">
            <wa-icon slot="prefix" name="circle" style="color: #C8A2C8;"></wa-icon>
            Lilac
          </wa-option>
          <wa-option value="burnt-orange">
            <wa-icon slot="prefix" name="circle" style="color: #FF5733"></wa-icon>
            Burnt Orange
          </wa-option>
        </wa-select>
        <wa-select label="Size" value="large">
          <wa-option value="small">Small</wa-option>
          <wa-option value="medium">Medium</wa-option>
          <wa-option value="large">Large</wa-option>
          <wa-option value="xl">XL</wa-option>
          <wa-option value="xxl">XXL</wa-option>
        </wa-select>
      <wa-button variant="brand" size="medium" style="margin-top: auto;">
            <wa-icon slot="suffix" name="cart-shopping" variant="solid"></wa-icon>Add to Cart 
          </wa-button>
    </div>
  </div>
  </wa-card>

</div>
```

## With Description & Details Link
```html{.example}
  <wa-card style="max-width: 960px;margin: 0 auto;" with-header>
   
      <div class="wa-split" slot="header">
          <h3 class="wa-heading-l">Champion® Crossbody Bag</h3>
          <wa-icon-button name="close" label="close-modal"></wa-icon-button>
        </div>

    <div class="wa-grid">
      <div class="wa-frame:portrait wa-border-radius-l">
      <img style="height: 100%; object-fit: cover;" src="https://images.unsplash.com/photo-1643467358005-899641cab7b5?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="champion crossbody bag" />
      </div>
      <div class="wa-stack">
          <div class="wa-split wa-align-items-start">
            <span class="wa-heading-2xl">$32</span>
            <wa-icon name="heart" variant="solid"></wa-icon>
          </div>
          
          <div class="wa-split">
            <p>3.9</p>
            <wa-rating value="3.9"></wa-rating>
            <a href="*" style="margin-left: auto;">See all 512 Reviews</a>
          </div>
        <wa-divider></wa-divider>
        <wa-callout><wa-icon slot="icon" name="circle-info" variant="regular"></wa-icon>You purchased this item on February 20th, 2023</wa-callout>
        <div class="wa-gap-xs wa-stack">
          <span class="wa-heading-m">About</span>
          <p class="wa-caption-l">The Champion® Crossbody Bag is crafted for the trendsetter. Its sleek silhouette, paired with a tonal branded adjustable sling strap, ensures you look effortlessly cool no matter where you go.</p>
        </div> 
        <wa-divider></wa-divider>
        <div class="wa-gap-xs wa-stack">
          <span class="wa-heading-m">Product Details</span>
          <dl class="wa-gap-xs wa-stack" style="margin: 0;">
            <div class="wa-gap-xs wa-stack">
              <dt class="wa-heading-s">Care instructions</dt>
              <dd class="wa-caption-m" style="margin: 0;">Hand Wash Only</dd>
            </div>
            <div class="wa-gap-xs wa-stack">
              <dt class="wa-heading-s">Origin</dt>
              <dd class="wa-caption-m" style="margin: 0;">Imported</dd>
            </div>
            <div class="wa-gap-xs wa-stack">
              <dt class="wa-heading-s">Country of Origin</dt>
              <dd class="wa-caption-m" style="margin: 0;">China</dd>
            </div>
          </dl>
        </div>
        <div class="wa-grid" style="margin-top: auto;">
        <wa-button variant="brand" size="medium">
            <wa-icon slot="suffix" name="cart-shopping" variant="solid"></wa-icon>Add to Cart 
          </wa-button>
          <wa-button appearance="outlined" size="medium">
            <wa-icon slot="suffix" name="arrow-right" variant="solid"></wa-icon>View Full Details
          </wa-button>
          </div>
      </div>
    </div>
    
    </div>
  </wa-card>
```
