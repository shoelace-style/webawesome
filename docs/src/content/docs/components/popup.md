---
title: Popup
description: 'Popup is a utility that lets you declaratively anchor "popup" containers to another element.'
layout: ../../../layouts/ComponentLayout.astro
---

This component's name is inspired by [`<popup>`](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/Popup/explainer.md). It uses [Floating UI](https://floating-ui.com/) under the hood to provide a well-tested, lightweight, and fully declarative positioning utility for tooltips, dropdowns, and more.

Popup doesn't provide any styles — just positioning! The popup's preferred placement, distance, and skidding (offset) can be configured using attributes. An arrow that points to the anchor can be shown and customized to your liking. Additional positioning options are available and described in more detail below.

:::caution
Popup is a low-level utility built specifically for positioning elements. Do not mistake it for a [tooltip](/components/tooltip) or similar because _it does not facilitate an accessible experience!_ Almost every correct usage of `<wa-popup>` will involve building other components. It should rarely, if ever, occur directly in your HTML.
:::

```html:preview
<div class="popup-overview">
  <wa-popup placement="top" active>
    <span slot="anchor"></span>
    <div class="box"></div>
  </wa-popup>

  <div class="popup-overview-options">
    <wa-select label="Placement" name="placement" value="top" class="popup-overview-select">
      <wa-option value="top">top</wa-option>
      <wa-option value="top-start">top-start</wa-option>
      <wa-option value="top-end">top-end</wa-option>
      <wa-option value="bottom">bottom</wa-option>
      <wa-option value="bottom-start">bottom-start</wa-option>
      <wa-option value="bottom-end">bottom-end</wa-option>
      <wa-option value="right">right</wa-option>
      <wa-option value="right-start">right-start</wa-option>
      <wa-option value="right-end">right-end</wa-option>
      <wa-option value="left">left</wa-option>
      <wa-option value="left-start">left-start</wa-option>
      <wa-option value="left-end">left-end</wa-option>
    </wa-select>
    <wa-input type="number" name="distance" label="distance" value="0"></wa-input>
    <wa-input type="number" name="skidding" label="Skidding" value="0"></wa-input>
  </div>

  <div class="popup-overview-options">
    <wa-switch name="active" checked>Active</wa-switch>
    <wa-switch name="arrow">Arrow</wa-switch>
  </div>
</div>

<script>
  const container = document.querySelector('.popup-overview');
  const popup = container.querySelector('wa-popup');
  const select = container.querySelector('wa-select[name="placement"]');
  const distance = container.querySelector('wa-input[name="distance"]');
  const skidding = container.querySelector('wa-input[name="skidding"]');
  const active = container.querySelector('wa-switch[name="active"]');
  const arrow = container.querySelector('wa-switch[name="arrow"]');

  select.addEventListener('wa-change', () => (popup.placement = select.value));
  distance.addEventListener('wa-input', () => (popup.distance = distance.value));
  skidding.addEventListener('wa-input', () => (popup.skidding = skidding.value));
  active.addEventListener('wa-change', () => (popup.active = active.checked));
  arrow.addEventListener('wa-change', () => (popup.arrow = arrow.checked));
</script>

<style>
  .popup-overview wa-popup {
    --arrow-color: var(--wa-color-brand-spot);
  }

  .popup-overview span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 50px;
  }

  .popup-overview .box {
    width: 100px;
    height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }

  .popup-overview-options {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    gap: 1rem;
  }

  .popup-overview-options wa-select {
    width: 160px;
  }

  .popup-overview-options wa-input {
    width: 100px;
  }

  .popup-overview-options + .popup-overview-options {
    margin-top: 1rem;
  }
</style>
```

```jsx:react
import { useState } from 'react';
import WaPopup from '@shoelace-style/shoelace/dist/react/popup';
import WaSelect from '@shoelace-style/shoelace/dist/react/select';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';
import WaInput from '@shoelace-style/shoelace/dist/react/input';
import WaSwitch from '@shoelace-style/shoelace/dist/react/switch';

const css = `
  .popup-overview wa-popup {
    --arrow-color: var(--wa-color-brand-spot);
  }

  .popup-overview span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 50px;
  }

  .popup-overview .box {
    width: 100px;
    height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }

  .popup-overview-options {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    gap: 1rem;
  }

  .popup-overview-options wa-select {
    width: 160px;
  }

  .popup-overview-options wa-input {
    width: 100px;
  }

  .popup-overview-options + .popup-overview-options {
    margin-top: 1rem;
  }
`;

const App = () => {
  const [placement, setPlacement] = useState('top');
  const [distance, setDistance] = useState(0);
  const [skidding, setSkidding] = useState(0);
  const [active, setActive] = useState(true);
  const [arrow, setArrow] = useState(false);

  return (
    <>
      <div className="popup-overview">
        <WaPopup
          placement={placement}
          active={active || null}
          distance={distance}
          skidding={skidding}
          arrow={arrow || null}
        >
          <span slot="anchor" />
          <div className="box" />
        </WaPopup>

        <div className="popup-overview-options">
          <WaSelect
            label="Placement"
            name="placement"
            value={placement}
            className="popup-overview-select"
            onWaChange={event => setPlacement(event.target.value)}
          >
            <WaMenuItem value="top">top</WaMenuItem>
            <WaMenuItem value="top-start">top-start</WaMenuItem>
            <WaMenuItem value="top-end">top-end</WaMenuItem>
            <WaMenuItem value="bottom">bottom</WaMenuItem>
            <WaMenuItem value="bottom-start">bottom-start</WaMenuItem>
            <WaMenuItem value="bottom-end">bottom-end</WaMenuItem>
            <WaMenuItem value="right">right</WaMenuItem>
            <WaMenuItem value="right-start">right-start</WaMenuItem>
            <WaMenuItem value="right-end">right-end</WaMenuItem>
            <WaMenuItem value="left">left</WaMenuItem>
            <WaMenuItem value="left-start">left-start</WaMenuItem>
            <WaMenuItem value="left-end">left-end</WaMenuItem>
          </WaSelect>
          <WaInput
            type="number"
            name="distance"
            label="distance"
            value={distance}
            onWaInput={event => setDistance(event.target.value)}
          />
          <WaInput
            type="number"
            name="skidding"
            label="Skidding"
            value={skidding}
            onWaInput={event => setSkidding(event.target.value)}
          />
        </div>

        <div className="popup-overview-options">
          <WaSwitch checked={active} onWaChange={event => setActive(event.target.checked)}>
            Active
          </WaSwitch>
          <WaSwitch checked={arrow} onWaChange={event => setArrow(event.target.checked)}>
            Arrow
          </WaSwitch>
        </div>
      </div>

      <style>{css}</style>
    </>
  );
};
```

