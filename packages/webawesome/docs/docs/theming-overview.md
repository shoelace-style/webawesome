---
title: Theming
description: TODO
layout: page-outline
---

Web Awesome themes apply a cohesive look and feel across the entire library. A theme is a collection of predefined CSS custom properties that cover a range of styles from colors to transitions. We call these CSS custom properties [design tokens](/docs/tokens).

There are 11 handcrafted themes to choose from; three are free to use with an additional eight available in Web Awesome Pro. [Check out the themes available to you <wa-icon name="arrow-right" variant="regular"></wa-icon>](/docs/themes)

You can also build your own manually with CSS or with our Pro Theme Builder.

## Key Concepts

Themes are made up of several layers of increasing specificity, each represented by a CSS class on the document.

### Color Palette
`.wa-palette-{name}`

Color palettes give you a full spectrum of colors to use in your project. A color palette defines 10 hues — red, orange, yellow, green, cyan, blue, indigo, purple, pink, and gray — each with 11 tints. Tints are assigned numbers that correlate to their lightness.

Both Web Awesome Core and Pro offer multiple handcrafted color palettes. [Check out the palettes available to you <wa-icon name="arrow-right" variant="regular"></wa-icon>](/docs/color-palettes)

{% include 'theming/color-palette-viewer.njk' %}

Your color palette is determined by `class="wa-palette-{name}"` on the `<html>` element. If no class is specified, the default color palette is used.

### Variants
`.wa-{variant}-{hue}`

Variants convey a specific meaning through color. There are five variants:
- **Brand** for product recognition
- **Neutral** for generic and ordinary content
- **Success** for validity or confirmation
- **Warning** for caution or uncertainty
- **Danger** for errors or risk

Brand and neutral are used by nearly every element, component, and pattern across the library. Success, warning, and danger are used selectively by components that could benefit from semantic reinforcement, such as buttons and callouts.

{% set colorScales = ["brand", "neutral", "success", "warning", "danger"] %}
{% include "theming/color-palette-viewer.njk" %}

Any hue from a color palette can be assigned to a variant. Each variant is determined by `class="wa-{variant}-{hue}"` on the `<html>` element. If no class is specified:
- **Brand** defaults to <wa-icon name="square" style="color: var(--wa-color-blue);"></wa-icon> **blue**
- **Neutral** defaults to <wa-icon name="square" style="color: var(--wa-color-gray);"></wa-icon> **gray**
- **Success** defaults to <wa-icon name="square" style="color: var(--wa-color-green);"></wa-icon> **green**
- **Warning** defaults to <wa-icon name="square" style="color: var(--wa-color-yellow);"></wa-icon> **yellow**
- **Danger** defaults to <wa-icon name="square" style="color: var(--wa-color-red);"></wa-icon> **red**

### Theme Styles
`.wa-theme-{name}`

Theme styles assign specific tints from your chosen variant colors — along with qualities like fonts, borders, space, and shadows — to design tokens that style elements and components. Themes may also contain custom CSS overrides to change the default look of components.

