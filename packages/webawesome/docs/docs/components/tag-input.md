---
title: Tag Input
layout: component
category: Forms
synonyms:
  - chip input
  - token input
  - multi-value input
  - keyword input
use-cases:
  - keyword tags
  - email recipients
  - skills list
  - labels
---

```html {.example}
<wa-tag-input label="Keywords" placeholder="Add a keyword" value="design, accessibility"></wa-tag-input>
```

```html {.example .anatomy-only}
<wa-tag-input
  label="Recipients"
  hint="Press Enter or type a comma to add another."
  value="ada@example.com, grace@example.com"
  with-clear
>
  <wa-icon slot="start" name="envelope"></wa-icon>
</wa-tag-input>
```

:::info
This component works with standard `<form>` elements. See [form controls](/docs/form-controls) for form submission and client-side validation.
:::

## Examples

### Label

Use the `label` attribute to give the tag input an accessible label. For labels that contain HTML, use the `label` slot instead.

```html {.example}
<wa-tag-input label="Skills"></wa-tag-input>
```

### Hint

Add a descriptive hint with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html {.example}
<wa-tag-input label="Skills" hint="Press Enter or type a comma after each skill."></wa-tag-input>
```

### Placeholder

Use the `placeholder` attribute to show prompt text in the text box. The placeholder is hidden once the maximum number of tags is reached.

```html {.example}
<wa-tag-input label="Tags" placeholder="Add a tag"></wa-tag-input>
```

### Initial Value

Use the `value` attribute to start with a list of tags. Separate each tag with the delimiter, a comma by default.

```html {.example}
<wa-tag-input label="Toppings" value="Mushrooms, Olives, Peppers"></wa-tag-input>
```

:::info
Framework users can bind directly to the `value` property, an array of strings.
:::

### Delimiter

Typing a delimiter character adds the text before it as a tag, and pasted text is split on it. Use the `delimiter` attribute to change the character. Each character in the string is treated as a separate delimiter. Set it to an empty string so only <kbd>Enter</kbd> adds a tag.

```html {.example}
<div class="wa-stack">
  <wa-tag-input label="Space-separated" delimiter=" " placeholder="Type a word and a space"></wa-tag-input>
  <wa-tag-input label="Commas or semicolons" delimiter=",;" placeholder="Type a value and , or ;"></wa-tag-input>
  <wa-tag-input label="Enter only" delimiter="" placeholder="Type a value and press Enter"></wa-tag-input>
</div>
```

### Clearable

Add the `with-clear` attribute to show a button that removes every tag at once.

```html {.example}
<wa-tag-input label="Tickers" value="AAPL, MSFT, NVDA" with-clear></wa-tag-input>
```

### Max Tags

Use the `max-tags` attribute to cap the number of tags. Once the limit is reached, no more tags can be added until one is removed.

```html {.example}
<wa-tag-input label="Top three" hint="Choose up to three." max-tags="3" placeholder="Add a favorite"></wa-tag-input>
```

### Duplicates

Duplicate tags are ignored by default. Add the `allow-duplicates` attribute to let the same value appear more than once.

```html {.example}
<wa-tag-input label="Rolls" allow-duplicates placeholder="Roll again"></wa-tag-input>
```

### Appearance

Use the `appearance` attribute to change the tag input's visual style.

```html {.example}
<div class="wa-stack">
  <wa-tag-input appearance="outlined" value="Outlined" label="Outlined"></wa-tag-input>
  <wa-tag-input appearance="filled" value="Filled" label="Filled"></wa-tag-input>
  <wa-tag-input appearance="filled-outlined" value="Filled outlined" label="Filled outlined"></wa-tag-input>
</div>
```

### Pill

Use the `pill` attribute to give the tag input and its tags rounded edges.

```html {.example}
<wa-tag-input label="Interests" value="Hiking, Chess" pill></wa-tag-input>
```

### Size

Use the `size` attribute to change the tag input's size. The tags scale with it.

```html {.example}
<div class="wa-stack">
  <wa-tag-input size="xs" label="Extra small" value="Extra small"></wa-tag-input>
  <wa-tag-input size="s" label="Small" value="Small"></wa-tag-input>
  <wa-tag-input size="m" label="Medium" value="Medium"></wa-tag-input>
  <wa-tag-input size="l" label="Large" value="Large"></wa-tag-input>
  <wa-tag-input size="xl" label="Extra large" value="Extra large"></wa-tag-input>
</div>
```

### Disabled

Use the `disabled` attribute to disable a tag input.

```html {.example}
<wa-tag-input label="Assignees" value="Ada, Grace" disabled></wa-tag-input>
```

### Readonly

Use the `readonly` attribute to show tags that can't be changed. Unlike `disabled`, a readonly tag input stays focusable and its value is still submitted with the form.

```html {.example}
<wa-tag-input label="Roles" value="Owner, Maintainer" readonly></wa-tag-input>
```

### Start & End Decorations

Use the `start` and `end` slots to add presentational elements like `<wa-icon>` within the tag input.

```html {.example}
<div class="wa-stack">
  <wa-tag-input label="Recipients" placeholder="Add an email">
    <wa-icon slot="start" name="envelope"></wa-icon>
  </wa-tag-input>
  <wa-tag-input label="Keywords" placeholder="Add a keyword">
    <wa-icon slot="start" name="tag"></wa-icon>
    <wa-icon slot="end" name="circle-info"></wa-icon>
  </wa-tag-input>
