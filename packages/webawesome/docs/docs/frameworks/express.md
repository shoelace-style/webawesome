---
title: Express
description: Tips for using Web Awesome in your Express app.
layout: framework
---

There isn't much to know with Express as it is relatively unopinionated.

If you're using a frontend framework with Express such as [React](/docs/frameworks/react), [Vue](/docs/frameworks/vue), [Svelte](/docs/frameworks/svelte), etc. Please refer to those specific frameworks as they may have different setup and integration instructions.

[Framework Integrations](/docs/frameworks)

In a bare minimal Express app the following will work "as expected"

```js
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="{% cdnUrl 'styles/webawesome.css' %}" />
        <script type="module" src="{% cdnUrl 'webawesome.loader.js' %}"></script>
      </head>
      <body>
        <wa-page>
          <wa-button>Hello World</wa-button>
        </wa-page>
      </body>
    </html>
  `)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

The key piece is:

```html
<head>
  <link rel="stylesheet" href="{% cdnUrl 'styles/webawesome.css' %}" />
  <script type="module" src="{% cdnUrl 'webawesome.loader.js' %}"></script>
</head>
```

Which is what will load Web Awesome.

There are other ways to setup Web Awesome such as with NPM or downloading ZIP files which are documented on our [Installation](/docs) page

## Adding SSR (Server Side Rendering)

SSR can be added to your express app by "transforming" your responses.

The first step is to install Web Awesome to your `node_modules` folder.

```js
npm install @awesome.me/webawesome
```

After installing, you will need to do a few things:

1. Register the Web Awesome components in the "server" component registry
1. import the `renderString` function from `@awesome.me/webawesome/dist/ssr/render-string.js`
1. Setup the `LitElementRenderer`
1. Modify the `response` call to "transform" the string with Lit SSR.

```diff-javascript
+ // Will register all web awesome components on your server
+ import "@awesome.me/webawesome/dist/ssr.js"
+ // Will transform a plain HTML string into a Lit Template, run SSR, and then turn it back into a string.
+ import { renderString } from "@awesome.me/webawesome/dist/ssr/render-string.js";
+ import {LitElementRenderer} from '@lit-labs/ssr';
+ // Call connectedCallback for `my-element` by returning an options object with `connectedCallback` set to true.
+ LitElementRenderer.renderOptions.push(
+  (element) => element.localName.startsWith('wa-') ? {connectedCallback: true} : undefined
+ );

import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
+  res.send(renderString(`
-  res.send(`
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="{% cdnUrl 'styles/webawesome.css' %}" />
        <script type="module" src="{% cdnUrl 'webawesome.loader.js' %}"></script>
      </head>
      <body>
        <wa-page>
          <wa-button>Hello World</wa-button>
        </wa-page>
      </body>
    </html>
+  `))
-  `)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

<wa-details summary="Full code without diff">

```js
// Will register all web awesome components on your server
import "@awesome.me/webawesome/dist/ssr.js"
// Will transform a plain HTML string into a Lit Template, run SSR, and then turn it back into a string.
import { renderString } from "@awesome.me/webawesome/dist/ssr/render-string.js";
import {LitElementRenderer} from '@lit-labs/ssr';
// Call connectedCallback for all Web Awesome elements by returning an options object with `connectedCallback` set to true.
LitElementRenderer.renderOptions.push(
 (element) => element.localName.startsWith('wa-') ? {connectedCallback: true} : undefined
);

import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(renderString(`
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="{% cdnUrl 'styles/webawesome.css' %}" />
        <script type="module" src="{% cdnUrl 'webawesome.loader.js' %}"></script>
      </head>
      <body>
        <wa-page>
          <wa-button>Hello World</wa-button>
        </wa-page>
      </body>
    </html>
  `))
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

</wa-details>

<br><br>

If you're using a view engine library such as Pug, Haml, Nunjucks, etc, you can add a middleware to capture the rendering function and transform the string.

:::warning
The below middleware is a quick and dirty hack. If these routes ever serve non-HTML routes such as JSON, CSV, even emails for older clients, etc, it is worth adding a content-type check or some sort of flag on the rendering not to transform it with Lit. It is out of the scope of this page to cover that however.
:::

```js
// Will register all web awesome components on your server
import "@awesome.me/webawesome/dist/ssr.js"
// Will transform a plain HTML string into a Lit Template, run SSR, and then turn it back into a string.
import { renderString } from "@awesome.me/webawesome/dist/ssr/render-string.js";
import {LitElementRenderer} from '@lit-labs/ssr';
// Call connectedCallback for all Web Awesome elements by returning an options object with `connectedCallback` set to true.
LitElementRenderer.renderOptions.push(
 (element) => element.localName.startsWith('wa-') ? {connectedCallback: true} : undefined
);

import express from 'express';

const app = express();
const port = 3000;

app.set('view engine', 'nunjucks')
app.set('views', 'views')

app.use((req, res, next) => {
  // Store the original render function
  const original = res.render.bind(res);

  // re-define it
  res.render = (view, options, callback) => {
    if (typeof options === "function") {
      callback = options;
      options = {};
    }

    original(view, options, (err, html) => {
      if (err) {
        return typeof callback === "function" ? callback(err) : next(err);
      }

      const out = renderString(html);

      if (typeof callback === "function") {
        return callback(null, out);
      }

      return res.send(out);
    });
  };

  next();
});

app.get('/', (req, res) => {
  // Assumes you have something like `views/index.njk`
  res.render("index")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

If you'd like to see an example repo, one can be found here:

<https://github.com/KonnorRogers/webawesome-ssr-express>