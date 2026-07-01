---
title: Switch
layout: component
category: Forms
synonyms:
  - toggle
  - toggle switch
  - on off
use-cases:
  - boolean toggle
  - setting toggle
  - dark mode toggle
---

```html {.example}
<wa-switch>Enable notifications</wa-switch>
```

:::info
This component works with standard `<form>` elements. See [form controls](/docs/form-controls) for form submission and client-side validation.
:::

## Examples

### Labels

Add label text as the switch's default content. For labels that contain HTML, slot the markup in directly.

```html {.example}
<wa-switch>Subscribe to the newsletter</wa-switch>
```

### Hint

Add descriptive hint to a switch with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html {.example}
<wa-switch hint="You can change this at any time in settings.">Email me about new releases</wa-switch>
```

### Setting Initial Values

Use the `checked` attribute to activate the switch.

```html {.example}
<wa-switch checked>Remember this device</wa-switch>
```

:::info
<strong>`checked` sets the initial value, not the current state.</strong><br />
Consistent with native checkboxes, it doesn't reflect later changes. To toggle the checked state with JavaScript, use the `checked` property instead. To target checked switches with CSS, use the `:state(checked)` selector.
:::

### Disabled

Use the `disabled` attribute to disable the switch.

```html {.example}
<wa-switch disabled>Sync over cellular</wa-switch>
```

### Sizes

Use the `size` attribute to change a switch's size.

```html {.example}
<div class="wa-stack">
  <wa-switch size="xs">Extra Small</wa-switch>
  <wa-switch size="s">Small</wa-switch>
  <wa-switch size="m">Medium</wa-switch>
  <wa-switch size="l">Large</wa-switch>
  <wa-switch size="xl">Extra Large</wa-switch>
</div>
```

### Custom Properties

Use the available custom properties to change how the switch is styled.

```html {.example}
<wa-switch style="--width: 80px; --height: 40px; --thumb-size: 36px;">Really big</wa-switch>
```
