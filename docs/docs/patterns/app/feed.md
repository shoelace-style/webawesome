---
title: Feed
description: TODO
---

```html {.example}
<div class="activity-feed">
  <div class="activity-group">
    <span class="connector"></span>
    <div class="activity">
      <wa-icon name="user-circle" class="fa-fw"></wa-icon>
      <p>Kicked ass and <strong>chewed bubblegum</strong></p>
      <span style="margin-left: auto"><em>Oct. 31st</em></span>
    </div>
  </div>
  <div class="activity-group">
    <span class="connector"></span>
    <div class="activity">
      <wa-icon name="thumbs-up" style="color: blue" class="fa-fw"></wa-icon>
      <p>Kicked ass and <strong>chewed bubblegum</strong></p>
      <span style="margin-left: auto"><em>Oct. 31st</em></span>
    </div>
  </div>
  <div class="activity-group">
    <span class="connector"></span>
    <div class="activity">
      <wa-icon name="crown" class="fa-fw"></wa-icon>
      <p>Kicked ass and <strong>chewed bubblegum</strong></p>
      <span style="margin-left: auto"><em>Oct. 31st</em></span>
    </div>
  </div>
  <div class="activity-group">
    <span class="connector"></span>
    <div class="activity">
      <wa-icon name="turtle" style="color: green" class="fa-fw"></wa-icon>
      <p>Kicked ass and <strong>chewed bubblegum</strong></p>
      <span style="margin-left: auto"><em>Oct. 31st</em></span>
    </div>
  </div>

</div>

<style>
  :root {
    --border-color: var(--wa-color-surface-border);
  }
  .activity-feed {
    wa-icon {
      margin-right: 1rem;
      font-size: 32px;
    }
    .fa-fw {
      text-align: center;
      width: 1.25em;
    }
    .activity {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    }

    .activity-group:not(:first-child) {
          margin-top: .5rem;
    }
    .activity-group {
      position: relative;
    }

    .connector {
      position: absolute;
    background-color: var(--border-color);
    height: 25%;
    width: 0.125rem;
    margin-left: -1px;
    top: 2.5rem;
    left: 1rem;
    }

    .activity-group:last-of-type .connector {
      display: none;
    }
  }
</style>
```
