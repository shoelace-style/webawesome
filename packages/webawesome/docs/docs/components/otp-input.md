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
This component works with standard `<form>` elements. Please refer to the section on [form controls](/docs/form-controls) to learn more about form submission and client-side validation.
:::

## Examples

### Labels

Use the `label` attribute to give the field a visible label. For labels that contain HTML, use the `label` slot instead.

```html {.example}
<wa-otp-input label="Verification code"></wa-otp-input>
```

### Hint

Use the `hint` attribute to provide descriptive help text below the field. For hints that contain HTML, use the `hint` slot instead.

```html {.example}
<wa-otp-input label="Verification code" hint="Check your email for a 6-digit code."></wa-otp-input>
```

### Length

The default length is 6 segments. Use the `length` attribute to change it.

```html {.example}
<wa-otp-input id="length-demo" label="Verification code" length="6"></wa-otp-input>

<wa-divider></wa-divider>

<div class="wa-cluster" style="align-items: flex-end">
  <wa-select id="length-select" label="Length" value="6" style="width: 8rem">
    <wa-option value="4">4</wa-option>
    <wa-option value="5">5</wa-option>
    <wa-option value="6">6</wa-option>
    <wa-option value="7">7</wa-option>
    <wa-option value="8">8</wa-option>
  </wa-select>
</div>

<script>
  document.getElementById('length-select').addEventListener('change', event => {
    document.getElementById('length-demo').length = Number(event.target.value);
  });
</script>
```

### Types

Use the `type` attribute to restrict which characters are accepted. The default is `numeric`. Use `alpha` for letters only, or `alphanumeric` for both.

```html {.example}
<wa-otp-input label="Numeric (default)" type="numeric"></wa-otp-input> <br /><br />
<wa-otp-input label="Alpha" type="alpha" length="6"></wa-otp-input>
<br /><br />
<wa-otp-input label="Alphanumeric" type="alphanumeric" length="6"></wa-otp-input>
```

### Format

Use the `format` attribute to arrange segments into groups with literal separators. The `#` character marks a segment; any other character becomes a visual separator. Setting `format` implicitly sets `length`, so you do not need to specify both.

```html {.example}
<!-- Two groups of three with a space: e.g. "ABC DEF" -->
<wa-otp-input label="Invite code" type="alphanumeric" format="### ###"></wa-otp-input>
<br /><br />
<!-- Two groups of four joined by a dash: e.g. "1234-5678" -->
<wa-otp-input label="Serial number" format="####-####"></wa-otp-input>
```

### Appearances

Use the `appearance` attribute to change the visual style of the segments.

```html {.example}
<wa-otp-input label="Outlined (default)" appearance="outlined"></wa-otp-input> <br /><br />
<wa-otp-input label="Filled" appearance="filled"></wa-otp-input>
<br /><br />
<wa-otp-input label="Filled outlined" appearance="filled-outlined"></wa-otp-input>
<br /><br />
<wa-otp-input label="Contained" appearance="contained"></wa-otp-input>
```

### Mask

Add the `mask` attribute to display entered characters as bullets (•). The actual value is still accessible via `el.value`, masking is display-only.

```html {.example}
<wa-otp-input label="PIN" mask length="4"></wa-otp-input>
```

### Case

Use the `case` attribute to automatically transform characters as they are entered. The default is `preserve`. Use `upper` to force uppercase or `lower` to force lowercase.

```html {.example}
<wa-otp-input label="Uppercase invite code" type="alpha" case="upper" length="6"></wa-otp-input> <br /><br />
<wa-otp-input label="Lowercase code" type="alpha" case="lower" length="6"></wa-otp-input>
```

### Sizes

Use the `size` attribute to change the size of each segment.

```html {.example}
<wa-otp-input label="Small" size="small"></wa-otp-input> <br /><br />
<wa-otp-input label="Medium (default)" size="medium"></wa-otp-input>
<br /><br />
<wa-otp-input label="Large" size="large"></wa-otp-input>
```

### Disabled

Use the `disabled` attribute to prevent interaction.

```html {.example}
<wa-otp-input label="Verification code" disabled value="1234"></wa-otp-input>
```

### Readonly

Use the `readonly` attribute to display a value without allowing edits. Unlike `disabled`, a readonly field still receives focus and participates in form submission.

```html {.example}
<wa-otp-input label="Confirmation code" readonly value="483920"></wa-otp-input>
```

### Placeholder

Use the `placeholder` attribute to show a hint character in each empty segment, making the expected length and format clear at a glance.

