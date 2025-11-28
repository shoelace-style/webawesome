---
title: Dock Panel
description: Dock panels provide a flexible layout system with draggable tabs that can be split horizontally or vertically.
layout: component
category: Organization
---

```html {.example}
<wa-dock-panel id="basic-dock" style="height: 300px; border: 1px solid var(--wa-color-neutral-200); border-radius: var(--wa-border-radius-medium);"></wa-dock-panel>

<script>
  const basicDock = document.getElementById('basic-dock');
  basicDock.layout = {
    id: 'root',
    type: 'tabs',
    tabs: [
      { id: 'tab1', label: 'File 1' },
      { id: 'tab2', label: 'File 2' },
      { id: 'tab3', label: 'File 3' }
    ],
    activeTabId: 'tab1'
  };
</script>
```

## Examples

### Split Layout

You can create split layouts by setting the `type` to `'split'` and providing child panels. Use `direction` to specify horizontal or vertical splitting.

```html {.example}
<wa-dock-panel id="split-dock" style="height: 400px; border: 1px solid var(--wa-color-neutral-200); border-radius: var(--wa-border-radius-medium);"></wa-dock-panel>

<script>
  const splitDock = document.getElementById('split-dock');
  splitDock.layout = {
    id: 'root',
    type: 'split',
    direction: 'horizontal',
    sizes: [30, 70],
    children: [
      {
        id: 'sidebar',
        type: 'tabs',
        tabs: [
          { id: 'explorer', label: 'Explorer' },
          { id: 'search', label: 'Search' }
        ],
        activeTabId: 'explorer'
      },
      {
        id: 'main',
        type: 'tabs',
        tabs: [
          { id: 'editor1', label: 'index.ts' },
          { id: 'editor2', label: 'styles.css' }
        ],
        activeTabId: 'editor1'
      }
    ]
  };
</script>
```

### Nested Splits

Dock panels support arbitrarily nested layouts with both horizontal and vertical splits.

```html {.example}
<wa-dock-panel id="nested-dock" style="height: 500px; border: 1px solid var(--wa-color-neutral-200); border-radius: var(--wa-border-radius-medium);"></wa-dock-panel>

<script>
  const nestedDock = document.getElementById('nested-dock');
  nestedDock.layout = {
    id: 'root',
    type: 'split',
    direction: 'horizontal',
    sizes: [25, 75],
    children: [
      {
        id: 'sidebar',
        type: 'tabs',
        tabs: [
          { id: 'explorer', label: 'Explorer' },
          { id: 'git', label: 'Git' }
        ],
        activeTabId: 'explorer'
      },
      {
        id: 'main-area',
        type: 'split',
        direction: 'vertical',
        sizes: [70, 30],
        children: [
          {
            id: 'editors',
            type: 'tabs',
            tabs: [
              { id: 'file1', label: 'app.ts' },
              { id: 'file2', label: 'utils.ts' },
              { id: 'file3', label: 'types.ts' }
            ],
            activeTabId: 'file1'
          },
          {
            id: 'bottom-panel',
            type: 'tabs',
            tabs: [
              { id: 'terminal', label: 'Terminal' },
              { id: 'problems', label: 'Problems' },
              { id: 'output', label: 'Output' }
            ],
            activeTabId: 'terminal'
          }
        ]
      }
    ]
  };
</script>
```

### Closable Tabs

Add the `closable` property to tabs to allow users to close them.

```html {.example}
<wa-dock-panel id="closable-dock" style="height: 300px; border: 1px solid var(--wa-color-neutral-200); border-radius: var(--wa-border-radius-medium);"></wa-dock-panel>

<script>
  const closableDock = document.getElementById('closable-dock');
  closableDock.layout = {
    id: 'root',
    type: 'tabs',
    tabs: [
      { id: 'tab1', label: 'File 1', closable: true },
      { id: 'tab2', label: 'File 2', closable: true },
      { id: 'tab3', label: 'File 3', closable: true },
      { id: 'tab4', label: 'Pinned (not closable)' }
    ],
    activeTabId: 'tab1'
  };

  closableDock.addEventListener('wa-dock-tab-close', (event) => {
    const { tabId } = event.detail;
    closableDock.removeTab(tabId);
  });
</script>
```

