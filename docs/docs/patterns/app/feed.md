---
title: Feed
description: TODO
---

## Comment Section
```html{.example}
<wa-card style="max-width: 60ch; margin: 0 auto;">
  <div class="wa-stack">
  <h1 class="wa-heading-m">Activity</h1>
  <wa-textarea></wa-textarea>
  <wa-divider></wa-divider>
  <section class="wa-stack">
    <div class="wa-flank">
      <wa-avatar label="User avatar"></wa-avatar>
      <div>
        <span class="wa-heading-s">Robert Fox</span>
        <span class="wa-caption-m">commented 32 min ago</span>
      </div>
    </div>
    <ul class="wa-stack wa-gap-xl" style="list-style-type: none; margin-inline-start: 1em;">
      <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras convallis mollis nunc, vel tempor sem faucibus nec. Suspendisse potenti. Pellentesque lobortis pulvinar nulla non tempor. Interdum et malesuada fames ac ante ipsum primis in faucibus.</li>
      <li class="wa-stack wa-gap-2xs">
        <div class="wa-flank">
          <wa-avatar label="User avatar"></wa-avatar>
          <div>
            <span>Robert Fox</span>
            <span class="wa-caption-m">commented 32 min ago</span>
          </div>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras convallis mollis nunc, vel tempor sem faucibus nec.</p>
      </li>
       <li class="wa-stack wa-gap-2xs">
        <div class="wa-flank">
          <wa-avatar label="User avatar"></wa-avatar>
          <div>
            <span>Robert Fox</span>
            <span class="wa-caption-m">commented 32 min ago</span>
          </div>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras convallis mollis nunc, vel tempor sem faucibus nec.</p>
      </li>
       <li class="wa-stack wa-gap-2xs">
        <div class="wa-flank">
          <wa-icon name="reply"></wa-icon>
          <a href="#">Leave Comment</a>
        </div>
      </li>
    </ul>
  </section>
  </div>
</wa-card>
```
## With Summary Components
```html{.example}
<wa-card style="max-width: 68ch; margin: 0 auto;">
  <h1 class="wa-heading-l">Monthly Activity</h1>
  <div class="wa-stack">
  <wa-details>
  <span class="wa-heading-m" slot="summary">
    February
  </span>
  <div class="wa-stack">
  <section class="wa-flank wa-gap-xs">
    <wa-icon style="font-size: var(--wa-font-size-xl)" name="envelope"></wa-icon>
    <div class="wa-split">
      <div class="wa-stack wa-gap-0">
        <span class="wa-heading-s">Email blasts</span>
        <div class="wa-cluster wa-gap-2xs">
          <a href="#">Nick Burkhart</a><span>sent to</span><a href="#">likely customers</a>
        </div>
      </div>
      <span class="wa-caption-m">Feb 28th</span>
    </div>
  </section>
   <wa-divider></wa-divider>
  <section class="wa-flank wa-gap-xs">
    <wa-icon style="font-size: var(--wa-font-size-xl)" name="phone"></wa-icon>
    <div class="wa-split">
      <div class="wa-stack wa-gap-0">
        <span class="wa-heading-s">Spoke with the Pope</span>
        <div class="wa-cluster wa-gap-2xs">
          <a href="#">Artur Fleck</a><span>for 1 hour</span>
        </div>
      </div>
      <span class="wa-caption-m">Feb 23rd</span>
    </div>
  </section>
  </div>
</wa-details>
<wa-details>
  <span class="wa-heading-m" slot="summary">
    March
  </span>
  <div class="wa-stack">
  <section class="wa-flank wa-gap-xs">
    <wa-icon style="font-size: var(--wa-font-size-xl)" name="video"></wa-icon>
    <div class="wa-split">
      <div class="wa-stack wa-gap-0">
        <span class="wa-heading-s">Zoom Call with Northeast office</span>
        <div class="wa-cluster wa-gap-2xs">
          <a href="#">Axel Foley</a><span>for 47 minutes</span>
        </div>
      </div>
      <span class="wa-caption-m">Mar 15th</span>
    </div>
  </section>
   <wa-divider></wa-divider>
  <section class="wa-flank wa-gap-s">
    <wa-icon style="font-size: var(--wa-font-size-xl)" name="calendar"></wa-icon>
    <div class="wa-split">
      <div class="wa-stack wa-gap-0">
        <span class="wa-heading-s">Scheduled birthday party</span>
        <div class="wa-cluster wa-gap-2xs">
          <a href="#">John Blaze</a><span>in</span><a href="#">Social Events</a>
        </div>
      </div>
      <span class="wa-caption-m">Mar 3rd</span>
    </div>
  </section>
  </div>
</wa-details>
<wa-details>
  <span class="wa-heading-m" slot="summary">
    April
  </span>
  <div class="wa-stack">
  <section class="wa-flank wa-gap-s">
    <wa-icon style="font-size: var(--wa-font-size-xl)" family="brands" name="intercom"></wa-icon>
    <div class="wa-split">
      <div class="wa-stack wa-gap-0">
        <span class="wa-heading-s">Got new lead</span>
        <div class="wa-cluster wa-gap-2xs">
          <a href="#">Jack Carter</a><span>on Intercom switchboard</span>
        </div>
      </div>
      <span class="wa-caption-m">Apr 18th</span>
    </div>
  </section>
   <wa-divider></wa-divider>
  <section class="wa-flank wa-gap-s">
    <wa-icon style="font-size: var(--wa-font-size-xl)" name="list-check"></wa-icon>
    <div class="wa-split">
      <div class="wa-stack wa-gap-0">
        <span class="wa-heading-s">Completed Todo</span>
        <div class="wa-cluster wa-gap-2xs">
          <a href="#">Huey Freeman</a><span>marked complete on</span><a href="#">Daily Tasks</a>
        </div>
      </div>
      <span class="wa-caption-m">Apr 2nd</span>
    </div>
  </section>
  </div>
</wa-details>
</div>
</wa-card>
```

