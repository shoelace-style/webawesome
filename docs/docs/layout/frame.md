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
<div class="example-set wa-frame">
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
<div class="wa-grid">
  <wa-card with-image>
    <div class="wa-frame:landscape" slot="image">
      <img src="https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?q=20" />
    </div>
    White-socks
  </wa-card>
  <wa-card with-image>
    <div class="wa-frame:landscape" slot="image">
      <img src="https://images.unsplash.com/photo-1445499348736-29b6cdfc03b9?q=20" />
    </div>
    Swish-tail
  </wa-card>
  <wa-card with-header>
    <div class="wa-frame:landscape" slot="header">
      <div class="wa-stack:align-center:gap-xs" style="color: var(--wa-color-text-quiet)">
        <wa-icon name="paw" class="wa-font-size:xl"></wa-icon>
        <small>Photo coming soon</small>
      </div>
    </div>
    Bumpkin
  </wa-card>
</div>
```

```html {.example}
<div class="wa-stack:gap-xl">
  <div class="wa-flank:align-start">
    <wa-avatar image="https://images.unsplash.com/photo-1553284966-19b8815c7817?q=20"></wa-avatar>
    <div class="wa-stack:gap-3xs">
      <strong>Gandalf</strong>
      <small>All we have to decide is what to do with the time that is given to us. There are other forces at work in this world, Frodo, besides the will of evil.</small>
    </div>
  </div>
  <div class="wa-flank:align-start">
    <wa-avatar image="https://images.unsplash.com/photo-1542403764-c26462c4697e?q=20"></wa-avatar>
    <div class="wa-stack:gap-3xs">
      <strong>Boromir</strong>
      <small>One does not simply walk into Mordor. Its Black Gates are guarded by more than just Orcs. There is evil there that does not sleep, and the Great Eye is ever watchful.</small>
    </div>
  </div>
  <div class="wa-flank:align-start">
    <wa-avatar image="https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=20"></wa-avatar>
    <div class="wa-stack:gap-3xs">
      <strong>Galadriel</strong>
      <small>The world is changed. I feel it in the water. I feel it in the earth. I smell it in the air. Much that once was is lost, for none now live who remember it.</small>
    </div>
  </div>
</div>
```