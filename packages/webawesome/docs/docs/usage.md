---
title: Usage
description: Learn more about using and customizing custom elements.
layout: page-outline
synonyms:
  - getting started
  - install
  - setup
  - quickstart
  - theming
  - styling
  - custom styles
  - override
use-cases:
  - cdn
  - npm install
  - import
  - autoloader
  - css custom properties
  - css variables\
  - design tokens
  - brand
---

Web Awesome components are just regular HTML elements, or [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) to be precise. You can use them like any other element. Each component has detailed documentation that describes its full API, including properties, events, methods, and more.

If you're new to custom elements, often referred to as "web components," this section will familiarize you with how to use them.

## Awaiting Registration

Unlike traditional frameworks, custom elements don't have a centralized initialization phase. This means you need to verify that a custom element has been properly registered before attempting to interact with its properties or methods.

You can use the [`customElements.whenDefined()`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/whenDefined) method to ensure a specific component is ready:

```ts
await customElements.whenDefined('wa-button');

// <wa-button> is ready to use!
const button = document.querySelector('wa-button');
```

When working with multiple components, checking each one individually can become tedious. For convenience, Web Awesome provides the `allDefined()` function which automatically detects and waits for all Web Awesome components in the DOM to be initialized before resolving.

```ts
import { allDefined } from '/dist/webawesome.js';

// Waits for all Web Awesome components in the DOM to be registered
await allDefined();

// All Web Awesome components on the page are ready!
```

<wa-details summary="Advanced Usage" style="margin-block-end: var(--wa-space-l);">

By default, `allDefined()` will wait for all `wa-` prefixed custom elements within the current `document` to be registered.
You can customize this behavior by passing in options:

- `root` allows you to pass in a different element to search within, or a different document entirely (defaults to `document`).
- `match` allows you to specify a custom function to determine which elements to wait for. This function should return `true` for elements you want to wait for and `false` for those you don't.
- `additionalElements` allows you to wait for custom elements to be defined that may not be present in the DOM at the time `allDefined()` is called. This can be useful for elements that are loaded dynamically via JS.

Here is an example of using `match` and `root` to await registration of Web Awesome components inside an element with an id of `sidebar`, plus a `<my-component>` element if present in the DOM, and `<wa-slider>` and `<other-slider>` elements whether present in the DOM or not:

```js
import { allDefined } from '/dist/webawesome.js';

await allDefined({
  match: tagName => tagName.startsWith('wa-') || tagName === 'my-component',
  root: document.getElementById('sidebar'),
  additionalElements: ['wa-slider', 'other-slider'],
});
```

</wa-details>

## Attributes & Properties

Many components have properties that can be set using attributes. For example, buttons accept a `size` attribute that maps to the `size` property which dictates the button's size.

```html
<wa-button size="small">Click me</wa-button>
```

Some properties are boolean, so they only have true/false values. To activate a boolean property, add the corresponding attribute without a value.

```html
<wa-button disabled>Click me</wa-button>
```

## Events

You can listen for standard events such as `click`, `mouseover`, etc. as you normally would. In addition, some components have their own custom events. For example, you might listen to `wa-after-show` to determine when a dialog has been shown.

Custom Web Awesome events are prefixed with `wa-` to prevent collisions with standard events and other libraries. Refer to a component's documentation for a complete list of its events.

## Methods

Some components have methods you can call to trigger various behaviors. For example, you can set focus on a Web Awesome input using the `focus()` method.

```html
<wa-input></wa-input>

<script>
  const input = document.querySelector('wa-input');
  input.focus();
</script>
```

Refer to a component's documentation for a complete list of its methods and their arguments.

## Slots

Many components use slots to accept content inside of them. The most common slot is the _default_ slot, which includes any content inside the component that doesn't have a `slot` attribute.

For example, a button's default slot is used to populate its label.

```html
<wa-button>Click me</wa-button>
```

Some components also have _named_ slots. A named slot can be populated by adding a child element with the appropriate `slot` attribute. Notice how the icon below has the `slot="start"` attribute? This tells the component to place the icon into its `start` slot.

```html
<wa-button>
  <wa-icon slot="start" name="gear" variant="solid"></wa-icon>
  Settings
</wa-button>
```

The location of a named slot doesn't matter. You can put it anywhere inside the component and the browser will move it to the right place automatically!

Refer to a component's documentation for a complete list of available slots.

## Don't Use Self-closing Tags

Custom elements cannot have self-closing tags. Similar to `<script>` and `<textarea>`, you must always include the full closing tag.

```html
<!-- Don't do this -->
<wa-input />

<!-- Always do this -->
<wa-input></wa-input>
```

