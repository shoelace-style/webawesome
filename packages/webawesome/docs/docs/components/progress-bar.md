---
title: Progress Bar
description: Progress bars are used to show the status of an ongoing operation.
layout: component
category: Feedback & Status
---

```html {.example}
<wa-progress-bar value="40"></wa-progress-bar>
```

## Examples

### Labels

Use the `label` attribute to label the progress bar and tell assistive devices how to announce it.

```html {.example}
<wa-progress-bar value="50" label="Upload progress"></wa-progress-bar>
```

### Custom Height

Use the `--track-height` custom property to set the progress bar's height.

```html {.example}
<wa-progress-bar value="50" style="--track-height: 6px;"></wa-progress-bar>
```

### Showing Values

Use the default slot to show a value.

```html {.example}
<div class="wa-stack">
  <wa-progress-bar value="50" id="progress-bar-demo">50%</wa-progress-bar>

  <div>
    <wa-button pill appearance="filled">
      <wa-icon name="minus" label="Decrease"></wa-icon>
    </wa-button>
    <wa-button pill appearance="filled">
      <wa-icon name="plus" label="Increase"></wa-icon>
    </wa-button>
  </div>
</div>

<script>
  const progressBar = document.querySelector('#progress-bar-demo');
  const subtractButton = document.querySelector('wa-button:has(wa-icon[name="minus"])');
  const addButton = document.querySelector('wa-button:has(wa-icon[name="plus"])');

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

### Indeterminate

The `indeterminate` attribute can be used to inform the user that the operation is pending, but its status cannot currently be determined. In this state, `value` is ignored and the label, if present, will not be shown.

```html {.example}
<wa-progress-bar indeterminate></wa-progress-bar>
```