:::tip
A popup's anchor should not be styled with `display: contents` since the coordinates will not be eligible for calculation. However, if the anchor is a `<slot>` element, popup will use the first assigned element as the anchor. This behavior allows other components to pass anchors through more easily via composition.
:::

## Examples

### Activating

Popups are inactive and hidden until the `active` attribute is applied. Removing the attribute will tear down all positioning logic and listeners, meaning you can have many idle popups on the page without affecting performance.

```html:preview
<div class="popup-active">
  <wa-popup placement="top" active>
    <span slot="anchor"></span>
    <div class="box"></div>
  </wa-popup>

  <br />
  <wa-switch checked>Active</wa-switch>
</div>

<style>
  .popup-active span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 50px;
  }

  .popup-active .box {
    width: 100px;
    height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }
</style>

<script>
  const container = document.querySelector('.popup-active');
  const popup = container.querySelector('wa-popup');
  const active = container.querySelector('wa-switch');

  active.addEventListener('wa-change', () => (popup.active = active.checked));
</script>
```

```jsx:react
import { useState } from 'react';
import WaPopup from '@shoelace-style/shoelace/dist/react/popup';
import WaSwitch from '@shoelace-style/shoelace/dist/react/switch';

const css = `
  .popup-active span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 50px;
  }

  .popup-active .box {
    width: 100px;
    height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }
`;

const App = () => {
  const [active, setActive] = useState(true);

  return (
    <>
      <div className="popup-active">
        <WaPopup placement="top" active={active}>
          <span slot="anchor" />
          <div className="box" />
        </WaPopup>

        <br />
        <WaSwitch checked={active} onWaChange={event => setActive(event.target.checked)}>
          Active
        </WaSwitch>
      </div>

      <style>{css}</style>
    </>
  );
};
```

### External Anchors

By default, anchors are slotted into the popup using the `anchor` slot. If your anchor needs to live outside of the popup, you can pass the anchor's `id` to the `anchor` attribute. Alternatively, you can pass an element reference to the `anchor` property to achieve the same effect without using an `id`.

```html:preview
<span id="external-anchor"></span>

<wa-popup anchor="external-anchor" placement="top" active>
  <div class="box"></div>
</wa-popup>

<style>
  #external-anchor {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 50px 0 0 50px;
  }

  #external-anchor ~ wa-popup .box {
    width: 100px;
    height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }
</style>
```

```jsx:react
import WaPopup from '@shoelace-style/shoelace/dist/react/popup';

const css = `
  #external-anchor {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 50px 0 0 50px;
  }

  #external-anchor ~ wa-popup .box {
    width: 100px;
    height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }
`;

const App = () => {
  return (
    <>
      <span id="external-anchor" />

      <WaPopup anchor="external-anchor" placement="top" active>
        <div class="box" />
      </WaPopup>

      <style>{css}</style>
    </>
  );
};
```

### Placement

Use the `placement` attribute to tell the popup the preferred placement of the popup. Note that the actual position will vary to ensure the panel remains in the viewport if you're using positioning features such as `flip` and `shift`.

Since placement is preferred when using `flip`, you can observe the popup's current placement when it's active by looking at the `data-current-placement` attribute. This attribute will update as the popup flips to find available space and it will be removed when the popup is deactivated.

```html:preview
<div class="popup-placement">
  <wa-popup placement="top" active>
    <span slot="anchor"></span>
    <div class="box"></div>
  </wa-popup>

  <wa-select label="Placement" value="top">
    <wa-option value="top">top</wa-option>
    <wa-option value="top-start">top-start</wa-option>
    <wa-option value="top-end">top-end</wa-option>
    <wa-option value="bottom">bottom</wa-option>
    <wa-option value="bottom-start">bottom-start</wa-option>
    <wa-option value="bottom-end">bottom-end</wa-option>
    <wa-option value="right">right</wa-option>
    <wa-option value="right-start">right-start</wa-option>
    <wa-option value="right-end">right-end</wa-option>
    <wa-option value="left">left</wa-option>
    <wa-option value="left-start">left-start</wa-option>
    <wa-option value="left-end">left-end</wa-option>
  </wa-select>
</div>

<style>
  .popup-placement span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 50px;
  }

  .popup-placement .box {
    width: 100px;
    height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }

  .popup-placement wa-select {
    max-width: 280px;
  }
</style>

<script>
  const container = document.querySelector('.popup-placement');
  const popup = container.querySelector('wa-popup');
  const select = container.querySelector('wa-select');

  select.addEventListener('wa-change', () => (popup.placement = select.value));
</script>
```

