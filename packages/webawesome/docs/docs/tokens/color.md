---
title: Color
description: Ensure consistent use of color and readable contrast with Web Awesome's color properties.
hasOutline: true
synonyms:
  - palette
  - color system
  - color tokens
use-cases:
  - theme colors
  - brand palette
  - semantic colors
---

<style>
  /* Palette swatches */
  .palette-swatches {
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    gap: var(--wa-space-3xs);
    margin-block-start: var(--wa-space-l);
    margin-block-end: var(--wa-space-m);
  }
  .palette-swatch {
    display: block;
    position: relative;
    aspect-ratio: 1.5 / 1;

    &::before {
      content: var(--tint);
      position: absolute;
      top: calc(-1 * var(--wa-space-l));
      left: 50%;
      transform: translateX(-50%);
      font-size: var(--wa-font-size-xs);
      color: var(--wa-color-text-quiet);
      font-weight: var(--wa-font-weight-action);
      text-align: center;
      z-index: 2;
    }
  }
  .swatch-button {
    all: revert;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    cursor: pointer;
    background-color: var(--color);
    border-radius: var(--wa-border-radius-m);
    transition: transform 0.1s ease, translate 0.1s ease, box-shadow 0.1s ease;

    &:hover {
      transform: scale(1.075);
      box-shadow: var(--wa-shadow-s);
      z-index: 1;
    }

    &:active {
      translate: 0 1px;
      box-shadow: none;
    }
  }
  @media (max-width: 576px) {
    .palette-swatches {
      grid-template-columns: repeat(6, 1fr);
      gap: var(--wa-space-2xs);
      row-gap: var(--wa-space-l);
    }
    .palette-swatch {
      &::before {
        font-size: var(--wa-font-size-2xs);
        top: calc(-1 * var(--wa-space-m));
      }
    }
  }

  .color-mix-example {
    background-image:
      linear-gradient(
        to right,
        color-mix(in oklab, transparent, var(--mix-color)) 25%,
        color-mix(in oklab, var(--wa-color-brand-fill-loud), var(--mix-color)) 25%,
        color-mix(in oklab, var(--wa-color-brand-fill-loud), var(--mix-color)) 75%,
        var(--wa-color-brand-fill-loud) 75%
      );
    border: none;
    color: var(--wa-color-brand-on-loud);
    text-align: center;
  }
</style>

Web Awesome's color system is made up of three layers: a [color palette](/docs/color-palettes) that gives you a full spectrum of hues, [variant colors](#variant-colors) that define semantic color variations (like success and danger), and [colors for themed elements](#color-for-themed-elements) that apply specific tints from your palette and variant colors to the elements that make up a theme.

For an overview of how theming works across the library, see [Theming <wa-icon name="arrow-right" variant="regular"></wa-icon>](/docs/theming-overview).

## Color Palette

[Color palettes](/docs/color-palettes) give you a full spectrum of colors to use in your project and are the lowest-level color tokens. Each color palette includes 10 different hues, each with 11 numeric tints that make up a color scale from light to dark — `95` is near white, `05` is near black.

These numeric tints help ensure accessible color contrast per [WCAG 2.1 success criteria](https://www.w3.org/TR/WCAG21/#contrast-minimum):

- A difference of 40 provides a minimum 3:1 contrast ratio, suitable for large text and icons (AA)
- A difference of 50 provides a minimum 4.5:1 contrast ratio, suitable for normal text (AA) and large text (AAA)
- A difference of 60 provides a minimum 7:1 contrast ratio, suitable for all text (AAA)

{% include 'theming/color-palette-viewer.njk' %}

### Core Colors

In addition to numeric tints, each hue has a _core color_ — the most colorful, vibrant tint in the scale. The exact tint varies by palette. Use `--wa-color-{hue}` when you want a representative color for a hue without specifying a tint.

The tint for each core color is stored as an integer in `--wa-color-{hue}-key`. These tokens are used internally to determine a compatible text color when using the core color as a background and are not used directly by components.

Using this key, the color system derives a paired _on color_ guaranteed to meet WCAG 2.1 AA contrast when placed on top of the corresponding core color. If the core tint is light (≥ 60), the on color is a dark shade of that hue; otherwise it is white. Use `--wa-color-{hue}-on` any time you render text or icons on a core color background.

<wa-scroller>
  <table class="token-table wa-hover-rows">
    <thead>
      <tr>
        <th>Core Color</th>
        <th>Key</th>
        <th>On Color</th>
        <th>Preview</th>
      </tr>
    </thead>
    <tbody>
      {% for hue in ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'indigo', 'purple', 'pink', 'gray'] -%}
      <tr>
        <td class="token-name"><code>--wa-color-{{ hue }}</code></td>
        <td class="token-name"><code>--wa-color-{{ hue }}-key</code></td>
        <td class="token-name"><code>--wa-color-{{ hue }}-on</code></td>
        <td>
          <div class="swatch" style="background-color: var(--wa-color-{{ hue }}); color: var(--wa-color-{{ hue }}-on)">
            Aa
          </div>
        </td>
      </tr>
      {%- endfor %}
    </tbody>
  </table>
