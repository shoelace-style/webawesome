---
name: webawesome-design
description: >
  Design and lay out user interfaces with Web Awesome. Use this when building or styling a PAGE,
  LAYOUT, or SECTION; choosing or customizing a THEME; applying brand COLORS or design tokens; or
  composing a polished, good-looking UI with Web Awesome components and utilities. Triggers on requests
  like "build a landing page", "make an app layout", "set up <wa-page>", "add a sidebar", "apply a
  theme", "match our brand color", "style this to look designed", "build a settings page", or "lay out
  a dashboard". Teaches layout (when and how to use <wa-page>), theming (--wa-* tokens), and visual
  composition. Pair with the `webawesome` skill, which documents individual component APIs.
license: MIT / Commercial (for Web Awesome Pro)
metadata:
  author: Web Awesome
  homepage: https://webawesome.com
compatibility: Works in modern browsers. Requires no build tools when using the CDN. Works with bundlers like Webpack and Vite when installed via npm.
---

# Designing with Web Awesome

This skill teaches you to **design well** with Web Awesome: how to lay out pages, theme them on-brand,
and compose interfaces that look intentionally designed rather than merely functional. The single most
important habit is to **lean into Web Awesome's design system first** — its components, layout utilities,
tokens, and styling API — and reach for custom CSS only when the system genuinely doesn't cover the need
(see "Use Web Awesome's design system first" below). For the API of any single component (props, slots,
events), use the companion `webawesome` skill or [llms.txt](https://webawesome.com/docs/ai/).

Read this file first. It routes you to the right reference and states the rules that matter most.

---

## STEP 0 — Decide your layout strategy (do this first, every time)

Before writing any markup, answer one question: **am I building a whole page, or a piece of one?**

### → Building a full page, app shell, or site layout?

If you own the entire viewport (header, navigation/sidebar, main content, footer), **use `<wa-page>`.**
It is the recommended, supported way to scaffold a full page in Web Awesome, and it gives you sticky
headers, a responsive navigation drawer, and a correct grid with almost no markup.

**Read [references/layouts-page.md](references/layouts-page.md) and follow its rules exactly.**

⚠️ **`<wa-page>` owns the layout — including the navigation.** The `navigation` slot is **special**: you
put your nav in `slot="navigation"` **once**, and the component renders it as a left sidebar on desktop
and moves it into a mobile drawer (with a hamburger button it provides) below `mobile-breakpoint`. You do
**not** wire up a drawer, a toggle, or media queries for any of this — it's automatic.

The #1 mistake is **duplicating** the nav: putting the same links in `header` *and* `navigation` (or
copying them around) so they render **twice**. There is no "this copy is mobile, that copy is desktop" —
`slot="navigation"` is already both. Write it once.

- **App shell / docs / dashboard (you want a desktop left sidebar):** Put nav in `slot="navigation"`, set
  `--menu-width`, reset it to `auto` on mobile. The default hamburger or a `data-toggle-nav` element opens
  its drawer. Copy the **canonical example in layouts-page.md.**
- **Landing page / marketing site:** Simplest is to put nav in `slot="navigation"` anyway (sidebar on
  desktop, drawer on mobile — both free). If you specifically want nav in the **header bar** on desktop
  with **no** sidebar, use the **"header on desktop, drawer on mobile" recipe** in layouts-page.md — the
  one sanctioned, view-scoped way to duplicate nav. Either way, **don't hand-roll your own `<wa-drawer>`
  or toggle.** Copy the **"Landing page" skeleton** below.

### → Building a section, widget, card, form, panel, or embedding into a page you don't fully control?

**Do NOT use `<wa-page>`.** Reaching for it here causes broken layouts (it expects to own the viewport).
Instead, compose with layout utilities: `wa-stack`, `wa-cluster`, `wa-grid`, `wa-flank`, `wa-split`,
`wa-frame`. And because there's no `<wa-page>`, its features are **unavailable** here: no `slot="…"`,
no `view='mobile'`, no `--menu-width`, no `data-toggle-nav`, and no `.wa-desktop-only` /
`.wa-mobile-only` (those only work inside `<wa-page>`; use a CSS media query instead).

**Read [references/layouts-inpage.md](references/layouts-inpage.md).**

### The rule

