---
title: News
description: TODO
layout: page.njk
---

TODO Page Description

## Examples
### Paywall

```html{.example}
<div>
  <wa-dialog label="You've run out of free articles... loser" with-header class="dialog-header">
    <wa-button href="#">Register</wa-button>
  Already a subscriber? <a href="#">Login</a>
</wa-dialog>

<wa-button>Open Paywall</wa-button>

<script>
  const dialog = document.querySelector('.dialog-header');
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener('click', () => dialog.open = true);
</script>

</div>
```
## Related articles
```html{.example}
<div>
  <wa-card>
    <div class="card-body">
      <div style="border-bottom: 1px solid var(--wa-color-surface-border);margin-bottom: 1rem; padding-bottom: 1rem;">
        <img src="https://img.fortawesome.com/cfa83f3c/article-flower.jpg" alt="">
        <h2 style="margin-bottom: var(--wa-space-s);">Title</h2>
        <p style="margin-bottom: var(--wa-space-3xs);">Well, the way they make shows is, they make one show. That show's called a pilot.</p>
      
      <span style="font-size: small;font-weight: 600;font-style: italic;">sub-title</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div>
            <img src="https://img.fortawesome.com/cfa83f3c/article-flower.jpg" alt="">
       
        <p style="margin-bottom: var(--wa-space-3xs);">Normally, both your asses would be dead as fucking fried chicken.</p>
      
      <span style="font-size: small;font-weight: 600;font-style: italic;">sub-title</span>
        </div>
        <div>
            <img src="https://img.fortawesome.com/cfa83f3c/article-flower.jpg" alt="">
       
        <p style="margin-bottom: var(--wa-space-3xs);">Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass.</p>
      
      <span style="font-size: small;font-weight: 600;font-style: italic;">sub-title</span>
        </div>
      </div>
    </div>
  </wa-card>
</div>
```

## Footer 
```html{.example}
<div class="news-footer">
  <div class="container">
  <!-- <div class="logo"> <wa-icon name="user-secret"></wa-icon> <h1 style="--wa-space-xl: 0;">Daily Snoop</h1></div> -->
  <div class="nav">
    <section>
      <h4 style="--wa-space-xl: 0;">News</h4>
      <ul>
      <li><a href="#">U.S.</a></li>
      <li><a href="#">World</a></li>
      <li><a href="#">Politics</a></li>
      <li><a href="#">Education</a></li>
      <li><a href="#">Sports</a></li>
      <li><a href="#">Business</a></li>
      <li><a href="#">Tech</a></li>
      <li><a href="#">Science</a></li>
    </ul>
    </section>
    <section>
      <h4 style="--wa-space-xl: 0;">Arts</h4>
      <ul>
      <li><a href="#">Book Review</a></li>
      <li><a href="#">Dance</a></li>
      <li><a href="#">Movies</a></li>
      <li><a href="#">Pop Culture</a></li>
    </ul>
    </section>
    <section>
      <h4 style="--wa-space-xl: 0;">Contact</h4>
      <ul>
      <li><a href="#">Help Center</a></li>
      <li><a href="#">Contact Us</a></li>
      <li><a href="#">Press</a></li>
      <li><a href="#">Partners</a></li>
    </ul>
    </section>
    <section>
      <h4 style="--wa-space-xl: 0;">Subscriptions</h4>
      <ul class="list">
      <li><a href="#"><wa-icon fixed-width name="game-board-simple"></wa-icon> Crossword</a></li>
      <li><a href="#"><wa-icon fixed-width name="paper-plane"></wa-icon> Newsletters</a></li>
      <li><a href="#"><wa-icon fixed-width name="microphone-lines"></wa-icon> Podcast</a></li>
    </ul>
    </section>
  </div>
  <div class="social" style="margin-bottom: 1rem;">
    <span style="display: inline-block; margin-right: 0.5rem;">Follow us</span>
    <a style="color: var(--wa-color-text-normal);" href="">
      <wa-icon family="brands" name="bluesky"></wa-icon> 
    </a>
    <a style="color: var(--wa-color-text-normal);" href="">
      <wa-icon family="brands" name="instagram"></wa-icon> 
    </a>
    <a style="color: var(--wa-color-text-normal);" href="">
      <wa-icon family="brands" name="facebook"></wa-icon> 
    </a>
    <a style="color: var(--wa-color-text-normal);" href="">
      <wa-icon family="brands" name="mastodon"></wa-icon> 
    </a>
  </div>
  <div style="display: flex; align-items: center;">
    <span style="display: inline-block; margin-right: 0.5rem;">Get the app</span>
    <img style="margin-right: .5rem;" src="https://img.fortawesome.com/cfa83f3c/app_store.svg" alt="">
    <img src="https://img.fortawesome.com/cfa83f3c/google_play.svg" alt="">
  </div>
  <div class="legal">&#169 2024 All rights reserved.</div>
  </div>
</div>
<style>
  .news-footer {
  
    .container {
      max-width: 960px;
      margin: auto;
    }
    .logo {
      display: flex;
      align-items: center;
    }
    .nav {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    .nav ul {
      list-style-type: none;
      margin-left: 0;
    }
    .social a {
      text-decoration: none;
      display: inline-block;
    }
    .social a:not(:last-child) {
      margin-right: 1rem;
    }
    section ul li a {
      display: flex;
      align-items: center;
      text-decoration: none;
      --wa-color-text-link: var(--wa-color-text-normal);

      wa-icon {
        margin-right: .5rem;
      }
    }

    .legal {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--wa-color-surface-border);
    }
  }
</style>
```

