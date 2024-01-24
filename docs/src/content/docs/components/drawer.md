---
title: Drawer
description: Drawers slide in from a container to expose additional options and information.
layout: ../../../layouts/ComponentLayout.astro
---

<!-- cspell:dictionaries lorem-ipsum -->

```html:preview
<wa-drawer label="Drawer" class="drawer-overview">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <wa-button slot="footer" variant="brand">Close</wa-button>
</wa-drawer>

<wa-button>Open Drawer</wa-button>

<script>
  const drawer = document.querySelector('.drawer-overview');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('wa-button[variant="brand"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

```jsx:react
import { useState } from 'react';
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaDrawer from '@shoelace-style/shoelace/dist/react/drawer';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <WaDrawer label="Drawer" open={open} onWaAfterHide={() => setOpen(false)}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <WaButton slot="footer" variant="brand" onClick={() => setOpen(false)}>
          Close
        </WaButton>
      </WaDrawer>

      <WaButton onClick={() => setOpen(true)}>Open Drawer</WaButton>
    </>
  );
};
```

## Examples

### Slide in From Start

By default, drawers slide in from the end. To make the drawer slide in from the start, set the `placement` attribute to `start`.

```html:preview
<wa-drawer label="Drawer" placement="start" class="drawer-placement-start">
  This drawer slides in from the start.
  <wa-button slot="footer" variant="brand">Close</wa-button>
</wa-drawer>

<wa-button>Open Drawer</wa-button>

<script>
  const drawer = document.querySelector('.drawer-placement-start');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('wa-button[variant="brand"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

```jsx:react
import { useState } from 'react';
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaDrawer from '@shoelace-style/shoelace/dist/react/drawer';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <WaDrawer label="Drawer" placement="start" open={open} onWaAfterHide={() => setOpen(false)}>
        This drawer slides in from the start.
        <WaButton slot="footer" variant="brand" onClick={() => setOpen(false)}>
          Close
        </WaButton>
      </WaDrawer>

      <WaButton onClick={() => setOpen(true)}>Open Drawer</WaButton>
    </>
  );
};
```

### Slide in From Top

To make the drawer slide in from the top, set the `placement` attribute to `top`.

```html:preview
<wa-drawer label="Drawer" placement="top" class="drawer-placement-top">
  This drawer slides in from the top.
  <wa-button slot="footer" variant="brand">Close</wa-button>
</wa-drawer>

<wa-button>Open Drawer</wa-button>

<script>
  const drawer = document.querySelector('.drawer-placement-top');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('wa-button[variant="brand"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

```jsx:react
import { useState } from 'react';
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaDrawer from '@shoelace-style/shoelace/dist/react/drawer';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <WaDrawer label="Drawer" placement="top" open={open} onWaAfterHide={() => setOpen(false)}>
        This drawer slides in from the top.
        <WaButton slot="footer" variant="brand" onClick={() => setOpen(false)}>
          Close
        </WaButton>
      </WaDrawer>

      <WaButton onClick={() => setOpen(true)}>Open Drawer</WaButton>
    </>
  );
};
```

### Slide in From Bottom

To make the drawer slide in from the bottom, set the `placement` attribute to `bottom`.

```html:preview
<wa-drawer label="Drawer" placement="bottom" class="drawer-placement-bottom">
  This drawer slides in from the bottom.
  <wa-button slot="footer" variant="brand">Close</wa-button>
</wa-drawer>

<wa-button>Open Drawer</wa-button>

