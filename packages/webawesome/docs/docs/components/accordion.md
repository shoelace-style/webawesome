---
title: Accordion
layout: component
category: Organization
synonyms:
  - collapsible
  - expandable
  - disclosure
  - FAQ
use-cases:
  - FAQ sections
  - settings panel
  - content organization
  - collapsible navigation
---

Accordions use [accordion items](/docs/components/accordion-item) to create a vertically stacked set of expandable sections.

```html {.example}
<wa-accordion>
  <wa-accordion-item label="What is Web Awesome?">
    Web Awesome is a comprehensive library of web components you can use to build beautiful, accessible web
    applications. It's built on open web standards and works with any framework.
  </wa-accordion-item>
  <wa-accordion-item label="Is it free to use?">
    The core Web Awesome library is completely free and open source. A Pro tier is also available with additional
    components and features.
  </wa-accordion-item>
  <wa-accordion-item label="Does it work with my framework?">
    Yes! Web Awesome components are built as native web components, so they work with any framework including React,
    Vue, Angular, Svelte, or plain HTML.
  </wa-accordion-item>
</wa-accordion>
```

## Examples

### Expanded Initially

Use the `expanded` attribute on an accordion item to expand it by default.

```html {.example}
<wa-accordion>
  <wa-accordion-item label="Already open" expanded>
    This item is expanded by default. Click the header to collapse it.
  </wa-accordion-item>
  <wa-accordion-item label="Click to open">
    This item starts collapsed. Click the header to expand it.
  </wa-accordion-item>
</wa-accordion>
```

### Disabled Items

Use the `disabled` attribute on an accordion item to prevent it from being toggled.

```html {.example}
<wa-accordion>
  <wa-accordion-item label="Active item" expanded>
    This item can be expanded and collapsed normally.
  </wa-accordion-item>
  <wa-accordion-item label="Disabled item" disabled>
    This item is disabled and cannot be toggled.
  </wa-accordion-item>
</wa-accordion>
```

### Without a Heading

The [W3C accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/) recommends wrapping each accordion trigger in a heading element so screen reader users can navigate the page outline and locate accordion sections using heading navigation. Each accordion item uses an `<h3>` by default for this reason.

But if an accordion lives outside the document outline, for example, inside a nav or another component that has its own structure, set `heading-level="none"` on the accordion to omit the heading wrapper and render the button directly.

```html {.example}
<wa-accordion heading-level="none">
  <wa-accordion-item label="Settings">
    Adjust your preferences here.
  </wa-accordion-item>
  <wa-accordion-item label="Notifications">
    Manage how and when you receive notifications.
  </wa-accordion-item>
</wa-accordion>
```

### Heading Level

The default heading level is `3`. Use `heading-level` on the accordion to match the level to your page's hierarchy. Values outside 1–6 fall back to `3`.

```html {.example}
<wa-accordion heading-level="2">
  <wa-accordion-item label="Section one">
    This trigger is wrapped in an <code>&lt;h2&gt;</code>.
  </wa-accordion-item>
  <wa-accordion-item label="Section two">
    Match the level to where this accordion sits in your document outline.
  </wa-accordion-item>
</wa-accordion>
```

### Sizing

The accordion scales with `font-size`. Padding and expand/collapse icon are both `em` based, setting `font-size` on a `<wa-accordion>` proportionally resizes the entire component; text, spacing, and icon together.

```html {.example}
<wa-accordion style="font-size: 0.875rem;">
  <wa-accordion-item label="Small accordion">
    Text, padding, and icon scales down together.
  </wa-accordion-item>
  <wa-accordion-item label="Another item">Content here.</wa-accordion-item>
</wa-accordion>

<br />

<wa-accordion>
  <wa-accordion-item label="Default accordion">
    The default size.
  </wa-accordion-item>
  <wa-accordion-item label="Another item">Content here.</wa-accordion-item>
</wa-accordion>

<br />

<wa-accordion style="font-size: 1.25rem;">
  <wa-accordion-item label="Large accordion">
    Everything scales up together.
  </wa-accordion-item>
  <wa-accordion-item label="Another item">Content here.</wa-accordion-item>
</wa-accordion>
```

You can also adjust spacing independently with the `--padding` custom property without affecting the font size.

```html {.example}
<wa-accordion style="--padding: 0.5rem;">
  <wa-accordion-item label="Compact spacing">
    Padding is reduced and font size stays the same.
  </wa-accordion-item>
  <wa-accordion-item label="Another item">Content here.</wa-accordion-item>
</wa-accordion>
```

