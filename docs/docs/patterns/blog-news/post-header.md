---
title: Post Header
description: 'Post headers deliver visual impact and emotional engagement right at the start of the reader’s journey.'
parent: blog-news
tags:
---

## Simple

```html {.example}
<div class="wa-stack wa-gap-2xl">
  <em
    >File under <a href="#"><strong>Design</strong></a></em
  >
  <div class="wa-flank:end wa-align-items-end">
    <h2 class="wa-heading-3xl">How to Earn a Living Selling Digital Products in 2025</h2>
    <span>by <a href="#">Alphonso Roberts</a></span>
  </div>
  <div class="wa-frame:landscape wa-border-radius-l">
    <img
      src="https://images.unsplash.com/photo-1622737133809-d95047b9e673?q=80&w=5232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="A collection of 3D shapes tumbling towards a blank surface"
    />
  </div>
</div>
```

## With Avatar and Tags

```html {.example}
<div class="wa-stack wa-gap-xl">
  <div class="wa-grid wa-align-items-center">
    <div class="wa-stack wa-gap-2xl">
      <h2 class="wa-heading-3xl">Understanding UX makes you a better [insert your job here]</h2>
      <p class="wa-caption-xl" style="text-wrap: pretty">
        User experience and accessibility isn't just for designers, it affects everyone. Understanding UX and Usability
        can make you a better human.
      </p>
      <div class="wa-stack wa-gap-l">
        <div class="wa-flank">
          <wa-avatar
            image="https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=4167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            label="Avatar of author"
          ></wa-avatar>
          <div class="wa-stack wa-gap-3xs">
            <span class="wa-heading-m">Earl Tyler</span>
            <span class="wa-caption-l wa-cluster wa-gap-xs"
              ><span>Published</span>
              <wa-format-date
                month="long"
                day="numeric"
                year="numeric"
                date="2020-07-15T09:17:00-04:00"
              ></wa-format-date
            ></span>
          </div>
        </div>
        <div class="wa-cluster wa-gap-2xs">
          <wa-tag size="small" pill>Design</wa-tag>
          <wa-tag size="small" pill>UX</wa-tag>
          <wa-tag size="small" pill>Usability</wa-tag>
          <wa-tag size="small" pill>Accessibility</wa-tag>
        </div>
      </div>
    </div>
    <div class="wa-frame wa-border-radius-l">
      <img
        src="https://images.unsplash.com/photo-1461709444300-a6217cec3dff?q=80&w=5346&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Five people's hands delicately holding colorful autumn leaves"
      />
    </div>
  </div>
</div>
```
