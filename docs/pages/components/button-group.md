---
meta:
  title: Button Group
  description: Button groups can be used to group related buttons into sections.
layout: component
---

```html:preview
<wa-button-group label="Alignment">
  <wa-button>Left</wa-button>
  <wa-button>Center</wa-button>
  <wa-button>Right</wa-button>
</wa-button-group>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaButtonGroup from '@shoelace-style/shoelace/dist/react/button-group';

const App = () => (
  <WaButtonGroup label="Alignment">
    <WaButton>Left</WaButton>
    <WaButton>Center</WaButton>
    <WaButton>Right</WaButton>
  </WaButtonGroup>
);
```

## Examples

### Button Sizes

All button sizes are supported, but avoid mixing sizes within the same button group.

```html:preview
<wa-button-group label="Alignment">
  <wa-button size="small">Left</wa-button>
  <wa-button size="small">Center</wa-button>
  <wa-button size="small">Right</wa-button>
</wa-button-group>

<br /><br />

<wa-button-group label="Alignment">
  <wa-button size="medium">Left</wa-button>
  <wa-button size="medium">Center</wa-button>
  <wa-button size="medium">Right</wa-button>
</wa-button-group>

<br /><br />

<wa-button-group label="Alignment">
  <wa-button size="large">Left</wa-button>
  <wa-button size="large">Center</wa-button>
  <wa-button size="large">Right</wa-button>
</wa-button-group>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaButtonGroup from '@shoelace-style/shoelace/dist/react/button-group';

const App = () => (
  <>
    <WaButtonGroup label="Alignment">
      <WaButton size="small">Left</WaButton>
      <WaButton size="small">Center</WaButton>
      <WaButton size="small">Right</WaButton>
    </WaButtonGroup>

    <br />
    <br />

    <WaButtonGroup label="Alignment">
      <WaButton size="medium">Left</WaButton>
      <WaButton size="medium">Center</WaButton>
      <WaButton size="medium">Right</WaButton>
    </WaButtonGroup>

    <br />
    <br />

    <WaButtonGroup label="Alignment">
      <WaButton size="large">Left</WaButton>
      <WaButton size="large">Center</WaButton>
      <WaButton size="large">Right</WaButton>
    </WaButtonGroup>
  </>
);
```

### Theme Buttons

Theme buttons are supported through the button's `variant` attribute.

```html:preview
<wa-button-group label="Alignment">
  <wa-button variant="brand">Left</wa-button>
  <wa-button variant="brand">Center</wa-button>
  <wa-button variant="brand">Right</wa-button>
</wa-button-group>

<br /><br />

<wa-button-group label="Alignment">
  <wa-button variant="success">Left</wa-button>
  <wa-button variant="success">Center</wa-button>
  <wa-button variant="success">Right</wa-button>
</wa-button-group>

<br /><br />

<wa-button-group label="Alignment">
  <wa-button>Left</wa-button>
  <wa-button>Center</wa-button>
  <wa-button>Right</wa-button>
</wa-button-group>

<br /><br />

<wa-button-group label="Alignment">
  <wa-button variant="warning">Left</wa-button>
  <wa-button variant="warning">Center</wa-button>
  <wa-button variant="warning">Right</wa-button>
</wa-button-group>

<br /><br />

<wa-button-group label="Alignment">
  <wa-button variant="danger">Left</wa-button>
  <wa-button variant="danger">Center</wa-button>
  <wa-button variant="danger">Right</wa-button>
</wa-button-group>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaButtonGroup from '@shoelace-style/shoelace/dist/react/button-group';

const App = () => (
  <>
    <WaButtonGroup label="Alignment">
      <WaButton variant="brand">Left</WaButton>
      <WaButton variant="brand">Center</WaButton>
      <WaButton variant="brand">Right</WaButton>
    </WaButtonGroup>

    <br />
    <br />

    <WaButtonGroup label="Alignment">
      <WaButton variant="success">Left</WaButton>
      <WaButton variant="success">Center</WaButton>
      <WaButton variant="success">Right</WaButton>
    </WaButtonGroup>

    <br />
    <br />

    <WaButtonGroup label="Alignment">
      <WaButton>Left</WaButton>
      <WaButton>Center</WaButton>
      <WaButton>Right</WaButton>
    </WaButtonGroup>

    <br />
    <br />

    <WaButtonGroup label="Alignment">
      <WaButton variant="warning">Left</WaButton>
      <WaButton variant="warning">Center</WaButton>
      <WaButton variant="warning">Right</WaButton>
    </WaButtonGroup>

    <br />
    <br />

    <WaButtonGroup label="Alignment">
      <WaButton variant="danger">Left</WaButton>
      <WaButton variant="danger">Center</WaButton>
      <WaButton variant="danger">Right</WaButton>
    </WaButtonGroup>
  </>
);
```

