---
title: Progress Bar
description: Progress bars are used to show the status of an ongoing operation.
layout: ../../../layouts/ComponentLayout.astro
---

```html:preview
<wa-progress-bar value="50"></wa-progress-bar>
```

```jsx:react
import WaProgressBar from '@shoelace-style/shoelace/dist/react/progress-bar';

const App = () => <WaProgressBar value={50} />;
```

## Examples

### Labels

Use the `label` attribute to label the progress bar and tell assistive devices how to announce it.

```html:preview
<wa-progress-bar value="50" label="Upload progress"></wa-progress-bar>
```

```jsx:react
import WaProgressBar from '@shoelace-style/shoelace/dist/react/progress-bar';

const App = () => <WaProgressBar value="50" label="Upload progress" />;
```

### Custom Height

Use the `--height` custom property to set the progress bar's height.

```html:preview
<wa-progress-bar value="50" style="--height: 6px;"></wa-progress-bar>
```

```jsx:react
import WaProgressBar from '@shoelace-style/shoelace/dist/react/progress-bar';

const App = () => <WaProgressBar value={50} style={{ '--height': '6px' }} />;
```

### Showing Values

Use the default slot to show a value.

```html:preview
<wa-progress-bar value="50" class="progress-bar-values">50%</wa-progress-bar>

<br />

<wa-button circle><wa-icon name="minus" variant="solid" label="Decrease"></wa-icon></wa-button>
<wa-button circle><wa-icon name="plus" variant="solid" label="Increase"></wa-icon></wa-button>

<script>
  const progressBar = document.querySelector('.progress-bar-values');
  const subtractButton = progressBar.nextElementSibling.nextElementSibling;
  const addButton = subtractButton.nextElementSibling;

  addButton.addEventListener('click', () => {
    const value = Math.min(100, progressBar.value + 10);
    progressBar.value = value;
    progressBar.textContent = `${value}%`;
  });

  subtractButton.addEventListener('click', () => {
    const value = Math.max(0, progressBar.value - 10);
    progressBar.value = value;
    progressBar.textContent = `${value}%`;
  });
</script>
```

```jsx:react
import { useState } from 'react';
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';
import WaProgressBar from '@shoelace-style/shoelace/dist/react/progress-bar';

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
      <WaProgressBar value={value}>{value}%</WaProgressBar>

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

### Indeterminate

The `indeterminate` attribute can be used to inform the user that the operation is pending, but its status cannot currently be determined. In this state, `value` is ignored and the label, if present, will not be shown.

```html:preview
<wa-progress-bar indeterminate></wa-progress-bar>
```

```jsx:react
import WaProgressBar from '@shoelace-style/shoelace/dist/react/progress-bar';

const App = () => <WaProgressBar indeterminate />;
```
