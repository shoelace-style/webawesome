---
title: Flank
description: Browse the library of customizable, framework-friendly web components included in Web Awesome.
layout: page-outline
---

Cluster arranges elements in the inline direction with even spacing, allowing items to wrap when space is limited.

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
<div class="wa-flank">
  <div class="example-block"></div>
  <div class="example-block"></div>
</div>
```

## Position

An item can flank either the start or end of the content by appending `:start` or `:end` to the `wa-flank` class.

```html {.example}
<div class="wa-stack">
  <div class="example-set wa-flank:start">
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
  <div class="example-set wa-flank:end">
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
</div>
```

## Sizing

The flank's inline size is determined by the size of its content, but you can set a target size using the `--flank-size` property. When the flank wraps, it stretches to fill the inline size of the container.

```html {.example}
<div class="wa-stack">
  <div class="example-set wa-flank" style="--flank-size: 200px;">
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
  <div class="example-set wa-flank" style="--flank-size: 6rem;">
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
</div>
```

The main content fills the remaining inline space of the container. By default, the flank and main content wrap when the main content is less than 50% of the container. You can change the minimum size of the main content with the `--content-percentage` property.

```html {.example}
<div class="wa-stack">
  <div class="example-set wa-flank" style="--content-percentage: 70%;">
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
  <div class="example-set wa-flank" style="--content-percentage: 85%;">
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
</div>
```

## Alignment

By default, items in a flank are aligned to the center of the container. You can append any of the following modifiers to the `wa-flank` class in your markup to specify how items are aligned in the block direction:
- `:align-start`
- `:align-end`
- `:align-center`
- `:align-stretch`

```html {.example}
<div class="wa-stack">
  <div class="example-set wa-flank:align-start" style="min-height: 8rem;">
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
  <div class="example-set wa-flank:align-end" style="min-height: 8rem;">
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
  <div class="example-set wa-flank:align-center" style="min-height: 8rem;">
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
  <div class="example-set wa-flank:align-stretch" style="min-height: 8rem;">
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
  <div class="example-set wa-flank:gap-2xs">
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
  <div class="example-set wa-flank:gap-2xl">
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
</div>
```

## Examples

Flanks work especially well for asides, inputs with adjacent buttons, and rich description lists.

```html {.example}
<div class="wa-flank:end:gap-xs">
  <wa-input>
    <wa-icon slot="prefix" name="magnifying-glass"></wa-icon>
  </wa-input>
  <wa-button>Search</wa-button>
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