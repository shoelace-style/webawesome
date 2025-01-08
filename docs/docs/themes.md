---
title: Themes
description: Everything you need to know about theming Web Awesome.
layout: page-outline
---

<style>
  wa-page > main {
    max-width: 120ch;
  }

  .theme-showcase {
    min-height: 16lh;
    height: 50vh;
    max-height: 32lh;
    padding: var(--wa-space-xl);
    overflow: hidden;
  }

  .showcase-wrapper {
    inline-size: 100%;
    block-size: 100%;
  }

  .showcase {
    column-count: 3;
    column-gap: var(--wa-space-xl);
    zoom: 80%;

    & wa-card {
      display: inline-block;
      width: 100%;

      &:has(+ wa-card) {
        margin-block-end: var(--wa-space-xl);
      }
    }
  }
</style>

<div class="wa-flank theme-showcase" style="background-color: var(--wa-color-surface-lowered); border-radius: var(--wa-border-radius-l);">
  <div>
    <h2>Theme Name</h2>
    <p>Lorem ipsum dolor sit amet</p>
  </div>
  <div class="showcase-wrapper">
    <div class="showcase">
      <wa-card with-header with-footer>
        <div slot="header" class="wa-split">
          <h3 class="wa-heading-m">Your Cart</h3>
          <wa-icon-button name="xmark"></wa-icon-button>
        </div>
        <div class="wa-stack wa-gap-xl">
          <div class="wa-flank">
            <wa-avatar shape="rounded" style="--size: 3em; --background-color: var(--wa-color-green-60); --text-color: var(--wa-color-green-95);">
              <wa-icon slot="icon" name="sword-laser" family="duotone" style="font-size: 1.5em;"></wa-icon>
            </wa-avatar>
            <div class="wa-stack wa-gap-xs">
              <div class="wa-split wa-gap-xs">
                <strong>Initiate Saber</strong>
                <strong>$179.99</strong>
              </div>
              <div class="wa-split wa-gap-xs wa-caption-m">
                <span>Green</span>
                <a href="#">Remove</a>
              </div>
            </div>
          </div>
          <wa-divider></wa-divider>
          <div class="wa-flank">
            <wa-avatar shape="rounded" style="--size: 3em; --background-color: var(--wa-color-teal-60); --text-color: var(--wa-color-teal-95);">
              <wa-icon slot="icon" name="robot-astromech" family="duotone" style="font-size: 1.5em;"></wa-icon>
            </wa-avatar>
            <div class="wa-stack wa-gap-xs">
              <div class="wa-split wa-gap-xs">
                <strong>Repair Droid</strong>
                <strong>$3,049.99</strong>
              </div>
              <div class="wa-split wa-gap-xs wa-caption-m">
                <span>R-series</span>
                <a href="#">Remove</a>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="wa-stack">
          <div class="wa-split">
            <strong>Subtotal</strong>
            <strong>$3,229.98</strong>
          </div>
          <span class="wa-caption-m">Shipping and taxes calculated at checkout.</span>
          <wa-button variant="brand">
            <wa-icon slot="prefix" name="shopping-bag"></wa-icon>
            Checkout
          </wa-button>
        </div>
      </wa-card>
      <wa-card>
        <wa-avatar shape="rounded" style="--size: 1.9lh; float: left; margin-right: var(--wa-space-m);">
          <wa-icon slot="icon" name="hat-wizard" family="duotone" style="font-size: 1.75em;"></wa-icon>
        </wa-avatar>
        <p class="wa-body-l" style="margin: 0;">&ldquo;All we have to decide is what to do with the time that is given to us. There are other forces at work in this world, Frodo, besides the will of evil.&rdquo;</p>
      </wa-card>
      <wa-card>
        <div class="wa-stack">
          <h3 class="wa-heading-m">Sign In</h3>
          <wa-input label="Email" placeholder="ddjarin@mandalore.gov">
            <wa-icon slot="prefix" name="envelope" variant="regular"></wa-icon>
          </wa-input>
          <wa-input label="Password" type="password">
            <wa-icon slot="prefix" name="lock" variant="regular"></wa-icon>
          </wa-input>
          <wa-button variant="brand">Sign In</wa-button>
          <a href="#" class="wa-body-s">I forgot my password</a>
        </div>
      </wa-card>
      <wa-card with-footer>
        <div class="wa-stack">
          <div class="wa-split">
            <h3 class="wa-heading-m">To-Do</h3>
            <wa-icon-button id="add-todo" name="plus"></wa-icon-button>
            <wa-tooltip for="add-todo">Add task</wa-tooltip>
          </div>
          <wa-checkbox checked>Umbrella for Adelard</wa-checkbox>
          <wa-checkbox checked>Waste-paper basket for Dora</wa-checkbox>
          <wa-checkbox checked>Pen and ink for Milo</wa-checkbox>
          <wa-checkbox>Mirror for Angelica</wa-checkbox>
          <wa-checkbox>Silver spoons for Lobelia</wa-checkbox>
        </div>
        <div slot="footer">
          <a href="">View all completed</a>
        </div>
      </wa-card>
      <wa-card>
        <div class="wa-stack">
          <div class="wa-frame wa-border-radius-m">
            <img src="https://images.unsplash.com/photo-1667514627762-521b1c815a89?q=20" alt="">
          </div>
          <div class="wa-flank:end wa-align-items-start">
            <div class="wa-stack wa-gap-3xs">
              <div class="wa-cluster wa-gap-xs" style="height: 2.25em;">
                <strong>The Stone Troll</strong>
                <small><wa-badge variant="neutral" appearance="filled">E</wa-badge></small>
              </div>
              <span class="wa-caption-m">Samwise G</span>
            </div>
            <wa-icon-button id="options-menu" name="ellipsis"></wa-icon-button>
            <wa-tooltip for="options-menu">Options</wa-tooltip>
          </div>
          <div class="wa-stack wa-gap-2xs">
            <wa-progress-bar value="34" style="height: 0.5em"></wa-progress-bar>
            <div class="wa-split">
              <span class="wa-caption-xs">1:01</span>
              <span class="wa-caption-xs">-1:58</span>
            </div>
          </div>
          <div class="wa-grid wa-align-items-center" style="--min-column-size: 1em; justify-items: center;">
            <wa-icon-button name="backward"></wa-icon-button>
            <wa-icon-button name="pause" style="font-size: var(--wa-font-size-2xl);"></wa-icon-button>
            <wa-icon-button name="forward"></wa-icon-button>
          </div>
        </div>
      </wa-card>
      <wa-card>
        <div class="wa-stack">
          <h3 class="wa-heading-m">Chalmun's Spaceport Cantina</h3>
          <div class="wa-cluster wa-gap-xs">
            <wa-rating value="4.6" read-only></wa-rating>
            <strong>4.6</strong>
            <span>(419 reviews)</span>
          </div>
          <div class="wa-cluster wa-gap-xs">
            <div class="wa-cluster wa-gap-3xs">
              <wa-icon name="dollar" style="color: var(--wa-color-green-60);"></wa-icon>
              <wa-icon name="dollar" style="color: var(--wa-color-green-60);"></wa-icon>
              <wa-icon name="dollar" style="color: var(--wa-color-green-60);"></wa-icon>
            </div>
            <span class="wa-caption-m">&bull;</span>
            <wa-tag size="small">Cocktail Bar</wa-tag>
            <wa-tag size="small">Gastropub</wa-tag>
            <wa-tag size="small">Local Fare</wa-tag>
            <wa-tag size="small">Gluten Free</wa-tag>
          </div>
          <div class="wa-flank wa-gap-xs">
            <wa-icon name="location-dot"></wa-icon>
            <a href="#" class="wa-caption-m">Mos Eisley, Tatooine</a>
          </div>
        </div>
      </wa-card>
    </div>
  </div>
