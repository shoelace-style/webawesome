---
title: Tab Group
description: Tab groups organize content into a container that shows one section at a time.
layout: component
category: Navigation
---

Tab groups make use of [tabs](/docs/components/tab) and [tab panels](/docs/components/tab-panel). Each panel should have a name that's unique within the tab group, and tabs should have a `panel` attribute that points to the respective panel's name.

```html {.example}
<wa-tab-group>
  <wa-tab panel="general">General</wa-tab>
  <wa-tab panel="custom">Custom</wa-tab>
  <wa-tab panel="advanced">Advanced</wa-tab>
  <wa-tab panel="disabled" disabled>Disabled</wa-tab>

  <wa-tab-panel name="general">This is the general tab panel.</wa-tab-panel>
  <wa-tab-panel name="custom">This is the custom tab panel.</wa-tab-panel>
  <wa-tab-panel name="advanced">This is the advanced tab panel.</wa-tab-panel>
  <wa-tab-panel name="disabled">This is a disabled tab panel.</wa-tab-panel>
</wa-tab-group>
```

## Examples

### Setting the Active Tab

To make a tab active, set the `active` attribute to the name of the appropriate panel.

```html {.example}
<wa-tab-group active="advanced">
  <wa-tab panel="general">General</wa-tab>
  <wa-tab panel="custom">Custom</wa-tab>
  <wa-tab panel="advanced">Advanced</wa-tab>

  <wa-tab-panel name="general">This is the general tab panel.</wa-tab-panel>
  <wa-tab-panel name="custom">This is the custom tab panel.</wa-tab-panel>
  <wa-tab-panel name="advanced">This is the advanced tab panel.</wa-tab-panel>
</wa-tab-group>
```

### Tabs on Bottom

Tabs can be shown on the bottom by setting `placement` to `bottom`.

```html {.example}
<wa-tab-group placement="bottom">
  <wa-tab panel="general">General</wa-tab>
  <wa-tab panel="custom">Custom</wa-tab>
  <wa-tab panel="advanced">Advanced</wa-tab>
  <wa-tab panel="disabled" disabled>Disabled</wa-tab>

  <wa-tab-panel name="general">This is the general tab panel.</wa-tab-panel>
  <wa-tab-panel name="custom">This is the custom tab panel.</wa-tab-panel>
  <wa-tab-panel name="advanced">This is the advanced tab panel.</wa-tab-panel>
  <wa-tab-panel name="disabled">This is a disabled tab panel.</wa-tab-panel>
</wa-tab-group>
```

### Tabs on Start

Tabs can be shown on the starting side by setting `placement` to `start`.

```html {.example}
<wa-tab-group placement="start">
  <wa-tab panel="general">General</wa-tab>
  <wa-tab panel="custom">Custom</wa-tab>
  <wa-tab panel="advanced">Advanced</wa-tab>
  <wa-tab panel="disabled" disabled>Disabled</wa-tab>

  <wa-tab-panel name="general">This is the general tab panel.</wa-tab-panel>
  <wa-tab-panel name="custom">This is the custom tab panel.</wa-tab-panel>
  <wa-tab-panel name="advanced">This is the advanced tab panel.</wa-tab-panel>
  <wa-tab-panel name="disabled">This is a disabled tab panel.</wa-tab-panel>
</wa-tab-group>
```

### Tabs on End

Tabs can be shown on the ending side by setting `placement` to `end`.

```html {.example}
<wa-tab-group placement="end">
  <wa-tab panel="general">General</wa-tab>
  <wa-tab panel="custom">Custom</wa-tab>
  <wa-tab panel="advanced">Advanced</wa-tab>
  <wa-tab panel="disabled" disabled>Disabled</wa-tab>

  <wa-tab-panel name="general">This is the general tab panel.</wa-tab-panel>
  <wa-tab-panel name="custom">This is the custom tab panel.</wa-tab-panel>
  <wa-tab-panel name="advanced">This is the advanced tab panel.</wa-tab-panel>
  <wa-tab-panel name="disabled">This is a disabled tab panel.</wa-tab-panel>
</wa-tab-group>
```

### Closable Tabs

You can make a tab closable by adding a close button next to the tab and inside the `nav` slot. You can position the button to your liking with CSS and handle close/restore behaviors by removing/appending the tab as desired. Note the use of `tabindex="-1"`, which prevents the close button from interfering with the tab order. The close button is still recognizable to the virtual cursor in screen readers.

