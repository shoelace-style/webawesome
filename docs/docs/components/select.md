---
title: Select
description: Selects allow you to choose items from a menu of predefined options.
tags: component
native: select
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

### Hint

Add descriptive hint to a select with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html {.example}
<wa-select label="Experience" hint="Please tell us your skill level.">
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

### Appearance

Use the `appearance` attribute to change the select's visual appearance.

```html {.example}
<wa-select appearance="filled">
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

### Suffix Icons

Use the `suffix` slot to append an icon to the control.

```html {.example}
<wa-select placeholder="Small" size="small" clearable>
  <wa-icon name="house" slot="suffix"></wa-icon>
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
<br />
<wa-select placeholder="Medium" size="medium" clearable>
  <wa-icon name="house" slot="suffix"></wa-icon>
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
<br />
<wa-select placeholder="Large" size="large" clearable>
  <wa-icon name="house" slot="suffix"></wa-icon>
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
  await customElements.whenDefined("wa-select")
  const select = document.querySelector('.custom-tag');
  await select.updateComplete

  select.getTag = (option, index) => {
    // Use the same icon used in wa-option
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

### Lazy loading options

Lazy loading options is very hard to get right. `<wa-select>` largely follows how a native `<select>` works.

Here are the following conditions:

- If a `<wa-select>` is created without any options, but is given a `value` attribute, its `value` will be `""`, and then when options are added, if any of the options have a value equal to the `<wa-select>` value, the value of the `<wa-select>` will equal that of the option.

EX: `<wa-select value="foo">` will have a value of `""` until `<wa-option value="foo">Foo</wa-option>` connects, at which point its value will become `"foo"` when submitting.

- If a `<wa-select multiple>` with an initial value has multiple values, but only some of the options are present, it will only respect the options that are present, and if a selected option is loaded in later, *AND* the value of the select has not changed via user interaction or direct property assignment, it will add the selected option to the form value and to the `.value` of the select.

This can be hard to conceptualize, so heres a fairly large example showing how lazy loaded options work with `<wa-select>` and `<wa-select multiple>` when given initial value attributes. Feel free to play around with it in a codepen.

```html {.example}
<form id="lazy-options-example">
  <div>
    <wa-select name="select-1" value="foo" label="Single select (with existing options)">
      <wa-option value="bar">Bar</wa-option>
      <wa-option value="baz">Baz</wa-option>
    </wa-select>
    <br>
    <wa-button type="button">Add "foo" option</wa-button>
  </div>

  <br>

  <div>
    <wa-select name="select-2" value="foo" label="Single select (with no existing options)">
    </wa-select>
    <br>
    <wa-button type="button">Add "foo" option</wa-button>
  </div>

  <br>

  <div>
    <wa-select name="select-3" value="foo bar baz" multiple label="Multiple Select (with existing options)">
      <wa-option value="bar">Bar</wa-option>
      <wa-option value="baz">Baz</wa-option>
    </wa-select>
    <br>
    <wa-button type="button">Add "foo" option</wa-button>
  </div>

  <br>

  <div>
    <wa-select name="select-4" value="foo" multiple label="Multiple Select (with no existing options)">
    </wa-select>
    <br>
    <wa-button type="button">Add "foo" option</wa-button>
  </div>

  <br><br>

  <div style="display: flex; gap: 16px;">
    <wa-button type="reset">Reset</wa-button>
    <wa-button type="submit" variant="brand">Show FormData</wa-button>
  </div>

  <br>

  <pre hidden><code id="lazy-options-example-form-data"></code></pre>

  <br>
</form>

<script type="module">
  function addFooOption(e) {
    const addFooButton = e.target.closest("wa-button[type='button']")
    if (!addFooButton) {
      return
    }
    const select = addFooButton.parentElement.querySelector("wa-select")

    if (select.querySelector("wa-option[value='foo']")) {
      // Foo already exists. no-op.
      return
    }

    const option = document.createElement("wa-option")
    option.setAttribute("value", "foo")
    option.innerText = "Foo"
    select.append(option)
  }

  function handleLazySubmit (event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const codeElement = document.querySelector("#lazy-options-example-form-data")

    const obj = {}
    for (const key of formData.keys()) {
      const val = formData.getAll(key).length > 1 ? formData.getAll(key) : formData.get(key)
      obj[key] = val
    }

    codeElement.textContent = JSON.stringify(obj, null, 2)

    const preElement = codeElement.parentElement
    preElement.removeAttribute("hidden")
  }

  const container = document.querySelector("#lazy-options-example")
  container.addEventListener("click", addFooOption)
  container.addEventListener("submit", handleLazySubmit)
</script>
```

<script type="module">
  //
  // TODO - remove once we switch to the Popover API
  //
  document.querySelectorAll('wa-code-demo [slot="preview"] wa-select').forEach(select => select.hoist = true);
</script>