</div>
```

### Validation

Add the `required` attribute to require at least one tag. Use the `min-tags` and `max-tags` attributes to validate the number of tags. `max-tags` also prevents adding more.

```html {.example}
<form class="tag-input-validation">
  <wa-tag-input
    name="tags"
    label="Tags"
    hint="Add between two and five tags."
    min-tags="2"
    max-tags="5"
    required
  ></wa-tag-input>
  <br />
  <wa-button appearance="filled" type="submit">Submit</wa-button>
  <wa-button type="reset">Reset</wa-button>
</form>

<script type="module">
  const form = document.querySelector('.tag-input-validation');

  form.addEventListener('submit', event => {
    event.preventDefault();
    alert(`Submitted: ${new FormData(form).getAll('tags').join(', ')}`);
  });
</script>
```

### Custom Validity

Use the `setCustomValidity()` method to set a custom validation message. This will prevent the form from submitting and make the browser display the error message you provide. To clear the error, call this function with an empty string.

```html {.example}
<form class="tag-input-custom-validity">
  <wa-tag-input
    name="emails"
    label="Invite"
    hint="Every tag must be an email address."
    placeholder="name@example.com"
  ></wa-tag-input>
  <br />
  <wa-button appearance="filled" type="submit">Send invites</wa-button>
</form>

<script type="module">
  const form = document.querySelector('.tag-input-custom-validity');
  const tagInput = form.querySelector('wa-tag-input');

  tagInput.addEventListener('change', () => {
    const invalid = tagInput.value.filter(tag => !tag.includes('@'));
    tagInput.setCustomValidity(invalid.length ? `Not an email address: ${invalid.join(', ')}` : '');
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    alert('Invites sent');
  });
</script>
```

### Rejecting Tags

The `wa-create` event fires before typed text becomes a tag. Call `event.preventDefault()` to reject it, for example to enforce a format.

```html {.example}
<wa-tag-input
  class="tag-input-reject"
  label="Usernames"
  hint="Letters, numbers, and underscores only."
  placeholder="Add a username"
></wa-tag-input>

<script type="module">
  const tagInput = document.querySelector('.tag-input-reject');

  tagInput.addEventListener('wa-create', event => {
    if (!/^\w+$/.test(event.detail.inputValue)) {
      event.preventDefault();
    }
  });
</script>
```

### Reacting to Changes

Listen for the `change` event to respond when a tag is added or removed. The `value` property holds the current list.

```html {.example}
<div class="tag-input-changes">
  <wa-tag-input label="Labels" value="bug, help wanted"></wa-tag-input>
  <p>Labels: <code class="output">bug, help wanted</code></p>
</div>

<script type="module">
  const container = document.querySelector('.tag-input-changes');
  const tagInput = container.querySelector('wa-tag-input');
  const output = container.querySelector('.output');

  tagInput.addEventListener('change', () => {
    output.textContent = tagInput.value.join(', ') || '(none)';
  });
</script>
```

### Customizing

Use [CSS parts](#css-parts) to style the tags and the text box.

```html {.example}
<wa-tag-input class="tag-input-styled" label="Genres" value="Jazz, Ambient, Techno"></wa-tag-input>

<style>
  .tag-input-styled::part(tag) {
    background-color: var(--wa-color-brand-fill-quiet);
    border-color: var(--wa-color-brand-border-quiet);
    color: var(--wa-color-brand-on-quiet);
  }

  .tag-input-styled::part(tag__remove-button) {
    color: var(--wa-color-brand-on-quiet);
  }
</style>
```

## Accessibility Considerations

The tags are exposed to assistive technology as a list, and each tag's remove button is labeled. A focused tag carries a hidden description explaining that <kbd>Backspace</kbd> or <kbd>Delete</kbd> removes it. Additions, removals, rejected duplicates, and clearing all tags are announced to screen readers. Always provide a label with the `label` attribute or slot; without one, the text box has no accessible name.

Tags are reachable with the arrow keys rather than <kbd>Tab</kbd>, so the control takes a single tab stop:

| Key                                 | Behavior                                                                                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| <kbd>Enter</kbd>                    | Adds the typed text as a tag. With an empty text box, submits the form.                                                                    |
| Delimiter (<kbd>,</kbd> by default) | Adds the text before it as a tag                                                                                                           |
| <kbd>Backspace</kbd>                | With an empty text box, removes the last tag. On a focused tag, removes it and focuses the previous one.                                   |
| <kbd>Delete</kbd>                   | On a focused tag, removes it and focuses the next one                                                                                      |
| <kbd>←</kbd> <kbd>→</kbd>           | From an empty text box, <kbd>←</kbd> focuses the last tag. Moves between tags, and <kbd>→</kbd> from the last tag returns to the text box. |
| <kbd>Home</kbd> <kbd>End</kbd>      | On a focused tag, <kbd>Home</kbd> focuses the first tag and <kbd>End</kbd> returns to the text box                                         |
| <kbd>Escape</kbd>                   | Clears the typed text. On a focused tag, returns to the text box.                                                                          |
