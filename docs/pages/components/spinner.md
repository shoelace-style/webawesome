---
meta:
  title: Spinner
  description: Spinners are used to show the progress of an indeterminate operation.
layout: component
---

```html:preview
<wa-spinner></wa-spinner>
```

```jsx:react
import WaSpinner from '@shoelace-style/shoelace/dist/react/spinner';

const App = () => <WaSpinner />;
```

## Examples

### Size

Spinners are sized based on the current font size. To change their size, set the `font-size` property on the spinner itself or on a parent element as shown below.

```html:preview
<wa-spinner></wa-spinner>
<wa-spinner style="font-size: 2rem;"></wa-spinner>
<wa-spinner style="font-size: 3rem;"></wa-spinner>
```

{% raw %}

```jsx:react
import WaSpinner from '@shoelace-style/shoelace/dist/react/spinner';

const App = () => (
  <>
    <WaSpinner />
    <WaSpinner style={{ fontSize: '2rem' }} />
    <WaSpinner style={{ fontSize: '3rem' }} />
  </>
);
```

{% endraw %}

### Track Width

The width of the spinner's track can be changed by setting the `--track-width` custom property.

```html:preview
<wa-spinner style="font-size: 50px; --track-width: 10px;"></wa-spinner>
```

{% raw %}

```jsx:react
import WaSpinner from '@shoelace-style/shoelace/dist/react/spinner';

const App = () => (
  <WaSpinner
    style={{
      fontSize: '3rem',
      '--track-width': '6px'
    }}
  />
);
```

{% endraw %}

### Color

The spinner's colors can be changed by setting the `--indicator-color` and `--track-color` custom properties.

```html:preview
<wa-spinner style="font-size: 3rem; --indicator-color: deeppink; --track-color: pink;"></wa-spinner>
```

{% raw %}

```jsx:react
import WaSpinner from '@shoelace-style/shoelace/dist/react/spinner';

const App = () => (
  <WaSpinner
    style={{
      fontSize: '3rem',
      '--indicator-color': 'deeppink',
      '--track-color': 'pink'
    }}
  />
);
```

{% endraw %}