<script>
  const drawer = document.querySelector('.drawer-placement-bottom');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('wa-button[variant="brand"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

```jsx:react
import { useState } from 'react';
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaDrawer from '@shoelace-style/shoelace/dist/react/drawer';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <WaDrawer label="Drawer" placement="bottom" open={open} onWaAfterHide={() => setOpen(false)}>
        This drawer slides in from the bottom.
        <WaButton slot="footer" variant="brand" onClick={() => setOpen(false)}>
          Close
        </WaButton>
      </WaDrawer>

      <WaButton onClick={() => setOpen(true)}>Open Drawer</WaButton>
    </>
  );
};
```

### Contained to an Element

By default, drawers slide out of their [containing block](https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#Identifying_the_containing_block), which is usually the viewport. To make a drawer slide out of a parent element, add the `contained` attribute to the drawer and apply `position: relative` to its parent.

Unlike normal drawers, contained drawers are not modal. This means they do not show an overlay, they do not trap focus, and they are not dismissible with [[Escape]]. This is intentional to allow users to interact with elements outside of the drawer.

```html:preview
<div
  style="position: relative; border: solid 2px var(--wa-color-surface-border); height: 300px; padding: 1rem; margin-bottom: 1rem;"
>
  The drawer will be contained to this box. This content won't shift or be affected in any way when the drawer opens.

  <wa-drawer label="Drawer" contained class="drawer-contained" style="--size: 50%;">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    <wa-button slot="footer" variant="brand">Close</wa-button>
  </wa-drawer>
</div>

<wa-button>Toggle Drawer</wa-button>

<script>
  const drawer = document.querySelector('.drawer-contained');
  const openButton = drawer.parentElement.nextElementSibling;
  const closeButton = drawer.querySelector('wa-button[variant="brand"]');

  openButton.addEventListener('click', () => (drawer.open = !drawer.open));
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

```jsx:react
import { useState } from 'react';
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaDrawer from '@shoelace-style/shoelace/dist/react/drawer';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        style={{
          position: 'relative',
          border: 'solid 2px var(--wa-color-surface-border)',
          height: '300px',
          padding: '1rem',
          marginBottom: '1rem'
        }}
      >
        The drawer will be contained to this box. This content won't shift or be affected in any way when the drawer
        opens.
        <WaDrawer
          label="Drawer"
          contained
          no-modal
          open={open}
          onWaAfterHide={() => setOpen(false)}
          style={{ '--size': '50%' }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          <WaButton slot="footer" variant="brand" onClick={() => setOpen(false)}>
            Close
          </WaButton>
        </WaDrawer>
      </div>

      <WaButton onClick={() => setOpen(true)}>Open Drawer</WaButton>
    </>
  );
};
```

### Custom Size

Use the `--size` custom property to set the drawer's size. This will be applied to the drawer's width or height depending on its `placement`.

```html:preview
<wa-drawer label="Drawer" class="drawer-custom-size" style="--size: 50vw;">
  This drawer is always 50% of the viewport.
  <wa-button slot="footer" variant="brand">Close</wa-button>
</wa-drawer>

<wa-button>Open Drawer</wa-button>

<script>
  const drawer = document.querySelector('.drawer-custom-size');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('wa-button[variant="brand"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

```jsx:react
import { useState } from 'react';
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaDrawer from '@shoelace-style/shoelace/dist/react/drawer';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <WaDrawer label="Drawer" open={open} onWaAfterHide={() => setOpen(false)} style={{ '--size': '50vw' }}>
        This drawer is always 50% of the viewport.
        <WaButton slot="footer" variant="brand" onClick={() => setOpen(false)}>
          Close
        </WaButton>
      </WaDrawer>

      <WaButton onClick={() => setOpen(true)}>Open Drawer</WaButton>
    </>
  );
};
```

### Scrolling

By design, a drawer's height will never exceed 100% of its container. As such, drawers will not scroll with the page to ensure the header and footer are always accessible to the user.

```html:preview
<wa-drawer label="Drawer" class="drawer-scrolling">
  <div style="height: 150vh; border: dashed 2px var(--wa-color-surface-border); padding: 0 1rem;">
    <p>Scroll down and give it a try! 👇</p>
  </div>
  <wa-button slot="footer" variant="brand">Close</wa-button>
</wa-drawer>

<wa-button>Open Drawer</wa-button>

<script>
  const drawer = document.querySelector('.drawer-scrolling');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('wa-button[variant="brand"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

```jsx:react
import { useState } from 'react';
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaDrawer from '@shoelace-style/shoelace/dist/react/drawer';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <WaDrawer label="Drawer" open={open} onWaAfterHide={() => setOpen(false)}>
        <div
          style={{
            height: '150vh',
            border: 'dashed 2px var(--wa-color-surface-border)',
            padding: '0 1rem'
          }}
        >
          <p>Scroll down and give it a try! 👇</p>
        </div>
        <WaButton slot="footer" variant="brand" onClick={() => setOpen(false)}>
          Close
        </WaButton>
      </WaDrawer>

      <WaButton onClick={() => setOpen(true)}>Open Drawer</WaButton>
    </>
  );
};
```

### Header Actions

The header shows a functional close button by default. You can use the `header-actions` slot to add additional [icon buttons](/components/icon-button) if needed.

```html:preview
<wa-drawer label="Drawer" class="drawer-header-actions">
  <wa-icon-button class="new-window" slot="header-actions" name="arrow-up-right-from-square" variant="solid"></wa-icon-button>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <wa-button slot="footer" variant="brand">Close</wa-button>
</wa-drawer>

