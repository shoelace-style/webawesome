---
title: Flank
description: 'Use the `wa-flank` class to position two items side-by-side, with one item positioned alongside, or _flanking_, content that stretches to fill the available space.'
layout: docs
tags: layoutUtilities
---

<style>
  :is(.wa-flank, .wa-grid, .wa-stack) > [class*='wa-flank']:has(div:empty) {
    border: var(--layout-example-border);
    border-radius: var(--layout-example-border-radius);
    padding: var(--layout-example-padding);
  }

  [class*='wa-flank'] div:empty {
    background-color: var(--layout-example-element-background);
    border-radius: var(--layout-example-element-border-radius);
    min-block-size: 4rem;
    min-inline-size: 4rem;
  }
</style>

{{ description }} When space is limited, the items wrap.

```html {.example}
<div class="wa-flank">
  <div></div>
  <div></div>
</div>
```

## Examples

Flanks work especially well for asides, inputs with adjacent buttons, and rich description lists.

```html {.example}
<div class="wa-flank:end wa-gap-xs">
  <wa-input>
    <wa-icon slot="start" name="magnifying-glass"></wa-icon>
  </wa-input>
  <wa-button>Search</wa-button>
</div>
```

```html {.example}
<div class="wa-stack wa-gap-xl">
  <div class="wa-flank wa-align-items-start">
    <wa-avatar
      image="https://images.unsplash.com/photo-1553284966-19b8815c7817?q=20"
      label="Gandalf's avatar"
    ></wa-avatar>
    <div class="wa-stack wa-gap-3xs">
      <strong>Gandalf</strong>
      <p class="wa-body-s">
        All we have to decide is what to do with the time that is given to us. There are other forces at work in this
        world, Frodo, besides the will of evil.
      </p>
    </div>
  </div>
  <div class="wa-flank wa-align-items-start">
    <wa-avatar
      image="https://images.unsplash.com/photo-1542403764-c26462c4697e?q=20"
      label="Boromir's avatar"
    ></wa-avatar>
    <div class="wa-stack wa-gap-3xs">
      <strong>Boromir</strong>
      <p class="wa-body-s">
        One does not simply walk into Mordor. Its Black Gates are guarded by more than just Orcs. There is evil there
        that does not sleep, and the Great Eye is ever watchful.
      </p>
    </div>
  </div>
  <div class="wa-flank wa-align-items-start">
    <wa-avatar
      image="https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=20"
      label="Galadriel's avatar"
    ></wa-avatar>
    <div class="wa-stack wa-gap-3xs">
      <strong>Galadriel</strong>
      <p class="wa-body-s">
        The world is changed. I feel it in the water. I feel it in the earth. I smell it in the air. Much that once was
        is lost, for none now live who remember it.
      </p>
    </div>
  </div>
</div>
```

## Position

By default, the first item in the `wa-flank` container will flank the other content. You can specify whether the first or last item will flank the remaining content by appending `:start` or `:end` to the `wa-flank` class.

```html {.example}
<div class="wa-stack">
  <div class="wa-flank:start">
    <div></div>
    <div></div>
  </div>
  <div class="wa-flank:end">
    <div></div>
    <div></div>
  </div>
</div>
```

## Sizing

The flank's inline size is determined by the size of its content, but you can set a target size using the `--flank-size` property. When the flank wraps, it stretches to fill the inline size of the container.

```html {.example}
<div class="wa-stack">
  <div class="wa-flank" style="--flank-size: 200px;">
    <div></div>
    <div></div>
  </div>
  <div class="wa-flank" style="--flank-size: 6rem;">
    <div></div>
    <div></div>
  </div>
</div>
```

The main content fills the remaining inline space of the container. By default, the items wrap when the main content is less than 50% of the container. You can change the minimum size of the main content with the `--content-percentage` property.

```html {.example}
<div class="wa-stack">
  <div class="wa-flank" style="--content-percentage: 70%;">
    <div></div>
    <div></div>
  </div>
  <div class="wa-flank" style="--content-percentage: 85%;">
    <div></div>
    <div></div>
  </div>
</div>
```

## Align Items

By default, items are centered in the block direction of the `wa-flank` container. You can add any of the following [`wa-align-items-*`](/docs/utilities/align-items) classes to an element with `wa-flank` to specify how items are aligned in the block direction:

- `wa-align-items-start`
- `wa-align-items-end`
- `wa-align-items-center`
- `wa-align-items-stretch`
- `wa-align-items-baseline`

```html {.example}
<div class="wa-stack">
  <div class="wa-flank wa-align-items-start" style="min-height: 8rem;">
    <div></div>
    <div></div>
  </div>
  <div class="wa-flank wa-align-items-end" style="min-height: 8rem;">
    <div></div>
    <div></div>
  </div>
  <div class="wa-flank wa-align-items-center" style="min-height: 8rem;">
    <div></div>
    <div></div>
  </div>
  <div class="wa-flank wa-align-items-stretch" style="min-height: 8rem;">
    <div></div>
    <div></div>
  </div>
</div>
```

## Gap

By default, the gap between flank items uses `--wa-space-m` from your theme. You can add any of the following [`wa-gap-*`](/docs/utilities/gap) classes to an element with `wa-flank` to specify the gap between items:

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
  <div class="wa-flank wa-gap-2xs">
    <div></div>
    <div></div>
  </div>
  <div class="wa-flank wa-gap-2xl">
    <div></div>
    <div></div>
  </div>
</div>
```
