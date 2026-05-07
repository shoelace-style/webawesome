---
title: Gap
description: Gap utilities set the gap property of flex and grid containers, like other Web Awesome layout utilities.
layout: docs
tags: layoutUtilities
synonyms:
  - spacing
  - gutter
  - margin
  - space between
use-cases:
  - flex gap
  - grid gap
  - element spacing
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

These utility classes set the space between items inside a flex or grid container. Pair them with a layout utility like [cluster](/docs/utilities/cluster), [stack](/docs/utilities/stack), [grid](/docs/utilities/grid), or [split](/docs/utilities/split) to override that layout's default spacing, or apply `wa-gap-*` to any `display: flex` or `display: grid` element of your own to get the same tokens without writing custom CSS.

Every class besides `wa-gap-0` corresponds to one of the [`--wa-space-*`](/docs/tokens/space) tokens in your theme, so the spacing you pick stays in sync with the rest of your design system.

## Gap Classes

| Class Name   | `gap` Value      | Preview                                                                                                                     |
| ------------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `wa-gap-0`   | `0`              | <div class="preview-wrapper wa-cluster wa-gap-0"><div class="preview-block"></div><div class="preview-block"></div></div>   |
| `wa-gap-3xs` | `--wa-space-3xs` | <div class="preview-wrapper wa-cluster wa-gap-3xs"><div class="preview-block"></div><div class="preview-block"></div></div> |
| `wa-gap-2xs` | `--wa-space-2xs` | <div class="preview-wrapper wa-cluster wa-gap-2xs"><div class="preview-block"></div><div class="preview-block"></div></div> |
| `wa-gap-xs`  | `--wa-space-xs`  | <div class="preview-wrapper wa-cluster wa-gap-xs"><div class="preview-block"></div><div class="preview-block"></div></div>  |
| `wa-gap-s`   | `--wa-space-s`   | <div class="preview-wrapper wa-cluster wa-gap-s"><div class="preview-block"></div><div class="preview-block"></div></div>   |
| `wa-gap-m`   | `--wa-space-m`   | <div class="preview-wrapper wa-cluster wa-gap-m"><div class="preview-block"></div><div class="preview-block"></div></div>   |
| `wa-gap-l`   | `--wa-space-l`   | <div class="preview-wrapper wa-cluster wa-gap-l"><div class="preview-block"></div><div class="preview-block"></div></div>   |
| `wa-gap-xl`  | `--wa-space-xl`  | <div class="preview-wrapper wa-cluster wa-gap-xl"><div class="preview-block"></div><div class="preview-block"></div></div>  |
| `wa-gap-2xl` | `--wa-space-2xl` | <div class="preview-wrapper wa-cluster wa-gap-2xl"><div class="preview-block"></div><div class="preview-block"></div></div> |
| `wa-gap-3xl` | `--wa-space-3xl` | <div class="preview-wrapper wa-cluster wa-gap-3xl"><div class="preview-block"></div><div class="preview-block"></div></div> |
| `wa-gap-4xl` | `--wa-space-4xl` | <div class="preview-wrapper wa-cluster wa-gap-4xl"><div class="preview-block"></div><div class="preview-block"></div></div> |
| `wa-gap-5xl` | `--wa-space-5xl` | <div class="preview-wrapper wa-cluster wa-gap-5xl"><div class="preview-block"></div><div class="preview-block"></div></div> |
