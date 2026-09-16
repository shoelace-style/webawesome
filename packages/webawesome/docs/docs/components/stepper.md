---
title: Stepper
layout: component
category: Navigation
synonyms:
  - wizard
  - progress indicator
  - progress steps
use-cases:
  - checkout flow
  - signup flow
  - multi-step form
  - onboarding
  - setup wizard
---

```html {.example}
<wa-stepper active="shipping">
  <wa-step name="cart" completed>Cart</wa-step>
  <wa-step name="shipping">Shipping</wa-step>
  <wa-step name="payment">Payment</wa-step>
</wa-stepper>
```

Set `active` to the name of the current [`<wa-step>`](/docs/components/step). A stepper is a display, not a form control, and by default its steps aren't directly interactive — pair it with your own Next/Back buttons (see [Navigating Declaratively](#navigating-declaratively)) or call its methods directly to move between steps as the user progresses. Add `clickable` (see [Clickable](#clickable)) to let people click a step, or focus it and press Enter/Space, to jump straight to it.

## Examples

### Clickable

Add `clickable` to let clicking a step, or focusing it and pressing Enter/Space, jump straight to it — the same as calling `goTo()`. Without it, steps are still focusable (so assistive tech can read the stepper's progress), but activating one does nothing; only `next()`/`previous()`/`goTo()` change the active step.

```html {.example}
<wa-stepper active="shipping" clickable>
  <wa-step name="cart" completed>Cart</wa-step>
  <wa-step name="shipping">Shipping</wa-step>
  <wa-step name="payment">Payment</wa-step>
</wa-stepper>
```

### Linear Mode

Add `linear` to require steps to be completed in order. The step right after the active one renders `locked`, and `next()`/`goTo()` (including a [`data-stepper`](#navigating-declaratively) invoker, or a click/activation when `clickable` is also set) can't reach it, or anything past it, until the steps before it are `completed`.

```html {.example}
<wa-stepper active="shipping" linear clickable>
  <wa-step name="cart" completed>Cart</wa-step>
  <wa-step name="shipping">Shipping</wa-step>
  <wa-step name="payment">Payment</wa-step>
</wa-stepper>
```

### Orientation

Set `orientation="vertical"` to stack the steps, useful in a sidebar or a narrow column.

```html {.example}
<wa-stepper orientation="vertical" active="write">
  <wa-step name="plan" completed>Plan</wa-step>
  <wa-step name="write">Write</wa-step>
  <wa-step name="review">Review</wa-step>
  <wa-step name="publish">Publish</wa-step>
</wa-stepper>
```

### Description

Add a `description` slot to any step for supporting text under its label.

```html {.example}
<wa-stepper active="shipping">
  <wa-step name="cart" completed>
    Cart
    <span slot="description">3 items</span>
  </wa-step>
  <wa-step name="shipping">
    Shipping
    <span slot="description">Enter your address</span>
  </wa-step>
  <wa-step name="payment">
    Payment
    <span slot="description">Add a card</span>
  </wa-step>
</wa-stepper>
```

### Disabled

Add `disabled` to a step that isn't part of this user's path. It's still shown, so the process reads as complete, but it's skipped by keyboard navigation and can't be clicked, focused, or reached with `next()`/`goTo()`.

```html {.example}
<wa-stepper active="cart">
  <wa-step name="cart">Cart</wa-step>
  <wa-step name="shipping">Shipping</wa-step>
  <wa-step name="gift-wrap" disabled>Gift Wrap</wa-step>
  <wa-step name="payment">Payment</wa-step>
</wa-stepper>
```

### Loading

Add `loading` to a step to show a spinner in its marker instead of a number, e.g. while an async transition is in progress.

```html {.example}
<wa-stepper active="shipping">
  <wa-step name="cart" completed>Cart</wa-step>
  <wa-step name="shipping" loading>Shipping</wa-step>
  <wa-step name="payment">Payment</wa-step>
</wa-stepper>
```

### Custom Bullet

Use the `bullet` slot on a step to replace its number, checkmark, or spinner with custom content, such as a `<wa-icon>`.

```html {.example}
<wa-stepper active="review">
  <wa-step name="submit" completed>
    <wa-icon slot="bullet" name="rocket"></wa-icon>
    Submit
  </wa-step>
  <wa-step name="review">Review</wa-step>
</wa-stepper>
```

### Scrolling Steps

When there are more steps than horizontal space allows, the steps scroll — with scroll buttons — instead of shrinking labels illegible or wrapping to a second row. Add `without-scroll-controls` to hide the buttons while keeping the scrolling itself.

```html {.example}
<wa-stepper active="team">
  <wa-step name="account" completed>Account</wa-step>
  <wa-step name="profile" completed>Profile</wa-step>
  <wa-step name="team">Team</wa-step>
  <wa-step name="preferences">Preferences</wa-step>
  <wa-step name="notifications">Notifications</wa-step>
  <wa-step name="billing">Billing</wa-step>
  <wa-step name="review">Review</wa-step>
  <wa-step name="done">Done</wa-step>
</wa-stepper>
```

### Navigating Declaratively

Add `data-stepper="next <id>"`, `data-stepper="prev <id>"`, or `data-stepper="goto <id> <name>"` to any button on the page to call `next()`, `previous()`, or `goTo()` on the stepper with that `id` — same convention as `<wa-dialog>`'s `data-dialog="open <id>"`. The button doesn't need to be inside it.

```html {.example}
<div class="wa-stack">
  <wa-stepper id="checkout-declarative" active="cart" linear>
    <wa-step name="cart" completed>Cart</wa-step>
    <wa-step name="shipping">Shipping</wa-step>
    <wa-step name="payment">Payment</wa-step>
  </wa-stepper>

  <div class="wa-cluster">
    <wa-button appearance="outlined" data-stepper="prev checkout-declarative">Back</wa-button>
    <wa-button data-stepper="next checkout-declarative">Continue</wa-button>
    <wa-button appearance="outlined" data-stepper="goto checkout-declarative payment">Skip to Payment</wa-button>
  </div>
</div>
```

### Reacting to Changes

`wa-after-step-change` fires once the active step has changed, with `{ step, previousStep }` in `event.detail`. The stepper never sets `completed` itself — mark a step done from your own code, e.g. once the user has advanced past it.

```html {.example}
<div class="wa-stack">
  <wa-stepper id="checkout-events" active="cart">
    <wa-step name="cart" completed>Cart</wa-step>
    <wa-step name="shipping">Shipping</wa-step>
    <wa-step name="payment">Payment</wa-step>
  </wa-stepper>

  <div class="wa-cluster">
    <wa-button appearance="outlined" data-stepper="prev checkout-events">Back</wa-button>
    <wa-button data-stepper="next checkout-events">Continue</wa-button>
  </div>

  <wa-divider></wa-divider>

  <small class="checkout-events-output">Current step: cart</small>
</div>

<script>
  const container = document.querySelector('#checkout-events').closest('.wa-stack');
  const stepper = container.querySelector('#checkout-events');
  const output = container.querySelector('.checkout-events-output');

  stepper.addEventListener('wa-after-step-change', event => {
    const { step, previousStep } = event.detail;
    const steps = [...stepper.querySelectorAll('wa-step')];

    if (previousStep) {
      if (steps.indexOf(step) > steps.indexOf(previousStep)) {
        // Advancing: the step just left behind is done.
        previousStep.completed = true;
      } else {
        // Going back: the step being revisited is back in progress, not done.
        step.completed = false;
      }
    }

    output.textContent = `Now on: ${step.name}`;
  });
</script>
```

### Preventing a Step Change

`wa-step-change` fires before the step changes and is cancelable. Call `event.preventDefault()` to block the transition, e.g. to guard against unsaved changes.

```html {.example}
<div class="wa-stack">
  <wa-stepper id="checkout-guard" active="shipping" linear>
    <wa-step name="cart" completed>Cart</wa-step>
    <wa-step name="shipping">Shipping</wa-step>
    <wa-step name="payment">Payment</wa-step>
  </wa-stepper>

  <wa-button data-stepper="next checkout-guard">Continue</wa-button>
</div>

<script>
  const guardStepper = document.querySelector('#checkout-guard');

  guardStepper.addEventListener('wa-step-change', event => {
    if (event.detail.step.name === 'payment' && !window.confirm('Leave shipping without saving?')) {
      event.preventDefault();
    }
  });
</script>
```

### Customizing

Use the exported [CSS parts](#css-parts) and [custom properties](#css-custom-properties) to restyle the stepper. This example enlarges the marker and recolors every untouched marker's fill/border/text and the connector with custom properties, then bolds the marker's text and border weight via the `marker` part (properties not exposed as custom properties). Gift Wrap sets `variant="danger"`, which would normally tint its own untouched marker red — but a `--marker-*` property set on `<wa-stepper>` always wins over any one step's `variant`, so it renders brand-blue like the rest.

```html {.example}
<wa-stepper class="custom-stepper" active="shipping">
  <wa-step name="cart" completed>Cart</wa-step>
  <wa-step name="shipping">Shipping</wa-step>
  <wa-step name="gift-wrap" variant="danger">Gift Wrap</wa-step>
  <wa-step name="payment">Payment</wa-step>
</wa-stepper>

<style>
  .custom-stepper {
    --marker-size: 2.5em;
    --marker-background-color: transparent;
    --marker-border-color: var(--wa-color-brand-border-loud);
    --marker-color: var(--wa-color-brand-on-normal);
    --connector-color: var(--wa-color-neutral-fill-normal);
    --connector-active: var(--wa-color-success-fill-loud);
  }

  .custom-stepper::part(marker) {
    font-weight: var(--wa-font-weight-bold);
    border-width: var(--wa-border-width-l);
  }
</style>
```

## Accessibility Considerations

- **Structure.** The stepper renders a `<nav>` landmark wrapping an ordered list; each `<wa-step>` carries `role="listitem"`. Set `label` whenever more than one stepper appears on the same page, so screen reader users can tell them apart.
- **Current step.** The active step carries `aria-current="step"`, removed (not set to `"false"`) on every other step.
- **Keyboard.** Steps use a single roving tab stop. Tab moves focus into and out of the stepper as one stop, and Arrow keys (or Home/End) move focus between steps without changing which one is active. When [`clickable`](#clickable) is set, Enter or Space activates the focused step, same as clicking it; otherwise focus moves normally but doesn't change the active step. `disabled` steps are skipped entirely; they're never focusable. When steps [scroll](#scrolling-steps), moving focus this way scrolls the newly focused step into view automatically.
- **Busy state.** While any step is `loading`, the stepper carries `aria-busy="true"` so assistive technology has one signal that the whole process is doing something async, not just the individual step.
- **`variant` is cosmetic only.** A colored marker (e.g. `variant="danger"`) doesn't carry meaning on its own. Make sure the reason is also in the step's visible label or description.
