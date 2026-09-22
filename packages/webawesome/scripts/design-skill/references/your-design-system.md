# Your design system on Web Awesome

Web Awesome is the foundation. A project's own design system is the **delta** on top of it: which theme
and palette it picked, which tokens it overrides, the house recipes it built from components, and the
conventions it settled on. Your job in an existing project is to find that delta, follow it, and extend it
in the same shape, so new work is indistinguishable from what the team already shipped.

This matters because the most common way agents break a design system isn't misusing a token; it's never
looking, then re-creating something the project already has. Reading the project first is cheaper than
any amount of correction afterwards.

**Contents**

- [1. Discover before you build](#1-discover-before-you-build)
- [2. Where customizations live](#2-where-customizations-live)
- [3. Extend without forking](#3-extend-without-forking)
- [4. Keep a DESIGN.md for agents](#4-keep-a-designmd-for-agents)
- [5. Optional guardrails](#5-optional-guardrails)
- [Anti-patterns](#anti-patterns)

---

## 1. Discover before you build

Spend the first minute of any task in an existing project answering these questions. Search the project
(excluding `node_modules`, `dist`, and build output) and note what you find before generating anything.

| Look for                                                         | Where                                                                          | What it tells you                                                                                                 |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `wa-theme-*`, `wa-palette-*`, `wa-brand-*`, `wa-light`/`wa-dark` | The class list on `<html>` (or the root layout template)                       | The chosen theme, palette, brand hue, and color scheme. Use them; don't add a second theme class.                 |
| `data-fa-kit-code` or `setKitCode(`                              | `<html>`, the loader `<script>`, or the entry module                           | Font Awesome Pro is wired up, so Pro icon families are available.                                                 |
| Declarations of `--wa-*` (not `var(--wa-*)` uses)                | CSS files; the one with the most declarations is the theme layer               | The project's token overrides: brand colors, fonts, radius and space scales. **Add to this file, don't compete.** |
| Classes that appear on many pages                                | Shared stylesheets, layout templates                                           | House recipes (`.page-section`, `.stat-card`, `.form-grid`). Reuse them before writing a new class.               |
| Wrapper components and custom elements                           | A components directory; imports of `@awesome.me/webawesome`; a `<my-*>` prefix | The project's component vocabulary. Prefer a wrapper to the raw `<wa-*>` when the project uses one.               |
| How existing pages do it                                         | Two or three representative pages                                              | `<wa-page>` or not, where nav lives, which `variant`/`appearance` marks primary and secondary actions.            |
| A design brief for agents                                        | `DESIGN.md`, a design section in `AGENTS.md`/`CLAUDE.md`, editor rules files   | The team's stated decisions and do/don't list. This outranks everything in this skill.                            |
| How Web Awesome is loaded                                        | `package.json`, the entry HTML, or the loader script                           | npm (import components explicitly) vs. CDN loader (autoloads). Match it when you add a component.                 |

Precedence when sources disagree: **the design brief > existing code > this skill's defaults > your own
taste.** If the project contradicts a rule in this skill (say, it deliberately uses `appearance="outlined"`
for secondary actions), follow the project and keep the pattern consistent.

If you find nothing (a greenfield project), use the defaults in [getting-started.md](getting-started.md)
and, if the work is more than a one-off, set up the layers below so the next task has something to find.

---

## 2. Where customizations live

Web Awesome customizations stack in layers. Each decision belongs in exactly one of them. If the brand
color is set in three places, it is effectively set in none, because the next change updates two.

1. **Theme, palette, and brand classes on `<html>`.** Pick from what ships (`wa-theme-default`,
   `wa-palette-bright`, `wa-brand-green`, …). This is the cheapest re-brand there is; see
   [theming.md](theming.md).
2. **One theme layer: a stylesheet that overrides `--wa-*` tokens.** Scope it the way the library does so
   it applies in both color schemes and inside `wa-invert` sections:

   ```css
   /* theme.css: the project's only place for --wa-* overrides */
   :where(:root),
   .wa-light,
   .wa-dark,
   .wa-invert {
     --wa-font-family-body: 'Inter', system-ui, sans-serif;
     --wa-font-family-heading: 'Inter', system-ui, sans-serif;
     --wa-border-radius-scale: 1.25;
   }

   /* Light-scheme-only values */
   :where(:root),
   .wa-light,
   .wa-dark .wa-invert {
     --wa-color-brand-fill-loud: #4f46e5;
     --wa-color-brand-on-loud: #ffffff;
   }

   /* Dark-scheme-only values */
   .wa-dark,
   .wa-invert {
     --wa-color-brand-fill-loud: #818cf8;
     --wa-color-brand-on-loud: #1e1b4b;
   }
   ```

   Brand tokens are the one place a hex literal is allowed; everything downstream references the token.
   A brand hue that already exists in the palette is simpler still: `wa-brand-indigo` on `<html>` and no
   overrides at all.

3. **Project tokens, for new concepts only.** A token the system doesn't have (`--app-content-measure:
65ch`, `--app-sidebar-width: 16rem`) is fine. A new name for an existing token is not:

   ```css
   /* Incorrect: a parallel vocabulary that stops following the theme */
   --brand-primary: #4f46e5;
   --spacing-md: 16px;

   /* Correct: extend the vocabulary only where Web Awesome has no word for it */
   --app-content-measure: 65ch;
   ```

4. **House recipes: named classes and compositions built from components and tokens.** This is where
   most of a project's design system lives (see the next section).
5. **Per-instance tweaks through the component's styling API** (attributes, its tokens, `::part()`).
   Last resort, and only after reading that component's reference.

---

## 3. Extend without forking

The test for any extension: **could the theme change underneath it and it would still look right?** If
the answer is yes, it's built on the system. If it carries its own colors, spacing, or structure, it's a
fork.

**A house component is a composition, not a new element.** Start from the closest `<wa-*>`, name the
composition, and express the difference through tokens and the component's API:

```html
<wa-card class="stat-card" appearance="filled">
  <div class="wa-stack wa-gap-xs">
    <span class="wa-caption-m">Monthly revenue</span>
    <strong class="wa-heading-l">$48,200</strong>
    <wa-badge variant="success">+12%</wa-badge>
  </div>
</wa-card>

<style>
  .stat-card::part(body) {
    padding: var(--wa-space-l);
  }
</style>
```

Everything here re-themes: the card's surface, the badge's color, the type scale, and the spacing all
resolve through tokens, and the layout inside is a utility, not hand-rolled flex. (Check the card reference before using a part; `body` is documented for
`<wa-card>`, but part names differ per component.)

**A house variant of an existing component** is a class that reaches the documented part, never a copy of
the component's CSS:

```css
/* A hero call-to-action: pill shape, extra horizontal padding, still a normal wa-button */
wa-button.hero::part(button) {
  border-radius: var(--wa-border-radius-pill);
  padding-inline: var(--wa-space-2xl);
}
```

Keep using `variant`, `appearance`, and `size` for what they cover; the class carries only what the
attributes can't.

**A new semantic color role** (say, "info" alongside brand, success, warning, danger) is rare. If a
project truly needs one, define it in the theme layer with the same `fill-*` / `border-*` / `on-*` shape
the built-in roles use, in both color schemes, so the `*-on-*` contrast pairing still works. Prefer
reusing an existing role first; `neutral` covers most "informational" cases.

**A new custom element** is justified only when composition and a class can't express the behavior (not
the look). When you build one: use the project's own prefix (never `wa-`), consume `--wa-*` tokens inside
it, and document its parts, custom properties, and attributes the way Web Awesome does, so it has a
styling API instead of becoming the one thing nobody can re-theme.

**Framework wrappers stay thin.** A React or Vue wrapper around a `<wa-*>` should pass attributes, slots,
and events through. A wrapper that accepts only `color="blue"` hides the styling API and forces the next
person to fork.

---

## 4. Keep a DESIGN.md for agents

Teams that get consistent output keep a short, current brief that agents read first. What makes it work is
not the token list (agents can read the theme layer) but the **vocabulary and usage guidance**: what the
house recipes are called, what they're for, and where they live. Briefs that list only tokens lead agents
to re-create components that already exist.

Copy this template into the project root (or the design section of `AGENTS.md`/`CLAUDE.md`) and keep it
to one screen. It describes the delta, so it should stay short.

```markdown
# Design system: <Project name>

**Foundation.** Web Awesome <version>, loaded via <npm | CDN loader>. Theme `wa-theme-<x>`, palette
`wa-palette-<x>`, brand `wa-brand-<hue>` (or overridden in the theme layer), default scheme `wa-light`
with a toggle. Font Awesome Pro kit: <yes/no>.

**Theme layer.** All `--wa-*` overrides live in `<path/to/theme.css>`. Add there; never override tokens
elsewhere.

**Layout.** Full pages use `<wa-page>` with nav in `slot="navigation"` (<or: header nav via the
header/drawer recipe>). Content measure is `--app-content-measure`. Sections use `wa-stack` /
`wa-grid`; no hand-rolled flex or grid.

**Vocabulary.** Reuse these before building anything new.

| Name                | Built from                      | Use for                         | Defined in              |
| ------------------- | ------------------------------- | ------------------------------- | ----------------------- |
| `.stat-card`        | `<wa-card appearance="filled">` | KPI tiles on dashboards         | `styles/components.css` |
| `.page-section`     | `<section>` + `wa-stack`        | Every full-bleed band on a page | `styles/layout.css`     |
| `<app-avatar-menu>` | `<wa-dropdown>` + `<wa-avatar>` | The account menu in headers     | `components/`           |

**Conventions.** Primary action: `variant="brand"`, one per view. Secondary: `appearance="plain"`.
Destructive: `variant="danger"` behind a `<wa-dialog>` confirmation. Icons: `<wa-icon>` from Font
Awesome <family>. Forms: `<wa-input>` with `label` and `hint`, submit row in a `wa-cluster`.

**Don't.** <Project-specific, each with the replacement, e.g. "Don't use `<wa-callout>` for save
feedback; use `<wa-toast>`.">

**Verify.** <Lint or check command, if any.>
```

Update it when a recipe is added or a convention changes. A brief that describes last quarter's system is
worse than none, because agents will trust it.

---

## 5. Optional guardrails

Instructions are advisory; a check that runs on every change is not. If the project has a lint or hook
step, the search patterns in the main skill's "Verify before you finish" table are designed to be run
mechanically: hex and `px` literals outside the theme layer, self-closed custom elements, `wa-*` host
rules that set `background`/`color`/`border`, and `slot="main"` on a `<wa-page>` child. A stylelint rule
or a small script that fails on those catches the drift that reviews miss, and lets the brief stay short.

---

## Anti-patterns

| Instead of…                                                         | Do this                                                                           | Why                                                                       |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Building a component the project already has a class or wrapper for | Search first (section 1) and reuse the house recipe                               | Duplicates drift apart on the next change and double the maintenance.     |
| A second token vocabulary (`--brand-primary`, `--spacing-md`)       | `wa-brand-*` or brand-token overrides in the theme layer; `--wa-space-*` directly | Parallel tokens stop following the theme, dark mode, and scale knobs.     |
| Token overrides scattered across page stylesheets                   | One theme layer, scoped as in section 2                                           | One place per decision; scattered overrides fight each other.             |
| Copying a component's CSS to "customize" it                         | Its attributes, its `--wa-*` properties, or `::part()`                            | Copies freeze at one version and one theme.                               |
| A wrapper that hides the Web Awesome API                            | Pass attributes, slots, and events through                                        | Hidden APIs force the next customization to fork.                         |
| A `wa-`-prefixed custom element of your own                         | The project's own prefix                                                          | `wa-` is the library's namespace; a collision breaks on the next release. |
| A design brief that lists only tokens                               | Vocabulary, usage, conventions, and don'ts (section 4)                            | Token-only briefs lead agents to re-create existing components.           |
| Following this skill's defaults over the project's conventions      | Project conventions win; note the deviation if it looks like a mistake            | Consistency with shipped work is the design system.                       |
