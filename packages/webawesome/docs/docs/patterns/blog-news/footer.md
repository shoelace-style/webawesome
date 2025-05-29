---
title: Footer
description: 'Provide useful information at the bottom of a webpage.'
parent: blog-news
tags: blog-news
---

## Simple

```html {.example}
<div class="wa-stack wa-gap-xl">
  <div class="wa-split">
    <div class="wa-cluster wa-gap-xs wa-heading-xl">
      <wa-icon name="gears"></wa-icon>
      <span>Widget UI</span>
    </div>
    <form class="wa-flank:end wa-gap-xs wa-align-items-end">
      <wa-input placeholder="Enter your email" label="Stay in the Know" type="email"></wa-input>
      <wa-button>Subscribe</wa-button>
    </form>
  </div>
  <wa-divider></wa-divider>
  <p style="text-align: right">© 2025 All rights reserved.</p>
</div>
```

## Centered

```html {.example}
<div class="wa-stack wa-align-items-center">
  <div class="wa-cluster wa-gap-xl">
    <a href="#">Home</a>
    <a href="#">Get Started</a>
    <a href="#">Services</a>
    <a href="#">Portfolio</a>
  </div>
  <div class="wa-cluster wa-gap-s">
    <a href="#"
      ><wa-icon-button
        style="font-size: var(--wa-font-size-l);"
        name="facebook"
        family="brands"
        label="Follow on Facebook"
        href="#"
        target="_blank"
      ></wa-icon-button
    ></a>
    <a href="#"
      ><wa-icon-button
        style="font-size: var(--wa-font-size-l);"
        name="bluesky"
        family="brands"
        label="Follow on Bluesky"
        href="#"
        target="_blank"
      ></wa-icon-button
    ></a>
    <a href="#"
      ><wa-icon-button
        style="font-size: var(--wa-font-size-l);"
        name="linkedin"
        family="brands"
        label="Follow on LinkedIn"
        href="#"
        target="_blank"
      ></wa-icon-button
    ></a>
    <a href="#"
      ><wa-icon-button
        style="font-size: var(--wa-font-size-l);"
        name="envelope-open"
        label="Email us"
        href="#"
        target="_blank"
      ></wa-icon-button
    ></a>
  </div>
  <p>© 2025 All Rights reserved.</p>
</div>
```

## Corporate

```html {.example}
<div>
  <div class="wa-flank wa-align-items-baseline wa-gap-3xl" style="--flank-size: 36ch;">
    <p>
      We are committed to providing you with the best products and services. If you have any questions or need
      assistance, feel free to reach out to our team. Stay connected with us through our social media channels for
      updates, news, and more. Your satisfaction is our top priority, and we look forward to serving you again soon!
    </p>
    <div class="wa-grid">
      <section class="wa-stack wa-gap-xs">
        <h2 class="wa-heading-s">Links</h2>
        <a href="#">Home</a>
        <a href="#">Get Started</a>
        <a href="#">Services</a>
        <a href="#">Portfolio</a>
      </section>
      <section class="wa-stack wa-gap-xs">
        <h2 class="wa-heading-s">Others</h2>
        <a href="#">Corporate</a>
        <a href="#">Terms of Service</a>
        <a href="#">Privacy Policy</a>
      </section>
      <section class="wa-stack">
        <h2 class="wa-heading-s">Social</h2>
        <div class="wa-cluster">
          <a href="#">
            <wa-icon-button
              style="font-size: var(--wa-font-size-l);"
              name="facebook"
              family="brands"
              label="Follow on Facebook"
              href="#"
              target="_blank"
            ></wa-icon-button>
          </a>
          <a href="#">
            <wa-icon-button
              style="font-size: var(--wa-font-size-l);"
              name="bluesky"
              family="brands"
              label="Follow on Bluesky"
              href="#"
              target="_blank"
            ></wa-icon-button>
          </a>
          <a href="#">
            <wa-icon-button
              style="font-size: var(--wa-font-size-l);"
              name="linkedin"
              family="brands"
              label="Follow on LinkedIn"
              href="#"
              target="_blank"
            ></wa-icon-button>
          </a>
          <a href="#">
            <wa-icon-button
              style="font-size: var(--wa-font-size-l);"
              name="envelope-open"
              label="Email us"
              href="#"
              target="_blank"
            ></wa-icon-button>
          </a>
        </div>
      </section>
    </div>
  </div>
  <wa-divider></wa-divider>
  <div class="wa-split">
    <p>© 2025 All rights reserved.</p>
    <wa-select label="Language" value="english">
      <wa-option value="english">English</wa-option>
      <wa-option value="spanish">Spanish</wa-option>
      <wa-option value="french">French</wa-option>
    </wa-select>
  </div>
</div>
```
