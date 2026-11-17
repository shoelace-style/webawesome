---
title: Counter
layout: component
category: Helpers
synonyms:
  - countdown
  - timer
  - stopwatch
  - count up
  - elapsed time
  - time remaining
  - deadline
use-cases:
  - product launch
  - coming soon page
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

Use the `label` attribute to name the counter for assistive devices. The label isn't displayed.

Screen readers read the time as a phrase, such as "2 days 3 hours 5 minutes 9 seconds", instead of the separate digits and labels.

### Units

Use the `largest-unit` and `smallest-unit` attributes to choose which units the counter shows, from `years` to `seconds`. The defaults are `days` and `seconds`.

```html {.example}
<div id="counter-units" class="wa-stack">
  <div class="wa-stack wa-gap-2xs">
    <span class="wa-caption-s">Largest unit is hours</span>
    <wa-counter largest-unit="hours" label="Time until the conference"></wa-counter>
  </div>
  <div class="wa-stack wa-gap-2xs">
    <span class="wa-caption-s">Smallest unit is hours</span>
    <wa-counter smallest-unit="hours" label="Time until the conference"></wa-counter>
  </div>
</div>

<script>
  // 53 hours from now
  const date = new Date(Date.now() + 53 * 60 * 60 * 1000);
  document.querySelectorAll('#counter-units wa-counter').forEach(counter => (counter.date = date));
</script>
```

Time beyond the largest unit rolls up into it, so two days show as 48 hours when the largest unit is `hours`. Months and years follow the calendar instead of a fixed number of days.

Units at zero ahead of the first non-zero unit are hidden, so a countdown with less than a day left starts at hours. [Clock-style](#clock-style) counters keep every unit so the digits hold their place.

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
  <div class="wa-stack wa-gap-2xs">
    <span class="wa-caption-s">Long</span>
    <wa-counter format="long" label="Time until the auction closes"></wa-counter>
  </div>
  <div class="wa-stack wa-gap-2xs">
    <span class="wa-caption-s">Short</span>
    <wa-counter format="short" label="Time until the auction closes"></wa-counter>
  </div>
  <div class="wa-stack wa-gap-2xs">
    <span class="wa-caption-s">Narrow</span>
    <wa-counter format="narrow" label="Time until the auction closes"></wa-counter>
  </div>
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
  // 95 minutes from now
  document.getElementById('counter-custom-labels').date = new Date(Date.now() + 95 * 60 * 1000);
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

Counters are sized relative to the current font size. Set `font-size` on the counter or an ancestor to change its size. A counter stays on one line, so give a large one a size that scales with the viewport to fit small screens.

```html {.example}
<wa-counter
  id="counter-size"
  label="Time until the show starts"
  style="font-size: min(8vw, var(--wa-font-size-4xl));"
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
  <div class="wa-stack wa-gap-2xs">
    <span class="wa-caption-s">English</span>
    <wa-counter lang="en" label="Time until launch"></wa-counter>
  </div>
  <div class="wa-stack wa-gap-2xs">
    <span class="wa-caption-s">German</span>
    <wa-counter lang="de" label="Zeit bis zum Start"></wa-counter>
  </div>
  <div class="wa-stack wa-gap-2xs">
    <span class="wa-caption-s">Japanese</span>
    <wa-counter lang="ja" label="発売までの時間"></wa-counter>
  </div>
  <div class="wa-stack wa-gap-2xs">
    <span class="wa-caption-s">Chinese</span>
    <wa-counter lang="zh-CN" label="距离发布还有"></wa-counter>
  </div>
</div>

<script>
  // 53 hours from now
  const date = new Date(Date.now() + 53 * 60 * 60 * 1000);
  document.querySelectorAll('#counter-localization wa-counter').forEach(counter => (counter.date = date));
</script>
```

### Customizing

Counters inherit the surrounding font and color, and their digits use tabular figures so the width holds steady as they tick. Every unit is as wide as the widest label, which spaces the digits evenly. Style a counter with regular CSS, and reach inside it with the `unit`, `value`, `label`, and `delimiter` parts.

```html {.example}
<wa-counter id="counter-tiles" format="short" label="Time until the sale ends"></wa-counter>

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

A counter on a colored surface follows the text color there.

```html {.example}
<wa-callout id="counter-colors" variant="brand" appearance="accent">
  <wa-icon slot="icon" name="clock"></wa-icon>
  <div class="wa-split">
    <strong>Launch day is almost here</strong>
    <wa-counter label="Time until launch"></wa-counter>
  </div>
</wa-callout>

<script>
  // 53 hours from now
  document.querySelector('#counter-colors wa-counter').date = new Date(Date.now() + 53 * 60 * 60 * 1000);
</script>
```

### Inline

To set a counter inside a sentence, use the `unit` part to lay each value and label out in a row, and the `label` part to match the label's size to the text. The `narrow` format keeps it short.

```html {.example}
<p id="counter-inline">
  The sale ends in
  <wa-counter format="narrow" label="Time until the sale ends"></wa-counter>, so order soon.
</p>

<style>
  #counter-inline wa-counter {
    gap: 0.35em;
  }

  #counter-inline wa-counter::part(unit) {
    flex-direction: row;
    align-items: baseline;
  }

  #counter-inline wa-counter::part(label) {
    font-size: inherit;
  }
</style>

<script>
  // 53 hours from now
  document.querySelector('#counter-inline wa-counter').date = new Date(Date.now() + 53 * 60 * 60 * 1000);
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

Use the `paused` attribute to pause the counter. Removing it continues from the time shown, so a countdown that was paused ends later than its date.

```html {.example}
<div id="counter-pausing">
  <wa-counter largest-unit="minutes" label="Time left in this focus session"></wa-counter>

  <wa-divider></wa-divider>

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

:::warning
<strong>Give people a way to pause a counter that isn't essential.</strong><br />
A counter keeps changing. When it's decoration instead of a real deadline, the movement can distract. Add a visible pause control.
:::

### Reacting to Completion

The counter emits the `wa-finish` event when a countdown reaches zero. It isn't emitted when the date had already passed, and a count up never finishes.

Use the `finished` custom state to style a countdown at zero. Unlike the event, the state also applies when the date had already passed.

Screen readers don't announce a counter as it changes, and that includes the finish. To announce it, update an element with `role="status"` when the event fires.

```html {.example}
<div id="counter-finish">
  <div class="wa-cluster">
    <wa-counter largest-unit="seconds" label="Time until liftoff"></wa-counter>
    <span role="status"></span>
  </div>

  <wa-divider></wa-divider>

  <wa-button>Run Again</wa-button>
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
