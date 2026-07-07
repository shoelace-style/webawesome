---
title: Astro
description: Tips for using Web Awesome in your Astro app.
layout: framework
officialDocs: https://docs.astro.build
---

## Installation

To add Web Awesome to your Astro app, install the package from npm.

```bash
npm install @awesome.me/webawesome
```

## Usage

Web Awesome components render on the client. Import the ones you need as client scripts, and add the global stylesheet in your frontmatter:

```jsx
---
import "@awesome.me/webawesome/dist/styles/webawesome.css";
---

<script>
import "@awesome.me/webawesome/dist/components/button/button.js"
</script>

<wa-button>Hello World</wa-button>
```

<wa-callout variant="success">
  <div class="wa-flank:end wa-gap-xl">
    <p>
      <strong>Web Awesome is ready to use.</strong><br />
      Want server-side rendering too?
    </p>
    <wa-button size="small" variant="success" href="#server-side-rendering">
      Add SSR
    </wa-button>
  </div>
</wa-callout>

## Server-Side Rendering

With server-side rendering, your Web Awesome components render to HTML on the server, so pages display fully styled before client-side JavaScript loads. Learn more in the [SSR docs](/docs/ssr).

To add SSR support to Astro, follow the steps below.

### Install the Adapter

The Web Awesome team maintains an [Astro adapter](https://github.com/shoelace-style/astro-lit) to help you set up SSR. Install it from npm:

```bash
npm install @awesome.me/astro-lit
```

### Register the Plugin

Once installed, you can register the plugin in your `astro.config.mjs` file.

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';

import lit from '@awesome.me/astro-lit';

// https://astro.build/config
export default defineConfig({
  // ...
  integrations: [lit()],
});
```

### Register Components

With the plugin in place, register your components in two places — once on the **server** and once on the **client** — and make sure the hydration scripts run before any client components.

:::warning
<strong>Import the hydration scripts before any client components.</strong><br />
Otherwise components hydrate more than once and the page breaks.
:::

Here's the previous example updated:

```jsx
---
// Global CSS
import "@awesome.me/webawesome/dist/styles/webawesome.css";

// server imports
import "@awesome.me/webawesome/dist/components/button/button.js"
---

<script>
// Must run before any client component imports
import "@awesome.me/astro-lit/dsd-polyfill.js"
import "@awesome.me/astro-lit/hydration-support.js"

// client imports
import "@awesome.me/webawesome/dist/components/button/button.js"
</script>

<wa-button>Hello World</wa-button>
```

<wa-callout variant="success">
  <strong>That's it!</strong> You're set up to use Web Awesome with SSR.
</wa-callout>

### See It in Action

Need an example of a complete Astro SSR project using Web Awesome?

<div class="modern-card-list info-cards">
  <section class="search-list-grid">
    <a class="hover-grow hover-emphasize-border duotone-hover-context" data-duotone-hover-trigger href="https://github.com/KonnorRogers/webawesome-astro-ssr/" target="_blank" rel="noopener noreferrer">
      <wa-card>
        <wa-icon class="info-card-icon duotone-illustrated duotone-secondary-reveal" name="file-code" family="duotone" variant="regular"></wa-icon>
        <span class="page-name">Example Repository</span>
        <p class="modern-card-summary">A complete Astro SSR project using Web Awesome.</p>
      </wa-card>
    </a>
    <a class="hover-grow hover-emphasize-border duotone-hover-context" data-duotone-hover-trigger href="https://webawesome-astro.netlify.app" target="_blank" rel="noopener noreferrer">
      <wa-card>
        <wa-icon class="info-card-icon duotone-illustrated duotone-secondary-reveal" name="globe" family="duotone" variant="regular"></wa-icon>
        <span class="page-name">Live Demo</span>
        <p class="modern-card-summary">See the Astro SSR example deployed and running.</p>
      </wa-card>
    </a>
  </section>
</div>
