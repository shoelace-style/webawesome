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

### → Building a section, widget, card, form, panel, or embedding into a page you don't fully control?

**Do NOT use `<wa-page>`.** Reaching for it here causes broken layouts (it expects to own the viewport).
Instead, compose with layout utilities: `wa-stack`, `wa-cluster`, `wa-grid`, `wa-flank`, `wa-split`,
`wa-frame`. And because there's no `<wa-page>`, its features are **unavailable** here: no `slot="…"`,
no `view='mobile'`, no `--menu-width`, no `data-toggle-nav`, and no `.wa-desktop-only` /
`.wa-mobile-only` (those only work inside `<wa-page>`; use a CSS media query instead).

**Read [references/layouts-inpage.md](references/layouts-inpage.md).**

### The rule

Never mix the two. Don't nest `<wa-page>` inside a section, and don't hand-roll a full-page grid when
`<wa-page>` was the right tool. **If you're unsure which branch applies, ask the user: "Are you building
a full page, or a piece of one?"** before generating markup.

---

## Use Web Awesome's design system first (the core mindset)

Web Awesome is a complete, opinionated design system — components, layout utilities, design tokens, themes,
and a styling API — designed so you **rarely need to write custom CSS or build your own primitives**. Your
default is to **understand what the system already provides and reach for it**, not to invent. Custom code
is the exception you justify, not the starting point.

Before you write a custom class, a raw `flex`/`grid` rule, a hardcoded value, or a hand-built component,
**work down this ladder and stop at the first rung that does the job:**

1. **A component.** Is there already a `<wa-*>` for this (button, card, dialog, dropdown, input, tabs, …)?
   Use it instead of assembling the same thing from `<div>`s. Check the companion [`webawesome` skill](https://webawesome.com/docs/ai/) before building UI by hand.
2. **A layout utility.** Need to arrange things? Use `wa-stack`, `wa-cluster`, `wa-grid`, `wa-flank`,
   `wa-split`, `wa-frame` (and `<wa-page>` for full pages) before reaching for hand-written flexbox/grid.
3. **A token.** Need a color, space, radius, font size, shadow, or transition? Use the `--wa-*` token or
   `wa-*` utility from the scale — never a raw `px`/hex/`rem` literal.
4. **The component's styling API.** Need a component to look different? Use its **attributes**
   (`variant`, `appearance`, `size`, `pill`, …), then its **tokens**, then a **`::part()`** selector —
   in that order. Don't fight the shadow DOM with host CSS. (See rule 9 below and composition.md.)
5. **Only then, extend.** If — and only if — the system genuinely doesn't cover the need, you may write a
   small amount of custom CSS **built on top of the tokens** (e.g. a one-off layout using `--wa-space-*`).
   Extending the system a little is fine; **replacing or bypassing it is not.** Keep custom code minimal,
   token-based, and consistent with how Web Awesome does things — never a parallel design language.

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
7. **Use the layout utilities instead of ad-hoc flexbox/grid CSS.** `wa-stack` (vertical), `wa-cluster` (inline wrap), `wa-grid` (responsive columns). See [references/composition.md](references/composition.md).
8. **Avoid inline `style` attributes; put reusable styles in a `<style>` block.** Style with utility classes and your own semantic classes, defined once and reused, not `style="…"` scattered on elements. Inline styles can't be reused, overridden by theme, or kept consistent, and they bloat the markup. Reserve inline styles for genuinely one-off, per-instance values (e.g. a unique `--c1` on a single element).
9. **Style components through their API, not host CSS.** Web Awesome components are custom elements with a shadow DOM, so page CSS and classes don't reach inside them. To restyle one, use its **tokens/attributes** first, then a **`::part()`** selector for internal surfaces (most expose a `base` part; the set is per-component). Look up the right token/part in the companion [`webawesome` skill](https://webawesome.com/docs/ai/) for **whatever** `<wa-*>` element you're styling. See [references/composition.md](references/composition.md).
10. **Use `<wa-icon>` for icons; never emojis.** Don't put emojis in the UI unless the user explicitly asks for them. Reach for the [`<wa-icon>`](https://webawesome.com/docs/components/icon) component instead. The default icon library is Font Awesome Free; see [references/composition.md](references/composition.md) for usage and Font Awesome Pro setup.

---

## Recommended starting points

Pick the skeleton that matches your STEP 0 answer. Both produce a complete, on-brand, responsive result
out of the box. **Free users:** only use free themes (default, shoelace, or awesome). **Pro users:** swap in a Pro theme/palette if the user wants one (see theming).

### Full page (`<wa-page>`)

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
      wa-page {
        --menu-width: 16rem;
      }
      wa-page[view='mobile'] {
        --menu-width: auto;
      }
    </style>
  </head>
  <body>
    <wa-page>
      <header slot="header" class="wa-split">
        <strong>My App</strong>
        <nav class="wa-cluster">
          <a href="#">Docs</a>
          <wa-button variant="brand">Sign up</wa-button>
        </nav>
      </header>

      <nav slot="navigation" class="wa-stack wa-gap-2xs">
        <a href="#">Dashboard</a>
        <a href="#">Settings</a>
      </nav>

      <main class="wa-stack wa-gap-xl">
        <h1>Welcome</h1>
        <p>Your content goes here.</p>
      </main>

      <footer slot="footer">
        <small>&copy; My App</small>
      </footer>
    </wa-page>
  </body>
</html>
```

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
- **[composition.md](references/composition.md):** Spacing rhythm, the layout-utility decision guide, typography, and surfaces. Read this to make things look designed.
- **[patterns.md](references/patterns.md):** Ready-made, best-practice recipes (app shell, login, settings, dashboard grid, hero).
- **[getting-started.md](references/getting-started.md):** The opinionated default setup, explained.
