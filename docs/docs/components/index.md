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
  <a href="/docs/components/include">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/include.svg">
      </div>
      <span class="component-name">Include</span>
    </wa-card>
  </a>
  <a href="/docs/components/input">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/input.svg">
      </div>
      <span class="component-name">Input</span>
    </wa-card>
  </a>
  <a href="/docs/components/menu">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/menu.svg">
      </div>
      <span class="component-name">Menu</span>
    </wa-card>
  </a>
  <a href="/docs/components/mutation-observer">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/mutation-observer.svg">
      </div>
      <span class="component-name">Mutation Observer</span>
    </wa-card>
  </a>
  <a href="/docs/components/popup">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/popup.svg">
      </div>
      <span class="component-name">Popup</span>
    </wa-card>
  </a>
  <a href="/docs/components/progress-bar">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/progress-bar.svg">
      </div>
      <span class="component-name">Progress Bar</span>
    </wa-card>
  </a>
  <a href="/docs/components/progress-ring">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/progress-ring.svg">
      </div>
      <span class="component-name">Progress Ring</span>
    </wa-card>
  </a>
  <a href="/docs/components/qr-code">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/qr-code.svg">
      </div>
      <span class="component-name">QR Code</span>
    </wa-card>
  </a>
  <a href="/docs/components/radio-group">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/radio-group.svg">
      </div>
      <span class="component-name">Radio Group</span>
    </wa-card>
  </a>
  <a href="/docs/components/range">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/range.svg">
      </div>
      <span class="component-name">Range</span>
    </wa-card>
  </a>
  <a href="/docs/components/rating">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/rating.svg">
      </div>
      <span class="component-name">Rating</span>
    </wa-card>
  </a>
  <a href="/docs/components/relative-time">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/relative-time.svg">
      </div>
      <span class="component-name">Relative Time</span>
    </wa-card>
  </a>
  <a href="/docs/components/resize-observer">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/resize-observer.svg">
      </div>
      <span class="component-name">Resize Observer</span>
    </wa-card>
  </a>
  <a href="/docs/components/select">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/select.svg">
      </div>
      <span class="component-name">Select</span>
    </wa-card>
  </a>
  <a href="/docs/components/skeleton">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/skeleton.svg">
      </div>
      <span class="component-name">Skeleton</span>
    </wa-card>
  </a>
  <a href="/docs/components/spinner">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/spinner.svg">
      </div>
      <span class="component-name">Spinner</span>
    </wa-card>
  </a>
  <a href="/docs/components/split-panel">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/split-panel.svg">
      </div>
      <span class="component-name">Split Panel</span>
    </wa-card>
  </a>
  <a href="/docs/components/switch">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/switch.svg">
      </div>
      <span class="component-name">Switch</span>
    </wa-card>
  </a>
  <a href="/docs/components/tab-group">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/tab-group.svg">
      </div>
      <span class="component-name">Tab Group</span>
    </wa-card>
  </a>
  <a href="/docs/components/tag">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/tag.svg">
      </div>
      <span class="component-name">Tag</span>
    </wa-card>
  </a>
  <a href="/docs/components/textarea">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/textarea.svg">
      </div>
      <span class="component-name">Textarea</span>
    </wa-card>
  </a>
  <a href="/docs/components/tooltip">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/tooltip.svg">
      </div>
      <span class="component-name">Tooltip</span>
    </wa-card>
  </a>
  <a href="/docs/components/tree">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/tree.svg">
      </div>
      <span class="component-name">Tree</span>
    </wa-card>
  </a>
  <a href="/docs/components/visually-hidden">
    <wa-card>
      <div slot="header">
        <img src="/assets/images/components/visually-hidden.svg">
      </div>
      <span class="component-name">Visually Hidden</span>
    </wa-card>
  </a>
</div>