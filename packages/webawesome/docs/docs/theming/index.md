---
title: Theming
description: TODO
layout: page-outline
---

Web Awesome themes apply a cohesive look and feel across the entire library. A theme is a collection of predefined CSS custom properties that cover a range of styles from colors to transitions. We call these CSS custom properties design tokens.

There are 11 handcrafted themes to choose from; 3 are free to use with an additional 9 available in Web Awesome Pro. You can also build your own manually with CSS or with our Pro Theme Builder.

## Key Concepts

Themes are made up of several layers of increasing specificity, each represented by a CSS class on the document.

### Color Palette
`.wa-palette-{name}`

Color palettes give you a full spectrum of colors to use in your project. A color palette defines 10 hues — red, orange, yellow, green, cyan, blue, indigo, purple, pink, and gray — each with 11 tints. Tints are assigned numbers that correlate to their lightness.

There are 9 specially crafted color palettes; 3 are free to use with an additional 6 available in Web Awesome Pro.

{% include 'theming/color-palettes.njk' %}

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

{% include 'theming/variants.njk' %}

Any hue from a color palette can be assigned to a variant. Each variant is determined by `class="wa-{variant}-{hue}"` on the `<html>` element. If no class is specified:
- **Brand** defaults to <wa-icon name="square" style="color: var(--wa-color-blue);"></wa-icon> **blue**
- **Neutral** defaults to <wa-icon name="square" style="color: var(--wa-color-gray);"></wa-icon> **gray**
- **Success** defaults to <wa-icon name="square" style="color: var(--wa-color-green);"></wa-icon> **green**
- **Warning** defaults to <wa-icon name="square" style="color: var(--wa-color-yellow);"></wa-icon> **yellow**
- **Danger** defaults to <wa-icon name="square" style="color: var(--wa-color-red);"></wa-icon> **red**

### Theme Styles
`.wa-theme-{name}`

Theme styles assign specific tints from your chosen variant colors — along with qualities like fonts, borders, space, and shadows — to design tokens that style elements and components. Themes may also contain custom CSS overrides to change the default look of components.

TODO: Add theme preview

Your theme is determined by `class="wa-theme-{name}"` on the `<html>` element. If no class is specified, the default theme is used.

### Light and Dark Mode
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

While both light and dark mode styles are built-in to all themes, Web Awesome doesn't automatically detect the user's color scheme preference. We recommend doing this at the application level.

Follow these best practices for supporting both light and dark mode:
- Check for [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme) and use its value by default
- Allow the user to override this setting in your app
- Remember the user's preference and restore it on subsequent visits

Let's assume you store the user's color scheme preference for your app in a variable called `colorScheme` (values: `auto` | `light` | `dark`). You can use the following JS snippet to apply `class="wa-dark"` to the `<html>` element accordingly:

```js
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
const applyDark = function (event = systemDark) {
  const isDark = colorScheme === 'auto' ? event.matches : colorScheme === 'dark';
  document.documentElement.classList.toggle('wa-dark', isDark);
};
systemDark.addEventListener('change', applyDark);
applyDark();
```

## Using Themes

TODO

## Creating Your Own

TODO