---
title: Installation
description: Choose the installation method that works best for you.
layout: page-outline
---

Welcome to the Web Awesome alpha release for early backers! 👋

==This is a very early alpha release!== For this preview, we're offering access to Web Awesome through a temporary CDN. Please be aware: Things can change. Things can break. You probably shouldn't be using this software in production yet! But fear not, we're working hard to polish up everything you see here _plus_ all the great stuff we have planned for Web Awesome Pro!

Thank you so much for backing us!

- [Report a bug](https://github.com/shoelace-style/webawesome-alpha/issues)
- [Get help / ask a question](https://github.com/shoelace-style/webawesome-alpha/discussions)
- [See what's new since the last version](/docs/resources/changelog)

:::warning
As a Web Awesome backer, this early alpha release is _just for you_. Please refrain from sharing it for the time being!
:::

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
2. **Web Awesome styles**, an optional stylesheet that [styles native HTML elements](/docs/native) and includes [utility classes](/docs/utilities) you can use in your project 
3. **The autoloader**, a lightweight script watches the DOM for unregistered Web Awesome elements and lazy loads them for you — even if they're added dynamically

Now you can [start using Web Awesome!](/docs/usage)

### Reducing FOUCE

While convenient, autoloading can lead to a [Flash of Undefined Custom Elements](https://www.abeautifulsite.net/posts/flash-of-undefined-custom-elements/).
The [FOUCE style utility](/docs/utilities/fouce/#opting-in) (which is automatically applied if you use the Web Awesome utilities) takes care of hiding custom elements until they and their contents have been registered, up to a maximum of two seconds (configurable).

In many cases, this is not enough, and you may wish to hide a broader wrapper element or even the entire page until all WA elements within it have loaded. To do that, you can add the `wa-reduce-fouce` class to any element on the page or even apply it to the whole page by placing the class on the `<html>` or `<body>` element.

```html
<html class="wa-cloak">
  ...
</html>
```

As soon as all elements are registered OR after two seconds have elapsed, the autoloader will show the page. The two-second timeout prevents blank screens from persisting on slow networks and pages that have errors.

:::details Are you using Turbo in your app?

If you're using [Turbo](https://turbo.hotwired.dev/) to serve a multi-page application (MPA) as a single page application (SPA), you might notice FOUCE when navigating from page to page. This is because Turbo renders the new page's content before the autoloader has a change to register new components.

The following function acts as a middleware to ensure components are registered _before_ the page shows, eliminating FOUCE for page-to-page navigation with Turbo.

```js
import { preventTurboFouce } from '/dist/webawesome.js';

preventTurboFouce();
```

:::

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

### Installing via npm

An npm package isn't available in the early backer alpha release, but we'll have one soon! For now, please enjoy [Web Awesome from the CDN](#quick-start-autoloading-via-cdn).

### Cherry Picking

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


### Setting the Base Path

Some components rely on assets (icons, images, etc.) and Web Awesome needs to know where they're located. For convenience, Web Awesome will try to auto-detect the correct location based on the script you've loaded it from. This assumes assets are colocated with `webawesome.loader.js` and will "just work" for most users.

==If you're using the CDN, you can skip this section.== However, if you're [cherry picking](#cherry-picking) or bundling Web Awesome, you'll need to set the base path. You can do this one of two ways.

```html
<!-- Option 1: the data-webawesome attribute -->
<script src="bundle.js" data-webawesome="/path/to/web-awesome/dist"></script>

<!-- Option 2: the setBasePath() method -->
<script type="module">
  import { setBasePath } from '/path/to/web-awesome/dist/webawesome.js';
  setBasePath('/path/to/web-awesome/dist');
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