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

{{ site.name }} components are just regular HTML elements, or [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) to be precise. You can use them like any other element. Each component has detailed documentation that describes its full API, including properties, events, methods, and more.

If you're new to custom elements, often referred to as "web components," this section will familiarize you with how to use them.

## Attributes & Properties

Many components have properties that can be set using attributes. For example, buttons accept a `size` attribute that maps to the `size` property which dictates the button's size.

```html
<wa-button size="small">Click me</wa-button>
```

Some properties are boolean, so they only have true/false values. To activate a boolean property, add the corresponding attribute without a value.

```html
<wa-button disabled>Click me</wa-button>
```

:::info
Avoid using self-closing tags! Custom elements cannot be void elements and must always include a closing tag.
:::

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

## Events

You can listen for standard events such as `click`, `mouseover`, etc. as you normally would. In addition, some components have their own custom events. For example, you might listen to `wa-after-show` to determine when a dialog has been shown.

Custom {{ site.name }} events are prefixed with `wa-` to prevent collisions with standard events and other libraries. Refer to a component's documentation for a complete list of its events.

If you're using React or another framework with synthetic events, see the [framework guides](/docs/frameworks) for caveats around binding to custom event names.

## Methods

Some components have methods you can call to trigger various behaviors. For example, you can set focus on a {{ site.name }} input using the `focus()` method.

```html
<wa-input></wa-input>

<script>
  const input = document.querySelector('wa-input');
  input.focus();
</script>
```

Refer to a component's documentation for a complete list of its methods and their arguments.

## Differences from Native Elements

You might expect similarly named elements to share the same API as native HTML elements, but this is not always the case. {{ site.name }} components **are not** designed to be one-to-one replacements for their HTML counterparts. While they usually share the same API, there may be subtle differences.

For example, `<button>` and `<wa-button>` both have a `type` attribute, but the native one defaults to `submit` while the {{ site.name }} one defaults to `button` since this is a better default for most users.

:::info
**Don't make assumptions about a component's API!** To prevent unexpected behaviors, please take the time to review the documentation and make sure you understand what each attribute, property, method, and event is intended to do.
:::

## Waiting for Components to Be Ready

When you interact with components from JavaScript on first load, the elements may not have upgraded yet. Unlike traditional frameworks, custom elements don't have a centralized initialization phase, so you need to verify that a component has been registered before reading its properties or calling its methods.

You can use the [`customElements.whenDefined()`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/whenDefined) method to ensure a specific component is ready:

```ts
await customElements.whenDefined('wa-button');

// <wa-button> is ready to use!
const button = document.querySelector('wa-button');
```

When working with multiple components, checking each one individually can become tedious. For convenience, {{ site.name }} provides the `allDefined()` function which automatically detects and waits for all {{ site.name }} components in the DOM to be initialized before resolving.

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

Here is an example of using `match` and `root` to await registration of {{ site.name }} components inside an element with an id of `sidebar`, plus a `<my-component>` element if present in the DOM, and `<wa-slider>` and `<other-slider>` elements whether present in the DOM or not:

```js
import { allDefined } from '/dist/webawesome.js';

await allDefined({
  match: tagName => tagName.startsWith('wa-') || tagName === 'my-component',
  root: document.getElementById('sidebar'),
  additionalElements: ['wa-slider', 'other-slider'],
});
```

</wa-details>

## Component Rendering and Updating

{{ site.name }} components are built with [Lit](https://lit.dev/), a tiny library that makes authoring custom elements easier, more maintainable, and a lot of fun! As a {{ site.name }} user, here is some helpful information about rendering and updating you should probably be aware of.

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

This time we see `true`, confirming the boolean attribute is present after the update.

:::info
To wait for multiple components to update, await all of their `updateComplete` promises together:

```js
await Promise.all(elements.map(el => el.updateComplete));
```
:::

## Code Completion

### VS Code

{{ site.name }} ships with a file called `vscode.html-custom-data.json` that can be used to describe its custom elements to [Visual Studio Code](https://code.visualstudio.com/). This enables code completion for {{ site.name }} components (also known as “code hinting” or “IntelliSense”). To enable it, you need to tell VS Code where the file is.

1. [Install {{ site.name }} locally](/docs/#installing-via-npm)
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

If you are using a [JetBrains IDE](https://www.jetbrains.com/) and you are installing {{ site.name }} from NPM, the editor will automatically detect the `web-types.json` file from the package and you should immediately see component information in your editor.

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

## Where to Go Next

- [Customizing](/docs/customizing) — themes, CSS parts, custom properties, and custom states.
- [Form Controls](/docs/form-controls) — using {{ site.name }} inputs, validation, and form submission.
- [Frameworks](/docs/frameworks) — guides for React, Vue, Angular, and Svelte.
- [Localization](/docs/localization) — translating component strings and configuring text direction.
- [Preventing FOUCE](/docs/utilities/fouce) — avoid the flash of un-upgraded custom elements on first load.
