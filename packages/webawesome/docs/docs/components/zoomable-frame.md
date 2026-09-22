---
title: Zoomable Frame
layout: component
category: Media
synonyms:
  - iframe zoom
  - preview frame
  - minimap
use-cases:
  - component preview
  - responsive preview
  - scaled iframe
---

```html {.example}
<wa-zoomable-frame src="/examples/themes/showcase" zoom="0.5"> </wa-zoomable-frame>
```

## Examples

### External Content

Use the `src` attribute to embed external websites or resources. The URL must be accessible, and cross-origin restrictions may apply due to the Same-Origin Policy, potentially limiting access to the iframe's content.

```html
<wa-zoomable-frame src="https://example.com/"> </wa-zoomable-frame>
```

### Aspect Ratio

The frame fills 100% width with a 16:9 aspect ratio by default. Change it with the `aspect-ratio` CSS property.

```html
<wa-zoomable-frame src="https://example.com/" style="aspect-ratio: 4/3;"> </wa-zoomable-frame>
```

### Inline Content

Use the `srcdoc` attribute or property to render custom HTML directly in the frame, without an external resource.

```html
<wa-zoomable-frame srcdoc="<html><body><h1>Hello, World!</h1><p>This is inline content.</p></body></html>">
</wa-zoomable-frame>
```

:::info
When both `src` and `srcdoc` are specified, `srcdoc` takes precedence.
:::

### Zoom

Set the `zoom` attribute to control the frame's zoom level. Use `1` for 100%, `2` for 200%, `0.5` for 50%, and so on.

Define specific zoom increments with the `zoom-levels` attribute using space-separated percentages and decimal values like `zoom-levels="0.25 0.5 75% 100%"`.

```html {.example}
<wa-zoomable-frame src="/examples/themes/showcase" zoom="0.5" zoom-levels="50% 0.75 100%"> </wa-zoomable-frame>
```

### Zoom Controls

Add the `without-controls` attribute to hide the zoom control interface from the frame.

```html {.example}
<wa-zoomable-frame src="/examples/themes/showcase" without-controls zoom="0.5"> </wa-zoomable-frame>
```

### User Interaction

Apply the `without-interaction` attribute to make the frame non-interactive. This also prevents keyboard navigation into the frame, which may impact accessibility for some users.

```html {.example}
<wa-zoomable-frame src="/examples/themes/showcase" zoom="0.5" without-interaction> </wa-zoomable-frame>
```

### Permissions & Sandboxing

Use the `sandbox` attribute to restrict what the embedded content can do. An empty `sandbox` applies every restriction; add space-separated tokens such as `allow-scripts` or `allow-same-origin` to lift specific ones. Both frames below load the same `srcdoc`, but only the second one is allowed to run its script.

```html {.example}
<div class="wa-stack">
  <wa-zoomable-frame
    sandbox
    without-controls
    style="height: 4rem; background: var(--wa-color-danger-fill-quiet)"
    srcdoc="<body style='margin: 0; display: grid; place-items: center; height: 100vh; font-family: system-ui'><p><span id='icon' aria-hidden='true'>🧙</span> <span id='msg'>You shall not pass.</span></p><script>icon.textContent = '🐇'; msg.textContent = 'The script ran.'</script></body>"
  ></wa-zoomable-frame>

  <wa-zoomable-frame
    sandbox="allow-scripts"
    without-controls
    style="height: 4rem; background: var(--wa-color-success-fill-quiet)"
    srcdoc="<body style='margin: 0; display: grid; place-items: center; height: 100vh; font-family: system-ui'><p><span id='icon' aria-hidden='true'>🧙</span> <span id='msg'>You shall not pass.</span></p><script>icon.textContent = '🐇'; msg.textContent = 'The script ran.'</script></body>"
  ></wa-zoomable-frame>
</div>
```

Use the `allow` attribute to set a [Permissions Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Permissions_Policy) that controls which browser features the embedded content can use. `allow="fullscreen"` is the modern equivalent of the older `allowfullscreen` attribute.

```html
<wa-zoomable-frame src="https://example.com/" allow="clipboard-write; fullscreen"> </wa-zoomable-frame>
```

:::info
<strong>Set `allow` and `sandbox` before the frame loads.</strong><br />
The browser applies them when the frame navigates, so changing either one afterwards has no effect until `src` points at a new URL.
:::

### Label

Use the `label` attribute to give the frame an accessible name. Screen readers announce it when moving between frames, so every frame should have one that describes its content.

```html
<wa-zoomable-frame src="/examples/themes/showcase" label="Theme preview"> </wa-zoomable-frame>
```

### Theme Sync

By default, the frame does not sync theme classes into the iframe. Add the `with-theme-sync` attribute to mirror the host page's light/dark mode and [theme selector classes](/docs/theming-overview) (such as `wa-theme-*`, `wa-brand-*`, and `wa-palette-*`) into the iframe document. This is useful when the iframe renders Web Awesome styles that should match the host page's theme.

```html {.example}
<wa-zoomable-frame src="/examples/themes/showcase" zoom="0.5" with-theme-sync> </wa-zoomable-frame>
```
