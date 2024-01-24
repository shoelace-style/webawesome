---
title: Copy Button
description: Copies data to the clipboard when the user clicks the button.
layout: ../../../layouts/ComponentLayout.astro
---

```html:preview
<wa-copy-button value="Web Awesome rocks!"></wa-copy-button>
```

```jsx:react
import { WaCopyButton } from '@shoelace-style/shoelace/dist/react/copy-button';

const App = () => (
  <WaCopyButton value="Web Awesome rocks!" />
);
```

## Examples

### Custom Labels

Copy Buttons display feedback in a tooltip. You can customize the labels using the `copy-label`, `success-label`, and `error-label` attributes.

```html:preview
<wa-copy-button
  value="Custom labels are easy"
  copy-label="Click to copy"
  success-label="You did it!"
  error-label="Whoops, your browser doesn't support this!"
></wa-copy-button>
```

```jsx:react
import { WaCopyButton } from '@shoelace-style/shoelace/dist/react/copy-button';

const App = () => (
  <WaCopyButton
    value="Custom labels are easy"
    copy-label="Click to copy"
    success-label="You did it!"
    error-label="Whoops, your browser doesn't support this!"
  />
);
```

### Custom Icons

Use the `copy-icon`, `success-icon`, and `error-icon` slots to customize the icons that get displayed for each state. You can use [`<wa-icon>`](/components/icon) or your own images.

```html:preview
<wa-copy-button value="Copied from a custom button">
  <wa-icon slot="copy-icon" name="clipboard" variant="regular"></wa-icon>
  <wa-icon slot="success-icon" name="thumbs-up" variant="solid"></wa-icon>
  <wa-icon slot="error-icon" name="xmark" variant="solid"></wa-icon>
</wa-copy-button>
```

```jsx:react
import { WaCopyButton } from '@shoelace-style/shoelace/dist/react/copy-button';
import { WaIcon } from '@shoelace-style/shoelace/dist/react/icon';

const App = () => (
  <>
    <WaCopyButton value="Copied from a custom button">
      <WaIcon slot="copy-icon" name="clipboard" variant="regular" />
      <WaIcon slot="success-icon" name="check" variant="solid" />
      <WaIcon slot="error-icon" name="xmark" variant="solid" />
    </WaCopyButton>
  </>
);
```

### Copying Values From Other Elements

Normally, the data that gets copied will come from the component's `value` attribute, but you can copy data from any element within the same document by providing its `id` to the `from` attribute.

When using the `from` attribute, the element's [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) will be copied by default. Passing an attribute or property modifier will let you copy data from one of the element's attributes or properties instead.

To copy data from an attribute, use `from="id[attr]"` where `id` is the id of the target element and `attr` is the name of the attribute you'd like to copy. To copy data from a property, use `from="id.prop"` where `id` is the id of the target element and `prop` is the name of the property you'd like to copy.

```html:preview
<!-- Copies the span's textContent -->
<span id="my-phone">+1 (234) 456-7890</span>
<wa-copy-button from="my-phone"></wa-copy-button>

<br><br>

<!-- Copies the input's "value" property -->
<wa-input id="my-input" type="text" value="User input" style="display: inline-block; max-width: 300px;"></wa-input>
<wa-copy-button from="my-input.value"></wa-copy-button>

<br><br>

<!-- Copies the link's "href" attribute -->
<a id="my-link" href="https://shoelace.style/">Web Awesome Website</a>
<wa-copy-button from="my-link[href]"></wa-copy-button>
```

```jsx:react
import { WaCopyButton } from '@shoelace-style/shoelace/dist/react/copy-button';
import { WaInput } from '@shoelace-style/shoelace/dist/react/input';

const App = () => (
  <>
    {/* Copies the span's textContent */}
    <span id="my-phone">+1 (234) 456-7890</span>
    <WaCopyButton from="my-phone" />

    <br /><br />

    {/* Copies the input's "value" property */}
    <WaInput id="my-input" type="text" />
    <WaCopyButton from="my-input.value" />

    <br /><br />

    {/* Copies the link's "href" attribute */}
    <a id="my-link" href="https://shoelace.style/">Web Awesome Website</a>
    <WaCopyButton from="my-link[href]" />
  </>
);
```

### Handling Errors

A copy error will occur if the value is an empty string, if the `from` attribute points to an id that doesn't exist, or if the browser rejects the operation for any reason. When this happens, the `wa-error` event will be emitted.

This example demonstrates what happens when a copy error occurs. You can customize the error label and icon using the `error-label` attribute and the `error-icon` slot, respectively.

```html:preview
<wa-copy-button from="i-do-not-exist"></wa-copy-button>
```

```jsx:react
import { WaCopyButton } from '@shoelace-style/shoelace/dist/react/copy-button';

const App = () => (
  <WaCopyButton from="i-do-not-exist" />
);
```

### Disabled

Copy buttons can be disabled by adding the `disabled` attribute.

```html:preview
<wa-copy-button value="You can't copy me" disabled></wa-copy-button>
```

```jsx:react
import { WaCopyButton } from '@shoelace-style/shoelace/dist/react/copy-button';

const App = () => (
  <WaCopyButton value="You can't copy me" disabled />
);
```

### Changing Feedback Duration

A success indicator is briefly shown after copying. You can customize the length of time the indicator is shown using the `feedback-duration` attribute.

```html:preview
<wa-copy-button value="Web Awesome rocks!" feedback-duration="250"></wa-copy-button>
```

```jsx:react
import { WaCopyButton } from '@shoelace-style/shoelace/dist/react/copy-button';

const App = () => (
  <WaCopyButton value="Web Awesome rocks!" feedback-duration={250} />
);
```

### Custom Styles

You can customize the button to your liking with CSS.

```html:preview
<wa-copy-button value="I'm so stylish" class="custom-styles">
  <wa-icon slot="copy-icon" name="clipboard"></wa-icon>
  <wa-icon slot="success-icon" name="thumbs-up"></wa-icon>
  <wa-icon slot="error-icon" name="thumbs-down"></wa-icon>
</wa-copy-button>

<style>
  .custom-styles {
    --success-color: white;
    --error-color: white;
    color: white;
  }

  .custom-styles::part(button) {
    background-color: #ff1493;
    border: solid 2px #ff7ac1;
    border-right-color: #ad005c;
    border-bottom-color: #ad005c;
    border-radius: 6px;
    transition: var(--wa-transition-normal) all;
  }

  .custom-styles::part(button):hover {
    transform: scale(1.05);
  }

  .custom-styles::part(button):active {
    transform: translateY(1px);
  }

  .custom-styles::part(button):focus-visible {
    outline: dashed 2px deeppink;
    outline-offset: 4px;
  }
</style>
```

```jsx:react
import { WaCopyButton } from '@shoelace-style/shoelace/dist/react/copy-button';

const css = `
  .custom-styles {
    --success-color: white;
    --error-color: white;
    color: white;
  }

  .custom-styles::part(button) {
    background-color: #ff1493;
    border: solid 4px #ff7ac1;
    border-right-color: #ad005c;
    border-bottom-color: #ad005c;
    border-radius: 0;
    transition: 100ms scale ease-in-out, 100ms translate ease-in-out;
  }

  .custom-styles::part(button):hover {
    scale: 1.1;
  }

  .custom-styles::part(button):active {
    translate: 0 2px;
  }

  .custom-styles::part(button):focus-visible {
    outline: dashed 2px deeppink;
    outline-offset: 4px;
  }
`;

const App = () => (
  <>
    <WaCopyButton value="I'm so stylish" className="custom-styles" />

    <style>{css}</style>
  </>
);
```
