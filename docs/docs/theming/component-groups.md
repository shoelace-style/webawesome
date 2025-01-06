---
title: Component Groups
description: Style groups of components that share similar qualities with these Web Awesome custom properties.
order: 9999
---

For components that share similar qualities, Web Awesome includes custom properties to change the appearance of these related components all at once.

## Form Controls

Components such as [input](/docs/components/input), [select](/docs/components/select), [textarea](/docs/components/textarea), [checkbox](/docs/components/checkbox), etc. share a number of styles to give your forms a cohesive appearance. Web Awesome defines custom properties for these styles using the format `--wa-form-control-{style}`.

Not every form control uses all of these custom properties. For example, `<wa-radio>` defines its own height and border radius to achieve its familiar shape but shares many other styles with other components for a cohesive look and feel. Similarly, `<wa-button>` defines many of its own styles but matches the height and border width of other form controls.

| Custom Property                             | Default Value                                                                                     |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `--wa-form-control-background-color`        | `var(--wa-color-surface-default)`                                                                 |
| `--wa-form-control-border-style`            | `var(--wa-border-style)`                                                                          |
| `--wa-form-control-border-width`            | `var(--wa-border-width-s)`                                                                        |
| `--wa-form-control-border-radius`           | `var(--wa-border-radius-m)`                                                                       |
| `--wa-form-control-activated-color`         | `var(--wa-color-brand-fill-loud)`                                                                 |
| `--wa-form-control-resting-color`           | `var(--wa-color-neutral-border-loud)`                                                             |
| `--wa-form-control-label-color`             | `var(--wa-color-neutral-border-loud)`                                                             |
| `--wa-form-control-label-font-weight`       | `var(--wa-font-weight-normal)`                                                                    |
| `--wa-form-control-label-line-height`       | `var(--wa-line-height-normal)`                                                                    |
| `--wa-form-control-value-color`             | `var(--wa-color-text-normal)`                                                                     |
| `--wa-form-control-value-font-weight`       | `var(--wa-font-weight-body)`                                                                      |
| `--wa-form-control-value-line-height`       | `var(--wa-line-height-condensed)`                                                                 |
| `--wa-form-control-placeholder-color`       | `var(--wa-color-gray-60)`                                                                         |
| `--wa-form-control-height-s`                | `calc(var(--wa-space-xs) * 2 + 1em * var(--wa-form-control-value-line-height))` |
| `--wa-form-control-height-m`                | `calc(var(--wa-space-s) * 2 + 1em * var(--wa-form-control-value-line-height))`  |
| `--wa-form-control-height-l`                | `calc(var(--wa-space-m) * 2 + 1em * var(--wa-form-control-value-line-height))`  |
| `--wa-form-control-required-content`        | `'*'`                                                                                             |
| `--wa-form-control-required-content-color`  | `inherit`                                                                                         |
| `--wa-form-control-required-content-offset` | `-0.1em`                                                                                          |

```html {.example}
<form class="wa-block-spacing-l">
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

<style>
  .wa-block-spacing-l > * + *, wa-radio {
    display: block;
    margin-block-start: var(--wa-space-l);
  }
  wa-radio {
    margin-block-start: var(--wa-space-2xs);
  }
  wa-radio, wa-checkbox, wa-switch, wa-button {
    width: fit-content;
  }
</style>
```

## Panels

Panels consist of components with larger, contained surface areas like [callout](/docs/components/callout), [card](/docs/components/card), [details](/docs/components/details), and [dialog](/docs/components/dialog).

| Custom Property            | Default Value               |
| -------------------------- | --------------------------- |
| `--wa-panel-border-style`  | `var(--wa-border-style)`    |
| `--wa-panel-border-width`  | `var(--wa-border-width-s)`  |
| `--wa-panel-border-radius` | `var(--wa-border-radius-l)` |

```html {.example}
<div class="wa-block-spacing-l">
  <wa-callout>
    <wa-icon slot="icon" name="circle-info" variant="regular"></wa-icon>
    This is a simple callout with an icon.
  </wa-callout>
  <wa-card>Here's a basic, no-nonsense card.</wa-card>
  <wa-details summary="Details">
    <code>wa-details</code>, at your service.
  </wa-details>
</div>

<style>
  .wa-block-spacing-l > * + * {
    display: block;
    margin-block-start: var(--wa-space-l);
  }
</style>
```

## Tooltips

Tooltip styles are shared between the [tooltip](/docs/components/tooltip) component and the tooltip implementation in [range](/docs/components/range).

| Custom Property              | Default Value                       |
| ---------------------------- | ----------------------------------- |
| `--wa-tooltip-arrow-size`    | `0.375rem` <small>(6px)</small>     |
| `--wa-tooltip-background-color`    | `var(--wa-color-neutral-fill-loud)` |
| `--wa-tooltip-border-radius` | `var(--wa-border-radius-m)`         |
| `--wa-tooltip-content-color` | `var(--wa-color-neutral-on-loud)`   |
| `--wa-tooltip-font-size`     | `var(--wa-font-size-s)`             |
| `--wa-tooltip-line-height`   | `var(--wa-line-height-normal)`      |

```html {.example}
<wa-icon-button id="bullseye-example" label="Button" name="bullseye"></wa-icon-button>
<wa-tooltip for="bullseye-example" open trigger="manual">This is a tooltip</wa-tooltip>
```
