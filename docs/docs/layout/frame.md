---
title: Frame
description: Browse the library of customizable, framework-friendly web components included in Web Awesome.
layout: page-outline
---

<style>
  [class*='wa-frame']:has(div:empty) {
    border: var(--wa-border-width-s) dashed var(--wa-color-neutral-border-normal);
    padding: var(--wa-space-s);
  }

  [class*='wa-frame'] div:empty {
    background-color: var(--wa-color-indigo-60);
    border-radius: var(--wa-border-radius-s);
    min-block-size: 4rem;
    min-inline-size: 4rem;
  }
</style>

Use the `wa-frame` class to create a responsive container with consistent proportions to enclose content.

```html {.example}
<div class="wa-frame" style="max-inline-size: 20rem;">
  <div></div>
</div>
```

## Examples

Frames are well-suited for images and image placeholders.

```html {.example}
<div class="wa-flank" style="--flank-size: 8rem;">
  <div class="wa-frame wa-border-radius-m">
    <img src="https://images.unsplash.com/photo-1523593288094-3ccfb6b2c192?q=20" alt=""/>
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
<div class="wa-grid" style="--min-column-size: 25ch;">
  <wa-card with-image>
    <div class="wa-frame:landscape" slot="image">
      <img src="https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?q=20" alt="Grey and white tabby kitten" />
    </div>
    <div class="wa-stack wa-gap-xs">
      <h3 class="wa-heading-s">White-socks</h3>
      <span class="wa-body-s">Kitten &bull; Male</span>
      <div class="wa-flank:end wa-gap-xs">
        <wa-button size="small" appearance="filled" variant="brand">Adopt this pet</wa-button>
        <wa-icon-button id="fav-whitesocks" name="heart" variant="regular"></wa-icon-button>
        <wa-tooltip for="fav-whitesocks">Favorite</wa-tooltip>
      </div>
    </div>
  </wa-card>
  <wa-card with-header>
    <div class="wa-frame:landscape" slot="header">
      <div class="wa-stack wa-align-items-center wa-gap-xs wa-caption-m">
        <wa-icon name="paw"></wa-icon>
        <span>Photo coming soon</span>
      </div>
    </div>
    <div class="wa-stack wa-gap-xs">
      <h3 class="wa-heading-s">Bumpkin</h3>
      <span class="wa-body-s">Adult &bull; Male</span>
      <div class="wa-flank:end wa-gap-xs">
        <wa-button size="small" appearance="filled" variant="brand">Adopt this pet</wa-button>
        <wa-icon-button id="fav-bumpkin" name="heart" variant="regular"></wa-icon-button>
        <wa-tooltip for="fav-bumpkin">Favorite</wa-tooltip>
      </div>
    </div>
  </wa-card>
  <wa-card with-image>
    <div class="wa-frame:landscape" slot="image">
      <img src="https://images.unsplash.com/photo-1445499348736-29b6cdfc03b9?q=20" alt="Diluted calico kitten" />
    </div>
    <div class="wa-stack wa-gap-xs">
      <h3 class="wa-heading-s">Swish-tail</h3>
      <span class="wa-body-s">Kitten &bull; Female</span>
      <div class="wa-flank:end wa-gap-xs">
        <wa-button size="small" appearance="filled" variant="brand">Adopt this pet</wa-button>
        <wa-icon-button id="fav-swishtail" name="heart" variant="regular"></wa-icon-button>
        <wa-tooltip for="fav-swishtail">Favorite</wa-tooltip>
      </div>
    </div>
  </wa-card>
  <wa-card with-image>
    <div class="wa-frame:landscape" slot="image">
      <img src="https://images.unsplash.com/photo-1517451330947-7809dead78d5?q=20" alt="Short-haired tabby cat" />
    </div>
    <div class="wa-stack wa-gap-xs">
      <h3 class="wa-heading-s">Sharp-ears</h3>
      <span class="wa-body-s">Adult &bull; Female</span>
      <div class="wa-flank:end wa-gap-xs">
        <wa-button size="small" appearance="filled" variant="brand">Adopt this pet</wa-button>
        <wa-icon-button id="fav-sharpears" name="heart" variant="regular"></wa-icon-button>
        <wa-tooltip for="fav-sharpears">Favorite</wa-tooltip>
      </div>
    </div>
  </wa-card>
</div>
```

## Aspect Ratio

Frames have a square aspect ratio by default. You can append `:square` (1 / 1), `:landscape` (16 / 9), or `:portrait` (9 / 16) to the `wa-frame` class in your markup to specify an aspect ratio for the frame. Alternatively, you can define the `aspect-ratio` property to set a custom proportion.

```html {.example}
<div class="wa-grid">
  <div class="wa-frame:landscape">
    <div></div>
  </div>
  <div class="wa-frame:portrait">
    <div></div>
  </div>
  <div class="wa-frame" style="aspect-ratio: 4 / 3;">
    <div></div>
  </div>
</div>
```

## Border Radius

Frames have a square border radius by default. You can add any of the following [`wa-border-radius-*`](/docs/style-utilities/border-radius) classes to an element with `wa-frame` to specify the border radius:
- `wa-border-radius-xs`
- `wa-border-radius-s`
- `wa-border-radius-m`
- `wa-border-radius-l`
- `wa-border-radius-pill`
- `wa-border-radius-circle`
- `wa-border-radius-square`

Alternatively, you can define the `border-radius` property to set custom rounding.

```html {.example}
<div class="wa-grid">
  <div class="wa-frame wa-border-radius-l">
    <div></div>
  </div>
  <div class="wa-frame wa-border-radius-circle">
    <div></div>
  </div>
  <div class="wa-frame" style="border-radius: 50% 0%;">
    <div></div>
  </div>
</div>
```
