---
title: Product Preview
description: 'Give shoppers a quick look at your products as they browse with modal previews.'
icon: preview
isPro: true
---

## With Product Options

```html {.example}
<wa-card>
  <div class="wa-split" slot="header">
    <h3 class="wa-heading-l">Stan Smith® Camo Tongue Tee</h3>
    <wa-icon-button name="close" label="Close Preview"></wa-icon-button>
  </div>
  <div class="wa-grid wa-gap-xl">
    <div class="wa-frame wa-border-radius-l" style="aspect-ratio: auto">
      <img
        src="https://images.unsplash.com/photo-1660997351262-6c31d8a35b6c?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Stan Smith graphic crew-neck tee in honeydew color"
      />
    </div>
    <div class="wa-split:column wa-align-items-stretch wa-gap-xl">
      <div class="wa-stack wa-gap-xl">
        <div class="wa-cluster">
          <span class="wa-heading-2xl">$32</span>
          <wa-divider orientation="vertical"></wa-divider>
          <wa-rating label="Rating" value="3.75" readonly></wa-rating>
          <a href="" class="wa-caption-m">36 Reviews</a>
        </div>
        <p>An ode to the “Sneaker that go with everything” …even this tee.</p>
        <wa-divider></wa-divider>
        <div class="wa-stack wa-gap-s">
          <h4 class="wa-heading-s">Categories</h4>
          <div class="wa-cluster wa-gap-2xs">
            <a href=""><wa-tag appearance="outlined" size="small" pill>Men's</wa-tag></a>
            <a href=""><wa-tag appearance="outlined" size="small" pill>Sneakers</wa-tag></a>
            <a href=""><wa-tag appearance="outlined" size="small" pill>Tees</wa-tag></a>
            <a href=""><wa-tag appearance="outlined" size="small" pill>Lifestyle</wa-tag></a>
            <a href=""><wa-tag appearance="outlined" size="small" pill>Fashion</wa-tag></a>
            <a href=""><wa-tag appearance="outlined" size="small" pill>Casual</wa-tag></a>
            <a href=""><wa-tag appearance="outlined" size="small" pill>Stan Smith</wa-tag></a>
            <a href=""><wa-tag appearance="outlined" size="small" pill>Tennis</wa-tag></a>
            <a href=""><wa-tag appearance="outlined" size="small" pill>Sports</wa-tag></a>
          </div>
        </div>
        <wa-divider></wa-divider>
        <div class="wa-stack wa-gap-s">
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
        </div>
      </div>
      <wa-button variant="brand">
        Add to Cart
        <wa-icon slot="suffix" name="cart-shopping" variant="solid"></wa-icon>
      </wa-button>
    </div>
  </div>
</wa-card>
```

## With Description & Details

```html {.example}
<wa-card>
  <div class="wa-split" slot="header">
    <h3 class="wa-heading-l">Champion® Crossbody Bag</h3>
    <wa-icon-button name="close" label="Close Preview"></wa-icon-button>
  </div>
  <div class="wa-grid wa-gap-xl">
    <div class="wa-frame wa-border-radius-l" style="aspect-ratio: auto">
      <img
        src="https://images.unsplash.com/photo-1643467358005-899641cab7b5?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Black weatherproof crossbody bag with two large zipper pockets"
      />
    </div>
    <div class="wa-split:column wa-align-items-stretch wa-gap-xl">
      <div class="wa-stack wa-gap-xl">
        <div class="wa-split wa-align-items-start">
          <span class="wa-heading-2xl">$40</span>
          <wa-icon-button id="favorite" label="Favorite" name="heart" variant="regular"></wa-icon-button>
          <wa-tooltip for="favorite">Add to Favorites</wa-tooltip>
        </div>
        <div class="wa-split">
          <div class="wa-cluster wa-gap-xs">
            <span>3.9</span>
            <wa-rating value="3.9" readonly></wa-rating>
          </div>
          <a href="">See 512 Reviews</a>
        </div>
        <wa-divider></wa-divider>
        <wa-callout size="small">
          <wa-icon slot="icon" name="circle-info" variant="regular"></wa-icon>
          You purchased this item on
          <wa-format-date date="2023-02-20T09:00:00-04:00" month="long" day="numeric" year="numeric"></wa-format-date>
        </wa-callout>
        <div class="wa-gap-xs wa-stack">
          <h4 class="wa-heading-m">About</h4>
          <p class="wa-body-s">
            The Champion® Crossbody Bag is crafted for the trendsetter. Its sleek silhouette, paired with a tonal
            branded adjustable sling strap, ensures you look effortlessly cool no matter where you go.
          </p>
        </div>
        <wa-divider></wa-divider>
        <div class="wa-gap-xs wa-stack">
          <h4 class="wa-heading-m">Details</h4>
          <dl class="wa-grid" style="--min-column-size: 15ch">
            <div class="wa-gap-2xs wa-stack">
              <dt class="wa-body-s">Care Instructions</dt>
              <dd class="wa-caption-m">Hand Wash Only</dd>
            </div>
            <div class="wa-gap-2xs wa-stack">
              <dt class="wa-body-s">Origin</dt>
              <dd class="wa-caption-m">Imported</dd>
            </div>
            <div class="wa-gap-2xs wa-stack">
              <dt class="wa-body-s">Country of Origin</dt>
              <dd class="wa-caption-m">China</dd>
            </div>
          </dl>
        </div>
      </div>
      <div class="wa-flank:end wa-align-items-end">
        <wa-button variant="brand" size="medium">
          <wa-icon slot="suffix" name="cart-shopping" variant="solid"></wa-icon>Add to Cart
        </wa-button>
        <wa-button appearance="outlined" size="medium">
          <wa-icon slot="suffix" name="arrow-right" variant="solid"></wa-icon>View Full Details
        </wa-button>
      </div>
    </div>
  </div>
</wa-card>
```
