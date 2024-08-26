---
title: Split
description: Browse the library of customizable, framework-friendly web components included in Web Awesome.
layout: page-outline
---

Split distributes two or more items evenly across available space, either in a row or a column.

<style>
  .example-block {
    background-color: var(--wa-color-indigo-60);
    border-radius: var(--wa-border-radius-s);
    min-block-size: 4rem;
    min-inline-size: 4rem;
  }
  .example-set {
    border: var(--wa-border-width-s) dashed var(--wa-color-neutral-border-normal);
    border-radius: var(--wa-border-radius-m);
    padding: var(--wa-space-s);
  }
</style>

```html {.example}
<div class="wa-split">
  <div class="example-block"></div>
  <div class="example-block"></div>
</div>
```

## Direction

Items can be split across a row or down a column by appending `:row` or `:column` to the `wa-split` class.

```html {.example}
<div class="wa-flank" style="block-size: 16rem; --align: flex-start;">
  <div class="example-set wa-split:column">
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
  <div class="example-set wa-split:row">
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
</div>
```

## Align Items

By default, items in a split use `align-items: center;` to stay centered in the available space. You can append any of the following modifiers to the `wa-split` class in your markup to specify how items are aligned:
- `:align-start`
- `:align-end`
- `:align-center`
- `:align-stretch`

These modifiers specify how items are aligned in the block direction for `wa-split:row` and in the inline direction for `wa-split:column`.

```html {.example}
<div class="wa-stack">
  <div class="example-set wa-split:align-start" style="height: 8rem;">
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
  <div class="example-set wa-split:align-end" style="height: 8rem;">
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
  <div class="example-set wa-split:align-center" style="height: 8rem;">
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
  <div class="example-set wa-split:align-stretch" style="height: 8rem;">
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
</div>
```

## Gap

A split's gap determines how close items can be before they wrap. By default, the gap between split items uses `--wa-space-m` from your theme. You can append any of the following modifiers to the `wa-split` class in your markup to specify the gap between items:
- `:gap-3xs`
- `:gap-2xs`
- `:gap-xs`
- `:gap-s`
- `:gap-m`
- `:gap-l`
- `:gap-xl`
- `:gap-2xl`
- `:gap-3xl`

Each modifier uses the corresponding space variable from your theme.

```html {.example}
<div class="wa-stack">
  <div class="example-set wa-split:gap-3xs">
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
  <div class="example-set wa-split:gap-3xl">
    <div class="example-block"></div>
    <div class="example-block"></div>
  </div>
</div>
```

## Examples

Splits are well suited for navigation, headers, and footers.

```html {.example}
<div class="wa-flank">
  <div class="wa-split:column">
    <div class="wa-stack">
      <wa-icon-button name="house"></wa-icon-button>
      <wa-icon-button name="calendar"></wa-icon-button>
      <wa-icon-button name="envelope"></wa-icon-button>
    </div>
    <div class="wa-stack">
      <wa-divider></wa-divider>
      <wa-icon-button name="right-from-bracket"></wa-icon-button>
    </div>
  </div>
  <div class="wa-grid">
    <h3 style="grid-column: 1 / -1">Contacts</h3>
    <wa-card>
      <div class="wa-flank">
        <wa-avatar shape="rounded">
          <wa-icon slot="icon" name="user-secret"></wa-icon>
        </wa-avatar>
        <div>
          <strong>Trinity</strong><br>
          <small>Nebuchadnezzar</small>
        </div>
      </div>
    </wa-card>
    <wa-card>
      <div class="wa-flank">
        <wa-avatar shape="rounded">
          <wa-icon slot="icon" name="user-tie"></wa-icon>
        </wa-avatar>
        <div>
          <strong>Mr. Rhineheart</strong><br>
          <small>MetaCortex</small>
        </div>
      </div>
    </wa-card>
    <wa-card>
      <div class="wa-flank">
        <wa-avatar shape="rounded">
          <wa-icon slot="icon" name="web-awesome"></wa-icon>
        </wa-avatar>
        <div>
          <strong>Web Awesome</strong><br>
          <small>hello@webawesome.com</small>
        </div>
      </div>
    </wa-card>
    <wa-card>
      <div class="wa-flank">
        <wa-avatar shape="rounded">
          <wa-icon slot="icon" name="web-awesome"></wa-icon>
        </wa-avatar>
        <div>
          <strong>Web Awesome</strong><br>
          <small>hello@webawesome.com</small>
        </div>
      </div>
    </wa-card>
  </div>
</div>
```