---
title: Social Share
description: 'Allow users to easily share content with social networks and platform.'
parent: blog-news
tags: blog-news
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

## With Image Card

```html {.example}
<wa-card with-image style="max-width: 45ch; margin: 0 auto;">
  <img
    slot="image"
    src="https://images.unsplash.com/photo-1578269174936-2709b6aeb913?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Super special awesome trophy"
  />
  <div class="wa-stack wa-align-items-center">
    <div class="wa-stack wa-gap-2xs wa-align-items-center">
      <h2 class="wa-heading-l">Flawless!</h2>
      <span class="wa-caption-l"> 10 of 10</span>
    </div>
    <p style="text-align: center;">
      You got a perfect score in this section. Tell your friends, family, really... just anyone who will listen.
    </p>
    <div class="wa-cluster" style="margin-top: var(--wa-font-size-xl);">
      <wa-icon-button
        slot="icon"
        style="font-size: var(--wa-font-size-2xl);"
        name="facebook"
        family="brands"
        label="Share on Facebook"
        href="#"
        target="_blank"
      ></wa-icon-button>
      <wa-icon-button
        slot="icon"
        style="font-size: var(--wa-font-size-2xl);"
        name="bluesky"
        family="brands"
        label="Share on Bluesky"
        href="#"
        target="_blank"
      ></wa-icon-button>
      <wa-icon-button
        slot="icon"
        style="font-size: var(--wa-font-size-2xl);"
        name="instagram"
        family="brands"
        label="Share on Instagram"
        href="#"
        target="_blank"
      ></wa-icon-button>
      <wa-icon-button
        slot="icon"
        style="font-size: var(--wa-font-size-2xl);"
        name="linkedin"
        family="brands"
        label="Share on LinkedIn"
        href="#"
        target="_blank"
      ></wa-icon-button>
    </div>
  </div>
</wa-card>
```
