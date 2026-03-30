---
title: Installation
description: Choose the installation method that works best for you.
layout: page-outline
---

Welcome to Web Awesome! [Learn more](https://webawesome.com/) about this project and [how to contribute to it](https://webawesome.com/docs/resources/contributing).

- [Report a bug](https://github.com/shoelace-style/webawesome/issues)
- [Get help / ask a question](https://github.com/shoelace-style/webawesome/discussions)
- [See what's new since the last version](/docs/resources/changelog)

---

## CDN

The CDN is the fastest way to get started with Web Awesome. Just copy and paste the following into your HTML to get started!

<div class="include">
{%- raw -%}
{% include "installation-cdn.njk" %}
{% endraw %}
</div>

Once loaded, you can [start using Web Awesome components](/docs/usage) right away.

```html
<wa-button variant="brand">Click me!</wa-button>
```

---

## npm

<div class="include">
{%- raw -%}
{% include "installation-npm.njk" %}
{% endraw %}
</div>

:::warning
Web Awesome does not provide a single import with all Web Awesome components. Instead, you must "cherry pick" the components you want to use.
:::

Once they've been imported, you can use them in your HTML normally. Component imports are located in the "Importing" section of each component's documentation.

---

## Download

<div class="include">
{%- raw -%}
{% include "installation-download.njk" %}
{% endraw %}
</div>

---

## Additional Setup

### The Difference Between `/dist` & `/dist-cdn`

If you have Web Awesome installed locally via npm, you'll notice the following directories in the project's root:

```
dist/
dist-cdn/
```

The `dist-cdn` files come with everything bundled together, so you can use them directly without a build tool. The dist files keep dependencies separate, which lets your bundler optimize and share code more efficiently.

Use `dist-cdn` if you're loading directly in the browser or from a CDN. Use `dist` if you're using a bundler like Webpack or Vite.

### Referencing Necessary Styles

If you're self-hosting Web Awesome, you'll need to set up your pages to reference any necessary styles. You can do so by referencing `webawesome.css`, or you can pick and choose specific stylesheets you'd like to use.

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

Some components rely on assets (icons, images, etc.) and Web Awesome needs to know where they're located. For convenience, Web Awesome will try to auto-detect the correct location based on the script you've loaded it from. This assumes assets are colocated with `webawesome.loader.js` and will "just work" for most users.

==If you're using the CDN, you can skip this section.== However, if you're [cherry picking](#cherry-picking-from-cdn) or bundling Web Awesome, you'll need to set the base path. You can do this one of two ways.

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

Most of the magic behind assets is handled internally by Web Awesome, but if you need to reference the base path for any reason, the same module exports a function called `getBasePath()`. An optional string argument can be passed, allowing you to get the full path to any asset.

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

Font Awesome users can provide their kit code to unlock Pro and Pro+ icon packs. You can do so by adding the `data-fa-kit-code` attribute to any element on the page, or by calling the `setKitCode()` method.

```html
<!-- Option 1: the data-fa-kit-code attribute -->
<script src="bundle.js" data-fa-kit-code="abc123"></script>

<!-- Option 2: the setKitCode() method -->
<script type="module">
  import { setKitCode } from '{% cdnUrl 'webawesome.loader.js' %}';
  setKitCode('YOUR_KIT_CODE_HERE');
</script>
```

:::info
Not a Font Awesome user yet? [Learn more about Font Awesome icon packs](https://fontawesome.com/) and sign up for an account to unlock them!
:::

## React Users

React 19+ [supports custom elements](https://react.dev/blog/2024/04/25/react-19#support-for-custom-elements), so you can import them and use them as you'd expect. Just make sure you've included your Web Awesome theme into your app first.

```jsx
import '@awesome.me/webawesome/dist/components/button/button.js';

function App() {
  return <wa-button variant="brand">Button</wa-button>;
}

export default App;
```

If you're using TypeScript, you can add type safety using the types file located at:

```
node_modules/@awesome.me/webawesome/dist/custom-elements-jsx.d.ts
```

This gives you inline documentation, autocomplete, and type-safe validation for every component. You can add the types to your project by updating your `tsconfig.json` file as shown below.

```json
{
  "compilerOptions": {
    "types": ["node_modules/@awesome.me/webawesome/dist/custom-elements-jsx.d.ts"]
  }
}
```

Another way is to create a declaration file and extend JSX's `IntrinsicElements`:

```ts
import type { CustomElements, CustomCssProperties } from '@awesome.me/webawesome/dist/custom-elements-jsx.d.ts';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
  interface CSSProperties extends CustomCssProperties {}
}
```

:::details React 18 and below
React 18 and below have [poor support](https://custom-elements-everywhere.com/#react) for custom elements. For legacy versions of React, we provide React wrappers for every component. You can find the import instructions by selecting the _React_ tab from the _Importing_ section of each
component's documentation.
:::