---
meta:
  title: Option
  description: Options define the selectable items within various form controls such as select.
layout: component
---

```html:preview
<wa-select label="Select one">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2">Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
```

```jsx:react
import WaOption from '@shoelace-style/shoelace/dist/react/option';
import WaSelect from '@shoelace-style/shoelace/dist/react/select';

const App = () => (
  <WaSelect>
    <WaOption value="option-1">Option 1</WaOption>
    <WaOption value="option-2">Option 2</WaOption>
    <WaOption value="option-3">Option 3</WaOption>
  </WaSelect>
);
```

## Examples

### Disabled

Use the `disabled` attribute to disable an option and prevent it from being selected.

```html:preview
<wa-select label="Select one">
  <wa-option value="option-1">Option 1</wa-option>
  <wa-option value="option-2" disabled>Option 2</wa-option>
  <wa-option value="option-3">Option 3</wa-option>
</wa-select>
```

```jsx:react
import WaOption from '@shoelace-style/shoelace/dist/react/option';
import WaSelect from '@shoelace-style/shoelace/dist/react/select';

const App = () => (
  <WaSelect>
    <WaOption value="option-1">Option 1</WaOption>
    <WaOption value="option-2" disabled>
      Option 2
    </WaOption>
    <WaOption value="option-3">Option 3</WaOption>
  </WaSelect>
);
```

### Prefix & Suffix

Add icons to the start and end of menu items using the `prefix` and `suffix` slots.

```html:preview
<wa-select label="Select one">
  <wa-option value="option-1">
    <wa-icon slot="prefix" name="envelope" variant="solid"></wa-icon>
    Email
    <wa-icon slot="suffix" name="circle-check" variant="solid"></wa-icon>
  </wa-option>

  <wa-option value="option-2">
    <wa-icon slot="prefix" name="phone" variant="solid"></wa-icon>
    Phone
    <wa-icon slot="suffix" name="circle-check" variant="solid"></wa-icon>
  </wa-option>

  <wa-option value="option-3">
    <wa-icon slot="prefix" name="comment" variant="solid"></wa-icon>
    Chat
    <wa-icon slot="suffix" name="circle-check" variant="solid"></wa-icon>
  </wa-option>
</wa-select>
```
