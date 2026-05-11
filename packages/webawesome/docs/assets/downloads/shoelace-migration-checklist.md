# Shoelace to Web Awesome Migration Checklist

Drop this file into your project (e.g. at the repo root or under `docs/`) and check items off as you go. Each section maps to a step in the [official migration guide](https://webawesome.com/docs/resources/migrating-from-shoelace).

**Project:** _your project name_
**Started:** _YYYY-MM-DD_
**Completed:** _YYYY-MM-DD_

---

## 1. Install

- [ ] Removed `@shoelace-style/shoelace` from `package.json`
- [ ] Added `@awesome.me/webawesome` to `package.json`
- [ ] Updated CSS import to `@awesome.me/webawesome/dist/styles/webawesome.css`
- [ ] Updated autoloader import to `@awesome.me/webawesome/dist/webawesome.loader.js`
- [ ] Updated CDN URLs (if used) to `early.webawesome.com/webawesome@3/...`
- [ ] Updated `setBasePath` import to `@awesome.me/webawesome/dist/webawesome.js`
- [ ] Picked a starting theme: `wa-theme-shoelace` for soft landing, or `default`/`awesome`
- [ ] App builds successfully after the swap

## 2. Global find-and-replace

Run these in order. Commit between passes.

- [ ] `@shoelace-style/shoelace` → `@awesome.me/webawesome` (imports)
- [ ] `<sl-` → `<wa-` (templates and HTML)
- [ ] `</sl-` → `</wa-` (templates and HTML)
- [ ] `--sl-` → `--wa-` (CSS files, inline styles, CSS-in-JS)
- [ ] `sl-theme-` → `wa-theme-` (class names)
- [ ] `'sl-` → `'wa-` (event listener strings, JS)
- [ ] `"sl-` → `"wa-` (event listener strings, JS)
- [ ] `Sl` → `Wa` (TypeScript event class imports, e.g. `SlChangeEvent` → `WaChangeEvent`)
- [ ] `variant="primary"` → `variant="brand"` (all components)
- [ ] `class="sl-theme-light"` → `class="wa-light"`
- [ ] `class="sl-theme-dark"` → `class="wa-dark"`
- [ ] `slot="prefix"` → `slot="start"` (inputs, buttons, selects, breadcrumbs)
- [ ] `slot="suffix"` → `slot="end"` (same)
- [ ] `help-text=` → `hint=` (form controls)
- [ ] `slot="help-text"` → `slot="hint"` (form controls)

**Final sweep — confirm zero results:**

- [ ] `grep -r 'sl-' src/` (should match nothing meaningful)
- [ ] `grep -r '\-\-sl\-' src/` (should match nothing)
- [ ] `grep -r '@shoelace-style/shoelace' .` (should match nothing)
- [ ] `grep -rE "['\"]sl-[a-z]+['\"]" src/` (catches event listener strings)

## 3. Components

### Renamed elements

- [ ] `<sl-alert>` → `<wa-callout>` (inline use; toast UX is now Pro `<wa-toast>`)
- [ ] `<sl-image-comparer>` → `<wa-comparison>`
- [ ] `<sl-range>` → `<wa-slider>`
- [ ] `<sl-menu>` + `<sl-menu-item>` → `<wa-dropdown>` + `<wa-dropdown-item>`
- [ ] `<sl-menu-label>` → `<wa-divider>` + heading, or restructure

### Removed elements

- [ ] `<sl-icon-button>` → `<wa-button>` with single `<wa-icon>` child
- [ ] `<sl-radio-button>` → `<wa-button-group>` of `<wa-radio>` controls
- [ ] `<sl-visually-hidden>` → `class="wa-visually-hidden"` utility on any element

### Buttons

- [ ] Replaced `outline` boolean with `appearance="outlined"`
- [ ] Replaced `circle` boolean (auto-detected when button has a single `<wa-icon>` child)
- [ ] Replaced `variant="text"` with `appearance="plain"`
- [ ] Replaced `caret` with `with-caret`
- [ ] Updated `slot="prefix"` to `slot="start"`, `slot="suffix"` to `slot="end"`
- [ ] Updated `sl-blur`/`sl-focus` listeners to native `blur`/`focus`
- [ ] Updated `sl-invalid` to `wa-invalid`

### Form controls (input, textarea, select, checkbox, radio, switch, etc.)

- [ ] Renamed `help-text` attribute to `hint`
- [ ] Renamed `help-text` slot to `hint`
- [ ] Renamed `prefix`/`suffix` slots to `start`/`end`
- [ ] Renamed `clearable` to `with-clear` (input, select)
- [ ] Replaced `filled` boolean with `appearance="filled"`
- [ ] Updated `sl-change`/`sl-input`/`sl-blur`/`sl-focus` to native events (no prefix)
- [ ] Updated `sl-clear` listeners (event removed; listen for `input` after clear)
- [ ] Updated `sl-invalid` to `wa-invalid`
- [ ] Removed `formdata`-event-based form serialization shims (form association is native)
- [ ] Confirmed every form control has a `name` attribute (required for native `FormData`)

### Slider (was `<sl-range>`)

- [ ] Renamed element to `<wa-slider>`
- [ ] Replaced `tooltip` attribute with `with-tooltip` + `tooltip-placement` + `tooltip-distance`
- [ ] Considered using new `range` attribute for two-thumb selection

### Callout (was `<sl-alert>` inline)

- [ ] Replaced `<sl-alert>` static usage with `<wa-callout>`
- [ ] Removed `open`, `closable`, `duration` (callouts always render)
- [ ] Removed `show()`/`hide()` calls (use conditional rendering)
- [ ] Migrated `.toast()` calls to Web Awesome Pro `<wa-toast>` (or built your own)

### Dialog and drawer

- [ ] Updated `sl-show`/`sl-hide`/`sl-after-show`/`sl-after-hide` to `wa-` prefix
- [ ] Updated `sl-initial-focus` to `wa-initial-focus`
- [ ] Migrated `sl-request-close` listeners to cancellable `wa-hide`
- [ ] Renamed `noHeader` attribute to `without-header`

### Dropdown and menu

- [ ] Combined `<sl-dropdown>` + `<sl-menu>` into `<wa-dropdown>` (menu is gone)
- [ ] Renamed `<sl-menu-item>` to `<wa-dropdown-item>`
- [ ] Renamed `caret` on trigger button to `with-caret`
- [ ] Updated `sl-select` to `wa-select`
- [ ] Replaced `<sl-menu-label>` separators (use `<wa-divider>` + heading)

### Tabs

- [ ] Updated `sl-tab-show` to `wa-tab-show`
- [ ] Updated `sl-tab-hide` to `wa-tab-hide`
- [ ] Removed `sl-close` (see [the docs](/docs/components/tab-group#closable-tabs) for the recommended way to close tabs)

### Tree

- [ ] Updated `sl-selection-change` to `wa-selection-change`
- [ ] Updated `sl-expand`/`sl-collapse`/`sl-after-expand`/`sl-after-collapse` to `wa-` prefix
- [ ] Updated `sl-lazy-load`/`sl-lazy-change` to `wa-lazy-load`/`wa-lazy-change`

### Tag

- [ ] Renamed `removable` to `with-remove`
- [ ] Updated `sl-remove` to `wa-remove`

### Tooltip, popup, animation, details, copy-button, rating, color-picker, comparison, carousel, format components

- [ ] Updated all `sl-*` events to `wa-*` (or native where applicable)
- [ ] No other API changes for these components beyond the prefix swap

### Icons

- [ ] Decided: stay on Bootstrap Icons (register as a custom library) **or** switch to Font Awesome
- [ ] If switching: updated icon names (e.g. `exclamation-triangle` → `triangle-exclamation`)
- [ ] If using Font Awesome Pro: configured `setKitCode()` or `data-fa-kit-code`

## 4. Theme tokens

- [ ] Replaced `--sl-color-primary-*` with `--wa-color-brand-*`
- [ ] Replaced `--sl-spacing-{2x-,x-,,large,etc.}` with `--wa-space-{2xs,xs,s,m,l,xl,2xl,...}`
- [ ] Replaced `--sl-font-size-{x-small,small,medium,large,x-large,...}` with `--wa-font-size-{xs,s,m,l,xl,...}`
- [ ] Replaced `--sl-font-mono` with `--wa-font-family-code`
- [ ] Replaced `--sl-font-sans` with `--wa-font-family-body` (or `--wa-font-family-heading`)
- [ ] Replaced `--sl-font-serif` with `--wa-font-family-longform`
- [ ] Replaced `--sl-line-height-dense` with `--wa-line-height-condensed`
- [ ] Replaced `--sl-line-height-loose` with `--wa-line-height-expanded`
- [ ] Replaced `--sl-border-radius-{small,medium,large}` with `--wa-border-radius-{s,m,l}`
- [ ] Consolidated `--sl-shadow-x-small`/`-small` → `--wa-shadow-s`
- [ ] Consolidated `--sl-shadow-large`/`-x-large` → `--wa-shadow-l`
- [ ] Consolidated `--sl-transition-x-fast`/`-fast` → `--wa-transition-fast`
- [ ] Renamed `--sl-transition-medium` to `--wa-transition-normal`
- [ ] Replaced `--sl-input-*` with `--wa-form-control-*`
- [ ] Replaced `--sl-color-neutral-0` with `--wa-color-surface-default`
- [ ] Replaced `--sl-color-neutral-1000` with `--wa-color-text-normal`
- [ ] Removed `--sl-z-index-*` references (use cascade layers and stacking contexts instead)
- [ ] Adjusted color-scale references: Shoelace 50/100/.../950 → Web Awesome 95/90/.../05 (lightness, inverted)
- [ ] Reviewed any `var(--sl-*, fallback)` calls so the fallback isn't silently masking missed migrations

## 5. Forms and validation

- [ ] Removed `formdata` event listeners that extracted Shoelace control values
- [ ] Confirmed `new FormData(form)` returns expected fields
- [ ] Confirmed `form.checkValidity()` and `form.reportValidity()` include all controls
- [ ] Confirmed `form.reset()` resets all `<wa-*>` controls
- [ ] Migrated `setCustomValidity()` calls (still works) or moved to `customError` attribute
- [ ] Updated `sl-invalid` listeners to `wa-invalid`
- [ ] Verified browser-native pseudo-classes (`:invalid`, `:valid`, `:required`) apply as expected

## 6. Things to verify (silent breakage risk)

- [ ] Confirmed no `addEventListener('sl-...')` strings remain (silent: no error if missed)
- [ ] Confirmed no `slot="prefix"` or `slot="suffix"` left (silent: slots into default slot)
- [ ] Confirmed no `help-text=` attributes left (silent: unknown attributes don't error)
- [ ] Confirmed no `variant="primary"` left (silent: falls back to neutral default)
- [ ] Confirmed CSS `::part()` selectors still target valid parts after rename
- [ ] Confirmed dark mode still works (`wa-dark` class, not `sl-theme-dark`)
- [ ] Confirmed icons render (Font Awesome catalog vs Bootstrap Icons names)

## 7. Test

- [ ] Production build succeeds
- [ ] TypeScript type-check passes (catches event class import typos)
- [ ] Linter passes
- [ ] Walked through every form in the app; submit, reset, validation work
- [ ] Walked through every dialog and drawer; open, close, escape, overlay click work
- [ ] Walked through every dropdown, menu, tabs, tree
- [ ] Visual check in light and dark mode
- [ ] Accessibility audit (focus order, screen reader names, keyboard nav) on critical pages
- [ ] No console errors on page load
- [ ] No console warnings about unregistered icon names

## 8. Optional follow-ups

- [ ] Adopted `wa-theme-shoelace` initially? Consider switching to `default` or `awesome` for the full Web Awesome look.
- [ ] Tried the new utility classes (`wa-cluster`, `wa-stack`, `wa-grid`, etc.) to replace custom layout CSS
- [ ] Tried `<wa-page>` for app shell layout
- [ ] Tried `<wa-popover>` where you previously used a tooltip with rich content
- [ ] Tried `<wa-number-input>` instead of `<wa-input type="number">`
- [ ] Evaluated Web Awesome Pro for `<wa-toast>`, `<wa-combobox>`, `<wa-file-input>`, charts, sparklines, additional themes

---

## Notes

_Use this space to record project-specific gotchas, blockers, and decisions you make during the migration._

-
-
-
