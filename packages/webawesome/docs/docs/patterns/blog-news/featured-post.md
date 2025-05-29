---
title: Featured Post
description: 'Highlight important, timely, or high-impact content.'
parent: blog-news
tags:
---

## Single Column

```html {.example}
<div class="wa-stack wa-gap-2xl" style="max-width: 90ch; margin: 0 auto;">
  <article class="wa-stack">
    <div class="wa-grid wa-gap-2xl">
      <div class="wa-frame wa-border-radius-l">
        <img
          src="https://images.unsplash.com/photo-1673255745677-e36f618550d1?q=80&w=5000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Futuristic humanoid robot holding a metallic brain in its right hand"
        />
      </div>
      <div class="wa-stack">
        <span><a href="#">Catherine Rigby</a> wrote</span>
        <h2 class="wa-heading-3xl">How Artificial Intelligence Is Quietly Transforming Your Daily Life</h2>
        <span>
          <wa-format-date month="long" day="numeric" year="numeric"></wa-format-date> in
          <a href="#">Artificial Intelligence</a>, <a href="#">Large Language Model</a>,
          <a href="#">Machine Learning</a>
        </span>
      </div>
    </div>
    <p>From your morning playlist to your grocery list, AI is everywhere—and you might not even notice it.</p>
    <wa-button href="#" appearance="filled" variant="brand">
      Continue reading
      <wa-icon name="arrow-right" slot="suffix"></wa-icon>
    </wa-button>
  </article>
  <wa-divider></wa-divider>
  <article class="wa-stack">
    <span>
      <a href="#">Freddie Smith</a><wa-format-date month="long" day="numeric" year="numeric"></wa-format-date> in
      <a href="#">Artificial Intelligence</a>, <a href="#">Large Language Model</a>,
      <a href="#">Machine Learning</a>
    </span>
    <div class="wa-flank">
      <wa-avatar
        image="https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=80&w=3178&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        label="Avatar of author"
      ></wa-avatar>
      <h2 class="wa-heading-l">What Generative AI Means for Creativity, Work, and the Future of Content</h2>
    </div>
  </article>
  <wa-divider></wa-divider>
  <article class="wa-stack">
    <span>
      <a href="#">Michelle Starling</a><wa-format-date month="long" day="numeric" year="numeric"></wa-format-date> in
      <a href="#">Artificial Intelligence</a>, <a href="#">Large Language Model</a>,
      <a href="#">Machine Learning</a>
    </span>
    <div class="wa-flank">
      <wa-avatar
        image="https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=4000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        label="Avatar of author"
      ></wa-avatar>
      <h2 class="wa-heading-l">The Ethics of Intelligence: Who’s Accountable When AI Gets It Wrong</h2>
    </div>
  </article>
</div>
```

## Two Column

```html {.example}
<div style="max-width: 84ch; margin: 0 auto;">
  <div class="wa-gap-3xl wa-grid">
    <div class="wa-stack">
      <div class="wa-frame wa-border-radius-l">
        <img
          src="https://images.unsplash.com/photo-1741208296373-27b4438d0654?q=80&w=2794&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
      <div>
        <h2 class="wa-heading-l">Masters and Movements: A Journey Through Art History’s Most Defining Eras</h2>
        <p class="wa-caption-l">
          Discover the pivotal artists, styles, and moments that shaped the world of fine art—from the Renaissance to
          the rise of modernism.
        </p>
        <span class="wa-cluster">
          <a href="#">Stephanie Howard</a>
          <wa-format-date month="long" day="numeric" date="2020-07-15T09:17:00-04:00"></wa-format-date> |
          <wa-icon name="comment"></wa-icon> 3
        </span>
      </div>
    </div>
    <div class="wa-stack">
      <span>Top Stories</span>
      <ol class="wa-stack">
        <li class="wa-stack">
          <div class="wa-flank:end" style="--flank-size: 8ch">
            <h3 class="wa-heading-m">How Fine Art Captures Emotion Beyond Words</h3>
            <div class="wa-frame wa-border-radius-m">
              <img
                src="https://images.unsplash.com/photo-1717501219402-4444fcef55e7?q=80&w=4096&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="article thumbnail"
              />
            </div>
          </div>
          <span class="wa-cluster">
            <a href="#">Emma Wilson</a>
            <wa-format-date month="long" day="numeric" date="2020-05-15T09:17:00-04:00"></wa-format-date> |
            <wa-icon name="comment"></wa-icon> 20
          </span>
        </li>
        <wa-divider></wa-divider>
        <li class="wa-stack wa-gap-2xs">
          <div class="wa-flank:end" style="--flank-size: 8ch">
            <h3 class="wa-heading-m">From Brush to Pixel: The Evolving Identity of Fine Art in the Digital Age</h3>
            <div class="wa-frame wa-border-radius-m">
              <img
                src="https://images.unsplash.com/photo-1697560415980-8cc04e055cdb?q=80&w=3600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="article thumbnail"
              />
            </div>
          </div>
          <span class="wa-cluster">
            <a href="#">Eddie Kane</a>
            <wa-format-date month="long" day="numeric" date="2020-04-15T09:17:00-04:00"></wa-format-date> |
            <wa-icon name="comment"></wa-icon> 12
          </span>
        </li>
        <wa-divider></wa-divider>
        <li class="wa-stack wa-gap-2xs">
          <div class="wa-flank:end" style="--flank-size: 8ch">
            <h3 class="wa-heading-m">What Makes It ‘Fine’? Unpacking the Line Between Art and Craft</h3>
            <div class="wa-frame wa-border-radius-m">
              <img
                src="https://images.unsplash.com/photo-1738533614668-0a1a2501a138?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="article thumbnail"
              />
            </div>
          </div>
          <span class="wa-cluster">
            <a href="#">Gill Scott</a>
            <wa-format-date month="long" day="numeric" date="2020-03-20T09:17:00-04:00"></wa-format-date> |
            <wa-icon name="comment"></wa-icon> 8
          </span>
        </li>
        <wa-divider></wa-divider>
        <li class="wa-stack wa-gap-2xs">
          <div class="wa-flank:end" style="--flank-size: 8ch">
            <h3 class="wa-heading-m">Studio Stories: Inside the Creative Rituals of Contemporary Fine Artists</h3>
            <div class="wa-frame wa-border-radius-m">
              <img
                src="https://images.unsplash.com/photo-1600999116700-5a50973983e8?q=80&w=2292&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="article thumbnail"
              />
            </div>
          </div>
          <span class="wa-cluster">
            <a href="#">Festus Armond</a>
            <wa-format-date month="long" day="numeric" date="2020-02-20T09:17:00-04:00"></wa-format-date> |
            <wa-icon name="comment"></wa-icon> 16
          </span>
        </li>
      </ol>
    </div>
  </div>
</div>
```
