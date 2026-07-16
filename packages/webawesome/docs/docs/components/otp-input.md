---
title: OTP Input
layout: component
category: Forms
synonyms:
  - passcode
  - one-time password
  - PIN
  - verification code
  - 2FA code
use-cases:
  - SMS verification
  - two-factor authentication
  - PIN entry
  - invite code
  - serial number
---

```html {.example}
<wa-otp-input label="Verification code"></wa-otp-input>
```

:::info
This component works with standard `<form>` elements. See [form controls](/docs/form-controls) for form submission and client-side validation.
:::

## Examples

### Label

Use the `label` attribute to give the field an accessible label. For labels that contain HTML, use the `label` slot instead.

```html {.example}
<wa-otp-input label="Verification code"></wa-otp-input>
```

### Hint

Add descriptive hint text with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html {.example}
<wa-otp-input label="Verification code" hint="Check your email for a 6-digit code."></wa-otp-input>
```

### Placeholder

Use the `placeholder` attribute to show a hint character in each empty segment, making the expected length clear at a glance.

```html {.example}
<div class="wa-stack">
  <wa-otp-input label="Access code" placeholder="·"></wa-otp-input>
  <wa-otp-input label="Verification code" placeholder="0"></wa-otp-input>
</div>
```

### Length

Use the `length` attribute to change the number of segments. The default is 6.

```html {.example}
<div class="wa-stack">
  <wa-otp-input label="Card PIN" length="4"></wa-otp-input>
  <wa-otp-input label="Backup code" length="8"></wa-otp-input>
</div>
```

### Type

Use the `type` attribute to restrict which characters are accepted.

```html {.example}
<div class="wa-stack">
  <wa-otp-input label="Numeric" type="numeric"></wa-otp-input>
  <wa-otp-input label="Alpha" type="alpha"></wa-otp-input>
  <wa-otp-input label="Alphanumeric" type="alphanumeric"></wa-otp-input>
</div>
```

| Type                                                                                | Accepts            | Best for                     |
| ----------------------------------------------------------------------------------- | ------------------ | ---------------------------- |
| `numeric` <wa-badge appearance="outlined" variant="neutral" pill>default</wa-badge> | Digits 0–9         | SMS and 2FA codes, PINs      |
| `alpha`                                                                             | Letters A–Z        | Letter-only codes            |
| `alphanumeric`                                                                      | Letters and digits | Invite codes, serial numbers |

The `numeric` type also sets the `inputmode` attribute on the underlying input, so mobile devices show the numeric keyboard.

### Format

Use the `format` attribute to arrange segments into groups with literal separators. The `#` character marks a segment; any other character becomes a visual separator. Setting `format` overrides `length`, so there is no need to specify both.

```html {.example}
<div class="wa-stack">
  <!-- Two groups of three with a space: e.g. "ABC DEF" -->
  <wa-otp-input label="Invite code" type="alphanumeric" format="### ###"></wa-otp-input>
  <!-- Two groups of four joined by a dash: e.g. "1234-5678" -->
  <wa-otp-input label="Serial number" format="####-####"></wa-otp-input>
</div>
```

### Case

Use the `case` attribute to transform characters as they are entered. The default is `preserve`. Use `upper` to force uppercase or `lower` to force lowercase.

```html {.example}
<div class="wa-stack">
  <wa-otp-input label="Upper" type="alpha" case="upper"></wa-otp-input>
  <wa-otp-input label="Lower" type="alpha" case="lower"></wa-otp-input>
</div>
```

### Mask

Add the `mask` attribute to display entered characters as bullets (•). The value remains accessible via the `value` property; masking is display-only. Masking is also visual-only for assistive technology — screen readers still announce entered characters.

```html {.example}
<wa-otp-input label="PIN" mask length="4"></wa-otp-input>
```

### Appearance

Use the `appearance` attribute to change the visual style of the segments. The default is `outlined`.

```html {.example}
<div class="wa-stack">
  <wa-otp-input label="Outlined" appearance="outlined"></wa-otp-input>
  <wa-otp-input label="Filled" appearance="filled"></wa-otp-input>
  <wa-otp-input label="Filled outlined" appearance="filled-outlined"></wa-otp-input>
  <wa-otp-input label="Contained" appearance="contained"></wa-otp-input>
</div>
```

### Size

Use the `size` attribute to change the size of each segment. The default is `m`.

```html {.example}
<div class="wa-stack">
  <wa-otp-input label="Extra small" size="xs"></wa-otp-input>
  <wa-otp-input label="Small" size="s"></wa-otp-input>
  <wa-otp-input label="Medium" size="m"></wa-otp-input>
  <wa-otp-input label="Large" size="l"></wa-otp-input>
  <wa-otp-input label="Extra large" size="xl"></wa-otp-input>
</div>
```

### Disabled

Use the `disabled` attribute to prevent interaction.

```html {.example}
<wa-otp-input label="Verification code" disabled value="391824"></wa-otp-input>
```

### Readonly

Use the `readonly` attribute to display a value without allowing edits. Unlike `disabled`, a readonly field still receives focus and participates in form submission.

```html {.example}
<wa-otp-input label="Confirmation code" readonly value="483920"></wa-otp-input>
```

### Initial Value

Use the `value` attribute to prefill the segments — for example, when a code arrives in a link's query parameter.

