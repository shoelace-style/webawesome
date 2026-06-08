# Full-page layouts with `<wa-page>`

You are here because STEP 0 determined you're building a **full page, app shell, or site layout**. In
this branch, `<wa-page>` is **required** and the rules below are absolute. Do not hand-roll a full-page
grid; `<wa-page>` exists precisely so you don't have to.

Full docs: https://webawesome.com/docs/components/page

---

## Mental model

`<wa-page>` is a grid of named regions. Picture **5 stacked rows**, where the middle row splits into
**3 columns**:

```
┌──────────────────────────────────────────────┐
│ banner                                       │  ← optional, hidden when empty
├──────────────────────────────────────────────┤
│ header                            (sticky)   │
├──────────────────────────────────────────────┤
│ subheader                         (sticky)   │  ← e.g. breadcrumbs
├──────────┬───────────────────────┬───────────┤
│ menu /   │ main-header           │ aside     │
│ navi-    │ ┌───────────────────┐ │ (sticky)  │
│ gation   │ │ main (default)    │ │           │
│ (sticky) │ └───────────────────┘ │           │
│          │ main-footer           │           │
├──────────┴───────────────────────┴───────────┤
│ footer                                       │  ← always below the fold
└──────────────────────────────────────────────┘
```

You opt into regions by slotting content. **Empty slots render nothing**, so use only the regions you
need. The default (unnamed) slot is your main content.

On mobile (below `mobile-breakpoint`, default `768px`), the `navigation` region collapses into a
`<wa-drawer>` toggled by a hamburger button. **On desktop (at or above the breakpoint) it is a
persistent left sidebar column** — see the warning directly below before you use it.

**First decision, before any markup: does this page have a left sidebar on desktop?**

- **No** (landing page, marketing site, most content pages) → put nav in `header`, leave `menu` /
  `navigation` / `navigation-header` / `navigation-footer` **empty**, and don't use `data-toggle-nav`.
  Build any mobile menu as your own `<wa-drawer>`. The `body` row collapses to a single `main` column.
- **Yes** (app shell, docs, dashboard) → use the `navigation` slot and follow Hard rule 5 + 6.

---

## ⚠️ The `navigation` slot is a desktop sidebar, not a "mobile menu"

This is the single most common `<wa-page>` mistake. The `navigation` slot is a **standing left sidebar
on desktop** that _additionally_ collapses into a drawer on mobile. It is **not** a mobile-only menu that
hides on desktop. If you slot links into `navigation` thinking "this is my hamburger menu," you will get
an unstyled column of links pinned down the left side of every desktop view — outside your hero, on the
bare page surface.

**Most marketing/landing pages do not want a sidebar at all.** Their nav lives in the `header` and wraps
or hides on small screens. So:

- **Landing page / marketing site (nav belongs in the header):** Put your primary nav in `slot="header"`.
  For the small-screen menu, **do not use the `navigation` slot.** Either (a) let the header nav collapse
  on its own, or (b) put the mobile menu in your **own** `<wa-drawer>` opened by a `data-toggle-nav`
  button that is hidden on desktop (`.wa-desktop-only`/`.wa-mobile-only`, or a media query). Reserve the
  `navigation` slot for when you genuinely want a persistent desktop sidebar.
- **App shell / docs / dashboard (you genuinely want a left sidebar on desktop):** Use the `navigation`
  slot as intended, and follow Hard rule 5 — set `--menu-width` and reset it to `auto` under
  `wa-page[view='mobile']`, or the sidebar's reserved space leaks onto mobile too.

Quick test: _"Do I want a column of navigation down the left edge on a wide screen?"_ If **no**, the
`navigation` slot is the wrong tool — keep nav in the header and hand-roll the mobile drawer.

---

## Everything below is `<wa-page>`-only

The capabilities in this file **only work on elements inside a `<wa-page>`**. Outside one, they are
inert; they do nothing, silently. Do not lift them into a section, widget, or any layout that isn't a
`<wa-page>`. This includes:

- The **slots** (`slot="header"`, `slot="navigation"`, `slot="aside"`, etc.). `slot` only matters on a direct child of `<wa-page>`.
- The **`view='mobile'` / `view='desktop'` state** and the CSS that keys off it.
- **`.wa-desktop-only` / `.wa-mobile-only`**. These are not general responsive utilities; they work _only_ via `<wa-page>`'s `view` selector. Outside `<wa-page>` they do nothing; use a CSS media query instead.
- **`data-toggle-nav`**. Only `<wa-page>` listens for it.
- The custom properties **`--menu-width`**, **`--main-width`**, **`--aside-width`**.
- **Sticky** banner/header/subheader/menu/aside, the mobile **navigation drawer**, and the automatic **`html`/`body` reset**.

