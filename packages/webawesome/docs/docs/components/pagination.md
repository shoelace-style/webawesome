---
title: Pagination
layout: component
category: Navigation
synonyms:
  - pager
  - pages
  - paging
use-cases:
  - search results
  - data tables
  - archives
  - large lists
---

Set `total` and `page-size` to generate numbered page buttons with previous and next controls. Use the `label` attribute to give the control an accessible name, which is especially helpful when more than one appears on the same page.

```html {.example}
<wa-pagination total="237" page-size="10" page="3" label="Search results"></wa-pagination>
```

:::info
Pagination is a navigation control, not a form control. It tracks the current page and emits events, but it doesn't submit a value with a form. Update the `page` property in response to the [`wa-page-change`](#responding-to-page-changes) event to keep it in sync with your data.
:::

## Examples

### Appearance

Set the `appearance` attribute to change the pagination's visual style. Valid appearances are `outlined` (the default), `filled`, and `plain`.

```html {.example}
<wa-pagination total="237" page-size="10" page="3" appearance="outlined"></wa-pagination>
<br />
<wa-pagination total="237" page-size="10" page="3" appearance="filled"></wa-pagination>
<br />
<wa-pagination total="237" page-size="10" page="3" appearance="plain"></wa-pagination>
```

### Size

Pagination has no `size` attribute; set `font-size` on the control or any ancestor to scale it.

```html {.example}
<wa-pagination
  total="237"
  page-size="10"
  page="3"
  style="font-size: var(--wa-font-size-s)"
></wa-pagination>
<br />
<wa-pagination total="237" page-size="10" page="3"></wa-pagination>
<br />
<wa-pagination
  total="237"
  page-size="10"
  page="3"
  style="font-size: var(--wa-font-size-l)"
></wa-pagination>
```

### Number of Buttons

Use the `sibling-count` attribute to set how many pages show on each side of the current page (defaults to `2`), and `boundary-count` to set how many show at the start and end. Remaining pages collapse into an ellipsis, which jumps several pages toward that side when activated.

```html {.example}
<wa-pagination total="1000" page-size="10" page="50" sibling-count="1" boundary-count="1"></wa-pagination>
<br />
<wa-pagination total="1000" page-size="10" page="50" sibling-count="3" boundary-count="2"></wa-pagination>
```

### First and Last Buttons

Add the `with-edges` attribute to show buttons that jump to the first and last pages.

```html {.example}
<wa-pagination total="237" page-size="10" page="10" with-edges></wa-pagination>
```

### Previous and Next Buttons

Add the `without-nav` attribute to hide the previous and next buttons, leaving only the page numbers.

```html {.example}
<wa-pagination total="237" page-size="10" page="3" without-nav></wa-pagination>
```

### Summary

Add the `with-summary` attribute to show a summary of the items on the current page.

```html {.example}
<wa-pagination total="237" page-size="10" page="1" with-summary></wa-pagination>
```

### Compact

Set the `format` attribute to `compact` to replace the page numbers with a short "1 of 5" label between the previous and next buttons.

```html {.example}
<wa-pagination total="237" page-size="10" page="1" format="compact"></wa-pagination>
```

The compact format can be combined with other features, such as `with-summary`:

```html {.example}
<wa-pagination total="237" page-size="10" page="1" format="compact" with-summary></wa-pagination>
```

### Custom Icons

Use the `previous-icon`, `next-icon`, `first-icon`, and `last-icon` slots to replace the default navigation icons.

```html {.example}
<wa-pagination total="237" page-size="10" page="5" with-edges>
  <wa-icon slot="previous-icon" name="arrow-left"></wa-icon>
  <wa-icon slot="next-icon" name="arrow-right"></wa-icon>
  <wa-icon slot="first-icon" name="backward-fast"></wa-icon>
  <wa-icon slot="last-icon" name="forward-fast"></wa-icon>
</wa-pagination>
```

:::info
The navigation buttons keep their built-in accessible labels even when you replace the icons, so screen readers still announce them correctly.
:::