## Differences from Native Elements

You might expect similarly named elements to share the same API as native HTML elements, but this is not always the case. Web Awesome components **are not** designed to be one-to-one replacements for their HTML counterparts. While they usually share the same API, there may be subtle differences.

For example, `<button>` and `<wa-button>` both have a `type` attribute, but the native one defaults to `submit` while the Web Awesome one defaults to `button` since this is a better default for most users.

:::info
**Don't make assumptions about a component's API!** To prevent unexpected behaviors, please take the time to review the documentation and make sure you understand what each attribute, property, method, and event is intended to do.
:::

## Component Rendering and Updating

Web Awesome components are built with [Lit](https://lit.dev/), a tiny library that makes authoring custom elements easier, more maintainable, and a lot of fun! As a Web Awesome user, here is some helpful information about rendering and updating you should probably be aware of.

To optimize performance and reduce re-renders, Lit batches component updates. This means changing multiple attributes or properties at the same time will result in just a single re-render. In most cases, this isn't an issue, but there may be times you'll need to wait for the component to update before continuing.

Consider this example. We're going to change the `checked` property of the checkbox and observe its corresponding `checked` attribute, which happens to reflect.

```js
const checkbox = document.querySelector('wa-checkbox');
checkbox.checked = true;

console.log(checkbox.hasAttribute('checked')); // false
```

Most developers will expect this to be `true` instead of `false`, but the component hasn't had a chance to re-render yet so the attribute doesn't exist when `hasAttribute()` is called. Since changes are batched, we need to wait for the update before proceeding. This can be done using the `updateComplete` property, which is available on all Lit-based components.

```js
const checkbox = document.querySelector('wa-checkbox');
checkbox.checked = true;

checkbox.updateComplete.then(() => {
  console.log(checkbox.hasAttribute('checked')); // true
});
```

This time we see an empty string, which means the boolean attribute is now present!

:::info
To wait for multiple components to update, you can use `requestAnimationFrame()` instead of awaiting each element.
:::

## Customizing

You can customize the look and feel of Web Awesome at a high level with themes. For more advanced customizations, you can make use of CSS parts and custom properties to target individual components.

### Themes

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

### Components

While themes offer a high-level way to customize the library, components offer different hooks as a low-level way to customize them individually.

Web Awesome components use a [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) to encapsulate their styles and behaviors. As a result, you can't simply target their internals with the usual CSS selectors. Instead, components expose a set of custom properties and CSS parts that can be targeted to customize their appearance.

#### Custom Properties

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

#### Custom States

Components can expose custom states that allow you to style them based on their current condition using the `:state()` selector. Custom states provide a way to target specific component states that aren't covered by standard pseudo-classes like `:hover` or `:focus`.
Here's an example that styles a checkbox that's checked.

```css
wa-checkbox:state(checked) {
  outline: dotted 2px tomato;
}
```

Custom states can be combined with CSS parts and custom properties to create sophisticated customizations. The custom states exposed by each component can be found in the component's API documentation under the "Custom States" section.

#### CSS Parts

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

### Native Elements

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

## Code Completion

### VS Code

Web Awesome ships with a file called `vscode.html-custom-data.json` that can be used to describe its custom elements to [Visual Studio Code](https://code.visualstudio.com/). This enables code completion for Web Awesome components (also known as “code hinting” or “IntelliSense”). To enable it, you need to tell VS Code where the file is.

1. [Install Web Awesome locally](/docs/#installing-via-npm)
2. If it doesn’t already exist, create a folder called `.vscode` at the root of your project
3. If it doesn’t already exist, create a file inside that folder called `settings.json`
4. Add the following to the file

```json
{
  "html.customData": ["./node_modules/@awesome.me/webawesome/dist/vscode.html-custom-data.json"]
}
```

If `settings.json` already exists, simply add the above line to the root of the object. Note that you may need to restart VS Code for the changes to take effect.

### JetBrains IDEs

If you are using a [JetBrains IDE](https://www.jetbrains.com/) and you are installing Web Awesome from NPM, the editor will automatically detect the `web-types.json` file from the package and you should immediately see component information in your editor.

Be sure to add a reference to the `web-types.json` file in your `package.json` in order for your editor to properly detect it.

```json
{
  ...
  "web-types": "./web-types.json"
  ...
}
```

If you are using types from multiple projects, you can add an array of references.

```json
{
  ...
  "web-types": [
    ...,
    "./web-types.json"
  ]
  ...
}
```

### Other Editors

Most popular editors support custom code completion with a bit of configuration. Please [submit a feature request](https://github.com/shoelace-style/webawesome/issues/new/choose) for your editor of choice. PRs are also welcome!
