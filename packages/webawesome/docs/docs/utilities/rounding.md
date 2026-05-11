---
title: Rounding Utilities
description: Border radius utilities set an element's border radius property.
layout: docs
tags: styleUtilities
synonyms:
  - border radius
  - rounded corners
  - pill shape
use-cases:
  - rounded
  - circle
  - pill button
---

<style>
  .preview-block {
    background-color: var(--wa-color-neutral-fill-loud);
    min-block-size: 2em;
  }
</style>

These utility classes round the corners of any element using the radius tokens from your theme, so buttons, cards, images, and custom components can all share the same corner style without hard-coded values. Common uses include rounding an image inside a [frame](/docs/utilities/frame), shaping an avatar into a circle, or giving a tag a pill silhouette.

Each class corresponds to one of the [`--wa-border-radius-*`](/docs/tokens/borders/#radius) tokens in your theme, so the corner style you pick automatically updates if you adjust your theme's rounding scale.

## Rounding Classes

| Class Name                | `border-radius` Value       | Preview                                                                                 |
| ------------------------- | --------------------------- | --------------------------------------------------------------------------------------- |
| `wa-border-radius-s`      | `--wa-border-radius-s`      | <div class="preview-block" style="border-radius: var(--wa-border-radius-s)"></div>      |
| `wa-border-radius-m`      | `--wa-border-radius-m`      | <div class="preview-block" style="border-radius: var(--wa-border-radius-m)"></div>      |
| `wa-border-radius-l`      | `--wa-border-radius-l`      | <div class="preview-block" style="border-radius: var(--wa-border-radius-l)"></div>      |
| `wa-border-radius-pill`   | `--wa-border-radius-pill`   | <div class="preview-block" style="border-radius: var(--wa-border-radius-pill)"></div>   |
| `wa-border-radius-circle` | `--wa-border-radius-circle` | <div class="preview-block" style="border-radius: var(--wa-border-radius-circle)"></div> |
| `wa-border-radius-square` | `--wa-border-radius-square` | <div class="preview-block" style="border-radius: var(--wa-border-radius-square)"></div> |
