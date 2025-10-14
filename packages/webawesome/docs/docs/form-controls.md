---
title: Form Controls
description: Using Web Awesome form controls.
layout: page-outline
---

Web Awesome form controls are form-associated custom elements, meaning they will submit with forms just like native `<form>` controls. They also support constraint validation, which is the platform's version of client-side form validation.

## Constraint Validation

Client-side validation can be enabled through the browser's [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation) for Web Awesome form controls. You can activate it using attributes such as `required`, `pattern`, `minlength`, `maxlength`, etc. Web Awesome implements many of the same attributes as native form controls, but check the documentation for a list of supported properties for each component.

If you don't want to use client-side validation, you can suppress this behavior by adding `novalidate` to the surrounding `<form>` element.

:::info
If this syntax looks unfamiliar, don't worry! Most of what you're learning on this page is platform knowledge that applies to regular form controls, too.
:::

:::warning
Client-side validation can be used to improve the UX of forms, but it is not a replacement for server-side validation. **You should always validate and sanitize user input on the server!**
:::

### Required Fields

To make a field required, use the `required` attribute. Required fields will automatically receive an asterisk after their labels. The form will not be submitted if a required field is incomplete.

```html {.example}
<form class="input-validation-required">
  <wa-input name="name" label="Name" required></wa-input>
  <br />
  <wa-select label="Favorite Animal" with-clear required>
    <wa-option value="birds">Birds</wa-option>
    <wa-option value="cats">Cats</wa-option>
    <wa-option value="dogs">Dogs</wa-option>
    <wa-option value="other">Other</wa-option>
  </wa-select>
  <br />
  <wa-textarea name="comment" label="Comment" required></wa-textarea>
  <br />
  <wa-checkbox required>Check me before submitting</wa-checkbox>
  <br /><br />
  <wa-button type="submit" variant="brand">Submit</wa-button>
</form>

<script type="module">
  const form = document.querySelector('.input-validation-required');

  // Wait for controls to be defined before attaching form listeners
  await Promise.all([
    customElements.whenDefined('wa-button'),
    customElements.whenDefined('wa-checkbox'),
    customElements.whenDefined('wa-input'),
    customElements.whenDefined('wa-option'),
    customElements.whenDefined('wa-select'),
    customElements.whenDefined('wa-textarea'),
  ]).then(() => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      alert('All fields are valid!');
    });
  });
</script>
```

### Input Patterns

To restrict a value to a specific [pattern](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern), use the `pattern` attribute. This example only allows the letters A-Z, so the form will not submit if a number or symbol is entered. This only works with `<wa-input>` elements.

```html {.example}
<form class="input-validation-pattern">
  <wa-input name="letters" required label="Letters" pattern="[A-Za-z]+"></wa-input>
  <br />
  <wa-button type="submit" variant="brand">Submit</wa-button>
  <wa-button type="reset" variant="neutral">Reset</wa-button>
</form>

<script type="module">
  const form = document.querySelector('.input-validation-pattern');

  // Wait for controls to be defined before attaching form listeners
  await Promise.all([customElements.whenDefined('wa-button'), customElements.whenDefined('wa-input')]).then(() => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      alert('All fields are valid!');
    });
  });
</script>
```

### Input Types

Some input types will automatically trigger constraints, such as `email` and `url`.

```html {.example}
<form class="input-validation-type">
  <wa-input type="email" label="Email" placeholder="you@example.com" required></wa-input>
  <br />
  <wa-input type="url" label="URL" placeholder="https://example.com/" required></wa-input>
  <br />
  <wa-button type="submit" variant="brand">Submit</wa-button>
  <wa-button type="reset" variant="neutral">Reset</wa-button>
</form>

<script type="module">
  const form = document.querySelector('.input-validation-type');

  // Wait for controls to be defined before attaching form listeners
  await Promise.all([customElements.whenDefined('wa-button'), customElements.whenDefined('wa-input')]).then(() => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      alert('All fields are valid!');
    });
  });
</script>
```

### Custom Error Messages

To create a custom validation error, pass a non-empty string to the `setCustomValidity()` method. This will override any existing validation constraints. The form will not be submitted when a custom validity is set and the browser will show a validation error when the containing form is submitted. To make the input valid again, call `setCustomValidity()` again with an empty string.

```html {.example}
<form class="input-validation-custom">
  <wa-input label="Type webawesome" required></wa-input>
  <br />
  <wa-button type="submit" variant="brand">Submit</wa-button>
  <wa-button type="reset" variant="neutral">Reset</wa-button>
</form>

<script type="module">
  const form = document.querySelector('.input-validation-custom');
  const input = form.querySelector('wa-input');

  // Wait for controls to be defined before attaching form listeners
  await Promise.all([customElements.whenDefined('wa-button'), customElements.whenDefined('wa-input')]).then(() => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      alert('All fields are valid!');
    });

    input.addEventListener('input', () => {
      if (input.value === 'webawesome') {
        input.setCustomValidity('');
      } else {
        input.setCustomValidity("Hey, you're supposed to type 'webawesome' before submitting this!");
      }
    });
  });
</script>
```

:::info
Custom validation can be applied to any form control that supports the `setCustomValidity()` method. It is not limited to inputs and textareas.
:::

## Custom Validation Styles

Due to the many ways form controls are used, Web Awesome doesn't provide out of the box validation styles for form controls as part of its default theme.

Instead, the following [custom states](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/states) will be applied to reflect a control's validity as users interact with it. You can use them to create custom styles for any of the validation states you're interested in.

- `:state(required)` - the form control is required
- `:state(optional)` - the form control is optional
- `:state(invalid)` - the form control is invalid
- `:state(valid)` - the form control is valid
- `:state(user-invalid)` - the form control is invalid and the user has interacted with it
- `:state(user-valid)` - the form control is valid and the user has interacted with it

These custom states work alongside the browser's built-in pseudo classes for validation: [`:required`](https://developer.mozilla.org/en-US/docs/Web/CSS/:required), [`:optional`](https://developer.mozilla.org/en-US/docs/Web/CSS/:optional), [`:invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:invalid), [`:valid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:valid), [`:user-invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid), and [`:user-valid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-valid).
