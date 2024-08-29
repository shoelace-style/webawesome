---
title: Frame
description: Browse the library of customizable, framework-friendly web components included in Web Awesome.
layout: page-outline
---

Frame creates a responsive container with consistent proportions to enclose content.

<style>
  .example-block {
    background-color: var(--wa-color-indigo-60);
    border-radius: var(--wa-border-radius-s);
    min-block-size: 4rem;
    min-inline-size: 4rem;
  }
  .example-set {
    border: var(--wa-border-width-s) dashed var(--wa-color-neutral-border-normal);
  }
</style>

```html {.example}
<div class="example-set wa-frame" style="max-inline-size: 20rem;">
  <div class="example-block"></div>
</div>
```

## Aspect Ratio

You can append `:square` (1 / 1), `:landscape` (16 / 9), or `:portrait` (9 / 16) to the `wa-frame` class in your markup to specify an aspect ratio for the frame. Alternatively, you can use the `--aspect-ratio` property to set a custom proportion. Frames have a square aspect ratio by default.

```html {.example}
<div class="wa-grid">
  <div class="example-set wa-frame:landscape">
    <div class="example-block"></div>
  </div>
  <div class="example-set wa-frame:portrait">
    <div class="example-block"></div>
  </div>
  <div class="example-set wa-frame" style="--aspect-ratio: 4 / 3;">
    <div class="example-block"></div>
  </div>
</div>
```

## Border Radius

You can append any of the following modifiers to the `wa-frame` class in your markup to specify the border radius for the frame:
- `:border-radius-xs`
- `:border-radius-s`
- `:border-radius-m`
- `:border-radius-l`
- `:border-radius-pill`
- `:border-radius-circle`
- `:border-radius-square`

```html {.example}
<div class="wa-grid">
  <div class="example-set wa-frame:border-radius-square">
    <div class="example-block"></div>
  </div>
  <div class="example-set wa-frame:border-radius-circle">
    <div class="example-block"></div>
  </div>
  <div class="example-set wa-frame:border-radius-l">
    <div class="example-block"></div>
  </div>
</div>
```

## Examples

Frames are well-suited for images and image placeholders.

```html {.example}
<div class="wa-flank" style="--flank-size: 8rem;">
  <div class="wa-frame:border-radius-m">
    <img src="https://images.unsplash.com/photo-1523593288094-3ccfb6b2c192?q=20" />
  </div>
  <div class="wa-flank:end" style="--content-percentage: 70%">
    <div class="wa-stack:gap-xs">
      <h3>The Lord of the Rings: The Fellowship of the Ring</h3>
      <span>J.R.R. Tolkien</span>
    </div>
    <wa-icon-button id="options-menu" name="ellipsis"></wa-icon-button>
    <wa-tooltip for="options-menu">Options</wa-tooltip>
  </div>
</div>
```

```html {.example}
<div class="wa-grid" style="--min-inline-size: 25ch;">
  <wa-card with-image>
    <div class="wa-frame:landscape" slot="image">
      <img src="https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?q=20" />
    </div>
    <div class="wa-stack:gap-xs">
      <h3 class="wa-font-size:m">White-socks</h3>
      <small>Kitten &bull; Male</small>
      <div class="wa-flank:end:gap-xs">
        <wa-button size="small" appearance="tinted" variant="brand">Adopt this pet</wa-button>
        <wa-icon-button id="fav-whitesocks" name="heart" variant="regular"></wa-icon-button>
        <wa-tooltip for="fav-whitesocks">Favorite</wa-tooltip>
      </div>
    </div>
  </wa-card>
  <wa-card with-header>
    <div class="wa-frame:landscape" slot="header">
      <div class="wa-stack:align-center:gap-xs" style="color: var(--wa-color-text-quiet)">
        <wa-icon name="paw" class="wa-font-size:xl"></wa-icon>
        <small>Photo coming soon</small>
      </div>
    </div>
    <div class="wa-stack:gap-xs">
      <h3 class="wa-font-size:m">Bumpkin</h3>
      <small>Adult &bull; Male</small>
      <div class="wa-flank:end:gap-xs">
        <wa-button size="small" appearance="tinted" variant="brand">Adopt this pet</wa-button>
        <wa-icon-button id="fav-bumpkin" name="heart" variant="regular"></wa-icon-button>
        <wa-tooltip for="fav-bumpkin">Favorite</wa-tooltip>
      </div>
    </div>
  </wa-card>
  <wa-card with-image>
    <div class="wa-frame:landscape" slot="image">
      <img src="https://images.unsplash.com/photo-1445499348736-29b6cdfc03b9?q=20" />
    </div>
    <div class="wa-stack:gap-xs">
      <h3 class="wa-font-size:m">Swish-tail</h3>
      <small>Kitten &bull; Female</small>
      <div class="wa-flank:end:gap-xs">
        <wa-button size="small" appearance="tinted" variant="brand">Adopt this pet</wa-button>
        <wa-icon-button id="fav-swishtail" name="heart" variant="regular"></wa-icon-button>
        <wa-tooltip for="fav-swishtail">Favorite</wa-tooltip>
      </div>
    </div>
  </wa-card>
  <wa-card with-image>
    <div class="wa-frame:landscape" slot="image">
      <img src="https://images.unsplash.com/photo-1517451330947-7809dead78d5?q=20" />
    </div>
    <div class="wa-stack:gap-xs">
      <h3 class="wa-font-size:m">Sharp-ears</h3>
      <small>Adult &bull; Female</small>
      <div class="wa-flank:end:gap-xs">
        <wa-button size="small" appearance="tinted" variant="brand">Adopt this pet</wa-button>
        <wa-icon-button id="fav-sharpears" name="heart" variant="regular"></wa-icon-button>
        <wa-tooltip for="fav-sharpears">Favorite</wa-tooltip>
      </div>
    </div>
  </wa-card>
</div>
```