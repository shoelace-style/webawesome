---
meta:
  title: Alert
  description: Alerts are used to display important messages inline or as toast notifications.
layout: component
---

```html:preview
<wa-alert open>
  <wa-icon slot="icon" name="info-circle" variant="regular"></wa-icon>
  This is a standard alert. You can customize its content and even the icon.
</wa-alert>
```

```jsx:react
import WaAlert from '@shoelace-style/shoelace/dist/react/alert';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';

const App = () => (
  <WaAlert open>
    <WaIcon slot="icon" name="info-circle" variant="regular" />
    This is a standard alert. You can customize its content and even the icon.
  </WaAlert>
);
```

:::warning
Alerts will not be visible if the `open` attribute is not present.
:::

## Examples

### Variants

Set the `variant` attribute to change the alert's variant.

```html:preview
<wa-alert variant="brand" open>
  <wa-icon slot="icon" name="circle-info" variant="regular"></wa-icon>
  <strong>This is super informative</strong><br />
  You can tell by how pretty the alert is.
</wa-alert>

<br />

<wa-alert variant="success" open>
  <wa-icon slot="icon" name="circle-check" variant="regular"></wa-icon>
  <strong>Your changes have been saved</strong><br />
  You can safely exit the app now.
</wa-alert>

<br />

<wa-alert variant="neutral" open>
  <wa-icon slot="icon" name="gear" variant="regular"></wa-icon>
  <strong>Your settings have been updated</strong><br />
  Settings will take effect on next login.
</wa-alert>

<br />

<wa-alert variant="warning" open>
  <wa-icon slot="icon" name="exclamation-circle" variant="regular"></wa-icon>
  <strong>Your session has ended</strong><br />
  Please login again to continue.
</wa-alert>

<br />

<wa-alert variant="danger" open>
  <wa-icon slot="icon" name="exclamation-triangle" variant="regular"></wa-icon>
  <strong>Your account has been deleted</strong><br />
  We're very sorry to see you go!
</wa-alert>
```

```jsx:react
import WaAlert from '@shoelace-style/shoelace/dist/react/alert';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';

const App = () => (
  <>
    <WaAlert variant="brand" open>
      <WaIcon slot="icon" name="info-circle" variant="regular" />
      <strong>This is super informative</strong>
      <br />
      You can tell by how pretty the alert is.
    </WaAlert>

    <br />

    <WaAlert variant="success" open>
      <WaIcon slot="icon" name="check2-circle" variant="regular" />
      <strong>Your changes have been saved</strong>
      <br />
      You can safely exit the app now.
    </WaAlert>

    <br />

    <WaAlert variant="neutral" open>
      <WaIcon slot="icon" name="gear" variant="regular" />
      <strong>Your settings have been updated</strong>
      <br />
      Settings will take effect on next login.
    </WaAlert>

    <br />

    <WaAlert variant="warning" open>
      <WaIcon slot="icon" name="exclamation-circle" variant="regular" />
      <strong>Your session has ended</strong>
      <br />
      Please login again to continue.
    </WaAlert>

    <br />

    <WaAlert variant="danger" open>
      <WaIcon slot="icon" name="exclamation-triangle" variant="regular" />
      <strong>Your account has been deleted</strong>
      <br />
      We're very sorry to see you go!
    </WaAlert>
  </>
);
```

### Closable

Add the `closable` attribute to show a close button that will hide the alert.

```html:preview
<wa-alert variant="brand" open closable class="alert-closable">
  <wa-icon slot="icon" name="info-circle" variant="regular"></wa-icon>
  You can close this alert any time!
</wa-alert>

<script>
  const alert = document.querySelector('.alert-closable');
  alert.addEventListener('wa-after-hide', () => {
    setTimeout(() => (alert.open = true), 2000);
  });
</script>
```

```jsx:react
import { useState } from 'react';
import WaAlert from '@shoelace-style/shoelace/dist/react/alert';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';

const App = () => {
  const [open, setOpen] = useState(true);

  function handleHide() {
    setOpen(false);
    setTimeout(() => setOpen(true), 2000);
  }

  return (
    <WaAlert open={open} closable onWaAfterHide={handleHide}>
      <WaIcon slot="icon" name="info-circle" variant="regular" />
      You can close this alert any time!
    </WaAlert>
  );
};
```

