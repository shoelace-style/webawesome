---
title: News
description: TODO
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
        <p style="margin-bottom: var(--wa-space-3xs);">Fusce lectus lorem, tincidunt non semper sit amet, laoreet vitae nunc. Morbi egestas, libero vitae elementum pretium, nibh ipsum faucibus lacus, id pretium urna ligula eu mauris. Aliquam erat volutpat. Mauris pharetra lacus rhoncus ligula bibendum, at consectetur erat auctor.</p>

      <span style="font-size: small;font-weight: 600;font-style: italic;">sub-title</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div>
            <img src="https://img.fortawesome.com/cfa83f3c/article-flower.jpg" alt="">

        <p style="margin-bottom: var(--wa-space-3xs);">Etiam et tincidunt est, sollicitudin fermentum ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut suscipit libero at velit fringilla, ac pretium lorem rutrum. Cras luctus blandit semper.</p>

      <span style="font-size: small;font-weight: 600;font-style: italic;">sub-title</span>
        </div>
        <div>
            <img src="https://img.fortawesome.com/cfa83f3c/article-flower.jpg" alt="">

        <p style="margin-bottom: var(--wa-space-3xs);">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in fringilla ante. In mattis sapien ac aliquet mattis.</p>

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
      <h4 style="--wa-space-xl: 0;">Subscriptions</h4>
      <ul class="list">
      <li><a href="#"><wa-icon fixed-width name="game-board-simple"></wa-icon> Crossword</a></li>
      <li><a href="#"><wa-icon fixed-width name="paper-plane"></wa-icon> Newsletters</a></li>
      <li><a href="#"><wa-icon fixed-width name="microphone-lines"></wa-icon> Podcast</a></li>
    </ul>
    </section>
  </div>
  <div class="social">
    <a href="">
      <wa-icon family="brands" name="bluesky"></wa-icon>
    </a>
    <a href="">
      <wa-icon family="brands" name="instagram"></wa-icon>
    </a>
    <a href="">
      <wa-icon family="brands" name="facebook"></wa-icon>
    </a>
    <a href="">
      <wa-icon family="brands" name="mastodon"></wa-icon>
    </a>
  </div>
  <div>
    <img src="https://img.fortawesome.com/cfa83f3c/app_store.svg" alt="">
    <img src="https://img.fortawesome.com/cfa83f3c/google_play.svg" alt="">
  </div>
  <div class="legal">&#169; 2024 All rights reserved.</div>
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
      grid-template-columns: 1fr 1fr 1fr;
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
      --wa-color-text-link: var(--wa-color-gray-20);

      wa-icon {
        margin-right: .5rem;
      }
    }
  }
</style>
```
