---
title: Post List
description: 'Organize and showcase content in a way that helps users discover, browse, and engage with articles.'
parent: blog-news
tags: blog-news
---

## Text Based

```html {.example}
<div class="wa-stack wa-gap-2xl" style="max-width: 60ch; margin: 0 auto;">
  <div class="wa-split">
    <h2 class="wa-heading-l">Trending Articles</h2>
    <span class="wa-cluster">
      <wa-icon name="search"></wa-icon>
      <a href="#" class="wa-link-plain">See all</a>
    </span>
  </div>
  <article class="wa-stack wa-gap-s">
    <section class="wa-stack wa-gap-xs">
      <h3 class="wa-heading-m"><a href="#" class="wa-link-plain">Worst Idioms</a></h3>
      <span class="wa-caption-m">by <strong><em><a href="#">Paisley Darts</a></em></strong> • 4 min</span>
    </section>
    <p>"You can't have your cake and eat it too"... This one needs to be buried in a shallow grave.</p>
    <a href="#" class="wa-cluster wa-gap-2xs"><span>Read More</span><wa-icon name="angle-right"></wa-icon></a>
    <wa-divider></wa-divider>
  </article>
  <article class="wa-stack wa-gap-s">
    <section class="wa-stack wa-gap-xs">
      <h3 class="wa-heading-m">
        <a href="#" class="wa-link-plain">Boost Your Productivity with These 5 Simple Habits</a>
      </h3>
      <span class="wa-caption-m">by <strong><em><a href="#">Michael Sur</a></em></strong> • 3 min</span>
    </section>
    <p>Small changes, big results—master the art of productivity in your daily routine.</p>
    <a href="#" class="wa-cluster wa-gap-2xs"><span>Read More</span><wa-icon name="angle-right"></wa-icon></a>
    <wa-divider></wa-divider>
  </article>
  <article class="wa-stack wa-gap-s">
    <section class="wa-stack wa-gap-xs">
      <h3 class="wa-heading-m">
        <a href="#" class="wa-link-plain">Why Sustainable Fashion is the Future of the Industry</a>
      </h3>
      <span class="wa-caption-m">by <strong><em><a href="#">Stacy Magnolia</a></em></strong> • 7 min</span>
    </section>
    <p>From eco-friendly materials to ethical brands, sustainability is shaping the way we dress.</p>
    <a href="#" class="wa-cluster wa-gap-2xs"><span>Read More</span><wa-icon name="angle-right"></wa-icon></a>
    <wa-divider></wa-divider>
  </article>
</div>
```

## Single Column with Images

```html {.example}
<div class="wa-stack" style="max-width: 78ch; margin: 0 auto;">
  <div class="wa-split">
    <h2 class="wa-heading-l">Trending Articles</h2>
    <span class="wa-cluster">
      <wa-icon name="search"></wa-icon>
      <a href="#" class="wa-link-plain">See all</a>
    </span>
  </div>
  <div class="wa-stack">
    <article class="wa-flank:end wa-align-items-center">
      <div class="wa-stack wa-gap-s wa-align-items-start">
        <h3 class="wa-heading-m"><a href="#" class="wa-link-plain">Worst Idioms <span class="wa-caption-s">4 min</span></a></h3>
        <div class="wa-stack wa-gap-2xs">
          <p class="wa-caption-l">
            "You can't have your cake and eat it too"... This one needs to be buried in a shallow grave.
          </p>
          <span class="wa-caption-m">by<a href="#"><strong><em> Paisley Darts</em></strong></a></span>
        </div>
        <wa-tag size="small" appearance="filled">Opinion</wa-tag>
      </div>
      <div class="wa-frame wa-border-radius-m" style="width: 10ch;">
        <img
          src="https://images.unsplash.com/photo-1720170060678-7c30a36937cd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </article>
    <wa-divider></wa-divider>
    <article class="wa-flank:end wa-align-items-center">
      <div class="wa-stack wa-gap-s wa-align-items-start">
        <h3 class="wa-heading-m">
          <a href="#" class="wa-link-plain">Boost Your Productivity with These 5 Simple Habits <span class="wa-caption-s">3 min</span></a>
        </h3>
        <div class="wa-stack wa-gap-2xs">
          <p class="wa-caption-l">"Small changes, big results—master the art of productivity in your daily routine.</p>
          <span class="wa-caption-m">by<a href="#"><strong><em> Michael Sur</em></strong></a></span>
        </div>
        <div class="wa-cluster">
          <wa-tag size="small" appearance="filled">Self Improvement</wa-tag>
        </div>
      </div>
      <div class="wa-frame wa-border-radius-m" style="width: 10ch;">
        <img
          src="https://images.unsplash.com/photo-1507099985932-87a4520ed1d5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </article>
    <wa-divider></wa-divider>
    <article class="wa-flank:end wa-align-items-center">
      <div class="wa-stack wa-gap-s wa-align-items-start">
        <h3 class="wa-heading-m">
          <a href="#" class="wa-link-plain">Sustainable Fashion Is the Future of the Industry <span class="wa-caption-s">7 min</span></a>
        </h3>
        <div class="wa-stack wa-gap-2xs">
          <p class="wa-caption-l">
            From eco-friendly materials to ethical brands, sustainability is shaping the way we dress.
          </p>
          <span class="wa-caption-m">by<a href="#"><strong><em> Stacy Magnolia</em></strong></a></span>
        </div>
        <div class="wa-cluster wa-gap-xs">
          <wa-tag size="small" appearance="filled">Style</wa-tag
          ><wa-tag size="small" appearance="filled">Environmental</wa-tag>
        </div>
      </div>
      <div class="wa-frame wa-border-radius-m" style="width: 10ch;">
        <img
          src="https://images.unsplash.com/photo-1631775512414-160ae648c209?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </article>
    <wa-divider></wa-divider>
    <article class="wa-flank:end wa-align-items-center">
      <div class="wa-stack wa-gap-s wa-align-items-start">
        <h3 class="wa-heading-m"><a href="#" class="wa-link-plain">The Power of Mindfulness <span class="wa-caption-s">5 min</span></a></h3>
        <div class="wa-stack wa-gap-2xs">
          <p class="wa-caption-l">Discover how being present in the moment can lead to lasting mental well being.</p>
          <span class="wa-caption-m">by<a href="#"><strong><em> Desean Ivy</em></strong></a></span>
        </div>
        <div class="wa-cluster wa-gap-xs">
          <wa-tag size="small" appearance="filled">Meditation</wa-tag
          ><wa-tag size="small" appearance="filled">Self Care</wa-tag>
        </div>
      </div>
      <div class="wa-frame wa-border-radius-m" style="width: 10ch;">
        <img
          src="https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </article>
    <wa-divider></wa-divider>
  </div>
</div>
```

