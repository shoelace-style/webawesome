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
<wa-textarea label="Feedback"></wa-textarea>
```

:::info
This component works with standard `<form>` elements. See [form controls](/docs/form-controls) for form submission and client-side validation.
:::

## Examples

### Labels

Use the `label` attribute to give the textarea an accessible label. For labels that contain HTML, use the `label` slot instead.

```html {.example}
<wa-textarea label="Comments"></wa-textarea>
```

### Hint

Add a descriptive hint to a textarea with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html {.example}
<wa-textarea label="Feedback" hint="Please tell us what you think."></wa-textarea>
```

### Placeholders

Use the `placeholder` attribute to add a placeholder.

```html {.example}
<wa-textarea label="Comments" placeholder="Share your thoughts"></wa-textarea>
```

### Appearance

Use the `appearance` attribute to change the textarea's visual appearance.

```html {.example}
<div class="wa-stack">
  <wa-textarea appearance="outlined" placeholder="outlined"></wa-textarea>
  <wa-textarea appearance="filled" placeholder="filled"></wa-textarea>
  <wa-textarea appearance="filled-outlined" placeholder="filled-outlined"></wa-textarea>
</div>
```

### Disabled

Use the `disabled` attribute to disable a textarea.

```html {.example}
<wa-textarea placeholder="Disabled" disabled></wa-textarea>
```

### Readonly

Use the `readonly` attribute to keep a value visible but uneditable. Unlike `disabled`, a readonly textarea stays focusable and its value is still submitted with the form.

```html {.example}
<wa-textarea label="Release notes" value="Fixed a handful of bugs and polished the edges." readonly></wa-textarea>
```

### Sizes

Use the `size` attribute to change a textarea's size.

```html {.example}
<div class="wa-stack">
  <wa-textarea size="xs" placeholder="Extra small"></wa-textarea>
  <wa-textarea size="s" placeholder="Small"></wa-textarea>
  <wa-textarea size="m" placeholder="Medium"></wa-textarea>
  <wa-textarea size="l" placeholder="Large"></wa-textarea>
  <wa-textarea size="xl" placeholder="Extra large"></wa-textarea>
</div>
```

### Rows

Use the `rows` attribute to change the number of text rows that show by default.

```html {.example}
<wa-textarea rows="2"></wa-textarea>
```

### Resize

Use the `resize` attribute to control how the user can resize the textarea.

| Mode                 | Behavior                                       | Best for                              |
| -------------------- | ---------------------------------------------- | ------------------------------------- |
| `vertical` (default) | Drag the bottom edge to change the height      | Most multi-line fields                |
| `none`               | Resizing is disabled                           | Fixed layouts where height must hold  |
| `horizontal`         | Drag the side edge to change the width         | Adjusting line length                 |
| `both`               | Drag the corner to change width and height     | Free-form editing                     |
| `auto`               | Grows to fit its content as the user types     | Inputs whose length varies a lot      |

Set `resize` to `auto` and the textarea grows to fit its content as the user types.

```html {.example}
<wa-textarea label="Comments" resize="auto"></wa-textarea>
```

### Character Count

Add the `with-count` attribute to show a character count below the textarea. When combined with `maxlength`, the count shows remaining characters instead.

```html {.example}
<div class="wa-stack">
  <wa-textarea label="Comments" hint="Share your thoughts with us" with-count></wa-textarea>
  <wa-textarea label="Bio" hint="Tell us a little about yourself" with-count maxlength="100"></wa-textarea>
</div>
```

:::info
<strong>The character count is announced to screen readers.</strong><br />
It's exposed through a live region so assistive technologies announce updates as the user types.
:::

### Setting Initial Values

Use the `value` attribute to set an initial value.

```html {.example}
<wa-textarea value="Write something awesome!"></wa-textarea>
```
