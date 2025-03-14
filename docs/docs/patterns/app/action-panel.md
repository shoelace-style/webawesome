---
title: Action Panel
description: 'These patterns help add user actions to dashboards'
parent: app
tags: app
---
## Examples

### Simple
```html {.example}
<wa-card style="max-width: 480px; margin: 0 auto;">
  <div class="wa-align-items-start wa-stack wa-gap-xs">
    <h3 class="wa-heading-m">New Dashboard</h3>
    <p>Arrange your data into a single view.</p>
    <wa-button variant="brand">Build Dashboard</wa-button>
  </div>
</wa-card>
```
### with right flank

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
### with switch
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