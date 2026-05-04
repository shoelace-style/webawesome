---
title: Migrating from Shoelace
description: A complete, component-by-component guide for moving from Shoelace 2.x to Web Awesome.
layout: page-outline
---

Web Awesome is the next major version of [Shoelace](https://shoelace.style). It keeps Shoelace's spirit (framework-agnostic web components, accessible by default, beautiful out of the box) and rebuilds it on a stronger foundation: native form association, cascade layers, OKLCH-based theming, a real utility CSS layer, and a much larger component catalog.

This guide is for developers with a working Shoelace 2.x project who want to upgrade. We assume you're comfortable with HTML, CSS, JavaScript, and custom elements.

If you're brand new to Web Awesome, the [Getting Started](/docs/) guide is a better starting point.

:::pro
Several Shoelace patterns (toast notifications, comboboxes, file inputs, charts) live in Web&nbsp;Awesome&nbsp;Pro. We mark these clearly with a <wa-badge appearance="accent" pill class="pro">Pro</wa-badge> badge. Pro is what funds continued open-source development of the core library.
:::

## TL;DR

If you take nothing else from this page, take this:

1. Replace the package: `@shoelace-style/shoelace` → `@awesome.me/webawesome`.
2. Replace every element prefix: `sl-` → `wa-`.
3. Replace every CSS variable prefix: `--sl-*` → `--wa-*`.
4. Replace every event prefix: `sl-` → `wa-` (e.g. `sl-show` → `wa-show`).
5. Replace `variant="primary"` → `variant="brand"`. Web Awesome no longer uses "primary".
6. Remove `outline`, `circle`, and (in some places) `text` button props. Use `appearance="outlined" | "filled" | "plain"` instead.
7. Inputs and similar controls: `prefix`/`suffix` slots → `start`/`end`. `help-text` → `hint`.
8. `<sl-menu>`/`<sl-menu-item>` → `<wa-dropdown>`/`<wa-dropdown-item>`. There is no standalone menu component.
9. `<sl-alert>` → `<wa-callout>` (for the static block). Toast UX is now in [`<wa-toast>`](#wa-toast-pro) <wa-badge appearance="accent" pill class="pro">Pro</wa-badge>.
10. `<sl-image-comparer>` → `<wa-comparison>`. `<sl-range>` → `<wa-slider>`.

The rest of this page is the explanation, the per-component diffs, and the new things you get.

## Let an AI agent do most of the work

A coding agent (Claude Code, Cursor, GitHub Copilot, etc.) can knock out most of this migration mechanically. Paste the prompt below into your agent of choice. It instructs the agent to read this guide, audit your codebase, and execute the migration one mechanical pass at a time with verification between passes. You stay in the loop for review and edge cases.

<wa-details summary="Show the migration prompt">

<pre><code>You are helping migrate a project from Shoelace 2.x to Web Awesome.

The authoritative migration guide lives at:
  https://webawesome.com/docs/resources/migrating-from-shoelace

The companion checklist (mirrors the same structure) is at:
  https://webawesome.com/docs/resources/migration-checklist

Before doing anything else, fetch the migration guide URL above and read it end to end. Do not rely on prior knowledge of Shoelace or Web Awesome APIs — both libraries have changed, and the guide is the source of truth. If you cannot fetch URLs, tell me and stop.

Operating instructions:

1. After reading the guide, summarize back to me in 3–5 bullets the conceptual shifts you'll be applying (cascade layers, native form association, variant/appearance system, prefix/suffix → start/end, help-text → hint, primary → brand). This confirms you have the page.
2. Run a quick audit of the codebase. Report:
   - Whether @shoelace-style/shoelace is in package.json
   - How Shoelace is currently loaded (autoloader, cherry-picked, CDN)
   - Approximate counts: sl-* element instances, --sl-* CSS vars, addEventListener('sl-...') strings, slot="prefix"/"suffix" instances, variant="primary" instances
   - Whether Bootstrap Icons or another library is in use
3. Propose a migration plan and wait for confirmation before changing files. Default to one mechanical pass per commit.
4. Execute passes in this order, committing after each one:
   a. Swap the npm package and update imports.
   b. Find-and-replace: sl- → wa-, --sl- → --wa-, sl-theme- → wa-theme-, 'sl- → 'wa- (and "sl- → "wa-) in JS event strings, Sl → Wa for TS event class imports.
   c. Per-component fixes: variant="primary" → variant="brand"; slot="prefix"/"suffix" → "start"/"end"; help-text → hint; clearable → with-clear; outline boolean → appearance="outlined"; remove circle (auto-detected); remove sl-alert .toast() usage (toast UX moved to Pro wa-toast); migrate sl-menu/sl-menu-item to wa-dropdown/wa-dropdown-item; sl-image-comparer → wa-comparison; sl-range → wa-slider.
   d. Theme tokens: replace --sl-color-primary-* → --wa-color-brand-*, spacing/font-size scale renames (small → s, x-small → xs, etc.), shadow consolidation, --sl-input-* → --wa-form-control-*. Note that color-scale numbers invert (Shoelace 50→950 light-to-dark, Web Awesome 95→05 light-to-dark).
   e. Forms: remove formdata-event-based serialization shims; verify every form control has a name attribute; update sl-invalid → wa-invalid.
5. After each pass, run the project's build/typecheck/lint and any tests. Report results before continuing.
6. Final sweep: grep for leftover sl-, --sl-, @shoelace-style/shoelace, and quoted 'sl-/"sl- patterns. Report any remaining matches.
7. Flag silent-breakage risks the user must verify manually:
   - Event listener strings (no error if outdated; just don't fire)
   - CSS ::part() selectors (parts may have been renamed)
   - Dark-mode class swap (sl-theme-dark → wa-dark)
   - Icons rendering correctly (default library changed from Bootstrap Icons to Font Awesome)

Constraints:

- Do not invent new behavior. If unsure how an API maps, look it up in the migration guide or ask.
- Do not introduce stylistic refactors. Stay surgical.
- Do not skip the verification steps. A pass is not done until the build passes.
- If the project uses sl-alert.toast() heavily, mention that wa-toast is part of Web Awesome Pro and ask before suggesting alternatives.

Begin with step 2 (the audit). Wait for my go-ahead before changing any files.
</code></pre>

</wa-details>

Prefer to do it by hand? The rest of this guide walks through every change in detail.

:::info
**Use the interactive checklist** or drop the markdown version into your repo to keep track of your progress. 

<div class="wa-cluster wa-gap-s">
  <wa-button variant="brand" appearance="accent" size="m" href="/docs/resources/migration-checklist">
    <wa-icon slot="start" name="list-check"></wa-icon>
    Open the interactive checklist
  </wa-button>
  <wa-button variant="brand" appearance="outlined" size="m" href="/assets/downloads/shoelace-migration-checklist.md" download="shoelace-migration-checklist.md">
    <wa-icon slot="start" name="download"></wa-icon>
    Download as Markdown
  </wa-button>
</div>
:::

## The conceptual shift

A few things are philosophically different. None of them require an architectural rewrite, but knowing them up front saves head-scratching later.

**One package, one prefix.** Shoelace's `@shoelace-style/shoelace` is now `@awesome.me/webawesome`. Every element, every CSS variable, every event, every utility class uses the `wa-` prefix.

**Cascade layers everywhere.** All component styles are wrapped in `@layer wa-component`. This means your unlayered application CSS automatically wins specificity ties, so you no longer need `!important` to override component internals. Web Awesome's own layers are: `wa-theme`, `wa-color-palette`, `wa-color-variant`, `wa-utilities`, `wa-component` (in that order of strength).

**ElementInternals, not formdata shims.** Web Awesome form controls are real form-associated custom elements. They participate in `<form>` natively, expose `validity`/`validationMessage` on `ElementInternals`, and survive form reset and state restoration without the `formdata` event polyfill Shoelace used.

**Three themes, not one.** Web Awesome ships `default`, `awesome`, and a `shoelace` theme designed to ease migration. Apply `class="wa-theme-shoelace"` to `<html>` and you'll get familiar palette and typography. (Even more themes are available in Web Awesome Pro.) Light/dark is class-based: `wa-light` / `wa-dark`, with `wa-invert` to flip a subtree.

**Native HTML can be themed too.** A separate `dist/styles/native.css` stylesheet themes native elements such as `<button>`, `<input>`, `<table>`, `<details>`, `<dialog>`, headings, lists, blockquotes, etc., using the same design tokens as your Web Awesome theme. This is opt-in. (Shoelace had no equivalent.)

**A real utility layer.** Web Awesome ships layout primitives (`wa-cluster`, `wa-stack`, `wa-grid`, `wa-frame`, `wa-flank`, `wa-split`), spacing (`wa-gap-*`), alignment, sizing, typography (`wa-body`, `wa-heading`, `wa-caption`, `wa-longform`), and a11y helpers (`wa-visually-hidden`) as plain CSS classes. No JS, no components.

**Font Awesome is the default icon library.** Shoelace defaulted to Bootstrap Icons; Web Awesome defaults to Font Awesome's free catalog and offers first-class Pro/Pro+ kit support via `setKitCode()`. You can still register any custom icon library you want.

**Some components grew into siblings.** What was one component in Shoelace is sometimes two in Web Awesome. For example, `<sl-input type="number">` still works, but `<wa-number-input>` is a dedicated, stepper-equipped numeric control. Tree, dropdown, and select have similar splits.

## Step 1: Install Web Awesome

Remove Shoelace and add Web Awesome.

```diff
- npm uninstall @shoelace-style/shoelace
+ npm install @awesome.me/webawesome
```

Then update your imports.

```diff
- import '@shoelace-style/shoelace/dist/themes/light.css';
- import '@shoelace-style/shoelace/dist/shoelace-autoloader.js';
+ import '@awesome.me/webawesome/dist/styles/webawesome.css';
+ import '@awesome.me/webawesome/dist/webawesome.loader.js';
```

Or, with a CDN:

```diff
- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2/cdn/themes/light.css" />
- <script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2/cdn/shoelace-autoloader.js"></script>
+ <link rel="stylesheet" href="https://early.webawesome.com/webawesome@3/dist/styles/webawesome.css" />
+ <script type="module" src="https://early.webawesome.com/webawesome@3/dist/webawesome.loader.js"></script>
```

Cherry-picking individual components works the same way. Just point at `@awesome.me/webawesome/dist/components/*/...` instead of `@shoelace-style/shoelace/dist/components/*/...`.

If you used `setBasePath()`, the import location moves but the API is unchanged:

```diff
- import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
+ import { setBasePath } from '@awesome.me/webawesome/dist/webawesome.js';
  setBasePath('/path/to/assets');
```

:::info
**Tip.** If you want a soft landing, apply the Shoelace-compatible theme first: `<html class="wa-theme-shoelace wa-light">`. It lines up palette and typography close to Shoelace's defaults so you can focus on markup changes without wrestling with unfamiliar styles.
:::

## Step 2: Global find-and-replace

Most of the migration is mechanical text replacement. Here are the patterns we recommend running against your codebase, in order. Most editors support regex find-and-replace across the project; commit between each pass.

### Required global replacements

| Find | Replace | Where |
|---|---|---|
| `@shoelace-style/shoelace` | `@awesome.me/webawesome` | Imports |
| `<sl-` | `<wa-` | Templates / HTML |
| `</sl-` | `</wa-` | Templates / HTML |
| `--sl-` | `--wa-` | CSS files, inline styles |
| `sl-theme-` | `wa-theme-` | Class names |
| `'sl-` (event names) | `'wa-` | JS event listeners (see warning below) |
| `"sl-` (event names) | `"wa-` | JS event listeners (see warning below) |
| `Sl` (event-class prefix) | `Wa` | TypeScript imports of event classes |

:::warning
**Silent breakage warning.** Event listener strings are the highest-risk change. If you wrote `el.addEventListener('sl-show', …)` and forget to update it, nothing throws. The listener simply never fires. Grep your codebase for `'sl-` and `"sl-` after migration and confirm zero results.
:::

### Recommended one-time tweaks

| Find | Replace | Notes |
|---|---|---|
| `variant="primary"` | `variant="brand"` | Shoelace's "primary" is now "brand". Affects buttons, badges, alerts, tags, etc. |
| `class="sl-theme-light"` | `class="wa-light"` | Light scheme is its own class |
| `class="sl-theme-dark"` | `class="wa-dark"` | Dark scheme is its own class |
| `slot="prefix"` | `slot="start"` | Inputs, buttons, selects, breadcrumb-item, etc. |
| `slot="suffix"` | `slot="end"` | Same as above |
| `help-text=` / `slot="help-text"` | `hint=` / `slot="hint"` | Form controls renamed help-text to hint |

The full per-component breakdown is below. These patterns just cover the high-volume ones.

## Step 3: Component changes

Components below are grouped by the kind of change. **If a component isn't listed here, it migrated cleanly with just the `sl-`→`wa-` rename.** That covers the majority of components: avatar, breadcrumb, breadcrumb-item, card, checkbox, copy-button, details, divider, format-bytes, format-date, format-number, icon, include, mutation-observer, popup, progress-bar, progress-ring, qr-code, radio, radio-group, rating, relative-time, resize-observer, skeleton, spinner, split-panel, switch, tab, tab-group, tab-panel, textarea, tooltip, tree, tree-item.

### Renamed elements

| Shoelace | Web Awesome | Notes |
|---|---|---|
| `<sl-alert>` | `<wa-callout>` | Static inline alert. Toast behavior moved (see [Toasts](#toasts)). |
| `<sl-image-comparer>` | `<wa-comparison>` | Same idea, simpler API. |
| `<sl-range>` | `<wa-slider>` | Adds multi-thumb range support via the `range` attribute. |
| `<sl-menu>` + `<sl-menu-item>` | `<wa-dropdown>` + `<wa-dropdown-item>` | The standalone menu is gone. Menus only live inside dropdowns. |
| `<sl-menu-label>` | _(removed)_ | Use `<wa-divider>` and a heading element, or restructure as nested dropdown items. |

### Removed elements

| Shoelace | Replacement |
|---|---|
| `<sl-icon-button>` | Use `<wa-button>` with a single `<wa-icon>` child. The button automatically gets a `:state(icon-button)` and renders compact, icon-only styles. |
| `<sl-radio-button>` | Use `<wa-button-group>` containing `<wa-radio>` controls, or a `<wa-radio-group>` styled as buttons. There is no dedicated radio-button component. |
| `<sl-visually-hidden>` | Use the `wa-visually-hidden` utility class on any element. |

### New free components

These are entirely new in Web Awesome (free, MIT-licensed). We mention them here because they often replace patterns that previously required custom code on top of Shoelace.

- **`<wa-callout>`:** replaces most uses of `<sl-alert>` for inline messaging.
- **`<wa-comparison>`:** image before/after slider (replaces `<sl-image-comparer>`).
- **`<wa-popover>`:** anchored, persistent popover content (separate from `<wa-tooltip>` and `<wa-dropdown>`). Useful for help bubbles, in-context callouts, and feature spotlights.
- **`<wa-page>`:** application shell with header, sidebar, main, and footer slots, including a built-in mobile navigation drawer.
- **`<wa-scroller>`:** overflow container with scroll affordances (shadows, fade edges, optional scroll buttons).
- **`<wa-zoomable-frame>`:** zoomable, pannable iframe wrapper.
- **`<wa-number-input>`:** dedicated numeric input with stepper buttons, separate from `<wa-input>`.
- **`<wa-markdown>`:** renders Markdown in the browser (experimental).
- **`<wa-intersection-observer>`:** observer primitive exposed as a component, alongside the existing mutation/resize observers.

### New Pro components

These cover patterns Shoelace users frequently built themselves or stitched together with third-party libraries. They live in [`@awesome.me/webawesome-pro`](/docs/pro):

- **`<wa-toast>` and `<wa-toast-item>`:** toast notification stack. Replaces the `sl-alert.toast()` pattern.
- **`<wa-combobox>`:** combobox or autocomplete with multiselect, async loading, and tag rendering.
- **`<wa-file-input>`:** drag-and-drop file input with previews and validation.
- **`<wa-chart>` and seven typed chart subclasses:** `<wa-bar-chart>`, `<wa-line-chart>`, `<wa-pie-chart>`, `<wa-doughnut-chart>`, `<wa-bubble-chart>`, `<wa-scatter-chart>`, `<wa-radar-chart>`, `<wa-polar-area-chart>`. Built on Chart.js, themed with Web Awesome design tokens.
- **`<wa-sparkline>`:** small inline trend visualization.

### Per-component changes

The sections below cover only components whose API changed beyond the `sl-` to `wa-` rename. Components not listed here migrated cleanly.

#### wa-button (was sl-button)

`<wa-button>` does more than `<sl-button>` did. The visual modifiers consolidate into a single `appearance` attribute, and `circle` is gone (icon-only buttons are detected automatically).

```diff
- <sl-button variant="primary">Save</sl-button>
+ <wa-button variant="brand">Save</wa-button>

- <sl-button variant="default" outline>Cancel</sl-button>
+ <wa-button appearance="outlined">Cancel</wa-button>

- <sl-button variant="text">Learn more</sl-button>
+ <wa-button appearance="plain">Learn more</wa-button>

- <sl-button circle>
-   <sl-icon name="gear"></sl-icon>
- </sl-button>
+ <wa-button>
+   <wa-icon name="gear"></wa-icon>
+ </wa-button>
```

| Shoelace | Web Awesome | Change |
|---|---|---|
| `variant="default"` | (default) | Default is now `neutral`. Don't set anything for the equivalent. |
| `variant="primary"` | `variant="brand"` | Renamed |
| `variant="text"` | `appearance="plain"` | Visual treatment moved to `appearance` |
| `outline` (boolean) | `appearance="outlined"` | Replaced |
| `circle` (boolean) | _(removed)_ | A button with one `<wa-icon>` child auto-applies icon styling |
| slot `prefix` | slot `start` | Renamed |
| slot `suffix` | slot `end` | Renamed |
| event `sl-blur` | event `blur` | Native event, no prefix |
| event `sl-focus` | event `focus` | Native event, no prefix |
| event `sl-invalid` | event `wa-invalid` | Renamed |

**New in `<wa-button>`:** `with-caret` (replaces `caret` for clarity), full SSR support via `with-start` / `with-end`, `appearance="filled"` and `appearance="filled-outlined"`, and CSS custom states (`:state(disabled)`, `:state(loading)`, `:state(link)`, `:state(icon-button)`).

#### wa-input (was sl-input)

The biggest change is that "help text" is now "hint" and `prefix`/`suffix` slots are now `start`/`end`. Type-specific behavior also splits: for numeric inputs, prefer the new `<wa-number-input>`.

```diff
- <sl-input
-   label="Username"
-   help-text="Choose something memorable"
-   clearable
- >
-   <sl-icon slot="prefix" name="user"></sl-icon>
- </sl-input>
+ <wa-input
+   label="Username"
+   hint="Choose something memorable"
+   with-clear
+ >
+   <wa-icon slot="start" name="user"></wa-icon>
+ </wa-input>
```

| Shoelace | Web Awesome | Change |
|---|---|---|
| attr `help-text` | attr `hint` | Renamed |
| slot `help-text` | slot `hint` | Renamed |
| slot `prefix` | slot `start` | Renamed |
| slot `suffix` | slot `end` | Renamed |
| attr `clearable` | attr `with-clear` | Renamed |
| attr `filled` (boolean) | `appearance="filled"` | Replaced |
| event `sl-clear` | _(removed)_ | Listen for `input` after clear, or `wa-clear` if you needed to handle the click specifically. Most apps don't need this; use `input`. |
| event `sl-blur` | event `blur` | Native event |
| event `sl-focus` | event `focus` | Native event |
| event `sl-change` | event `change` | Native event |
| event `sl-input` | event `input` | Native event |
| event `sl-invalid` | event `wa-invalid` | Renamed |
| method `getForm()` | property `form` | Now a property that returns the associated `HTMLFormElement` |
| method `checkValidity()` | _(use `internals.checkValidity()`)_ | Browser native validation. Call it on the element, which is now form-associated |
| method `reportValidity()` | _(use native)_ | Same as above |

**Numeric inputs:** `<sl-input type="number">` still works as `<wa-input type="number">`, but for a richer numeric experience (clear stepper buttons, `beforeinput` cancellation, locale-aware formatting) prefer `<wa-number-input>`.

#### wa-textarea (was sl-textarea)

Same renames as `<wa-input>`: `help-text` → `hint`, `prefix`/`suffix` → `start`/`end`, native event names, `wa-invalid`. No other API differences.

#### wa-select (was sl-select)

```diff
- <sl-select label="Color" help-text="Pick one">
-   <sl-option value="red">Red</sl-option>
-   <sl-option value="green">Green</sl-option>
- </sl-select>
+ <wa-select label="Color" hint="Pick one">
+   <wa-option value="red">Red</wa-option>
+   <wa-option value="green">Green</wa-option>
+ </wa-select>
```

| Shoelace | Web Awesome | Change |
|---|---|---|
| attr `help-text` | attr `hint` | Renamed |
| slot `help-text` | slot `hint` | Renamed |
| slot `prefix` | slot `start` | Renamed |
| slot `suffix` | slot `end` | Renamed |
| attr `clearable` | attr `with-clear` | Renamed |
| attr `filled` | `appearance="filled"` | Replaced |
| events `sl-*` | events `wa-*` (custom) or native | Same pattern as input |

If you need autocomplete, async option loading, multiselect with tags, or remote search, see [`<wa-combobox>`](#wa-combobox-pro) <wa-badge appearance="accent" pill class="pro">Pro</wa-badge>.

#### wa-checkbox, wa-radio, wa-radio-group, wa-switch

Same pattern as the other form controls:

- `help-text` → `hint`
- `sl-blur` / `sl-focus` / `sl-change` → native `blur` / `focus` / `change`
- `sl-invalid` → `wa-invalid`
- All controls are now form-associated custom elements. They work natively inside `<form>` with no shim.

`<sl-radio-button>` (the visually-styled-as-button radio) has been removed. Use a `<wa-button-group>` of `<wa-radio>` controls if you need the look.

#### wa-slider (was sl-range)

Renamed and gained range (multi-thumb) support.

```diff
- <sl-range label="Volume" min="0" max="100"></sl-range>
+ <wa-slider label="Volume" min="0" max="100"></wa-slider>

  <!-- New: range mode -->
+ <wa-slider label="Price" min="0" max="1000" range
+   min-value="100" max-value="500"></wa-slider>
```

| Shoelace | Web Awesome | Change |
|---|---|---|
| element `<sl-range>` | element `<wa-slider>` | Renamed |
| attr `help-text` | attr `hint` | Renamed |
| attr `tooltip` | attr `with-tooltip` (boolean) + `tooltip-placement` + `tooltip-distance` | Split |
| _(none)_ | attr `range` | New: enables two-thumb range selection |
| _(none)_ | attr `with-markers` | New: draws step markers along the track |

#### wa-callout (replaces sl-alert for inline use)

`<sl-alert>` was both a static inline alert *and* a toast notification system. Web Awesome splits these:

- **Static inline messages** → `<wa-callout>` (free)
- **Toasts** → [`<wa-toast>`](#wa-toast-pro) <wa-badge appearance="accent" pill class="pro">Pro</wa-badge>

```diff
- <sl-alert variant="warning" open>
-   <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
-   Your session will expire in 5 minutes.
- </sl-alert>
+ <wa-callout variant="warning">
+   <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
+   Your session will expire in 5 minutes.
+ </wa-callout>
```

| Shoelace | Web Awesome | Change |
|---|---|---|
| `variant="primary"` | `variant="brand"` | Renamed |
| attr `open` | _(removed)_ | Callouts are always rendered. Hide them with your own conditional rendering. |
| attr `closable` | _(removed)_ | Add your own close button if needed. |
| attr `duration` | _(removed)_ | Static block, no auto-dismiss. Use `<wa-toast>` if you need that. |
| method `show()` / `hide()` | _(removed)_ | Use show/hide via your framework. |
| method `toast()` | _(use `<wa-toast>`)_ | Toast UX is in the Pro `<wa-toast>` component. |
| events `sl-show`/`sl-hide` | _(removed)_ | No open state on callouts. |

#### wa-dialog (was sl-dialog)

`<wa-dialog>` builds on the native `<dialog>` element. The slot and event names changed.

```diff
- <sl-dialog label="Confirm" open>
-   Are you sure?
-   <div slot="footer">
-     <sl-button variant="default">Cancel</sl-button>
-     <sl-button variant="primary">OK</sl-button>
-   </div>
- </sl-dialog>
+ <wa-dialog label="Confirm" open>
+   Are you sure?
+   <wa-button slot="footer">Cancel</wa-button>
+   <wa-button slot="footer" variant="brand">OK</wa-button>
+ </wa-dialog>
```

| Shoelace | Web Awesome | Change |
|---|---|---|
| event `sl-show` | event `wa-show` | Renamed |
| event `sl-after-show` | event `wa-after-show` | Renamed |
| event `sl-hide` | event `wa-hide` | Renamed |
| event `sl-after-hide` | event `wa-after-hide` | Renamed |
| event `sl-initial-focus` | event `wa-initial-focus` | Renamed |
| event `sl-request-close` | event `wa-hide` (cancellable) | Cancel `wa-hide` to keep the dialog open. The `event.detail.source` tells you whether it was the close button, overlay, or escape key. |
| `noHeader` attr | `without-header` attr | Renamed for consistency with other components |
| slot `header-actions` | slot `header-actions` | Unchanged |

`<wa-dialog>` exposes lifecycle methods on the element directly, but the attribute-based pattern (`open`/`!open`) is the recommended way to drive it.

#### wa-drawer (was sl-drawer)

Same event pattern as dialog (`sl-show` → `wa-show`, `sl-request-close` → cancellable `wa-hide`). Slot names are unchanged. `placement` is unchanged.

#### wa-dropdown and wa-dropdown-item (replaces sl-menu, sl-menu-item, and sl-dropdown)

This is the largest structural change in the migration. Shoelace had three components for this pattern:

- `<sl-dropdown>`: the floating container
- `<sl-menu>`: the menu (could be standalone)
- `<sl-menu-item>`: the items

Web Awesome collapses these into two:

- `<wa-dropdown>`: the floating container, holds items directly
- `<wa-dropdown-item>`: the items

```diff
- <sl-dropdown>
-   <sl-button slot="trigger" caret>Actions</sl-button>
-   <sl-menu>
-     <sl-menu-item>Edit</sl-menu-item>
-     <sl-menu-item>Duplicate</sl-menu-item>
-     <sl-divider></sl-divider>
-     <sl-menu-item>Delete</sl-menu-item>
-   </sl-menu>
- </sl-dropdown>
+ <wa-dropdown>
+   <wa-button slot="trigger" with-caret>Actions</wa-button>
+   <wa-dropdown-item>Edit</wa-dropdown-item>
+   <wa-dropdown-item>Duplicate</wa-dropdown-item>
+   <wa-divider></wa-divider>
+   <wa-dropdown-item>Delete</wa-dropdown-item>
+ </wa-dropdown>
```

If you used `<sl-menu>` standalone (not inside a dropdown, e.g., a static command palette), you'll need to assemble it yourself with `<wa-dropdown-item>` inside any container, or use a different pattern entirely. There is no standalone menu element.

| Shoelace | Web Awesome | Change |
|---|---|---|
| `<sl-menu>` | _(removed; use `<wa-dropdown>`)_ | No standalone menu |
| `<sl-menu-item>` | `<wa-dropdown-item>` | Renamed |
| `<sl-menu-label>` | _(removed)_ | Use `<wa-divider>` + heading, or nested dropdown items |
| event `sl-select` | event `wa-select` | Renamed |
| `caret` attr on trigger | `with-caret` attr on `<wa-button>` | Renamed |

#### wa-comparison (was sl-image-comparer)

```diff
- <sl-image-comparer position="50">
-   <img slot="before" src="before.jpg" />
-   <img slot="after" src="after.jpg" />
- </sl-image-comparer>
+ <wa-comparison position="50">
+   <img slot="before" src="before.jpg" />
+   <img slot="after" src="after.jpg" />
+ </wa-comparison>
```

The slot names (`before`, `after`, `handle`) and the `position` attribute are identical. Only the element name changes, plus the event prefix on `change` (now a native `change` event).

#### wa-tag (was sl-tag)

```diff
- <sl-tag variant="primary" pill removable>Featured</sl-tag>
+ <wa-tag variant="brand" pill with-remove>Featured</wa-tag>
```

| Shoelace | Web Awesome | Change |
|---|---|---|
| `variant="primary"` | `variant="brand"` | Renamed |
| attr `removable` | attr `with-remove` | Renamed |
| event `sl-remove` | event `wa-remove` | Renamed |

#### wa-tooltip (was sl-tooltip)

| Shoelace | Web Awesome | Change |
|---|---|---|
| attr `content` | attr `content` (or default slot for HTML) | Same |
| event `sl-show`/`sl-hide` etc. | event `wa-show`/`wa-hide` etc. | Renamed |
| `for` attribute on tooltip | `for` attribute on tooltip | Same. Points at element ID |

#### wa-tab-group, wa-tab, wa-tab-panel

Tabs use the same structure but the activation event renames and panel hookup is unchanged.

| Shoelace | Web Awesome | Change |
|---|---|---|
| `sl-tab-show` | `wa-tab-show` | Renamed |
| `sl-tab-hide` | `wa-tab-hide` | Renamed |
| `sl-close` (on closable tab) | `wa-close` | Renamed |

#### wa-color-picker (was sl-color-picker)

The format and value APIs are unchanged. Event prefix is the only change for most apps.

| Shoelace | Web Awesome | Change |
|---|---|---|
| event `sl-change`/`sl-input` | event `change`/`input` | Native events |
| event `sl-invalid` | event `wa-invalid` | Renamed |
| attr `help-text` | attr `hint` | Renamed |

#### wa-tree and wa-tree-item

| Shoelace | Web Awesome | Change |
|---|---|---|
| event `sl-selection-change` | event `wa-selection-change` | Renamed |
| event `sl-expand`/`sl-collapse` | event `wa-expand`/`wa-collapse` | Renamed |
| event `sl-after-expand` etc. | event `wa-after-expand` etc. | Renamed |
| event `sl-lazy-load` / `sl-lazy-change` | event `wa-lazy-load` / `wa-lazy-change` | Renamed |

The selection mode API (`single`/`multiple`/`leaf`) and item structure are otherwise unchanged.

#### wa-carousel and wa-carousel-item

`<wa-carousel>` is currently <wa-badge variant="warning">Experimental</wa-badge>. Event renames mirror the rest of the library:

| Shoelace | Web Awesome | Change |
|---|---|---|
| `sl-slide-change` | `wa-slide-change` | Renamed |

#### wa-animation (was sl-animation)

Web Animations API surface is unchanged. Event renames:

| Shoelace | Web Awesome | Change |
|---|---|---|
| `sl-cancel` | `wa-cancel` | Renamed |
| `sl-finish` | `wa-finish` | Renamed |
| `sl-start` | `wa-start` | Renamed |

#### wa-details (was sl-details)

`<wa-details>` extends the native `<details>` pattern.

| Shoelace | Web Awesome | Change |
|---|---|---|
| event `sl-show`/`sl-hide` etc. | event `wa-show`/`wa-hide` etc. | Renamed |
| slot `summary` | slot `summary` | Unchanged |

#### wa-copy-button (was sl-copy-button)

Currently <wa-badge variant="warning">Experimental</wa-badge>. Otherwise drop-in.

| Shoelace | Web Awesome | Change |
|---|---|---|
| `sl-copy` | `wa-copy` | Renamed |
| `sl-error` | `wa-error` | Renamed |

#### wa-rating (was sl-rating)

| Shoelace | Web Awesome | Change |
|---|---|---|
| `sl-change` / `sl-hover` | `change` (native) / `wa-hover` | `change` is native; `wa-hover` is renamed |

#### wa-icon (was sl-icon)

The default icon library changed from Bootstrap Icons to Font Awesome. Many icon names differ.

```diff
- <sl-icon name="exclamation-triangle"></sl-icon>
+ <wa-icon name="triangle-exclamation"></wa-icon>
```

If you have many icons across the codebase, you have two paths:

1. **Stay on Bootstrap Icons.** Register Bootstrap Icons as a custom library and use `library="bootstrap"`. This is the lowest-friction migration path for icon-heavy projects.
2. **Switch to Font Awesome names.** Most names map cleanly (`exclamation-triangle` → `triangle-exclamation`, `check-circle` → `circle-check`, `info-circle` → `circle-info`, etc.). The Font Awesome catalog is much larger.

`setKitCode()` and `data-fa-kit-code` give you first-class Font Awesome Pro/Pro+ kit integration if you have a kit.

#### Format components

`<sl-format-bytes>`, `<sl-format-date>`, `<sl-format-number>`, `<sl-relative-time>` all migrate as straight renames (`sl-` → `wa-`). All attributes are preserved.

## Step 4: Theme tokens

Every Shoelace `--sl-*` token has a `--wa-*` counterpart, but the structure is different in a few important ways. The biggest differences:

- **Color palette scales changed.** Shoelace used 50/100/200/…/950 (12 stops). Web Awesome uses 95/90/80/…/05 (11 stops). The numbering is "lightness": `95` is lightest, `05` is darkest. Tints are derived in OKLCH space for perceptual consistency.
- **Variant colors are now token-based.** Instead of remapping `--sl-color-primary-*` to a hue, you set `class="wa-brand-blue"` (or red/green/purple/etc.) on `<html>`. The `brand`, `success`, `warning`, `danger`, `neutral` variants each have their own swappable hue.
- **Loudness levels.** Each variant exposes `fill-quiet`/`fill-normal`/`fill-loud`, `border-quiet`/`-normal`/`-loud`, and `on-quiet`/`-normal`/`-loud`: three tiers that components use consistently.
- **Naming is different.** `medium` → `m`, `small` → `s`, `large` → `l`, `x-large` → `xl`, etc.

### Common token migrations

| Shoelace | Web Awesome | Notes |
|---|---|---|
| `--sl-color-primary-*` | `--wa-color-brand-*` | Brand tokens; primary → brand |
| `--sl-color-success-*` | `--wa-color-success-*` | Same |
| `--sl-color-warning-*` | `--wa-color-warning-*` | Same |
| `--sl-color-danger-*` | `--wa-color-danger-*` | Same |
| `--sl-color-neutral-*` | `--wa-color-neutral-*` | Same |
| `--sl-color-neutral-0` | `--wa-color-surface-default` | Surface tokens |
| `--sl-color-neutral-1000` | `--wa-color-text-normal` | Text tokens |
| `--sl-spacing-2x-small` | `--wa-space-2xs` | Naming convention `2x-small` → `2xs` |
| `--sl-spacing-x-small` | `--wa-space-xs` | |
| `--sl-spacing-small` | `--wa-space-s` | |
| `--sl-spacing-medium` | `--wa-space-m` | |
| `--sl-spacing-large` | `--wa-space-l` | |
| `--sl-spacing-x-large` | `--wa-space-xl` | |
| `--sl-spacing-2x-large` | `--wa-space-2xl` | |
| `--sl-font-size-x-small` | `--wa-font-size-xs` | Same convention |
| `--sl-font-size-small` | `--wa-font-size-s` | |
| `--sl-font-size-medium` | `--wa-font-size-m` | |
| `--sl-font-size-large` | `--wa-font-size-l` | |
| `--sl-font-size-x-large` | `--wa-font-size-xl` | |
| `--sl-font-weight-normal` | `--wa-font-weight-normal` | Same |
| `--sl-font-weight-semibold` | `--wa-font-weight-semibold` | Same |
| `--sl-font-weight-bold` | `--wa-font-weight-bold` | Same |
| `--sl-font-mono` | `--wa-font-family-code` | Renamed |
| `--sl-font-sans` | `--wa-font-family-body` | Renamed; also `--wa-font-family-heading` |
| `--sl-font-serif` | `--wa-font-family-longform` | Renamed |
| `--sl-line-height-dense` | `--wa-line-height-condensed` | Renamed |
| `--sl-line-height-normal` | `--wa-line-height-normal` | Same |
| `--sl-line-height-loose` | `--wa-line-height-expanded` | Renamed |
| `--sl-border-radius-small` | `--wa-border-radius-s` | |
| `--sl-border-radius-medium` | `--wa-border-radius-m` | |
| `--sl-border-radius-large` | `--wa-border-radius-l` | |
| `--sl-border-radius-pill` | `--wa-border-radius-pill` | Same |
| `--sl-border-radius-circle` | `--wa-border-radius-circle` | Same |
| `--sl-shadow-x-small` / `-small` | `--wa-shadow-s` | Consolidated to s/m/l |
| `--sl-shadow-medium` | `--wa-shadow-m` | |
| `--sl-shadow-large` / `-x-large` | `--wa-shadow-l` | |
| `--sl-transition-x-fast` / `-fast` | `--wa-transition-fast` | |
| `--sl-transition-medium` | `--wa-transition-normal` | Renamed |
| `--sl-transition-slow` / `-x-slow` | `--wa-transition-slow` | |
| `--sl-z-index-dropdown` | _(use cascade layers)_ | WA uses cascade layers and stacking contexts; explicit z-index tokens are gone |
| `--sl-z-index-dialog` etc. | _(use cascade layers)_ | Same |
| `--sl-input-*` | `--wa-form-control-*` | All input tokens are now `form-control` tokens |
| `--sl-toggle-size-*` | `--wa-form-control-toggle-size` | Single token |
| `--sl-focus-ring-*` | `--wa-focus-ring-*` (composed shorthand `--wa-focus-ring`) | Mostly compatible |

### New token systems

You also gain a few systems that didn't exist in Shoelace:

- **`--wa-color-{variant}-fill-{loudness}`** etc.: three-tier loudness system on every variant. Used internally by `<wa-button>`, `<wa-callout>`, `<wa-tag>` for the `appearance` attribute.
- **`--wa-color-mix-hover` and `--wa-color-mix-active`:** theme-defined hover/active overlays that components use consistently. Override once, affects everything.
- **Surface and text tokens:** `--wa-color-surface-raised`, `-default`, `-lowered`, `-border`; `--wa-color-text-normal`, `-quiet`, `-link`. Replaces ad-hoc `neutral-0`/`neutral-1000` patterns.
- **Composed shorthands:** `--wa-focus-ring` (style + width + color), `--wa-shadow-s|m|l` (composed from offset/blur/spread tokens). Shoelace had separate sub-tokens you had to combine yourself.

:::info
**Tip.** If you want a one-line escape hatch during migration, the `wa-theme-shoelace` theme defines tokens that approximate Shoelace's defaults. Apply it with `<html class="wa-theme-shoelace wa-light">` and most of your existing custom CSS will look familiar.
:::

## Step 5: Forms and validation

Web Awesome form controls are real form-associated custom elements (FACE) using `ElementInternals`. This means:

- `new FormData(form)` works automatically. No need for the `formdata` event shim.
- `form.checkValidity()` and `form.reportValidity()` include all `<wa-*>` controls.
- `form.reset()` resets all `<wa-*>` controls along with native ones.
- The browser's native `:invalid`, `:valid`, `:required`, `:disabled` pseudo-classes apply to `<wa-*>` form controls.

If you wrote code that handled the `formdata` event to extract Shoelace control values, you can delete it. Just call `new FormData(form)`.

### Validation events

| Shoelace | Web Awesome |
|---|---|
| `sl-invalid` | `wa-invalid` (cancelable) |

Cancel `wa-invalid` with `event.preventDefault()` to suppress the browser's default validation message and show your own. The `:state(user-invalid)` and `:state(user-valid)` custom states are applied based on user interaction.

### Custom validation

```diff
- input.setCustomValidity('That username is taken.');
- input.reportValidity();
+ input.customError = 'That username is taken.';
+ // Or call setCustomValidity(); both work.
```

The `customError` attribute is a declarative version of `setCustomValidity()` that you can set from your template.

## Step 6: Things to watch for

Most of what follows is silent breakage: code that won't throw but will misbehave. Check each item against your codebase.

- **Event listener strings.** Update all `addEventListener('sl-…', …)` calls. Listeners on the wrong event name fail silently.
- **Slot names.** `prefix`/`suffix` → `start`/`end`. A `<sl-icon slot="prefix">` left behind will render in the default slot, not where you expect.
- **`help-text` → `hint`.** Same risk: an unrecognized attribute won't error.
- **`variant="primary"`.** Will render with the *default* (neutral) variant in WA, not your brand color, because `primary` isn't a valid value.
- **CSS part renames.** Most parts are stable, but a few have changed (e.g., dialog/drawer's close button is no longer an exported `sl-icon-button` part). If you styled `::part(close-button__base)`, check the new equivalent on the component's API page.
- **CSS custom property fallbacks.** If you used `var(--sl-color-primary-500, blue)` and didn't update the variable, the fallback will silently take over. Search for `--sl-` to clean up.
- **`open` on `<wa-callout>`.** Doesn't exist. If you had `<sl-alert open>` in a template that toggled visibility via the attribute, you need to conditionally render the callout instead.
- **`<sl-alert>.toast()`.** Method removed. Use [`<wa-toast>`](#wa-toast-pro) <wa-badge appearance="accent" pill class="pro">Pro</wa-badge> for notification UX.
- **Bootstrap Icons names.** If you don't register the Bootstrap Icons library, your icon names will resolve against Font Awesome's catalog and many will silently render as a question mark.

## Step 7: Test

After the migration:

1. Run a build. TypeScript and Lit will catch most attribute typos and missing imports.
2. Open the app. Walk through every form. Confirm validation still works.
3. Search the codebase for any leftover `sl-`, `--sl-`, or `@shoelace-style/shoelace` strings.
4. Search for `'sl-` and `"sl-` in JS to catch event listener strings.
5. Check your dark-mode pages. Color tokens are the most likely visual regression.

## What you gain

We've focused on what changed, but a lot is also new. In free Web Awesome alone, you get:

- **`<wa-callout>`, `<wa-comparison>`, `<wa-popover>`, `<wa-page>`, `<wa-scroller>`, `<wa-zoomable-frame>`, `<wa-number-input>`, `<wa-markdown>`, `<wa-intersection-observer>`:** net-new components.
- **Native Styles.** `dist/styles/native.css` themes plain HTML using the same tokens.
- **Utility CSS layer.** Layout primitives, spacing, typography, alignment, and sizing without pulling in a full utility framework.
- **Three themes** including a `wa-theme-shoelace` for soft landings (more available in Pro)
- **Brand hue swapping.** `class="wa-brand-purple"` re-skins your whole app's brand color in one line.
- **OKLCH color palettes** for perceptually-uniform tints across all hues.
- **SSR-friendly hydration** with `did-ssr` and `with-*` slot markers.
- **AI-ready docs.** Each build emits an [Agent Skill bundle](/docs/ai/agent-skills) and an `llms.txt` so AI assistants can work with Web Awesome competently.

## What's in Web Awesome Pro

Web Awesome Pro is a separate, paid package (`@awesome.me/webawesome-pro`) that adds components for higher-stakes patterns. It's a strict superset of free, so you don't lose anything by upgrading. Pro includes:

- `<wa-toast>` and `<wa-toast-item>`: toast notification stack
- `<wa-combobox>`: combobox or autocomplete with multiselect
- `<wa-file-input>`: drag-and-drop file input with previews
- `<wa-chart>` and seven typed chart subclasses (built on Chart.js, themed via design tokens)
- `<wa-sparkline>`: inline trend visualization
- 8 additional themes (`active`, `brutalist`, `glossy`, `matter`, `mellow`, `playful`, `premium`, `tailspin`)
- Pro Theme Builder, Pro Color Tools, Pattern Library, Figma Design Kit
- Hosted projects and human support

If your Shoelace app used `sl-alert.toast()`, a custom combobox library, or charting, Pro is the natural home for those. See [the Pro overview](/docs/pro) for details.

## Frequent gotchas

<wa-details name="migration-gotcha" summary="My buttons all look gray">

You probably have `variant="primary"` somewhere. Web Awesome uses `variant="brand"`.

</wa-details>

<wa-details name="migration-gotcha" summary="My event listener stopped firing">

Update the event name. `sl-show` → `wa-show`, `sl-change` → `change` (native), and so on.

</wa-details>

<wa-details name="migration-gotcha" summary="My theme overrides don't work">

Web Awesome wraps component styles in `@layer wa-component`. Your unlayered CSS now wins automatically, so you can probably remove `!important` declarations. Conversely, if your overrides were *inside* a layer, they may now lose to unlayered rules.

</wa-details>

<wa-details name="migration-gotcha" summary="My icons render as question marks">

You're requesting a Bootstrap Icons name (e.g., `exclamation-triangle`) but the default icon library is Font Awesome (`triangle-exclamation`). Either register Bootstrap Icons or update icon names.

</wa-details>

<wa-details name="migration-gotcha" summary="&lt;sl-alert open&gt; doesn't toggle anymore">

`<wa-callout>` is always rendered. There's no `open` attribute. Conditionally render the element instead, or migrate to `<wa-toast>` for the popup behavior.

</wa-details>

<wa-details name="migration-gotcha" summary="Form submissions are missing my fields">

Make sure your `<wa-input>` and similar controls have a `name` attribute. Web Awesome controls use native form association, so `FormData` reads them only if they're named.

</wa-details>

<wa-details name="migration-gotcha" summary="My dark mode broke">

Replace `class="sl-theme-dark"` with `class="wa-dark"` on `<html>`. The class names are different.

</wa-details>

## Get the checklist

Track your migration step by step. Open the interactive checklist in your browser (your progress is saved automatically), or download the markdown version to drop into your repo.

<div class="wa-cluster wa-gap-s" style="margin-block-end: var(--wa-space-xl);">
  <wa-button variant="brand" appearance="accent" size="m" href="/docs/resources/migration-checklist">
    <wa-icon slot="start" name="list-check"></wa-icon>
    Open the interactive checklist
  </wa-button>
  <wa-button variant="neutral" appearance="outlined" size="m" href="/assets/downloads/shoelace-migration-checklist.md" download="shoelace-migration-checklist.md">
    <wa-icon slot="start" name="download"></wa-icon>
    Download as Markdown
  </wa-button>
</div>

## Need help?

- [Web Awesome Discord](https://discord.gg/webawesome)
- [GitHub Discussions](https://github.com/shoelace-style/webawesome/discussions)
- [Filing an issue](https://github.com/shoelace-style/webawesome/issues)

---

We work hard to keep migrations smooth. If something here is wrong, missing, or could be clearer, please [open an issue](https://github.com/shoelace-style/webawesome/issues) and we'll fix it.

<style>
  /* Give every wa-details breathing room above and below. */
  #content wa-details {
    margin-block: var(--wa-space-m) var(--wa-space-l);
  }

  /* Tighten spacing when one wa-details is immediately followed by another. */
  #content wa-details:has(+ wa-details) {
    margin-block-end: var(--wa-space-2xs);
  }

  #content wa-details + wa-details {
    margin-block-start: 0;
  }

  table code { 
    white-space: nowrap;
  }

  .page-migrating-from-shoelace #content table {
    display: block;
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
  }
</style>
