---
meta:
  title: Split Panel
  description: Split panels display two adjacent panels, allowing the user to reposition them.
layout: component
---

```html:preview
<wa-split-panel>
  <div
    slot="start"
    style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
  >
    Start
  </div>
  <div
    slot="end"
    style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
  >
    End
  </div>
</wa-split-panel>
```

{% raw %}

```jsx:react
import WaSplitPanel from '@shoelace-style/shoelace/dist/react/split-panel';

const App = () => (
  <WaSplitPanel>
    <div
      slot="start"
      style={{
        height: '200px',
        background: 'var(--wa-color-surface-lowered)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      Start
    </div>
    <div
      slot="end"
      style={{
        height: '200px',
        background: 'var(--wa-color-surface-lowered)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      End
    </div>
  </WaSplitPanel>
);
```

{% endraw %}

## Examples

### Initial Position

To set the initial position, use the `position` attribute. If no position is provided, it will default to 50% of the available space.

```html:preview
<wa-split-panel position="75">
  <div
    slot="start"
    style="
      height: 200px;
      background: var(--wa-color-surface-lowered);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    "
  >
    Start
  </div>
  <div
    slot="end"
    style="
      height: 200px;
      background: var(--wa-color-surface-lowered);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    "
  >
    End
  </div>
</wa-split-panel>
```

### Initial Position in Pixels

To set the initial position in pixels instead of a percentage, use the `position-in-pixels` attribute.

```html:preview
<wa-split-panel position-in-pixels="150">
  <div
    slot="start"
    style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
  >
    Start
  </div>
  <div
    slot="end"
    style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
  >
    End
  </div>
</wa-split-panel>
```

{% raw %}

```jsx:react
import WaSplitPanel from '@shoelace-style/shoelace/dist/react/split-panel';

const App = () => (
  <WaSplitPanel position="200">
    <div
      slot="start"
      style={{
        height: '200px',
        background: 'var(--wa-color-surface-lowered)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      Start
    </div>
    <div
      slot="end"
      style={{
        height: '200px',
        background: 'var(--wa-color-surface-lowered)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      End
    </div>
  </WaSplitPanel>
);
```

{% endraw %}

### Vertical

Add the `vertical` attribute to render the split panel in a vertical orientation where the start and end panels are stacked. You also need to set a height when using the vertical orientation.

```html:preview
<wa-split-panel vertical style="height: 400px;">
  <div
    slot="start"
    style="height: 100%; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
  >
    Start
  </div>
  <div
    slot="end"
    style="height: 100%; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
  >
    End
  </div>
</wa-split-panel>
```

{% raw %}

```jsx:react
import WaSplitPanel from '@shoelace-style/shoelace/dist/react/split-panel';

const App = () => (
  <WaSplitPanel vertical style={{ height: '400px' }}>
    <div
      slot="start"
      style={{
        height: '100%',
        background: 'var(--wa-color-surface-lowered)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      Start
    </div>
    <div
      slot="end"
      style={{
        height: '100%',
        background: 'var(--wa-color-surface-lowered)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      End
    </div>
  </WaSplitPanel>
);
```

{% endraw %}

### Snapping

To snap panels at specific positions while dragging, add the `snap` attribute with one or more space-separated values. Values must be in pixels or percentages. For example, to snap the panel at `100px` and `50%`, use `snap="100px 50%"`. You can also customize how close the divider must be before snapping with the `snap-threshold` attribute.

```html:preview
<div class="split-panel-snapping">
  <wa-split-panel snap="100px 50%">
    <div
      slot="start"
      style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
    >
      Start
    </div>
    <div
      slot="end"
      style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
    >
      End
    </div>
  </wa-split-panel>

  <div class="split-panel-snapping-dots"></div>
</div>

<style>
  .split-panel-snapping {
    position: relative;
  }

  .split-panel-snapping-dots::before,
  .split-panel-snapping-dots::after {
    content: '';
    position: absolute;
    bottom: -12px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--wa-color-neutral-spot);
    transform: translateX(-3px);
  }

  .split-panel-snapping-dots::before {
    left: 100px;
  }

  .split-panel-snapping-dots::after {
    left: 50%;
  }
</style>
```

{% raw %}

```jsx:react
import WaSplitPanel from '@shoelace-style/shoelace/dist/react/split-panel';

const css = `
  .split-panel-snapping {
    position: relative;
  }

  .split-panel-snapping-dots::before,
  .split-panel-snapping-dots::after {
    content: '';
    position: absolute;
    bottom: -12px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--wa-color-neutral-spot);
    transform: translateX(-3px);
  }

  .split-panel-snapping-dots::before {
    left: 100px;
  }

  .split-panel-snapping-dots::after {
    left: 50%;
  }
