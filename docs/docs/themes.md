---
title: Themes
description: Everything you need to know about theming Web Awesome.
layout: page-outline
---

Web Awesome is designed to be highly customizable through pure CSS. Out of the box, the default theme includes both light and dark styles. Alternatively, you can design your own theme.

In essence, a theme is a stylesheet that uses the Web Awesome API to define custom properties and apply custom styles to components. To create a theme, you will need a decent understanding of CSS, including [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) and the [`::part` selector](https://developer.mozilla.org/en-US/docs/Web/CSS/::part).

:::info
For component developers, built-in themes are also available as JavaScript modules that export [Lit CSSResult](https://lit.dev/docs/api/styles/#CSSResult) objects. You can find them in `/dist/themes/*.styles.js`.
:::

## Theme Basics

All themes are scoped to classes using the format `wa-theme-{name}`, where `{name}` is a lowercase, hyphen-delimited value representing the name of the theme. The included theme uses `wa-theme-default-light` and `wa-theme-default-dark` for light and dark styles, respectively. A custom theme called "Purple Power", for example, would use a class called `wa-theme-purple-power`.

All selectors must be scoped to the theme's class to ensure interoperability with other themes. You should also scope them to `:host` so they can be imported and applied to custom element shadow roots.

```css
:host,
.wa-theme-purple-power {
  /* ... */
}
```

In the default theme, all CSS custom properties that make up Web Awesome's theming API, from colors to transitions, are scoped to both `:root` and `wa-theme-default-light`. `wa-theme-default-dark`, on the other hand, only defines a subset of custom properties for colors. This ensures that non-color styles only need to be defined once for the theme, regardless of whether the color scheme is light or dark.

### Activating Themes

To activate a theme, import it and apply the theme's class to the `<html>` element. This example imports and activates the default theme with dark styles.

```html
<html class="wa-theme-default-dark">
  <head>
    <link rel="stylesheet" href="path/to/webawesome/dist/themes/default.css" />
  </head>

  <body>
    ...
  </body>
</html>
```

:::info
There is one exception to this rule — the default light styles _do not_ need to be activated. For convenience, these styles are scoped to `:root` and will be activated by default when imported.
:::

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
