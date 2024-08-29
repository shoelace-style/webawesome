---
title: Grid
description: Browse the library of customizable, framework-friendly web components included in Web Awesome.
layout: page-outline
---

Grid distributes elements into rows and columns that automatically adapt to the available space.

<style>
  .example-block {
    background-color: var(--wa-color-indigo-60);
    border-radius: var(--wa-border-radius-s);
    min-block-size: 4rem;
    min-inline-size: 4rem;
  }
  .example-set {
    border: var(--wa-border-width-s) dashed var(--wa-color-neutral-border-normal);
    border-radius: var(--wa-border-radius-m);
    padding: var(--wa-space-s);
  }
</style>

```html {.example}
<div class="wa-grid">
  <div class="example-block"></div>
  <div class="example-block"></div>
  <div class="example-block"></div>
  <div class="example-block"></div>
  <div class="example-block"></div>
  <div class="example-block"></div>
</div>
```

## Sizing

By default, grid items will wrap when their inline size is less that `20ch`, but you can set a new inline size using the `--min-inline-size` property.

```html {.example}
<div class="wa-stack">
  <div class="example-set wa-grid" style="--min-inline-size: 200px;">
    <div class="example-block"></div>
    <div class="example-block"></div>
    <div class="example-block"></div>
    <div class="example-block"></div>
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
  <div class="example-set wa-grid" style="--min-inline-size: 6rem;">
    <div class="example-block"></div>
    <div class="example-block"></div>
    <div class="example-block"></div>
    <div class="example-block"></div>
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
</div>
```

## Gap

By default, the gap between cluster items uses `--wa-space-m` from your theme. You can append any of the following modifiers to the `wa-cluster` class in your markup to specify the gap between items:
- `:gap-3xs`
- `:gap-2xs`
- `:gap-xs`
- `:gap-s`
- `:gap-m`
- `:gap-l`
- `:gap-xl`
- `:gap-2xl`
- `:gap-3xl`

Each modifier uses the corresponding space variable from your theme.

```html {.example}
<div class="wa-stack">
  <div class="example-set wa-grid:gap-2xs">
    <div class="example-block"></div>
    <div class="example-block"></div>
    <div class="example-block"></div>
    <div class="example-block"></div>
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
  <div class="example-set wa-grid:gap-2xl">
    <div class="example-block"></div>
    <div class="example-block"></div>
    <div class="example-block"></div>
    <div class="example-block"></div>
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
</div>
```

## Examples

Frames are well-suited for images and image placeholders.

```html {.example}
<div class="wa-grid">
  <div class="wa-stack:gap-s">
    <div class="wa-frame:border-radius-m">
      <img src="https://images.unsplash.com/photo-1520763185298-1b434c919102?q=20" />
    </div>
    <h3 class="wa-font-size:l">Tulip</h3>
    <em>Tulipa gesneriana</em>
  </div>
  <div class="wa-stack:gap-s">
    <div class="wa-frame:border-radius-m">
      <img src="https://images.unsplash.com/photo-1591767134492-338e62f7b5a2?q=20" />
    </div>
    <h3 class="wa-font-size:l">Peony</h3>
    <em>Paeonia officinalis</em>
  </div>
  <div class="wa-stack:gap-s">
    <div class="wa-frame:border-radius-m">
      <img src="https://images.unsplash.com/photo-1590872000386-4348c6393115?q=20" />
    </div>
    <h3 class="wa-font-size:l">Poppy</h3>
    <em>Papaver rhoeas</em>
  </div>
  <div class="wa-stack:gap-s">
    <div class="wa-frame:border-radius-m">
      <img src="https://images.unsplash.com/photo-1516723338795-324c7c33f700?q=20" />
    </div>
    <h3 class="wa-font-size:l">Sunflower</h3>
    <em>Helianthus annuus</em>
  </div>
  <div class="wa-stack:gap-s">
    <div class="wa-frame:border-radius-m">
      <img src="https://images.unsplash.com/photo-1563601841845-74a0a8ab7c8a?q=20" />
    </div>
    <h3 class="wa-font-size:l">Daisy</h3>
    <em>Bellis perennis</em>
  </div>
</div>
```

```html {.example}
<div class="wa-grid">
  <wa-card>
    <div class="wa-flank">
      <wa-avatar shape="rounded">
        <wa-icon slot="icon" name="globe"></wa-icon>
      </wa-avatar>
      <div class="wa-stack:gap-3xs">
        <small>Population (Zion)</small>
        <span class="wa-cluster:gap-xs">
          <strong class="wa-font-size:2xl wa-line-height:condensed">251,999</strong>
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
      <div class="wa-stack:gap-3xs">
        <small>Minds Freed</small>
        <span class="wa-cluster:gap-xs">
          <strong class="wa-font-size:2xl wa-line-height:condensed">0.36%</strong>
          <wa-badge variant="success">+0.03%&nbsp;<wa-icon name="arrow-trend-up"></wa-icon></wa-badge>
        </span>
      </div>
    </div>
  </wa-card>
</div>
```