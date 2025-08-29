---
title: Alert
description: Alerts are used to display important messages inline or as toast notifications.
layout: component
---

```html {.example}
<wa-alert open>
  <wa-callout variant="brand">
    <wa-icon slot="icon" name="info"></wa-icon>
    This is a standard alert. You can customize its content and even the icon.
  </wa-callout>
</wa-alert>
```

:::info
Alerts will not be visible if the `open` attribute is not present.
:::

## Basic alerts

The alert component enhances a callout component with alert-specific behaviors. Use the callout's `variant` attribute to set the alert's severity level.

```html {.example}
<wa-alert open>
  <wa-callout variant="brand">
    <wa-icon slot="icon" name="circle-info" variant="regular"></wa-icon>
    <strong>This is super informative</strong><br />
    You can tell by how pretty the alert is.
  </wa-callout>
</wa-alert>

<br />

<wa-alert open>
  <wa-callout variant="neutral">
    <wa-icon slot="icon" name="settings" library="system"></wa-icon>
    <strong>Your settings have been updated</strong><br />
    Settings will take effect on next login.
  </wa-callout>
</wa-alert>

<br />

<wa-alert open>
  <wa-callout variant="success">
    <wa-icon slot="icon" name="circle-check" variant="regular"></wa-icon>
    <strong>Your changes have been saved</strong><br />
    You can safely exit the app now.
  </wa-callout>
</wa-alert>

<br />

<wa-alert open>
  <wa-callout variant="warning">
    <wa-icon slot="icon" name="triangle-exclamation" variant="regular"></wa-icon>
    <strong>Your session has ended</strong><br />
    Please log in again to continue.
  </wa-callout>
</wa-alert>

<br />

<wa-alert open>
  <wa-callout variant="danger">
    <wa-icon slot="icon" name="circle-exclamation" variant="regular"></wa-icon>
    <strong>Your account has been deleted</strong><br />
    We're very sorry to see you go!
  </wa-callout>
</wa-alert>
```

## Icons

Icons are optional. Simply omit the `icon` slot in the callout if you don't want them.

```html {.example}
<wa-alert open>
  <wa-callout variant="brand">Nothing fancy here, just a simple alert.</wa-callout>
</wa-alert>
```

## Actions

An alert can have an action, such as a close or undo button.

### Closable

Add the `closable` attribute to show a close button that will hide the alert.

```html {.example}
<wa-alert open closable class="alert-closable">
  <wa-callout variant="brand">
    <wa-icon slot="icon" name="circle-info" variant="regular"></wa-icon>
    You can close this alert any time!
  </wa-callout>
</wa-alert>

<br />

<wa-alert open closable class="alert-closable">
  <wa-callout variant="brand">
    <wa-icon slot="icon" name="circle-info" variant="regular"></wa-icon>
    You can close this alert any time!
    <wa-button slot="action" size="small" variant="brand" data-alert="close">UNDO</wa-button>
  </wa-callout>
</wa-alert>

<script>
  const alerts = document.querySelectorAll('.alert-closable');
  alerts.forEach(alert => {
    alert.addEventListener('wa-after-hide', () => {
      setTimeout(() => (alert.open = true), 2000);
    });
  });
</script>
```

### Duration

Set the `duration` attribute to automatically hide an alert after a period of time. This is useful for alerts that don't require acknowledgement.

```html {.example}
<div class="alert-duration">
  <wa-button variant="brand">Show Alert</wa-button>

  <wa-alert duration="3000" closable>
    <wa-callout variant="brand">
      <wa-icon slot="icon" name="info"></wa-icon>
      This alert will automatically hide itself after three seconds, unless you interact with it.
    </wa-callout>
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

## Countdown

Set the `countdown` attribute to display a loading bar that indicates the alert remaining time. This is useful for alerts with relatively long duration.

```html {.example}
<div class="alert-countdown">
  <wa-button variant="brand">Show Alert</wa-button>

  <wa-alert duration="10000" countdown closable>
    <wa-callout variant="brand">
      <wa-icon slot="icon" name="info"></wa-icon>
      You're not stuck, the alert will close after a pretty long duration.
    </wa-callout>
  </wa-alert>