### Tabs with Icons

You can add icons to tabs using the `icon` property.

```html {.example}
<wa-dock-panel id="icons-dock" style="height: 300px; border: 1px solid var(--wa-color-neutral-200); border-radius: var(--wa-border-radius-medium);"></wa-dock-panel>

<script>
  const iconsDock = document.getElementById('icons-dock');
  iconsDock.layout = {
    id: 'root',
    type: 'tabs',
    tabs: [
      { id: 'home', label: 'Home', icon: 'house' },
      { id: 'settings', label: 'Settings', icon: 'gear' },
      { id: 'files', label: 'Files', icon: 'folder' },
      { id: 'search', label: 'Search', icon: 'search' }
    ],
    activeTabId: 'home'
  };
</script>
```

### Drag and Drop

Tabs can be dragged and dropped to rearrange them or split panels. Drag a tab to the center of a panel to add it to that panel's tab bar. Drag to the edges (left, right, top, or bottom) to split the panel.

```html {.example}
<wa-dock-panel id="dnd-dock" style="height: 400px; border: 1px solid var(--wa-color-neutral-200); border-radius: var(--wa-border-radius-medium);"></wa-dock-panel>

<p style="margin-top: 1rem; color: var(--wa-color-neutral-600); font-size: var(--wa-font-size-small);">
  Try dragging tabs to different positions. Drop on edges to split panels.
</p>

<script>
  const dndDock = document.getElementById('dnd-dock');
  dndDock.layout = {
    id: 'root',
    type: 'split',
    direction: 'horizontal',
    sizes: [50, 50],
    children: [
      {
        id: 'left',
        type: 'tabs',
        tabs: [
          { id: 'tab1', label: 'Tab A' },
          { id: 'tab2', label: 'Tab B' }
        ],
        activeTabId: 'tab1'
      },
      {
        id: 'right',
        type: 'tabs',
        tabs: [
          { id: 'tab3', label: 'Tab C' },
          { id: 'tab4', label: 'Tab D' }
        ],
        activeTabId: 'tab3'
      }
    ]
  };

  dndDock.addEventListener('wa-dock-tab-move', (event) => {
    console.log('Tab moved:', event.detail);
  });
</script>
```

### Disabled

Use the `disabled` attribute to prevent all drag and drop interactions.

```html {.example}
<wa-dock-panel id="disabled-dock" disabled style="height: 300px; border: 1px solid var(--wa-color-neutral-200); border-radius: var(--wa-border-radius-medium);"></wa-dock-panel>

<script>
  const disabledDock = document.getElementById('disabled-dock');
  disabledDock.layout = {
    id: 'root',
    type: 'tabs',
    tabs: [
      { id: 'tab1', label: 'Tab 1' },
      { id: 'tab2', label: 'Tab 2' },
      { id: 'tab3', label: 'Tab 3' }
    ],
    activeTabId: 'tab1'
  };
</script>
```

### Slotted Content

Use named slots matching tab IDs to provide content for each tab.

```html {.example}
<wa-dock-panel id="content-dock" style="height: 350px; border: 1px solid var(--wa-color-neutral-200); border-radius: var(--wa-border-radius-medium);">
  <div slot="welcome" style="padding: 1rem;">
    <h3>Welcome!</h3>
    <p>This is the welcome tab content.</p>
  </div>
  <div slot="settings" style="padding: 1rem;">
    <h3>Settings</h3>
    <p>Configure your preferences here.</p>
    <wa-switch>Dark Mode</wa-switch>
  </div>
  <div slot="about" style="padding: 1rem;">
    <h3>About</h3>
    <p>Dock Panel v1.0</p>
  </div>
</wa-dock-panel>

<script>
  const contentDock = document.getElementById('content-dock');
  contentDock.layout = {
    id: 'root',
    type: 'tabs',
    tabs: [
      { id: 'welcome', label: 'Welcome' },
      { id: 'settings', label: 'Settings' },
      { id: 'about', label: 'About' }
    ],
    activeTabId: 'welcome'
  };
</script>
```

