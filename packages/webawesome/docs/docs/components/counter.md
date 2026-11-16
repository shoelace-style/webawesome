---
title: Counter
layout: component
category: Helpers
synonyms:
  - countdown
  - countdown timer
  - timer
  - stopwatch
  - count up
  - elapsed time
use-cases:
  - product launch
  - sale ending
  - event countdown
  - time since
  - uptime
---

```html {.example}
<wa-counter id="counter-overview" label="Time until launch" style="font-size: var(--wa-font-size-2xl);"></wa-counter>

<script>
  // 53 hours from now
  document.getElementById('counter-overview').date = new Date(Date.now() + 53 * 60 * 60 * 1000);
</script>
```

:::info
<strong>Always use ISO 8601 date strings.</strong><br />
Ambiguous formats like `03/04/2020` can be read as March 4 or April 3 depending on the user's browser and locale. A valid [ISO 8601 date time string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#Date_Time_String_Format) parses the same for every client.
:::

## Examples

### Date

Set the `date` attribute to an ISO 8601 string to count down to that moment. An invalid date shows zeros.

```html {.example}
<wa-counter date="2040-01-01T00:00:00Z" largest-unit="years" label="Time until 2040"></wa-counter>
```

To count down to a [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object, set the `date` property with JavaScript instead.

### Label

Use the `label` attribute to tell assistive devices how to announce the counter. The label isn't displayed, and screen readers read the time as a phrase, such as "2 days 3 hours 5 minutes 9 seconds", instead of the separate digits and labels.

### Units

Use the `largest-unit` and `smallest-unit` attributes to choose which units the counter shows, from `years` to `seconds`. The defaults are `days` and `seconds`.

```html {.example}
<div id="counter-units" class="wa-stack">
  <wa-counter largest-unit="hours" label="Time until the conference"></wa-counter>
  <wa-counter smallest-unit="hours" label="Time until the conference"></wa-counter>
</div>

<script>
  // 53 hours from now
  const date = new Date(Date.now() + 53 * 60 * 60 * 1000);
  document.querySelectorAll('#counter-units wa-counter').forEach(counter => (counter.date = date));
</script>
```

Time beyond the largest unit rolls up into it, so two days show as 48 hours when the largest unit is `hours`. Months and years follow the calendar instead of a fixed number of days.

### Counting Up

Set the `direction` attribute to `up` to count up from a past date. A future date shows zeros until it passes.

```html {.example}
<!-- Web Awesome 3 release date 🎉 -->
<wa-counter direction="up" date="2025-12-02T00:00:00-05:00" label="Time since Web Awesome 3 launched"></wa-counter>
```

Leave out the `date` attribute to count up from when the counter is added to the page.

```html {.example}
<wa-counter direction="up" largest-unit="hours" label="Time on this page"></wa-counter>
```

### Format

Set the `format` attribute to `short` or `narrow` for shorter unit labels, such as "hr" or "h". The default is `long`. Avoid `narrow` when the counter shows months, since some locales, such as English, label months and minutes both "m".

```html {.example}
<div id="counter-format" class="wa-stack">
  <wa-counter format="long" label="Time until the auction closes"></wa-counter>
  <wa-counter format="short" label="Time until the auction closes"></wa-counter>
  <wa-counter format="narrow" label="Time until the auction closes"></wa-counter>
</div>

<script>
  // 29 hours from now
  const date = new Date(Date.now() + 29 * 60 * 60 * 1000);
  document.querySelectorAll('#counter-format wa-counter').forEach(counter => (counter.date = date));
</script>
```

### Unit Labels

Use the `years`, `months`, `days`, `hours`, `minutes`, and `seconds` slots to replace a unit's label. Slotted labels don't change with the value, and screen readers still read the built-in unit names.

```html {.example}
<wa-counter id="counter-custom-labels" label="Time until the pizza arrives" largest-unit="hours">
  <span slot="hours">Hrs</span>
  <span slot="minutes">Mins</span>
  <span slot="seconds">Secs</span>
</wa-counter>

<script>
  // 35 minutes from now
  document.getElementById('counter-custom-labels').date = new Date(Date.now() + 35 * 60 * 1000);
</script>
```

### Clock Style

Use the `delimiter` attribute to show text between units, such as `:`. Add the `without-labels` attribute to hide the unit labels for a clock-style display.

```html {.example}
<wa-counter
  id="counter-clock"
  delimiter=":"
  without-labels
  largest-unit="hours"
  label="Time until the next train"
  style="font-size: var(--wa-font-size-2xl);"
></wa-counter>

<script>
  // 2 hours and 15 minutes from now
  document.getElementById('counter-clock').date = new Date(Date.now() + 135 * 60 * 1000);
</script>
```

### Size

Counters are sized relative to the current font size. Set `font-size` on the counter or an ancestor to change its size.

```html {.example}
<wa-counter
  id="counter-size"
  label="Time until the show starts"
  style="font-size: var(--wa-font-size-4xl);"
></wa-counter>

<script>
  // 20 hours from now
  document.getElementById('counter-size').date = new Date(Date.now() + 20 * 60 * 60 * 1000);
</script>
```

### Localization

Use the `lang` attribute to set the counter's locale. Localization is handled by the browser's [`Intl.NumberFormat` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat). No language packs are required.

```html {.example}
<div id="counter-localization" class="wa-stack">
  <wa-counter lang="en" label="Time until launch"></wa-counter>
  <wa-counter lang="de" label="Zeit bis zum Start"></wa-counter>
  <wa-counter lang="ja" label="発売までの時間"></wa-counter>
  <wa-counter lang="zh-CN" label="距离发布还有"></wa-counter>
</div>

<script>
  // 53 hours from now
  const date = new Date(Date.now() + 53 * 60 * 60 * 1000);
  document.querySelectorAll('#counter-localization wa-counter').forEach(counter => (counter.date = date));
</script>
```

### Customizing

Counters inherit the surrounding font and color, and their digits use tabular figures so the width holds steady as they tick. Style a counter with regular CSS, and reach inside it with the `unit`, `value`, `label`, and `delimiter` parts.

```html {.example}
<wa-counter id="counter-tiles" label="Time until the sale ends"></wa-counter>

<style>
  #counter-tiles::part(unit) {
    min-inline-size: 4em;
    padding: var(--wa-space-s);
    border-radius: var(--wa-border-radius-m);
    background: var(--wa-color-neutral-fill-quiet);
  }

  #counter-tiles::part(value) {
    font-size: var(--wa-font-size-2xl);
    font-weight: var(--wa-font-weight-bold);
  }

  #counter-tiles::part(label) {
    color: var(--wa-color-text-quiet);
    text-transform: uppercase;
  }
</style>

<script>
  // 53 hours from now
  document.getElementById('counter-tiles').date = new Date(Date.now() + 53 * 60 * 60 * 1000);
</script>
```

### Sale Banner

Combine a counter with a card and a call to action to show how long an offer lasts.

```html {.example}
<wa-card id="counter-sale">
  <div class="wa-stack wa-align-items-center">
    <wa-badge variant="brand" pill>Spring Sale</wa-badge>
    <div class="wa-heading-xl">40% Off Every Plan</div>
    <p class="wa-color-text-quiet">
      Lock in the discount for your first year. The price goes back up when the clock runs out.
    </p>
    <wa-counter label="Time until the sale ends"></wa-counter>
    <wa-button variant="brand">Claim Your Discount</wa-button>
  </div>
</wa-card>

<style>
  #counter-sale {
    text-align: center;
  }

  #counter-sale wa-counter::part(unit) {
    min-inline-size: 4em;
    padding: var(--wa-space-s);
    border-radius: var(--wa-border-radius-m);
    background: var(--wa-color-brand-fill-quiet);
    color: var(--wa-color-brand-on-quiet);
  }

  #counter-sale wa-counter::part(value) {
    font-size: var(--wa-font-size-2xl);
    font-weight: var(--wa-font-weight-bold);
  }
</style>

<script>
  // Four days from now
  document.querySelector('#counter-sale wa-counter').date = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000);
</script>
```

### Formatting the Value

Use the `valueFormatter` property to customize how each unit's number is displayed. Set it to a function that accepts the number and its unit and returns a formatted string. By default, numbers are localized and padded to two digits, such as `05`. Screen readers always read the unformatted number.

```html {.example}
<wa-counter id="counter-formatter" label="Time until the next episode"></wa-counter>

<script>
  const counter = document.getElementById('counter-formatter');

  // 53 hours from now
  counter.date = new Date(Date.now() + 53 * 60 * 60 * 1000);

  // Show days without padding
  counter.valueFormatter = (value, unit) => (unit === 'days' ? String(value) : String(value).padStart(2, '0'));
</script>
```

### Pausing

Use the `paused` attribute to pause the counter. Removing it continues from the time shown.

```html {.example}
<div id="counter-pausing" class="wa-stack wa-align-items-start">
  <wa-counter largest-unit="minutes" label="Time left in this focus session"></wa-counter>
  <wa-switch>Pause</wa-switch>
</div>

<script>
  const container = document.getElementById('counter-pausing');
  const counter = container.querySelector('wa-counter');
  const toggle = container.querySelector('wa-switch');

  // 25 minutes from now
  counter.date = new Date(Date.now() + 25 * 60 * 1000);
  toggle.addEventListener('change', () => (counter.paused = toggle.checked));
</script>
```

### Reacting to Completion

The counter emits the `wa-finish` event when a countdown reaches zero. It isn't emitted when the date had already passed, and a count up never finishes.

Use the `finished` custom state to style a countdown at zero. Unlike the event, the state also applies when the date had already passed.

```html {.example}
<div id="counter-finish" class="wa-cluster">
  <wa-counter largest-unit="seconds" label="Time until liftoff"></wa-counter>
  <wa-button>Run Again</wa-button>
  <span role="status"></span>
</div>

<style>
  #counter-finish wa-counter:state(finished) {
    color: var(--wa-color-success-on-quiet);
    font-weight: var(--wa-font-weight-bold);
  }
</style>

<script>
  const container = document.getElementById('counter-finish');
  const counter = container.querySelector('wa-counter');
  const message = container.querySelector('[role="status"]');

  function start() {
    counter.date = new Date(Date.now() + 10 * 1000);
    message.textContent = '';
  }

  counter.addEventListener('wa-finish', () => (message.textContent = 'We have liftoff.'));
  container.querySelector('wa-button').addEventListener('click', start);
  start();
</script>
```
