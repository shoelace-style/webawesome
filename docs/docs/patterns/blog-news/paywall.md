---
title: Paywall
description: 'Monetize value and encourage commitment from readers, viewers, or users.'
parent: blog-news
tags: blog-news
---

## Meter

```html {.example}
<div style="max-width: 45ch; margin: 0 auto;">
  <wa-card>
    <div class="wa-flank">
      <wa-avatar
        shape="rounded"
        style="--background-color: var(--wa-color-purple-80); --text-color: var(--wa-color-purple-40)"
      >
        <wa-icon slot="icon" name="newspaper" family="regular"></wa-icon>
      </wa-avatar>
      <div class="wa-stack wa-gap-2xs">
        <p>
          You've read <span style="font-weight: var(--wa-font-weight-bold);">9 out of 10 articles</span> this month.
        </p>
        <p>Already a subscriber? <a href="#">Log in here</a>.</p>
        <a href="#">Get Unlimited access for just 99¢</a>
      </div>
    </div>
  </wa-card>
</div>
```

## Modal

```html {.example .viewport}
<wa-dialog without-header label="Subscribe or continue with ads" class="dialog-deny-close" style="--width: 90ch;" open>
  <div class="wa-stack wa-gap-xl">
    <h2 class="wa-heading-m">Want to subscribe or continue using our Products for free with ads?</h2>
    <p>
      Laws are changing in your region, so we're introducing a new choice about how we use your info for ads. You'll
      learn more about what each option means for you before you confirm your choice.
    </p>
    <p>Your choice will apply to the <a href="#">accounts in this Accounts Center</a>.</p>
    <div class="wa-grid">
      <article class="wa-stack wa-gap-s">
        <span class="wa-heading-s">Subscribe without ads</span>
        <p>
          Subscribe to our accounts without ads, starting at 5.99/month (inclusive of applicable taxes). Your info won't
          be use for ads.
        </p>
        <wa-button variant="success">Subscribe</wa-button>
      </article>
      <article class="wa-stack wa-gap-s">
        <span class="wa-heading-s">Free with ads</span>
        <p>
          Discover products and brands through personalized ads, while using your accounts for free. Your info will be
          used for ads
        </p>
        <wa-button appearance="outlined">Use for Free</wa-button>
      </article>
    </div>
  </div>
</wa-dialog>
<script>
  const dialog = document.querySelector('.dialog-deny-close');

  // Prevent the dialog from closing
  dialog.addEventListener('wa-hide', event => {
    if (event.detail.source.hasAttribute('open')) {
      event.preventDefault();
    }
  });
</script>
```

## Footer

```html {.example .viewport}
<wa-drawer
  without-header
  label="Free article limit reached"
  placement="bottom"
  class="drawer-placement-bottom"
  style="--size: 21rem;"
  open
>
  <div>
    <h2 class="wa-heading-m">You've hit your free article limit.</h2>
    <wa-divider></wa-divider>
    <div class="wa-grid">
      <div class="wa-stack wa-gap-s wa-align-items-start">
        <span class="wa-heading-s">Standard Digital</span>
        <span class="wa-heading-xl">$45/month</span>
        <p style="text-wrap: pretty">
          Essential digital access to quality journalism on any device. Makes a great gift.
        </p>
        <wa-button variant="brand">Select</wa-button>
        <a href="#" class="wa-caption-m">What's Included?</a>
      </div>
      <div class="wa-stack wa-gap-s wa-align-items-start">
        <span class="wa-heading-s">Premium Digital</span>
        <span class="wa-heading-xl">$75/month</span>
        <p style="text-wrap: pretty">
          Complete digital access to quality journalism with expert analysis from industry leaders.
        </p>
        <wa-button variant="brand">Select</wa-button>
        <a href="#" class="wa-caption-m">What's Included?</a>
      </div>
    </div>
  </div>
</wa-drawer>
<script>
  const drawer = document.querySelector('.drawer-placement-bottom');

  // Prevent the drawer from closing
  drawer.addEventListener('wa-hide', event => {
    if (event.detail.source.hasAttribute('open')) {
      event.preventDefault();
    }
  });
</script>
```
