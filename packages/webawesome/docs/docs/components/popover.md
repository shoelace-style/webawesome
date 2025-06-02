---
title: Popover
layout: component
---

Popovers appear when a corresponding anchor element is clicked. Unlike [tooltips](/docs/components/tooltip), popovers can contain interactive content such as links, buttons, and form controls. They are not modal, so no overlay is shown when open. Popovers will close when the user clicks outside of them or presses [[Escape]]. Only one popover can be open at a time.

```html {.example}
<wa-popover for="popover__overview">
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <p>This popover contains interactive content that users can engage with directly.</p>
    <wa-button variant="primary" size="small">Take Action</wa-button>
  </div>
</wa-popover>

<wa-button id="popover__overview">Show popover</wa-button>
```

## Examples

### Assigning an Anchor

Popover anchors should be `<wa-button>` or `<button>` elements. Use the `for` attribute on the popover to link it to the anchor's `id`.

```html {.example}
<wa-button id="popover__anchor-button">Show Popover</wa-button>

<wa-popover for="popover__anchor-button">
  I'm anchored to a Web Awesome button.
</wa-popover>

<br><br>

<button id="popover__anchor-native-button">Show Popover</button>

<wa-popover for="popover__anchor-native-button">
  I'm anchored to a native button.
</wa-popover>
```

:::warning
The anchor element must be in the DOM when the popover is connected, otherwise the popover won't be attached and a warning will be shown in the console.
:::

### Opening and Closing

Popovers will be shown when their anchor element is clicked. You can open and close a popover programmatically by obtaining a reference to it and setting the `open` property to `true` or `false`, respectively.

As a convenience, you can add `data-popover="close"` to any button inside a popover to close it without additional JavaScript.

```html {.example}
<wa-popover for="popover__opening">
  <p>The button below has <code>data-popover="close"</code> so clicking it will close the popover.</p>
  <wa-button data-popover="close" variant="primary">Dismiss</wa-button>
</wa-popover>

<wa-button id="popover__opening">Show popover</wa-button>
```

### Placement

Use the `placement` attribute to change the preferred location of the popover in reference to its anchor. The popover will shift to a more optimal location if the preferred placement doesn't have enough room. The default placement is `top`.

```html {.example}
<div style="display: flex; gap: 1rem; align-items: center;">
  <wa-button id="popover__top">Top</wa-button>
  <wa-popover for="popover__top" placement="top">I'm on the top</wa-popover>

  <wa-button id="popover__bottom">Bottom</wa-button>
  <wa-popover for="popover__bottom" placement="bottom">I'm on the bottom</wa-popover>

  <wa-button id="popover__left">Left</wa-button>
  <wa-popover for="popover__left" placement="left">I'm on the left</wa-popover>

  <wa-button id="popover__right">Right</wa-button>
  <wa-popover for="popover__right" placement="right">I'm on the right</wa-popover>
</div>
```

### Distance

You can change the distance of the popover from the anchor by setting the `distance` attribute to the desired number of pixels.

```html {.example}
<div style="display: flex; gap: 1rem; align-items: center;">
  <wa-button id="popover__distance-near">Near</wa-button>
  <wa-popover for="popover__distance-near" distance="0">I'm very close</wa-popover>

  <wa-button id="popover__distance-far">Far</wa-button>
  <wa-popover for="popover__distance-far" distance="30">I'm farther away</wa-popover>
</div>
```

### Arrow Size

You can change the size of the popover's arrow with the `--arrow-size` custom property. Set it to `0` to remove the arrow.

```html {.example}
<div style="display: flex; gap: 1rem; align-items: center;">
  <wa-button id="popover__big-arrow">Big arrow</wa-button>
  <wa-popover for="popover__big-arrow" style="--arrow-size: 8px;">I have a big arrow</wa-popover>

  <wa-button id="popover__no-arrow">No arrow</wa-button>
  <wa-popover for="popover__no-arrow" style="--arrow-size: 0;">I don't have an arrow</wa-popover>
</div>
```

### Setting a Maximum Width

Use the `--max-width` custom property to change the maximum width of the popover.

```html {.example}
<wa-button id="popover__max-width">Toggle me</wa-button>
<wa-popover for="popover__max-width" style="--max-width: 160px;">
  Popovers will usually grow to be much wider, but this one has a custom max width that forces text to wrap.
</wa-popover>
```

### Setting Focus

To move focus to a specific form control when the popover opens, use the [`autofocus`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus) global attribute.

```html {.example}
<wa-popover for="popover__autofocus">
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <wa-textarea 
      autofocus
      placeholder="What's on your mind?"
      size="small" 
      resize="none"
      rows="3"
    ></wa-textarea>
    <wa-button variant="primary" size="small" data-popover="close">
      Submit
    </wa-button>
  </div>
</wa-popover>

<wa-button id="popover__autofocus">
  <wa-icon name="comment" slot="prefix"></wa-icon>
  Feedback
</wa-button>
```
