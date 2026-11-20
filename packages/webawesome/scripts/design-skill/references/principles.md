# Design principles (the _why_ behind WA's tokens)

Web Awesome ships a complete, opinionated design system: scales for spacing, type, color, shadow,
and radius; semantic color roles with a built-in contrast lever; layout primitives that bake good
defaults into the structure. This file is the design judgment those mechanisms encode. Each section
maps a class of decision an agent makes (color, depth, hierarchy, spacing, type, polish) to the WA
tools that make the right answer the easy one — and the failure modes that show up when those tools
are bypassed.

Most of the principles below aren't unique to Web Awesome — line length, hierarchy via weight and
color, baseline alignment, depth via elevation — they're widely shared design wisdom any serious UI
framework benefits from. The contribution here is the mapping: which WA tokens, utilities, and
components encode each one, and the failure modes that appear when those mechanisms are bypassed.

The single rule behind every other rule: **stay on the scale.** WA's scales are non-linear and
constrained on purpose, so the decisions between adjacent values are real ones. Pick from the scale
and most other principles take care of themselves.

**Contents**

- [1. Color: less is more, and never alone](#1-color-less-is-more-and-never-alone)
- [2. Depth via tokens, not artistry](#2-depth-via-tokens-not-artistry)
- [3. Make hierarchy do the work, not styling](#3-make-hierarchy-do-the-work-not-styling)
- [4. Spacing is a system, not a tweak](#4-spacing-is-a-system-not-a-tweak)
- [5. Typography earns its weight](#5-typography-earns-its-weight)
- [6. Finishing moves](#6-finishing-moves)
- [7. Empty and edge states](#7-empty-and-edge-states)

---

## 1. Color: less is more, and never alone

### The semantic layer is your interface to color

Color in Web Awesome flows through three layers: **palette** (raw hues × tints, `--wa-color-blue-50`),
**semantic** (roles, `--wa-color-brand-fill-loud`), and **theme assignment** (surfaces and text,
`--wa-color-surface-raised`). You almost only ever touch the top two. The semantic layer is what
makes the system re-themeable and dark-mode safe — semantic tokens flip automatically with `wa-light`
/ `wa-dark` because they re-resolve through theme assignments; raw palette tints are frozen at the
hue you picked and don't flip. **Build with semantic tokens; treat palette tints as an escape hatch.**

See [theming.md](theming.md) for the layer breakdown and
[composition.md § Custom CSS](composition.md#custom-css) for the dark-mode-safe playbook.

### Palette tints work for purely visual depth — with a dark-mode cost

The semantic layer above treats palette tints as an escape hatch; here's when that hatch is fair use.
When you want a **purely visual** distinction between two elements (a sidebar a step darker than main,
two adjacent cards on a tinted band, a hover background a half-step deeper than its container),
reaching one or two steps along a palette scale is reasonable. The qualifiers:

- **Stay on the scale.** `--wa-color-neutral-90` next to a default surface is fine; a raw hex or a
  custom shade isn't.
- **Cap the differentiation at a step or two.** Enough to read as different; not enough to start
  carrying meaning.
- **Decorative only.** If the color carries WCAG contrast — text on a fill, a focus ring, an error
  indicator — use a semantic token instead; those are the only ones tuned for contrast.

**The cost:** semantic tokens flip with `wa-light` / `wa-dark` because they re-resolve through theme
assignments. Palette tints don't. So when you reach for a palette tint, you owe a matching
`.wa-dark` override that picks the mirrored step on the scale:

```css
.subtle-band {
  background-color: var(--wa-color-neutral-90);
}
.wa-dark .subtle-band {
  background-color: var(--wa-color-neutral-10);
}
```

Skip the override and the band stays at the same near-white tint in dark mode, which is the breakage the
semantic layer exists to prevent.

### `loud` / `normal` / `quiet`: your contrast lever

Each semantic role exposes three weight steps for fills, borders, and their matching on (text) color.
Moving an element between steps keeps its role (brand stays brand) and shifts its emphasis, which is the
§3 "quiet the surroundings" principle expressed in color: drop competing elements to `quiet`, leave the
focal one at `loud`. How to use the steps, pair `fill-*` with the same step's `on-*` text, and build a
themed border with `*-border-*`: [composition.md § Custom CSS](composition.md#custom-css). Mixing steps is
the most common visual bug in Web Awesome output; dark-on-dark or washed-out text after a restyle almost
always traces back to it. For secondary buttons on colored bands, see the
[landing page CTA band](patterns.md#marketing-landing-page-full-page-wa-page).

### Flip the contrast to keep brand color from going dark

The `fill-quiet` + `on-quiet` token pair gives you a "soft brand card" without needing white text.
Set `background: var(--wa-color-brand-fill-quiet); color: var(--wa-color-brand-on-quiet);` and you
get a brand-tinted background with brand-colored text that hits WCAG 4.5:1 — accessible without
darkening the brand color. The conventional alternative (white text on a brand-saturated background)
often forces the brand very dark to meet contrast; the flip preserves brand presence and stops the
component shouting.

### Neutrals are tinted; trust the shipping palettes

WA's neutral palettes are slightly tinted by design — warm or cool depending on the palette you
pick — because pure desaturated grays feel cold and computery. Shipping palettes also compensate for
the fact that saturation has less visible effect near 0% and 100% lightness, so the lighter and
darker neutrals don't go flat. **Don't override `--wa-color-neutral-*` with `hsl(0 0% N%)` "true
grays" — you'll lose the temperature.** If you build custom shades, rotate the hue toward a brighter
neighbor (yellow/cyan/magenta) when lightening, rather than just dropping saturation.

### Color reinforces a signal; it never carries it

`<wa-callout>` and `<wa-badge>` both accept a slotted `<wa-icon>` — use it whenever the component's
meaning depends on color. Color alone doesn't survive color-vision deficiency (about 8% of men, 0.5%
of women), sunlight glare, low-contrast displays, or grayscale screenshots, so it should reinforce a
signal, never carry it. A red badge is invisible to a red-green colorblind user; a red badge with a
warning icon isn't.

---

## 2. Depth via tokens, not artistry

### `<wa-page>` layers with z-index, not shadow

The page grid bakes layering into its regions: the sticky banner, header, and subheader sit at
`z-index: 5` and the sticky menu and aside at `z-index: 4`, so content scrolls beneath them. None carry a
built-in shadow. A `<wa-card>` inside main is what the surface tokens raise. For a header that casts a
shadow as content scrolls under it, set `box-shadow: var(--wa-shadow-s)` on `wa-page::part(header)`.

### Picture an overhead light source

`--wa-shadow-s` / `--wa-shadow-m` / `--wa-shadow-l` encode an overhead-light model — raised surfaces
catch light at the top edge and cast a shadow below; recessed surfaces catch light at the bottom
edge and shadow at the top. Reach for the tokens first; hand-rolled shadow values tend to drift on
angle or intensity unless you're deliberately designing a custom elevation system.

### Match shadow size to z-axis position

The shadow tokens form an elevation ladder, and each WA component picks the rung that matches
where it sits: `--wa-shadow-s` for elements barely off the page (`<wa-card>`), `--wa-shadow-m` for
inline overlays (`<wa-dropdown>`), `--wa-shadow-l` for elements that float in front of everything
(`<wa-popover>`, `<wa-dialog>`, `<wa-drawer>`). When you build custom surfaces, pick the size by
where the element belongs on the z-axis, not by what looks pleasing in isolation.

**Common miss:** the same `--wa-shadow-l` on a card and a dialog — the card reads as floating into
the user's face when it should sit just off the page.

### Surface color does depth without shadows

`--wa-color-surface-raised` / `--wa-color-surface-default` / `--wa-color-surface-lowered` ship as an
elevation triad expressed through surface color rather than shadow. Use the raised token for cards
and popovers (lighter, lifted off the page surface), the lowered token for wells, insets, and
inactive panels (darker, recessed into it). Same depth signal as shadows; same mental model; no
shadow values required.

### Cross container boundaries to suggest depth

Lift a foreground element across a section boundary with a token-based negative margin:
`margin-block-start: calc(-1 * var(--wa-space-l))`. A card that straddles the boundary between two
background colors reads as "above" both; a button that overlaps a card's top edge reads as attached
to it. Source order usually stacks the lifted element above its sibling — if not, add
`position: relative; z-index: 1`.

---

## 3. Make hierarchy do the work, not styling

### Hierarchy lives in the layout, not just inside elements

A `<wa-page>` is itself a hierarchy: the **banner** is the loudest band (announcements), the
**header** carries identity, the **subheader** holds context (breadcrumbs), **main** is the focus,
the **aside** is supporting, the **footer** is lowest. Reading the page as a hierarchy tells you
which slots should be quiet by default.

**In Web Awesome:** put aside content in `wa-color-text-quiet`. Give the footer a recessed feel with
`--wa-color-surface-lowered`. Reserve the `banner` slot for a single loud band when you need user
attention, not as a permanent fixture — `<wa-page>` hides empty slots, so an empty `banner` adds
nothing.

### Hierarchy reads on three axes — let the utilities apply all three

WA's text utilities (`wa-heading-*`, `wa-body-*`, `wa-caption-*`) ship a size, a weight, and a
line-height tuned to work together; pairing them with `wa-color-text-normal` / `-quiet` / `-link`
adds the color axis. Two weights × three text colors covers almost every UI situation — size on its
own is a noisy hierarchy lever that exhausts fast.

**Stay on the body / heading weight tier the text utilities ship with.** WA does also expose
`wa-font-weight-light`, `-normal`, `-semibold`, and `-bold` for explicit overrides — reach for
those only when the heading-vs-body tier genuinely doesn't fit. Adding more weights into the mix
usually adds noise, not hierarchy.

**Common miss:** an 11px metadata line next to an oversized headline. Pair `wa-caption-m` with a
smaller heading instead — the relationship reads at readable sizes.

### Quiet the surroundings to lift the focal element

WA exposes a quiet treatment for nearly every surface — `wa-color-text-quiet` for text,
`<wa-card appearance="plain">` for cards, `--wa-color-surface-lowered` for a sidebar that recedes.
They're not just decorative options; they're the lever for de-emphasizing surroundings so the focal
element rises. When a primary element doesn't pop, this is usually the first move — quiet the
competitors rather than piling more weight on the focus.

This is the [§1 contrast lever](#loud--normal--quiet-your-contrast-lever) applied at the element
level.

### Buttons stack by importance, not by semantics

The `<wa-button>` attributes encode importance directly: `variant="brand"` is the primary (loud) and
`appearance="plain"` the secondary (quiet). Reach for `appearance="outlined"` when a secondary needs a
visible edge, such as on a busy surface. One primary per view, and it's the loud one.
"Destructive" doesn't automatically mean "primary" — if Delete isn't the page's main action, keep
its trigger secondary; reserve `variant="danger"` for the confirm button inside the `<wa-dialog>` it
opens.

Lay them out with `wa-split` (primary at one end, secondary/cancel at the other) for header bars
and dialog footers, or `wa-cluster wa-justify-content-end` for grouped end-aligned action rows.

### Compensate weight with color, not more weight

Solid icons cover more pixels than text glyphs, so they read emphasized; 1px hairlines disappear
against busy UI. WA exposes two dials for the compensation: text color (`wa-color-text-quiet` to
dim a heavy element) and border width (`--wa-border-width-s` → `--wa-border-width-m` to amplify a
faint one). Pull them in opposite directions and the balance comes back — usually the width or color
change alone is enough.

### Visual hierarchy ≠ document hierarchy

WA's text utilities (`wa-caption-*`, `wa-heading-*`, `wa-body-*`, `wa-visually-hidden`) and HTML
semantics (`<h1>`–`<h6>`) are independent dimensions. Pick the HTML element for document semantics
(screen readers, outline) and apply whatever utility the layout needs visually. A section title
that's really a label can be a small `<h2 class="wa-caption-m">`; if the surrounding content speaks
for itself, the heading can stay `wa-visually-hidden`.

**Common miss:** a 40px "Manage account" `<h1>` shouting over the actual settings beneath it.

### Split labels and values across text tiers

The default `Label: value` layout renders both at the same style, which masks what's the
information and what's the framing. WA's text utilities solve this when you split the two across
tiers: render labels with `wa-caption-*` or `wa-color-text-quiet`, render values at the default
body style. Often the label can drop entirely — formats like timestamps, URLs, and dollar figures
announce what they are.

**Common miss:** `Email: ada@example.com` and `Joined: March 2021` as a labeled grid where the
labels are the loudest text on the page.

---

## 4. Spacing is a system, not a tweak

### Begin loose; tighten only with reason

WA's spacing utilities span eleven steps (`wa-gap-3xs` through `wa-gap-5xl`, plus `wa-gap-0`), but
four cover most of what a layout needs. Start with `wa-gap-l` (24px) between blocks and `wa-gap-m` (16px) between
related items, then tighten with `wa-gap-xs` (8px) or `wa-gap-2xs` (4px) for closely related
controls — the tighter steps shouldn't be the default rhythm. Building margin upward until things
"look OK" produces cramped UIs; loosening from a generous default produces breathing room you can
trim back.

### Web Awesome's spacing scale is non-linear on purpose

The tokens jump non-linearly ([values](composition.md#spacing-rhythm)). The gaps between steps are large
enough that 12px and 16px are different decisions, not different shades of the same one. Pick the right
step, not the right pixel.

**Common miss:** `padding: 14px` because `wa-gap-s` (12px) feels tight and `wa-gap-m` (16px) feels
loose. Pick one — the difference doesn't read once the rest of the page is on the scale.

### Space between groups beats space within them

Nest `wa-stack` containers with mismatched `wa-gap-*` to express grouping spatially: a `wa-stack
wa-gap-2xs` for the elements inside a group (label, input), wrapped in a parent `wa-stack wa-gap-l`
for the gaps between groups. When the inner gap is smaller than the outer, the grouping reads as
obvious without any borders or backgrounds. Form labels sit closer to their inputs than to the next
field; bullet lines closer to their own glyph than to the next bullet; section headings get more air
above than below.

### Fixed widths beat fluid grids for intrinsic sizes

`<wa-page>`'s grid uses fixed `--menu-width` / `--aside-width` for the sidebars and flexes `main` to
whatever's left — because a sidebar has an optimal width that doesn't benefit from stretching.
`wa-grid` follows the same idea for tile grids: `--min-column-size` defines a content-width minimum,
and the column count flexes around it. Both avoid the percentage-grid trap of stretching things past
their readable size as the viewport grows.

### Don't fill the screen just because it's there

Constrain readable columns with `max-inline-size: 60ch`–`75ch` even when the viewport is wider. A
600px form on a 1440px monitor doesn't need to stretch — spreading content wider makes it harder to
read, not more "designed." Pages don't need to be full-bleed and sections don't need to span their
parent. For multi-element long-form blocks, see §5 below.

### Full-bleed band, contained content — the canonical `<wa-page>` rhythm

On a full page, the recurring decision is "section background runs edge-to-edge; readable content sits
in a constrained inner column." It's the "don't fill the screen" principle at the layout scale. The
[landing page recipe](patterns.md#marketing-landing-page-full-page-wa-page) encodes it: `main` padding
zeroed, a `.section` gutter class, and a centered `.section-inner` capped at `75ch`.

### Don't scale proportionally across breakpoints

Set the type size deliberately at each breakpoint by swapping `--wa-font-size-*` tokens
(`--wa-font-size-3xl` for a desktop hero, `--wa-font-size-xl` on mobile) rather than relying on `em`
cascades. The ratio between body and heading should actually change at small widths — a 24px heading
next to 14px body works because we're picking the right size for the context, not zooming the
desktop layout down.

---

## 5. Typography earns its weight

### Hand-pick a small type scale and reuse it

Web Awesome's `--wa-font-size-*` tokens are a 1.125 modular ramp tuned to land on whole pixels
([values](composition.md#typography)). Pick three or four sizes for a page — typically caption, body,
heading, and an optional display — and reuse them. If you find yourself using six different sizes,
two of them are unnecessary.

**Common miss:** six sizes where three would do.

For a **multi-element long-form block** — an article, a docs page, a marketing section that mixes
headings with paragraphs and lists — wrap it in `wa-prose` and it handles `h1`–`h6` in `em` along
with the asymmetric spacing rhythm. That's the only case `wa-prose` is for; anywhere you're sizing
a single heading, a card title, or app UI, the size tokens are still the right tool.

### Line length is 45–75 characters

WA gives you three tools for keeping text in a comfortable reading column — `wa-prose`,
`wa-longform-*`, and `wa-text-balance` / `wa-text-pretty`. None are interchangeable; each is scoped
to a specific block shape, and together they cover the 45–75 character band where the eye can track
from line to line.

- A **multi-element long-form block** (article, docs page, marketing copy that mixes headings,
  paragraphs, and lists): wrap it in `wa-prose`. The utility sets a 65ch reading column and lays in
  asymmetric heading rhythm in a single class. Don't reach for `wa-prose` on a single paragraph,
  app UI, or anywhere outside actual long-form content — it's a container utility, not a default.
- A **single body element** outside a prose container (a card blurb, an isolated paragraph): the
  `wa-longform-*` text utilities tune font-size and leading for reading, without imposing
  multi-element rhythm.
- **Short blocks where the last line tends to widow** (headings, hero copy, callouts):
  `wa-text-balance` rebalances line breaks across the block; `wa-text-pretty` does the same for
  paragraphs with looser constraints.

None of these need a `<br>` tag.

### Align mixed text sizes by their baseline

Add `wa-align-items-baseline` to any `wa-cluster` or `wa-split` that mixes text sizes — it aligns
children by their text baseline instead of the default centered cross-axis. A row with a 20px title
on the left and a 14px action on the right looks subtly off when center-aligned vertically (the two
baselines float out of sync); baseline alignment is the lever that gets the eye to recognize the
alignment immediately.

### Reserve link color for prose

Use `wa-color-text-link` only on in-prose anchors; in navigation, sidebars, and breadcrumbs, use
`wa-color-text-normal` or `wa-color-text-quiet` instead. The three text-color utilities exist as a
tiered set precisely because not every link benefits from looking different from neighboring text —
when 80% of a sidebar is links, a heavier weight or darker neutral does the discriminating work
without making the whole sidebar shout. On hover, escalate to color or an underline.

---

## 6. Finishing moves

### An accent stripe goes a long way

WA exposes two cheap surfaces for an accent stripe: a `<wa-card>`'s host border (the same
mechanism that [composition.md § Borders on colored backgrounds](composition.md#borders-on-colored-backgrounds)
uses for re-coloring on a colored band) and `<wa-page>`'s `banner` slot. Either gives you brand
presence for the cost of one rule. Inactive items stay plain; the active one earns the accent.

**On a card** — set a top border directly on the host:

```css
.featured-card {
  border-block-start: var(--wa-border-width-l) solid var(--wa-color-brand-fill-loud);
}
```

**Across the entire layout** — `<wa-page>`'s `banner` slot is hidden when empty, so it costs nothing
to leave unused. Drop in a thin colored band when you want a stripe spanning the full layout, no
hand-rolled positioning required:

```html
<wa-page>
  <div slot="banner" class="accent-stripe"></div>
  …
</wa-page>

<style>
  .accent-stripe {
    padding: 0;
    block-size: var(--wa-space-2xs);
    background-color: var(--wa-color-brand-fill-loud);
  }
</style>
```

### Theme the browser defaults

Browser default styles for bullet lists, blockquotes, checkboxes, and radio buttons don't pick up
your theme — they're styled by the browser, frozen at whatever the user agent decided. Polish
accumulates fastest by replacing them with themed equivalents that pull from your `--wa-*` tokens.
For checkboxes and radios, WA already ships the themed equivalents (`<wa-checkbox>` and `<wa-radio>`)
— use them instead of native inputs. For bullets and quotes, a few lines of CSS pulling from the
token system get the same effect.

The recipes below are **starting points, not paste-in snippets**. Read what each rule does and adapt
the selector's scope to match where you want the treatment applied — a bare element selector reaches
every instance on the page. See [composition.md § Custom CSS](composition.md#custom-css), playbook
point 8.

**Icon bullets** — replace native list markers with `<wa-icon>` glyphs:

```html
<ul class="wa-list-plain wa-stack wa-gap-xs">
  <li class="wa-cluster wa-gap-s wa-align-items-start">
    <wa-icon class="branded-list-glyph" name="check"></wa-icon>
    <span>List item content.</span>
  </li>
</ul>

<style>
  .branded-list-glyph {
    color: var(--wa-color-brand-fill-loud);
  }
</style>
```

**Form controls** — `<wa-checkbox>` and `<wa-radio>` are already themed: their selected state, focus
ring, and dark-mode behavior all come from your theme's tokens (the default palettes render the
checkmark in the brand color). Use them instead of native `<input type="checkbox">` or
`<input type="radio">` to inherit all of that for free.

**Blockquotes** — a left accent stripe lifts a wall of quoted text immediately:

```css
blockquote {
  border-inline-start: var(--wa-border-width-l) solid var(--wa-color-brand-fill-loud);
  padding-inline-start: var(--wa-space-m);
  color: var(--wa-color-text-quiet);
}
```

This rule targets the raw `blockquote` element on purpose — every quote in the document gets the
treatment, which is the point of restyling a default. If you want the look on only some quotes
(pull quotes, branded callouts), scope it to a class (`.pull-quote { … }`) and apply that class
deliberately.

### Try spacing, color, or shadow before a border

`<wa-card appearance="filled">` or `<wa-card appearance="plain">` drop the default outline, and
pairing adjacent cards with `--wa-color-surface-raised` vs. `--wa-color-surface-lowered` distinguishes
them without lines. Three WA mechanisms do the separator job that borders usually get reached for:
surface-color shift, subtle shadow (`--wa-shadow-s`), and extra `wa-gap-*` spacing. Borders aren't
the only way to separate two regions, and usually they're the loudest option — try the other three
first.

### Title + action rows want `wa-split`, not `wa-cluster`

A heading on one side and an action on the other is `wa-split`, which pushes the first and last
children apart ([example](layouts-inpage.md#toolbar--section-header-with-an-action)). `wa-cluster` is for
groups that pack together; `wa-flank` is for a fixed icon beside flexible text.

### Section backgrounds are fields, not features

The `fill-quiet` step on each semantic role exists for surfaces that need to be distinguishable but
not loud — `--wa-color-brand-fill-quiet` for a brand-tinted band, success-fill-quiet for a soft
success state, etc. Keep contrast against the content low so the section background reads as a
field, not a feature. For a soft gradient, pair `fill-quiet` with `fill-normal` of the same role:
`linear-gradient(var(--wa-color-brand-fill-quiet), var(--wa-color-brand-fill-normal))`. Two hues
within ~30° of each other read as natural light; further apart looks like a sticker.

### Common components can do uncommon things

WA's component slots are wider than the canonical use cases suggest. A `<wa-dropdown>` holds
`<wa-dropdown-item>`s, which take an `icon` slot and a `details` slot for supporting text; for columns or
arbitrary content, use a `<wa-popover>`. `<wa-card>` containing a `<wa-radio>` is a valid selectable-card
pattern. `<wa-tab-group>` panels hold any markup, not just lists. A radio group of two big choices reads
better as selectable cards than labeled circles; a table column can stack label and value vertically
when the column isn't sortable.

---

## 7. Empty and edge states

### Design the empty state first, not last

The empty-state pattern is a centered `wa-stack wa-gap-l wa-align-items-center wa-text-center` block:
a large `<wa-icon>`, an `<h2 class="wa-heading-l">`, supporting copy in `wa-color-text-quiet`, and a
`<wa-button variant="brand">` CTA. Build it from the moment the feature exists, not after — empty
states are a new user's first interaction with a feature, and a bare "No items yet" is a missed
first impression. Hide adjacent UI (tabs, filters, search) until there's something to act on; inert
controls just communicate "this thing is broken."

```html
<div class="wa-stack wa-gap-l wa-align-items-center wa-text-center empty-state">
  <wa-icon class="empty-state-glyph" name="inbox"></wa-icon>
  <h2 class="wa-heading-l">No invoices yet</h2>
  <p class="wa-color-text-quiet">Once you send your first invoice, you'll see it here.</p>
  <wa-button variant="brand">Create invoice</wa-button>
</div>

<style>
  .empty-state {
    max-inline-size: 50ch;
    margin-inline: auto;
  }
  .empty-state-glyph {
    font-size: var(--wa-font-size-4xl);
    color: var(--wa-color-text-quiet);
  }
</style>
```

### Control user-uploaded image shapes

`wa-frame` (with one of `wa-frame:square`, `wa-frame:landscape`, `wa-frame:portrait` as a modifier)
crops user-uploaded images to a consistent aspect ratio — the layout stays put regardless of what
the user uploads. For people, prefer `<wa-avatar>` instead; it renders a clean initials/icon
placeholder when `image` is absent. To prevent edge bleed against same-colored backgrounds, add an
inner shadow or semi-transparent inner border.

### Loading and busy states are part of the design

`<wa-skeleton>` (content-shaped placeholders), `<wa-spinner>` (tight inline busy state), and
`<wa-button loading>` (action-button waits) cover the three places where a UI pauses. Pick the one
that matches the wait — a page-section load wants skeletons, an inline status check wants a spinner,
a submitted form wants the button's `loading` state. A skeleton or spinner doesn't "look unfinished"
— its absence does.

---

These principles live _above_ the rest of the references — they explain why the tokens and utilities
exist. The other references explain how to use them.
