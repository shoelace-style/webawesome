---
title: Newsletter
description: 'Convert site visitors into engaged subscribers or customers.'
parent: blog-news
tags: blog-news
---

## Simple

```html{.example}
<wa-card style="margin: 0 auto; max-width: 45ch;">
  <div class="wa-stack">
    <h2 class="wa-heading-m" id="subscribe-label-1">Subscribe to our Newsletter</h2>
    <p>To get the latest and most quality design resources</p>
    <form class="wa-flank:end wa-gap-2xs">
      <wa-input placeholder="email@example.com" aria-labelledby="subscribe-label-1"></wa-input>
      <wa-button>Subscribe</wa-button>
    </form>
  </div>
</wa-card>
```

## 2 Column

```html{.example}
<wa-card style="margin: 0 auto; max-width: 75ch;">
  <div class="wa-grid">
    <div class="wa-stack wa-gap-2xs">
    <h2 class="wa-heading-m" id="subscribe-label-2">Subscribe to our Newsletter</h2>
    <p>To get the latest and most quality design resources</p>
    </div>
    <form class="wa-flank:end wa-gap-2xs">
      <wa-input placeholder="email@example.com" aria-labelledby="subscribe-label-2"></wa-input>
      <wa-button>Subscribe</wa-button>
    </form>
  </div>
</wa-card>
```

## With Incentives

```html {.example}
<wa-card style="margin: 0 auto; max-width: 75ch;">
  <div class="wa-grid">
    <dl class="wa-stack">
      <div class="wa-cluster wa-gap-xs">
        <dt><wa-icon name="calendar"></wa-icon></dt>
        <dd>Daily news in your inbox</dd>
      </div>
      <div class="wa-cluster wa-gap-xs">
        <dt><wa-icon name="trash"></wa-icon></dt>
        <dd>Spam-free</dd>
      </div>
      <div class="wa-cluster wa-gap-xs">
        <dt><wa-icon name="shield-halved"></wa-icon></dt>
        <dd>The most trusted source in the industry</dd>
      </div>
      <div class="wa-cluster wa-gap-xs">
        <dt><wa-icon name="user-xmark"></wa-icon></dt>
        <dd>Easy to unsubscribe</dd>
      </div>
    </dl>

    <div class="wa-stack">
      <h2 class="wa-heading-m" id="subscribe-label-3">Subscribe to our Newsletter</h2>
      <p>To get the latest and most quality design resources</p>
      <form class="wa-flank:end wa-gap-2xs wa-align-items-end">
        <wa-input placeholder="email@example.com" aria-labelledby="subscribe-label-3"></wa-input>
        <wa-button>Subscribe</wa-button>
      </form>
    </div>
  </div>
</wa-card>
```

## With Image card

```html {.example}
<wa-card with-image style="max-width: 45ch; margin: 0 auto">
  <img
    slot="media"
    src="https://images.unsplash.com/photo-1595087012935-124877078142?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="mailbox"
  />
  <div class="wa-stack wa-gap-2xl">
    <div class="wa-stack wa-align-items-center wa-gap-xs">
      <h2 class="wa-heading-l">Subscribe!</h2>
      <p class="wa-caption-l" style="text-align: center; word-break: break-word">
        Get the best new products in your inbox, everyday. Get the latest content first.
      </p>
    </div>
    <form class="wa-stack">
      <wa-input placeholder="email@example.com" label="Sign up with email"></wa-input>
      <wa-button appearance="filled" variant="brand">Sign up</wa-button>
    </form>
  </div>
</wa-card>
```

## 2 column

```html {.example}
<wa-card style="margin: 0 auto; max-width: 84ch;">
  <div class="wa-grid wa-align-items-center">
    <form class="wa-stack wa-align-items-center wa-gap-2xl">
      <h2 class="wa-heading-xl" style="text-align: center;">Be the first to know</h2>
      <p class="wa-caption-xl" style="text-align: center;">Don't miss out on exclusive savings, new arrivals, and more.</p>
      <div class="wa-stack">
      <wa-input label="Email address" required></wa-input>
      <wa-input label="Phone number" type="tel" placeholder="(optional)"></wa-input>
      <wa-checkbox>
        <p class="wa-caption-s" style="margin: 0">Enter your mobile number and select to receive automated marketing text messages about new items, great savings and more. You understand that consent is not required to make a purchase. Message and data rates may apply. Message frequency varies. Wireless Carriers are not liable for delayed or undelivered messages. Text HELP for help and STOP to cancel. For questions, please <a href="#">contact us</a>. <a href="#">Terms</a></div>
      </wa-checkbox>
      </div>
      <div class="wa-stack wa-align-items-center wa-gap-s" style="width: 100%;">
        <wa-button appearance="outlined"  style="width: 100%;">Sign up now</wa-button>
        <wa-button href="#" appearance="plain" variant="brand" style="width: 100%;">No, thanks</wa-button>
      </div>
    </form>
    <div class="wa-frame:portrait wa-border-radius-l">
      <img src="https://images.unsplash.com/photo-1552558636-f6a8f071c2b3?q=80&w=2268&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    </div>
  </div>
</wa-card>
```
