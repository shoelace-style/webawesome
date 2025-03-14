---
title: Pagination
description: TODO
parent: app
tags: app
---

## Simple Pagination

```html{.example}
<div>
  <wa-divider></wa-divider>
  <div class="wa-split">
    <span class="wa-caption-l">Showing 1 to 10 of 50 Results</span>
      <span>
        <wa-button><wa-icon slot="prefix" name="gear" variant="solid"></wa-icon> Prev</wa-button>
        <wa-button><wa-icon slot="suffix" name="gear" variant="solid"></wa-icon>Next </wa-button>
      </span>
  </div>
</div>
```

## Multi Page

```html {.example}
<wa-card with-footer>
  <div class="wa-stack" style="opacity: 25%;">
    <div>
      <div class="wa-flank">
        <wa-avatar label="User avatar"></wa-avatar>
        <div>
          Some stuff
        </div>
      </div>
      <wa-divider></wa-divider>
    </div>

  </div>
  <div slot="footer" class="wa-split">
    <wa-button><wa-icon slot="prefix" name="gear" variant="solid"></wa-icon> Prev</wa-button>
    <wa-button><wa-icon slot="suffix" name="gear" variant="solid"></wa-icon>Next </wa-button>
  </div>
</wa-card>
```