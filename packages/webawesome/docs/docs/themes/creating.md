---
title: Creating Themes
layout: page-outline
order: 999
override:tags: [themes]
---

There are two ways to create themes.
The easiest way is to customize the default theme.
The advanced way is to create a new theme from scratch.
Which method you choose depends on your project's requirements and the amount of effort you're willing to invest.

## Customizing a Built-in Theme

Overriding the default theme is the easiest way to customize Web Awesome.
You can do this by importing the default theme as-is, then creating a separate stylesheet that overrides [the theming API](/docs/customizing#design-tokens) and adds [component styles](/docs/customizing#css-parts) to your liking. You must import your theme _after_ the default theme.

If you're customizing the default light styles, scope your styles to the following selectors.

```css
:where(:root),
:host,
.wa-theme-default,
.wa-light,
.wa-dark .wa-invert {
  /* your custom styles here */
}
```

If you're customizing the default dark styles, scope your styles to the following selectors.

```css
.wa-dark,
.wa-invert {
  /* your custom styles here */
}
```

By customizing a built-in theme, you'll maintain a smaller stylesheet containing only your changes. Contrast this to [creating a new theme](#creating-a-new-theme), where you need to explicitly define every custom property required by the library. This approach is more "future-proof," as new design tokens that emerge in subsequent versions of Web Awesome will be accounted for by built-in themes.

While this approach is easier to maintain, the drawback is that your theme can't be activated independently — it's tied to the built-in theme you're extending.

## Creating a New Theme

Creating a new theme is more of an undertaking than [customizing an existing one](#customizing-a-built-in-theme). At a minimum, you must implement all of the required custom properties. The easiest way to do this is by "forking" a built-in theme and modifying it from there.

Start by changing the selector to match your theme's name. Assuming your new theme is called "Purple Power", your theme should be scoped like this.

```css
:where(:root),
:host,
.wa-theme-purple-power,
.wa-light {
  /* your custom styles here */
}
```

By creating a new theme, you won't be relying on a built-in theme as a foundation. Because of this, you can activate it independently as an alternative to the default theme. This is the recommended approach if you're looking to open source your theme for others to use.

You will, however, need to maintain your theme more carefully, as new versions of Web Awesome change the theming API in ways that your theme won't have accounted for. It's recommended that you clearly specify which version(s) of Web Awesome your theme is designed to work with and keep it up to date as new versions of Web Awesome are released.