```html {.example}
<div class="wa-stack">
  <wa-card>
    <div class="wa-grid">
      <wa-button variant="danger">
        <wa-icon slot="start" name="hand"></wa-icon>
        Stop!
      </wa-button>
      <wa-button href="https://www.youtube.com/watch?v=otCpCn0l4Wo" target="_blank" rel="noopener noreferrer">
        <wa-icon slot="start" name="hammer"></wa-icon>
        Hammer Time!
      </wa-button>
      <wa-button variant="neutral" appearance="outlined" disabled>
        <wa-icon slot="end" name="ban"></wa-icon>
        Can't Touch This!
      </wa-button>
      <wa-button variant="brand" appearance="filled" pill href="https://www.youtube.com/watch?v=nhGShQ_g1kQ"
        target="_blank" rel="noopener noreferrer">
        <wa-icon slot="start" name="hand-peace"></wa-icon>
        Quit
      </wa-button>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-stack">
      <wa-callout variant="success" appearance="filled" style="margin: 0">
        <wa-icon slot="icon" family="duotone" variant="regular" name="user-bounty-hunter"
          style="font-size: var(--wa-font-size-l);"></wa-icon>
        <div class="wa-split">
          <span>This is the way.</span>
          <wa-button variant="success" size="s">
            Follow the Creed
          </wa-button>
        </div>
      </wa-callout>
      <wa-callout variant="warning" appearance="filled" style="margin: 0">
        <wa-icon slot="icon" family="duotone" variant="regular" name="space-station-moon"
          style="font-size: var(--wa-font-size-l);"></wa-icon>
        <div class="wa-split">
          <span>That's no moon.</span>
          <wa-button variant="warning" size="s">
            Turn Around
          </wa-button>
        </div>
      </wa-callout>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-split wa-gap-xl">
      <div class="wa-cluster">
        <wa-dropdown>
          <wa-button appearance="filled" slot="trigger" with-caret>Export</wa-button>

          <wa-dropdown-item>
            Documents
            <wa-dropdown-item slot="submenu" value="pdf">PDF</wa-dropdown-item>
            <wa-dropdown-item slot="submenu" value="docx">Word Document</wa-dropdown-item>
          </wa-dropdown-item>

          <wa-dropdown-item>
            Spreadsheets
            <wa-dropdown-item slot="submenu">
              Excel Formats
              <wa-dropdown-item slot="submenu" value="xlsx">Excel (.xlsx)</wa-dropdown-item>
              <wa-dropdown-item slot="submenu" value="xls">Excel 97-2003 (.xls)</wa-dropdown-item>
              <wa-dropdown-item slot="submenu" value="csv">CSV (.csv)</wa-dropdown-item>
            </wa-dropdown-item>

            <wa-dropdown-item slot="submenu">
              Other Formats
              <wa-dropdown-item slot="submenu" value="ods">OpenDocument (.ods)</wa-dropdown-item>
              <wa-dropdown-item slot="submenu" value="tsv">Tab-separated (.tsv)</wa-dropdown-item>
              <wa-dropdown-item slot="submenu" value="json">JSON (.json)</wa-dropdown-item>
            </wa-dropdown-item>

            <wa-dropdown-item slot="submenu" value="numbers">Apple Numbers</wa-dropdown-item>
          </wa-dropdown-item>

          <wa-divider></wa-divider>

          <wa-dropdown-item>
            Options
            <wa-dropdown-item slot="submenu" type="checkbox" value="compress">Compress files</wa-dropdown-item>
            <wa-dropdown-item slot="submenu" type="checkbox" checked value="metadata">Include metadata</wa-dropdown-item>
            <wa-dropdown-item slot="submenu" type="checkbox" value="password">Password protect</wa-dropdown-item>
          </wa-dropdown-item>
        </wa-dropdown>

        <wa-button-group label="Example Save Button">
          <wa-button appearance="filled" variant="brand">Save</wa-button>
          <wa-dropdown placement="bottom-end">
            <wa-button appearance="filled" slot="trigger" variant="brand">
              <wa-icon name="chevron-down" label="More options"></wa-icon>
            </wa-button>
            <wa-dropdown-item>Save</wa-dropdown-item>
            <wa-dropdown-item>Save as&hellip;</wa-dropdown-item>
            <wa-dropdown-item>Save all</wa-dropdown-item>
          </wa-dropdown>
        </wa-button-group>
      </div>

      <div class="wa-cluster" style="flex: 1 1 auto;">
        <div style="flex: 1 1 auto;">
          <wa-slider label="Scale" name="scale" min="0" max="100" value="50" size="s" with-tooltip></wa-slider>
        </div>

        <wa-color-picker id="example-color-picker" size="s" value="f46a45" opacity>
          <span slot="label" class="wa-visually-hidden">Set a Color Label</span>
        </wa-color-picker>
        <wa-tooltip for="example-color-picker">Set a Color Label</wa-tooltip>
      </div>
    </div>
  </wa-card>
</div>
```

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

Let's assume you have a button with `id="color-scheme-button"` that simply toggles between light and dark mode. You can use the following JS snippet to apply `class="wa-dark"` to the `<html>` element accordingly:

