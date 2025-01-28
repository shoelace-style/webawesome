---
title: Details
description: 'Details styles apply your Web Awesome theme to the HTML `<details>` element. Details show a brief summary and expand to show additional content.'
tags: apps
layout: element
component: details
icon: details
elements:
  "<details>": https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
file: styles/native/details.css
---

```html {.example}
<details>
  <summary>Tincidunt nunc pulvinar</summary>
  <p>Ut lectus arcu bibendum at varius. Convallis a cras semper auctor neque vitae. Odio pellentesque diam volutpat commodo sed egestas. Amet dictum sit amet justo donec enim diam vulputate ut.</p>
</details>
```

## Examples

### Right-to-Left Languages

The details styling automatically adapts to right-to-left languages:

```html {.example}
<details lang="ar" dir="rtl">
  <summary>تبديلني</summary>
  استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن
</details>
```

## Accordions

In [modern browsers](https://caniuse.com/mdn-html_elements_details_name),
grouping `<details>` elements via the `name` attribute provides accordion-style functionality:

```html {.example}
<details name="details-accordion">
  <summary>Enim diam</summary>
  <p>Nunc faucibus a pellentesque sit amet porttitor. Adipiscing tristique risus nec feugiat in fermentum. Leo duis ut diam quam nulla porttitor massa id. Mauris nunc congue nisi vitae.</p>
</details>

<details name="details-accordion">
  <summary>Arcu non odio</summary>
  <p>Sed libero enim sed faucibus turpis in eu mi bibendum. Nunc mi ipsum faucibus vitae aliquet nec. Ultricies tristique nulla aliquet enim tortor. Tellus at urna condimentum mattis pellentesque.</p>
</details>

<details name="details-accordion">
  <summary>Ut porttitor</summary>
  <p>Eu facilisis sed odio morbi quis commodo odio aenean sed. Sit amet purus gravida quis blandit turpis cursus. Eu consequat ac felis donec et odio pellentesque diam volutpat.</p>
</details>
```
