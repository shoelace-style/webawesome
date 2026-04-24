---
title: Component Groups
description: Style groups of components that share similar qualities with these Web Awesome tokens.
order: 9999
layout: page-outline
synonyms:
  - component tokens
  - group tokens
use-cases:
  - shared tokens
  - token sets
---

Component tokens let you style groups of related components at once. Rather than overriding individual component styles, these tokens propagate the style across every component that shares a given visual quality.

## Form Controls

Components such as [input](/docs/components/input), [select](/docs/components/select), [textarea](/docs/components/textarea), [checkbox](/docs/components/checkbox), and others share styles defined with the `--wa-form-control-*` prefix.

Not every form control uses all of these custom properties. For example, [radio](/docs/components/radio) defines its own height and border radius to achieve its familiar shape but shares many other styles with other components for a cohesive look and feel. Similarly, [button](/docs/components/button) defines many of its own styles but matches the height and border width of other form controls.

<wa-scroller>
  <table class="token-table wa-hover-rows">
    <thead>
      <tr><th>Custom Property</th><th>Description</th></tr>
    </thead>
    <tbody>
      <tr id="token-wa-form-control-background-color">
        <td class="token-name"><code>--wa-form-control-background-color</code></td>
        <td>Background color of form control inputs</td>
      </tr>
      <tr id="token-wa-form-control-border-color">
        <td class="token-name"><code>--wa-form-control-border-color</code></td>
        <td>Border color of form control inputs</td>
      </tr>
      <tr id="token-wa-form-control-border-style">
        <td class="token-name"><code>--wa-form-control-border-style</code></td>
        <td>Border line style of form control inputs</td>
      </tr>
      <tr id="token-wa-form-control-border-width">
        <td class="token-name"><code>--wa-form-control-border-width</code></td>
        <td>Border thickness of form control inputs</td>
      </tr>
      <tr id="token-wa-form-control-border-radius">
        <td class="token-name"><code>--wa-form-control-border-radius</code></td>
        <td>Corner rounding of form control inputs</td>
      </tr>
      <tr id="token-wa-form-control-activated-color">
        <td class="token-name"><code>--wa-form-control-activated-color</code></td>
        <td>Accent color when a control is active, checked, or selected</td>
      </tr>
      <tr id="token-wa-form-control-label-color">
        <td class="token-name"><code>--wa-form-control-label-color</code></td>
        <td>Text color of form control labels</td>
      </tr>
      <tr id="token-wa-form-control-label-font-weight">
        <td class="token-name"><code>--wa-form-control-label-font-weight</code></td>
        <td>Font weight of form control labels</td>
      </tr>
      <tr id="token-wa-form-control-label-line-height">
        <td class="token-name"><code>--wa-form-control-label-line-height</code></td>
        <td>Line height of form control labels</td>
      </tr>
      <tr id="token-wa-form-control-value-color">
        <td class="token-name"><code>--wa-form-control-value-color</code></td>
        <td>Text color of the user-entered or selected value</td>
      </tr>
      <tr id="token-wa-form-control-value-font-weight">
        <td class="token-name"><code>--wa-form-control-value-font-weight</code></td>
        <td>Font weight of the user-entered or selected value</td>
      </tr>
      <tr id="token-wa-form-control-value-line-height">
        <td class="token-name"><code>--wa-form-control-value-line-height</code></td>
        <td>Line height of the user-entered or selected value</td>
      </tr>
      <tr id="token-wa-form-control-hint-color">
        <td class="token-name"><code>--wa-form-control-hint-color</code></td>
        <td>Text color of the hint text below a form control</td>
      </tr>
      <tr id="token-wa-form-control-hint-font-weight">
        <td class="token-name"><code>--wa-form-control-hint-font-weight</code></td>
        <td>Font weight of hint text</td>
      </tr>
      <tr id="token-wa-form-control-hint-line-height">
        <td class="token-name"><code>--wa-form-control-hint-line-height</code></td>
        <td>Line height of hint text</td>
      </tr>
      <tr id="token-wa-form-control-placeholder-color">
        <td class="token-name"><code>--wa-form-control-placeholder-color</code></td>
        <td>Text color of input placeholder text</td>
      </tr>
      <tr id="token-wa-form-control-required-content">
        <td class="token-name"><code>--wa-form-control-required-content</code></td>
        <td>Content appended to labels of required fields</td>
      </tr>
      <tr id="token-wa-form-control-required-content-color">
        <td class="token-name"><code>--wa-form-control-required-content-color</code></td>
        <td>Color of the required field indicator</td>
      </tr>
      <tr id="token-wa-form-control-required-content-offset">
        <td class="token-name"><code>--wa-form-control-required-content-offset</code></td>
        <td>Inline spacing between the label text and required indicator</td>
      </tr>
      <tr id="token-wa-form-control-padding-block">
        <td class="token-name"><code>--wa-form-control-padding-block</code></td>
        <td>Block (top/bottom) padding inside form control inputs</td>
      </tr>
      <tr id="token-wa-form-control-padding-inline">
        <td class="token-name"><code>--wa-form-control-padding-inline</code></td>
        <td>Inline (left/right) padding inside form control inputs</td>
      </tr>
      <tr id="token-wa-form-control-height">
        <td class="token-name"><code>--wa-form-control-height</code></td>
        <td>Computed height of single-line form controls; derived from padding and line height</td>
      </tr>
      <tr id="token-wa-form-control-toggle-size">
        <td class="token-name"><code>--wa-form-control-toggle-size</code></td>
        <td>Size of toggle controls (checkboxes, radios, switches)</td>
      </tr>
    </tbody>
  </table>
