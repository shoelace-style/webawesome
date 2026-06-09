---
title: Time Input
layout: component
category: Forms
synonyms:
  - time input
  - clock input
  - timepicker
use-cases:
  - enter a time of day in a form
  - pick a time from a column-roulette popup
---

Time Input is the time-of-day counterpart to [Date Input](/docs/components/date-input). It renders a segmented input with hour, minute, optional seconds, and optional AM/PM spinbutton segments in the user's locale order, alongside a popup column picker modeled on Chrome's native time UI.

Type digits to fill the focused segment (focus auto-advances when a segment can accept no further digit), use the arrow keys to step through values, and press `Alt+Down Arrow` to open the popup. The entire segmented input is one tab stop.

```html {.example}
<wa-time-input label="Pick a time"></wa-time-input>
```

:::info
The submitted form value matches HTML `<input type="time">`: `HH:mm` for whole-minute steps, `HH:mm:ss` when seconds are shown (`step` < 60). The wire value is always 24-hour even when the UI is 12-hour. The displayed text follows the user's locale, inherited from the `lang` attribute on the host or an ancestor.
:::

## Form Submission

The hidden form value is canonical 24-hour time, regardless of the user's locale or `hour-format`:

- **Whole-minute steps** (default `step="60"` or any multiple of 60): `HH:mm` (e.g., `14:30`).
- **Sub-minute steps** (`step` < 60, seconds segment shown): `HH:mm:ss` (e.g., `14:30:15`).
- **12-hour UI**: still submits 24-hour on the wire, i.e. `2:30 PM` becomes `14:30`.
- **Partial input**: the form value is empty until every required segment is filled.

The example below renders a working form. Submit it (or change the time) and watch the console. The time input submits its value just like a native `<input type="time">`, regardless of how the user typed or what locale they used.

```html {.example}
<form id="tp-form-demo">
  <wa-time-input name="meeting_time" label="Meeting time" required value="14:30"></wa-time-input>
  <br />
  <wa-button type="submit" appearance="filled" variant="neutral">Submit</wa-button>
</form>
<pre id="tp-form-demo-output"></pre>
<style>
  #tp-form-demo-output {
    margin-block-start: 1rem;
    margin-block-end: 0;
    padding: 0.75rem;
    background: var(--wa-color-surface-lowered);
    border-radius: var(--wa-border-radius-m);
    font-size: 0.875em;
  }

  #tp-form-demo-output:empty {
    display: none;
  }
</style>

<script>
  const form = document.getElementById('tp-form-demo');
  const output = document.getElementById('tp-form-demo-output');

  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const entries = Object.fromEntries(data.entries());
    const formatted = JSON.stringify(entries, null, 2);
    console.log('Submitted FormData:', entries);
    output.textContent = 'Submitted FormData:\n' + formatted;
  });
</script>
```

## Examples

### Initial Value

Set the `value` attribute to a time string to pre-populate the input.

```html {.example}
<wa-time-input label="Meeting time" value="14:30"></wa-time-input>
```

### Labels

Use the `label` attribute to give the time input an accessible label. For labels that contain HTML, use the `label` slot instead.

```html {.example}
<wa-time-input label="What time works for you?"></wa-time-input>
```

### Hint

Add descriptive hint to a time input with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html {.example}
<wa-time-input label="Wake up" hint="Set the time your alarm should go off."></wa-time-input>
```

### Start & End Decorations

Use the `start` and `end` slots to add presentational elements like `<wa-icon>` inside the input.

```html {.example}
<wa-time-input label="Start">
  <wa-icon name="hourglass-start" slot="start"></wa-icon>
</wa-time-input>
<br />
<wa-time-input label="End">
  <wa-icon name="hourglass-end" slot="end"></wa-icon>
</wa-time-input>
```

### Required + Clear Button

Combine `required` with `with-clear` to enforce a value while still letting users wipe their selection in a single click.

```html {.example}
<form>
  <wa-time-input name="alarm" label="Alarm" required with-clear></wa-time-input>
  <br />
  <wa-button type="submit" appearance="filled" variant="neutral">Submit</wa-button>
</form>
```

### Min and Max

Constrain the selectable range. The picker delegates reversed-range (overnight) semantics to the native `<input type="time">`, so `min="22:00" max="06:00"` represents an overnight range.

```html {.example}
<wa-time-input label="Office hours" min="09:00" max="17:00"></wa-time-input>
```

### Step

The `step` attribute is in **seconds**, matching the HTML spec. The default is `60` (one minute). Set `step` below `60` to expose a seconds segment; set it to a multiple of `60` to populate the minute column at that stride.

```html {.example}
<wa-time-input label="Every 5 minutes" step="300"></wa-time-input>
<br />
<wa-time-input label="With seconds" step="1"></wa-time-input>
```

### 12-Hour vs 24-Hour

By default, `hour-format="auto"` follows the resolved locale. Pass `hour-format="12"` or `hour-format="24"` to override.

```html {.example}
<wa-time-input label="12-hour" hour-format="12" value="09:00"></wa-time-input>
<br />
<wa-time-input label="24-hour" hour-format="24" value="09:00"></wa-time-input>
```

### Localized

The segment order, separators, and AM/PM strings all derive from the page's locale. Set the `lang` attribute on the host (or an ancestor) to change locales.

```html {.example}
<wa-time-input lang="en-US" label="English (US)" value="14:30"></wa-time-input>
<br />
<wa-time-input lang="en-GB" label="English (UK)" value="14:30"></wa-time-input>
<br />
<wa-time-input lang="de-DE" label="German" value="14:30"></wa-time-input>
```

### "Now" Button

Add a quick-pick "Now" button in the popup footer with `with-now`.

```html {.example}
<wa-time-input label="When?" with-now></wa-time-input>
```

### Sizes

Use the `size` attribute to match the time input to surrounding form controls.

```html {.example}
<wa-time-input size="xs" label="Extra small"></wa-time-input>
<br />
<wa-time-input size="s" label="Small"></wa-time-input>
<br />
<wa-time-input size="m" label="Medium"></wa-time-input>
<br />
<wa-time-input size="l" label="Large"></wa-time-input>
<br />
<wa-time-input size="xl" label="Extra large"></wa-time-input>
```

### Filled Appearance

Use the `appearance` attribute to switch between the default outlined input, a filled background, or a filled input with an outlined border.

```html {.example}
<wa-time-input appearance="filled" label="Filled"></wa-time-input>
<br />
<wa-time-input appearance="filled-outlined" label="Filled outlined"></wa-time-input>
```

### Pill

Use the `pill` attribute to give the input fully rounded edges.

```html {.example}
<wa-time-input pill label="Pill"></wa-time-input>
```

### Disabled

Use the `disabled` attribute to disable the time input entirely. Disabled time inputs don't accept input, are skipped during tabbing, and don't submit a value with the form.

```html {.example}
<wa-time-input label="Disabled" value="09:00" disabled></wa-time-input>
```

### Read-only

Use the `readonly` attribute to make the time input non-editable while still allowing it to be focused and to submit its value with the form. The popup still opens for browsing.

```html {.example}
<wa-time-input label="Read-only" value="09:00" readonly></wa-time-input>
```