`;

const App = () => (
  <>
    <div className="split-panel-snapping">
      <WaSplitPanel snap="100px 50%">
        <div
          slot="start"
          style={{
            height: '200px',
            background: 'var(--wa-color-surface-lowered)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          Start
        </div>
        <div
          slot="end"
          style={{
            height: '200px',
            background: 'var(--wa-color-surface-lowered)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          End
        </div>
      </WaSplitPanel>

      <div className="split-panel-snapping-dots" />
    </div>

    <style>{css}</style>
  </>
);
```

{% endraw %}

### Disabled

Add the `disabled` attribute to prevent the divider from being repositioned.

```html:preview
<wa-split-panel disabled>
  <div
    slot="start"
    style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
  >
    Start
  </div>
  <div
    slot="end"
    style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
  >
    End
  </div>
</wa-split-panel>
```

{% raw %}

```jsx:react
import WaSplitPanel from '@shoelace-style/shoelace/dist/react/split-panel';

const App = () => (
  <WaSplitPanel disabled>
    <div
      slot="start"
      style={{
        height: '200px',
        background: 'var(--wa-color-surface-lowered)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      Start
    </div>
    <div
      slot="end"
      style={{
        height: '200px',
        background: 'var(--wa-color-surface-lowered)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      End
    </div>
  </WaSplitPanel>
);
```

{% endraw %}

### Setting the Primary Panel

By default, both panels will grow or shrink proportionally when the host element is resized. If a primary panel is designated, it will maintain its size and the secondary panel will grow or shrink to fit the remaining space. You can set the primary panel to `start` or `end` using the `primary` attribute.

Try resizing the example below with each option and notice how the panels respond.

```html:preview
<div class="split-panel-primary">
  <wa-split-panel>
    <div
      slot="start"
      style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
    >
      Start
    </div>
    <div
      slot="end"
      style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
    >
      End
    </div>
  </wa-split-panel>

  <wa-select label="Primary Panel" value="" style="max-width: 200px; margin-top: 1rem;">
    <wa-option value="">None</wa-option>
    <wa-option value="start">Start</wa-option>
    <wa-option value="end">End</wa-option>
  </wa-select>
</div>

<script>
  const container = document.querySelector('.split-panel-primary');
  const splitPanel = container.querySelector('wa-split-panel');
  const select = container.querySelector('wa-select');

  select.addEventListener('wa-change', () => (splitPanel.primary = select.value));
</script>
```

{% raw %}

```jsx:react
import { useState } from 'react';
import WaSplitPanel from '@shoelace-style/shoelace/dist/react/split-panel';
import WaSelect from '@shoelace-style/shoelace/dist/react/select';
import WaMenuItem from '@shoelace-style/shoelace/dist/react/menu-item';

const App = () => {
  const [primary, setPrimary] = useState('');

  return (
    <>
      <WaSplitPanel primary={primary}>
        <div
          slot="start"
          style={{
            height: '200px',
            background: 'var(--wa-color-surface-lowered)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          Start
        </div>
        <div
          slot="end"
          style={{
            height: '200px',
            background: 'var(--wa-color-surface-lowered)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          End
        </div>
      </WaSplitPanel>

      <WaSelect
        label="Primary Panel"
        value={primary}
        style={{ maxWidth: '200px', marginTop: '1rem' }}
        onWaChange={event => setPrimary(event.target.value)}
      >
        <WaMenuItem value="">None</WaMenuItem>
        <WaMenuItem value="start">Start</WaMenuItem>
        <WaMenuItem value="end">End</WaMenuItem>
      </WaSelect>
    </>
  );
};
```

{% endraw %}

### Min & Max

To set a minimum or maximum size of the primary panel, use the `--min` and `--max` custom properties. Since the secondary panel is flexible, size constraints can only be applied to the primary panel. If no primary panel is designated, these constraints will be applied to the `start` panel.

This examples demonstrates how you can ensure both panels are at least 150px using `--min`, `--max`, and the `calc()` function.

```html:preview
<wa-split-panel style="--min: 150px; --max: calc(100% - 150px);">
  <div
    slot="start"
    style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
  >
    Start
  </div>
  <div
    slot="end"
    style="height: 200px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden;"
  >
    End
  </div>
</wa-split-panel>
```

{% raw %}

```jsx:react
import WaSplitPanel from '@shoelace-style/shoelace/dist/react/split-panel';

const App = () => (
  <WaSplitPanel style={{ '--min': '150px', '--max': 'calc(100% - 150px)' }}>
    <div
      slot="start"
      style={{
        height: '200px',
        background: 'var(--wa-color-surface-lowered)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      Start
    </div>
    <div
      slot="end"
      style={{
        height: '200px',
        background: 'var(--wa-color-surface-lowered)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      End
    </div>
  </WaSplitPanel>
);
```

{% endraw %}

### Nested Split Panels

Create complex layouts that can be repositioned independently by nesting split panels.

