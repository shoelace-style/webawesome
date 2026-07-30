---
title: Include
layout: component
category: Helpers
synonyms:
  - html include
  - embed
  - html import
use-cases:
  - external content
  - partial
  - server-side include
---

```html {.example}
<wa-include src="/assets/examples/include.html"></wa-include>
```

Included files are asynchronously requested using `window.fetch()`. Requests are cached, so the same file can be included multiple times, but only one request will be made.

The included content will be inserted into the `<wa-include>` element's default slot so it can be easily accessed and styled through the light DOM.

:::warning
Included markup is inserted into the page as-is, and scripts run when `allow-scripts` is set. Including untrusted content can lead to XSS attacks.
:::

## Examples

### Including Part of a File

To include just one section of a file instead of the whole thing, add the target element's `id` as a hash to the `src`. Only the matching element's content is included, the rest of the file is ignored.

If the file loads but the `id` isn't found, the `wa-include-error` event is emitted.

```html {.example}
<wa-include src="/assets/examples/include.html#callout-fragment"></wa-include>
```

### Including a Template

The same `#id` syntax also works against the current page, which is handy for reusing markup you've defined once. It pairs especially well with a `<template>`, whose content stays hidden until it's included.

You get what's _inside_ the target, not the target element itself, either the children of a regular element, or the contents of a `<template>`. The original stays in place, so you can include it any number of times.

```html {.example}
<template id="greeting">
  <wa-callout variant="brand">
    <wa-icon slot="icon" name="hand-wave"></wa-icon>
    Hello from a template!
  </wa-callout>
</template>

<wa-include src="#greeting"></wa-include>
```

### Listening for Events

When an include file loads successfully, the `wa-load` event will be emitted. You can listen for this event to add custom loading logic to your includes.

If the request fails, the `wa-include-error` event will be emitted. In this case, `event.detail.status` will contain the resulting HTTP status code of the request, e.g. 404 (not found).

```html
<wa-include src="/assets/examples/include.html"></wa-include>

<script>
  const include = document.querySelector('wa-include');

  include.addEventListener('wa-load', event => {
    if (event.eventPhase === Event.AT_TARGET) {
      console.log('Success');
    }
  });

  include.addEventListener('wa-include-error', event => {
    if (event.eventPhase === Event.AT_TARGET) {
      console.log('Error', event.detail.status);
    }
  });
</script>
```
