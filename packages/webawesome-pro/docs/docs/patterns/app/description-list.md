---
title: Description List
description: 'Help users digest detailed information in a structured, easy-to-scan format.'
isPro: true
---

## Left Aligned

```html {.example}
<div class="wa-stack">
  <h3 class="wa-heading-m">Applicant Info</h3>
  <p class="wa-caption-m">Details about the applicant and attachments.</p>
  <wa-divider></wa-divider>
  <dl class="wa-stack wa-gap-2xl">
    <div class="wa-flank" style="--flank-size: 20ch;">
      <dt>Full name</dt>
      <dd>Bucky Barnes</dd>
    </div>
    <div class="wa-flank" style="--flank-size: 20ch;">
      <dt>Application for</dt>
      <dd>Machine Learning Engineer</dd>
    </div>
    <div class="wa-flank" style="--flank-size: 20ch;">
      <dt>Email address</dt>
      <dd>winter_soldier@example.com</dd>
    </div>
    <div class="wa-flank" style="--flank-size: 20ch;">
      <dt>Salary expectation</dt>
      <dd>$240,000</dd>
    </div>
    <div class="wa-flank wa-align-items-start" style="--flank-size: 20ch;">
      <dt>About</dt>
      <dd>After being lost in action and brainwashed into becoming Hydra's ruthless assassin, my journey is one of redemption, healing, and reclaiming my true self. Though burdened with the weight of the past, I remain a fierce warrior, loyal to those I love, and I'm always striving to atone for those dark days as the Winter Soldier.
      </dd>
    </div>
    <div class="wa-flank wa-align-items-start" style="--flank-size: 20ch;">
      <dt>Attachments</dt>
      <dd>
        <wa-card>
          <div class="wa-stack">
            <div class="wa-flank">
              <wa-icon name="paperclip"></wa-icon>
              <div class="wa-split">
                <span class="wa-caption-m wa-cluster">
                  <span>bb_resume.pdf</span>
                  <span>2.4mb</span>
                </span>
                <wa-button appearance="plain" variant="brand" size="small">Download</wa-button>
              </div>
            </div>
            <wa-divider></wa-divider>
            <div class="wa-flank">
              <wa-icon name="paperclip"></wa-icon>
              <div class="wa-split">
                <span class="wa-caption-m wa-cluster">
                  <span>bb_cover_letter.pdf</span>
                  <span>2.4mb</span>
                </span>
                <wa-button appearance="plain" variant="brand" size="small">Download</wa-button>
              </div>
            </div>
          </div>
        </wa-card>
      </dd>
    </div>
  </dl>
</div>
```

## Two Column

```html{.example}
<div class="wa-stack">
  <h2 class="wa-heading-m">Applicant Info</h2>
  <p class="wa-caption-m">Details about the applicant and attachments.</p>
  <wa-divider></wa-divider>
  <dl class="wa-grid wa-gap-2xl" style="--min-column-size: 40ch;">
    <div class="wa-stack wa-gap-xs">
      <dt>Full name</dt>
      <dd>Bucky Barnes</dd>
    </div>
    <div class="wa-stack wa-gap-xs">
      <dt>Application for</dt>
      <dd>Machine Learning Engineer</dd>
    </div>
    <div class="wa-stack wa-gap-xs">
      <dt>Email address</dt>
      <dd>winter_soldier@example.com</dd>
    </div>
    <div class="wa-stack wa-gap-xs">
      <dt>Salary expectation</dt>
      <dd>$240,000</dd>
    </div>
    <div class="wa-stack wa-gap-xs wa-span-grid">
      <dt>About</dt>
      <dd>After being lost in action and brainwashed into becoming Hydra's ruthless assassin, my journey is one of redemption, healing, and reclaiming my true self. Though burdened with the weight of the past, I remain a fierce warrior, loyal to those I love, and I'm always striving to atone for those dark days as the Winter Soldier.
      </dd>
    </div>
    <div class="wa-stack wa-gap-xs wa-span-grid">
      <dt>Attachments</dt>
      <dd>
        <wa-card>
          <div>
            <div class="wa-flank">
              <wa-icon name="paperclip"></wa-icon>
              <div class="wa-split">
                <span class="wa-caption-m wa-cluster">
                   <span>bb_resume.pdf</span>
                  <span>2.4mb</span>
                </span>
                <wa-button appearance="plain" variant="brand" size="small">Download</wa-button>
              </div>
            </div>
            <wa-divider></wa-divider>
            <div class="wa-flank">
              <wa-icon name="paperclip"></wa-icon>
              <div class="wa-split">
                <span class="wa-caption-m wa-cluster">
                  <span>bb_cover_letter.pdf</span>
                  <span>2.4mb</span>
                </span>
                <wa-button appearance="plain" variant="brand" size="small">Download</wa-button>
              </div>
            </div>
          </div>
        </wa-card>
      </dd>
    </div>
  </dl>
</div>
```

## Left Aligned with Actions

