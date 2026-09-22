---
name: webawesome-design
description: >
  Designs and lays out user interfaces with Web Awesome as the foundational design system. Use this skill
  whenever an agent builds or styles a page, layout, section, screen, or widget with Web Awesome; sets up
  or customizes a theme, palette, brand color, or --wa-* design token; needs to match a project's existing
  Web Awesome-based design system or make new UI consistent with the rest of an app; or wants output that
  looks intentionally designed rather than merely functional. Triggers include "build a landing page",
  "make an app layout", "set up <wa-page>", "add a sidebar", "apply a theme", "match our brand color",
  "use our design system", "make this consistent with the rest of the app", "extend our theme", "style
  this to look designed", "build a settings page", "lay out a dashboard", and any question about wa-*
  layout utilities or --wa-* tokens. Covers layout (<wa-page> vs. utilities), theming, composition, and
  extending the system for a project. Pairs with the webawesome skill, which documents individual
  component APIs.
license: MIT / Commercial (for Web Awesome Pro)
metadata:
  author: Web Awesome
  homepage: https://webawesome.com
compatibility: Works in modern browsers. Requires no build tools when using the CDN. Works with bundlers like Webpack and Vite when installed via npm.
---

# Designing with Web Awesome

Web Awesome is a complete design system: components, layout utilities, design tokens, themes, and a
documented styling API for every component. Teams build **their** design system on top of it, so on any
task your job is to (1) find out what the project has already decided, (2) build with the system rather
than around it, and (3) verify the result before you finish. Using the system is what gives you theming,
dark mode, accessibility, and consistency for free; every hand-rolled `<div>` or raw `px` value gives one
of those back.

For the API of any single component (attributes, slots, parts, tokens), read the companion `webawesome`
skill (`references/components/<name>.md`) or [llms.txt](https://webawesome.com/docs/ai/). This file is a
workflow plus the short list of things that go wrong most often. Detail lives in `references/`, linked
where you need it.

---

## Workflow

### 1. Discover what the project already decided

Most "the agent ignored our design system" failures are really "the agent never looked." In an existing
project, spend a minute finding the decisions that are already made before you write markup or CSS:

- The classes on `<html>` (`wa-theme-*`, `wa-palette-*`, `wa-brand-*`, `wa-light`/`wa-dark`) and the
  stylesheet that overrides `--wa-*` tokens. That file **is** the project's theme; add to it, don't
  compete with it.
- House recipes: project classes, wrapper components, and repeated `wa-*` compositions (a `.stat-card`,
  a `<my-button>`, the way every form is laid out). Reuse them before reaching for a raw component.
- A design brief the team keeps for agents (`DESIGN.md`, a design section in `AGENTS.md`/`CLAUDE.md`).
- How existing pages handle layout, nav, and spacing. Match them.

Precedence: **project conventions > this skill's defaults > your own taste.** On a greenfield project
with nothing to discover, use the opinionated defaults in [getting-started.md](references/getting-started.md).
How to search a project quickly, where customizations belong, and how to extend the system without
forking it: [your-design-system.md](references/your-design-system.md).

### 2. Pick the layout branch

Answer one question before any markup: **am I building a whole page, or a piece of one?**

- **A full page, app shell, or site layout (you own the viewport)** → use `<wa-page>`. It provides the
  grid, sticky regions, and a responsive nav drawer. Nav goes in `slot="navigation"` **once**; the
  component renders it as a desktop sidebar and moves it into a mobile drawer with its own hamburger.
  Don't write a second copy of the nav, a `<wa-drawer>`, a toggle, or media queries for any of that.
  Read [layouts-page.md](references/layouts-page.md) and copy its canonical example.
- **A section, widget, card, form, panel, or an embed into a page you don't control** → no `<wa-page>`.
  Compose with `wa-stack`, `wa-cluster`, `wa-grid`, `wa-flank`, `wa-split`, `wa-frame`. `<wa-page>`
  features (slots, `view`, `--menu-width`, `data-toggle-nav`, `.wa-mobile-only`) do nothing here; use a
  media query for responsive visibility. Read [layouts-inpage.md](references/layouts-inpage.md).

Layouts nest: a full page contains sections, and every section, dialog body, drawer body, and card body
is back in the in-page branch. Answer the question for the outermost frame, then again for each
self-contained inner container. If you genuinely can't tell which branch applies, ask the user.

### 3. Build with the system, in this order

Before writing a custom class, a raw `flex`/`grid` rule, a literal value, or a hand-built component, walk
down this ladder and stop at the first rung that does the job:

1. **A project recipe** (from step 1), if one exists.
2. **A component.** Is there a `<wa-*>` for this? Use it instead of assembling the same thing from
   `<div>`s. Commonly re-invented: a "Most Popular" pricing ribbon is `<wa-card>` with a `<wa-badge>` in
   its header slot; a section rule is `<wa-divider>`; a pill is `<wa-tag>` or `<wa-badge>`; a check bullet,
   quote mark, or star is `<wa-icon>` or `<wa-rating>`. Unsure which component fits? The `webawesome`
   skill's `choosing-components.md` is a decision tree by intent.
3. **A layout utility.** `wa-stack`, `wa-cluster`, `wa-grid`, `wa-flank`, `wa-split`, `wa-frame`, plus the
   companion utilities (`wa-gap-*`, `wa-align-items-*`, `wa-text-*`, `wa-color-text-*`) before any
   hand-written flexbox or grid. (Modifiers like `wa-frame:landscape` and `wa-flank:end` are real syntax.)
4. **A token.** Every color, space, radius, font size, shadow, and transition comes from `--wa-*`. No hex,
   `px`, or stray `rem`. Reference tokens directly; don't re-alias them into your own names.
5. **The component's styling API.** To make a component look different: its attributes (`variant`,
   `appearance`, `size`, `pill`) → its own `--wa-*` custom properties → its documented `::part()`. Look
   the component up first; you cannot guess parts, tokens, or how a `variant` resolves to colors.
