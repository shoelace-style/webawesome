---
title: Post Footer
description: 'Broad Topics used to organize and structure content'
parent: blog-news
tags: 
---

## Card
```html {.example}
<div class="wa-align-items-start wa-flank:end wa-gap-3xl" style="--flank-size: 40ch;">
    <div class="wa-stack">
        <span>More in <a href="#">Category</a></span>
        <div class="wa-grid">
            <a href="#">
                <div class="wa-frame">
                    <img src="https://images.unsplash.com/photo-1532966404682-9d131a1071f5?q=80&w=3023&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
                </div>
                <span>
                    Title
                </span>
            </a>
            <a href="#">
                <div class="wa-frame">
                    <img src="https://images.unsplash.com/photo-1532966404682-9d131a1071f5?q=80&w=3023&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
                </div>
                <span>
                    Title
                </span>
            </a>
            <a href="#">
                <div class="wa-frame">
                    <img src="https://images.unsplash.com/photo-1532966404682-9d131a1071f5?q=80&w=3023&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
                </div>
                <span>
                    Title
                </span>
            </a>
            <a href="#">
                <div class="wa-frame">
                    <img src="https://images.unsplash.com/photo-1532966404682-9d131a1071f5?q=80&w=3023&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
                </div>
                <span>
                    Title
                </span>
            </a>
            <a href="#">
                <div class="wa-frame">
                    <img src="https://images.unsplash.com/photo-1532966404682-9d131a1071f5?q=80&w=3023&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
                </div>
                <span>
                    Title
                </span>
            </a>
            <a href="#">
                <div class="wa-frame">
                    <img src="https://images.unsplash.com/photo-1532966404682-9d131a1071f5?q=80&w=3023&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
                </div>
                <span>
                    Title
                </span>
            </a>
        </div>
    </div>
    <div class="wa-stack">
        <span>Top Stories</span>
        <ul>
            <li>
                 <div class="wa-stack">
                        <wa-format-date month="long" day="numeric" year="numeric" date="2020-07-15T09:17:00-04:00"></wa-format-date>
                        <h1 class="wa-heading-l">Integrating Design And Code With Native Design Tokens In Penpot</h1>
                 </div>
                <wa-divider></wa-divider>
            </li>
            <li>
                 <div class="wa-flank:end">
                        <h1 class="wa-heading-l">Integrating Design And Code With Native Design Tokens In Penpot</h1>
           <wa-avatar image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" label="Avatar of a gray tabby kitten looking down"></wa-avatar> </div>
           <wa-divider></wa-divider>
            </li>
            <li>
                 <div class="wa-flank:end">
                        <h1 class="wa-heading-l">Integrating Design And Code With Native Design Tokens In Penpot</h1>
           <wa-avatar image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" label="Avatar of a gray tabby kitten looking down"></wa-avatar> </div>
           <wa-divider></wa-divider>
            </li>
            <li>
                 <div class="wa-flank:end">
                        <h1 class="wa-heading-l">Integrating Design And Code With Native Design Tokens In Penpot</h1>
           <wa-avatar image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" label="Avatar of a gray tabby kitten looking down"></wa-avatar> </div>
           <wa-divider></wa-divider>
            </li>
        </ul>
    </div>
</div>
```

## Card
```html {.example}
<div class="wa-stack">
    <div class="wa-stack">
        <h3>Don't forget to share this post!</h3>
          <div class="wa-cluster">
      <span class="wa-align-items-center wa-stack wa-gap-2xs">
        <wa-icon-button style="font-size: var(--wa-font-size-2xl);" name="facebook" family="brands" label="Share on Facebook" href="#" target="_blank"></wa-icon-button>
        <span class="wa-caption-s">Facebook</span>
      </span>
      <span class="wa-align-items-center wa-stack wa-gap-2xs">
        <wa-icon-button style="font-size: var(--wa-font-size-2xl);" name="bluesky" family="brands" label="Share on Bluesky" href="#" target="_blank"></wa-icon-button>
        <span class="wa-caption-s">Bluesky</span>
      </span>
      <span class="wa-align-items-center wa-stack wa-gap-2xs">
        <wa-icon-button style="font-size: var(--wa-font-size-2xl);" name="linkedin" family="brands" label="Share on LinkedIn" href="#" target="_blank"></wa-icon-button>
        <span class="wa-caption-s">LinkedIn</span>
      </span>
      <span class="wa-align-items-center wa-stack wa-gap-2xs">
        <wa-icon-button style="font-size: var(--wa-font-size-2xl);" name="envelope-open" label="Share with email" href="#" target="_blank"></wa-icon-button>
        <span class="wa-caption-s">Email</span>
      </span>
    </div>
    </div>
    <div>
        <h3>Related Articles</h3>
          <wa-carousel navigation pagination slides-per-page="2" slides-per-move="2">
  <wa-carousel-item style="background: red;">Slide 1</wa-carousel-item>
  <wa-carousel-item style="background: orange;">Slide 2</wa-carousel-item>
  <wa-carousel-item style="background: yellow;">Slide 3</wa-carousel-item>
  <wa-carousel-item style="background: green;">Slide 4</wa-carousel-item>
  <wa-carousel-item style="background: blue;">Slide 5</wa-carousel-item>
  <wa-carousel-item style="background: purple;">Slide 6</wa-carousel-item>
</wa-carousel>
    </div>
  

</div>
```