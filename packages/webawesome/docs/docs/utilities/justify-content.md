---
title: Justify Content
description: Justify content utilities determine how space is distributed between items in flex and grid containers.
layout: docs
tags: layoutUtilities
---

<style>
  .preview-wrapper {
    border: var(--layout-example-border);
    border-radius: var(--wa-border-radius-m);
    min-block-size: 3em;
    min-inline-size: 5em;
    padding: var(--wa-space-2xs);
  }

  .preview-block {
    aspect-ratio: 1 / 1;
    background-color: var(--layout-example-element-background);
    border-radius: var(--wa-border-radius-s);
    min-block-size: 1em;
  }
</style>

Web Awesome includes classes to set the `justify-content` property of flex and grid containers. Use them alongside other Web Awesome layout utilities, like [cluster](/docs/utilities/cluster) and [stack](/docs/utilities/stack), to distribute space between items along the container's [main axis](#whats-the-main-axis).

| Class Name                         | `justify-content` Value | Preview                                                                                                                                                      |
| ---------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `wa-justify-content-start`         | `flex-start`            | <div class="wa-cluster wa-gap-2xs wa-justify-content-start preview-wrapper"><div class="preview-block"></div><div class="preview-block"></div></div>         |
| `wa-justify-content-end`           | `flex-end`              | <div class="wa-cluster wa-gap-2xs wa-justify-content-end preview-wrapper"><div class="preview-block"></div><div class="preview-block"></div></div>           |
| `wa-justify-content-center`        | `center`                | <div class="wa-cluster wa-gap-2xs wa-justify-content-center preview-wrapper"><div class="preview-block"></div><div class="preview-block"></div></div>        |
| `wa-justify-content-space-around`  | `space-around`          | <div class="wa-cluster wa-gap-2xs wa-justify-content-space-around preview-wrapper"><div class="preview-block"></div><div class="preview-block"></div></div>  |
| `wa-justify-content-space-between` | `space-between`         | <div class="wa-cluster wa-gap-2xs wa-justify-content-space-between preview-wrapper"><div class="preview-block"></div><div class="preview-block"></div></div> |
| `wa-justify-content-space-evenly`  | `space-evenly`          | <div class="wa-cluster wa-gap-2xs wa-justify-content-space-evenly preview-wrapper"><div class="preview-block"></div><div class="preview-block"></div></div>  |

## What's the Main Axis?

The main axis runs parallel to a container's content direction. For grid containers and flex containers where `flex-direction` is `row`, the main axis runs in the inline direction. For containers where `flex-direction` is `column`, the main axis runs in the block direction.