6. **Extend.** Only when the system genuinely doesn't cover the need, write a small amount of custom CSS
   built on tokens, following the [Custom CSS playbook](references/composition.md#custom-css). Extending
   the system a little is fine; replacing it or building a parallel design language is not.

If you catch yourself typing a hex color, a `px` value, a bare `display: flex`, or markup that is starting
to look like an existing component, stop and look it up. The system almost always has it.

### 4. Verify before you finish

Run the checks in [Verify before you finish](#verify-before-you-finish) below. Producing the markup is the
first draft; models reliably state these rules and then violate them while generating a long file, and an
explicit pass is what catches it.

---

## What is fixed, and what is yours to decide

- **Fixed (follow exactly):** token names and scales, component choice and their styling API, `<wa-page>`
  slot semantics, the project's discovered conventions.
- **Yours (use judgment):** composition and hierarchy, which recipe fits, where on the spacing scale a gap
  belongs, copy, and how bold to be with color. [principles.md](references/principles.md) explains the
  design judgment the tokens encode; read it when output is correct but unrefined.

---

## The rules that matter most

Each row names the mistake, the replacement, and why it matters. The "why" is there so you can apply the
rule to cases the table doesn't list.

| Instead of…                                                                 | Do this                                                                                                | Why                                                                                                 |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `<wa-input />`                                                              | `<wa-input></wa-input>`                                                                                | Custom elements never self-close; the parser swallows everything after the slash.                   |
| Hex, `px`, or `rem` literals                                                | `--wa-color-*`, `--wa-space-*`, `--wa-border-radius-*`, `--wa-font-size-*`; `wa-gap-*` classes         | Literals ignore the theme, dark mode, and `--wa-*-scale` knobs. Only allowed hex: a brand override. |
| `display: flex; gap: 16px` by hand                                          | `wa-stack`, `wa-cluster`, `wa-grid`, `wa-flank`, `wa-split` + `wa-gap-*`                               | Utilities carry the spacing scale and sensible defaults; ad-hoc flex drifts from them.              |
| `style="…"` repeated across elements                                        | A named class in a `<style>` block, reused                                                             | Inline styles can't be reused or re-themed. Inline is for one-off custom-property values only.      |
| Palette tints (`--wa-color-blue-50`) in custom CSS                          | Semantic tokens (`--wa-color-brand-fill-loud`, `--wa-color-surface-raised`, `--wa-color-text-quiet`)   | Semantic tokens re-resolve for `wa-dark` and re-branding; palette tints are frozen.                 |
| Text color guessed on a filled background                                   | The matching `*-on-*` token (`fill-loud` ↔ `on-loud`, `fill-quiet` ↔ `on-quiet`)                     | Built-in palettes tune these pairs for WCAG contrast; mixing steps produces dark-on-dark text.      |
| `background`/`color`/`border` on a `<wa-*>` host or a class on it           | Attributes → the component's tokens → `::part(base)` (see the pair below)                              | Shadow DOM: host CSS lands on an invisible wrapper while the visible surface keeps its defaults.    |
| Styling a component from memory                                             | Open `references/components/<name>.md` in the `webawesome` skill first                                 | Parts, custom properties, and `variant`→token mappings differ per component and can't be guessed.   |
| `variant="brand" appearance="outlined"` on a brand-colored band             | A filled/neutral button, or recolor `::part(base)` to the band's `*-on-*` token                        | Same hue as the band makes the label and border effectively invisible.                              |
| Emojis as icons, bullets, logos, or placeholder text                        | `<wa-icon name="…">` (Font Awesome Free; Pro families with a kit code)                                 | Emojis render inconsistently and ignore color, size, and weight. See composition.md § Icons.        |
| A page with no theme classes                                                | `<html class="wa-theme-default wa-palette-default wa-light">` (or the project's own)                   | Unthemed output looks unstyled and defeats every token below it.                                    |
| The same nav links in `header` **and** `slot="navigation"` on a `<wa-page>` | One `slot="navigation"`, or the header-on-desktop / drawer-on-mobile recipe with each copy view-scoped | `navigation` already renders in both views; an extra copy shows twice on desktop.                   |
| A fixed `--menu-width` with the desktop sidebar hidden                      | Leave `--menu-width` at `auto`                                                                         | Hiding the sidebar part doesn't collapse the grid track; only `--menu-width` does.                  |
| `<wa-page>` default `main` padding under full-bleed sections                | `main { padding: 0 }` and let each section own its gutter                                              | The default padding insets hero and band backgrounds from the viewport edge.                        |
| A styled `<strong>` as a heading; an icon-only control with no name         | Real `<h2>`/`<h3>`; `label` on `<wa-icon>` or `aria-label` on the control; meaningful `alt`            | Screen readers and the document outline depend on real semantics.                                   |

**The host-vs-part pair, because it is the most visible failure.** A secondary button on a colored CTA band:

```css
/* Incorrect: styles the host wrapper, not the button. Label and border stay low-contrast. */
.cta-band wa-button.secondary {
  background: transparent;
  border: var(--wa-border-width-s) solid var(--wa-color-surface-default);
  color: var(--wa-color-surface-default);
}

/* Correct: reach the button's actual surface through its documented base part. */
.cta-band wa-button.secondary::part(base) {
  background-color: transparent;
  border-color: var(--wa-color-surface-default);
  color: var(--wa-color-surface-default);
}
```

The same logic applies to every `<wa-*>`: the only things you may do to a component without opening its
reference are position it (`margin`, placing it inside a layout utility) and set its width. Everything
visual goes through the documented API. The recurring silent failure this prevents: assuming a `variant`
or a `*-quiet` token maps the way you expect, then shipping a callout whose panel you darkened while its
body text stayed dark. Full treatment, including callouts and borders on colored bands:
[composition.md § Styling components](references/composition.md#styling-components--css-parts).

---

## Verify before you finish

Do this every time, in two layers. First the mechanical searches (cheap and reliable), then the judgment
checklist. If your tool can dispatch subagents, hand the produced files and this file to one and ask it to
find violations independently; treat its findings as authoritative over your first draft.

**Searches.** Run these over your output and fix every hit that isn't a deliberate exception:

| Search for                  | Pattern                                                                  | A hit means                                                                       |
| --------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| Hex colors                  | `#[0-9a-fA-F]{3,8}\b`                                                    | Replace with a token. Only a `:root` brand override may keep a hex.               |
| Pixel or rem literals       | `\d(px\|rem)\b`                                                          | Replace with `--wa-space-*`, `--wa-font-size-*`, `ch` for measure, or `wa-gap-*`. |
| Self-closed custom elements | `<wa-[a-z-]+[^>]*/>`                                                     | Add the closing tag.                                                              |
| Component host rules        | `wa-[a-z-]+[^{:]*\{` (not `::part`)                                      | Move visual properties to `::part(…)`, tokens, or attributes.                     |
| Hand-rolled flex/grid       | `display:\s*(flex\|grid)`                                                | Replace with a layout utility unless it's a genuine gap.                          |
| Inline styles               | `style="`                                                                | Promote repeats to a class; keep only one-off custom-property values.             |
| Emojis                      | `[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]`                                 | Replace with `<wa-icon>`.                                                         |
| `<wa-page>` traps           | `slot="main"`, `slot="nav"`, `<wa-page` inside another element's content | There is no `main` or `nav` slot; one `<wa-page>` per page at the top level.      |

**Checklist.** Walk it line by line against your own output:

- [ ] Project conventions from step 1 are followed (theme classes, override file, house recipes, page patterns).
- [ ] Theme and palette are set on `<html>`.
- [ ] Nav appears once on any `<wa-page>` (or is view-scoped per the header/drawer recipe); no hand-rolled drawer or toggle; `--menu-width` is `auto` whenever the desktop sidebar is hidden.
- [ ] Every styled `<wa-*>` was looked up, and every part, custom property, `variant`, and `appearance` you used appears in its reference.
- [ ] Every recolored component has readable body text **and** border on its new background.
- [ ] No outlined or plain button shares its hue with the band it sits on.
- [ ] Nothing hand-built duplicates an existing component (featured card, divider, badge, rating, callout).
- [ ] Images are real assets or token-based placeholders in `wa-frame` with meaningful `alt`; no broken `src`.
- [ ] Real headings, labels on icon-only controls, no element with two `style` attributes.

Then walk the [Polish checklist](references/composition.md#polish-checklist) for visual quality (spacing
rhythm, hierarchy, surfaces) and, for full pages, the [`<wa-page>` checklist](references/layouts-page.md#wa-page-checklist).
If you can render the page, look at it: sticky regions not overlapping, secondary buttons readable on
colored bands, no mobile nav bleeding into desktop, nothing clipped.

---

## Starting points

Pick the one that matches your step 2 answer. Each is complete, on-brand, and responsive as written; copy
it, then re-theme with tokens. Free users: only the free themes (default, awesome, shoelace). Pro users may
swap in a Pro theme or palette (see theming).

- **Landing or marketing page (`<wa-page>`)** → the "landing page" canonical example in
  [layouts-page.md](references/layouts-page.md#canonical-example--landing-page). Nav in `slot="navigation"`
  once. Want header-bar nav on desktop with no sidebar? Use that file's header-on-desktop / drawer-on-mobile
  recipe instead.
- **App shell, docs, or dashboard (`<wa-page>` with a desktop sidebar)** → the "app/docs" canonical example in
  [layouts-page.md](references/layouts-page.md#canonical-example--appdocs-with-a-desktop-sidebar).
- **Greenfield, no decisions yet** → the opinionated default in [getting-started.md](references/getting-started.md).
- **Specific screens** (login card, settings, dashboard grid, hero) → [patterns.md](references/patterns.md).
- **A section, form, or widget (utilities only)**:

```html
<section class="wa-stack wa-gap-l contact-form">
  <h2>Contact us</h2>
  <wa-input label="Name"></wa-input>
  <wa-input label="Email" type="email"></wa-input>
  <wa-textarea label="Message"></wa-textarea>
  <div class="wa-cluster">
    <wa-button variant="brand">Send</wa-button>
    <wa-button appearance="plain">Cancel</wa-button>
  </div>
</section>

<style>
  .contact-form {
    max-width: 60ch;
  }
</style>
```

---

## References

Read the one that matches the job; each is self-contained.

- **[your-design-system.md](references/your-design-system.md):** Building a project's design system on Web Awesome. How to discover existing decisions, where customizations live, how to extend without forking, and a `DESIGN.md` template for teams. Read this in any existing project, and whenever asked to "match our design system."
- **[layouts-page.md](references/layouts-page.md):** Full-page layouts with `<wa-page>`: mental model, the nav rules, canonical examples, checklist, API summary. Read this for the full-page branch.
- **[layouts-inpage.md](references/layouts-inpage.md):** Sections, widgets, and embeds with layout utilities. Read this for the in-page branch.
- **[theming.md](references/theming.md):** Themes, palettes, light/dark, brand color, and customizing with `--wa-*` tokens.
- **[composition.md](references/composition.md):** Spacing rhythm, the layout-utility decision guide, companion utilities, typography, icons, images, surfaces, the Custom CSS playbook, styling components through parts, and the Polish checklist. Read this to make things look designed.
- **[principles.md](references/principles.md):** The design judgment behind the tokens: color discipline, depth, hierarchy, spacing, type, finishing moves, empty states. Read this when output looks correct but unrefined.
- **[patterns.md](references/patterns.md):** Ready-made recipes: app shell, landing page, login, settings, dashboard grid.
- **[getting-started.md](references/getting-started.md):** The opinionated default setup for greenfield work.
