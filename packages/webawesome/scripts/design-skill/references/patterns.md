# Recipes

Best-practice compositions built from Web Awesome primitives. Each recipe names its **STEP 0 branch**
(full-page → `<wa-page>`; in-page → utilities only), its **design intent**, and its **rationale** (the
established web-design convention it follows). Copy, then re-theme with tokens.

All recipes assume a theme/palette is set on `<html>` (see [theming.md](theming.md)) and, for full-page
recipes, the `html, body` reset from [layouts-page.md](layouts-page.md).

These snippets keep a few one-off values inline (a `max-width`, a `--min-column-size`) so each is
self-contained. In a real page, lift anything reused into a `<style>` block as a class, and **never style
a component host inline** — restyle components through their tokens, attributes, or `::part()` (see
[composition.md](composition.md)).

---

## App shell (full-page, `<wa-page>`)

**Intent:** a logged-in application frame with a sidebar, top bar, and content area.
**Rationale:** persistent left navigation + a top bar is the conventional app layout; users expect nav
to stay put while content scrolls. `<wa-page>` gives sticky regions and a mobile drawer for free.

```html
<wa-page>
  <header slot="header" class="wa-split">
    <div class="wa-cluster">
      <wa-button data-toggle-nav appearance="plain" class="wa-mobile-only">
        <wa-icon name="bars" label="Menu"></wa-icon>
      </wa-button>
      <strong>Acme</strong>
    </div>
    <wa-avatar label="Account"></wa-avatar>
  </header>

  <!-- data-drawer="close" closes the mobile nav drawer after a tap -->
  <nav slot="navigation" class="wa-stack wa-gap-2xs">
    <a href="#" data-drawer="close"><wa-icon slot="start" name="gauge"></wa-icon> Dashboard</a>
    <a href="#" data-drawer="close"><wa-icon slot="start" name="users"></wa-icon> Customers</a>
    <a href="#" data-drawer="close"><wa-icon slot="start" name="gear"></wa-icon> Settings</a>
  </nav>

  <main class="wa-stack wa-gap-xl">
    <h1>Dashboard</h1>
    <p>Welcome back.</p>
  </main>
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
  }
  wa-page[view='mobile'] {
    --menu-width: auto;
  }
</style>
```

---

## Marketing landing page (full-page, `<wa-page>`)

**Intent:** a public landing page with a top nav, a hero, a feature grid, and a footer.
**Rationale:** a single clear value proposition with one primary call-to-action above the fold converts
better than competing actions; supporting detail follows below.

**Nav:** this uses the sanctioned "header on desktop, drawer on mobile" recipe — links live in the
`header` for wide screens and are mirrored in `slot="navigation"` for the mobile drawer `<wa-page>`
provides. Each copy is hidden in the opposite view via `wa-page[view='…']`. This is the _only_ place nav
is duplicated on purpose; never copy nav between slots otherwise. (For a simpler page, drop the header
copy and the two hide-rules and keep just `slot="navigation"` — you'll get a small desktop sidebar plus
the mobile drawer.)

