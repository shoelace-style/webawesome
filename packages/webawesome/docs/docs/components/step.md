---
title: Step
layout: component
category: Navigation
parent: stepper
hasAnatomy: true
synonyms:
  - wizard step
  - progress step
use-cases:
  - checkout step
  - onboarding step
---

This component must be used as a child of `<wa-stepper>`. Please see the [Stepper docs](/docs/components/stepper) to see examples of this component in action.

```html {.example .anatomy-only}
<wa-stepper active="shipping">
  <wa-step name="cart" completed>Cart</wa-step>
  <wa-step name="shipping" data-anatomy-subject="true">
    Shipping
    <span slot="description">Enter your address</span>
  </wa-step>
  <wa-step name="payment">Payment</wa-step>
</wa-stepper>
```
