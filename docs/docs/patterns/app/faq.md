---
title: FAQ
description: 'Empower users to learn more with a structured list of questions and answers.'
isPro: true
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

## With Expandable Answers

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

## Multiple Columns
```html{.example}
<div>

    <h2>Frequently Asked Questions</h2>


  <dl class="wa-grid wa-gap-m" style="--min-column-size: 30ch;">
    <div class="wa-stack wa-gap-xs">
      <dt class="wa-heading-m">How often do you update your courses?</dt>
      <dd>A course is updated once there is a fundamental shift in the language or library’s underlying API. You can check our <a href="#">workshop</a> list to see if a new version of a given course is on the schedule. You may also write to us as <a href="#">support@frontendmasters.com</a> with suggestions for updates.</dd>
    </div>

    <div class="wa-stack wa-gap-xs">
      <dt class="wa-heading-m">Do you offer certificates of completion?</dt>
      <dd>You can download certificates of completion from the <a href="#">Completed Courses</a> list in your Learning Library. Click the diploma icon next to the course to download the certificate in light or dark mode. A link to your Public Profile is included on each certificate if you’ve created one. Public Profiles showcase your learning journey and are a fantastic way to share progress with friends, co-workers, or employers. Public Profiles are available to members with an active Frontend Masters subscription who have watched ten or more hours of content. Visit the <a href="#">Public Profile</a> section in My Account to get started.</dd>
    </div>

    <div class="wa-stack wa-gap-xs">
      <dt class="wa-heading-m">Do you offer a free trial?</dt>
      <dd>
         <p>We offer a free trial to first-time subscribers. You can find more about the trial here.</p>
        <p>We also have the following opportunities to learn for free:</p>
        <ul>
          <li>The online bootcamp is a free, two-week curriculum to get you started with web development.</li>
          <li>You can  create a free account to gain access to five full courses for free.</li>
        </ul>
      </dd>
    </div>

    <div class="wa-stack wa-gap-xs">
      <dt class="wa-heading-m">Do you have discounts for students?</dt>
      <dd>We are part of the <a href="#">GitHub Student Developer Pack</a>, allowing students six months of free access to the entire platform.</dd>
    </div>

    <div class="wa-stack wa-gap-xs">
      <dt class="wa-heading-m">How do I cancel my plan?</dt>
      <dd>You can cancel your Frontend Masters subscription by visiting the <a href="#">Subscription tab</a> in your My Account area.</dd>
    </div>
  </dl>
</div>
```