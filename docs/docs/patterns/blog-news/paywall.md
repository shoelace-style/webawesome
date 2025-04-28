---
title: Paywall
description: ''
parent: blog-news
tags: blog-news
---

## Meter
```html {.example}
<div style="max-width: 45ch; margin: 0 auto;">
  <wa-card>
    <div class="wa-flank">
      <wa-avatar shape="rounded" style="--background-color: var(--wa-color-purple-80); --text-color: var(--wa-color-purple-40)">
          <wa-icon slot="icon" name="newspaper" family="regular"></wa-icon>
        </wa-avatar>
      <div class="wa-stack wa-gap-2xs">
        <p class="wa-caption-m">You've read <span style="font-weight: var(--wa-font-weight-bold);">9 out of 10 articles</span> this month.</p>
        <p>Already a subscriber? <a href="#">Log in here</a>.</p>
        <a href="#">Get Unlimited access for just 99¢</a>
      </div>
    </div>
  </wa-card>
</div>
```
## Modal

```html {.example viewport}
<div style="position: relative;">
  
  <div style="max-width: 90ch; margin: 0 auto; filter: blur(5px); padding: var(--wa-size)">
    <h2>The Great Gatsby</h2>
    <p>In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since.</p>
    <p>‘Whenever you feel like criticizing any one,’ he told me, ‘just remember that all the people in this world haven’t had the advantages that you’ve had.’</p>
    <p>He didn’t say any more but we’ve always been unusually
    communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence I’m inclined to reserve all judgments, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores. The abnormal mind is quick to detect and attach itself to this quality when it appears in a normal person, and so it came about that in college I was unjustly accused of being a politician, because I was privy to the secret griefs of wild, unknown men. Most of the confidences were unsought—frequently I have feigned sleep, preoccupation, or a hostile levity when I realized by some unmistakable sign that an intimate revelation was quivering on the horizon—for the intimate revelations of young men or at least the terms in which they express them are usually plagiaristic and marred by obvious suppressions. Reserving judgments is a matter of infinite hope. I am still a little afraid of missing something if I forget that, as my father snobbishly suggested, and I snobbishly repeat a sense of the fundamental decencies is parcelled out unequally at birth.</p>
    <p>And, after boasting this way of my tolerance, I come to the admission that it has a limit. Conduct may be founded on the hard rock or the wet marshes but after a certain point I don’t care what it’s founded on. When I came back from the East last autumn I felt that I wanted the world to be in uniform and at a sort of moral attention forever; I wanted no more riotous excursions with privileged glimpses into the human heart. Only Gatsby, the man who gives his name to this book, was exempt from my reaction—Gatsby who represented everything for which I have an unaffected scorn. If personality is an unbroken series of successful gestures, then there was something gorgeous about him, some heightened sensitivity to the promises of life, as if he were related to one of those intricate machines that register earthquakes ten thousand miles away. This responsiveness had nothing to do with that flabby impressionability which is dignified under the name of the ‘creative temperament’— it was an extraordinary gift for hope, a romantic readiness such as I have never found in any other person and which it is not likely I shall ever find again. No—Gatsby turned out all right at the end; it is what preyed on Gatsby, what foul dust floated in the wake of his dreams that temporarily closed out my interest in the abortive sorrows and shortwinded elations of men.</p>
  </div>
 <div style="background:rgba(24, 49, 83, 0.5);position: fixed; top: 0; right: 0; width: 100%; height: 100%;z-index: 1;">
  <wa-card style="max-width: 84ch;margin: 10% auto 0;">
    <div class="wa-stack wa-gap-xl">
      <h2 class="wa-heading-m">Want to subscribe or continue using our Products for free with ads?</h2>
      <p>Laws are changing in your region, so we're introducing a new choice about how we use your info for ads. You'll learn more about what each option means for you before you confirm your choice.</p>
      <p>Your choice will apply to the <a href="#">accounts in this Accounts Center</a>.</p>
      <div class="wa-grid">
      <article class="wa-stack wa-gap-s">
        <span class="wa-heading-s">Subscribe without ads</span>
          <p>Subscribe to our accounts without ads, starting at 5.99/month (inclusive of applicable taxes). Your info won't be use for ads.</p>
          <wa-button variant="success">Subscribe</wa-button>
      </article>
      <article class="wa-stack wa-gap-s">
        <span class="wa-heading-s">Free with ads</span>
     
        <p>Discover products and brands through personalized ads, while using your accounts for free. Your info will be used for ads</p>
        <wa-button appearance="outlined">Use for Free</wa-button>
      </article>
      </div>
    </div>
  </wa-card>
 </div>
</div>
```

