---
title: Intersection Observer
description: Tracks immediate child elements and fires events as they move in and out of view.
layout: component
category: Utilities
---

This component leverages the [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) to track when its direct children enter or leave a designated root element. The `wa-intersect` event fires whenever elements cross the visibility threshold.

```html {.example}
<div id="intersection__overview">
  <wa-intersection-observer threshold="1" intersect-class="visible">
    <div class="box"><wa-icon name="bulb"></wa-icon></div>
  </wa-intersection-observer>
</div>

<small>Scroll to see the element intersect at 100% visibility</small>

<style>
  /* Container styles */
  #intersection__overview {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 300px;
    border: solid 2px var(--wa-color-surface-border);
    padding: 1rem;
    overflow-y: auto;

    /* Spacers to demonstrate scrolling */
    &::before {
      content: '';
      height: 260px;
      flex-shrink: 0;
    }

    &::after {
      content: '';
      height: 260px;
      flex-shrink: 0;
    }

    /* Box styles */
    .box {
      flex-shrink: 0;
      width: 120px;
      height: 120px;
      background-color: var(--wa-color-neutral-fill-normal);
      color: var(--wa-color-neutral-10);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-inline: auto;
      transition: all 50ms cubic-bezier(0.68, -0.55, 0.265, 1.55);

      wa-icon {
        font-size: 3rem;
        stroke-width: 1px;
      }

      &.visible {
        background-color: var(--wa-color-brand-60);
        color: white;
      }
    }

    + small {
      display: block;
      text-align: center;
      margin-block-start: 1rem;
    }
  }
</style>
```

:::info
Keep in mind that only direct children of the host element are monitored. Nested elements won't trigger intersection events.
:::

## Usage Examples

### Adding Observable Content

The intersection observer tracks only its direct children. The component uses [`display: contents`](https://developer.mozilla.org/en-US/docs/Web/CSS/display#contents) styling, which makes it seamless to integrate with flex and grid layouts from a parent container.

```html
<div style="display: flex; flex-direction: column;">
  <wa-intersection-observer>
    <div class="box">Box 1</div>
    <div class="box">Box 2</div>
    <div class="box">Box 3</div>
  </wa-intersection-observer>
</div>
```

The component tracks elements as they enter and exit the root element (viewport by default) and emits the `wa-intersect` event on state changes. The event provides `event.detail.entry`, an [`IntersectionObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) object with intersection details.

You can identify the triggering element through `entry.target`. Check `entry.isIntersecting` to determine if an element is entering or exiting the viewport.

```javascript
observer.addEventListener('wa-intersect', event => {
  const entry = event.detail.entry;

  if (entry.isIntersecting) {
    console.log('Element entered viewport:', entry.target);
  } else {
    console.log('Element left viewport:', entry.target);
  }
});
```

### Setting a Custom Root Element

You can observe intersections within a specific container by assigning the `root` attribute to the [root element's](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/root) ID. Apply [`rootMargin`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin) with the `root-margin` attribute to expand or contract the observation area.

```html
<div id="scroll-container">
  <wa-intersection-observer root="scroll-container" root-margin="50px 0px"> ... </wa-intersection-observer>
</div>
```

### Configuring Multiple Thresholds

Track different visibility percentages by providing multiple [`threshold`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#threshold) values as a space-separated list.

```html
<wa-intersection-observer threshold="0 0.25 0.5 0.75 1"> ... </wa-intersection-observer>
```

### Applying Classes on Intersect

The `intersect-class` attribute automatically toggles the specified class on direct children when they become visible. This enables pure CSS styling without JavaScript event handlers.

```html {.example}
<div id="intersection__classes">
  <wa-intersection-observer threshold="0.5" intersect-class="visible" root="intersection__classes">
    <div class="box fade">Fade In</div>
    <div class="box slide">Slide In</div>
    <div class="box scale">Scale & Rotate</div>
    <div class="box bounce">Bounce</div>
  </wa-intersection-observer>
</div>

<small>Scroll to see elements transition at 50% visibility</small>

<style>
  /* Container styles */
  #intersection__classes {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 300px;
    border: solid 2px var(--wa-color-surface-border);
    padding: 1rem;
    overflow-y: auto;

    /* Spacers to demonstrate scrolling */
    &::before {
      content: '';
      height: 260px;
      flex-shrink: 0;
    }

    &::after {
      content: '';
      height: 260px;
      flex-shrink: 0;
    }

    + small {
      display: block;
      text-align: center;
      margin-block-start: 1rem;
    }

    /* Shared box styles */
    .box {
      flex-shrink: 0;
      width: 120px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: white;
      opacity: 0;
      padding: 2rem;
      margin-inline: auto;

      /* Fade */
      &.fade {
        background: var(--wa-color-brand-fill-loud);
        color: var(--wa-color-brand-on-loud);
        transform: translateY(30px);
        transition: all 0.6s ease;

        &.visible {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Slide */
      &.slide {
        background: var(--wa-color-brand-fill-loud);
        color: var(--wa-color-brand-on-loud);
        transform: translateX(-50px);
        transition: all 0.5s ease;

        &.visible {
          opacity: 1;
          transform: translateX(0);
        }
      }

      /* Scale */
      &.scale {
        background: var(--wa-color-brand-fill-loud);
        color: var(--wa-color-brand-on-loud);
        transform: scale(0.6) rotate(-15deg);
        transition: all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);

        &.visible {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
      }

      /* Bounce In and Out */
      &.bounce {
        background: var(--wa-color-brand-fill-loud);
        color: var(--wa-color-brand-on-loud);
        opacity: 0;
        transform: scale(0.8);
        transition: none;

        &.visible {
          opacity: 1;
          transform: scale(1);
          animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        &:not(.visible) {
          animation: bounceOut 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
      }
    }
  }

  @keyframes bounceIn {
    0% {
      transform: scale(0.8);
    }
    40% {
      transform: scale(1.08);
    }
    65% {
      transform: scale(0.98);
    }
    80% {
      transform: scale(1.02);
    }
    90% {
      transform: scale(0.99);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes bounceOut {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    20% {
      transform: scale(1.02);
      opacity: 1;
    }
    40% {
      transform: scale(0.98);
      opacity: 0.8;
    }
    60% {
      transform: scale(1.05);
      opacity: 0.6;
    }
    80% {
      transform: scale(0.95);
      opacity: 0.3;
    }
    100% {
      transform: scale(0.8);
      opacity: 0;
    }
  }
</style>
```
