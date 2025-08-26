---
title: Zoomable Frame
description: Zoomable frames render iframe content with zoom and interaction controls.
layout: component
category: Imagery
---

```html {.example}
<wa-zoomable-frame src="https://webawesome.com/" zoom="0.5"> </wa-zoomable-frame>
```

## Examples

### Loading external content

Use the `src` attribute to embed external websites or resources. The URL must be accessible, and cross-origin restrictions may apply due to the Same-Origin Policy, potentially limiting access to the iframe's content.

```html
<wa-zoomable-frame src="https://example.com/"> </wa-zoomable-frame>
```

The zoomable frame fills 100% width by default with a 16:9 aspect ratio. Customize this using the `aspect-ratio` CSS property.

```html
<wa-zoomable-frame src="https://example.com/" style="aspect-ratio: 4/3;"> </wa-zoomable-frame>
```

Use the `srcdoc` attribute or property to display custom HTML content directly within the iframe, perfect for rendering inline content without external resources.

```html
<wa-zoomable-frame srcdoc="<html><body><h1>Hello, World!</h1><p>This is inline content.</p></body></html>">
</wa-zoomable-frame>
```

:::info
When both `src` and `srcdoc` are specified, `srcdoc` takes precedence.
:::

### Controlling zoom behavior

Set the `zoom` attribute to control the frame's zoom level. Use `1` for 100%, `2` for 200%, `0.5` for 50%, and so on.

Define specific zoom increments with the `zoom-levels` attribute using space-separated percentages and decimal values like `zoom-levels="0.25 0.5 75% 100%"`.

```html {.example}
<wa-zoomable-frame src="https://webawesome.com/" zoom="0.5" zoom-levels="50% 0.75 100%"> </wa-zoomable-frame>
```

### Hiding zoom controls

Add the `without-controls` attribute to hide the zoom control interface from the frame.

```html {.example}
<wa-zoomable-frame src="https://webawesome.com/" without-controls zoom="0.5"> </wa-zoomable-frame>
```

### Preventing user interaction

Apply the `without-interaction` attribute to make the frame non-interactive. Note that this prevents keyboard navigation into the frame, which may impact accessibility for some users.

```html {.example}
<wa-zoomable-frame src="https://webawesome.com/" zoom="0.5" without-interaction> </wa-zoomable-frame>
```
