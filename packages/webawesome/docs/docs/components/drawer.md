---
title: Drawer
description: Drawers slide in from a container to expose additional options and information.
layout: component
category: Organization
---

<!-- cspell:dictionaries lorem-ipsum -->

```html {.example}
<wa-drawer label="Drawer" id="drawer-overview">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <wa-button slot="footer" variant="brand" data-drawer="close">Close</wa-button>
</wa-drawer>

<wa-button>Open Drawer</wa-button>

<script>
  const drawer = document.querySelector('#drawer-overview');
  const openButton = drawer.nextElementSibling;

  openButton.addEventListener('click', () => (drawer.open = true));
</script>
```

## Examples

### Drawer without Header

Headers are enabled by default. To render a drawer without a header, add the `without-header` attribute.

```html {.example}
<wa-drawer label="Drawer" without-header class="drawer-without-header">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <wa-button slot="footer" variant="brand" data-drawer="close">Close</wa-button>
</wa-drawer>

<wa-button>Open Drawer</wa-button>

<script>
  const drawer = document.querySelector('.drawer-without-header');
  const openButton = drawer.nextElementSibling;

  openButton.addEventListener('click', () => (drawer.open = true));
</script>
```

### Drawer with Footer

Footers can be used to display titles and more. Use the `footer` slot to add a footer to the drawer.

```html {.example}
<wa-drawer label="Drawer" class="drawer-footer">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <wa-button slot="footer" variant="brand" data-drawer="close">Close</wa-button>
</wa-drawer>

<wa-button>Open Drawer</wa-button>

<script>
  const drawer = document.querySelector('.drawer-footer');
  const openButton = drawer.nextElementSibling;

  openButton.addEventListener('click', () => (drawer.open = true));
</script>
```

### Opening and Closing Drawers Declaratively

You can open and close drawers with JavaScript by toggling the `open` attribute, but you can also do it declaratively. Add the `data-drawer="open id"` to any button on the page, where `id` is the ID of the drawer you want to open.

```html {.example}
<wa-drawer label="Drawer" id="drawer-opening">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <wa-button slot="footer" variant="brand" data-drawer="close">Close</wa-button>
</wa-drawer>

<wa-button data-drawer="open drawer-opening">Open Drawer</wa-button>
```

Similarly, you can add `data-drawer="close"` to a button _inside_ of a drawer to tell it to close.

```html {.example}
<wa-drawer label="Drawer" id="drawer-dismiss">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <wa-button slot="footer" variant="brand" data-drawer="close">Close</wa-button>
</wa-drawer>

<wa-button data-drawer="open drawer-dismiss">Open Drawer</wa-button>
```

### Slide in From Start

By default, drawers slide in from the end. To make the drawer slide in from the start, set the `placement` attribute to `start`.

```html {.example}
<wa-drawer label="Drawer" placement="start" class="drawer-placement-start">
  This drawer slides in from the start.
  <wa-button slot="footer" variant="brand" data-drawer="close">Close</wa-button>
</wa-drawer>

<wa-button>Open Drawer</wa-button>

<script>
  const drawer = document.querySelector('.drawer-placement-start');
  const openButton = drawer.nextElementSibling;

  openButton.addEventListener('click', () => (drawer.open = true));
</script>
```

### Slide in From Top

To make the drawer slide in from the top, set the `placement` attribute to `top`.

```html {.example}
<wa-drawer label="Drawer" placement="top" class="drawer-placement-top">
  This drawer slides in from the top.
  <wa-button slot="footer" variant="brand" data-drawer="close">Close</wa-button>
</wa-drawer>

<wa-button>Open Drawer</wa-button>

<script>
  const drawer = document.querySelector('.drawer-placement-top');
  const openButton = drawer.nextElementSibling;

  openButton.addEventListener('click', () => (drawer.open = true));
</script>
```

### Slide in From Bottom

To make the drawer slide in from the bottom, set the `placement` attribute to `bottom`.

```html {.example}
<wa-drawer label="Drawer" placement="bottom" class="drawer-placement-bottom">
  This drawer slides in from the bottom.
  <wa-button slot="footer" variant="brand" data-drawer="close">Close</wa-button>
</wa-drawer>

<wa-button>Open Drawer</wa-button>

<script>
  const drawer = document.querySelector('.drawer-placement-bottom');
  const openButton = drawer.nextElementSibling;

  openButton.addEventListener('click', () => (drawer.open = true));
</script>
```

### Custom Size

Use the `--size` custom property to set the drawer's size. This will be applied to the drawer's width or height depending on its `placement`.