```html {.example}
<div class="wa-stack">
  <h3 class="wa-heading-m">Applicant Info</h3>
  <p class="wa-caption-m">Details about the applicant and attachments.</p>
  <wa-divider></wa-divider>
  <dl class="wa-stack wa-gap-2xl">
    <div class="wa-flank" style="--flank-size: 20ch;">
      <dt>Full name</dt>
      <div class="wa-flank:end">
        <dd>Bucky Barnes</dd>
        <wa-button appearance="plain" variant="brand" size="small">Edit</wa-button>
      </div>
    </div>
    <div class="wa-flank" style="--flank-size: 20ch;">
      <dt>Application for</dt>
      <div class="wa-flank:end">
        <dd>Machine Learning Engineer</dd>
        <wa-button appearance="plain" variant="brand" size="small">Edit</wa-button>
      </div>
    </div>
    <div class="wa-flank" style="--flank-size: 20ch;">
      <dt>Email address</dt>
      <div class="wa-flank:end">
        <dd>winter_soldier@example.com</dd>
        <wa-button appearance="plain" variant="brand" size="small">Edit</wa-button>
      </div>
    </div>
    <div class="wa-flank" style="--flank-size: 20ch;">
      <dt>Salary expectation</dt>
      <div class="wa-flank:end">
        <dd>$240,000</dd>
        <wa-button appearance="plain" variant="brand" size="small">Edit</wa-button>
      </div>
    </div>
    <div class="wa-flank wa-align-items-start" style="--flank-size: 20ch;">
      <dt>About</dt>
      <div class="wa-flank:end">
        <dd>After being lost in action and brainwashed into becoming Hydra's ruthless assassin, my journey is one of redemption, healing, and reclaiming my true self. Though burdened with the weight of the past, I remain a fierce warrior, loyal to those I love, and I'm always striving to atone for those dark days as the Winter Soldier.</dd>
        <wa-button appearance="plain" variant="brand" size="small">Edit</wa-button>
      </div>
    </div>
    <div class="wa-flank" style="--flank-size: 20ch;">
      <dt>Attachments</dt>
      <dd>
        <wa-card>
          <div class="wa-stack">
            <div class="wa-flank">
              <wa-icon name="paperclip"></wa-icon>
              <div class="wa-split">
                <span class="wa-caption-m wa-cluster">
                  <span>bb_resume.pdf</span>
                  <span>2.4mb</span>
                </span>
                <div class="wa-cluster wa-gap-2xs">
                  <wa-button appearance="plain" variant="brand" size="small">Download</wa-button>
                  <wa-divider vertical style="height: 1em"></wa-divider>
                  <wa-button appearance="plain" variant="danger" size="small">Delete</wa-button>
                </div>
              </div>
            </div>
            <wa-divider></wa-divider>
            <div class="wa-flank">
              <wa-icon name="paperclip"></wa-icon>
              <div class="wa-split">
                <span class="wa-caption-m wa-cluster">
                  <span>bb_cover_letter.pdf</span>
                  <span>2.4mb</span>
                </span>
                <div class="wa-cluster wa-gap-2xs">
                  <wa-button appearance="plain" variant="brand" size="small">Download</wa-button>
                  <wa-divider vertical style="height: 1em"></wa-divider>
                  <wa-button appearance="plain" variant="danger" size="small">Delete</wa-button>
                </div>
              </div>
            </div>
          </div>
        </wa-card>
      </dd>
    </div>
  </dl>
</div>
```

## Condensed

```html{.example}
<wa-card appearance="filled" style="max-width: 45ch; margin: auto">
  <div class="wa-stack">
    <div class="wa-split wa-align-items-start">
      <dl class="wa-stack wa-gap-2xs">
        <dt class="wa-heading-s">Amount</dt>
        <dd class="wa-heading-l">$5,610.00</dd>
      </dl>
      <wa-badge appearance="filled outlined" variant="success">Paid</wa-badge>
    </div>
    <wa-divider></wa-divider>
    <dl class="wa-stack">
      <div class="wa-flank wa-align-items-stretch">
        <dt><wa-icon name="user" label="Name" fixed-width></wa-icon></dt>
        <dd>Sam Wilson</dd>
      </div>
      <div class="wa-flank wa-align-items-stretch">
        <dt><wa-icon name="calendar-days" label="Date" fixed-width></wa-icon></dt>
        <dd><wa-format-date date="2025-03-15"></wa-format-date></dd>
      </div>
      <div class="wa-flank wa-align-items-stretch">
        <dt><wa-icon family="brands" name="cc-visa" label="Credit Card" fixed-width></wa-icon></dt>
        <dd>Paid with Visa 1234</dd>
      </div>
    </dl>
  </div>
  <div slot="footer">
    <a href="" class="wa-cluster wa-gap-2xs">
      <span>Download Receipt</span>
      <wa-icon name="arrow-right"></wa-icon>
    </a>
  </div>
</wa-card>
```