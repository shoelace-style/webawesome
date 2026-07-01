---
title: Select
layout: component
category: Forms
synonyms:
  - dropdown select
  - combobox
  - picker
  - chooser
  - pulldown
use-cases:
  - form select
  - option picker
  - single select
  - multi select
---

```html {.example}
<wa-select label="Coffee order" placeholder="How do you take it?">
  <wa-option value="espresso">Espresso</wa-option>
  <wa-option value="latte">Latte</wa-option>
  <wa-option value="cappuccino">Cappuccino</wa-option>
  <wa-option value="cold-brew">Cold brew</wa-option>
  <wa-option value="drip">Drip</wa-option>
</wa-select>
```

:::info
This component works with standard `<form>` elements. See [form controls](/docs/form-controls) for form submission and client-side validation.
:::

## Examples

### Labels

Use the `label` attribute to give the select an accessible label. For labels that contain HTML, use the `label` slot instead.

```html {.example}
<wa-select label="Country">
  <wa-option value="us">United States</wa-option>
  <wa-option value="ca">Canada</wa-option>
  <wa-option value="mx">Mexico</wa-option>
</wa-select>
```

### Hint

Add a descriptive hint with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html {.example}
<wa-select label="Experience" hint="Tell us how comfortable you are with the command line.">
  <wa-option value="1">Novice</wa-option>
  <wa-option value="2">Intermediate</wa-option>
  <wa-option value="3">Advanced</wa-option>
</wa-select>
```

### Placeholders

Use the `placeholder` attribute to show prompt text before a selection is made.

```html {.example}
<wa-select placeholder="Select one">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
```

### Appearance

Use the `appearance` attribute to change the select's visual style.

```html {.example}
<div class="wa-stack">
  <wa-select appearance="outlined" value="outlined">
    <wa-option value="outlined">outlined</wa-option>
  </wa-select>
  <wa-select appearance="filled" value="filled">
    <wa-option value="filled">filled</wa-option>
  </wa-select>
  <wa-select appearance="filled-outlined" value="filled-outlined">
    <wa-option value="filled-outlined">filled-outlined</wa-option>
  </wa-select>
</div>
```

### Pill

Use the `pill` attribute to give the select rounded edges.

```html {.example}
<wa-select pill placeholder="Select one">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
```

### Sizes

Use the `size` attribute to change a select's size.

```html {.example}
<div class="wa-stack">
  <wa-select size="xs" placeholder="Extra small">
    <wa-option value="option-1">Option 1</wa-option>
    <wa-option value="option-2">Option 2</wa-option>
  </wa-select>
  <wa-select size="s" placeholder="Small">
    <wa-option value="option-1">Option 1</wa-option>
    <wa-option value="option-2">Option 2</wa-option>
  </wa-select>
  <wa-select size="m" placeholder="Medium">
    <wa-option value="option-1">Option 1</wa-option>
    <wa-option value="option-2">Option 2</wa-option>
  </wa-select>
  <wa-select size="l" placeholder="Large">
    <wa-option value="option-1">Option 1</wa-option>
    <wa-option value="option-2">Option 2</wa-option>
  </wa-select>
  <wa-select size="xl" placeholder="Extra large">
    <wa-option value="option-1">Option 1</wa-option>
    <wa-option value="option-2">Option 2</wa-option>
  </wa-select>
</div>
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

### Clearable

Use the `with-clear` attribute to let people reset their choice. The clear button only appears once an option is selected.

```html {.example}
<wa-select with-clear value="option-1">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
```

### Multiple

To let people choose more than one option, add the `multiple` attribute. Pair it with `with-clear` so a long selection is easy to reset. Mark the initial selection with the `selected` attribute on individual options.

```html {.example}
<wa-select label="Notify me about" multiple with-clear>
  <wa-option value="mentions" selected>Mentions</wa-option>
  <wa-option value="replies" selected>Replies</wa-option>
  <wa-option value="reactions">Reactions</wa-option>
  <wa-option value="follows">New followers</wa-option>
  <wa-option value="releases">Releases</wa-option>
</wa-select>
```

:::info
<strong>Multiple selections can grow the control vertically.</strong><br />
Use the `max-options-visible` attribute to cap how many tags show at once before the rest collapse into a count.
:::

### Setting Initial Values

Use the `selected` attribute on individual options to set the initial selection, just like native HTML. For a multiple select, mark every option that should start selected.

```html {.example}
<wa-select label="Default branch">
  <wa-option value="main" selected>main</wa-option>
  <wa-option value="develop">develop</wa-option>
  <wa-option value="staging">staging</wa-option>
</wa-select>
```

