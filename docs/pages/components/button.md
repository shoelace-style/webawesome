---
meta:
  title: Button
  description: Buttons represent actions that are available to the user.
layout: component
---

```html:preview
<wa-button>Button</wa-button>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => <WaButton>Button</WaButton>;
```

## Examples

### Variants

Use the `variant` attribute to set the button's variant.

```html:preview
<wa-button variant="brand">Brand</wa-button>
<wa-button variant="success">Success</wa-button>
<wa-button variant="neutral">Neutral</wa-button>
<wa-button variant="warning">Warning</wa-button>
<wa-button variant="danger">Danger</wa-button>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
    <WaButton variant="brand">Brand</WaButton>
    <WaButton variant="success">Success</WaButton>
    <WaButton variant="neutral">Neutral</WaButton>
    <WaButton variant="warning">Warning</WaButton>
    <WaButton variant="danger">Danger</WaButton>
  </>
);
```

### Sizes

Use the `size` attribute to change a button's size.

```html:preview
<wa-button size="small">Small</wa-button>
<wa-button size="medium">Medium</wa-button>
<wa-button size="large">Large</wa-button>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
    <WaButton size="small">Small</WaButton>
    <WaButton size="medium">Medium</WaButton>
    <WaButton size="large">Large</WaButton>
  </>
);
```

### Outline Buttons

Use the `outline` attribute to draw outlined buttons with transparent backgrounds.

```html:preview
<wa-button variant="brand" outline>Brand</wa-button>
<wa-button variant="success" outline>Success</wa-button>
<wa-button variant="neutral" outline>Neutral</wa-button>
<wa-button variant="warning" outline>Warning</wa-button>
<wa-button variant="danger" outline>Danger</wa-button>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
    <WaButton variant="brand" outline>
      Brand
    </WaButton>
    <WaButton variant="success" outline>
      Success
    </WaButton>
    <WaButton variant="neutral" outline>
      Neutral
    </WaButton>
    <WaButton variant="warning" outline>
      Warning
    </WaButton>
    <WaButton variant="danger" outline>
      Danger
    </WaButton>
  </>
);
```

### Pill Buttons

Use the `pill` attribute to give buttons rounded edges.

```html:preview
<wa-button size="small" pill>Small</wa-button>
<wa-button size="medium" pill>Medium</wa-button>
<wa-button size="large" pill>Large</wa-button>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
    <WaButton size="small" pill>
      Small
    </WaButton>
    <WaButton size="medium" pill>
      Medium
    </WaButton>
    <WaButton size="large" pill>
      Large
    </WaButton>
  </>
);
```

### Text Buttons

Use the `text` variant to create text buttons that share the same size as regular buttons but don't have backgrounds or borders.

```html:preview
<wa-button variant="text" size="small">Text</wa-button>
<wa-button variant="text" size="medium">Text</wa-button>
<wa-button variant="text" size="large">Text</wa-button>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
    <WaButton variant="text" size="small">
      Text
    </WaButton>
    <WaButton variant="text" size="medium">
      Text
    </WaButton>
    <WaButton variant="text" size="large">
      Text
    </WaButton>
  </>
);
```

### Link Buttons

It's often helpful to have a button that works like a link. This is possible by setting the `href` attribute, which will make the component render an `<a>` under the hood. This gives you all the default link behavior the browser provides (e.g. [[CMD/CTRL/SHIFT]] + [[CLICK]]) and exposes the `target` and `download` attributes.

```html:preview
<wa-button href="https://example.com/">Link</wa-button>
<wa-button href="https://example.com/" target="_blank">New Window</wa-button>
<wa-button href="/assets/images/wordmark.svg" download="shoelace.svg">Download</wa-button>
<wa-button href="https://example.com/" disabled>Disabled</wa-button>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
    <WaButton href="https://example.com/">Link</WaButton>
    <WaButton href="https://example.com/" target="_blank">
      New Window
    </WaButton>
    <WaButton href="/assets/images/wordmark.svg" download="shoelace.svg">
      Download
    </WaButton>
    <WaButton href="https://example.com/" disabled>
      Disabled
    </WaButton>
  </>
);
```

