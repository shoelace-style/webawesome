---
title: Justify Content
description: Justify content utilities determine how space is distributed between items in flex and grid containers.
layout: docs
tags: layoutUtilities
synonyms:
  - horizontal align
  - main axis
  - distribute
use-cases:
  - flex justify
  - space between
  - center horizontally
---

<wa-breadcrumb style="display: flex; width: 100%; background-color: var(--wa-color-surface-default); border: var(--wa-panel-border-width) var(--wa-panel-border-style) var(--wa-color-surface-border); box-shadow: var(--wa-shadow-s); border-radius: 9999px; padding: var(--wa-space-xs) var(--wa-space-m); margin-block-end: var(--wa-space-l);">
  <wa-icon slot="separator" name="angle-right" variant="regular"></wa-icon>
  <wa-breadcrumb-item href="/docs/utilities">CSS Utilities</wa-breadcrumb-item>
  <wa-breadcrumb-item>{{ title }}</wa-breadcrumb-item>
</wa-breadcrumb>

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

These utility classes control how space is distributed between items along a flex or grid container's [main axis](#whats-the-main-axis), which is the axis its children flow along. Reach for them when you want to push items to one end of a [cluster](/docs/utilities/cluster) or [stack](/docs/utilities/stack), center a row of buttons, or spread a set of navigation links evenly across a header.

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