## Card Separated
```html{.example}
<div class="wa-stack" style="max-width: 45ch; margin: 0 auto;">
  <div class="wa-stack">
    <wa-card>
      <div class="wa-flank">
        <wa-avatar></wa-avatar>
        <div class="wa-stack wa-gap-0">
          <div class="wa-split">
            <span class="wa-heading-s">Charlotte Parker</span>
            <span class="wa-caption-s">4h</span>
          </div>
          <p>Who's on first?</p>
          <a href="#" class="wa-cluster wa-gap-2xs">
            <wa-icon name="reply"></wa-icon>
            <span>Reply</span>
          </a>
        </div>
      </div>
    </wa-card>
    <ul class="wa-stack"  style="list-style-type: none; margin-inline-start: 2.5em;">
      <li>
        <wa-card>
      <div class="wa-flank">
        <wa-avatar></wa-avatar>
        <div class="wa-stack wa-gap-0">
          <div class="wa-split">
            <span class="wa-heading-s">Charlotte Parker</span>
            <span class="wa-caption-s">1h</span>
          </div>
          <p>What's on second?</p>
          <a href="#" class="wa-cluster wa-gap-2xs">
            <wa-icon name="reply"></wa-icon>
            <span>Reply</span>
          </a>
        </div>
      </div>
    </wa-card>
      </li>
      <li>
        <wa-card>
      <div class="wa-flank wa-align-items-start">
        <wa-avatar></wa-avatar>
        <div class="wa-stack wa-gap-xs">
          <div class="wa-split">
            <span class="wa-heading-s">Charlotte Parker</span>
          </div>
          <wa-textarea size="small"></wa-textarea>
        </div>
      </div>
    </wa-card>
      </li>
    </ul>
  </div>
  <div class="wa-stack">
    <wa-card>
      <div class="wa-flank">
        <wa-avatar></wa-avatar>
        <div class="wa-stack">
          <div class="wa-split">
            <span>Charlotte Parker</span>
            <span>4h</span>
          </div>
          <p>dfjsfjskfjska</p>
          <a href="#">Reply</a>
        </div>
      </div>
    </wa-card>
    <ul class="wa-stack"  style="list-style-type: none; margin-inline-start: 2.5em;">
      <li><wa-card></wa-card></li>
      <li><wa-card></wa-card></li>
      <li><wa-card></wa-card></li>
    </ul>
  </div>
</div>
```
## Divider Separated
```html{.example}
<wa-card with-header style="max-width: 54ch; margin: 0 auto;">
  <div slot="header" class="wa-split">
    <div>
      <span>Notifications</span>
      <wa-badge>2</wa-badge>
    </div>
    <wa-icon name="close"></wa-icon>
  </div>
  <div class="wa-stack">
    <section>
      <div class="wa-flank">
        <wa-avatar></wa-avatar>
        <div class="wa-stack">
          <div class="wa-split">

          </div>
          <div class="wa-split">
            
          </div>
          <wa-callout>dfjsdljfdsl</wa-callout>
        </div>
      </div>
      <wa-divider></wa-divider>
    </section>
  </div>
</wa-card>
```