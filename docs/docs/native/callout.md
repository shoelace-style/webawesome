---
title: Callout
description: Callouts are used to display important messages inline.
component: callout
icon: callout
snippets: '.wa-callout'
noAlpha: true
---

```html {.example}
<article class="wa-callout">
  This is a callout style, applied to a standard article element.
</article>
```

## Examples

### Variants

Use the [variant utility classes](../utilities/color.md) to set the callout's color variant.

```html {.example}
<article class="wa-callout wa-brand">
  <strong>This is super informative</strong><br />
  You can tell by how pretty the callout is.
</article>

<br />

<article class="wa-callout wa-success">
  <strong>Your changes have been saved</strong><br />
  You can safely exit the app now.
</article>

<br />

<article class="wa-callout wa-neutral">
  <strong>Your settings have been updated</strong><br />
  Settings will take effect on next login.
</article>

<br />

<article class="wa-callout wa-warning">
  <strong>Your session has ended</strong><br />
  Please login again to continue.
</article>

<br />

<article class="wa-callout wa-danger">
  <strong>Your account has been deleted</strong><br />
  We're very sorry to see you go!
</article>
```

### Appearance

Use the [appearance utility classes](../utilities/appearance.md) to change the callout's visual appearance (the default is `outlined filled`).

```html {.example}
<article class="wa-callout wa-brand wa-outlined wa-accent">
  This <strong>accent</strong> callout is also <strong>outlined</strong>
</article>

<br />

<article class="wa-callout wa-brand wa-accent">
  This <strong>accent</strong> callout draws attention without an outline
</article>

<br />

<article class="wa-callout wa-brand wa-outlined wa-filled">
  This callout is both <strong>filled</strong> and <strong>outlined</strong>
</article>

<br />

<article class="wa-callout wa-brand wa-filled">
  This callout is only <strong>filled</strong>
</article>

<br />

<article class="wa-callout wa-brand wa-outlined">
  Here's an <strong>outlined</strong> callout
</article>

<br />

<article class="wa-callout wa-brand wa-plain">
  No bells and whistles on this <strong>plain</strong> callout
</article>
```

### Sizes

Use the [size utility classes](../utilities/size.md) to change a callout's size.

```html {.example}
<article class="wa-callout wa-brand wa-outlined wa-accent wa-size-l">
  This is meant to be very emphasized.
</article>

<br />

<article class="wa-callout">
  Normal-sized callout.
</article>

<br />

<article class="wa-callout wa-plain wa-plain wa-size-s">
  Just a small tip!
</article>
```
