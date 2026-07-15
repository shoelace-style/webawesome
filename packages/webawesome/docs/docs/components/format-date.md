---
title: Format Date
layout: component
category: Helpers
synonyms:
  - date formatter
  - time formatter
  - datetime
use-cases:
  - localized date
  - date display
  - timestamp
---

```html {.example}
<!-- Web Awesome 3 release date 🎉 -->
<wa-format-date date="2025-12-02T00:00:00-05:00"></wa-format-date>
```

Localization is handled by the browser's [`Intl.DateTimeFormat` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat). No language packs are required.

The `date` attribute determines the date/time to use when formatting. It must be a string that [`Date.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) can interpret or a [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object set via JavaScript. If omitted, the current date/time will be assumed.

:::info
<strong>Always use ISO 8601 date strings.</strong><br />
Ambiguous formats like `03/04/2020` can be read as March 4 or April 3 depending on the user's browser and locale. A valid [ISO 8601 date time string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#Date_Time_String_Format) parses the same for every client.
:::

## Examples

### Date & Time Format

Formatting options are based on those found in the [`Intl.DateTimeFormat` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat). When formatting options are provided, the date/time will be formatted according to those values. When no formatting options are provided, a localized, numeric date will be displayed instead.

```html {.example}
<!-- Human-readable date -->
<wa-format-date month="long" day="numeric" year="numeric"></wa-format-date><br />

<!-- Time -->
<wa-format-date hour="numeric" minute="numeric"></wa-format-date><br />

<!-- Weekday -->
<wa-format-date weekday="long"></wa-format-date><br />

<!-- Month -->
<wa-format-date month="long"></wa-format-date><br />

<!-- Year -->
<wa-format-date year="numeric"></wa-format-date><br />

<!-- No formatting options -->
<wa-format-date></wa-format-date>
```

### Hour Format

By default, the browser will determine whether to use 12-hour or 24-hour time. To force one or the other, set the `hour-format` attribute to `12` or `24`.

```html {.example}
<wa-format-date hour="numeric" minute="numeric" hour-format="12"></wa-format-date><br />
<wa-format-date hour="numeric" minute="numeric" hour-format="24"></wa-format-date>
```

### Localization

Use the `lang` attribute to set the date/time formatting locale.

```html {.example}
English: <wa-format-date lang="en"></wa-format-date><br />
French: <wa-format-date lang="fr"></wa-format-date><br />
Russian: <wa-format-date lang="ru"></wa-format-date>
```
