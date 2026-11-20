---
name: webawesome-design
description: >
  Design workflow for building UI with Web Awesome: full pages with wa-page, sections and forms with
  layout utilities (wa-stack, wa-grid, wa-cluster), themes, palettes, brand color, and --wa-* tokens. Use
  it whenever you build, restyle, or polish a page, screen, layout, or widget in a project that uses Web
  Awesome (wa-* elements or @awesome.me/webawesome), even if the user never names the library. Typical
  requests: "build a landing page", "make an app layout", "lay out a dashboard", "build a settings page",
  "add a sidebar", "style this", "make it look good", "apply a theme", "add dark mode", "match our brand
  color", "use our design system". Use alongside the webawesome skill, which documents individual
  component APIs.
license: MIT / Commercial (for Web Awesome Pro)
metadata:
  author: Web Awesome
  homepage: https://webawesome.com
compatibility: Works in modern browsers. Requires no build tools when using the CDN. Works with bundlers like Webpack and Vite when installed via npm.
---

# Designing with Web Awesome

Web Awesome is a complete design system: components, layout utilities, tokens, themes, and a documented
styling API for every component. Teams build **their** design system on top of it, so your job is to (1)
find what the project already decided, (2) build with the system rather than around it, and (3) verify
before you finish. The system gives you theming, dark mode, accessibility, and consistency; every
hand-rolled `<div>` or raw `px` value gives one of those back.

For the API of any single component (attributes, slots, parts, tokens), read the companion `webawesome`
skill (`references/components/<name>.md`). If that skill isn't installed, read
`node_modules/@awesome.me/webawesome/dist/skills/webawesome/references/components/<name>.md` or
`https://webawesome.com/docs/components/<name>`. This file is a workflow plus the short list of things that
go wrong most often. Detail lives in `references/`, linked where you need it.

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

Precedence: **project conventions > this skill's defaults > your own taste.** On a greenfield project,
use the defaults in [getting-started.md](references/getting-started.md). How to search a project, where
customizations belong, and how to extend without forking: [your-design-system.md](references/your-design-system.md).

### 2. Pick the layout branch

Answer one question before any markup: **am I building a whole page, or a piece of one?**

- **A full page, app shell, or site layout (you own the viewport)** → use `<wa-page>`. It provides the
  grid, sticky regions, and a responsive nav drawer. Nav goes in `slot="navigation"` once; the component
  shows it as a desktop sidebar and moves it into a mobile drawer, so don't add a `<wa-drawer>`, toggle
  script, or nav media queries. Header links on desktop are the one shape that writes nav twice; follow that recipe
  in [layouts-page.md](references/layouts-page.md) as written.
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
   quote mark, or star is `<wa-icon>` or `<wa-rating>`; an activity feed or order history is
   `<wa-timeline>`; a thumbnail gallery that opens full-screen is `<wa-lightbox>`. Unsure which component
   fits? The `webawesome` skill's `choosing-components.md` is a decision tree by intent.
3. **A layout utility.** `wa-stack`, `wa-cluster`, `wa-grid`, `wa-flank`, `wa-split`, `wa-frame`, plus the
   companion utilities (`wa-gap-*`, `wa-align-items-*`, `wa-text-*`, `wa-color-text-*`) before any
   hand-written flexbox or grid. (Modifiers like `wa-frame:landscape` and `wa-flank:end` are real syntax.)
4. **A token.** Every color, space, radius, font size, shadow, and transition comes from `--wa-*`. No hex,
   `px`, or stray `rem`. Reference tokens directly; don't re-alias them into your own names.
5. **The component's styling API.** To make a component look different: its attributes (`variant`,
   `appearance`, `size` on the `xs` `s` `m` `l` `xl` scale, `pill`) → its own custom properties → the part
   its reference names. Look the component up first; you cannot guess parts, tokens, or how a `variant`
   resolves to colors.
