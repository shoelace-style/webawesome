---
title: Code Demo
description: Code demos can be used to render code examples as inline live demos.
layout: component
---

```html {.example .open}
<wa-code-demo open>
  <pre><code class="language-html">
    &lt;button&gt;Click me!&lt;/button&gt;
    &lt;wa-button&gt;Click me!&lt;/wa-button&gt;
  </code></pre>
</wa-code-demo>
```

```html {.example .open}
<wa-code-demo>
  <pre><code class="language-html">
    &lt;button&gt;Click me!&lt;/button&gt;
    &lt;wa-button&gt;Click me!&lt;/wa-button&gt;
  </code></pre>
</wa-code-demo>
```

<wa-callout variant="danger">
  <wa-icon name="circle-exclamation" slot="icon" variant="regular"></wa-icon>

Do not render untrusted content in a `<wa-code-demo>` element.
This component renders the content as HTML, which introduce XSS vulnerabilities if used with untrusted content.

</wa-callout>

## Roadmap

This component is a work in progress.
Some of the things that are not yet implemented are below.
This is only a rough list and is subject to change.

### Critical

- [ ] Figure out why `open` does not reflect properly
- [ ] Make the Edit button work

### High priority

- [ ] Make the component dynamic so that when the code changes, the demo is updated
- [ ] Provide a way to hide the edit button
- [ ] Provide a way to link to the resources to be included
- [ ] Provide a way to render to the light DOM or an iframe
- [ ] Provide a way to zoom out (hardcoded)

### Low priority

- [ ] Horizontal layout
- [ ] Tabbed layout
- [ ] Make toggle open with an animation for browsers that support height: auto transitions
- [ ] Support CSS-only or JS-only demos
- [ ] Provide a way to transform the code displayed (e.g. remove elements or attributes, fix whitespace, sanitize HTML etc.)
- [ ] Provide a way to customize the playground used (currently it is hardcoded to CodePen)
- [ ] Provide controls for zooming in/out
- [ ] Provide a way to resize the preview horizontally

## Examples

TBD

## Styling

Just setting `border-radius` or `border` should work as expected:

```html{.example}
<wa-code-demo open style="border: 2px dotted var(--wa-color-blue-50); border-radius: var(--wa-border-radius-s)">
  <pre><code class="language-html">
    &lt;button&gt;Click me!&lt;/button&gt;
    &lt;wa-button&gt;Click me!&lt;/wa-button&gt;
  </code></pre>
</wa-code-demo>
```

The divider width is controlled separately via `--divider-width`:

```html{.example}
<wa-code-demo open style="border: 5px dotted var(--wa-color-green-50); --divider-width: 4px; border-radius: var(--wa-border-radius-l);">
  <pre><code class="language-html">
    &lt;button&gt;Click me!&lt;/button&gt;
    &lt;wa-button&gt;Click me!&lt;/wa-button&gt;
  </code></pre>
</wa-code-demo>
```