### Pill Buttons

Pill buttons are supported through the button's `pill` attribute.

```html:preview
<wa-button-group label="Alignment">
  <wa-button size="small" pill>Left</wa-button>
  <wa-button size="small" pill>Center</wa-button>
  <wa-button size="small" pill>Right</wa-button>
</wa-button-group>

<br /><br />

<wa-button-group label="Alignment">
  <wa-button size="medium" pill>Left</wa-button>
  <wa-button size="medium" pill>Center</wa-button>
  <wa-button size="medium" pill>Right</wa-button>
</wa-button-group>

<br /><br />

<wa-button-group label="Alignment">
  <wa-button size="large" pill>Left</wa-button>
  <wa-button size="large" pill>Center</wa-button>
  <wa-button size="large" pill>Right</wa-button>
</wa-button-group>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaButtonGroup from '@shoelace-style/shoelace/dist/react/button-group';

const App = () => (
  <>
    <WaButtonGroup label="Alignment">
      <WaButton size="small" pill>
        Left
      </WaButton>
      <WaButton size="small" pill>
        Center
      </WaButton>
      <WaButton size="small" pill>
        Right
      </WaButton>
    </WaButtonGroup>

    <br />
    <br />

    <WaButtonGroup label="Alignment">
      <WaButton size="medium" pill>
        Left
      </WaButton>
      <WaButton size="medium" pill>
        Center
      </WaButton>
      <WaButton size="medium" pill>
        Right
      </WaButton>
    </WaButtonGroup>

    <br />
    <br />

    <WaButtonGroup label="Alignment">
      <WaButton size="large" pill>
        Left
      </WaButton>
      <WaButton size="large" pill>
        Center
      </WaButton>
      <WaButton size="large" pill>
        Right
      </WaButton>
    </WaButtonGroup>
  </>
);
```

### Dropdowns in Button Groups

Dropdowns can be placed inside button groups as long as the trigger is an `<wa-button>` element.

```html:preview
<wa-button-group label="Example Button Group">
  <wa-button>Button</wa-button>
  <wa-button>Button</wa-button>
  <wa-dropdown>
    <wa-button slot="trigger" caret>Dropdown</wa-button>
    <wa-menu>
      <wa-menu-item>Item 1</wa-menu-item>
      <wa-menu-item>Item 2</wa-menu-item>
      <wa-menu-item>Item 3</wa-menu-item>
    </wa-menu>
  </wa-dropdown>
</wa-button-group>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaButtonGroup from '@shoelace-style/shoelace/dist/react/button-group';
import WaDropdown from '@shoelace-style/shoelace/dist/react/dropdown';
import WaMenu from '@shoelace-style/shoelace/dist/react/menu';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => (
  <WaButtonGroup label="Example Button Group">
    <WaButton>Button</WaButton>
    <WaButton>Button</WaButton>
    <WaDropdown>
      <WaButton slot="trigger" caret>
        Dropdown
      </WaButton>
      <WaMenu>
        <WaMenuItem>Item 1</WaMenuItem>
        <WaMenuItem>Item 2</WaMenuItem>
        <WaMenuItem>Item 3</WaMenuItem>
      </WaMenu>
    </WaDropdown>
  </WaButtonGroup>
);
```

### Split Buttons

Create a split button using a button and a dropdown. Use a [visually hidden](/components/visually-hidden) label to ensure the dropdown is accessible to users with assistive devices.

```html:preview
<wa-button-group label="Example Button Group">
  <wa-button variant="brand">Save</wa-button>
  <wa-dropdown placement="bottom-end">
    <wa-button slot="trigger" variant="brand" caret>
      <wa-visually-hidden>More options</wa-visually-hidden>
    </wa-button>
    <wa-menu>
      <wa-menu-item>Save</wa-menu-item>
      <wa-menu-item>Save as&hellip;</wa-menu-item>
      <wa-menu-item>Save all</wa-menu-item>
    </wa-menu>
  </wa-dropdown>
</wa-button-group>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaButtonGroup from '@shoelace-style/shoelace/dist/react/button-group';
import WaDropdown from '@shoelace-style/shoelace/dist/react/dropdown';
import WaMenu from '@shoelace-style/shoelace/dist/react/menu';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => (
  <WaButtonGroup label="Example Button Group">
    <WaButton variant="brand">Save</WaButton>
    <WaDropdown placement="bottom-end">
      <WaButton slot="trigger" variant="brand" caret></WaButton>
      <WaMenu>
        <WaMenuItem>Save</WaMenuItem>
        <WaMenuItem>Save as&hellip;</WaMenuItem>
        <WaMenuItem>Save all</WaMenuItem>
      </WaMenu>
    </WaDropdown>
  </WaButtonGroup>
);
```

### Tooltips in Button Groups

Buttons can be wrapped in tooltips to provide more detail when the user interacts with them.

