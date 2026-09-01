---
question: Why do styles flash before components load?
order: 20
synonyms: [flash, fouc, fouce, flash of unstyled content, unstyled, flicker, cloak]
source: webawesome/docs/docs/utilities/fouce.md; webawesome/docs/docs/usage.md ("Waiting for Components to Be Ready"); webawesome/src/webawesome.loader.ts; webawesome/src/styles/utilities/fouce.css
---
That's a flash of undefined custom elements: the browser paints your markup before the component definitions have registered. Add <code>class="wa-cloak"</code> to the wrapper you want held back, or to <code>&lt;html&gt;</code> for the whole page, and it stays hidden until the elements inside are ready. The reveal takes care of itself. The autoloader strips the class when it finishes, and without the autoloader a two-second timeout does the revealing instead, so a slow network or a broken script never leaves you staring at a blank screen. If your JavaScript reads properties or calls methods on first load, wait for the elements too: <code>customElements.whenDefined()</code> for one component, <code>allDefined()</code> for every Web Awesome element in the DOM. <a href="/docs/utilities/fouce">Reducing FOUCE</a> covers cloaking and a helper for Turbo apps; <a href="/docs/usage">Usage</a> covers the waiting.
