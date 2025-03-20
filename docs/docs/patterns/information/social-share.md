---
title: Social Share
description: 'Empower your customers to view past purchases and track upcoming orders with comprehensive order histories.'
parent: information
tags: information
---

## Examples

### Horizontal
```html{.example}
<wa-card style="max-width: 420px; margin: 0 auto;">
  <div class="wa-stack">
    <span class="wa-heading-s">Share Video</span>
    <div class="wa-cluster" style="margin: 0 auto;">
      <span class="wa-align-items-center wa-stack">
        <wa-icon-button style="font-size: 32px;" name="code" variant="solid" label="Embed video" href="https://example.com" target="_blank"></wa-icon-button>
        <span class="wa-caption-s">Embed</span>
      </span>
      <span class="wa-align-items-center wa-stack">
        <wa-icon-button style="font-size: 32px;" name="facebook" family="brands" variant="solid" label="Embed video" href="https://example.com" target="_blank"></wa-icon-button>
        <span class="wa-caption-s">Facebook</span>
      </span>
      <span class="wa-align-items-center wa-stack">
        <wa-icon-button style="font-size: 32px;" name="twitter" family="brands" variant="solid" label="Embed video" href="https://example.com" target="_blank"></wa-icon-button>
        <span class="wa-caption-s">Twitter</span>
      </span>
      <span class="wa-align-items-center wa-stack">
        <wa-icon-button style="font-size: 32px;" name="linkedin" family="brands" variant="solid" label="Embed video" href="https://example.com" target="_blank"></wa-icon-button>
        <span class="wa-caption-s">LinkedIn</span>
      </span>
      <span class="wa-align-items-center wa-stack">
        <wa-icon-button style="font-size: 32px;" name="envelope-open" variant="solid" label="Embed video" href="https://example.com" target="_blank"></wa-icon-button>
        <span class="wa-caption-s">Email</span>
      </span>
    </div>
    <wa-button appearance="outlined">
      <wa-icon slot="prefix" name="link"></wa-icon>
      Copy Link
    </wa-button>
  </div>
</wa-card>
```

### Vertical
```html{.example}
<wa-card class="wa-border-radius-pill" style="max-width: 72px; margin: 0 auto;">
  <div class="wa-stack">
    <span class="wa-align-items-center wa-stack wa-gap-2xs">
        <wa-icon-button style="font-size: 32px;" name="code" variant="solid" label="Embed video" href="https://example.com" target="_blank"></wa-icon-button>
        <span class="wa-caption-s">Embed</span>
      </span>
      <span class="wa-align-items-center wa-stack wa-gap-2xs">
        <wa-icon-button style="font-size: 32px;" name="facebook" family="brands" variant="solid" label="Embed video" href="https://example.com" target="_blank"></wa-icon-button>
        <span class="wa-caption-s">Facebook</span>
      </span>
      <span class="wa-align-items-center wa-stack wa-gap-2xs">
        <wa-icon-button style="font-size: 32px;" name="twitter" family="brands" variant="solid" label="Embed video" href="https://example.com" target="_blank"></wa-icon-button>
        <span class="wa-caption-s">Twitter</span>
      </span>
      <span class="wa-align-items-center wa-stack wa-gap-2xs">
        <wa-icon-button style="font-size: 32px;" name="linkedin" family="brands" variant="solid" label="Embed video" href="https://example.com" target="_blank"></wa-icon-button>
        <span class="wa-caption-s">LinkedIn</span>
      </span>
      <span class="wa-align-items-center wa-stack wa-gap-2xs">
        <wa-icon-button style="font-size: 32px;" name="envelope-open" variant="solid" label="Embed video" href="https://example.com" target="_blank"></wa-icon-button>
        <span class="wa-caption-s">Email</span>
      </span>
  </div>
</wa-card>
```

### with form inputs
```html{.example}
<wa-card with-header style="max-width: 640px; margin: 0 auto;">
  <div slot="header" class="wa-split">
    <h2 class="wa-heading-m">Invite Team Member</h2>
    <wa-icon name="close"></wa-icon>
  </div>
  <div class="wa-stack wa-gap-2xl">
    <div class="wa-align-items-end wa-split wa-gap-2xs">
      <wa-input style="width: 74%;" label="Email" placeholder="contact@example.com"></wa-input>
      <wa-button variant="success" style="width: 25%;">Send Invite</wa-button>
    </div>

    <div class="wa-stack">
      <span class="wa-heading-s">Project Members</span>
      <div class="wa-stack wa-gap-xl">
        <span class="wa-flank">
          <wa-avatar label="User avatar" image="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></wa-avatar>
          <div class="wa-split">
            <span class="wa-stack wa-gap-0">
              <span class="wa-heading-xs">Jane Cooper</span>
              <span>jane.cooper.example.com</span>
            </span>
            <wa-select value="owner">
              <wa-option value="owner">Owner</wa-option>
              <wa-option value="admin">Admin</wa-option>
              <wa-option value="can-edit">Can Edit</wa-option>
              <wa-option value="view-only">View Only</wa-option>
            </wa-select>
          </div>
        </span>
        <span class="wa-flank">
          <wa-avatar label="User avatar" image="https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></wa-avatar>
          <div class="wa-split">
            <span class="wa-stack wa-gap-0">
              <span class="wa-heading-xs">Jane Cooper</span>
              <span>jane.cooper.example.com</span>
            </span>
            <wa-select value="admin">
              <wa-option value="owner">Owner</wa-option>
              <wa-option value="admin">Admin</wa-option>
              <wa-option value="can-edit">Can Edit</wa-option>
              <wa-option value="view-only">View Only</wa-option>
            </wa-select>
          </div>
        </span>
        <span class="wa-flank">
          <wa-avatar label="User avatar" image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></wa-avatar>
          <div class="wa-split">
            <span class="wa-stack wa-gap-0">
              <span class="wa-heading-xs">Jane Cooper</span>
              <span>jane.cooper.example.com</span>
            </span>
            <wa-select value="can-edit">
              <wa-option value="owner">Owner</wa-option>
              <wa-option value="admin">Admin</wa-option>
              <wa-option value="can-edit">Can Edit</wa-option>
              <wa-option value="view-only">View Only</wa-option>
            </wa-select>
          </div>
        </span>
        <span class="wa-flank">
          <wa-avatar label="User avatar" image="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></wa-avatar>
          <div class="wa-split">
            <span class="wa-stack wa-gap-0">
              <span class="wa-heading-xs">Jane Cooper</span>
              <span>jane.cooper.example.com</span>
            </span>
            <wa-select value="view-only">
              <wa-option value="owner">Owner</wa-option>
              <wa-option value="admin">Admin</wa-option>
              <wa-option value="can-edit">Can Edit</wa-option>
              <wa-option value="view-only">View Only</wa-option>
            </wa-select>
          </div>
        </span>
      </div>
    </div>

    <div class="wa-align-items-end wa-split wa-gap-2xs">
      <wa-input style="width: 74%;" label="Email" placeholder="contact@example.com"></wa-input>
      <wa-button variant="brand" appearance="filled outlined" style="width: 25%;">
        <wa-icon slot="prefix" name="link" variant="solid"></wa-icon>
        Copy Link
      </wa-button>
    </div>
  </div>
</wa-card>
```