---
title: Grid
description: 'Use the `wa-grid` class to arrange elements into rows and columns that automatically adapt to the available space.'
layout: docs
tags: layoutUtilities
---

<style>
  :is(.wa-flank, .wa-grid, .wa-stack) > [class*='wa-grid']:has(div:empty) {
    border: var(--layout-example-border);
    border-radius: var(--layout-example-border-radius);
    padding: var(--layout-example-padding);
  }

  [class*='wa-grid'] div:empty {
    background-color: var(--layout-example-element-background);
    border-radius: var(--layout-example-element-border-radius);
    min-block-size: 4rem;
    min-inline-size: 4rem;
  }
</style>

{{ description }}

```html {.example}
<div class="wa-grid">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
```

## Examples

Grids work especially well for card lists and content designed for browsing.

```html {.example}
<div class="wa-grid">
  <div class="wa-stack wa-gap-s">
    <div class="wa-frame wa-border-radius-l">
      <img src="https://images.unsplash.com/photo-1520763185298-1b434c919102?q=20" alt="" />
    </div>
    <h3 class="wa-heading-m">Tulip</h3>
    <em>Tulipa gesneriana</em>
  </div>
  <div class="wa-stack wa-gap-s">
    <div class="wa-frame wa-border-radius-l">
      <img src="https://images.unsplash.com/photo-1591767134492-338e62f7b5a2?q=20" alt="" />
    </div>
    <h3 class="wa-heading-m">Peony</h3>
    <em>Paeonia officinalis</em>
  </div>
  <div class="wa-stack wa-gap-s">
    <div class="wa-frame wa-border-radius-l">
      <img src="https://images.unsplash.com/photo-1590872000386-4348c6393115?q=20" alt="" />
    </div>
    <h3 class="wa-heading-m">Poppy</h3>
    <em>Papaver rhoeas</em>
  </div>
  <div class="wa-stack wa-gap-s">
    <div class="wa-frame wa-border-radius-l">
      <img src="https://images.unsplash.com/photo-1516723338795-324c7c33f700?q=20" alt="" />
    </div>
    <h3 class="wa-heading-m">Sunflower</h3>
    <em>Helianthus annuus</em>
  </div>
  <div class="wa-stack wa-gap-s">
    <div class="wa-frame wa-border-radius-l">
      <img src="https://images.unsplash.com/photo-1563601841845-74a0a8ab7c8a?q=20" alt="" />
    </div>
    <h3 class="wa-heading-m">Daisy</h3>
    <em>Bellis perennis</em>
  </div>
</div>
```

```html {.example}
<div class="wa-grid" style="--min-column-size: 30ch;">
  <wa-card>
    <div class="wa-flank">
      <wa-avatar shape="rounded">
        <wa-icon slot="icon" name="globe"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-3xs">
        <span class="wa-caption-xs">Population (Zion)</span>
        <span class="wa-cluster wa-gap-xs">
          <span class="wa-heading-2xl">251,999</span>
          <wa-badge variant="danger">-3%&nbsp;<wa-icon name="arrow-trend-down"></wa-icon></wa-badge>
        </span>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank">
      <wa-avatar shape="rounded">
        <wa-icon slot="icon" name="brain-circuit"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-3xs">
        <span class="wa-caption-xs">Minds Freed</span>
        <span class="wa-cluster wa-gap-xs">
          <span class="wa-heading-2xl">0.36%</span>
          <wa-badge variant="success">+0.03%&nbsp;<wa-icon name="arrow-trend-up"></wa-icon></wa-badge>
        </span>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank">
      <wa-avatar shape="rounded">
        <wa-icon slot="icon" name="robot"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-3xs">
        <span class="wa-caption-xs">Agents Discovered</span>
        <span class="wa-cluster wa-gap-xs">
          <span class="wa-heading-2xl">3</span>
          <wa-badge variant="neutral">±0%&nbsp;<wa-icon name="wave-triangle"></wa-icon></wa-badge>
        </span>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank">
      <wa-avatar shape="rounded">
        <wa-icon slot="icon" name="spaghetti-monster-flying"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-3xs">
        <span class="wa-caption-xs">Sentinels Controlled</span>
        <span class="wa-cluster wa-gap-xs">
          <span class="wa-heading-2xl">208</span>
          <wa-badge variant="success">+1%&nbsp;<wa-icon name="arrow-trend-up"></wa-icon></wa-badge>
        </span>
      </div>
    </div>
  </wa-card>
</div>

<style>
  wa-badge > wa-icon {
    color: color-mix(in oklab, currentColor, transparent 40%);
  }
</style>
```

## Sizing

By default, grid items will wrap when the grid's column size is less than `20ch`, but you can set a custom minimum column size using the `--min-column-size` property.

```html {.example}
<div class="wa-stack">
  <div class="wa-grid" style="--min-column-size: 200px;">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div class="wa-grid" style="--min-column-size: 6rem;">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
```

## Gap

By default, the gap between grid items uses `--wa-space-m` from your theme. You can add any of the following [`wa-gap-*`](/docs/utilities/gap) classes to an element with `wa-grid` to specify the gap between items:

- `wa-gap-0`
- `wa-gap-3xs`
- `wa-gap-2xs`
- `wa-gap-xs`
- `wa-gap-s`
- `wa-gap-m`
- `wa-gap-l`
- `wa-gap-xl`
- `wa-gap-2xl`
- `wa-gap-3xl`

```html {.example}
<div class="wa-stack">
  <div class="wa-grid wa-gap-2xs">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div class="wa-grid wa-gap-2xl">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
```

## Span Grid

You can add `wa-span-grid` to any grid item to allow it to span all grid columns. With this, the grid item occupies its own grid row.

```html {.example}
<div class="wa-grid">
  <div></div>
  <div></div>
  <div class="wa-span-grid"></div>
  <div></div>
  <div></div>
</div>
```
