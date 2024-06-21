---
title: Switch
description: Switches allow the user to toggle an option on or off.
layout: component
---

```html {.example}
<wa-switch>Switch</wa-switch>
```

:::info
This component works with standard `<form>` elements. Please refer to the section on [form controls](/docs/form-controls) to learn more about form submission and client-side validation.
:::

## Examples

### Checked

Use the `checked` attribute to activate the switch.

```html {.example}
<wa-switch checked>Checked</wa-switch>
```

### Disabled

Use the `disabled` attribute to disable the switch.

```html {.example}
<wa-switch disabled>Disabled</wa-switch>
```

### Sizes

Use the `size` attribute to change a switch's size.

```html {.example}
<wa-switch size="small">Small</wa-switch>
<br />
<wa-switch size="medium">Medium</wa-switch>
<br />
<wa-switch size="large">Large</wa-switch>
```

### Help Text

Add descriptive help text to a switch with the `help-text` attribute. For help texts that contain HTML, use the `help-text` slot instead.

```html {.example}
<wa-switch help-text="What should the user know about the switch?">Label</wa-switch>
```

### Custom Styles

Use the available custom properties to change how the switch is styled.

```html {.example}
<wa-switch style="--width: 80px; --height: 40px; --thumb-size: 36px;">Really big</wa-switch>
```
