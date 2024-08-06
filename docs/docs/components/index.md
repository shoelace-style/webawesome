---
title: Components
description: Browse the library of customizable, framework-friendly web components included in Web Awesome.
layout: page-outline
---

<style>
  wa-page > main {
    max-width: 120ch;
    margin-inline: auto;
  }
  .index-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
    gap: var(--wa-space-2xl);
  }
  .index-category {
    grid-column: 1 / -1;
    margin-bottom: 0;
    margin-top: var(--wa-space-2xl);
  }
  .index-grid a {
    border-radius: var(--wa-border-radius-m);
  }
  .index-grid wa-card {
    --box-shadow: none;
    --spacing: var(--wa-space-m);
    width: 100%;
  }
  .index-grid wa-card:hover {
    --border-color: var(--wa-color-brand-border-loud);
    --box-shadow: 0 0 0 var(--wa-border-width-s) var(--border-color);
    & .component-name {
      color: var(--wa-color-brand-on-quiet);
    }
  }
  .index-grid wa-card [slot='header'] {
    display: flex;
  }
  .index-grid wa-card::part(header) {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-bottom: none;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(6rem + var(--spacing));
  }
  wa-card#drawer-card::part(header) {
    --spacing: 0;
    justify-content: flex-end;
    overflow: hidden;
  }
  wa-card .component-name {
    font-size: var(--wa-font-size-s);
    font-weight: var(--wa-font-weight-action);
  }
</style>

<p style="max-width: 80ch">Components are the essential building blocks to create intuitive, cohesive experiences. Browse the library of customizable, framework-friendly web components included in Web Awesome.</p>