### Without Icons

Icons are optional. Simply omit the `icon` slot if you don't want them.

```html:preview
<wa-alert variant="brand" open> Nothing fancy here, just a simple alert. </wa-alert>
```

```jsx:react
import WaAlert from '@shoelace-style/shoelace/dist/react/alert';

const App = () => (
  <WaAlert variant="brand" open>
    Nothing fancy here, just a simple alert.
  </WaAlert>
);
```

### Duration

Set the `duration` attribute to automatically hide an alert after a period of time. This is useful for alerts that don't require acknowledgement.

```html:preview
<div class="alert-duration">
  <wa-button variant="brand">Show Alert</wa-button>

  <wa-alert variant="brand" duration="3000" closable>
    <wa-icon slot="icon" name="info-circle" variant="regular"></wa-icon>
    This alert will automatically hide itself after three seconds, unless you interact with it.
  </wa-alert>
</div>

<script>
  const container = document.querySelector('.alert-duration');
  const button = container.querySelector('wa-button');
  const alert = container.querySelector('wa-alert');

  button.addEventListener('click', () => alert.show());
</script>

<style>
  .alert-duration wa-alert {
    margin-top: var(--wa-space-m);
  }
</style>
```

```jsx:react
import { useState } from 'react';
import WaAlert from '@shoelace-style/shoelace/dist/react/alert';
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';

const css = `
  .alert-duration wa-alert {
    margin-top: var(--wa-space-m);
  }
`;

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="alert-duration">
        <WaButton variant="brand" onClick={() => setOpen(true)}>
          Show Alert
        </WaButton>

        <WaAlert variant="brand" duration="3000" open={open} closable onWaAfterHide={() => setOpen(false)}>
          <WaIcon slot="icon" name="info-circle" variant="regular" />
          This alert will automatically hide itself after three seconds, unless you interact with it.
        </WaAlert>
      </div>

      <style>{css}</style>
    </>
  );
};
```

### Toast Notifications

