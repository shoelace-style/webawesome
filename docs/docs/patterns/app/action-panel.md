---
title: Action Panel
description: 'These patterns help add user actions to dashboards'
parent: app
tags: app
---

## Simple

```html {.example}
<wa-card style="max-width: 70ch; margin: auto">
  <div class="wa-stack wa-align-items-start">
    <h3 class="wa-heading-m">New Dashboard</h3>
    <p>Arrange your data into a single view to monitor trends and track performance.</p>
    <wa-button variant="brand">Build Dashboard</wa-button>
  </div>
</wa-card>
```

## With Flanked Button

```html {.example}
<wa-card style="max-width: 70ch; margin: auto">
  <div class="wa-flank:end">
    <div class="wa-stack wa-gap-xs">
      <h3 class="wa-heading-m">Query with SQL Runner</h3>
      <p>Access your database to run ad hoc queries.</p>
    </div>
    <wa-button variant="brand">New Query</wa-button>
  </div>
</wa-card>
```

## With Switch

```html {.example}
<wa-card style="max-width: 70ch; margin: auto">
  <div class="wa-stack">
    <div class="wa-flank:end">
      <h3 id="auto-renew-label" class="wa-heading-m">Auto-renew</h3>
      <wa-switch size="large" aria-labelledby="auto-renew-label"></wa-switch>
    </div>
    <p class="wa-body-s">Automatically renew your subscription using your preferred payment method. We'll send you a reminder 30 days before we draft your account.</p>
  </div>
</wa-card>
```