</div>

<script>
  const container = document.querySelector('.alert-countdown');
  const button = container.querySelector('wa-button');
  const alert = container.querySelector('wa-alert');

  button.addEventListener('click', () => alert.show());
</script>

<style>
  .alert-countdown wa-alert {
    margin-top: var(--wa-space-m);
  }
</style>
```

## Toast Notifications

To display an alert as a toast notification, or "toast", create the alert and call its `toast()` method. This will move the alert out of its position in the DOM and into [the toast stack](#the-toast-stack) where it will be shown. Once dismissed, it will be removed from the DOM completely. To reuse a toast, store a reference to it and call `toast()` again later on.

You should always use the `closable` attribute so users can dismiss the notification. It's also common to set a reasonable `duration` when the notification doesn't require acknowledgement.

```html {.example}
<div class="alert-toast">
  <wa-button variant="brand">Brand</wa-button>
  <wa-button variant="neutral">Neutral</wa-button>
  <wa-button variant="success">Success</wa-button>
  <wa-button variant="warning">Warning</wa-button>
  <wa-button variant="danger">Danger</wa-button>

  <wa-alert duration="3000" closable>
    <wa-callout variant="brand">
      <wa-icon slot="icon" name="info"></wa-icon>
      <strong>This is super informative</strong><br />
      You can tell by how pretty the alert is.
    </wa-callout>
  </wa-alert>

  <wa-alert duration="3000" closable>
    <wa-callout variant="neutral">
      <wa-icon slot="icon" name="settings" library="system"></wa-icon>
      <strong>Your settings have been updated</strong><br />
      Settings will take effect on next login.
    </wa-callout>
  </wa-alert>

  <wa-alert duration="3000" closable>
    <wa-callout variant="success">
      <wa-icon slot="icon" name="task_alt"></wa-icon>
      <strong>Your changes have been saved</strong><br />
      You can safely exit the app now.
    </wa-callout>
  </wa-alert>

  <wa-alert duration="3000" closable>
    <wa-callout variant="warning">
      <wa-icon slot="icon" name="warning" library="system"></wa-icon>
      <strong>Your session has ended</strong><br />
      Please login again to continue.
    </wa-callout>
  </wa-alert>

  <wa-alert duration="3000" closable>
    <wa-callout variant="danger">
      <wa-icon slot="icon" name="report"></wa-icon>
      <strong>Your account has been deleted</strong><br />
      We're very sorry to see you go!
    </wa-callout>
  </wa-alert>
</div>

<script>
  const container = document.querySelector('.alert-toast');

  ['brand', 'neutral', 'success', 'warning', 'danger'].map(variant => {
    const button = container.querySelector(`wa-button[variant="${variant}"]`);
    const alert = container.querySelector(`wa-alert:has(wa-callout[variant="${variant}"])`);

    button.addEventListener('click', () => alert.toast());
  });
</script>
```

### Creating Toasts Imperatively

For convenience, you can create a utility that emits toast notifications with a function call rather than composing them in your HTML. To do this, generate the alert with JavaScript, append it to the body, and call the `toast()` method as shown in the example below.

```html {.example}
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
  function notify(message, variant = 'brand', icon = 'info', duration = 3000) {
    const alert = document.createElement('wa-alert');
    const callout = document.createElement('wa-callout');
    const iconEl = document.createElement('wa-icon');

    Object.assign(alert, {
      closable: true,
      duration: duration
    });

    Object.assign(callout, {
      variant: variant
    });

    Object.assign(iconEl, {
      name: icon,
      slot: 'icon'
    });

    callout.appendChild(iconEl);
    callout.insertAdjacentHTML('beforeend', escapeHtml(message));
    alert.appendChild(callout);

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

:::info
By design, it is not possible to show toasts in more than one stack simultaneously. Such behavior is confusing and makes for a poor user experience.
:::

## Accessibility

When the component is dynamically displayed, the content is automatically announced by most screen readers. At this time, screen readers do not inform users of alerts that are present when the page loads.

Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (for example the visible text), or is included through alternative means, such as additional hidden text.

Actions must have a tab index of 0 so that they can be reached by keyboard-only users.
