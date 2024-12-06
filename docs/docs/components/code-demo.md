---
title: Code Demo
description: Code demos can be used to render code examples as inline live demos.
layout: component
---

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
Some of the things that are not yet implemented are listed below.
It goes without saying that this list is a rough plan and subject to change.

### High priority

- [ ] Make the component dynamic so that when the code changes, the demo is updated
- [ ] Provide a way to hide the edit button
- [ ] Provide a way to link to the resources to be included
- [ ] Provide a way to render to an iframe
- [ ] Provide a way to zoom out (hardcoded)

### Low priority

- [ ] Horizontal layout
- [ ] Tabbed layout
- [ ] Make toggle open with an animation for browsers that support height: auto transitions
- [ ] Support CSS-only or JS-only demos
- [ ] Provide a way to transform the code displayed (e.g. remove elements or attributes, fix whitespace, sanitize HTML etc.)
- [ ] Provide a way to customize the playground used (currently it is hardcoded to CodePen)
- [ ] Provide controls for zooming in/out
- [ ] Provide a way to render to the light DOM?

## Examples

### Open by default

```html {.example .open}
<wa-code-demo open>
  <pre><code class="language-html">
    &lt;button&gt;Click me!&lt;/button&gt;
    &lt;wa-button&gt;Click me!&lt;/wa-button&gt;
  </code></pre>
</wa-code-demo>
```

### Custom preview

In some cases you may want to preprocess the code displayed, for example to sanitize HTML, remove irrelevant elements or attributes, or fix whitespace.
In those cases, you can slot in a custom preview:

```html {.example .open}
<wa-code-demo open>
  <template slot="preview">
    <wa-button>Click me!</wa-button>
  </template>
  <pre><code class="language-html">
    &lt;button&gt;Click me!&lt;/button&gt;
  </code></pre>
</wa-code-demo>
```

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
<wa-code-demo open style="border-width: var(--wa-border-width-l); border-color: var(--wa-color-green-50); --divider-width: var(--wa-border-width-m);">
  <pre><code class="language-html">
    &lt;button&gt;Click me!&lt;/button&gt;
    &lt;wa-button&gt;Click me!&lt;/wa-button&gt;
  </code></pre>
</wa-code-demo>
```
