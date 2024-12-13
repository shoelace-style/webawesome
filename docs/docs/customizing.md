---
title: Customizing
description: Learn how to customize Web Awesome through parts and custom properties.
layout: page-outline
---

Web Awesome components can be customized at a high level through a theming API. This gives you control over theme colors and general styling. For more advanced customizations, you can make use of CSS parts and custom properties to target individual components.

## Themes

Web Awesome uses numerous CSS custom properties that make up a high-level theming API and provide a consistent look and feel across the entire library. You can customize them and use them in your own application just with CSS — no preprocessor required.

Because these custom properties live at the page level, they're prefixed with `--wa-` to avoid collisions with other libraries or your own custom properties.

To customize a theme, simply override any of these custom properties in your own stylesheet by scoping your styles to `:root`, `:host`, and, if needed, the class for the specific theme you want to override. Here's an example that changes the default brand color (blue) to violet in the light theme using existing [literal colors](/docs/theming/color/#literal-colors).

```css
:root,
:host,
.wa-theme-default-light {
  /* Changes the brand color to violet across the library */
  --wa-color-brand-fill-quiet: var(--wa-color-violet-95);
  --wa-color-brand-fill-normal: var(--wa-color-violet-90);
  --wa-color-brand-fill-loud: var(--wa-color-violet-50);
  --wa-color-brand-border-quiet: var(--wa-color-violet-90);
  --wa-color-brand-border-normal: var(--wa-color-violet-80);
  --wa-color-brand-border-loud: var(--wa-color-violet-60);
  --wa-color-brand-on-quiet: var(--wa-color-violet-40);
  --wa-color-brand-on-normal: var(--wa-color-violet-30);
  --wa-color-brand-on-loud: white;
}
```

For more examples and further guidance, refer to [Themes](/docs/themes) and the Theming section of this documentation. For a complete list of all custom properties used for theming, refer to `src/styles/themes/default.css` in the project's source code.

## Components

Whereas a theme offers a high-level way to customize the library, components offer different hooks as a low-level way to customize them individually.

Web Awesome components use a [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) to encapsulate their styles and behaviors. As a result, you can't simply target their internals with the usual CSS selectors. Instead, components expose a set of custom properties and CSS parts that can be targeted to customize their appearance.

### Custom Properties

Components expose custom properties that are scoped to the component, not global, so they do not have the same `--wa-` prefix as a theme's custom properties. These custom properties reflect common qualities of a component, such as `--background-color`, `--border-style`, `--size`, etc.

You can set custom properties on a component in your stylesheet.

```css
wa-avatar {
  --size: 6rem;
}
```

This will also work if you need to target a subset of components with a specific class.

```css
wa-avatar.your-class {
  --size: 6rem;
}
```

Alternatively, you can set them inline directly on the element.

```html
<wa-avatar style="--size: 6rem;"></wa-avatar>
```

The custom properties exposed by each component can be found in the component's API documentation.

### CSS Parts

CSS parts offer further flexibility to customize individual components. The "parts" exposed by each component can be targeted with the [CSS part selector](https://developer.mozilla.org/en-US/docs/Web/CSS/::part), or `::part()`.

Parts allow you to style *any* standard CSS property, not just those exposed through custom properties. Here's an example that modifies buttons with the `gradient-button` class.

```html {.example}
<wa-button class="gradient-button"> Gradient Button </wa-button>

<style>
  .gradient-button::part(base) {
    background: linear-gradient(217deg, var(--wa-color-indigo-50), var(--wa-color-violet-50), var(--wa-color-red-50));
    border: solid 1px var(--wa-color-violet-50);
    transition: transform 100ms, box-shadow 100ms;
  }

  .gradient-button::part(base):hover {
    box-shadow: var(--wa-shadow-m);
    transform: translateY(-3px);
  }

  .gradient-button::part(base):active {
    box-shadow: inset var(--wa-shadow-s);
    transform: translateY(0);
  }

  .gradient-button::part(label) {
    color: white;
    text-shadow: rgb(0 0 0 / 0.3) 0 -1px;
  }
</style>
```

CSS parts have a few important advantages:

- Customizations can be made to components with explicit selectors, such as `::part(icon)`, rather than implicit selectors, such as `.button > div > span + .icon`, that are much more fragile.

- The internal structure of a component will likely change as it evolves. By exposing CSS parts through an API, the internals can be reworked without fear of breaking customizations as long as its parts remain intact.

- It encourages us to think more about how components are designed and how customizations should be allowed before users can take advantage of them. Once we opt a part into the component's API, it's guaranteed to be supported and can't be removed until a major version of the library is released.

Most (but not all) components expose parts. You can find them in each component's API documentation under the "CSS Parts" section.
