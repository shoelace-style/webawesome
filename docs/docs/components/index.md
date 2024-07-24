---
title: Components
description: Web Awesome recognizes the need for all users to have undeterred access to the websites and applications that are created with it.
layout: page
---

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
    gap: 1rem;
  }
  .grid wa-card {
    --box-shadow: none;
    --spacing: var(--wa-space-l);
    width: 100%;
  }
  .grid wa-card::part(header) {
    background-color: var(--wa-color-neutral-fill-quiet);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(4rem + var(--spacing));
  }
  .grid wa-card [slot='header'] img {
    display: block;
  }
  .component-name {
    font-size: var(--wa-font-size-s);
    font-weight: var(--wa-font-weight-action);
  }
</style>

Browse the entire library of standards-based, framework-friendly web components included in Web Awesome.

<div class="grid">
  <a href="/docs/components/animated-image">
    <wa-card with-header>
      <div slot="header">
        <img src="/assets/images/components/animated-image.svg">
      </div>
      <span class="component-name">Animated Image</span>
    </wa-card>
  </a>
  <a href="/docs/components/animation">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/animation.svg">
      </div>
      <span class="component-name">Animation</span>
    </wa-card>
  </a>
  <a href="/docs/components/avatar">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/avatar.svg">
      </div>
      <span class="component-name">Avatar</span>
    </wa-card>
  </a>
  <a href="/docs/components/badge">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/badge.svg">
      </div>
      <span class="component-name">Badge</span>
    </wa-card>
  </a>
  <a href="/docs/components/breadcrumb">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/breadcrumb.svg">
      </div>
      <span class="component-name">Breadcrumb</span>
    </wa-card>
  </a>
  <a href="/docs/components/button">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/button.svg">
      </div>
      <span class="component-name">Button</span>
    </wa-card>
  </a>
  <a href="/docs/components/button-group">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/button-group.svg">
      </div>
      <span class="component-name">Button Group</span>
    </wa-card>
  </a>
  <a href="/docs/components/callout">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/callout.svg">
      </div>
      <span class="component-name">Callout</span>
    </wa-card>
  </a>
  <a href="/docs/components/card">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/card.svg">
      </div>
      <span class="component-name">Card</span>
    </wa-card>
  </a>
  <a href="/docs/components/carousel">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/carousel.svg">
      </div>
      <span class="component-name">Carousel</span>
    </wa-card>
  </a>
</div>