```jsx:react
import { useState } from 'react';
import WaPopup from '@shoelace-style/shoelace/dist/react/popup';
import WaSelect from '@shoelace-style/shoelace/dist/react/select';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const css = `
  .popup-placement span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 50px;
  }

  .popup-placement .box {
    width: 100px;
    height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }

  .popup-placement wa-select {
    max-width: 280px;
  }
`;

const App = () => {
  const [placement, setPlacement] = useState('top');

  return (
    <div className="popup-active">
      <div className="popup-placement">
        <WaPopup placement={placement} active>
          <span slot="anchor" />
          <div className="box" />
        </WaPopup>

        <WaSelect label="Placement" value={placement} onWaChange={event => setPlacement(event.target.value)}>
          <WaMenuItem value="top">top</WaMenuItem>
          <WaMenuItem value="top-start">top-start</WaMenuItem>
          <WaMenuItem value="top-end">top-end</WaMenuItem>
          <WaMenuItem value="bottom">bottom</WaMenuItem>
          <WaMenuItem value="bottom-start">bottom-start</WaMenuItem>
          <WaMenuItem value="bottom-end">bottom-end</WaMenuItem>
          <WaMenuItem value="right">right</WaMenuItem>
          <WaMenuItem value="right-start">right-start</WaMenuItem>
          <WaMenuItem value="right-end">right-end</WaMenuItem>
          <WaMenuItem value="left">left</WaMenuItem>
          <WaMenuItem value="left-start">left-start</WaMenuItem>
          <WaMenuItem value="left-end">left-end</WaMenuItem>
        </WaSelect>
      </div>

      <style>{css}</style>
    </div>
  );
};
```

### Distance

Use the `distance` attribute to change the distance between the popup and its anchor. A positive value will move the popup further away and a negative value will move it closer.

```html:preview
<div class="popup-distance">
  <wa-popup placement="top" distance="0" active>
    <span slot="anchor"></span>
    <div class="box"></div>
  </wa-popup>

  <wa-range min="-50" max="50" step="1" value="0" label="Distance"></wa-range>
</div>

<style>
  .popup-distance span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 50px;
  }

  .popup-distance .box {
    width: 100px;
    height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }

  .popup-distance wa-range {
    max-width: 260px;
  }
</style>

<script>
  const container = document.querySelector('.popup-distance');
  const popup = container.querySelector('wa-popup');
  const distance = container.querySelector('wa-range');

  distance.addEventListener('wa-input', () => (popup.distance = distance.value));
</script>
```

```jsx:react
import { useState } from 'react';
import WaPopup from '@shoelace-style/shoelace/dist/react/popup';
import WaRange from '@shoelace-style/shoelace/dist/react/range';

const css = `
  .popup-distance span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 50px;
  }

  .popup-distance .box {
    width: 100px;
    height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }

  .popup-distance wa-range {
    max-width: 260px;
  }
`;

const App = () => {
  const [distance, setDistance] = useState(0);

  return (
    <>
      <div className="popup-distance">
        <WaPopup placement="top" distance={distance} active>
          <span slot="anchor" />
          <div class="box" />
        </WaPopup>

        <WaRange
          label="Distance"
          min="-50"
          max="50"
          step="1"
          value={distance}
          onWaChange={event => setDistance(event.target.value)}
        />
      </div>

      <style>{css}</style>
    </>
  );
};
```

### Skidding

The `skidding` attribute is similar to `distance`, but instead allows you to offset the popup along the anchor's axis. Both positive and negative values are allowed.

```html:preview
<div class="popup-skidding">
  <wa-popup placement="top" skidding="0" active>
    <span slot="anchor"></span>
    <div class="box"></div>
  </wa-popup>

  <wa-range min="-50" max="50" step="1" value="0" label="Skidding"></wa-range>
</div>

<style>
  .popup-skidding span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 50px;
  }

  .popup-skidding .box {
    width: 100px;
    height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }

  .popup-skidding wa-range {
    max-width: 260px;
  }
</style>

<script>
  const container = document.querySelector('.popup-skidding');
  const popup = container.querySelector('wa-popup');
  const skidding = container.querySelector('wa-range');

  skidding.addEventListener('wa-input', () => (popup.skidding = skidding.value));
</script>
```

```jsx:react
import { useState } from 'react';
import WaPopup from '@shoelace-style/shoelace/dist/react/popup';
import WaRange from '@shoelace-style/shoelace/dist/react/range';

const css = `
  .popup-skidding span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 50px;
  }

  .popup-skidding .box {
    width: 100px;
    height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }

  .popup-skidding wa-range {
    max-width: 260px;
  }
`;

const App = () => {
  const [skidding, setSkidding] = useState(0);

  return (
    <>
      <div className="popup-skidding">
        <WaPopup placement="top" skidding={skidding} active>
          <span slot="anchor"></span>
          <div className="box"></div>
        </WaPopup>

        <WaRange
          label="Skidding"
          min="-50"
          max="50"
          step="1"
          value={skidding}
          onWaChange={event => setSkidding(event.target.value)}
        />
      </div>

      <style>{css}</style>
    </>
  );
};
```

### Arrows

Add an arrow to your popup with the `arrow` attribute. It's usually a good idea to set a `distance` to make room for the arrow. To adjust the arrow's color and size, use the `--arrow-color` and `--arrow-size` custom properties, respectively. You can also target the `arrow` part to add additional styles such as shadows and borders.

By default, the arrow will be aligned as close to the center of the _anchor_ as possible, considering available space and `arrow-padding`. You can use the `arrow-placement` attribute to force the arrow to align to the start, end, or center of the _popup_ instead.

