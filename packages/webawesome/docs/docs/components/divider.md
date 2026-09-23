---
title: Divider
layout: component
category: Layout
synonyms:
  - separator
  - rule
  - line
  - hr
  - horizontal rule
use-cases:
  - section divider
  - content separator
  - visual break
---

```html {.example}
<wa-divider></wa-divider>
```

```html {.example .anatomy-only}
<wa-divider>or</wa-divider>
```

## Examples

### Width

Use the `--width` custom property to change the width of the divider.

```html {.example}
<wa-divider style="--width: 4px;"></wa-divider>
```

### Color

Use the `--color` custom property to change the color of the divider.

```html {.example}
<wa-divider style="--color: var(--wa-color-brand-fill-loud);"></wa-divider>
```

### Spacing

Use the `--spacing` custom property to change the amount of space between the divider and its neighboring elements.

```html {.example}
<div class="wa-text-center">
  Above
  <wa-divider style="--spacing: 2rem;"></wa-divider>
  Below
</div>
```

### Orientation

The default orientation for dividers is `horizontal`. Set the `orientation` attribute to `vertical` to draw a vertical divider. The divider will span the full height of its [Flexbox](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox) or [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid) container.

```html {.example}
<div style="display: flex; align-items: center;">
  First
  <wa-divider orientation="vertical"></wa-divider>
  Middle
  <wa-divider orientation="vertical"></wa-divider>
  Last
</div>
```

:::info
If your container isn't Flexbox or CSS Grid, you may need to set an explicit height for the divider.
:::

### Label

Slot in text to show a label in the center of the divider. Labels separate alternatives, such as two ways to sign in.

```html {.example}
<div class="wa-stack" style="max-width: 20rem;">
  <wa-button appearance="filled" variant="brand">
    <wa-icon slot="start" name="envelope"></wa-icon>
    Sign In with Email
  </wa-button>
  <wa-divider>or</wa-divider>
  <wa-button appearance="outlined">
    <wa-icon slot="start" name="key"></wa-icon>
    Use a Passkey
  </wa-button>
</div>
```

Vertical dividers center the label, too.

```html {.example}
<div class="wa-cluster wa-flex-nowrap">
  <wa-card class="wa-text-center">
    <strong>Tabs</strong><br />
    One keystroke
  </wa-card>
  <wa-divider orientation="vertical">vs</wa-divider>
  <wa-card class="wa-text-center">
    <strong>Spaces</strong><br />
    Same everywhere
  </wa-card>
</div>
```

:::info
<strong>Rendering on the server? Add the `with-label` attribute.</strong><br />
The label is centered once the component hydrates; `with-label` lays it out in the server-rendered markup. See [Server-Side Rendering](#ssr).
:::

### Label Placement

Use the `label-placement` attribute to move the label toward either end of the divider.

| Placement                                                                                                                                                                                | Best for                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `start`                                                                                                                                                                                  | Section labels that read like a heading on the line. |
| <span class="wa-cluster wa-flex-nowrap wa-gap-3xs">`center` <wa-badge appearance="outlined" variant="neutral" pill style="font-size: var(--wa-font-size-2xs);">default</wa-badge></span> | Alternatives, such as "or" between two options.      |
| `end`                                                                                                                                                                                    | Markers that trail content, such as a "new" line.    |

The `--label-offset` custom property adds a line between the divider's edge and a `start` or `end` label. It's `0` by default, so the label sits `--label-spacing` from the edge.

```html {.example}
<wa-divider label-placement="start">Start</wa-divider>
<wa-divider label-placement="center">Center</wa-divider>
<wa-divider label-placement="end">End</wa-divider>
<wa-divider label-placement="start" style="--label-offset: 4rem;">Start, offset 4rem</wa-divider>
```

### Label Spacing

Use the `--label-spacing` custom property to change the amount of space between the label and the divider's lines.

```html {.example}
<wa-divider>Default</wa-divider>
<wa-divider style="--label-spacing: var(--wa-space-xl);">Custom --label-spacing (xl)</wa-divider>
```

### Decorative Labels

Slot in icons for a quiet break between sections, or place one at the `start` or `end` to open or close a passage. Size and space them by targeting the `label` part, and tint the line and the icon separately with the `--color` custom property and the part's `color`. Decorative labels don't need an accessible name.

```html {.example}
<div class="wa-stack">
  <wa-divider class="divider-flourish">
    <wa-icon family="brands" name="web-awesome"></wa-icon>
  </wa-divider>

  <wa-divider class="divider-flourish divider-nature">
    <wa-icon name="seedling" variant="solid"></wa-icon>
    <wa-icon name="leaf" variant="solid"></wa-icon>
    <wa-icon name="tree" variant="solid"></wa-icon>
  </wa-divider>

  <wa-divider class="divider-flourish" label-placement="start">
    <wa-icon name="quote-left" variant="solid"></wa-icon>
  </wa-divider>

  <wa-divider class="divider-flourish" label-placement="end">
    <wa-icon name="quote-right" variant="solid"></wa-icon>
  </wa-divider>
</div>

<style>
  .divider-flourish::part(label) {
    gap: var(--wa-space-xs);
  }

  .divider-nature {
    --color: var(--wa-color-success-border-quiet);
  }

  .divider-nature::part(label) {
    color: var(--wa-color-success-on-quiet);
  }
</style>
```

### Dropdown Dividers

Use dividers in [dropdowns](/docs/components/dropdown) to visually group dropdown items. To name a group, use a [heading](/docs/components/dropdown#showing-labels-and-dividers) instead of a labeled divider, so the name is exposed to assistive technology.

```html {.example}
<wa-dropdown style="max-width: 200px;">
  <wa-button appearance="filled" slot="trigger" with-caret>Menu</wa-button>
  <wa-dropdown-item value="1">Option 1</wa-dropdown-item>
  <wa-dropdown-item value="2">Option 2</wa-dropdown-item>
  <wa-dropdown-item value="3">Option 3</wa-dropdown-item>
  <wa-divider></wa-divider>
  <wa-dropdown-item value="4">Option 4</wa-dropdown-item>
  <wa-dropdown-item value="5">Option 5</wa-dropdown-item>
  <wa-dropdown-item value="6">Option 6</wa-dropdown-item>
</wa-dropdown>
```

## Accessibility Considerations

Dividers have the `separator` role, which hides their contents from assistive technology. When you slot in text, the divider takes it as its accessible name, so a screen reader announces "or" rather than skipping the label. An `aria-label` attribute on the divider overrides the slotted text.

An icon-only label has no text to borrow. If the icon carries meaning, give the divider an `aria-label`. Setting `label` on the icon has no effect here because the separator hides it. Decorative labels, such as a row of stars, need nothing extra.

Because the separator hides its contents, never place a button, link, or other interactive control in a label. Keyboard users can still focus it, but screen readers won't announce it. Put the control before or after the divider instead.