### Adding Tabs Programmatically

Use the `addTab()` method to add tabs programmatically.

```html {.example}
<wa-dock-panel id="add-tabs-dock" style="height: 300px; border: 1px solid var(--wa-color-neutral-200); border-radius: var(--wa-border-radius-medium);"></wa-dock-panel>

<br />

<wa-button id="add-tab-btn">Add Tab</wa-button>

<script>
  const addTabsDock = document.getElementById('add-tabs-dock');
  const addTabBtn = document.getElementById('add-tab-btn');
  let tabCounter = 1;

  addTabsDock.layout = {
    id: 'root',
    type: 'tabs',
    tabs: [
      { id: 'initial', label: 'Initial Tab' }
    ],
    activeTabId: 'initial'
  };

  addTabBtn.addEventListener('click', () => {
    tabCounter++;
    addTabsDock.addTab('root', {
      id: `new-tab-${tabCounter}`,
      label: `New Tab ${tabCounter}`,
      closable: true
    });
  });

  addTabsDock.addEventListener('wa-dock-tab-close', (event) => {
    addTabsDock.removeTab(event.detail.tabId);
  });
</script>
```

### Listening to Events

The dock panel emits various events that you can listen to for tracking user interactions.

```html {.example}
<wa-dock-panel id="events-dock" style="height: 300px; border: 1px solid var(--wa-color-neutral-200); border-radius: var(--wa-border-radius-medium);"></wa-dock-panel>

<div id="event-log" style="margin-top: 1rem; padding: 1rem; background: var(--wa-color-neutral-50); border-radius: var(--wa-border-radius-medium); font-family: var(--wa-font-mono); font-size: var(--wa-font-size-small); max-height: 150px; overflow-y: auto;">
  Event log will appear here...
</div>

<script>
  const eventsDock = document.getElementById('events-dock');
  const eventLog = document.getElementById('event-log');

  eventsDock.layout = {
    id: 'root',
    type: 'split',
    direction: 'horizontal',
    sizes: [50, 50],
    children: [
      {
        id: 'left',
        type: 'tabs',
        tabs: [
          { id: 'tab1', label: 'Tab 1', closable: true },
          { id: 'tab2', label: 'Tab 2', closable: true }
        ],
        activeTabId: 'tab1'
      },
      {
        id: 'right',
        type: 'tabs',
        tabs: [
          { id: 'tab3', label: 'Tab 3', closable: true }
        ],
        activeTabId: 'tab3'
      }
    ]
  };

  function logEvent(name, detail) {
    const time = new Date().toLocaleTimeString();
    eventLog.innerHTML = `<div>[${time}] ${name}: ${JSON.stringify(detail)}</div>` + eventLog.innerHTML;
  }

  eventsDock.addEventListener('wa-dock-tab-show', e => logEvent('wa-dock-tab-show', e.detail));
  eventsDock.addEventListener('wa-dock-tab-hide', e => logEvent('wa-dock-tab-hide', e.detail));
  eventsDock.addEventListener('wa-dock-tab-close', e => {
    logEvent('wa-dock-tab-close', e.detail);
    eventsDock.removeTab(e.detail.tabId);
  });
  eventsDock.addEventListener('wa-dock-tab-move', e => logEvent('wa-dock-tab-move', e.detail));
  eventsDock.addEventListener('wa-dock-resize', e => logEvent('wa-dock-resize', e.detail));
</script>
```

### Custom Minimum Panel Size

