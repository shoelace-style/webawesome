---
title: Progress Bar
description: Progress bars are used to show the status of an ongoing operation.
tags: apps
icon: progress-bar
status: experimental
component: progress-bar
elements:
  "<progress>": https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress
file: styles/native/progress.css
---


```html {.example}
<progress value="40" max="100"></progress>
```

Indeterminate:


```html {.example}
<progress></progress>
```

### Custom Height

Use the `height` CSS property to set the progress bar's height.

```html {.example}
<wa-progress-bar value="50" style="height: 6px;"></wa-progress-bar>
```
