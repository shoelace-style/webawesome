---
meta:
  title: Nav Item
  description: |
    A nav item is intended to be used in a navigation area such as within a nav element in a sidebar or inside of a drawer. A nav item is meant to drive page level navigations.
layout: component
---

`wa-nav-item` maps to a `role="listitem"` under the hood and should generally be used as part
of a `<wa-nav-group>` for accessibility purposes.

```html:preview
<wa-nav-group>
  <wa-nav-item href="#">
    <wa-icon name="search" slot="prefix"></wa-icon>
    Search
  </wa-nav-item>

  <wa-nav-item href="#">
    <wa-icon name="bell" slot="prefix"></wa-icon>
    Notifications
  </wa-nav-item>

  <wa-divider></wa-divider>

  <wa-nav-item href="#" current="page">
    <wa-icon name="house-door" slot="prefix"></wa-icon>
    Home
  </wa-nav-item>

  <wa-nav-item href="#">
    <wa-icon name="music-note-list" slot="prefix"></wa-icon>
    Playlists
  </wa-nav-item>

  <wa-nav-item href="#">
    <wa-icon name="file-earmark-music" slot="prefix"></wa-icon>
    Tracks
  </wa-nav-item>

  <wa-nav-item href="#">
    <wa-icon name="gear" slot="prefix"></wa-icon>
    Settings
  </wa-nav-item>

  <wa-nav-item href="#">
    <wa-icon name="question-circle" slot="prefix"></wa-icon>
    Help
  </wa-nav-item>
</wa-nav-group>
```

{% raw %}

```jsx:react
import WaNavGroup from '@shoelace-style/shoelace/dist/react/nav-group';
import WaNavItem from '@shoelace-style/shoelace/dist/react/nav-item';
import WaDivider from '@shoelace-style/shoelace/dist/react/divider';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';

<WaNavGroup>
  <WaNavItem href="#">
    <WaIcon name="search" slot="prefix" />
    Search
  </WaNavItem>

  <WaNavItem href="#">
    <WaIcon name="bell" slot="prefix" />
    Notifications
  </WaNavItem>

  <WaDivider></WaDivider>

  <WaNavItem href="#" current="page">
    <WaIcon name="house-door" slot="prefix" />
    Home
  </WaNavItem>

  <WaNavItem href="#">
    <WaIcon name="music-note-list" slot="prefix" />
    Playlists
  </WaNavItem>

  <WaNavItem href="#">
    <WaIcon name="file-earmark-music" slot="prefix" />
    Tracks
  </WaNavItem>

  <WaNavItem href="#">
    <WaIcon name="gear" slot="prefix" />
    Settings
  </WaNavItem>

  <WaNavItem href="#">
    <WaIcon name="question-circle" slot="prefix" />
    Help
  </WaNavItem>
</WaNavGroup>
```

{% endraw %}

## Examples

### Active nav item

Set a `<wa-nav-item>` to active using the `current` string attribute. Doing so will map to `aria-current="<string>"` under the hood. If your nav-items are intended for full page navigations, it is recommended to use `current="page"`. If your nav-items are, for example, just the active item within a list, but do not perform full page navigation (such as with table of contents) then use `current="true"`.

```html:preview
<wa-nav-item href="#" current="page">
  Active Nav Item
</wa-nav-item>
```

{% raw %}

```jsx:react
import WaNavItem from '@shoelace-style/shoelace/dist/react/nav-item';

export default () => {
  return (
    <WaNavItem href="#" current="page">
      Active Nav Item
    </WaNavItem>
  )
}
```

{% endraw %}

### Icon only

```html:preview
<wa-nav-item href="#">
  <wa-icon name="house-door" label="Home"></wa-icon>
</wa-nav-item>
```

{% raw %}

```jsx:react
import WaNavItem from '@shoelace-style/shoelace/dist/react/nav-item';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';

export default () => {
  return (
    <WaNavItem href="#">
      <WaIcon name="house-door" label="Home" />
    </WaNavItem>
  )
}
```

{% endraw %}

### Nav items with prefix + suffix

```html:preview
<wa-nav-item href="#">
  <wa-icon slot="prefix" name="link-45deg"></wa-icon>
  Nav Item
  <wa-icon slot="suffix" name="box-arrow-up-right"></wa-icon>
</wa-nav-item>
```

{% raw %}

```jsx:react
import WaNavItem from '@shoelace-style/shoelace/dist/react/nav-item';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';

export default () => {
  return (
    <WaNavItem href="#">
      <WaIcon slot="prefix" name="link-45deg" />
      Nav Item
      <WaIcon slot="suffix" name="box-arrow-up-right" />
    </WaNavItem>
  )
}
```

{% endraw %}

### Nav group with nested nav items

Use the `expandable` attribute to mark a nav item as expandable. In addition,
you can add a `label` slot or attribute to display in the `<wa-details>` element prior
to expanding the nav group.

```html:preview
<wa-nav-item expandable>
  <div slot="label" style="display: flex; align-items: center; gap: 8px;">
    <wa-icon name="credit-card"></wa-icon>
    Payments
  </div>

  <wa-nav-item href="#" current="page">
    Transactions
  </wa-nav-item>

  <wa-nav-item href="#">
    Invoices
  </wa-nav-item>

  <wa-nav-item href="#">
    Disputed Charges
  </wa-nav-item>
</wa-nav-group>
```

{% raw %}

```jsx:react
import WaNavItem from '@shoelace-style/shoelace/dist/react/nav-item';

<WaNavItem expandable label="Payments">
  <WaNavItem href="#" current="page">
    Transactions
  </WaNavItem>

  <WaNavItem href="#">
    Invoices
  </WaNavItem>

  <WaNavItem href="#">
    Disputed Charges
  </WaNavItem>
</WaNavGroup>
```

{% endraw %}
