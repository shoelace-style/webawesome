---
title: Tab Group
description: Tab groups organize content into a container that shows one section at a time.
layout: ../../../layouts/ComponentLayout.astro
---

Tab groups make use of [tabs](/components/tab) and [tab panels](/components/tab-panel). Each tab must be slotted into the `nav` slot and its `panel` must refer to a tab panel of the same name.

```html:preview
<wa-tab-group>
  <wa-tab slot="nav" panel="general">General</wa-tab>
  <wa-tab slot="nav" panel="custom">Custom</wa-tab>
  <wa-tab slot="nav" panel="advanced">Advanced</wa-tab>
  <wa-tab slot="nav" panel="disabled" disabled>Disabled</wa-tab>

  <wa-tab-panel name="general">This is the general tab panel.</wa-tab-panel>
  <wa-tab-panel name="custom">This is the custom tab panel.</wa-tab-panel>
  <wa-tab-panel name="advanced">This is the advanced tab panel.</wa-tab-panel>
  <wa-tab-panel name="disabled">This is a disabled tab panel.</wa-tab-panel>
</wa-tab-group>
```

```jsx:react
import WaTab from '@shoelace-style/shoelace/dist/react/tab';
import WaTabGroup from '@shoelace-style/shoelace/dist/react/tab-group';
import WaTabPanel from '@shoelace-style/shoelace/dist/react/tab-panel';

const App = () => (
  <WaTabGroup>
    <WaTab slot="nav" panel="general">
      General
    </WaTab>
    <WaTab slot="nav" panel="custom">
      Custom
    </WaTab>
    <WaTab slot="nav" panel="advanced">
      Advanced
    </WaTab>
    <WaTab slot="nav" panel="disabled" disabled>
      Disabled
    </WaTab>

    <WaTabPanel name="general">This is the general tab panel.</WaTabPanel>
    <WaTabPanel name="custom">This is the custom tab panel.</WaTabPanel>
    <WaTabPanel name="advanced">This is the advanced tab panel.</WaTabPanel>
    <WaTabPanel name="disabled">This is a disabled tab panel.</WaTabPanel>
  </WaTabGroup>
);
```

## Examples

### Tabs on Bottom

Tabs can be shown on the bottom by setting `placement` to `bottom`.

```html:preview
<wa-tab-group placement="bottom">
  <wa-tab slot="nav" panel="general">General</wa-tab>
  <wa-tab slot="nav" panel="custom">Custom</wa-tab>
  <wa-tab slot="nav" panel="advanced">Advanced</wa-tab>
  <wa-tab slot="nav" panel="disabled" disabled>Disabled</wa-tab>

  <wa-tab-panel name="general">This is the general tab panel.</wa-tab-panel>
  <wa-tab-panel name="custom">This is the custom tab panel.</wa-tab-panel>
  <wa-tab-panel name="advanced">This is the advanced tab panel.</wa-tab-panel>
  <wa-tab-panel name="disabled">This is a disabled tab panel.</wa-tab-panel>
</wa-tab-group>
```

```jsx:react
import WaTab from '@shoelace-style/shoelace/dist/react/tab';
import WaTabGroup from '@shoelace-style/shoelace/dist/react/tab-group';
import WaTabPanel from '@shoelace-style/shoelace/dist/react/tab-panel';

const App = () => (
  <WaTabGroup placement="bottom">
    <WaTab slot="nav" panel="general">
      General
    </WaTab>
    <WaTab slot="nav" panel="custom">
      Custom
    </WaTab>
    <WaTab slot="nav" panel="advanced">
      Advanced
    </WaTab>
    <WaTab slot="nav" panel="disabled" disabled>
      Disabled
    </WaTab>

    <WaTabPanel name="general">This is the general tab panel.</WaTabPanel>
    <WaTabPanel name="custom">This is the custom tab panel.</WaTabPanel>
    <WaTabPanel name="advanced">This is the advanced tab panel.</WaTabPanel>
    <WaTabPanel name="disabled">This is a disabled tab panel.</WaTabPanel>
  </WaTabGroup>
);
```

### Tabs on Start

Tabs can be shown on the starting side by setting `placement` to `start`.

```html:preview
<wa-tab-group placement="start">
  <wa-tab slot="nav" panel="general">General</wa-tab>
  <wa-tab slot="nav" panel="custom">Custom</wa-tab>
  <wa-tab slot="nav" panel="advanced">Advanced</wa-tab>
  <wa-tab slot="nav" panel="disabled" disabled>Disabled</wa-tab>

  <wa-tab-panel name="general">This is the general tab panel.</wa-tab-panel>
  <wa-tab-panel name="custom">This is the custom tab panel.</wa-tab-panel>
  <wa-tab-panel name="advanced">This is the advanced tab panel.</wa-tab-panel>
  <wa-tab-panel name="disabled">This is a disabled tab panel.</wa-tab-panel>
</wa-tab-group>
```