6. **Extend.** Only when the system genuinely doesn't cover the need, write a small amount of custom CSS
   built on tokens, following the [Custom CSS playbook](references/composition.md#custom-css). Extending
   the system a little is fine; replacing it or building a parallel design language is not.

### 4. Verify before you finish

Run the checks in [Verify before you finish](#verify-before-you-finish). Agents reliably state these rules
and then break them in a long file; an explicit pass is what catches it.

---

## What is fixed, and what is yours to decide

- **Fixed:** token names and scales, components and their styling API, `<wa-page>` slots, the project's
  conventions.
- **Yours:** composition and hierarchy, which recipe fits, where on the scale a gap belongs, copy, and how
  bold to be with color. Read [principles.md](references/principles.md) when output is correct but unrefined.

---

## The rules that matter most

Each row names the mistake, the replacement, and why it matters. The "why" is there so you can apply the
rule to cases the table doesn't list.

| Instead of…                                                                 | Do this                                                                                                | Why                                                                                                 |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| A self-closed custom element                                                | `<wa-input></wa-input>`                                                                                | Custom elements never self-close; the parser swallows everything after the slash.                   |
| Hex, `px`, or `rem` literals                                                | `--wa-color-*`, `--wa-space-*`, `--wa-border-radius-*`, `--wa-font-size-*`; `wa-gap-*` classes         | Literals ignore the theme, dark mode, and `--wa-*-scale` knobs. Only allowed hex: a brand override. |
| Hand-written flex or grid with literal gaps                                 | `wa-stack`, `wa-cluster`, `wa-grid`, `wa-flank`, `wa-split` + `wa-gap-*`                               | Utilities carry the spacing scale and sensible defaults; ad-hoc flex drifts from them.              |
| `style="…"` repeated across elements                                        | A named class in a `<style>` block, reused                                                             | Inline styles can't be reused or re-themed. Inline is for one-off custom-property values only.      |
| Palette tints (`--wa-color-blue-50`) in custom CSS                          | Semantic tokens (`--wa-color-brand-fill-loud`, `--wa-color-surface-raised`, `--wa-color-text-quiet`)   | Semantic tokens re-resolve for `wa-dark` and re-branding; palette tints are frozen.                 |
| Text color guessed on a filled background                                   | The matching `*-on-*` token (`fill-loud` ↔ `on-loud`, `fill-quiet` ↔ `on-quiet`)                     | Built-in palettes tune these pairs for WCAG contrast; mixing steps produces dark-on-dark text.      |
| Visual CSS on a `<wa-*>` host by guesswork, or `::part(base)`               | Attributes → its custom properties → the part its reference names (`button`, `input-wrapper`)          | Most surfaces live in shadow DOM; only some components document host styling. `base` is deprecated. |
| Long-form size names on `size` or `wa-size-*`                               | `size` from `xs` `s` `m` `l` `xl`; `wa-size-xs` … `wa-size-xl`                                         | The scale matches token suffixes like `--wa-space-s`; long-form names are deprecated since 3.6.     |
| Styling a component from memory                                             | Open `references/components/<name>.md` in the `webawesome` skill first                                 | Parts, custom properties, and `variant`→token mappings differ per component and can't be guessed.   |
| An outlined or plain button in the band's own hue                           | A filled/neutral button, or recolor `::part(button)` to the band's `*-on-*` token                      | Same hue as the band makes the label and border effectively invisible.                              |
| Emojis as icons, bullets, logos, or placeholder text                        | `<wa-icon name="…">` (Font Awesome Free; Pro families with a kit code)                                 | Emojis render inconsistently and ignore color, size, and weight. See composition.md § Icons.        |
| A page with no theme classes                                                | `<html class="wa-theme-default wa-palette-default wa-light">` (or the project's own)                   | Unthemed output looks unstyled and defeats every token below it.                                    |
| The same nav links in `header` **and** `slot="navigation"` on a `<wa-page>` | One `slot="navigation"`, or the header-on-desktop / drawer-on-mobile recipe with each copy view-scoped | `navigation` already renders in both views; an extra copy shows twice on desktop.                   |
| A fixed `--menu-width` with the desktop sidebar hidden                      | Leave `--menu-width` at `auto`                                                                         | Hiding the sidebar part doesn't collapse the grid track; only `--menu-width` does.                  |
| `<wa-page>` default `main` padding under full-bleed sections                | `main { padding: 0 }` and let each section own its gutter                                              | The default padding insets hero and band backgrounds from the viewport edge.                        |
| A styled `<strong>` as a heading; an icon-only control with no name         | Real `<h2>`/`<h3>`; `label` on the `<wa-icon>` inside the control; meaningful `alt`                    | Screen readers and the document outline depend on real semantics.                                   |

**Host vs. part, the most visible failure.** Setting `background`, `border`, and `color` on a `wa-button`
host styles an outer box, not the button the user sees, so on a colored band its label and border stay
low-contrast. Reach the surface through its `button` part:

```css
.cta-band wa-button.secondary::part(button) {
  background-color: transparent;
  border-color: var(--wa-color-brand-on-loud);
  color: var(--wa-color-brand-on-loud);
}
```

Without opening a component's reference, only position it (`margin`, a layout utility) and set its width.
Everything visual goes through the documented API, and part names differ: `button` for `wa-button`,
`input-wrapper` for `wa-input` (`input` is the native element inside it), `textarea-wrapper` for
`wa-textarea`. A few components (`wa-card`, `wa-callout`, `wa-tag`, `wa-dropdown`) document host styling
instead; `wa-button` never does. `::part(base)` still resolves but is deprecated. Full treatment:
[composition.md § Styling components](references/composition.md#styling-components--css-parts).

---

## Verify before you finish

Do this every time: the mechanical searches first, then the checklist. If you can dispatch a subagent, ask
it to find violations in your files independently, then check each finding against these rules and fix.

**Searches.** Run this over the files you produced (replace `src/`). It prints every matching line; the
table lists the patterns in heredoc order. `grep -nE -f -` runs every pattern except 7 (emoji).

```sh
rg -n -f - src/ <<'EOF'
[[:space:]:(,]#[0-9a-fA-F]{3,8}\b
[0-9](px|rem)\b
<wa-[a-z0-9-]+[^>]*/>
::part\(base\)
(^|[[:space:]>+~(,])wa-[a-z][a-z0-9-]*(\.[A-Za-z0-9_-]+|\[[^]]*\]|:[a-z-]+(\([^)]*\))?)*[[:space:]]*\{
display:[[:space:]]*(flex|grid)\b
\p{Extended_Pictographic}
style=["']
slot=["']?(main|nav)["'[:space:]>]
(size=["']?|wa-size-)(small|medium|large)\b
EOF
```

| #   | Catches                           | A hit means                                                                                          |
| --- | --------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 1   | Hex colors                        | Use a token. Only a brand override in the theme layer keeps a hex.                                   |
| 2   | `px` or `rem` literals            | Use a token or `ch`. Exempt: `--menu-width`, `--aside-width`, `--min-column-size`, `--flank-size`.   |
| 3   | Self-closed custom elements       | Add the closing tag.                                                                                 |
| 4   | The deprecated `base` part        | Use the part the component's reference names.                                                        |
| 5   | A rule ending on a `wa-*` element | Visual properties go to attributes, custom properties, or a part, unless host styling is documented. |
| 6   | Hand-rolled flex or grid          | Use a layout utility unless it's a genuine gap.                                                      |
| 7   | Emojis                            | Use `<wa-icon>`.                                                                                     |
| 8   | Inline styles                     | Move to a class; keep only a one-off custom-property value inline.                                   |
| 9   | `slot="main"`, `slot="nav"`       | Neither slot exists; use the default slot and `navigation`.                                          |
| 10  | Long-form size names              | Use `xs`, `s`, `m`, `l`, `xl`.                                                                       |

A rule 5 hit that sets only custom properties (`wa-page { --menu-width: … }`) or width is fine.

**Checklist.** Walk it line by line against your own output:

- [ ] Project conventions from step 1 are followed, and a theme and palette are set on `<html>`.
- [ ] Nav appears once on any `<wa-page>` (or is view-scoped per the header/drawer recipe); no hand-rolled drawer or toggle; `--menu-width` is `auto` whenever the desktop sidebar is hidden.
- [ ] Every styled `<wa-*>` was looked up, and every part, custom property, `variant`, and `appearance` you used appears in its reference.
- [ ] Every recolored component has readable text **and** border on its new background, and no outlined or plain button shares its band's hue.
- [ ] Nothing hand-built duplicates an existing component (featured card, divider, badge, rating, callout).
- [ ] Images are real assets or token-based placeholders in `wa-frame` with meaningful `alt`; no broken `src`.
- [ ] Real headings, a `label` on the icon in every icon-only control, one `<wa-page>` at the top level.

Then walk the [Polish checklist](references/composition.md#polish-checklist) for visual quality (spacing
rhythm, hierarchy, surfaces) and, for full pages, the [`<wa-page>` checklist](references/layouts-page.md#wa-page-checklist).
If you can render the page, look at it: sticky regions not overlapping, secondary buttons readable on
colored bands, no mobile nav bleeding into desktop, nothing clipped.

---

## Starting points

Pick the one that matches your step 2 answer, copy it, then re-theme with tokens. Free users have the free
themes (default, awesome, shoelace); Pro users may swap in a Pro theme or palette (see theming).

- **Landing or marketing page (`<wa-page>`)** → the
  [landing page recipe](references/patterns.md#marketing-landing-page-full-page-wa-page) in patterns.md:
  header nav on desktop, drawer on mobile, hero, features, CTA band, footer.
- **App shell, docs, or dashboard (`<wa-page>` with a desktop sidebar)** → the app/docs example in
  [layouts-page.md](references/layouts-page.md#canonical-example-appdocs-with-a-desktop-sidebar), or the
  [app shell recipe](references/patterns.md#app-shell-full-page-wa-page).
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
- **[layouts-page.md](references/layouts-page.md):** Full-page layouts with `<wa-page>`: mental model, how nav works, the two nav shapes, rules, checklist, API summary. Read this for the full-page branch.
- **[layouts-inpage.md](references/layouts-inpage.md):** Sections, widgets, and embeds with layout utilities. Read this for the in-page branch.
- **[theming.md](references/theming.md):** Themes, palettes, light/dark, brand color, and customizing with `--wa-*` tokens.
- **[composition.md](references/composition.md):** Spacing rhythm, the layout-utility decision guide, companion utilities, typography, icons, images, surfaces, the Custom CSS playbook, styling components through parts, and the Polish checklist. Read this to make things look designed.
- **[principles.md](references/principles.md):** The design judgment behind the tokens: color discipline, depth, hierarchy, spacing, type, finishing moves, empty states. Read this when output looks correct but unrefined.
- **[patterns.md](references/patterns.md):** Ready-made recipes: app shell, landing page (the canonical one), login, settings, dashboard grid.
- **[getting-started.md](references/getting-started.md):** The opinionated default setup for greenfield work.