Use the `min-panel-size` attribute to set the minimum size (in pixels) that panels can be resized to.

```html {.example}
<wa-dock-panel id="min-size-dock" min-panel-size="200" style="height: 400px; border: 1px solid var(--wa-color-neutral-200); border-radius: var(--wa-border-radius-medium);"></wa-dock-panel>

<script>
  const minSizeDock = document.getElementById('min-size-dock');
  minSizeDock.layout = {
    id: 'root',
    type: 'split',
    direction: 'horizontal',
    sizes: [50, 50],
    children: [
      {
        id: 'left',
        type: 'tabs',
        tabs: [{ id: 'tab1', label: 'Left Panel' }],
        activeTabId: 'tab1'
      },
      {
        id: 'right',
        type: 'tabs',
        tabs: [{ id: 'tab2', label: 'Right Panel' }],
        activeTabId: 'tab2'
      }
    ]
  };
</script>
```

### IDE-Style Layout

Here's an example of a complete IDE-style layout with multiple panels.

```html {.example}
<wa-dock-panel id="ide-dock" style="height: 600px; border: 1px solid var(--wa-color-neutral-200); border-radius: var(--wa-border-radius-medium);">
  <div slot="explorer" style="padding: 0.5rem; font-size: var(--wa-font-size-small);">
    <div style="padding: 0.25rem 0; cursor: pointer;">📁 src</div>
    <div style="padding: 0.25rem 0 0.25rem 1rem; cursor: pointer;">📄 index.ts</div>
    <div style="padding: 0.25rem 0 0.25rem 1rem; cursor: pointer;">📄 app.ts</div>
    <div style="padding: 0.25rem 0; cursor: pointer;">📁 tests</div>
    <div style="padding: 0.25rem 0; cursor: pointer;">📄 package.json</div>
  </div>
  <div slot="editor1" style="padding: 1rem; font-family: var(--wa-font-mono); font-size: var(--wa-font-size-small); background: var(--wa-color-neutral-50);">
    <pre style="margin: 0;">export function greet(name: string) {
  return `Hello, ${name}!`;
}</pre>
  </div>
  <div slot="editor2" style="padding: 1rem; font-family: var(--wa-font-mono); font-size: var(--wa-font-size-small); background: var(--wa-color-neutral-50);">
    <pre style="margin: 0;">import { greet } from './index';

console.log(greet('World'));</pre>
  </div>
  <div slot="terminal" style="padding: 0.5rem; font-family: var(--wa-font-mono); font-size: var(--wa-font-size-small); background: var(--wa-color-neutral-900); color: var(--wa-color-neutral-0);">
    $ npm run build<br/>
    > Building project...<br/>
    > Done in 1.2s
  </div>
</wa-dock-panel>

<script>
  const ideDock = document.getElementById('ide-dock');
  ideDock.layout = {
    id: 'root',
    type: 'split',
    direction: 'horizontal',
    sizes: [20, 80],
    children: [
      {
        id: 'sidebar',
        type: 'tabs',
        tabs: [
          { id: 'explorer', label: 'Explorer', icon: 'folder' }
        ],
        activeTabId: 'explorer'
      },
      {
        id: 'main-area',
        type: 'split',
        direction: 'vertical',
        sizes: [75, 25],
        children: [
          {
            id: 'editors',
            type: 'tabs',
            tabs: [
              { id: 'editor1', label: 'index.ts', closable: true },
              { id: 'editor2', label: 'app.ts', closable: true }
            ],
            activeTabId: 'editor1'
          },
          {
            id: 'bottom',
            type: 'tabs',
            tabs: [
              { id: 'terminal', label: 'Terminal', icon: 'terminal' }
            ],
            activeTabId: 'terminal'
          }
        ]
      }
    ]
  };

  ideDock.addEventListener('wa-dock-tab-close', (e) => {
    ideDock.removeTab(e.detail.tabId);
  });
</script>
```
