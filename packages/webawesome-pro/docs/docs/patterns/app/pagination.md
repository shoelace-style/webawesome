---
title: Pagination
description: 'Improve navigation and performance by breaking long lists or content into manageable pages.'
isPro: true
---

## Simple

```html {.example}
<div class="wa-stack">
  <div class="wa-placeholder"></div>
  <wa-divider></wa-divider>
  <div class="wa-split">
    <span class="wa-caption-l">Showing 1 to 10 of 50 Results</span>
    <div class="wa-cluster wa-gap-xs">
      <wa-button appearance="outlined">
        <wa-icon slot="prefix" name="chevron-left"></wa-icon>
        Prev
      </wa-button>
      <wa-button appearance="outlined">
        <wa-icon slot="suffix" name="chevron-right"></wa-icon>
        Next
      </wa-button>
    </div>
  </div>
</div>
```

## With Button Group

```html {.example}
<div class="wa-stack">
  <div class="wa-placeholder"></div>
  <wa-divider></wa-divider>
  <div class="wa-split">
    <span class="wa-caption-l">Showing 1 to 10 of 50 Results</span>
    <wa-button-group orientation="horizontal">
      <wa-button appearance="outlined">
        <wa-icon name="chevron-left"></wa-icon>
      </wa-button>
      <wa-button appearance="accent" variant="brand">1</wa-button>
      <wa-button appearance="outlined">2</wa-button>
      <wa-button appearance="outlined">3</wa-button>
      <wa-button appearance="outlined" disabled>...</wa-button>
      <wa-button appearance="outlined">10</wa-button>
      <wa-button appearance="outlined">
        <wa-icon name="chevron-right"></wa-icon>
      </wa-button>
    </wa-button-group>
  </div>
</div>
```