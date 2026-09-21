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

### Labels

Slot in content to show a label in the center of the divider. Labels work well for separating alternatives, such as two ways to sign in.

```html {.example}
<div class="wa-text-center">
  Sign in with your email
  <wa-divider>OR</wa-divider>
  Sign in with a passkey
</div>
```

Labels are centered in vertical dividers, too.

```html {.example}
<div style="display: flex; align-items: stretch; height: 8rem;">
  <div style="align-self: center;">Sign in with your email</div>
  <wa-divider orientation="vertical">OR</wa-divider>
  <div style="align-self: center;">Sign in with a passkey</div>
</div>
```

Use the `--label-spacing` custom property to change the amount of space between the label and the divider's lines. To restyle the label itself, target the `label` part.

```html {.example}
<wa-divider class="divider-label" aria-label="Featured" style="--label-spacing: 2rem;">
  <wa-icon name="star" variant="solid"></wa-icon>
</wa-divider>

<style>
  .divider-label::part(label) {
    color: var(--wa-color-brand-on-quiet);
    font-size: var(--wa-font-size-l);
  }
</style>
```

### Dropdown Dividers

Use dividers in [dropdowns](/docs/components/dropdown) to visually group dropdown items.

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