```jsx:react
import WaTab from '@shoelace-style/shoelace/dist/react/tab';
import WaTabGroup from '@shoelace-style/shoelace/dist/react/tab-group';
import WaTabPanel from '@shoelace-style/shoelace/dist/react/tab-panel';

const App = () => (
  <WaTabGroup placement="start">
    <WaTab slot="nav" panel="general">
      General
    </WaTab>
    <WaTab slot="nav" panel="custom">
      Custom
    </WaTab>
    <WaTab slot="nav" panel="advanced">
      Advanced
    </WaTab>
    <WaTab slot="nav" panel="disabled" disabled>
      Disabled
    </WaTab>

    <WaTabPanel name="general">This is the general tab panel.</WaTabPanel>
    <WaTabPanel name="custom">This is the custom tab panel.</WaTabPanel>
    <WaTabPanel name="advanced">This is the advanced tab panel.</WaTabPanel>
    <WaTabPanel name="disabled">This is a disabled tab panel.</WaTabPanel>
  </WaTabGroup>
);
```

### Tabs on End

Tabs can be shown on the ending side by setting `placement` to `end`.

```html:preview
<wa-tab-group placement="end">
  <wa-tab slot="nav" panel="general">General</wa-tab>
  <wa-tab slot="nav" panel="custom">Custom</wa-tab>
  <wa-tab slot="nav" panel="advanced">Advanced</wa-tab>
  <wa-tab slot="nav" panel="disabled" disabled>Disabled</wa-tab>

  <wa-tab-panel name="general">This is the general tab panel.</wa-tab-panel>
  <wa-tab-panel name="custom">This is the custom tab panel.</wa-tab-panel>
  <wa-tab-panel name="advanced">This is the advanced tab panel.</wa-tab-panel>
  <wa-tab-panel name="disabled">This is a disabled tab panel.</wa-tab-panel>
</wa-tab-group>
```

```jsx:react
import WaTab from '@shoelace-style/shoelace/dist/react/tab';
import WaTabGroup from '@shoelace-style/shoelace/dist/react/tab-group';
import WaTabPanel from '@shoelace-style/shoelace/dist/react/tab-panel';

const App = () => (
  <WaTabGroup placement="end">
    <WaTab slot="nav" panel="general">
      General
    </WaTab>
    <WaTab slot="nav" panel="custom">
      Custom
    </WaTab>
    <WaTab slot="nav" panel="advanced">
      Advanced
    </WaTab>
    <WaTab slot="nav" panel="disabled" disabled>
      Disabled
    </WaTab>

    <WaTabPanel name="general">This is the general tab panel.</WaTabPanel>
    <WaTabPanel name="custom">This is the custom tab panel.</WaTabPanel>
    <WaTabPanel name="advanced">This is the advanced tab panel.</WaTabPanel>
    <WaTabPanel name="disabled">This is a disabled tab panel.</WaTabPanel>
  </WaTabGroup>
);
```

### Closable Tabs

Add the `closable` attribute to a tab to show a close button. This example shows how you can dynamically remove tabs from the DOM when the close button is activated.

```html:preview
<wa-tab-group class="tabs-closable">
  <wa-tab slot="nav" panel="general">General</wa-tab>
  <wa-tab slot="nav" panel="closable-1" closable>Closable 1</wa-tab>
  <wa-tab slot="nav" panel="closable-2" closable>Closable 2</wa-tab>
  <wa-tab slot="nav" panel="closable-3" closable>Closable 3</wa-tab>

  <wa-tab-panel name="general">This is the general tab panel.</wa-tab-panel>
  <wa-tab-panel name="closable-1">This is the first closable tab panel.</wa-tab-panel>
  <wa-tab-panel name="closable-2">This is the second closable tab panel.</wa-tab-panel>
  <wa-tab-panel name="closable-3">This is the third closable tab panel.</wa-tab-panel>
</wa-tab-group>

<script>
  const tabGroup = document.querySelector('.tabs-closable');

  tabGroup.addEventListener('wa-close', async event => {
    const tab = event.target;
    const panel = tabGroup.querySelector(`wa-tab-panel[name="${tab.panel}"]`);

    // Show the previous tab if the tab is currently active
    if (tab.active) {
      tabGroup.show(tab.previousElementSibling.panel);
    }

    // Remove the tab + panel
    tab.remove();
    panel.remove();
  });
</script>
```

