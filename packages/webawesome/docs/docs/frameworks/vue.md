---
title: Vue 3
description: Tips for using Web Awesome in your Vue 3 app.
layout: page-outline
---

<wa-breadcrumb class="page-breadcrumbs">
  <wa-icon slot="separator" name="angle-right" variant="regular"></wa-icon>
  <wa-breadcrumb-item href="/docs/frameworks">Frameworks</wa-breadcrumb-item>
  <wa-breadcrumb-item>{{ title }}</wa-breadcrumb-item>
</wa-breadcrumb>

Vue [plays nice](https://custom-elements-everywhere.com/#vue) with custom elements, so you can use Web Awesome in your Vue apps with ease.

:::info
These instructions are for Vue 3 and above. If you're using Vue 2, please see the [Vue 2 instructions](/frameworks/vue-2).
:::

## Installation

To add Web Awesome to your Vue app, install the package from npm.

```bash
npm install @awesome.me/webawesome
```

Next, import the Web Awesome stylesheet, import the components you need, and then start using Web Awesome!

```jsx
// main.js or main.ts
import '@awesome.me/webawesome/dist/styles/webawesome.css';
import '@awesome.me/webawesome/dist/components/button/button.js';
```

## Configuration

If you haven't configured your Vue.js project to work with custom elements/web components, follow [the instructions here](https://vuejs.org/guide/extras/web-components.html#using-custom-elements-in-vue) based on your project type to ensure your project will not throw an error when it encounters a custom element.

Now you can start using Web Awesome components in your app!

## Types

Once you have configured your application for custom elements, you should be able to use Shoelace in your application without it causing any errors. Unfortunately, this doesn't register the custom elements to behave like components built using Vue. To provide autocomplete information and type safety for your components, you can import the Shoelace Vue types into your `tsconfig.json` to get better integration in your standard Vue and JSX templates.

```json
{
  "compilerOptions": {
    "types": ["@awesome.me/webawesome/dist/types/vue/index.d.ts"]
  }
}
```

## Usage

### QR code generator example

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

### Two-way Binding

One caveat is there's currently [varying levels of support for v-model on custom elements](https://github.com/vuejs/vue/issues/7830), but you can still achieve two-way binding manually.

```html
<!-- ❌ This _sometimes_ work (some things have changed internally in v-model in Vue 3) -->
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

For more on slots and limitations with Web Components, check out the Vue documentation here: <https://vuejs.org/guide/extras/web-components#slots>

:::info
Are you using Web Awesome with Vue? [Help us improve this page!](https://github.com/shoelace-style/webawesome/blob/next/packages/webawesome/docs/docs/frameworks/vue.md)
:::