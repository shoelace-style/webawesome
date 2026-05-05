---
title: Installation
description: Choose the installation method that works best for you.
layout: page-outline
---

Welcome to {{ site.name }}! [Learn more](https://webawesome.com/) about this project and [how to contribute to it](https://webawesome.com/docs/resources/contributing).

You can load {{ site.name }} via CDN or by installing it locally. If you’re using a framework, make sure to check out the pages for [React](/docs/frameworks/react), [Vue](/docs/frameworks/vue), [Angular](/docs/frameworks/angular), and [Svelte](/docs/frameworks/svelte) for additional information.

---

## CDN (Easiest)

The CDN is the fastest way to get started with {{ site.name }}. Just copy and paste the following into the `<head>` of your HTML to get started!

```html
<link rel="stylesheet" href="{% cdnUrl 'styles/webawesome.css' %}">
<script type="module" src="{% cdnUrl 'webawesome.loader.js' %}"></script>
```

Now you can [use any {{ site.name }} component](/docs/components)! Try putting a button on the page:

```html
<wa-button variant="brand">Click me!</wa-button>
```

:::pro
Pro users: get installation instructions from <a href="/workspaces">your&nbsp;workspaces</a> instead.
:::

## Installing with npm

Start by installing the {{ site.name }} package:

```bash
npm install @awesome.me/webawesome
```

Then, in your JavaScript files, import the default theme and any components you want to use.

```js
// Web Awesome styles
import '@awesome.me/webawesome/dist/styles/webawesome.css';

// Import the components you want to use
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/input/input.js';
```

Once a component has been imported, you can use it in your HTML normally. Components are cherry picked to ensure you're getting the smallest possible bundle. You can find each component import in the "Importing" section of its documentation.

:::pro
Pro users: get installation instructions from <a href="/workspaces">your&nbsp;workspaces</a> instead.
:::

## Get the Download (Advanced)

You can download {{ site.name }} from npm and self-host it.

```bash
npm pack @awesome.me/webawesome
```

This will download a `.tgz` archive containing all {{ site.name }} files. Extract it and host the files on your own server.

---

## Additional Setup

### The Difference Between `/dist` & `/dist-cdn`

If you have {{ site.name }} installed locally via npm, you'll notice the following directories in the project's root:

```
dist/
dist-cdn/
```

The `dist-cdn` files come with everything bundled together, so you can use them directly without a build tool. The dist files keep dependencies separate, which lets your bundler optimize and share code more efficiently.

Use `dist-cdn` if you're loading directly in the browser or from a CDN. Use `dist` if you're using a bundler like Webpack or Vite.

### Referencing Necessary Styles

If you're self-hosting {{ site.name }}, you'll need to set up your pages to reference any necessary styles. You can do so by referencing `webawesome.css`, or you can pick and choose specific stylesheets you'd like to use.

```html
<!-- Option 1: use all Web Awesome styles -->
<link rel="stylesheet" href="/dist/styles/webawesome.css" />


<!-- Option 2: pick and choose styles -->

<!-- theme (required) -->
<link rel="stylesheet" href="/dist/styles/themes/default.css" />

<!-- native styles (optional) -->
<link rel="stylesheet" href="/dist/styles/native.css" />

<!-- CSS utilities (optional) -->
<link rel="stylesheet" href="/dist/styles/utilities.css" />
```

If you choose to use a theme other than the default theme, be sure to add the corresponding class (e.g. `.wa-theme-awesome`) to your `<html>` element so that the class is applied.

### Setting the Base Path

Some components rely on assets (icons, images, etc.) and {{ site.name }} needs to know where they're located. For convenience, {{ site.name }} will try to auto-detect the correct location based on the script you've loaded it from. This assumes assets are colocated with `webawesome.loader.js` and will "just work" for most users.

==If you're using the CDN, you can skip this section.== However, if you're using npm or a downloaded version, you'll need to set the base path. You can do this one of two ways.

```html
<!-- Option 1: the data-webawesome attribute -->
<script src="bundle.js" data-webawesome="/path/to/webawesome/dist"></script>

<!-- Option 2: the setBasePath() method -->
<script type="module">
  import { setBasePath } from '/path/to/webawesome/dist/webawesome.js';
  setBasePath('/path/to/webawesome/dist');
</script>
```

### Referencing Assets

Most of the magic behind assets is handled internally by {{ site.name }}, but if you need to reference the base path for any reason, the same module exports a function called `getBasePath()`. An optional string argument can be passed, allowing you to get the full path to any asset.

```html
<script type="module">
  import { getBasePath, setBasePath } from '/path/to/webawesome/dist/webawesome.js';

  setBasePath('/path/to/assets');

  // ...

  // Get the base path, e.g. /path/to/assets
  const basePath = getBasePath();

  // Get the path to an asset, e.g. /path/to/assets/file.ext
  const assetPath = getBasePath('file.ext');
</script>
```

### Using Font Awesome Pro and Pro+

{{ site.siblings.fontAwesome.name }} users can provide their kit code to unlock Pro and Pro+ icon packs. You can do so by adding the `data-fa-kit-code` attribute to any element on the page, or by calling the `setKitCode()` method.

```html
<!-- Option 1: the data-fa-kit-code attribute -->
<script src="bundle.js" data-fa-kit-code="abc123"></script>

<!-- Option 2: the setKitCode() method -->
<script type="module">
  import { setKitCode } from '{% cdnUrl 'webawesome.loader.js' %}';
  setKitCode('YOUR_KIT_CODE_HERE');
</script>
```

Now you can use {{ site.siblings.fontAwesome.name }} icons through the [`<wa-icon>`](/docs/components/icon) component!