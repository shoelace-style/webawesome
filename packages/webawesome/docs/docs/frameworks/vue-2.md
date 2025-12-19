---
title: Vue (version 2)
description: Tips for using Web Awesome in your Vue 2 app.
layout: page-outline
---

# Vue (version 2)

Vue [plays nice](https://custom-elements-everywhere.com/#vue) with custom elements, so you can use Web Awesome in your Vue apps with ease.

:::tip
These instructions are for Vue 2. If you're using Vue 3 or above, please see the [Vue 3 instructions](/frameworks/vue).
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

You'll need to tell Vue to ignore Web Awesome components. This is pretty easy because they all start with `wa-`.

```js
import Vue from 'vue';
import App from './App.vue';

Vue.config.ignoredElements = [/wa-/];

const app = new Vue({
  render: h => h(App)
});

app.$mount('#app');
```

Now you can start using Web Awesome components in your app!

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

If that's too verbose for your liking, you can use a custom directive instead. [This utility](https://www.npmjs.com/package/@shoelace-style/vue-sl-model) adds a custom directive that will work just like `v-model` but for Web Awesome components. To install it, use this command.

```bash
npm install @shoelace-style/vue-sl-model@1
```

Next, import the directive and enable it like this.

```js
import Vue from 'vue';
import Web AwesomeModelDirective from '@shoelace-style/vue-sl-model';
import App from './App.vue';

Vue.use(Web AwesomeModelDirective);
Vue.config.ignoredElements = [/wa-/];

const app = new Vue({
  render: h => h(App)
});

app.$mount('#app');
```

Now you can use the `v-sl-model` directive to keep your data in sync!

```html
<wa-input v-sl-model="name"></wa-input>
```

:::tip
Are you using Web Awesome with Vue 2? [Help us improve this page!](https://github.com/shoelace-style/shoelace/blob/next/docs/frameworks/vue-2.md)
:::