```html {.example}
<wa-otp-input label="Magic link code" value="483920"></wa-otp-input>
```

### Pasting

Pasting a full code fills all segments in one step. Characters that don't match the `type` attribute are silently dropped, so pasting `"ABC-123"` into a `numeric` field produces `123`.

```html {.example}
<wa-copy-button value="314159">
  <wa-button appearance="filled">
    <wa-icon slot="start" name="clipboard"></wa-icon>
    Copy code: 314159
  </wa-button>
</wa-copy-button>

<wa-divider></wa-divider>

<wa-otp-input label="Paste your code below"></wa-otp-input>
```

### Autofill

The `autocomplete` attribute defaults to `one-time-code`, which tells browsers and operating systems to offer autofill for SMS-delivered verification codes. Set `autocomplete="off"` to disable this — for example, when the field is used for a PIN that shouldn't be suggested by the browser.

On Android, Chrome can also read the code from an incoming SMS with the [WebOTP API](https://developer.mozilla.org/en-US/docs/Web/API/WebOTP_API), no manual entry required. Feature-detect it and set the field's `value` from the result:

```html
<wa-otp-input id="sms-code" label="Verification code"></wa-otp-input>

<script>
  if ('OTPCredential' in window) {
    navigator.credentials
      .get({ otp: { transport: ['sms'] } })
      .then(otp => {
        document.getElementById('sms-code').value = otp.code;
      })
      .catch(() => {
        // The prompt was dismissed or timed out
      });
  }
</script>
```

### Autosubmit

Add the `autosubmit` attribute to submit the containing form automatically when the last segment is filled. The `wa-complete` event fires first and is cancelable — call `preventDefault()` to stop the submission.

```html {.example}
<form class="autosubmit">
  <wa-otp-input name="code" label="SMS verification code" autosubmit></wa-otp-input>
</form>

<script type="module">
  const form = document.querySelector('.autosubmit');

  form.addEventListener('submit', event => {
    event.preventDefault();
    alert(`Submitted code: ${new FormData(event.target).get('code')}`);
  });
</script>
```

To run your own logic on completion instead — verify the code over the network, unlock a button — listen for the `wa-complete` event without setting `autosubmit`.

### Validation

Add the `required` attribute to require a value before submission. A partial entry (some segments filled, but not all) is always invalid regardless of `required`, with the `tooShort` validity flag set.

```html {.example}
<form class="validation">
  <wa-otp-input name="code" label="Two-factor code" required></wa-otp-input>
  <br />
  <wa-button appearance="filled" type="submit">Continue</wa-button>
</form>

<script type="module">
  const form = document.querySelector('.validation');

  form.addEventListener('submit', event => {
    event.preventDefault();
    alert('Code accepted!');
  });
</script>
```

### Custom Validity

Use the `setCustomValidity()` method to set a custom validation message. This will prevent the form from submitting and make the browser display the error message you provide. To clear the error, call this function with an empty string.

```html {.example}
<form class="custom-validity">
  <wa-otp-input name="code" label="Verification code" hint="The correct code is 314159." required></wa-otp-input>
  <br />
  <wa-button appearance="filled" type="submit">Verify</wa-button>
</form>

<script type="module">
  const form = document.querySelector('.custom-validity');
  const otp = form.querySelector('wa-otp-input');

  otp.addEventListener('input', () => {
    // Only flag complete entries — partial input is already invalid via tooShort
    const isValid = otp.value.length < otp.length || otp.value === '314159';
    otp.setCustomValidity(isValid ? '' : 'That code didn’t match. Check your device and try again.');
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    alert('Code accepted!');
  });
</script>
```

### Customizing

Use the `--segment-size`, `--segment-gap`, and `--segment-border-radius` custom properties along with [CSS parts](#css-parts) to style the segments.

```html {.example}
<wa-otp-input id="styled-otp" label="Card PIN" length="4"></wa-otp-input>

<style>
  #styled-otp {
    --segment-size: 3.5rem;
    --segment-gap: 0.75rem;
    --segment-border-radius: 0.75rem;
  }

  #styled-otp::part(segment) {
    font-size: 1.5rem;
    font-weight: 700;
  }
</style>
```

Combine CSS parts with [custom states](/docs/form-controls#custom-validation-styles) to style validation feedback — for example, coloring the segments when the `user-invalid` custom state applies. Enter a partial code and click away to see it:

```html {.example}
<wa-otp-input class="invalid-style" label="Two-factor code" required></wa-otp-input>

<style>
  .invalid-style:state(user-invalid)::part(segment) {
    border-color: var(--wa-color-danger-border-loud);
  }
</style>
```

## Accessibility Considerations

The component uses a single visually hidden `<input>` as the focus and form target — the visible segments are decorative. Screen readers announce it as one text field, named by the `label` attribute or slot. Always provide a label; without one, the field has no accessible name.

Keyboard interaction follows the single-input model:

| Key                                   | Behavior                                                             |
| ------------------------------------- | -------------------------------------------------------------------- |
| <kbd>←</kbd> <kbd>→</kbd>             | Move between segments                                                |
| <kbd>Tab</kbd> / <kbd>Shift+Tab</kbd> | Move between segments; leaves the field at the first or last segment |
| <kbd>Backspace</kbd>                  | Clears the current segment and moves back (no character shift)       |
| <kbd>Delete</kbd>                     | Clears the current segment without moving                            |
