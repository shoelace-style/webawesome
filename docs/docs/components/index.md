---
title: Components
description: Web Awesome recognizes the need for all users to have undeterred access to the websites and applications that are created with it.
layout: page
---

<style>
  wa-page > main {
    max-width: 120ch;
    padding: var(--wa-space-xl);
    margin-inline: auto;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
    gap: 2rem;
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
  <a href="/docs/components/checkbox">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/checkbox.svg">
      </div>
      <span class="component-name">Checkbox</span>
    </wa-card>
  </a>
  <a href="/docs/components/color-picker">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/color-picker.svg">
      </div>
      <span class="component-name">Color Picker</span>
    </wa-card>
  </a>
  <a href="/docs/components/copy-button">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/copy-button.svg">
      </div>
      <span class="component-name">Copy Button</span>
    </wa-card>
  </a>
  <a href="/docs/components/details">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/details.svg">
      </div>
      <span class="component-name">Details</span>
    </wa-card>
  </a>
  <a href="/docs/components/dialog">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/dialog.svg">
      </div>
      <span class="component-name">Dialog</span>
    </wa-card>
  </a>
  <a href="/docs/components/divider">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/divider.svg">
      </div>
      <span class="component-name">Divider</span>
    </wa-card>
  </a>
  <a href="/docs/components/drawer">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/drawer.svg">
      </div>
      <span class="component-name">Drawer</span>
    </wa-card>
  </a>
  <a href="/docs/components/dropdown">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/dropdown.svg">
      </div>
      <span class="component-name">Dropdown</span>
    </wa-card>
  </a>
  <a href="/docs/components/format-bytes">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/format-bytes.svg">
      </div>
      <span class="component-name">Format Bytes</span>
    </wa-card>
  </a>
  <a href="/docs/components/format-date">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/format-date.svg">
      </div>
      <span class="component-name">Format Date</span>
    </wa-card>
  </a>
  <a href="/docs/components/format-number">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/format-number.svg">
      </div>
      <span class="component-name">Format Number</span>
    </wa-card>
  </a>
  <a href="/docs/components/icon">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/icon.svg">
      </div>
      <span class="component-name">Icon</span>
    </wa-card>
  </a>
  <a href="/docs/components/icon-button">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/icon-button.svg">
      </div>
      <span class="component-name">Icon Button</span>
    </wa-card>
  </a>
  <a href="/docs/components/image-comparer">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/image-comparer.svg">
      </div>
      <span class="component-name">Image Comparer</span>
    </wa-card>
  </a>
</div>