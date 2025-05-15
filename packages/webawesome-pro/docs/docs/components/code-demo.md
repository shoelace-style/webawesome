---
title: Code Demo
description: Code demos can be used to render code examples as inline live demos.
tags: component
isPro: true
---

```html {.example}
<wa-code-demo>
  <pre><code class="language-html">
    &lt;button&gt;Click me!&lt;/button&gt;
    &lt;wa-button&gt;Click me!&lt;/wa-button&gt;
  </code></pre>
</wa-code-demo>
```

This component is used right here in the docs to render code examples.

:::warning
Do not render untrusted content in a `<wa-code-demo>` element. This component renders the content as HTML, which introduces XSS vulnerabilities if used with untrusted content.
:::

## Examples

### Open by default

```html {.example}
<wa-code-demo open>
  <pre><code class="language-html">
    &lt;button&gt;Click me!&lt;/button&gt;
    &lt;wa-button&gt;Click me!&lt;/wa-button&gt;
  </code></pre>
</wa-code-demo>
```

### Custom previews

In some cases you may want to preprocess the code displayed, for example to sanitize HTML, remove irrelevant elements or attributes, fix whitespace, or do server-side rendering (SSR).
For these cases, you can slot in a custom preview:

```html {.example}
<wa-code-demo>
  <wa-button slot="preview">Click me!</wa-button>
  <pre><code class="language-html">
    &lt;button&gt;Click me!&lt;/button&gt;
  </code></pre>
</wa-code-demo>
```

Note that this means the preview will be in the light DOM, and can conflict with other things on the page.
To only render the custom preview within the component’s shadow DOM, or to display raw text, you can wrap it in a `<template>` element:

```html {.example}
<wa-code-demo>
  <template slot="preview">
    <wa-button>Click me!</wa-button>
  </template>
  <pre><code class="language-html">
    &lt;button&gt;Click me!&lt;/button&gt;
  </code></pre>
</wa-code-demo>
```

### Including resources (CSS, scripts, etc.)

Demos are rendered in the shadow DOM of the component, so any resources (stylesheets, scripts, etc.) must be included anew.
The same applies to isolated demos (see below), opening demos in a new tab, or editing them on CodePen.

While you _could_ manually include all of these on every single demo, it would get tedious to write,
and it would add noise for the reader.

Instead, `<wa-code-demo>` provides several better ways to include resources.
The core idea is that rather than specifying these resources over and over on each demo,
you would **point to elements** which would then be cloned into the demo, at the beginning.

There are two ways to point to elements:
- Add a `wa-code-demo-include` class to them
- Specify a CSS selector for which resources to look for in the demo’s `include` attribute.

There are certain types of elements that are handled specially:
- `<template>`: contents are cloned instead of the element itself.
This is useful for including resources in your demo that you don't want rendered outside the demo.

The following example shows both methods.
It includes all stylesheets on this page whose URLs start with `/dist/styles/themes/`,
plus any other elements with the class `.demo-import`, plus a CSS file with the class `wa-code-demo-include`:

```html {.example}
<template class="wa-code-demo-include-isolated">
  <script type="module" src="/dist/webawesome.loader.js"></script>
  <style>wa-callout { font-size: var(--wa-font-size-2xl) }</style>
  <script>console.log('Hello!')</script>
</template>
<wa-code-demo include="link[rel=stylesheet]">
  <pre><code class="language-html">
    &lt;wa-callout&gt;Helloooo!&lt;/wa-callout&gt;
  </code></pre>
</wa-code-demo>
```


### Isolated viewports

Often you may want to render your demo in a separate viewport, e.g. when it’s about a whole page.
Or, you may want to sandbox it.
For these cases, you can use the `viewport` attribute, which renders the demo in an iframe:

```html {.example}
<wa-code-demo viewport>
  <pre><code class="language-html">
    &lt;button&gt;Click me!&lt;/button&gt;
  </code></pre>
</wa-code-demo>
```

### Viewport Emulation

When you use the `viewport` attribute, `<wa-code-demo>` uses [`<wa-viewport-demo>`](../viewport-demo/) internally, and passes the value of `viewport` to it.
This allows you to also also provide a width value to emulate and it will be scaled accordingly:

```html {.example}
<wa-code-demo viewport="300">
  <pre><code class="language-html">
    &lt;button&gt;Click me!&lt;/button&gt;
  </code></pre>
</wa-code-demo>
```

Or both a width and a height value:

