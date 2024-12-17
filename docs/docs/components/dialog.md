---
title: Dialog
description: 'Dialogs, sometimes called "modals", appear above the page and require the user''s immediate attention.'
tags: component
---

<!-- cspell:dictionaries lorem-ipsum -->

```html {.example}
<wa-dialog label="Dialog" with-header with-footer class="dialog-overview">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <wa-button slot="footer" variant="brand" data-dialog="close">Close</wa-button>
</wa-dialog>

<wa-button>Open Dialog</wa-button>

<script>
  const dialog = document.querySelector('.dialog-overview');
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener('click', () => dialog.open = true);
</script>
```

## Examples

### Dialog with Header

Headers can be used to display titles and more. Use the `with-header` attribute to add a header to the dialog.

```html {.example}
<wa-dialog label="Dialog" with-header class="dialog-header">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</wa-dialog>

<wa-button>Open Dialog</wa-button>

<script>
  const dialog = document.querySelector('.dialog-header');
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener('click', () => dialog.open = true);
</script>
```

### Dialog with Footer

Footers can be used to display titles and more. Use the `with-footer` attribute to add a footer to the dialog.

```html {.example}
<wa-dialog label="Dialog" with-footer class="dialog-footer">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <wa-button slot="footer" variant="brand" data-dialog="close">Close</wa-button>
</wa-dialog>

<wa-button>Open Dialog</wa-button>

<script>
  const dialog = document.querySelector('.dialog-footer');
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener('click', () => dialog.open = true);
</script>
```

### Dismissing Dialogs

You can add the special `data-dialog="close"` attribute to a button inside the dialog to tell it to close without additional JavaScript. Alternatively, you can set the `open` property to `false` to close the dialog programmatically.

```html {.example}
<wa-dialog label="Dialog" with-header with-footer class="dialog-dismiss">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <wa-button slot="footer" variant="brand" data-dialog="close">Close</wa-button>
</wa-dialog>

<wa-button>Open Dialog</wa-button>

<script>
  const dialog = document.querySelector('.dialog-dismiss');
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener('click', () => dialog.open = true);
</script>
```

### Custom Width

Use the `--width` custom property to set the dialog's width.

```html {.example}
<wa-dialog label="Dialog" with-header with-footer class="dialog-width" style="--width: 50vw;">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <wa-button slot="footer" variant="brand" data-dialog="close">Close</wa-button>
</wa-dialog>

<wa-button>Open Dialog</wa-button>

<script>
  const dialog = document.querySelector('.dialog-width');
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener('click', () => dialog.open = true);
</script>
```

### Scrolling

By design, a dialog's height will never exceed that of the viewport. As such, dialogs will not scroll with the page ensuring the header and footer are always accessible to the user.

```html {.example}
<wa-dialog label="Dialog" with-header with-footer class="dialog-scrolling">
  <div style="height: 150vh; border: dashed 2px var(--wa-color-surface-border); padding: 0 1rem;">
    <p>Scroll down and give it a try! 👇</p>
  </div>
  <wa-button slot="footer" variant="brand" data-dialog="close">Close</wa-button>
</wa-dialog>

<wa-button>Open Dialog</wa-button>

<script>
  const dialog = document.querySelector('.dialog-scrolling');
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener('click', () => dialog.open = true);
</script>
```

### Header Actions

The header shows a functional close button by default. You can use the `header-actions` slot to add additional [icon buttons](/docs/components/icon-button) if needed.

```html {.example}
<wa-dialog label="Dialog" with-header with-footer class="dialog-header-actions">
  <wa-icon-button class="new-window" slot="header-actions" name="arrow-up-right-from-square" variant="solid"></wa-icon-button>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <wa-button slot="footer" variant="brand" data-dialog="close">Close</wa-button>
</wa-dialog>

<wa-button>Open Dialog</wa-button>

<script>
  const dialog = document.querySelector('.dialog-header-actions');
  const openButton = dialog.nextElementSibling;
  const newWindowButton = dialog.querySelector('.new-window');

  openButton.addEventListener('click', () => dialog.open = true);
  newWindowButton.addEventListener('click', () => window.open(location.href));
</script>
```

### Light Dismissal

If you want the dialog to close when the user clicks on the overlay, add the `light-dismiss` attribute.

```html {.example}
<wa-dialog label="Dialog" light-dismiss with-header with-footer class="dialog-light-dismiss">
  This dialog will close when you click on the overlay.
  <wa-button slot="footer" variant="brand" data-dialog="close">Close</wa-button>
</wa-dialog>

<wa-button>Open Dialog</wa-button>

<script>
  const dialog = document.querySelector('.dialog-light-dismiss');
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener('click', () => dialog.open = true);
</script>
```

### Preventing the Dialog from Closing

By default, dialogs will close when the user clicks the close button, clicks the overlay, or presses the [[Escape]] key. In most cases, the default behavior is the best behavior in terms of UX. However, there are situations where this may be undesirable, such as when data loss will occur.

To keep the dialog open in such cases, you can cancel the `wa-hide` event. When canceled, the dialog will remain open and pulse briefly to draw the user's attention to it.

You can use `event.detail.source` to determine which element triggered the request to close. This example prevents the dialog from closing when the overlay is clicked, but allows the close button or [[Escape]] to dismiss it.

```html {.example}
<wa-dialog label="Dialog" with-header with-footer class="dialog-deny-close">
  This dialog will only close when you click the button below.
  <wa-button slot="footer" variant="brand" data-dialog="close">Only this button will close it</wa-button>
</wa-dialog>

<wa-button>Open Dialog</wa-button>

<script>
  const dialog = document.querySelector('.dialog-deny-close');
  const openButton = dialog.nextElementSibling;
  const closeButton = dialog.querySelector('wa-button[slot="footer"]');

  openButton.addEventListener('click', () => dialog.open = true);

  // Prevent the dialog from closing unless the close button was clicked
  dialog.addEventListener('wa-hide', event => {
    if (event.detail.source !== closeButton) {
      event.preventDefault();
    }
  });
</script>
```

### Setting Initial Focus

To give focus to a specific element when the dialog opens, use the `autofocus` attribute.

```html {.example}
<wa-dialog label="Dialog" with-header with-footer class="dialog-focus">
  <wa-input autofocus placeholder="I will have focus when the dialog is opened"></wa-input>
  <wa-button slot="footer" variant="brand" data-dialog="close">Close</wa-button>
</wa-dialog>

<wa-button>Open Dialog</wa-button>

<script>
  const dialog = document.querySelector('.dialog-focus');
  const input = dialog.querySelector('wa-input');
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener('click', () => dialog.open = true);
</script>
```