```html:preview
<div class="popup-arrow">
  <wa-popup placement="top" arrow arrow-placement="anchor" distance="8" active>
    <span slot="anchor"></span>
    <div class="box"></div>
  </wa-popup>

  <div class="popup-arrow-options">
    <wa-select label="Placement" name="placement" value="top" class="popup-overview-select">
      <wa-option value="top">top</wa-option>
      <wa-option value="top-start">top-start</wa-option>
      <wa-option value="top-end">top-end</wa-option>
      <wa-option value="bottom">bottom</wa-option>
      <wa-option value="bottom-start">bottom-start</wa-option>
      <wa-option value="bottom-end">bottom-end</wa-option>
      <wa-option value="right">right</wa-option>
      <wa-option value="right-start">right-start</wa-option>
      <wa-option value="right-end">right-end</wa-option>
      <wa-option value="left">left</wa-option>
      <wa-option value="left-start">left-start</wa-option>
      <wa-option value="left-end">left-end</wa-option>
    </wa-select>

    <wa-select label="Arrow Placement" name="arrow-placement" value="anchor">
      <wa-option value="anchor">anchor</wa-option>
      <wa-option value="start">start</wa-option>
      <wa-option value="end">end</wa-option>
      <wa-option value="center">center</wa-option>
    </wa-select>
  </div>

  <div class="popup-arrow-options">
    <wa-switch name="arrow" checked>Arrow</wa-switch>
  </div>

  <style>
    .popup-arrow wa-popup {
      --arrow-color: var(--wa-color-brand-spot);
    }

    .popup-arrow span[slot='anchor'] {
      display: inline-block;
      width: 150px;
      height: 150px;
      border: dashed 2px var(--wa-color-neutral-spot);
      margin: 50px;
    }

    .popup-arrow .box {
      width: 100px;
      height: 50px;
      background: var(--wa-color-brand-spot);
      border-radius: var(--wa-corners-s);
    }

    .popup-arrow-options {
      display: flex;
      flex-wrap: wrap;
      align-items: end;
      gap: 1rem;
    }

    .popup-arrow-options wa-select {
      width: 160px;
    }

    .popup-arrow-options + .popup-arrow-options {
      margin-top: 1rem;
    }
  </style>

  <script>
    const container = document.querySelector('.popup-arrow');
    const popup = container.querySelector('wa-popup');
    const placement = container.querySelector('[name="placement"]');
    const arrowPlacement = container.querySelector('[name="arrow-placement"]');
    const arrow = container.querySelector('[name="arrow"]');

    placement.addEventListener('wa-change', () => (popup.placement = placement.value));
    arrowPlacement.addEventListener('wa-change', () => (popup.arrowPlacement = arrowPlacement.value));
    arrow.addEventListener('wa-change', () => (popup.arrow = arrow.checked));
  </script>
</div>
```

```jsx:react
import { useState } from 'react';
import WaPopup from '@shoelace-style/shoelace/dist/react/popup';
import WaSelect from '@shoelace-style/shoelace/dist/react/select';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';
import WaSwitch from '@shoelace-style/shoelace/dist/react/switch';

const css = `
  .popup-arrow wa-popup {
    --arrow-color: var(--wa-color-brand-spot);
  }

  .popup-arrow span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 50px;
  }

  .popup-arrow .box {
    width: 100px;
    height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }

  .popup-arrow-options {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    gap: 1rem;
  }

  .popup-arrow-options wa-select {
    width: 160px;
  }

  .popup-arrow-options + .popup-arrow-options {
    margin-top: 1rem;
  }
`;

const App = () => {
  const [placement, setPlacement] = useState('top');
  const [arrowPlacement, setArrowPlacement] = useState('anchor');
  const [arrow, setArrow] = useState(true);

  return (
    <>
      <div className="popup-arrow">
        <WaPopup placement={placement} arrow={arrow || null} arrow-placement={arrowPlacement} distance="8" active>
          <span slot="anchor" />
          <div className="box" />
        </WaPopup>

        <div className="popup-arrow-options">
          <WaSelect
            label="Placement"
            name="placement"
            value={placement}
            className="popup-overview-select"
            onWaChange={event => setPlacement(event.target.value)}
          >
            <WaMenuItem value="top">top</WaMenuItem>
            <WaMenuItem value="top-start">top-start</WaMenuItem>
            <WaMenuItem value="top-end">top-end</WaMenuItem>
            <WaMenuItem value="bottom">bottom</WaMenuItem>
            <WaMenuItem value="bottom-start">bottom-start</WaMenuItem>
            <WaMenuItem value="bottom-end">bottom-end</WaMenuItem>
            <WaMenuItem value="right">right</WaMenuItem>
            <WaMenuItem value="right-start">right-start</WaMenuItem>
            <WaMenuItem value="right-end">right-end</WaMenuItem>
            <WaMenuItem value="left">left</WaMenuItem>
            <WaMenuItem value="left-start">left-start</WaMenuItem>
            <WaMenuItem value="left-end">left-end</WaMenuItem>
          </WaSelect>

          <WaSelect
            label="Arrow Placement"
            name="arrow-placement"
            value={arrowPlacement}
            onWaChange={event => setArrowPlacement(event.target.value)}
          >
            <WaMenuItem value="anchor">anchor</WaMenuItem>
            <WaMenuItem value="start">start</WaMenuItem>
            <WaMenuItem value="end">end</WaMenuItem>
            <WaMenuItem value="center">center</WaMenuItem>
          </WaSelect>
        </div>

        <div className="popup-arrow-options">
          <WaSwitch name="arrow" checked={arrow} onWaChange={event => setArrow(event.target.checked)}>
            Arrow
          </WaSwitch>
        </div>
      </div>

      <style>{css}</style>
    </>
  );
};
```