```js
// Function to apply color scheme
function applyScheme(dark) {
  document.documentElement.classList.toggle('wa-dark', dark);
}

// Function to get the user's preferred color scheme
// Grabs from local storage if available or falls back to system preference
function getPreferredScheme() {
  const savedMode = localStorage.getItem('wa-color-scheme');
  if (savedMode !== null) return savedMode === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Apply the preferred color scheme on load
applyScheme(getPreferredScheme());

// Listen for changes in system preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  // If nothing in local storage, update accordingly
  const savedMode = localStorage.getItem('wa-color-scheme');
  if (!savedMode) {
    applyScheme(event.matches);
  }
});

// Listen for clicks on the color scheme button
document.getElementById('color-scheme-button').addEventListener('click', () => {
  const toDark = !document.documentElement.classList.contains('wa-dark');
  applyScheme(toDark);
  localStorage.setItem('wa-color-scheme', toDark ? 'dark' : 'light');
});
```

## Using Themes

To use a pre-built theme, add the stylesheets for you preferred theme and color palette to your site. Then, add classes for your theme, color palette, and variant colors to your markup.

For tailored guidance, select your favorite options and follow the instructions for your preferred method.

{% include 'theming/instructions.njk' %}

### Creating Your Own

In Web Awesome Pro, you can use the Theme Builder to customize the color, fonts, roundness, spacing, and default icon library of any pre-built theme without touching a line of CSS. Go to your [workspace](/workspaces) and open a project to create something uniquely yours.

For fine-grained control, create your own stylesheet that overrides some or all [design tokens](/docs/tokens) using CSS alone (no preprocessor required). All design tokens are prefixed with `--wa-` to avoid collisions with other libraries and your own custom properties.

To create your own light mode styles, scope your styles to the following selectors:

```css
:where(:root),
.wa-light,
.wa-dark .wa-invert  {
  /* your styles here */
}
```

To create your own dark mode styles, scope your styles to these selectors:

```css
.wa-dark,
.wa-invert {
  /* your styles here */
}
```

To create styles for both light and dark mode (like fonts or spacing), scope your styles to these selectors:

```css
:where(:root),
.wa-light,
.wa-dark,
.wa-invert {
  /* your styles here */
}
```

### Using Multiple Themes

You can use multiple themes on a single page as long as the styles for each theme are scoped to a specific class. All pre-built themes are scoped to their own classes. The Default theme is additionally scoped to `:where(:root)` so that the styles are applied automatically.

Simply load the theme stylesheets, then add your preferred classes to each element.

```html {.example}
<!-- Load each theme's stylesheet -->
<link rel="stylesheet" href="{% cdnUrl '/styles/themes/awesome.css' %}">
<link rel="stylesheet" href="{% cdnUrl '/styles/themes/shoelace.css' %}">

<div class="wa-stack">

  <wa-callout class="wa-theme-awesome wa-brand-yellow">
    <wa-icon slot="icon" name="face-awesome" variant="light"></wa-icon>
    <div class="wa-stack wa-align-items-start wa-gap-xs">
      <span>This callout uses <code>wa-theme-awesome</code> and <code>wa-brand-yellow</code>.</span>
      <wa-button variant="brand" size="s">Yellow Button</wa-button>
    </div>
  </wa-callout>

  <wa-callout class="wa-theme-shoelace wa-brand-cyan">
    <wa-icon slot="icon" name="shoelace" family="brands"></wa-icon>
    <div class="wa-stack wa-align-items-start wa-gap-xs">
      <span>This callout uses <code>wa-theme-shoelace</code> and <code>wa-brand-cyan</code>.</span>
      <wa-button variant="brand" size="s">Cyan Button</wa-button>
    </div>
  </wa-callout>

</div>
```

You can also use multiple variant colors on the same page. Because of how browsers compute custom properties, **you must add `wa-theme-*` on the same element that you want to use a different variant color,** even if the theme doesn't change.

```html {.example}
<!-- Add class="wa-theme-default" to each element whose brand color changes -->
<wa-callout>
  <wa-icon slot="icon" name="palette"></wa-icon>
  <div class="wa-stack wa-align-items-start wa-gap-xs">
    <span>The buttons in this callout use multiple brand colors.</span>
    <div class="wa-cluster">
      <wa-button class="wa-theme-default wa-brand-cyan" variant="brand" size="s">Cyan</wa-button>
      <wa-button class="wa-theme-default wa-brand-indigo" variant="brand" size="s">Indigo</wa-button>
      <wa-button class="wa-theme-default wa-brand-purple" variant="brand" size="s">Purple</wa-button>
      <wa-button class="wa-theme-default wa-brand-pink" variant="brand" size="s">Pink</wa-button>
    </div>
  </div>
</wa-callout>
```