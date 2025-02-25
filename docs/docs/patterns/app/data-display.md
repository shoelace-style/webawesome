---
title: Data Display
description: TODO
parent: app
tags: app
---

## With icon

```html{.example}
<div class="data-display">
  <h3>Last Week</h3>
  <div class="with-icon">
    <dl>
      <wa-card with-footer>
        <dt>
          <div class="icon-bg" style="--icon-bg: #9b31ee">
            <wa-icon style="color: white; font-size: 16px;"  name="users"></wa-icon>
          </div>
          <p class="stat-title">Total Subscribers</p>
        </dt>
        <dd>
          <span class="stat">71,897</span>
          <span style="color: green;"><wa-icon fixed-width name="arrow-up"></wa-icon> 122</span>
        </dd>
        <div slot="footer">
          <a href="#">View all</a>
        </div>
      </wa-card>
     <wa-card with-footer>
        <dt>
          <div class="icon-bg" style="--icon-bg: #62e5cf">
            <wa-icon style="color: white; font-size: 16px;"  name="users"></wa-icon>
          </div>
          <p class="stat-title">Total Subscribers</p>
        </dt>
        <dd>
          <span class="stat">71,897</span>
          <span style="color: green;"><wa-icon fixed-width name="arrow-up"></wa-icon> 122</span>
        </dd>
        <div slot="footer">
          <a href="#">View all</a>
        </div>
      </wa-card>
    </dl>


  </div>

</div>
<style>
  .with-icon {
    dl {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-bottom: 0;

      wa-card::part(body) {

      }

      wa-card::part(footer) {
        background: #fafafa;
        border-bottom-left-radius: var(--wa-panel-border-radius);
        border-bottom-right-radius: var(--wa-panel-border-radius);
        padding: 1rem;
      }

      wa-card dt .icon-bg {
        --icon-bg: #eee;
        background: var(--icon-bg);
        width: 3rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 1rem;
        border-radius: 0.5rem;
        position: absolute;
      }

      wa-card dt .stat-title {
    margin-left: 4rem;
    margin-bottom: 0;
  }

      wa-card dd {
                    margin-left: 4rem;
                    margin-bottom: 0;
        .stat {
    font-size: x-large;
    font-weight: 600;
    line-height: .5rem;
  }
      }
    }
  }
  </style>
```

## With shared borders
```html{.example}
<wa-card class="with-shared-borders">
  <dl>
    <div style="--img-bg: transparent; padding: .67rem;">
      <dt>Total Subscribers</dt>
      <dd style="margin: 0;">
        <div class="stat" style="--img-bg: transparent; border: none;">
          71,897
          <span class="from-stat">from 70,946</span>
        </div>
        <div>
          <wa-tag size="medium" variant="success" pill>
            <wa-icon name="arrow-up" style="margin-right: .25rem;"></wa-icon> 12%
          </wa-tag>
        </div>
      </dd>
    </div>
    <div style="--img-bg: transparent; padding: .67rem;">
      <dt>Total Subscribers</dt>
      <dd style="margin: 0;">
        <div class="stat" style="--img-bg: transparent; border: none;">
          71,897
          <span class="from-stat">from 70,946</span>
        </div>
        <div>
          <wa-tag size="medium" variant="success" pill>
            <wa-icon name="arrow-up" style="margin-right: .25rem;"></wa-icon> 12%
          </wa-tag>
        </div>
      </dd>
    </div>

  </dl>
</wa-card>
<style>
  .with-shared-borders {
    width: 100%;
    dl {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      margin: 0;

      dt {
        color: #8991A6;
        font-size: 14px;
      }


      div {
        border-right-style: solid;
        border-right-width: 1px;
        border-right-color: var(--wa-color-surface-border);

        dd {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        dd .stat {
          font-size: x-large;
          font-weight: 600;
          line-height: .5rem;
          color: #6741D9;
        }

        dd .stat .from-stat {
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: #8991A6;
        }
      }

      div:last-of-type {
        border: none;
      }
    }


  }

   wa-card.with-shared-borders::part(body) {
        padding: 0;
      }

  wa-card.shared-borders::part(body) {

  --spacing: 0;
}
</style>
```