---
title: Component Groups
description: Style groups of components that share similar qualities with these Web Awesome custom properties.
order: 9999
layout: page-outline
---

For components that share similar qualities, Web Awesome includes custom properties to change the appearance of these related components all at once.

## Form Controls

Components such as [input](/docs/components/input), [select](/docs/components/select), [textarea](/docs/components/textarea), [checkbox](/docs/components/checkbox), and others share a number of styles to give your forms a cohesive appearance. Web Awesome defines custom properties for these styles using the format `--wa-form-control-{style}`.

Not every form control uses all of these custom properties. For example, `<wa-radio>` defines its own height and border radius to achieve its familiar shape but shares many other styles with other components for a cohesive look and feel. Similarly, `<wa-button>` defines many of its own styles but matches the height and border width of other form controls.

| Custom Property                             | Default Value                         |
| ------------------------------------------- | ------------------------------------- |
| `--wa-form-control-background-color`        | `var(--wa-color-surface-default)`     |
| `--wa-form-control-border-color`            | `var(--wa-color-neutral-border-loud)` |
| `--wa-form-control-border-style`            | `var(--wa-border-style)`              |
| `--wa-form-control-border-width`            | `var(--wa-border-width-s)`            |
| `--wa-form-control-border-radius`           | `var(--wa-border-radius-m)`           |
| `--wa-form-control-activated-color`         | `var(--wa-color-brand-fill-loud)`     |
| `--wa-form-control-label-color`             | `var(--wa-color-neutral-border-loud)` |
| `--wa-form-control-label-font-weight`       | `var(--wa-font-weight-normal)`        |
| `--wa-form-control-label-line-height`       | `var(--wa-line-height-normal)`        |
| `--wa-form-control-value-color`             | `var(--wa-color-text-normal)`         |
| `--wa-form-control-value-font-weight`       | `var(--wa-font-weight-body)`          |
| `--wa-form-control-value-line-height`       | `var(--wa-line-height-condensed)`     |
| `--wa-form-control-hint-color`              | `var(--wa-color-text-quiet)`          |
| `--wa-form-control-hint-font-weight`        | `var(--wa-font-weight-body)`          |
| `--wa-form-control-hint-line-height`        | `var(--wa-line-height-normal)`        |
| `--wa-form-control-placeholder-color`       | `var(--wa-color-gray-60)`             |
| `--wa-form-control-required-content`        | `'*'`                                 |
| `--wa-form-control-required-content-color`  | `inherit`                             |
| `--wa-form-control-required-content-offset` | `-0.1em`                              |
| `--wa-form-control-padding-block`           | `0.75em`                              |
| `--wa-form-control-padding-inline`          | `1em`                                 |
| `--wa-form-control-height`                  | `round(calc(2 * var(--wa-form-control-padding-block) + 1em * var(--wa-form-control-value-line-height)), 1px)` |
| `--wa-form-control-toggle-size`             | `round(1.25em, 1px)`                  |

```html {.example}
<form class="wa-stack">
  <wa-input label="Input" placeholder="Placeholder"></wa-input>
  <wa-select label="Select" value="option-1">
    <wa-option value="option-1">Option 1</wa-option>
    <wa-option value="option-2">Option 2</wa-option>
    <wa-option value="option-3">Option 3</wa-option>
  </wa-select>
  <wa-textarea label="Textarea" placeholder="Placeholder"></wa-textarea>
  <wa-radio-group label="Radio group" name="a" value="1">
    <wa-radio value="1">Option 1</wa-radio>
    <wa-radio value="2">Option 2</wa-radio>
    <wa-radio value="3">Option 3</wa-radio>
  </wa-radio-group>
  <wa-checkbox>Checkbox</wa-checkbox>
  <wa-switch>Switch</wa-switch>
  <wa-slider label="Range"></wa-slider>
  <wa-button>Button</wa-button>
</form>
```

## Panels

Panels consist of components with larger, contained surface areas like [callout](/docs/components/callout), [card](/docs/components/card), [details](/docs/components/details), and [dialog](/docs/components/dialog).

| Custom Property            | Default Value               |
| -------------------------- | --------------------------- |
| `--wa-panel-border-style`  | `var(--wa-border-style)`    |
| `--wa-panel-border-width`  | `var(--wa-border-width-s)`  |
| `--wa-panel-border-radius` | `var(--wa-border-radius-l)` |

```html {.example}
<div class="wa-stack">
  <wa-callout>
    <wa-icon slot="icon" name="circle-info" variant="regular"></wa-icon>
    This is a simple callout with an icon.
  </wa-callout>
  <wa-card>Here's a basic, no-nonsense card.</wa-card>
  <wa-details summary="Details">
    <code>wa-details</code>, at your service.
  </wa-details>
</div>
```

## Tooltips

Tooltip styles are shared between the [tooltip](/docs/components/tooltip) component and the tooltips in [slider](/docs/components/slider) and [copy button](/docs/components/copy-button).

| Custom Property                 | Default Value                        |
| ------------------------------- | ------------------------------------ |
| `--wa-tooltip-arrow-size`       | `0.375rem` <small>(6px)</small>      |
| `--wa-tooltip-background-color` | `var(--wa-color-neutral-fill-loud)`  |
| `--wa-tooltip-border-color`     | `var(--wa-tooltip-background-color)` |
| `--wa-tooltip-border-style`     | `var(--wa-border-style)`             |
| `--wa-tooltip-border-width`     | `var(--wa-border-width-s)`           |
| `--wa-tooltip-border-radius`    | `var(--wa-border-radius-s)`          |
| `--wa-tooltip-content-color`    | `var(--wa-color-neutral-on-loud)`    |
| `--wa-tooltip-font-size`        | `var(--wa-font-size-s)`              |
| `--wa-tooltip-line-height`      | `var(--wa-line-height-normal)`       |

```html {.example}
<wa-button id="bullseye-example" appearance="plain">
  <wa-icon label="Target" name="bullseye"></wa-icon>
</wa-button>
<wa-tooltip for="bullseye-example" open trigger="manual">This is a tooltip</wa-tooltip>
```
