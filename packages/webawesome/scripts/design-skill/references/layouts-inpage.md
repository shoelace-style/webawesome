# In-page layouts (sections, widgets, embeds)

You are here because STEP 0 determined you're building **a piece of a page**: a section, card, form,
panel, toolbar, or something embedded into a page you don't fully control.

**Do not use `<wa-page>` here.** It's designed to own the whole viewport (sticky headers, a responsive
nav drawer, a full-height grid) and will fight whatever surrounds it. Instead, compose with **layout
utility classes**. They're plain CSS classes you put on any element, no components required.

Because there's no `<wa-page>` here, **none of its features are available** in this context: no slots
(`slot="header"`, etc.), no `view='mobile'`/`view='desktop'` state, no `--menu-width`/`--aside-width`,
no `data-toggle-nav`, and **no `.wa-desktop-only` / `.wa-mobile-only`** (those only work inside
`<wa-page>`; use a CSS media query for responsive visibility here). Don't reach for any of them; they
do nothing outside a `<wa-page>`.

The six layout utilities:

| Utility      | Shape                                 | Use when                                                              |
| ------------ | ------------------------------------- | --------------------------------------------------------------------- |
| `wa-stack`   | Vertical column                       | Stacking things top-to-bottom: form fields, card bodies, content flow |
| `wa-cluster` | Inline row that wraps                 | Buttons, tags, chips, inline metadata, nav links                      |
| `wa-grid`    | Responsive columns (no media queries) | Card galleries, dashboards, tile grids                                |
| `wa-flank`   | Fixed item beside a flexible one      | Avatar + text, icon + label, media object                             |
| `wa-split`   | Push children to opposite ends        | Toolbars, section headers with an action on the right                 |
| `wa-frame`   | Fixed aspect-ratio box                | Images, video, thumbnails                                             |

Spacing comes from `wa-gap-*` (mapped to the `--wa-space-*` scale). Defaults are sensible; reach for
`wa-gap-*` to tune. Full decision guide and per-utility detail: [composition.md](composition.md).

> Theming still applies. These sections inherit whatever theme/palette is set on `<html>`. Style them
> with `--wa-*` tokens, never hardcoded values. See [theming.md](theming.md).

---

## Section recipes

### Form block

A constrained-width vertical stack. Keep forms narrow for readability and pair a primary action with a
quiet secondary.

```html
<section class="wa-stack wa-gap-l" style="max-width: 28rem;">
  <h2>Create account</h2>
  <wa-input label="Email" type="email"></wa-input>
  <wa-input label="Password" type="password"></wa-input>
  <div class="wa-cluster">
    <wa-button variant="brand">Create account</wa-button>
    <wa-button appearance="plain">Cancel</wa-button>
  </div>
</section>
```

### Toolbar / section header with an action

`wa-split` pushes the title and the action button to opposite ends.

```html
<div class="wa-split">
  <h2>Team members</h2>
  <wa-button variant="brand">
    <wa-icon slot="start" name="plus"></wa-icon>
    Invite
  </wa-button>
</div>
```

### Responsive card grid

`wa-grid` wraps cards into as many columns as fit, no breakpoints needed. Tune the wrap threshold with
`--min-column-size`.

```html
<div class="wa-grid wa-gap-l" style="--min-column-size: 16rem;">
  <wa-card>
    <h3>Starter</h3>
    <p>For individuals getting started.</p>
    <wa-button slot="footer" variant="brand">Choose</wa-button>
  </wa-card>
  <wa-card>
    <h3>Team</h3>
    <p>For small teams that collaborate.</p>
    <wa-button slot="footer" variant="brand">Choose</wa-button>
  </wa-card>
  <wa-card>
    <h3>Business</h3>
    <p>For organizations at scale.</p>
    <wa-button slot="footer" variant="brand">Choose</wa-button>
  </wa-card>
</div>
```

### Media object (icon/avatar beside text)

`wa-flank` keeps the first child at its natural size and lets the rest fill the space. Tune the fixed
size with `--flank-size`.

```html
<div class="wa-flank wa-gap-s" style="--flank-size: 3rem;">
  <wa-avatar label="Ada Lovelace"></wa-avatar>
  <div class="wa-stack wa-gap-3xs">
    <strong>Ada Lovelace</strong>
    <span class="wa-caption-m">Founder</span>
  </div>
</div>
```

Use `wa-flank:end` to flank the **last** child instead (e.g. text with a trailing control).

---

## Anti-patterns

| ❌ Don't                                           | ✅ Do                                                        |
| -------------------------------------------------- | ------------------------------------------------------------ |
| Drop a `<wa-page>` into a section to get a sidebar | Use `wa-grid` / `wa-flank` for in-section columns            |
| Write `display: flex; gap: 16px` by hand           | Use `wa-stack`/`wa-cluster` + `wa-gap-*`                     |
| Hardcode `max-width: 480px` everywhere             | Constrain to a readable measure with tokens/rem and reuse it |
| Hardcode colors in a card                          | Inherit the theme; style with `--wa-color-*`                 |
| Add media queries for a card grid                  | `wa-grid` is responsive without them                         |
