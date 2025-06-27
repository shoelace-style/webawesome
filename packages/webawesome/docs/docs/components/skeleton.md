---
title: Skeleton
description: Skeletons are used to provide a visual representation of where content will eventually be drawn.
layout: component
category: Feedback & Status
---

These are simple containers for scaffolding layouts that mimic what users will see when content has finished loading. This prevents large areas of empty space during asynchronous operations.

Skeletons try not to be opinionated, as there are endless possibilities for designing layouts. Therefore, you'll likely use more than one skeleton to create the effect you want. If you find yourself using them frequently, consider creating a template that renders them with the desired arrangement and styles.

```html {.example}
<div class="skeleton-overview">
  <header>
    <wa-skeleton effect="sheen"></wa-skeleton>
    <wa-skeleton effect="sheen"></wa-skeleton>
  </header>

  <wa-skeleton effect="sheen"></wa-skeleton>
  <wa-skeleton effect="sheen"></wa-skeleton>
  <wa-skeleton effect="sheen"></wa-skeleton>
</div>

<style>
  .skeleton-overview header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .skeleton-overview header wa-skeleton:last-child {
    flex: 0 0 auto;
    width: 30%;
  }

  .skeleton-overview wa-skeleton {
    margin-bottom: 1rem;
  }

  .skeleton-overview wa-skeleton:nth-child(1) {
    float: left;
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
    vertical-align: middle;
  }

  .skeleton-overview wa-skeleton:nth-child(3) {
    width: 95%;
  }

  .skeleton-overview wa-skeleton:nth-child(4) {
    width: 80%;
  }
</style>
```

## Examples

### Effects

There are two built-in effects, `sheen` and `pulse`. Effects are intentionally subtle, as they can be distracting when used extensively. The default is `none`, which displays a static, non-animated skeleton.

```html {.example}
<div class="skeleton-effects">
  <wa-skeleton effect="none"></wa-skeleton>
  None

  <wa-skeleton effect="sheen"></wa-skeleton>
  Sheen

  <wa-skeleton effect="pulse"></wa-skeleton>
  Pulse
</div>

<style>
  .skeleton-effects {
    font-size: var(--wa-font-size-s);
  }

  .skeleton-effects wa-skeleton:not(:first-child) {
    margin-top: 1rem;
  }
</style>
```

### Paragraphs

Use multiple skeletons and some clever styles to simulate paragraphs.

```html {.example}
<div class="skeleton-paragraphs">
  <wa-skeleton></wa-skeleton>
  <wa-skeleton></wa-skeleton>
  <wa-skeleton></wa-skeleton>
  <wa-skeleton></wa-skeleton>
  <wa-skeleton></wa-skeleton>
</div>

<style>
  .skeleton-paragraphs wa-skeleton {
    margin-bottom: 1rem;
  }

  .skeleton-paragraphs wa-skeleton:nth-child(2) {
    width: 95%;
  }

  .skeleton-paragraphs wa-skeleton:nth-child(4) {
    width: 90%;
  }

  .skeleton-paragraphs wa-skeleton:last-child {
    width: 50%;
  }
</style>
```

### Avatars

Set a matching width and height to make a circle, square, or rounded avatar skeleton.

```html {.example}
<div class="skeleton-avatars">
  <wa-skeleton></wa-skeleton>
  <wa-skeleton></wa-skeleton>
  <wa-skeleton></wa-skeleton>
</div>

<style>
  .skeleton-avatars wa-skeleton {
    display: inline-flex;
    width: 3rem;
    height: 3rem;
    margin-right: 0.5rem;
  }

  .skeleton-avatars wa-skeleton:nth-child(1)::part(indicator) {
    border-radius: 0;
  }

  .skeleton-avatars wa-skeleton:nth-child(2)::part(indicator) {
    border-radius: var(--wa-border-radius-m);
  }
</style>
```

### Custom Shapes

Set a `border-radius` on the `indicator` part to make circles, squares, and rectangles. For more complex shapes, you can apply `clip-path` to the `indicator` part. [Try Clippy](https://bennettfeely.com/clippy/) if you need help generating custom shapes.

```html {.example}
<div class="skeleton-shapes">
  <wa-skeleton class="square"></wa-skeleton>
  <wa-skeleton class="circle"></wa-skeleton>
  <wa-skeleton class="triangle"></wa-skeleton>
  <wa-skeleton class="cross"></wa-skeleton>
  <wa-skeleton class="comment"></wa-skeleton>
</div>

<style>
  .skeleton-shapes wa-skeleton {
    display: inline-flex;
    width: 50px;
    height: 50px;
  }

  .skeleton-shapes .square::part(indicator) {
    border-radius: var(--wa-border-radius-m);
  }

  .skeleton-shapes .circle::part(indicator) {
    border-radius: var(--wa-border-radius-circle);
  }

  .skeleton-shapes .triangle::part(indicator) {
    border-radius: 0;
    clip-path: polygon(50% 0, 0 100%, 100% 100%);
  }

  .skeleton-shapes .cross::part(indicator) {
    border-radius: 0;
    clip-path: polygon(
      20% 0%,
      0% 20%,
      30% 50%,
      0% 80%,
      20% 100%,
      50% 70%,
      80% 100%,
      100% 80%,
      70% 50%,
      100% 20%,
      80% 0%,
      50% 30%
    );
  }

  .skeleton-shapes .comment::part(indicator) {
    border-radius: 0;
    clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%);
  }

  .skeleton-shapes wa-skeleton:not(:last-child) {
    margin-right: 0.5rem;
  }
</style>
```

### Custom Colors

Set the `--color` and `--sheen-color` custom properties to adjust the skeleton's color.

```html {.example}
<wa-skeleton effect="sheen" style="--color: tomato; --sheen-color: #ffb094;"></wa-skeleton>
```
