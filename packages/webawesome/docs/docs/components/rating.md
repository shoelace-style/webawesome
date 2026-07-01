---
title: Rating
layout: component
category: Forms
synonyms:
  - stars
  - star rating
  - review
use-cases:
  - feedback
  - score
  - 5 stars
  - thumbs up
---

```html {.example}
<wa-rating label="Rating"></wa-rating>
```

:::info
This component works with standard `<form>` elements. See [form controls](/docs/form-controls) for form submission and client-side validation.
:::

## Examples

### Labels

Ratings are usually identified by context, so the label isn't displayed. Always provide one with the `label` attribute so assistive devices can announce the control.

```html {.example}
<wa-rating label="Rate this component"></wa-rating>
```

### Disabled

Use the `disabled` attribute to disable the rating.

```html {.example}
<wa-rating label="Rating" disabled value="3"></wa-rating>
```

### Readonly

Use the `readonly` attribute to display a rating that users can't change. Unlike `disabled`, a readonly rating still submits its value with the form.

```html {.example}
<wa-rating label="Rating" readonly value="3"></wa-rating>
```

### Sizes

Use the `size` attribute to change the rating's size.

```html {.example}
<div class="wa-stack">
  <wa-rating label="Extra small" size="xs"></wa-rating>
  <wa-rating label="Small" size="s"></wa-rating>
  <wa-rating label="Medium" size="m"></wa-rating>
  <wa-rating label="Large" size="l"></wa-rating>
  <wa-rating label="Extra large" size="xl"></wa-rating>
</div>
```

For finer control, set the `font-size` property directly.

```html {.example}
<wa-rating label="Rating" style="font-size: 3rem;"></wa-rating>
```

### Max Value

Ratings go from 0 to 5 by default. Use the `max` attribute to change the highest possible value.

```html {.example}
<wa-rating label="Rating" max="3"></wa-rating>
```

### Precision

Use the `precision` attribute to let users select fractional ratings, such as half stars.

```html {.example}
<wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating>
```

### Custom Icons

Pass a function to the `getSymbol` property to render a custom symbol in place of the default star.

```html {.example}
<wa-rating label="Rating" class="rating-hearts" style="--symbol-color-active: #ff4136;"></wa-rating>

<script type="module">
  const rating = document.querySelector('.rating-hearts');

  await customElements.whenDefined('wa-rating');
  await rating.updateComplete;

  rating.getSymbol = () => '<wa-icon name="heart" variant="solid"></wa-icon>';
</script>
```

### Value-Based Icons

The `getSymbol` function receives the symbol's value and whether it's currently selected, so you can render different icons across the scale.

```html {.example}
<wa-rating label="Rating" class="rating-emojis"></wa-rating>

<script type="module">
  const rating = document.querySelector('.rating-emojis');

  await customElements.whenDefined('wa-rating');
  await rating.updateComplete;

  rating.getSymbol = (value, isSelected) => {
    const icons = ['face-angry', 'face-frown', 'face-meh', 'face-smile', 'face-laugh'];
    return `<wa-icon name="${icons[value - 1]}"></wa-icon>`;
  };
</script>
```

### Detecting Hover

Use the `wa-hover` event to react as the user hovers over (or touches and drags across) the rating, before they commit to a value.

The event's `detail` carries `phase` and `value`. The `phase` property reports when hovering starts, moves to a new value, and ends. The `value` property is what the rating would become if the user committed to the hovered symbol.

```html {.example}
<div class="detect-hover">
  <wa-rating label="Rating"></wa-rating>
  <span></span>
</div>

<script>
  const rating = document.querySelector('.detect-hover > wa-rating');
  const span = rating.nextElementSibling;
  const terms = ['No rating', 'Terrible', 'Bad', 'OK', 'Good', 'Excellent'];

  rating.addEventListener('wa-hover', event => {
    span.textContent = terms[event.detail.value];

    // Clear feedback when hovering stops
    if (event.detail.phase === 'end') {
      span.textContent = '';
    }
  });
</script>

<style>
  .detect-hover span {
    position: relative;
    top: -4px;
    left: 8px;
    border-radius: var(--wa-border-radius-m);
    background: var(--wa-color-neutral-fill-loud);
    color: var(--wa-color-neutral-on-loud);
    text-align: center;
    padding: 4px 6px;
  }

  .detect-hover span:empty {
    display: none;
  }
</style>
```

### Required

Use the `required` attribute to make the rating mandatory. The form won't submit until the user selects a value.

```html {.example}
<form class="rating-required">
  <wa-rating label="Rating" required></wa-rating>
  <br /><br />
  <wa-button appearance="filled" type="submit">Submit</wa-button>
</form>

<script type="module">
  const form = document.querySelector('.rating-required');

  await Promise.all([customElements.whenDefined('wa-button'), customElements.whenDefined('wa-rating')]).then(() => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      alert('All fields are valid!');
    });
  });
</script>
```

### Custom Validity

Use the `setCustomValidity()` method to set a custom validation message. This prevents the form from submitting and makes the browser display your message. Pass an empty string to clear the error.

```html {.example}
<form class="rating-custom-validity">
  <wa-rating label="Rating"></wa-rating>
  <br /><br />
  <wa-button appearance="filled" type="submit">Submit</wa-button>
</form>

<script type="module">
  const form = document.querySelector('.rating-custom-validity');
  const rating = form.querySelector('wa-rating');
  const errorMessage = 'Please rate at least 3 stars!';

  customElements.whenDefined('wa-rating').then(async () => {
    await rating.updateComplete;
    rating.setCustomValidity(errorMessage);
  });

  rating.addEventListener('change', () => {
    rating.setCustomValidity(rating.value >= 3 ? '' : errorMessage);
  });

  await Promise.all([customElements.whenDefined('wa-button'), customElements.whenDefined('wa-rating')]).then(() => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      alert('All fields are valid!');
    });
  });
</script>
```

### Form Submission

Ratings work in forms just like native form controls. The rating's `name` and `value` are included in the form data on submit.

```html {.example}
<form class="rating-form-submission" action="about:blank" method="get" target="_blank">
  <wa-rating name="rating" label="How would you rate your experience?" required></wa-rating>
  <br /><br />
  <wa-button type="submit">Submit</wa-button>
  <wa-button appearance="filled" type="reset" variant="neutral">Reset</wa-button>
</form>
```