:::tip
When a `target` is set, the link will receive `rel="noreferrer noopener"` for [security reasons](https://mathiasbynens.github.io/rel-noopener/).
:::

### Setting a Custom Width

As expected, buttons can be given a custom width by setting the `width` attribute. This is useful for making buttons span the full width of their container on smaller screens.

```html:preview
<wa-button size="small" style="width: 100%; margin-bottom: 1rem;">Small</wa-button>
<wa-button size="medium" style="width: 100%; margin-bottom: 1rem;">Medium</wa-button>
<wa-button size="large" style="width: 100%;">Large</wa-button>
```

{% raw %}

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
    <WaButton size="small" style={{ width: '100%', marginBottom: '1rem' }}>
      Small
    </WaButton>
    <WaButton size="medium" style={{ width: '100%', marginBottom: '1rem' }}>
      Medium
    </WaButton>
    <WaButton size="large" style={{ width: '100%' }}>
      Large
    </WaButton>
  </>
);
```

{% endraw %}

### Prefix and Suffix Icons

Use the `prefix` and `suffix` slots to add icons.

```html:preview
<wa-button size="small">
  <wa-icon slot="prefix" name="gear"></wa-icon>
  Settings
</wa-button>

<wa-button size="small">
  <wa-icon slot="suffix" name="arrow-counterclockwise"></wa-icon>
  Refresh
</wa-button>

<wa-button size="small">
  <wa-icon slot="prefix" name="link-45deg"></wa-icon>
  <wa-icon slot="suffix" name="box-arrow-up-right"></wa-icon>
  Open
</wa-button>

<br /><br />

<wa-button>
  <wa-icon slot="prefix" name="gear"></wa-icon>
  Settings
</wa-button>

<wa-button>
  <wa-icon slot="suffix" name="arrow-counterclockwise"></wa-icon>
  Refresh
</wa-button>

<wa-button>
  <wa-icon slot="prefix" name="link-45deg"></wa-icon>
  <wa-icon slot="suffix" name="box-arrow-up-right"></wa-icon>
  Open
</wa-button>

<br /><br />

<wa-button size="large">
  <wa-icon slot="prefix" name="gear"></wa-icon>
  Settings
</wa-button>

<wa-button size="large">
  <wa-icon slot="suffix" name="arrow-counterclockwise"></wa-icon>
  Refresh
</wa-button>

<wa-button size="large">
  <wa-icon slot="prefix" name="link-45deg"></wa-icon>
  <wa-icon slot="suffix" name="box-arrow-up-right"></wa-icon>
  Open
</wa-button>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';

