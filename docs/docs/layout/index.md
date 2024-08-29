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
  <h2 class="index-category">Implicit Sizing</h2>
  <a href="/docs/layout/cluster">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/layout/cluster.njk" %}
      </div>
      <span class="component-name">Cluster</span>
    </wa-card>
  </a>
  <a href="/docs/layout/flank">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/layout/flank.njk" %}
      </div>
      <span class="component-name">Flank</span>
    </wa-card>
  </a>
  <a href="/docs/layout/frame">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/layout/frame.njk" %}
      </div>
      <span class="component-name">Frame</span>
    </wa-card>
  </a>
  <a href="/docs/layout/grid">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/layout/grid.njk" %}
      </div>
      <span class="component-name">Grid</span>
    </wa-card>
  </a>
  <a href="/docs/layout/split">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/layout/split.njk" %}
      </div>
      <span class="component-name">Split</span>
    </wa-card>
  </a>
  <a href="/docs/layout/stack">
    <wa-card with-header>
      <div slot="header">
        {% include "svgs/layout/stack.njk" %}
      </div>
      <span class="component-name">Stack</span>
    </wa-card>
  </a>
</div>