---
title: Svelte
description: Tips for using Web Awesome in your Svelte app.
layout: page-outline
---

<wa-breadcrumb class="docs-subpage-crumbs">
  <wa-icon slot="separator" name="angle-right" variant="regular"></wa-icon>
  <wa-breadcrumb-item href="/docs/frameworks">Frameworks</wa-breadcrumb-item>
  <wa-breadcrumb-item>{{ title }}</wa-breadcrumb-item>
</wa-breadcrumb>

Svelte [plays nice](https://custom-elements-everywhere.com/#svelte) with custom elements, so you can use {{ site.name }} in your Svelte apps with ease.

## Installation

To add {{ site.name }} to your Svelte app, install the package from npm.

```bash
npm install @awesome.me/webawesome
```

## Usage

Next, import the {{ site.name }} stylesheet, import the components you need, and then start using {{ site.name }}!

```jsx
<!-- app.html -->
<script>
  import '@awesome.me/webawesome/dist/styles/webawesome.css';
  import '@awesome.me/webawesome/dist/components/callout/callout.js'
  import '@awesome.me/webawesome/dist/components/input/input.js';

  let message = $state('')
</script>

<h1>Live editing</h1>

<wa-input label="Message" value={message} oninput={event => message = event.target.value}></wa-input>

<wa-callout>
  <wa-icon slot="icon" name="info-circle"></wa-icon>
  {message}
</wa-callout>
```

### Two-way Binding

One caveat is there's currently Svelte only supports `bind:value` directive in `<input>`, `<textarea>` and `<select>`, but you can still achieve two-way binding manually.

```jsx
// ❌ These do not work
<wa-input bind:value="name"></wa-input>

<wa-select bind:value="job">
  <wa-option value="designer">Designer</wa-option>
  <wa-option value="developer">Developer</wa-option>
</wa-select>

// ✅ These are a bit longer, but work
<wa-input value={name} oninput={event => name = event.target.value}></wa-input>

<wa-select value={job} oninput={event => job = event.target.value}>
  <wa-option value="designer">Designer</wa-option>
  <wa-option value="developer">Developer</wa-option>
</wa-select>
```

### Slots

Slots in {{ site.name }}/web components are functionally the same as basic slots in Svelte. Slots can be assigned to elements using the `slot` attribute followed by the name of the slot it is being assigned to.

Here is an example:

```jsx
<wa-drawer label="Drawer" placement="start" class="drawer-placement-start" bind:open={drawerIsOpen}>
  This drawer slides in from the start.
  <div slot="footer">
    <wa-button variant="primary" onclick={() => (drawerIsOpen = false)}>
      Close
    </wa-button>
  </div>
</wa-drawer>
```

:::info
Are you using {{ site.name }} with Svelte? [Help us improve this page!](https://github.com/shoelace-style/webawesome/blob/next/packages/webawesome/docs/docs/frameworks/svelte.md)
:::