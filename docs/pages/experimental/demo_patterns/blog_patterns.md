---
meta:
  title: Blog patterns
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

# Blog Post Patterns

## Overflowing Hero

```html:preview
<div class="wa:overflowing_hero">
  <div class="wa:arrange wa:background:brand_spot_gradient">
    <div>
      <div class="wa:arrange:flex:justify-space_between:gap-s">
        <small><wa-format-date month="long" year="numeric"></wa-format-date></small>
        <wa-badge variant="neutral">Design</wa-badge>
      </div>
      <h1>Pantone's Color of the Year 2024</h1>
      <p>PANTONE 13-1023 Peach Fuzz has our new year starting off with lots of warm and fuzzies.</p>
      <div class="wa:arrange:flex:gap-s">
        <wa-avatar label="User avatar" style="--size: 2rem;"></wa-avatar>
        <small>Author</small>
      </div>
    </div>
    <div class="wa:frame:square">
      <img src="https://bit.ly/3Irq42Q" alt="Vast, peach-colored desert">
    </div>
  </div>
</div>
```

## Post Body with Drop Cap

```html:preview
<div class="wa:blog_post wa:block-flow:3xl">
  <div class="wa:blog_post:body wa:block-flow:xl">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>
</div>
```

## Footer with Reactions

```html:preview
<wa-divider></wa-divider>
<div class="wa:blog_post:footer wa:arrange:flex:justify-space_between">
  <wa-radio-group name="reactions" class="wa:reaction_group">
    <wa-radio-button value="applaud"><wa-icon name="hands-clapping" label="Applaud"></wa-icon><small class="wa:count">74</small></wa-radio-button>
    <wa-radio-button value="love"><wa-icon name="heart" label="Love"></wa-icon><small class="wa:count">161</small></wa-radio-button>
    <wa-radio-button value="laugh"><wa-icon name="face-laugh-beam" label="Laugh"></wa-icon><small class="wa:count">9</small></wa-radio-button>
    <wa-radio-button value="cry"><wa-icon name="face-sad-tear" label="Cry"></wa-icon><small class="wa:count">1</small></wa-radio-button>
  </wa-radio-group>
  <div class="wa:arrange:flex:nowrap:gap-l">
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
<div class="wa:arrange:flex:nowrap:gap-s">
  <wa-avatar label="User avatar"></wa-avatar>
  <wa-textarea class="wa:fill_space" rows="1" placeholder="Add a comment"></wa-textarea>
</div>
```

## Comment

```html:preview
<div class="wa:comment wa:arrange:flex:nowrap:align-start:gap-s">
  <wa-avatar image="https://bit.ly/3V9kV7a" label="User avatar"></wa-avatar>
  <div class="wa:fill_space">
    <div class="wa:chat_bubble">
      <div class="wa:arrange:flex:justify-space_between">
        <strong>Pedro Pascal</strong>
        <small>1d</small>
      </div>
      <span>You expect me to search the galaxy for the home of this creature and deliver it to a race of enemy sorcerers?</span>
    </div>
    <div class="wa:arrange:flex:gap-m">
      <div class="wa:reaction_single wa:arrange:flex:nowrap:gap-3xs">
        <wa-icon-button name="thumbs-up" label="Like"></wa-icon-button>
        <small>(3)</small>
      </div>
      <wa-button variant="text" size="small">Reply</wa-button>
    </div>
  </div>
</div>
```

## Call to Action

```html:preview
<div class="wa:blog:cta wa:arrange:gap-m">
  <div class="wa:block-flow:s">
    <h2><strong>Don't miss a thing.</strong></h2>
    <p>Subscribe to receive the latest posts in your inbox.</p>
  </div>
  <div class="wa:arrange:flex:gap-s">
    <wa-input class="wa:fill_space" type="email" placeholder="your@email.com">
      <wa-icon name="envelope" variant="regular" label="email" slot="prefix"></wa-icon>
    </wa-input>
    <wa-button variant="brand">Subscribe</wa-button>
  </div>
</div>
```

## Recommended Posts

```html:preview
<div class="wa:blog:recommended">
  <div class="wa:block-flow:xl">
    <h2>You may also like</h2>
    <div class="wa:arrange:size-s">
      <div class="wa:block-flow:xs">
        <div class="wa:frame:landscape">
          <img src="http://bit.ly/49ThK7O" alt="">
        </div>
        <div>
          <small><wa-format-date date="2023-12-16T09:17:00-04:00" month="long" year="numeric"></wa-format-date></small>
        </div>
        <h4>Eget Consequat Libero</h4>
      </div>
      <div class="wa:block-flow:xs">
        <div class="wa:frame:landscape">
          <img src="https://bit.ly/3wHdFFp" alt="">
        </div>
        <div>
          <small><wa-format-date date="2023-12-16T09:17:00-04:00" month="long" year="numeric"></wa-format-date></small>
        </div>
        <h4>Sed a Leo Tempus</h4>
      </div>
      <div class="wa:block-flow:xs">
        <div class="wa:frame:landscape">
          <img src="https://bit.ly/49LxbPx" alt="">
        </div>
        <div>
          <small><wa-format-date date="2023-12-16T09:17:00-04:00" month="long" year="numeric"></wa-format-date></small>
        </div>
        <h4>Ultrices Posuere Cubilia Curae</h4>
      </div>
    </div>
  </div>
</div>
```
