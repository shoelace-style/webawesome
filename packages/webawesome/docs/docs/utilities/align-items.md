---
title: Align Items
description: Align items utilities align items within flex and grid containers on the cross axis.
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

Web Awesome includes classes to set the `align-items` property of flex and grid containers. Use them alongside other Web Awesome layout utilities, like [cluster](/docs/utilities/cluster) and [stack](/docs/utilities/stack), to align items in a container on the container's [cross axis](#whats-the-cross-axis).

| Class Name                | `align-items` Value | Preview                                                                                                                                             |
| ------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `wa-align-items-baseline` | `baseline`          | <div class="wa-cluster wa-gap-2xs wa-align-items-baseline preview-wrapper"><div class="preview-block"></div><div class="preview-block"></div></div> |
| `wa-align-items-center`   | `center`            | <div class="wa-cluster wa-gap-2xs wa-align-items-center preview-wrapper"><div class="preview-block"></div><div class="preview-block"></div></div>   |
| `wa-align-items-end`      | `flex-end`          | <div class="wa-cluster wa-gap-2xs wa-align-items-end preview-wrapper"><div class="preview-block"></div><div class="preview-block"></div></div>      |
| `wa-align-items-start`    | `flex-start`        | <div class="wa-cluster wa-gap-2xs wa-align-items-start preview-wrapper"><div class="preview-block"></div><div class="preview-block"></div></div>    |
| `wa-align-items-stretch`  | `stretch`           | <div class="wa-cluster wa-gap-2xs wa-align-items-stretch preview-wrapper"><div class="preview-block"></div><div class="preview-block"></div></div>  |

## What's the Cross Axis?

The cross axis runs perpendicular to a container's content direction. For containers where `flex-direction` is `row` and content flows in the inline direction, the cross axis runs in the block direction. For containers where `flex-direction` is `column` and content flows in the block direction, the cross axis runs in the inline direction.
