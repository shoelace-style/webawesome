---
title: Customizing
description: Learn how to customize Web Awesome through themes, parts, and custom properties.
layout: page-outline
---

You can customize the look and feel of Web Awesome at a high level with themes. For more advanced customizations, you can make use of CSS parts and custom properties to target individual components.

## Themes

Web Awesome uses [themes](/docs/themes) to apply a cohesive look and feel across the entire library. Themes are built with a collection of predefined CSS custom properties, which we call [design tokens](/docs/tokens), and there are many premade themes you can choose from.

{% raw %}
  <p>
    To use a pre-built theme {%- if currentUser.hasPro -%}&nbsp;or build your own{%- endif -%},&nbsp;
    {%- if not session.isLoggedIn -%}
      <a href="/signup">sign up</a> or <a href="/login">log in</a> to create a project.&nbsp;
    {%- else -%}
      head over to <a href="/teams">your teams</a> and open up the project you'd like to use.&nbsp;
    {%- endif -%}
    In your project's <wa-icon name="gear" variant="regular"></wa-icon> <strong>Settings</strong>,&nbsp;
    {%- if not currentUser.hasPro -%}
      select a <wa-icon name="paintbrush" variant="regular"></wa-icon> <strong>Theme</strong> and a <wa-icon name="swatchbook" variant="regular"></wa-icon> <strong>Color Palette</strong> to use, save your changes, and bask in the glory of your new theme.
    {%- else -%}
      <wa-icon name="paintbrush" variant="regular"></wa-icon> <strong>Edit Your Theme</strong> to open the Theme Builder and select a pre-built theme or customize your colors, fonts, icons, and more.
    {%- endif -%}
  </p>
{% endraw %}

For even more customizations, you can off-road and override any theme just with CSS — no preprocessor required. All design tokens are prefixed with `--wa-` to avoid collisions with other libraries and your own custom properties. Simply style any design token in your own stylesheet by scoping your styles to `:root` and the class for the relevant color scheme (if needed). Here's an example that uses tinted surface colors in light mode:

```css
:root,
.wa-light,
.wa-dark .wa-invert {
  --wa-color-surface-raised: var(--wa-color-neutral-95);
  --wa-color-surface-default: var(--wa-color-neutral-90);
  --wa-color-surface-lowered: var(--wa-color-neutral-80);
}
```

For a complete list of all custom properties used for theming, refer to `src/styles/themes/default.css` in the project's source code.

## Components

While themes offer a high-level way to customize the library, components offer different hooks as a low-level way to customize them individually.

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

### Custom States

Components can expose custom states that allow you to style them based on their current condition using the `:state()` selector. Custom states provide a way to target specific component states that aren't covered by standard pseudo-classes like `:hover` or `:focus`.
Here's an example that styles a checkbox that's checked.

```css
wa-checkbox:state(checked) {
  outline: dotted 2px tomato;
}
```

Custom states can be combined with CSS parts and custom properties to create sophisticated customizations. The custom states exposed by each component can be found in the component's API documentation under the "Custom States" section.

### CSS Parts

CSS parts offer further flexibility to customize individual components. The "parts" exposed by each component can be targeted with the [CSS part selector](https://developer.mozilla.org/en-US/docs/Web/CSS/::part), or `::part()`.

Parts allow you to style _any_ standard CSS property, not just those exposed through custom properties. Here's an example that modifies buttons with the `gradient-button` class.

```html {.example}
<wa-button class="gradient-button"> Gradient Button </wa-button>

<style>
  .gradient-button::part(base) {
    background: linear-gradient(217deg, var(--wa-color-indigo-50), var(--wa-color-purple-50), var(--wa-color-red-50));
    border: solid 1px var(--wa-color-purple-50);
    transition:
      transform 100ms,
      box-shadow 100ms;
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

## Native Elements

If you're using [native styles](/docs/utilities/native), any custom styles added for a component should also target the corresponding native element. In general, the same styles you declare for components will work just the same to style their native counterparts.

For example, we can give `<input type="checkbox">` the same custom styles as `<wa-checkbox>` by using standard CSS properties and CSS parts:

```html {.example}
<wa-checkbox class="pinkify">Web Awesome checkbox</wa-checkbox>
<br />
<label>
  <input type="checkbox" class="pinkify" />
  HTML checkbox
</label>

<style>
  wa-checkbox.pinkify::part(control),
  input[type='checkbox'].pinkify {
    border-width: 3px;
  }

  wa-checkbox.pinkify:state(checked)::part(control),
  input[type='checkbox'].pinkify:checked {
    background-color: hotpink;
    border-color: hotpink;
    color: lavenderblush;
  }
</style>
```
