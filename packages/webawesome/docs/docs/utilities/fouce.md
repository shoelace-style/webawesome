---
title: Reducing FOUCE
description: Utility to improve the loading experience by hiding non-prerendered custom elements until they are registered.
layout: docs
tags: styleUtilities
synonyms:
  - flash of unstyled content
  - custom element flash
  - FOUC
  - CLS
use-cases:
  - component loading flash
  - undefined element
  - hydration flash
  - layout shift
---

<wa-breadcrumb style="display: flex; width: 100%; background-color: var(--wa-color-surface-default); border: var(--wa-panel-border-width) var(--wa-panel-border-style) var(--wa-color-surface-border); box-shadow: var(--wa-shadow-s); border-radius: 9999px; padding: var(--wa-space-xs) var(--wa-space-m); margin-block-end: var(--wa-space-l);">
  <wa-icon slot="separator" name="angle-right" variant="regular"></wa-icon>
  <wa-breadcrumb-item href="/docs/utilities">CSS Utilities</wa-breadcrumb-item>
  <wa-breadcrumb-item>{{ title }}</wa-breadcrumb-item>
</wa-breadcrumb>

Often, components are shown before their logic and styles have had a chance to load, also known as a [Flash of Undefined Custom Elements](https://www.abeautifulsite.net/posts/flash-of-undefined-custom-elements/).

The FOUCE style utility takes care of hiding custom elements until **both they and their contents** have been registered, up to a maximum of two seconds.

## Cloaking

In many cases, this is not enough, and you may wish to hide a broader wrapper element or even the entire page until all WA elements within it have loaded.
To do that, you can add the `wa-cloak` class to any element on the page or even apply it to the whole page by placing the class on the `<html>` element:

```html
<html class="wa-cloak">
  ...
</html>
```

As soon as all elements are registered _or_ after two seconds have elapsed, the autoloader will show the page. The two-second timeout prevents blank screens from persisting on slow networks and pages that have errors.

## Turbo (Hotwire) Users

If you're using [Turbo](https://turbo.hotwired.dev/) to serve a multi-page application (MPA) as a single page application (SPA), you might notice FOUCE when navigating from page to page. This is because Turbo renders the new page's content before the autoloader has a chance to register new components.

The following function acts as a middleware to ensure components are registered _before_ the page shows, eliminating FOUCE for page-to-page navigation with Turbo.

```js
import { preventTurboFouce } from '/dist/webawesome.js';

preventTurboFouce();
```