:::info
Framework users can bind directly to the `value` property for reactive data binding and form state management.
:::

### Grouping Options

Use `<wa-divider>` to separate groups of options visually. You can also add `<small>` labels, but note that most assistive technologies won't announce them.

```html {.example}
<wa-select label="Add a language" placeholder="Select one">
  <small>Frontend</small>
  <wa-option value="ts">TypeScript</wa-option>
  <wa-option value="css">CSS</wa-option>
  <wa-divider></wa-divider>
  <small>Backend</small>
  <wa-option value="go">Go</wa-option>
  <wa-option value="rust">Rust</wa-option>
  <wa-option value="python">Python</wa-option>
</wa-select>
```

### Placement

Set the `placement` attribute to control where the listbox opens. Valid placements are `bottom` (default) and `top`; the actual position may flip to keep the panel in the viewport.

```html {.example}
<wa-select placement="top" placeholder="Opens upward">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
```

### Start & End Decorations

Use the `start` and `end` slots to add presentational elements such as `<wa-icon>` inside the combobox.

```html {.example}
<wa-select label="Destination" placeholder="Where to?" with-clear>
  <wa-icon slot="start" name="plane-departure" variant="solid"></wa-icon>
  <wa-option value="lax">Los Angeles</wa-option>
  <wa-option value="jfk">New York</wa-option>
  <wa-option value="nrt">Tokyo</wa-option>
</wa-select>
```

### Custom Tags

When multiple options can be selected, supply custom tags by passing a function to the `getTag` property. The function runs for each selected option and can return a string of HTML, a [Lit template](https://lit.dev/docs/templates/overview/), or an [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement). Its first argument is the `<wa-option>` element and its second is the tag's index.

Because custom tags render in a shadow root, style them with the `style` attribute in your template, or add your own [parts](/docs/usage/#css-parts) and target them with [`::part()`](https://developer.mozilla.org/en-US/docs/Web/CSS/::part).

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
    // Reuse the icon from the matching wa-option
    const name = option.querySelector('wa-icon[slot="start"]').name;

    // Return a string, a Lit Template, or an HTMLElement.
    // Include data-value so the tag can be removed properly.
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
<strong>Only pass content you trust to `getTag()`.</strong><br />
Unsanitized user input rendered into a tag can result in XSS vulnerabilities.
:::

:::info
When using custom tags with `with-remove`, include the `data-value` attribute set to the option's value so the select knows which option to deselect when the tag's remove button is clicked.
:::

### Lazy Loading Options

The select handles options that arrive after the initial render, similar to a native `<select>`:

- **Empty select with a value:** a `<wa-select>` created without options but given a `value` starts with an empty value. When an option whose value matches is added later, the select updates to match.
- **Multiple select with partial options:** a `<wa-select multiple>` with an initial value respects only the options present in the DOM. When the remaining selected options load later — and the user hasn't changed the selection — they're added automatically.

```html {.example}
<form id="lazy-options-example">
  <div>
    <wa-select name="select-1" value="foo" label="Single select (with existing options)">
      <wa-option value="bar">Bar</wa-option>
      <wa-option value="baz">Baz</wa-option>
    </wa-select>

    <wa-divider></wa-divider>

    <wa-button appearance="filled" type="button">Add "foo" option</wa-button>
  </div>

  <br />

  <div>
    <wa-select name="select-2" value="foo" label="Single select (with no existing options)"> </wa-select>

    <wa-divider></wa-divider>

    <wa-button appearance="filled" type="button">Add "foo" option</wa-button>
  </div>

  <br />

  <div>
    <wa-select name="select-3" multiple label="Multiple select (with existing selected options)">
      <wa-option value="bar" selected>Bar</wa-option>
      <wa-option value="baz" selected>Baz</wa-option>
    </wa-select>

    <wa-divider></wa-divider>

    <wa-button appearance="filled" type="button">Add "foo" option (selected)</wa-button>
  </div>

  <br />

  <div>
    <wa-select name="select-4" value="foo" multiple label="Multiple select (with no existing options)"> </wa-select>

    <wa-divider></wa-divider>

    <wa-button appearance="filled" type="button">Add "foo" option</wa-button>
  </div>

  <br /><br />

  <div style="display: flex; gap: 16px;">
    <wa-button appearance="filled" type="reset">Reset</wa-button>
    <wa-button appearance="filled" type="submit" variant="neutral">Show FormData</wa-button>
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

Throughout, the select prioritizes user interactions and explicit selections over programmatic changes, keeping behavior predictable even with dynamically loaded content.
