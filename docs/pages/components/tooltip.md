---
meta:
  title: Tooltip
  description: Tooltips display additional information based on a specific action.
layout: component
---

A tooltip's target is its _first child element_, so you should only wrap one element inside of the tooltip. If you need the tooltip to show up for multiple elements, nest them inside a container first.

Tooltips use `display: contents` so they won't interfere with how elements are positioned in a flex or grid layout.

```html:preview
<wa-tooltip content="This is a tooltip">
  <wa-button>Hover Me</wa-button>
</wa-tooltip>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaTooltip from '@shoelace-style/shoelace/dist/react/tooltip';

const App = () => (
  <WaTooltip content="This is a tooltip">
    <WaButton>Hover Me</WaButton>
  </WaTooltip>
);
```

## Examples

### Placement

Use the `placement` attribute to set the preferred placement of the tooltip.

```html:preview
<div class="tooltip-placement-example">
  <div class="tooltip-placement-example-row">
    <wa-tooltip content="top-start" placement="top-start">
      <wa-button></wa-button>
    </wa-tooltip>

    <wa-tooltip content="top" placement="top">
      <wa-button></wa-button>
    </wa-tooltip>

    <wa-tooltip content="top-end" placement="top-end">
      <wa-button></wa-button>
    </wa-tooltip>
  </div>

  <div class="tooltip-placement-example-row">
    <wa-tooltip content="left-start" placement="left-start">
      <wa-button></wa-button>
    </wa-tooltip>

    <wa-tooltip content="right-start" placement="right-start">
      <wa-button></wa-button>
    </wa-tooltip>
  </div>

  <div class="tooltip-placement-example-row">
    <wa-tooltip content="left" placement="left">
      <wa-button></wa-button>
    </wa-tooltip>

    <wa-tooltip content="right" placement="right">
      <wa-button></wa-button>
    </wa-tooltip>
  </div>

  <div class="tooltip-placement-example-row">
    <wa-tooltip content="left-end" placement="left-end">
      <wa-button></wa-button>
    </wa-tooltip>

    <wa-tooltip content="right-end" placement="right-end">
      <wa-button></wa-button>
    </wa-tooltip>
  </div>

  <div class="tooltip-placement-example-row">
    <wa-tooltip content="bottom-start" placement="bottom-start">
      <wa-button></wa-button>
    </wa-tooltip>

    <wa-tooltip content="bottom" placement="bottom">
      <wa-button></wa-button>
    </wa-tooltip>

    <wa-tooltip content="bottom-end" placement="bottom-end">
      <wa-button></wa-button>
    </wa-tooltip>
  </div>
</div>

<style>
  .tooltip-placement-example {
    width: 250px;
    margin: 1rem;
  }

  .tooltip-placement-example-row:after {
    content: '';
    display: table;
    clear: both;
  }

  .tooltip-placement-example wa-button {
    float: left;
    width: 2.5rem;
    margin-right: 0.25rem;
    margin-bottom: 0.25rem;
  }

  .tooltip-placement-example-row:nth-child(1) wa-tooltip:first-child wa-button,
  .tooltip-placement-example-row:nth-child(5) wa-tooltip:first-child wa-button {
    margin-left: calc(40px + 0.25rem);
  }

  .tooltip-placement-example-row:nth-child(2) wa-tooltip:nth-child(2) wa-button,
  .tooltip-placement-example-row:nth-child(3) wa-tooltip:nth-child(2) wa-button,
  .tooltip-placement-example-row:nth-child(4) wa-tooltip:nth-child(2) wa-button {
    margin-left: calc((40px * 3) + (0.25rem * 3));
  }
</style>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaTooltip from '@shoelace-style/shoelace/dist/react/tooltip';

const css = `
  .tooltip-placement-example {
    width: 250px;
  }

  .tooltip-placement-example-row:after {
    content: '';
    display: table;
    clear: both;
  }

  .tooltip-placement-example wa-button {
    float: left;
    width: 2.5rem;
    margin-right: 0.25rem;
    margin-bottom: 0.25rem;
  }

  .tooltip-placement-example-row:nth-child(1) wa-tooltip:first-child wa-button,
  .tooltip-placement-example-row:nth-child(5) wa-tooltip:first-child wa-button {
    margin-left: calc(40px + 0.25rem);
  }

  .tooltip-placement-example-row:nth-child(2) wa-tooltip:nth-child(2) wa-button,
  .tooltip-placement-example-row:nth-child(3) wa-tooltip:nth-child(2) wa-button,
  .tooltip-placement-example-row:nth-child(4) wa-tooltip:nth-child(2) wa-button {
    margin-left: calc((40px * 3) + (0.25rem * 3));
  }
