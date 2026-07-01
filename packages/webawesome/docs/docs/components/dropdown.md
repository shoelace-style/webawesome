---
title: Dropdown
layout: component
category: Actions
synonyms:
  - menu
  - context menu
  - action menu
  - popout
use-cases:
  - dropdown menu
  - action list
  - command menu
  - right-click menu
---

```html {.example}
<wa-dropdown>
  <wa-button appearance="filled" slot="trigger" with-caret>Options</wa-button>

  <wa-dropdown-item value="edit">Edit</wa-dropdown-item>
  <wa-dropdown-item value="duplicate">Duplicate</wa-dropdown-item>
  <wa-dropdown-item value="delete">Delete</wa-dropdown-item>
</wa-dropdown>
```

A dropdown pairs a trigger with a panel: activating the trigger opens the panel, and interacting outside it closes the panel. Most dropdowns hold [dropdown items](/docs/components/dropdown-item), but the API also gives you direct control over showing, hiding, and positioning the panel for lower-level uses.

## Examples

### Showing Icons

Use the `icon` slot to add an icon before a [dropdown item's](/docs/components/dropdown-item) label. This works best with [icon](/docs/components/icon) elements.

```html {.example}
<wa-dropdown>
  <wa-button appearance="filled" slot="trigger" with-caret>Edit</wa-button>

  <wa-dropdown-item value="cut">
    <wa-icon slot="icon" name="scissors"></wa-icon>
    Cut
  </wa-dropdown-item>

  <wa-dropdown-item value="copy">
    <wa-icon slot="icon" name="copy"></wa-icon>
    Copy
  </wa-dropdown-item>

  <wa-dropdown-item value="paste">
    <wa-icon slot="icon" name="paste"></wa-icon>
    Paste
  </wa-dropdown-item>

  <wa-dropdown-item value="delete" variant="danger">
    <wa-icon slot="icon" name="trash"></wa-icon>
    Delete
  </wa-dropdown-item>
</wa-dropdown>
```

### Showing Labels & Dividers

Use any heading (`<h1>`–`<h6>`) to label a group of items, and the [`<wa-divider>`](/docs/components/divider) element to separate them.

```html {.example}
<wa-dropdown>
  <wa-button appearance="filled" slot="trigger" with-caret>Device</wa-button>

  <h3>Type</h3>
  <wa-dropdown-item value="phone">Phone</wa-dropdown-item>
  <wa-dropdown-item value="tablet">Tablet</wa-dropdown-item>
  <wa-dropdown-item value="desktop">Desktop</wa-dropdown-item>

  <wa-divider></wa-divider>

  <wa-dropdown-item value="more">More options…</wa-dropdown-item>
</wa-dropdown>
```

### Showing Details

Use the `details` slot to show secondary content after the label, such as a keyboard shortcut.

```html {.example}
<wa-dropdown>
  <wa-button appearance="filled" slot="trigger" with-caret>Message</wa-button>

  <wa-dropdown-item value="reply">
    Reply
    <span slot="details">⌘R</span>
  </wa-dropdown-item>

  <wa-dropdown-item value="forward">
    Forward
    <span slot="details">⌘F</span>
  </wa-dropdown-item>

  <wa-dropdown-item value="move">
    Move
    <span slot="details">⌘M</span>
  </wa-dropdown-item>

  <wa-divider></wa-divider>

  <wa-dropdown-item value="archive">
    Archive
    <span slot="details">⌘A</span>
  </wa-dropdown-item>

  <wa-dropdown-item value="delete" variant="danger">
    Delete
    <span slot="details">Del</span>
  </wa-dropdown-item>
</wa-dropdown>
```

### Checkable Items

Set `type="checkbox"` to turn a [dropdown item](/docs/components/dropdown-item) into a toggle, and add `checked` to start it on. Selecting a checkable item flips its `checked` state and closes the dropdown; cancel the `wa-select` event to keep it open instead.

```html {.example}
<div class="dropdown-checkboxes">
  <wa-dropdown>
    <wa-button appearance="filled" slot="trigger" with-caret>View</wa-button>

    <wa-dropdown-item type="checkbox" value="canvas" checked>Show canvas</wa-dropdown-item>
    <wa-dropdown-item type="checkbox" value="grid" checked>Show grid</wa-dropdown-item>
    <wa-dropdown-item type="checkbox" value="source">Show source</wa-dropdown-item>

    <wa-divider></wa-divider>

    <wa-dropdown-item value="preferences">Preferences…</wa-dropdown-item>
  </wa-dropdown>
</div>

<script>
  const container = document.querySelector('.dropdown-checkboxes');
  const dropdown = container.querySelector('wa-dropdown');

  dropdown.addEventListener('wa-select', event => {
    if (event.detail.item.type === 'checkbox') {
      console.log(event.detail.item.value, event.detail.item.checked ? 'checked' : 'unchecked');
    } else {
      console.log(event.detail.item.value);
    }
  });
</script>
```

:::info
When any item is checkable, every item in the dropdown gains matching padding so labels stay aligned.
:::

### Destructive Items

Set `variant="danger"` on a [dropdown item](/docs/components/dropdown-item) to flag a destructive action like deleting.

```html {.example}
<wa-dropdown>
  <wa-button appearance="filled" slot="trigger" with-caret>Project</wa-button>

  <wa-dropdown-item value="share">
    <wa-icon slot="icon" name="share"></wa-icon>
    Share
  </wa-dropdown-item>

  <wa-dropdown-item value="preferences">
    <wa-icon slot="icon" name="gear"></wa-icon>
    Preferences
  </wa-dropdown-item>

  <wa-divider></wa-divider>

  <h3>Danger zone</h3>

  <wa-dropdown-item value="archive">
    <wa-icon slot="icon" name="archive"></wa-icon>
    Archive
  </wa-dropdown-item>

  <wa-dropdown-item value="delete" variant="danger">
    <wa-icon slot="icon" name="trash"></wa-icon>
    Delete
  </wa-dropdown-item>
</wa-dropdown>
```

### Submenus

To nest a menu, place [dropdown items](/docs/components/dropdown-item) inside another item with `slot="submenu"`. Add [dividers](/docs/components/divider) between groups as needed.

```html {.example}
<div class="dropdown-submenus">
  <wa-dropdown>
    <wa-button appearance="filled" slot="trigger" with-caret>File</wa-button>

    <wa-dropdown-item value="new">New</wa-dropdown-item>
    <wa-dropdown-item value="open">Open</wa-dropdown-item>

    <wa-divider></wa-divider>

    <wa-dropdown-item>
      Export
      <wa-dropdown-item slot="submenu" value="pdf">PDF</wa-dropdown-item>
      <wa-dropdown-item slot="submenu" value="docx">Word document</wa-dropdown-item>
      <wa-dropdown-item slot="submenu" value="xlsx">Excel spreadsheet</wa-dropdown-item>
      <wa-dropdown-item slot="submenu" value="csv">CSV</wa-dropdown-item>
    </wa-dropdown-item>

    <wa-dropdown-item>
      Options
      <wa-dropdown-item slot="submenu" type="checkbox" value="compress">Compress files</wa-dropdown-item>
      <wa-dropdown-item slot="submenu" type="checkbox" checked value="metadata">Include metadata</wa-dropdown-item>
      <wa-dropdown-item slot="submenu" type="checkbox" value="password">Password protect</wa-dropdown-item>
    </wa-dropdown-item>
  </wa-dropdown>
</div>

<script>
  const container = document.querySelector('.dropdown-submenus');
  const dropdown = container.querySelector('wa-dropdown');

  dropdown.addEventListener('wa-select', event => {
    console.log(event.detail.item.value);
  });
</script>
```

:::info
An item that opens a submenu won't emit `wa-select` itself. Items inside the submenu do, unless they open a submenu of their own.
:::

:::warning
<strong>Avoid nesting more than one level of submenu.</strong><br />
Deeply nested menus are hard to navigate, especially with a pointer. Flatten the structure or move secondary choices into a separate view when you can.
:::

### Disabling Items

Add `disabled` to any [dropdown item](/docs/components/dropdown-item) to make it unselectable.

```html {.example}
<wa-dropdown>
  <wa-button appearance="filled" slot="trigger" with-caret>Payment method</wa-button>

  <wa-dropdown-item value="cash">Cash</wa-dropdown-item>
  <wa-dropdown-item value="check" disabled>Personal check</wa-dropdown-item>
  <wa-dropdown-item value="credit">Credit card</wa-dropdown-item>
  <wa-dropdown-item value="gift-card">Gift card</wa-dropdown-item>
</wa-dropdown>
```

### Placement

Set the `placement` attribute to control where the panel opens relative to the trigger. The panel shifts to a more optimal spot when the preferred placement doesn't have room.

<table>
  <thead>
    <tr>
      <th>Placement</th>
      <th>Opens</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <span class="wa-cluster wa-flex-nowrap wa-gap-3xs">
          <code>bottom-start</code>
          <wa-badge appearance="outlined" variant="neutral" pill style="font-size: var(--wa-font-size-2xs);">default</wa-badge>
        </span>
      </td>
      <td>Below the trigger, aligned to its start edge</td>
    </tr>
    <tr>
      <td><code>bottom</code>, <code>bottom-end</code></td>
      <td>Below the trigger, centered or aligned to the end edge</td>
    </tr>
    <tr>
      <td><code>top</code>, <code>top-start</code>, <code>top-end</code></td>
      <td>Above the trigger</td>
    </tr>
    <tr>
      <td><code>right</code>, <code>right-start</code>, <code>right-end</code></td>
      <td>To the right of the trigger</td>
    </tr>
    <tr>
      <td><code>left</code>, <code>left-start</code>, <code>left-end</code></td>
      <td>To the left of the trigger</td>
    </tr>
  </tbody>
</table>

```html {.example}
<wa-dropdown placement="right-start">
  <wa-button appearance="filled" slot="trigger">
    File formats
    <wa-icon slot="end" name="chevron-right"></wa-icon>
  </wa-button>

  <wa-dropdown-item value="pdf">PDF document</wa-dropdown-item>
  <wa-dropdown-item value="docx">Word document</wa-dropdown-item>
  <wa-dropdown-item value="xlsx">Excel spreadsheet</wa-dropdown-item>
  <wa-dropdown-item value="pptx">PowerPoint presentation</wa-dropdown-item>
  <wa-dropdown-item value="txt">Plain text</wa-dropdown-item>
  <wa-dropdown-item value="json">JSON file</wa-dropdown-item>
</wa-dropdown>
```

### Distance

Set the `distance` attribute to change the gap between the panel and the trigger, in pixels.

```html {.example}
<wa-dropdown distance="30">
  <wa-button appearance="filled" slot="trigger" with-caret>Edit</wa-button>

  <wa-dropdown-item>Cut</wa-dropdown-item>
  <wa-dropdown-item>Copy</wa-dropdown-item>
  <wa-dropdown-item>Paste</wa-dropdown-item>

  <wa-divider></wa-divider>

  <wa-dropdown-item>Find</wa-dropdown-item>
  <wa-dropdown-item>Replace</wa-dropdown-item>
</wa-dropdown>
```

### Offset

Set the `skidding` attribute to slide the panel along the trigger, in pixels.

```html {.example}
<wa-dropdown skidding="30">
  <wa-button appearance="filled" slot="trigger" with-caret>Edit</wa-button>

  <wa-dropdown-item>Cut</wa-dropdown-item>
  <wa-dropdown-item>Copy</wa-dropdown-item>
  <wa-dropdown-item>Paste</wa-dropdown-item>

  <wa-divider></wa-divider>

  <wa-dropdown-item>Find</wa-dropdown-item>
  <wa-dropdown-item>Replace</wa-dropdown-item>
</wa-dropdown>
```

### Reacting to Selections

When an item is selected, the dropdown emits the `wa-select` event. Inspect `event.detail.item` for the selected [dropdown item](/docs/components/dropdown-item); if you set a `value` on each item, read it from `event.detail.item.value`.

```html {.example}
<div class="dropdown-zoom-demo">
  <div class="dropdown-zoom-stage">
    <div class="dropdown-zoom-content">
      <wa-icon name="image"></wa-icon>
      <span class="dropdown-zoom-level">100%</span>
    </div>
  </div>

  <wa-dropdown>
    <wa-button appearance="filled" slot="trigger" with-caret>View</wa-button>
    <wa-dropdown-item value="zoom-in">Zoom in</wa-dropdown-item>
    <wa-dropdown-item value="zoom-out">Zoom out</wa-dropdown-item>
    <wa-divider></wa-divider>
    <wa-dropdown-item value="actual">Actual size</wa-dropdown-item>
  </wa-dropdown>
</div>

<script>
  const demo = document.querySelector('.dropdown-zoom-demo');
  const content = demo.querySelector('.dropdown-zoom-content');
  const level = demo.querySelector('.dropdown-zoom-level');
  const dropdown = demo.querySelector('wa-dropdown');
  let zoom = 1;

  dropdown.addEventListener('wa-select', event => {
    const action = event.detail.item.value;

    if (action === 'zoom-in') zoom = Math.min(zoom + 0.25, 2);
    if (action === 'zoom-out') zoom = Math.max(zoom - 0.25, 0.5);
    if (action === 'actual') zoom = 1;

    content.style.transform = `scale(${zoom})`;
    level.textContent = `${Math.round(zoom * 100)}%`;
  });
</script>

<style>
  .dropdown-zoom-demo .dropdown-zoom-stage {
    display: grid;
    place-items: center;
    height: 12rem;
    margin-block-end: 1rem;
    overflow: hidden;
    border-radius: var(--wa-border-radius-l);
    background-color: color-mix(in srgb, var(--wa-color-brand-fill-loud) 8%, transparent);
  }

  .dropdown-zoom-demo .dropdown-zoom-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--wa-space-2xs);
    transition: transform 150ms ease;
  }

  .dropdown-zoom-demo .dropdown-zoom-content wa-icon {
    font-size: 3rem;
    color: var(--wa-color-brand-fill-loud);
  }

  .dropdown-zoom-demo .dropdown-zoom-level {
    font-size: var(--wa-font-size-s);
    font-variant-numeric: tabular-nums;
  }
</style>
```

:::info
To keep the dropdown open after a selection, call `event.preventDefault()` in the `wa-select` handler.
:::
