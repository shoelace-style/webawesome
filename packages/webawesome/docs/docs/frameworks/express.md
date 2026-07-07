---
title: Express
description: Tips for using Web Awesome in your Express app.
layout: framework
officialDocs: https://expressjs.com
---

:::info
**Using Express with a frontend framework?** <br>Follow the [React](/docs/frameworks/react), [Vue](/docs/frameworks/vue), or [Svelte](/docs/frameworks/svelte) page instead, since their setup differs.
:::


## Usage

In a bare-minimum Express app, the following works as expected:

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
  `);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

The key piece is loading Web Awesome's stylesheet and loader in your `<head>`:

```html
<head>
  <link rel="stylesheet" href="{% cdnUrl 'styles/webawesome.css' %}" />
  <script type="module" src="{% cdnUrl 'webawesome.loader.js' %}"></script>
</head>
```

There are other ways to set up Web Awesome, such as with npm or downloading ZIP files, which are documented on the [Installation](/docs) page.

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

SSR works by rendering your HTML through Lit on the server. First, install Web Awesome locally:

```bash
npm install @awesome.me/webawesome
```

Then add the SSR setup to the top of your server. This registers the components and tells Lit to run each one's `connectedCallback` while rendering:

```js
// Register all Web Awesome components on the server
import '@awesome.me/webawesome/dist/ssr.js';
// renderString turns an HTML string into a Lit template, runs SSR, and returns a string
import { renderString } from '@awesome.me/webawesome/dist/ssr/render-string.js';
import { LitElementRenderer } from '@lit-labs/ssr';

LitElementRenderer.renderOptions.push(element =>
  element.localName.startsWith('wa-') ? { connectedCallback: true } : undefined,
);
```

Finally, wrap each HTML response in `renderString()`:

```diff
- res.send(`...your HTML...`);
+ res.send(renderString(`...your HTML...`));
```

<wa-details summary="Full example">

```js
// Register all Web Awesome components on the server
import '@awesome.me/webawesome/dist/ssr.js';
// renderString turns an HTML string into a Lit template, runs SSR, and returns a string
import { renderString } from '@awesome.me/webawesome/dist/ssr/render-string.js';
import { LitElementRenderer } from '@lit-labs/ssr';
LitElementRenderer.renderOptions.push(element =>
  element.localName.startsWith('wa-') ? { connectedCallback: true } : undefined,
);

import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(
    renderString(`
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
  `),
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

</wa-details>

### Using a View Engine

If you use a view engine such as Pug, Haml, or Nunjucks, add a middleware that runs each rendered view through `renderString`. It reuses the same SSR setup from above:

:::warning
<strong>This middleware transforms every response through Lit.</strong><br />
If a route can return non-HTML like JSON or CSV, add a content-type check so it skips the transform.
:::

```js
app.set('view engine', 'nunjucks');

// Transform each rendered view through Lit before sending
app.use((req, res, next) => {
  const original = res.render.bind(res);

  res.render = (view, options, callback) => {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    original(view, options, (err, html) => {
      if (err) return typeof callback === 'function' ? callback(err) : next(err);
      const out = renderString(html);
      return typeof callback === 'function' ? callback(null, out) : res.send(out);
    });
  };

  next();
});
```

### See It in Action

<div class="modern-card-list info-cards">
  <section class="search-list-grid">
    <a class="hover-grow hover-emphasize-border duotone-hover-context" data-duotone-hover-trigger href="https://github.com/KonnorRogers/webawesome-ssr-express" target="_blank" rel="noopener noreferrer">
      <wa-card>
        <wa-icon class="info-card-icon duotone-illustrated duotone-secondary-reveal" name="file-code" family="duotone" variant="regular"></wa-icon>
        <span class="page-name">Example Repository</span>
        <p class="modern-card-summary">A complete Express SSR project using Web Awesome.</p>
      </wa-card>
    </a>
  </section>
</div>
