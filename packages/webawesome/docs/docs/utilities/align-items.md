---
title: Align Items
description: Align items utilities set the gap property of flex and grid containers, like other Web Awesome layout utilities.
layout: docs
---

<style>
  .preview-wrapper {
    border: var(--wa-border-width-s) dashed var(--wa-color-neutral-border-normal);
    border-radius: var(--wa-border-radius-m);
    min-block-size: 3em;
    padding: var(--wa-space-2xs);
  }
  .preview-block {
    aspect-ratio: 1 / 1;
    background-color: var(--wa-color-neutral-fill-loud);
    border-radius: var(--wa-border-radius-s);
    min-block-size: 1em;
  }
</style>

Web Awesome includes classes to set the `align-items` property of flex and grid containers. They can be used alongside other Web Awesome layout utilities, like [cluster](/docs/layout/cluster) and [stack](/docs/layout/stack), to align children in container on the container's cross axis.

| Class Name                | `align-items` Value | Preview                                                                                                                                  |
| ------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `wa-align-items-baseline` | `baseline`          | <div class="wa-cluster wa-align-items-baseline preview-wrapper"><div class="preview-block"></div><div class="preview-block"></div></div> |
| `wa-align-items-center`   | `center`            | <div class="wa-cluster wa-align-items-center preview-wrapper"><div class="preview-block"></div><div class="preview-block"></div></div>   |
| `wa-align-items-end`      | `flex-end`          | <div class="wa-cluster wa-align-items-end preview-wrapper"><div class="preview-block"></div><div class="preview-block"></div></div>      |
| `wa-align-items-start`    | `flex-start`        | <div class="wa-cluster wa-align-items-start preview-wrapper"><div class="preview-block"></div><div class="preview-block"></div></div>    |
| `wa-align-items-stretch`  | `stretch`           | <div class="wa-cluster wa-align-items-stretch preview-wrapper"><div class="preview-block"></div><div class="preview-block"></div></div>  |

## What's a Cross Axis?

The cross axis runs perpendicular to a flex container's content direction. For containers where `flex-direction` is `row` and content flows in the inline direction, the cross axis runs in the block direction. For containers where `flex-direction` is `column` and content flows in the block direction, the cross axis runs in the inline direction.
