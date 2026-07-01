---
title: Button
layout: component
category: Actions
synonyms:
  - btn
  - action
  - CTA
  - submit
use-cases:
  - form submit
  - link button
  - icon button
  - loading button
---

```html {.example}
<wa-button>Save</wa-button>
```

## Examples

### Variants

Use the `variant` attribute to set the button's [semantic variant](/docs/theming-overview#variants).

```html {.example}
<div class="wa-cluster wa-gap-2xs">
  <wa-button variant="neutral">Neutral</wa-button>
  <wa-button variant="brand">Brand</wa-button>
  <wa-button variant="success">Success</wa-button>
  <wa-button variant="warning">Warning</wa-button>
  <wa-button variant="danger">Danger</wa-button>
</div>
```

### Appearance

Use the `appearance` attribute to change the button's visual appearance. Pair it with any `variant` for the full matrix.

```html {.example}
<div class="wa-stack">
  <div class="wa-cluster wa-gap-2xs">
    <wa-button appearance="accent" variant="neutral">Accent</wa-button>
    <wa-button appearance="filled-outlined" variant="neutral">Filled-Outlined</wa-button>
    <wa-button appearance="filled" variant="neutral">Filled</wa-button>
    <wa-button appearance="outlined" variant="neutral">Outlined</wa-button>
    <wa-button appearance="plain" variant="neutral">Plain</wa-button>
  </div>
  <div class="wa-cluster wa-gap-2xs">
    <wa-button appearance="accent" variant="brand">Accent</wa-button>
    <wa-button appearance="filled-outlined" variant="brand">Filled-Outlined</wa-button>
    <wa-button appearance="filled" variant="brand">Filled</wa-button>
    <wa-button appearance="outlined" variant="brand">Outlined</wa-button>
    <wa-button appearance="plain" variant="brand">Plain</wa-button>
  </div>
  <div class="wa-cluster wa-gap-2xs">
    <wa-button appearance="accent" variant="success">Accent</wa-button>
    <wa-button appearance="filled-outlined" variant="success">Filled-Outlined</wa-button>
    <wa-button appearance="filled" variant="success">Filled</wa-button>
    <wa-button appearance="outlined" variant="success">Outlined</wa-button>
    <wa-button appearance="plain" variant="success">Plain</wa-button>
  </div>
  <div class="wa-cluster wa-gap-2xs">
    <wa-button appearance="accent" variant="warning">Accent</wa-button>
    <wa-button appearance="filled-outlined" variant="warning">Filled-Outlined</wa-button>
    <wa-button appearance="filled" variant="warning">Filled</wa-button>
    <wa-button appearance="outlined" variant="warning">Outlined</wa-button>
    <wa-button appearance="plain" variant="warning">Plain</wa-button>
  </div>
  <div class="wa-cluster wa-gap-2xs">
    <wa-button appearance="accent" variant="danger">Accent</wa-button>
    <wa-button appearance="filled-outlined" variant="danger">Filled-Outlined</wa-button>
    <wa-button appearance="filled" variant="danger">Filled</wa-button>
    <wa-button appearance="outlined" variant="danger">Outlined</wa-button>
    <wa-button appearance="plain" variant="danger">Plain</wa-button>
  </div>
</div>
```

### Sizes

Use the `size` attribute to change a button's size.

```html {.example}
<div class="wa-cluster wa-gap-2xs">
  <wa-button size="xs">Extra Small</wa-button>
  <wa-button size="s">Small</wa-button>
  <wa-button size="m">Medium</wa-button>
  <wa-button size="l">Large</wa-button>
  <wa-button size="xl">Extra Large</wa-button>
</div>
```

### Pill

Use the `pill` attribute to give buttons rounded edges.

```html {.example}
<wa-button pill>Pill Button</wa-button>
```

### Link Buttons

Set the `href` attribute to render the button as an `<a>` under the hood. Provides all the browser's native link behavior (e.g. [[CMD/CTRL/SHIFT]] + [[CLICK]]) plus the `rel`, `target`, and `download` attributes.

```html {.example}
<div class="wa-cluster wa-gap-2xs">
  <wa-button href="https://example.com/">Link</wa-button>
  <wa-button href="https://example.com/" target="_blank">New Window</wa-button>
  <wa-button href="/assets/images/logo.svg" download="shoelace.svg">Download</wa-button>
</div>
```

### Icon Buttons

When an [icon](/docs/components/icon) is the only thing slotted into the label, the button becomes an icon button. Icon buttons work with any appearance or variant.