<div class="index-grid">
  <h2 class="index-category">Actions</h2>
  <a href="/docs/components/button">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/button.njk" %}
      </div>
      <span class="component-name">Button</span>
    </wa-card>
  </a>
  <a href="/docs/components/button-group">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/button-group.njk" %}
      </div>
      <span class="component-name">Button Group</span>
    </wa-card>
  </a>
  <a href="/docs/components/copy-button">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/copy-button.njk" %}
      </div>
      <span class="component-name">Copy Button</span>
    </wa-card>
  </a>
  <a href="/docs/components/dropdown">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/dropdown.njk" %}
      </div>
      <span class="component-name">Dropdown</span>
    </wa-card>
  </a>
  <a href="/docs/components/icon-button">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/icon-button.njk" %}
      </div>
      <span class="component-name">Icon Button</span>
    </wa-card>
  </a>
  <a href="/docs/components/menu">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/menu.njk" %}
      </div>
      <span class="component-name">Menu</span>
    </wa-card>
  </a>
  <a href="/docs/components/qr-code">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/qr-code.njk" %}
      </div>
      <span class="component-name">QR Code</span>
    </wa-card>
  </a>

  <h2 class="index-category" style="grid-column: 1 / -1">Feedback and Status</h2>
  <a href="/docs/components/badge">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/badge.njk" %}
      </div>
      <span class="component-name">Badge</span>
    </wa-card>
  </a>
  <a href="/docs/components/callout">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/callout.njk" %}
      </div>
      <span class="component-name">Callout</span>
    </wa-card>
  </a>
  <a href="/docs/components/progress-bar">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/progress-bar.njk" %}
      </div>
      <span class="component-name">Progress Bar</span>
    </wa-card>
  </a>
  <a href="/docs/components/progress-ring">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/progress-ring.njk" %}
      </div>
      <span class="component-name">Progress Ring</span>
    </wa-card>
  </a>
  <a href="/docs/components/skeleton">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/skeleton.njk" %}
      </div>
      <span class="component-name">Skeleton</span>
    </wa-card>
  </a>
  <a href="/docs/components/spinner">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/spinner.njk" %}
      </div>
      <span class="component-name">Spinner</span>
    </wa-card>
  </a>
  <a href="/docs/components/tag">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/tag.njk" %}
      </div>
      <span class="component-name">Tag</span>
    </wa-card>
  </a>
  <a href="/docs/components/tooltip">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/tooltip.njk" %}
      </div>
      <span class="component-name">Tooltip</span>
    </wa-card>
  </a>

  <h2 class="index-category">Imagery</h2>
  <a href="/docs/components/animated-image">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/animated-image.njk" %}
      </div>
      <span class="component-name">Animated Image</span>
    </wa-card>
  </a>
  <a href="/docs/components/avatar">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/avatar.njk" %}
      </div>
      <span class="component-name">Avatar</span>
    </wa-card>
  </a>
  <a href="/docs/components/carousel">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/carousel.njk" %}
      </div>
      <span class="component-name">Carousel</span>
    </wa-card>
  </a>
  <a href="/docs/components/icon">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/icon.njk" %}
      </div>
      <span class="component-name">Icon</span>
    </wa-card>
  </a>
  <a href="/docs/components/image-comparer">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/image-comparer.njk" %}
      </div>
      <span class="component-name">Image Comparer</span>
    </wa-card>
  </a>

  <h2 class="index-category">Inputs</h2>
  <a href="/docs/components/checkbox">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/checkbox.njk" %}
      </div>
      <span class="component-name">Checkbox</span>
    </wa-card>
  </a>
  <a href="/docs/components/color-picker">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/color-picker.njk" %}
      </div>
      <span class="component-name">Color Picker</span>
    </wa-card>
  </a>
  <a href="/docs/components/input">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/input.njk" %}
      </div>
      <span class="component-name">Input</span>
    </wa-card>
  </a>
  <a href="/docs/components/radio-group">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/radio-group.njk" %}
      </div>
      <span class="component-name">Radio Group</span>
    </wa-card>
  </a>
  <a href="/docs/components/range">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/range.njk" %}
      </div>
      <span class="component-name">Range</span>
    </wa-card>
  </a>
  <a href="/docs/components/rating">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/rating.njk" %}
      </div>
      <span class="component-name">Rating</span>
    </wa-card>
  </a>
  <a href="/docs/components/select">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/select.njk" %}
      </div>
      <span class="component-name">Select</span>
    </wa-card>
  </a>
  <a href="/docs/components/switch">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/switch.njk" %}
      </div>
      <span class="component-name">Switch</span>
    </wa-card>
  </a>
  <a href="/docs/components/textarea">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/textarea.njk" %}
      </div>
      <span class="component-name">Textarea</span>
    </wa-card>
  </a>

  <h2 class="index-category">Navigation</h2>
  <a href="/docs/components/breadcrumb">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/breadcrumb.njk" %}
      </div>
      <span class="component-name">Breadcrumb</span>
    </wa-card>
  </a>
  <a href="/docs/components/tab-group">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/tab-group.njk" %}
      </div>
      <span class="component-name">Tab Group</span>
    </wa-card>
  </a>
  <a href="/docs/components/tree">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/tree.njk" %}
      </div>
      <span class="component-name">Tree</span>
    </wa-card>
  </a>

  <h2 class="index-category">Organization</h2>
  <a href="/docs/components/card">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/card.njk" %}
      </div>
      <span class="component-name">Card</span>
    </wa-card>
  </a>
  <a href="/docs/components/details">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/details.njk" %}
      </div>
      <span class="component-name">Details</span>
    </wa-card>
  </a>
  <a href="/docs/components/dialog">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/dialog.njk" %}
      </div>
      <span class="component-name">Dialog</span>
    </wa-card>
  </a>
  <a href="/docs/components/divider">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/divider.njk" %}
      </div>
      <span class="component-name">Divider</span>
    </wa-card>
  </a>
  <a href="/docs/components/drawer">
    <wa-card id="drawer-card">
      <div slot="header">
        {% include "svgs/drawer.njk" %}
      </div>
      <span class="component-name">Drawer</span>
    </wa-card>
  </a>
  <a href="/docs/components/split-panel">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/split-panel.njk" %}
      </div>
      <span class="component-name">Split Panel</span>
    </wa-card>
  </a>

  <h2 class="index-category">Utilities</h2>
  <a href="/docs/components/animation">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/animation.njk" %}
      </div>
      <span class="component-name">Animation</span>
    </wa-card>
  </a>
  <a href="/docs/components/format-bytes">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/format-bytes.njk" %}
      </div>
      <span class="component-name">Format Bytes</span>
    </wa-card>
  </a>
  <a href="/docs/components/format-date">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/format-date.njk" %}
      </div>
      <span class="component-name">Format Date</span>
    </wa-card>
  </a>
  <a href="/docs/components/format-number">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/format-number.njk" %}
      </div>
      <span class="component-name">Format Number</span>
    </wa-card>
  </a>
    <a href="/docs/components/include">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/include.njk" %}
      </div>
      <span class="component-name">Include</span>
    </wa-card>
  </a>
  <a href="/docs/components/mutation-observer">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/mutation-observer.njk" %}
      </div>
      <span class="component-name">Mutation Observer</span>
    </wa-card>
  </a>
  <a href="/docs/components/popup">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/popup.njk" %}
      </div>
      <span class="component-name">Popup</span>
    </wa-card>
  </a>
  <a href="/docs/components/relative-time">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/relative-time.njk" %}
      </div>
      <span class="component-name">Relative Time</span>
    </wa-card>
  </a>
  <a href="/docs/components/resize-observer">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/resize-observer.njk" %}
      </div>
      <span class="component-name">Resize Observer</span>
    </wa-card>
  </a>
  <a href="/docs/components/visually-hidden">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/visually-hidden.njk" %}
      </div>
      <span class="component-name">Visually Hidden</span>
    </wa-card>
  </a>
</div>