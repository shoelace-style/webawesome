---
title: Progress Ring
layout: component
category: Feedback
synonyms:
  - circular progress
  - donut chart
  - radial progress
use-cases:
  - loading spinner
  - circular loader
  - completion ring
---

```html {.example}
<wa-progress-ring value="25" label="Sync progress"></wa-progress-ring>
```

## Examples

### Labels

Use the `label` attribute to tell assistive devices how to announce the progress ring.

```html {.example}
<wa-progress-ring value="25" label="Sync progress"></wa-progress-ring>
```

### Sizing

Use the `--size` custom property to set the diameter of the ring.

```html {.example}
<wa-progress-ring value="50" style="--size: 200px;"></wa-progress-ring>
```

### Track & Indicator Width

Use `--track-width` and `--indicator-width` to set the width of the ring's track and indicator independently.

```html {.example}
<wa-progress-ring value="50" style="--track-width: 6px; --indicator-width: 12px;"></wa-progress-ring>
```

### Colors

Use `--track-color` and `--indicator-color` to recolor the ring.

```html {.example}
<wa-progress-ring
  value="50"
  style="
    --track-color: pink;
    --indicator-color: deeppink;
  "
></wa-progress-ring>
```

### Showing Values

Use the default slot to show a value inside the ring.

```html {.example}
<div class="progress-ring-overview">
  <wa-progress-ring value="50" class="progress-ring-values">50%</wa-progress-ring>

  <wa-divider></wa-divider>

  <div class="wa-cluster">
    <wa-button appearance="filled" circle><wa-icon name="minus" variant="solid" label="Decrease"></wa-icon></wa-button>
    <wa-button appearance="filled" circle><wa-icon name="plus" variant="solid" label="Increase"></wa-icon></wa-button>
  </div>
</div>

<script>
  const progressRing = document.querySelector('.progress-ring-values');
  const subtractButton = document.querySelector('.progress-ring-overview wa-button:has(wa-icon[name="minus"])');
  const addButton = document.querySelector('.progress-ring-overview wa-button:has(wa-icon[name="plus"])');

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
