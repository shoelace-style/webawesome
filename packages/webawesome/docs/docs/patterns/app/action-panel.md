---
title: Action Panel
description: 'Help users complete tasks efficiently with quick access to key actions.'
icon: action-panel
isPro: true
---

## Simple

```html {.example}
<wa-card style="max-width: 60ch; margin: auto">
  <div class="wa-stack wa-align-items-start">
    <h3 class="wa-heading-m">New Dashboard</h3>
    <p>Arrange your data into a single view to monitor trends and track performance.</p>
    <wa-button variant="brand" size="small">Build Dashboard</wa-button>
  </div>
</wa-card>
```

## With Flanked Button

```html {.example}
<wa-card style="max-width: 60ch; margin: auto">
  <div class="wa-flank:end">
    <div class="wa-stack wa-gap-xs">
      <h3 class="wa-heading-m">Query with SQL Runner</h3>
      <p>Access your database to run ad hoc queries.</p>
    </div>
    <wa-button variant="brand" size="small">New Query</wa-button>
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
    <p class="wa-body-s">
      Automatically renew your subscription using your preferred payment method. We'll send you a reminder 30 days
      before we draft your account.
    </p>
  </div>
</wa-card>
```

## Avatar and Quick actions

```html {.example}
<wa-card style="margin: 0 auto; max-width: 45ch;">
  <div class="wa-flank">
    <wa-avatar
      image="https://images.unsplash.com/photo-1532202802379-df93d543bac3?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      label="profile-image"
    ></wa-avatar>
    <div class="wa-split">
      <div class="wa-stack wa-gap-2xs">
        <span class="wa-heading-s">Super Dog</span>
        <div class="wa-caption-m wa-cluster wa-gap-xs">
          <span>Online</span>
          <wa-icon name="circle" style="color: var(--wa-color-green); font-size: 10px;"></wa-icon>
        </div>
      </div>
      <div class="wa-cluster" style="font-size: var(--wa-font-size-l);">
        <wa-icon-button name="microphone" label="audio-input"></wa-icon-button>
        <wa-icon-button name="headphones" label="audio-output"></wa-icon-button>
        <wa-icon-button name="gear" label="settings"></wa-icon-button>
      </div>
    </div>
  </div>
</wa-card>
```
