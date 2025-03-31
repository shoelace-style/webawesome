---
title: Action Panel
description: 'These patterns help add user actions to dashboards'
icon: action-panel
---

## Simple
```html {.example}
<wa-card style="max-width: 480px; margin: 0 auto;">
  <div class="wa-align-items-start wa-stack wa-gap-xs">
    <h3 class="wa-heading-m">New Dashboard</h3>
    <p>Arrange your data into a single view.</p>
    <wa-button variant="brand">Build Dashboard</wa-button>
  </div>
</wa-card>
```
## with right flank
```html {.example}
<wa-card style="max-width: 960px; margin: 0 auto;">
  <div class="wa-flank:end">
    <div class="wa-stack wa-gap-xs">
      <h3 class="wa-heading-m">Query with the SQL Runner</h3>
      <p>Access your database to run ad-hoc queries.</p>
    </div>
    <wa-button appearance="outlined">New Query</wa-button>
  </div>
</wa-card>
```
## with switch
```html {.example}
<wa-card style="max-width: 960px; margin: 0 auto;">
  <div class="wa-flank:end">
   <div class="wa-stack wa-gap-xs">
      <h3 class="wa-heading-m">Auto-renew</h3>
      <p>We'll send you a reminder 30 days before we draft your account.</p>
    </div>
    <wa-switch size="large"></wa-switch>
  </div>
</wa-card>
```

## avatar and quick actions
```html{.example}
<wa-card style="margin: 0 auto; max-width: 45ch;">
  <div class="wa-flank">
    <wa-avatar image="https://images.unsplash.com/photo-1532202802379-df93d543bac3?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" label="profile-image"></wa-avatar>
    <div class="wa-split">
      <div class="wa-stack wa-gap-0">
        <span class="wa-heading-s">Super Dog</span>
        <span class="wa-caption-m">Online</span>
      </div>
      <div class="wa-cluster" style="font-size: var(--wa-font-size-l);">
        <wa-icon-button name="microphone"></wa-icon-button>
        <wa-icon-button name="headphones"></wa-icon-button>
        <wa-icon-button name="gear"></wa-icon-button>
      </div>
    </div>
  </div>
</wa-card>
```