```html:preview
<wa-button-group label="Alignment">
  <wa-tooltip content="I'm on the left">
    <wa-button>Left</wa-button>
  </wa-tooltip>

  <wa-tooltip content="I'm in the middle">
    <wa-button>Center</wa-button>
  </wa-tooltip>

  <wa-tooltip content="I'm on the right">
    <wa-button>Right</wa-button>
  </wa-tooltip>
</wa-button-group>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaButtonGroup from '@shoelace-style/shoelace/dist/react/button-group';
import WaTooltip from '@shoelace-style/shoelace/dist/react/tooltip';

const App = () => (
  <>
    <WaButtonGroup label="Alignment">
      <WaTooltip content="I'm on the left">
        <WaButton>Left</WaButton>
      </WaTooltip>

      <WaTooltip content="I'm in the middle">
        <WaButton>Center</WaButton>
      </WaTooltip>

      <WaTooltip content="I'm on the right">
        <WaButton>Right</WaButton>
      </WaTooltip>
    </WaButtonGroup>
  </>
);
```

### Toolbar Example

Create interactive toolbars with button groups.

```html:preview
<div class="button-group-toolbar">
  <wa-button-group label="History">
    <wa-tooltip content="Undo">
      <wa-button><wa-icon name="arrow-counterclockwise" label="Undo"></wa-icon></wa-button>
    </wa-tooltip>
    <wa-tooltip content="Redo">
      <wa-button><wa-icon name="arrow-clockwise" label="Redo"></wa-icon></wa-button>
    </wa-tooltip>
  </wa-button-group>

  <wa-button-group label="Formatting">
    <wa-tooltip content="Bold">
      <wa-button><wa-icon name="type-bold" label="Bold"></wa-icon></wa-button>
    </wa-tooltip>
    <wa-tooltip content="Italic">
      <wa-button><wa-icon name="type-italic" label="Italic"></wa-icon></wa-button>
    </wa-tooltip>
    <wa-tooltip content="Underline">
      <wa-button><wa-icon name="type-underline" label="Underline"></wa-icon></wa-button>
    </wa-tooltip>
  </wa-button-group>

  <wa-button-group label="Alignment">
    <wa-tooltip content="Align Left">
      <wa-button><wa-icon name="justify-left" label="Align Left"></wa-icon></wa-button>
    </wa-tooltip>
    <wa-tooltip content="Align Center">
      <wa-button><wa-icon name="justify" label="Align Center"></wa-icon></wa-button>
    </wa-tooltip>
    <wa-tooltip content="Align Right">
      <wa-button><wa-icon name="justify-right" label="Align Right"></wa-icon></wa-button>
    </wa-tooltip>
  </wa-button-group>
</div>

<style>
  .button-group-toolbar wa-button-group:not(:last-of-type) {
    margin-right: var(--wa-space-xs);
  }
</style>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaButtonGroup from '@shoelace-style/shoelace/dist/react/button-group';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';
import WaTooltip from '@shoelace-style/shoelace/dist/react/tooltip';

const css = `
  .button-group-toolbar wa-button-group:not(:last-of-type) {
    margin-right: var(--wa-space-xs);
  }
`;

const App = () => (
  <>
    <div className="button-group-toolbar">
      <WaButtonGroup label="History">
        <WaTooltip content="Undo">
          <WaButton>
            <WaIcon name="arrow-counterclockwise"></WaIcon>
          </WaButton>
        </WaTooltip>
        <WaTooltip content="Redo">
          <WaButton>
            <WaIcon name="arrow-clockwise"></WaIcon>
          </WaButton>
        </WaTooltip>
      </WaButtonGroup>

      <WaButtonGroup label="Formatting">
        <WaTooltip content="Bold">
          <WaButton>
            <WaIcon name="type-bold"></WaIcon>
          </WaButton>
        </WaTooltip>
        <WaTooltip content="Italic">
          <WaButton>
            <WaIcon name="type-italic"></WaIcon>
          </WaButton>
        </WaTooltip>
        <WaTooltip content="Underline">
          <WaButton>
            <WaIcon name="type-underline"></WaIcon>
          </WaButton>
        </WaTooltip>
      </WaButtonGroup>

      <WaButtonGroup label="Alignment">
        <WaTooltip content="Align Left">
          <WaButton>
            <WaIcon name="justify-left"></WaIcon>
          </WaButton>
        </WaTooltip>
        <WaTooltip content="Align Center">
          <WaButton>
            <WaIcon name="justify"></WaIcon>
          </WaButton>
        </WaTooltip>
        <WaTooltip content="Align Right">
          <WaButton>
            <WaIcon name="justify-right"></WaIcon>
          </WaButton>
        </WaTooltip>
      </WaButtonGroup>
    </div>

    <style>{css}</style>
  </>
);
```
