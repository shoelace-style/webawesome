---
title: Installation
description: Choose the installation method that works best for you.
layout: page-outline
---

Welcome to the Web Awesome alpha release for early backers! 👋

==This is a very early alpha release!== For this preview, we're only offering access to the free components through a temporary CDN. Please be aware: Things can change. Things can break. You probably shouldn't be using this software in production yet! But fear not, we're working hard to polish up the free stuff you see here _plus_ all the great stuff we have planned for Web Awesome Pro!

==To be clear, this release _only_ includes a preview the components in Web Awesome Free!==

Thank you so much for backing us!

- [Report a bug](https://github.com/shoelace-style/webawesome-alpha/issues)
- [Get help / ask a question](https://github.com/shoelace-style/webawesome-alpha/discussions)
- [See what's new since the last version](/docs/resources/changelog)

:::warning
As a Web Awesome backer, this early alpha release is _just for you_. Please refrain from sharing it for the time being!
:::

---

## Autoloading via CDN (Easiest)

The autoloader is the easiest way to use Web Awesome. A lightweight script watches the DOM for unregistered Web Awesome elements and lazy loads them for you — even if they're added dynamically.

```html
<link rel="stylesheet" href="{% cdnUrl 'themes/default.css' %}" />
<script type="module" src="{% cdnUrl 'webawesome.loader.js' %}"></script>
```

Now you can [start using Web Awesome!](/docs/usage)

:::info
While convenient, autoloading may lead to a [Flash of Undefined Custom Elements](https://www.abeautifulsite.net/posts/flash-of-undefined-custom-elements/). The linked article describes some ways to alleviate it.
:::

## Setting the Base Path

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

## Using Font Awesome Kit Codes

Font Awesome users can set their kit code to unlock Font Awesome Pro icons. You can provide it by adding the `data-fa-kit-code` attribute to any element on the page, or by calling the `setKitCode()` method.

```html
<!-- Option 1: the data-fa-kit-code attribute -->
<script src="bundle.js" data-fa-kit-code="abc123"></script>

<!-- Option 2: the setKitCode() method -->
<script type="module">
  import { setKitCode } from '/path/to/web-awesome/dist/webawesome.js';
  setKitCode('YOUR_KIT_CODE_HERE');
</script>
```

## Cherry Picking

Cherry picking will only load the components you need up front, while limiting the number of files the browser has to download. The disadvantage is that you need to import each individual component on each page it's used.

Here's an example that loads only the button component.

```html
<link rel="stylesheet" href="/path/to/web-awesome/dist/themes/default.css" />

<script type="module" data-webawesome="/path/to/web-awesome/dist">
  import '/path/to/web-awesome/dist/components/button/button.js';

  // <wa-button> is ready to use!
</script>
```

You can copy and paste the code to import a component from the "Importing" section of the component's documentation. Note that some components have dependencies that are automatically imported when you cherry pick. If a component has dependencies, they will be listed in the "Dependencies" section of its docs.

:::warning
You will see files named `chunk.[hash].js` in the `chunks` directory. Never import these files directly, as they are generated and change from version to version.
:::

## Using Web Awesome with npm

An npm package isn't available in the early backer alpha release, but we'll have one soon! For now, please enjoy Web Awesome from the CDN as shown above.
