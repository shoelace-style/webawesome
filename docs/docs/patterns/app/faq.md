---
title: FAQ
description: 'The user has questions concerning a site and its related services'
parent: app
tags: app
---
## Examples

### Offset
```html{.example}
<div class="wa-grid">
  <div>
    <h2>Frequently Asked Questions</h2>
    <p>Can’t find the answer you’re looking for? Reach out to our <a href="#">customer support</a> team.</p>
  </div>
  <dl class="wa-stack wa-gap-m">
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
### With detail component
```html{.example}
<div style="max-width: 960px; margin: 0 auto;">
  <h2>Frequently Asked Questions</h2>
  <div class="wa-stack wa-gap-xs">
  <wa-details>
    <span slot="summary" class="wa-heading-m">
      How often do you update your courses?
    </span>
    A course is updated once there is a fundamental shift in the language or library’s underlying API. You can check our <a href="#">workshop</a> list to see if a new version of a given course is on the schedule. You may also write to us as <a href="#">support@frontendmasters.com</a> with suggestions for updates.
  </wa-details>
  <wa-details>
    <span slot="summary" class="wa-heading-m">
      Do you offer certificates of completion?
    </span>
    You boil the hell out of it.
  </wa-details>
  <wa-details>
    <span slot="summary" class="wa-heading-m">
      Do you offer a free trial?
    </span>
    You can download certificates of completion from the <a href="#">Completed Courses</a> list in your Learning Library. Click the diploma icon next to the course to download the certificate in light or dark mode. A link to your Public Profile is included on each certificate if you’ve created one. Public Profiles showcase your learning journey and are a fantastic way to share progress with friends, co-workers, or employers. Public Profiles are available to members with an active Frontend Masters subscription who have watched ten or more hours of content. Visit the <a href="#">Public Profile</a> section in My Account to get started.
  </wa-details>
  <wa-details>
    <span slot="summary" class="wa-heading-m">
      Do you have discounts for students?
    </span>
    <p>We offer a free trial to first-time subscribers. You can find more about the trial here.</p>
        <p>We also have the following opportunities to learn for free:</p>
        <ul>
          <li>The online bootcamp is a free, two-week curriculum to get you started with web development.</li>
          <li>You can  create a free account to gain access to five full courses for free.</li>
        </ul>
  </wa-details>
  </div>
</div>
```
### 2 Column
```html{.example}
<div>

    <h2>Frequently Asked Questions</h2>


  <dl class="wa-stack wa-gap-m">
    <div class="wa-grid wa-gap-xs">
      <dt class="wa-heading-m">How often do you update your courses?</dt>
      <dd>A course is updated once there is a fundamental shift in the language or library’s underlying API. You can check our <a href="#">workshop</a> list to see if a new version of a given course is on the schedule. You may also write to us as <a href="#">support@frontendmasters.com</a> with suggestions for updates.</dd>
    </div>
    <wa-divider></wa-divider>
    <div class="wa-grid wa-gap-xs">
      <dt class="wa-heading-m">Do you offer certificates of completion?</dt>
      <dd>You can download certificates of completion from the <a href="#">Completed Courses</a> list in your Learning Library. Click the diploma icon next to the course to download the certificate in light or dark mode. A link to your Public Profile is included on each certificate if you’ve created one. Public Profiles showcase your learning journey and are a fantastic way to share progress with friends, co-workers, or employers. Public Profiles are available to members with an active Frontend Masters subscription who have watched ten or more hours of content. Visit the <a href="#">Public Profile</a> section in My Account to get started.</dd>
    </div>
    <wa-divider></wa-divider>
    <div class="wa-grid wa-gap-xs">
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
    <wa-divider></wa-divider>
    <div class="wa-grid wa-gap-xs">
      <dt class="wa-heading-m">Do you have discounts for students?</dt>
      <dd>We are part of the <a href="#">GitHub Student Developer Pack</a>, allowing students six months of free access to the entire platform.</dd>
    </div>
    <wa-divider></wa-divider>
    <div class="wa-grid wa-gap-xs">
      <dt class="wa-heading-m">How do I cancel my plan?</dt>
      <dd>You can cancel your Frontend Masters subscription by visiting the <a href="#">Subscription tab</a> in your My Account area.</dd>
    </div>
  </dl>
</div>
```