```html {.example}
<wa-code-demo viewport="1600 x 1000">
  <pre><code class="language-html">
    &lt;button&gt;Click me!&lt;/button&gt;
    &lt;p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus et tortor vel ullamcorper. Fusce tristique et justo quis auctor. In tristique dignissim dignissim. Fusce lacus urna, efficitur vel fringilla sed, hendrerit at ipsum. Donec suscipit ante ac ligula imperdiet varius. Aliquam ullamcorper augue sit amet lectus euismod finibus. Proin semper, diam at rhoncus posuere, diam dui semper turpis, ut faucibus mi ipsum nec ante. Morbi varius nibh ut facilisis varius. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce in blandit velit. Aliquam massa eros, commodo eu vestibulum a, faucibus non risus.
    &lt;p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus et tortor vel ullamcorper. Fusce tristique et justo quis auctor. In tristique dignissim dignissim. Fusce lacus urna, efficitur vel fringilla sed, hendrerit at ipsum. Donec suscipit ante ac ligula imperdiet varius. Aliquam ullamcorper augue sit amet lectus euismod finibus. Proin semper, diam at rhoncus posuere, diam dui semper turpis, ut faucibus mi ipsum nec ante. Morbi varius nibh ut facilisis varius. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce in blandit velit. Aliquam massa eros, commodo eu vestibulum a, faucibus non risus.
    &lt;p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus et tortor vel ullamcorper. Fusce tristique et justo quis auctor. In tristique dignissim dignissim. Fusce lacus urna, efficitur vel fringilla sed, hendrerit at ipsum. Donec suscipit ante ac ligula imperdiet varius. Aliquam ullamcorper augue sit amet lectus euismod finibus. Proin semper, diam at rhoncus posuere, diam dui semper turpis, ut faucibus mi ipsum nec ante. Morbi varius nibh ut facilisis varius. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce in blandit velit. Aliquam massa eros, commodo eu vestibulum a, faucibus non risus.
  </code></pre>
</wa-code-demo>
```

If you only provide a width value, the viewport will be rendered to an initial 16:9 aspect ratio,
which can be changed via resizing.
You can customize this via the `--viewport-initial-aspect-ratio` property.

### Isolated demos with resources

Including resources in isolated demos works the same way.
Any relative URLs are still resolved relative to the host document.
In addition to the `wa-code-demo-include` class, which specifies resources to be included in *every* demo,
you can also use the `wa-code-demo-include-isolated` class which specifies resources to be included in every *isolated* demo,
i.e. the previews of demos using the `viewport` attribute, but also opening demos in a new tab or editing them on CodePen.

```html {.example}
<template class="wa-code-demo-include-isolated">
  <script type="module" src="{% cdnUrl 'webawesome.loader.js' %}"></script>
  <style>
    body {
      padding: var(--wa-space-l);
    }
    wa-callout { font-size: var(--wa-font-size-2xl) }
  </style>
  <script>console.log('Hello from iframe!')</script>
</template>
<wa-code-demo viewport include="link[rel=stylesheet]">
  <pre><code class="language-html">
    &lt;wa-callout&gt;Helloooo!&lt;/wa-callout&gt;
  </code></pre>
</wa-code-demo>
```

## Styling

Just setting `border-radius` or `border` should work as expected:

```html{.example}
<wa-code-demo style="border: 2px dotted var(--wa-color-blue-50); border-radius: var(--wa-border-radius-m)">
  <pre><code class="language-html">
    &lt;button&gt;Click me!&lt;/button&gt;
    &lt;wa-button&gt;Click me!&lt;/wa-button&gt;
  </code></pre>
</wa-code-demo>
```

The divider width is controlled separately via `--divider-width`:

```html{.example}
<wa-code-demo open style="border-width: var(--wa-border-width-l); --divider-width: var(--wa-border-width-m);">
  <pre><code class="language-html">
    &lt;button&gt;Click me!&lt;/button&gt;
    &lt;wa-button&gt;Click me!&lt;/wa-button&gt;
  </code></pre>
</wa-code-demo>
```

## Roadmap

This component is a work in progress.
Some of the things that are not yet implemented are listed below.
It goes without saying that this list is a rough plan and subject to change.

### High priority

- Make the component dynamic so that when the code changes, the demo is updated

### Low priority

- Horizontal layout
- Tabbed layout
- Provide a way to display CSS and JS separately
- Provide a way to customize the playground used (currently it is hardcoded to CodePen)
- Provide a way to customize the buttons shown