</wa-scroller>

## Variant Colors

Variant colors are aliases for specific hues in your color palette to give them an extra layer of semantic meaning. These variants are familiar, meaningful hues that reinforce a specific message or intended use:

| Variant | Use                          | Default                                                                         |
| ------- | ---------------------------- | ------------------------------------------------------------------------------- |
| Brand   | Product recognition          | <wa-icon name="square" style="color: var(--wa-color-blue);"></wa-icon> blue     |
| Neutral | Generic and ordinary content | <wa-icon name="square" style="color: var(--wa-color-gray);"></wa-icon> gray     |
| Success | Validity or confirmation     | <wa-icon name="square" style="color: var(--wa-color-green);"></wa-icon> green   |
| Warning | Caution or uncertainty       | <wa-icon name="square" style="color: var(--wa-color-yellow);"></wa-icon> yellow |
| Danger  | Errors or risk               | <wa-icon name="square" style="color: var(--wa-color-red);"></wa-icon> red       |

Brand and neutral are used by nearly every element, component, and pattern across the library. Success, warning, and danger are used selectively by components that could benefit from semantic reinforcement, such as buttons and callouts.

Each variant color is an alias for a palette color and follows the same token format: `--wa-color-{variant}-{tint}`.

{% set colorScales = ["brand", "neutral", "success", "warning", "danger"] %}
{% include "theming/color-palette-viewer.njk" %}

### Core Colors

Just like the hues in your color palette, each variant has a _core color_ — an alias for the most colorful, vibrant tint in the color scale selected for your variant. Use `--wa-color-{variant}` when you want a representative color for a variant without specifying a tint.

Each core color also has a paired _on color_ (`--wa-color-{variant}-on`) guaranteed to meet WCAG 2.1 AA contrast when placed on top of it. Use on color tokens any time you render text or icons on a core color background.

<wa-scroller>
  <table class="token-table wa-hover-rows">
    <thead>
      <tr>
        <th>Core Color</th>
        <th>On Color</th>
        <th>Preview</th>
      </tr>
    </thead>
    <tbody>
      {% for variant in ['brand', 'neutral', 'success', 'warning', 'danger'] -%}
      <tr>
        <td class="token-name"><code>--wa-color-{{ variant }}</code></td>
        <td class="token-name"><code>--wa-color-{{ variant }}-on</code></td>
        <td>
          <div class="swatch" style="background-color: var(--wa-color-{{ variant }}); color: var(--wa-color-{{ variant }}-on)">
            Aa
          </div>
        </td>
      </tr>
      {%- endfor %}
    </tbody>
  </table>
</wa-scroller>

### Changing Variant Colors

Any hue from your color palette can be assigned to any variant without redefining the tokens in your own stylesheet. To use a different hue, simply apply the class `"wa-{variant}-{hue}` to the `<html>` element.

```html
<html class="wa-brand-purple wa-success-cyan"></html>
```

All ten palette hues — `red`, `orange`, `yellow`, `green`, `cyan`, `blue`, `indigo`, `purple`, `pink`, and `gray` — are available for every variant.

## Color for Themed Elements

These tokens apply specific tints from your color palette and variant colors to the elements and components that make up a theme. They're named for the role they play rather than their appearance, and adapt to light and dark modes.

### Surfaces