### Syncing with the Anchor's Dimensions

Use the `sync` attribute to make the popup the same width or height as the anchor element. This is useful for controls that need the popup to stay the same width or height as the trigger.

```html:preview
<div class="popup-sync">
  <wa-popup placement="top" sync="width" active>
    <span slot="anchor"></span>
    <div class="box"></div>
  </wa-popup>

  <wa-select value="width" label="Sync">
    <wa-option value="width">Width</wa-option>
    <wa-option value="height">Height</wa-option>
    <wa-option value="both">Both</wa-option>
    <wa-option value="">None</wa-option>
  </wa-select>
</div>

<style>
  .popup-sync span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 50px;
  }

  .popup-sync .box {
    width: 100%;
    height: 100%;
    min-width: 50px;
    min-height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }

  .popup-sync wa-select {
    width: 160px;
  }
</style>

<script>
  const container = document.querySelector('.popup-sync');
  const popup = container.querySelector('wa-popup');
  const fixed = container.querySelector('wa-switch');
  const sync = container.querySelector('wa-select');

  sync.addEventListener('wa-change', () => (popup.sync = sync.value));
</script>
```

```jsx:react
import { useState } from 'react';
import WaPopup from '@shoelace-style/shoelace/dist/react/popup';
import WaSelect from '@shoelace-style/shoelace/dist/react/select';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const css = `
  .popup-sync span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 50px;
  }

  .popup-sync .box {
    width: 100%;
    height: 100%;
    min-width: 50px;
    min-height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }

  .popup-sync wa-switch {
    margin-top: 1rem;
  }
`;

const App = () => {
  const [sync, setSync] = useState('width');

  return (
    <>
      <div class="popup-sync">
        <WaPopup placement="top" sync={sync} active>
          <span slot="anchor" />
          <div class="box" />
        </WaPopup>

        <WaSelect value={sync} label="Sync" onWaChange={event => setSync(event.target.value)}>
          <WaMenuItem value="width">Width</WaMenuItem>
          <WaMenuItem value="height">Height</WaMenuItem>
          <WaMenuItem value="both">Both</WaMenuItem>
          <WaMenuItem value="">None</WaMenuItem>
        </WaSelect>
      </div>

      <style>{css}</style>
    </>
  );
};
```

### Positioning Strategy

By default, the popup is positioned using an absolute positioning strategy. However, if your anchor is fixed or exists within a container that has `overflow: auto|hidden`, the popup risks being clipped. To work around this, you can use a fixed positioning strategy by setting the `strategy` attribute to `fixed`.

The fixed positioning strategy reduces jumpiness when the anchor is fixed and allows the popup to break out containers that clip. When using this strategy, it's important to note that the content will be positioned relative to its [containing block](https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#Identifying_the_containing_block), which is usually the viewport unless an ancestor uses a `transform`, `perspective`, or `filter`. [Refer to this page](https://developer.mozilla.org/en-US/docs/Web/CSS/position#fixed) for more details.

In this example, you can see how the popup breaks out of the overflow container when it's fixed. The fixed positioning strategy tends to be less performant than absolute, so avoid using it unnecessarily.

Toggle the switch and scroll the container to see the difference.

```html:preview
<div class="popup-strategy">
  <div class="overflow">
    <wa-popup placement="top" strategy="fixed" active>
      <span slot="anchor"></span>
      <div class="box"></div>
    </wa-popup>
  </div>

  <wa-switch checked>Fixed</wa-switch>
</div>

<style>
  .popup-strategy .overflow {
    position: relative;
    height: 300px;
    border: solid 2px var(--wa-color-surface-border);
    overflow: auto;
  }

  .popup-strategy span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 150px 50px;
  }

  .popup-strategy .box {
    width: 100px;
    height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }

  .popup-strategy wa-switch {
    margin-top: 1rem;
  }
</style>

<script>
  const container = document.querySelector('.popup-strategy');
  const popup = container.querySelector('wa-popup');
  const fixed = container.querySelector('wa-switch');

  fixed.addEventListener('wa-change', () => (popup.strategy = fixed.checked ? 'fixed' : 'absolute'));
</script>
```

```jsx:react
import { useState } from 'react';
import WaPopup from '@shoelace-style/shoelace/dist/react/popup';
import WaSwitch from '@shoelace-style/shoelace/dist/react/switch';

const css = `
  .popup-strategy .overflow {
    position: relative;
    height: 300px;
    border: solid 2px var(--wa-color-surface-border);
    overflow: auto;
  }

  .popup-strategy span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 150px 50px;
  }

  .popup-strategy .box {
    width: 100px;
    height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }

  .popup-strategy wa-switch {
    margin-top: 1rem;
  }
`;

const App = () => {
  const [fixed, setFixed] = useState(true);

  return (
    <>
      <div className="popup-strategy">
        <div className="overflow">
          <WaPopup placement="top" strategy={fixed ? 'fixed' : 'absolute'} active>
            <span slot="anchor" />
            <div className="box" />
          </WaPopup>
        </div>

        <WaSwitch checked={fixed} onWaChange={event => setFixed(event.target.checked)}>
          Fixed
        </WaSwitch>
      </div>

      <style>{css}</style>
    </>
  );
};
```

### Flip

When the popup doesn't have enough room in its preferred placement, it can automatically flip to keep it in view. To enable this, use the `flip` attribute. By default, the popup will flip to the opposite placement, but you can configure preferred fallback placements using `flip-fallback-placement` and `flip-fallback-strategy`. Additional options are available to control the flip behavior's boundary and padding.

Scroll the container to see how the popup flips to prevent clipping.