## With Image Card

```html {.example}
<div class="wa-stack wa-align-items-center" style="max-width: 105ch; margin: 0 auto;">
  <h2 class="wa-heading-l">Trending Articles</h2>
  <wa-input placeholder="Search Articles">
    <wa-icon name="search" slot="suffix"></wa-icon>
  </wa-input>
  <div class="wa-grid" style="--min-column-size: 40ch;">
    <a href="#" class="wa-link-plain">
      <wa-card with-image style="height: 100%">
        <img
          slot="media"
          src="https://images.unsplash.com/photo-1720170060678-7c30a36937cd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div class="wa-stack">
          <h2 class="wa-heading-m">Worst Idioms</h2>
          <p class="wa-caption-l">
            "You can't have your cake and eat it too"... This one needs to be buried in a shallow grave.
          </p>
          <div class="wa-cluster wa-gap-s">
            <wa-avatar
              image="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              label="author avatar"
            ></wa-avatar>
            <div class="wa-stack wa-gap-2xs">
              <span class="wa-heading-s">Paisley Darts</span>
              <wa-format-date class="wa-caption-s" month="long" day="numeric" date="2020-07-08T09:17:00-04:00"></wa-format-date>
            </div>
          </div>
        </div>
      </wa-card>
    </a>
    <a href="#" class="wa-link-plain">
      <wa-card with-image style="height: 100%">
        <img
          slot="media"
          src="https://images.unsplash.com/photo-1507099985932-87a4520ed1d5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div class="wa-stack">
          <h2 class="wa-heading-m">Boost Your Productivity with These 5 Simple Habits</h2>
          <p class="wa-caption-l">Small changes, big results—master the art of productivity in your daily routine.</p>
          <div class="wa-cluster wa-gap-s">
            <wa-avatar
              image="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              label="author avatar"
            ></wa-avatar>
            <div class="wa-stack wa-gap-2xs">
              <span class="wa-heading-s">Michael Sur</span>
              <wa-format-date class="wa-caption-s" month="long" day="numeric" date="2020-06-20T09:17:00-04:00"></wa-format-date>
            </div>
          </div>
        </div>
      </wa-card>
    </a>
    <a href="#" class="wa-link-plain">
      <wa-card with-image style="height: 100%">
        <img
          slot="media"
          src="https://images.unsplash.com/photo-1631775512414-160ae648c209?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div class="wa-stack">
          <h2 class="wa-heading-m">Sustainable Fashion Is the Future of the Industry</h2>
          <p class="wa-caption-l">
            From eco-friendly materials to ethical brands, sustainability is shaping the way we dress.
          </p>
          <div class="wa-cluster wa-gap-s">
            <wa-avatar
              image="https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              label="author avatar"
            ></wa-avatar>
            <div class="wa-stack wa-gap-2xs">
              <span class="wa-heading-s">Stacy Magnolia</span>
              <wa-format-date class="wa-caption-s" month="long" day="numeric" date="2020-05-03T09:17:00-04:00"></wa-format-date>
            </div>
          </div>
        </div>
      </wa-card>
    </a>
    <a href="#" class="wa-link-plain">
      <wa-card with-image style="height: 100%">
        <img
          slot="media"
          src="https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div class="wa-stack">
          <h2 class="wa-heading-m">The Power of Mindfulness</h2>
          <p class="wa-caption-l">Discover how being present in the moment can lead to lasting mental well being.</p>
          <div class="wa-cluster wa-gap-s">
            <wa-avatar
              image="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              label="author avatar"
            ></wa-avatar>
            <div class="wa-stack wa-gap-2xs">
              <span class="wa-heading-s">Desean Ivy</span>
              <wa-format-date class="wa-caption-s" month="long" day="numeric" date="2020-04-12T09:17:00-04:00"></wa-format-date>
            </div>
          </div>
        </div>
      </wa-card>
    </a>
  </div>
  <a href="#" class="wa-link-plain" style="text-align: center;">See All</a>
</div>
```
