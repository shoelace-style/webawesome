---
title: Markdown
description: A declarative utility that renders markdown in plain ol' HTML pages.
layout: component
category: Utilities
---

The markdown component turns raw markdown into rendered HTML using the [Marked](https://marked.js.org/) library. Wrap your content in a `<script type="text/markdown">` element to keep the browser from interpreting it as HTML. Characters like `<`, `>`, and `&` are preserved exactly as written, so markdown features like `<https://example.com>` autolinks work correctly.

Indentation is handled automatically. You can nest your markdown at any depth to match the surrounding HTML structure and the common leading whitespace will be stripped before parsing.

```html {.example}
<wa-markdown>
  <script type="text/markdown">
    ## Getting Started

    Here's a quick overview with **bold**, *italic*, and `inline code`.

    - Install the package
    - Import the component
    - Start writing markdown
  </script>
</wa-markdown>
```

Note the use of `<script type="text/markdown">` instead of `<template>` — see [why we use script](#why-script-instead-of-template) below.

:::warning
Since content is rendered client-side, it won't be visible to search engine crawlers or available before JavaScript loads. This makes it a poor fit for SEO-critical content like landing pages and blog posts. It's best suited for prototyping, dashboards, admin panels, and other contexts where search indexing isn't a concern.
:::

## Examples

### Providing content

Markdown goes inside a `<script type="text/markdown">` element as a direct child of `<wa-markdown>`. The script element's type tells the browser not to execute or parse the contents, so your markdown passes through to the component untouched. The rendered output is placed in the light DOM where it inherits your page's styles.

```html
<wa-markdown>
  <script type="text/markdown">
    Markdown with `<angle brackets>` and **formatting** that won't get parsed as HTML.
  </script>
</wa-markdown>
```

#### Why use script instead of template?

You might expect a `<template>` element to work here, but `<template>` still parses its content as HTML. That means markdown like `<https://example.com>` gets interpreted as an HTML tag and silently mangled before the component ever sees it.

A `<script type="text/markdown">` element is truly inert. The browser treats the content as raw text, so every character reaches the markdown parser exactly as written.

### Whitespace normalization

Indentation inside the script is automatically normalized before the markdown parser sees it. This lets you indent your content to match the surrounding HTML without it being treated as a code block. The normalization process:

1. Converts leading tabs to spaces based on the configured tab stop width (default: 4)
2. Trims blank lines from the start and end
3. Determines the smallest indentation shared by all non-empty lines
4. Removes that common prefix from every line

This means you can write markdown at any indentation level and it will render correctly. Even if the content is indented by 8 spaces to match the HTML structure, the output renders as though it had no extra indentation at all.

```html {.example .no-edit}
<wa-markdown>
  <script type="text/markdown">
            ## Deeply Indented

            Even though this content is heavily indented in the source,
            the shared whitespace is stripped before parsing.

                Lines with extra indentation beyond the common
                prefix are preserved, like this code block.
  </script>
</wa-markdown>
```

For tab-indented source files, adjust the tab stop width with the `tab-size` attribute.

```html
<wa-markdown tab-size="2">
  <script type="text/markdown">
    ...
  </script>
</wa-markdown>
```

### Formatting features

All standard markdown formatting supported by Marked is available, including headings, lists, blockquotes, code blocks, links, and images.

```html {.example .no-edit}
<wa-markdown>
  <script type="text/markdown">
    ## Feature Overview

    Steps to set up your project:

    1. Clone the repository
    2. Install dependencies
    3. Run the dev server

    A relevant quote:

    > "Simplicity is the ultimate sophistication." — Leonardo da Vinci

    And an autolink: <https://developer.mozilla.org>
  </script>
</wa-markdown>
```

### Configuring Marked

All `<wa-markdown>` instances share a single [Marked](https://marked.js.org/using_advanced) instance. You can access it through any `<wa-markdown>` element's `marked` property. After making changes, call `WaMarkdown.updateAll()` to re-render every connected instance.

```html {.example .no-edit}
<wa-markdown id="markdown__config">
  <script type="text/markdown">
    Visit https://developer.mozilla.org for documentation.
  </script>
</wa-markdown>

<script type="module">
  await customElements.whenDefined('wa-markdown');
  const md = document.getElementById('markdown__config');

  await new Promise(requestAnimationFrame);

  // Customize the link renderer to open links in a new tab
  const renderer = {
    link({ href, text }) {
      return `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;
    }
  };

  md.marked.use({ renderer });
  md.renderMarkdown();
</script>
```

:::info
The Marked instance is shared across all `<wa-markdown>` elements. If you want every instance on the page to pick up the new configuration, call `WaMarkdown.updateAll()` instead of `renderMarkdown()` on a single element.
:::

### Writing a custom Marked plugin

Custom [Marked extensions](https://marked.js.org/using_advanced#extensions) can be applied through any element's `marked` property. The example below adds support for `==highlight==` syntax, wrapping matched text in `<mark>` tags.

```html {.example .no-edit}
<wa-markdown id="markdown__plugin">
  <script type="text/markdown">
    This text has a ==highlighted phrase== in the middle.
  </script>
</wa-markdown>

<script type="module">
  await customElements.whenDefined('wa-markdown');
  const md = document.getElementById('markdown__plugin');

  const highlight = {
    extensions: [{
      name: 'highlight',
      level: 'inline',
      start(src) { return src.indexOf('=='); },
      tokenizer(src) {
        const match = src.match(/^==([^=]+)==/);
        if (match) {
          return {
            type: 'highlight',
            raw: match[0],
            text: match[1]
          };
        }
      },
      renderer(token) {
        return `<mark>${token.text}</mark>`;
      }
    }]
  };

  md.marked.use(highlight);
  md.renderMarkdown();
</script>
```

### Updating content dynamically

The component parses and renders automatically when the script element is first slotted in. It does not watch for subsequent changes to the script's content. To re-render after modifying the source, update the script's `textContent` and call `renderMarkdown()`.

```html {.example .no-edit}
<div id="markdown__dynamic">
  <wa-markdown id="markdown__dynamic-md">
    <script type="text/markdown">
      Click the button to swap this content out.
    </script>
  </wa-markdown>
  <br>
  <wa-button>Update content</wa-button>
</div>

<script type="module">
  await customElements.whenDefined('wa-markdown');
  const md = document.getElementById('markdown__dynamic-md');
  const button = document.querySelector('#markdown__dynamic wa-button');
  const script = md.querySelector('script[type="text/markdown"]');

  button.addEventListener('click', () => {
    script.textContent = '## Fresh Content\n\nThis was **swapped in** by calling `renderMarkdown()`.';
    md.renderMarkdown();
  });
</script>
```

<!-- Demo styles -->
<style>
  wa-markdown {
    h1,
    h2 {
      margin-block-start: 0;
    }
  }
</style>
