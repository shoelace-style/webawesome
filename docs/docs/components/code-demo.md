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

<wa-callout variant="danger">
  <wa-icon name="circle-exclamation" slot="icon" variant="regular"></wa-icon>

Do not render untrusted content in a `<wa-code-demo>` element.
This component renders the content as HTML, which introduce XSS vulnerabilities if used with untrusted content.

</wa-callout>

## Roadmap

This component is a work in progress.
Some of the things that are not yet implemented are:

### Critical

- [ ] Figure out why `open` does not reflect properly
- [ ] Make the Edit button work

### High priority

- [ ] Make the component dynamic so that when the code changes, the demo is updated
- [ ] Provide a way to hide the edit button
- [ ] Provide a way to link to the resources to be included
- [ ] Provide a way to render to the light DOM or an iframe

### Low priority

- [ ] Make toggle open with an animation for browsers that support height: auto transitions
- [ ] Support CSS-only or JS-only demos
- [ ] Provide a way to transform the code displayed (e.g. remove elements or attributes, fix whitespace, etc.)
- [ ] Provide a way to customize the playground used (currently it is hardcoded to CodePen)

## Examples

TBD
