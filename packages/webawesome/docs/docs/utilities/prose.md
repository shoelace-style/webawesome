---
title: Prose
description: The wa-prose utility applies hierarchical, asymmetric typographic rhythm to long-form content like documentation, articles, and marketing copy.
layout: page-outline
tags: styleUtilities
synonyms:
  - prose
  - longform
  - article
  - copy
  - typography rhythm
use-cases:
  - blog post
  - documentation
  - marketing copy
  - long-form content
  - article
---

Web Awesome's [native styles](/docs/utilities/native/) give every block-level element the same vertical breathing room. That works well for app UIs and dashboards where hierarchy comes from layout structure, but it can make long-form copy feel structurally flat — a major section break reads the same as the next sentence.

Wrap a block of content in `wa-prose` to switch on a richer rhythm: more space above headings (separating from the prior section), less below (so the heading hugs the content it introduces), generous breathing room around major non-text blocks, and a true section divider for `<hr>`. Spacing is em-based, so the whole prose body scales when composed with `wa-font-size-*` utilities.

## Using prose

Wrap your long-form content in any block element with the `wa-prose` class.

```html
<article class="wa-prose">
  <h2>Section heading</h2>
  <p>Body content…</p>
</article>
```

By default, content is constrained to a comfortable reading column of `65ch`. Override `--wa-prose-line-length` on the container — or set `max-inline-size` directly — to widen, narrow, or remove the constraint.

## Examples

### Headings and paragraphs

Each heading level has a different relationship with the content above and below — generous space above, tight space below — so the eye reads headings as part of the section they introduce, not the one they follow.

```html {.example}
<article class="wa-prose">
  <h2>Customizing components</h2>
  <p>
    Web Awesome components expose CSS parts, custom properties, and custom states so you can adjust their look without
    touching their internals.
  </p>

  <h3>CSS parts</h3>
  <p>
    Use <code>::part()</code> to style any element a component exposes by name. Parts are stable hooks that survive
    changes to a component's internal markup.
  </p>

  <h4>When to use them</h4>
  <p>
    Reach for parts when a custom property doesn't expose what you need, or when the change is specific to one element
    inside the shadow DOM.
  </p>
</article>
```

### Section breaks and major blocks

Code samples, tables, callouts, and horizontal rules get more breathing room than running prose, so they read as distinct chunks of content rather than another sentence.

```html {.example}
<article class="wa-prose">
  <h2>Component sizes</h2>
  <p>Most form controls and content components support a <code>size</code> attribute with three values.</p>

  <pre><code>&lt;wa-button size="small"&gt;Small&lt;/wa-button&gt;
&lt;wa-button size="medium"&gt;Medium&lt;/wa-button&gt;
&lt;wa-button size="large"&gt;Large&lt;/wa-button&gt;</code></pre>

  <table>
    <thead>
      <tr>
        <th>Value</th>
        <th>Use for</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>small</code></td>
        <td>Compact UI, sidebars, dense forms</td>
      </tr>
      <tr>
        <td><code>medium</code></td>
        <td>Default for most contexts</td>
      </tr>
      <tr>
        <td><code>large</code></td>
        <td>Hero areas, emphasized actions</td>
      </tr>
    </tbody>
  </table>

  <hr />

  <wa-callout variant="brand">
    <wa-icon slot="icon" name="lightbulb" variant="regular"></wa-icon>
    Pair sizes with the <a href="/docs/utilities/text/">text utilities</a> to keep type and component scale in lockstep.
  </wa-callout>
</article>
```

### Inline elements and definitions

`wa-prose` styles the inline and structural elements you'd reach for in long-form writing — including `<kbd>`, `<mark>`, `<sub>`/`<sup>`, `<abbr>`, and definition lists.

```html {.example}
<article class="wa-prose">
  <p>
    Press <kbd>/</kbd> to <mark>jump to search</mark> the docs. Inline notation like H<sub>2</sub>O or E=mc<sup>2</sup>
    renders correctly, and the <abbr title="Application Programming Interface">API</abbr> reference sits at the end of
    every component page.
  </p>

  <dl>
    <dt>Em</dt>
    <dd>A length relative to the current element's font-size.</dd>
    <dt>Rem</dt>
    <dd>A length relative to the root element's font-size.</dd>
    <dt>Ch</dt>
    <dd>The advance measure of the "0" character — useful for capping reading column width.</dd>
  </dl>
</article>
```

## Composing with font-size utilities

`wa-prose` uses em-based spacing internally. Apply any [`wa-font-size-*`](/docs/utilities/text/#font-size) utility to the same container and the whole prose body — text, headings, and rhythm — scales proportionally. No size variants required.

```html {.example}
<div class="wa-cluster wa-align-items-flex-start" style="gap: var(--wa-space-l);">
  <article class="wa-prose" style="--wa-prose-line-length: 28ch;">
    <h3>Default size</h3>
    <p>Headings, body text, and rhythm all use the theme's default scale.</p>
    <ul>
      <li>One item</li>
      <li>Another item</li>
    </ul>
  </article>

  <article class="wa-prose wa-font-size-s" style="--wa-prose-line-length: 28ch;">
    <h3>With wa-font-size-s</h3>
    <p>Same content, scaled down. Heading-to-paragraph rhythm stays proportional.</p>
    <ul>
      <li>One item</li>
      <li>Another item</li>
    </ul>
  </article>
</div>
```

## Adjusting rhythm

Override `--wa-prose-rhythm-scale` (default `1`) on the prose container to multiply every margin in the system. Values below `1` tighten the rhythm; values above loosen it. Type sizes are unaffected.

```html {.example}
<div class="wa-cluster wa-align-items-flex-start" style="gap: var(--wa-space-l);">
  <article class="wa-prose" style="--wa-prose-line-length: 28ch;">
    <h3>Default rhythm</h3>
    <p>Standard breathing room between blocks.</p>
    <p>This second paragraph follows the default scale.</p>
  </article>

  <article class="wa-prose" style="--wa-prose-line-length: 28ch; --wa-prose-rhythm-scale: 0.6;">
    <h3>Tighter rhythm</h3>
    <p>Every gap is 40% smaller — useful for sidebars or dense content.</p>
    <p>Type stays the same size; only the spacing tightens.</p>
  </article>
</div>
```

## Theming

Color in `wa-prose` flows from your theme's [color tokens](/docs/tokens/color/) — toggle dark mode or switch themes and the prose follows automatically. To recolor a specific element for prose contexts, use a descendant selector on your container.

```css
.changelog.wa-prose a {
  color: var(--wa-color-brand-on-quiet);
}
```

## Opting out of prose

Apply `wa-not-prose` to any element inside a `wa-prose` container to disable the prose rhythm for that element and its descendants. Other utility classes — like `wa-cluster`, `wa-stack`, or `wa-font-size-*` — keep working inside the opt-out subtree.

```html {.example}
<article class="wa-prose">
  <h3>Inside prose</h3>
  <p>This paragraph follows wa-prose rhythm.</p>

  <div class="wa-not-prose">
    <div class="wa-cluster" style="gap: var(--wa-space-s);">
      <wa-button variant="brand">Get started</wa-button>
      <wa-button appearance="outlined">Learn more</wa-button>
    </div>
  </div>

  <p>This paragraph picks up the prose rhythm again.</p>
</article>
```
