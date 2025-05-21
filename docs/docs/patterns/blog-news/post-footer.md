---
title: Post Footer
description: 'Helps reduce bounce rate and keep users in your content loop.'
parent: blog-news
tags:
---

## Two Column

```html {.example}
<div class="wa-align-items-start wa-flank:end wa-gap-3xl" style="--flank-size: 40ch;">
  <div class="wa-stack">
    <span class="wa-heading-s">More in <a href="#" class="wa-link-plain">Politics</a></span>
    <div class="wa-grid">
      <a href="#" class="wa-stack wa-gap-xs wa-link-plain">
        <div class="wa-frame">
          <img
            src="https://images.unsplash.com/photo-1580128637215-659d70729ad0?q=80&w=4637&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <span class="wa-heading-m">FDR: The President Who Redefined American Leadership</span>
      </a>
      <a href="#" class="wa-stack wa-gap-xs wa-link-plain">
        <div class="wa-frame">
          <img
            src="https://images.unsplash.com/photo-1719310215903-c39aaf139746?q=80&w=3520&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <span class="wa-heading-m">The Rise of Populism: Global Trends and Local Consequences</span>
      </a>
      <a href="#" class="wa-stack wa-gap-xs wa-link-plain">
        <div class="wa-frame">
          <img
            src="https://images.unsplash.com/photo-1587315214098-b132e659dda9?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <span class="wa-heading-m">From Ballots to Blockchain: The Future of Voting Technology</span>
      </a>
      <a href="#" class="wa-stack wa-gap-xs wa-link-plain">
        <div class="wa-frame">
          <img
            src="https://images.unsplash.com/photo-1631540698890-6bfd5d47671a?q=80&w=4000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <span class="wa-heading-m">Why Every Vote Matters in a Democracy</span>
      </a>
      <a href="#" class="wa-stack wa-gap-xs wa-link-plain">
        <div class="wa-frame">
          <img
            src="https://images.unsplash.com/photo-1681810553931-39b5bc2acf3d?q=80&w=3536&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <span class="wa-heading-m">Power and Policy: How Political Agendas Shape Our Everyday Lives</span>
      </a>
      <a href="#" class="wa-stack wa-gap-xs wa-link-plain">
        <div class="wa-frame">
          <img
            src="https://images.unsplash.com/photo-1681810546872-0f0e6eea6206?q=80&w=3617&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <span class="wa-heading-m">Digital Democracy or Data Dystopia? Politics in the Age of Social Media</span>
      </a>
    </div>
  </div>
  <div class="wa-stack">
    <span class="wa-heading-s">Top Stories</span>
    <ul style="list-style-type: none;">
      <li>
        <a href="#" class="wa-stack wa-gap-2xs wa-link-plain">
          <wa-format-date month="long" day="numeric" date="2020-07-15T09:17:00-04:00"></wa-format-date>
          <h1 class="wa-heading-l">Why We Love Getting Lost: The Psychology of Wandering</h1>
        </a>
        <wa-divider></wa-divider>
      </li>
      <li>
        <a href="#" class="wa-stack wa-gap-2xs wa-link-plain">
          <wa-format-date month="long" day="numeric" date="2020-07-08T09:17:00-04:00"></wa-format-date>
          <h1 class="wa-heading-l">You’ve Been Scrolling for Hours: What Doomscrolling Does to Your Brain</h1>
        </a>
        <wa-divider></wa-divider>
      </li>
      <li>
        <a href="#" class="wa-stack wa-gap-2xs wa-link-plain">
          <wa-format-date month="long" day="numeric" date="2020-06-10T09:17:00-04:00"></wa-format-date>
          <h1 class="wa-heading-l">The Salt Myth: What We Get Wrong About Flavor</h1>
        </a>
        <wa-divider></wa-divider>
      </li>
      <li>
        <a href="#" class="wa-stack wa-gap-2xs wa-link-plain">
          <wa-format-date month="long" day="numeric" date="2020-05-09T09:17:00-04:00"></wa-format-date>
          <h1 class="wa-heading-l">Night Owls Unite: The Secret Productivity of the Late-Night Mind</h1>
        </a>
        <wa-divider></wa-divider>
      </li>
    </ul>
  </div>
</div>
```

## With Share buttons and Carousel