```html:preview
<div class="popup-flip">
  <div class="overflow">
    <wa-popup placement="top" flip active>
      <span slot="anchor"></span>
      <div class="box"></div>
    </wa-popup>
  </div>

  <br />
  <wa-switch checked>Flip</wa-switch>
</div>

<style>
  .popup-flip .overflow {
    position: relative;
    height: 300px;
    border: solid 2px var(--wa-color-surface-border);
    overflow: auto;
  }

  .popup-flip span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 150px 50px;
  }

  .popup-flip .box {
    width: 100px;
    height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }
</style>

<script>
  const container = document.querySelector('.popup-flip');
  const popup = container.querySelector('wa-popup');
  const flip = container.querySelector('wa-switch');

  flip.addEventListener('wa-change', () => (popup.flip = flip.checked));
</script>
```

```jsx:react
import { useState } from 'react';
import WaPopup from '@shoelace-style/shoelace/dist/react/popup';
import WaSwitch from '@shoelace-style/shoelace/dist/react/switch';

const css = `
  .popup-flip .overflow {
    position: relative;
    height: 300px;
    border: solid 2px var(--wa-color-surface-border);
    overflow: auto;
  }

  .popup-flip span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 150px 50px;
  }

  .popup-flip .box {
    width: 100px;
    height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }
`;

const App = () => {
  const [flip, setFlip] = useState(true);

  return (
    <>
      <div className="popup-flip">
        <div className="overflow">
          <WaPopup placement="top" flip={flip} active>
            <span slot="anchor" />
            <div className="box" />
          </WaPopup>
        </div>

        <br />
        <WaSwitch checked={flip} onWaChange={event => setFlip(event.target.checked)}>
          Flip
        </WaSwitch>
      </div>

      <style>{css}</style>
    </>
  );
};
```

### Flip Fallbacks

While using the `flip` attribute, you can customize the placement of the popup when the preferred placement doesn't have room. For this, use `flip-fallback-placements` and `flip-fallback-strategy`.

If the preferred placement doesn't have room, the first suitable placement found in `flip-fallback-placement` will be used. The value of this attribute must be a string including any number of placements separated by a space, e.g. `"right bottom"`.

If no fallback placement works, the final placement will be determined by `flip-fallback-strategy`. This value can be either `initial` (default), where the placement reverts to the position in `placement`, or `best-fit`, where the placement is chosen based on available space.

Scroll the container to see how the popup changes it's fallback placement to prevent clipping.

```html:preview
<div class="popup-flip-fallbacks">
  <div class="overflow">
    <wa-popup placement="top" flip flip-fallback-placements="right bottom" flip-fallback-strategy="initial" active>
      <span slot="anchor"></span>
      <div class="box"></div>
    </wa-popup>
  </div>
</div>

<style>
  .popup-flip-fallbacks .overflow {
    position: relative;
    height: 300px;
    border: solid 2px var(--wa-color-surface-border);
    overflow: auto;
  }

  .popup-flip-fallbacks span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 250px 50px;
  }

  .popup-flip-fallbacks .box {
    width: 100px;
    height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }
</style>
```

```jsx:react
import WaPopup from '@shoelace-style/shoelace/dist/react/popup';

const css = `
  .popup-flip-fallbacks .overflow {
    position: relative;
    height: 300px;
    border: solid 2px var(--wa-color-surface-border);
    overflow: auto;
  }

  .popup-flip-fallbacks span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 250px 50px;
  }

  .popup-flip-fallbacks .box {
    width: 100px;
    height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }
`;

const App = () => {
  return (
    <>
      <div className="popup-flip-fallbacks">
        <div className="overflow">
          <WaPopup placement="top" flip flip-fallback-placements="right bottom" flip-fallback-strategy="initial" active>
            <span slot="anchor" />
            <div className="box" />
          </WaPopup>
        </div>
      </div>

      <style>{css}</style>
    </>
  );
};
```

### Shift

When a popup is longer than its anchor, it risks being clipped by an overflowing container. In this case, use the `shift` attribute to shift the popup along its axis and back into view. You can customize the shift behavior using `shiftBoundary` and `shift-padding`.

Toggle the switch to see the difference.

```html:preview
<div class="popup-shift">
  <div class="overflow">
    <wa-popup placement="top" shift shift-padding="10" active>
      <span slot="anchor"></span>
      <div class="box"></div>
    </wa-popup>
  </div>

  <wa-switch checked>Shift</wa-switch>
</div>

<style>
  .popup-shift .overflow {
    position: relative;
    border: solid 2px var(--wa-color-surface-border);
    overflow: auto;
  }

  .popup-shift span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 60px 0 0 10px;
  }

  .popup-shift .box {
    width: 300px;
    height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }
</style>

<script>
  const container = document.querySelector('.popup-shift');
  const popup = container.querySelector('wa-popup');
  const shift = container.querySelector('wa-switch');

  shift.addEventListener('wa-change', () => (popup.shift = shift.checked));
</script>
```

```jsx:react
import { useState } from 'react';
import WaPopup from '@shoelace-style/shoelace/dist/react/popup';
import WaSwitch from '@shoelace-style/shoelace/dist/react/switch';

const css = `
  .popup-shift .overflow {
    position: relative;
    border: solid 2px var(--wa-color-surface-border);
    overflow: auto;
  }

  .popup-shift span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 60px 0 0 10px;
  }

  .popup-shift .box {
    width: 300px;
    height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }
