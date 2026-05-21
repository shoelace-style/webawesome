---
title: Theming
description: Style your project with Web Awesome's theming system — color palettes, variants, themes, and dark mode.
layout: page-outline
---

Web Awesome themes apply a cohesive look and feel across the entire library, built from stackable layers — a [theme](/docs/themes), a [color palette](/docs/color-palettes), [variants](/docs/tokens/color#variant-colors), and a light or dark color scheme — that you mix and match with classes on the `<html>` element.

:::info
**Try it live!** Use the <wa-tag class="tag-ui" appearance="outlined"><wa-icon name="palette" variant="regular"></wa-icon></wa-tag> Theme  and <wa-tag class="tag-ui" appearance="outlined"><wa-icon name="sun-bright" variant="regular"></wa-icon></wa-tag> Color Scheme selectors in this site's header to preview themes or switch light/dark modes.
:::

## Key Concepts

### Themes

`.wa-theme-{name}`

A theme is the overall look — fonts, borders, space, shadows, and how each [variant](/docs/tokens/color#variant-colors) gets used across components. Two themes can share a [palette](/docs/color-palettes) and [variants](/docs/tokens/color#variant-colors) and still feel completely different. Themes ship with a default palette and may include custom CSS overrides for individual components.

```html {.example}
<link rel="stylesheet" href="/dist/styles/themes/default.css" />
<link rel="stylesheet" href="/dist/styles/themes/shoelace.css" />
<link rel="stylesheet" href="/dist/styles/themes/awesome.css" />

<wa-scroller>
  <div class="wa-cluster wa-flex-nowrap wa-align-items-stretch">
    <wa-card>
      <span slot="header" class="wa-heading-s wa-color-text-quiet">Default Theme</span>
      <div class="wa-theme-default wa-stack">
        <wa-input label="# of Scoops" type="number" value="2"></wa-input>
        <wa-select label="Flavor" value="chocolate">
          <wa-option value="vanilla">Vanilla</wa-option>
          <wa-option value="chocolate">Chocolate</wa-option>
          <wa-option value="strawberry">Strawberry</wa-option>
          <wa-option value="mint-chip">Mint Chip</wa-option>
        </wa-select>
        <wa-checkbox checked>Add Sprinkles</wa-checkbox>
        <wa-divider></wa-divider>
        <wa-button appearance="filled" variant="brand">
          <wa-icon slot="start" name="ice-cream"></wa-icon>
          Order Ice Cream
        </wa-button>
      </div>
    </wa-card>

    <wa-card>
      <span slot="header" class="wa-heading-s wa-color-text-quiet">Awesome Theme</span>
      <div class="wa-theme-awesome wa-palette-bright theme-showcase-balanced wa-stack">
        <wa-input label="# of Scoops" type="number" value="2"></wa-input>
        <wa-select label="Flavor" value="chocolate">
          <wa-option value="vanilla">Vanilla</wa-option>
          <wa-option value="chocolate">Chocolate</wa-option>
          <wa-option value="strawberry">Strawberry</wa-option>
          <wa-option value="mint-chip">Mint Chip</wa-option>
        </wa-select>
        <wa-checkbox checked>Add Sprinkles</wa-checkbox>
        <wa-divider></wa-divider>
        <wa-button appearance="filled" variant="brand">
          <wa-icon slot="start" name="ice-cream"></wa-icon>
          Order Ice Cream
        </wa-button>
      </div>
    </wa-card>

    <wa-card>
      <span slot="header" class="wa-heading-s wa-color-text-quiet">Shoelace Theme</span>
      <div class="wa-theme-shoelace wa-palette-shoelace wa-stack">
        <wa-input label="# of Scoops" type="number" value="2"></wa-input>
        <wa-select label="Flavor" value="chocolate">
          <wa-option value="vanilla">Vanilla</wa-option>
          <wa-option value="chocolate">Chocolate</wa-option>
          <wa-option value="strawberry">Strawberry</wa-option>
          <wa-option value="mint-chip">Mint Chip</wa-option>
        </wa-select>
        <wa-checkbox checked>Add Sprinkles</wa-checkbox>
        <wa-divider></wa-divider>
        <wa-button appearance="filled" variant="brand">
          <wa-icon slot="start" name="ice-cream"></wa-icon>
          Order Ice Cream
        </wa-button>
      </div>
    </wa-card>
  </div>
</wa-scroller>
```

Your theme is determined by `class="wa-theme-{name}"` on the `<html>` element. If no class is specified, the default theme is used.

<wa-button appearance="outlined" size="s" href="/docs/themes">
  Browse All Themes
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

Every theme is designed to adapt to light and dark mode. Light mode applies by default; apply `class="wa-light"` or `class="wa-dark"` to set the color scheme on the page or any section. To invert sections, detect user preference, or apply dark mode automatically, head over to Customizing.

```html {.example}
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
| Use a different theme   | Load the theme stylesheet, then add `class="wa-theme-{name}"` to `<html>`                        | [Browse Themes](/docs/themes)                                   |
| Toggle dark mode        | Add `class="wa-dark"` to `<html>` (or any section)                                               | [Light and Dark Mode](/docs/customizing#light-and-dark-mode)    |
| Override a single token | Define a `--wa-*` custom property associated with a [design token](/docs/tokens) in your own CSS | [Customizing With CSS](/docs/customizing#customizing-with-css)  |
