---
title: Format Bytes
description: Formats a number as a human readable bytes value.
layout: ../../../layouts/ComponentLayout.astro
---

```html:preview
<div class="format-bytes-overview">
  The file is <wa-format-bytes value="1000"></wa-format-bytes> in size. <br /><br />
  <wa-input type="number" value="1000" label="Number to Format" style="max-width: 180px;"></wa-input>
</div>

<script>
  const container = document.querySelector('.format-bytes-overview');
  const formatter = container.querySelector('wa-format-bytes');
  const input = container.querySelector('wa-input');

  input.addEventListener('wa-input', () => (formatter.value = input.value || 0));
</script>
```

```jsx:react
import { useState } from 'react';
import WaButton from '@shoelace-style/shoelace/dist/react/button';
import WaFormatBytes from '@shoelace-style/shoelace/dist/react/format-bytes';
import WaInput from '@shoelace-style/shoelace/dist/react/input';

const App = () => {
  const [value, setValue] = useState(1000);

  return (
    <>
      The file is <WaFormatBytes value={value} /> in size.
      <br />
      <br />
      <WaInput
        type="number"
        value={value}
        label="Number to Format"
        style={{ maxWidth: '180px' }}
        onWaInput={event => setValue(event.target.value)}
      />
    </>
  );
};
```

## Examples

### Formatting Bytes

Set the `value` attribute to a number to get the value in bytes.

```html:preview
<wa-format-bytes value="12"></wa-format-bytes><br />
<wa-format-bytes value="1200"></wa-format-bytes><br />
<wa-format-bytes value="1200000"></wa-format-bytes><br />
<wa-format-bytes value="1200000000"></wa-format-bytes>
```

```jsx:react
import WaFormatBytes from '@shoelace-style/shoelace/dist/react/format-bytes';

const App = () => (
  <>
    <WaFormatBytes value="12" />
    <br />
    <WaFormatBytes value="1200" />
    <br />
    <WaFormatBytes value="1200000" />
    <br />
    <WaFormatBytes value="1200000000" />
  </>
);
```

### Formatting Bits

To get the value in bits, set the `unit` attribute to `bit`.

```html:preview
<wa-format-bytes value="12" unit="bit"></wa-format-bytes><br />
<wa-format-bytes value="1200" unit="bit"></wa-format-bytes><br />
<wa-format-bytes value="1200000" unit="bit"></wa-format-bytes><br />
<wa-format-bytes value="1200000000" unit="bit"></wa-format-bytes>
```

```jsx:react
import WaFormatBytes from '@shoelace-style/shoelace/dist/react/format-bytes';

const App = () => (
  <>
    <WaFormatBytes value="12" unit="bit" />
    <br />
    <WaFormatBytes value="1200" unit="bit" />
    <br />
    <WaFormatBytes value="1200000" unit="bit" />
    <br />
    <WaFormatBytes value="1200000000" unit="bit" />
  </>
);
```

### Localization

Use the `lang` attribute to set the number formatting locale.

```html:preview
<wa-format-bytes value="12" lang="de"></wa-format-bytes><br />
<wa-format-bytes value="1200" lang="de"></wa-format-bytes><br />
<wa-format-bytes value="1200000" lang="de"></wa-format-bytes><br />
<wa-format-bytes value="1200000000" lang="de"></wa-format-bytes>
```

```jsx:react
import WaFormatBytes from '@shoelace-style/shoelace/dist/react/format-bytes';

const App = () => (
  <>
    <WaFormatBytes value="12" lang="de" />
    <br />
    <WaFormatBytes value="1200" lang="de" />
    <br />
    <WaFormatBytes value="1200000" lang="de" />
    <br />
    <WaFormatBytes value="1200000000" lang="de" />
  </>
);
```