`;

const App = () => {
  const [shift, setShift] = useState(true);

  return (
    <>
      <div className="popup-shift">
        <div className="overflow">
          <WaPopup placement="top" shift={shift} shift-padding="10" active>
            <span slot="anchor" />
            <div className="box" />
          </WaPopup>
        </div>

        <WaSwitch checked={shift} onWaChange={event => setShift(event.target.checked)}>
          Shift
        </WaSwitch>
      </div>

      <style>{css}</style>
    </>
  );
};
```

### Auto-size

Use the `auto-size` attribute to tell the popup to resize when necessary to prevent it from getting clipped. Possible values are `horizontal`, `vertical`, and `both`. You can use `autoSizeBoundary` and `auto-size-padding` to customize the behavior of this option. Auto-size works well with `flip`, but if you're using `auto-size-padding` make sure `flip-padding` is the same value.

When using `auto-size`, one or both of `--auto-size-available-width` and `--auto-size-available-height` will be applied to the host element. These values determine the available space the popover has before clipping will occur. Since they cascade, you can use them to set a max-width/height on your popup's content and easily control its overflow.

Scroll the container to see the popup resize as its available space changes.

```html:preview
<div class="popup-auto-size">
  <div class="overflow">
    <wa-popup placement="top" auto-size="both" auto-size-padding="10" active>
      <span slot="anchor"></span>
      <div class="box"></div>
    </wa-popup>
  </div>

  <br />
  <wa-switch checked>Auto-size</wa-switch>
</div>

<style>
  .popup-auto-size .overflow {
    position: relative;
    height: 300px;
    border: solid 2px var(--wa-color-surface-border);
    overflow: auto;
  }

  .popup-auto-size span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 250px 50px 100px 50px;
  }

  .popup-auto-size .box {
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);

    /* This sets the preferred size of the popup's content */
    width: 100px;
    height: 200px;

    /* This sets the maximum dimensions and allows scrolling when auto-size kicks in */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);
    overflow: auto;
  }
</style>

<script>
  const container = document.querySelector('.popup-auto-size');
  const popup = container.querySelector('wa-popup');
  const autoSize = container.querySelector('wa-switch');

  autoSize.addEventListener('wa-change', () => (popup.autoSize = autoSize.checked ? 'both' : ''));
</script>
```

```jsx:react
import { useState } from 'react';
import WaPopup from '@shoelace-style/shoelace/dist/react/popup';
import WaSwitch from '@shoelace-style/shoelace/dist/react/switch';

const css = `
  .popup-auto-size .overflow {
    position: relative;
    height: 300px;
    border: solid 2px var(--wa-color-surface-border);
    overflow: auto;
  }

  .popup-auto-size span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 250px 50px 100px 50px;
  }

  .popup-auto-size .box {
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);

    /* This sets the preferred size of the popup's content */
    width: 100px;
    height: 200px;

    /* This sets the maximum dimensions and allows scrolling when auto-size kicks in */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);
    overflow: auto;
  }
`;

const App = () => {
  const [autoSize, setAutoSize] = useState(true);

  return (
    <>
      <div className="popup-auto-size">
        <div className="overflow">
          <WaPopup placement="top" auto-size={autoSize ? 'both' || null} auto-size-padding="10" active>
            <span slot="anchor" />
            <div className="box" />
          </WaPopup>
        </div>

        <br />
        <WaSwitch checked={autoSize} onWaChange={event => setAutoSize(event.target.checked)}>
          Auto-size
        </WaSwitch>
      </div>

      <style>{css}</style>
    </>
  );
};
```

### Hover Bridge

When a gap exists between the anchor and the popup element, this option will add a "hover bridge" that fills the gap using an invisible element. This makes listening for events such as `mouseover` and `mouseout` more sane because the pointer never technically leaves the element. The hover bridge will only be drawn when the popover is active. For demonstration purposes, the bridge in this example is shown in orange.

```html:preview
<div class="popup-hover-bridge">
  <wa-popup placement="top" hover-bridge distance="10" skidding="0" active>
    <span slot="anchor"></span>
    <div class="box"></div>
  </wa-popup>
  <br>
  <wa-switch checked>Hover Bridge</wa-switch><br>
  <wa-range min="0" max="50" step="1" value="10" label="Distance"></wa-range>
  <wa-range min="-50" max="50" step="1" value="0" label="Skidding"></wa-range>
</div>
<style>
  .popup-hover-bridge span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 50px;
  }

  .popup-hover-bridge .box {
    width: 100px;
    height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }

  .popup-hover-bridge wa-range {
    max-width: 260px;
    margin-top: .5rem;
  }

  .popup-hover-bridge wa-popup::part(hover-bridge) {
    background: tomato;
    opacity: .5;
  }
</style>
<script>
  const container = document.querySelector('.popup-hover-bridge');
  const popup = container.querySelector('wa-popup');
  const hoverBridge = container.querySelector('wa-switch');
  const distance = container.querySelector('wa-range[label="Distance"]');
  const skidding = container.querySelector('wa-range[label="Skidding"]');
  distance.addEventListener('wa-input', () => (popup.distance = distance.value));
  skidding.addEventListener('wa-input', () => (popup.skidding = skidding.value));
  hoverBridge.addEventListener('wa-change', () => (popup.hoverBridge = hoverBridge.checked));
</script>
```

```jsx:react
import { useState } from 'react';
import WaPopup from '@shoelace-style/shoelace/dist/react/popup';
import WaRange from '@shoelace-style/shoelace/dist/react/range';
import WaSwitch from '@shoelace-style/shoelace/dist/react/switch';
const css = `
  .popup-hover-bridge span[slot='anchor'] {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 2px var(--wa-color-neutral-spot);
    margin: 50px;
  }

  .popup-hover-bridge .box {
    width: 100px;
    height: 50px;
    background: var(--wa-color-brand-spot);
    border-radius: var(--wa-corners-s);
  }

  .popup-hover-bridge wa-range {
    max-width: 260px;
    margin-top: .5rem;
  }

  .popup-hover-bridge wa-popup::part(hover-bridge) {
    background: tomato;
    opacity: .5;
  }
