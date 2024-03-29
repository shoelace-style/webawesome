---
meta:
  title: Patterns List
  description: TBD
toc: false
---

<style>
  :root {
    --docs-content-max-width: 72rem;
  }
  #menu-toggle,
  #sidebar {
    display: none;
  }
  main {
    margin: var(--wa-space-xl);
  }
  h2:not(.code-preview h2) {
    font-size: large;
  }
</style>

# Blog Patterns

## Overflowing Hero

```html:preview
<section class="wa:blog-hero-overflowing">
  <div class="wa:hero-backdrop">
    <div class="wa:hero-content">
      <div class="wa:post-details">
        <wa-format-date month="long" year="numeric"></wa-format-date>
        <wa-tag size="small">Design</wa-tag>
      </div>
      <h1>Pantone's Color of the Year 2024</h1>
      <p>PANTONE 13-1023 Peach Fuzz has our new year starting off with lots of warm and fuzzies.</p>
      <div class="wa:post-author">
        <wa-avatar label="User avatar" style="--size: 2rem;"></wa-avatar>
        <small>Jane Doe</small>
      </div>
    </div>
    <div class="wa:frame:square">
      <img src="https://bit.ly/3Irq42Q" alt="Vast, peach-colored desert">
    </div>
  </div>
</section>
```

## Post Body with Drop Cap

```html:preview
<section class="wa:blog-post">
  <div class="wa:post-body">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>
</section>
```

## Footer with Reactions

```html:preview
<wa-divider></wa-divider>
<div class="wa:post-footer">
  <wa-radio-group name="reactions" class="wa:post-reactions">
    <wa-radio-button value="applaud"><wa-icon name="hands-clapping" label="Applaud"></wa-icon><small class="wa:count">74</small></wa-radio-button>
    <wa-radio-button value="love"><wa-icon name="heart" label="Love"></wa-icon><small class="wa:count">161</small></wa-radio-button>
    <wa-radio-button value="laugh"><wa-icon name="face-laugh-beam" label="Laugh"></wa-icon><small class="wa:count">9</small></wa-radio-button>
    <wa-radio-button value="cry"><wa-icon name="face-sad-tear" label="Cry"></wa-icon><small class="wa:count">1</small></wa-radio-button>
  </wa-radio-group>
  <div class="wa:post-actions">
    <wa-tooltip content="Save">
      <wa-icon-button name="bookmark" label="Save"></wa-icon-button>
    </wa-tooltip>
    <wa-tooltip content="Share">
      <wa-icon-button name="share-from-square" label="Share"></wa-icon-button>
    </wa-tooltip>
  </div>
</div>
```

## Comment Field

```html:preview
<article class="wa:comment-composer">
  <wa-avatar label="User avatar"></wa-avatar>
  <wa-textarea rows="1" placeholder="Add a comment"></wa-textarea>
</article>
```

## Comment

```html:preview
<article class="wa:comment">
  <wa-avatar image="https://bit.ly/3V9kV7a" label="User avatar"></wa-avatar>
  <div class="wa:comment-content">
    <div class="wa:comment-bubble">
      <div class="wa:comment-details">
        <strong>Pedro Pascal</strong>
        <small>1d</small>
      </div>
      <span>You expect me to search the galaxy for the home of this creature and deliver it to a race of enemy sorcerers?</span>
    </div>
    <div class="wa:comment-actions">
      <div class="wa:reaction-like">
        <wa-icon-button name="thumbs-up" label="Like"></wa-icon-button>
        <small>(3)</small>
      </div>
      <wa-button variant="text" size="small">Reply</wa-button>
    </div>
  </div>
</article>
```

## Call to Action

```html:preview
<section class="wa:blog-subscribe-cta">
  <div class="wa:cta-description">
    <h2><strong>Don't miss a thing.</strong></h2>
    <p>Subscribe to receive the latest posts in your inbox.</p>
  </div>
  <form>
    <wa-input type="email" placeholder="your@email.com">
      <wa-icon name="envelope" variant="regular" label="email" slot="prefix"></wa-icon>
    </wa-input>
    <wa-button type="submit" variant="brand">Subscribe</wa-button>
  </form>
</section>
```

## Recommended Posts

```html:preview
<section class="wa:blog-recommended-posts">
  <h2>You may also like</h2>
  <div class="wa:post-list">
    <article class="wa:post-link">
      <div class="wa:frame:landscape">
        <img src="http://bit.ly/49ThK7O" alt="">
      </div>
      <div class="wa:post-details">
        <wa-format-date date="2024-02-16T09:17:00-04:00" month="long" year="numeric"></wa-format-date>
        <wa-tag size="small">Arts & Culture</wa-tag>
      </div>
      <h4>Eget Consequat Libero</h4>
    </article>
    <article class="wa:post-link">
      <div class="wa:frame:landscape">
        <img src="https://bit.ly/3wHdFFp" alt="">
      </div>
      <div class="wa:post-details">
        <wa-format-date date="2024-01-16T09:17:00-04:00" month="long" year="numeric"></wa-format-date>
        <wa-tag size="small">Design</wa-tag>
      </div>
      <h4>Sed a Leo Tempus Aute Irure</h4>
    </article>
    <article class="wa:post-link">
      <div class="wa:frame:landscape">
        <img src="https://bit.ly/49LxbPx" alt="">
      </div>
      <div class="wa:post-details">
        <wa-format-date date="2023-12-16T09:17:00-04:00" month="long" year="numeric"></wa-format-date>
        <wa-tag size="small">Arts & Culture</wa-tag>
      </div>
      <h4>Ultrices Posuere Cubilia Curae</h4>
    </article>
  </div>
</section>
```
