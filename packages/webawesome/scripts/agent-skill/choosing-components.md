# Choosing the right component

**Full documentation:** https://webawesome.com/docs/components

When you reach for a Web Awesome component, start from **user intent** — what you need the user to do
or see — not from the component name. Most agent mistakes here aren't API misuse; they're picking the
wrong component for the job (using `<wa-dropdown>` when the user really needs `<wa-select>`, or hand-rolling
a callout out of `<div>`s when `<wa-callout>` exists). Walk the tree below to the leaf that matches your
intent, then check that component's individual reference for its API.

The major decisions:

- **Pick one from a set** — radio group, select, combobox (Pro), switch, slider, rating, color picker
- **Pick many** — multiple checkboxes, multi-select, multi-combobox (Pro)
- **Trigger an action** — button, copy button, dropdown menu, button group, tabs
- **Show feedback or status** — callout, toast (Pro), badge, spinner, progress, skeleton, tooltip, popover
- **Capture input** — input, number input, textarea, file input (Pro)
- **Show data** — format helpers, relative time, QR code, comparison, carousel, avatar, charts (Pro)
- **Navigate or organize** — page, breadcrumb, tabs, details, tree, divider, card, tag, badge
- **Overlay or float** — dialog, drawer, tooltip, popover, dropdown

---

## Pick one from a set

The user is choosing one value from a set of options.

| You need…                                     | Use                                  |
| --------------------------------------------- | ------------------------------------ |
| 2–5 visible options, all related              | `<wa-radio-group>` with `<wa-radio>` |
| More options, dropdown form field             | `<wa-select>` with `<wa-option>`     |
| Many options + typeahead / search             | `<wa-combobox>` **(Pro)**            |
| Yes / no toggle that takes effect immediately | `<wa-switch>`                        |
| Yes / no in a form (submitted later)          | `<wa-checkbox>`                      |
| A numeric value within a continuous range     | `<wa-slider>`                        |
| A star rating                                 | `<wa-rating>`                        |
| A color                                       | `<wa-color-picker>`                  |

**`<wa-dropdown>` is not for picking a value.** `<wa-dropdown>` is for a **menu of actions** (think: a
"More…" button that opens a list of commands). For picking a value from a list, use `<wa-select>` (or
`<wa-combobox>` if the user has Pro and you need typeahead). This is the single most common confusion in
the catalog.

**Switch vs. checkbox.** Switch = instant-apply setting ("notifications on / off"). Checkbox = form
field submitted later ("I accept the terms"). If toggling the control should immediately change
something, it's a switch.

---

## Pick many

Multi-selection from a set.

| You need…                                 | Use                                            |
| ----------------------------------------- | ---------------------------------------------- |
| A small set of independent options        | Multiple `<wa-checkbox>` elements              |
| Many options in a multi-select dropdown   | `<wa-select multiple>`                         |
| Many options with typeahead, multi-select | `<wa-combobox multiple>` **(Pro)**             |
| Removable chip / tag selections           | `<wa-tag with-remove>` (manage your own state) |

---

## Trigger an action

The user clicks or taps to make something happen.

| You need…                                    | Use                                                 |
| -------------------------------------------- | --------------------------------------------------- |
| Primary call-to-action                       | `<wa-button variant="brand">`                       |
| Secondary action                             | `<wa-button appearance="plain">`                    |
| Destructive action                           | `<wa-button variant="danger">`                      |
| Copy text to clipboard                       | `<wa-copy-button>`                                  |
| A row of related buttons (segmented choices) | `<wa-button-group>` with `<wa-button>` children     |
| Open a menu of commands                      | `<wa-dropdown>` with `<wa-dropdown-item>`           |
| Switch between sections inline               | `<wa-tab-group>` with `<wa-tab>` + `<wa-tab-panel>` |

**Single primary action per view.** If a view has more than one `variant="brand"` button, pick the most
important one and demote the rest to `appearance="plain"` or `appearance="outlined"`. A wall of brand
buttons reads as no primary action at all.

---

## Show feedback or status

Non-interactive output telling the user something.

| You need…                                                  | Use                                                                       |
| ---------------------------------------------------------- | ------------------------------------------------------------------------- |
| Persistent inline message (info, success, warning, danger) | `<wa-callout>` with a `variant`                                           |
| Brief ephemeral notification                               | `<wa-toast-item>` inside `<wa-toast>` **(Pro)**                           |
| Compact status indicator (number, "NEW", state)            | `<wa-badge>`                                                              |
| Loading, duration unknown                                  | `<wa-spinner>`                                                            |
| Loading, with progress                                     | `<wa-progress-bar>` (horizontal) or `<wa-progress-ring>` (compact circle) |
| Placeholder while content loads                            | `<wa-skeleton>`                                                           |
| Hover hint on a target                                     | `<wa-tooltip>`                                                            |
| Larger contextual popup with rich content                  | `<wa-popover>`                                                            |

**Callout vs. toast.** Callout = persistent, sits in the layout (e.g. a form error, an info panel). Toast
= ephemeral, floats over the layout briefly (e.g. "Saved!" after a successful save). If the user might
miss it on a glance, it's a callout.

**Tooltip vs. popover.** Tooltip = text-only hint, automatic on hover / focus. Popover = arbitrary rich
content, click to open. If you need anything beyond a short string, it's a popover.

---

## Capture input

The user types or uploads.

| You need…                                      | Use                                                          |
| ---------------------------------------------- | ------------------------------------------------------------ |
| Single-line text (incl. email, password, etc.) | `<wa-input>` with the appropriate `type`                     |
| A number with stepper buttons                  | `<wa-number-input>` (richer than `<wa-input type="number">`) |
| Multi-line text                                | `<wa-textarea>`                                              |
| File upload                                    | `<wa-file-input>` **(Pro)**                                  |
| A color value                                  | `<wa-color-picker>`                                          |

