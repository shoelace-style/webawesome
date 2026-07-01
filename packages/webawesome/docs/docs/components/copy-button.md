---
title: Copy Button
layout: component
category: Actions
synonyms:
  - clipboard
  - copy to clipboard
  - copy icon
use-cases:
  - code copy
  - text copy
  - share link
---

```html {.example}
<wa-copy-button value="https://webawesome.com"></wa-copy-button>
```

:::info
<strong>Copying requires a secure context.</strong><br />
Copy buttons use the browser's [`clipboard.writeText()`](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText) method, which requires a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) (HTTPS) in most browsers.
:::

## Examples

### Copying From Other Elements

Set `value` to copy a literal string, or point `from` at another element's `id` to copy live content. When both are present, `from` wins.

By default `from` copies the target's [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent). Add a modifier to copy an attribute or property instead:

| Syntax | Copies | Example |
| --- | --- | --- |
| `from="id"` | The element's `textContent` | `from="my-phone"` |
| `from="id[attr]"` | The named attribute | `from="my-link[href]"` |
| `from="id.prop"` | The named property | `from="my-input.value"` |

```html {.example}
<div class="wa-stack">
  <!-- Copies the span's textContent -->
  <div class="wa-cluster wa-align-items-center wa-gap-2xs">
    <span id="my-phone">+1 (234) 456-7890</span>
    <wa-copy-button from="my-phone"></wa-copy-button>
  </div>

  <!-- Copies the input's "value" property -->
  <div class="wa-cluster wa-align-items-center wa-gap-2xs">
    <wa-input id="my-input" type="text" value="User input" style="max-width: 300px;"></wa-input>
    <wa-copy-button from="my-input.value"></wa-copy-button>
  </div>

  <!-- Copies the link's "href" attribute -->
  <div class="wa-cluster wa-align-items-center wa-gap-2xs">
    <a id="my-link" href="https://webawesome.com/">Web Awesome Website</a>
    <wa-copy-button from="my-link[href]"></wa-copy-button>
  </div>
</div>
```

### Custom Labels

The copy button shows a tooltip on hover and focus, then briefly swaps it to confirm a copy. Set `copy-label`, `success-label`, and `error-label` to customize the text for each state. `copy-label` also serves as the button's accessible name.

```html {.example}
<wa-copy-button
  value="Custom labels are easy"
  copy-label="Click to copy"
  success-label="You did it!"
  error-label="Whoops, your browser doesn't support this!"
></wa-copy-button>
```

### Custom Icons

Use the `copy-icon`, `success-icon`, and `error-icon` slots to replace the icon shown in each state. [`<wa-icon>`](/docs/components/icon) works best, but any image will do.

```html {.example}
<wa-copy-button value="Copied from a custom button">
  <wa-icon slot="copy-icon" name="clipboard" variant="regular"></wa-icon>
  <wa-icon slot="success-icon" name="thumbs-up" variant="solid"></wa-icon>
  <wa-icon slot="error-icon" name="xmark" variant="solid"></wa-icon>
</wa-copy-button>
```

### Custom Trigger

By default the copy button renders an icon-only button. Slot in any clickable element to use as the trigger instead — a Web Awesome button, a native button, or anything else.

```html {.example}
<div class="wa-stack">
  <wa-copy-button value="You can copy anything with a custom trigger!">
    <wa-button appearance="filled">Copy to Clipboard</wa-button>
  </wa-copy-button>

  <wa-copy-button value="https://webawesome.com">
    <button type="button" class="wa-filled">Copy to Clipboard</button>
  </wa-copy-button>
</div>
```

:::info
<strong>Custom triggers get the same feedback with no extra wiring.</strong><br />
They receive the same tooltip and copy feedback as the default trigger; the icon swap is the one piece unique to it. Set `tooltip="none"` to opt out of the tooltip, and listen for the `wa-copy` and `wa-error` events or style the `:state(success)` and `:state(error)` custom states for your own feedback.
:::

### Disabled

Add the `disabled` attribute to turn off the copy button.

```html {.example}
<wa-copy-button value="You can't copy me" disabled></wa-copy-button>
```

### Handling Errors

A copy fails when `value` is empty, when `from` points to an id that doesn't exist, or when the browser rejects the operation. Either way, the button shows its error state and emits the `wa-error` event. Customize the message with `error-label` and the icon with the `error-icon` slot.

```html {.example}
<wa-copy-button from="i-do-not-exist"></wa-copy-button>
```

### Feedback Duration

After a copy, the tooltip briefly shows the success or error label. Set `feedback-duration` (in milliseconds) to control how long it stays visible.

```html {.example}
<wa-copy-button value="Web Awesome rocks!" feedback-duration="250"></wa-copy-button>
```

### Tooltip Modes

The `tooltip` attribute controls when the built-in tooltip appears, on both the default and custom triggers.

| Value | Behavior |
| --- | --- |
| `full` <wa-badge appearance="outlined" variant="neutral" pill>default</wa-badge> | Shows on hover and focus, and reused for copy feedback |
| `copy` | Stays silent on hover and focus; appears only to confirm a copy |
| `none` | Never shown |

```html {.example}
<div class="wa-cluster">
  <wa-copy-button value="npm install @awesome.me/webawesome" tooltip="full"></wa-copy-button>
  <wa-copy-button value="npm install @awesome.me/webawesome" tooltip="copy"></wa-copy-button>
  <wa-copy-button value="npm install @awesome.me/webawesome" tooltip="none"></wa-copy-button>
</div>
```

### Tooltip Placement

The tooltip sits above the trigger by default. Set `tooltip-placement` to `top`, `right`, `bottom`, or `left` to move it.

```html {.example}
<div class="wa-cluster">
  <wa-copy-button value="Above" tooltip-placement="top"></wa-copy-button>
  <wa-copy-button value="Right" tooltip-placement="right"></wa-copy-button>
  <wa-copy-button value="Below" tooltip-placement="bottom"></wa-copy-button>
  <wa-copy-button value="Left" tooltip-placement="left"></wa-copy-button>
</div>
```

### Customizing

Style the button through its CSS parts — `button`, `copy-icon`, `success-icon`, and `error-icon` — to match your design.

```html {.example}
<wa-copy-button value="I'm so stylish" class="custom-styles">
  <wa-icon slot="copy-icon" name="clipboard"></wa-icon>
  <wa-icon slot="success-icon" name="thumbs-up"></wa-icon>
  <wa-icon slot="error-icon" name="thumbs-down"></wa-icon>
</wa-copy-button>

<style>
  .custom-styles,
  .custom-styles::part(success-icon),
  .custom-styles::part(error-icon) {
    color: white;
  }

  .custom-styles::part(button) {
    background-color: #ff1493;
    border: solid 2px #ff7ac1;
    border-right-color: #ad005c;
    border-bottom-color: #ad005c;
    border-radius: 6px;
    transition: all var(--wa-transition-slow) var(--wa-transition-easing);
  }

  .custom-styles::part(button):hover {
    transform: scale(1.05);
  }

  .custom-styles::part(button):active {
    transform: translateY(1px);
  }

  .custom-styles::part(button):focus-visible {
    outline: dashed 2px deeppink;
    outline-offset: 4px;
  }
</style>
```
