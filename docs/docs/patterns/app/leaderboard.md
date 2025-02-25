---
title: Leaderboard
description: TODO
parent: app
tags: app
---

```html{.example}
<div class="leaderboard">
  <h3 style="grid-column: 1/-1">Collective Activity for Yesterday</h3>

    <wa-card class="activity-card" style="--wa-color-surface-default: tomato; --wa-color-text-normal: white; grid-column: 1/5;">
      <span>
        <wa-icon name="book"></wa-icon>
        Items Studied
      </span>
      <div class="leaderboard-number">482,813</div>
    </wa-card>
    <wa-card class="activity-card" style="--wa-color-surface-default: cadetblue; --wa-color-text-normal: white; grid-column: 5/9">
      <span>
        <wa-icon name="user-ninja"></wa-icon>
        Items Mastered
      </span>
      <div class="leaderboard-number">97,303</div>
    </wa-card>
    <wa-card class="activity-card" style="--wa-color-surface-default: rebeccapurple; --wa-color-text-normal: white; grid-column: 9/-1">
      <span>
        <wa-icon name="user-ninja"></wa-icon>
        Items Mastered
      </span>
      <div class="leaderboard-number">97,303</div>
    </wa-card>

  <wa-card class="card-header" with-header style="grid-column: 2/12">
    <div slot="header">
      <div class="leaderboard-badge">
        <wa-icon name="trophy"></wa-icon>
      </div>
      <span>
        <h4 style="--wa-space-xl: 0;">Study Leaders</h4>
        items mastered last 7 days
      </span>
    </div>
    <ol class="leaderboard-list">
      <li>
        <div>
        <span>
          <h5 style="--wa-space-xl: 0">Title</h5>
          <span style="font-size: x-large;font-weight: 700;">4,500</span>
        </span>
        </div>
      </li>
      <li>
        <div>

        <span>
          <h5 style="--wa-space-xl: 0">Title</h5>
          <span style="font-size: x-large;font-weight: 700;">4,500</span>
        </span>
        </div>
      </li>
      <li>
        <div>
        <span>
          <h5 style="--wa-space-xl: 0">Title</h5>
          <span style="font-size: x-large;font-weight: 700;">4,500</span>
        </span>
        </div>
      </li>
      <li>
        <div>
        <span>
          <h5 style="--wa-space-xl: 0">Title</h5>
          <span style="font-size: x-large;font-weight: 700;">4,500</span>
        </span>
        </div>
      </li>
    </ol>
  </wa-card>

</div>
<style>
  img.leaderboard-image {
    width: 50px
  }
  .leaderboard {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
  }

  .leaderboard-list {
    li {
      margin-bottom: 1.5rem;
      border-bottom: 1px solid var(--wa-color-surface-border);
    }
    li div {
      display: flex;
    }
  }
  .activity-card {

  }

  .leaderboard .card-header [slot='header'] {
   display: flex;
  }

  .leaderboard-number {
    font-size: xx-large;
    font-weight: 600;
  }

  .leaderboard-badge {
       background: green;
    color: white;
    padding: 1rem;
    border-radius: var(--wa-panel-border-radius);
    margin-right: .75rem;
  }
</style>
```