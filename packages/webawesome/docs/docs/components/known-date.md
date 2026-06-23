---
title: Known Date
layout: component
category: Forms
synonyms:
  - dmy input
  - birthday input
  - date fields
  - split date input
  - gov.uk date input
  - manual date entry
use-cases:
  - capture birthdays
  - capture passport and document dates
  - capture any date the user already knows
  - issue date entry
  - expiration date entry
---

Known Date collects a date the user already knows — a birthday, a passport issue date, an expiration — through three separate fields for day, month, and year. It follows the [UK Government Design System date input pattern](https://design-system.service.gov.uk/components/date-input/): a labeled `<fieldset>` wraps three plain `<input>` elements, the user types each part themselves, and the host submits a single canonical ISO date.

```html {.example}
<wa-known-date label="When was your passport issued?"></wa-known-date>
```

:::info
For dates the user needs help finding (scheduling, ranges, browsing), use [`<wa-date-input>`](/docs/components/date-input) instead. Known Date is intentionally simple: no popup calendar, no auto-advance between fields, and no clever parsing.
:::

## Form Submission

The hidden form value is canonical ISO 8601 (`YYYY-MM-DD`), regardless of the locale used to render the fields:

- A complete, real calendar date is submitted as `YYYY-MM-DD`.
- A partial entry (one or two fields filled) submits no value — the form data omits the entry entirely.
- An invalid combination such as 30 February submits no value.

```html {.example}
<form id="kd-form-demo">
  <wa-known-date name="dob" label="Date of birth" required value="2007-03-27"></wa-known-date>
  <br />
  <wa-button type="submit" appearance="filled" variant="neutral">Submit</wa-button>
</form>

<pre id="kd-form-demo-output"></pre>

<style>
  #kd-form-demo-output {
    margin-block-start: 1rem;
    margin-block-end: 0;
    padding: 0.75rem;
    background: var(--wa-color-surface-lowered);
    border-radius: var(--wa-border-radius-m);
    font-size: 0.875em;
  }

  #kd-form-demo-output:empty {
    display: none;
  }
</style>

<script>
  const form = document.getElementById('kd-form-demo');
  const output = document.getElementById('kd-form-demo-output');

  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const entries = Object.fromEntries(data.entries());
    const formatted = JSON.stringify(entries, null, 2);
    output.textContent = 'Submitted FormData:\n' + formatted;
  });
</script>
```

## Examples

### Initial Value

Set the `value` attribute to an ISO date to pre-fill the three fields.

```html {.example}
<wa-known-date label="Date of birth" value="1990-04-15"></wa-known-date>
```

### Hint

Use the `hint` attribute (or slot) to show an example value. The hint is associated with each field via `aria-describedby`, so screen readers announce it when any field receives focus.

```html {.example}
<wa-known-date label="When was your passport issued?" hint="For example, 27 3 2007"></wa-known-date>
```

### Locale-Aware Field Order

The three fields render in the natural order for the inherited `lang` (or the explicit `locale` attribute). The labels stay the same; only the position changes.

```html {.example}
<wa-known-date label="UK order" lang="en-GB"></wa-known-date>
<br />
<wa-known-date label="US order" lang="en-US"></wa-known-date>
<br />
<wa-known-date label="Japanese order" lang="ja-JP"></wa-known-date>
```

### Min and Max

Constrain the accepted range with `min` and `max`. Values outside the range are reported as invalid.

```html {.example}
<wa-known-date label="Birthday" min="1900-01-01" max="2099-12-31"></wa-known-date>
```

### Required

Set `required` to make the date input required for form submission. Like other form controls, validation surfaces through the browser's native constraint validation flow: submitting a form with an empty or partially filled date input prevents submission and shows the browser's validation message. No error appears while the user is simply filling in or tabbing between the fields.

```html {.example}
<form>
  <wa-known-date label="Date of birth" required></wa-known-date>
  <br />
  <wa-button type="submit" appearance="filled" variant="neutral">Submit</wa-button>
</form>
```

### Disabled and Readonly

```html {.example}
<wa-known-date label="Disabled" value="2007-03-27" disabled></wa-known-date>
<br />
<wa-known-date label="Readonly" value="2007-03-27" readonly></wa-known-date>
```

### Autocomplete

Set `autocomplete="bday"` to enable browser autofill for birthdays. The host expands the family into per-field tokens (`bday-day`, `bday-month`, `bday-year`).

```html {.example}
<wa-known-date label="Date of birth" autocomplete="bday"></wa-known-date>
```

### Sizes

```html {.example}
<wa-known-date label="Extra small" size="xs"></wa-known-date>
<br />
<wa-known-date label="Small" size="s"></wa-known-date>
<br />
<wa-known-date label="Medium (default)" size="m"></wa-known-date>
<br />
<wa-known-date label="Large" size="l"></wa-known-date>
<br />
<wa-known-date label="Extra large" size="xl"></wa-known-date>
```

### Appearances

```html {.example}
<wa-known-date label="Outlined (default)" appearance="outlined"></wa-known-date>
<br />
<wa-known-date label="Filled" appearance="filled"></wa-known-date>
<br />
<wa-known-date label="Filled outlined" appearance="filled-outlined"></wa-known-date>
```

### Pill

Use the `pill` attribute to give each field rounded edges.

```html {.example}
<wa-known-date label="Pill" pill></wa-known-date>
```

<!-- Demo styles -->
<style>
  wa-known-date {
    max-width: 360px;
  }
</style>
