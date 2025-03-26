---
title: Newsletter
description: 'Empower your customers to view past purchases and track upcoming orders with comprehensive order histories.'
---

### Newsletter signup

```html{.example}
<wa-card class="news-letter-signup">
  <h2>Subscribe to our Newsletter</h2>
  <p>To get the latest and most quality design resources</p>
  <div class="subscribe-input"> <wa-input></wa-input><wa-button>Subscribe</wa-button></div>
</wa-card>
<style>
  .news-letter-signup {
        display: block;
    width: fit-content;
    margin: 0 auto;
  }
  .subscribe-input {
    display: flex;
    width: 100%;

    wa-input {
      width: inherit;
    }

    wa-button {
      margin-left: 0.5rem;
    }
  }
</style>
```