```html {.example}
<div class="wa-cluster wa-gap-2xs">
  <wa-button variant="neutral" appearance="accent"><wa-icon name="house" label="Home"></wa-icon></wa-button>
  <wa-button variant="neutral" appearance="outlined"><wa-icon name="house" label="Home"></wa-icon></wa-button>
  <wa-button variant="neutral" appearance="filled"><wa-icon name="house" label="Home"></wa-icon></wa-button>
  <wa-button variant="neutral" appearance="plain"><wa-icon name="house" label="Home"></wa-icon></wa-button>
</div>
```

:::warning
<strong>Give icon-only buttons a label.</strong><br />
With no text to announce, a screen reader has nothing to read. Add `label` to the icon (`<wa-icon name="house" label="Home">`) so the button has an accessible name.
:::

### Start & End Decorations

Use the `start` and `end` slots to add presentational elements like `<wa-icon>` beside the button label.

```html {.example}
<div class="wa-cluster wa-gap-2xs">
  <wa-button>
    <wa-icon slot="start" name="gear"></wa-icon>
    Settings
  </wa-button>

  <wa-button>
    <wa-icon slot="end" name="undo"></wa-icon>
    Refresh
  </wa-button>

  <wa-button>
    <wa-icon slot="start" name="link"></wa-icon>
    <wa-icon slot="end" name="arrow-up-right-from-square"></wa-icon>
    Open
  </wa-button>
</div>
```

### Caret

Use the `with-caret` attribute to add a dropdown indicator when a button triggers a dropdown, menu, or popover.

```html {.example}
<wa-button with-caret>Options</wa-button>
```

### Loading

Use the `loading` attribute to put a button in a busy state. Its width stays the same, so adjacent elements don't shift.

```html {.example}
<div class="wa-cluster wa-gap-2xs">
  <wa-button variant="brand" loading>Brand</wa-button>
  <wa-button variant="success" loading>Success</wa-button>
  <wa-button variant="neutral" loading>Neutral</wa-button>
  <wa-button variant="warning" loading>Warning</wa-button>
  <wa-button variant="danger" loading>Danger</wa-button>
</div>
```

### Disabled

Use the `disabled` attribute to disable a button. It works on link buttons too.

```html {.example}
<div class="wa-stack">
  <div class="wa-cluster wa-gap-2xs">
    <wa-button variant="brand" disabled>Brand</wa-button>
    <wa-button variant="success" disabled>Success</wa-button>
    <wa-button variant="neutral" disabled>Neutral</wa-button>
    <wa-button variant="warning" disabled>Warning</wa-button>
    <wa-button variant="danger" disabled>Danger</wa-button>
  </div>

  <div class="wa-cluster wa-gap-2xs">
    <wa-button href="https://example.com/" disabled>Link</wa-button>
    <wa-button href="https://example.com/" target="_blank" disabled>New Window</wa-button>
    <wa-button href="/assets/images/logo.svg" download="shoelace.svg" disabled>Download</wa-button>
  </div>
</div>
```

### Custom Width

Give a button a custom `width` to size it independently of its content — useful for making buttons span their container on smaller screens.

```html {.example}
<wa-button style="width: 100%;">Save</wa-button>
```

### Customizing

Target the `base` part to restyle a button from the outside. Use a custom class when you're adding a new variation; to retheme an existing one, target its `variant` attribute instead (e.g. `wa-button[variant="brand"]`).

```html {.example}
<wa-button class="pink">Pink Button</wa-button>

<style>
  wa-button.pink::part(base) {
    border-radius: 6px;
    border: solid 2px;
    background: #ff1493;
    border-top-color: #ff7ac1;
    border-left-color: #ff7ac1;
    border-bottom-color: #ad005c;
    border-right-color: #ad005c;
    color: white;
    font-size: 1.125rem;
    box-shadow: 0 2px 10px #0002;
    transition: all var(--wa-transition-slow) var(--wa-transition-easing);
  }

  wa-button.pink::part(base):hover {
    transform: scale(1.05);
  }

  wa-button.pink::part(base):active {
    border-top-color: #ad005c;
    border-right-color: #ff7ac1;
    border-bottom-color: #ff7ac1;
    border-left-color: #ad005c;
    transform: translateY(1px);
  }

  wa-button.pink::part(base):focus-visible {
    outline: dashed 2px deeppink;
    outline-offset: 4px;
  }
</style>
```
