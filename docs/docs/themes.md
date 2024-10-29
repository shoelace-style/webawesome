---
title: Themes
description: Everything you need to know about theming Web Awesome.
layout: page-outline
---

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
<link rel="stylesheet" href="https://early.webawesome.com/webawesome@3.0.0-alpha.4/dist/themes/default.css" />
```

Or import the **classic** theme:

```html
<link rel="stylesheet" href="https://early.webawesome.com/webawesome@3.0.0-alpha.4/dist/themes/classic.css" />
```

Both the default and classic themes include both light and dark color schemes. When importing either theme, the light color scheme is activated by default. To activate the dark color scheme, apply the appropriate class (`wa-theme-default-dark` or `wa-theme-classic-dark`, depending on theme) to the `<html>` element on your page, like this example for the default theme:
```html
<html class="wa-theme-default-dark">
  <head>
    <link rel="stylesheet" href="path/to/web-awesome/dist/themes/default.css" />
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
    <link rel="stylesheet" href="path/to/web-awesome/dist/themes/default.css" />
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