`;

const App = () => (
  <>
    <div className="tooltip-placement-example">
      <div className="tooltip-placement-example-row">
        <WaTooltip content="top-start" placement="top-start">
          <WaButton />
        </WaTooltip>

        <WaTooltip content="top" placement="top">
          <WaButton />
        </WaTooltip>

        <WaTooltip content="top-end" placement="top-end">
          <WaButton />
        </WaTooltip>
      </div>

      <div className="tooltip-placement-example-row">
        <WaTooltip content="left-start" placement="left-start">
          <WaButton />
        </WaTooltip>

        <WaTooltip content="right-start" placement="right-start">
          <WaButton />
        </WaTooltip>
      </div>

      <div className="tooltip-placement-example-row">
        <WaTooltip content="left" placement="left">
          <WaButton />
        </WaTooltip>

        <WaTooltip content="right" placement="right">
          <WaButton />
        </WaTooltip>
      </div>

      <div className="tooltip-placement-example-row">
        <WaTooltip content="left-end" placement="left-end">
          <WaButton />
        </WaTooltip>

        <WaTooltip content="right-end" placement="right-end">
          <WaButton />
        </WaTooltip>
      </div>

      <div className="tooltip-placement-example-row">
        <WaTooltip content="bottom-start" placement="bottom-start">
          <WaButton />
        </WaTooltip>

        <WaTooltip content="bottom" placement="bottom">
          <WaButton />
        </WaTooltip>

        <WaTooltip content="bottom-end" placement="bottom-end">
          <WaButton />
        </WaTooltip>
      </div>
    </div>

    <style>{css}</style>
  </>
);
```

### Click Trigger

Set the `trigger` attribute to `click` to toggle the tooltip on click instead of hover.

```html:preview
<wa-tooltip content="Click again to dismiss" trigger="click">
  <wa-button>Click to Toggle</wa-button>
</wa-tooltip>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaTooltip from '@shoelace-style/shoelace/dist/react/tooltip';

const App = () => (
  <WaTooltip content="Click again to dismiss" trigger="click">
    <WaButton>Click to Toggle</WaButton>
  </WaTooltip>
);
```

### Manual Trigger

Tooltips can be controller programmatically by setting the `trigger` attribute to `manual`. Use the `open` attribute to control when the tooltip is shown.

```html:preview
<wa-button style="margin-right: 4rem;">Toggle Manually</wa-button>

<wa-tooltip content="This is an avatar" trigger="manual" class="manual-tooltip">
  <wa-avatar label="User"></wa-avatar>
</wa-tooltip>

<script>
  const tooltip = document.querySelector('.manual-tooltip');
  const toggle = tooltip.previousElementSibling;

  toggle.addEventListener('click', () => (tooltip.open = !tooltip.open));
</script>
```

{% raw %}

```jsx:react
import { useState } from 'react';
import WaAvatar from '@shoelace-style/shoelace/dist/react/avatar';
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaTooltip from '@shoelace-style/shoelace/dist/react/tooltip';

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <WaButton style={{ marginRight: '4rem' }} onClick={() => setOpen(!open)}>
        Toggle Manually
      </WaButton>

      <WaTooltip open={open} content="This is an avatar" trigger="manual">
        <WaAvatar />
      </WaTooltip>
    </>
  );
};
```

{% endraw %}

### Removing Arrows