Surfaces are background layers that content rests on. They convey elevation hierarchy — `raised` is closest to the user (e.g., dialogs) and `lowered` is farthest away (e.g., wells).

<wa-scroller>
  <table class="token-table wa-hover-rows">
    <thead>
      <tr>
        <th>Custom Property</th>
        <th>Description</th>
        <th>Preview</th>
      </tr>
    </thead>
    <tbody>
      <tr id="token-wa-color-surface-raised">
        <td class="token-name"><code>--wa-color-surface-raised</code></td>
        <td>Background for elevated surfaces like dialogs and dropdown menus</td>
        <td><div class="swatch" style="background-color: var(--wa-color-surface-raised); box-shadow: var(--wa-shadow-s)"></div></td>
      </tr>
      <tr id="token-wa-color-surface-default">
        <td class="token-name"><code>--wa-color-surface-default</code></td>
        <td>Default page or container background</td>
        <td><div class="swatch" style="background-color: var(--wa-color-surface-default)"></div></td>
      </tr>
      <tr id="token-wa-color-surface-lowered">
        <td class="token-name"><code>--wa-color-surface-lowered</code></td>
        <td>Background for recessed surfaces like wells and code blocks</td>
        <td><div class="swatch" style="background-color: var(--wa-color-surface-lowered); box-shadow: inset var(--wa-shadow-s)"></div></td>
      </tr>
      <tr id="token-wa-color-surface-border">
        <td class="token-name"><code>--wa-color-surface-border</code></td>
        <td>Border color used to delineate surface areas</td>
        <td><div class="swatch" style="border-color: var(--wa-color-surface-border)"></div></td>
      </tr>
    </tbody>
  </table>
</wa-scroller>

### Text

Text colors are used for readable content. We recommend a minimum 4.5:1 contrast ratio against surface colors for text colors.

<wa-scroller>
  <table class="token-table wa-hover-rows">
    <thead>
      <tr>
        <th>Custom Property</th>
        <th>Description</th>
        <th>Preview</th>
      </tr>
    </thead>
    <tbody>
      <tr id="token-wa-color-text-normal">
        <td class="token-name"><code>--wa-color-text-normal</code></td>
        <td>Primary text color for most content</td>
        <td><div style="color: var(--wa-color-text-normal); font-weight: var(--wa-font-weight-semibold)">AaBb</div></td>
      </tr>
      <tr id="token-wa-color-text-quiet">
        <td class="token-name"><code>--wa-color-text-quiet</code></td>
        <td>Subdued text for hints, captions, and other secondary content</td>
        <td><div style="color: var(--wa-color-text-quiet); font-weight: var(--wa-font-weight-semibold)">AaBb</div></td>
      </tr>
      <tr id="token-wa-color-text-link">
        <td class="token-name"><code>--wa-color-text-link</code></td>
        <td>Color for hyperlinks</td>
        <td><div style="color: var(--wa-color-text-link); font-weight: var(--wa-font-weight-semibold)">AaBb</div></td>
      </tr>
    </tbody>
  </table>
</wa-scroller>

### Overlays

Overlays provide a backdrop that isolates content, often with some transparency so background context shows through.

<wa-scroller>
  <table class="token-table wa-hover-rows">
    <thead>
      <tr>
        <th>Custom Property</th>
        <th>Description</th>
        <th>Preview</th>
      </tr>
    </thead>
    <tbody>
      <tr id="token-wa-color-overlay-modal">
        <td class="token-name"><code>--wa-color-overlay-modal</code></td>
        <td>Semi-transparent backdrop behind modal dialogs</td>
        <td><div class="swatch" style="background-color: var(--wa-color-overlay-modal)"></div></td>
      </tr>
      <tr id="token-wa-color-overlay-inline">
        <td class="token-name"><code>--wa-color-overlay-inline</code></td>
        <td>Subtle overlay for inline highlights or dimmed regions</td>
        <td><div class="swatch" style="background-color: var(--wa-color-overlay-inline)"></div></td>
      </tr>
    </tbody>
  </table>
</wa-scroller>

### Shadow

A single color is used for all drop shadows. Use it alongside the [shadow tokens](?active_tab=shadows) to construct realistic shadows.

