---
meta:
  title: Menu Item
  description: Menu items provide options for the user to pick from in a menu.
layout: component
---

```html:preview
<wa-menu style="max-width: 200px;">
  <wa-menu-item>Option 1</wa-menu-item>
  <wa-menu-item>Option 2</wa-menu-item>
  <wa-menu-item>Option 3</wa-menu-item>
  <wa-divider></wa-divider>
  <wa-menu-item type="checkbox" checked>Checkbox</wa-menu-item>
  <wa-menu-item disabled>Disabled</wa-menu-item>
  <wa-divider></wa-divider>
  <wa-menu-item>
    Prefix Icon
    <wa-icon slot="prefix" name="gift"></wa-icon>
  </wa-menu-item>
  <wa-menu-item>
    Suffix Icon
    <wa-icon slot="suffix" name="heart"></wa-icon>
  </wa-menu-item>
</wa-menu>
```

{% raw %}

```jsx:react
import WaDivider from '@shoelace-style/shoelace/dist/react/divider';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';
import WaMenu from '@shoelace-style/shoelace/dist/react/menu';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => (
  <WaMenu style={{ maxWidth: '200px' }}>
    <WaMenuItem>Option 1</WaMenuItem>
    <WaMenuItem>Option 2</WaMenuItem>
    <WaMenuItem>Option 3</WaMenuItem>
    <WaDivider />
    <WaMenuItem type="checkbox" checked>
      Checkbox
    </WaMenuItem>
    <WaMenuItem disabled>Disabled</WaMenuItem>
    <WaDivider />
    <WaMenuItem>
      Prefix Icon
      <WaIcon slot="prefix" name="gift" />
    </WaMenuItem>
    <WaMenuItem>
      Suffix Icon
      <WaIcon slot="suffix" name="heart" />
    </WaMenuItem>
  </WaMenu>
);
```

{% endraw %}

## Examples

### Disabled

Add the `disabled` attribute to disable the menu item so it cannot be selected.

```html:preview
<wa-menu style="max-width: 200px;">
  <wa-menu-item>Option 1</wa-menu-item>
  <wa-menu-item disabled>Option 2</wa-menu-item>
  <wa-menu-item>Option 3</wa-menu-item>
</wa-menu>
```

{% raw %}

```jsx:react
import WaMenu from '@shoelace-style/shoelace/dist/react/menu';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => (
  <WaMenu style={{ maxWidth: '200px' }}>
    <WaMenuItem>Option 1</WaMenuItem>
    <WaMenuItem disabled>Option 2</WaMenuItem>
    <WaMenuItem>Option 3</WaMenuItem>
  </WaMenu>
);
```

{% endraw %}

### Prefix & Suffix

Add content to the start and end of menu items using the `prefix` and `suffix` slots.

```html:preview
<wa-menu style="max-width: 200px;">
  <wa-menu-item>
    <wa-icon slot="prefix" name="house"></wa-icon>
    Home
  </wa-menu-item>

  <wa-menu-item>
    <wa-icon slot="prefix" name="envelope"></wa-icon>
    Messages
    <wa-badge slot="suffix" variant="brand" pill>12</wa-badge>
  </wa-menu-item>

  <wa-divider></wa-divider>

  <wa-menu-item>
    <wa-icon slot="prefix" name="gear"></wa-icon>
    Settings
  </wa-menu-item>
</wa-menu>
```

{% raw %}

```jsx:react
import WaBadge from '@shoelace-style/shoelace/dist/react/badge';
import WaDivider from '@shoelace-style/shoelace/dist/react/divider';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';
import WaMenu from '@shoelace-style/shoelace/dist/react/menu';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => (
  <WaMenu style={{ maxWidth: '200px' }}>
    <WaMenuItem>
      <WaIcon slot="prefix" name="house" />
      Home
    </WaMenuItem>

    <WaMenuItem>
      <WaIcon slot="prefix" name="envelope" />
      Messages
      <WaBadge slot="suffix" variant="brand" pill>
        12
      </WaBadge>
    </WaMenuItem>

    <WaDivider />

    <WaMenuItem>
      <WaIcon slot="prefix" name="gear" />
      Settings
    </WaMenuItem>
  </WaMenu>
);
```

{% endraw %}

### Checkbox Menu Items

Set the `type` attribute to `checkbox` to create a menu item that will toggle on and off when selected. You can use the `checked` attribute to set the initial state.

Checkbox menu items are visually indistinguishable from regular menu items. Their ability to be toggled is primarily inferred from context, much like you'd find in the menu of a native app.

```html:preview
<wa-menu style="max-width: 200px;">
  <wa-menu-item type="checkbox">Autosave</wa-menu-item>
  <wa-menu-item type="checkbox" checked>Check Spelling</wa-menu-item>
  <wa-menu-item type="checkbox">Word Wrap</wa-menu-item>
</wa-menu>
```

{% raw %}

```jsx:react
import WaMenu from '@shoelace-style/shoelace/dist/react/menu';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => (
  <WaMenu style={{ maxWidth: '200px' }}>
    <WaMenuItem type="checkbox">Autosave</WaMenuItem>
    <WaMenuItem type="checkbox" checked>
      Check Spelling
    </WaMenuItem>
    <WaMenuItem type="checkbox">Word Wrap</WaMenuItem>
  </WaMenu>
);
```

{% endraw %}

### Value & Selection

The `value` attribute can be used to assign a hidden value, such as a unique identifier, to a menu item. When an item is selected, the `wa-select` event will be emitted and a reference to the item will be available at `event.detail.item`. You can use this reference to access the selected item's value, its checked state, and more.

```html:preview
<wa-menu class="menu-value" style="max-width: 200px;">
  <wa-menu-item value="opt-1">Option 1</wa-menu-item>
  <wa-menu-item value="opt-2">Option 2</wa-menu-item>
  <wa-menu-item value="opt-3">Option 3</wa-menu-item>
  <wa-divider></wa-divider>
  <wa-menu-item type="checkbox" value="opt-4">Checkbox 4</wa-menu-item>
  <wa-menu-item type="checkbox" value="opt-5">Checkbox 5</wa-menu-item>
  <wa-menu-item type="checkbox" value="opt-6">Checkbox 6</wa-menu-item>
</wa-menu>

<script>
  const menu = document.querySelector('.menu-value');

  menu.addEventListener('wa-select', event => {
    const item = event.detail.item;

    // Log value
    if (item.type === 'checkbox') {
      console.log(`Selected value: ${item.value} (${item.checked ? 'checked' : 'unchecked'})`);
    } else {
      console.log(`Selected value: ${item.value}`);
    }
  });
</script>
```

{% raw %}

```jsx:react
import WaMenu from '@shoelace-style/shoelace/dist/react/menu';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => {
  function handleSelect(event) {
    const item = event.detail.item;

    // Toggle checked state
    item.checked = !item.checked;

    // Log value
    console.log(`Selected value: ${item.value}`);
  }

  return (
    <WaMenu style={{ maxWidth: '200px' }} onWaSelect={handleSelect}>
      <WaMenuItem value="opt-1">Option 1</WaMenuItem>
      <WaMenuItem value="opt-2">Option 2</WaMenuItem>
      <WaMenuItem value="opt-3">Option 3</WaMenuItem>
    </WaMenu>
  );
};
```

{% endraw %}
