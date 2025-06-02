---
title: Focus
description: Configure recognizable focus states with Web Awesome's focus properties.
---

A consistent focus ring helps with predictable keyboard navigation. Together with [`--wa-color-focus`](/docs/tokens/color/#interactions), these tokens create a uniform focus state for Web Awesome components.


| Custom Property          |  Default Value                                                                |
| ------------------------ | ----------------------------------------------------------------------------- |
| `--wa-focus-ring-style`  | `solid`                                                                       |
| `--wa-focus-ring-width`  | `0.1875rem` <small>(3px)</small>                                              |
| `--wa-focus-ring`        | `var(--wa-focus-ring-style) var(--wa-focus-ring-width) var(--wa-color-focus)` |
| `--wa-focus-ring-offset` | `0.0625rem` <small>(1px)</small>                                              |

See your theme's focus ring in action by navigating this form example with your keyboard.

```html {.example}
<form class="wa-block-spacing-m">
  <wa-input label="Text Input">
    <span slot="hint">Press <kbd>Tab</kbd> to move focus to other interactive elements.</span>
  </wa-input>
  <wa-checkbox>Checkbox</wa-checkbox>
  <wa-button>Button</wa-button>
</form>

<style>
  form > * + * {
    display: block;
    --display: block;
    width: fit-content;
    margin-block-start: var(--wa-space-m);
  }
</style>
```
