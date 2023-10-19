---
meta:
  title: Details
  description: Details show a brief summary and expand to show additional content.
layout: component
---

<!-- cspell:dictionaries lorem-ipsum -->

```html:preview
<wa-details summary="Toggle Me">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
  aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
</wa-details>
```

```jsx:react
import WaDetails from '@shoelace-style/shoelace/dist/react/details';

const App = () => (
  <WaDetails summary="Toggle Me">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </WaDetails>
);
```

## Examples

### Disabled

Use the `disable` attribute to prevent the details from expanding.

```html:preview
<wa-details summary="Disabled" disabled>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
  aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
</wa-details>
```

```jsx:react
import WaDetails from '@shoelace-style/shoelace/dist/react/details';

const App = () => (
  <WaDetails summary="Disabled" disabled>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </WaDetails>
);
```

### Customizing the Summary Icon

Use the `expand-icon` and `collapse-icon` slots to change the expand and collapse icons, respectively. To disable the animation, override the `rotate` property on the `summary-icon` part as shown below.

```html:preview
<wa-details summary="Toggle Me" class="custom-icons">
  <wa-icon name="plus-square" slot="expand-icon"></wa-icon>
  <wa-icon name="dash-square" slot="collapse-icon"></wa-icon>

  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
  aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
</wa-details>

<style>
  wa-details.custom-icons::part(summary-icon) {
    /* Disable the expand/collapse animation */
    rotate: none;
  }
</style>
```

```jsx:react
import WaDetails from '@shoelace-style/shoelace/dist/react/details';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';

const css = `
  wa-details.custom-icon::part(summary-icon) {
    /* Disable the expand/collapse animation */
    rotate: none;
  }
`;

const App = () => (
  <>
    <WaDetails summary="Toggle Me" class="custom-icon">
      <WaIcon name="plus-square" slot="expand-icon" />
      <WaIcon name="dash-square" slot="collapse-icon" />
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat.
    </WaDetails>

    <style>{css}</style>
  </>
);
```

### Grouping Details

Details are designed to function independently, but you can simulate a group or "accordion" where only one is shown at a time by listening for the `wa-show` event.

```html:preview
<div class="details-group-example">
  <wa-details summary="First" open>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </wa-details>

  <wa-details summary="Second">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </wa-details>

  <wa-details summary="Third">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </wa-details>
</div>

<script>
  const container = document.querySelector('.details-group-example');

  // Close all other details when one is shown
  container.addEventListener('sl-show', event => {
    if (event.target.localName === 'sl-details') {
      [...container.querySelectorAll('sl-details')].map(details => (details.open = event.target === details));
    }
  });
</script>

<style>
  .details-group-example wa-details:not(:last-of-type) {
    margin-bottom: var(--wa-space-2xs);
  }
</style>
```
