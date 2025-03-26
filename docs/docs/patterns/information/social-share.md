---
title: Social Share
description: 'Allow users to easily share content with social networks and platform.'
parent: information
tags: information
---

## Horizontal
```html{.example}
<wa-card style="max-width: fit-content; margin: 0 auto;">
  <div class="wa-stack">
    <span class="wa-heading-s">Share Video</span>
    <div class="wa-cluster">
      <span class="wa-align-items-center wa-stack wa-gap-2xs">
        <wa-icon-button style="font-size: var(--wa-font-size-2xl);" name="code" label="Embed video" href="#" target="_blank"></wa-icon-button>
        <span class="wa-caption-s">Embed</span>
      </span>
      <span class="wa-align-items-center wa-stack wa-gap-2xs">
        <wa-icon-button style="font-size: var(--wa-font-size-2xl);" name="facebook" family="brands" label="Share on Facebook" href="#" target="_blank"></wa-icon-button>
        <span class="wa-caption-s">Facebook</span>
      </span>
      <span class="wa-align-items-center wa-stack wa-gap-2xs">
        <wa-icon-button style="font-size: var(--wa-font-size-2xl);" name="bluesky" family="brands" label="Share on Bluesky" href="#" target="_blank"></wa-icon-button>
        <span class="wa-caption-s">Bluesky</span>
      </span>
      <span class="wa-align-items-center wa-stack wa-gap-2xs">
        <wa-icon-button style="font-size: var(--wa-font-size-2xl);" name="linkedin" family="brands" label="Share on LinkedIn" href="#" target="_blank"></wa-icon-button>
        <span class="wa-caption-s">LinkedIn</span>
      </span>
      <span class="wa-align-items-center wa-stack wa-gap-2xs">
        <wa-icon-button style="font-size: var(--wa-font-size-2xl);" name="envelope-open" label="Share with email" href="#" target="_blank"></wa-icon-button>
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

## Vertical
```html{.example}
<wa-card class="wa-border-radius-pill" style="max-width: 8ch; margin: 0 auto;">
  <div class="wa-stack">
    <span class="wa-align-items-center wa-stack wa-gap-2xs">
      <wa-icon-button style="font-size: var(--wa-font-size-2xl);" name="code" label="Embed video" href="#" target="_blank"></wa-icon-button>
      <span class="wa-caption-s">Embed</span>
    </span>
    <span class="wa-align-items-center wa-stack wa-gap-2xs">
      <wa-icon-button style="font-size: var(--wa-font-size-2xl);" name="facebook" family="brands" label="facebook" href="#" target="_blank"></wa-icon-button>
      <span class="wa-caption-s">Facebook</span>
    </span>
    <span class="wa-align-items-center wa-stack wa-gap-2xs">
      <wa-icon-button style="font-size: var(--wa-font-size-2xl);" name="bluesky" family="brands" label="bluesky" href="#" target="_blank"></wa-icon-button>
      <span class="wa-caption-s">Bluesky</span>
    </span>
    <span class="wa-align-items-center wa-stack wa-gap-2xs">
      <wa-icon-button style="font-size: var(--wa-font-size-2xl);" name="linkedin" family="brands" label="LinkedIn" href="#" target="_blank"></wa-icon-button>
      <span class="wa-caption-s">LinkedIn</span>
    </span>
    <span class="wa-align-items-center wa-stack wa-gap-2xs">
      <wa-icon-button style="font-size: var(--wa-font-size-2xl);" name="envelope-open" label="email" href="#" target="_blank"></wa-icon-button>
      <span class="wa-caption-s">Email</span>
    </span>
  </div>
</wa-card>
```