---
title: Blog
description: TODO
unlisted: true
isPro: true
---

TODO Page Description

## Examples

### Hero
```html{.example}
<wa-carousel pagination>
  <wa-carousel-item>
    <a href="#" class="hero-link">
      <div style="background: #fe53a0;">

      </div>
      <div style="background: gray;">
        <img
      alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
      src="/assets/examples/carousel/blog-carousel-5.jpg"
    />
      </div>
      <h2><span>Do you see any Teletubbies in here?</span></h2>
    </a>
  </wa-carousel-item>
  <wa-carousel-item>
    <a href="#" class="hero-link">
      <div style="background: #5a90f3;">

      </div>
      <div style="background: gray;">
        <img
      alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
      src="/assets/examples/carousel/blog-carousel-1.jpg"
    />
      </div>
      <h2><span>The path of the righteous man is beset on all sides</span></h2>
    </a>
  </wa-carousel-item>
  <wa-carousel-item>
    <a href="#" class="hero-link">
      <div style="background: #8c431e;">

      </div>
      <div style="background: gray;">
        <img
      alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
      src="/assets/examples/carousel/blog-carousel-2.jpg"
    />
      </div>
      <h2><span>Article Title</span></h2>
    </a>
  </wa-carousel-item>
  <wa-carousel-item>
    <a href="#" class="hero-link">
      <div style="background: #37b3e6;">

      </div>
      <div style="background: gray;">
        <img
      alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
      src="/assets/examples/carousel/blog-carousel-3.jpg"
    />
      </div>
      <h2><span>Article Title</span></h2>
    </a>
  </wa-carousel-item>
  <wa-carousel-item>
    <a href="#" class="hero-link">
      <div style="background: #f993d6;">

      </div>
      <div style="background: gray;">
        <img
      alt="A waterfall in the middle of a forest (by Thomas Kelly on Unsplash)"
      src="/assets/examples/carousel/blog-carousel-4.jpg"
    />
      </div>
      <h2><span>Article Title</span></h2>
    </a>
  </wa-carousel-item>

</wa-carousel>
<style>
  .hero-link {
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;

    h2 {
      position: absolute;
      color: white;
      top: 25%;
      left: 15%;
      width: 200px;
      padding: .5rem;
      line-height: 1.15;

      span {
        background-color: black;
      }
    }

    div:first-of-type {
      width: 30%;
    }
    div:last-of-type {
      width: 70%;
    }
  }
</style>
```

### Newsletter signup
```html{.example}
<wa-card class="news-letter-signup">
  <h2>Subscribe to our Newsletter</h2>
  <p>To get the latest and most quality design resources</p>
  <div class="subscribe-input"> <wa-input></wa-input><wa-button>Subscribe</wa-button></div>
</wa-card>
<style>
  .news-letter-signup {
        display: block;
    width: fit-content;
    margin: 0 auto;
  }
  .subscribe-input {
    display: flex;
    width: 100%;

    wa-input {
      width: inherit;
    }

    wa-button {
      margin-left: 0.5rem;
    }
  }
</style>
```

### Posts List
```html{.example}
<wa-card>
  <div slot="header">
    Recent Articles
  </div>
  <div class="body">
    <div class="post-list">
      <div class="post-list-item" style="display: flex; align-items: center;">
        <img src="/assets/images/patterns/flower-crop-1.jpg" />
        <div class="post-list-item-info" style="display: flex;flex-direction: column;">
          <span style="font-size: small;"> <wa-icon fixed-width name="mug-hot"></wa-icon> Lifestyle</span>
          <span style="font-size: larger;font-weight: 600;">Your bones don't break</span>
          <span style="font-size: small;font-style: italic; font-weight: 600; color: var(--wa-color-text-quiet)">Jules</span>
        </div>
      </div>
      <div class="post-list-item" style="display: flex; align-items: center; flex-direction: row-reverse;justify-content: flex-end">
        <img class="last" src="/assets/images/patterns/flower-crop-2.jpg" />
        <div class="post-list-item-info" style="display: flex;flex-direction: column; margin-right: 1rem;">
          <span style="font-size: small;"><wa-icon fixed-width name="user-nurse"> </wa-icon>Health</span>
          <span style="font-size: larger;font-weight: 600;">That's clear. Your cells react to bacteria</span>
          <span style="font-size: small;font-style: italic; font-weight: 600; color: var(--wa-color-text-quiet)">Mr. Glass</span>
        </div>
      </div>
      <div  class="post-list-item" style="display: flex; align-items: center; flex-direction: row-reverse;justify-content: flex-end">
        <img style="display:none;" src="#"/>
        <div class="post-list-item-info" style="display: flex;flex-direction: column;">
          <span style="font-size: small;"><wa-icon fixed-width name="football"></wa-icon> Sports</span>
          <span style="font-size: larger;font-weight: 600;">Do you see any Teletubbies in here?</span>
          <span style="font-size: small;font-style: italic; font-weight: 600; color: var(--wa-color-text-quiet)">Nick Fury</span>
        </div>
      </div>
      <div class="post-list-item" style="display: flex; align-items: center;">
        <img src="/assets/images/patterns/flower-crop-3.jpg" />
        <div class="post-list-item-info" style="display: flex;flex-direction: column;">
          <span style="font-size: small;">Lifestyle</span>
          <span style="font-size: larger;font-weight: 600;">Your bones don't break</span>
          <span style="font-size: small;font-style: italic; font-weight: 600; color: var(--wa-color-text-quiet)">Jules</span>
        </div>
      </div>
      <div class="post-list-item" style="display: flex; align-items: center;">
        <img src="/assets/images/patterns/flower-crop-1.jpg" />
        <div class="post-list-item-info" style="display: flex;flex-direction: column;">
          <span style="font-size: small;">Lifestyle</span>
          <span style="font-size: larger;font-weight: 600;">Your bones don't break</span>
          <span style="font-size: small;font-style: italic; font-weight: 600; color: var(--wa-color-text-quiet)">Jules</span>
        </div>
      </div>
    </div>
  </div>
</wa-card>
<style>
  .post-list {
    .post-list-item {
      border-bottom: 1px solid var(--wa-color-surface-border);
      margin-bottom: 1rem;
      padding-bottom: 1rem;

      img {
        margin-right: 1rem;
        object-fit: cover;
        min-width: 50px;
        min-height: 50px;
        width: 100px;
        height: 100px;
        border-radius: var(--wa-border-radius-circle);
      }
      img.last {
        margin-right: 0;
      }

      .post-list-item-info span:first-of-type {
        display: flex;
        align-items: center;
      }

      .post-list-item-info span wa-icon {
        margin-right: 0.25rem;
      }
    }
    .post-list-item:last-of-type {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
  }
</style>
```

