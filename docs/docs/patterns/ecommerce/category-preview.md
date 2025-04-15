---
title: Category Preview
description: 'Help shoppers discover your product offerings with showcases of product categories.'
icon: preview
isPro: true
---

## Split with Image Grid

```html {.example}
<div class="wa-flank wa-align-items-start" style="--flank-size: 20rem;">
  <div class="wa-stack wa-gap-2xl">
    <h2 class="wa-heading-xl">Casual Collection</h2>
    <p class="wa-body-s">Look good &mdash; without looking like you're trying too hard. Our casual collection includes laid back styles that work in <em>almost</em> any situation.</p>
    <wa-button>View the Collection</wa-button>
  </div>
  <div class="wa-stack">
    <div class="wa-frame:landscape wa-border-radius-s">
      <img
        src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="An analog watch, cotton pants, crew neck tee, and pair of tennis shoes (Photograph by Mnz)"
      />
    </div>
    <div class="wa-grid">
      <div class="wa-frame:landscape wa-border-radius-s">
        <img
          src="https://images.unsplash.com/photo-1548768041-2fceab4c0b85?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Stack of three folded solid color tees (Photograph by Mnz)"
        />
      </div>
      <div class="wa-frame:landscape wa-border-radius-s">
        <img
          src="https://images.unsplash.com/photo-1544441892-794166f1e3be?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Pair of bright white tennis shoes(Photograph by Mnz)"
        />
      </div>
    </div>
  </div>
</div>
```

## Columns with Tall Images

```html {.example}
<div class="wa-stack">
  <h2 class="wa-heading-xl">Shop by Category</h2>
  <div class="wa-grid">
    <a href="" class="wa-stack wa-link-plain">
      <div class="wa-frame:portrait wa-border-radius-s">
        <img
          src="https://uploads.webawesome.com/organization.jpg"
          alt="Inside of a closet filled with clothes on wooden hangers and integrated shelving with shoes"
        />
      </div>
      <span class="wa-caption-xl">Organization</span>
    </a>
    <a href="" class="wa-stack wa-link-plain">
      <div class="wa-frame:portrait wa-border-radius-s">
        <img
          src="https://uploads.webawesome.com/bags.jpg"
          alt="Young person hugging a small floral patterned book bag between their arms"
        />
      </div>
      <span class="wa-caption-xl">Bags</span>
    </a>
    <a href="" class="wa-stack wa-link-plain">
      <div class="wa-frame:portrait wa-border-radius-s">
        <img
          src="https://uploads.webawesome.com/outdoor-2.jpg"
          alt="Person in a mountain clearing wearing a waterproof hooded windbreaker in black and orange"
        />
      </div>
      <span class="wa-caption-xl">Outdoor</span>
    </a>
  </div>
</div>
```

## Columns with Cards

```html {.example}
<div class="wa-stack">
  <div class="wa-split">
    <h2 class="wa-heading-xl">Shop by Category</h2>
    <a href="" class="wa-cluster">
      <span>Browse All Categories</span>
      <wa-icon name="arrow-right"></wa-icon>
    </a>
  </div>
  <div class="wa-grid">
    <a href="" class="wa-link-plain">
      <wa-card style="height: 100%">
        <img
          slot="image"
          src="https://img.fortawesome.com/cfa83f3c/outdoor-3x.jpg"
          alt="Two hikers wearing long canvas pants, weatherproof jackets, and backpacks"
        />
        <div class="wa-stack wa-gap-xs">
          <span class="wa-heading-m">Outdoor</span>
          <p class="wa-caption-m">Durable canvas gear for all conditions.</p>
        </div>
      </wa-card>
    </a>
    <a href="" class="wa-link-plain">
      <wa-card style="height: 100%">
        <img
          slot="image"
          src="https://img.fortawesome.com/cfa83f3c/home.jpg"
          alt="Woman sitting on a couch in a bright home, wearing a thick knit sweater"
        />
        <div class="wa-stack wa-gap-xs">
          <span class="wa-heading-m">Home</span>
          <p class="wa-caption-m">Cozy up on the couch and relax in soft cotton.</p>
        </div>
      </wa-card>
    </a>
    <a href="" class="wa-link-plain">
      <wa-card style="height: 100%">
        <img
          slot="image"
          src="https://img.fortawesome.com/cfa83f3c/fitness.jpg"
          alt="Athlete training in fitted active wear tee and shorts"
        />
        <div class="wa-stack wa-gap-xs">
          <span class="wa-heading-m">Active</span>
          <p class="wa-caption-m">Get fit in style with breathable poly blends.</p>
        </div>
      </wa-card>
    </a>
  </div>
</div>
```

## Square Image Grid

```html {.example}
<div class="wa-stack wa-gap-2xl">
  <div class="wa-stack wa-gap-xs wa-align-items-center">
    <h2 class="wa-heading-xl">New Arrivals</h2>
    <p class="wa-caption-l">Explore brand new furniture to accentuate your home aesthetic &mdash; just for you.</p>
  </div>
<div class="wa-grid">
  <div class="wa-stack">
    <div class="wa-frame wa-border-radius-m">
      <img
        src="https://uploads.webawesome.com/indoor-furniture.jpg"
        alt="Sunny room with a mid-century modern couch, accent chair, and elegant lamp"
      />
    </div>
    <wa-button appearance="outlined">View Indoor Furniture</wa-button>
  </div>
  <div class="wa-stack">
    <div class="wa-frame wa-border-radius-m">
      <img
        src="https://uploads.webawesome.com/outdoor-furniture.jpg"
        alt="Covered patio with rustic wooden cabinets, writing desk, and stool"
      />
    </div>
    <wa-button appearance="outlined">View Outdoor Furniture</wa-button>
  </div>
</div>
</div>
```