```html {.example}
<wa-tab-group class="tabs-closable">
  <wa-tab panel="general">General</wa-tab>
  <wa-tab panel="closable">Closable</wa-tab>
  <wa-button slot="nav" tabindex="-1" appearance="plain" size="small">
    <wa-icon name="xmark" label="Close the closable tab"></wa-icon>
  </wa-button>
  <wa-tab panel="closable-2">Advanced</wa-tab>

  <wa-tab-panel name="general">This is the general tab panel.</wa-tab-panel>
  <wa-tab-panel name="closable">This is the closable tab panel.</wa-tab-panel>
  <wa-tab-panel name="advanced">This is the advanced tab panel.</wa-tab-panel>
</wa-tab-group>

<br />

<wa-button disabled>Restore tab</wa-button>

<style>
  .tabs-closable wa-button {
    position: relative;
    left: -1.5em;
    top: 0.675em;
  }
</style>

<script>
  const tabGroup = document.querySelector('.tabs-closable');
  const generalTab = tabGroup.querySelectorAll('wa-tab')[0];
  const closableTab = tabGroup.querySelectorAll('wa-tab')[1];
  const closeButton = tabGroup.querySelector('wa-button');
  const restoreButton = tabGroup.nextElementSibling.nextElementSibling;

  // Remove the tab when the close button is clicked
  closeButton.addEventListener('click', () => {
    closableTab.remove();
    closeButton.remove();
    restoreButton.disabled = false;
  });

  // Restore the tab
  restoreButton.addEventListener('click', () => {
    restoreButton.disabled = true;
    generalTab.insertAdjacentElement('afterend', closeButton);
    generalTab.insertAdjacentElement('afterend', closableTab);
  });
</script>
```

### Scrolling Tabs

When there are more tabs than horizontal space allows, the nav will be scrollable.

```html {.example}
<wa-tab-group>
  <wa-tab panel="tab-1">Tab 1</wa-tab>
  <wa-tab panel="tab-2">Tab 2</wa-tab>
  <wa-tab panel="tab-3">Tab 3</wa-tab>
  <wa-tab panel="tab-4">Tab 4</wa-tab>
  <wa-tab panel="tab-5">Tab 5</wa-tab>
  <wa-tab panel="tab-6">Tab 6</wa-tab>
  <wa-tab panel="tab-7">Tab 7</wa-tab>
  <wa-tab panel="tab-8">Tab 8</wa-tab>
  <wa-tab panel="tab-9">Tab 9</wa-tab>
  <wa-tab panel="tab-10">Tab 10</wa-tab>
  <wa-tab panel="tab-11">Tab 11</wa-tab>
  <wa-tab panel="tab-12">Tab 12</wa-tab>
  <wa-tab panel="tab-13">Tab 13</wa-tab>
  <wa-tab panel="tab-14">Tab 14</wa-tab>
  <wa-tab panel="tab-15">Tab 15</wa-tab>
  <wa-tab panel="tab-16">Tab 16</wa-tab>
  <wa-tab panel="tab-17">Tab 17</wa-tab>
  <wa-tab panel="tab-18">Tab 18</wa-tab>
  <wa-tab panel="tab-19">Tab 19</wa-tab>
  <wa-tab panel="tab-20">Tab 20</wa-tab>

  <wa-tab-panel name="tab-1">Tab panel 1</wa-tab-panel>
  <wa-tab-panel name="tab-2">Tab panel 2</wa-tab-panel>
  <wa-tab-panel name="tab-3">Tab panel 3</wa-tab-panel>
  <wa-tab-panel name="tab-4">Tab panel 4</wa-tab-panel>
  <wa-tab-panel name="tab-5">Tab panel 5</wa-tab-panel>
  <wa-tab-panel name="tab-6">Tab panel 6</wa-tab-panel>
  <wa-tab-panel name="tab-7">Tab panel 7</wa-tab-panel>
  <wa-tab-panel name="tab-8">Tab panel 8</wa-tab-panel>
  <wa-tab-panel name="tab-9">Tab panel 9</wa-tab-panel>
  <wa-tab-panel name="tab-10">Tab panel 10</wa-tab-panel>
  <wa-tab-panel name="tab-11">Tab panel 11</wa-tab-panel>
  <wa-tab-panel name="tab-12">Tab panel 12</wa-tab-panel>
  <wa-tab-panel name="tab-13">Tab panel 13</wa-tab-panel>
  <wa-tab-panel name="tab-14">Tab panel 14</wa-tab-panel>
  <wa-tab-panel name="tab-15">Tab panel 15</wa-tab-panel>
  <wa-tab-panel name="tab-16">Tab panel 16</wa-tab-panel>
  <wa-tab-panel name="tab-17">Tab panel 17</wa-tab-panel>
  <wa-tab-panel name="tab-18">Tab panel 18</wa-tab-panel>
  <wa-tab-panel name="tab-19">Tab panel 19</wa-tab-panel>
  <wa-tab-panel name="tab-20">Tab panel 20</wa-tab-panel>
</wa-tab-group>
```

### Manual Activation

When focused, keyboard users can press [[Left]] or [[Right]] to select the desired tab. By default, the corresponding tab panel will be shown immediately (automatic activation). You can change this behavior by setting `activation="manual"` which will require the user to press [[Space]] or [[Enter]] before showing the tab panel (manual activation).

```html {.example}
<wa-tab-group activation="manual">
  <wa-tab panel="general">General</wa-tab>
  <wa-tab panel="custom">Custom</wa-tab>
  <wa-tab panel="advanced">Advanced</wa-tab>
  <wa-tab panel="disabled" disabled>Disabled</wa-tab>

  <wa-tab-panel name="general">This is the general tab panel.</wa-tab-panel>
  <wa-tab-panel name="custom">This is the custom tab panel.</wa-tab-panel>
  <wa-tab-panel name="advanced">This is the advanced tab panel.</wa-tab-panel>
  <wa-tab-panel name="disabled">This is a disabled tab panel.</wa-tab-panel>
</wa-tab-group>
```
