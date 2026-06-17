# Full-page layouts with `<wa-page>`

You are here because STEP 0 determined you're building a **full page, app shell, or site layout**. In
this branch, `<wa-page>` is **required** and the rules below are absolute. Do not hand-roll a full-page
grid; `<wa-page>` exists precisely so you don't have to.

**`<wa-page>` fully owns the page layout.** It is the grid, the sticky regions, the responsive
navigation, the mobile drawer, and the `html`/`body` reset — all of it. Your job is to slot content into
named regions and let the component do the work. Do **not** rebuild any of this by hand: no full-page
`display: grid`, no media queries for the nav/sidebar/toggle, no hand-rolled mobile drawer, no manual
show/hide of a hamburger. Every time you reach for one of those, stop — `<wa-page>` already does it.

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

Two columns behave differently below `mobile-breakpoint`: the `navigation` (menu) column collapses into a
drawer automatically, but the **`aside` column does not** — it has no drawer, so you must hide it yourself
on mobile or it overlaps the content (see Hard rule 5).

---

## ⚠️ The `navigation` slot is automatic — one copy serves both views

This is the single most important thing to understand about `<wa-page>`, and the most common source of
mistakes. **The `navigation` slot is special: the component _moves_ your nav to the right place for the
current view, automatically — it renders in exactly one place at a time, never both.**

- On **desktop** (at or above `mobile-breakpoint`, default `768px`), the content you put in
  `slot="navigation"` renders as a **persistent left sidebar column**.
- On **mobile** (below the breakpoint), that _same_ content is moved into a `<wa-drawer>`, toggled by a
  hamburger button the component shows for you.

