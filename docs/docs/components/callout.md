---
title: Callout
description: Callouts are used to display important messages inline.
tags: [feedback, content]
icon: callout
---

```html {.example}
<wa-callout>
  <wa-icon slot="icon" name="circle-info" variant="regular"></wa-icon>
  This is a standard callout. You can customize its content and even the icon.
</wa-callout>
```

## Examples

### Variants

Set the `variant` attribute to change the callout's variant.

```html {.example}
{% for variant, info in {
  brand: {
    title: 'This is super informative',
    content: 'You can tell by how pretty the callout is.',
    icon: 'circle-info'
  },
  success: {
    title: 'Your changes have been saved',
    content: 'You can safely exit the app now.',
    icon: 'circle-check'
  },
  neutral: {
    title: 'Your settings have been updated',
    content: 'Settings will take effect on next login.',
    icon: 'gear'
  },
  warning: {
    title: 'Your session has ended',
    content: 'Please login again to continue.',
    icon: 'triangle-exclamation'
  },
  danger: {
    title: 'Your account has been deleted',
    content: 'We’re very sorry to see you go!',
    icon: 'circle-exclamation'
  }
} %}
  <wa-callout variant="{{ variant }}">
    <wa-icon slot="icon" name="{{ info.icon }}" variant="regular"></wa-icon>
    <strong>{{ info.title }}</strong><br />
    {{ info.content }}
  </wa-callout>
  {% if not loop.last %}<br />{% endif %}
{% endfor %}
```

### Appearance

Use the `appearance` attribute to change the callout's visual appearance (the default is `outlined filled`).

```html {.example}
<wa-callout variant="brand" appearance="outlined accent">
  <wa-icon slot="icon" name="check-to-slot"></wa-icon>
  This <strong>accent</strong> callout is also <strong>outlined</strong>
</wa-callout>

<br />

<wa-callout variant="brand" appearance="accent">
  <wa-icon slot="icon" name="square-check"></wa-icon>
  This <strong>accent</strong> callout draws attention without an outline
</wa-callout>

<br />

<wa-callout variant="brand" appearance="outlined filled">
  <wa-icon slot="icon" name="fill-drip" variant="regular"></wa-icon>
  This callout is both <strong>filled</strong> and <strong>outlined</strong>
</wa-callout>

<br />

<wa-callout variant="brand" appearance="filled">
  <wa-icon slot="icon" name="fill" variant="regular"></wa-icon>
  This callout is only <strong>filled</strong>
</wa-callout>

<br />

<wa-callout variant="brand" appearance="outlined">
  <wa-icon slot="icon" name="lines-leaning" variant="regular"></wa-icon>
  Here's an <strong>outlined</strong> callout
</wa-callout>

<br />

<wa-callout variant="brand" appearance="plain">
  <wa-icon slot="icon" name="font" variant="regular"></wa-icon>
  No bells and whistles on this <strong>plain</strong> callout
</wa-callout>
```

### Sizes

Use the `size` attribute to change a callout's size.

```html {.example}
<wa-callout variant="brand" appearance="outlined accent" size="large">
  <wa-icon slot="icon" name="circle-info" variant="solid"></wa-icon>
  This is meant to be very emphasized.
</wa-callout>
<wa-callout>
  <wa-icon slot="icon" name="circle-info" variant="regular"></wa-icon>
  Normal-sized callout.
</wa-callout>
<wa-callout variant="plain" appearance="plain" size="small">
  <wa-icon slot="icon" name="circle-info" variant="regular"></wa-icon>
  Just a small tip!
</wa-callout>
```

### Without Icons

Icons are optional. Simply omit the `icon` slot if you don't want them.

```html {.example}
<wa-callout variant="brand"> Nothing fancy here, just a simple callout. </wa-callout>
```

### Styling

You can customize the callout's appearance mostly by setting regular CSS properties:
- `background`, `border`, `border-radius`, `color`, `padding`, `margin`, etc. work as expected
- `gap` sets the space between the icon and the content
