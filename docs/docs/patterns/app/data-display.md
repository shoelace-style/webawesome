---
title: Data Display
description: TODO
parent: app
tags: app
---

## With icon

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

## Multi column

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
