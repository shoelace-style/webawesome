---
title: Textarea
layout: component
category: Forms
synonyms:
  - text area
  - multiline input
  - text box
use-cases:
  - comment box
  - message input
  - description field
  - code input
---

```html {.example}
<wa-textarea label="Type somethin', will ya"></wa-textarea>
```

:::info
This component works with standard `<form>` elements. Please refer to the section on [form controls](/docs/form-controls) to learn more about form submission and client-side validation.
:::

## Examples

### Labels

Use the `label` attribute to give the textarea an accessible label. For labels that contain HTML, use the `label` slot instead.

```html {.example}
<wa-textarea label="Comments"></wa-textarea>
```

### Hint

Add descriptive hint to a textarea with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html {.example}
<wa-textarea label="Feedback" hint="Please tell us what you think."> </wa-textarea>
```

### Rows

Use the `rows` attribute to change the number of text rows that get shown.

```html {.example}
<wa-textarea rows="2"></wa-textarea>
```

### Placeholders

Use the `placeholder` attribute to add a placeholder.

```html {.example}
<wa-textarea placeholder="Type something"></wa-textarea>
```

### Appearance

Use the `appearance` attribute to change the textarea's visual appearance.

```html {.example}
<wa-textarea placeholder="Type something" appearance="filled"></wa-textarea><br />
<wa-textarea placeholder="Type something" appearance="filled-outlined"></wa-textarea><br />
<wa-textarea placeholder="Type something" appearance="outlined"></wa-textarea>
```

### Disabled

Use the `disabled` attribute to disable a textarea.

```html {.example}
<wa-textarea placeholder="Textarea" disabled></wa-textarea>
```

### Value

Use the `value` attribute to set an initial value.

```html {.example}
<wa-textarea value="Write something awesome!"></wa-textarea>
```

### Sizes

Use the `size` attribute to change a textarea's size.

```html {.example}
<wa-textarea placeholder="Extra Small" size="xs"></wa-textarea>
<br />
<wa-textarea placeholder="Small" size="s"></wa-textarea>
<br />
<wa-textarea placeholder="Medium" size="m"></wa-textarea>
<br />
<wa-textarea placeholder="Large" size="l"></wa-textarea>
<br />
<wa-textarea placeholder="Extra Large" size="xl"></wa-textarea>
```

### Prevent Resizing

By default, textareas can be resized vertically by the user. To prevent resizing, set the `resize` attribute to `none`.

```html {.example}
<wa-textarea resize="none"></wa-textarea>
```

### Expand with Content

Textareas will automatically resize to expand to fit their content when `resize` is set to `auto`.

```html {.example}
<wa-textarea resize="auto"></wa-textarea>
```

### Resize horizontal

Textareas can be made to resize horizontally when `resize` is set to `"horizontal"`

```html {.example}
<wa-textarea resize="horizontal"></wa-textarea>
```

### Resize both

Textareas can be made to resize both vertically and horizontally when `resize` is set to `"both"`

```html {.example}
<wa-textarea resize="both"></wa-textarea>
```

### Character Count

Add the `with-count` attribute to show a character count below the textarea. When combined with `maxlength`, the count shows remaining characters instead. The count is exposed to assistive technologies using a live region so screen readers can announce updates as the user types.

```html {.example}
<wa-textarea label="Comments" hint="Share your thoughts with us" with-count></wa-textarea>
<br />
<wa-textarea label="Bio" hint="Tell us a little about yourself" with-count maxlength="100"></wa-textarea>
```
