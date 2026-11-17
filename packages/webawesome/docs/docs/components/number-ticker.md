---
title: Number Ticker
layout: component
category: Helpers
synonyms:
  - count up
  - count down
  - animated counter
  - animated number
  - counter
  - countup
use-cases:
  - dashboard stats
  - landing page metrics
  - live score
  - fundraising total
---

```html {.example}
<div id="number-ticker-overview" class="wa-stack wa-align-items-start">
  <wa-number-ticker value="1000000" class="wa-heading-3xl"></wa-number-ticker>

  <wa-divider class="wa-align-self-stretch"></wa-divider>

  <wa-button appearance="filled">Restart</wa-button>
</div>

<script>
  const container = document.getElementById('number-ticker-overview');
  const ticker = container.querySelector('wa-number-ticker');

  container.querySelector('wa-button').addEventListener('click', () => ticker.restart());
</script>
```

Screen readers read the final value, but not the numbers in between. For a number that doesn't need to count, use [format number](/docs/components/format-number) instead.

:::info
<strong>Tickers respect the user's [reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) preference.</strong><br />
When it's on, the final value shows right away and the ticker still emits the `wa-finish` event.
:::

## Examples

### Start & End Values

Use the `value` attribute to set the number to count to. Tickers count from `0` by default. Set the `start-value` attribute to start from another number. Start higher than `value` to count down.

```html {.example}
<div id="number-ticker-values" class="wa-stack wa-align-items-start">
  <p>Up: <wa-number-ticker value="100"></wa-number-ticker></p>
  <p>Down: <wa-number-ticker start-value="100" value="0"></wa-number-ticker></p>

  <wa-divider class="wa-align-self-stretch"></wa-divider>

  <wa-button appearance="filled">Restart</wa-button>
</div>

<script>
  const container = document.getElementById('number-ticker-values');
  const tickers = container.querySelectorAll('wa-number-ticker');

  container.querySelector('wa-button').addEventListener('click', () => tickers.forEach(ticker => ticker.restart()));
</script>
```

### Duration & Delay

Use the `duration` attribute to set the longest a count can take, in milliseconds. A count ends early once the number stops changing. The `delay` attribute waits before counting from the start value. Later changes to `value` aren't delayed.

Keep counts under five seconds. A ticker can't be paused, and [WCAG](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) asks for a pause control on motion that runs longer.

```html {.example}
<div id="number-ticker-duration" class="wa-stack wa-align-items-start">
  <p>4 seconds: <wa-number-ticker value="500" duration="4000"></wa-number-ticker></p>
  <p>
    1 second, after a 1 second delay: <wa-number-ticker value="500" duration="1000" delay="1000"></wa-number-ticker>
  </p>

  <wa-divider class="wa-align-self-stretch"></wa-divider>

  <wa-button appearance="filled">Restart</wa-button>
</div>

<script>
  const container = document.getElementById('number-ticker-duration');
  const tickers = container.querySelectorAll('wa-number-ticker');

  container.querySelector('wa-button').addEventListener('click', () => tickers.forEach(ticker => ticker.restart()));
</script>
```

### Easing

Use the `easing` attribute to change how the count speeds up and slows down. It accepts any [CSS easing function](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function), such as `linear`, `ease-in-out`, or `steps()`. The named easings from [animation](/docs/components/animation) aren't supported. They fall back to the default, like any other invalid value.

