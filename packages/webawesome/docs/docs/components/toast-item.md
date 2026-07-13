---
title: Toast Item
layout: component
category: Feedback
isProComponent: false
synonyms:
  - notification item
  - alert item
  - snackbar item
use-cases:
  - notification content
  - toast message
---

```html {.example}
<wa-toast-item variant="brand" duration="0">
  <wa-icon slot="icon" name="bell"></wa-icon>
  This is how a toast item looks!
</wa-toast-item>
```

:::info
<strong>Toast items are meant to live inside a `<wa-toast>` container.</strong><br />
The container manages their lifecycle and positioning. For usage examples showing how to display notifications, see the [Toast documentation](/docs/components/toast).
:::

## Examples

### Variant

Use the `variant` attribute to change the toast item's visual style. The variant determines the accent color on the left side and the icon color. Available variants are `neutral` (default), `brand`, `success`, `warning`, and `danger`.

```html {.example}
<div class="wa-stack">
  <wa-toast-item variant="neutral" duration="0">
    <wa-icon slot="icon" name="gear"></wa-icon>
    Neutral variant (default)
  </wa-toast-item>

  <wa-toast-item variant="brand" duration="0">
    <wa-icon slot="icon" name="circle-info"></wa-icon>
    Brand variant
  </wa-toast-item>

  <wa-toast-item variant="success" duration="0">
    <wa-icon slot="icon" name="check"></wa-icon>
    Success variant
  </wa-toast-item>

  <wa-toast-item variant="warning" duration="0">
    <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
    Warning variant
  </wa-toast-item>

  <wa-toast-item variant="danger" duration="0">
    <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
    Danger variant
  </wa-toast-item>
</div>
```

### Size

Use the `size` attribute to change the toast item's size.

```html {.example}
<div class="wa-stack">
  <wa-toast-item size="xs" duration="0">
    <wa-icon slot="icon" name="shrimp"></wa-icon>
    Extra Small
  </wa-toast-item>

  <wa-toast-item size="s" duration="0">
    <wa-icon slot="icon" name="mouse-field"></wa-icon>
    Small
  </wa-toast-item>

  <wa-toast-item size="m" duration="0">
    <wa-icon slot="icon" name="horse"></wa-icon>
    Medium (default)
  </wa-toast-item>

  <wa-toast-item size="l" duration="0">
    <wa-icon slot="icon" name="elephant"></wa-icon>
    Large
  </wa-toast-item>

  <wa-toast-item size="xl" duration="0">
    <wa-icon slot="icon" name="whale"></wa-icon>
    Extra Large
  </wa-toast-item>
</div>
```

### Icons

Use the `icon` slot to display an icon at the start of the toast item. The icon color automatically matches the variant's accent color.

```html {.example}
<div class="wa-stack">
  <wa-toast-item variant="success" duration="0">
    <wa-icon slot="icon" name="check"></wa-icon>
    Your changes have been saved!
  </wa-toast-item>

  <wa-toast-item variant="brand" duration="0">
    <wa-icon slot="icon" name="envelope"></wa-icon>
    You have 3 new messages
  </wa-toast-item>

  <wa-toast-item variant="warning" duration="0">
    <wa-icon slot="icon" name="clock"></wa-icon>
    Your session will expire soon
  </wa-toast-item>
</div>
```

Toast items work fine without icons too.

```html {.example}
<wa-toast-item variant="neutral" duration="0"> A simple notification without an icon. </wa-toast-item>
```

### Providing Content

The default slot accepts any HTML content, allowing you to create rich notifications with formatted text, links, and interactive elements.

```html {.example}
<div class="wa-stack">
  <wa-toast-item variant="brand" duration="0">
    <wa-icon slot="icon" name="bell"></wa-icon>
    <strong>New message from Alex</strong><br />
    Hey, are you available for a quick call?
  </wa-toast-item>

  <wa-toast-item variant="success" duration="0">
    <wa-icon slot="icon" name="cloud-arrow-up"></wa-icon>
    <strong>Upload complete</strong><br />
    <a href="#">View file</a> · <a href="#">Share</a>
  </wa-toast-item>

  <wa-toast-item variant="brand" duration="0">
    <wa-icon slot="icon" name="gift"></wa-icon>
    You've earned a reward!
    <div style="margin-block-start: var(--wa-space-xs);">
      <wa-button variant="brand" size="s">Claim Now</wa-button>
      <wa-button appearance="filled" size="s">Later</wa-button>
    </div>
  </wa-toast-item>
</div>
```

### Duration

The `duration` attribute controls how long the toast item displays before automatically dismissing (in milliseconds). The default is `5000` (5 seconds). Set to `0` to disable auto-dismissal.

When a duration is set, a progress ring appears around the close button showing the remaining time.

```html
<wa-toast-item variant="brand" duration="5000">...</wa-toast-item>
<wa-toast-item variant="brand" duration="10000">...</wa-toast-item>
<wa-toast-item variant="brand" duration="0">...</wa-toast-item>
```

### Hover & Focus Behavior

Toast items automatically pause their countdown timer when the user hovers over them or when the close button receives focus, giving more time to read the content. When the mouse leaves or focus moves away, the timer resets and begins counting down again.

### The Close Button

Every toast item includes a close button that allows users to dismiss the notification. When `duration` is greater than `0`, the close button displays a progress ring showing the remaining time.

```html {.example}
<wa-toast-item variant="neutral" duration="0">
  <wa-icon slot="icon" name="circle-info"></wa-icon>
  Click the close button on the right to dismiss →
</wa-toast-item>
```

### Customizing the Accent

Use the `--accent-width` custom property to adjust the width of the accent line, or hide it entirely.

```html {.example}
<div class="wa-stack">
  <wa-toast-item variant="brand" duration="0" style="--accent-width: 8px;">
    <wa-icon slot="icon" name="star"></wa-icon>
    Thicker accent line
  </wa-toast-item>

  <wa-toast-item variant="success" duration="0" style="--accent-width: 0;">
    <wa-icon slot="icon" name="check"></wa-icon>
    No accent line
  </wa-toast-item>
</div>
```

### Customizing the Padding

Use the `--padding` custom property to adjust the internal spacing.

```html {.example}
<div class="wa-stack">
  <wa-toast-item variant="brand" duration="0" style="--padding: var(--wa-space-xs);">
    <wa-icon slot="icon" name="compress"></wa-icon>
    Compact padding
  </wa-toast-item>

  <wa-toast-item variant="brand" duration="0" style="--padding: var(--wa-space-xl);">
    <wa-icon slot="icon" name="expand"></wa-icon>
    Spacious padding
  </wa-toast-item>
</div>
```

<script>
  // Prevent toast items on this page from closing when the close button is clicked
  document.addEventListener('wa-hide', event => {
    if (event.target.localName === 'wa-toast-item') {
      event.preventDefault();
    }
  });
</script>