You write the nav **once**, in `slot="navigation"`, and `<wa-page>` handles both views. The same is true
for `navigation-header` and `navigation-footer` (they become the drawer's header/footer on mobile).

**Because the component does this for you:**

- **For a single nav, write it once in `slot="navigation"` — don't also copy it into `header`.** One
  `slot="navigation"` is _moved_ between views (desktop sidebar ⇄ mobile drawer); it is never rendered in
  two places at once, so a single copy already serves both views. If you _author_ a second copy in
  `header` (or anywhere else) and don't hide it per view, **both copies show** on whatever view they're
  both visible in — typically desktop, where you'd then see the same links in the header **and** in the
  left sidebar. That double-nav-on-desktop is the most common `<wa-page>` mistake.
- **Header nav on desktop is the _one_ case where duplicating is correct — but it's deliberate, not
  free.** If you want links in the header bar on desktop (no left sidebar) plus a mobile drawer, you
  **must** put the links in `header` _and_ mirror them in `slot="navigation"` (the drawer needs that
  copy), then hide each in the view where it shouldn't appear. The `navigation` copy renders a **visible
  left sidebar on desktop** unless you hide it — that's the trap. Use the
  [header-on-desktop / drawer-on-mobile recipe below](#the-one-place-duplicating-nav-is-correct-header-on-desktop-drawer-on-mobile);
  it is the only sanctioned, view-scoped duplication.
- **Don't toggle the nav yourself, and don't show/hide the hamburger.** The toggle button and its
  desktop/mobile visibility are already styled and wired by the component.
- **Don't write media queries for nav, the sidebar, or the toggle.** The desktop↔mobile switch is driven
  by `<wa-page>`'s own `view` state, not by your CSS. Reserve media queries for genuinely page-specific
  content adjustments, never for the nav machinery.

**First decision, before any markup: does this page have a left sidebar on desktop?**

- **Yes** (app shell, docs, dashboard) → put your nav in `slot="navigation"` and follow Hard rule 5 (set
  `--menu-width`, reset to `auto` on mobile). This is the intended path. Copy the app/docs example below.
- **No** (landing page, marketing site, most content pages) → you have two clean options, both of which
  still let `<wa-page>` do the work:
  - **Simplest:** put your primary nav in `slot="navigation"` anyway. You'll get a small desktop sidebar
    instead of header nav, which is fine for many content pages. The mobile drawer comes free. (Note: this
    gives you a **sidebar**, not header links — if you specifically want nav in the header bar, that
    doesn't happen automatically; use the recipe below.)
  - **Header nav + mobile drawer, no desktop sidebar** (the classic marketing/hero look): keep the nav in
    the `header` for desktop, mirror it in `slot="navigation"` for the mobile drawer, and use the
    **deliberate-exception recipe below** to hide each in the view where it shouldn't appear. This is the
    _one_ place duplication is correct — and it's controlled, view-scoped duplication, not an accident.

---

## The one place duplicating nav is correct: header on desktop, drawer on mobile

Use this **only** for a marketing/hero page where you want nav links **in the header on desktop** but a
**mobile drawer menu** — and explicitly **no** left sidebar on desktop. This is the single sanctioned
exception to "never duplicate," because you're deliberately rendering the nav differently per view.

All four steps are required — steps 3 and 4 are what stop the nav from showing twice on desktop:

1. Put the desktop links in the **`header`** slot.
2. Mirror the same links in the **`navigation`** slot. On mobile this copy powers the drawer; on desktop
   this **same copy also renders a visible left sidebar** — which you don't want here, so step 4 hides it.
   (Skipping this mirror means no mobile drawer; including it without step 4 means the links show in both
   the header and a desktop sidebar.)
3. Hide the header links on mobile: `wa-page[view='mobile'] .header-nav { display: none }`.
4. Hide the desktop sidebar on desktop: `wa-page[view='desktop']::part(navigation) { display: none }`.
   (`::part(navigation)` targets _only_ the desktop sidebar wrapper; the mobile drawer is unaffected, so
   the drawer still works. This is the step people forget — without it you get the same links in the
   header **and** the left sidebar on desktop.)

```html
<wa-page>
  <header slot="header" class="wa-split section">
    <strong>My Brand</strong>
    <!-- Desktop links — shown in the header, hidden on mobile via step 3 -->
    <nav class="header-nav wa-cluster wa-gap-l">
      <a href="#features">Features</a>
      <a href="#pricing">Pricing</a>
      <a href="#faq">FAQ</a>
      <wa-button variant="brand">Get started</wa-button>
    </nav>
    <!-- Your OWN toggle, last child so wa-split right-aligns it. Mobile-only; opens the drawer.
         Supplying this suppresses <wa-page>'s built-in hamburger (see note below). -->
    <wa-button data-toggle-nav appearance="plain" class="wa-mobile-only" aria-label="Open menu">
      <wa-icon name="bars"></wa-icon>
    </wa-button>
  </header>

  <!-- Same links, mirrored for the mobile drawer (opened by the header toggle above).
       The desktop sidebar is hidden via step 4. -->
  <nav slot="navigation" class="wa-stack wa-gap-2xs">
    <a href="#features" data-drawer="close">Features</a>
    <a href="#pricing" data-drawer="close">Pricing</a>
    <a href="#faq" data-drawer="close">FAQ</a>
    <wa-button variant="brand">Get started</wa-button>
  </nav>

  <main>…</main>
  <footer slot="footer" class="section"><small>&copy; My Brand</small></footer>
</wa-page>

<style>
  /* No --menu-width here: in this recipe the desktop sidebar is hidden, so leave --menu-width at its
     `auto` default. Setting a fixed value (e.g. 14rem) reserves an empty left column — see note below. */
  wa-page[view='mobile'] .header-nav {
    display: none; /* hide desktop header links on mobile */
  }
  wa-page[view='desktop']::part(navigation) {
    display: none; /* hide the desktop sidebar; mobile drawer is unaffected */
  }
</style>
```

You do **not** need your own `<wa-drawer>` or any media queries for this — the drawer comes from
`<wa-page>`. **You should, however, supply your own `data-toggle-nav` button inside the `header`** (as
shown above), so the hamburger is placed and styled _with_ your header bar. Adding any
`[data-toggle-nav]` element automatically suppresses `<wa-page>`'s built-in hamburger. If you omit your
own toggle, the built-in one renders **before** your header content inside the component's flex header
and **wraps onto its own unstyled row** (left-aligned, no background) — the #2 bug of this recipe. The
`.wa-mobile-only` class shows your toggle only below `mobile-breakpoint`, so the desktop header stays
clean. The only custom CSS is the two `view`-scoped hide rules above.

⚠️ **In this recipe, do NOT set a fixed `--menu-width` — leave it at its `auto` default.** The left
`menu` column's width is `minmax(0, var(--menu-width))`, and `--menu-width` defaults to `auto`. Hiding
the desktop sidebar with `::part(navigation){display:none}` removes the sidebar _content_, but the grid
track width is governed **only** by `--menu-width` — not by whether the content is visible. With `auto`,
the now-empty column collapses to nothing; with a fixed value like `14rem` (often copied in from the
sidebar/app-shell skeleton below), the track stays `14rem` and you get a **reserved empty band down the
left side on desktop**. This is the classic "I added `display: none` and the gap is still there" bug:
`display: none` never touched the width. If you see that empty band, search your CSS for a fixed
`--menu-width` and remove it.

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

3. **Set `main { padding: 0 }` for full-bleed pages — `<wa-page>` pads `main` by default.** `<wa-page>` pads the main content area, which insets
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

5. **Only set a fixed `--menu-width` when you actually render a desktop sidebar; reset it on mobile.**
   The `menu` column is `minmax(0, var(--menu-width))` and `--menu-width` defaults to `auto`, so its
   width is controlled **only** by `--menu-width` — never by whether the sidebar content is visible.
   Two cases:

   - **Desktop sidebar layout** (the `navigation` slot is visible as a left column on desktop — app
     shell, docs, dashboard): set a fixed `--menu-width` (e.g. `16rem`); it's holding real content. A
     fixed width still reserves space below the breakpoint, so collapse it back to `auto` for
     `view='mobile'`. The `navigation` sidebar moves into the drawer automatically; the `aside` does
     not, so to hide it on mobile also set `display: none` on that slot.
   - **No desktop sidebar** (the header/drawer recipe above — desktop sidebar hidden via
     `::part(navigation){display:none}`): **leave `--menu-width` at `auto`. Do not set a fixed value.**
     Hiding the sidebar collapses its content but not the grid track, so a fixed `--menu-width` reserves
     an empty left column on desktop. (This is the recipe's #1 bug.)

   For the desktop-sidebar case:

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

6. **Let `<wa-page>` own the nav — don't toggle it, don't media-query it.** Put nav in
   `slot="navigation"` **once**; the component renders it as the desktop sidebar and moves it into the
   mobile drawer for you (one copy, never rendered in two places at once). The hamburger button and its
   desktop/mobile visibility are already handled — don't write CSS to show or hide it, and don't add media
   queries for the nav, sidebar, or toggle. The **one** time you intentionally author a second copy is the
   header-on-desktop / drawer-on-mobile recipe above — and there you must hide each copy in the view where
   it shouldn't appear (`view`-scoped CSS), or the links show in both the header and the desktop sidebar. The default hamburger opens the `navigation` drawer; if you want a custom
   toggle, add `data-toggle-nav` to any element inside `<wa-page>` (this auto-hides the default
   hamburger). You can add `data-toggle-nav` to **multiple** elements — they all toggle the same drawer
   (handy for an app shell with, say, both a header and a footer toggle). `data-toggle-nav` only toggles
   the `navigation` drawer, so it does nothing without `navigation` content — never pair it with a
   hand-rolled drawer. **When you want the toggle to live
   inside your own styled header bar (the header/drawer recipe), put a `data-toggle-nav` button there
   yourself** rather than relying on the built-in hamburger — the built-in one renders in the header
   _before_ your `header` slot content and wraps onto its own unstyled row, outside your bar.

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

## Canonical example — landing page

A hero-driven marketing/landing page. Nav goes in `slot="navigation"` **once**; `<wa-page>` shows it as a
sidebar on desktop and as a drawer (with a hamburger) on mobile. **No hand-rolled `<wa-drawer>`, no
toggle wiring, no media queries** — the component handles all of it. This is the simplest correct shape.

> Want nav in the **header bar** on desktop instead of a sidebar (the classic marketing look)? Use the
> **"header on desktop, drawer on mobile" recipe** near the top of this file — it's the one sanctioned
> way to duplicate nav, and it still lets `<wa-page>` provide the drawer and hamburger.

```html
<wa-page>
  <header slot="header" class="section">
    <strong>My Brand</strong>
  </header>

  <!-- Write the nav ONCE. Desktop: sidebar. Mobile: drawer + hamburger, automatically. -->
  <nav slot="navigation" class="wa-stack wa-gap-2xs">
    <a href="#features" data-drawer="close">Features</a>
    <a href="#pricing" data-drawer="close">Pricing</a>
    <a href="#faq" data-drawer="close">FAQ</a>
    <wa-button variant="brand">Get started</wa-button>
  </nav>

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
  wa-page {
    --menu-width: 14rem;
  }
  wa-page[view='mobile'] {
    --menu-width: auto; /* collapse the reserved sidebar space on mobile (Hard rule 5) */
  }
</style>
```

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

| ❌ Don't                                                                                                         | ✅ Do                                                                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Forget the `html, body` reset → gaps appear                                                                      | Always add the reset (or use native styles)                                                                                                                                         |
| Expect `<wa-page>` to emit `<main>`/`<header>`                                                                   | Slot in your own semantic elements                                                                                                                                                  |
| Put nav in `menu` and wonder why it won't collapse                                                               | Use `navigation` (+ `navigation-header`/`-footer`) for mobile collapse                                                                                                              |
| Author a second nav copy in `header` while also using `slot="navigation"`, without hiding one per view → links show in **both** the header and the desktop sidebar | Write nav **once** in `slot="navigation"` (it moves between views automatically). For header nav on desktop + a mobile drawer, use the header-on-desktop / drawer-on-mobile recipe and `view`-scope-hide each copy |
| Hand-roll your own `<wa-drawer>` + toggle button for the mobile menu                                             | Put nav in `slot="navigation"`; `<wa-page>` provides the drawer and hamburger automatically                                                                                         |
| Write media queries to show/hide the nav, sidebar, or hamburger                                                  | Don't — the component switches via its own `view` state. Media queries are for page content, not the nav machinery                                                                  |
| Pair `data-toggle-nav` with your own `<wa-drawer>` (it toggles the `navigation` drawer, not yours → dead button) | Use the `navigation` slot's built-in drawer; `data-toggle-nav` only ever controls that one                                                                                          |
| Set `--menu-width: 16rem` and leave it on mobile                                                                 | Reset widths to `auto` under `wa-page[view='mobile']`                                                                                                                               |
| Nav links that leave the drawer open after a tap                                                                 | Add `data-drawer="close"` to navigation links                                                                                                                                       |
| Expect `aside` to disappear on mobile on its own                                                                 | `aside` has no drawer; hide it (`.wa-desktop-only` or `display: none`)                                                                                                              |
| Try to set `view="mobile"` yourself                                                                              | `view` is read-only; the component sets it. Only read it in CSS                                                                                                                     |
| Hand-roll a `display: grid` page shell                                                                           | Use `<wa-page>`; it already is the grid                                                                                                                                             |
| Nest `<wa-page>` inside a section or another page                                                                | One `<wa-page>` per page, at the top level                                                                                                                                          |
| Hardcode header colors with hex                                                                                  | Use `--wa-color-surface-*` / semantic tokens                                                                                                                                        |
| `<wa-button />` (self-closing)                                                                                   | `<wa-button></wa-button>`                                                                                                                                                           |

## `<wa-page>` checklist

Before calling a `<wa-page>` layout done, walk this **`<wa-page>`-specific** structural pass. This sits
alongside the general structural Final Pass in SKILL.md and the visual Polish Checklist in composition.md;
each catches different things.

- [ ] **Right sidebar decision.** Landing page: nav in `slot="navigation"` **once** (auto sidebar on desktop, drawer on mobile) — or, if you want header-bar nav with no desktop sidebar, the header-on-desktop / drawer-on-mobile recipe above with `--menu-width` left at `auto`. App shell / docs: `navigation` slot with `--menu-width` set, reset to `auto` under `wa-page[view='mobile']`. Either way, don't hand-roll a `<wa-drawer>`.
- [ ] **`html, body` reset** is in place (or you're using native styles) — otherwise gaps appear around the page.
- [ ] **Your own semantic elements are slotted** — `<header>`, `<main>`, `<footer>`, `<nav>`, `<aside>`. `<wa-page>` emits none.
- [ ] **`main` padding is `0`** for full-bleed pages where sections own their gutter; keep the default only for a single contained column (docs article, login form).
- [ ] **Sidebar widths reset on mobile.** `--menu-width` and `--aside-width` go to `auto` under `wa-page[view='mobile']` so they don't leak; the `aside` is hidden (`display: none`) on mobile since it has no auto-drawer.
- [ ] **`data-drawer="close"`** is on every link in the mobile-collapsing nav, so tapping one closes the drawer instead of leaving it open over the next page.
- [ ] **`data-toggle-nav` only toggles the `navigation` drawer.** Use it to open the `navigation` slot's drawer (or supply it in the header for the header/drawer recipe); never wire it to a hand-rolled drawer.
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

## Server-side rendering

`<wa-page>` is SSR-safe, but a few defaults exist because the mobile drawer needs JavaScript and can't run
during SSR. When rendering on the server, know:

- **`view` defaults to `'desktop'`.** The component can't measure the viewport until JS runs, so the
  first paint is the desktop layout; it switches to `'mobile'` on hydration via a `ResizeObserver`. Don't
  gate critical content on `view` — it's `'desktop'` until the client takes over.
- **Set `disable-navigation-toggle` yourself for the initial render if needed.** On the client the
  component auto-detects whether to show the hamburger (based on `navigation` content and any custom
  `data-toggle-nav`), but that detection doesn't run during SSR. Set the attribute explicitly to control
  the server-rendered markup.
- **Prevent hydration layout shift by pre-setting the height custom properties.** `--banner-height`,
  `--header-height`, and `--subheader-height` are measured at runtime (default `0px`). If you know them,
  set them on `<wa-page>` so sticky offsets are correct before JS runs. See
  [CSS custom properties](#css-custom-properties).

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
| `aside`                  | Right sidebar (e.g. table of contents). Sticky. **No auto-drawer — hide it on mobile yourself** (`wa-page[view='mobile'] [slot='aside'] { display: none }`) or it overlaps. |
| `skip-to-content`        | Custom text for the "skip to content" link.                                              |
| `footer`                 | Page footer. Always below the fold.                                                      |

### Attributes

| Attribute                   | Type                    | Default     | Purpose                                                           |
| --------------------------- | ----------------------- | ----------- | ----------------------------------------------------------------- |
| `view`                      | `'mobile' \| 'desktop'` | `'desktop'` | Reflects the current view. Set automatically; you read it in CSS. |
| `nav-open`                  | `boolean`               | `false`     | Whether the mobile nav drawer is open.                            |
| `mobile-breakpoint`         | `string`                | `'768px'`   | Width at which navigation collapses. Accepts px or CSS lengths.   |
| `navigation-placement`      | `'start' \| 'end'`      | `'start'`   | Which side the mobile drawer opens from. Use `end` for RTL or right-handed reach. |
| `disable-navigation-toggle` | `boolean`               | `false`     | Hide the default hamburger button.                                |
| `disable-sticky`            | `string`                | —           | Space-delimited list of sections to make non-sticky.              |

### CSS custom properties

| Property             | Default | Purpose                                                                                                                                                  |
| -------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--menu-width`       | `auto`  | Width of the left (menu) column.                                                                                                                          |
| `--main-width`       | `1fr`   | Width of the main content column.                                                                                                                         |
| `--aside-width`      | `auto`  | Width of the right (aside) column.                                                                                                                        |
| `--banner-height`    | `0px`   | Measured automatically once rendered. Set it to the known height to prevent layout shift before JS runs — useful for SSR. Used to offset sticky regions. |
| `--header-height`    | `0px`   | Measured automatically once rendered. Set it to the known height to prevent layout shift before JS runs — useful for SSR. Used to offset sticky regions. |
| `--subheader-height` | `0px`   | Measured automatically once rendered. Set it to the known height to prevent layout shift before JS runs — useful for SSR. Used to offset sticky regions. |

### CSS parts

Style internal regions with `::part()` from outside the component (e.g. `wa-page::part(header) { … }`).

| Part                     | What it is                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `base`                   | The outermost wrapper.                                                                                        |
| `banner`                 | The banner region above the header.                                                                           |
| `header`                 | The header region.                                                                                            |
| `subheader`              | The subheader region.                                                                                         |
| `body`                   | The wrapper around `menu`, `main`, and `aside`.                                                               |
| `menu`                   | The sticky left column wrapper.                                                                               |
| `navigation`             | **The desktop sidebar `<nav>` only** — _not_ the mobile drawer. This is what the header/drawer recipe hides. |
| `navigation-header`      | The navigation area's header.                                                                                |
| `navigation-footer`      | The navigation area's footer.                                                                                |
| `navigation-toggle`      | The default hamburger `<wa-button>`.                                                                          |
| `navigation-toggle-icon` | The default hamburger `<wa-icon>`.                                                                            |
| `main-header`            | The inline header above main content.                                                                        |
| `main-content`           | The main content region.                                                                                     |
| `main-footer`            | The inline footer below main content.                                                                        |
| `aside`                  | The sticky right column.                                                                                      |
| `footer`                 | The page footer.                                                                                              |
| `drawer`                 | The mobile navigation `<wa-drawer>`. (Drawer internals are also exposed via `drawer__*` parts.)              |

(Also exposed: `skip-links`, `skip-link`, `dialog-wrapper`.)
