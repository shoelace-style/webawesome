---
meta:
  title: Dropdown
  description: 'Dropdowns expose additional content that "drops down" in a panel.'
layout: component
---

Dropdowns consist of a trigger and a panel. By default, activating the trigger will expose the panel and interacting outside of the panel will close it.

Dropdowns are designed to work well with [menus](/components/menu) to provide a list of options the user can select from. However, dropdowns can also be used in lower-level applications (e.g. [color picker](/components/color-picker)). The API gives you complete control over showing, hiding, and positioning the panel.

```html:preview
<wa-dropdown>
  <wa-button slot="trigger" caret>Dropdown</wa-button>
  <wa-menu>
    <wa-menu-item>Dropdown Item 1</wa-menu-item>
    <wa-menu-item>Dropdown Item 2</wa-menu-item>
    <wa-menu-item>Dropdown Item 3</wa-menu-item>
    <wa-divider></wa-divider>
    <wa-menu-item type="checkbox" checked>Checkbox</wa-menu-item>
    <wa-menu-item disabled>Disabled</wa-menu-item>
    <wa-divider></wa-divider>
    <wa-menu-item>
      Prefix
      <wa-icon slot="prefix" name="gift"></wa-icon>
    </wa-menu-item>
    <wa-menu-item>
      Suffix Icon
      <wa-icon slot="suffix" name="heart"></wa-icon>
    </wa-menu-item>
  </wa-menu>
</wa-dropdown>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaDivider from '@shoelace-style/shoelace/dist/react/divider';
import WaDropdown from '@shoelace-style/shoelace/dist/react/dropdown';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';
import WaMenu from '@shoelace-style/shoelace/dist/react/menu';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => (
  <WaDropdown>
    <WaButton slot="trigger" caret>
      Dropdown
    </WaButton>
    <WaMenu>
      <WaMenuItem>Dropdown Item 1</WaMenuItem>
      <WaMenuItem>Dropdown Item 2</WaMenuItem>
      <WaMenuItem>Dropdown Item 3</WaMenuItem>
      <WaDivider />
      <WaMenuItem type="checkbox" checked>
        Checkbox
      </WaMenuItem>
      <WaMenuItem disabled>Disabled</WaMenuItem>
      <WaDivider />
      <WaMenuItem>
        Prefix
        <WaIcon slot="prefix" name="gift" />
      </WaMenuItem>
      <WaMenuItem>
        Suffix Icon
        <WaIcon slot="suffix" name="heart" />
      </WaMenuItem>
    </WaMenu>
  </WaDropdown>
);
```

## Examples

### Getting the Selected Item

