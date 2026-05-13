# Doc transformers

Build-time HTML transforms that run on every rendered Eleventy page. Each module exports a factory that returns a function `(doc) => void`, which mutates the parsed HTML document in place. They're registered as a single `doc-transforms` Eleventy transform in [`../.eleventy.js`](../.eleventy.js).

## Pipeline

Order matters — each transformer sees the output of the previous one.

| Transformer               | Purpose                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------ |
| `anchor-headings.js`      | Adds a permalink anchor (hashtag icon + tooltip) to every heading inside `#content`. |
| `outline.js`              | Builds the per-page outline (table of contents) from `h2`/`h3` headings.             |
| `current-link.js`         | Marks links in navs that match the current page.                                     |
| `code-examples.js`        | Wraps fenced `{.example}` code blocks for live demos.                                |
| `highlight-code.js`       | Applies syntax highlighting to code blocks.                                          |
| `copy-code.js`            | Adds copy buttons to `<pre>` blocks.                                                 |
| `changelog-list-icons.js` | Replaces bullets in `.changelog-group-*` containers with category icons.             |
| `linkify-components.js`   | Wraps inline `<code>` mentions of `<wa-*>` tags in anchors to their docs pages.      |

`format-code.js` lives in this folder but is a Prettier helper, not a transformer. It's used by other tools, not registered in the pipeline.

## Opt-out attributes

Most transformers that scan content support a `data-no-*` attribute so authors can skip processing for a specific page, region, or element. Each works at three scopes:

- **Page** — set on `<html>` via the base layout. `base.njk` opts in by default and reads page-level toggles from front matter (`hasAnchors`, `hasLinkify`) — set one to `false` to apply the matching `data-no-*` attribute for that page.
- **Region** — set on any ancestor element. The transformer skips any descendants.
- **Element** — set on the target element directly.

| Attribute         | Front-matter toggle | Skips                                       |
| ----------------- | ------------------- | ------------------------------------------- |
| `data-no-anchor`  | `hasAnchors: false` | Permalink injection on headings.            |
| `data-no-outline` | —                   | Inclusion of a heading in the page outline. |
| `data-no-linkify` | `hasLinkify: false` | Automatic component-tag linkification.      |

### Examples

Skip linkification on an entire page (front matter):

```yaml
---
hasLinkify: false
---
```

Skip a single inline mention:

```html
The bare token <code data-no-linkify>&lt;wa-input&gt;</code> won't be auto-linked.
```

Skip a whole region:

```html
<section data-no-linkify>Anything here mentioning <code>&lt;wa-input&gt;</code> stays as plain code.</section>
```

## Adding a transformer

1. Create the file in this folder. Export a factory: `export function myTransformer(options) { return function (doc) { /* ... */ }; }`.
2. Import and add to the `transformers` array in [`../.eleventy.js`](../.eleventy.js).
3. If the transformer scans content for replacement, support a `data-no-*` opt-out via `closest()` and document it in the table above.
4. Use the existing transformers as a reference for `node-html-parser` patterns (`querySelectorAll`, `closest`, `insertAdjacentHTML`, `replaceWith`).