You can control the size of tooltip arrows by overriding the `--wa-tooltip-arrow-size` design token. To remove them, set the value to `0` as shown below.

```html:preview
<wa-tooltip content="This is a tooltip" style="--wa-tooltip-arrow-size: 0;">
  <wa-button>No Arrow</wa-button>
</wa-tooltip>
```

{% raw %}

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaTooltip from '@shoelace-style/shoelace/dist/react/tooltip';

const App = () => (
  <div style={{ '--wa-tooltip-arrow-size': '0' }}>
    <WaTooltip content="This is a tooltip">
      <WaButton>Above</WaButton>
    </WaTooltip>

    <WaTooltip content="This is a tooltip" placement="bottom">
      <WaButton>Below</WaButton>
    </WaTooltip>
  </div>
);
```

{% endraw %}

To override it globally, set it in a root block in your stylesheet after the Web Awesome stylesheet is loaded.

```css
:root {
  --wa-tooltip-arrow-size: 0;
}
```

### HTML in Tooltips

Use the `content` slot to create tooltips with HTML content. Tooltips are designed only for text and presentational elements. Avoid placing interactive content, such as buttons, links, and form controls, in a tooltip.

```html:preview
<wa-tooltip>
  <div slot="content">I'm not <strong>just</strong> a tooltip, I'm a <em>tooltip</em> with HTML!</div>

  <wa-button>Hover me</wa-button>
</wa-tooltip>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaTooltip from '@shoelace-style/shoelace/dist/react/tooltip';

const App = () => (
  <WaTooltip>
    <div slot="content">
      I'm not <strong>just</strong> a tooltip, I'm a <em>tooltip</em> with HTML!
    </div>

    <WaButton>Hover Me</WaButton>
  </WaTooltip>
);
```

### Setting a Maximum Width

Use the `--max-width` custom property to change the width the tooltip can grow to before wrapping occurs.

```html:preview
<wa-tooltip style="--max-width: 80px;" content="This tooltip will wrap after only 80 pixels.">
  <wa-button>Hover me</wa-button>
</wa-tooltip>
```

{% raw %}

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaTooltip from '@shoelace-style/shoelace/dist/react/tooltip';

const App = () => (
  <WaTooltip style={{ '--max-width': '80px' }} content="This tooltip will wrap after only 80 pixels.">
    <WaButton>Hover Me</WaButton>
  </WaTooltip>
);
```

{% endraw %}

### Hoisting

Tooltips will be clipped if they're inside a container that has `overflow: auto|hidden|scroll`. The `hoist` attribute forces the tooltip to use a fixed positioning strategy, allowing it to break out of the container. In this case, the tooltip will be positioned relative to its [containing block](https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#Identifying_the_containing_block), which is usually the viewport unless an ancestor uses a `transform`, `perspective`, or `filter`. [Refer to this page](https://developer.mozilla.org/en-US/docs/Web/CSS/position#fixed) for more details.

```html:preview
<div class="tooltip-hoist">
  <wa-tooltip content="This is a tooltip">
    <wa-button>No Hoist</wa-button>
  </wa-tooltip>

  <wa-tooltip content="This is a tooltip" hoist>
    <wa-button>Hoist</wa-button>
  </wa-tooltip>
</div>

<style>
  .tooltip-hoist {
    position: relative;
    border: solid 2px var(--wa-color-surface-outline);
    overflow: hidden;
    padding: var(--wa-space-m);
  }
</style>
```

```jsx:react
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaTooltip from '@shoelace-style/shoelace/dist/react/tooltip';

const css = `
  .tooltip-hoist {
    border: solid 2px var(--wa-color-surface-outline);
    overflow: hidden;
    padding: var(--wa-space-m);
    position: relative;
  }
`;

const App = () => (
  <>
    <div class="tooltip-hoist">
      <WaTooltip content="This is a tooltip">
        <WaButton>No Hoist</WaButton>
      </WaTooltip>

      <WaTooltip content="This is a tooltip" hoist>
        <WaButton>Hoist</WaButton>
      </WaTooltip>
    </div>

    <style>{css}</style>
  </>
);
```