```html:preview
<wa-split-panel>
  <div
    slot="start"
    style="height: 400px; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden"
  >
    Start
  </div>
  <div slot="end">
    <wa-split-panel vertical style="height: 400px;">
      <div
        slot="start"
        style="height: 100%; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden"
      >
        Top
      </div>
      <div
        slot="end"
        style="height: 100%; background: var(--wa-color-surface-lowered); display: flex; align-items: center; justify-content: center; overflow: hidden"
      >
        Bottom
      </div>
    </wa-split-panel>
  </div>
</wa-split-panel>
```

{% raw %}

```jsx:react
import WaSplitPanel from '@shoelace-style/shoelace/dist/react/split-panel';

const App = () => (
  <WaSplitPanel>
    <div
      slot="start"
      style={{
        height: '400px',
        background: 'var(--wa-color-surface-lowered)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      Start
    </div>
    <div slot="end">
      <WaSplitPanel vertical style={{ height: '400px' }}>
        <div
          slot="start"
          style={{
            height: '100%',
            background: 'var(--wa-color-surface-lowered)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          Start
        </div>
        <div
          slot="end"
          style={{
            height: '100%',
            background: 'var(--wa-color-surface-lowered)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          End
        </div>
      </WaSplitPanel>
    </div>
  </WaSplitPanel>
);
```

{% endraw %}

### Customizing the Divider

You can target the `divider` part to apply CSS properties to the divider. To add a custom handle, slot an icon into the `divider` slot. When customizing the divider, make sure to think about focus styles for keyboard users.

```html:preview
<wa-split-panel style="--divider-width: 20px;">
  <wa-icon slot="divider" name="grip-vertical"></wa-icon>
  <div
    slot="start"
    style="
      height: 200px;
      background: var(--wa-color-surface-lowered);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    "
  >
    Start
  </div>
  <div
    slot="end"
    style="
      height: 200px;
      background: var(--wa-color-surface-lowered);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    "
  >
    End
  </div>
</wa-split-panel>
```

{% raw %}

```jsx:react
import WaSplitPanel from '@shoelace-style/shoelace/dist/react/split-panel';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';

const App = () => (
  <WaSplitPanel style={{ '--divider-width': '20px' }}>
    <WaIcon slot="divider" name="grip-vertical" />
    <div
      slot="start"
      style={{
        height: '200px',
        background: 'var(--wa-color-surface-lowered)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      Start
    </div>
    <div
      slot="end"
      style={{
        height: '200px',
        background: 'var(--wa-color-surface-lowered)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      End
    </div>
  </WaSplitPanel>
);
```

{% endraw %}

Here's a more elaborate example that changes the divider's color and width and adds a styled handle.

```html:preview
<div class="split-panel-divider">
  <wa-split-panel>
    <wa-icon slot="divider" name="grip-vertical"></wa-icon>
    <div
      slot="start"
      style="
        height: 200px;
        background: var(--wa-color-surface-lowered);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      "
    >
      Start
    </div>
    <div
      slot="end"
      style="
        height: 200px;
        background: var(--wa-color-surface-lowered);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      "
    >
      End
    </div>
  </wa-split-panel>
</div>

<style>
  .split-panel-divider wa-split-panel {
    --divider-width: 2px;
  }

  .split-panel-divider wa-split-panel::part(divider) {
    background-color: var(--wa-color-red-50);
  }

  .split-panel-divider wa-icon {
    position: absolute;
    border-radius: var(--wa-corners-l);
    background: var(--wa-color-red-50);
    color: white;
    padding: 0.5rem 0.125rem;
  }

  .split-panel-divider wa-split-panel::part(divider):focus-visible {
    background-color: var(--wa-color-blue-50);
  }

  .split-panel-divider wa-split-panel:focus-within wa-icon {
    background-color: var(--wa-color-blue-50);
    color: white;
  }
</style>
```

{% raw %}

```jsx:react
import WaSplitPanel from '@shoelace-style/shoelace/dist/react/split-panel';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';

const css = `
  .split-panel-divider wa-split-panel {
    --divider-width: 2px;
  }

  .split-panel-divider wa-split-panel::part(divider) {
    background-color: var(--wa-color-red-50);
  }

  .split-panel-divider wa-icon {
    position: absolute;
    border-radius: var(--wa-corners-xs);
    background: var(--wa-color-red-50);
    color: white;
    padding: .5rem .125rem;
  }

  .split-panel-divider wa-split-panel::part(divider):focus-visible {
    background-color: var(--wa-color-blue-50);
  }

  .split-panel-divider wa-split-panel:focus-within wa-icon {
    background-color: var(--wa-color-blue-50);
    color: white;
  }
`;

const App = () => (
  <>
    <div className="split-panel-divider">
      <WaSplitPanel>
        <WaIcon slot="divider" name="grip-vertical" />
        <div
          slot="start"
          style={{
            height: '200px',
            background: 'var(--wa-color-surface-lowered)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          Start
        </div>
        <div
          slot="end"
          style={{
            height: '200px',
            background: 'var(--wa-color-surface-lowered)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          End
        </div>
      </WaSplitPanel>
    </div>

    <style>{css}</style>
  </>
);
```

{% endraw %}
