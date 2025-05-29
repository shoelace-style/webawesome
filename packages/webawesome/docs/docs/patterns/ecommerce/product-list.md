---
title: Product Lists
description: 'Let shoppers browse and compare products with detailed lists of the products in your store.'
isPro: true
---

## Simple Grid with Ratings

```html {.example}
<div class="wa-grid wa-gap-2xl">
  <a class="wa-stack wa-align-items-center wa-gap-xs wa-link-plain" href="">
    <div class="wa-frame wa-border-radius-m">
      <img
        src="https://images.unsplash.com/photo-1633933329864-5d4c4423ad54?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Bunch of fresh basil leaves with purple veins (Photograph by Svitlana)"
      />
    </div>
    <strong>Basil</strong>
    <wa-rating label="Rating" size="small" readonly value="5"></wa-rating>
    <span class="wa-caption-m">41 Reviews</span>
    <strong>$8.59</strong>
  </a>
  <a class="wa-stack wa-align-items-center wa-gap-xs wa-link-plain" href="">
    <div class="wa-frame wa-border-radius-m">
      <img
        src="https://images.unsplash.com/photo-1662892194342-f95c33cc16e3?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Bunch of cut chamomile blooms (Photograph by Rootnot Creations)"
      />
    </div>
    <strong>Chamomile</strong>
    <wa-rating label="Rating" size="small" readonly value="3"></wa-rating>
    <span class="wa-caption-m">17 Reviews</span>
    <strong>$10.29</strong>
  </a>
  <a class="wa-stack wa-align-items-center wa-gap-xs wa-link-plain" href="">
    <div class="wa-frame wa-border-radius-m">
      <img
        src="https://images.unsplash.com/photo-1636396279461-f875646332d9?q=80&w=3360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Canvas bundle of cut lavender blooms (Photograph by volant)"
      />
    </div>
    <strong>Lavender</strong>
    <wa-rating label="Rating" size="small" readonly value="4"></wa-rating>
    <span class="wa-caption-m">29 Reviews</span>
    <strong>$9.99</strong>
  </a>
  <a class="wa-stack wa-align-items-center wa-gap-xs wa-link-plain" href="">
    <div class="wa-frame wa-border-radius-m">
      <img
        src="https://images.unsplash.com/photo-1501085934018-450c8e615dbc?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Blooming marjoram plant (Photograph by Monika Grabkowska)"
      />
    </div>
    <strong>Marjoram</strong>
    <wa-rating label="Rating" size="small" readonly value="4"></wa-rating>
    <span class="wa-caption-m">11 Reviews</span>
    <strong>$8.59</strong>
  </a>
  <a class="wa-stack wa-align-items-center wa-gap-xs wa-link-plain" href="">
    <div class="wa-frame wa-border-radius-m">
      <img
        src="https://images.unsplash.com/photo-1688633767797-455f59c98272?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Group of mature oregano plants (Photograph Nikolett Emmert)"
      />
    </div>
    <strong>Oregano</strong>
    <wa-rating label="Rating" size="small" readonly value="5"></wa-rating>
    <span class="wa-caption-m">38 Reviews</span>
    <strong>$8.59</strong>
  </a>
  <a class="wa-stack wa-align-items-center wa-gap-xs wa-link-plain" href="">
    <div class="wa-frame wa-border-radius-m">
      <img
        src="https://images.unsplash.com/photo-1603109731710-dba41b1096a7?q=80&w=2259&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Cluster of peppermint plants (Photograph by Josefin)"
      />
    </div>
    <strong>Peppermint</strong>
    <wa-rating label="Rating" size="small" readonly value="5"></wa-rating>
    <span class="wa-caption-m">26 Reviews</span>
    <strong>$9.99</strong>
  </a>
  <a class="wa-stack wa-align-items-center wa-gap-xs wa-link-plain" href="">
    <div class="wa-frame wa-border-radius-m">
      <img
        src="https://images.unsplash.com/photo-1726994803809-0e065bd4b25b?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Mature rosemary stems (Photograph by 360floralflaves)"
      />
    </div>
    <strong>Rosemary</strong>
    <wa-rating label="Rating" size="small" readonly value="4"></wa-rating>
    <span class="wa-caption-m">34 Reviews</span>
    <strong>$8.59</strong>
  </a>
  <a class="wa-stack wa-align-items-center wa-gap-xs wa-link-plain" href="">
    <div class="wa-frame wa-border-radius-m">
      <img
        src="https://images.unsplash.com/photo-1659834742696-44573974981b?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Group of sage plants (Photograph by Susie Burleson)"
      />
    </div>
    <strong>Sage</strong>
    <wa-rating label="Rating" size="small" readonly value="5"></wa-rating>
    <span class="wa-caption-m">24 Reviews</span>
    <strong>$9.29</strong>
  </a>
</div>
```

