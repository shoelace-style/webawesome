---
title: Server Side Rendering
description: A document on how to get started with SSR in Web Awesome.
layout: page
---

## Caveats

SSR in Web Awesome is to be considered experimental. There are bugs and timing issues. There are things to iron out. Please bear with us. Part of the experimental status comes from Lit SSR being experimental, and all of our components originally being designed as client only.

## Adding hydration to the Frontend

If you're using the `webawesome.loader.js` file which automatically loads , make sure to change it to `webawesome.ssr-loader.js`

```diff
- <script type="module" src="https://early.webawesome.com/webawesome@3.0.0-alpha.2/dist/webawesome.loader.js"></script>
+ <script type="module" src="https://early.webawesome.com/webawesome@3.0.0-alpha.2/dist/webawesome.ssr-loader.js"></script>
```

If you're using a bundler:

```js
// Make sure this import is first.
import "@lit-labs/ssr-client/lit-element-hydrate-support.js"

import "webawesome/dist/components/button/button.js"
import "webawesome/dist/components/input/input.js"
```

## Server rendering

SSR on your backend is largely dependent on what backend you're using.

For docs on how to hook up your backend, checkout this document from Lit:

<https://lit.dev/docs/ssr/server-usage/>

For example, here's roughly what the 11ty integration looks like:

```js
// eleventy.config.js

import litPlugin from '@lit-labs/eleventy-plugin-lit';

 eleventyConfig.addPlugin(litPlugin, {
  mode: 'worker',
  componentModules: [
    "webawesome/dist/components/button/button.js",
    "webawesome/dist/components/input/input.js"
  ]
});
```

## Hydration

All Web Awesome components that get SSR'ed will have `did-ssr=""` on them.

For example: `<wa-button did-ssr="">`

This can help if you need some styling prior to the element connecting.

## Timing issues

Before setting any properties on your frontend, it is important to first wait for the element to be defined, and then wait for its update to complete.

```js
const rating = document.querySelector("wa-rating")

// If we dont want for the component to be defined, and for the initial hydration to finish, we will get a hydration error from Lit.
await customElements.whenDefined("wa-rating")
await rating.updateComplete

rating.getSymbol = () => '<wa-icon name="heart" variant="solid"></wa-icon>';
```

## Usage with Turbo

Turbo, the Hotwire library, has an issue with SSR + declarative shadow dom. To fix this, you can add the following.

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

// Fixes an issue with DSD keeping the `<template>` elements hanging around in the lightdom.
// https://github.com/hotwired/turbo/issues/1292
['turbo:before-render', 'turbo:before-stream-render', 'turbo:before-frame-render'].forEach(eventName => {
  document.addEventListener(eventName, fixDeclarativeShadowDOM);
});
```

## Additional TODOs

- [ ] - `@shoelace-style/localize` (our localization library) has no way to set a language currently so it always falls back to `en`.
- [ ] - `<wa-icon>` has no fallback if there's no JS besides a blank `<svg>`. There's perhaps some backend mechanisms we can use to fetch. But requires altering APIs. Should also have a way to set height / widths, but we dont want to increase pain for SSR users.
- [ ] - `<wa-qr-code>` QR Code will not error on the backend and will render a blank canvas at the appropriate size, but will not render the canvas until the client component connects.
- [ ] - `setBasePath` and `kit codes` may need reconfiguring to work with SSR.