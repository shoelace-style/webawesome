---
title: Duration Input
layout: component
category: Forms
---

This experimental control lets users enter time spans for alarms, timers, and other intervals. Its value uses the
`HH:mm:ss.SSS` format.
Hours range from 00 to 99, minutes and seconds from 00 to 59, and milliseconds from 000 to 999.
An unset input displays zeros but is empty for form validation. Click a segment or use the left and right arrow keys
to move between segments. Typing a full segment advances to the next one; up and down arrows step and wrap its value.
The value is committed when a segment is completed or the edit is finished. Invalid values supplied programmatically
fail validation.

Add `show-days` to display a days segment and use the `D:HH:mm:ss.SSS` format. A day is exactly 24 hours; in this mode
hours range from 00 to 23, and stepping past either boundary carries or borrows a day. Days can be entered as a
non-negative integer up to 375299968947541. Use a separator or move focus to finish entering days.

Enabling `show-days` converts an existing hours-only value to days and hours. Hiding the days segment preserves a
nonzero day count in the value, even though the count is no longer visible. While the hidden day count is nonzero,
hours still range from 00 to 23, and stepping across a boundary changes the hidden day count. For example, stepping up
from `2:23:00:00.000` produces `3:00:00:00.000`. Once the day count is zero, hours range from 00 to 99 again.

```html {.example}
<wa-duration-input
  label="Duration"
  name="duration"
  hint="Hours, minutes, seconds, and milliseconds"
  value="01:30:00.000"
></wa-duration-input>
```

```html {.example}
<form>
  <wa-duration-input label="Required duration" name="duration" required></wa-duration-input>
  <wa-button type="submit">Submit</wa-button>
</form>
```

```html {.example}
<wa-duration-input label="Elapsed time" name="elapsed" show-days value="2:03:04:05.006"></wa-duration-input>
```

### Size and Appearance

Use `size` (`xs`, `s`, `m`, `l`, or `xl`) and `appearance` (`outlined`, `filled`, or `filled-outlined`) to match
other form controls. Add `pill` for rounded edges.

```html {.example}
<div class="wa-stack">
  <wa-duration-input size="s" appearance="outlined" label="Small"></wa-duration-input>
  <wa-duration-input appearance="filled" label="Filled"></wa-duration-input>
  <wa-duration-input size="l" appearance="filled-outlined" pill label="Large pill"></wa-duration-input>
</div>
```

In a narrow container, the segments scroll horizontally so that longer values remain accessible.

### Disabled and Read-only

Use `disabled` to prevent editing and exclude the value from form submission. Use `readonly` to prevent editing while
keeping the input focusable and its value available for submission.

```html {.example}
<div class="wa-stack">
  <wa-duration-input label="Disabled" value="01:30:00.000" disabled></wa-duration-input>
  <wa-duration-input label="Read-only" value="01:30:00.000" readonly></wa-duration-input>
</div>
```

### Clearable

Add `with-clear` to show a clear button when the input has a value or an edit in progress. Clearing makes the value
empty, emits `wa-clear`, `input`, and `change`, and returns focus to the input. The button is hidden when the input
is disabled or read-only. Use the `clear-icon` slot to replace its icon.

```html {.example}
<wa-duration-input label="Duration" value="01:30:00.000" with-clear></wa-duration-input>
```

### Start and End Decorations

Use the `start` and `end` slots to add icons or other decorations.

```html {.example}
<wa-duration-input label="Elapsed time" value="01:30:00.000">
  <wa-icon slot="start" name="hourglass-start"></wa-icon>
  <wa-icon slot="end" name="clock"></wa-icon>
</wa-duration-input>
```

### Minimum and Maximum

Use `min` and `max` to set inclusive limits on the total duration. Either limit accepts `HH:mm:ss.SSS` or
`D:HH:mm:ss.SSS`, regardless of whether days are displayed. Values outside the range fail form validation; they are
not automatically changed. An empty optional input remains valid. Invalid limits, or a minimum greater than the
maximum, produce a validation error.

```html {.example}
<wa-duration-input label="Duration" min="00:05:00.000" max="2:00:00:00.000" value="01:30:00.000"></wa-duration-input>
```

### Dividers

Set `days-divider`, `hours-divider`, `minutes-divider`, and `seconds-divider` to change the text following each
segment. `microseconds-divider` adds a suffix after milliseconds; its name matches `input-duration`. Empty strings
hide divider text. Dividers are displayed as text and do not change the submitted value. Between visible segments,
the divider associated with the left segment is used, even when intermediate segments are hidden.

```html {.example}
<wa-duration-input
  label="Elapsed time"
  show-days
  days-divider="d "
  hours-divider="h "
  minutes-divider="m "
  seconds-divider="."
  microseconds-divider="s"
  value="2:03:04:05.006"
></wa-duration-input>
```

### Visible Units

Use `no-hours`, `no-minutes`, `no-seconds`, or `no-microseconds` to hide the corresponding segment. The last attribute
hides milliseconds and retains the name used by `input-duration`. Hidden units remain in the value and participate in
validation and form submission; hiding a unit does not reset or convert it.

```html {.example}
<wa-duration-input label="Hours and seconds" no-minutes no-microseconds value="01:02:03.004"></wa-duration-input>
```

In JavaScript, the corresponding `hideHours()`, `hideMinutes()`, `hideSeconds()`, and `hideMicroSeconds()` methods hide
segments; `showHours()`, `showMinutes()`, `showSeconds()`, and `showMicroSeconds()` show them again. If every segment
is hidden, the value is preserved but cannot be edited until a segment is shown.

The placement of configurable units, dividers, and min/max between Core and Pro is open for maintainer discussion.
