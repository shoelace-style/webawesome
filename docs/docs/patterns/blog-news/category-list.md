---
title: Category List
description: 'Organize your site and allow readers to find the information they want.'
parent: blog-news
icon: category-list
tags: blog-news
---

## Grid

```html {.example}
<div class="wa-stack wa-gap-2xl wa-align-items-center">
  <h2 class="wa-heading-2xl">Discover the Latest in...</h2>
  <div>
    <div class="wa-split">
      <h3 class="wa-heading-l">Customer Service</h3>
      <a class="wa-cluster wa-gap-2xs" href="#"><span>View More</span> <wa-icon name="arrow-right"></wa-icon></a>
    </div>
    <wa-divider></wa-divider>
    <div class="wa-grid">
      <a href="#">
        <wa-card with-image style="height: 100%">
          <img
            slot="media"
            src="https://images.unsplash.com/photo-1560264357-8d9202250f21?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Group of customer service reps working on computers in a shared office space"
          />
          <div class="wa-stack wa-gap-xs">
            <span class="wa-caption-l">Articles</span>
            <span class="wa-heading-m">Creating Memorable Customer Moments: The Secret Sauce to Loyalty</span>
          </div>
        </wa-card>
      </a>
      <a href="#">
        <wa-card with-image style="height: 100%">
          <img
            slot="media"
            src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="A hand pinching a pin on string, making connections between data on a corkboard"
          />
          <div class="wa-stack wa-gap-xs">
            <span class="wa-caption-l">Software & Systems</span>
            <span class="wa-heading-m">Crafting a Seamless Customer Journey</span>
          </div>
        </wa-card>
      </a>
      <a href="#">
        <wa-card with-image style="height: 100%">
          <img
            slot="media"
            src="https://images.unsplash.com/photo-1561323587-7464f7689886?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="A chess board with all pieces in starting position"
          />
          <div class="wa-stack wa-gap-xs">
            <span class="wa-caption-l">Engagement</span>
            <span class="wa-heading-m">Customer Delight vs. Satisfaction: What’s the Real Goal?</span>
          </div>
        </wa-card>
      </a>
    </div>
  </div>
  <div>
    <div class="wa-split">
      <h3 class="wa-heading-l">Growth & Culture</h3>
      <a class="wa-cluster wa-gap-2xs" href="#"><span>View More</span> <wa-icon name="arrow-right"></wa-icon></a>
    </div>
    <wa-divider></wa-divider>
    <div class="wa-grid">
      <a href="#">
        <wa-card with-image style="height: 100%">
          <img
            slot="media"
            src="https://images.unsplash.com/photo-1493599124325-e628361046af?q=80&w=4470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Viewpoint from the middle of a forest, looking upwards towards the canopy of towering evergreen"
          />
          <div class="wa-stack wa-gap-xs">
            <span class="wa-caption-l">Hiring & Culture</span>
            <span class="wa-heading-m">Scaling with Soul: How to Grow Without Losing Your Culture</span>
          </div>
        </wa-card>
      </a>
      <a href="#">
        <wa-card with-image style="height: 100%">
          <img
            slot="media"
            src="https://images.unsplash.com/photo-1466629437334-b4f6603563c5?q=80&w=4478&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Sunset over a vast grassy field with many prominent wind turbines"
          />
          <div class="wa-stack wa-gap-xs">
            <span class="wa-caption-l">Articles</span>
            <span class="wa-heading-m">Culture Is Your Growth Engine: Why Values Drive Performance</span>
          </div>
        </wa-card>
      </a>
      <a href="#">
        <wa-card with-image style="height: 100%">
          <img
            slot="media"
            src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=4469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Viewpoint of two people side-by-side looking down towards their shoes, PASSION LED US HERE written on the sidewalk"
          />
          <div class="wa-stack wa-gap-xs">
            <span class="wa-caption-l">Behind the Scenes</span>
            <span class="wa-heading-m">From Start-Up to Standout: Building a Culture That Attracts Top Talent</span>
          </div>
        </wa-card>
      </a>
    </div>
  </div>
</div>
```

## Links with Background Images

```html {.example}
<div class="wa-stack wa-align">
  <h2 class="wa-heading-2xl">Recipes</h2>
  <div class="wa-grid">
    <a
      href="#"
      class="wa-frame wa-align-items-center wa-border-radius-m wa-link-plain wa-heading-xl wa-dark"
      style="padding: var(--wa-space-3xl);background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1548340748-6d2b7d7da280?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');background-size: cover;background-position: center; text-align: center;"
    >
      Appetizers and Snacks
    </a>
    <a
      href="#"
      class="wa-frame wa-align-items-center wa-border-radius-m wa-link-plain wa-heading-xl wa-dark"
      style="padding: var(--wa-space-3xl);background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1644704265419-96ddaf628e71?q=80&w=5340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');background-size: cover;background-position: center; text-align: center"
    >
      Main Dishes
    </a>
    <a
      href="#"
      class="wa-frame wa-align-items-center wa-border-radius-m wa-link-plain wa-heading-xl wa-dark"
      style="padding: var(--wa-space-3xl);background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=3200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');background-size: cover;background-position: center; text-align: center;"
    >
      Desserts
    </a>
  </div>
  <wa-button appearance="plain"><wa-icon slot="suffix" name="arrow-right"></wa-icon>View More Recipes</wa-button>
</div>
```