## Footer

```html {.example viewport}
<div style="position: relative;">
  <div style="max-width: 90ch; margin: 0 auto; filter: blur(5px); padding: var(--wa-size)">
    <h2>The Great Gatsby</h2>
    <p>In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since.</p>
    <p>‘Whenever you feel like criticizing any one,’ he told me, ‘just remember that all the people in this world haven’t had the advantages that you’ve had.’</p>
    <p>He didn’t say any more but we’ve always been unusually
    communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence I’m inclined to reserve all judgments, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores. The abnormal mind is quick to detect and attach itself to this quality when it appears in a normal person, and so it came about that in college I was unjustly accused of being a politician, because I was privy to the secret griefs of wild, unknown men. Most of the confidences were unsought—frequently I have feigned sleep, preoccupation, or a hostile levity when I realized by some unmistakable sign that an intimate revelation was quivering on the horizon—for the intimate revelations of young men or at least the terms in which they express them are usually plagiaristic and marred by obvious suppressions. Reserving judgments is a matter of infinite hope. I am still a little afraid of missing something if I forget that, as my father snobbishly suggested, and I snobbishly repeat a sense of the fundamental decencies is parcelled out unequally at birth.</p>
    <p>And, after boasting this way of my tolerance, I come to the admission that it has a limit. Conduct may be founded on the hard rock or the wet marshes but after a certain point I don’t care what it’s founded on. When I came back from the East last autumn I felt that I wanted the world to be in uniform and at a sort of moral attention forever; I wanted no more riotous excursions with privileged glimpses into the human heart. Only Gatsby, the man who gives his name to this book, was exempt from my reaction—Gatsby who represented everything for which I have an unaffected scorn. If personality is an unbroken series of successful gestures, then there was something gorgeous about him, some heightened sensitivity to the promises of life, as if he were related to one of those intricate machines that register earthquakes ten thousand miles away. This responsiveness had nothing to do with that flabby impressionability which is dignified under the name of the ‘creative temperament’— it was an extraordinary gift for hope, a romantic readiness such as I have never found in any other person and which it is not likely I shall ever find again. No—Gatsby turned out all right at the end; it is what preyed on Gatsby, what foul dust floated in the wake of his dreams that temporarily closed out my interest in the abortive sorrows and shortwinded elations of men.</p>
  </div>
 <div style="background:rgba(24, 49, 83, 0.5);position: fixed; top: 0; right: 0; width: 100%; height: 100%;z-index: 1;">
  <wa-card class="wa-border-radius-square" style="width: 75%;position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);">
    <div>
      <h2 class="wa-heading-m">You've hit your free article limit.</h2>
      <wa-divider></wa-divider>
      <div class="wa-grid">
        <div class="wa-stack wa-gap-s wa-align-items-start">
          <span class="wa-heading-s">Standard Digital</span>
          <span class="wa-heading-xl">$45/month</span>
          <p>Essential digital access to quality journalism on any device. Makes a great gift.</p>
          <wa-button size="small" variant="brand">Select</wa-button>
          <a href="#">What's Included?</a>
        </div>
        <div class="wa-stack wa-gap-s wa-align-items-start">
          <span class="wa-heading-s">Premium Digital</span>
          <span class="wa-heading-xl">$75/month</span>
          <p>Complete digital access to quality journalism with expert analysis from industry leaders.</p>
          <wa-button size="small" variant="brand">Select</wa-button>
          <a href="#">What's Included?</a>
        </div>
      </div>
    </div>
  </wa-card>
 </div>
</div>
```


<!-- ### Paywall

```html {.example viewport}
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
``` -->
