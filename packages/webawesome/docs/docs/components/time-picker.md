---
title: Time Picker
layout: component
category: Form Controls
synonyms:
  - time input
  - clock input
  - timepicker
use-cases:
  - enter a time of day in a form
  - pick a time from a column-roulette popup
---

Time Picker is the time-of-day counterpart to [Date Picker](/docs/components/date-picker). It renders a segmented input with hour, minute, optional seconds, and optional AM/PM spinbutton segments in the user's locale order, alongside a popup column picker modeled on Chrome's native time UI.

Type digits to fill the focused segment (focus auto-advances when a segment can accept no further digit), use the arrow keys to step through values, and press `Alt+Down Arrow` to open the popup. The entire segmented input is one tab stop.

```html {.example}
<wa-time-picker label="Pick a time"></wa-time-picker>
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

The example below renders a working form. Submit it (or change the time) and watch the console. The time picker submits its value just like a native `<input type="time">`, regardless of how the user typed or what locale they used.

```html {.example}
<form id="tp-form-demo">
  <wa-time-picker name="meeting_time" label="Meeting time" required value="14:30"></wa-time-picker>
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
<wa-time-picker label="Meeting time" value="14:30"></wa-time-picker>
```

### Labels

Use the `label` attribute to give the time picker an accessible label. For labels that contain HTML, use the `label` slot instead.

```html {.example}
<wa-time-picker label="What time works for you?"></wa-time-picker>
```

### Hint

Add descriptive hint to a time picker with the `hint` attribute. For hints that contain HTML, use the `hint` slot instead.

```html {.example}
<wa-time-picker label="Wake up" hint="Set the time your alarm should go off."></wa-time-picker>
```

### Start & End Decorations

Use the `start` and `end` slots to add presentational elements like `<wa-icon>` inside the input.

```html {.example}
<wa-time-picker label="Start">
  <wa-icon name="hourglass-start" slot="start"></wa-icon>
</wa-time-picker>
<br />
<wa-time-picker label="End">
  <wa-icon name="hourglass-end" slot="end"></wa-icon>
</wa-time-picker>
```

### Required + Clear Button

Combine `required` with `with-clear` to enforce a value while still letting users wipe their selection in a single click.

```html {.example}
<form>
  <wa-time-picker name="alarm" label="Alarm" required with-clear></wa-time-picker>
  <br />
  <wa-button type="submit" appearance="filled" variant="neutral">Submit</wa-button>
</form>
```

### Min and Max

Constrain the selectable range. The picker delegates reversed-range (overnight) semantics to the native `<input type="time">`, so `min="22:00" max="06:00"` represents an overnight range.

```html {.example}
<wa-time-picker label="Office hours" min="09:00" max="17:00"></wa-time-picker>
```

### Step

The `step` attribute is in **seconds**, matching the HTML spec. The default is `60` (one minute). Set `step` below `60` to expose a seconds segment; set it to a multiple of `60` to populate the minute column at that stride.

```html {.example}
<wa-time-picker label="Every 5 minutes" step="300"></wa-time-picker>
<br />
<wa-time-picker label="With seconds" step="1"></wa-time-picker>
```

### 12-Hour vs 24-Hour

By default, `hour-format="auto"` follows the resolved locale. Pass `hour-format="12"` or `hour-format="24"` to override.

```html {.example}
<wa-time-picker label="12-hour" hour-format="12" value="09:00"></wa-time-picker>
<br />
<wa-time-picker label="24-hour" hour-format="24" value="09:00"></wa-time-picker>
```

### Localized

The segment order, separators, and AM/PM strings all derive from the page's locale. Set the `lang` attribute on the host (or an ancestor) to change locales.

```html {.example}
<wa-time-picker lang="en-US" label="English (US)" value="14:30"></wa-time-picker>
<br />
<wa-time-picker lang="en-GB" label="English (UK)" value="14:30"></wa-time-picker>
<br />
<wa-time-picker lang="de-DE" label="German" value="14:30"></wa-time-picker>
```

### "Now" Button

Add a quick-pick "Now" button in the popup footer with `with-now`.

```html {.example}
<wa-time-picker label="When?" with-now></wa-time-picker>
```

### Sizes

Use the `size` attribute to match the time picker to surrounding form controls.

```html {.example}
<wa-time-picker size="xs" label="Extra small"></wa-time-picker>
<br />
<wa-time-picker size="s" label="Small"></wa-time-picker>
<br />
<wa-time-picker size="m" label="Medium"></wa-time-picker>
<br />
<wa-time-picker size="l" label="Large"></wa-time-picker>
<br />
<wa-time-picker size="xl" label="Extra large"></wa-time-picker>
```

### Filled Appearance

Use the `appearance` attribute to switch between the default outlined input, a filled background, or a filled input with an outlined border.

```html {.example}
<wa-time-picker appearance="filled" label="Filled"></wa-time-picker>
<br />
<wa-time-picker appearance="filled-outlined" label="Filled outlined"></wa-time-picker>
```

### Pill

Use the `pill` attribute to give the input fully rounded edges.

```html {.example}
<wa-time-picker pill label="Pill"></wa-time-picker>
```

### Disabled

Use the `disabled` attribute to disable the time picker entirely. Disabled time pickers don't accept input, are skipped during tabbing, and don't submit a value with the form.

```html {.example}
<wa-time-picker label="Disabled" value="09:00" disabled></wa-time-picker>
```

### Read-only

Use the `readonly` attribute to make the time picker non-editable while still allowing it to be focused and to submit its value with the form. The popup still opens for browsing.

```html {.example}
<wa-time-picker label="Read-only" value="09:00" readonly></wa-time-picker>
```