```jsx:react
import WaTab from '@shoelace-style/shoelace/dist/react/tab';
import WaTabGroup from '@shoelace-style/shoelace/dist/react/tab-group';
import WaTabPanel from '@shoelace-style/shoelace/dist/react/tab-panel';

const App = () => {
  function handleClose(event) {
    //
    // This is a crude example that removes the tab and its panel from the DOM.
    // There are better ways to manage tab creation/removal in React, but that
    // would significantly complicate the example.
    //
    const tab = event.target;
    const tabGroup = tab.closest('wa-tab-group');
    const tabPanel = tabGroup.querySelector(`[aria-labelledby="${tab.id}"]`);

    tab.remove();
    tabPanel.remove();
  }

  return (
    <WaTabGroup className="tabs-closable" onWaClose={handleClose}>
      <WaTab slot="nav" panel="general">
        General
      </WaTab>
      <WaTab slot="nav" panel="closable-1" closable onWaClose={handleClose}>
        Closable 1
      </WaTab>
      <WaTab slot="nav" panel="closable-2" closable onWaClose={handleClose}>
        Closable 2
      </WaTab>
      <WaTab slot="nav" panel="closable-3" closable onWaClose={handleClose}>
        Closable 3
      </WaTab>

      <WaTabPanel name="general">This is the general tab panel.</WaTabPanel>
      <WaTabPanel name="closable-1">This is the first closable tab panel.</WaTabPanel>
      <WaTabPanel name="closable-2">This is the second closable tab panel.</WaTabPanel>
      <WaTabPanel name="closable-3">This is the third closable tab panel.</WaTabPanel>
    </WaTabGroup>
  );
};
```

### Scrolling Tabs

When there are more tabs than horizontal space allows, the nav will be scrollable.

```html:preview
<wa-tab-group>
  <wa-tab slot="nav" panel="tab-1">Tab 1</wa-tab>
  <wa-tab slot="nav" panel="tab-2">Tab 2</wa-tab>
  <wa-tab slot="nav" panel="tab-3">Tab 3</wa-tab>
  <wa-tab slot="nav" panel="tab-4">Tab 4</wa-tab>
  <wa-tab slot="nav" panel="tab-5">Tab 5</wa-tab>
  <wa-tab slot="nav" panel="tab-6">Tab 6</wa-tab>
  <wa-tab slot="nav" panel="tab-7">Tab 7</wa-tab>
  <wa-tab slot="nav" panel="tab-8">Tab 8</wa-tab>
  <wa-tab slot="nav" panel="tab-9">Tab 9</wa-tab>
  <wa-tab slot="nav" panel="tab-10">Tab 10</wa-tab>
  <wa-tab slot="nav" panel="tab-11">Tab 11</wa-tab>
  <wa-tab slot="nav" panel="tab-12">Tab 12</wa-tab>
  <wa-tab slot="nav" panel="tab-13">Tab 13</wa-tab>
  <wa-tab slot="nav" panel="tab-14">Tab 14</wa-tab>
  <wa-tab slot="nav" panel="tab-15">Tab 15</wa-tab>
  <wa-tab slot="nav" panel="tab-16">Tab 16</wa-tab>
  <wa-tab slot="nav" panel="tab-17">Tab 17</wa-tab>
  <wa-tab slot="nav" panel="tab-18">Tab 18</wa-tab>
  <wa-tab slot="nav" panel="tab-19">Tab 19</wa-tab>
  <wa-tab slot="nav" panel="tab-20">Tab 20</wa-tab>

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

```jsx:react
import WaTab from '@shoelace-style/shoelace/dist/react/tab';
import WaTabGroup from '@shoelace-style/shoelace/dist/react/tab-group';
import WaTabPanel from '@shoelace-style/shoelace/dist/react/tab-panel';

