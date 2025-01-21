---
title: Transitions
description: Customize your theme's built-in transitions with Web Awesome's transition properties.
---

<style>
  .swatch {
    background-color: var(--wa-color-neutral-fill-normal);
    border: none;
    position: relative;
  }
  .swatch::after {
    content: '';
    position: absolute;
    background-color: var(--wa-color-brand-fill-loud);
    border-radius: var(--wa-border-radius-m);
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    transition: inherit;
  }
  .swatch:hover::after {
    width: 100%;
  }
</style>

Transitions can make interactions more lively and emphasize the relationship between a user's action and its outcome.

### Duration

Web Awesome uses different transition durations to make it easy to track a component's state while minimizing sluggish or distracting movement.

Properties that change between frequent, incidental states, such as hover and focus, generally use faster transitions than properties that change between states that are more intentional and impactful, like checked or open.

| Custom Property          | Default Value |  Preview                                                                                                     |
| ------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------ |
| `--wa-transition-slow`   | `300ms`       | <div class="swatch" style="transition: width var(--wa-transition-slow) var(--wa-transition-easing)"></div>   |
| `--wa-transition-normal` | `150ms`       | <div class="swatch" style="transition: width var(--wa-transition-normal) var(--wa-transition-easing)"></div> |
| `--wa-transition-fast`   | `75ms`        | <div class="swatch" style="transition: width var(--wa-transition-fast) var(--wa-transition-easing)"></div>   |

### Easing

Easing controls the standard `transition-timing-function` used for transitions throughout Web Awesome.

| Custom Property          | Default Value | Preview                                                                                |
| ------------------------ | ------------- | -------------------------------------------------------------------------------------- |
| `--wa-transition-easing` | `ease`        | <div class="swatch" style="transition: width 600ms var(--wa-transition-easing)"></div> |
