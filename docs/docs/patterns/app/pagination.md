---
title: Pagination
description: TODO
parent: app
tags: app
---

## Simple Pagination

```html {.example}
  <wa-card with-footer style="width: 100%;" class="simple-pagination">
    <div></div>
    <div slot="footer" class="footer">
      Showing 1 to 10 of 50 Results
      <span>
        <wa-button><wa-icon slot="prefix" name="gear" variant="solid"></wa-icon> Prev</wa-button>
        <wa-button>Next <wa-icon slot="suffix" name="gear" variant="solid"></wa-icon></wa-button>
      </span>
    </div>
  </wa-card>
  <style>
    .simple-pagination {
      .footer {
            display: flex;
    justify-content: space-between;
    align-items: center;
      }
    }
  </style>
```
## Multi Page

```html {.example}
<wa-card with-footer style="width: 100%;" class="simple-pagination">
    <div></div>
    <div slot="footer" class="footer">
      Showing 1 to 10 of 50 Results
      <span>
       <wa-button-group label="Alignment">
  <wa-button size="small"><wa-icon name="exclamation-triangle"></wa-icon></wa-button>
  <wa-button size="small">1</wa-button>
  <wa-button size="small">2</wa-button>
  <wa-button size="small">...</wa-button>
  <wa-button size="small">9</wa-button>
  <wa-button size="small">10</wa-button>
  <wa-button size="small"><wa-icon name="exclamation-triangle"></wa-icon></wa-button>
</wa-button-group>
      </span>
    </div>
  </wa-card>
  <style>
    .simple-pagination {
      .footer {
            display: flex;
    justify-content: space-between;
    align-items: center;
      }
    }
  </style>
```