</div>

Themes are collections of pre-defined CSS custom properties that thread through every Web Awesome component and pattern.

Web Awesome includes two pre-made themes:
- **Default** for a clean look that prioritizes accessibility and performance
- **Classic** for the look and feel of Shoelace with more accessible color pairings

## What's a Theme?

Themes are a standard collection of [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) that cover all styles from colors to transitions. We use these custom properties throughout Web Awesome components to ensure a cohesive look and feel. Our [Theming pages](/docs/theming/) document these styles so that you can use them freely throughout your project and customize them as needed.

Themes are scoped to unique classes for each color scheme, such as `wa-theme-default-light` and `wa-theme-default-dark`, and the `:host` selector. Scoping to unique classes allows you to import multiple themes and use them interchangeably without collisions, while scoping to `:host` ensures the styles are applied to the shadow roots of custom elements.

Additionally, styles may be scoped to the `:root` selector to be activated automatically. For pre-made themes, *all* custom properties are scoped to both `:root` and the class for the light color scheme (`wa-theme-default-light` or `wa-theme-classic-light`), activating the light color scheme by default.

Other themes or color schemes must be activated with the corresponding class, like the dark color scheme for pre-made themes (`wa-theme-default-dark` or `wa-theme-classic-dark`), which only defines a subset of custom properties for colors. This ensures that non-color styles only need to be defined once for the theme, regardless of whether the color scheme is light or dark.

