---
title: Vue (version 2)
description: Tips for using Web Awesome in your Vue 2 app.
layout: page-outline
---

<wa-breadcrumb class="docs-subpage-crumbs">
  <wa-icon slot="separator" name="angle-right" variant="regular"></wa-icon>
  <wa-breadcrumb-item href="/docs/frameworks">Frameworks</wa-breadcrumb-item>
  <wa-breadcrumb-item>{{ title }}</wa-breadcrumb-item>
</wa-breadcrumb>

Vue [plays nice](https://custom-elements-everywhere.com/#vue) with custom elements, so you can use {{ site.name }} in your Vue apps with ease.

:::info
These instructions are for Vue 2. If you're using Vue 3 or above, please see the [Vue 3 instructions](/frameworks/vue).
:::

## Installation

To add {{ site.name }} to your Vue app, install the package from npm.

```bash
npm install @awesome.me/webawesome
```

Next, import the {{ site.name }} stylesheet, import the components you need, and then start using {{ site.name }}!

```jsx
// main.js or main.ts
import '@awesome.me/webawesome/dist/styles/webawesome.css';
import '@awesome.me/webawesome/dist/components/button/button.js';
```

## Configuration

You'll need to tell Vue to ignore {{ site.name }} components. This is pretty easy because they all start with `wa-`.

```js
import Vue from 'vue';
import App from './App.vue';

Vue.config.ignoredElements = [/wa-/];

const app = new Vue({
  render: h => h(App)
});

app.$mount('#app');
```

Now you can start using {{ site.name }} components in your app!

## Usage

### Binding Complex Data

When binding complex data such as objects and arrays, use the `.prop` modifier to make Vue bind them as a property instead of an attribute.

```html
<wa-color-picker :swatches.prop="mySwatches" />
```

### Two-way Binding

One caveat is there's currently [no support for v-model on custom elements](https://github.com/vuejs/vue/issues/7830), but you can still achieve two-way binding manually.

```html
<!-- ❌ This doesn't work -->
<wa-input v-model="name"></wa-input>
<!-- ✅ This works, but it's a bit longer -->
<wa-input :value="name" @input="name = $event.target.value"></wa-input>
```

:::info
Are you using {{ site.name }} with Vue 2? [Help us improve this page!](https://github.com/shoelace-style/webawesome/blob/next/packages/webawesome/docs/docs/frameworks/vue-2.md)
:::