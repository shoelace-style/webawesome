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
    padding: initial;
    margin: var(--wa-space-xl);
  }
</style>

# Blog patterns

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

```html:preview
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