```html {.example}
<wa-drawer label="Drawer" class="drawer-custom-size" style="--size: 50vw;">
  This drawer is always 50% of the viewport.
  <wa-button slot="footer" variant="brand" data-drawer="close">Close</wa-button>
</wa-drawer>

<wa-button>Open Drawer</wa-button>

<script>
  const drawer = document.querySelector('.drawer-custom-size');
  const openButton = drawer.nextElementSibling;

  openButton.addEventListener('click', () => (drawer.open = true));
</script>
```

### Scrolling

By design, a drawer's height will never exceed 100% of its container. As such, drawers will not scroll with the page to ensure the header and footer are always accessible to the user.

```html {.example}
<wa-drawer label="Drawer" class="drawer-scrolling">
  <div style="height: 150vh; border: dashed 2px var(--wa-color-surface-border); padding: 0 1rem;">
    <p>Scroll down and give it a try! 👇</p>
  </div>
  <wa-button slot="footer" variant="brand" data-drawer="close">Close</wa-button>
</wa-drawer>

<wa-button>Open Drawer</wa-button>

<script>
  const drawer = document.querySelector('.drawer-scrolling');
  const openButton = drawer.nextElementSibling;

  openButton.addEventListener('click', () => (drawer.open = true));
</script>
```

### Header Actions

The header shows a functional close button by default. You can use the `header-actions` slot to add additional [buttons](/docs/components/button) if needed.

```html {.example}
<wa-drawer label="Drawer" class="drawer-header-actions">
  <wa-button class="new-window" slot="header-actions" appearance="plain">
    <wa-icon name="arrow-up-right-from-square" variant="solid" label="Open in new window"></wa-icon>
  </wa-button>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <wa-button slot="footer" variant="brand" data-drawer="close">Close</wa-button>
</wa-drawer>

<wa-button>Open Drawer</wa-button>

<script>
  const drawer = document.querySelector('.drawer-header-actions');
  const openButton = drawer.nextElementSibling;
  const newWindowButton = drawer.querySelector('.new-window');

  openButton.addEventListener('click', () => (drawer.open = true));
  newWindowButton.addEventListener('click', () => window.open(location.href));
</script>
```

### Light Dismissal

If you want the drawer to close when the user clicks on the overlay, add the `light-dismiss` attribute.

```html {.example}
<wa-drawer label="Drawer" light-dismiss class="drawer-light-dismiss">
  This drawer will close when you click on the overlay.
  <wa-button slot="footer" variant="brand" data-drawer="close">Close</wa-button>
</wa-drawer>

<wa-button>Open Drawer</wa-button>

<script>
  const drawer = document.querySelector('.drawer-light-dismiss');
  const openButton = drawer.nextElementSibling;

  openButton.addEventListener('click', () => (drawer.open = true));
</script>
```

### Preventing the Drawer from Closing

By default, drawers will close when the user clicks the close button, clicks the overlay, or presses the [[Escape]] key. In most cases, the default behavior is the best behavior in terms of UX. However, there are situations where this may be undesirable, such as when data loss will occur.

To keep the drawer open in such cases, you can cancel the `wa-hide` event. When canceled, the drawer will remain open and pulse briefly to draw the user's attention to it.

You can use `event.detail.source` to determine what triggered the request to close. This example prevents the drawer from closing when the overlay is clicked, but allows the close button or [[Escape]] to dismiss it.

```html {.example}
<wa-drawer label="Drawer" class="drawer-deny-close">
  This drawer will only close when you click the button below.
  <wa-button slot="footer" variant="brand" data-drawer="close">Close</wa-button>
</wa-drawer>

<wa-button>Open Drawer</wa-button>

<script>
  const drawer = document.querySelector('.drawer-deny-close');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('wa-button[slot="footer"]');

  openButton.addEventListener('click', () => (drawer.open = true));

  // Prevent the drawer from closing unless the close button is clicked
  drawer.addEventListener('wa-hide', event => {
    if (event.detail.source !== closeButton) {
      event.preventDefault();
    }
  });
</script>
```

### Setting Initial Focus

To give focus to a specific element when the drawer opens, use the `autofocus` attribute.

```html {.example}
<wa-drawer label="Drawer" class="drawer-focus">
  <wa-input autofocus placeholder="I will have focus when the drawer is opened"></wa-input>
  <wa-button slot="footer" variant="brand" data-drawer="close">Close</wa-button>
</wa-drawer>

<wa-button>Open Drawer</wa-button>

<script>
  const drawer = document.querySelector('.drawer-focus');
  const input = drawer.querySelector('wa-input');
  const openButton = drawer.nextElementSibling;

  openButton.addEventListener('click', () => (drawer.open = true));
</script>
```