## Even Card Grid with Details

```html {.example}
<div class="wa-grid" style="--min-column-size: 50ch">
  <div class="wa-grid">
    <a href="" class="wa-link-plain">
      <wa-card style="height: 100%;">
        <img
          slot="media"
          src="https://images.unsplash.com/photo-1622445272461-c6580cab8755?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Man in a relaxed fit, white, crew neck t-shirt (Photography by Mediamodifier)"
        />
        <div class="wa-stack">
          <div class="wa-flank:end wa-align-items-start wa-heading-m">
            <span>Plain Classic Tee</span>
            <span>$24</span>
          </div>
          <p class="wa-caption-m">
            Keep it casual or dress it up. Soft, 100% cotton with a crew neckline, perfect for any occasion.
          </p>
          <em class="wa-caption-m">8 colors</em>
        </div>
      </wa-card>
    </a>
    <a href="" class="wa-link-plain">
      <wa-card style="height: 100%;">
        <img
          slot="media"
          src="https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Woman in a light heather t-shirt printed with sharp black ink (Photograph by Christian Bolt)"
        />
        <div class="wa-stack">
          <div class="wa-flank:end wa-align-items-start wa-heading-m">
            <span>One-color Graphic Tee</span>
            <span>$32</span>
          </div>
          <p class="wa-caption-m">
            Your own spin on our classic tee. Hand screen printed for the ultimate accuracy and quality.
          </p>
          <em class="wa-caption-m">6 colors</em>
        </div>
      </wa-card>
    </a>
  </div>
  <div class="wa-grid">
    <a href="" class="wa-link-plain">
      <wa-card style="height: 100%;">
        <img
          slot="media"
          src="https://images.unsplash.com/photo-1567098260939-5d9cee055592?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Man in a black t-shirt printed with many-colored gradients (Photograph by Marcel)"
        />
        <div class="wa-stack">
          <div class="wa-flank:end wa-align-items-start wa-heading-m">
            <span>Multi-color Graphic Tee</span>
            <span>$36</span>
          </div>
          <p class="wa-caption-m">
            Make a statement. Screen printed with vibrant, quality inks to last wash after wash.
          </p>
          <em class="wa-caption-m">4 colors</em>
        </div>
      </wa-card>
    </a>
    <a href="" class="wa-link-plain">
      <wa-card style="height: 100%;">
        <img
          slot="media"
          src="https://images.unsplash.com/photo-1709185727063-c3caae752a64?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Woman in a black t-shirt with a bright white logo printed on the pocket (Photograph by SASI)"
        />
        <div class="wa-stack">
          <div class="wa-flank:end wa-align-items-start wa-heading-m">
            <span>Pocket Graphic Tee</span>
            <span>$29</span>
          </div>
          <p class="wa-caption-m">
            Go classic with a bit of your own flair. Screen printed, eye-catching detail on the pocket.
          </p>
          <em class="wa-caption-m">6 colors</em>
        </div>
      </wa-card>
    </a>
  </div>
</div>
```
