---
meta:
  title: Layout
  description: The layout component is a way to quickly scaffold up pages in a consistent way designed to reduce boilerplate and help get you from 0 to full page as fast as possible.
layout: component
---

The layout component is intended for full page usage, but is shown here in a smaller format for easier previewing.

The layout component does not implement any internal semantic elements because we don't want to assume what content you will be using.

Layouts are best in the dedicate [layouts section](/layouts/index.html)

```html:preview
<style>
  wa-layout::part(header) {
    border-bottom: 1px solid var(--wa-color-neutral-outline-muted-alt);
    background-color: var(--wa-color-white);
  }

  /* Override global styles */
  wa-layout :is(main, [slot="aside"]) {
    margin: 0;
    padding: 1rem;
  }


</style>
<wa-layout main-id="content" style="max-height: 500px; overflow: auto;">
  <header slot="header">
    Header
  </header>

  <nav aria-label="Main Navigation" slot="navigation">
    <ul style="list-style-type: ' '";>
      <li><wa-button variant="text" href="#">Home</wa-button></li>
    </ul>
  </nav>

  <main id="content">
    Main Content
  </main>

  <div slot="aside">
    Aside
  </div>

  <footer slot="footer">
    Footer
  </footer>
</wa-layout>
```

## Examples