# Recipes

Best-practice compositions built from Web Awesome primitives. Each recipe names its **layout branch**
(full-page → `<wa-page>`; in-page → utilities only), its **design intent**, and its **rationale** (the
established web-design convention it follows). Copy, then re-theme with tokens.

All recipes assume Web Awesome's stylesheet is loaded and a theme and palette are set on `<html>` (see
[getting-started.md](getting-started.md) and [theming.md](theming.md)). The default theme stylesheet also
supplies the `html`/`body` reset that `<wa-page>` needs. Inline `style` appears only for a one-off custom
property value; everything else lives in a class. Restyle components through their tokens, attributes, or
`::part()` (see [composition.md](composition.md#styling-components--css-parts)).

**Contents**

- [App shell (full-page, `<wa-page>`)](#app-shell-full-page-wa-page)
- [Marketing landing page (full-page, `<wa-page>`)](#marketing-landing-page-full-page-wa-page)
- [Login / auth card (in-page, utilities only)](#login--auth-card-in-page-utilities-only)
- [Settings section (in-page, utilities only)](#settings-section-in-page-utilities-only)
- [Dashboard card grid (in-page, utilities only)](#dashboard-card-grid-in-page-utilities-only)
- [Want more?](#want-more)

---

## App shell (full-page, `<wa-page>`)

**Intent:** a logged-in application frame with a sidebar, top bar, and content area.
**Rationale:** persistent left navigation plus a top bar is the conventional app layout; users expect nav
to stay put while content scrolls, and to see where they are. `<wa-page>` gives sticky regions and a mobile
drawer for free.

```html
<wa-page mobile-breakpoint="920">
  <header slot="header" class="wa-split">
    <div class="wa-cluster wa-gap-s">
      <wa-button data-toggle-nav appearance="plain">
        <wa-icon name="bars" label="Open menu"></wa-icon>
      </wa-button>
      <strong>Acme</strong>
    </div>
    <wa-avatar label="Account"></wa-avatar>
  </header>

  <nav slot="navigation" class="wa-stack wa-gap-3xs app-nav" aria-label="Main">
    <a href="/dashboard" class="wa-cluster wa-gap-xs wa-link-plain" aria-current="page" data-drawer="close">
      <wa-icon name="gauge"></wa-icon> Dashboard
    </a>
    <a href="/customers" class="wa-cluster wa-gap-xs wa-link-plain" data-drawer="close">
      <wa-icon name="users"></wa-icon> Customers
    </a>
    <a href="/settings" class="wa-cluster wa-gap-xs wa-link-plain" data-drawer="close">
      <wa-icon name="gear"></wa-icon> Settings
    </a>
  </nav>

  <main class="wa-stack wa-gap-xl">
    <div class="wa-split">
      <h1 class="wa-heading-2xl">Dashboard</h1>
      <div class="wa-cluster wa-gap-xs">
        <wa-button appearance="plain">Export</wa-button>
        <wa-button variant="brand">
          <wa-icon slot="start" name="plus"></wa-icon>
          New report
        </wa-button>
      </div>
    </div>
    <p>Welcome back.</p>
  </main>
</wa-page>

<style>
  wa-page {
    --menu-width: 15rem;
  }
  wa-page[view='mobile'] {
    --menu-width: auto;
  }
  .app-nav a {
    padding: var(--wa-space-xs) var(--wa-space-s);
    border-radius: var(--wa-border-radius-m);
  }
  .app-nav a[aria-current='page'] {
    background-color: var(--wa-color-brand-fill-quiet);
    color: var(--wa-color-brand-on-quiet);
  }
</style>
```

`aria-current="page"` tells assistive tech which link is the current page, and the style hangs off the
same attribute, so the two never disagree. For the settings and forms inside an app, see
`references/form-controls.md` in the `webawesome` skill.

---

## Marketing landing page (full-page, `<wa-page>`)

**Intent:** a public landing page with header nav, a hero, a feature grid, a call-to-action band, and a
footer.
**Rationale:** one clear value proposition with a single primary action above the fold converts better
than competing actions; supporting detail follows, and the CTA repeats at the end.

**Nav:** this is the header-links-on-desktop, drawer-on-mobile shape from
[layouts-page.md](layouts-page.md#header-links-on-desktop-drawer-on-mobile). The header links hide on
mobile (`wa-desktop-only`), the `navigation` copy fills the drawer, the desktop sidebar is hidden, the
header carries its own toggle, and `--menu-width` stays at its `auto` default so no empty column appears.

```html
<wa-page>
  <header slot="header" class="wa-split">
    <a href="/" class="wa-link-plain"><strong>Acme</strong></a>
    <nav class="wa-desktop-only wa-cluster wa-gap-l" aria-label="Main">
      <a href="#features" class="wa-link-plain">Features</a>
      <a href="/pricing" class="wa-link-plain">Pricing</a>
      <a href="/docs" class="wa-link-plain">Docs</a>
      <wa-button variant="brand" href="/signup">Get started</wa-button>
    </nav>
    <wa-button data-toggle-nav appearance="plain">
      <wa-icon name="bars" label="Open menu"></wa-icon>
    </wa-button>
  </header>

  <nav slot="navigation" class="wa-stack wa-gap-s" aria-label="Main">
    <a href="#features" class="wa-link-plain" data-drawer="close">Features</a>
    <a href="/pricing" class="wa-link-plain" data-drawer="close">Pricing</a>
    <a href="/docs" class="wa-link-plain" data-drawer="close">Docs</a>
    <wa-button variant="brand" href="/signup" data-drawer="close">Get started</wa-button>
  </nav>

  <main>
    <section class="section">
      <div class="section-inner wa-stack wa-gap-l wa-align-items-center wa-text-center">
        <h1 class="wa-heading-4xl wa-text-balance">Ship faster with Acme</h1>
        <p class="wa-body-l wa-color-text-quiet wa-text-pretty">The toolkit teams reach for when deadlines are real.</p>
        <div class="wa-cluster wa-justify-content-center">
          <wa-button variant="brand" size="l" href="/signup">Start free</wa-button>
          <wa-button appearance="plain" size="l" href="/demo">Watch demo</wa-button>
        </div>
      </div>
    </section>

    <section id="features" class="section">
      <div class="section-inner wa-stack wa-gap-2xl">
        <h2 class="wa-heading-2xl wa-text-center">Why teams pick Acme</h2>
        <div class="wa-grid wa-gap-xl features">
          <div class="wa-stack wa-gap-xs">
            <wa-icon name="bolt" class="feature-icon"></wa-icon>
            <h3 class="wa-heading-m">Fast</h3>
            <p class="wa-color-text-quiet">Built for speed from the ground up.</p>
          </div>
          <div class="wa-stack wa-gap-xs">
            <wa-icon name="shield" class="feature-icon"></wa-icon>
            <h3 class="wa-heading-m">Secure</h3>
            <p class="wa-color-text-quiet">Enterprise-grade security by default.</p>
          </div>
          <div class="wa-stack wa-gap-xs">
            <wa-icon name="puzzle-piece" class="feature-icon"></wa-icon>
            <h3 class="wa-heading-m">Flexible</h3>
            <p class="wa-color-text-quiet">Adapts to how your team already works.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section cta-band">
      <div class="section-inner wa-stack wa-gap-l wa-align-items-center wa-text-center">
        <h2 class="wa-heading-2xl">Ready to ship?</h2>
        <p>Start free. Upgrade when your team grows.</p>
        <div class="wa-cluster wa-justify-content-center">
          <wa-button variant="neutral" size="l" href="/signup">Start free</wa-button>
          <wa-button appearance="outlined" size="l" href="/sales">Talk to sales</wa-button>
        </div>
      </div>
    </section>
  </main>

  <footer slot="footer" class="section">
    <div class="section-inner wa-split">
      <small class="wa-color-text-quiet">&copy; Acme</small>
      <nav class="wa-cluster wa-gap-l" aria-label="Footer">
        <a href="/about" class="wa-link-plain">About</a>
        <a href="/careers" class="wa-link-plain">Careers</a>
        <a href="/privacy" class="wa-link-plain">Privacy</a>
      </nav>
    </div>
  </footer>
</wa-page>

<style>
  /* No --menu-width: the desktop sidebar is hidden, so its column stays at auto and collapses. */
  wa-page[view='desktop']::part(navigation) {
    display: none;
  }
  main {
    padding: 0;
  }
  .section {
    padding: var(--wa-space-4xl) var(--wa-space-xl);
  }
  .section-inner {
    max-inline-size: 75ch;
    margin-inline: auto;
  }
  .features {
    --min-column-size: 24ch;
  }
  .feature-icon {
    font-size: var(--wa-font-size-2xl);
    color: var(--wa-color-brand-fill-loud);
  }
  .cta-band {
    background-color: var(--wa-color-brand-fill-loud);
    color: var(--wa-color-brand-on-loud);
  }
  .cta-band wa-button[appearance='outlined']::part(button) {
    border-color: var(--wa-color-brand-on-loud);
    color: var(--wa-color-brand-on-loud);
  }
</style>
```

The CTA band pairs `brand-fill-loud` with `brand-on-loud`. Its primary button is a filled `neutral`, which
reads on a brand field, and the outlined secondary is recolored through its `button` part to the band's
on-color. A brand-outlined or plain button there would share the band's hue and disappear.

---

## Login / auth card (in-page, utilities only)

**Intent:** a centered sign-in card.
**Rationale:** auth is a focused, single-task moment, so center a narrow card, minimize fields, one primary
action. Don't use `<wa-page>`; this is one element on a page.

```html
<div class="auth-screen wa-stack wa-align-items-center wa-justify-content-center">
  <wa-card class="auth-card">
    <form class="wa-stack wa-gap-l">
      <h1 class="wa-heading-l">Sign in</h1>
      <wa-input label="Email" type="email" name="email" required></wa-input>
      <wa-input label="Password" type="password" name="password" required></wa-input>
      <wa-button type="submit" variant="brand">Sign in</wa-button>
      <a href="/forgot-password" class="wa-caption-m">Forgot your password?</a>
    </form>
  </wa-card>
</div>

<style>
  .auth-screen {
    min-block-size: 100dvh;
  }
  /* Size the card with a class; width is layout, so it's fine on the host. */
  .auth-card {
    inline-size: 100%;
    max-inline-size: 40ch;
  }
</style>
```

---

## Settings section (in-page, utilities only)

**Intent:** a settings panel with grouped, labeled rows.
**Rationale:** group related settings, label each one, and keep the explanation next to the control, for a
scannable, conventional settings layout.

```html
<section class="wa-stack wa-gap-xl settings">
  <h2>Notifications</h2>
  <wa-switch name="digest" hint="A weekly summary of activity.">Email digests</wa-switch>
  <wa-switch name="updates" hint="News about features and releases." checked>Product updates</wa-switch>
</section>

<style>
  .settings {
    max-inline-size: 60ch;
  }
</style>
```

The switch's default slot is its label and `hint` is its description, so each switch has an accessible
name and description without extra markup. For validation and form submission, see
`references/form-controls.md` in the `webawesome` skill.

---

## Dashboard card grid (in-page, utilities only)

**Intent:** a grid of stat/summary cards.
**Rationale:** equal-weight summary tiles in a responsive grid let users scan key numbers; the grid
reflows by available width with no breakpoints.

```html
<div class="wa-grid wa-gap-l" style="--min-column-size: 24ch;">
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
