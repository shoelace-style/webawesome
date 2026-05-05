---
title: Community & Support
description: Web Awesome has a growing community of designers and developers that are building amazing things with web components.
layout: page
---

<style>
  h2.anchor-heading wa-icon {
    margin-inline-end: var(--wa-space-xs);
  }
</style>

<p>We know people have their own way of reaching out, so our team makes sure you can find us wherever you need — whether it’s filing an issue on GitHub, chatting with the community on Discord, or getting private help via email. If you’re just getting started, don’t miss our <a href="/docs/">Instillation Guide</a>.</p>

<wa-divider></wa-divider>

<div class="wa-stack wa-gap-xl">
<div class="wa-stack wa-align-items-start">
  <div class="wa-stack wa-gap-s">
    <h2 class="anchor-heading"><wa-icon name="github" family="brands"></wa-icon>GitHub</h2>
    <span class="wa-heading-m">Feature requests & bugs</span>
    <p class="wa-caption-l">Notice a bug or have an idea? Open an issue on GitHub so we can triage, track, and ship fixes.</p>
  </div>
  <ul>
    <li>Report reproducible bugs with clear steps.</li>
    <li>Suggest features that improve developer workflow</li>
    <li>Vote on issues others have filed to help us prioritize.</li>
  </ul>
  <div class="wa-cluster wa-gap-s">
    <wa-button appearance="filled" href="{{ site.github.ideas }}">
      <wa-icon slot="start" variant="regular" name="lightbulb-on"></wa-icon>
      Request a Feature
    </wa-button>
    <wa-button href="{{ site.github.issues }}" appearance="outlined">
      <wa-icon slot="start" variant="regular" name="bug"></wa-icon>
      Report a Bug
    </wa-button>
  </div>  
</div>
<wa-divider></wa-divider>
<div class="wa-stack wa-align-items-start">
  <div class="wa-stack wa-gap-s">
    <h2 class="anchor-heading"><wa-icon name="discord" family="brands"></wa-icon>Discord</h2>
    <span class="wa-heading-m">Community & Discussion</span>
    <p class="wa-caption-l">Ask questions, share tips, and connect with other developers in real time.</p>
  </div>
  <ul>
    <li>Ask for help</li>
    <li>Share ideas and get feedback</li>
    <li>Show the community what you're working on</li>
    <li>Chat live with other designers, developers, and {{ site.name }} supporters.</li>
  </ul>
  <wa-button appearance="filled" href="{{ site.urls.discord }}">
    <wa-icon slot="start" name="discord" family="brands"></wa-icon>
    Join Discord
  </wa-button>
</div>
<wa-divider></wa-divider>
<div class="wa-stack wa-align-items-start">
  <div class="wa-stack wa-gap-s">
    <h2 class="anchor-heading"><wa-icon name="envelope" variant="regular"></wa-icon>Email</h2>
    <span class="wa-heading-m">Anything Else</span>
    <p class="wa-caption-l">Billing questions, account access, or sensitive issues—reach our support team directly.</p>
  </div>
  <ul>
    <li>Account access & login issues.</li>
    <li>Billing or subscription questions.</li>
    <li>Private matters you don’t want to post publicly.</li>
  </ul>
  <wa-button appearance="filled" href="mailto:{{ site.emails.help }}">
    <wa-icon slot="start" name="envelope" variant="regular"></wa-icon>
    Get Help via Email
  </wa-button>
</div>
<wa-divider></wa-divider>
</div>
<div class="wa-stack" style="margin-block-start: var(--wa-space-xl);">
  <div class="wa-stack wa-gap-s">
    <h2>Socials</h2>
    <p>We’re everywhere you are — follow us on your favorite social media platforms for the latest news and updates.</p>
  </div>
<div class="wa-cluster wa-caption-2xl">
    <h2 class="wa-visually-hidden">{{ site.name }} Elsewhere</h2>
    <a href="{{ site.github.repo }}" rel="noopener noreferrer" target="_blank" class="appearance-plain">
      <wa-icon family="brands" name="github" label="GitHub" role="img" aria-label="GitHub" library="default"></wa-icon>
    </a>
    <a href="{{ site.urls.bluesky }}" rel="noopener noreferrer" target="_blank" class="appearance-plain">
      <wa-icon family="brands" name="bluesky" label="Bluesky" role="img" aria-label="Bluesky" library="default"></wa-icon>
    </a>
    <a href="{{ site.urls.mastodon }}" rel="noopener noreferrer" target="_blank" class="appearance-plain">
      <wa-icon family="brands" name="mastodon" label="Mastodon" role="img" aria-label="Mastodon" library="default"></wa-icon>
    </a>
    <a href="{{ site.urls.x }}" rel="noopener noreferrer" target="_blank" class="appearance-plain">
      <wa-icon family="brands" name="x-twitter" label="Twitter (X)" role="img" aria-label="Twitter (X)" library="default"></wa-icon>
    </a>
    <a href="{{ site.urls.threads }}" rel="noopener noreferrer" target="_blank" class="appearance-plain">
      <wa-icon family="brands" name="threads" label="Threads" role="img" aria-label="Threads" library="default"></wa-icon>
    </a>
  </div>

</div>