</wa-scroller>

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

Panel tokens apply to components with larger, contained surface areas, like [callout](/docs/components/callout), [card](/docs/components/card), [details](/docs/components/details), and [dialog](/docs/components/dialog).

<wa-scroller>
  <table class="token-table wa-hover-rows">
    <thead>
      <tr><th>Custom Property</th><th>Description</th></tr>
    </thead>
    <tbody>
      <tr id="token-wa-panel-border-style">
        <td class="token-name"><code>--wa-panel-border-style</code></td>
        <td>Border line style for panel components</td>
      </tr>
      <tr id="token-wa-panel-border-width">
        <td class="token-name"><code>--wa-panel-border-width</code></td>
        <td>Border thickness for panel components</td>
      </tr>
      <tr id="token-wa-panel-border-radius">
        <td class="token-name"><code>--wa-panel-border-radius</code></td>
        <td>Corner rounding for panel components</td>
      </tr>
    </tbody>
  </table>
</wa-scroller>

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

Tooltip tokens apply to the [tooltip](/docs/components/tooltip) component and built-in tooltips in other components like [slider](/docs/components/slider) and [copy button](/docs/components/copy-button).

<wa-scroller>
  <table class="token-table wa-hover-rows">
    <thead>
      <tr><th>Custom Property</th><th>Description</th></tr>
    </thead>
    <tbody>
      <tr id="token-wa-tooltip-arrow-size">
        <td class="token-name"><code>--wa-tooltip-arrow-size</code></td>
        <td>Size of the tooltip arrow/caret</td>
      </tr>
      <tr id="token-wa-tooltip-background-color">
        <td class="token-name"><code>--wa-tooltip-background-color</code></td>
        <td>Background color of the tooltip body</td>
      </tr>
      <tr id="token-wa-tooltip-border-color">
        <td class="token-name"><code>--wa-tooltip-border-color</code></td>
        <td>Border color of the tooltip</td>
      </tr>
      <tr id="token-wa-tooltip-border-style">
        <td class="token-name"><code>--wa-tooltip-border-style</code></td>
        <td>Border line style of the tooltip</td>
      </tr>
      <tr id="token-wa-tooltip-border-width">
        <td class="token-name"><code>--wa-tooltip-border-width</code></td>
        <td>Border thickness of the tooltip</td>
      </tr>
      <tr id="token-wa-tooltip-border-radius">
        <td class="token-name"><code>--wa-tooltip-border-radius</code></td>
        <td>Corner rounding of the tooltip</td>
      </tr>
      <tr id="token-wa-tooltip-content-color">
        <td class="token-name"><code>--wa-tooltip-content-color</code></td>
        <td>Text color of tooltip content</td>
      </tr>
      <tr id="token-wa-tooltip-font-size">
        <td class="token-name"><code>--wa-tooltip-font-size</code></td>
        <td>Font size of tooltip text</td>
      </tr>
      <tr id="token-wa-tooltip-line-height">
        <td class="token-name"><code>--wa-tooltip-line-height</code></td>
        <td>Line height of tooltip text</td>
      </tr>
    </tbody>
  </table>
</wa-scroller>

```html {.example}
<wa-button id="tooltip-demo" appearance="plain">
  <wa-icon label="Target" name="bullseye"></wa-icon>
</wa-button>
<wa-tooltip for="tooltip-demo" open trigger="manual">This is a tooltip</wa-tooltip>
```
