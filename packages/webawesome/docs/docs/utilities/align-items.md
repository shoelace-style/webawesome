---
title: Align Items
description: Control cross-axis alignment in flex and grid containers with align-items and align-self utility classes.
layout: docs
tags: layoutUtilities
aliases:
  - /docs/utilities/self-align
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

Web Awesome includes classes to set the `align-items` property of flex and grid containers. Use these `wa-align-items-*` classes alongside other Web Awesome layout utilities, like [cluster](/docs/utilities/cluster) and [stack](/docs/utilities/stack), to align items in a container on the container's [cross axis](#whats-the-cross-axis).

| Class Name                | `align-items` Value | Preview                                                                                                                                             |
| ------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `wa-align-items-baseline` | `baseline`          | <div class="wa-cluster wa-gap-2xs wa-align-items-baseline preview-wrapper"><div class="preview-block"></div><div class="preview-block"></div><div class="preview-block"></div></div> |
| `wa-align-items-center`   | `center`            | <div class="wa-cluster wa-gap-2xs wa-align-items-center preview-wrapper"><div class="preview-block"></div><div class="preview-block"></div><div class="preview-block"></div></div>   |
| `wa-align-items-end`      | `flex-end`          | <div class="wa-cluster wa-gap-2xs wa-align-items-end preview-wrapper"><div class="preview-block"></div><div class="preview-block"></div><div class="preview-block"></div></div>      |
| `wa-align-items-start`    | `flex-start`        | <div class="wa-cluster wa-gap-2xs wa-align-items-start preview-wrapper"><div class="preview-block"></div><div class="preview-block"></div><div class="preview-block"></div></div>    |
| `wa-align-items-stretch`  | `stretch`           | <div class="wa-cluster wa-gap-2xs wa-align-items-stretch preview-wrapper"><div class="preview-block"></div><div class="preview-block"></div><div class="preview-block"></div></div>  |

## Override with Align Self

When you need a flex or grid item to deviate from the `align-items` property of its container, use the `wa-align-self-*` classes to set the item's `align-self` property and individually change its alignment on the container's [cross axis](#whats-the-cross-axis).

| Class Name               | `align-self` Value | Preview                                                                                                                                            |
| ------------------------ | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `wa-align-self-center`   | `center`           | <div class="wa-cluster wa-gap-2xs preview-wrapper"><div class="preview-block de-emphasize"></div><div class="preview-block wa-align-self-center"></div><div class="preview-block de-emphasize"></div></div>   |
| `wa-align-self-baseline` | `baseline`         | <div class="wa-cluster wa-gap-2xs preview-wrapper"><div class="preview-block de-emphasize"></div><div class="preview-block wa-align-self-baseline"></div><div class="preview-block de-emphasize"></div></div> |
| `wa-align-self-end`      | `flex-end`         | <div class="wa-cluster wa-gap-2xs preview-wrapper"><div class="preview-block de-emphasize"></div><div class="preview-block wa-align-self-end"></div><div class="preview-block de-emphasize"></div></div>      |
| `wa-align-self-start`    | `flex-start`       | <div class="wa-cluster wa-gap-2xs preview-wrapper"><div class="preview-block de-emphasize"></div><div class="preview-block wa-align-self-start"></div><div class="preview-block de-emphasize"></div></div>    |
| `wa-align-self-stretch`  | `stretch`          | <div class="wa-cluster wa-gap-2xs preview-wrapper"><div class="preview-block de-emphasize"></div><div class="preview-block wa-align-self-stretch"></div><div class="preview-block de-emphasize"></div></div>  |


## What's the Cross Axis?

The cross axis runs perpendicular to a container's content direction. For containers where `flex-direction` is `row` and content flows in the inline direction, the cross axis runs in the block direction. For containers where `flex-direction` is `column` and content flows in the block direction, the cross axis runs in the inline direction.
