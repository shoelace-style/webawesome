---
title: QR Code
description: Generates a QR code and renders it using the Canvas API.
layout: component
category: Actions
---

QR codes are useful for providing small pieces of information to users who can quickly scan them with a smartphone. Most smartphones have built-in QR code scanners, so simply pointing the camera at a QR code will decode it and allow the user to visit a website, dial a phone number, read a message, etc.

```html {.example}
<div class="qr-overview">
  <wa-qr-code value="https://shoelace.style/" label="Scan this code to visit Web Awesome on the web!"></wa-qr-code>
  <br />

  <wa-input maxlength="255" with-clear label="Value">
    <wa-icon slot="start" name="link"></wa-icon>
  </wa-input>
</div>

<script>
  const container = document.querySelector('.qr-overview');
  const qrCode = container.querySelector('wa-qr-code');
  const input = container.querySelector('wa-input');

  customElements.whenDefined('wa-qr-code').then(() => {
    input.value = qrCode.value;
    input.addEventListener('input', () => (qrCode.value = input.value));
  });
</script>

<style>
  .qr-overview {
    max-width: 256px;
  }

  .qr-overview wa-input {
    margin-top: 1rem;
  }
</style>
```

## Examples

### Colors

Use the `fill` and `background` attributes to modify the QR code's colors. You should always ensure good contrast for optimal compatibility with QR code scanners.

```html {.example}
<wa-qr-code value="https://shoelace.style/" fill="deeppink" background="white"></wa-qr-code>
```

### Size

Use the `size` attribute to change the size of the QR code.

```html {.example}
<wa-qr-code value="https://shoelace.style/" size="64"></wa-qr-code>
```

### Radius

Create a rounded effect with the `radius` attribute.

```html {.example}
<wa-qr-code value="https://shoelace.style/" radius="0.5"></wa-qr-code>
```

### Error Correction

QR codes can be rendered with various levels of [error correction](https://www.qrcode.com/en/about/error_correction.html) that can be set using the `error-correction` attribute. This example generates four codes with the same value using different error correction levels.

```html {.example}
<div class="qr-error-correction">
  <wa-qr-code value="https://shoelace.style/" error-correction="L"></wa-qr-code>
  <wa-qr-code value="https://shoelace.style/" error-correction="M"></wa-qr-code>
  <wa-qr-code value="https://shoelace.style/" error-correction="Q"></wa-qr-code>
  <wa-qr-code value="https://shoelace.style/" error-correction="H"></wa-qr-code>
</div>

<style>
  .qr-error-correction {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
</style>
```
