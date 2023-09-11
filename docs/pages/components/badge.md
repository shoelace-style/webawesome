---
meta:
  title: Badge
  description: Badges are used to draw attention and display statuses or counts.
layout: component
---

```html:preview
<wa-badge>Badge</wa-badge>
```

```jsx:react
import WaBadge from '@shoelace-style/shoelace/dist/react/badge';

const App = () => <WaBadge>Badge</WaBadge>;
```

## Examples

### Variants

Set the `variant` attribute to change the badge's variant.

```html:preview
<wa-badge variant="brand">Brand</wa-badge>
<wa-badge variant="success">Success</wa-badge>
<wa-badge variant="neutral">Neutral</wa-badge>
<wa-badge variant="warning">Warning</wa-badge>
<wa-badge variant="danger">Danger</wa-badge>
```

```jsx:react
import WaBadge from '@shoelace-style/shoelace/dist/react/badge';

const App = () => (
  <>
    <WaBadge variant="brand">Brand</WaBadge>
    <WaBadge variant="success">Success</WaBadge>
    <WaBadge variant="neutral">Neutral</WaBadge>
    <WaBadge variant="warning">Warning</WaBadge>
    <WaBadge variant="danger">Danger</WaBadge>
  </>
);
```

### Pill Badges

Use the `pill` attribute to give badges rounded edges.

```html:preview
<wa-badge variant="brand" pill>Brand</wa-badge>
<wa-badge variant="success" pill>Success</wa-badge>
<wa-badge variant="neutral" pill>Neutral</wa-badge>
<wa-badge variant="warning" pill>Warning</wa-badge>
<wa-badge variant="danger" pill>Danger</wa-badge>
```

```jsx:react
import WaBadge from '@shoelace-style/shoelace/dist/react/badge';

const App = () => (
  <>
    <WaBadge variant="brand" pill>
      Brand
    </WaBadge>
    <WaBadge variant="success" pill>
      Success
    </WaBadge>
    <WaBadge variant="neutral" pill>
      Neutral
    </WaBadge>
    <WaBadge variant="warning" pill>
      Warning
    </WaBadge>
    <WaBadge variant="danger" pill>
      Danger
    </WaBadge>
  </>
);
```

### Pulsating Badges

Use the `pulse` attribute to draw attention to the badge with a subtle animation.

```html:preview
<div class="badge-pulse">
  <wa-badge variant="brand" pill pulse>1</wa-badge>
  <wa-badge variant="success" pill pulse>1</wa-badge>
  <wa-badge variant="neutral" pill pulse>1</wa-badge>
  <wa-badge variant="warning" pill pulse>1</wa-badge>
  <wa-badge variant="danger" pill pulse>1</wa-badge>
</div>

<style>
  .badge-pulse wa-badge:not(:last-of-type) {
    margin-right: 1rem;
  }
</style>
```

```jsx:react
import WaBadge from '@shoelace-style/shoelace/dist/react/badge';

const css = `
  .badge-pulse wa-badge:not(:last-of-type) {
    margin-right: 1rem;
  }
`;

const App = () => (
  <>
    <div className="badge-pulse">
      <WaBadge variant="brand" pill pulse>
        1
      </WaBadge>
      <WaBadge variant="success" pill pulse>
        1
      </WaBadge>
      <WaBadge variant="neutral" pill pulse>
        1
      </WaBadge>
      <WaBadge variant="warning" pill pulse>
        1
      </WaBadge>
      <WaBadge variant="danger" pill pulse>
        1
      </WaBadge>
    </div>

    <style>{css}</style>
  </>
);
```

### With Buttons

One of the most common use cases for badges is attaching them to buttons. To make this easier, badges will be automatically positioned at the top-right when they're a child of a button.

```html:preview
<wa-button>
  Requests
  <wa-badge pill>30</wa-badge>
</wa-button>

<wa-button style="margin-inline-start: 1rem;">
  Warnings
  <wa-badge variant="warning" pill>8</wa-badge>
</wa-button>

<wa-button style="margin-inline-start: 1rem;">
  Errors
  <wa-badge variant="danger" pill>6</wa-badge>
</wa-button>
```

{% raw %}

```jsx:react
import WaBadge from '@shoelace-style/shoelace/dist/react/badge';
import WaButton from '@shoelace-style/shoelace/dist/react/button';

const App = () => (
  <>
    <WaButton>
      Requests
      <WaBadge pill>30</WaBadge>
    </WaButton>

    <WaButton style={{ marginInlineStart: '1rem' }}>
      Warnings
      <WaBadge variant="warning" pill>
        8
      </WaBadge>
    </WaButton>

    <WaButton style={{ marginInlineStart: '1rem' }}>
      Errors
      <WaBadge variant="danger" pill>
        6
      </WaBadge>
    </WaButton>
  </>
);
```

{% endraw %}

### With Menu Items

When including badges in menu items, use the `suffix` slot to make sure they're aligned correctly.

```html:preview
<wa-menu style="max-width: 240px;">
  <wa-menu-label>Messages</wa-menu-label>
  <wa-menu-item>Comments <wa-badge slot="suffix" variant="neutral" pill>4</wa-badge></wa-menu-item>
  <wa-menu-item>Replies <wa-badge slot="suffix" variant="neutral" pill>12</wa-badge></wa-menu-item>
</wa-menu>
```

{% raw %}

```jsx:react
import WaBadge from '@shoelace-style/shoelace/dist/react/badge';
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaMenu from '@shoelace-style/shoelace/dist/react/menu';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';
import WaMenuLabel from '@shoelace-style/shoelace/dist/react/menu-label';

const App = () => (
  <WaMenu
    style={{ maxWidth: '240px' }}
  >
    <WaMenuLabel>Messages</WaMenuLabel>
    <WaMenuItem>
      Comments
      <WaBadge slot="suffix" variant="neutral" pill>
        4
      </WaBadge>
    </WaMenuItem>
    <WaMenuItem>
      Replies
      <WaBadge slot="suffix" variant="neutral" pill>
        12
      </WaBadge>
    </WaMenuItem>
  </WaMenu>
);
```

{% endraw %}
