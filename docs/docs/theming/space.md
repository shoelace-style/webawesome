---
title: Space
description: Lock down consistent spacing Web Awesome's space properties.
layout: page-outline
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

Each space property uses a `calc()` function with `--wa-space-scale` to scale all spacing at once. By default, this multiplier is `1`. The table below lists the result of the calculation.

| Custom Property  | Default Value                   | Preview                                                               |
| ---------------- | ------------------------------- | --------------------------------------------------------------------- |
| `--wa-space-3xs` | `0.125rem` <small>(2px)</small> | <div class="spacing-example" style="width: var(--wa-space-3xs)"></div> |
| `--wa-space-2xs` | `0.25rem` <small>(4px)</small>  | <div class="spacing-example" style="width: var(--wa-space-2xs)"></div> |
| `--wa-space-xs`  | `0.5rem` <small>(8px)</small>   | <div class="spacing-example" style="width: var(--wa-space-xs)"></div>  |
| `--wa-space-s`   | `0.75rem` <small>(12px)</small> | <div class="spacing-example" style="width: var(--wa-space-s)"></div>   |
| `--wa-space-m`   | `1rem` <small>(16px)</small>    | <div class="spacing-example" style="width: var(--wa-space-m)"></div>   |
| `--wa-space-l`   | `1.25rem` <small>(20px)</small> | <div class="spacing-example" style="width: var(--wa-space-l)"></div>   |
| `--wa-space-xl`  | `1.5rem` <small>(24px)</small>  | <div class="spacing-example" style="width: var(--wa-space-xl)"></div>  |
| `--wa-space-2xl` | `2rem` <small>(32px)</small>    | <div class="spacing-example" style="width: var(--wa-space-2xl)"></div> |
| `--wa-space-3xl` | `3rem` <small>(48px)</small>    | <div class="spacing-example" style="width: var(--wa-space-3xl)"></div> |

When using space properties, it may be helpful to consider three distinct groups:
- Small-scale space (`3xs`, `2xs`, and `xs`) can be used for gaps between cooperating elements, such as a dropdown button and its menu, and padding within small components, such as badges and tooltips
- Normal space (`s`, `m`, and `l`) can be used for gaps between related elements with distinct touch targets and padding within typical interface elements, such as buttons and inputs
- Large-scale space (`xl`, `2xl`, and `3xl`) can be used for gaps between unrelated elements and padding within larger components, such as cards and dialogs
