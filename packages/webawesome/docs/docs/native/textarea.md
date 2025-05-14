---
title: Textarea
description: Textareas collect data from the user and allow multiple lines of text.
tags: forms
icon: textarea
component: textarea
elements:
  "<textarea>": https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
file: styles/native/input.css
---

```html {.example}
<label>Textarea <textarea></textarea></label>
```

### Placeholders

Use the `placeholder` attribute to add a placeholder.

```html {.example}
<textarea placeholder="Type something"></textarea>
```

### Appearance

Use the [appearence utilities](/docs/utilities/appearance/) to change the textarea's visual appearance.

```html {.example}
<textarea placeholder="Type something" class="wa-filled"></textarea>
```

### Expand with Content

You can use `field-sizing: content` in [browsers that support it](https://caniuse.com/mdn-css_properties_field-sizing) to make the textarea grow as the user types:

```html {.example}
<textarea placeholder="Type something" style="field-sizing: content"></textarea>
```
