---
question: Why don't my style overrides take effect?
order: 50
synonyms: [override, css not working, important, cascade layers, specificity]
source: webawesome/src/styles/component/host.styles.ts; webawesome/src/components/*/*.styles.ts; webawesome/src/styles/layers.css; webawesome/docs/docs/customizing.md
---
Most component styles live inside a shadow root, where your page CSS can't select them at all. What your CSS can win is the handful of things that reach across the boundary. Where both can target the same element, the browser ranks the outer page above the shadow tree before specificity even comes up, so a plain rule in your own stylesheet already beats the component's. Most of the <code>!important</code> declarations you're carrying can probably go. For everything sealed inside, <a href="/docs/customizing">Customizing &amp; Theming</a> covers the CSS parts, custom properties, and custom states each component exposes on purpose.

Cascade layers are the other thing worth checking. Some Web Awesome styles ship in cascade layers, and unlayered CSS beats every layer no matter the specificity. If your overrides sit inside a layer of your own, they lose to any unlayered rule on the page. Move them out of the layer.
