---
title: Customizing
description: Learn how to customize Web Awesome through parts and custom properties.
layout: page.njk
---

Web Awesome components can be customized at a high level through design tokens. This gives you control over theme colors and general styling. For more advanced customizations, you can make use of CSS parts and custom properties to target individual components.

## Design Tokens

Web Awesome makes use of several design tokens to provide a consistent appearance across components. You can customize them and use them in your own application with pure CSS — no preprocessor required.

Design tokens offer a high-level way to customize the library with minimal effort. There are no component-specific variables, however, as design tokens are intended to be generic and highly reusable. To customize an individual component, refer to the section entitled [CSS Parts](#css-parts).

Design tokens are accessed through CSS custom properties that are defined in your theme. Because design tokens live at the page level, they're prefixed with `--wa-` to avoid collisions with other libraries.

To customize a design token, simply override it in your stylesheet using a `:root` block. Here's an example that changes the primary theme to purple based on existing [color primitives](/tokens/color#primitives).

```css
:root {
  /* Changes the primary theme color to purple using primitives */
  --wa-color-primary-50: var(--wa-color-purple-50);
  --wa-color-primary-100: var(--wa-color-purple-100);
  --wa-color-primary-200: var(--wa-color-purple-200);
  --wa-color-primary-300: var(--wa-color-purple-300);
  --wa-color-primary-400: var(--wa-color-purple-400);
  --wa-color-primary-500: var(--wa-color-purple-500);
  --wa-color-primary-600: var(--wa-color-purple-600);
  --wa-color-primary-700: var(--wa-color-purple-700);
  --wa-color-primary-800: var(--wa-color-purple-800);
  --wa-color-primary-900: var(--wa-color-purple-900);
  --wa-color-primary-950: var(--wa-color-purple-950);
}
```

Many design tokens are described further along in this documentation. For a complete list, refer to `src/themes/default.css` in the project's [source code](https://github.com/shoelace-style/shoelace/blob/current/src/themes/default.css).

## CSS Parts

Whereas design tokens offer a high-level way to customize the library, CSS parts offer a low-level way to customize individual components. Again, this is done with pure CSS — no preprocessor required.

Web Awesome components use a [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) to encapsulate their styles and behaviors. As a result, you can't simply target their internals with the usual CSS selectors. Instead, components expose "parts" that can be targeted with the [CSS part selector](https://developer.mozilla.org/en-US/docs/Web/CSS/::part), or `::part()`.

Here's an example that modifies buttons with the `tomato-button` class.

```html {.example}
<wa-button class="tomato-button"> Tomato Button </wa-button>

<style>
  .tomato-button::part(base) {
    background: var(--wa-color-neutral-0);
    border: solid 1px tomato;
  }

  .tomato-button::part(base):hover {
    background: rgba(255, 99, 71, 0.1);
  }

  .tomato-button::part(base):active {
    background: rgba(255, 99, 71, 0.2);
  }

  .tomato-button::part(base):focus-visible {
    box-shadow: 0 0 0 3px rgba(255, 99, 71, 0.33);
  }

  .tomato-button::part(label) {
    color: tomato;
  }
</style>
```

At first glance, this approach might seem a bit verbose or even limiting, but it comes with a few important advantages:

- Customizations can be made to components with explicit selectors, such as `::part(icon)`, rather than implicit selectors, such as `.button > div > span + .icon`, that are much more fragile.

- The internal structure of a component will likely change as it evolves. By exposing CSS parts through an API, the internals can be reworked without fear of breaking customizations as long as its parts remain intact.

- It encourages us to think more about how components are designed and how customizations should be allowed before users can take advantage of them. Once we opt a part into the component's API, it's guaranteed to be supported and can't be removed until a major version of the library is released.

Most (but not all) components expose parts. You can find them in each component's API documentation under the "CSS Parts" section.

## Custom Properties

For convenience, some components expose CSS custom properties you can override. These are not design tokens, nor do they have the same `--wa-` prefix since they're scoped to a component.

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

Not all components expose CSS custom properties. For those that do, they can be found in the component's API documentation.
