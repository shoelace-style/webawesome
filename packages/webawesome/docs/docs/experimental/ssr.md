---
title: Server Side Rendering
description: A document on how to get started with SSR in Web Awesome.
layout: page-outline
unlisted: true
---

Server Side Rendering ("SSR") means your webpage is rendered on the server before being sent to the user's browser. This provides a fully formed HTML page right from the start, which is great for SEO and initial load times. Once the page is rendered, JavaScript kicks in to "hydrate" the components which makes them interactive. The Web platform supports this through a feature called [Declarative Shadow DOM](https://web.dev/articles/declarative-shadow-dom).

:::warning
SSR in Web Awesome is experimental! There are some known bugs and timing issues. Part of the experimental status comes from Lit's SSR package also being experimental.
:::

## Enable Hydration

If you're using the `webawesome.loader.js` file which automatically loads, make sure to change it to `webawesome.ssr-loader.js`.

```diff
- <script type="module" src="/dist/webawesome.loader.js"></script>
+ <script type="module" src="/dist/webawesome.ssr-loader.js"></script>
```

If you're using a bundler, make sure it comes _before_ any components are imported.

```js
// Make sure this import is first.
import '@lit-labs/ssr-client/lit-element-hydrate-support.js';

import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/input/input.js';
```

## Enable Server Rendering

How to implement SSR on the backend is largely dependent on what stack you're using. For docs on how to hook up your backend, refer to [this document from Lit](https://lit.dev/docs/ssr/server-usage/).

For example, here's what the [11ty](https://www.11ty.dev/) integration looks like using [Lit's 11ty plugin](https://www.npmjs.com/package/@lit-labs/eleventy-plugin-lit).

```js
// eleventy.config.js

import litPlugin from '@lit-labs/eleventy-plugin-lit';

eleventyConfig.addPlugin(litPlugin, {
  mode: 'worker',
  componentModules: [
    '@awesome.me/webawesome/dist/components/button/button.js',
    '@awesome.me/webawesome/dist/components/input/input.js',
  ],
});
```

:::info
As SSR becomes more stable, we'll work to add more instructions for various frameworks and metaframeworks.
:::

## Helpful Tips

### The `did-ssr` Attribute

All Web Awesome components that get rendered for SSR will receive the `did-ssr` attribute.

```html
<wa-button did-ssr></wa-button>
```

This can help if you need some styling prior to the element connecting.

### Timing Issues

Before setting any properties on your frontend, it is important to first wait for the element to be defined and then wait for its first update to complete.

```js
const rating = document.querySelector('wa-rating');

// If we don't wait for the component to be defined the initial hydration, we will get a hydration error from Lit!
await customElements.whenDefined('wa-rating');
await rating.updateComplete;

rating.getSymbol = () => '<wa-icon name="heart" variant="solid"></wa-icon>';
```

### Usage with Turbo

The Hotwire library [Turbo](https://github.com/hotwired/turbo) has an issue with SSR + declarative shadow DOM. To fix this, you can add the following to every page that runs Turbo.

```js
function fixDeclarativeShadowDOM(e) {
  const newElement = e.detail.newBody || e.detail.newFrame || e.detail.newStream;
  if (!newElement) {
    return;
  }

  // https://developer.chrome.com/docs/css-ui/declarative-shadow-dom#polyfill
  (function attachShadowRoots(root) {
    root.querySelectorAll('template[shadowrootmode]').forEach(template => {
      const mode = template.getAttribute('shadowrootmode');
      const shadowRoot = template.parentNode.attachShadow({ mode });
      shadowRoot.appendChild(template.content);
      template.remove();
      attachShadowRoots(shadowRoot);
    });
  })(newElement);
}

// Fixes an issue with DSD keeping the `<template>` elements hanging around in the light DOM.
// https://github.com/hotwired/turbo/issues/1292
['turbo:before-render', 'turbo:before-stream-render', 'turbo:before-frame-render'].forEach(eventName => {
  document.addEventListener(eventName, fixDeclarativeShadowDOM);
});
```

## Known Issues

Here are some known issues and things we're still working on.

- `@shoelace-style/localize` (our localization library) has no way to set a language currently so it always falls back to `en`.
- `<wa-icon>` has no fallback if there's no JS besides a blank `<svg>`. There's perhaps some backend mechanisms we can use to fetch. But requires altering APIs. Should also have a way to set height / widths, but we don't want to increase pain for SSR users.
- `<wa-qr-code>` QR Code will not error on the backend and will render a blank canvas at the appropriate size, but will not render the canvas until the client component connects.
- `setBasePath` and `kit codes` may need reconfiguring to work with SSR.