const App = () => (
  <WaTabGroup>
    <WaTab slot="nav" panel="tab-1">
      Tab 1
    </WaTab>
    <WaTab slot="nav" panel="tab-2">
      Tab 2
    </WaTab>
    <WaTab slot="nav" panel="tab-3">
      Tab 3
    </WaTab>
    <WaTab slot="nav" panel="tab-4">
      Tab 4
    </WaTab>
    <WaTab slot="nav" panel="tab-5">
      Tab 5
    </WaTab>
    <WaTab slot="nav" panel="tab-6">
      Tab 6
    </WaTab>
    <WaTab slot="nav" panel="tab-7">
      Tab 7
    </WaTab>
    <WaTab slot="nav" panel="tab-8">
      Tab 8
    </WaTab>
    <WaTab slot="nav" panel="tab-9">
      Tab 9
    </WaTab>
    <WaTab slot="nav" panel="tab-10">
      Tab 10
    </WaTab>
    <WaTab slot="nav" panel="tab-11">
      Tab 11
    </WaTab>
    <WaTab slot="nav" panel="tab-12">
      Tab 12
    </WaTab>
    <WaTab slot="nav" panel="tab-13">
      Tab 13
    </WaTab>
    <WaTab slot="nav" panel="tab-14">
      Tab 14
    </WaTab>
    <WaTab slot="nav" panel="tab-15">
      Tab 15
    </WaTab>
    <WaTab slot="nav" panel="tab-16">
      Tab 16
    </WaTab>
    <WaTab slot="nav" panel="tab-17">
      Tab 17
    </WaTab>
    <WaTab slot="nav" panel="tab-18">
      Tab 18
    </WaTab>
    <WaTab slot="nav" panel="tab-19">
      Tab 19
    </WaTab>
    <WaTab slot="nav" panel="tab-20">
      Tab 20
    </WaTab>

    <WaTabPanel name="tab-1">Tab panel 1</WaTabPanel>
    <WaTabPanel name="tab-2">Tab panel 2</WaTabPanel>
    <WaTabPanel name="tab-3">Tab panel 3</WaTabPanel>
    <WaTabPanel name="tab-4">Tab panel 4</WaTabPanel>
    <WaTabPanel name="tab-5">Tab panel 5</WaTabPanel>
    <WaTabPanel name="tab-6">Tab panel 6</WaTabPanel>
    <WaTabPanel name="tab-7">Tab panel 7</WaTabPanel>
    <WaTabPanel name="tab-8">Tab panel 8</WaTabPanel>
    <WaTabPanel name="tab-9">Tab panel 9</WaTabPanel>
    <WaTabPanel name="tab-10">Tab panel 10</WaTabPanel>
    <WaTabPanel name="tab-11">Tab panel 11</WaTabPanel>
    <WaTabPanel name="tab-12">Tab panel 12</WaTabPanel>
    <WaTabPanel name="tab-13">Tab panel 13</WaTabPanel>
    <WaTabPanel name="tab-14">Tab panel 14</WaTabPanel>
    <WaTabPanel name="tab-15">Tab panel 15</WaTabPanel>
    <WaTabPanel name="tab-16">Tab panel 16</WaTabPanel>
    <WaTabPanel name="tab-17">Tab panel 17</WaTabPanel>
    <WaTabPanel name="tab-18">Tab panel 18</WaTabPanel>
    <WaTabPanel name="tab-19">Tab panel 19</WaTabPanel>
    <WaTabPanel name="tab-20">Tab panel 20</WaTabPanel>
  </WaTabGroup>
);
```

### Manual Activation

When focused, keyboard users can press [[Left]] or [[Right]] to select the desired tab. By default, the corresponding tab panel will be shown immediately (automatic activation). You can change this behavior by setting `activation="manual"` which will require the user to press [[Space]] or [[Enter]] before showing the tab panel (manual activation).

```html:preview
<wa-tab-group activation="manual">
  <wa-tab slot="nav" panel="general">General</wa-tab>
  <wa-tab slot="nav" panel="custom">Custom</wa-tab>
  <wa-tab slot="nav" panel="advanced">Advanced</wa-tab>
  <wa-tab slot="nav" panel="disabled" disabled>Disabled</wa-tab>

  <wa-tab-panel name="general">This is the general tab panel.</wa-tab-panel>
  <wa-tab-panel name="custom">This is the custom tab panel.</wa-tab-panel>
  <wa-tab-panel name="advanced">This is the advanced tab panel.</wa-tab-panel>
  <wa-tab-panel name="disabled">This is a disabled tab panel.</wa-tab-panel>
</wa-tab-group>
```

```jsx:react
import WaTab from '@shoelace-style/shoelace/dist/react/tab';
import WaTabGroup from '@shoelace-style/shoelace/dist/react/tab-group';
import WaTabPanel from '@shoelace-style/shoelace/dist/react/tab-panel';

const App = () => (
  <WaTabGroup activation="manual">
    <WaTab slot="nav" panel="general">
      General
    </WaTab>
    <WaTab slot="nav" panel="custom">
      Custom
    </WaTab>
    <WaTab slot="nav" panel="advanced">
      Advanced
    </WaTab>
    <WaTab slot="nav" panel="disabled" disabled>
      Disabled
    </WaTab>

    <WaTabPanel name="general">This is the general tab panel.</WaTabPanel>
    <WaTabPanel name="custom">This is the custom tab panel.</WaTabPanel>
    <WaTabPanel name="advanced">This is the advanced tab panel.</WaTabPanel>
    <WaTabPanel name="disabled">This is a disabled tab panel.</WaTabPanel>
  </WaTabGroup>
);
```
