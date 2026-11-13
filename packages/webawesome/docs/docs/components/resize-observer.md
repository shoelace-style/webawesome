---
title: Resize Observer
layout: component
category: Helpers
synonyms:
  - size watcher
  - resize listener
  - dimension observer
use-cases:
  - responsive component
  - size tracking
  - container query
---

```html {.example}
<div class="resize-observer-overview">
  <wa-resize-observer>
    <div class="box"><span class="dimensions">0 × 0</span></div>
  </wa-resize-observer>
  <small>Drag the box's bottom-right corner to resize it.</small>
</div>

<script>
  const container = document.querySelector('.resize-observer-overview');
  const dimensions = container.querySelector('.dimensions');
  const resizeObserver = container.querySelector('wa-resize-observer');

  resizeObserver.addEventListener('wa-resize', event => {
    const { width, height } = event.detail.entries[0].contentRect;
    dimensions.textContent = `${Math.round(width)} × ${Math.round(height)}`;
  });
</script>

<style>
  .resize-observer-overview .box {
    display: flex;
    resize: both;
    overflow: auto;
    width: 20rem;
    height: 8rem;
    min-width: 8rem;
    min-height: 5rem;
    align-items: center;
    justify-content: center;
    border: dashed 2px var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    font-size: 1.25rem;
    font-variant-numeric: tabular-nums;
  }

  .resize-observer-overview small {
    display: block;
    margin-block-start: var(--wa-space-s);
  }
</style>
```

The resize observer will report changes to the dimensions of the elements it wraps through the `wa-resize` event. When emitted, `event.detail.entries` holds a collection of [`ResizeObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry) objects describing the observed elements and their new dimensions.
