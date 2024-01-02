---
meta:
  title: Blog Listing
  description: TODO
toc: false
---

<div class="wa:block-flow:3xl">
  <div class="wa:grid:aside-end" style="--wa-grid-size: 45ch;">
    <div class="wa:block-flow:m">
      <div class="wa:frame">
        <img src="https://images.pexels.com/photos/6550721/pexels-photo-6550721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="">
      </div>
      <div class="wa:flex:fill">
        <small><wa-format-date month="long" year="numeric"></wa-format-date></small>
        <wa-badge>Design</wa-badge>
      </div>
      <h1>Pantone's Color of the Year 2024</h1>
      <p>PANTONE 13-1023 Peach Fuzz has our new year starting off with lots of warm and fuzzies.</p>
      <div class="wa:inline-flow:s">
        <wa-avatar label="User avatar" style="--size: 2rem;"></wa-avatar>
        <div class="wa:product-reviews:attribution">
          <div class="wa:inline-flow:s">
            <strong>Author</strong>
          </div>
        </div>
      </div>
    </div>
    <div class="wa:grid">
      <div class="wa:grid:side-by-side:gap-s">
        <div class="wa:block-flow:xs">
          <small><wa-format-date date="2023-12-16T09:17:00-04:00" month="long" year="numeric"></wa-format-date></small>
          <h4>Lorem Ipsum Dolor Sit Amet</h4>
        </div>
        <div class="wa:frame">
          <img src="https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="">
        </div>
      </div>
      <div class="wa:grid:side-by-side:gap-s">
        <div class="wa:block-flow:xs">
          <small><wa-format-date date="2023-11-16T09:17:00-04:00" month="long" year="numeric"></wa-format-date></small>
          <h4>Consectetur Adipiscing Elit</h4>
        </div>
        <div class="wa:frame">
          <img src="https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="">
        </div>
      </div>
      <div class="wa:grid:side-by-side:gap-s">
        <div class="wa:block-flow:xs">
          <small><wa-format-date date="2023-11-16T09:17:00-04:00" month="long" year="numeric"></wa-format-date></small>
          <h4>Nunc Rhoncus Enim Ligula</h4>
        </div>
        <div class="wa:frame">
          <img src="https://images.pexels.com/photos/14822510/pexels-photo-14822510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="">
        </div>
      </div>
      <div class="wa:grid:side-by-side:gap-s">
        <div class="wa:block-flow:xs">
          <small><wa-format-date date="2023-10-16T09:17:00-04:00" month="long" year="numeric"></wa-format-date></small>
          <h4>Donec Quis Tincidunt Massa</h4>
        </div>
        <div class="wa:frame">
          <img src="https://images.pexels.com/photos/7988116/pexels-photo-7988116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="">
        </div>
      </div>
    </div>
  </div>
  <div class="wa:grid:gap-m" style="background-color:var(--wa-color-brand-fill-subtle); padding:var(--wa-space-3xl); border-radius:var(--wa-panel-corners); box-shadow:var(--wa-shadow-level-1);">
    <div class="wa:block-flow:s">
      <h2 style="color:var(--wa-color-brand-text-on-fill)"><strong>Don't miss a thing.</strong></h2>
      <p style="color:var(--wa-color-neutral-text-on-fill)">Subscribe to receive the latest posts in your inbox.</p>
    </div>
    <div class="wa:flex:fill">
      <wa-input type="email" placeholder="your@email.com" style="flex:1 1 auto;">
        <wa-icon name="envelope" variant="regular" label="email" slot="prefix"></wa-icon>
      </wa-input>
      <wa-button variant="brand">Subscribe</wa-button>
    </div>
  </div>
</div>

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
