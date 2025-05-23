---
title: Dialog
description: 'Dialog styles apply your Web Awesome theme to the HTML `<dialog>` element. Dialogs, also called "modals", appear above the page and interrupt a user''s focus.'
tags: apps
icon: dialog
elements:
  "<dialog>":  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
component: dialog
file: styles/native/dialog.css
---

```html {.example}
<dialog id="dialog-overview">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
	<button type="button">Close</button>
</dialog>

<button>Open Dialog</button>

<script>
  const dialog = document.querySelector('#dialog-overview');
  const openButton = dialog.nextElementSibling;
  const closeButton = dialog.querySelector('button');

  openButton.addEventListener('click', () => dialog.showModal());
  closeButton.addEventListener('click', () => dialog.close());
</script>
```