### Related Posts
```html{.example}
<wa-card class="card-overview">
  <img
    slot="image"
    src="https://plus.unsplash.com/premium_photo-1661382011487-cd3d6b1d9dff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTAyOTl8MHwxfGFsbHx8fHx8fHx8fDE3MTg2NDc0ODd8&ixlib=rb-4.0.3&q=80&w=1080"
    alt="A kitten sits patiently between a terracotta pot and decorative grasses."
  />

  <strong>Color Advancements</strong><br />
  Lot of new and exciting features in web colors<br />
  <small>2d ago</small>

  <div slot="footer">
    <wa-button variant="brand" pill>Read More</wa-button>

  </div>
</wa-card>



<style>
  .card-overview {
    max-width: 300px;
  }

  .card-overview small {
    color: var(--wa-color-text-quiet);
  }

  .card-overview [slot='footer'] {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

```
### Article footer
```html{.example}
<div class="article-footer">
  <div class="article-tags">
    <a href="#"><wa-tag size="medium" pill>UX</wa-tag></a>
    <a href="#"><wa-tag size="medium" pill>Product Design</wa-tag></a>
    <a href="#"><wa-tag size="medium" pill>Design</wa-tag></a>
    <a href="#"><wa-tag size="medium" pill>Prototyping</wa-tag></a>
  </div>
  <div class="article-actions">
    <wa-icon-button name="hands-clapping"></wa-icon-button>
  </div>
</div>
```

## Social Share

### Vertical
```html{.example}
<wa-card class="social-share-vertical" style="--border-radius: 4rem;">
  <wa-icon-button name="facebook" family="brands" variant="solid" label="Edit" href="https://example.com/"></wa-icon-button>
   <wa-icon-button name="x-twitter" family="brands" variant="solid" label="Edit" href="https://example.com/"></wa-icon-button>
    <wa-icon-button name="threads" family="brands" variant="solid" label="Edit" href="https://example.com/"></wa-icon-button>
    <wa-icon-button name="mastodon" family="brands" variant="solid" label="Edit" href="https://example.com/"></wa-icon-button>
    <wa-icon-button name="paper-plane" family="solid" variant="solid" label="Edit" href="https://example.com/"></wa-icon-button>
</wa-card>
<style>
  .social-share-vertical {
    display: block;
    margin: 0 auto;
    width: fit-content;

    wa-icon-button {
      font-size: 2.5rem;
      display: block;
      margin-bottom: .5rem;
    }
     wa-icon-button:last-of-type {
      margin-bottom: initial;
    }
  }
</style>
```

### Horizontal
```html{.example}
<wa-card class="social-share-horizontal">
  <div slot="header">
    Share this Article
  </div>
  <wa-icon-button name="facebook" family="brands" variant="solid" label="Edit" style="--background: #1877f225; --color: #1877f2"></wa-icon-button>
   <wa-icon-button name="x-twitter" family="brands" variant="solid" label="Edit" style="--background: #00000025; --color: #000000"></wa-icon-button>
    <wa-icon-button name="threads" family="brands" variant="solid" label="Edit" style="--background: #c32aa325; --color: #c32aa3"></wa-icon-button>
        <wa-icon-button name="mastodon" family="brands" variant="solid" label="Edit" style="--background: #6364ff25; --color: #6364ff"></wa-icon-button>

    <wa-icon-button name="instagram" family="brands" variant="solid" label="Edit" style="--background: #c32aa325; --color: #c32aa3"></wa-icon-button>

    <wa-icon-button name="pinterest" family="brands" variant="solid" label="Edit" style="--background: #bd081c25; --color: #bd081c"></wa-icon-button>
    <wa-icon-button name="linkedin" family="brands" variant="solid" label="Edit" style="--background: #0a66c225; --color: #0a66c2"></wa-icon-button>
    <div slot="footer">
      <div class="share-input">
         <wa-input value="https://fontawesome.com"></wa-input>
    <wa-button variant="brand"> <wa-icon slot="prefix" name="link" variant="solid"></wa-icon>Copy</wa-button>
      </div>

  </div>
</wa-card>
<style>
  .social-share-horizontal {
    margin: 0 auto;
    display: block;
    width: fit-content;

    wa-icon-button {
      --background: transparent;
      --color: initial;
      font-size: 1.5rem;
      border-radius: .25rem;
      background: var(--background);
    }
    wa-icon-button::part(base) {

      color: var(--color);
    }

    .share-input {
    display: flex;

    wa-input {
          --border-radius: var(--wa-form-control-border-radius) 0 0 var(--wa-form-control-border-radius);
    }
    wa-button {
      --border-radius:  0 var(--wa-form-control-border-radius)  var(--wa-form-control-border-radius) 0;
    }
  }
  }

</style>
```