```html
<wa-page>
  <header slot="header" class="wa-split">
    <strong>Acme</strong>
    <!-- Desktop links — hidden on mobile via the style block below -->
    <div class="header-nav wa-cluster">
      <a href="#features">Features</a>
      <a href="#pricing">Pricing</a>
      <wa-button variant="brand">Get started</wa-button>
    </div>
  </header>

  <!-- Same links, mirrored for the mobile drawer (hamburger is automatic) -->
  <nav slot="navigation" class="wa-stack wa-gap-2xs">
    <a href="#features" data-drawer="close">Features</a>
    <a href="#pricing" data-drawer="close">Pricing</a>
    <wa-button variant="brand">Get started</wa-button>
  </nav>

  <main class="wa-stack wa-gap-3xl">
    <section class="wa-stack wa-gap-l" style="max-width: 40rem; text-align: center; margin-inline: auto;">
      <h1 class="wa-heading-3xl">Ship faster with Acme</h1>
      <p class="wa-body-l">The toolkit teams reach for when deadlines are real.</p>
      <div class="wa-cluster" style="justify-content: center;">
        <wa-button variant="brand" size="l">Start free</wa-button>
        <wa-button appearance="plain" size="l">Watch demo</wa-button>
      </div>
    </section>

    <section id="features" class="wa-grid wa-gap-xl" style="--min-column-size: 16rem;">
      <div class="wa-stack wa-gap-xs">
        <wa-icon name="bolt"></wa-icon>
        <h3>Fast</h3>
        <p>Built for speed from the ground up.</p>
      </div>
      <div class="wa-stack wa-gap-xs">
        <wa-icon name="shield"></wa-icon>
        <h3>Secure</h3>
        <p>Enterprise-grade security by default.</p>
      </div>
      <div class="wa-stack wa-gap-xs">
        <wa-icon name="puzzle-piece"></wa-icon>
        <h3>Flexible</h3>
        <p>Adapts to how your team already works.</p>
      </div>
    </section>
  </main>

  <footer slot="footer" class="wa-grid wa-gap-2xl">
    <div class="wa-stack wa-gap-xs"><strong>Product</strong><a href="#">Features</a><a href="#">Pricing</a></div>
    <div class="wa-stack wa-gap-xs"><strong>Company</strong><a href="#">About</a><a href="#">Careers</a></div>
  </footer>
</wa-page>

<style>
  html,
  body {
    min-height: 100%;
    padding: 0;
    margin: 0;
  }
  wa-page[view='mobile'] .header-nav {
    display: none; /* hide desktop header links on mobile */
  }
  wa-page[view='desktop']::part(navigation) {
    display: none; /* hide the desktop sidebar; mobile drawer is unaffected */
  }
</style>
```

---

## Login / auth card (in-page, utilities only)

**Intent:** a centered sign-in card.
**Rationale:** auth is a focused, single-task moment, so center a narrow card, minimize fields, one primary
action. Don't use `<wa-page>`; this is one element on a page.

```html
<div class="auth-screen wa-stack">
  <wa-card class="auth-card">
    <div class="wa-stack wa-gap-l">
      <h1 class="wa-heading-l">Sign in</h1>
      <wa-input label="Email" type="email"></wa-input>
      <wa-input label="Password" type="password"></wa-input>
      <wa-button variant="brand">Sign in</wa-button>
      <a href="#" class="wa-caption-m">Forgot your password?</a>
    </div>
  </wa-card>
</div>

<style>
  .auth-screen {
    min-height: 100vh;
    justify-content: center;
    align-items: center;
  }
  /* Size the card via a class, not an inline style on the component host. */
  .auth-card {
    width: 100%;
    max-width: 24rem;
  }
</style>
```

---

## Settings section (in-page, utilities only)

**Intent:** a settings panel with grouped, labeled rows.
**Rationale:** group related settings, label each row, and keep the control aligned to the right of its
description, for a scannable, conventional settings layout.

```html
<section class="wa-stack wa-gap-xl" style="max-width: 40rem;">
  <h2>Notifications</h2>

  <div class="wa-split">
    <div class="wa-stack wa-gap-3xs">
      <strong>Email digests</strong>
      <span class="wa-caption-m">A weekly summary of activity.</span>
    </div>
    <wa-switch></wa-switch>
  </div>

  <div class="wa-split">
    <div class="wa-stack wa-gap-3xs">
      <strong>Product updates</strong>
      <span class="wa-caption-m">News about features and releases.</span>
    </div>
    <wa-switch checked></wa-switch>
  </div>
</section>
```

---

## Dashboard card grid (in-page, utilities only)

**Intent:** a grid of stat/summary cards.
**Rationale:** equal-weight summary tiles in a responsive grid let users scan key numbers; the grid
reflows by available width with no breakpoints.

```html
<div class="wa-grid wa-gap-l" style="--min-column-size: 14rem;">
  <wa-card>
    <div class="wa-stack wa-gap-2xs">
      <span class="wa-caption-m">Revenue</span>
      <strong class="wa-heading-2xl">$48.2k</strong>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-stack wa-gap-2xs">
      <span class="wa-caption-m">Active users</span>
      <strong class="wa-heading-2xl">1,284</strong>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-stack wa-gap-2xs">
      <span class="wa-caption-m">Churn</span>
      <strong class="wa-heading-2xl">2.1%</strong>
    </div>
  </wa-card>
</div>
```

---

## Want more?

These are starting points, not a component-by-component catalog. For richer, ready-made building blocks
(and the eight Pro themes, extra palettes, and the Theme Builder), see [Web Awesome Pro](https://webawesome.com/purchase).
For exact component APIs, use the companion `webawesome` skill.
