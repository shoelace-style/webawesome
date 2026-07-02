---
title: Vue (version 2)
description: Tips for using Web Awesome in your Vue 2 app.
layout: framework
officialDocs: https://v2.vuejs.org
---

Vue [plays nice](https://custom-elements-everywhere.com/#vue) with custom elements, so you can use Web Awesome in your Vue apps with ease.

:::info
These instructions are for Vue 2. If you're using Vue 3 or above, please see the [Vue 3 instructions](/docs/frameworks/vue).
:::

## Installation

To add Web Awesome to your Vue app, install the package from npm.

```bash
npm install @awesome.me/webawesome
```

Then import the Web Awesome stylesheet and the components you need:

```jsx
// main.js or main.ts
import '@awesome.me/webawesome/dist/styles/webawesome.css';
import '@awesome.me/webawesome/dist/components/button/button.js';
```

## Configuration

Tell Vue to ignore Web Awesome's custom elements. Because they all start with `wa-`, a single rule covers them:

```js
import Vue from 'vue';
import App from './App.vue';

Vue.config.ignoredElements = [/wa-/];

const app = new Vue({
  render: h => h(App),
});

app.$mount('#app');
```

## Usage

### Binding Complex Data

When binding complex data such as objects and arrays, use the `.prop` modifier to make Vue bind them as a property instead of an attribute.

```html
<wa-color-picker :swatches.prop="mySwatches" />
```

### Two-Way Binding

One caveat: custom elements [don't support `v-model`](https://github.com/vuejs/vue/issues/7830), but you can still bind two ways manually.

```html
<!-- ❌ This doesn't work -->
<wa-input v-model="name"></wa-input>
<!-- ✅ This works, but it's a bit longer -->
<wa-input :value="name" @input="name = $event.target.value"></wa-input>
```

<wa-callout variant="success">
  <strong>Web Awesome is ready to use.</strong><br />
  Explore components, utilities, and theming to start building.
</wa-callout>
