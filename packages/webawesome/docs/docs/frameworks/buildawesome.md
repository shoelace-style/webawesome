---
title: Build Awesome (11ty)
description: Tips for using Web Awesome in your Build Awesome (11ty) app.
layout: framework
officialDocs: https://www.11ty.dev
---

Build Awesome (11ty) is relatively unopinionated, so there are several ways to add Web Awesome — the simplest is via npm, which your project most likely already uses.

## Installation

To add Web Awesome to your Build Awesome site, install the package from npm.

```bash
npm install @awesome.me/webawesome
```

## Usage

### Copy the Assets

Web Awesome's assets must be available to the browser. Add `addPassthroughCopy` to your `eleventy.config.js` to copy them into your build output — create the file if you don't have one yet:

```js
// eleventy.config.js

const webawesomeDir = './node_modules/@awesome.me/webawesome';

export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    webawesomeDir: 'webawesome',
  });
}

export const config = {
  markdownTemplateEngine: 'njk',
  dir: {
    input: 'pages',
    includes: '_includes',
    layouts: '_layouts',
  },
  templateFormats: ['njk', 'md'],
};
```

### Load the Styles & Loader

Add the stylesheet and component loader to your layout's `<head>`:

```html
<head>
  <link href="{{ "/webawesome/dist-cdn/styles/webawesome.css" | url }}" rel="stylesheet">
  <script type="module" src="{{ "/webawesome/dist-cdn/webawesome.loader.js" | url }}"></script>
</head>
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

To add SSR support to Build Awesome (11ty), follow the steps below.

### Install the Plugin

Install the `@lit-labs/eleventy-plugin-lit` plugin from npm:

```bash
npm install @lit-labs/eleventy-plugin-lit
```

### Register the Plugin

Once installed, register the plugin in your `eleventy.config.js` file.

```js
// eleventy.config.js

import litPlugin from '@lit-labs/eleventy-plugin-lit';
import * as fs from 'node:fs';
import * as path from 'node:path';

const webawesomeDir = './node_modules/@awesome.me/webawesome';
const webawesomeComponentsDir = path.join(webawesomeDir, 'dist', 'components');
const webawesomeComponents = fs.readdirSync(webawesomeComponentsDir).map(componentName => {
  return path.join(webawesomeComponentsDir, componentName, componentName + '.js');
});

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(litPlugin, {
    mode: 'worker',
    componentModules: webawesomeComponents,
  });

  eleventyConfig.addPassthroughCopy({
    webawesomeDir: 'webawesome',
  });
}

export const config = {
  markdownTemplateEngine: 'njk',
  dir: {
    input: 'pages',
    includes: '_includes',
    layouts: '_layouts',
  },
  templateFormats: ['njk', 'md'],
};
```

### Swap in the SSR Loader

Update your layout to use the SSR loader instead of the default loader:

```html
<head>
  <link href="{{ "/webawesome/dist-cdn/styles/webawesome.css" | url }}" rel="stylesheet">
  <script type="module" src="{{ "/webawesome/dist-cdn/webawesome.ssr-loader.js" | url }}"></script>
</head>
```

### See It in Action

Need an example of a complete Build Awesome (11ty) SSR project using Web Awesome?

<div class="modern-card-list info-cards">
  <section class="search-list-grid">
    <a class="hover-grow hover-emphasize-border duotone-hover-context" data-duotone-hover-trigger href="https://github.com/KonnorRogers/11ty-webawesome-ssr" target="_blank" rel="noopener noreferrer">
      <wa-card>
        <wa-icon class="info-card-icon duotone-illustrated duotone-secondary-reveal" name="file-code" family="duotone" variant="regular"></wa-icon>
        <span class="page-name">Example Repository</span>
        <p class="modern-card-summary">A complete Build Awesome (11ty) SSR project using Web Awesome.</p>
      </wa-card>
    </a>
    <a class="hover-grow hover-emphasize-border duotone-hover-context" data-duotone-hover-trigger href="https://konnorrogers.github.io/11ty-webawesome-ssr/" target="_blank" rel="noopener noreferrer">
      <wa-card>
        <wa-icon class="info-card-icon duotone-illustrated duotone-secondary-reveal" name="globe" family="duotone" variant="regular"></wa-icon>
        <span class="page-name">Live Demo</span>
        <p class="modern-card-summary">See the 11ty SSR example deployed and running.</p>
      </wa-card>
    </a>
  </section>
</div>
