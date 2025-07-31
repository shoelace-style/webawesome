---
title: Installation
description: Choose the installation method that works best for you.
layout: page-outline
---

Welcome to Web Awesome beta! [Learn more](https://webawesome.com/) about this project and [how to contribute to it](https://webawesome.com/docs/resources/contributing).

- [Report a bug](https://github.com/shoelace-style/webawesome/issues)
- [Get help / ask a question](https://github.com/shoelace-style/webawesome/discussions)
- [See what's new since the last version](/docs/resources/changelog)

---

## Quick Start (Autoloading via CDN)

To get everything included in Web Awesome, add the following code to the `<head>` of your site:

```html
<link rel="stylesheet" href="{% cdnUrl 'styles/webawesome.css' %}" />
<script type="module" src="{% cdnUrl 'webawesome.loader.js' %}"></script>
```

This snippet adds:

- **Web Awesome styles**, a collection of stylesheets including essential default theme styles, optional [styles for native elements](/docs/utilities/native) and optional [utility classes](/docs/utilities)
- **The autoloader**, a lightweight script watches the DOM for unregistered Web Awesome elements and lazy loads them for you — even if they're added dynamically

Now you can [start using Web Awesome!](/docs/usage)

---

## Using Font Awesome Kit Codes

Font Awesome users can set their kit code to unlock Font Awesome Pro icons. You can provide it by adding the `data-fa-kit-code` attribute to any element on the page, or by calling the `setKitCode()` method.

```html
<!-- Option 1: the data-fa-kit-code attribute -->
<script src="bundle.js" data-fa-kit-code="abc123"></script>

<!-- Option 2: the setKitCode() method -->
<script type="module">
  import { setKitCode } from '{% cdnUrl 'webawesome.loader.js' %}';
  setKitCode('YOUR_KIT_CODE_HERE');
</script>
```

---

{# This looks weird, but without it, markdownItAttrs flags the raw calls incorrectly. #}

<div>
{%- raw -%}
  {% if currentUser.hasPro %}
    <div>
      {% include "server/pro-setup.njk" ignore missing %}
    </div>
  {% endif %}
{% endraw %}
</div>

## Advanced Setup

The autoloader is the easiest way to use Web Awesome, but different projects (or your own preferences!) may require different installation methods.

### Cherry Picking from CDN

Cherry picking will only load the components you need up front, while limiting the number of files the browser has to download. The disadvantage is that you need to import each individual component on each page it's used. Additionally, you must include the default theme (`styles/themes/default.css`) to style any imported components. To use a different theme, include your preferred theme _in addition to_ the default theme.

Here's an example that loads only the button component.

```html
<link rel="stylesheet" href="{% cdnUrl 'styles/themes/default.css' %}" />

<script type="module">
  import '{% cdnUrl 'components/button/button.js' %}';

  // <wa-button> is ready to use!
</script>
```

You can copy and paste the code to import a component from the "Importing" section of the component's documentation. Note that some components have dependencies that are automatically imported when you cherry pick. If a component has dependencies, they will be listed in the "Dependencies" section of its docs.

:::warning
You will see files named `chunk.[hash].js` in the `chunks` directory. Never import these files directly, as they are generated and change from version to version.
:::

### Installing via npm

```bash
npm install @awesome.me/webawesome
```

And then in your JavaScript files, import the components you need.

:::warning
Web Awesome does not a provide a single import with all Web Awesome components. Instead, you must "cherry pick" the components you want to use.
:::

```js
// Option 1: import all Web Awesome styles
import '@awesome.me/webawesome/dist/styles/webawesome.css';

// Option 2: import only the default theme
import '@awesome.me/webawesome/dist/styles/themes/default.css';

// <wa-button>
import '@awesome.me/webawesome/dist/components/button/button.js';
// <wa-input>
import '@awesome.me/webawesome/dist/components/input/input.js';
```

Once they've been imported, you can use them in your HTML normally. Component imports are located in the "Importing" section of each component's documentation.

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

### The Difference Between `/dist` & `/dist-cdn`

If you have Web Awesome installed locally via npm, you'll notice the following directories in the project's root:

```
dist/
dist-cdn/
```

The `dist-cdn` files come with everything bundled together, so you can use them directly without a build tool. The dist files keep dependencies separate, which lets your bundler optimize and share code more efficiently.

Use `dist-cdn` if you're loading directly in the browser or from a CDN. Use `dist` if you're using a bundler like Webpack or Vite.

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
    "types": ["node-modules/@awesome.me/webawesome/dist/custom-elements-jsx.d.ts"]
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