const App = () => (
  <>
    <WaButton size="small">
      <WaIcon slot="prefix" name="gear"></WaIcon>
      Settings
    </WaButton>

    <WaButton size="small">
      <WaIcon slot="suffix" name="arrow-counterclockwise"></WaIcon>
      Refresh
    </WaButton>

    <WaButton size="small">
      <WaIcon slot="prefix" name="link-45deg"></WaIcon>
      <WaIcon slot="suffix" name="box-arrow-up-right"></WaIcon>
      Open
    </WaButton>

    <br />
    <br />

    <WaButton>
      <WaIcon slot="prefix" name="gear"></WaIcon>
      Settings
    </WaButton>

    <WaButton>
      <WaIcon slot="suffix" name="arrow-counterclockwise"></WaIcon>
      Refresh
    </WaButton>

    <WaButton>
      <WaIcon slot="prefix" name="link-45deg"></WaIcon>
      <WaIcon slot="suffix" name="box-arrow-up-right"></WaIcon>
      Open
    </WaButton>

    <br />
    <br />

    <WaButton size="large">
      <WaIcon slot="prefix" name="gear"></WaIcon>
      Settings
    </WaButton>

    <WaButton size="large">
      <WaIcon slot="suffix" name="arrow-counterclockwise"></WaIcon>
      Refresh
    </WaButton>

    <WaButton size="large">
      <WaIcon slot="prefix" name="link-45deg"></WaIcon>
      <WaIcon slot="suffix" name="box-arrow-up-right"></WaIcon>
      Open
    </WaButton>
  </>
);
```

### Caret

Use the `caret` attribute to add a dropdown indicator when a button will trigger a dropdown, menu, or popover.

```html:preview
<wa-button size="small" caret>Small</wa-button>
<wa-button size="medium" caret>Medium</wa-button>
<wa-button size="large" caret>Large</wa-button>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
    <WaButton size="small" caret>
      Small
    </WaButton>
    <WaButton size="medium" caret>
      Medium
    </WaButton>
    <WaButton size="large" caret>
      Large
    </WaButton>
  </>
);
```

### Loading

Use the `loading` attribute to make a button busy. The width will remain the same as before, preventing adjacent elements from moving around. Clicks will be suppressed until the loading state is removed.

```html:preview
<wa-button variant="brand" loading>Brand</wa-button>
<wa-button variant="success" loading>Success</wa-button>
<wa-button variant="neutral" loading>Neutral</wa-button>
<wa-button variant="warning" loading>Warning</wa-button>
<wa-button variant="danger" loading>Danger</wa-button>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
    <WaButton variant="brand" loading>
      Brand
    </WaButton>
    <WaButton variant="success" loading>
      Success
    </WaButton>
    <WaButton variant="neutral" loading>
      Neutral
    </WaButton>
    <WaButton variant="warning" loading>
      Warning
    </WaButton>
    <WaButton variant="danger" loading>
      Danger
    </WaButton>
  </>
);
```

### Disabled

Use the `disabled` attribute to disable a button.

```html:preview
<wa-button variant="brand" disabled>Brand</wa-button>
<wa-button variant="success" disabled>Success</wa-button>
<wa-button variant="neutral" disabled>Neutral</wa-button>
<wa-button variant="warning" disabled>Warning</wa-button>
<wa-button variant="danger" disabled>Danger</wa-button>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
    <WaButton variant="brand" disabled>
      Brand
    </WaButton>

    <WaButton variant="success" disabled>
      Success
    </WaButton>

    <WaButton variant="neutral" disabled>
      Neutral
    </WaButton>

    <WaButton variant="warning" disabled>
      Warning
    </WaButton>

    <WaButton variant="danger" disabled>
      Danger
    </WaButton>
  </>
);
```

### Styling Buttons

This example demonstrates how to style buttons using a custom class. This is the recommended approach if you need to add additional variations. To customize an existing variation, modify the selector to target the button's `variant` attribute instead of a class (e.g. `wa-button[variant="brand"]`).

```html:preview
<wa-button class="pink">Pink Button</wa-button>

<style>
  wa-button.pink::part(base) {
    border-radius: 6px;
    border: solid 2px;
    background-color: #ff1493;
    border-top-color: #ff7ac1;
    border-left-color: #ff7ac1;
    border-bottom-color: #ad005c;
    border-right-color: #ad005c;
    color: white;
    font-size: 1.125rem;
    box-shadow: 0 2px 10px #0002;
    transition: var(--wa-transition-normal) all;
  }

  wa-button.pink::part(base):hover {
    transform: scale(1.05);
  }

  wa-button.pink::part(base):active {
    border-top-color: #ad005c;
    border-right-color: #ff7ac1;
    border-bottom-color: #ff7ac1;
    border-left-color: #ad005c;
    transform: translateY(1px);
  }

  wa-button.pink::part(base):focus-visible {
    outline: dashed 2px deeppink;
    outline-offset: 4px;
  }
</style>
```
