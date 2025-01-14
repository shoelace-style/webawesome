---
title: Gap
description: Gap utilities set the gap property of flex and grid containers, like other Web Awesome layout utilities.
tags: ["utilities", "layout"]
---

<style>
  .preview-block {
    aspect-ratio: 1 / 1;
    background-color: var(--wa-color-neutral-fill-loud);
    border-radius: var(--wa-border-radius-s);
    min-block-size: 1.5em;
  }
</style>

Web Awesome includes classes to set the `gap` property of flex and grid containers. They can be used alongside other Web Awesome layout utilities, like [cluster](/docs/layout/cluster) and [stack](/docs/layout/stack), to change the space between items.
Or even by themselves — all gap properties also set `display: flex` with a specificity of 0 so that it can be trivially overridden.

Besides `wa-gap-0`, which sets `gap` to zero, each class corresponds to one of the [`--wa-space-*`](/docs/tokens/space) properties in your theme.

| Class Name   | `gap` Value      | Preview                                                                                                     |
| ------------ | ---------------- | ----------------------------------------------------------------------------------------------------------- |
| `wa-gap-0`   | `0`              | <div class="wa-cluster wa-gap-0"><div class="preview-block"></div><div class="preview-block"></div></div>   |
| `wa-gap-3xs` | `--wa-space-3xs` | <div class="wa-cluster wa-gap-3xs"><div class="preview-block"></div><div class="preview-block"></div></div> |
| `wa-gap-2xs` | `--wa-space-2xs` | <div class="wa-cluster wa-gap-2xs"><div class="preview-block"></div><div class="preview-block"></div></div> |
| `wa-gap-xs`  | `--wa-space-xs`  | <div class="wa-cluster wa-gap-xs"><div class="preview-block"></div><div class="preview-block"></div></div>  |
| `wa-gap-s`   | `--wa-space-s`   | <div class="wa-cluster wa-gap-s"><div class="preview-block"></div><div class="preview-block"></div></div>   |
| `wa-gap-m`   | `--wa-space-m`   | <div class="wa-cluster wa-gap-m"><div class="preview-block"></div><div class="preview-block"></div></div>   |
| `wa-gap-l`   | `--wa-space-l`   | <div class="wa-cluster wa-gap-l"><div class="preview-block"></div><div class="preview-block"></div></div>   |
| `wa-gap-xl`  | `--wa-space-xl`  | <div class="wa-cluster wa-gap-xl"><div class="preview-block"></div><div class="preview-block"></div></div>  |
| `wa-gap-2xl` | `--wa-space-2xl` | <div class="wa-cluster wa-gap-2xl"><div class="preview-block"></div><div class="preview-block"></div></div> |
| `wa-gap-3xl` | `--wa-space-3xl` | <div class="wa-cluster wa-gap-3xl"><div class="preview-block"></div><div class="preview-block"></div></div> |