If you're not building a full page, you don't get these, and you don't need them. Use the layout
utilities instead (see [layouts-inpage.md](layouts-inpage.md)).

---

## Hard rules (these are the things that go wrong)

1. **Reset `html` and `body`.** `<wa-page>` injects this reset itself (via `:has(wa-page)`), but include
   it explicitly anyway. It's the documented recommendation and it covers SSR and browsers without
   `:has()` support. Without the reset you can see gaps around the page:

   ```css
   html,
   body {
     min-height: 100%;
     padding: 0;
     margin: 0;
   }
   ```

   (If you use [native styles](https://webawesome.com/docs/utilities/native/), this is already handled.)

2. **`<wa-page>` provides no semantic elements.** It does not emit `<main>`, `<header>`, `<footer>`,
   etc. Slot your own:

   ```html
   <header slot="header">…</header>
   <nav slot="navigation">…</nav>
   <main>…</main>
   <aside slot="aside">…</aside>
   <footer slot="footer">…</footer>
   ```

3. **Zero out the padding on `<main>` by default.** `<wa-page>` pads the main content area, which insets
   full-bleed section backgrounds (heroes, color bands) so they can't reach the viewport edges. Set
   `main { padding: 0 }` and give each `<section>` its own horizontal gutter instead — a
   `padding-inline` or an inner max-width wrapper:

   ```css
   main {
     padding: 0;
   }
   .section {
     padding-inline: var(--wa-space-xl); /* or wrap content in a centered max-width container */
   }
   ```

   Backgrounds then run edge-to-edge while content stays inset. Keep the default padding only when the
   whole page is a single narrow, contained column (a docs article, a login form).

4. **Use `navigation`, not `menu`, for the responsive sidebar.** The `navigation` slot (plus
   `navigation-header` / `navigation-footer`) auto-collapses into a drawer on mobile. The `menu` slot
   means "I'll take over the left column entirely and handle mobile myself"; only use it if you truly
   need that.

5. **Set sidebar widths with custom properties, and reset them on mobile.** A fixed `--menu-width` /
   `--aside-width` still reserves space below the breakpoint, so collapse it back to `auto` for
   `view='mobile'`. The `navigation` sidebar moves into the drawer automatically; the `aside` does not,
   so to hide it on mobile also set `display: none` on that slot:

   ```css
   wa-page {
     --menu-width: 16rem;
     --aside-width: 18rem;
   }
   wa-page[view='mobile'] {
     --menu-width: auto;
     --aside-width: auto;
   }
   wa-page[view='mobile'] [slot='aside'] {
     display: none; /* aside has no drawer; hide it explicitly on mobile */
   }
   ```

6. **`data-toggle-nav` toggles the `navigation` drawer — it is a sidebar-layout tool, not a generic
   "mobile menu" button.** It only does something when you have content in the `navigation` slot. On a
   landing page with no `navigation` slot, a `data-toggle-nav` button opens an **empty** drawer — a dead
   button. So: if you're using the `navigation` sidebar, toggle its mobile drawer with the default
   hamburger or your own `data-toggle-nav` button (anywhere inside `<wa-page>`; adding one auto-hides the
   default hamburger). If you're **not** using the `navigation` sidebar (the landing-page case), do not
   use `data-toggle-nav` at all — build your mobile menu as your own `<wa-drawer>` and open it with a
   normal click handler. To swap elements between viewports inside `<wa-page>`, use `.wa-desktop-only` /
   `.wa-mobile-only` (they key off `view`); outside `<wa-page>`, reach for a CSS media query instead.

7. **Close the drawer when a nav link is tapped.** The mobile navigation is a `<wa-drawer>`, so add
   `data-drawer="close"` to your navigation links, so tapping one then closes the drawer (otherwise it
   stays open over the page you just navigated to):

   ```html
   <nav slot="navigation" class="wa-stack wa-gap-2xs">
     <a href="#dashboard" data-drawer="close">Dashboard</a>
     <a href="#settings" data-drawer="close">Settings</a>
   </nav>
   ```

8. **Custom elements never self-close.** `<wa-button></wa-button>`, not `<wa-button />`.

9. **`view` is read-only; never set it.** The component sets `view='mobile'` / `view='desktop'` itself
   (via a `ResizeObserver`, defaulting to `'desktop'` for SSR). You only ever _read_ it in CSS
   (`wa-page[view='mobile'] { … }`). Don't gate critical initial rendering on it.

---

## Canonical example — landing page (no sidebar)

Use this for a hero-driven marketing/landing page. **All nav is in the `header`.** There is no
`navigation` slot and no `data-toggle-nav`; the mobile menu is a separate `<wa-drawer>` you open
yourself, shown only on mobile via a media query. This is the most common `<wa-page>` shape — start here
unless you specifically want a desktop sidebar.

```html
<wa-page>
  <header slot="header" class="wa-split section">
    <strong>My Brand</strong>

    <!-- Desktop nav — header only, never the navigation slot -->
    <nav class="nav-desktop wa-cluster wa-gap-l">
      <a href="#features">Features</a>
      <a href="#pricing">Pricing</a>
      <a href="#faq">FAQ</a>
      <wa-button variant="brand">Get started</wa-button>
    </nav>

    <!-- Mobile menu button — opens our own drawer, NOT data-toggle-nav -->
    <wa-button class="nav-menu-button" appearance="plain" onclick="document.getElementById('menu').open = true">
      <wa-icon name="bars" label="Open menu"></wa-icon>
    </wa-button>
  </header>

  <main>
    <section class="section wa-stack wa-gap-l">
      <h1>Big headline</h1>
      <p>Hero content.</p>
      <wa-button variant="brand" size="large">Get started</wa-button>
    </section>
    <!-- more full-bleed <section class="section"> blocks … -->
  </main>

  <footer slot="footer" class="section">
    <small>&copy; My Brand</small>
  </footer>
</wa-page>

<!-- Our own mobile menu, independent of the page's navigation slot -->
<wa-drawer id="menu" label="Menu">
  <nav class="wa-stack wa-gap-m">
    <a href="#features" onclick="document.getElementById('menu').open = false">Features</a>
    <a href="#pricing" onclick="document.getElementById('menu').open = false">Pricing</a>
    <a href="#faq" onclick="document.getElementById('menu').open = false">FAQ</a>
  </nav>
</wa-drawer>

<style>
  html,
  body {
    min-height: 100%;
    padding: 0;
    margin: 0;
  }
  main {
    padding: 0;
  }
  .section {
    padding-inline: var(--wa-space-xl);
  }
  .nav-desktop {
    display: none;
  }
  .nav-menu-button {
    display: inline-flex;
  }
  @media (min-width: 768px) {
    .nav-desktop {
      display: flex;
    }
    .nav-menu-button {
      display: none;
    }
  }
</style>
```

> Note this skeleton uses a plain CSS media query (not `.wa-desktop-only` / `wa-page[view=…]`) to swap
> the desktop nav and the mobile button. That's deliberate: those `view`-based helpers are tied to the
> `navigation`/sidebar machinery, and a media query is the simpler, self-contained choice when you're not
> using the sidebar at all.

## Canonical example — app/docs (with a desktop sidebar)

A documentation-style layout using header, subheader (with a mobile nav toggle), a collapsing
navigation sidebar, main content, a sticky table-of-contents aside, and a footer. **Only use the
`navigation` slot when you want this left sidebar on desktop.**

```html
<wa-page mobile-breakpoint="920">
  <header slot="header" class="wa-split">
    <div class="wa-cluster">
      <strong>Web Awesome</strong>
      <a href="#">Docs</a>
      <a href="#">Components</a>
    </div>
    <div class="wa-cluster">
      <wa-button variant="brand">Sign up</wa-button>
    </div>
  </header>

  <nav slot="subheader" class="wa-cluster wa-gap-xs">
    <wa-button data-toggle-nav appearance="plain" class="wa-mobile-only">
      <wa-icon name="bars" label="Menu"></wa-icon>
    </wa-button>
    <wa-breadcrumb>
      <wa-breadcrumb-item href="/">Home</wa-breadcrumb-item>
      <wa-breadcrumb-item>Layouts</wa-breadcrumb-item>
    </wa-breadcrumb>
  </nav>

  <nav slot="navigation-header">
    <strong>Guide</strong>
  </nav>
  <nav slot="navigation" class="wa-stack wa-gap-2xs">
    <a href="#start" data-drawer="close">Getting started</a>
    <a href="#layout" data-drawer="close">Layout</a>
    <a href="#theming" data-drawer="close">Theming</a>
  </nav>

  <!-- Contained docs column, so the default main padding is kept (see Hard rule 3).
       For a landing page with full-bleed heroes/bands, zero it: main { padding: 0 }. -->
  <main class="wa-stack wa-gap-xl">
    <h1>Getting started</h1>
    <p>Your content goes here.</p>
    <h2 id="layout">Layout</h2>
    <p>More content.</p>
  </main>

  <aside slot="aside" class="wa-desktop-only wa-stack wa-gap-m">
    <strong>On this page</strong>
    <ul class="wa-stack wa-gap-2xs">
      <li><a href="#start">Getting started</a></li>
      <li><a href="#layout">Layout</a></li>
    </ul>
  </aside>

  <footer slot="footer" class="wa-grid wa-gap-2xl">
    <div class="wa-stack wa-gap-xs">
      <strong>Product</strong>
      <a href="#">Features</a>
      <a href="#">Pricing</a>
    </div>
    <div class="wa-stack wa-gap-xs">
      <strong>Company</strong>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </div>
  </footer>
</wa-page>

<style>
  html,
  body {
    min-height: 100%;
    padding: 0;
    margin: 0;
  }
  wa-page {
    --menu-width: 15rem;
    --aside-width: 16rem;
  }
  wa-page[view='mobile'] {
    --menu-width: auto;
    --aside-width: auto;
  }
</style>
```

> **Choosing `mobile-breakpoint`.** The default is `768px`, which is often too narrow once you have a
> real sidebar. Documentation and app layouts commonly use a wider value (the example above uses `920`;
> app shells frequently use `1152`). Pick the width at which your sidebar + content stop fitting
> comfortably, not a fixed device size. It accepts a number (px) or a CSS length like `60em`.

---

## Anti-patterns

| ❌ Don't                                                                                                                                                                         | ✅ Do                                                                                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Forget the `html, body` reset → gaps appear                                                                                                                                      | Always add the reset (or use native styles)                                                                                                                                    |
| Expect `<wa-page>` to emit `<main>`/`<header>`                                                                                                                                   | Slot in your own semantic elements                                                                                                                                             |
| Put nav in `menu` and wonder why it won't collapse                                                                                                                               | Use `navigation` (+ `navigation-header`/`-footer`) for mobile collapse                                                                                                         |
| Put nav in `header` **and** copy it into `slot="navigation"` as "the mobile menu" → a redundant bare sidebar column appears down the left on desktop, duplicating the header nav | Landing page: nav in `header` only, **no** `navigation` slot, **no** `data-toggle-nav`; mobile menu is your own `<wa-drawer>`. Reserve `navigation` for a real desktop sidebar |
| Pair `data-toggle-nav` with your own `<wa-drawer>` on a landing page (it toggles the empty `navigation` drawer, not yours → dead button)                                         | Open your own drawer with a normal click handler; use `data-toggle-nav` only for the `navigation` sidebar drawer                                                               |
| Set `--menu-width: 16rem` and leave it on mobile                                                                                                                                 | Reset widths to `auto` under `wa-page[view='mobile']`                                                                                                                          |
| Nav links that leave the drawer open after a tap                                                                                                                                 | Add `data-drawer="close"` to navigation links                                                                                                                                  |
| Expect `aside` to disappear on mobile on its own                                                                                                                                 | `aside` has no drawer; hide it (`.wa-desktop-only` or `display: none`)                                                                                                         |
| Try to set `view="mobile"` yourself                                                                                                                                              | `view` is read-only; the component sets it. Only read it in CSS                                                                                                                |
| Hand-roll a `display: grid` page shell                                                                                                                                           | Use `<wa-page>`; it already is the grid                                                                                                                                        |
| Nest `<wa-page>` inside a section or another page                                                                                                                                | One `<wa-page>` per page, at the top level                                                                                                                                     |
| Hand-roll a mobile nav and only translate it off-screen → it overlaps content at desktop                                                                                         | Use the `navigation` slot (auto drawer). If you must hand-roll, hide it with `display: none` at desktop, not just `transform`                                                  |
| Hardcode header colors with hex                                                                                                                                                  | Use `--wa-color-surface-*` / semantic tokens                                                                                                                                   |
| `<wa-button />` (self-closing)                                                                                                                                                   | `<wa-button></wa-button>`                                                                                                                                                      |

---

## `<wa-page>` checklist

Before calling a `<wa-page>` layout done, walk this **`<wa-page>`-specific** structural pass. This sits
alongside the general structural Final Pass in SKILL.md and the visual Polish Checklist in composition.md;
each catches different things.

- [ ] **Right sidebar decision.** Landing page: no `navigation` slot, no `data-toggle-nav`; the mobile menu is your own `<wa-drawer>`. App shell / docs: `navigation` slot used with `--menu-width` set, and reset to `auto` under `wa-page[view='mobile']`.
- [ ] **`html, body` reset** is in place (or you're using native styles) — otherwise gaps appear around the page.
- [ ] **Your own semantic elements are slotted** — `<header>`, `<main>`, `<footer>`, `<nav>`, `<aside>`. `<wa-page>` emits none.
- [ ] **`main` padding is `0`** for full-bleed pages where sections own their gutter; keep the default only for a single contained column (docs article, login form).
- [ ] **Sidebar widths reset on mobile.** `--menu-width` and `--aside-width` go to `auto` under `wa-page[view='mobile']` so they don't leak; the `aside` is hidden (`display: none`) on mobile since it has no auto-drawer.
- [ ] **`data-drawer="close"`** is on every link in the mobile-collapsing nav, so tapping one closes the drawer instead of leaving it open over the next page.
- [ ] **`data-toggle-nav` is only used when you have a real `navigation` slot.** On a landing page without one, it opens an empty drawer — a dead button. Wire your own mobile menu with a normal click handler instead.
- [ ] **`view` is read-only.** Read it in CSS (`wa-page[view='mobile']`); never set it as an attribute.
- [ ] **One `<wa-page>` per page**, at the top level — never nested inside a section or another `<wa-page>`.

---

## Sticky sections

`banner`, `header`, `subheader`, `menu`, and `aside` are sticky by default. (It's the `menu` wrapper
around the left sidebar that sticks; your `navigation` content scrolls within it.) To opt out, pass a
space-delimited list to `disable-sticky`:

```html
<wa-page disable-sticky="aside"> … </wa-page>
```

---

## API reference

For the authoritative, always-current API, see the [page component docs](https://webawesome.com/docs/components/page)
or the `webawesome` skill. This is a working summary.

### Slots

| Slot                     | Purpose                                                                                  |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| _(default)_              | The page's main content.                                                                 |
| `banner`                 | Above the header. Hidden when empty.                                                     |
| `header`                 | Top of the page. Sticky.                                                                 |
| `subheader`              | Below the header (e.g. breadcrumbs). Sticky.                                             |
| `menu`                   | Left column. _Overrides_ `navigation` and makes you handle mobile yourself. Rarely used. |
| `navigation`             | Left sidebar content. Collapses into a drawer on mobile. Use this for nav.               |
| `navigation-header`      | Header of the navigation area (drawer header on mobile).                                 |
| `navigation-footer`      | Footer of the navigation area (drawer footer on mobile).                                 |
| `navigation-toggle`      | Your own button to toggle the nav drawer.                                                |
| `navigation-toggle-icon` | Your own icon for the toggle button.                                                     |
| `main-header`            | Inline header above the main content.                                                    |
| `main-footer`            | Inline footer below the main content.                                                    |
| `aside`                  | Right sidebar (e.g. table of contents). Sticky.                                          |
| `skip-to-content`        | Custom text for the "skip to content" link.                                              |
| `footer`                 | Page footer. Always below the fold.                                                      |

### Attributes

| Attribute                   | Type                    | Default     | Purpose                                                           |
| --------------------------- | ----------------------- | ----------- | ----------------------------------------------------------------- |
| `view`                      | `'mobile' \| 'desktop'` | `'desktop'` | Reflects the current view. Set automatically; you read it in CSS. |
| `nav-open`                  | `boolean`               | `false`     | Whether the mobile nav drawer is open.                            |
| `mobile-breakpoint`         | `string`                | `'768px'`   | Width at which navigation collapses. Accepts px or CSS lengths.   |
| `navigation-placement`      | `'start' \| 'end'`      | `'start'`   | Which side the mobile drawer opens from.                          |
| `disable-navigation-toggle` | `boolean`               | `false`     | Hide the default hamburger button.                                |
| `disable-sticky`            | `string`                | —           | Space-delimited list of sections to make non-sticky.              |

### CSS custom properties

| Property        | Default | Purpose                            |
| --------------- | ------- | ---------------------------------- |
| `--menu-width`  | `auto`  | Width of the left (menu) column.   |
| `--main-width`  | `1fr`   | Width of the main content column.  |
| `--aside-width` | `auto`  | Width of the right (aside) column. |
