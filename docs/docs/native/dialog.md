---
title: Dialog
description: 'Dialog styles apply your Web Awesome theme to the HTML `<dialog>` element. Dialogs, also called "modals", appear above the page and interrupt a user''s focus.'
tags: apps
icon: dialog
elements:
  "<dialog>":  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
component: dialog
---

```html {.example}
<dialog id="dialog-overview">
	<header>
		<h2>Dialog</h2>
		<button data-dialog="close" class="wa-plain">✖️</button>
	</header>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  <footer>
	<button class="wa-brand" data-dialog="close">Close</button>
  </footer>
</dialog>

<button>Open Dialog</button>

<script>
  const dialog = document.querySelector('#dialog-overview');
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener('click', () => dialog.showModal());
  dialog.addEventListener('click', event => {
	if (event.target.closest('[data-dialog="close"]')) {
		dialog.close();
	}
  });
</script>
```
