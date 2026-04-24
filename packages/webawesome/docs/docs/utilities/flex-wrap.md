---
title: Flex Wrap
description: Flex wrap utilities specify how items within flex containers wrap.
layout: docs
tags: layoutUtilities
synonyms:
  - wrapping
  - flow
  - line wrap
use-cases:
  - responsive wrap
  - multi-line flex
  - flex wrap reverse
  - nowrap
---

<style>
  .preview-wrapper {
    border: var(--layout-example-border);
    border-radius: var(--wa-border-radius-m);
    min-block-size: 3em;
    max-inline-size: 6em;
    padding: var(--wa-space-2xs);

    counter-reset: item-counter;
  }
  
  .preview-block {
    aspect-ratio: 1 / 1;
    background-color: var(--layout-example-element-background);
    border-radius: var(--wa-border-radius-s);
    min-block-size: 2em;

    display: flex;
    justify-content: center;
    align-items: center;

    &::before {
      counter-increment: item-counter;
      content: counter(item-counter);
      color: var(--layout-example-element-color);
    }
  }
</style>

These utility classes control whether the items inside a flex container wrap onto a new line when they run out of horizontal space, and in which direction. Use them to force a [cluster](/docs/utilities/cluster) or [split](/docs/utilities/split) to stay on a single line regardless of width, or to flip the wrap direction so new rows appear above the previous one instead of below.

## Flex Wrap Classes

| Class Name             | `flex-wrap` Value | Preview                                                                                                                                                                           |
| ---------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `wa-flex-wrap`         | `wrap`            | <div class="wa-cluster wa-gap-2xs wa-flex-wrap preview-wrapper"><div class="preview-block"></div><div class="preview-block"></div><div class="preview-block"></div></div>         |
| `wa-flex-nowrap`       | `nowrap`          | <div class="wa-cluster wa-gap-2xs wa-flex-nowrap preview-wrapper"><div class="preview-block"></div><div class="preview-block"></div><div class="preview-block"></div></div>       |
| `wa-flex-wrap-reverse` | `wrap-reverse`    | <div class="wa-cluster wa-gap-2xs wa-flex-wrap-reverse preview-wrapper"><div class="preview-block"></div><div class="preview-block"></div><div class="preview-block"></div></div> |
