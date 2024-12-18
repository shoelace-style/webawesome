---
title: Essentials
description: TODO
---

Web Awesome works _with_ the platform, rather than trying to reinvent it.
If all you need is styles, you don’t need to use new `<wa-*>` elements!
We also provide styles that make native HTML elements look good so you can continue using what you know and gradually adopt Web Awesome as you see fit.

To use all Web Awesome Essentials, include the following stylesheet in your project:

```html
<link rel="stylesheet" href="{% cdnUrl 'styles/themes/applied.css' %}" />
```

Here’s what we have so far:

<!-- TODO make nice cards for these -->
<ul>
  {%- for page in collections.essentials | sort -%}
  <li>
    <a href="/docs/essentials/{{ page.fileSlug }}">{{ page.data.title }}</a>
  </li>
  {%- endfor -%}
</ul>

## Opting out of Essentials on a case by case basis

So you've decided to use Essentials and now you need to style an element or a part of a page completely differently, what to do?
You can create an opt-out with the power of [CSS Cascade Layers](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_layers)!

Instead of including Essentials with a `<link>` element, you can include it like this:

```html
<style>
@import url('{% cdnUrl 'styles/themes/applied.css' %}') layer(wa);

@layer wa {
  .wa-off,
  .wa-off-deep,
  .wa-off-deep * {
    all: revert-layer;
  }
}
</style>
```

Then you can opt-out of Essentials styling by using a `wa-off` class on individual elements or `wa-off-deep` for entire subtrees:

```html
<p>
  <button>I’m Awesome</button>
  <button class="wa-off">I’m not</button>
</p>

<blockquote>
  <p>Lorem Ipsum dolor sit amet</p>
  <button>I’m also awesome</button>
</blockquote>
<blockquote class="wa-off">
  <p>Lorem Ipsum dolor sit amet</p>
  <button >I’m also not</button>
</blockquote>
<blockquote class="wa-off-deep">
  <p>Lorem Ipsum dolor sit amet</p>
  <button>I’m also not</button>
</blockquote>
```

You could even design opt-outs for specific elements!
E.g. to opt-out of `<details>` styling:

```css
@layer wa {
  details.wa-details-off,
  .wa-details-off details,{
    all: revert-layer;
  }
}
```

If you find yourself opting out of entire element types too much, you could consider only including the parts of Essentials you need instead of the whole thing.
You can find instructions for how to do that on the individual Essentials pages.