<wa-scroller>
  <table class="token-table wa-hover-rows">
    <thead>
      <tr>
        <th>Custom Property</th>
        <th>Description</th>
        <th>Preview</th>
      </tr>
    </thead>
    <tbody>
      <tr id="token-wa-color-shadow">
        <td class="token-name"><code>--wa-color-shadow</code></td>
        <td>Color used for all component drop shadows</td>
        <td><div class="swatch" style="background-color: var(--wa-color-surface-raised); box-shadow: var(--wa-shadow-l)"></div></td>
      </tr>
    </tbody>
  </table>
</wa-scroller>

### Interactions

These tokens power the consistent hover, active, and focus feedback you see across interactive components. The `--wa-color-focus` token sets the color of the keyboard focus ring. The `--wa-color-mix-hover` and `--wa-color-mix-active` tokens are overlays — they're mixed into a component's background via [`color-mix()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix) to subtly shift it on hover and press, so every interactive component reacts consistently without each one defining its own hover/active palette.

<wa-scroller>
  <table class="token-table wa-hover-rows">
    <thead>
      <tr>
        <th>Custom Property</th>
        <th>Description</th>
        <th>Preview</th>
      </tr>
    </thead>
    <tbody>
      <tr id="token-wa-color-focus">
        <td class="token-name"><code>--wa-color-focus</code></td>
        <td>Outline color for keyboard focus rings. Used alongside <a href="?active_tab=focus">focus tokens</a>.</td>
        <td><div class="swatch" style="outline: var(--wa-focus-ring)"></div></td>
      </tr>
      <tr id="token-wa-color-mix-hover">
        <td class="token-name"><code>--wa-color-mix-hover</code></td>
        <td>Color blended into a component's fill on hover</td>
        <td><div class="swatch color-mix-example" style="--mix-color: var(--wa-color-mix-hover)"><small>mix</small></div></td>
      </tr>
      <tr id="token-wa-color-mix-active">
        <td class="token-name"><code>--wa-color-mix-active</code></td>
        <td>Color blended into a component's fill on press</td>
        <td><div class="swatch color-mix-example" style="--mix-color: var(--wa-color-mix-active)"><small>mix</small></div></td>
      </tr>
    </tbody>
  </table>
</wa-scroller>

### Semantic Variants

Semantic variants use the `--wa-color-{variant}-{tint}` tokens from your [variant colors](#variant-colors) to power the `variant=""` attribute shared by buttons, badges, callouts, and many other components. Each variant is a complete, self-contained color system built from five groups — `brand`, `success`, `neutral`, `warning`, and `danger` — each defining fills, borders, and on colors at three attention levels.

Tokens follow the format `--wa-color-{variant}-{role}-{attention}`. The three **roles** are:

- **Fill** for backgrounds or areas larger than a few pixels
- **Border** for borders, dividers, and strokes
- **On** for content displayed _on top of_ a fill (pair `on-loud` with `fill-loud`)

The three **attention** levels are `quiet`, `normal`, and `loud` — from least to most visually prominent.

{% set variants = ['brand', 'neutral', 'success', 'warning', 'danger'] %}
<wa-scroller>

  <table class="token-table wa-hover-rows">
    <thead>
      <tr>
        <th>Custom Property</th>
        {% for variant in variants -%}
          <th><code>{{ variant }}</code></th>
        {%- endfor %}
      </tr>
    </thead>
    <tbody>
      {% for type in ['fill', 'border', 'on'] -%}
        {% for attention in ['quiet', 'normal', 'loud'] -%}
          <tr id="token-color-{{ type }}-{{ attention }}">
            <td class="token-name"><code>--wa-color-*-{{ type }}-{{ attention }}</code></td>
            {% for variant in variants -%}
              <td>
                {%- if type == 'border' -%}
                  <div class="swatch" style="border-color: var(--wa-color-{{ variant }}-{{ type }}-{{ attention }})"></div>
                {%- else -%}
                  <div class="swatch" style="background-color: var(--wa-color-{{ variant }}-fill-{{ attention }}); color: var(--wa-color-{{ variant }}-on-{{ attention }})">{{ 'Aa' if type == 'on' }}</div>
                {%- endif %}
              </td>
            {%- endfor %}
          </tr>
        {%- endfor %}
      {%- endfor %}
    </tbody>
  </table>
</wa-scroller>
