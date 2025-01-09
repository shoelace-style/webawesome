---
title: Order Summary
description: TODO
parent: ecommerce
tags: e-commerce
---

TODO Page Description

## With image
```html{.example}
<div>
 <wa-card with-image with-footer class="card-overview">
  <img
    slot="image"
    src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
    alt="A kitten sits patiently between a terracotta pot and decorative grasses."
  />

  <span>Payment Successful</span>
  <h1>Thanks for Ordering</h1>
  <p>We appreciate your order, we’re currently processing it. So hang tight and we’ll send you confirmation very soon!</p>
  <dl>
    <dt>Tracking number</dt>
    <dd style="--wa-space-m: 0;">51547878755545848512</dd>
  </dl>
  <ul style="list-style-type: none;">
    <li style="display: flex;">
      <img src="https://source.unsplash.com/" alt="" width="300" />
      <div style="flex:auto;">
        <h3>Basic Tee</h3>
        <p>Charcoal</p>
        <p>L</p>
      </div>
      <div style="flex:none;">$36.00</div>
    </li>
  </ul>
  <dl class="acr ahn aic avk ayp azp bas"><div class="la abe"><dt>Subtotal</dt><dd class="baw">$72.00</dd></div><div class="la abe"><dt>Shipping</dt><dd class="baw">$8.00</dd></div><div class="la abe"><dt>Taxes</dt><dd class="baw">$6.40</dd></div><div class="la aaz abe ahn aic avk baw"><dt class="ayn">Total</dt><dd class="ayn">$86.40</dd></div></dl>
  <dl class="hs lc aai ace ayp bat"><div><dt class="azp baw">Shipping Address</dt><dd class="hf"><address class="bdw"><span class="ky">Kristin Watson</span><span class="ky">7363 Cynthia Pass</span><span class="ky">Toronto, ON N3Y 4H8</span></address></dd></div><div><dt class="azp baw">Payment Information</dt><dd class="hf acn con ctr cuh"><div class="wt"><svg width="36" height="24" viewBox="0 0 36 24" aria-hidden="true" class="pr vn"><rect rx="4" fill="#224DBA" width="36" height="24"></rect><path d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z" fill="#fff"></path></svg><p class="i">Visa</p></div><div class="ws"><p class="baw">Ending with 4242</p><p>Expires 12 / 21</p></div></dd></div></dl>

  <div class="hs ahn aic aur ayd"><a href="#" class="ayp azp bbl bvy">Continue Shopping<span aria-hidden="true"> →</span></a></div>
</wa-card>
</div>
```