```html {.example}
<div id="number-ticker-easing" class="wa-stack wa-align-items-start">
  <div class="number-ticker-easing-grid">
    <code>default</code>
    <wa-number-ticker value="1000" duration="3000"></wa-number-ticker>
    <code>linear</code>
    <wa-number-ticker value="1000" duration="3000" easing="linear"></wa-number-ticker>
    <code>ease-in-out</code>
    <wa-number-ticker value="1000" duration="3000" easing="ease-in-out"></wa-number-ticker>
    <code>steps(10)</code>
    <wa-number-ticker value="1000" duration="3000" easing="steps(10)"></wa-number-ticker>
  </div>

  <wa-divider class="wa-align-self-stretch"></wa-divider>

  <wa-button appearance="filled">Restart</wa-button>
</div>

<style>
  .number-ticker-easing-grid {
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: baseline;
    justify-items: start;
    gap: var(--wa-space-xs) var(--wa-space-l);
  }
</style>

<script>
  const container = document.getElementById('number-ticker-easing');
  const tickers = container.querySelectorAll('wa-number-ticker');

  container.querySelector('wa-button').addEventListener('click', () => tickers.forEach(ticker => ticker.restart()));
</script>
```

### Decimal Places

Tickers keep as many decimal places as the `value` and `start-value` attributes have, so `99.5` counts in tenths. Use the `minimum-fraction-digits` or `maximum-fraction-digits` attribute to set them yourself. Setting one applies to both, so the number of decimal places stays the same during the count. Currency and percent use the locale's usual decimal places instead.

```html {.example}
<div id="number-ticker-decimals" class="wa-stack wa-align-items-start">
  <p>Default: <wa-number-ticker value="99.5"></wa-number-ticker></p>
  <p>Always two places: <wa-number-ticker value="99.5" maximum-fraction-digits="2"></wa-number-ticker></p>

  <wa-divider class="wa-align-self-stretch"></wa-divider>

  <wa-button appearance="filled">Restart</wa-button>
</div>

<script>
  const container = document.getElementById('number-ticker-decimals');
  const tickers = container.querySelectorAll('wa-number-ticker');

  container.querySelector('wa-button').addEventListener('click', () => tickers.forEach(ticker => ticker.restart()));
</script>
```

### Currency & Percent

