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

Wrap a block of content in `wa-prose` to switch on a richer rhythm: generous space above headings, tighter space below, more breathing room around major non-text blocks, and a true section divider for `<hr>`. Spacing is em-based and scales with `wa-font-size-*` utilities.

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

Each heading level gets generous space above and tight space below, so the eye reads it as part of the section it introduces — not the one it follows. When two headings sit back-to-back, the second tightens up so it reads as subordinate to the first.

```html {.example}
<article class="wa-prose">
  <h1>Customizing components</h1>
  <h2>Three hooks to know</h2>
  <p>
    Web Awesome components are built to bend to your design system without your having to crack them open. Three
    customization hooks do most of the work — CSS parts, custom properties, and custom states — each suited to a
    different kind of override.
  </p>

  <h3>CSS parts</h3>
  <p>
    Reach for <code>::part()</code> when you need to style an element a component exposes by name. Parts are stable
    hooks that survive changes to a component's internal markup.
  </p>

  <h4>When to reach for them</h4>
  <p>
    Use parts when a custom property doesn't expose what you need, or when the change is specific to one element inside
    the shadow DOM and you'd like it to survive a future version bump.
  </p>
</article>
```

### Lists

Lists get a small breath between multi-line items and quiet `::marker` colors so bullets and numbers don't compete with the prose. Definition lists bold the term so each pair reads as a unit.

```html {.example}
<article class="wa-prose">
  <ul>
    <li>CSS parts let you style elements a component exposes by name.</li>
    <li>
      Custom properties expose specific values that components compose into their own styles — the preferred surface for
      theme-level overrides.
    </li>
    <li>Custom states reflect a component's internal state for transitions and modes.</li>
  </ul>

  <ol>
    <li>Try a custom property first.</li>
    <li>If nothing fits, reach for a CSS part.</li>
    <li>For state-driven changes, use the matching custom state.</li>
  </ol>

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

### Inline elements

Inline elements you'd reach for in long-form writing — `<kbd>`, `<mark>`, `<sub>`/`<sup>`, `<abbr>` — work as expected inside a prose container, styled by [native styles](/docs/utilities/native/).

```html {.example}
<article class="wa-prose">
  <p>
    Press <kbd>/</kbd> to <mark>jump to search</mark> the docs. Inline notation like H<sub>2</sub>O or E=mc<sup>2</sup>
    renders correctly, and the <abbr title="Application Programming Interface">API</abbr> reference sits at the end of
    every component page.
  </p>
</article>
```

### Major blocks

Code samples, tables, callouts, and collapsible `<details>` get more breathing room than running prose, so they read as distinct chunks of content rather than another sentence.

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

  <details>
    <summary>Why three sizes and not more?</summary>
    <p>
      Three covers the practical span — compact, default, prominent — without forcing authors to pick from a long list.
      For finer control, reach for the <a href="/docs/utilities/text/">text utilities</a>.
    </p>
  </details>

  <wa-callout variant="brand">
    <wa-icon slot="icon" name="lightbulb" variant="regular"></wa-icon>
    Pair sizes with the <a href="/docs/utilities/text/">text utilities</a> to keep type and component scale in lockstep.
  </wa-callout>
</article>
```

### Section breaks

`<hr>` marks a topic shift. Its own margin defines the gap; the heading or paragraph that follows hugs up to it so the divider stays visually anchored to what comes next.

```html {.example}
<article class="wa-prose">
  <p>
    Web Awesome components expose stable surfaces for customization, but every project eventually needs something the
    component author didn't anticipate.
  </p>

  <hr />

  <h3>Reaching past the API</h3>
  <p>
    When that happens, you have two clean options — fork the component, or wrap it in your own. Both keep your styles
    decoupled from the component's internals.
  </p>
</article>
```

## Typographic details

A few quieter refinements come along with the rhythm:

- **Oldstyle proportional figures** in running text; tables stay `tabular-nums` so numeric columns still align.
- **Hanging punctuation** pulls opening quotes, em-dashes, and trailing stops into the margin (Safari today; progressive enhancement elsewhere).
- **Quiet list markers** so bullets and numbers don't compete with the prose they label.
- **Long-word breaks** on `<code>` and `<pre>` so URLs and identifiers can't overflow the column.

## Composing with font-size utilities

Apply any [`wa-font-size-*`](/docs/utilities/text/#font-size) utility to a `wa-prose` container and text, headings, and rhythm scale together. No size variants required.

```html {.example}
<div class="wa-cluster wa-align-items-flex-start" style="gap: var(--wa-space-l);">
  <article class="wa-prose" style="--wa-prose-line-length: 28ch;">
    <h3>Default size</h3>
    <p>Headings, body text, and rhythm all use the theme's default scale.</p>
    <ul>
      <li>Set by the theme's font-size tokens.</li>
      <li>Scales smoothly with composition.</li>
    </ul>
  </article>

  <article class="wa-prose wa-font-size-s" style="--wa-prose-line-length: 28ch;">
    <h3>With wa-font-size-s</h3>
    <p>Same content, scaled down. Heading-to-paragraph rhythm stays proportional.</p>
    <ul>
      <li>Set by the theme's font-size tokens.</li>
      <li>Scales smoothly with composition.</li>
    </ul>
  </article>
</div>
```

## Adjusting rhythm

Set `--wa-prose-rhythm-scale` on the prose container to multiply every margin in the system. Values below `1` tighten the rhythm; values above loosen it. Type sizes are unaffected.

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

## Composing with other utilities

The `wa-prose` class and its element rules sit at `0,0,0` specificity, so any utility class you apply alongside — `wa-heading-m`, `wa-cluster`, `wa-text-align-center`, and so on — wins automatically. The same goes for plain element rules in your own stylesheet, no `!important` or specificity tricks required.

```css
/* Wins against wa-prose's `h2 { font-size: 2em }` */
h2.release-header {
  font-size: var(--wa-font-size-m);
}
```

## Theming

Color flows from your theme's [color tokens](/docs/tokens/color/), so prose follows dark mode and theme changes automatically. To recolor an element inside prose, use a descendant selector on your container.

```css
.changelog.wa-prose a {
  color: var(--wa-color-brand-on-quiet);
}
```

## Opting out of prose

Apply `wa-not-prose` to any element inside a `wa-prose` container to disable prose rhythm for that element and its descendants. Other utilities — `wa-cluster`, `wa-stack`, `wa-font-size-*` — keep working in the opt-out subtree.

```html {.example}
<article class="wa-prose">
  <h3>Ready to build something?</h3>
  <p>
    The rhythm above follows wa-prose. The button row below opts out — it sits in a <code>wa-not-prose</code> wrapper so
    margins and font sizes revert.
  </p>

  <div class="wa-not-prose">
    <div class="wa-cluster" style="gap: var(--wa-space-s);">
      <wa-button variant="brand">Get started</wa-button>
      <wa-button appearance="outlined">Learn more</wa-button>
    </div>
  </div>

  <p>And the paragraph after picks the rhythm back up where it left off.</p>
</article>
```
