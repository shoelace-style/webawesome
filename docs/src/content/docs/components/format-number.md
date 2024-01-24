---
title: Format Number
description: Formats a number using the specified locale and options.
layout: ../../../layouts/ComponentLayout.astro
---

Localization is handled by the browser's [`Intl.NumberFormat` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat). No language packs are required.

```html:preview
<div class="format-number-overview">
  <wa-format-number value="1000"></wa-format-number>
  <br /><br />
  <wa-input type="number" value="1000" label="Number to Format" style="max-width: 180px;"></wa-input>
</div>

<script>
  const container = document.querySelector('.format-number-overview');
  const formatter = container.querySelector('wa-format-number');
  const input = container.querySelector('wa-input');

  input.addEventListener('wa-input', () => (formatter.value = input.value || 0));
</script>
```

```jsx:react
import { useState } from 'react';
import WaFormatNumber from '@shoelace-style/shoelace/dist/react/format-number';
import WaInput from '@shoelace-style/shoelace/dist/react/input';

const App = () => {
  const [value, setValue] = useState(1000);

  return (
    <>
      <WaFormatNumber value={value} />
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

### Percentages

To get the value as a percent, set the `type` attribute to `percent`.

```html:preview
<wa-format-number type="percent" value="0"></wa-format-number><br />
<wa-format-number type="percent" value="0.25"></wa-format-number><br />
<wa-format-number type="percent" value="0.50"></wa-format-number><br />
<wa-format-number type="percent" value="0.75"></wa-format-number><br />
<wa-format-number type="percent" value="1"></wa-format-number>
```

```jsx:react
import WaFormatNumber from '@shoelace-style/shoelace/dist/react/format-number';

const App = () => (
  <>
    <WaFormatNumber type="percent" value={0} />
    <br />
    <WaFormatNumber type="percent" value={0.25} />
    <br />
    <WaFormatNumber type="percent" value={0.5} />
    <br />
    <WaFormatNumber type="percent" value={0.75} />
    <br />
    <WaFormatNumber type="percent" value={1} />
  </>
);
```

### Localization

Use the `lang` attribute to set the number formatting locale.

```html:preview
English: <wa-format-number value="2000" lang="en" minimum-fraction-digits="2"></wa-format-number><br />
German: <wa-format-number value="2000" lang="de" minimum-fraction-digits="2"></wa-format-number><br />
Russian: <wa-format-number value="2000" lang="ru" minimum-fraction-digits="2"></wa-format-number>
```

```jsx:react
import WaFormatNumber from '@shoelace-style/shoelace/dist/react/format-number';

const App = () => (
  <>
    English: <WaFormatNumber value="2000" lang="en" minimum-fraction-digits="2" />
    <br />
    German: <WaFormatNumber value="2000" lang="de" minimum-fraction-digits="2" />
    <br />
    Russian: <WaFormatNumber value="2000" lang="ru" minimum-fraction-digits="2" />
  </>
);
```

### Currency

To format a number as a monetary value, set the `type` attribute to `currency` and set the `currency` attribute to the desired ISO 4217 currency code. You should also specify `lang` to ensure the the number is formatted correctly for the target locale.

```html:preview
<wa-format-number type="currency" currency="USD" value="2000" lang="en-US"></wa-format-number><br />
<wa-format-number type="currency" currency="GBP" value="2000" lang="en-GB"></wa-format-number><br />
<wa-format-number type="currency" currency="EUR" value="2000" lang="de"></wa-format-number><br />
<wa-format-number type="currency" currency="RUB" value="2000" lang="ru"></wa-format-number><br />
<wa-format-number type="currency" currency="CNY" value="2000" lang="zh-cn"></wa-format-number>
```

```jsx:react
import WaFormatNumber from '@shoelace-style/shoelace/dist/react/format-number';

const App = () => (
  <>
    <WaFormatNumber type="currency" currency="USD" value="2000" lang="en-US" />
    <br />
    <WaFormatNumber type="currency" currency="GBP" value="2000" lang="en-GB" />
    <br />
    <WaFormatNumber type="currency" currency="EUR" value="2000" lang="de" />
    <br />
    <WaFormatNumber type="currency" currency="RUB" value="2000" lang="ru" />
    <br />
    <WaFormatNumber type="currency" currency="CNY" value="2000" lang="zh-cn" />
  </>
);
```