### Disabled

Add the `disabled` attribute to disable the entire pagination control.

```html {.example}
<wa-pagination total="237" page-size="10" page="3" disabled></wa-pagination>
```

### Single Page

Add the `hide-single-page` attribute to render nothing when there's only one page of results.

```html
<wa-pagination total="5" page-size="10" hide-single-page></wa-pagination>
```

### Page Size Selector

Pair a [select](/docs/components/select) with the pagination control to let users change the page size. Update `page-size` when the selection changes, and reset to the first page.

```html {.example}
<div class="pagination-page-size">
  <wa-pagination total="237" page-size="10" page="1"></wa-pagination>

  <wa-select label="Items per page" value="10" size="s">
    <wa-option value="10">10</wa-option>
    <wa-option value="20">20</wa-option>
    <wa-option value="50">50</wa-option>
    <wa-option value="100">100</wa-option>
  </wa-select>
</div>

<style>
  .pagination-page-size {
    display: flex;
    align-items: end;
    gap: var(--wa-space-l);
    flex-wrap: wrap;
  }

  .pagination-page-size wa-select {
    inline-size: 8rem;
  }
</style>

<script>
  const container = document.querySelector('.pagination-page-size');
  const pagination = container.querySelector('wa-pagination');
  const select = container.querySelector('wa-select');

  select.addEventListener('change', () => {
    pagination.pageSize = Number(select.value);
    pagination.page = 1;
  });
</script>
```

### Responding to Page Changes

When the user changes the page, the `wa-page-change` event is emitted with `{ page, pageSize }` in `event.detail`. Update the `page` property to reflect the new page and load the corresponding data.

```html {.example}
<wa-pagination class="pagination-change" total="237" page-size="10" page="1"></wa-pagination>

<p class="pagination-change-output" style="margin-block-end: 0;">
  Showing page 1
</p>

<style>
  .pagination-change-output {
    margin-block-start: var(--wa-space-m);
  }
</style>

<script>
  const pagination = document.querySelector('.pagination-change');
  const output = document.querySelector('.pagination-change-output');

  pagination.addEventListener('wa-page-change', event => {
    pagination.page = event.detail.page;
    output.textContent = `Showing page ${event.detail.page}`;
  });
</script>
```

### Setting the Page Programmatically

Set the `page` property to any valid page to change the current page without user interaction. Setting `page` directly doesn't emit `wa-page-change`.

```html {.example}
<wa-pagination class="pagination-set" total="237" page-size="10" page="1"></wa-pagination>

<div class="pagination-set-buttons">
  <wa-button appearance="filled" data-page="1">Page 1</wa-button>
  <wa-button appearance="filled" data-page="5">Page 5</wa-button>
  <wa-button appearance="filled" data-page="10">Page 10</wa-button>
</div>

<style>
  .pagination-set-buttons {
    display: flex;
    gap: var(--wa-space-xs);
    margin-block-start: var(--wa-space-m);
  }
</style>

<script>
  const pagination = document.querySelector('.pagination-set');

  document.querySelectorAll('.pagination-set-buttons [data-page]').forEach(button => {
    button.addEventListener('click', () => {
      pagination.page = Number(button.dataset.page);
    });
  });
</script>
```

### Preventing a Page Change

Call `event.preventDefault()` on the `wa-before-page-change` event to cancel a page change, such as to guard against unsaved changes.

```html {.example}
<wa-pagination class="pagination-guard" total="237" page-size="10" page="1"></wa-pagination>

<script>
  const pagination = document.querySelector('.pagination-guard');

  pagination.addEventListener('wa-before-page-change', event => {
    if (!window.confirm(`Leave for page ${event.detail.page}?`)) {
      event.preventDefault();
    }
  });

  pagination.addEventListener('wa-page-change', event => {
    pagination.page = event.detail.page;
  });
</script>
```

### Rendering Links Instead of Buttons

Set the `href-template` attribute to render page items as links instead of buttons, using `{page}` as a placeholder for the page number. Every control links through the template, which works well for server-rendered pages.

