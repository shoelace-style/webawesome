---
title: Newsletter
description: 'Empower your customers to view past purchases and track upcoming orders with comprehensive order histories.'
parent: information
tags: information
---

## Newsletter signup
```html{.example}
<wa-card style="margin: 0 auto; max-width: 45ch;">
  <div class="wa-stack wa-gap-l">
    <h2 class="wa-heading-l">Subscribe to our Newsletter</h2>
    <p>To get the latest and most quality design resources</p>
    <div class="wa-flank:end wa-gap-2xs">
      <wa-input placeholder="email@example.com"></wa-input>
      <wa-button>Subscribe</wa-button>
    </div>
  </div>
</wa-card>
```

## With Image card
```html{.example}
<wa-card with-image style="max-width: 45ch; margin: 0 auto">
  <img slot="image" src="https://images.unsplash.com/photo-1618918709870-ce3c423426f7?q=80&w=2668&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="mailbox" />
  <div class="wa-stack wa-align-items-center wa-gap-2xl">
    <div class="wa-stack wa-align-items-center wa-gap-xs">
      <h2 class="wa-heading-xl">Subscribe!</h2>
      <p class="wa-caption-xl" style="text-align: center; word-break: break-word">Get the best new products in your inbox, everyday. Get the latest content first.</p>
    </div>
    <div class="wa-flank:end wa-gap-2xs">
      <wa-input placeholder="email@example.com"></wa-input>
      <wa-button appearance="outlined">Signup</wa-button>
    </div>
  </div>

</wa-card>
```

## 2 column
```html{.example}
<wa-card style="margin: 0 auto; max-width: 84ch;">
  <div class="wa-grid wa-align-items-center">
    <form class="wa-stack wa-align-items-center wa-gap-2xl">
      <h2 class="wa-heading-xl" style="text-align: center;">Be the first to know</h2>
      <p class="wa-caption-xl" style="text-align: center;">Don't miss out on exclusive savings, new arrivals, and more.</p>
      <div class="wa-stack">
      <wa-input placeholder="email address (required)"></wa-input>
      <wa-input type="tel" placeholder="phone number (optional)"></wa-input>
      <wa-checkbox>
        <p class="wa-caption-s" style="margin: 0"> Enter your mobile number and select to receive automated marketing text messages about new items, great savings and more. You understand that consent is not required to make a purchase. Message and data rates may apply. Message frequency varies. Wireless Carriers are not liable for delayed or undelivered messages. Text HELP for help and STOP to cancel.
For questions, Please <a href="#">contact us</a>. <a href="#">Terms</a></div>
      </wa-checkbox>
      </div>
      <div class="wa-stack wa-align-items-center wa-gap-s">
        <wa-button appearance="outlined">Sign up now</wa-button>
        <a href="#">no, thanks</a>
      </div>
    </form>
    <div class="wa-frame:portrait wa-border-radius-l">
      <img src="https://images.unsplash.com/photo-1552558636-f6a8f071c2b3?q=80&w=2268&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    </div>
  </div>
</wa-card>
```