```html {.example}
<div class="wa-stack" style="text-align: center;">
  <div class="wa-stack wa-gap-2xl">
    <h3 class="wa-heading-xl">Don't forget to share this post!</h3>
    <div class="wa-cluster" style="justify-content: center;">
      <span class="wa-align-items-center wa-stack wa-gap-2xs">
        <wa-icon-button
          style="font-size: var(--wa-font-size-2xl);"
          name="facebook"
          family="brands"
          label="Share on Facebook"
          href="#"
          target="_blank"
        ></wa-icon-button>
        <span class="wa-caption-s">Facebook</span>
      </span>
      <span class="wa-align-items-center wa-stack wa-gap-2xs">
        <wa-icon-button
          style="font-size: var(--wa-font-size-2xl);"
          name="bluesky"
          family="brands"
          label="Share on Bluesky"
          href="#"
          target="_blank"
        ></wa-icon-button>
        <span class="wa-caption-s">Bluesky</span>
      </span>
      <span class="wa-align-items-center wa-stack wa-gap-2xs">
        <wa-icon-button
          style="font-size: var(--wa-font-size-2xl);"
          name="linkedin"
          family="brands"
          label="Share on LinkedIn"
          href="#"
          target="_blank"
        ></wa-icon-button>
        <span class="wa-caption-s">LinkedIn</span>
      </span>
      <span class="wa-align-items-center wa-stack wa-gap-2xs">
        <wa-icon-button
          style="font-size: var(--wa-font-size-2xl);"
          name="envelope-open"
          label="Share with email"
          href="#"
          target="_blank"
        ></wa-icon-button>
        <span class="wa-caption-s">Email</span>
      </span>
    </div>
  </div>
  <wa-divider></wa-divider>
  <div class="wa-stack">
    <h3 class="wa-heading-xl">Related Articles</h3>
    <wa-carousel navigation pagination slides-per-page="3" slides-per-move="3" style="--aspect-ratio: initial">
      <wa-carousel-item>
        <a href="#" class="wa-link-plain">
          <wa-card with-image>
            <div class="wa-frame:landscape" slot="media">
              <img
                src="https://images.unsplash.com/photo-1490410006060-e1dc82ab0a70?q=80&w=5340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Customer service reps"
              />
            </div>
            <div class="wa-stack wa-gap-xs">
              <wa-format-date
                class="wa-caption-l"
                month="long"
                day="numeric"
                date="2024-06-15T09:17:00-04:00"
              ></wa-format-date>
              <span class="wa-heading-m">Grids with Purpose: Mastering Layout in Web Design</span>
            </div>
          </wa-card>
        </a>
      </wa-carousel-item>
      <wa-carousel-item>
        <a href="#" class="wa-link-plain">
          <wa-card with-image>
            <div class="wa-frame:landscape" slot="media">
              <img
                src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=5231&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Customer service reps"
              />
            </div>
            <div class="wa-stack wa-gap-xs">
              <wa-format-date
                class="wa-caption-l"
                month="long"
                day="numeric"
                date="2024-06-13T09:17:00-04:00"
              ></wa-format-date>
              <span class="wa-heading-m">UI That Feels Right: The Psychology of Good Design</span>
            </div>
          </wa-card>
        </a>
      </wa-carousel-item>
      <wa-carousel-item>
        <a href="#" class="wa-link-plain">
          <wa-card with-image>
            <div class="wa-frame:landscape" slot="media">
              <img
                src="https://images.unsplash.com/photo-1581464668854-0da56c32393c?q=80&w=5340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Customer service reps"
              />
            </div>
            <div class="wa-stack wa-gap-xs">
              <wa-format-date
                class="wa-caption-l"
                month="long"
                day="numeric"
                date="2024-06-12T09:17:00-04:00"
              ></wa-format-date>
              <span class="wa-heading-m">Design Is Never Done: Why Iteration Always Matters</span>
            </div>
          </wa-card>
        </a>
      </wa-carousel-item>
      <wa-carousel-item>
        <a href="#" class="wa-link-plain">
          <wa-card with-image>
            <div class="wa-frame:landscape" slot="media">
              <img
                src="https://images.unsplash.com/photo-1628595351029-c2bf17511435?q=80&w=5232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Customer service reps"
              />
            </div>
            <div class="wa-stack wa-gap-xs">
              <wa-format-date
                class="wa-caption-l"
                month="long"
                day="numeric"
                date="2024-06-11T09:17:00-04:00"
              ></wa-format-date>
              <span class="wa-heading-m">Tiny Details Matter: The Power of Microinteractions</span>
            </div>
          </wa-card>
        </a>
      </wa-carousel-item>
      <wa-carousel-item>
        <a href="#" class="wa-link-plain">
          <wa-card with-image>
            <div class="wa-frame:landscape" slot="media">
              <img
                src="https://images.unsplash.com/photo-1576595580361-90a855b84b20?q=80&w=4032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Customer service reps"
              />
            </div>
            <div class="wa-stack wa-gap-xs">
              <wa-format-date
                class="wa-caption-l"
                month="long"
                day="numeric"
                date="2024-06-10T09:17:00-04:00"
              ></wa-format-date>
              <span class="wa-heading-m">From Wireframe to Wow: Building Functional Design</span>
            </div>
          </wa-card>
        </a>
      </wa-carousel-item>
      <wa-carousel-item>
        <a href="#" class="wa-link-plain">
          <wa-card with-image>
            <div class="wa-frame:landscape" slot="media">
              <img
                src="https://images.unsplash.com/photo-1539541417736-3d44c90da315?q=80&w=5338&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Customer service reps"
              />
            </div>
            <div class="wa-stack wa-gap-xs">
              <wa-format-date
                class="wa-caption-l"
                month="long"
                day="numeric"
                date="2024-06-09T09:17:00-04:00"
              ></wa-format-date>
              <span class="wa-heading-m">Designing with Empathy: Creating for Real People</span>
            </div>
          </wa-card>
        </a>
      </wa-carousel-item>
    </wa-carousel>
  </div>
</div>
```
