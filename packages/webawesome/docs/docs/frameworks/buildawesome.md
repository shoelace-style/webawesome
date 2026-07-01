---
title: Build Awesome (11ty)
description: Tips for using Web Awesome in your Build Awesome (11ty) app.
layout: framework
---

Due to Build Awesome (11ty) being relatively unopinionated, there are many different ways to setup Web Awesome with your Build Awesome / 11ty site.

The easiest way to use Web Awesome with Build Awesome is via NPM, since you're most likely using Build Awesome via NPM.

## Installation


```js
npm install @awesome.me/webawesome
```

After installing Web Awesome, we need to make our components available to the "frontend", we can do so by using `addPassthroughCopy`.

If you haven't already, create a `eleventy.config.js`


and do the following:

```js
// eleventy.config.js

const webawesomeDir = "./node_modules/@awesome.me/webawesome"

export default async function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    webawesomeDir: "webawesome",
  });
};

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

And then in the `<head>` of your layout, add the following:

```html
<head>
  <link href="{{ "/webawesome/dist-cdn/styles/webawesome.css" | url }}" rel="stylesheet">
  <script type="module" src="{{ "/webawesome/dist-cdn/webawesome.loader.js" | url }}"></script>
</head>
```

And you're all set up to use Web Awesome! But you can still go 1 step further and add [SSR](/docs/ssr).

## Adding SSR

To add SSR, first install the `@lit-labs/eleventy-plugin-lit` plugin.

```bash
npm install @lit-labs/eleventy-plugin-lit
```

And now you can update your `eleventy.config.js` to add the plugin.

```diff
// eleventy.config.js

import litPlugin from '@lit-labs/eleventy-plugin-lit'
import * as fs from "node:fs"
import * as path from "node:path"

const webawesomeDir = "./node_modules/@awesome.me/webawesome"
const webawesomeComponentsDir = path.join(webawesomeDir, "dist", "components")
const webawesomeComponents = fs.readdirSync(webawesomeComponentsDir).map((componentName) => {
  return path.join(webawesomeComponentsDir, componentName, componentName + ".js")
})

export default async function(eleventyConfig) {
  eleventyConfig.addPlugin(litPlugin, {
    mode: 'worker',
    componentModules: webawesomeComponents
  });

  eleventyConfig.addPassthroughCopy({
    webawesomeDir: "webawesome",
  });
};

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

And now you must update your layout file to use the SSR loader instead of the regular loader.

```html
<head>
  <link href="{{ "/webawesome/dist-cdn/styles/webawesome.css" | url }}" rel="stylesheet">
  <script type="module" src="{{ "/webawesome/dist-cdn/webawesome.ssr-loader.js" | url }}"></script>
</head>
```

And thats it! You should be all setup with Web Awesome + SSR!

There are many other different ways to setup Web Awesome including things like bundlers, CDN only, preprocessing CSS, etc. This we felt was the simplest and still robust setup to get you started. A nice, middleground for both new and experienced Build Awesome users.

An example repo can be found here:

<https://github.com/KonnorRogers/11ty-webawesome-ssr>

As well as the deployed site:

<https://konnorrogers.github.io/11ty-webawesome-ssr/>