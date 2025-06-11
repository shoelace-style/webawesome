---
title: Progress Ring
description: Progress rings are used to show the progress of a determinate operation in a circular fashion.
layout: component
category: Feedback & Status
---

```html {.example}
<wa-progress-ring value="25"></wa-progress-ring>
```

## Examples

### Size

Use the `--size` custom property to set the diameter of the progress ring.

```html {.example}
<wa-progress-ring value="50" style="--size: 200px;"></wa-progress-ring>
```

### Track and Indicator Width

Use the `--track-width` and `--indicator-width` custom properties to set the width of the progress ring's track and indicator.

```html {.example}
<wa-progress-ring value="50" style="--track-width: 6px; --indicator-width: 12px;"></wa-progress-ring>
```

### Colors

To change the color, use the `--track-color` and `--indicator-color` custom properties.

```html {.example}
<wa-progress-ring
  value="50"
  style="
    --track-color: pink;
    --indicator-color: deeppink;
  "
>
</wa-progress-ring>
```

### Labels

Use the default slot to show a label inside the progress ring.

```html {.example}
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
