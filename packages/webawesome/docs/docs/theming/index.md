---
title: Theming
description: TODO
layout: page-outline
---

Web Awesome themes apply a cohesive look and feel across the entire library. A theme is a collection of predefined CSS custom properties that cover a range of styles from colors to transitions. We call these CSS custom properties design tokens.

There are 3 pre-made Free themes to choose from and an additional 8 pre-made themes in Web Awesome Pro. You can also build your own manually with CSS or with our Pro Theme Builder.

## Key Concepts

### Color Palettes
`.wa-palette-{name}`

Color palettes give you a full spectrum of colors to use in your project. A color palette defines 10 hues — red, orange, yellow, green, cyan, blue, indigo, purple, pink, and gray — each with 11 tints.

There are 3 Free color palettes to choose from and an additional 6 color palettes in Web Awesome Pro.

While the tints have consistent lightness values across palettes, each palette has unique hue shifts and chroma to give it character so you can find just the right vibe to your project.

TODO: Add color palette preview

Your color palette is determined by `class="wa-palette-{name}"` on the `<html>` element. If no class is specified, the default color palette for your chosen theme is used.

### Variants
`.wa-{variant}-{hue}`

Variants convey a specific meaning through color. There are five variants:
- **Brand** for product recognition
- **Neutral** for generic and ordinary content
- **Success** for validity or confirmation
- **Warning** for caution or uncertainty
- **Danger** for errors or risk

Brand and neutral are used by nearly every element, component, and pattern across the library. Success, warning, and danger are used selectively by components that could benefit from semantic reinforcement, such as buttons and callouts.

TODO: Add variant scale preview

Any hue from a color palette can be assigned to a variant. Each variant is determined by `class="wa-{variant}-{hue}"` on the `<html>` element. If no class is specified:
- **Brand** defaults to <wa-icon name="square" style="color: var(--wa-color-blue);"></wa-icon> **blue**
- **Neutral** defaults to <wa-icon name="square" style="color: var(--wa-color-gray);"></wa-icon> **gray**
- **Success** defaults to <wa-icon name="square" style="color: var(--wa-color-green);"></wa-icon> **green**
- **Warning** defaults to <wa-icon name="square" style="color: var(--wa-color-yellow);"></wa-icon> **yellow**
- **Danger** defaults to <wa-icon name="square" style="color: var(--wa-color-red);"></wa-icon> **red**

### Themes
`.wa-theme-{name}`

Themes assign specific tints from your chosen variant colors — along with qualities like fonts, borders, space, and shadows — to design tokens that style elements and components. Themes may also contain custom CSS overrides to change the default look of components.

TODO: Add theme preview

Your color palette is determined by `class="wa-theme-{name}"` on the `<html>` element. If no class is specified, the default theme is used.

### Light and Dark Modes
`.wa-light` | `.wa-dark`

Every theme is designed to adapt to light and dark mode. Light mode styles are applied by default, but you can apply a specific color scheme to an entire page or just a section with `class="wa-light"` or `class="wa-dark"`.

```html {.example}
<div class="wa-grid">

  <wa-card class="wa-light">
    <div slot="header" class="wa-split">
      <h4 class="wa-heading-m">Light</h4>
      <wa-icon name="brightness"></wa-icon>
    </div>
    <div class="wa-stack">
      <wa-input label="# of Waffles" type="number" value="3"></wa-input>
      <wa-select label="Toppings" multiple value="jelly-beans">
        <wa-option value="whipped-cream">Whipped cream</wa-option>
        <wa-option value="hershey">Hershey's Kisses</wa-option>
        <wa-option value="jelly-beans">Jelly beans</wa-option>
      </wa-select>
      <wa-button appearance="filled" variant="brand">
        <wa-icon slot="start" name="waffle"></wa-icon>
        Make Waffles
      </wa-button>
    </div>
  </wa-card>

  <wa-card class="wa-dark">
    <div slot="header" class="wa-split">
      <h4 class="wa-heading-m">Dark</h4>
      <wa-icon name="moon-stars"></wa-icon>
    </div>
    <div class="wa-stack">
      <wa-input label="# of Waffles" type="number" value="3"></wa-input>
      <wa-select label="Toppings" multiple value="jelly-beans">
        <wa-option value="whipped-cream">Whipped cream</wa-option>
        <wa-option value="hershey">Hershey's Kisses</wa-option>
        <wa-option value="jelly-beans">Jelly beans</wa-option>
      </wa-select>
      <wa-button appearance="filled" variant="brand">
        <wa-icon slot="start" name="waffle"></wa-icon>
        Make Waffles
      </wa-button>
    </div>
  </wa-card>

</div>
```

#### Inverting the Color Scheme
`.wa-invert`

You can force a section to behave like `.wa-dark` in light mode and like `.wa-light` in dark mode by using `class="wa-invert"`.

```html {.example}
<p>This card will always use the opposite of the color scheme applied to the docs.</p>

<wa-card class="wa-invert">
  <div slot="header" class="wa-split">
    <h4 class="wa-heading-m">Invert</h4>
    <wa-icon name="swap"></wa-icon>
  </div>
  <div class="wa-flank:end wa-align-items-end">
    <wa-select label="Location" value="upside-down">
      <wa-option value="lab">Hawkins Lab</wa-option>
      <wa-option value="mall">Starcourt Mall</wa-option>
      <wa-option value="upside-down">The Upside Down</wa-option>
    </wa-select>
    <wa-button id="go-button" appearance="filled" variant="brand">
      <wa-icon label="Go" name="person-to-portal" family="duotone"></wa-icon>
    </wa-button>
    <wa-tooltip for="go-button">
      Go!
    </wa-tooltip>
  </div>
</wa-card>
```

#### Detecting Color Scheme Preference

TODO

## Bringing it Together

TODO

## Creating Your Own

TODO