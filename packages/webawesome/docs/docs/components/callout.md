---
title: Callout
layout: component
category: Feedback
synonyms:
  - alert
  - admonition
  - notice
  - banner
  - infobox
use-cases:
  - warning message
  - info message
  - tip
  - important note
---

```html {.example}
<wa-callout>
  <wa-icon slot="icon" name="circle-info"></wa-icon>
  This is a standard callout. You can customize its content and even the icon.
</wa-callout>
```

## Examples

### Variants

Set the `variant` attribute to match the callout to its message.

```html {.example}
<div class="wa-stack">
  <wa-callout variant="brand">
    <wa-icon slot="icon" name="circle-info"></wa-icon>
    <strong>A new theme is available</strong><br />
    Try it from Settings whenever you're ready.
  </wa-callout>

  <wa-callout variant="success">
    <wa-icon slot="icon" name="circle-check"></wa-icon>
    <strong>Your changes have been saved</strong><br />
    You can safely close this tab now.
  </wa-callout>

  <wa-callout variant="neutral">
    <wa-icon slot="icon" name="gear"></wa-icon>
    <strong>Your settings have been updated</strong><br />
    Changes take effect on your next login.
  </wa-callout>

  <wa-callout variant="warning">
    <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
    <strong>Your session is about to expire</strong><br />
    Save your work to avoid losing it.
  </wa-callout>

  <wa-callout variant="danger">
    <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
    <strong>This action can't be undone</strong><br />
    Deleting a project removes it for everyone on the team.
  </wa-callout>
</div>
```

### Appearance

Use the `appearance` attribute to change the callout's visual style. With no `appearance` set, a callout renders with a quiet fill and border, matching `filled-outlined`.

```html {.example}
<div class="wa-stack">
  <wa-callout variant="brand" appearance="accent">
    <wa-icon slot="icon" name="square-check"></wa-icon>
    This <strong>accent</strong> callout draws the most attention.
  </wa-callout>

  <wa-callout variant="brand" appearance="filled-outlined">
    <wa-icon slot="icon" name="fill-drip"></wa-icon>
    This callout is both <strong>filled</strong> and <strong>outlined</strong>.
  </wa-callout>

  <wa-callout variant="brand" appearance="filled">
    <wa-icon slot="icon" name="fill"></wa-icon>
    This callout is only <strong>filled</strong>.
  </wa-callout>

  <wa-callout variant="brand" appearance="outlined">
    <wa-icon slot="icon" name="lines-leaning"></wa-icon>
    Here's an <strong>outlined</strong> callout.
  </wa-callout>

  <wa-callout variant="brand" appearance="plain">
    <wa-icon slot="icon" name="font"></wa-icon>
    No fill or border on this <strong>plain</strong> callout.
  </wa-callout>
</div>
```

### Sizes

Use the `size` attribute to change a callout's size.

```html {.example}
<div class="wa-stack">
  <wa-callout size="xs">
    <wa-icon slot="icon" name="circle-info"></wa-icon>
    Extra-small callout for minimal emphasis.
  </wa-callout>

  <wa-callout size="s">
    <wa-icon slot="icon" name="circle-info"></wa-icon>
    Small callout for a bit of emphasis.
  </wa-callout>

  <wa-callout size="m">
    <wa-icon slot="icon" name="circle-info"></wa-icon>
    Medium callout, the default size.
  </wa-callout>

  <wa-callout size="l">
    <wa-icon slot="icon" name="circle-info"></wa-icon>
    Large callout for more emphasis.
  </wa-callout>

  <wa-callout size="xl">
    <wa-icon slot="icon" name="circle-info"></wa-icon>
    Extra-large callout for maximum emphasis.
  </wa-callout>
</div>
```

### Providing Content

Icons are optional. Omit the `icon` slot for a text-only callout.

```html {.example}
<wa-callout variant="brand">All times are shown in your local timezone.</wa-callout>
```

### Customizing

Style a callout with regular CSS — `background`, `border`, `border-radius`, `color`, `padding`, and `margin` all work as expected.

```html {.example}
<wa-callout
  variant="brand"
  style="
    background: var(--wa-color-brand-fill-quiet);
    border-radius: var(--wa-border-radius-pill);
    border-style: dashed;
  "
>
  <wa-icon slot="icon" name="wand-magic-sparkles"></wa-icon>
  A pinch of CSS goes a long way.
</wa-callout>
```
