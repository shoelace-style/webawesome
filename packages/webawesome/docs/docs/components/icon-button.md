---
title: Icon Button
description: Icons buttons are simple, icon-only buttons that can be used for actions and in toolbars.
tags: [actions, apps]
icon: icon-button
---

For a full list of icons that come bundled with Web Awesome, refer to the [icon component](/docs/components/icon).

```html {.example}
<wa-icon-button name="gear" label="Settings"></wa-icon-button>
```

## Examples

### Sizes

Icon buttons inherit their parent element's `font-size`.

```html {.example}
<wa-icon-button name="pen-to-square" variant="solid" label="Edit" style="font-size: 1.5rem;"></wa-icon-button>
<wa-icon-button name="pen-to-square" variant="solid" label="Edit" style="font-size: 2rem;"></wa-icon-button>
<wa-icon-button name="pen-to-square" variant="solid" label="Edit" style="font-size: 2.5rem;"></wa-icon-button>
```

### Colors

Icon buttons are designed to have a uniform appearance, so their color is not inherited. However, you can still customize them by styling the `base` part.

```html {.example}
<div class="icon-button-color">
  <wa-icon-button name="bold" variant="solid" label="Bold"></wa-icon-button>
  <wa-icon-button name="italic" variant="solid" label="Italic"></wa-icon-button>
  <wa-icon-button name="underline" variant="solid" label="Underline"></wa-icon-button>
</div>

<style>
  .icon-button-color wa-icon-button::part(base) {
    color: #b00091;
  }

  .icon-button-color wa-icon-button::part(base):hover,
  .icon-button-color wa-icon-button::part(base):focus {
    color: #c913aa;
  }

  .icon-button-color wa-icon-button::part(base):active {
    color: #960077;
  }
</style>
```

### Link Buttons

Use the `href` attribute to convert the button to a link.

```html {.example}
<wa-icon-button name="gear" variant="solid" label="Settings" href="https://example.com" target="_blank"></wa-icon-button>
```

### Icon Button with Tooltip

Add a tooltip that references the `id` of the icon button to provide contextual information.

```html {.example}
<wa-icon-button id="icon-button" name="gear" variant="solid" label="Settings"></wa-icon-button>
<wa-tooltip for="icon-button">Settings</wa-tooltip>
```

### Disabled

Use the `disabled` attribute to disable the icon button.

```html {.example}
<wa-icon-button name="gear" variant="solid" label="Settings" disabled></wa-icon-button>
```
