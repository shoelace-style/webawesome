---
meta:
  title: Mutation Observer
  description: The Mutation Observer component offers a thin, declarative interface to the MutationObserver API.
layout: component
---

The mutation observer will report changes to the content it wraps through the `wa-mutation` event. When emitted, a collection of [MutationRecord](https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord) objects will be attached to `event.detail` that contains information about how it changed.

```html:preview
<div class="mutation-overview">
  <wa-mutation-observer attr="variant">
    <wa-button variant="brand">Click to mutate</wa-button>
  </wa-mutation-observer>

  <br />
  👆 Click the button and watch the console

  <script>
    const container = document.querySelector('.mutation-overview');
    const mutationObserver = container.querySelector('wa-mutation-observer');
    const button = container.querySelector('wa-button');
    const variants = ['brand', 'success', 'neutral', 'warning', 'danger'];
    let clicks = 0;

    // Change the button's variant attribute
    button.addEventListener('click', () => {
      clicks++;
      button.setAttribute('variant', variants[clicks % variants.length]);
    });

    // Log mutations
    mutationObserver.addEventListener('wa-mutation', event => {
      console.log(event.detail);
    });
  </script>

  <style>
    .mutation-overview wa-button {
      margin-bottom: 1rem;
    }
  </style>
</div>
```

```jsx:react
import { useState } from 'react';
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaMutationObserver from '@shoelace-style/shoelace/dist/react/mutation-observer';

const css = `
  .mutation-overview wa-button {
    margin-bottom: 1rem;
  }
`;

const variants = ['brand', 'success', 'neutral', 'warning', 'danger'];
let clicks = 0;

const App = () => {
  const [variant, setVariant] = useState('brand');

  function handleClick() {
    clicks++;
    setVariant(variants[clicks % variants.length]);
  }

  return (
    <>
      <WaMutationObserver attr="*" onWaMutation={event => console.log(event.detail)}>
        <WaButton variant={variant} onClick={handleClick}>
          Click to mutate
        </WaButton>
      </WaMutationObserver>

    <br />
    👆 Click the button and watch the console

      <style>{css}</style>
    </>
  );
};
```

:::tip
When you create a mutation observer, you must indicate what changes it should respond to by including at least one of `attr`, `child-list`, or `char-data`. If you don't specify at least one of these attributes, no mutation events will be emitted.
:::

## Examples

### Child List

Use the `child-list` attribute to watch for new child elements that are added or removed.

```html:preview
<div class="mutation-child-list">
  <wa-mutation-observer child-list>
    <div class="buttons">
      <wa-button variant="brand">Add button</wa-button>
    </div>
  </wa-mutation-observer>

  👆 Add and remove buttons and watch the console

  <script>
    const container = document.querySelector('.mutation-child-list');
    const mutationObserver = container.querySelector('wa-mutation-observer');
    const buttons = container.querySelector('.buttons');
    const button = container.querySelector('wa-button[variant="brand"]');
    let i = 0;

    // Add a button
    button.addEventListener('click', () => {
      const button = document.createElement('wa-button');
      button.textContent = ++i;
      buttons.append(button);
    });

    // Remove a button
    buttons.addEventListener('click', event => {
      const target = event.target.closest('wa-button:not([variant="brand"])');
      event.stopPropagation();

      if (target) {
        target.remove();
      }
    });

    // Log mutations
    mutationObserver.addEventListener('wa-mutation', event => {
      console.log(event.detail);
    });
  </script>

  <style>
    .mutation-child-list .buttons {
      display: flex;
      gap: 0.25rem;
      flex-wrap: wrap;
      margin-bottom: 1rem;
    }
  </style>
</div>
```

```jsx:react
import { useState } from 'react';
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaMutationObserver from '@shoelace-style/shoelace/dist/react/mutation-observer';

const css = `
  .mutation-child-list .buttons {
    display: flex;
    gap: .25rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }
`;

let buttonCount = 0;

const App = () => {
  const [buttonIds, setButtonIds] = useState([]);

  function addButton() {
    setButtonIds([...buttonIds, ++buttonCount]);
  }

  function removeButton(id) {
    setButtonIds(buttonIds.filter(i => i !== id));
  }

  return (
    <>
      <div className="mutation-child-list">
        <WaMutationObserver child-list onWaMutation={event => console.log(event.detail)}>
          <div className="buttons">
            <WaButton variant="brand" onClick={addButton}>
              Add button
            </WaButton>
            {buttonIds.map(id => (
              <WaButton key={id} variant="default" onClick={() => removeButton(id)}>
                {id}
              </WaButton>
            ))}
          </div>
        </WaMutationObserver>
      </div>
      👆 Add and remove buttons and watch the console
      <style>{css}</style>
    </>
  );
};
```
