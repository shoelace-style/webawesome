---
title: Installation
description: Choose the installation method that works best for you.
layout: page-outline
---

Welcome to your exclusive early access to Web Awesome Beta! 👋

At this time, we're offering access to Web Awesome Free and Pro through a temporary CDN while we prepare for a public release. This beta is tried, true, and stable, but please be aware that things may change here and there before our production release to the public.

Thank you so much for backing us!

- [Report a bug](https://github.com/shoelace-style/webawesome/issues)
- [Get help / ask a question](https://github.com/shoelace-style/webawesome/discussions)
- [See what's new since the last version](/docs/resources/changelog)

Welcome to Web Awesome beta! [Learn more](https://webawesome.com/) about this project and [how to contribute to it.](https://webawesome.com/docs/resources/contributing)

---

## Quick Start (Autoloading via CDN)

To get everything included in Web Awesome, add the following code to the `<head>` of your site:

```html
<link rel="stylesheet" href="{% cdnUrl 'styles/themes/default.css' %}" />
<link rel="stylesheet" href="{% cdnUrl 'styles/webawesome.css' %}" />
<script type="module" src="{% cdnUrl 'webawesome.loader.js' %}"></script>
```

This snippet includes three parts:
1. **The default theme**, a stylesheet that gives a cohesive look to Web Awesome components with both light and dark modes
2. **Web Awesome styles**, an optional stylesheet that [styles native HTML elements](/docs/utilities/native) and includes [utility classes](/docs/utilities) you can use in your project
3. **The autoloader**, a lightweight script watches the DOM for unregistered Web Awesome elements and lazy loads them for you — even if they're added dynamically

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

## Advanced Setup

The autoloader is the easiest way to use Web Awesome, but different projects (or your own preferences!) may require different installation methods.

### Cherry Picking from CDN

Cherry picking will only load the components you need up front, while limiting the number of files the browser has to download. The disadvantage is that you need to import each individual component on each page it's used. You'll still need to include the default theme (`styles/themes/default.css`) or another theme to style any imported components.

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
npm install webawesome
```

And then in your JavaScript files, import the components you need.

:::warning
Web Awesome does not a provide a single import with all Web Awesome components. Instead, you must "cherry pick" the components you want to use.
:::

```js
// import the Web Awesome base stylesheet
import "webawesome/dist/styles/webawesome.css"

// import the default "theme"
import "webawesome/dist/styles/themes/default.css"

// <wa-button>
import "webawesome/dist/components/button/button.js"
// <wa-input>
import "webawesome/dist/components/input/input.js"
```

Once they've been imported, you can use them in your HTML normally. Component imports are located in the "Importing" section of each component's documentation.

### Setting the Base Path

Some components rely on assets (icons, images, etc.) and Web Awesome needs to know where they're located. For convenience, Web Awesome will try to auto-detect the correct location based on the script you've loaded it from. This assumes assets are colocated with `webawesome.loader.js` and will "just work" for most users.

==If you're using the CDN, you can skip this section.== However, if you're [cherry picking](#cherry-picking) or bundling Web Awesome, you'll need to set the base path. You can do this one of two ways.

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
  import { getBasePath, setBasePath } from '/path/to/web-awesome/dist/webawesome.js';

  setBasePath('/path/to/assets');

  // ...

  // Get the base path, e.g. /path/to/assets
  const basePath = getBasePath();

  // Get the path to an asset, e.g. /path/to/assets/file.ext
  const assetPath = getBasePath('file.ext');
</script>
```

## The difference between `/dist` and `/dist-cdn`

If you have Web Awesome installed locally via NPM, you'll notice 2 directories. `/dist-cdn` and `/cdn`.

The `/dist-cdn` files are bundled differently than the `/dist` files. The `/dist-cdn` files come pre-bundled, which means all dependencies are "inlined" so there are no "bare" references like `import "lit"`. The `/dist` files **DO NOT** come pre-bundled, allowing your bundler of choice to more efficiently de-duplicate dependencies, resulting in smaller bundles and optimal code sharing.

TLDR:

- `webawesome/dist-cdn` is for CDNs or people not using a bundler.
- `webawesome/dist` is for bundlers or importmaps.