---
title: Progress Bar
layout: component
category: Feedback
synonyms:
  - loading bar
  - progress indicator
  - status bar
use-cases:
  - upload progress
  - download progress
  - step progress
---

```html {.example}
<wa-progress-bar value="40"></wa-progress-bar>
```

## Examples

### Labels

Use the `label` attribute to tell assistive devices how to announce the progress bar.

```html {.example}
<wa-progress-bar value="50" label="Upload progress"></wa-progress-bar>
```

### Indeterminate

Add the `indeterminate` attribute when an operation is pending but its progress can't be measured. In this state, `value` is ignored and the label, if present, isn't shown.

```html {.example}
<wa-progress-bar indeterminate></wa-progress-bar>
```

### Customizing

Set `--track-height` to change the bar's thickness and `--track-color` / `--indicator-color` to recolor it.

```html {.example}
<wa-progress-bar
  value="60"
  style="
    --track-height: 1.5rem;
    --track-color: var(--wa-color-neutral-fill-quiet);
    --indicator-color: var(--wa-color-success-fill-loud);
  "
></wa-progress-bar>
```

### Showing Values

Use the default slot to show a value inside the bar.

```html {.example}
<div class="wa-stack">
  <wa-progress-bar value="50" id="progress-bar-demo">50%</wa-progress-bar>

  <wa-divider></wa-divider>

  <div class="wa-cluster">
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