Never mix the two **at the same level**. Don't nest `<wa-page>` inside another `<wa-page>`, and don't
hand-roll a full-page grid when `<wa-page>` was the right tool.

**Layouts nest, though.** A full page _contains_ sections, and every section is itself a
piece-of-a-page — same for `<wa-dialog>` bodies, `<wa-drawer>` bodies, card contents, and any embedded
panel. Inside those inner containers, you're back in the in-page branch (utility classes, no
`<wa-page>` slot semantics) regardless of what the outer page is. Answer STEP 0 for the outermost
frame; then answer it again for each self-contained inner container.

**If you're unsure which branch applies, ask the user: "Are you building a full page, or a piece of
one?"** before generating markup.

---

## Use Web Awesome's design system first (the core mindset)

Web Awesome is a complete, opinionated design system — components, layout utilities, design tokens, themes,
and a styling API — designed so you **rarely need to write custom CSS or build your own primitives**. Your
default is to **understand what the system already provides and reach for it**, not to invent. Custom code
is the exception you justify, not the starting point.

Before you write a custom class, a raw `flex`/`grid` rule, a hardcoded value, or a hand-built component,
**work down this ladder and stop at the first rung that does the job:**

1. **A component.** Is there already a `<wa-*>` for this (button, card, dialog, dropdown, input, tabs, …)?
   Use it instead of assembling the same thing from `<div>`s. Check the companion [`webawesome` skill](https://webawesome.com/docs/ai/) before building UI by hand. **Watch for these commonly re-invented ones:**
   a "featured/Most Popular" pricing tier is a `<wa-card>` with a `<wa-badge>` in its header slot (not an
   absolutely-positioned hand-rolled ribbon); a section separator is `<wa-divider>` (not a styled `<hr>`);
   a pill/label is `<wa-tag>` or `<wa-badge>`; a quote mark, check bullet, or star rating is `<wa-icon>` /
   `<wa-rating>` (not CSS `::before` glyphs). If your markup is starting to _look like_ a component, stop
   and use the component.
2. **A layout utility.** Need to arrange things? Use `wa-stack`, `wa-cluster`, `wa-grid`, `wa-flank`,
   `wa-split`, `wa-frame` (and `<wa-page>` for full pages) before reaching for hand-written flexbox/grid.
   (Modifier classes like `wa-frame:landscape` and `wa-flank:end` are real, supported syntax — not typos.)
3. **A token.** Need a color, space, radius, font size, shadow, or transition? Use the `--wa-*` token or
   `wa-*` utility from the scale — never a raw `px`/hex/`rem` literal. Don't re-alias an existing token into
   your own namespace (`--brand-dark: var(--wa-color-orange-30)`); reference the `--wa-*` token directly so
   re-theming still works. (See [composition.md](references/composition.md) for token-based recipes for
   fixed-size elements — icon badges, avatars, content widths — so you're never tempted back to raw `rem`.)
4. **The component's styling API.** Need a component to look different? **First look up that specific
   component's documented styling API** — its **attributes** (`variant`, `appearance`, `size`, `pill`, …),
   its **CSS custom properties** (`--wa-*` it exposes), and its **CSS parts** (`::part(...)`) — in the
   companion [`webawesome` skill](https://webawesome.com/docs/ai/) (or [llms.txt](https://webawesome.com/docs/ai/)).
   Then style through that API in this order: **attributes → component tokens → `::part()`**. Never guess a
   token name, a part name, or which token a `variant` resolves to, and never fight the shadow DOM with host
   CSS. This lookup is **mandatory** — see rule 9 below. (Also composition.md.)
5. **Only then, extend.** If — and only if — the system genuinely doesn't cover the need, you may write a
   small amount of custom CSS **built on top of the tokens** (e.g. a one-off layout using `--wa-space-*`).
   Extending the system a little is fine; **replacing or bypassing it is not.** Keep custom code minimal,
   token-based, and consistent with how Web Awesome does things — never a parallel design language. When
   you do, follow the [Custom CSS playbook](references/composition.md#custom-css) so your rules stay
   themed, dark-mode-safe, and accessible.

If you catch yourself writing a hex color, a `px` value, a raw flexbox container, or re-implementing
something that smells like an existing component, **stop and look it up first.** Most of the time the
system already has it, and using it gives you theming, dark mode, accessibility, and consistency for free.

---

## The rules that matter most

These are the things that go wrong most often. Treat them as hard constraints.

1. **Custom elements never self-close.** Always use a closing tag: `<wa-input></wa-input>`, never `<wa-input />`.
2. **When using `<wa-page>`, reset `html` and `body`** with `html, body { min-height: 100%; padding: 0; margin: 0; }`, or you'll get unexpected gaps. (Web Awesome's Native styles handle this for you; see theming.)
3. **`<wa-page>` adds no semantic elements.** Slot in your own `<header>`, `<main>`, `<footer>`, `<nav>`, `<aside>`.
4. **Zero `<main>` padding for full-bleed pages.** `<wa-page>` pads the main area, which insets hero and section backgrounds from the viewport edge. Set `main { padding: 0 }` and let each section own its gutter. Keep the default only for a single contained column. See [references/layouts-page.md](references/layouts-page.md).
5. **Never hardcode colors, spacing, radii, or font sizes.** Use design tokens (`--wa-color-*`, `--wa-space-*`, `--wa-border-radius-*`, `--wa-font-size-*`) and utility classes (`wa-gap-*`). Raw `px` and hex values break theming and consistency.
6. **Set a theme and palette on `<html>`.** A page with no theme class looks unstyled. See [references/theming.md](references/theming.md).
7. **Use the layout utilities instead of ad-hoc flexbox/grid CSS.** `wa-stack` (vertical), `wa-cluster` (inline wrap), `wa-grid` (responsive columns). Pair them with **companion utilities** (`wa-align-items-*`, `wa-justify-content-*`, `wa-text-*`, `wa-size-*`, `wa-color-text-*`, `wa-visually-hidden`) for alignment, text, sizing, color, and accessibility — anywhere you'd otherwise reach for inline `style=""`. See [references/composition.md](references/composition.md).
8. **Avoid inline `style` attributes; put reusable styles in a `<style>` block.** Style with utility classes and your own semantic classes, defined once and reused, not `style="…"` scattered on elements. Inline styles can't be reused, overridden by theme, or kept consistent, and they bloat the markup. Reserve inline styles for genuinely one-off, per-instance values (e.g. a unique `--c1` on a single element).
9. **Look up a component's styling API before you style it — every time, for every `<wa-*>`.** This is a
   hard prerequisite, not a suggestion. Web Awesome components are custom elements with a shadow DOM, so your
   page CSS, classes, and `color`/`background` declarations **do not reach inside them** and **`variant`
   colors resolve through tokens you cannot guess**. Before you write **any** custom CSS that targets a
   `<wa-*>` element — or that sets a `--wa-*` token expecting that element to consume it — **open that exact
   component's reference** in the companion [`webawesome` skill](https://webawesome.com/docs/ai/)
   (`references/components/<name>.md`) or [llms.txt](https://webawesome.com/docs/ai/) and read its
   **CSS Parts**, **CSS Custom Properties**, **Attributes** (`variant`/`appearance`/`size`/…), and any
   **Styling** notes. Then style **only** through what that doc lists, in this order: **attributes →
   the component's own tokens → its documented `::part()`**. 

   The **only** thing you may do to a `<wa-*>` element *without* looking it up is position it in the layout
   (outer `margin`, and placing it inside a `wa-stack`/`wa-cluster`/`wa-grid`). **Everything visual —
   `background`, `color`, `border`, `border-radius`, fill, text color, internal padding — requires the
   lookup first.** The recurring, silent failure this prevents: you assume a `variant` (or a `*-quiet` /
   `*-loud` token) maps the way you expect, set a background or token accordingly, and the component's text
   or border resolves to a *different* token than you assumed — producing dark-on-dark text, an invisible
   border, or a "styled" box whose visible surface never changed. (Real example: a `<wa-callout variant=
   "brand">` on a theme that inverted `--wa-color-brand-fill-quiet`/`-on-quiet` rendered a dark panel with
   near-black body text, because the callout's text color came from a token the author never checked. The
   fix was to read [the callout reference](references/components/callout.md) — which documents that host
   `background`/`color` are supported and exposes `message`/`icon` parts — and set the colors explicitly.)
   If you cannot point to the doc line that says a token/part/attribute exists, you have not earned the right
   to use it yet — go read the doc.

   **Buttons especially — the most common and most visible offender.** When styling a `<wa-button>`, ALWAYS check its styling API first. Reach for `variant` / `appearance` / `size` / `pill` attributes; if you must go further, set its **tokens** or target its **`base` part** — never apply `background`, `color`, `border`, `border-radius`, padding, or box-shadow to the `<wa-button>` host (or a class on it). Those declarations style the host wrapper, not the actual button surface inside the shadow DOM, so the visible button keeps its default fill while your "styling" lands on an invisible box around it. The classic failure: a secondary/outline button on a colored CTA band whose label and border are barely visible because the contrast fix was applied to the host instead of `::part(base)`. Fix the look through the part:

   ```css
   /* WRONG — styles the host wrapper, not the button; label/border stay low-contrast */
   .cta-band wa-button.secondary {
     background: transparent;
     border: var(--wa-border-width-s) solid var(--wa-color-surface-default);
     color: var(--wa-color-surface-default);
   }

   /* RIGHT — reach the actual button surface via its base part */
   .cta-band wa-button.secondary::part(base) {
     background-color: transparent;
     border-color: var(--wa-color-surface-default);
     color: var(--wa-color-surface-default);
   }
   ```

   **Contrast on colored bands (a separate, equally common button bug).** Even with correct `::part(base)` usage, a button can vanish because its colors match the band it sits on. **Never place an `appearance="outlined"` or `appearance="plain"` button whose `variant` matches the band color** — e.g. `<wa-button variant="brand" appearance="outlined">` on a brand-colored hero or CTA. The outline and label are the same hue as the background, so the button is effectively invisible (this is exactly what happened on the brand-colored hero bands of multiple pages). On any colored band, a secondary button must use a **contrasting** treatment: a solid/filled neutral or on-color button, or an outline/text recolored via `::part(base)` to the band's on-color token (`--wa-color-*-on-loud`, or a surface token). After placing any button on a non-default background, verify its label **and** border are clearly visible against that band.
10. **Use `<wa-icon>` for icons; never emojis.** Don't put emojis in the UI unless the user explicitly asks for them — and that includes the places they sneak in: logos, image-`alt`/placeholder text, list bullets, decorative `::before` content, and JS-injected toast/success messages. Reach for the [`<wa-icon>`](https://webawesome.com/docs/components/icon) component instead. The default icon library is Font Awesome Free; if the user has **Font Awesome Pro or Web Awesome Pro**, wire up their kit code and use Pro icon families. If your tool has access to Font Awesome's [official agent skills](https://github.com/FortAwesome/fontawesome-agent-tools) (`icons:suggest-icon`, `icons:add-icon`), prefer those over guessing an icon name — they recommend icons by intent rather than keyword match. See [references/composition.md](references/composition.md) for usage and Pro setup.
11. **Keep markup valid and accessible.** Use real heading elements for hierarchy (`<h2>`/`<h3>`/`<h4>`) — don't fake a heading with a styled `<strong>`, which breaks the document outline. Give icon-only controls a `label` (or `aria-label`) and images meaningful `alt`. Never put two `style` attributes on one element — the second silently wins; merge them (or, per Rule 8, use a class).

---

## Final pass — verify your work before you finish (do this every time)

Producing the markup is the first draft, not the finished design. **You must circle back and verify the
output against this skill before declaring it done — every time.** Models reliably state these rules and
then violate them while generating long files; an explicit verification pass is what actually catches it.

**This is the structural pass** — markup, decisions, valid HTML, rule compliance. For visual quality
(spacing rhythm, hierarchy, contrast, surface choices) walk the
[Polish checklist](references/composition.md#polish-checklist) in composition.md too.

This verification is **mandatory and has two parts:**

1. **Self re-read.** Re-read the rules above and walk your own output line by line, fixing each item in the
   checklist below.
2. **Independent subagent review (required).** After your self-pass, **dispatch one or more verification
   subagents** to re-check the design independently — do not rely solely on your own review of work you
   just wrote. Give each subagent the produced markup/CSS and this skill's rules, and ask it to find
   violations and report or fix them. For a substantial page, split the work: e.g. one subagent audits the
   `<wa-page>` layout and the navigation-duplication trap, another audits tokens/emojis/accessibility.
   Apply whatever the subagents surface, then confirm the result is clean. Treat their findings as
   authoritative over your own first draft.

Walk this checklist (yourself, and via the subagents) and fix each before declaring it done:

- [ ] **Duplicated `<wa-page>` nav (check this first on any full page).** Search your markup for the same
      nav links appearing in more than one slot. `slot="navigation"` already renders in **both** views
      (sidebar on desktop, drawer on mobile), so a second copy elsewhere shows **twice**. The *only* allowed
      duplication is the deliberate "header on desktop, drawer on mobile" recipe, where each copy is hidden
      in the opposite view via `wa-page[view='…']`. If you find an accidental copy, delete it and keep the
      single `slot="navigation"`. Also confirm you did **not** hand-roll a `<wa-drawer>` or toggle — the
      component provides both. See the landing-page skeleton above.
- [ ] **Empty `<wa-page>` nav column band.** Only set a fixed `--menu-width` when you actually render a
      desktop sidebar. If you hid the desktop sidebar with `wa-page[view='desktop']::part(navigation) {
      display: none }` (the header/drawer recipe), confirm `--menu-width` is left at its `auto` default —
      a fixed value (e.g. `14rem`) reserves an empty band down the left side, because hiding the sidebar
      part does **not** collapse the `menu` grid track (only `--menu-width` does). The tell is "I added
      `display: none` but the gap is still there." Search for a fixed `--menu-width` paired with a hidden
      desktop sidebar and remove it.
- [ ] **Raw values** — search for `#` (hex), `px`, and stray `rem`. The only allowed hex is the `:root`
      brand-token override; everything else is a `--wa-*` token. (Sizing recipes: composition.md.)
- [ ] **Repeated inline styles** — if the same `style="…"` appears more than once, promote it to a class.
      Inline is only for genuinely one-off per-instance custom-property values.
- [ ] **Hand-rolled `display:flex`/`grid`** — if it has `gap`/`align`/`justify`, replace it with
      `wa-stack`/`wa-cluster`/`wa-grid`/`wa-flank`/`wa-split`.
- [ ] **Re-invented components** — did you hand-build something that's already a `<wa-*>` (featured card,
      divider, badge/tag, rating)? Swap in the component.
- [ ] **Emojis** — none in the UI (incl. logos, `alt`/placeholder text, bullets, `::before`, JS toasts).
      Use `<wa-icon>`. If the user has Pro, the kit code is wired up.
- [ ] **Images** — real assets (ask the user if you don't have one), else a token-based placeholder in
      `wa-frame`. No broken `src`, no emoji stand-in; meaningful `alt`. (See composition.md.)
- [ ] **Component styling — did you look up the API first? (do this for EVERY styled `<wa-*>`).** For each
      Web Awesome element you applied custom CSS to (callout, card, badge, input, details, divider, tabs,
      anything), confirm you actually opened its `references/components/<name>.md` and that every part name,
      `--wa-*` custom property, and `variant`/`appearance` you used **appears in that doc**. Overrides go
      through attributes → the component's own tokens → its documented `::part()` — never a guessed-at part,
      token, or an assumed `variant`→token mapping. If you set a `background`/`color` on a component and
      relied on its text/border picking up a matching token, **verify which token that text/border actually
      uses** (read the doc) rather than assuming `*-quiet`/`*-loud` behave a certain way.
- [ ] **Component text contrast (every `<wa-callout>` and any recolored component).** Anywhere you changed a
      component's `background` or fill, confirm its **body text and any border are clearly readable** against
      that new background — not just the bold lead-in. The classic miss is a callout whose panel you darkened
      while its body text stayed dark (dark-on-dark). If in doubt, set the text color explicitly through the
      documented part/property (e.g. the callout's `message` part) rather than hoping a token cascades.
- [ ] **Button styling (check every `<wa-button>`), two checks.** (a) **Host vs part:** no `background`,
      `color`, `border`, `border-radius`, or box-shadow set on the `<wa-button>` host or a class on it —
      those go on `::part(base)` (or use `variant`/`appearance`/`pill`). Search for `wa-button` rules
      that aren't `::part(...)` and move the visual properties to the part. (b) **Contrast on bands:** no
      `appearance="outlined"`/`"plain"` button whose `variant` matches the band it sits on (e.g. brand
      outlined on a brand-colored hero) — it goes invisible. Every secondary button on a colored band
      must have a clearly visible label **and** border (recolor `::part(base)` to the band's on-color
      token, or use a filled/neutral button).
- [ ] **Nav toggle placement (header/drawer recipe).** If you hid the desktop sidebar and use a top
      header bar, confirm there's an explicit `data-toggle-nav` button (mobile-only) **inside** your
      `<header slot="header">`. If you relied on `<wa-page>`'s built-in hamburger, it renders before your
      header content and wraps onto its own unstyled row outside the bar — add your own toggle.
- [ ] **Valid & accessible** — real headings (not styled `<strong>`), labels on icon-only controls, no
      element with two `style` attributes.

If you can, **render the page and look at it** (sticky regions not overlapping, secondary buttons readable
on colored bands, no mobile nav bleeding into desktop, nothing clipped) and fix what you see.

---

## Recommended starting points

Pick the skeleton that matches your STEP 0 answer. Each produces a complete, on-brand, responsive result
out of the box. **Free users:** only use free themes (default, shoelace, or awesome). **Pro users:** swap in a Pro theme/palette if the user wants one (see theming).

### Full page — landing / marketing (`<wa-page>`) — use this by default

Nav goes in `slot="navigation"` **once**. `<wa-page>` renders it as a sidebar on desktop and a drawer
(with a hamburger) on mobile — **no hand-rolled `<wa-drawer>`, no toggle, no media queries** for the nav.
This is the right skeleton for a hero-driven landing page, marketing site, or most content pages. (Want
nav in the **header bar** on desktop with no sidebar? See the "header on desktop, drawer on mobile" recipe
in layouts-page.md.)

```html
<!doctype html>
<html lang="en" class="wa-theme-default wa-palette-default wa-light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- Load Web Awesome here (see the webawesome skill for installation) -->
    <style>
      html,
      body {
        min-height: 100%;
        padding: 0;
        margin: 0;
      }
      main {
        padding: 0; /* let hero/section backgrounds run edge-to-edge */
      }
      .section {
        padding-inline: var(--wa-space-xl);
      }
      wa-page {
        --menu-width: 14rem;
      }
      wa-page[view='mobile'] {
        --menu-width: auto; /* collapse the reserved sidebar space on mobile */
      }
    </style>
  </head>
  <body>
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
          <p>Your hero content goes here.</p>
          <wa-button variant="brand" size="large">Get started</wa-button>
        </section>
        <!-- more full-bleed <section class="section"> blocks … -->
      </main>

      <footer slot="footer" class="section">
        <small>&copy; My Brand</small>
      </footer>
    </wa-page>
  </body>
</html>
```

### Full page — app shell / docs (`<wa-page>` WITH a desktop sidebar)

When you want a richer left sidebar on desktop with a header, footer, and a subheader (e.g. breadcrumbs).
This uses `navigation` + `navigation-header`/`navigation-footer`, `--menu-width`, and an optional
`data-toggle-nav` in the subheader. **See the canonical example in
[references/layouts-page.md](references/layouts-page.md).**

### A section (utilities only, no `<wa-page>`)

```html
<section class="wa-stack wa-gap-l" style="max-width: 32rem;">
  <h2>Contact us</h2>
  <wa-input label="Name"></wa-input>
  <wa-input label="Email" type="email"></wa-input>
  <wa-textarea label="Message"></wa-textarea>
  <div class="wa-cluster">
    <wa-button variant="brand">Send</wa-button>
    <wa-button appearance="plain">Cancel</wa-button>
  </div>
</section>
```

---

## References

- **[layouts-page.md](references/layouts-page.md):** Full-page layouts with `<wa-page>`. Read this for the full-page branch.
- **[layouts-inpage.md](references/layouts-inpage.md):** Sections, widgets, and embeds with layout utilities. Read this for the in-page branch.
- **[theming.md](references/theming.md):** Themes, palettes, light/dark, semantic colors, and customizing with `--wa-*` tokens.
- **[composition.md](references/composition.md):** Spacing rhythm, the layout-utility decision guide, typography, surfaces, images/placeholders, and the custom CSS playbook (dark-mode-safe, contrast-aware). Read this to make things look designed.
- **[patterns.md](references/patterns.md):** Ready-made, best-practice recipes (app shell, login, settings, dashboard grid, hero).
- **[getting-started.md](references/getting-started.md):** The opinionated default setup, explained.
