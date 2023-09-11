---
meta:
  title: Textarea
  description: Textareas collect data from the user and allow multiple lines of text.
layout: component
---

```html:preview
<wa-textarea></wa-textarea>
```

```jsx:react
import WaTextarea from '@shoelace-style/shoelace/dist/react/textarea';

const App = () => <WaTextarea />;
```

:::tip
This component works with standard `<form>` elements. Please refer to the section on [form controls](/getting-started/form-controls) to learn more about form submission and client-side validation.
:::

## Examples

### Labels

Use the `label` attribute to give the textarea an accessible label. For labels that contain HTML, use the `label` slot instead.

```html:preview
<wa-textarea label="Comments"></wa-textarea>
```

```jsx:react
import WaTextarea from '@shoelace-style/shoelace/dist/react/textarea';

const App = () => <WaTextarea label="Comments" />;
```

### Help Text

Add descriptive help text to a textarea with the `help-text` attribute. For help texts that contain HTML, use the `help-text` slot instead.

```html:preview
<wa-textarea label="Feedback" help-text="Please tell us what you think."> </wa-textarea>
```

```jsx:react
import WaTextarea from '@shoelace-style/shoelace/dist/react/textarea';

const App = () => <WaTextarea label="Feedback" help-text="Please tell us what you think." />;
```

### Rows

Use the `rows` attribute to change the number of text rows that get shown.

```html:preview
<wa-textarea rows="2"></wa-textarea>
```

```jsx:react
import WaTextarea from '@shoelace-style/shoelace/dist/react/textarea';

const App = () => <WaTextarea rows={2} />;
```

### Placeholders

Use the `placeholder` attribute to add a placeholder.

```html:preview
<wa-textarea placeholder="Type something"></wa-textarea>
```

```jsx:react
import WaTextarea from '@shoelace-style/shoelace/dist/react/textarea';

const App = () => <WaTextarea placeholder="Type something" />;
```

### Filled Textareas

Add the `filled` attribute to draw a filled textarea.

```html:preview
<wa-textarea placeholder="Type something" filled></wa-textarea>
```

```jsx:react
import WaTextarea from '@shoelace-style/shoelace/dist/react/textarea';

const App = () => <WaTextarea placeholder="Type something" filled />;
```

### Disabled

Use the `disabled` attribute to disable a textarea.

```html:preview
<wa-textarea placeholder="Textarea" disabled></wa-textarea>
```

```jsx:react
import WaTextarea from '@shoelace-style/shoelace/dist/react/textarea';

const App = () => <WaTextarea placeholder="Textarea" disabled />;
```

### Sizes

Use the `size` attribute to change a textarea's size.

```html:preview
<wa-textarea placeholder="Small" size="small"></wa-textarea>
<br />
<wa-textarea placeholder="Medium" size="medium"></wa-textarea>
<br />
<wa-textarea placeholder="Large" size="large"></wa-textarea>
```

```jsx:react
import WaTextarea from '@shoelace-style/shoelace/dist/react/textarea';

const App = () => (
  <>
    <WaTextarea placeholder="Small" size="small"></WaTextarea>
    <br />
    <WaTextarea placeholder="Medium" size="medium"></WaTextarea>
    <br />
    <WaTextarea placeholder="Large" size="large"></WaTextarea>
  </>
);
```

### Prevent Resizing

By default, textareas can be resized vertically by the user. To prevent resizing, set the `resize` attribute to `none`.

```html:preview
<wa-textarea resize="none"></wa-textarea>
```

```jsx:react
import WaTextarea from '@shoelace-style/shoelace/dist/react/textarea';

const App = () => <WaTextarea resize="none" />;
```

### Expand with Content

Textareas will automatically resize to expand to fit their content when `resize` is set to `auto`.

```html:preview
<wa-textarea resize="auto"></wa-textarea>
```

```jsx:react
import WaTextarea from '@shoelace-style/shoelace/dist/react/textarea';

const App = () => <WaTextarea resize="auto" />;
```