For example, the default theme is set up like this:

```css
:root,
:host,
.wa-theme-default-light {
  /* all CSS custom properties for color, typography, space, etc. */
}

.wa-theme-default-dark,
.wa-theme-default-dark :host {
  /* subset of CSS custom properties for color */
}
```

## Using Themes

You can import the default and classic themes from the Web Awesome CDN. Simply add the following code to the `<head>` of your page to import the **default** theme:

```html
<link rel="stylesheet" href="https://early.webawesome.com/webawesome@3.0.0-alpha.4/dist/styles/themes/default.css" />
```

Or import the **classic** theme:

```html
<link rel="stylesheet" href="https://early.webawesome.com/webawesome@3.0.0-alpha.4/dist/styles/themes/classic.css" />
```

Both the default and classic themes include both light and dark color schemes. When importing either theme, the light color scheme is activated by default. To activate the dark color scheme, apply the appropriate class (`wa-theme-default-dark` or `wa-theme-classic-dark`, depending on theme) to the `<html>` element on your page, like this example for the default theme:
```html
<html class="wa-theme-default-dark">
  <head>
    <link rel="stylesheet" href="path/to/web-awesome/dist/styles/themes/default.css" />
    <!-- other links, scripts, and metadata -->
  </head>
  <body>
    <!-- page content -->
  </body>
</html>
```

Because themes are scoped to specific classes, you can activate different color schemes or entire themes on different containers throughout the page. This example uses the default theme with a dark sidebar.

```html
<html>
  <head>
    <link rel="stylesheet" href="path/to/web-awesome/dist/styles/themes/default.css" />
  </head>

  <body>
    <nav class="wa-theme-default-dark">
      <!-- dark-themed sidebar -->
    </nav>

    <!-- light-themed content -->
  </body>
</html>
```

## Creating Themes

There are two ways to create themes. The easiest way is to customize the default theme. The advanced way is to create a new theme from scratch. Which method you choose depends on your project's requirements and the amount of effort you're willing to invest.

### Customizing a Built-in Theme

Overriding the default theme is the easiest way to customize Web Awesome. You can do this by importing the default theme as-is, then creating a separate stylesheet that overrides [the theming API](/docs/customizing#design-tokens) and adds [component styles](/docs/customizing#css-parts) to your liking. You must import your theme _after_ the default theme.

If you're customizing the default light styles, scope your styles to the following selectors.

```css
:root,
:host,
.wa-theme-default-light {
  /* your custom styles here */
}
```

If you're customizing the default dark styles, scope your styles to the following selectors.

```css
:host,
.wa-theme-default-dark {
  /* your custom styles here */
}
```

By customizing a built-in theme, you'll maintain a smaller stylesheet containing only the changes you've made. Contrast this to [creating a new theme](#creating-a-new-theme), where you need to explicitly define every custom property required by the library. This approach is more "future-proof," as new design tokens that emerge in subsequent versions of Web Awesome will be accounted for by built-in themes.

While this approach is easier to maintain, the drawback is that your theme can't be activated independently — it's tied to the built-in theme you're extending.

### Creating a New Theme

Creating a new theme is more of an undertaking than [customizing an existing one](#customizing-a-built-in-theme). At a minimum, you must implement all of the required custom properties. The easiest way to do this is by "forking" a built-in theme and modifying it from there.

Start by changing the selector to match your theme's name. Assuming your new theme is called "Purple Power", your theme should be scoped like this.

```css
:host,
.wa-theme-purple-power {
  /* your custom styles here */
}
```

By creating a new theme, you won't be relying on a built-in theme as a foundation. Because of this, you can activate it independently as an alternative to the default theme. This is the recommended approach if you're looking to open source your theme for others to use.

You will, however, need to maintain your theme more carefully, as new versions of Web Awesome change the theming API in ways that your theme won't have accounted for. It's recommended that you clearly specify which version(s) of Web Awesome your theme is designed to work with and keep it up to date as new versions of Web Awesome are released.

## Detecting Color Scheme Preference

Web Awesome's default theme has both light and dark styles built in. However, Web Awesome doesn't try to auto-detect the user's light/dark mode preference. This should be done at the application level. As a best practice, to provide a dark theme in your app, you should:

- Check for [`prefers-color-scheme`](https://stackoverflow.com/a/57795495/567486) and use its value by default
- Allow the user to override the setting in your app
- Remember the user's preference and restore it on subsequent logins

Web Awesome avoids using the `prefers-color-scheme` media query because not all apps support dark mode, and it would break things for the ones that don't.
