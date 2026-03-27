---
title: Markdown
description: A declarative utility that renders markdown in plain ol' HTML pages.
layout: component
category: Utilities
---

The markdown component turns raw markdown into rendered HTML using the [Marked](https://marked.js.org/) library. Indentation is handled automatically. You can nest your markdown at any depth to match the surrounding HTML structure and the common leading whitespace will be stripped before parsing.

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


:::info
Since content is rendered client-side, it won't be visible to search engine crawlers or available before JavaScript loads. This makes it a poor fit for SEO-critical content like landing pages and blog posts. It's best suited for prototyping, dashboards, admin panels, and other contexts where search indexing isn't a concern.
:::

:::warning
**Do not use this component with unsanitized user input.** Markdown is parsed as-is without sanitization, so rendering untrusted content can lead to XSS vulnerabilities.
:::

## Examples

### Providing content

Markdown must go inside a `<script type="text/markdown">` element, which must be a direct child of the markdown component. (The script is required to prevent the browser from parsing the content.) The rendered output is placed in the light DOM where it inherits your page's styles.

```html
<wa-markdown>
  <script type="text/markdown">
    Markdown with `<angle brackets>` and **formatting** that won't get parsed as HTML.
  </script>
</wa-markdown>
```

The [Marked](https://marked.js.org/) library is used under the hood to render markdown. Marked supports [GitHub Flavored Markdown](https://github.github.com/gfm/) (GFM) and the [CommonMark](https://commonmark.org/) specification. This includes headings, bold, italic, links, images, lists, blockquotes, code blocks, tables, task lists, strike-through, and auto-links. For a full breakdown of supported syntax, see the [Marked documentation](https://marked.js.org/#specifications).

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
