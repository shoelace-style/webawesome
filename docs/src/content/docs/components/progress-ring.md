---
title: Progress Ring
description: Progress rings are used to show the progress of a determinate operation in a circular fashion.
layout: ../../../layouts/ComponentLayout.astro
---

```html:preview
<wa-progress-ring value="25"></wa-progress-ring>
```

```jsx:react
import WaProgressRing from '@shoelace-style/shoelace/dist/react/progress-ring';

const App = () => <WaProgressRing value="25" />;
```

## Examples

### Size

Use the `--size` custom property to set the diameter of the progress ring.

```html:preview
<wa-progress-ring value="50" style="--size: 200px;"></wa-progress-ring>
```

```jsx:react
import WaProgressRing from '@shoelace-style/shoelace/dist/react/progress-ring';

const App = () => <WaProgressRing value="50" style={{ '--size': '200px' }} />;
```

### Track and Indicator Width

Use the `--track-width` and `--indicator-width` custom properties to set the width of the progress ring's track and indicator.

```html:preview
<wa-progress-ring value="50" style="--track-width: 6px; --indicator-width: 12px;"></wa-progress-ring>
```

```jsx:react
import WaProgressRing from '@shoelace-style/shoelace/dist/react/progress-ring';

const App = () => <WaProgressRing value="50" style={{ '--track-width': '6px', '--indicator-width': '12px' }} />;
```

### Colors

To change the color, use the `--track-color` and `--indicator-color` custom properties.

```html:preview
<wa-progress-ring
  value="50"
  style="
    --track-color: pink;
    --indicator-color: deeppink;
  "
></wa-progress-ring>
```

```jsx:react
import WaProgressRing from '@shoelace-style/shoelace/dist/react/progress-ring';

const App = () => (
  <WaProgressRing
    value="50"
    style={{
      '--track-color': 'pink',
      '--indicator-color': 'deeppink'
    }}
  />
);
```

### Labels

Use the `label` attribute to label the progress ring and tell assistive devices how to announce it.

```html:preview
<wa-progress-ring value="50" label="Upload progress"></wa-progress-ring>
```

```jsx:react
import WaProgressRing from '@shoelace-style/shoelace/dist/react/progress-ring';

const App = () => <WaProgressRing value="50" label="Upload progress" />;
```

### Showing Values

Use the default slot to show a label inside the progress ring.

```html:preview
<wa-progress-ring value="50" class="progress-ring-values" style="margin-bottom: .5rem;">50%</wa-progress-ring>

<br />

<wa-button circle><wa-icon name="minus" variant="solid" label="Decrease"></wa-icon></wa-button>
<wa-button circle><wa-icon name="plus" variant="solid" label="Increase"></wa-icon></wa-button>

<script>
  const progressRing = document.querySelector('.progress-ring-values');
  const subtractButton = progressRing.nextElementSibling.nextElementSibling;
  const addButton = subtractButton.nextElementSibling;

  addButton.addEventListener('click', () => {
    const value = Math.min(100, progressRing.value + 10);
    progressRing.value = value;
    progressRing.textContent = `${value}%`;
  });

  subtractButton.addEventListener('click', () => {
    const value = Math.max(0, progressRing.value - 10);
    progressRing.value = value;
    progressRing.textContent = `${value}%`;
  });
</script>
```

```jsx:react
import { useState } from 'react';
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';
import WaProgressRing from '@shoelace-style/shoelace/dist/react/progress-ring';

const App = () => {
  const [value, setValue] = useState(50);

  function adjustValue(amount) {
    let newValue = value + amount;
    if (newValue < 0) newValue = 0;
    if (newValue > 100) newValue = 100;
    setValue(newValue);
  }

  return (
    <>
      <WaProgressRing value={value} style={{ marginBottom: '.5rem' }}>
        {value}%
      </WaProgressRing>

      <br />

      <WaButton circle onClick={() => adjustValue(-10)}>
        <WaIcon name="minus" variant="solid" label="Decrease" />
      </WaButton>

      <WaButton circle onClick={() => adjustValue(10)}>
        <WaIcon name="plus" variant="solid" label="Increase" />
      </WaButton>
    </>
  );
};
```
