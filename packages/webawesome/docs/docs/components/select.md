---
title: Select
description: Selects allow you to choose items from a menu of predefined options.
layout: component
category: Form Controls
---

```html {.example}
<wa-select>
  <wa-option value="">Option 1</wa-option>
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

Use the `with-clear` attribute to make the control clearable. The clear button only appears when an option is selected.

```html {.example}
<wa-select with-clear value="option-1">
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
<br />
<wa-select appearance="filled-outlined">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
<br />
<wa-select appearance="outlined">
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

To allow multiple options to be selected, use the `multiple` attribute. It's a good practice to use `with-clear` when this option is enabled. You can select multiple options by adding the `selected` attribute to individual options.

```html {.example}
<wa-select label="Select a Few" multiple with-clear>
  <wa-option value="option-1" selected>Option 1</wa-option>
  <wa-option value="option-2" selected>Option 2</wa-option>
  <wa-option value="option-3" selected>Option 3</wa-option>
  <wa-option value="option-4">Option 4</wa-option>
  <wa-option value="option-5">Option 5</wa-option>
  <wa-option value="option-6">Option 6</wa-option>
</wa-select>
```

:::info
Selecting multiple options may result in wrapping, causing the control to expand vertically. You can use the `max-options-visible` attribute to control the maximum number of selected options to show at once.
:::

### Setting Initial Values

Use the `selected` attribute on individual options to set the initial selection, similar to native HTML.

```html {.example}
<wa-select>
  <wa-option value="option-1" selected>Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
  <wa-option value="option-4">Option 4</wa-option>
</wa-select>
```

For multiple selections, apply it to all selected options.

```html {.example}
<wa-select multiple with-clear>
  <wa-option value="option-1" selected>Option 1</wa-option>
  <wa-option value="option-2" selected>Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
  <wa-option value="option-4">Option 4</wa-option>
</wa-select>
```

:::info
Framework users can bind directly to the `value` property for reactive data binding and form state management.
:::

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

Use the `size` attribute to change a select's size.

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

### Start & End Decorations

Use the `start` and `end` slots to add presentational elements like `<wa-icon>` within the combobox.

```html {.example}
<wa-select placeholder="Small" size="small" with-clear>
  <wa-icon slot="start" name="house" variant="solid"></wa-icon>
  <wa-icon slot="end" name="flag-checkered"></wa-icon>
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
<br />
<wa-select placeholder="Medium" size="medium" with-clear>
  <wa-icon slot="start" name="house" variant="solid"></wa-icon>
  <wa-icon slot="end" name="flag-checkered"></wa-icon>
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
<br />
<wa-select placeholder="Large" size="large" with-clear>
  <wa-icon slot="start" name="house" variant="solid"></wa-icon>
  <wa-icon slot="end" name="flag-checkered"></wa-icon>
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
```

### Custom Tags

