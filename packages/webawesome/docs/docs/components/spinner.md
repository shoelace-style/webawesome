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

### Sizing

Spinners are sized based on the current font size. To change the size, set `font-size` on the spinner itself or on a parent element.

```html {.example}
<wa-spinner></wa-spinner>
<wa-spinner style="font-size: 2rem;"></wa-spinner>
<wa-spinner style="font-size: 3rem;"></wa-spinner>
```

### Track Width

Use the `--track-width` custom property to change the thickness of the spinner's track.

```html {.example}
<wa-spinner style="font-size: 50px; --track-width: 10px;"></wa-spinner>
```

### Colors

Use the `--track-color` and `--indicator-color` custom properties to recolor the spinner.

```html {.example}
<wa-spinner style="font-size: 3rem; --indicator-color: deeppink; --track-color: pink;"></wa-spinner>
```

### Speed

Use the `--speed` custom property to set how long one full rotation takes.

```html {.example}
<wa-spinner style="font-size: 3rem; --speed: 2s;"></wa-spinner>
```
