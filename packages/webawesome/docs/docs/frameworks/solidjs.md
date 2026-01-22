---
title: SolidJS
description: Tips for using Web Awesome in your SolidJS app.
layout: page-outline
---

# SolidJS

Web Awesome components work seamlessly with SolidJS using native custom elements. This guide will show you how to integrate Web Awesome into your SolidJS project with full TypeScript support.

## Installation

To add Web Awesome to your SolidJS app, install the package from npm.

```bash
npm install @awesome.me/webawesome
```

## Usage

Import the Web Awesome stylesheet and the components you need, then start using them in your SolidJS app!

```tsx
// App.tsx
import '@awesome.me/webawesome/dist/styles/webawesome.css';
import '@awesome.me/webawesome/dist/components/button/button.js';

function App() {
  return <wa-button variant="brand">Click me!</wa-button>;
}

export default App;
```

### TypeScript Support

Web Awesome generates TypeScript definitions for all components, providing you with inline documentation, autocomplete, and type-safe validation.

The types file is located at:

```
node_modules/@awesome.me/webawesome/dist/custom-elements-jsx.d.ts
```

#### Option 1: TSConfig Configuration

Add the types to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["@awesome.me/webawesome/dist/custom-elements-jsx.d.ts"]
  }
}
```

#### Option 2: TypeScript Declaration File

Create a declaration file (e.g., `custom-elements-types.d.ts`) and extend SolidJS's `IntrinsicElements`:

```ts
// custom-elements-types.d.ts
import type { CustomElementsSolidJs, CustomCssProperties } from '@awesome.me/webawesome/dist/custom-elements-jsx.d.ts';

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements extends CustomElementsSolidJs {}
  }
}

// Optional: Extend CSS properties for custom CSS variables
declare module 'csstype' {
  interface Properties extends CustomCssProperties {}
}
```

:::tip
Note the use of `CustomElementsSolidJs` instead of `CustomElements`. SolidJS requires special type definitions that include property prefixes for different binding scenarios.
:::

### Property Binding

SolidJS provides special property prefixes for different binding scenarios with custom elements:

- **`attr:propertyName`** - For attribute binding (string values)
- **`prop:propertyName`** - For property binding (any type, including signals and objects)
- **`bool:propertyName`** - For boolean properties

```tsx
import { createSignal } from 'solid-js';
import '@awesome.me/webawesome/dist/components/input/input.js';
import '@awesome.me/webawesome/dist/components/dialog/dialog.js';

function MyComponent() {
  const [value, setValue] = createSignal('');
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <>
      {/* String attribute binding */}
      <wa-input attr:value={value()} />
      
      {/* Property binding with signals */}
      <wa-input prop:value={value()} />
      
      {/* Boolean property */}
      <wa-dialog bool:open={isOpen()} />
    </>
  );
}
```

### Event Handling

SolidJS uses the `on:` prefix for custom events. Many Web Awesome components emit [custom events](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events). For example, the input component emits the `wa-input` event when it receives input.

```tsx
import { createSignal } from 'solid-js';
import '@awesome.me/webawesome/dist/components/input/input.js';

function MyComponent() {
  const [value, setValue] = createSignal('');

  return (
    <wa-input
      prop:value={value()}
      on:wa-input={(e) => {
        // e.target is strongly typed to WaInput
        setValue(e.target.value);
      }}
    />
  );
}
```

With `stronglyTypedEvents` enabled in the type generation (which Web Awesome uses by default), both `e.target` and `e.detail` are properly typed, giving you excellent autocomplete and type safety.

```tsx
import { createSignal } from 'solid-js';
import '@awesome.me/webawesome/dist/components/select/select.js';
import '@awesome.me/webawesome/dist/components/option/option.js';

function MyComponent() {
  const [selectedValue, setSelectedValue] = createSignal('');

  return (
    <wa-select
      prop:value={selectedValue()}
      on:wa-change={(e) => {
        // e.target is typed as WaSelect
        // e.detail is typed based on the event definition
        setSelectedValue(e.target.value);
      }}
    >
      <wa-option value="option-1">Option 1</wa-option>
      <wa-option value="option-2">Option 2</wa-option>
      <wa-option value="option-3">Option 3</wa-option>
    </wa-select>
  );
}
```

### Refs and Methods

Access custom element methods using SolidJS refs:

```tsx
import { onMount } from 'solid-js';
import '@awesome.me/webawesome/dist/components/dialog/dialog.js';

function MyComponent() {
  let dialogRef: any;

  onMount(() => {
    // Call custom element methods
    dialogRef?.show();
  });

  return (
    <wa-dialog ref={dialogRef}>
      <div>Dialog content</div>
    </wa-dialog>
  );
}
```

### Setting innerHTML and textContent

SolidJS types include `innerHTML` and `textContent` properties for setting element content:

```tsx
<wa-alert innerHTML="<strong>Bold text</strong>" />
<wa-alert textContent="Plain text content" />
```

### Working with Reactive Values

When working with reactive values (signals, stores, etc.), always use the `prop:` prefix for non-string properties to ensure reactivity works correctly:

```tsx
import { createSignal } from 'solid-js';
import '@awesome.me/webawesome/dist/components/checkbox/checkbox.js';

function MyComponent() {
  const [isChecked, setIsChecked] = createSignal(false);
  const [items, setItems] = createSignal([]);

  return (
    <>
      {/* Use bool: for reactive boolean values */}
      <wa-checkbox 
        bool:checked={isChecked()} 
        on:wa-change={(e) => setIsChecked(e.target.checked)}
      >
        Accept terms
      </wa-checkbox>
      
      {/* Use prop: for reactive object/array values */}
      <wa-select prop:items={items()} />
    </>
  );
}
```

## Example App

Here's a complete example showing various Web Awesome components in a SolidJS app:

```tsx
// App.tsx
import { createSignal } from 'solid-js';
import '@awesome.me/webawesome/dist/styles/webawesome.css';
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/input/input.js';
import '@awesome.me/webawesome/dist/components/alert/alert.js';

function App() {
  const [name, setName] = createSignal('');
  const [showAlert, setShowAlert] = createSignal(false);

  const handleSubmit = () => {
    setShowAlert(true);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Web Awesome + SolidJS</h1>
      
      <wa-input
        value={name()}
        label="Your Name"
        attr:placeholder="Enter your name"
        on:wa-input={(e) => setName(e.target.value)}
      />
      
      <wa-button
        attr:variant="brand"
        on:click={handleSubmit}
        style={{ "margin-top": '1rem' }}
      >
        Submit
      </wa-button>
      
      {showAlert() && (
        <wa-alert
          attr:variant="success"
          bool:open={showAlert()}
          attr:closable
          on:wa-after-hide={() => setShowAlert(false)}
          style={{ "margin-top": '1rem' }}
        >
          Hello, {name()}!
        </wa-alert>
      )}
    </div>
  );
}

export default App;
```

:::tip
Are you using Web Awesome with SolidJS? [Help us improve this page!](https://github.com/shoelace-style/webawesome/blob/next/docs/frameworks/solidjs.md)
:::