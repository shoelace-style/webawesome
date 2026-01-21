---
title: React
description: Tips for using Web Awesome in your React app.
layout: page-outline
---

# React

Web Awesome offers a React version of every component to provide an idiomatic experience for React users. You can easily toggle between HTML and React examples throughout the documentation.

## Installation

To add Web Awesome to your React app, install the package from npm.

```bash
npm install @awesome.me/webawesome
```

Next, import the Web Awesome stylesheet, import the components you need, and then start using Web Awesome!

```jsx
// App.jsx (React 19, using native custom elements)
import '@awesome.me/webawesome/dist/styles/webawesome.css';
import '@awesome.me/webawesome/dist/components/button/button.js';

export default function App () {
  return <wa-button>I'm a button!</wa-button>
}
```

Now you can start using components!

### Preact

Preact users facing type errors using components may benefit from setting "paths" in their tsconfig.json so that react types will instead resolve to preact/compat as described in [Preact's typescript documentation](https://preactjs.com/guide/v10/typescript/#typescript-preactcompat-configuration).

## Usage

### Importing Components

Every Web Awesome component is available to import as a React component. Note that we're importing the `<WaButton>` _React component_ instead of the `<wa-button>` _custom element_ in the example below.

```jsx
import WaButton from '@awesome.me/webawesome/react/button/index.js';

const MyComponent = () => <WaButton variant="primary">Click me</WaButton>;

export default MyComponent;
```

#### Notes about tree shaking

Previously, it was recommended to import from a single entrypoint like so:

```jsx
import { WaButton } from '@awesome.me/webawesome/dist/react';
```

However, tree-shaking extra Web Awesome components proved to be a challenge. As a result, we now recommend cherry-picking components you want to use, rather than importing from a single entrypoint.

```diff
- import { WaButton } from '@awesome.me/webawesome/dist/react';
+ import WaButton from '@awesome.me/webawesome/dist/react/button/index.js';
```

You can find a copy + paste import for each component in the "importing" section of its documentation.

### Event Handling

Many Web Awesome components emit [native events](https://developer.mozilla.org/en-US/docs/Web/API/Event). For example, the [input component](/components/input) emits the `input` event when it receives input. In React, you can listen for the event using `onInput`.

Here's how you can bind the input's value to a state variable.

```jsx
import { useState } from 'react';
import WaInput from '@awesome.me/webawesome/dist/react/input/index.js';

function MyComponent() {
  const [value, setValue] = useState('');

  return <>
    <WaInput value={value} onInput={event => setValue(event.target.value)} />;
    <WaInput defaultValue={"Foo"} /> {/* This is an "uncontrolled input" */}
  </>
}

export default MyComponent;
```

If you're using TypeScript, it's important to note that `event.target` will be a reference to the underlying custom element. You can use `(event.target as any).value` as a quick fix, or you can strongly type the event target as shown below.

```tsx
import { useState } from 'react';
import WaInput from '@awesome.me/webawesome/dist/react/input/index.js';
import type WaInputElement from '@awesome.me/webawesome/dist/components/input/input.js';

function MyComponent() {
  const [value, setValue] = useState('');

  return <WaInput value={value} onInput={event => setValue((event.target as WaInputElement).value)} />;
}

export default MyComponent;
```

You can also import the event type for use in your callbacks, shown below.

```tsx
import { useCallback, useState } from 'react';
import WaInput, { type WaInputEvent } from '@awesome.me/webawesome/dist/react/input/index.js';
import type WaInputElement from '@awesome.me/webawesome/dist/components/input/input.js';

function MyComponent() {
  const [value, setValue] = useState('');
  const onInput = useCallback((event: WaInputEvent) => {
    setValue(event.detail);
  }, []);

  return <WaInput value={value} onInput={event => setValue((event.target as WaInputElement).value)} />;
}

export default MyComponent;
```

## Testing with Jest

Testing with web components can be challenging if your test environment runs in a Node environment (i.e. it doesn't run in a real browser). Fortunately, [Jest](https://jestjs.io/) has made a number of strides to support web components and provide additional browser APIs. However, it's still not a complete replication of a browser environment.

Here are some tips that will help smooth things over if you're having trouble with Jest + Web Awesome.

:::tip
If you're looking for a fast, modern testing alternative, consider [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/).
:::

### Upgrade Jest

Jest underwent a major revamp and received support for web components in [version 26.5.0](https://github.com/facebook/jest/blob/main/CHANGELOG.md#2650) when it introduced [JSDOM 16.2.0](https://github.com/jsdom/jsdom/blob/master/Changelog.md#1620). This release also included a number of mocks for built-in browser functions such as `MutationObserver`, `document.createRange`, and others.

If you're using [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app), you can update `react-scripts` which will also update Jest.

```
npm install react-scripts@latest
```

### Mock Missing APIs

Some components use `window.matchMedia`, but this function isn't supported by JSDOM so you'll need to mock it yourself.

In `src/setupTests.js`, add the following.

```js
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});
```

For more details, refer to Jest's [manual mocking](https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom) documentation.

### Transform ES Modules

ES Modules are a [well-supported browser standard](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/). This is how Web Awesome is distributed, but most React apps expect CommonJS. As a result, you'll probably run into the following error.

```
Error: Unable to import outside of a module
```

To fix this, add the following to your `package.json` which tells the transpiler to process Web Awesome modules.

```js
{
  "jest": {
    "transformIgnorePatterns": ["node_modules/(?!(@awesome.me|lit|@lit-labs))"]
  }
}
```

These instructions are for apps created via Create React App. If you're using Jest directly, you can add `transformIgnorePatterns` directly into `jest.config.js`.

For more details, refer to Jest's [`transformIgnorePatterns` customization](https://jestjs.io/docs/tutorial-react-native#transformignorepatterns-customization) documentation.

:::tip
Are you using Web Awesome with React? [Help us improve this page!](https://github.com/shoelace-style/webawesome/blob/next/docs/frameworks/react.md)
:::