---
title: Customizing
description: Learn how to customize Web Awesome through themes, parts, and custom properties.
layout: page-outline
---

You can customize the look and feel of Web Awesome at a high level with themes. For more advanced customizations, you can make use of CSS parts and custom properties to target individual components.

## Themes

Web Awesome uses [themes](/docs/themes) to apply a cohesive look and feel across the entire library. Themes are built with a collection of predefined CSS custom properties, which we call [design tokens](/docs/tokens), and there are many premade themes you can choose from.

To use a theme, simply add a link to the theme's stylesheet to the `<head>` of your page. For example, you can replace the link to `default.css` in the [installation code](/docs/installation/#quick-start-autoloading-via-cdn) with this snippet to use the *Awesome* theme:

```html
<link rel="stylesheet" href="{% cdnUrl 'styles/themes/awesome.css' %}" />
```

You can [customize any theme](/docs/themes/creating) just with CSS — no preprocessor required. All design tokens are prefixed with `--wa-` to avoid collisions with other libraries or your own custom properties. Simply override any design token in your own stylesheet by scoping your styles to `:where(:root)`, `:host`, the class for the specific theme you want to override (if needed), and the class for the relevant color scheme (if needed). Here's an example that changes the default brand color to purple in light mode:

```css
:where(:root),
:host,
.wa-light,
.wa-dark .wa-invert {
  --wa-color-brand-fill-quiet: var(--wa-color-purple-95);
  --wa-color-brand-fill-normal: var(--wa-color-purple-90);
  --wa-color-brand-fill-loud: var(--wa-color-purple-50);
  --wa-color-brand-border-quiet: var(--wa-color-purple-90);
  --wa-color-brand-border-normal: var(--wa-color-purple-80);
  --wa-color-brand-border-loud: var(--wa-color-purple-60);
  --wa-color-brand-on-quiet: var(--wa-color-purple-40);
  --wa-color-brand-on-normal: var(--wa-color-purple-30);
  --wa-color-brand-on-loud: white;
}
```

:::info
Wrapping the `:root` selector in `:where()` gives this selector 0 specificity. This allows us to define our design tokens' default values while ensuring they can be cleanly overridden as needed.
:::

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

Parts allow you to style *any* standard CSS property, not just those exposed through custom properties. Here's an example that modifies buttons with the `gradient-button` class.

```html {.example}
<wa-button class="gradient-button"> Gradient Button </wa-button>

<style>
  .gradient-button::part(base) {
    background: linear-gradient(217deg, var(--wa-color-indigo-50), var(--wa-color-purple-50), var(--wa-color-red-50));
    border: solid 1px var(--wa-color-purple-50);
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

## Native Elements

If you're using [native styles](/docs/native), any custom styles added for a component should also target the corresponding native element. In general, the same styles you declare for components will work just the same to style their native counterparts.

For example, we can give `<input type="checkbox">` the same custom styles as `<wa-checkbox>` by using the custom properties required to style the component:
```html {.example}
<wa-checkbox class="pinkify">Web Awesome checkbox</wa-checkbox>
<br />
<label>
  <input type="checkbox" class="pinkify" />
  HTML checkbox
</label>

<style>
  wa-checkbox.pinkify,
  input[type="checkbox"].pinkify {
    --background-color-checked: hotpink;
    --border-color-checked: hotpink;
    --border-width: 3px;
    --checked-icon-color: lavenderblush;
  }
</style>
```

Or, if using CSS parts, we can give both checkboxes the same custom styles using standard CSS properties:
```html {.example}
<wa-checkbox class="purpleify">Web Awesome checkbox</wa-checkbox>
<br />
<label>
  <input type="checkbox" class="purpleify" />
  HTML checkbox
</label>

<style>
  wa-checkbox.purpleify::part(control),
  input[type="checkbox"].purpleify {
    border-width: 3px;
  }

  wa-checkbox.purpleify:state(checked)::part(control),
  input[type="checkbox"].purpleify:checked {
    background-color: darkorchid;
    border-color: darkorchid;
    color: lavender;
  }
</style>
```


## Style Utilities

Similarly, if you're using [style utilities](/docs/utilities), any custom styles added for a specific attribute variation of a component — such as `appearance`, `variant`, or `size` — should also target the corresponding style utility class. This ensures that the attribute and its utility class counterpart work interchangeably.

For example, we can give all outlined callouts a thick left border, regardless of whether they are styled with `appearance="outlined"` or `class="wa-outlined"`:
```html {.example}
<wa-callout appearance="outlined filled">
  <wa-icon slot="icon" name="circle-star"></wa-icon>
  Here's a callout with <code>appearance="outlined"</code>
</wa-callout>
<wa-callout class="wa-outlined wa-filled">
  <wa-icon slot="icon" name="circle-star"></wa-icon>
  Here's a callout with <code>class="wa-outlined"</code>
</wa-callout>

<style>
  wa-callout:is(
    [appearance~="outlined"], 
    .wa-outlined
  ) {
    border-left-width: var(--wa-panel-border-radius);
  }
</style>
```