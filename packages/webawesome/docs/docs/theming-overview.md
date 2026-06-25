---
title: Theming
description: Style your project with Web Awesome's theming system — color palettes, variants, themes, and dark mode.
layout: page-outline
---

{% from "pro-badge.njk" import proBadge %}

Web Awesome themes apply a cohesive look and feel across the entire library, built from stackable layers — a [theme](/docs/themes), a [color palette](/docs/color-palettes), [variants](/docs/tokens/color#variant-colors), and a light or dark color scheme — that you mix and match with classes on the `<html>` element.

:::info
**Try it live!** Use the <wa-tag class="tag-ui" appearance="outlined"><wa-icon name="palette" variant="regular"></wa-icon></wa-tag> Theme and <wa-tag class="tag-ui" appearance="outlined"><wa-icon name="sun-bright" variant="regular"></wa-icon></wa-tag> Color Scheme selectors in this site's header to preview themes or switch light/dark modes.
:::

## Key Concepts

### Themes

`.wa-theme-{name}`

A theme is the overall look — fonts, borders, space, shadows, and how each [variant](/docs/tokens/color#variant-colors) gets used across components. Two themes can share a [palette](/docs/color-palettes) and [variants](/docs/tokens/color#variant-colors) and still feel completely different. Themes ship with a default palette and may include custom CSS overrides for individual components.

<wa-carousel class="theme-showcase" pagination loop mouse-dragging>
  {% for theme in themer.themes %}
  <wa-carousel-item>
    <figure>
      <div class="theme-frame">
        <img class="theme-img-light" src="/assets/images/themes/{{ theme.filename | stripExtension }}-light.png" alt="{{ theme.name }} theme preview (light)" loading="lazy" />
        <img class="theme-img-dark" src="/assets/images/themes/{{ theme.filename | stripExtension }}-dark.png" alt="{{ theme.name }} theme preview (dark)" loading="lazy" />
      </div>
      <figcaption class="wa-stack wa-gap-3xs">
        <div class="wa-cluster wa-gap-xs wa-font-size-m">
          <strong>{{ theme.name }}</strong>
          {% if theme.isPro %}{{ proBadge({ description: "This theme requires access to " ~ site.namePro }) }}{% endif %}
        </div>
        <div class="wa-font-size-s">{{ theme.description }}</div>
      </figcaption>
    </figure>
  </wa-carousel-item>
  {% endfor %}
</wa-carousel>

<style>
  .theme-showcase {
    --aspect-ratio: 16 / 9;
    width: 100%;
    /* Match the docs' major-block rhythm (#content rules in docs.css). */
    margin-block: var(--wa-space-xl);
  }
  .theme-showcase::part(base) {
    column-gap: 0;
  }
  
  .theme-showcase figure {
    margin: 0;
    height: 100%;
    position: relative;
    /* Card-like wrapper: border, padding, background. Matches wa-card's surface and inner spacing. */
    box-sizing: border-box;
    border: var(--wa-border-style) var(--wa-panel-border-width) var(--wa-color-neutral-border-quiet);
    border-radius: var(--wa-panel-border-radius);
    background: var(--wa-color-surface-default);
    padding: var(--wa-space-s);
  }

  .theme-showcase .theme-frame {
    position: relative;
    height: 100%;
    overflow: hidden;
    border-radius: var(--wa-border-radius-s);
  }

  .theme-showcase img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Anchor slightly off the top-left so the comparison scrubber on the screenshot's left edge gets cropped. */
    object-position: -3% -1%;
    background: var(--wa-color-surface-default);
    /* Scale up to fill the carousel with the theme's UI content,
       cropping the screenshot's outer gray padding. Source PNGs are
       2928x1636 so 1.4x stays well below natural dimensions at any
       reasonable viewport width. */
    transform: scale(1.4);
    transform-origin: top left;
  }

  /* Swap between light and dark screenshots based on the docs' explicit color scheme toggle. */
  .theme-showcase .theme-img-dark {
    display: none;
  }
  .wa-dark .theme-showcase .theme-img-light {
    display: none;
  }
  .wa-dark .theme-showcase .theme-img-dark {
    display: block;
  }

  .theme-showcase figcaption {
    position: absolute;
    /* Inset to match the figure's padding so the caption sits inside the card frame, not over the border. */
    inset-inline: var(--wa-space-s);
    inset-block-end: var(--wa-space-s);
    padding: var(--wa-space-m);
    color: var(--wa-color-neutral-on-loud);
    /* Slightly transparent dark scrim — denser than --wa-color-overlay-modal so the title reads cleanly. */
    background: color-mix(in oklab, var(--wa-color-neutral-fill-loud), transparent 10%);
    border-radius: 0 0 var(--wa-border-radius-m) var(--wa-border-radius-m);
  }
</style>

Your theme is determined by `class="wa-theme-{name}"` on the `<html>` element. If no class is specified, the default theme is used.

<wa-button appearance="outlined" size="s" href="/docs/themes">
  Browse Built-in Themes
  <wa-icon slot="end" name="arrow-right"></wa-icon>
</wa-button>

### Color Palettes

`.wa-palette-{name}`

A color palette is the full set of 10 hues — red, orange, yellow, green, cyan, blue, indigo, purple, pink, and gray — each with 11 tints from `05` (darkest) to `95` (lightest), all available as [color design tokens](/docs/tokens/color).

Each palette has its own hue shifts and chroma, so swapping palettes changes the entire feel of your project — especially alongside a [theme](/docs/themes) and [variant colors](/docs/tokens/color#variant-colors). Your palette is determined by `class="wa-palette-{name}"` on the `<html>` element; if no class is specified, the default palette is used.

{% include 'theming/color-palette-viewer.njk' %}

<wa-button appearance="outlined" size="s" href="/docs/color-palettes">
  Browse All Palettes
  <wa-icon slot="end" name="arrow-right"></wa-icon>
</wa-button>

### Variants

`.wa-{variant}-{hue}`

Variants assign palette hues to five semantic roles — `brand`, `neutral`, `success`, `warning`, and `danger` — so components like buttons and callouts can convey meaning through color. Any hue from your palette can be assigned to any variant with `class="wa-{variant}-{hue}"`. Apply the class to the `<html>` element to set variants globally, to a wrapper to scope them to one section, or to a single component to override just that element. For deeper customization, [override the `--wa-color-{variant}-*` tokens](/docs/customizing#customizing-with-css) in your own CSS.

{% set colorScales = ["brand", "neutral", "success", "warning", "danger"] %}
{% include 'theming/color-palette-viewer.njk' %}

<wa-button appearance="outlined" size="s" href="/docs/tokens/color#variant-colors">
  See Variant Tokens
  <wa-icon slot="end" name="arrow-right"></wa-icon>
</wa-button>

### Light and Dark Mode

<span class="wa-cluster">`.wa-light` `.wa-dark`</span>

Every theme is designed to adapt to light and dark mode. Light mode applies by default; apply `class="wa-light"` or `class="wa-dark"` to set the color scheme on the page or any section. To invert sections, detect user preference, or apply dark mode automatically, head over to [Customizing & Theming](/docs/customizing#light-and-dark-mode).

```html {.example .no-theme}
{% include 'theming/light-dark-example.njk' %}
```

<wa-button appearance="outlined" size="s" href="/docs/customizing#light-and-dark-mode">
  Using Dark Mode
  <wa-icon slot="end" name="arrow-right"></wa-icon>
</wa-button>

## Using Themes

For tailored guidance, select your theme, color palette, and variant colors below, then follow the instructions for your preferred method.

{% include 'theming/instructions.njk' %}

## Creating Your Own

You can build a custom theme with the [Theme Builder](/docs/customizing#theme-builder) to customize colors, fonts, roundness, spacing, and icons visually, or with [custom CSS](/docs/customizing#customizing-with-css) by overriding [design tokens](/docs/tokens) in your own stylesheet.

## Quick Reference

| Task                    | How To                                                                                           | Learn More                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| Change my brand color   | Add `class="wa-brand-{hue}"` to `<html>`                                                         | [Changing Variants](/docs/tokens/color#changing-variant-colors) |
| Switch color palettes   | Load the palette stylesheet, then add `class="wa-palette-{name}"` to `<html>`                    | [Browse Palettes](/docs/color-palettes)                         |
| Use a different theme   | Load the theme stylesheet, then add `class="wa-theme-{name}"` to `<html>`                        | [Built-in Themes](/docs/themes)                                 |
| Toggle dark mode        | Add `class="wa-dark"` to `<html>` (or any section)                                               | [Light and Dark Mode](/docs/customizing#light-and-dark-mode)    |
| Override a single token | Define a `--wa-*` custom property associated with a [design token](/docs/tokens) in your own CSS | [Customizing With CSS](/docs/customizing#customizing-with-css)  |
