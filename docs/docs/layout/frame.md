---
title: Frame
description: Browse the library of customizable, framework-friendly web components included in Web Awesome.
layout: page-outline
---

<style>
  .layout-example-boundary {
    padding: 0;
    border-radius: 0;
  }
</style>

Use the `wa-frame` class to create a responsive container with consistent proportions to enclose content.

```html {.example}
<div class="layout-example-boundary wa-frame" style="max-inline-size: 20rem;">
  <div class="layout-example-block"></div>
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
    <div class="wa-stack wa-gap-xs">
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
    <div class="wa-stack wa-gap-xs">
      <h3 class="wa-heading-s">White-socks</h3>
      <span class="wa-body-text-s">Kitten &bull; Male</span>
      <div class="wa-flank:end wa-gap-xs">
        <wa-button size="small" appearance="tinted" variant="brand">Adopt this pet</wa-button>
        <wa-icon-button id="fav-whitesocks" name="heart" variant="regular"></wa-icon-button>
        <wa-tooltip for="fav-whitesocks">Favorite</wa-tooltip>
      </div>
    </div>
  </wa-card>
  <wa-card with-header>
    <div class="wa-frame:landscape" slot="header">
      <div class="wa-stack wa-align-center wa-gap-xs wa-caption-m">
        <wa-icon name="paw"></wa-icon>
        <span>Photo coming soon</span>
      </div>
    </div>
    <div class="wa-stack wa-gap-xs">
      <h3 class="wa-heading-s">Bumpkin</h3>
      <span class="wa-body-text-s">Adult &bull; Male</span>
      <div class="wa-flank:end wa-gap-xs">
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
    <div class="wa-stack wa-gap-xs">
      <h3 class="wa-heading-s">Swish-tail</h3>
      <span class="wa-body-text-s">Kitten &bull; Female</span>
      <div class="wa-flank:end wa-gap-xs">
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
    <div class="wa-stack wa-gap-xs">
      <h3 class="wa-heading-s">Sharp-ears</h3>
      <span class="wa-body-text-s">Adult &bull; Female</span>
      <div class="wa-flank:end wa-gap-xs">
        <wa-button size="small" appearance="tinted" variant="brand">Adopt this pet</wa-button>
        <wa-icon-button id="fav-sharpears" name="heart" variant="regular"></wa-icon-button>
        <wa-tooltip for="fav-sharpears">Favorite</wa-tooltip>
      </div>
    </div>
  </wa-card>
</div>
```

## Aspect Ratio

Frames have a square aspect ratio by default. You can append `:square` (1 / 1), `:landscape` (16 / 9), or `:portrait` (9 / 16) to the `wa-frame` class in your markup to specify an aspect ratio for the frame. Alternatively, you can use the `--aspect-ratio` property to set a custom proportion.

```html {.example}
<div class="wa-grid">
  <div class="layout-example-boundary wa-frame:landscape">
    <div class="layout-example-block"></div>
  </div>
  <div class="layout-example-boundary wa-frame:portrait">
    <div class="layout-example-block"></div>
  </div>
  <div class="layout-example-boundary wa-frame" style="--aspect-ratio: 4 / 3;">
    <div class="layout-example-block"></div>
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
  <div class="layout-example-boundary wa-frame:border-radius-square">
    <div class="layout-example-block"></div>
  </div>
  <div class="layout-example-boundary wa-frame:border-radius-circle">
    <div class="layout-example-block"></div>
  </div>
  <div class="layout-example-boundary wa-frame:border-radius-l">
    <div class="layout-example-block"></div>
  </div>
</div>
```