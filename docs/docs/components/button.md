---
title: Button
description: Buttons represent actions that are available to the user.
tags: component
---

```html {.example}
<wa-button>Button</wa-button>
```

## Examples

### Variants

Use the `variant` attribute to set the button's semantic variant.

```html {.example}
<wa-button variant="neutral">Neutral</wa-button>
<wa-button variant="brand">Brand</wa-button>
<wa-button variant="success">Success</wa-button>
<wa-button variant="warning">Warning</wa-button>
<wa-button variant="danger">Danger</wa-button>
```

### Appearance

Use the `appearance` attribute to change the button's visual appearance.

```html {.example}
<div style="margin-block-end: 1rem;">
  <wa-button appearance="filled" variant="neutral">Filled</wa-button>
  <wa-button appearance="tinted" variant="neutral">Tinted</wa-button>
  <wa-button appearance="outlined" variant="neutral">Outlined</wa-button>
  <wa-button appearance="text" variant="neutral">Text</wa-button>
</div>
<div style="margin-block-end: 1rem;">
  <wa-button appearance="filled" variant="brand">Filled</wa-button>
  <wa-button appearance="tinted" variant="brand">Tinted</wa-button>
  <wa-button appearance="outlined" variant="brand">Outlined</wa-button>
  <wa-button appearance="text" variant="brand">Text</wa-button>
</div>
<div style="margin-block-end: 1rem;">
  <wa-button appearance="filled" variant="success">Filled</wa-button>
  <wa-button appearance="tinted" variant="success">Tinted</wa-button>
  <wa-button appearance="outlined" variant="success">Outlined</wa-button>
  <wa-button appearance="text" variant="success">Text</wa-button>
</div>
<div style="margin-block-end: 1rem;">
  <wa-button appearance="filled" variant="warning">Filled</wa-button>
  <wa-button appearance="tinted" variant="warning">Tinted</wa-button>
  <wa-button appearance="outlined" variant="warning">Outlined</wa-button>
  <wa-button appearance="text" variant="warning">Text</wa-button>
</div>
<div>
  <wa-button appearance="filled" variant="danger">Filled</wa-button>
  <wa-button appearance="tinted" variant="danger">Tinted</wa-button>
  <wa-button appearance="outlined" variant="danger">Outlined</wa-button>
  <wa-button appearance="text" variant="danger">Text</wa-button>
</div>
```

### Sizes

Use the `size` attribute to change a button's size.

```html {.example}
<wa-button size="small">Small</wa-button>
<wa-button size="medium">Medium</wa-button>
<wa-button size="large">Large</wa-button>
```

### Pill Buttons

Use the `pill` attribute to give buttons rounded edges.

```html {.example}
<wa-button size="small" pill>Small</wa-button>
<wa-button size="medium" pill>Medium</wa-button>
<wa-button size="large" pill>Large</wa-button>
```

### Link Buttons

It's often helpful to have a button that works like a link. This is possible by setting the `href` attribute, which will make the component render an `<a>` under the hood. This gives you all the default link behavior the browser provides (e.g. [[CMD/CTRL/SHIFT]] + [[CLICK]]) and exposes the `rel`, `target`, and `download` attributes.

```html {.example}
<wa-button href="https://example.com/">Link</wa-button>
<wa-button href="https://example.com/" target="_blank">New Window</wa-button>
<wa-button href="/assets/images/logo.svg" download="shoelace.svg">Download</wa-button>
```

### Setting a Custom Width

As expected, buttons can be given a custom width by setting the `width` CSS property. This is useful for making buttons span the full width of their container on smaller screens.

```html {.example}
<wa-button size="small" style="width: 100%; margin-bottom: 1rem;">Small</wa-button>
<wa-button size="medium" style="width: 100%; margin-bottom: 1rem;">Medium</wa-button>
<wa-button size="large" style="width: 100%;">Large</wa-button>
```

### Prefix and Suffix Icons

Use the `prefix` and `suffix` slots to add icons.

```html {.example}
<wa-button size="small">
  <wa-icon slot="prefix" name="gear" variant="solid"></wa-icon>
  Settings
</wa-button>

<wa-button size="small">
  <wa-icon slot="suffix" name="undo" variant="solid"></wa-icon>
  Refresh
</wa-button>

<wa-button size="small">
  <wa-icon slot="prefix" name="link" variant="solid"></wa-icon>
  <wa-icon slot="suffix" name="arrow-up-right-from-square" variant="solid"></wa-icon>
  Open
</wa-button>

<br /><br />

<wa-button>
  <wa-icon slot="prefix" name="gear" variant="solid"></wa-icon>
  Settings
</wa-button>

<wa-button>
  <wa-icon slot="suffix" name="undo" variant="solid"></wa-icon>
  Refresh
</wa-button>

<wa-button>
  <wa-icon slot="prefix" name="link" variant="solid"></wa-icon>
  <wa-icon slot="suffix" name="arrow-up-right-from-square" variant="solid"></wa-icon>
  Open
</wa-button>

<br /><br />

<wa-button size="large">
  <wa-icon slot="prefix" name="gear" variant="solid"></wa-icon>
  Settings
</wa-button>

<wa-button size="large">
  <wa-icon slot="suffix" name="undo" variant="solid"></wa-icon>
  Refresh
</wa-button>

<wa-button size="large">
  <wa-icon slot="prefix" name="link" variant="solid"></wa-icon>
  <wa-icon slot="suffix" name="arrow-up-right-from-square" variant="solid"></wa-icon>
  Open
</wa-button>
```

### Caret

Use the `caret` attribute to add a dropdown indicator when a button will trigger a dropdown, menu, or popover.

```html {.example}
<wa-button size="small" caret>Small</wa-button>
<wa-button size="medium" caret>Medium</wa-button>
<wa-button size="large" caret>Large</wa-button>
```

### Loading

Use the `loading` attribute to make a button busy. The width will remain the same as before, preventing adjacent elements from moving around.

```html {.example}
<wa-button variant="brand" loading>Brand</wa-button>
<wa-button variant="success" loading>Success</wa-button>
<wa-button variant="neutral" loading>Neutral</wa-button>
<wa-button variant="warning" loading>Warning</wa-button>
<wa-button variant="danger" loading>Danger</wa-button>
```

### Disabled

Use the `disabled` attribute to disable a button.

```html {.example}
<wa-button variant="brand" disabled>Brand</wa-button>
<wa-button variant="success" disabled>Success</wa-button>
<wa-button variant="neutral" disabled>Neutral</wa-button>
<wa-button variant="warning" disabled>Warning</wa-button>
```

### Styling Buttons

This example demonstrates how to style buttons using a custom class. This is the recommended approach if you need to add additional variations. To customize an existing variation, modify the selector to target the button's `variant` attribute instead of a class (e.g. `wa-button[variant="brand"]`).

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