Set the `type` attribute to `currency` or `percent` to change how the number is formatted. Use the `currency` attribute to set the [ISO 4217 currency code](https://en.wikipedia.org/wiki/ISO_4217), which is `USD` by default. Percent values are fractions, so `0.87` shows as 87%. For more options, such as `currency-display` and `without-grouping`, see [format number](/docs/components/format-number).

```html {.example}
<div id="number-ticker-type" class="wa-stack wa-align-items-start">
  <p>Raised: <wa-number-ticker type="currency" currency="EUR" value="18452.75"></wa-number-ticker></p>
  <p>Funded: <wa-number-ticker type="percent" value="0.87"></wa-number-ticker></p>

  <wa-divider class="wa-align-self-stretch"></wa-divider>

  <wa-button appearance="filled">Restart</wa-button>
</div>

<script>
  const container = document.getElementById('number-ticker-type');
  const tickers = container.querySelectorAll('wa-number-ticker');

  container.querySelector('wa-button').addEventListener('click', () => tickers.forEach(ticker => ticker.restart()));
</script>
```

### Localization

Use the `lang` attribute to set the number formatting locale. Localization is handled by the browser's [`Intl.NumberFormat` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat). No language packs are required.

```html {.example}
<div id="number-ticker-lang" class="wa-stack wa-align-items-start">
  <p>English (US): <wa-number-ticker value="1234567.89" lang="en-US"></wa-number-ticker></p>
  <p>German: <wa-number-ticker value="1234567.89" lang="de"></wa-number-ticker></p>
  <p>English (India): <wa-number-ticker value="1234567.89" lang="en-IN"></wa-number-ticker></p>
  <p>Arabic (Egypt): <wa-number-ticker value="1234567.89" lang="ar-EG"></wa-number-ticker></p>

  <wa-divider class="wa-align-self-stretch"></wa-divider>

  <wa-button appearance="filled">Restart</wa-button>
</div>

<script>
  const container = document.getElementById('number-ticker-lang');
  const tickers = container.querySelectorAll('wa-number-ticker');

  container.querySelector('wa-button').addEventListener('click', () => tickers.forEach(ticker => ticker.restart()));
</script>
```

### Starting When in View

Tickers wait until they're at least halfway into view before they start counting. A ticker inside a hidden container, such as closed [details](/docs/components/details), starts when it's shown. Use the `eager` attribute to start counting right away instead. Call the `restart()` method to play a ticker again.

Open both panels. The first ticker counts as it opens. The second is `eager`, so it finished while it was closed.

```html {.example}
<div class="wa-stack">
  <wa-details summary="Default">
    <wa-number-ticker value="4096" class="wa-heading-2xl"></wa-number-ticker>
  </wa-details>
  <wa-details summary="Eager">
    <wa-number-ticker value="4096" class="wa-heading-2xl" eager></wa-number-ticker>
  </wa-details>
</div>
```

### Customizing

Style a ticker with regular CSS. The `<wa-number-ticker>` element holds the text itself, so `color`, `font-size`, and `font-weight` go right on it. Tickers use tabular figures so digits don't shift as they change.

While a ticker counts, it has the `counting` custom state, so `wa-number-ticker:state(counting)` targets it. This example dims each number until it finishes counting.

```html {.example}
<div id="number-ticker-customizing" class="wa-stack wa-align-items-start">
  <div class="wa-cluster wa-gap-2xl">
    <div class="wa-stack wa-gap-2xs">
      <span class="wa-caption-m">Divs Centered</span>
      <wa-number-ticker value="48210" class="number-ticker-stat brand"></wa-number-ticker>
    </div>
    <div class="wa-stack wa-gap-2xs">
      <span class="wa-caption-m">Bugs Squashed</span>
      <wa-number-ticker value="1337" class="number-ticker-stat success"></wa-number-ticker>
    </div>
    <div class="wa-stack wa-gap-2xs">
      <span class="wa-caption-m">Days Since a Friday Deploy</span>
      <wa-number-ticker start-value="128" value="0" class="number-ticker-stat danger"></wa-number-ticker>
    </div>
  </div>

  <wa-divider class="wa-align-self-stretch"></wa-divider>

  <wa-button appearance="filled">Restart</wa-button>
</div>

<style>
  .number-ticker-stat {
    font-size: var(--wa-font-size-3xl);
    font-weight: var(--wa-font-weight-bold);
    line-height: var(--wa-line-height-condensed);
    transition: opacity var(--wa-transition-normal) var(--wa-transition-easing);

    &:state(counting) {
      opacity: 0.7;
    }

    &.brand {
      color: var(--wa-color-brand-on-quiet);
    }

    &.success {
      color: var(--wa-color-success-on-quiet);
    }

    &.danger {
      color: var(--wa-color-danger-on-quiet);
    }
  }
</style>

<script>
  const container = document.getElementById('number-ticker-customizing');
  const tickers = container.querySelectorAll('wa-number-ticker');

  container.querySelector('wa-button').addEventListener('click', () => tickers.forEach(ticker => ticker.restart()));
</script>
```

A ticker inherits the text style around it, so it also works inside a sentence.

```html {.example}
<div id="number-ticker-inline" class="wa-stack wa-align-items-start">
  <p>
    Web Awesome runs on coffee. Cups brewed so far:
    <wa-number-ticker value="1204" style="font-weight: var(--wa-font-weight-bold)"></wa-number-ticker>
  </p>

  <wa-divider class="wa-align-self-stretch"></wa-divider>

  <wa-button appearance="filled">Restart</wa-button>
</div>

<script>
  const container = document.getElementById('number-ticker-inline');
  const ticker = container.querySelector('wa-number-ticker');

  container.querySelector('wa-button').addEventListener('click', () => ticker.restart());
</script>
```

### Formatting the Value

For other formats, set the `valueFormatter` property to a function that accepts a number and returns a formatted string. The function replaces the formatting attributes and receives unrounded numbers during the count, so round them as needed. The example below uses the [`Intl.NumberFormat` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat) for compact numbers.

A prefix or suffix doesn't need a formatter. Place the text next to the ticker instead.

```html {.example}
<div id="number-ticker-formatter" class="wa-stack wa-align-items-start">
  <p><wa-number-ticker value="2500000" class="wa-heading-2xl"></wa-number-ticker> downloads</p>

  <wa-divider class="wa-align-self-stretch"></wa-divider>

  <wa-button appearance="filled">Restart</wa-button>
</div>

<script>
  const container = document.getElementById('number-ticker-formatter');
  const ticker = container.querySelector('wa-number-ticker');
  const formatter = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });

  ticker.valueFormatter = value => formatter.format(value);
  container.querySelector('wa-button').addEventListener('click', () => ticker.restart());
</script>
```

### Updating the Value

Change the `value` attribute to count from the number currently shown to the new one. Screen readers announce the new value once it finishes counting.

```html {.example}
<div id="number-ticker-update" class="wa-stack wa-align-items-start">
  <p>Score: <wa-number-ticker value="100" duration="1000" class="wa-heading-2xl"></wa-number-ticker></p>

  <wa-divider class="wa-align-self-stretch"></wa-divider>

  <wa-button appearance="filled">Add 50 Points</wa-button>
</div>

<script>
  const container = document.getElementById('number-ticker-update');
  const ticker = container.querySelector('wa-number-ticker');

  container.querySelector('wa-button').addEventListener('click', () => (ticker.value += 50));
</script>
```

### Reacting to Completion

The ticker emits the `wa-finish` event each time it finishes counting. Listen for this event to reveal related content or start another animation.

```html {.example}
<div id="number-ticker-finish" class="wa-stack wa-align-items-start">
  <div class="wa-cluster wa-align-items-center">
    <wa-number-ticker
      type="currency"
      value="50000"
      maximum-fraction-digits="0"
      duration="3000"
      class="wa-heading-2xl"
    ></wa-number-ticker>
    <wa-badge variant="success" hidden>Goal Reached</wa-badge>
  </div>

  <wa-divider class="wa-align-self-stretch"></wa-divider>

  <wa-button appearance="filled">Restart</wa-button>
</div>

<script>
  const container = document.getElementById('number-ticker-finish');
  const ticker = container.querySelector('wa-number-ticker');
  const badge = container.querySelector('wa-badge');

  ticker.addEventListener('wa-finish', () => (badge.hidden = false));
  container.querySelector('wa-button').addEventListener('click', () => {
    badge.hidden = true;
    ticker.restart();
  });
</script>
```

### Stat Cards

Combine a ticker with a [card](/docs/components/card), a [badge](/docs/components/badge), and a [sparkline](/docs/components/sparkline) to create a stat card that counts up as it scrolls into view.

```html {.example}
<div id="number-ticker-stat-card" class="wa-stack wa-align-items-start">
  <wa-card style="width: 100%; max-width: 22rem">
    <div class="wa-stack wa-gap-s">
      <div class="wa-split">
        <span class="wa-caption-m">Monthly Revenue</span>
        <wa-badge variant="success" appearance="filled" pill>+12.4%</wa-badge>
      </div>
      <wa-number-ticker
        type="currency"
        value="84250"
        maximum-fraction-digits="0"
        class="wa-heading-2xl"
      ></wa-number-ticker>
      <wa-sparkline
        trend="positive"
        appearance="gradient"
        curve="natural"
        data="52 55 54 60 58 64 63 70 68 72 75 84"
        label="Monthly revenue rising over the last 12 months"
        style="width: 100%; height: 3rem"
      ></wa-sparkline>
      <span class="wa-caption-s">Up from $74,950 last month</span>
    </div>
  </wa-card>

  <wa-divider class="wa-align-self-stretch"></wa-divider>

  <wa-button appearance="filled">Restart</wa-button>
</div>

<script>
  const container = document.getElementById('number-ticker-stat-card');
  const ticker = container.querySelector('wa-number-ticker');

  container.querySelector('wa-button').addEventListener('click', () => ticker.restart());
</script>
```
