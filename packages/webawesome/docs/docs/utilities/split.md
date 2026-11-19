---
title: Split
description: 'Use the `wa-split` class to distribute two or more items evenly across available space, either in a row or a column.'
layout: docs
tags: layoutUtilities
synonyms:
  - holy grail
  - sidebar layout
  - main aside
use-cases:
  - two column
  - content sidebar
  - layout split
---

<style>
  :is(.wa-flank, .wa-grid, .wa-stack) > [class*='wa-split']:has(div:empty) {
    border: var(--layout-example-border);
    border-radius: var(--layout-example-border-radius);
    padding: var(--layout-example-padding);
  }

  [class*='wa-split'] div:empty {
    background-color: var(--layout-example-element-background);
    border-radius: var(--layout-example-element-border-radius);
    min-block-size: 4rem;
    min-inline-size: 4rem;
  }
</style>

A split pushes its children to opposite ends of the container, filling the space between them. It's what you want whenever you need a logo on one side and navigation on the other, a section heading paired with an action button, or a list item whose label and value sit at opposite ends of the row. Any number of children work: the first one hugs the start, the last one hugs the end, and anything in between is evenly distributed.

By default a split runs horizontally; append `:column` to stack items vertically instead. When the container gets too narrow for everything to fit on one row, the items wrap automatically.

```html {.example}
<div class="wa-split">
  <div></div>
  <div></div>
</div>
```

## Examples

Splits are especially helpful for navigation, header, and footer layouts.

```html {.example}
<div class="wa-flank">
  <div class="wa-split:column">
    <div class="wa-stack">
      <wa-button appearance="plain">
        <wa-icon name="house" label="Home"></wa-icon>
      </wa-button>
      <wa-button appearance="plain">
        <wa-icon name="calendar" label="Calendar"></wa-icon>
      </wa-button>
      <wa-button appearance="plain">
        <wa-icon name="envelope" label="Mail"></wa-icon>
      </wa-button>
    </div>
    <div class="wa-stack">
      <wa-divider></wa-divider>
      <wa-button appearance="plain">
        <wa-icon name="right-from-bracket" label="Sign Out"></wa-icon>
      </wa-button>
    </div>
  </div>
  <div class="placeholder"></div>
</div>

<style>
  .placeholder {
    min-block-size: 300px;
    background-color: var(--wa-color-neutral-fill-quiet);
    border: dashed var(--wa-border-width-s) var(--wa-color-neutral-border-normal);
    border-radius: var(--wa-border-radius-l);
  }
</style>
```

```html {.example}
<div class="wa-stack">
  <div class="wa-split">
    <wa-icon name="web-awesome" label="Web Awesome" class="wa-font-size-xl"></wa-icon>
    <div class="wa-cluster">
      <wa-button appearance="filled">Sign Up</wa-button>
      <wa-button appearance="outlined">Log In</wa-button>
    </div>
  </div>
  <div class="placeholder"></div>
</div>

<style>
  .placeholder {
    min-block-size: 300px;
    background-color: var(--wa-color-neutral-fill-quiet);
    border: dashed var(--wa-border-width-s) var(--wa-color-neutral-border-normal);
    border-radius: var(--wa-border-radius-l);
  }
</style>
```

## Direction

Items can be split across a row or a column by appending `:row` or `:column` to the `wa-split` class.

```html {.example}
<div class="wa-flank wa-align-items-start" style="block-size: 16rem;">
  <div class="wa-split:column">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split:row">
    <div></div>
    <div></div>
  </div>
</div>
```

## Column Height

A column split spreads its items across the height its container gives it. Whether it gets that height depends on how the container lays out its children:

| Container                                             | Layout      | Column split                 |
| ----------------------------------------------------- | ----------- | ---------------------------- |
| `wa-flank`, `wa-cluster`, `wa-grid`, `wa-split`       | Row or grid | Fills the container's height |
| `wa-stack`                                            | Column      | Shrinks to fit its items     |
| The `body` part of a drawer or dialog, plain elements | Block       | Shrinks to fit its items     |

To fill a stack, add `flex-grow: 1` to the split. To fill a block container, also make the container a flex column. In a drawer or dialog, that container is the `body` part:

```html {.example}
<wa-drawer label="Without the Fix" id="split-drawer-without-fix">
  <div class="wa-split:column">
    <nav class="wa-stack">
      <wa-button appearance="plain">Home</wa-button>
      <wa-button appearance="plain">Calendar</wa-button>
      <wa-button appearance="plain">Mail</wa-button>
    </nav>
    <wa-button appearance="plain">Sign Out</wa-button>
  </div>
</wa-drawer>

<wa-drawer label="With the Fix" id="split-drawer-with-fix" class="navigation-drawer">
  <div class="wa-split:column">
    <nav class="wa-stack">
      <wa-button appearance="plain">Home</wa-button>
      <wa-button appearance="plain">Calendar</wa-button>
      <wa-button appearance="plain">Mail</wa-button>
    </nav>
    <wa-button appearance="plain">Sign Out</wa-button>
  </div>
</wa-drawer>

<div class="wa-cluster">
  <wa-button appearance="outlined" data-drawer="open split-drawer-without-fix">Open Drawer Without the Fix</wa-button>
  <wa-button appearance="filled" data-drawer="open split-drawer-with-fix">Open Drawer With the Fix</wa-button>
</div>

<style>
  .navigation-drawer::part(body) {
    display: flex;
    flex-direction: column;
  }

  .navigation-drawer .wa-split\:column {
    flex-grow: 1;
  }
</style>
```

## Align Items

By default, items are centered on the cross axis of the `wa-split` container. Add any [`wa-align-items-*`](/docs/utilities/align-items) class to change how items line up: in the block direction for `wa-split:row` and in the inline direction for `wa-split:column`.

```html {.example}
<div class="wa-stack">
  <div class="wa-split wa-align-items-start" style="height: 8rem;">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split wa-align-items-end" style="height: 8rem;">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split wa-align-items-center" style="height: 8rem;">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split wa-align-items-stretch" style="height: 8rem;">
    <div></div>
    <div></div>
  </div>
</div>
```

## Gap

A split's gap determines how close items can be before they wrap. By default, the gap between split items uses `--wa-space-m` from your theme. Add any [`wa-gap-*`](/docs/utilities/gap) class to change the spacing between items.

```html {.example}
<div class="wa-stack">
  <div class="wa-split wa-gap-3xs">
    <div></div>
    <div></div>
  </div>
  <div class="wa-split wa-gap-3xl">
    <div></div>
    <div></div>
  </div>
</div>
```
