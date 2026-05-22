---
title: Spinner
layout: component
category: Feedback
synonyms:
  - loading
  - loader
  - busy indicator
  - throbber
use-cases:
  - loading animation
  - indeterminate progress
  - ajax loader
---

```html {.example}
<wa-spinner></wa-spinner>
```

## Examples

### Size

Spinners are sized based on the current font size. To change their size, set the `font-size` property on the spinner itself or on a parent element as shown below.

```html {.example}
<wa-spinner></wa-spinner>
<wa-spinner style="font-size: 2rem;"></wa-spinner>
<wa-spinner style="font-size: 3rem;"></wa-spinner>
```

### Track Width

The width of the spinner's track can be changed by setting the `--track-width` custom property.

```html {.example}
<wa-spinner style="font-size: 50px; --track-width: 10px;"></wa-spinner>
```

### Color

The spinner's colors can be changed by setting the `--indicator-color` and `--track-color` custom properties.

```html {.example}
<wa-spinner style="font-size: 3rem; --indicator-color: deeppink; --track-color: pink;"></wa-spinner>
```