```html {.example}
<wa-otp-input label="PIN" length="4" placeholder="·"></wa-otp-input> <br /><br />
<wa-otp-input label="Verification code" placeholder="0"></wa-otp-input>
```

### Prefilling a Value

Use the `value` attribute to pre-populate the segments, useful when a code arrives via a URL parameter.

```html {.example}
<wa-otp-input id="magic-code" label="Magic link code" length="6"></wa-otp-input>

<script type="module">
  const code = new URLSearchParams(location.search).get('code') ?? '';
  if (code) document.querySelector('#magic-code').value = code;
</script>
```

### Pasting

Paste a full code in one step, the component fills all segments at once. Characters that don't match the `type` setting are silently ignored, so pasting `"ABC-123"` into a `numeric` field produces `123`.

```html {.example}
<wa-button id="copy-btn" appearance="outlined" size="small">
  <wa-icon slot="prefix" name="clipboard"></wa-icon>
  <span id="copy-label">Copy code: 123456</span>
</wa-button>

<wa-divider style="margin: var(--wa-space-m) 0;"></wa-divider>

<wa-otp-input id="paste-target" label="Paste your code below"></wa-otp-input>

<script type="module">
  document.querySelector('#copy-btn').addEventListener('click', async () => {
    await navigator.clipboard.writeText('123456');
    const label = document.querySelector('#copy-label');
    label.textContent = 'Copied!';
    setTimeout(() => (label.textContent = 'Copy code: 123456'), 2000);
  });
</script>
```

### Autofill

The component sets `autocomplete="one-time-code"` by default, which tells browsers and operating systems to offer autofill for SMS-delivered verification codes. Set `autocomplete="off"` to disable this, for example when the field is used for a PIN that shouldn't be suggested by the browser.

### Auto-Submit on Completion

The `wa-complete` event fires once when the last segment is filled. Use it to submit the form immediately without requiring a button click.

```html {.example}
<form id="sms-form">
  <wa-otp-input id="sms-code" name="code" label="SMS verification code"></wa-otp-input>
  <br />
  <small id="sms-status"></small>
</form>

<script type="module">
  document.querySelector('#sms-code').addEventListener('wa-complete', () => {
    document.querySelector('#sms-status').textContent = 'Code received — submitting…';
    // document.querySelector('#sms-form').requestSubmit();
  });
</script>
```

### Form Submission

Use the `name` attribute to include the OTP value in form submissions. The value is included in `FormData` as a plain string.

```html {.example}
<form id="verify-form">
  <wa-otp-input name="code" label="Enter your 6-digit code" required></wa-otp-input>
  <br /><br />
  <wa-button type="submit" appearance="filled">Verify</wa-button>
  <wa-button type="reset" appearance="outlined">Reset</wa-button>
</form>

<script type="module">
  document.querySelector('#verify-form').addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.target);
    alert(`Submitted code: ${data.get('code')}`);
  });
</script>
```

### Form Attribute

Use the `form` attribute to associate the field with a `<form>` element elsewhere in the page. This works the same as the native HTML `form` attribute on `<input>`.

```html {.example}
<wa-otp-input name="code" label="Enter code" form="external-form"></wa-otp-input>
<br />
<br />
<form id="external-form">
  <wa-button appearance="filled" type="submit">Submit</wa-button>
</form>
```

### Validation

Add the `required` attribute to require a value before submission. A partial entry,some segments filled but not all, is always invalid regardless of `required`, with the `tooShort` validity flag set. Use the `invalid` event to set a custom message via `setCustomValidity()`.

```html {.example}
<form id="mfa-form">
  <wa-otp-input id="mfa-code" name="code" label="Two-factor code" required></wa-otp-input>
  <br />
  <br />
  <wa-button appearance="filled" type="submit">Continue</wa-button>
</form>

<script type="module">
  const el = document.querySelector('#mfa-code');

  el.addEventListener('invalid', () => {
    if (el.validity.valueMissing) {
      el.setCustomValidity('Please enter your verification code.');
    } else if (el.validity.tooShort) {
      el.setCustomValidity(`Please enter all ${el.length} digits.`);
    } else {
      el.setCustomValidity('');
    }
  });

  el.addEventListener('input', () => el.setCustomValidity(''));

  document.querySelector('#mfa-form').addEventListener('submit', event => {
    event.preventDefault();
    alert('Code accepted!');
  });
</script>
```

### Custom Styles

Use [CSS parts](#css-parts) and CSS custom properties to customize the appearance. The CSS custom properties are scoped to the component and do not use the `--wa-` prefix.

```html {.example}
<wa-otp-input id="styled-otp" label="Styled code" length="4"></wa-otp-input>

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
