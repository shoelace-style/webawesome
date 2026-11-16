---
title: Duration Input
layout: component
category: Forms
---

This is an experimental prototype for entering elapsed durations. Its value uses the `HH:mm:ss.SSS` format.
Hours range from 00 to 99, minutes and seconds from 00 to 59, and milliseconds from 000 to 999.
An unset input displays zeros but is empty for form validation. Click or tab to each segment to edit it;
the value is committed when the segment changes. Invalid values supplied programmatically fail validation.

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

This prototype does not yet support days, configurable units, or automatic advancement between segments.
