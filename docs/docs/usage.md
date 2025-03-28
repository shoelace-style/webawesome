---
title: Usage
description: Learn more about using custom elements.
layout: page-outline
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

Some components also have _named_ slots. A named slot can be populated by adding a child element with the appropriate `slot` attribute. Notice how the icon below has the `slot="prefix"` attribute? This tells the component to place the icon into its `prefix` slot.

```html
<wa-button>
  <wa-icon slot="prefix" name="gear" variant="solid"></wa-icon>
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

## Waiting for Components to Load

Web components are registered with JavaScript, so depending on how and when you load Web Awesome, you may notice a [Flash of Undefined Custom Elements (FOUCE)](https://www.abeautifulsite.net/posts/flash-of-undefined-custom-elements/) when the page loads. There are a couple ways to prevent this, both of which are described in the linked article.

One option is to use the [`:defined`](https://developer.mozilla.org/en-US/docs/Web/CSS/:defined) CSS pseudo-class to "hide" custom elements that haven't been registered yet. You can scope it to specific tags or you can hide all undefined custom elements as shown below.

```css
:not(:defined) {
  visibility: hidden;
}
```

As soon as a custom element is registered, it will immediately appear with all of its styles, effectively eliminating FOUCE. Note the use of `visibility: hidden` instead of `display: none` to reduce shifting as elements are registered. The drawback to this approach is that custom elements can potentially appear one by one instead of all at the same time.

Another option is to use [`customElements.whenDefined()`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/whenDefined), which returns a promise that resolves when the specified element gets registered. You'll probably want to use it with [`Promise.allSettled()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) in case an element fails to load for some reason.

A clever way to use this method is to hide the `<body>` with `opacity: 0` and add a class that fades it in as soon as all your custom elements are defined.

```html
<style>
  body {
    opacity: 0;
  }

  body.ready {
    opacity: 1;
    transition: 0.25s opacity;
  }
</style>

<script type="module">
  await Promise.allSettled([
    customElements.whenDefined('wa-button'),
    customElements.whenDefined('wa-card'),
    customElements.whenDefined('wa-rating')
  ]);

  // Button, card, and rating are registered now! Add
  // the `ready` class so the UI fades in.
  document.body.classList.add('ready');
</script>
```

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