To display an alert as a toast notification, or "toast", create the alert and call its `toast()` method. This will move the alert out of its position in the DOM and into [the toast stack](#the-toast-stack) where it will be shown. Once dismissed, it will be removed from the DOM completely. To reuse a toast, store a reference to it and call `toast()` again later on.

You should always use the `closable` attribute so users can dismiss the notification. It's also common to set a reasonable `duration` when the notification doesn't require acknowledgement.

```html:preview
<div class="alert-toast">
  <wa-button variant="brand">Brand</wa-button>
  <wa-button variant="success">Success</wa-button>
  <wa-button variant="neutral">Neutral</wa-button>
  <wa-button variant="warning">Warning</wa-button>
  <wa-button variant="danger">Danger</wa-button>

  <wa-alert variant="brand" duration="3000" closable>
    <wa-icon slot="icon" name="circle-info" variant="regular"></wa-icon>
    <strong>This is super informative</strong><br />
    You can tell by how pretty the alert is.
  </wa-alert>

  <wa-alert variant="success" duration="3000" closable>
    <wa-icon slot="icon" name="circle-check" variant="regular"></wa-icon>
    <strong>Your changes have been saved</strong><br />
    You can safely exit the app now.
  </wa-alert>

  <wa-alert variant="neutral" duration="3000" closable>
    <wa-icon slot="icon" name="gear" variant="regular"></wa-icon>
    <strong>Your settings have been updated</strong><br />
    Settings will take effect on next login.
  </wa-alert>

  <wa-alert variant="warning" duration="3000" closable>
    <wa-icon slot="icon" name="circle-exclamation" variant="regular"></wa-icon>
    <strong>Your session has ended</strong><br />
    Please login again to continue.
  </wa-alert>

  <wa-alert variant="danger" duration="3000" closable>
    <wa-icon slot="icon" name="triangle-exclamation" variant="regular"></wa-icon>
    <strong>Your account has been deleted</strong><br />
    We're very sorry to see you go!
  </wa-alert>
</div>

<script>
  const container = document.querySelector('.alert-toast');

  ['brand', 'success', 'neutral', 'warning', 'danger'].map(variant => {
    const button = container.querySelector(`wa-button[variant="${variant}"]`);
    const alert = container.querySelector(`wa-alert[variant="${variant}"]`);

    button.addEventListener('click', () => alert.toast());
  });
</script>
```

```jsx:react
import { useRef } from 'react';
import WaAlert from '@shoelace-style/shoelace/dist/react/alert';
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaIcon from '@shoelace-style/shoelace/dist/react/icon';

function showToast(alert) {
  alert.toast();
}

const App = () => {
  const brand = useRef(null);
  const success = useRef(null);
  const neutral = useRef(null);
  const warning = useRef(null);
  const danger = useRef(null);

  return (
    <>
      <WaButton variant="brand" onClick={() => brand.current.toast()}>
        Brand
      </WaButton>

      <WaButton variant="success" onClick={() => success.current.toast()}>
        Success
      </WaButton>

      <WaButton variant="neutral" onClick={() => neutral.current.toast()}>
        Neutral
      </WaButton>

      <WaButton variant="warning" onClick={() => warning.current.toast()}>
        Warning
      </WaButton>

      <WaButton variant="danger" onClick={() => danger.current.toast()}>
        Danger
      </WaButton>

      <WaAlert ref={brand} variant="brand" duration="3000" closable>
        <WaIcon slot="icon" name="circle-info" variant="regular" />
        <strong>This is super informative</strong>
        <br />
        You can tell by how pretty the alert is.
      </WaAlert>

      <WaAlert ref={success} variant="success" duration="3000" closable>
        <WaIcon slot="icon" name="circle-check" variant="regular" />
        <strong>Your changes have been saved</strong>
        <br />
        You can safely exit the app now.
      </WaAlert>

      <WaAlert ref={neutral} variant="neutral" duration="3000" closable>
        <WaIcon slot="icon" name="gear" variant="regular" />
        <strong>Your settings have been updated</strong>
        <br />
        Settings will take effect on next login.
      </WaAlert>

      <WaAlert ref={warning} variant="warning" duration="3000" closable>
        <WaIcon slot="icon" name="circle-exclamation" variant="regular" />
        <strong>Your session has ended</strong>
        <br />
        Please login again to continue.
      </WaAlert>

      <WaAlert ref={danger} variant="danger" duration="3000" closable>
        <WaIcon slot="icon" name="triangle-exclamation" variant="regular" />
        <strong>Your account has been deleted</strong>
        <br />
        We're very sorry to see you go!
      </WaAlert>
    </>
  );
};
```

### Creating Toasts Imperatively

For convenience, you can create a utility that emits toast notifications with a function call rather than composing them in your HTML. To do this, generate the alert with JavaScript, append it to the body, and call the `toast()` method as shown in the example below.

```html:preview
<div class="alert-toast-wrapper">
  <wa-button variant="brand">Create Toast</wa-button>
</div>

<script>
  const container = document.querySelector('.alert-toast-wrapper');
  const button = container.querySelector('wa-button');
  let count = 0;

  // Always escape HTML for text arguments!
  function escapeHtml(html) {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  }

  // Custom function to emit toast notifications
  function notify(message, variant = 'brand', icon = 'circle-info', duration = 3000) {
    const alert = Object.assign(document.createElement('wa-alert'), {
      variant,
      closable: true,
      duration: duration,
      innerHTML: `
        <wa-icon name="${icon}" variant="regular" slot="icon"></wa-icon>
        ${escapeHtml(message)}
      `
    });

    document.body.append(alert);
    return alert.toast();
  }

  button.addEventListener('click', () => {
    notify(`This is custom toast #${++count}`);
  });
</script>
```

### The Toast Stack

The toast stack is a fixed position singleton element created and managed internally by the alert component. It will be added and removed from the DOM as needed when toasts are shown. When more than one toast is visible, they will stack vertically in the toast stack.

By default, the toast stack is positioned at the top-right of the viewport. You can change its position by targeting `.wa-toast-stack` in your stylesheet. To make toasts appear at the top-left of the viewport, for example, use the following styles.

```css
.wa-toast-stack {
  left: 0;
  right: auto;
}
```

:::tip
By design, it is not possible to show toasts in more than one stack simultaneously. Such behavior is confusing and makes for a poor user experience.
:::
