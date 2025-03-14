---
title: Data Display
description: TODO
parent: app
tags: app
---
## Examples

### With icon

```html{.example}
<div class="wa-grid" style="max-width: 960px; margin: 0 auto">
  <wa-card>
    <div class="wa-flank">
      <wa-avatar shape="square" label="Square avatar" class="wa-callout wa-neutral">
         <wa-icon slot="icon" name="user-plus" variant="solid"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-2xs">
        <span class="wa-heading-xs">Total Subscribers</span>
        <div class="wa-cluster">
          <span class="wa-heading-l">71,897</span>
          <wa-tag size="small" variant="success" appearance="filled outlined" pill><wa-icon fixed-width name="arrow-up"></wa-icon> 122</wa-tag>
        </div>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank">
      <wa-avatar shape="square" label="Square avatar" class="wa-callout wa-neutral">
         <wa-icon slot="icon" name="user-plus" variant="solid"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-2xs">
        <span class="wa-heading-xs">Total Subscribers</span>
        <div class="wa-cluster">
          <span class="wa-heading-l">71,897</span>
          <wa-tag size="small" variant="success" appearance="filled outlined" pill><wa-icon fixed-width name="arrow-up"></wa-icon> 122</wa-tag>
        </div>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank">
      <wa-avatar shape="square" label="Square avatar" class="wa-callout wa-neutral">
         <wa-icon slot="icon" name="user-plus" variant="solid"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-2xs">
        <span class="wa-heading-xs">Total Subscribers</span>
        <div class="wa-cluster">
          <span class="wa-heading-l">71,897</span>
          <wa-tag size="small" variant="success" appearance="filled outlined" pill><wa-icon fixed-width name="arrow-up"></wa-icon> 122</wa-tag>
        </div>
      </div>
    </div>
  </wa-card>
</div>
```

### Multi column

```html{.example}
<div style="max-width: 480px; margin: 0 auto">
  <wa-card>
    <div>
      <div class="wa-flank">
      <wa-icon family="brands" name="youtube"></wa-icon>
      <div class="wa-align-items-center wa-cluster" style="justify-content: space-between;">
        <span>YouTube Premium</span>
        <span>5 minutes ago</span>
        <wa-tag variant="danger" appearance="outlined filled" pill>-$5.00</wa-tag>
      </div>
    </div>
    <wa-divider></wa-divider>
    <div class="wa-flank">
      <wa-icon family="brands" name="youtube"></wa-icon>
      <div class="wa-align-items-center wa-cluster" style="justify-content: space-between;">
        <span>YouTube Premium</span>
        <span>5 minutes ago</span>
        <wa-tag variant="danger" appearance="outlined filled" pill>-$5.00</wa-tag>
      </div>
    </div>
    <wa-divider></wa-divider>
    <div class="wa-flank">
      <wa-icon family="brands" name="youtube"></wa-icon>
      <div class="wa-align-items-center wa-cluster" style="justify-content: space-between;">
        <span>YouTube Premium</span>
        <span>5 minutes ago</span>
        <wa-tag variant="danger" appearance="outlined filled" pill>-$5.00</wa-tag>
      </div>
    </div>
    <wa-divider></wa-divider>
    <div class="wa-flank">
      <wa-icon family="brands" name="youtube"></wa-icon>
      <div class="wa-align-items-center wa-cluster" style="justify-content: space-between;">
        <span>YouTube Premium</span>
        <span>5 minutes ago</span>
        <wa-tag variant="danger" appearance="outlined filled" pill>-$5.00</wa-tag>
      </div>
    </div>
    <wa-divider></wa-divider>
    <div class="wa-flank">
      <wa-icon family="brands" name="youtube"></wa-icon>
      <div class="wa-align-items-center wa-cluster" style="justify-content: space-between;">
        <span>YouTube Premium</span>
        <span>5 minutes ago</span>
        <wa-tag variant="danger" appearance="outlined filled" pill>-$5.00</wa-tag>
      </div>
    </div>
    <wa-divider></wa-divider>
    </div>
  </wa-card>
</div>
```

### Card with condensed information
```html{.example}
<wa-card style="max-width: 480px; margin: 0 auto;">
  <div class="wa-stack">
  <section class="wa-split">
    <a href="#" class="wa-cluster wa-gap-xs wa-align-items-center">
      <span class="wa-caption-m">query</span>
      <span class="wa-heading-m">getUser</span>
      <wa-icon fixed-width name="arrow-right"></wa-icon>
    </a>
    <wa-icon-button fixed-width name="ellipsis" label="actions"></wa-icon-button>
  </section>
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