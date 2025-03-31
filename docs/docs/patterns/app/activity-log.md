---
title: Activity Log
description: 'Track and organize recent user actions or events.'
---

## Timeline with Icons

```html {.example}
<div class="wa-stack wa-gap-3xs" style="max-width: 60ch; margin: auto">
  <article class="wa-flank" style="flex-wrap: nowrap">
    <wa-avatar style="--size: 2rem">
      <wa-icon slot="icon" name="acorn"></wa-icon>
    </wa-avatar>
    <div class="wa-flank:end wa-gap-xs">
      <span>Buried by <strong>squirrel</strong></span>
      <wa-format-date date="2025-04-01" month="short" day="numeric"></wa-format-date>
    </div>
  </article>
  <wa-divider vertical style="height: 1em; margin-left: 1rem"></wa-divider>
  <article class="wa-flank" style="flex-wrap: nowrap">
    <wa-avatar style="--size: 2rem">
      <wa-icon slot="icon" name="seedling"></wa-icon>
    </wa-avatar>
    <div class="wa-flank:end wa-gap-xs">
      <span>Germinated in <strong>nutrient-rich soil</strong></span>
      <wa-format-date date="2025-05-29" month="short" day="numeric"></wa-format-date>
    </div>
  </article>
  <wa-divider vertical style="height: 1em; margin-left: 1rem"></wa-divider>
  <article class="wa-flank" style="flex-wrap: nowrap">
    <wa-avatar style="--size: 2rem">
      <wa-icon slot="icon" name="tree-deciduous"></wa-icon>
    </wa-avatar>
    <div class="wa-flank:end wa-gap-xs">
      <span>Matured by <strong>water</strong> and <strong>sunlight</strong></span>
      <wa-format-date date="2025-09-15" month="short" day="numeric"></wa-format-date>
    </div>
  </article>
  <wa-divider vertical style="height: 1em; margin-left: 1rem"></wa-divider>
  <article class="wa-flank" style="flex-wrap: nowrap">
    <wa-avatar style="--size: 2rem">
      <wa-icon slot="icon" name="crate-apple"></wa-icon>
    </wa-avatar>
    <div class="wa-flank:end wa-gap-xs">
      <span>Fruit harvested by <strong>you</strong></span>
      <wa-format-date date="2025-10-18" month="short" day="numeric"></wa-format-date>
    </div>
  </article>
</div>
```

## Simple Rows

```html {.example}
<div class="wa-stack" style="max-width: 60ch; margin: auto">
  <article class="wa-flank:end wa-align-items-baseline" style="--flank-size: 10ch">
    <div class="wa-grid">
      <div class="wa-cluster">
        <wa-icon name="french-fries" fixed-width></wa-icon>
        <span>Fast food</span>
      </div>
      <wa-relative-time sync></wa-relative-time>
    </div>
    <wa-tag variant="danger">- $5.00</wa-tag>
  </article>
  <wa-divider></wa-divider>
  <article class="wa-flank:end wa-align-items-baseline" style="--flank-size: 10ch">
    <div class="wa-grid">
      <div class="wa-cluster">
        <wa-icon name="piggy-bank" fixed-width></wa-icon>
        <span>Refund</span>
      </div>
      <wa-relative-time date="2025-03-26T09:00:00-04:00"></wa-relative-time>
    </div>
    <wa-tag variant="success">+ $48.99</wa-tag>
  </article>
  <wa-divider></wa-divider>
  <article class="wa-flank:end wa-align-items-baseline" style="--flank-size: 10ch">
    <div class="wa-grid">
      <div class="wa-cluster">
        <wa-icon name="carrot" fixed-width></wa-icon>
        <span>Groceries</span>
      </div>
      <wa-relative-time date="2025-03-24T09:00:00-04:00"></wa-relative-time>
    </div>
    <wa-tag variant="danger">- $115.37</wa-tag>
  </article>
  <wa-divider></wa-divider>
  <article class="wa-flank:end wa-align-items-baseline" style="--flank-size: 10ch">
    <div class="wa-grid">
      <div class="wa-cluster">
        <wa-icon name="shirt" fixed-width></wa-icon>
        <span>Clothing</span>
      </div>
      <wa-relative-time date="2025-03-15T09:00:00-04:00"></wa-relative-time>
    </div>
    <wa-tag variant="danger">- $220.99</wa-tag>
  </article>
</div>
```