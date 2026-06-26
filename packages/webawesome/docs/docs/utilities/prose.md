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

Wrap a block of content in `wa-prose` to apply a hierarchical, asymmetric typographic rhythm: generous space above headings, tighter space below, more breathing room around major non-text blocks, and a true section divider for `<hr>`. Spacing is em-based and scales with `wa-font-size-*` utilities.

Reach for it on documentation, blog posts, articles, or marketing copy. Element styling (color, font, borders) still comes from [native styles](/docs/utilities/native/); `wa-prose` only adjusts rhythm, type scale, and the reading column.

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
  <h1>A short history of paper</h1>
  <h2>From bark to broadsheet</h2>
  <p>
    Long before pulp mills and printing presses, people wrote on whatever surface would hold a mark. Clay, papyrus, palm
    leaves, bark, animal skins — each one pinned a culture's words to a place and a moment.
  </p>

  <h3>The rag era</h3>
  <p>
    Early European paper was beaten from cotton and linen rags. Quality was measured in fiber: the longer the strand,
    the stronger the sheet, the longer it survived in a binding.
  </p>

  <h4>Watermarks and laid lines</h4>
  <p>
    Hold a rag sheet up to the light and you can still see the maker's mark and the fine lines pressed in by the mould —
    small signatures of the hand that pulled it.
  </p>
</article>
```

### Lists

Lists get a small breath between multi-line items. Quiet markers and bold `<dt>` terms come from [native styles](/docs/utilities/native/).

```html {.example}
<article class="wa-prose">
  <ul>
    <li>Loose-leaf greens, kept cool and dry.</li>
    <li>
      Black tea pressed into wheels and aged for decades, sometimes longer than the people drinking it have been alive.
    </li>
    <li>Fresh herbs, picked the morning of and steeped just past warm.</li>
  </ul>

  <ol>
    <li>Warm the pot with a splash of hot water; pour it out.</li>
    <li>Measure one teaspoon of leaves per cup, plus one for the pot.</li>
    <li>Pour, cover, and wait — three minutes for black, two for green.</li>
  </ol>

  <dl>
    <dt>Steep</dt>
    <dd>To soak leaves in hot water until the flavor is fully released.</dd>
    <dt>Decant</dt>
    <dd>To pour brewed tea off its leaves to halt further extraction.</dd>
    <dt>Cupping</dt>
    <dd>A side-by-side tasting used to evaluate tea or coffee.</dd>
  </dl>
</article>
```

### Inline elements

Inline elements you'd reach for in long-form writing — `<kbd>`, `<mark>`, `<sub>`/`<sup>`, `<abbr>` — work as expected inside a prose container, styled by [native styles](/docs/utilities/native/).

```html {.example}
<article class="wa-prose">
  <p>
    Press <kbd>⌘</kbd> + <kbd>K</kbd> to open the command palette and <mark>jump anywhere</mark> from the keyboard.
    Inline notation reads cleanly too — H<sub>2</sub>O, E=mc<sup>2</sup> — and abbreviations like
    <abbr title="As Soon As Possible">ASAP</abbr> hint their full meaning on hover.
  </p>
</article>
```

### Major blocks

Code samples, tables, callouts, and collapsible `<details>` get more breathing room than running prose, so they read as distinct chunks of content rather than another sentence.

```html {.example}
<article class="wa-prose">
  <h2>Reading a film canister</h2>
  <p>Most rolls of film list the same three pieces of information on the side.</p>

  <pre><code>ISO 400