<wa-button>Open Drawer</wa-button>

<script>
  const drawer = document.querySelector('.drawer-header-actions');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('wa-button[variant="brand"]');
  const newWindowButton = drawer.querySelector('.new-window');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
  newWindowButton.addEventListener('click', () => window.open(location.href));
</script>
```

```jsx:react
import { useState } from 'react';
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaDrawer from '@shoelace-style/shoelace/dist/react/drawer';
import WaIconButton from '@shoelace-style/shoelace/dist/react/icon-button';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <WaDrawer label="Drawer" open={open} onWaAfterHide={() => setOpen(false)}>
        <WaIconButton slot="header-actions" name="arrow-up-right-from-square" onClick={() => window.open(location.href)} />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <WaButton slot="footer" variant="brand" onClick={() => setOpen(false)}>
          Close
        </WaButton>
      </WaDrawer>

      <WaButton onClick={() => setOpen(true)}>Open Drawer</WaButton>
    </>
  );
};
```

### Preventing the Drawer from Closing

By default, drawers will close when the user clicks the close button, clicks the overlay, or presses the [[Escape]] key. In most cases, the default behavior is the best behavior in terms of UX. However, there are situations where this may be undesirable, such as when data loss will occur.

To keep the drawer open in such cases, you can cancel the `wa-request-close` event. When canceled, the drawer will remain open and pulse briefly to draw the user's attention to it.

You can use `event.detail.source` to determine what triggered the request to close. This example prevents the drawer from closing when the overlay is clicked, but allows the close button or [[Escape]] to dismiss it.

```html:preview
<wa-drawer label="Drawer" class="drawer-deny-close">
  This drawer will not close when you click on the overlay.
  <wa-button slot="footer" variant="brand">Close</wa-button>
</wa-drawer>

<wa-button>Open Drawer</wa-button>

<script>
  const drawer = document.querySelector('.drawer-deny-close');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('wa-button[variant="brand"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());

  // Prevent the drawer from closing when the user clicks on the overlay
  drawer.addEventListener('wa-request-close', event => {
    if (event.detail.source === 'overlay') {
      event.preventDefault();
    }
  });
</script>
```

```jsx:react
import { useState } from 'react';
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaDrawer from '@shoelace-style/shoelace/dist/react/drawer';

const App = () => {
  const [open, setOpen] = useState(false);

  // Prevent the drawer from closing when the user clicks on the overlay
  function handleRequestClose(event) {
    if (event.detail.source === 'overlay') {
      event.preventDefault();
    }
  }

  return (
    <>
      <WaDrawer label="Drawer" open={open} onWaRequestClose={handleRequestClose} onWaAfterHide={() => setOpen(false)}>
        This drawer will not close when you click on the overlay.
        <WaButton slot="footer" variant="brand" onClick={() => setOpen(false)}>
          Save &amp; Close
        </WaButton>
      </WaDrawer>

      <WaButton onClick={() => setOpen(true)}>Open Drawer</WaButton>
    </>
  );
};
```

### Customizing Initial Focus

By default, the drawer's panel will gain focus when opened. This allows a subsequent tab press to focus on the first tabbable element in the drawer. If you want a different element to have focus, add the `autofocus` attribute to it as shown below.

```html:preview
<wa-drawer label="Drawer" class="drawer-focus">
  <wa-input autofocus placeholder="I will have focus when the drawer is opened"></wa-input>
  <wa-button slot="footer" variant="brand">Close</wa-button>
</wa-drawer>

<wa-button>Open Drawer</wa-button>

<script>
  const drawer = document.querySelector('.drawer-focus');
  const input = drawer.querySelector('wa-input');
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('wa-button[variant="brand"]');

  openButton.addEventListener('click', () => drawer.show());
  closeButton.addEventListener('click', () => drawer.hide());
</script>
```

```jsx:react
import { useState } from 'react';
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaDrawer from '@shoelace-style/shoelace/dist/react/drawer';
import WaInput from '@shoelace-style/shoelace/dist/react/input';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <WaDrawer label="Drawer" open={open} onWaAfterHide={() => setOpen(false)}>
        <WaInput autofocus placeholder="I will have focus when the drawer is opened" />
        <WaButton slot="footer" variant="brand" onClick={() => setOpen(false)}>
          Close
        </WaButton>
      </WaDrawer>

      <WaButton onClick={() => setOpen(true)}>Open Drawer</WaButton>
    </>
  );
};
```

:::tip
You can further customize initial focus behavior by canceling the `wa-initial-focus` event and setting focus yourself inside the event handler.
:::
