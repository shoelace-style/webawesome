---
title: Format Bytes
description: Formats a number as a human readable bytes value.
layout: component
category: Utilities
---

```html {.example}
<div class="format-bytes-overview">
  The file is <wa-format-bytes value="1000"></wa-format-bytes> in size. <br /><br />
  <wa-input type="number" value="1000" label="Number to Format" style="max-width: 180px;"></wa-input>
</div>

<script>
  const container = document.querySelector('.format-bytes-overview');
  const formatter = container.querySelector('wa-format-bytes');
  const input = container.querySelector('wa-input');

  input.addEventListener('input', () => (formatter.value = input.value || 0));
</script>
```

## Examples

### Formatting Bytes

Set the `value` attribute to a number to get the value in bytes.

```html {.example}
<wa-format-bytes value="12"></wa-format-bytes><br />
<wa-format-bytes value="1200"></wa-format-bytes><br />
<wa-format-bytes value="1200000"></wa-format-bytes><br />
<wa-format-bytes value="1200000000"></wa-format-bytes>
```

### Formatting Bits

To get the value in bits, set the `unit` attribute to `bit`.

```html {.example}
<wa-format-bytes value="12" unit="bit"></wa-format-bytes><br />
<wa-format-bytes value="1200" unit="bit"></wa-format-bytes><br />
<wa-format-bytes value="1200000" unit="bit"></wa-format-bytes><br />
<wa-format-bytes value="1200000000" unit="bit"></wa-format-bytes>
```

### Localization

Use the `lang` attribute to set the number formatting locale.

```html {.example}
<wa-format-bytes value="12" lang="de"></wa-format-bytes><br />
<wa-format-bytes value="1200" lang="de"></wa-format-bytes><br />
<wa-format-bytes value="1200000" lang="de"></wa-format-bytes><br />
<wa-format-bytes value="1200000000" lang="de"></wa-format-bytes>
```
