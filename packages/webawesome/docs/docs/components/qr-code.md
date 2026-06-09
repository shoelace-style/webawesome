---
title: QR Code
layout: component
category: Media
synonyms:
  - barcode
  - quick response code
use-cases:
  - scan code
  - share link
  - payment code
---

QR codes are useful for providing small pieces of information to users who can quickly scan them with a smartphone. Most smartphones have built-in QR code scanners, so simply pointing the camera at a QR code will decode it and allow the user to visit a website, dial a phone number, read a message, etc.

```html {.example}
<div class="qr-overview">
  <wa-qr-code value="https://webawesome.com/" label="Scan this code to visit Web Awesome on the web!"></wa-qr-code>
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
    qrCode.updateComplete.then(() => {
      input.value = qrCode.value;
      input.addEventListener('input', () => (qrCode.value = input.value));
    });
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

### Size

Use the `size` attribute to change the size of the QR code.

```html {.example}
<wa-qr-code value="https://webawesome.com/" size="64"></wa-qr-code>
```

### Colors

The QR code's fill color is determined by the current text color. To change it, set the CSS `color` property on the host element or an ancestor element.

The canvas is always transparent, so use the `background` or `background-color` CSS property on the host element to set a background color.

A _quiet zone_ is the blank space around a QR code that helps scanners detect it more reliably. Use the `padding` CSS property on the host element to add one.

```html {.example}
<wa-qr-code
  value="https://webawesome.com/"
  style="
    color: var(--wa-color-indigo-20);
    background-color: var(--wa-color-indigo-90);
    border-radius: var(--wa-border-radius-m);
    padding: 1rem;
  "
></wa-qr-code>
```

#### Corner Color

You can change the color of the corners to be different from the main element with the `--corner-color` custom property.

```html {.example}
<wa-qr-code value="https://webawesome.com/" style="--corner-color: var(--wa-color-brand)"></wa-qr-code>
```

### Radius

Create a rounded effect with the `radius` attribute.

```html {.example}
<wa-qr-code value="https://webawesome.com/" radius="0.5"></wa-qr-code>
```

### Error Correction

QR codes can be rendered with various levels of [error correction](https://www.qrcode.com/en/about/error_correction.html) that can be set using the `error-correction` attribute. This example generates four codes with the same value using different error correction levels.

```html {.example}
<div class="qr-error-correction">
  <wa-qr-code value="https://webawesome.com/" error-correction="L"></wa-qr-code>
  <wa-qr-code value="https://webawesome.com/" error-correction="M"></wa-qr-code>
  <wa-qr-code value="https://webawesome.com/" error-correction="Q"></wa-qr-code>
  <wa-qr-code value="https://webawesome.com/" error-correction="H"></wa-qr-code>
</div>

<style>
  .qr-error-correction {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
</style>
```

### Images

Use the `image` attribute to add a logo or image to the center of the QR code. When using an image, the error correction level will automatically be set to `H` to ensure the code remains scannable.

```html {.example}
<wa-qr-code value="https://webawesome.com/" image="/assets/images/logos/wa-avatar4x.png"></wa-qr-code>
```

### Image Coverage

Use the `image-coverage` attribute to control how much of the QR code the image is allowed to cover, from `0` to `1`. The default is `0.5`.

The higher the `image-coverage` value, the harder it will be for QR readers to scan. For example, `1.0` usually makes the QR code unreadable.

```html {.example}
<div class="qr-ec-cover">
  <wa-qr-code
    value="https://fontawesome.com/"
    image="/assets/images/logos/fa-avatar4x.png"
    image-coverage="0.3"
  ></wa-qr-code>
  <wa-qr-code
    value="https://webawesome.com/"
    image="/assets/images/logos/wa-avatar4x.png"
    image-coverage="0.6"
  ></wa-qr-code>
  <wa-qr-code
    value="https://build.awesome.me/"
    image="/assets/images/logos/ba-avatar4x.png"
    image-coverage="0.9"
  ></wa-qr-code>
</div>

<style>
  .qr-ec-cover {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }
</style>
```
