---
title: Astro
description: Tips for using Web Awesome in your Astro app.
layout: framework
---

To get started using Web Awesome in Astro, you must first install it from NPM.

```bash
npm install @awesome.me/webawesome
```

Once you've installed it from NPM, you can import component as "client" scripts, and add the "global" stylesheet in the frontmatter.

```jsx
---
import "@awesome.me/webawesome/dist/styles/webawesome.css";
---

<script>
import "@awesome.me/webawesome/dist/components/button/button.js"
</script>

<wa-button>Hello World</wa-button>
```

These components will be "client" side rendered.

## SSR (Server Side Rendering)

The Web Awesome team maintains an Astro adapter to help you get started with SSR.

<https://github.com/shoelace-style/astro-lit>

To get started, install the adapter from NPM.

```bash
npm install @awesome.me/astro-lit
```

Now we have to go register the plugin in our `astro.config.mjs`

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

Once our plugin is setup, you must now register components in 2 places, one on the "server", one on the "client", as well as make sure our `hydration` script runs before any client components register.

So the previous example should look like this:

```jsx
---
// Global CSS
import "@awesome.me/webawesome/dist/styles/webawesome.css";

// server imports
import "@awesome.me/webawesome/dist/components/button/button.js"
---

<script>
// **!! VERY IMPORTANT !!**
// These 2 imports must come first before importing any components on the client. If not, you will end up with things rendering more than once and things will look very, very broken.
import "@awesome.me/astro-lit/dsd-polyfill.js"
import "@awesome.me/astro-lit/hydration-support.js"

// client imports
import "@awesome.me/webawesome/dist/components/button/button.js"
</script>

<wa-button>Hello World</wa-button>
```

An example can be found here:

<https://github.com/KonnorRogers/webawesome-astro-ssr/>

As well as a demo:

<https://webawesome-astro.netlify.app>