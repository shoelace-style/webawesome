---
title: Tooltip
layout: component
category: Feedback
synonyms:
  - hint
  - hover text
  - info bubble
  - title attribute
use-cases:
  - help text
  - contextual help
  - hover info
---

Point the `for` attribute at the `id` of the element the tooltip describes, and Web Awesome wires up positioning and accessibility for you.

```html {.example}
<wa-tooltip for="my-button">This is a tooltip</wa-tooltip>
<wa-button appearance="filled" id="my-button">Hover Me</wa-button>
```

:::warning
<strong>Keep tooltips to text and presentational content.</strong><br />
Tooltips can't be reliably focused or operated with a keyboard, so avoid buttons, links, and form controls inside one. Reach for a [popover](/docs/components/popover) or [dropdown](/docs/components/dropdown) when you need interactive content.
:::

## Examples

### Placement

Use the `placement` attribute to set the tooltip's preferred position. The actual placement may shift to keep the tooltip inside the viewport.

```html {.example}
<div class="tooltip-placement-example">
  <div class="tooltip-placement-example-row">
    <wa-button appearance="filled" id="tooltip-top-start"></wa-button>
    <wa-button appearance="filled" id="tooltip-top"></wa-button>
    <wa-button appearance="filled" id="tooltip-top-end"></wa-button>
  </div>

  <div class="tooltip-placement-example-row">
    <wa-button appearance="filled" id="tooltip-left-start"></wa-button>
    <wa-button appearance="filled" id="tooltip-right-start"></wa-button>
  </div>

  <div class="tooltip-placement-example-row">
    <wa-button appearance="filled" id="tooltip-left"></wa-button>
    <wa-button appearance="filled" id="tooltip-right"></wa-button>
  </div>

  <div class="tooltip-placement-example-row">
    <wa-button appearance="filled" id="tooltip-left-end"></wa-button>
    <wa-button appearance="filled" id="tooltip-right-end"></wa-button>
  </div>

  <div class="tooltip-placement-example-row">
    <wa-button appearance="filled" id="tooltip-bottom-start"></wa-button>
    <wa-button appearance="filled" id="tooltip-bottom"></wa-button>
    <wa-button appearance="filled" id="tooltip-bottom-end"></wa-button>
  </div>
</div>

<wa-tooltip for="tooltip-top-start" placement="top-start">top-start</wa-tooltip>
<wa-tooltip for="tooltip-top" placement="top">top</wa-tooltip>
<wa-tooltip for="tooltip-top-end" placement="top-end">top-end</wa-tooltip>
<wa-tooltip for="tooltip-left-start" placement="left-start">left-start</wa-tooltip>
<wa-tooltip for="tooltip-right-start" placement="right-start">right-start</wa-tooltip>
<wa-tooltip for="tooltip-left" placement="left">left</wa-tooltip>
<wa-tooltip for="tooltip-right" placement="right">right</wa-tooltip>
<wa-tooltip for="tooltip-left-end" placement="left-end">left-end</wa-tooltip>
<wa-tooltip for="tooltip-right-end" placement="right-end">right-end</wa-tooltip>
<wa-tooltip for="tooltip-bottom-start" placement="bottom-start">bottom-start</wa-tooltip>
<wa-tooltip for="tooltip-bottom" placement="bottom">bottom</wa-tooltip>
<wa-tooltip for="tooltip-bottom-end" placement="bottom-end">bottom-end</wa-tooltip>

<style>
  .tooltip-placement-example {
    width: 250px;
    margin: 1rem;
  }

  .tooltip-placement-example wa-button {
    width: 2.5rem;
  }

  .tooltip-placement-example-row {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .tooltip-placement-example-row:nth-child(1),
  .tooltip-placement-example-row:nth-child(5) {
    justify-content: center;
  }
</style>
```

### Triggers

The `trigger` attribute controls how a tooltip is activated. Pass multiple values separated by a space to combine them — the default is `hover focus`, which shows the tooltip on pointer hover and keyboard focus.

| Value    | Shows the tooltip when                                     |
| -------- | ---------------------------------------------------------- |
| `hover`  | The pointer moves over the target                          |
| `focus`  | The target receives keyboard focus                         |
| `click`  | The target is clicked; clicking again dismisses it         |
| `manual` | Only when you set `open` yourself — no built-in activation |

```html {.example}
<wa-button appearance="filled" id="toggle-button">Click to Toggle</wa-button>
<wa-tooltip for="toggle-button" trigger="click">Click again to dismiss</wa-tooltip>
```

### HTML in Tooltips

Use the default slot to add presentational HTML, such as emphasis or line breaks.

```html {.example}
<wa-button appearance="filled" id="rich-tooltip">Hover me</wa-button>
<wa-tooltip for="rich-tooltip">
  <div>This tooltip includes <strong>formatted</strong> content, such as <em>emphasis</em> and line breaks.</div>
</wa-tooltip>
```

### Customizing

Use the `--max-width` custom property to set the width at which the tooltip's content wraps.

```html {.example}
<wa-tooltip for="wrapping-tooltip" style="--max-width: 80px;">
  This tooltip will wrap after only 80 pixels.
</wa-tooltip>
<wa-button appearance="filled" id="wrapping-tooltip">Hover me</wa-button>
```

Remove the arrow on a single tooltip with the `without-arrow` attribute.

```html {.example}
<wa-button appearance="filled" id="no-arrow">No Arrow</wa-button>
<wa-tooltip for="no-arrow" without-arrow>This is a tooltip with no arrow</wa-tooltip>
```

Resize the arrow on every tooltip with the `--wa-tooltip-arrow-size` design token. Set it in a `:root` block after the Web Awesome stylesheet loads — `0` removes arrows globally.

```css
:root {
  --wa-tooltip-arrow-size: 0;
}
```

### Showing & Hiding Manually

Set `trigger="manual"` and toggle the `open` attribute to control the tooltip yourself — handy for onboarding hints or surfacing a tooltip in response to your own logic.

```html {.example}
<div class="manual-trigger-example">
  <wa-tooltip for="manual-trigger-tooltip" trigger="manual" class="manual-tooltip">This is an avatar!</wa-tooltip>
  <wa-avatar id="manual-trigger-tooltip" label="User"></wa-avatar>

  <wa-divider></wa-divider>

  <wa-button appearance="filled" class="manual-toggle">Toggle Manually</wa-button>
</div>

<script>
  const tooltip = document.querySelector('.manual-tooltip');
  const toggle = document.querySelector('.manual-toggle');

  toggle.addEventListener('click', () => (tooltip.open = !tooltip.open));
</script>
```