### Exclusive

Use the `exclusive` attribute to allow only one item to be open at a time. Opening a new item automatically collapses the previously open one.

```html {.example}
<wa-accordion exclusive>
  <wa-accordion-item label="Section one" expanded>
    Opening another section will automatically collapse this one. Only one section can be open at a time.
  </wa-accordion-item>
  <wa-accordion-item label="Section two">
    Try opening this section to see section one collapse automatically.
  </wa-accordion-item>
  <wa-accordion-item label="Section three">
    Each section opens and closes independently of the others.
  </wa-accordion-item>
</wa-accordion>
```

### Icon Placement

The expand/collapse icon appears at the end of each header by default. Set `icon-placement="start"` to move it to the beginning, a common pattern for sidebars and tree style navigation.

```html {.example}
<wa-accordion icon-placement="start">
  <wa-accordion-item label="Start">Icon is at the start of the header.</wa-accordion-item>
  <wa-accordion-item label="Another item">More content here.</wa-accordion-item>
</wa-accordion>
```

### Custom Icon

Use the `icon` slot on an accordion item to replace the default expand/collapse icon with any icon you like.

```html {.example}
<wa-accordion>
  <wa-accordion-item label="With a custom icon">
    <wa-icon slot="icon" name="circle-plus" variant="regular"></wa-icon>
    Replace the default chevron with any icon you like.
  </wa-accordion-item>
  <wa-accordion-item label="Another custom icon">
    <wa-icon slot="icon" name="square-plus" variant="regular"></wa-icon>
    Each item can have its own icon.
  </wa-accordion-item>
</wa-accordion>
```

### HTML in the Label

To place HTML in an accordion item's header, use the `label` slot instead of the `label` attribute. This lets you add icons, badges, or other elements alongside the label text.

```html {.example}
<wa-accordion>
  <wa-accordion-item>
    <div slot="label" class="wa-split">
      <span>Tasks</span>
      <wa-badge appearance="filled" variant="success" style="font-size: var(--wa-font-size-xs);">3 ready</wa-badge>
    </div>
    All three tasks are ready to be reviewed.
  </wa-accordion-item>
  <wa-accordion-item>
    <div slot="label" class="wa-split">
      <span>Issues</span>
      <wa-badge appearance="filled" variant="danger" style="font-size: var(--wa-font-size-xs);">2 open</wa-badge>
    </div>
    There are two open issues that need your attention.
  </wa-accordion-item>
</wa-accordion>
```

### Expand and Collapse All

Use the `expandAll()` and `collapseAll()` methods to programmatically control all items at once. Note that `expandAll()` is a no-op when `exclusive` is set.

```html {.example}
<div class="wa-cluster">
  <wa-button appearance="filled" id="expand-all">Expand All</wa-button>
  <wa-button id="collapse-all">Collapse All</wa-button>
</div>

<br />

<wa-accordion id="accordion-methods">
  <wa-accordion-item label="Section one">Content for the first section.</wa-accordion-item>
  <wa-accordion-item label="Section two">Content for the second section.</wa-accordion-item>
  <wa-accordion-item label="Section three">Content for the third section.</wa-accordion-item>
</wa-accordion>

<script>
  const accordion = document.querySelector('#accordion-methods');

  document.querySelector('#expand-all').addEventListener('click', () => accordion.expandAll());
  document.querySelector('#collapse-all').addEventListener('click', () => accordion.collapseAll());
</script>
```

### Preventing Expand or Collapse

Listen for the `wa-expand` or `wa-collapse` events and call `event.preventDefault()` to stop the action from completing. The `event.detail.item` property tells you which accordion item triggered the event.

```html {.example}
<wa-accordion id="accordion-prevent">
  <wa-accordion-item label="Locked open" expanded>
    This item is locked open — the <code>wa-collapse</code> event is being intercepted and prevented.
  </wa-accordion-item>
  <wa-accordion-item label="Works normally">
    This item can be toggled normally.
  </wa-accordion-item>
</wa-accordion>

<script>
  const accordion = document.querySelector('#accordion-prevent');
  const lockedItem = accordion.querySelector('wa-accordion-item');

  accordion.addEventListener('wa-collapse', event => {
    if (event.detail.item === lockedItem) {
      event.preventDefault();
    }
  });
</script>
```
