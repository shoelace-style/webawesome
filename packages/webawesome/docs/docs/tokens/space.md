---
title: Space
description: Lock down consistent spacing Web Awesome's space properties.
---

<style>
  .spacing-example {
    --dot-size: 0.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--wa-color-neutral-fill-normal);
    height: 2em;
    margin-inline:var(--dot-size);
  }

  .spacing-example::before {
    content: '';
    aspect-ratio: 1 / 1;
    width: var(--dot-size);
    background-color: var(--wa-color-neutral-fill-loud);
    border-radius: 50%;
    margin-inline-start: calc(var(--dot-size) * -1);
  }

  .spacing-example::after {
    content: '';
    aspect-ratio: 1 / 1;
    width: var(--dot-size);
    background-color: var(--wa-color-neutral-fill-loud);
    border-radius: 50%;
    margin-inline-end: calc(var(--dot-size) * -1);
  }
</style>

Space properties are used intentionally throughout Web Awesome to create predictable rhythm and meaningful proximity. These properties use `rem` units in order to scale proportionately with the root font size.

You can use `--wa-space-scale` to increase or decrease all spacing at once. By default, this multiplier is `1`.

The calculations for each size and the resulting pixel value (assuming a 16px root font size) are listed below.

| Custom Property  | Default Value                                                 | Preview                                                      -         |
| ---------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `--wa-space-3xs` | `calc(var(--wa-space-scale) * 0.125rem)` <small>(2px)</small> | <div class="spacing-example" style="width: var(--wa-space-3xs)"></div> |
| `--wa-space-2xs` | `calc(var(--wa-space-scale) * 0.25rem)` <small>(4px)</small>  | <div class="spacing-example" style="width: var(--wa-space-2xs)"></div> |
| `--wa-space-xs`  | `calc(var(--wa-space-scale) * 0.5rem)` <small>(8px)</small>   | <div class="spacing-example" style="width: var(--wa-space-xs)"></div>  |
| `--wa-space-s`   | `calc(var(--wa-space-scale) * 0.75rem)` <small>(12px)</small> | <div class="spacing-example" style="width: var(--wa-space-s)"></div>   |
| `--wa-space-m`   | `calc(var(--wa-space-scale) * 1rem)` <small>(16px)</small>    | <div class="spacing-example" style="width: var(--wa-space-m)"></div>   |
| `--wa-space-l`   | `calc(var(--wa-space-scale) * 1.5rem)` <small>(24px)</small>  | <div class="spacing-example" style="width: var(--wa-space-l)"></div>   |
| `--wa-space-xl`  | `calc(var(--wa-space-scale) * 2rem)` <small>(32px)</small>    | <div class="spacing-example" style="width: var(--wa-space-xl)"></div>  |
| `--wa-space-2xl` | `calc(var(--wa-space-scale) * 2.5rem)` <small>(40px)</small>  | <div class="spacing-example" style="width: var(--wa-space-2xl)"></div> |
| `--wa-space-3xl` | `calc(var(--wa-space-scale) * 3rem)` <small>(48px)</small>    | <div class="spacing-example" style="width: var(--wa-space-3xl)"></div> |
| `--wa-space-4xl` | `calc(var(--wa-space-scale) * 4rem)` <small>(64px)</small>    | <div class="spacing-example" style="width: var(--wa-space-4xl)"></div> |
