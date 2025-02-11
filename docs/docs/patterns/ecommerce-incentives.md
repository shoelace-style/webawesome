---
title: Incentives
description: 'Highlight Special offers,discount and promotional deals'
parent: ecommerce
tags: e-commerce
---

## Coupon

```html{.example}
<wa-dialog label="New Here?" with-header class="coupon" style="--width: 50rem;">
  <div class="coupon-split">
    <img style="height: 100%" src="/assets/images/patterns/coupon.jpg" />
    <div>
      <span>help us start you off on the right foot.</span>
      <h1 style="margin-bottom: 0;">Get 15% Off...*</h1>
      <p>...your first online order when you signup for emails.</p>
      <wa-input label="Email" style="margin-bottom: 1rem;">
        <div slot="hint">What would you <a href='#'>link</a> like people to call you?</div>
      </wa-input>
      <wa-button size="medium" style="width: 100%; margin-bottom: 1rem;" variant="danger">Email me discount</wa-button>
      <p style="font-size: xx-small;font-style: italic;">*The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.</p>
    </div>
  </div>
</wa-dialog>

<wa-button>Open Dialog</wa-button>

<style>
  .coupon {
    .coupon-split {
      display: grid;
      grid-template-columns: 40% 1fr;
      gap: 1rem;
    }
  }
</style>
<script>
  const dialog = document.querySelector('.coupon');
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener('click', () => dialog.open = true);
</script>

```