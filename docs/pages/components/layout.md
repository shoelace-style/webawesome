---
meta:
  title: Layout
  description: The layout component is a way to quickly scaffold up pages in a consistent way designed to reduce boilerplate and help get you from 0 to full page as fast as possible.
layout: component
---

The layout component is intended for full page usage, but is shown here in a smaller format for easier previewing.

The layout component does not implement any internal semantic elements because we don't want to assume what content you will be using.

Layouts are best in the dedicate [layouts section](/layouts/index.html)

It's important to not if you add or omit any `header`, `footer`, `banner`, `sub-header`, `menu`, `aside`, the
page will automatically expand or collapse based on the presence of these slotted items.

`banner`, `header`, `sub-header`, `aside`, and `menu` are all sticky by default.
If you want to opt-out of this behavior you can do the following:

`disable-sticky="banner header sub-header aside menu"`

This tells the layout component to do two things:

1. Don't track the height of these elements.
1. Remove `position: sticky;`.

Reasons why you may want to disable sticky:

1. For `aside` / `menu` or blog sites sometimes this space is used for ads based on how far down a user scrolls.
1. For `banner`, `header`, `sub-header` it can cause a lot of clutter on the screen and you may only want to show certain elements are the user scrolls.

## Toggle navigation

Toggling navigation can be done in a number of ways.

`<wa-layout><button data-navigation-toggle></button></wa-layout>` - The button with `data-navigation-toggle` must be inside the `<wa-layout>` component.

`<wa-layout nav-state="open"></wa-layout>` -

`document.querySelector("button").addEventListener("click", () => document.querySelector("wa-layout").toggleNavigation())`

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
    <wa-nav-group>
      <wa-nav-item href="#">Home</wa-nav-item>
    </wa-nav-group>
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