When multiple options can be selected, you can provide custom tags by passing a function to the `getTag` property. Your function can return a string of HTML, a [Lit Template](https://lit.dev/docs/templates/overview/), or an [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement). The `getTag()` function will be called for each option. The first argument is an `<wa-option>` element and the second argument is the tag's index (its position in the tag list).

Remember that custom tags are rendered in a shadow root. To style them, you can use the `style` attribute in your template or you can add your own [parts](/docs/customizing/#css-parts) and target them with the [`::part()`](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) selector.

```html {.example}
<wa-select placeholder="Select one" multiple with-clear class="custom-tag">
  <wa-option value="email" selected>
    <wa-icon slot="start" name="envelope" variant="solid"></wa-icon>
    Email
  </wa-option>
  <wa-option value="phone" selected>
    <wa-icon slot="start" name="phone" variant="solid"></wa-icon>
    Phone
  </wa-option>
  <wa-option value="chat">
    <wa-icon slot="start" name="comment" variant="solid"></wa-icon>
    Chat
  </wa-option>
</wa-select>

<script type="module">
  await customElements.whenDefined('wa-select');
  const select = document.querySelector('.custom-tag');
  await select.updateComplete;

  select.getTag = (option, index) => {
    // Use the same icon used in wa-option
    const name = option.querySelector('wa-icon[slot="start"]').name;

    // You can return a string, a Lit Template, or an HTMLElement here
    // Important: include data-value so the tag can be removed properly!
    return `
      <wa-tag with-remove data-value="${option.value}">
        <wa-icon name="${name}"></wa-icon>
        ${option.label}
      </wa-tag>
    `;
  };
</script>
```

:::warning
Be sure you trust the content you are outputting! Passing unsanitized user input to `getTag()` can result in XSS vulnerabilities.
:::

:::info
When using custom tags with `with-remove`, you must include the `data-value` attribute set to the option's value. This allows the select to identify which option to deselect when the tag's remove button is clicked.
:::

### Lazy loading options

Lazy loading options works similarly to native `<select>` elements. The select component handles various scenarios intelligently:

#### Basic lazy loading scenarios:

- **Empty select with value**: If a `<wa-select>` is created without any options but given a `value` attribute, its value will be `""` initially. When options are added later, if any option has a value matching the select's value attribute, the select's value will update to match.

- **Multiple select with partial options**: If a `<wa-select multiple>` has an initial value with multiple options, but only some options are present in the DOM, it will respect only the available options. When additional selected options are loaded later (and the user hasn't changed the selection), those options will be automatically added to the selection.

Here's a comprehensive example showing different lazy loading scenarios:

```html {.example}
<form id="lazy-options-example">
  <div>
    <wa-select name="select-1" value="foo" label="Single select (with existing options)">
      <wa-option value="bar">Bar</wa-option>
      <wa-option value="baz">Baz</wa-option>
    </wa-select>
    <br />
    <wa-button type="button">Add "foo" option</wa-button>
  </div>

  <br />

  <div>
    <wa-select name="select-2" value="foo" label="Single select (with no existing options)"> </wa-select>
    <br />
    <wa-button type="button">Add "foo" option</wa-button>
  </div>

  <br />

  <div>
    <wa-select name="select-3" multiple label="Multiple Select (with existing selected options)">
      <wa-option value="bar" selected>Bar</wa-option>
      <wa-option value="baz" selected>Baz</wa-option>
    </wa-select>
    <br />
    <wa-button type="button">Add "foo" option (selected)</wa-button>
  </div>

  <br />

  <div>
    <wa-select name="select-4" value="foo" multiple label="Multiple Select (with no existing options)"> </wa-select>
    <br />
    <wa-button type="button">Add "foo" option</wa-button>
  </div>

  <br /><br />

  <div style="display: flex; gap: 16px;">
    <wa-button type="reset">Reset</wa-button>
    <wa-button type="submit" variant="brand">Show FormData</wa-button>
  </div>

  <br />

  <pre hidden><code id="lazy-options-example-form-data"></code></pre>

  <br />
</form>

<script type="module">
  function addFooOption(e) {
    const addFooButton = e.target.closest("wa-button[type='button']");
    if (!addFooButton) {
      return;
    }
    const select = addFooButton.parentElement.querySelector('wa-select');

    if (select.querySelector("wa-option[value='foo']")) {
      // Foo already exists. no-op.
      return;
    }

    const option = document.createElement('wa-option');
    option.setAttribute('value', 'foo');
    option.selected = true;
    option.innerText = 'Foo';

    // For the multiple select with existing selected options, make the new option selected
    if (select.getAttribute('name') === 'select-3') {
      option.selected = true;
    }

    select.append(option);
  }

  function handleLazySubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const codeElement = document.querySelector('#lazy-options-example-form-data');

    const obj = {};
    for (const key of formData.keys()) {
      const val = formData.getAll(key).length > 1 ? formData.getAll(key) : formData.get(key);
      obj[key] = val;
    }

    codeElement.textContent = JSON.stringify(obj, null, 2);

    const preElement = codeElement.parentElement;
    preElement.removeAttribute('hidden');
  }

  const container = document.querySelector('#lazy-options-example');
  container.addEventListener('click', addFooOption);
  container.addEventListener('submit', handleLazySubmit);
</script>
```

:::info
The key principle is that the select component prioritizes user interactions and explicit selections over programmatic changes, ensuring a predictable user experience even with dynamically loaded content.
:::