## Related articles
```html{.example}
  <div class="related-articles">
    <div class="container">
      <h4>More From...</h4>
      <div class="article-list">
        <wa-card with-image with-footer class="related-article">
          <img slot="image" src="https://img.fortawesome.com/cfa83f3c/scott-graham-5fnmwej4taa-unsplash2.jpg" alt="A kitten sits patiently between a terracotta pot and decorative grasses."/>
          <span style="align-items: center; display: inline-block; margin-bottom: 1rem;">
            <wa-tooltip for="avatar">This is a tooltip</wa-tooltip>
            <wa-avatar style="--size: 2rem;" id="avatar" image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" label="Avatar of a gray tabby kitten looking down"></wa-avatar> 
            <a href="#" style="text-decoration: none; color: var(--wa-color-text-normal)">Andy Kaufman</a> in <a href="#" style="text-decoration: none; color: var(--wa-color-text-normal)">Design Theory</a>
          </span>
          <div><strong>How to make Twitter a real super app without breaking its UX</strong></div>
          <p style="margin-bottom: 0">The buzz around the X super app is deafening. Elon Musk wants to dominate the market with WeChat’s “everything app” strategy.</p>
          <div slot="footer" style="display: flex; align-items: center; ">
            <span style="margin-right: 1rem;">Jan 30</span>
            <span style="margin-right: 1rem;"><wa-icon style="margin-right: .25rem;" fixed-width name="hands-clapping"></wa-icon>394</span>
            <span><wa-icon style="margin-right: .25rem;" fixed-width name="comment"></wa-icon>394</span>
            <wa-icon style="margin-left: auto" fixed-width  name="bookmark"></wa-icon>
          </div>
        </wa-card>
        <wa-card with-image with-footer class="related-article">
          <img slot="image" src="https://img.fortawesome.com/cfa83f3c/scott-graham-5fnmwej4taa-unsplash2.jpg" alt="A kitten sits patiently between a terracotta pot and decorative grasses."/>
          <span style="align-items: center; display: inline-block; margin-bottom: 1rem;">
            <wa-tooltip for="avatar">This is a tooltip</wa-tooltip>
            <wa-avatar style="--size: 2rem;" id="avatar" image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" label="Avatar of a gray tabby kitten looking down"></wa-avatar> 
            <a href="#" style="text-decoration: none; color: var(--wa-color-text-normal)">Andy Kaufman</a> in <a href="#" style="text-decoration: none; color: var(--wa-color-text-normal)">Design Theory</a>
          </span>
          <div><strong>How to make Twitter a real super app without breaking its UX</strong></div>
          <p style="margin-bottom: 0">The buzz around the X super app is deafening. Elon Musk wants to dominate the market with WeChat’s “everything app” strategy.</p>
          <div slot="footer" style="display: flex; align-items: center; ">
            <span style="margin-right: 1rem;">Jan 30</span>
            <span style="margin-right: 1rem;"><wa-icon style="margin-right: .25rem;" fixed-width name="hands-clapping"></wa-icon>394</span>
            <span><wa-icon style="margin-right: .25rem;" fixed-width name="comment"></wa-icon>394</span>
            <wa-icon style="margin-left: auto" fixed-width  name="bookmark"></wa-icon>
          </div>
        </wa-card>
        <wa-card with-image with-footer class="related-article">
          <img slot="image" src="https://img.fortawesome.com/cfa83f3c/scott-graham-5fnmwej4taa-unsplash2.jpg" alt="A kitten sits patiently between a terracotta pot and decorative grasses."/>
          <span style="align-items: center; display: inline-block; margin-bottom: 1rem;">
            <wa-tooltip for="avatar">This is a tooltip</wa-tooltip>
            <wa-avatar style="--size: 2rem;" id="avatar" image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" label="Avatar of a gray tabby kitten looking down"></wa-avatar> 
            <a href="#" style="text-decoration: none; color: var(--wa-color-text-normal)">Andy Kaufman</a> in <a href="#" style="text-decoration: none; color: var(--wa-color-text-normal)">Design Theory</a>
          </span>
          <div><strong>How to make Twitter a real super app without breaking its UX</strong></div>
          <p style="margin-bottom: 0">The buzz around the X super app is deafening. Elon Musk wants to dominate the market with WeChat’s “everything app” strategy.</p>
          <div slot="footer" style="display: flex; align-items: center; ">
            <span style="margin-right: 1rem;">Jan 30</span>
            <span style="margin-right: 1rem;"><wa-icon style="margin-right: .25rem;" fixed-width name="hands-clapping"></wa-icon>394</span>
            <span><wa-icon style="margin-right: .25rem;" fixed-width name="comment"></wa-icon>394</span>
            <wa-icon style="margin-left: auto" fixed-width  name="bookmark"></wa-icon>
          </div>
        </wa-card>
        <wa-card with-image with-footer class="related-article">
          <img slot="image" src="https://img.fortawesome.com/cfa83f3c/scott-graham-5fnmwej4taa-unsplash2.jpg" alt="A kitten sits patiently between a terracotta pot and decorative grasses."/>
          <span style="align-items: center; display: inline-block; margin-bottom: 1rem;">
            <wa-tooltip for="avatar">This is a tooltip</wa-tooltip>
            <wa-avatar style="--size: 2rem;" id="avatar" image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" label="Avatar of a gray tabby kitten looking down"></wa-avatar> 
            <a href="#" style="text-decoration: none; color: var(--wa-color-text-normal)">Andy Kaufman</a> in <a href="#" style="text-decoration: none; color: var(--wa-color-text-normal)">Design Theory</a>
          </span>
          <div><strong>How to make Twitter a real super app without breaking its UX</strong></div>
          <p style="margin-bottom: 0">The buzz around the X super app is deafening. Elon Musk wants to dominate the market with WeChat’s “everything app” strategy.</p>
          <div slot="footer" style="display: flex; align-items: center; ">
            <span style="margin-right: 1rem;">Jan 30</span>
            <span style="margin-right: 1rem;"><wa-icon style="margin-right: .25rem;" fixed-width name="hands-clapping"></wa-icon>394</span>
            <span><wa-icon style="margin-right: .25rem;" fixed-width name="comment"></wa-icon>394</span>
            <wa-icon style="margin-left: auto" fixed-width  name="bookmark"></wa-icon>
          </div>
        </wa-card>
      </div>
    </div>
  </div>
  <style>
    .related-articles {
      .article-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(30ch, 100%), 1fr));
        gap: 1rem;
      }
      .container {
        max-width: 960px;
        margin: auto;
      }
    }
  </style>
```