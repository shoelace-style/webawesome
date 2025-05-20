---
title: Incentives
description: 'Encourage shoppers to buy your products with value propositions, discounts, and promotions.'
isPro: true
---

## 3 Column

```html {.example}
<div class="wa-gap-3xl wa-stack" style="max-width: 960px; margin: 0 auto;">
  <div class="wa-align-items-center wa-grid">
    <div>
      <span class="wa-heading-xl">Unlock your Superpower</span>
      <p class="wa-caption-l">
        Web development is like a superpower—you can turn your ideas into actual products online, and learning it from
        home means you don’t need a fancy degree or expensive tuition to start building your future.
      </p>
    </div>
    <div class="wa-frame wa-border-radius-l">
      <img
        src="https://images.unsplash.com/photo-1551981878-4c70c3e64135?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </div>
  </div>
  <div class="wa-grid">
    <div class="wa-stack wa-gap-xs">
      <wa-icon name="briefcase" variant="light" style="font-size: 32px;"></wa-icon>
      <span class="wa-heading-s">Career Opportunities</span>
      <p class="wa-caption-m">
        Mastering web development can lead to high-paying jobs, freelancing gigs, or even launching your own business or
        app.
      </p>
    </div>
    <div class="wa-stack wa-gap-xs">
      <wa-icon name="laptop-code" variant="light" style="font-size: 32px;"></wa-icon>
      <span class="wa-heading-s">Flexibility of Online Learning</span>
      <p class="wa-caption-m">
        Perfect for people balancing school, work, or other responsibilities—no need to attend in-person classes
      </p>
    </div>
    <div class="wa-stack wa-gap-xs">
      <wa-icon name="palette" variant="light" style="font-size: 32px;"></wa-icon>
      <span class="wa-heading-s">Creative & Practical Skillset</span>
      <p class="wa-caption-m">
        You can build real, functional things like personal portfolios, blogs, or web apps—and immediately see your
        progress.
      </p>
    </div>
  </div>
</div>
```

## 2 Column with Cards

```html {.example}
<div class="wa-grid" style="--min-column-size: 24ch;">
  <wa-card>
    <div class="wa-flank">
      <div>
        <wa-icon name="hands" style="font-size: 2.5rem;"></wa-icon>
      </div>
      <div class="wa-gap-s wa-stack">
        <span class="wa-heading-m">Hands-on training</span>
        <p class="wa-caption-l">Upskill effectively with AI-powered coding exercises, practice tests, and quizzes.</p>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank">
      <div>
        <wa-icon name="medal" style="font-size: 2.5rem;"></wa-icon>
      </div>
      <div class="wa-gap-s wa-stack">
        <span class="wa-heading-m">Certification prep</span>
        <p class="wa-caption-l">
          Prep for industry-recognized certifications by solving real-world challenges and earn badges along the way
        </p>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank">
      <div>
        <wa-icon name="chart-line" style="font-size: 2.5rem;"></wa-icon>
      </div>
      <div class="wa-gap-s wa-stack">
        <div class="wa-split wa-gap-2xs">
          <span class="wa-heading-m">Insights and analytics</span>
          <wa-badge appearance="filled outlined" variant="warning">Pro Plan</wa-badge>
        </div>
        <p class="wa-caption-l">
          Fast-track goals with advanced insights plus a dedicated customer success team to help drive effective
          learning.
        </p>
      </div>
    </div>
  </wa-card>
  <wa-card>
    <div class="wa-flank">
      <div>
        <wa-icon name="puzzle-piece" style="font-size: 2.5rem;"></wa-icon>
      </div>
      <div class="wa-gap-s wa-stack">
        <div class="wa-split wa-gap-2xs">
          <span class="wa-heading-m">Customizable content</span>
          <wa-badge appearance="filled outlined" variant="warning">Pro Plan</wa-badge>
        </div>
        <p class="wa-caption-l">
          Create tailored learning paths for team and organization goals and even host your own content and resources.
        </p>
      </div>
    </div>
  </wa-card>
</div>
```

## 4 Column

```html {.example}
<div>
  <div class="wa-grid" style="--min-column-size: 16ch;">
    <div class="wa-stack wa-gap-xs">
      <wa-icon family="duotone" name="magnifying-glass" style="font-size: var(--wa-font-size-2xl);"></wa-icon>
      <span class="wa-heading-s">In-Demand Skills</span>
      <p class="wa-caption-m">Learn skills that lead to well-paying jobs, freelance work, or remote opportunities.</p>
    </div>
    <div class="wa-stack wa-gap-xs">
      <wa-icon family="duotone" name="chalkboard-user" style="font-size: var(--wa-font-size-2xl);"></wa-icon>
      <span class="wa-heading-s">Learn Anytime, Anywhere</span>
      <p class="wa-caption-m">
        Flexible learning fits into any schedule—perfect for students, parents, or full-time workers.
      </p>
    </div>
    <div class="wa-stack wa-gap-xs">
      <wa-icon family="duotone" name="people-arrows" style="font-size: var(--wa-font-size-2xl);"></wa-icon>
      <span class="wa-heading-s">Build and Launch Your Own Projects</span>
      <p class="wa-caption-m">You’re not just learning theory—you’re creating real, functional websites and apps.</p>
    </div>
    <div class="wa-stack wa-gap-xs">
      <wa-icon family="duotone" name="code" style="font-size: var(--wa-font-size-2xl);"></wa-icon>
      <span class="wa-heading-s">Low-Cost Entry</span>
      <p class="wa-caption-m">You don’t need a tech degree or expensive tools to get started</p>
    </div>
  </div>
</div>
```
