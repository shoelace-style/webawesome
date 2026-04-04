---
title: Rating
description: Ratings give users a way to quickly view and provide feedback.
layout: component
category: Form Controls
---

```html {.example}
<wa-rating label="Rating"></wa-rating>
```

:::info
This component works with standard `<form>` elements. Please refer to the section on [form controls](/docs/form-controls) to learn more about form submission and client-side validation.
:::

## Examples

### Labels

Ratings are commonly identified contextually, so labels aren't displayed. However, you should always provide one for assistive devices using the `label` attribute.

```html {.example}
<wa-rating label="Rate this component"></wa-rating>
```

### Maximum Value

Ratings are 0-5 by default. To change the maximum possible value, use the `max` attribute.

```html {.example}
<wa-rating label="Rating" max="3"></wa-rating>
```

### Precision

Use the `precision` attribute to let users select fractional ratings.

```html {.example}
<wa-rating label="Rating" precision="0.5" value="2.5"></wa-rating>
```

### Sizing

Use the `size` attribute to adjust the size of the rating.

```html {.example}
<wa-rating label="Rating" size="small"></wa-rating><br />
<wa-rating label="Rating" size="medium"></wa-rating><br />
<wa-rating label="Rating" size="large"></wa-rating>
```

For more granular sizing, you can use the `font-size` property.

```html {.example}
<wa-rating label="Rating" style="font-size: 2rem;"></wa-rating>
```

### Readonly

Use the `readonly` attribute to display a rating that users can't change.

```html {.example}
<wa-rating label="Rating" readonly value="3"></wa-rating>
```

### Disabled

Use the `disabled` attribute to disable the rating.

```html {.example}
<wa-rating label="Rating" disabled value="3"></wa-rating>
```

### Detecting Hover

Use the `wa-hover` event to detect when the user hovers over (or touch and drag) the rating. This lets you hook into values as the user interacts with the rating, but before they select a value.

The event has a payload with `phase` and `value` properties. The `phase` property tells when hovering starts, moves to a new value, and ends. The `value` property tells what the rating's value would be if the user were to commit to the hovered value.

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

### Custom Icons

You can provide custom icons by passing a function to the `getSymbol` property.

```html {.example}
<wa-rating label="Rating" class="rating-hearts" style="--symbol-color-active: #ff4136;"></wa-rating>

<script type="module">
  const rating = document.querySelector('.rating-hearts');

  await customElements.whenDefined('wa-rating');
  await rating.updateComplete;

  rating.getSymbol = () => '<wa-icon name="heart" variant="solid"></wa-icon>';
</script>
```

### Value-based Icons

You can also use the `getSymbol` property to render different icons based on value and/or whether the icon is currently selected.

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

### Required

Use the `required` attribute to make the rating mandatory. The form will not submit if the user hasn't selected a value.

```html {.example}
<form class="rating-required">
  <wa-rating label="Rating" required></wa-rating>
  <br /><br />
  <wa-button appearance="filled" type="submit">Submit</wa-button>
</form>

<script type="module">
  const form = document.querySelector('.rating-required');

  await Promise.all([
    customElements.whenDefined('wa-button'),
    customElements.whenDefined('wa-rating'),
  ]).then(() => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      alert('All fields are valid!');
    });
  });
</script>
```

### Custom Validity

Use the `setCustomValidity()` method to set a custom validation message. This will prevent the form from submitting and make the browser display the error message you provide. To clear the error, call this function with an empty string.

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

  await Promise.all([
    customElements.whenDefined('wa-button'),
    customElements.whenDefined('wa-rating'),
  ]).then(() => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      alert('All fields are valid!');
    });
  });
</script>
```

### Form Submission

Ratings can be used in forms just like native form controls. The rating's `name` and `value` will be included in the form data when submitted.

```html {.example}
<form class="rating-form-submission" action="about:blank" method="get" target="_blank">
  <label style="display: block; margin-bottom: 0.5rem;">How would you rate your experience?</label>
  <wa-rating name="rating" label="Rating" required></wa-rating>
  <br /><br />
  <wa-button type="submit">Submit</wa-button>
  <wa-button appearance="filled" type="reset" variant="neutral">Reset</wa-button>
</form>
```
