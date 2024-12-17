---
title: Viewport Demo
description: Viewport demos can be used to display an iframe as a resizable, zoomable preview.
tags: component
noAlpha: true
---

```html {.example}
<wa-viewport-demo viewport="1200">
  <iframe src="."></iframe>
</wa-viewport-demo>
```

:::warning
A lot of the functionality of this component will not work on cross-origin iframes.
:::

## Examples

### Arbitrary HTML content

You can render arbitrary HTML content in the iframe by using the `srcdoc` attribute:

```html {.example}
<wa-viewport-demo>
  <iframe srcdoc="
    &lt;button&gt;Click me!&lt;/button&gt;
  "></iframe>
</wa-viewport-demo>
```

### Viewport Emulation

You can also provide a width value to emulate and it will be scaled accordingly:

```html {.example}
<wa-viewport-demo viewport="300">
  <iframe srcdoc="
    &lt;button&gt;Click me!&lt;/button&gt;
    &lt;wa-button&gt;Click me!&lt;/wa-button&gt;
  "></iframe>
</wa-viewport-demo>
```

By default, the viewport will be rendered to an initial 16:9 aspect ratio,
which can be changed via resizing.
You can customize this via the `--viewport-initial-aspect-ratio` property.
Or, you could add a height value:

```html {.example}
<wa-viewport-demo viewport="1600 x 1000">
  <iframe srcdoc="
    &lt;button&gt;Click me!&lt;/button&gt;
    &lt;p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus et tortor vel ullamcorper. Fusce tristique et justo quis auctor. In tristique dignissim dignissim. Fusce lacus urna, efficitur vel fringilla sed, hendrerit at ipsum. Donec suscipit ante ac ligula imperdiet varius. Aliquam ullamcorper augue sit amet lectus euismod finibus. Proin semper, diam at rhoncus posuere, diam dui semper turpis, ut faucibus mi ipsum nec ante. Morbi varius nibh ut facilisis varius. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce in blandit velit. Aliquam massa eros, commodo eu vestibulum a, faucibus non risus.
    &lt;p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus et tortor vel ullamcorper. Fusce tristique et justo quis auctor. In tristique dignissim dignissim. Fusce lacus urna, efficitur vel fringilla sed, hendrerit at ipsum. Donec suscipit ante ac ligula imperdiet varius. Aliquam ullamcorper augue sit amet lectus euismod finibus. Proin semper, diam at rhoncus posuere, diam dui semper turpis, ut faucibus mi ipsum nec ante. Morbi varius nibh ut facilisis varius. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce in blandit velit. Aliquam massa eros, commodo eu vestibulum a, faucibus non risus.
    &lt;p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus et tortor vel ullamcorper. Fusce tristique et justo quis auctor. In tristique dignissim dignissim. Fusce lacus urna, efficitur vel fringilla sed, hendrerit at ipsum. Donec suscipit ante ac ligula imperdiet varius. Aliquam ullamcorper augue sit amet lectus euismod finibus. Proin semper, diam at rhoncus posuere, diam dui semper turpis, ut faucibus mi ipsum nec ante. Morbi varius nibh ut facilisis varius. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce in blandit velit. Aliquam massa eros, commodo eu vestibulum a, faucibus non risus.
"></iframe>
</wa-viewport-demo>
```

## Roadmap

This component is a work in progress.
Some of the things that are not yet implemented are listed below.
It goes without saying that this list is a rough plan and subject to change.

- Non-linear zoom scale
- Extend to general content, not just iframes
- Styles for mobile and tablet frames and an attribute to switch between them
- Automatic iframe height
