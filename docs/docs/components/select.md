---
title: Select
description: Selects allow you to choose items from a menu of predefined options.
layout: component
---

```html {.example}
<wa-select>
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
  <wa-option value="option-4">Option 4</wa-option>
  <wa-option value="option-5">Option 5</wa-option>
  <wa-option value="option-6">Option 6</wa-option>
</wa-select>
```

:::info
This component works with standard `<form>` elements. Please refer to the section on [form controls](/docs/form-controls) to learn more about form submission and client-side validation.
:::

## Examples

### Labels

Use the `label` attribute to give the select an accessible label. For labels that contain HTML, use the `label` slot instead.

```html {.example}
<wa-select label="Select one">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
```

### Help Text

Add descriptive help text to a select with the `help-text` attribute. For help texts that contain HTML, use the `help-text` slot instead.

```html {.example}
<wa-select label="Experience" help-text="Please tell us your skill level.">
  <wa-option value="1">Novice</wa-option>
  <wa-option value="2">Intermediate</wa-option>
  <wa-option value="3">Advanced</wa-option>
</wa-select>
```

### Placeholders

Use the `placeholder` attribute to add a placeholder.

```html {.example}
<wa-select placeholder="Select one">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
```

### Clearable

Use the `clearable` attribute to make the control clearable. The clear button only appears when an option is selected.

```html {.example}
<wa-select clearable value="option-1">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
```

### Filled Selects

Add the `filled` attribute to draw a filled select.

```html {.example}
<wa-select filled>
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
```

### Pill

Use the `pill` attribute to give selects rounded edges.

```html {.example}
<wa-select pill>
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
```

### Disabled

Use the `disabled` attribute to disable a select.

```html {.example}
<wa-select placeholder="Disabled" disabled>
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
```

### Multiple

To allow multiple options to be selected, use the `multiple` attribute. It's a good practice to use `clearable` when this option is enabled. To set multiple values at once, set `value` to a space-delimited list of values.

```html {.example}
<wa-select label="Select a Few" value="option-1 option-2 option-3" multiple clearable>
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
  <wa-option value="option-4">Option 4</wa-option>
  <wa-option value="option-5">Option 5</wa-option>
  <wa-option value="option-6">Option 6</wa-option>
</wa-select>
```

:::info
Note that multi-select options may wrap, causing the control to expand vertically. You can use the `max-options-visible` attribute to control the maximum number of selected options to show at once.
:::

### Setting Initial Values

Use the `value` attribute to set the initial selection.

When using `multiple`, the `value` _attribute_ uses space-delimited values to select more than one option. Because of this, `<wa-option>` values cannot contain spaces. If you're accessing the `value` _property_ through Javascript, it will be an array.

```html {.example}
<wa-select value="option-1 option-2" multiple clearable>
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
  <wa-option value="option-4">Option 4</wa-option>
</wa-select>
```

### Grouping Options

Use `<wa-divider>` to group listbox items visually. You can also use `<small>` to provide labels, but they won't be announced by most assistive devices.

```html {.example}
<wa-select>
  <small>Section 1</small>
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
  <wa-divider></wa-divider>
  <small>Section 2</small>
  <wa-option value="option-4">Option 4</wa-option>
  <wa-option value="option-5">Option 5</wa-option>
  <wa-option value="option-6">Option 6</wa-option>
</wa-select>
```

### Sizes

Use the `size` attribute to change a select's size. Note that size does not apply to listbox options.

```html {.example}
<wa-select placeholder="Small" size="small">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>

<br />

<wa-select placeholder="Medium" size="medium">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>

<br />

<wa-select placeholder="Large" size="large">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
```

### Placement

The preferred placement of the select's listbox can be set with the `placement` attribute. Note that the actual position may vary to ensure the panel remains in the viewport. Valid placements are `top` and `bottom`.

```html {.example}
<wa-select placement="top">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
```

### Prefix Icons

Use the `prefix` slot to prepend an icon to the control.

```html {.example}
<wa-select placeholder="Small" size="small" clearable>
  <wa-icon slot="prefix" name="house" variant="solid"></wa-icon>
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
<br />
<wa-select placeholder="Medium" size="medium" clearable>
  <wa-icon slot="prefix" name="house" variant="solid"></wa-icon>
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
<br />
<wa-select placeholder="Large" size="large" clearable>
  <wa-icon slot="prefix" name="house" variant="solid"></wa-icon>
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
```

### Custom Tags

When multiple options can be selected, you can provide custom tags by passing a function to the `getTag` property. Your function can return a string of HTML, a <a href="https://lit.dev/docs/templates/overview/">Lit Template</a>, or an [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement). The `getTag()` function will be called for each option. The first argument is an `<wa-option>` element and the second argument is the tag's index (its position in the tag list).

Remember that custom tags are rendered in a shadow root. To style them, you can use the `style` attribute in your template or you can add your own [parts](/docs/customizing/#css-parts) and target them with the [`::part()`](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) selector.

```html {.example}
<wa-select
  placeholder="Select one"
  value="email phone"
  multiple
  clearable
  class="custom-tag"
>
  <wa-option value="email">
    <wa-icon slot="prefix" name="envelope" variant="solid"></wa-icon>
    Email
  </wa-option>
  <wa-option value="phone">
    <wa-icon slot="prefix" name="phone" variant="solid"></wa-icon>
    Phone
  </wa-option>
  <wa-option value="chat">
    <wa-icon slot="prefix" name="comment" variant="solid"></wa-icon>
    Chat
  </wa-option>
</wa-select>

<script type="module">
  const select = document.querySelector('.custom-tag');

  select.getTag = (option, index) => {
    // Use the same icon used in the <wa-option>
    const name = option.querySelector('wa-icon[slot="prefix"]').name;

    // You can return a string, a Lit Template, or an HTMLElement here
    return `
      <wa-tag removable>
        <wa-icon name="${name}" style="padding-inline-end: .5rem;"></wa-icon>
        ${option.getTextLabel()}
      </wa-tag>
    `;
  };
</script>
```

:::warning
Be sure you trust the content you are outputting! Passing unsanitized user input to `getTag()` can result in XSS vulnerabilities.
:::