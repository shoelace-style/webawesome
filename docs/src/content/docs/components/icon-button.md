---
title: Icon Button
description: Icons buttons are simple, icon-only buttons that can be used for actions and in toolbars.
layout: ../../../layouts/ComponentLayout.astro
---

For a full list of icons that come bundled with Web Awesome, refer to the [icon component](/components/icon).

```html:preview
<wa-icon-button name="gear" label="Settings"></wa-icon-button>
```

```jsx:react
import WaIconButton from '@shoelace-style/shoelace/dist/react/icon-button';

const App = () => <WaIconButton name="gear" label="Settings" />;
```

## Examples

### Sizes

Icon buttons inherit their parent element's `font-size`.

```html:preview
<wa-icon-button name="pen-to-square" variant="solid" label="Edit" style="font-size: 1.5rem;"></wa-icon-button>
<wa-icon-button name="pen-to-square" variant="solid" label="Edit" style="font-size: 2rem;"></wa-icon-button>
<wa-icon-button name="pen-to-square" variant="solid" label="Edit" style="font-size: 2.5rem;"></wa-icon-button>
```

```jsx:react
import WaIconButton from '@shoelace-style/shoelace/dist/react/icon-button';

const App = () => (
  <>
    <WaIconButton name="pen-to-square" variant="solid" label="Edit" style={{ fontSize: '1.5rem' }} />
    <WaIconButton name="pen-to-square" variant="solid" label="Edit" style={{ fontSize: '2rem' }} />
    <WaIconButton name="pen-to-square" variant="solid" label="Edit" style={{ fontSize: '2.5rem' }} />
  </>
);
```

### Colors

Icon buttons are designed to have a uniform appearance, so their color is not inherited. However, you can still customize them by styling the `base` part.

```html:preview
<div class="icon-button-color">
  <wa-icon-button name="bold" variant="solid" label="Bold"></wa-icon-button>
  <wa-icon-button name="italic" variant="solid" label="Italic"></wa-icon-button>
  <wa-icon-button name="underline" variant="solid" label="Underline"></wa-icon-button>
</div>

<style>
  .icon-button-color wa-icon-button::part(base) {
    color: #b00091;
  }

  .icon-button-color wa-icon-button::part(base):hover,
  .icon-button-color wa-icon-button::part(base):focus {
    color: #c913aa;
  }

  .icon-button-color wa-icon-button::part(base):active {
    color: #960077;
  }
</style>
```

```jsx:react
import WaIconButton from '@shoelace-style/shoelace/dist/react/icon-button';

const css = `
  .icon-button-color wa-icon-button::part(base) {
    color: #b00091;
  }

  .icon-button-color wa-icon-button::part(base):hover,
  .icon-button-color wa-icon-button::part(base):focus {
    color: #c913aa;
  }

  .icon-button-color wa-icon-button::part(base):active {
    color: #960077;
  }
`;

const App = () => (
  <>
    <div className="icon-button-color">
      <WaIconButton name="type-bold" variant="solid" label="Bold" />
      <WaIconButton name="type-italic" variant="solid" label="Italic" />
      <WaIconButton name="type-underline" variant="solid" label="Underline" />
    </div>

    <style>{css}</style>
  </>
);
```

### Link Buttons

Use the `href` attribute to convert the button to a link.

```html:preview
<wa-icon-button name="gear" variant="solid" label="Settings" href="https://example.com" target="_blank"></wa-icon-button>
```

```jsx:react
import WaIconButton from '@shoelace-style/shoelace/dist/react/icon-button';

const App = () => <WaIconButton name="gear" variant="solid" label="Settings" href="https://example.com" target="_blank" />;
```

### Icon Button with Tooltip

Wrap a tooltip around an icon button to provide contextual information to the user.

```html:preview
<wa-tooltip content="Settings">
  <wa-icon-button name="gear" variant="solid" label="Settings"></wa-icon-button>
</wa-tooltip>
```

```jsx:react
import WaIconButton from '@shoelace-style/shoelace/dist/react/icon-button';
import WaTooltip from '@shoelace-style/shoelace/dist/react/tooltip';

const App = () => (
  <WaTooltip content="Settings">
    <WaIconButton name="gear" variant="solid" label="Settings" />
  </WaTooltip>
);
```

### Disabled

Use the `disabled` attribute to disable the icon button.

```html:preview
<wa-icon-button name="gear" variant="solid" label="Settings" disabled></wa-icon-button>
```

```jsx:react
import WaIconButton from '@shoelace-style/shoelace/dist/react/icon-button';

const App = () => <WaIconButton name="gear" variant="solid" label="Settings" disabled />;
```
