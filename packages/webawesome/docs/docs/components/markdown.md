---
title: Markdown
description: Parses and renders markdown from a template element, powered by the Marked library.
layout: component
category: Utilities
---

The markdown component turns raw markdown into rendered HTML using the [Marked](https://marked.js.org/) library. Wrap your content in a [`<template>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) element to protect it from the browser's HTML parser — characters like `<`, `>`, and `&` will pass through to the markdown parser untouched.

Indentation is handled automatically. You can nest your markdown at any depth to match the surrounding HTML structure and the common leading whitespace will be stripped before parsing.

```html {.example}
<wa-markdown>
  <template>
    ## Getting Started

    Here's a quick overview with **bold**, *italic*, and `inline code`.

    - Install the package
    - Import the component
    - Start writing markdown
  </template>
</wa-markdown>
```

:::warning
Since content is rendered client-side, it won't be visible to search engine crawlers or available before JavaScript loads. This makes it a poor fit for SEO-critical content like landing pages and blog posts. It's best suited for prototyping, dashboards, admin panels, and other contexts where search indexing isn't a concern.
:::

## Examples

### Providing content

Markdown goes inside a `<template>` element as a direct child of `<wa-markdown>`. The template shields your content from the browser's HTML parser so angle brackets and ampersands are preserved as-is. After parsing, the resulting HTML is inserted into the light DOM where it inherits your page's styles.

```html
<wa-markdown>
  <template>
    Use `<template>` to keep markdown like **this** from being parsed as HTML.
  </template>
</wa-markdown>
```

### Whitespace normalization

Indentation inside the `<template>` is automatically normalized before the markdown parser sees it. This lets you indent your content to match the surrounding HTML without it being treated as a code block. The normalization process:

1. Converts leading tabs to spaces based on the configured tab stop width (default: 4)
2. Trims blank lines from the start and end
3. Determines the smallest indentation shared by all non-empty lines
4. Removes that common prefix from every line

The example below has its content indented by 8 spaces to match the HTML structure, but the output renders as though the content had no extra indentation at all.

```html {.example}
<wa-markdown>
  <template>
        ## Deeply Indented

        Even though this content is heavily indented in the source,
        the shared whitespace is stripped before parsing.

            Lines with extra indentation beyond the common
            prefix are preserved, like this code block.
  </template>
</wa-markdown>
```

For tab-indented source files, adjust the tab stop width with the `tab-size` attribute.

```html
<wa-markdown tab-size="2">
  <template>
    ...
  </template>
</wa-markdown>
```

### Formatting features

All standard markdown formatting supported by Marked is available, including headings, lists, blockquotes, code blocks, links, and images.

```html {.example}
<wa-markdown>
  <template>
    ## Feature Overview

    Steps to set up your project:

    1. Clone the repository
    2. Install dependencies
    3. Run the dev server

    A relevant quote:

    > "Simplicity is the ultimate sophistication." — Leonardo da Vinci

    A code snippet:

    ```js
    const app = document.querySelector('#app');
    app.innerHTML = '<h1>Hello!</h1>';
    ```

    Learn more at [MDN Web Docs](https://developer.mozilla.org).
  </template>
</wa-markdown>
```

### Configuring Marked

All `<wa-markdown>` instances share a single [Marked](https://marked.js.org/using_advanced) instance. You can access it through any `<wa-markdown>` element's `marked` property. After making changes, call `WaMarkdown.updateAll()` to re-render every connected instance.

```html {.example}
<wa-markdown id="markdown__config">
  <template>
    Visit https://developer.mozilla.org for documentation.
  </template>
</wa-markdown>

<script type="module">
  await customElements.whenDefined('wa-markdown');
  const md = document.getElementById('markdown__config');

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

```html {.example}
<wa-markdown id="markdown__plugin">
  <template>
    This text has a ==highlighted phrase== in the middle.
  </template>
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

The component parses and renders automatically when the `<template>` is first slotted in. It does not watch for subsequent changes to the template's content. To re-render after modifying the template, update its `innerHTML` and call `renderMarkdown()`.

```html {.example}
<div id="markdown__dynamic">
  <wa-markdown>
    <template>
      Click the button to swap this content out.
    </template>
  </wa-markdown>

  <br>
  <wa-button>Update content</wa-button>
</div>

<script>
  const container = document.getElementById('markdown__dynamic');
  const md = container.querySelector('wa-markdown');
  const button = container.querySelector('wa-button');

  button.addEventListener('click', () => {
    const template = md.querySelector('template');
    template.innerHTML = '## Fresh Content\n\nThis was **swapped in** by calling `renderMarkdown()`.';
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
