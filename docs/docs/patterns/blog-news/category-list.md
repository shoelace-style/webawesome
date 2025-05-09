---
title: Category List
description: 'Broad Topics used to organize and structure content'
parent: blog-news
tags: blog-news
---
## Card
```html {.example}
<div class="wa-stack wa-gap-2xl wa-align-items-center">
  <h2 class="wa-heading-2xl">Discover the Latest in...</h2>
  <div>
    <div class="wa-split">
      <span class="wa-heading-l">Customer Service</span>
      <a class="wa-cluster wa-gap-2xs" href="#"><span>View More Posts</span> <wa-icon name="arrow-right"></wa-icon></a>
    </div>
    <wa-divider></wa-divider>
    <div class="wa-grid">
    <wa-card with-image>
      <img slot="image" src="https://images.unsplash.com/photo-1560264357-8d9202250f21?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Customer service reps" />
      <div class="wa-stack wa-gap-xs">
        <span class="wa-caption-l">Articles</span>
        <span class="wa-heading-m">Creating Memorable Customer Moments: The Secret Sauce to Loyalty</span>
      </div>
    </wa-card>
    <wa-card with-image>
      <img slot="image" src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="picture" />
      <div class="wa-stack wa-gap-xs">
        <span class="wa-caption-l">Software & Systems</span>
        <span class="wa-heading-m">Crafting a Seamless Customer Journey</span>
      </div>
    </wa-card>
    <wa-card with-image>
      <img slot="image" src="https://images.unsplash.com/photo-1561323587-7464f7689886?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="picture" />
      <div class="wa-stack wa-gap-xs">
        <span class="wa-caption-l">Engagement</span>
        <span class="wa-heading-m">Customer Delight vs. Satisfaction: What’s the Real Goal?</span>
      </div>
    </wa-card>
  </div>
  </div>
  
  <div>
    <div class="wa-split">
      <span class="wa-heading-l">Growth & Culture</span>
      <a class="wa-cluster wa-gap-2xs" href="#"><span>View More Post</span> <wa-icon name="arrow-right"></wa-icon></a>
    </div>
    <wa-divider></wa-divider>
    <div class="wa-grid">
    <wa-card with-image>
      <img slot="image" src="https://images.unsplash.com/photo-1493599124325-e628361046af?q=80&w=4470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="picture" />
      <div class="wa-stack wa-gap-xs">
        <span class="wa-caption-l">Hiring & Culture</span>
        <span class="wa-heading-m">Scaling with Soul: How to Grow Without Losing Your Culture</span>
      </div>
    </wa-card>
    <wa-card with-image>
      <img slot="image" src="https://images.unsplash.com/photo-1466629437334-b4f6603563c5?q=80&w=4478&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="picture" />
      <div class="wa-stack wa-gap-xs">
        <span class="wa-caption-l">Articles</span>
        <span class="wa-heading-m">Culture Is Your Growth Engine: Why Values Drive Performance</span>
      </div>
    </wa-card>
    <wa-card with-image>
      <img slot="image" src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=4469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="picture" />
      <div class="wa-stack wa-gap-xs">
        <span class="wa-caption-l">Behind the Scenes</span>
        <span class="wa-heading-m">From Start-Up to Standout: Building a Culture That Attracts Top Talent</span>
      </div>
    </wa-card>
  </div>
  </div>
</div>
```

## Links with Background Images
```html {.example}
<div class="wa-stack wa-align">
  <h2 class="wa-heading-2xl">Recipes</h2>
  <div class="wa-grid">
    <a href="#" class="wa-border-radius-m wa-plain wa-stack wa-align-items-center wa-heading-xl" style="padding: var(--wa-space-3xl);--wa-link-decoration-default: none;color: white;background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1548340748-6d2b7d7da280?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');background-size: cover;background-position: center; text-align: center;">
    Appetizers and Snacks
    </a>
    <a href="#" class="wa-border-radius-m wa-plain wa-stack wa-align-items-center wa-heading-xl" style="padding: var(--wa-space-3xl);--wa-link-decoration-default: none;color: white;background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1644704265419-96ddaf628e71?q=80&w=5340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');background-size: cover;background-position: center; text-align: center">
      Main Dishes
    </a>
    <a href="#" class="wa-border-radius-m wa-plain wa-stack wa-align-items-center wa-heading-xl" style="padding: var(--wa-space-3xl);--wa-link-decoration-default: none; color: white;background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=3200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');background-size: cover;background-position: center; text-align: center;">
      Desserts
    </a>
  </div>
  <wa-button>View More Recipes</wa-button>
</div>
```

## Category List 1
```html {.example}
<div class="wa-stack">
  <div class="wa-stack wa-gap-2xs">
    <span class="wa-caption-m">Category</span>
    <h2 class="wa-heading-2xl">Web Design</h2>
    <div class="wa-stack wa-gap-s">
      <span class="wa-caption-m">Related Categories</span>
      <div class="wa-cluster wa-gap-3xs">
        <wa-tag size="small">UI</wa-tag>
        <wa-tag size="small">Design Patterns</wa-tag>
        <wa-tag size="small">Best Practices</wa-tag>
      </div>
      <div>
        <span class="wa-caption-l">400 articles</span>
        <wa-divider></wa-divider>
      </div>
    </div>
  </div>
  <article>
    <div class="wa-flank">
      <div class="wa-frame wa-border-radius-m">
        <img src="https://images.unsplash.com/photo-1709651669999-57741c9bf085?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style="max-width: 120px" />
      </div>
      <div class="wa-stack wa-gap-xs">
        <h1 class="wa-heading-m">What Does It Really Mean For A Site To Be Keyboard Navigable</h1>
        <p>
          <strong>
            <wa-format-date month="long" day="numeric" year="numeric" date="2020-07-15T09:17:00-04:00"></wa-format-date>
          </strong>
             - Keyboard navigation is a vital aspect of accessible web design, and a detail-oriented approach is crucial. Prioritizing keyboard navigation prioritizes the user experience for a diverse audience, extending your reach while simultaneously fostering a more inclusive web environment.</p>
      </div>
    </div>
    <wa-divider></wa-divider>
  </article>
  
</div>
```