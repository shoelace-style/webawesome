---
title: Visually Hidden
description: The visually hidden utility makes content accessible to assistive devices without displaying it on the screen.
layout: docs
tags: styleUtilities
---

> "There are real world situations where visually hiding content may be appropriate, while the content should remain available to assistive technologies, such as screen readers. For instance, hiding a search field's label as a common magnifying glass icon is used in its stead."
> — [The A11Y Project](https://www.a11yproject.com/posts/2013-01-11-how-to-hide-content/)

Since visually hidden content can receive focus when tabbing, the element will become visible when something inside receives focus.
This behavior is intentional, as otherwise sighted keyboard users wouldn't be able to determine where the focus indicator is.

```html {.example}
<div style="min-height: 1.875rem;">
  <a href="#" class="wa-visually-hidden">Skip to main content</a>
</div>
```

## Examples

### Links That Open in New Windows

In this example, the link will open a new window. Screen readers will announce "opens in a new window" even though the text content isn't visible to sighted users.

```html {.example}
<a href="https://example.com/" target="_blank">
  Visit External Page
  <wa-icon name="arrow-up-right-from-square" variant="regular"></wa-icon>
  <span class="wa-visually-hidden">opens in a new window</span>
</a>
```

### Content Conveyed By Context

Adding a label may seem redundant at times, but they're very helpful for unsighted users. Rather than omit them, you can provide context to unsighted users with visually hidden content that will be announced by assistive devices such as screen readers.

```html {.example}
<wa-card style="width: 100%; max-width: 360px;">
  <header class="wa-visually-hidden">Personal Info</header>
  <wa-input label="Name" style="margin-bottom: .5rem;"></wa-input>
  <wa-input label="Email" type="email"></wa-input>
</wa-card>
```

### Visually Hidden Input Parts

Sometimes you want a form control to have a cleaner, more minimal appearance by hiding the `label` or `hint` visually. However, removing these elements entirely would make the form inaccessible to users with assistive devices.

Instead, you can hide them visually while keeping them available to screen readers by adding the `wa-visually-hidden-label` or `wa-visually-hidden-hint` class.

```html {.example}
<wa-input
  label="Search Articles"
  type="search"
  placeholder="Search for..."
  class="wa-visually-hidden-label"
  style="margin-block-end: 1rem;"
>
  <wa-icon slot="start" name="magnifying-glass" variant="regular"></wa-icon>
</wa-input>

<wa-input
  label="Phone Number"
  type="tel"
  hint="We'll send you a verification code"
  placeholder="(555) 867-5309"
  class="wa-visually-hidden-hint"
  style="margin-block-end: 1rem;"
>
  <wa-icon slot="start" name="phone" variant="regular"></wa-icon>
</wa-input>

<wa-select
  label="Country"
  hint="Select your country for shipping calculations"
  class="wa-visually-hidden-hint"
  style="margin-block-end: 1rem;"
>
  <wa-option value="us">United States</wa-option>
  <wa-option value="ca">Canada</wa-option>
  <wa-option value="mx">Mexico</wa-option>
  <wa-option value="uk">United Kingdom</wa-option>
  <wa-option value="de">Germany</wa-option>
  <wa-option value="fr">France</wa-option>
  <wa-option value="wakanda">Wakanda</wa-option>
  <wa-option value="genovia">Genovia</wa-option>
  <wa-option value="elbonia">Elbonia</wa-option>
  <wa-icon slot="start" name="globe" variant="regular"></wa-icon>
</wa-select>

<wa-input
  label="Email Address"
  type="email"
  hint="We'll never share your email or secret identity"
  placeholder="e.g. miles.morales@brooklynvisions.edu"
  class="wa-visually-hidden-label wa-visually-hidden-hint"
>
  <wa-icon slot="start" name="envelope" variant="regular"></wa-icon>
</wa-input>
```

### Force Visually Hidden

There are cases where you want to _always_ visually hide certain content, even when it's focused.
For example when hiding a checkbox to render a custom one:

```html {.example}
<label>
  <span class="checkbox">
    <input type="checkbox" class="wa-visually-hidden-force" />
  </span>
  I have read the terms and conditions
</label>

<style>
  .checkbox {
    display: inline-flex;
    vertical-align: middle;
    width: var(--wa-font-size-l);
    height: var(--wa-font-size-l);
    background: var(--wa-color-neutral-fill-quiet);
    color: var(--wa-color-neutral-on-quiet);
    border-radius: var(--wa-border-radius-s);
    margin-inline-end: var(--wa-space-xs);

    &::after {
      content: '✓' / '';
      margin: auto;
      transition: opacity var(--wa-transition-slow) var(--wa-transition-easing);
    }

    &:has(:checked) {
      background: var(--wa-color-brand-fill-loud);
      color: var(--wa-color-brand-on-loud);
    }

    &:not(:has(:checked)) {
      &::after {
        opacity: 0;
      }
    }

    &:focus-within {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }
</style>
```