When dropdowns are used with [menus](/components/menu), you can listen for the [`wa-select`](/components/menu#events) event to determine which menu item was selected. The menu item element will be exposed in `event.detail.item`. You can set `value` props to make it easier to identify commands.

```html:preview
<div class="dropdown-selection">
  <wa-dropdown>
    <wa-button slot="trigger" caret>Edit</wa-button>
    <wa-menu>
      <wa-menu-item value="cut">Cut</wa-menu-item>
      <wa-menu-item value="copy">Copy</wa-menu-item>
      <wa-menu-item value="paste">Paste</wa-menu-item>
    </wa-menu>
  </wa-dropdown>
</div>

<script>
  const container = document.querySelector('.dropdown-selection');
  const dropdown = container.querySelector('wa-dropdown');

  dropdown.addEventListener('wa-select', event => {
    const selectedItem = event.detail.item;
    console.log(selectedItem.value);
  });
</script>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaDropdown from '@shoelace-style/shoelace/dist/react/dropdown';
import WaMenu from '@shoelace-style/shoelace/dist/react/menu';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => {
  function handleSelect(event) {
    const selectedItem = event.detail.item;
    console.log(selectedItem.value);
  }

  return (
    <WaDropdown>
      <WaButton slot="trigger" caret>
        Edit
      </WaButton>
      <WaMenu onWaSelect={handleSelect}>
        <WaMenuItem value="cut">Cut</WaMenuItem>
        <WaMenuItem value="copy">Copy</WaMenuItem>
        <WaMenuItem value="paste">Paste</WaMenuItem>
      </WaMenu>
    </WaDropdown>
  );
};
```

Alternatively, you can listen for the `click` event on individual menu items. Note that, using this approach, disabled menu items will still emit a `click` event.

```html:preview
<div class="dropdown-selection-alt">
  <wa-dropdown>
    <wa-button slot="trigger" caret>Edit</wa-button>
    <wa-menu>
      <wa-menu-item value="cut">Cut</wa-menu-item>
      <wa-menu-item value="copy">Copy</wa-menu-item>
      <wa-menu-item value="paste">Paste</wa-menu-item>
    </wa-menu>
  </wa-dropdown>
</div>

<script>
  const container = document.querySelector('.dropdown-selection-alt');
  const cut = container.querySelector('wa-menu-item[value="cut"]');
  const copy = container.querySelector('wa-menu-item[value="copy"]');
  const paste = container.querySelector('wa-menu-item[value="paste"]');

  cut.addEventListener('click', () => console.log('cut'));
  copy.addEventListener('click', () => console.log('copy'));
  paste.addEventListener('click', () => console.log('paste'));
</script>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaDropdown from '@shoelace-style/shoelace/dist/react/dropdown';
import WaMenu from '@shoelace-style/shoelace/dist/react/menu';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => {
  function handleCut() {
    console.log('cut');
  }

  function handleCopy() {
    console.log('copy');
  }

  function handlePaste() {
    console.log('paste');
  }

  return (
    <WaDropdown>
      <WaButton slot="trigger" caret>
        Edit
      </WaButton>
      <WaMenu>
        <WaMenuItem onClick={handleCut}>Cut</WaMenuItem>
        <WaMenuItem onClick={handleCopy}>Copy</WaMenuItem>
        <WaMenuItem onClick={handlePaste}>Paste</WaMenuItem>
      </WaMenu>
    </WaDropdown>
  );
};
```

### Placement

The preferred placement of the dropdown can be set with the `placement` attribute. Note that the actual position may vary to ensure the panel remains in the viewport.

```html:preview
<wa-dropdown placement="top-start">
  <wa-button slot="trigger" caret>Edit</wa-button>
  <wa-menu>
    <wa-menu-item>Cut</wa-menu-item>
    <wa-menu-item>Copy</wa-menu-item>
    <wa-menu-item>Paste</wa-menu-item>
    <wa-divider></wa-divider>
    <wa-menu-item>Find</wa-menu-item>
    <wa-menu-item>Replace</wa-menu-item>
  </wa-menu>
</wa-dropdown>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaDivider from '@shoelace-style/shoelace/dist/react/divider';
import WaDropdown from '@shoelace-style/shoelace/dist/react/dropdown';
import WaMenu from '@shoelace-style/shoelace/dist/react/menu';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => (
  <WaDropdown placement="top-start">
    <WaButton slot="trigger" caret>
      Edit
    </WaButton>
    <WaMenu>
      <WaMenuItem>Cut</WaMenuItem>
      <WaMenuItem>Copy</WaMenuItem>
      <WaMenuItem>Paste</WaMenuItem>
      <WaDivider />
      <WaMenuItem>Find</WaMenuItem>
      <WaMenuItem>Replace</WaMenuItem>
    </WaMenu>
  </WaDropdown>
);
```

### Distance

The distance from the panel to the trigger can be customized using the `distance` attribute. This value is specified in pixels.

```html:preview
<wa-dropdown distance="30">
  <wa-button slot="trigger" caret>Edit</wa-button>
  <wa-menu>
    <wa-menu-item>Cut</wa-menu-item>
    <wa-menu-item>Copy</wa-menu-item>
    <wa-menu-item>Paste</wa-menu-item>
    <wa-divider></wa-divider>
    <wa-menu-item>Find</wa-menu-item>
    <wa-menu-item>Replace</wa-menu-item>
  </wa-menu>
</wa-dropdown>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaDivider from '@shoelace-style/shoelace/dist/react/divider';
import WaDropdown from '@shoelace-style/shoelace/dist/react/dropdown';
import WaMenu from '@shoelace-style/shoelace/dist/react/menu';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => (
  <WaDropdown distance={30}>
    <WaButton slot="trigger" caret>
      Edit
    </WaButton>
    <WaMenu>
      <WaMenuItem>Cut</WaMenuItem>
      <WaMenuItem>Copy</WaMenuItem>
      <WaMenuItem>Paste</WaMenuItem>
      <WaDivider />
      <WaMenuItem>Find</WaMenuItem>
      <WaMenuItem>Replace</WaMenuItem>
    </WaMenu>
  </WaDropdown>
);
```

### Skidding

The offset of the panel along the trigger can be customized using the `skidding` attribute. This value is specified in pixels.

```html:preview
<wa-dropdown skidding="30">
  <wa-button slot="trigger" caret>Edit</wa-button>
  <wa-menu>
    <wa-menu-item>Cut</wa-menu-item>
    <wa-menu-item>Copy</wa-menu-item>
    <wa-menu-item>Paste</wa-menu-item>
    <wa-divider></wa-divider>
    <wa-menu-item>Find</wa-menu-item>
    <wa-menu-item>Replace</wa-menu-item>
  </wa-menu>
</wa-dropdown>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaDivider from '@shoelace-style/shoelace/dist/react/divider';
import WaDropdown from '@shoelace-style/shoelace/dist/react/dropdown';
import WaMenu from '@shoelace-style/shoelace/dist/react/menu';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => (
  <WaDropdown skidding={30}>
    <WaButton slot="trigger" caret>
      Edit
    </WaButton>
    <WaMenu>
      <WaMenuItem>Cut</WaMenuItem>
      <WaMenuItem>Copy</WaMenuItem>
      <WaMenuItem>Paste</WaMenuItem>
      <WaDivider />
      <WaMenuItem>Find</WaMenuItem>
      <WaMenuItem>Replace</WaMenuItem>
    </WaMenu>
  </WaDropdown>
);
```

### Submenus

To create a submenu, nest an `<wa-menu slot="submenu">` element in a [menu item](/components/menu-item).

```html:preview
<wa-dropdown>
  <wa-button slot="trigger" caret>Edit</wa-button>

  <wa-menu style="max-width: 200px;">
    <wa-menu-item value="undo">Undo</wa-menu-item>
    <wa-menu-item value="redo">Redo</wa-menu-item>
    <wa-divider></wa-divider>
    <wa-menu-item value="cut">Cut</wa-menu-item>
    <wa-menu-item value="copy">Copy</wa-menu-item>
    <wa-menu-item value="paste">Paste</wa-menu-item>
    <wa-divider></wa-divider>
    <wa-menu-item>
      Find
      <wa-menu slot="submenu">
        <wa-menu-item value="find">Find…</wa-menu-item>
        <wa-menu-item value="find-previous">Find Next</wa-menu-item>
        <wa-menu-item value="find-next">Find Previous</wa-menu-item>
      </wa-menu>
    </wa-menu-item>
    <wa-menu-item>
      Transformations
      <wa-menu slot="submenu">
        <wa-menu-item value="uppercase">Make uppercase</wa-menu-item>
        <wa-menu-item value="lowercase">Make lowercase</wa-menu-item>
        <wa-menu-item value="capitalize">Capitalize</wa-menu-item>
      </wa-menu>
    </wa-menu-item>
  </wa-menu>
</wa-dropdown>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaDivider from '@shoelace-style/shoelace/dist/react/divider';
import WaDropdown from '@shoelace-style/shoelace/dist/react/dropdown';
import WaMenu from '@shoelace-style/shoelace/dist/react/menu';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const css = `
  .dropdown-hoist {
    border: solid 2px var(--wa-color-surface-border);
    padding: var(--wa-space-m);
    overflow: hidden;
  }
`;

const App = () => (
  <>
    <WaDropdown>
      <WaButton slot="trigger" caret>Edit</WaButton>

      <WaMenu style="max-width: 200px;">
        <WaMenuItem value="undo">Undo</WaMenuItem>
        <WaMenuItem value="redo">Redo</WaMenuItem>
        <WaDivider />
        <WaMenuItem value="cut">Cut</WaMenuItem>
        <WaMenuItem value="copy">Copy</WaMenuItem>
        <WaMenuItem value="paste">Paste</WaMenuItem>
        <WaDivider />
        <WaMenuItem>
          Find
          <WaMenu slot="submenu">
            <WaMenuItem value="find">Find…</WaMenuItem>
            <WaMenuItem value="find-previous">Find Next</WaMenuItem>
            <WaMenuItem value="find-next">Find Previous</WaMenuItem>
          </WaMenu>
        </WaMenuItem>
        <WaMenuItem>
          Transformations
          <WaMenu slot="submenu">
            <WaMenuItem value="uppercase">Make uppercase</WaMenuItem>
            <WaMenuItem value="lowercase">Make lowercase</WaMenuItem>
            <WaMenuItem value="capitalize">Capitalize</WaMenuItem>
          </WaMenu>
        </WaMenuItem>
      </WaMenu>
    </WaDropdown>
  </>
);
```

:::warning
As a UX best practice, avoid using more than one level of submenu when possible.
:::

### Hoisting

Dropdown panels will be clipped if they're inside a container that has `overflow: auto|hidden`. The `hoist` attribute forces the panel to use a fixed positioning strategy, allowing it to break out of the container. In this case, the panel will be positioned relative to its [containing block](https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#Identifying_the_containing_block), which is usually the viewport unless an ancestor uses a `transform`, `perspective`, or `filter`. [Refer to this page](https://developer.mozilla.org/en-US/docs/Web/CSS/position#fixed) for more details.

```html:preview
<div class="dropdown-hoist">
  <wa-dropdown>
    <wa-button slot="trigger" caret>No Hoist</wa-button>
    <wa-menu>
      <wa-menu-item>Item 1</wa-menu-item>
      <wa-menu-item>Item 2</wa-menu-item>
      <wa-menu-item>Item 3</wa-menu-item>
    </wa-menu>
  </wa-dropdown>

  <wa-dropdown hoist>
    <wa-button slot="trigger" caret>Hoist</wa-button>
    <wa-menu>
      <wa-menu-item>Item 1</wa-menu-item>
      <wa-menu-item>Item 2</wa-menu-item>
      <wa-menu-item>Item 3</wa-menu-item>
    </wa-menu>
  </wa-dropdown>
</div>

<style>
  .dropdown-hoist {
    position: relative;
    border: solid 2px var(--wa-color-surface-border);
    padding: var(--wa-space-m);
    overflow: hidden;
  }
</style>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaDivider from '@shoelace-style/shoelace/dist/react/divider';
import WaDropdown from '@shoelace-style/shoelace/dist/react/dropdown';
import WaMenu from '@shoelace-style/shoelace/dist/react/menu';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const css = `
  .dropdown-hoist {
    border: solid 2px var(--wa-color-surface-border);
    padding: var(--wa-space-m);
    overflow: hidden;
  }
`;

const App = () => (
  <>
    <div className="dropdown-hoist">
      <WaDropdown>
        <WaButton slot="trigger" caret>
          No Hoist
        </WaButton>
        <WaMenu>
          <WaMenuItem>Item 1</WaMenuItem>
          <WaMenuItem>Item 2</WaMenuItem>
          <WaMenuItem>Item 3</WaMenuItem>
        </WaMenu>
      </WaDropdown>

      <WaDropdown hoist>
        <WaButton slot="trigger" caret>
          Hoist
        </WaButton>
        <WaMenu>
          <WaMenuItem>Item 1</WaMenuItem>
          <WaMenuItem>Item 2</WaMenuItem>
          <WaMenuItem>Item 3</WaMenuItem>
        </WaMenu>
      </WaDropdown>
    </div>

    <style>{css}</style>
  </>
);
```