```html {.example}
<wa-pagination total="237" page-size="10" page="3" href-template="?page={page}"></wa-pagination>
```

In JavaScript, you can also set the `hrefTemplate` property to a function that receives the page number and returns the URL. This is handy when the URL doesn't follow a simple substitution.

```html {.example}
<wa-pagination class="pagination-href-fn" total="237" page-size="10" page="3"></wa-pagination>

<script>
  const pagination = document.querySelector('.pagination-href-fn');

  pagination.hrefTemplate = page => `?page=${page}#results`;
</script>
```

:::info
In link mode, the component navigates to a new URL and won't update on its own. Make sure to render it on the server with the correct `page` for each request. Disabled and boundary controls (such as previous on the first page) render as non-navigable anchors with their `href` removed and `aria-disabled` set.
:::

### Styling Paginations

Use the exported [CSS parts](#css-parts) to customize the pagination's appearance, where the `button` part targets every button at once. The `plain` appearance is a good starting point.

This example turns the control into a row of pill-shaped buttons, gives the navigation arrows a colorful circular treatment, and highlights the current page with a gradient and a soft glow.

```html {.example}
<wa-pagination class="custom-pagination" total="237" page-size="10" page="3" appearance="plain" with-edges>
  <wa-icon slot="previous-icon" name="chevron-left"></wa-icon>
  <wa-icon slot="next-icon" name="chevron-right"></wa-icon>
  <wa-icon slot="first-icon" name="angles-left"></wa-icon>
  <wa-icon slot="last-icon" name="angles-right"></wa-icon>
</wa-pagination>

<style>
  .custom-pagination {
    --gradient: linear-gradient(135deg, var(--wa-color-brand-fill-loud), var(--wa-color-indigo-50));
  }

  /* The host uses `display: contents`, so style the `base` part to create the container chrome. */
  .custom-pagination::part(base) {
    padding: var(--wa-space-xs);
    border-radius: var(--wa-border-radius-pill);
    background-color: var(--wa-color-neutral-fill-quiet);
  }

  .custom-pagination::part(pages) {
    gap: var(--wa-space-2xs);
  }

  .custom-pagination::part(button) {
    min-width: 2.5em;
    height: 2.5em;
    border: none;
    border-radius: var(--wa-border-radius-pill);
    font-weight: var(--wa-font-weight-semibold);
    color: var(--wa-color-neutral-on-quiet);
    background-color: transparent;
    transition:
      transform var(--wa-transition-fast),
      color var(--wa-transition-fast),
      background-color var(--wa-transition-fast);
  }

  .custom-pagination::part(button):hover {
    color: var(--wa-color-neutral-on-normal);
    background-color: var(--wa-color-neutral-fill-normal);
    transform: translateY(-2px);
  }

  .custom-pagination::part(previous-button),
  .custom-pagination::part(next-button),
  .custom-pagination::part(first-button),
  .custom-pagination::part(last-button) {
    color: var(--wa-color-neutral-on-quiet);
    background-color: var(--wa-color-neutral-fill-normal);
  }

  /* Keep the nav arrows in the neutral family on hover — a slightly stronger fill, not the near-black `loud` token — so they stay calm next to the brand-tinted page numbers. */
  .custom-pagination::part(previous-button):hover,
  .custom-pagination::part(next-button):hover,
  .custom-pagination::part(first-button):hover,
  .custom-pagination::part(last-button):hover {
    color: var(--wa-color-neutral-on-normal);
    background-color: var(--wa-color-neutral-fill-normal);
    filter: brightness(0.95);
  }

  .custom-pagination::part(page-current) {
    color: var(--wa-color-brand-on-loud);
    background-image: var(--gradient);
    transform: none;
  }

  .custom-pagination::part(page-current):hover {
    color: var(--wa-color-brand-on-loud);
    transform: none;
  }

  .custom-pagination::part(ellipsis) {
    color: var(--wa-color-neutral-on-quiet);
    border: none;
    background-color: transparent;
  }
</style>
```