36 exposures
develop in HC-110, dilution B</code></pre>

  <table>
    <thead>
      <tr>
        <th>ISO</th>
        <th>Best for</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>100</td>
        <td>Bright daylight, fine grain</td>
      </tr>
      <tr>
        <td>400</td>
        <td>Mixed conditions, everyday use</td>
      </tr>
      <tr>
        <td>3200</td>
        <td>Low light, available light</td>
      </tr>
    </tbody>
  </table>

  <details>
    <summary>What does "push processing" mean?</summary>
    <p>
      Exposing film at a higher ISO than its rated speed, then developing it longer to compensate. You gain a stop or
      two in low light, at the cost of more grain and deeper contrast.
    </p>
  </details>

  <wa-callout variant="brand">
    <wa-icon slot="icon" name="lightbulb" variant="regular"></wa-icon>
    Note the development time on the canister with a permanent marker — it saves a trip back to the binder later.
  </wa-callout>
</article>
```

### Section breaks

`<hr>` marks a topic shift. Its own margin defines the gap; the heading or paragraph that follows hugs up to it so the divider stays visually anchored to what comes next.

```html {.example}
<article class="wa-prose">
  <p>
    A morning routine, repeated long enough, stops needing motivation. The coffee gets made, the bed gets pulled flat,
    the kettle clicks on while the blinds go up.
  </p>

  <hr />

  <h3>When the routine breaks</h3>
  <p>
    Travel, illness, a new schedule — the small steps drift apart. The trick is to rebuild around one anchor first, then
    let the rest follow.
  </p>
</article>
```

## Typographic details

A few quieter refinements come along with the rhythm:

- **Oldstyle proportional figures** in running text so numerals sit alongside letters more naturally.
- **Hanging punctuation** pulls opening quotes, em-dashes, and trailing stops into the margin (Safari today; progressive enhancement elsewhere).
- **Long-word breaks** on `<code>` and `<pre>` so URLs and identifiers can't overflow the column.

## Composing with font-size utilities

Apply any [`wa-font-size-*`](/docs/utilities/text/#font-size) utility to a `wa-prose` container and text, headings, and rhythm scale together. No size variants required.

```html {.example}
<div class="wa-cluster wa-align-items-flex-start" style="gap: var(--wa-space-l);">
  <article class="wa-prose" style="--wa-prose-line-length: 28ch;">
    <h3>Default size</h3>
    <p>A quiet morning is the rarest hour of the day — claim it before the world wakes up.</p>
    <ul>
      <li>One cup, one book, one window.</li>
      <li>No notifications until the second pour.</li>
    </ul>
  </article>

  <article class="wa-prose wa-font-size-s" style="--wa-prose-line-length: 28ch;">
    <h3>With wa-font-size-s</h3>
    <p>A quiet morning is the rarest hour of the day — claim it before the world wakes up.</p>
    <ul>
      <li>One cup, one book, one window.</li>
      <li>No notifications until the second pour.</li>
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
    <p>Two paragraphs of the same length, at the same size.</p>
    <p>The space between them is what changes from one card to the next.</p>
  </article>

  <article class="wa-prose" style="--wa-prose-line-length: 28ch; --wa-prose-rhythm-scale: 0.6;">
    <h3>Tighter rhythm</h3>
    <p>Two paragraphs of the same length, at the same size.</p>
    <p>The space between them is what changes from one card to the next.</p>
  </article>
</div>
```

## Composing with other utilities

The `wa-prose` class and its element rules sit at `0,0,0` specificity, so any utility class you apply alongside — `wa-heading-m`, `wa-cluster`, `wa-text-center`, and so on — wins automatically. The same goes for plain element rules in your own stylesheet, no `!important` or specificity tricks required.

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
  <h3>Ready when you are</h3>
  <p>
    The paragraphs around this section follow prose rhythm. The callout below is given
    <code>wa-not-prose</code>, so its font sizing and spacing revert to the component defaults.
  </p>

  <wa-callout class="wa-not-prose" variant="warning">
    <wa-icon slot="icon" name="highlighter"></wa-icon>
    <div class="wa-stack">
      <h4>Leave it to the prose</h4>
      <p>The elements in this callout are exempt from <code>wa-prose</code> rules, thanks to <code>wa-not-prose</code>.</p>
    </div>
  </wa-callout>

  <p>And the paragraph after picks the rhythm back up where it left off.</p>
</article>
```
