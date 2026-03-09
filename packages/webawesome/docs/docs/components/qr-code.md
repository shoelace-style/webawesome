---
title: QR Code
description: Generates a QR code and renders it using the Canvas API.
layout: component
category: Actions
---

QR codes are useful for providing small pieces of information to users who can quickly scan them with a smartphone. Most smartphones have built-in QR code scanners, so simply pointing the camera at a QR code will decode it and allow the user to visit a website, dial a phone number, read a message, etc.

```html {.example}
<div class="qr-configuration">
  <wa-qr-code
    value="https://webawesome.com/"
    label="Scan this code to visit Web Awesome on the web!"
    image="/assets/images/logos/wa-avatar4x.png"
  >
  </wa-qr-code>
  <br><br>
  <output><pre><code class="language-html"></code></pre></output>

  <form class="wa-stack">
    <div class="wa-split">
      <wa-color-picker name="background" label="Background"></wa-color-picker>
      <wa-color-picker name="color" label="Color"></wa-color-picker>
      <wa-color-picker name="cornerColor" label="Corner Color"></wa-color-picker>
    </div>
    <wa-input maxlength="255" with-clear name="value" label="Value">
      <wa-icon slot="start" name="link"></wa-icon>
    </wa-input>
    <wa-input maxlength="255" with-clear name="image" label="Image URL">
      <wa-icon slot="start" name="camera"></wa-icon>
    </wa-input>
  </form>
</div>

<style>

  .qr-configuration {
    & pre {
      color-scheme: dark;
      color: white;
      background-color: var(--code-background, var(--wa-color-neutral-20));
    }
    & code {
      display: block;
      font-size: 1em;
      background-color: transparent;
      padding: var(--wa-space-m);
      white-space: pre;
      overflow-x: auto;
    }
  }
</style>

<script>
  const container = document.querySelector('.qr-configuration');
  const qrCode = container.querySelector('wa-qr-code');
  const form = container.querySelector("form")

  customElements.whenDefined('wa-qr-code').then(() => {
    const properties = qrCode.constructor.elementProperties

    function updateCode () {
      const ignoredKeys = [
        "didSSR",
        "dir",
        "lang"
      ]

      const htmlStart = `<wa-qr-code`
      let attributes = []
      const htmlEnd = `></wa-qr-code>`

      ;[...properties.keys()].forEach((key) => {
        if (ignoredKeys.includes(key)) {
          return
        }

        const property = key
        let attr = null

        const definition = properties.get(key)
        if (definition) {
          if (definition.attribute === true) {
            attr = property
          } else {
            attr = definition.attribute
          }
        }

        if (attr && qrCode[property]) {
          attributes.push(`${attr}="${qrCode[property]}"`)
        }
      })

      const styleVal = qrCode.getAttribute('style');
      const styleLine = styleVal ? `style="${styleVal}"` : null;

      if (styleLine) {
        attributes.push(styleLine)
      }

      let attrString = ""

      if (attributes.length > 0) {
        attrString = "\n  " + attributes.join("\n  ") + "\n"
      }
      const qrCodeHTML = htmlStart + attrString + htmlEnd
      console.log({qrCodeHTML})
      container.querySelector("code").textContent = qrCodeHTML
    }

    updateCode()

    function updateValue (e) {
      const target = e.target
      const name = target?.name

      if (name === "background" || name === "color") {
        qrCode.style[name] = target.value
      } else if (name) {
        qrCode[name] = target.value
      }

      updateCode()
    }
    form.addEventListener("input", updateValue)
    form.addEventListener("change", updateValue)

    form.querySelectorAll("[name]").forEach((el) => {
      el.value = qrCode[el.getAttribute("name")]
    })
  });
</script>
```

<br>

```html {.example}
<div class="qr-overview">
  <wa-qr-code
    value="https://webawesome.com/"
    label="Scan this code to visit Web Awesome on the web!"
  ></wa-qr-code>

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

You can change the color of the corners to be different from the main element.

```html {.example}
<wa-qr-code
  value="https://webawesome.com/"
  corner-color="orange"
></wa-qr-code>
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

### Image Error Correction Cover

You can also set how much of the error correction images should cover via the `image-ec-cover` attribute, the number should be between `0` to `1`. The default is `0.5`.

The higher the `image-ec-cover` value is, the harder it will be for QR readers to read. For example, `1.0` usually makes the QR not possible to be read.

```html {.example}
<div class="qr-ec-cover">
  <wa-qr-code value="https://fontawesome.com/" image="/assets/images/logos/fa-avatar4x.png" image-ec-cover="0.3"></wa-qr-code>
  <wa-qr-code value="https://webawesome.com/" image="/assets/images/logos/wa-avatar4x.png" image-ec-cover="0.6"></wa-qr-code>
  <wa-qr-code value="https://build.awesome.me/" image="/assets/images/logos/ba-avatar4x.png" image-ec-cover="0.9"></wa-qr-code>
</div>

<style>
  .qr-ec-cover {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }
</style>
```