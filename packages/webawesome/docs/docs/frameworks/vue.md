---
title: Vue 3
description: Tips for using Web Awesome in your Vue 3 app.
layout: framework
officialDocs: https://vuejs.org
---

Vue [plays nice](https://custom-elements-everywhere.com/#vue) with custom elements, so you can use Web Awesome in your Vue apps with ease.

:::info
These instructions are for Vue 3 and above. If you're using Vue 2, please see the [Vue 2 instructions](/docs/frameworks/vue-2).
:::

## Installation

To add Web Awesome to your Vue app, install the package from npm.

```bash
npm install @awesome.me/webawesome
```

Then import the Web Awesome stylesheet and the components you need:

```js
// main.js or main.ts
import '@awesome.me/webawesome/dist/styles/webawesome.css';
import '@awesome.me/webawesome/dist/components/button/button.js';
```

## Configuration

If you haven't configured your Vue project to recognize custom elements, follow [Vue's guide](https://vuejs.org/guide/extras/web-components.html#using-custom-elements-in-vue) for your project type so it doesn't error on Web Awesome's `wa-*` tags.

## Types

Configuring custom elements stops the errors, but it doesn't give the `wa-*` tags Vue's component typing. For autocomplete and type safety, add the Web Awesome Vue types to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["@awesome.me/webawesome/dist/types/vue/index.d.ts"]
  }
}
```

## Usage

### Basic Usage

```html
<template>
  <div class="container">
    <h1>QR code generator</h1>

    <wa-input maxlength="255" clearable label="Value" v-model="qrCode"></wa-input>

    <wa-qr-code :value="qrCode"></wa-qr-code>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import '@awesome.me/webawesome/dist/components/qr-code/qr-code.js';
  import '@awesome.me/webawesome/dist/components/input/input.js';

  const qrCode = ref();
</script>

<style>
  .container {
    max-width: 400px;
    margin: 0 auto;
  }
</style>
```

### Binding Complex Data

When binding complex data such as objects and arrays, use the `.prop` modifier to make Vue bind them as a property instead of an attribute.

```html
<wa-color-picker :swatches.prop="mySwatches" />
```

### Two-Way Binding

One caveat: [v-model support on custom elements varies](https://github.com/vuejs/vue/issues/7830), but you can still bind two ways manually.

```html
<!-- ❌ This _sometimes_ works (v-model internals changed in Vue 3) -->
<wa-input v-model="name"></wa-input>
<!-- ✅ This should always work, but it's a bit longer -->
<wa-input :value="name" @input="name = $event.target.value"></wa-input>
```

### Slots

Slots in Web Awesome / web components are functionally the same as basic slots in Vue. Slots can be assigned to elements using the `slot` attribute followed by the name of the slot it is being assigned to.

Here is an example:

```html
<wa-drawer label="Drawer" placement="start" class="drawer-placement-start" :open="drawerIsOpen">
  This drawer slides in from the start.
  <div slot="footer">
    <wa-button variant="primary" @click="drawerIsOpen = false">Close</wa-button>
  </div>
</wa-drawer>
```

For more on slots and their limitations with web components, see [Vue's documentation](https://vuejs.org/guide/extras/web-components#slots).

<wa-callout variant="success">
  <div class="wa-flank:end wa-gap-xl">
    <p>
      <strong>Web Awesome is ready to use.</strong><br />
      Want server-side rendering too?
    </p>
    <wa-button size="small" variant="success" href="#server-side-rendering">
      Add SSR
    </wa-button>
  </div>
</wa-callout>

## Server-Side Rendering

SSR in Vue varies widely depending on your setup. For a working reference, see the example below.

### See It in Action

<div class="modern-card-list info-cards">
  <section class="search-list-grid">
    <a class="hover-grow hover-emphasize-border duotone-hover-context" data-duotone-hover-trigger href="https://github.com/KonnorRogers/webawesome-vite-vue-ssr" target="_blank" rel="noopener noreferrer">
      <wa-card>
        <wa-icon class="info-card-icon duotone-illustrated duotone-secondary-reveal" name="file-code" family="duotone" variant="regular"></wa-icon>
        <span class="page-name">Example Repository</span>
        <p class="modern-card-summary">A Vite + Vue SSR project using Web Awesome.</p>
      </wa-card>
    </a>
  </section>
</div>

Other plugins and meta-frameworks like Vike and vite-plugin-ssr are still experimental, so they aren't documented here yet.