`;
const App = () => {
  const [hoverBridge, setHoverBridge] = useState(true);
  const [distance, setDistance] = useState(10);
  const [skidding, setSkidding] = useState(0);
  return (
    <>
      <div class="popup-hover-bridge">
        <WaPopup placement="top" hover-bridge={hoverBridge} distance={distance} skidding={skidding} active>
          <span slot="anchor" />
          <div class="box" />
        </WaPopup>
        <br />
        <WaSwitch
          checked={hoverBridge}
          onWaChange={event => setHoverBridge(event.target.checked)}
         >
          Hover Bridge
        </WaSwitch><br />
        <WaRange
          min="0"
          max="50"
          step="1"
          value={distance}
          label="Distance"
          onWaInput={event => setDistance(event.target.value)}
        />
        <WaRange
          min="-50"
          max="50"
          step="1"
          value={skidding}
          label="Skidding"
          onWaInput={event => setSkidding(event.target.value)}
        />
      </div>
      <style>{css}</style>
    </>
  );
};
```

### Virtual Elements

In most cases, popups are anchored to an actual element. Sometimes, it can be useful to anchor them to a non-element. To do this, you can pass a `VirtualElement` to the anchor property. A virtual element must contain a function called `getBoundingClientRect()` that returns a [`DOMRect`](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect) object as shown below.

```ts
const virtualElement = {
  getBoundingClientRect() {
    // ...
    return { width, height, x, y, top, left, right, bottom };
  }
};
```

This example anchors a popup to the mouse cursor using a virtual element. As such, a mouse is required to properly view it.

```html:preview
<div class="popup-virtual-element">
  <wa-popup placement="right-start">
    <div class="circle"></div>
  </wa-popup>

  <wa-switch>Highlight mouse cursor</wa-switch>
</div>

<script>
  const container = document.querySelector('.popup-virtual-element');
  const popup = container.querySelector('wa-popup');
  const circle = container.querySelector('.circle');
  const enabled = container.querySelector('wa-switch');
  let clientX = 0;
  let clientY = 0;

  // Set the virtual element as a property
  popup.anchor = {
    getBoundingClientRect() {
      return {
        width: 0,
        height: 0,
        x: clientX,
        y: clientY,
        top: clientY,
        left: clientX,
        right: clientX,
        bottom: clientY
      };
    }
  };

  // Only activate the popup when the switch is checked
  enabled.addEventListener('wa-change', () => {
    popup.active = enabled.checked;
  });

  // Listen for the mouse to move
  document.addEventListener('mousemove', handleMouseMove);

  // Update the virtual element as the mouse moves
  function handleMouseMove(event) {
    clientX = event.clientX;
    clientY = event.clientY;

    // Reposition the popup when the virtual anchor moves
    if (popup.active) {
      popup.reposition();
    }
  }
</script>

<style>
  /* If you need to set a z-index, set it on the popup part like this */
  .popup-virtual-element wa-popup::part(popup) {
    z-index: 1000;
    pointer-events: none;
  }

  .popup-virtual-element .circle {
    width: 100px;
    height: 100px;
    border: solid 4px var(--wa-color-neutral-spot);
    border-radius: 50%;
    translate: -50px -50px;
    animation: 1s virtual-cursor infinite;
  }

  @keyframes virtual-cursor {
    0% { scale: 1; }
    50% { scale: 1.1; }
  }
</style>
```

```jsx:react
import { useRef, useState } from 'react';
import WaPopup from '@shoelace-style/shoelace/dist/react/popup';
import WaSwitch from '@shoelace-style/shoelace/dist/react/switch';

const css = `
  /* If you need to set a z-index, set it on the popup part like this */
  .popup-virtual-element wa-popup::part(popup) {
    z-index: 1000;
    pointer-events: none;
  }

  .popup-virtual-element .circle {
    width: 100px;
    height: 100px;
    border: solid 4px var(--wa-color-neutral-spot);
    border-radius: 50%;
    translate: -50px -50px;
    animation: 1s virtual-cursor infinite;
  }

  @keyframes virtual-cursor {
    0% { scale: 1; }
    50% { scale: 1.1; }
  }
`;

const App = () => {
  const [enabled, setEnabled] = useState(false);
  const [clientX, setClientX] = useState(0);
  const [clientY, setClientY] = useState(0);
  const popup = useRef(null);
  const circle = useRef(null);
  const virtualElement = {
    getBoundingClientRect() {
      return {
        width: 0,
        height: 0,
        x: clientX,
        y: clientY,
        top: clientY,
        left: clientX,
        right: clientX,
        bottom: clientY
      };
    }
  };

  // Listen for the mouse to move
  document.addEventListener('mousemove', handleMouseMove);

  // Update the virtual element as the mouse moves
  function handleMouseMove(event) {
    setClientX(event.clientX);
    setClientY(event.clientY);

    // Reposition the popup when the virtual anchor moves
    if (popup.active) {
      popup.current.reposition();
    }
  }

  return (
    <>
      <div className="popup-virtual-element">
        <WaPopup
          ref={popup}
          placement="right-start"
          active={enabled}
          anchor={virtualElement}
        >
          <div ref={circle} className="circle" />
        </WaPopup>

        <WaSwitch checked={enabled} onWaChange={event => setEnabled(event.target.checked)}>
          Highlight mouse cursor
        </WaSwitch>
      </div>

      <style>{css}</style>
    </>
  );
};
```
