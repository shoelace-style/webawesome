---
title: Focus
description: Configure recognizable focus states with Web Awesome's focus tokens.
synonyms:
  - focus ring
  - focus outline
  - focus visible
use-cases:
  - keyboard focus
  - accessibility focus
  - tab focus
---

Focus tokens create a consistent, recognizable outline that lets keyboard users track where they are on the page. Together with [`--wa-color-focus`](?active_tab=color), these tokens assemble the focus ring applied to all interactive Web Awesome components.

<wa-scroller>
  <table class="token-table wa-hover-rows">
    <thead>
      <tr><th>Custom Property</th><th>Description</th></tr>
    </thead>
    <tbody>
      <tr id="token-wa-focus-ring-style">
        <td class="token-name"><code>--wa-focus-ring-style</code></td>
        <td>Line style for the focus outline</td>
      </tr>
      <tr id="token-wa-focus-ring-width">
        <td class="token-name"><code>--wa-focus-ring-width</code></td>
        <td>Thickness of the focus outline</td>
      </tr>
      <tr id="token-wa-focus-ring">
        <td class="token-name"><code>--wa-focus-ring</code></td>
        <td>Shorthand combining style, width, and color into a complete focus outline value</td>
      </tr>
      <tr id="token-wa-focus-ring-offset">
        <td class="token-name"><code>--wa-focus-ring-offset</code></td>
        <td>Gap between the element's edge and the focus outline</td>
      </tr>
    </tbody>
  </table>
</wa-scroller>

See your theme's focus ring by navigating this form with your keyboard:

```html {.example}
<form class="wa-stack">
  <wa-input label="Text Input">
    <span slot="hint">Press <kbd>Tab</kbd> to move focus to other interactive elements.</span>
  </wa-input>
  <wa-checkbox>Checkbox</wa-checkbox>
  <wa-button variant="brand">Button</wa-button>
</form>
```