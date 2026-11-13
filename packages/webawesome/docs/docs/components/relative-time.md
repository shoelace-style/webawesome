---
title: Relative Time
layout: component
category: Helpers
synonyms:
  - time ago
  - timeago
  - moment
  - from now
use-cases:
  - posted ago
  - last updated
  - time since
---

```html {.example}
<!-- Web Awesome 3 release date 🎉 -->
<wa-relative-time date="2025-12-02T00:00:00-05:00"></wa-relative-time>
```

Localization is handled by the browser's [`Intl.RelativeTimeFormat` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat). No language packs are required.

The `date` attribute determines when the date/time is calculated from. It must be a string that [`Date.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) can interpret or a [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object set via JavaScript.

:::info
<strong>Always use ISO 8601 date strings.</strong><br />
Ambiguous formats like `03/04/2020` can be read as March 4 or April 3 depending on the user's browser and locale. A valid [ISO 8601 date time string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#Date_Time_String_Format) parses the same for every client.
:::

## Examples

### Sync

Use the `sync` attribute to update the displayed value automatically as time passes.

```html {.example}
<div class="relative-time-sync">
  <wa-relative-time sync></wa-relative-time>
</div>

<script>
  const container = document.querySelector('.relative-time-sync');
  const relativeTime = container.querySelector('wa-relative-time');

  relativeTime.date = new Date(new Date().getTime() - 60000);
</script>
```

### Format

You can change how the time is displayed using the `format` attribute. Note that some locales may display the same values for `narrow` and `short` formats.

```html {.example}
<wa-relative-time date="2025-12-02T00:00:00-05:00" format="narrow"></wa-relative-time><br />
<wa-relative-time date="2025-12-02T00:00:00-05:00" format="short"></wa-relative-time><br />
<wa-relative-time date="2025-12-02T00:00:00-05:00" format="long"></wa-relative-time>
```

### Localization

Use the `lang` attribute to set the desired locale.

```html {.example}
English: <wa-relative-time date="2025-12-02T00:00:00-05:00" lang="en-US"></wa-relative-time><br />
Chinese: <wa-relative-time date="2025-12-02T00:00:00-05:00" lang="zh-CN"></wa-relative-time><br />
German: <wa-relative-time date="2025-12-02T00:00:00-05:00" lang="de"></wa-relative-time><br />
Greek: <wa-relative-time date="2025-12-02T00:00:00-05:00" lang="el"></wa-relative-time><br />
Russian: <wa-relative-time date="2025-12-02T00:00:00-05:00" lang="ru"></wa-relative-time>
```
