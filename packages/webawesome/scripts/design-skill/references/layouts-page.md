# Full-page layouts with `<wa-page>`

You are here because the layout branch (SKILL.md workflow, step 2) says you're building a **full page, app
shell, or site layout**. Use `<wa-page>` for it. The component is the page grid, the sticky regions, the
responsive navigation, and the mobile drawer. Your job is to slot content into its regions. A hand-written
page grid, nav media queries, or a second drawer competes with what the component already does and breaks
in one of the two views.

Full docs: https://webawesome.com/docs/components/page

**Contents**

- [Mental model](#mental-model)
- [How navigation works](#how-navigation-works)
- [Pick a nav shape](#pick-a-nav-shape)
- [Rules](#rules)
- [Canonical example: app/docs with a desktop sidebar](#canonical-example-appdocs-with-a-desktop-sidebar)
- [`<wa-page>` checklist](#wa-page-checklist)
- [Sticky sections](#sticky-sections)
- [Server-side rendering](#server-side-rendering)
- [API reference](#api-reference)

---

## Mental model

`<wa-page>` is a grid of named regions: five stacked rows, with the middle row split into three columns.

```
┌──────────────────────────────────────────────┐
│ banner                                       │  ← hidden when empty
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

You opt into regions by slotting content; empty slots render nothing. The default (unnamed) slot is the
main content. Below `mobile-breakpoint` the navigation column collapses into a drawer, but the `aside`
column has no drawer, so you hide it yourself (rule 5).

Everything in this file works only on a `<wa-page>` and its direct children: the slots, the `view`
attribute and CSS keyed off it, `.wa-desktop-only` / `.wa-mobile-only`, `data-toggle-nav`, `--menu-width`
/ `--main-width` / `--aside-width`, and the sticky regions. Outside a `<wa-page>` they do nothing; use the
layout utilities and media queries in [layouts-inpage.md](layouts-inpage.md) instead.

---

## How navigation works

Content in `slot="navigation"` (plus `navigation-header` and `navigation-footer`) is rendered in exactly one
place at a time. On desktop (at or above `mobile-breakpoint`, default `768px`) it is a sticky left sidebar.
On mobile the same content moves into a `<wa-drawer>` opened by a hamburger button the component adds to
the header. One copy serves both views, so write it once.

- **The toggle.** The built-in hamburger appears only on mobile and only when there is navigation content.
  Put `data-toggle-nav` on any element inside `<wa-page>` to use your own toggle instead; that hides the
  built-in one, and the library hides `[data-toggle-nav]` elements on desktop for you. Several elements may
  carry it. It only ever opens the `navigation` drawer, so it does nothing useful without navigation
  content and never controls a drawer you wrote yourself.
- **Closing on tap.** Add `data-drawer="close"` to each link in `slot="navigation"`. Otherwise the drawer
  stays open over the page the user just navigated to.
- **The view switch.** `<wa-page>` measures itself and sets `view="mobile"` or `view="desktop"`. Media
  queries for the nav, sidebar, or toggle fight that switch; key any view-specific CSS off
  `wa-page[view='…']` instead.

---

## Pick a nav shape

Decide before writing markup whether the page shows a left sidebar on desktop.

### Sidebar on desktop

**Use when:** an app shell, docs site, or dashboard, where nav stays visible beside the content.

Put the nav in `slot="navigation"` once, give the sidebar a fixed `--menu-width`, and reset it to `auto` on
mobile (rule 5). Recipe: [the app/docs example](#canonical-example-appdocs-with-a-desktop-sidebar) below,
or the app shell in [patterns.md](patterns.md#app-shell-full-page-wa-page).

### Header links on desktop, drawer on mobile

**Use when:** a landing page, marketing site, or content site that wants links in the header bar and no
left sidebar.

This is the one layout that writes the nav twice, and each copy is hidden in the view it doesn't belong
to. All four steps are needed:

1. Put the desktop links in the `header` slot with `class="wa-desktop-only"`, so they hide on mobile.
2. Mirror the same links in `slot="navigation"`. That copy fills the mobile drawer.
3. Hide the desktop sidebar: `wa-page[view='desktop']::part(navigation) { display: none }`. Without it,
   desktop shows the links twice, in the header and in a sidebar. The rule targets only the desktop
   sidebar, so the drawer keeps working.
4. Put your own `data-toggle-nav` button as the last child of the header. The built-in toggle renders
   before your header content, outside your header element, and can wrap onto a row of its own.

Leave `--menu-width` unset. The left column is `minmax(0, var(--menu-width))`; with the default `auto` the
hidden sidebar's column collapses to nothing, but a fixed value keeps the track and leaves an empty band
down the left of the page. `display: none` on the sidebar never changes the track width.

```html
<wa-page>
  <header slot="header" class="wa-split">
    <strong>Acme</strong>
    <nav class="wa-desktop-only wa-cluster wa-gap-l" aria-label="Main">
      <a href="#features" class="wa-link-plain">Features</a>
      <a href="/pricing" class="wa-link-plain">Pricing</a>
    </nav>
    <wa-button data-toggle-nav appearance="plain">
      <wa-icon name="bars" label="Open menu"></wa-icon>
    </wa-button>
  </header>

  <nav slot="navigation" class="wa-stack wa-gap-s" aria-label="Main">
    <a href="#features" class="wa-link-plain" data-drawer="close">Features</a>
    <a href="/pricing" class="wa-link-plain" data-drawer="close">Pricing</a>
  </nav>

  <main>…</main>
</wa-page>

<style>
  wa-page[view='desktop']::part(navigation) {
    display: none;
  }
</style>
```

The complete page (hero, features, CTA band, footer) is the
[landing page recipe in patterns.md](patterns.md#marketing-landing-page-full-page-wa-page). Use it as the
canonical landing page.

---

## Rules

1. **The `html`/`body` reset ships with the default theme.** The default theme stylesheet (included in
   `webawesome.css`) zeroes `html` and `body` margin and padding when the page contains a `<wa-page>`. If
   you load styles without it, add the reset yourself, or gaps appear around the page:

   ```css
   html,
   body {
     min-height: 100%;
     padding: 0;
     margin: 0;
   }
   ```

2. **Slot your own semantic elements.** `<wa-page>` emits no `<header>`, `<nav>`, `<main>`, `<aside>`, or
   `<footer>`. Slot real ones so landmarks and the document outline exist.

3. **Zero `main` padding on full-bleed pages.** `<wa-page>` pads `main` by default, which insets hero and
   band backgrounds from the viewport edge. Set `main { padding: 0 }` and give each section its own gutter
   class. Keep the default padding for a single contained column (a docs article, a login form).

   ```css
   main {
     padding: 0;
   }
   .section {
     padding: var(--wa-space-4xl) var(--wa-space-xl);
   }
   ```

4. **Use `navigation`, not `menu`, for responsive nav.** The `menu` slot replaces the whole left column and
   leaves mobile behavior to you.

5. **Set a fixed `--menu-width` only when a desktop sidebar is visible, and reset widths on mobile.** A
   fixed width reserves its column below the breakpoint too, so set `--menu-width` and `--aside-width` back
   to `auto` under `wa-page[view='mobile']`. The aside has no drawer, so hide it on mobile with
   `.wa-desktop-only` or a `[slot='aside']` rule.

   ```css
   wa-page {
     --menu-width: 16rem;
     --aside-width: 18rem;
   }
   wa-page[view='mobile'] {
     --menu-width: auto;
     --aside-width: auto;
   }
   ```

6. **Read `view`, never set it.** The component sets it from a `ResizeObserver` and starts at `desktop`, so
   don't gate critical content on it.

7. **One `<wa-page>` per document, at the top level.** Sections, dialogs, and cards inside it use the layout
   utilities.

8. **Name icon-only toggles through the icon.** `<wa-icon name="bars" label="Open menu">` inside the
   button gives it an accessible name.

9. **Color the header bar on its part.** Style `wa-page::part(header)` for a header background. The part
   already paints `--wa-color-surface-default` so content scrolls under it, and it holds the built-in
   toggle as well as your slotted header.

---

## Canonical example: app/docs with a desktop sidebar

A docs-style layout: header, a subheader with the nav toggle and breadcrumbs, a collapsing navigation
sidebar, a contained main column, a sticky table-of-contents aside, and a footer.

```html
<wa-page mobile-breakpoint="920">
  <header slot="header" class="wa-split">
    <div class="wa-cluster">
      <strong>Acme Docs</strong>
      <a href="/docs">Docs</a>
      <a href="/components">Components</a>
    </div>
    <wa-button variant="brand">Sign up</wa-button>
  </header>

  <nav slot="subheader" class="wa-cluster wa-gap-xs" aria-label="Breadcrumb">
    <wa-button data-toggle-nav appearance="plain">
      <wa-icon name="bars" label="Open menu"></wa-icon>
    </wa-button>
    <wa-breadcrumb>
      <wa-breadcrumb-item href="/">Home</wa-breadcrumb-item>
      <wa-breadcrumb-item>Layout</wa-breadcrumb-item>
    </wa-breadcrumb>
  </nav>

  <strong slot="navigation-header">Guide</strong>
  <nav slot="navigation" class="wa-stack wa-gap-2xs" aria-label="Guide">
    <a href="#start" data-drawer="close">Getting started</a>
    <a href="#layout" data-drawer="close">Layout</a>
    <a href="#theming" data-drawer="close">Theming</a>
  </nav>

  <!-- A contained docs column, so the default main padding stays. -->
  <main class="wa-stack wa-gap-xl">
    <h1 id="start">Getting started</h1>
    <p>Your content goes here.</p>
    <h2 id="layout">Layout</h2>
    <p>More content.</p>
  </main>

  <aside slot="aside" class="wa-desktop-only wa-stack wa-gap-m">
    <strong>On this page</strong>
    <ul class="wa-list-plain wa-stack wa-gap-2xs">
      <li><a href="#start">Getting started</a></li>
      <li><a href="#layout">Layout</a></li>
    </ul>
  </aside>

  <footer slot="footer" class="wa-grid wa-gap-2xl">
    <div class="wa-stack wa-gap-xs">
      <strong>Product</strong>
      <a href="/features">Features</a>
      <a href="/pricing">Pricing</a>
    </div>
    <div class="wa-stack wa-gap-xs">
      <strong>Company</strong>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </div>
  </footer>
</wa-page>

<style>
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

**Choosing `mobile-breakpoint`.** The default `768px` is often too narrow once there is a real sidebar.
Docs and app layouts commonly use a wider value (`920` above; app shells often use `1152`). Pick the width
at which sidebar and content stop fitting comfortably. It accepts a number (px) or a CSS length like
`60em`.

---

## `<wa-page>` checklist

Walk this after the checklist in SKILL.md, which already covers single nav, hand-rolled drawers, and
`--menu-width` with a hidden sidebar.

- [ ] Real `<header>`, `<nav>`, `<main>`, `<aside>`, and `<footer>` elements are slotted.
- [ ] `main` padding is `0` on full-bleed pages, and each section owns its gutter.
- [ ] Sidebar widths go back to `auto` under `wa-page[view='mobile']`, and the aside is hidden on mobile.
- [ ] Every link in `slot="navigation"` has `data-drawer="close"`.
- [ ] A header-nav page has its own `data-toggle-nav` button inside the header, named through its icon.
- [ ] There is one `<wa-page>`, at the top level, and nothing sets its `view` attribute.

---

## Sticky sections

`banner`, `header`, `subheader`, `menu`, and `aside` are sticky by default. (The `menu` wrapper around the
sidebar is what sticks; `navigation` content scrolls inside it.) To opt out, pass a space-delimited list to
`disable-sticky`:

```html
<wa-page disable-sticky="aside">…</wa-page>
```

---

## Server-side rendering

The mobile drawer needs JavaScript, so a few defaults exist for SSR:

- **`view` starts at `desktop`.** The first paint is the desktop layout; it switches to `mobile` on
  hydration.
- **Set `disable-navigation-toggle` yourself if needed.** On the client the component detects whether to
  show the built-in hamburger (navigation content present, no custom `data-toggle-nav`). That detection
  doesn't run on the server, so set the attribute to control the server-rendered markup.
- **Pre-set the height custom properties.** `--banner-height`, `--header-height`, and `--subheader-height`
  are measured at runtime (default `0px`). Setting known values on `<wa-page>` keeps sticky offsets correct
  before JavaScript runs.

---

## API reference

A working summary. For the authoritative API, see the
[page component docs](https://webawesome.com/docs/components/page) or `references/components/page.md` in
the `webawesome` skill.

### Slots

| Slot                     | Purpose                                                                       |
| ------------------------ | ----------------------------------------------------------------------------- |
| _(default)_              | The page's main content.                                                      |
| `banner`                 | Above the header. Hidden when empty.                                          |
| `header`                 | Top of the page. Sticky.                                                      |
| `subheader`              | Below the header (e.g. breadcrumbs). Sticky.                                  |
| `menu`                   | Left column. Overrides `navigation` and leaves mobile behavior to you.        |
| `navigation`             | Left sidebar content. Moves into a drawer on mobile. Use this for nav.        |
| `navigation-header`      | Header of the navigation area (drawer header on mobile).                      |
| `navigation-footer`      | Footer of the navigation area (drawer footer on mobile).                      |
| `navigation-toggle`      | Your own button to toggle the nav drawer.                                     |
| `navigation-toggle-icon` | Your own icon for the built-in toggle button.                                 |
| `main-header`            | Inline header above the main content.                                         |
| `main-footer`            | Inline footer below the main content.                                         |
| `aside`                  | Right sidebar (e.g. table of contents). Sticky. No drawer; hide it on mobile. |
| `skip-to-content`        | Custom text for the "skip to content" link.                                   |
| `footer`                 | Page footer. Always below the fold.                                           |

### Attributes

| Attribute                   | Type                    | Default     | Purpose                                                                                          |
| --------------------------- | ----------------------- | ----------- | ------------------------------------------------------------------------------------------------ |
| `view`                      | `'mobile' \| 'desktop'` | `'desktop'` | The current view. Set by the component; read it in CSS.                                          |
| `nav-open`                  | `boolean`               | `false`     | Whether the mobile nav drawer is open.                                                           |
| `mobile-breakpoint`         | `string`                | `'768px'`   | Width below which navigation collapses into the drawer. Accepts px or CSS lengths.               |
| `navigation-placement`      | `'start' \| 'end'`      | `'start'`   | Side the mobile drawer opens from. `start` is logical and already follows RTL.                   |
| `disable-navigation-toggle` | `boolean`               | `false`     | Hide the built-in hamburger. Set automatically when a `data-toggle-nav` element exists.          |
| `disable-sticky`            | `string`                | —           | Space-delimited list of regions to make non-sticky.                                              |
| `nonce`                     | `string`                | —           | Nonce for the `<style>` element the component injects. Falls back to `window.litNonce`. For CSP. |

### CSS custom properties

| Property             | Default | Purpose                                                                                 |
| -------------------- | ------- | --------------------------------------------------------------------------------------- |
| `--menu-width`       | `auto`  | Width of the left (menu) column.                                                        |
| `--main-width`       | `1fr`   | Width of the main content column.                                                       |
| `--aside-width`      | `auto`  | Width of the right (aside) column.                                                      |
| `--banner-height`    | `0px`   | Measured at runtime and used to offset sticky regions. Pre-set it to avoid shift (SSR). |
| `--header-height`    | `0px`   | Same, for the header.                                                                   |
| `--subheader-height` | `0px`   | Same, for the subheader.                                                                |

### CSS parts

Style regions from outside with `::part()`, e.g. `wa-page::part(header) { … }`. The old `base` part is a
deprecated alias for `page`.

| Part                     | What it is                                                                               |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `page`                   | The outer wrapper.                                                                       |
| `banner`                 | The banner region above the header.                                                      |
| `header`                 | The header region, including the built-in toggle. Put header backgrounds here.           |
| `subheader`              | The subheader region.                                                                    |
| `body`                   | The wrapper around `menu`, `main`, and `aside`.                                          |
| `menu`                   | The sticky left column wrapper.                                                          |
| `navigation`             | The desktop sidebar `<nav>` only, not the mobile drawer. The header-nav recipe hides it. |
| `navigation-desktop`     | The same desktop `<nav>`.                                                                |
| `navigation-header`      | The navigation area's header.                                                            |
| `navigation-footer`      | The navigation area's footer.                                                            |
| `navigation-toggle`      | The built-in hamburger `<wa-button>`.                                                    |
| `navigation-toggle-icon` | The built-in hamburger `<wa-icon>`.                                                      |
| `main`                   | The wrapper around the main header, content, and footer.                                 |
| `main-header`            | The inline header above main content.                                                    |
| `main-content`           | The main content region.                                                                 |
| `main-footer`            | The inline footer below main content.                                                    |
| `aside`                  | The sticky right column.                                                                 |
| `footer`                 | The page footer.                                                                         |
| `drawer`                 | The mobile navigation `<wa-drawer>`. Its internals are exported as `drawer__*` parts.    |
| `skip-to-content`        | The visually hidden "skip to content" link.                                              |
