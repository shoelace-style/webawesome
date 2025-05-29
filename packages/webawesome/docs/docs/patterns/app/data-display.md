---
title: Data Display
description: 'Convey insights, metrics, and aggregate data at a glance.'
isPro: true
---

## Simple

```html {.example}
<wa-card>
  <div class="wa-grid wa-gap-3xl" style="--min-column-size: 24ch;">
    <div class="wa-stack">
      <div class="wa-split">
        <div class="wa-cluster wa-gap-xs">
          <wa-icon name="sack-dollar"></wa-icon>
          <span>Incomes</span>
        </div>
        <div class="wa-cluster wa-gap-xs" style="color: var(--wa-color-green);">
          <wa-icon name="arrow-trend-up"></wa-icon>
          <wa-format-number class="wa-heading-s" type="percent" value=".475"></wa-format-number>
        </div>
      </div>
      <wa-format-number
        class="wa-heading-xl"
        type="currency"
        currency="USD"
        value="175000000"
        lang="en-US"
      ></wa-format-number>
    </div>
    <div class="wa-stack">
      <div class="wa-split">
        <div class="wa-cluster wa-gap-xs">
          <wa-icon name="credit-card"></wa-icon>
          <span>Expenses</span>
        </div>
        <div class="wa-cluster wa-gap-xs" style="color: var(--wa-color-red);">
          <wa-icon name="arrow-trend-down"></wa-icon>
          <wa-format-number class="wa-heading-s" type="percent" value=".27"></wa-format-number>
        </div>
      </div>
      <wa-format-number
        class="wa-heading-xl"
        class="wa-heading-xl"
        type="currency"
        currency="USD"
        value="289472"
        lang="en-US"
      ></wa-format-number>
    </div>
    <div class="wa-stack">
      <div class="wa-split">
        <div class="wa-cluster wa-gap-xs">
          <wa-icon name="seedling"></wa-icon>
          <span>Investments</span>
        </div>
        <div class="wa-cluster wa-gap-xs" style="color: var(--wa-color-green);">
          <wa-icon name="arrow-trend-up"></wa-icon>
          <wa-format-number class="wa-heading-s" type="percent" value=".14"></wa-format-number>
        </div>
      </div>
      <wa-format-number
        class="wa-heading-xl"
        class="wa-heading-xl"
        type="currency"
        currency="USD"
        value="569213"
        lang="en-US"
      ></wa-format-number>
    </div>
    <div class="wa-stack">
      <div class="wa-split">
        <div class="wa-cluster wa-gap-xs">
          <wa-icon name="landmark"></wa-icon>
          <span>Mortgages & Loans</span>
        </div>
      </div>
      <wa-format-number
        class="wa-heading-xl"
        class="wa-heading-xl"
        type="currency"
        currency="USD"
        value="23904"
        lang="en-US"
      ></wa-format-number>
    </div>
  </div>
</wa-card>
```

## Cards with Avatars

```html {.example}
<div class="wa-grid" style="--min-column-size: 30ch">
  <wa-card>
    <div class="wa-flank wa-align-items-start">
      <wa-avatar shape="rounded">
        <wa-icon slot="icon" name="user-group"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-2xs">
        <h3 class="wa-caption-m">Total Subscribers</h3>
        <div class="wa-cluster wa-gap-xs">
          <span class="wa-heading-l">81,779</span>
          <wa-badge variant="success" appearance="filled outlined" pill>
            <wa-icon fixed-width name="arrow-up" label="Up"></wa-icon>
            212
          </wa-badge>
        </div>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank wa-align-items-start">
      <wa-avatar shape="rounded">
        <wa-icon slot="icon" name="envelope-open"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-2xs">
        <h3 class="wa-caption-m">Open Rate</h3>
        <div class="wa-cluster wa-gap-xs">
          <span class="wa-heading-l">61.58%</span>
          <wa-badge variant="success" appearance="filled outlined" pill>
            <wa-icon fixed-width name="arrow-up" label="Up"></wa-icon>
            4.5%
          </wa-badge>
        </div>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank wa-align-items-start">
      <wa-avatar shape="rounded">
        <wa-icon slot="icon" name="arrow-pointer"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-2xs">
        <h3 class="wa-caption-m">Click Rate</h3>
        <div class="wa-cluster wa-gap-xs">
          <span class="wa-heading-l">25.74%</span>
          <wa-badge variant="danger" appearance="filled outlined" pill>
            <wa-icon fixed-width name="arrow-down" label="Down"></wa-icon>
            2.1%
          </wa-badge>
        </div>
      </div>
    </div>
  </wa-card>
</div>
```

## Condensed Card

```html {.example}
<wa-card style="max-width: 50ch; margin: auto">
  <div slot="header" class="wa-split">
    <h3 class="wa-heading-m"><span style="color: var(--wa-color-text-quiet)">query</span> getUser</h3>
    <wa-icon-button id="go-to-query-button" name="chevron-right" label="Go to Query"></wa-icon-button>
    <wa-tooltip for="go-to-query-button">Go to Query</wa-tooltip>
  </div>
  <div class="wa-stack wa-gap-xl">
    <div class="wa-split wa-align-items-stretch">
      <article class="wa-stack wa-align-items-start wa-gap-xs">
        <h4 class="wa-caption-l">Cache Hit Rate</h4>
        <div class="wa-cluster wa-heading-2xl">
          <wa-progress-ring value="12.3" style="--size: 1em; --track-width: 0.125em"></wa-progress-ring>
          <span>12.3%</span>
        </div>
        <wa-badge appearance="filled outlined" variant="danger"
          ><wa-icon name="arrow-down"></wa-icon> down from 19.6%</wa-badge
        >
      </article>
      <article class="wa-stack wa-gap-xs wa-align-items-end">
        <h4 class="wa-caption-l">Max CHR</h4>
        <span class="wa-heading-2xl">72.6%</span>
        <wa-badge appearance="filled outlined" variant="success"
          ><wa-icon name="sparkles"></wa-icon> CHR Impact +5.4%</wa-badge
        >
      </article>
    </div>
    <wa-divider></wa-divider>
    <article class="wa-stack wa-gap-xl">
      <div class="wa-stack wa-gap-xs">
        <h4 class="wa-caption-l">Cacheable Bandwidth</h4>
        <div class="wa-split">
          <span class="wa-heading-2xl">90.5 GB</span>
          <span class="wa-caption-xl">69.9%</span>
        </div>
        <wa-progress-bar value="30.1" label="Cached and non-cacheable bandwidth"></wa-progress-bar>
      </div>
      <dl class="wa-stack wa-caption-m">
        <div class="wa-cluster">
          <dt>Cached</dt>
          <dd>12.8 GB (9.8%)</dd>
        </div>
        <div class="wa-cluster">
          <dt>Non-Cacheable</dt>
          <dd>26.3 GB (20.3%)</dd>
        </div>
        <div class="wa-cluster">
          <dt>Total</dt>
          <dd>129.6 GB</dd>
        </div>
      </dl>
    </article>
  </div>
</wa-card>
```
