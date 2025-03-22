---
title: Data Display
description: TODO
parent: app
tags: app
---

## Cards with Avatars

```html {.example}
<div class="wa-grid" style="--min-column-size: 30ch">
  <wa-card>
    <div class="wa-flank wa-align-items-start">
      <wa-avatar shape="rounded">
         <wa-icon slot="icon" name="globe"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-2xs">
        <span class="wa-caption-m">Population (Zion)</span>
        <div class="wa-cluster wa-gap-xs">
          <span class="wa-heading-l">251,999</span>
          <wa-badge variant="danger" appearance="filled outlined" pill>
            <wa-icon fixed-width name="arrow-down" label="Down"></wa-icon>
            3%
          </wa-badge>
        </div>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank wa-align-items-start">
      <wa-avatar shape="rounded">
         <wa-icon slot="icon" name="brain-circuit"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-2xs">
        <span class="wa-caption-m">Minds Freed</span>
        <div class="wa-cluster wa-gap-xs">
          <span class="wa-heading-l">0.36%</span>
          <wa-badge variant="success" appearance="filled outlined" pill>
            <wa-icon fixed-width name="arrow-up" label="Up"></wa-icon>
            0.03%
          </wa-badge>
        </div>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank wa-align-items-start">
      <wa-avatar shape="rounded">
         <wa-icon slot="icon" name="robot"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-2xs">
        <span class="wa-caption-m">Agents Discovered</span>
        <div class="wa-cluster wa-gap-xs">
          <span class="wa-heading-l">3</span>
          <wa-badge variant="neutral" appearance="filled outlined" pill>
            <wa-icon fixed-width name="wave-triangle" label="Stable"></wa-icon>
            0%
          </wa-badge>
        </div>
      </div>
    </div>
  </wa-card>
</div>
```

## Condensed Card

```html {.example}
<wa-card style="max-width: 60ch; margin: auto">
  <section slot="header" class="wa-split">
    <div href="" class="wa-stack wa-gap-0">
      <span class="wa-caption-s">Query</span>
      <a href="" class="wa-heading-m">getUser</a>
    </div>
    <wa-icon-button fixed-width name="ellipsis" label="actions"></wa-icon-button>
  </section>
  <div class="wa-stack">
  <section class="wa-cluster">
    <span class="wa-caption-l">7.15M request • 9% • 734msP95</span>
  </section>
  <section class="wa-split">
    <div class="wa-stack wa-gap-xs">
      <span class="wa-caption-l">Cache Hit Rate</span>
      <span class="wa-heading-2xl">12.3%</span>
      <wa-badge appearance="filled outlined" variant="danger"><wa-icon name="arrow-down"></wa-icon> down from 19.6%</wa-badge>
    </div>
    <div class="wa-stack wa-gap-xs">
      <span class="wa-caption-l">Max CHR</span>
      <span class="wa-heading-2xl">72.6%</span>
      <wa-badge appearance="filled outlined" variant="success"><wa-icon name="arrow-up"></wa-icon> CHR Impact +5.4%</wa-badge>
    </div>
  </section>
  <wa-divider></wa-divider>
  <section class="wa-stack">
    <span class="wa-heading-m">90.5 GB (69.8%)</span>
    <div class="wa-split">
      <span>Cacheable Bandwidth</span>
      <span class="wa-cluster wa-gap-2xs">
        <wa-icon fixed-width name="dollar-sign"></wa-icon>
        <span>$9.50</span>
        <wa-icon fixed-width name="circle-question"></wa-icon>
      </span>
    </div>
    <div class="wa-stack">
      <wa-progress-bar value="9.8" label="Upload progress"></wa-progress-bar>
      <span class="wa-caption-m">Cached 12.8GB (9.8%)</span>
      <span class="wa-caption-m">Non-Cacheable 26.3GB (91.2)</span>
      <span class="wa-heading-s">Total 129.6GB</span>
    </div>
  </section>
  </div>
</wa-card>
```