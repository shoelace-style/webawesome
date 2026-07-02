---
title: Svelte
description: Tips for using Web Awesome in your Svelte app.
layout: framework
officialDocs: https://svelte.dev
---

Svelte [plays nice](https://custom-elements-everywhere.com/#svelte) with custom elements, so you can use Web Awesome in your Svelte apps with ease.

## Installation

To add Web Awesome to your Svelte app, install the package from npm.

```bash
npm install @awesome.me/webawesome
```

## Usage

Import the Web Awesome stylesheet and the components you need, then start using them:

```html
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

### Two-Way Binding

One caveat: Svelte currently only supports the `bind:value` directive on `<input>`, `<textarea>`, and `<select>`, but you can still achieve two-way binding manually.

```html
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

Slots in Web Awesome/web components are functionally the same as basic slots in Svelte. Slots can be assigned to elements using the `slot` attribute followed by the name of the slot it is being assigned to.

Here is an example:

```html
<wa-drawer label="Drawer" placement="start" class="drawer-placement-start" bind:open={drawerIsOpen}>
  This drawer slides in from the start.
  <div slot="footer">
    <wa-button variant="primary" onclick={() => (drawerIsOpen = false)}>
      Close
    </wa-button>
  </div>
</wa-drawer>
```

<wa-callout variant="success">
  <strong>Web Awesome is ready to use.</strong><br />
  Explore components, utilities, and theming to start building.
</wa-callout>
