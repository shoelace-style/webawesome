---
title: FAQ
description: 'The user has questions concerning a site and its related services'
---

## With Flanked Heading & Description

```html {.example}
<div class="wa-flank wa-align-items-start wa-gap-2xl" style="--flank-size: 35ch">
  <div>
    <h2>Frequently Asked Questions</h2>
    <p>Can’t find an answer? Reach out to your local <a href="">Operator</a>, or contact <a href="">the Oracle</a>, and enjoy a cookie. &#127850;</p>
  </div>
  <dl class="wa-stack wa-gap-2xl">
    <div class="wa-stack wa-gap-xs">
      <dt>Is Zion actually real, or just another Matrix?</dt>
      <dd>Ah, the question that keeps redpills up at night. Sure, we escaped the first Matrix, but who’s to say Zion isn’t just another layer of the simulation?</dd>
    </div>
    <div class="wa-stack wa-gap-xs">
      <dt>Why do the Agents always wear suits?</dt>
      <dd>Because nothing says "unstoppable digital enforcer" like a generic business professional aesthetic. Also, intimidation. You ever try fighting someone in sunglasses and a tie? It’s terrifying.</dd>
    </div>
    <div class="wa-stack wa-gap-xs">
      <dt>Can I go back into the Matrix once I’m out?</dt>
      <dd>Technically, yes—via hacking in. Emotionally? That depends on how well you handle the knowledge that nothing around you is real.</dd>
    </div>
  </dl>
</div>
```

## Expandable Answers

```html {.example}
<div class="wa-stack">
  <h2>Frequently Asked Questions</h2>
  <wa-details appearance="plain">
    <h3 slot="summary" class="wa-heading-m" style="margin: 0">Is Zion actually real, or just another Matrix?</h3>
    Ah, the question that keeps redpills up at night. Sure, we escaped the first Matrix, but who’s to say Zion isn’t just another layer of the simulation?
  </wa-details>
  <wa-divider></wa-divider>
  <wa-details appearance="plain">
    <h3 slot="summary" class="wa-heading-m" style="margin: 0">Why do the Agents always wear suits?</h3>
    Because nothing says "unstoppable digital enforcer" like a generic business professional aesthetic. Also, intimidation. You ever try fighting someone in sunglasses and a tie? It’s terrifying.
  </wa-details>
  <wa-divider></wa-divider>
  <wa-details appearance="plain">
    <h3 slot="summary" class="wa-heading-m" style="margin: 0">Can I go back into the Matrix once I’m out?</h3>
    Technically, yes—via hacking in. Emotionally? That depends on how well you handle the knowledge that nothing around you is real.
  </wa-details>
</div>
```

## Two Column

```html {.example}
<div class="wa-stack wa-gap-2xl">
  <h2>Frequently Asked Questions</h2>
  <dl class="wa-stack wa-gap-2xl">
    <div class="wa-grid wa-gap-xs">
      <dt class="wa-heading-m">Is Zion actually real, or just another Matrix?</dt>
      <dd>Ah, the question that keeps redpills up at night. Sure, we escaped the first Matrix, but who’s to say Zion isn’t just another layer of the simulation?</dd>
    </div>
    <wa-divider></wa-divider>
    <div class="wa-grid wa-gap-xs">
      <dt class="wa-heading-m">Why do the Agents always wear suits?</dt>
      <dd>Because nothing says "unstoppable digital enforcer" like a generic business professional aesthetic. Also, intimidation. You ever try fighting someone in sunglasses and a tie? It’s terrifying.</dd>
    </div>
    <wa-divider></wa-divider>
    <div class="wa-grid wa-gap-xs">
      <dt class="wa-heading-m">Can I go back into the Matrix once I’m out?</dt>
      <dd>Technically, yes—via hacking in. Emotionally? That depends on how well you handle the knowledge that nothing around you is real.</dd>
    </div>
  </dl>
</div>
```