Use a `<form>` and the [form controls reference](form-controls.md) for validation patterns and form
association behavior.

---

## Show data

Read-only data display.

| You need…                                         | Use                                                                                      |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Format a number with locale-aware rules           | `<wa-format-number>`                                                                     |
| Format a date with locale-aware rules             | `<wa-format-date>`                                                                       |
| Format a byte count                               | `<wa-format-bytes>`                                                                      |
| Show a time as "5 minutes ago" (relative, live)   | `<wa-relative-time>`                                                                     |
| A QR code                                         | `<wa-qr-code>`                                                                           |
| Side-by-side image comparison                     | `<wa-comparison>`                                                                        |
| A carousel / slideshow                            | `<wa-carousel>` with `<wa-carousel-item>`                                                |
| An iframe with zoom controls                      | `<wa-zoomable-frame>`                                                                    |
| A user avatar                                     | `<wa-avatar>`                                                                            |
| An animation                                      | `<wa-animation>`                                                                         |
| Markdown content rendered inline                  | `<wa-markdown>`                                                                          |
| Include external HTML                             | `<wa-include>`                                                                           |
| A small inline trend chart                        | `<wa-sparkline>` **(Pro)**                                                               |
| A data chart (bar, line, pie, donut, radar, etc.) | The chart family **(Pro)** — `<wa-bar-chart>`, `<wa-line-chart>`, `<wa-pie-chart>`, etc. |
| A video player                                    | `<wa-video>` or `<wa-video-playlist>` **(Pro)**                                          |

---

## Navigate or organize

Structuring content or moving between views.

| You need…                                            | Use                                                 |
| ---------------------------------------------------- | --------------------------------------------------- |
| The page-level frame (header, sidebar, main, footer) | `<wa-page>` — see the `webawesome-design` skill     |
| Breadcrumb trail                                     | `<wa-breadcrumb>` with `<wa-breadcrumb-item>`       |
| Switch between sections inline                       | `<wa-tab-group>` with `<wa-tab>` + `<wa-tab-panel>` |
| Expandable details disclosure                        | `<wa-details>`                                      |
| Tree navigation (hierarchical lists)                 | `<wa-tree>` with `<wa-tree-item>`                   |
| Visual separator between sections                    | `<wa-divider>`                                      |
| Group of related content as a card                   | `<wa-card>`                                         |
| Inline label (interactive)                           | `<wa-tag>` — removable, supports actions            |
| Inline status indicator (non-interactive)            | `<wa-badge>` — small status pill                    |

**Tag vs. badge.** Tag = interactive label (filter chip, removable selection, clickable category). Badge
= small status indicator (count, "NEW", state). If the user can interact with it, it's a tag.

---

## Overlay or float

Content that sits above the page.

| You need…                                      | Use                                       |
| ---------------------------------------------- | ----------------------------------------- |
| Modal dialog (blocks page)                     | `<wa-dialog>`                             |
| Side panel (non-blocking)                      | `<wa-drawer>`                             |
| Floating tooltip (hover / focus)               | `<wa-tooltip>`                            |
| Floating popover (click to open, rich content) | `<wa-popover>`                            |
| Dropdown menu of actions                       | `<wa-dropdown>` with `<wa-dropdown-item>` |

**Dialog vs. drawer.** Dialog = blocks the page (confirmations, focused tasks). Drawer = slides in
alongside (settings panels, secondary nav). If the user must respond before continuing, it's a dialog.

---

## When the right component doesn't exist

If nothing in the catalog matches what you need, before hand-rolling check:

- **Is it really a component, or is it a section pattern?** Sections compose from existing components and
  utility classes. See the `webawesome-design` skill's `patterns.md` for ready-made section recipes.
- **Could the layout utilities solve it?** `wa-stack`, `wa-cluster`, `wa-grid`, `wa-flank`, `wa-split`,
  `wa-frame` cover most layout needs without a component.
- **Could a `<wa-card>`, `<wa-callout>`, or `<wa-tag>` plus a few utility classes get you there?**

When you genuinely need custom CSS to extend the system, follow the **Custom CSS playbook** in the
`webawesome-design` skill's `composition.md` (semantic tokens, `*-on-*` pairings for contrast,
`loud` / `normal` / `quiet` as a contrast lever) so your additions stay themed, dark-mode-safe, and
accessible.

---

## A note on Pro

Components marked **(Pro)** in the tables above require [Web Awesome Pro](https://webawesome.com/purchase).
The Pro-only set is:

- **`<wa-combobox>`** — typeahead select (single or `multiple`)
- **`<wa-file-input>`** — file upload form control
- **`<wa-toast>` / `<wa-toast-item>`** — toast notification stack
- **`<wa-sparkline>`** — small inline trend chart
- **The chart family** — `<wa-chart>` (generic), `<wa-bar-chart>`, `<wa-line-chart>`, `<wa-pie-chart>`,
  `<wa-doughnut-chart>`, `<wa-polar-area-chart>`, `<wa-radar-chart>`, `<wa-scatter-chart>`,
  `<wa-bubble-chart>`
- **The video family** — `<wa-video>`, `<wa-video-playlist>`

Don't use Pro components unless the user has Web Awesome Pro. When in doubt, pick the closest Free
equivalent (`<wa-select>` instead of `<wa-combobox>`, native `<input type="file">` instead of
`<wa-file-input>`, `<wa-callout>` instead of toast for non-ephemeral messages) or compose from primitives.
The full Pro list also lives in the main `SKILL.md`.
