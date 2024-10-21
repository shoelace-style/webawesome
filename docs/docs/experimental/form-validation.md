---
title: Form Control Validation
description: TODO
layout: page
---

## Styling Validations

Adding the `wa-valid` or `wa-invalid` class to a form control will change its appearance. This is useful for applying validation styles to server-rendered form controls.

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
  <div>
    <h3>Valid</h3>
    <wa-input class="wa-valid" label="Name" help-text="Just a first name is fine" placeholder="Enter your name"></wa-input><br>
    <wa-select class="wa-valid" label="Choose one" help-text="Make a choice already">
      <wa-option>There can be only one!</wa-option>
      <wa-option>Well, maybe two is OK</wa-option>
    </wa-select>
    <wa-textarea class="wa-valid" label="Bio" help-text="Tell us about yourself" placeholder="Enter a bio"></wa-textarea><br>
    <wa-range class="wa-valid" value="50" label="Volume" help-text="Crank it up"></wa-range><br>
    <wa-checkbox class="wa-valid" checked>I am awesome</wa-checkbox><br>
    <wa-checkbox class="wa-valid">So am I</wa-checkbox><br><br>
    <wa-switch class="wa-valid" checked>Still awesome</wa-switch><br>
    <wa-switch class="wa-valid">More awesome</wa-switch><br><br>
    <wa-radio-group class="wa-valid" label="Select an option" name="a" value="1">
      <wa-radio value="1">Option 1</wa-radio>
      <wa-radio value="2">Option 2</wa-radio>
      <wa-radio value="3">Option 3</wa-radio>
    </wa-radio-group><br>
    <wa-button variant="brand">Submit Form</wa-button>
  </div>
  <div>
    <h3>Invalid</h3>
    <wa-input class="wa-invalid" label="Name" help-text="Just a first name is fine" placeholder="Enter your name"></wa-input><br>
    <wa-select class="wa-invalid" label="Choose one" help-text="Make a choice already">
      <wa-option>There can be only one!</wa-option>
      <wa-option>Well, maybe two is OK</wa-option>
    </wa-select>
    <wa-textarea class="wa-invalid" label="Bio" help-text="Tell us about yourself" placeholder="Enter a bio"></wa-textarea><br>
    <wa-range class="wa-invalid" value="50" label="Volume" help-text="Crank it up"></wa-range><br>
    <wa-checkbox class="wa-invalid" checked>I am awesome</wa-checkbox><br>
    <wa-checkbox class="wa-invalid">So am I</wa-checkbox><br><br>
    <wa-switch class="wa-invalid" checked>Still awesome</wa-switch><br>
    <wa-switch class="wa-invalid">More awesome</wa-switch><br><br>
    <wa-radio-group class="wa-invalid" label="Select an option" name="a" value="1">
      <wa-radio value="1">Option 1</wa-radio>
      <wa-radio value="2">Option 2</wa-radio>
      <wa-radio value="3">Option 3</wa-radio>
    </wa-radio-group><br>
    <wa-button variant="brand">Submit Form</wa-button>
  </div>
</div>

## Understanding Form Validations with Web Awesome

There are 2 types of errors attached to every instance of Web Awesome form control.

There are `server-error`s which will not affect a form's validation and will still allow a user to submit the form. Server errors are always present until cleared, either manually by doing `element.serverError = null` or by attempting to submit a form, regardless of the if the form passes / fails client validation. If you are using `requestSubmit()` to submit forms, its recommended you clear the serverErrors yourself.

- Forcing "user-invalid" and showing the client error

```js
el.hasInteracted = true // This makes the element `[data-wa-user-invalid]` or `:state(user-invalid)` in supported browsers.
el.showClientError = true // This makes the client error "visible"
```

- Escape hatch using attributes? `<wa-input use-native-validation>` (Not implemented)

- How to clear server errors prior to `requestSubmit`

```js
form.elements.forEach((el) => el.serverError = null)
form.requestSubmit(submitter)
```

The other type of error is `client-error`. Client errors *DO* affect form validation, and if a client error is present on a form control, it will prevent the form from submitting and fail validation. Client errors can be cleared either by doing `setCustomValidity("")` or by doing `el.customError = null`. Client errors will not prevent form submissions on both `disabled` or `readonly` elements.

- Styling the error validation: `wa-input::part(form-control-error-message) {}`

## Not implemented (yet) features

- Moving the validation around: `<wa-input error-placement="top | bottom">` (Not implemented)
- Slotting in error messages? `waInput.[server|client]Error = true | <wa-input [server|client]-error="">` and then show the "slotted" error?

(Not Implemented)
```html
<wa-input>
  <div slot="server-error"></div>
  <div slot="client-error"></div>
</wa-input>
```

### Mixed native and web awesome controls.

Web Awesome form controls will work seamlessly with native form controls. Do note, the first element that has a validation error will be the element that gets "focused". Here's an example below:

```html {.example}
Validating form with both native controls and web awesome form controls.

<form id="client-error-form">
  <wa-input name="email" server-error="I'm a server error" label="Email" required></wa-input>
  <br>
  <wa-input name="name" client-error="im a client error" label="Name" help-text="I am help text" required></wa-input>
  <br>
  <input required>
  <br><br>
  <wa-button type="submit">Submit</wa-button>
  <wa-button id="clear-client-error" type="button" appearance="outline">Clear custom client error</wa-button>
</form>
<script type="module">
document.querySelector("#clear-client-error").addEventListener("click", () => {
  const form = document.querySelector("#client-error-form");
  [...form.elements].forEach((el) => el.clientError = null)
})
</script>
```

And here's another example with the native control first showing its "popup" form validation thats native to the platform.

```html {.example}
Validate form with native controls.
<form>
  <input required>
  <br>
  <wa-input name="email" server-error="I'm a server error" label="Email" required></wa-input>
  <br>
  <wa-input name="name" label="Name" help-text="I am help text" required></wa-input>
  <br><br>
  <wa-button type="submit">Submit</wa-button>
</form>
```

### With `novalidate` on your form

When `novalidate` is added to your form, validation errors will not prevent the form from submitting. However, their validations will
still be run in the background and attached the `:state(user-invalid)` to the form control, but it will not show the error message for the form control.

```html {.example}
<style>
  input:user-invalid { background: red; }
</style>

With `novalidate` on the form:

<form id="novalidate" novalidate>
  <wa-input name="email" server-error="I'm a server error" label="Email" required></wa-input>
  <br>
  <wa-input novalidate name="name" client-error="im a client error" label="Name" help-text="I am help text" required></wa-input>
  <input required>
  <br><br>
  <wa-button type="submit">Submit</wa-button>
</form>
<script>
// This is just here so you don't navigate.
novalidate.addEventListener("submit", (e) => e.preventDefault())
</script>
```