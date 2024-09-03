---
title: Layout
description: Browse the library of customizable, framework-friendly web components included in Web Awesome.
layout: page-outline
---

<style>
  wa-page > main {
    max-width: 120ch;
    margin-inline: auto;
  }
  .index-category {
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
  .index-grid wa-card::part(header) {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-bottom: none;
  }
  wa-card .component-name {
    font-size: var(--wa-font-size-s);
    font-weight: var(--wa-font-weight-action);
  }
</style>

<p style="max-width: 80ch">Layout components and utility classes help you organize content that can adapt to any device or screen size. Browse the collection of responsive layout tools included in Web Awesome Pro.</p>

<div class="index-grid wa-grid:gap-2xl">
  <h2 class="index-category wa-span-grid">CSS Classes</h2>
  <a href="/docs/layout/cluster">
    <wa-card with-header>
      <div slot="header" class="wa-frame:landscape">
        {% include "svgs/layout/cluster.njk" %}
      </div>
      <span class="component-name">Cluster</span>
    </wa-card>
  </a>
  <a href="/docs/layout/flank">
    <wa-card with-header>
      <div slot="header" class="wa-frame:landscape">
        {% include "svgs/layout/flank.njk" %}
      </div>
      <span class="component-name">Flank</span>
    </wa-card>
  </a>
  <a href="/docs/layout/frame">
    <wa-card with-header>
      <div slot="header" class="wa-frame:landscape">
        {% include "svgs/layout/frame.njk" %}
      </div>
      <span class="component-name">Frame</span>
    </wa-card>
  </a>
  <a href="/docs/layout/grid">
    <wa-card with-header>
      <div slot="header" class="wa-frame:landscape">
        {% include "svgs/layout/grid.njk" %}
      </div>
      <span class="component-name">Grid</span>
    </wa-card>
  </a>
  <a href="/docs/layout/split">
    <wa-card with-header>
      <div slot="header" class="wa-frame:landscape">
        {% include "svgs/layout/split.njk" %}
      </div>
      <span class="component-name">Split</span>
    </wa-card>
  </a>
  <a href="/docs/layout/stack">
    <wa-card with-header>
      <div slot="header" class="wa-frame:landscape">
        {% include "svgs/layout/stack.njk" %}
      </div>
      <span class="component-name">Stack</span>
    </wa-card>
  </a>
</div>