---
title: Description List
description: 'Shows the user information with labels and values in an easy to read format.'
parent: app
tags: app
---
## Examples

### Simple
```html{.example}
<div style="max-width: 960px; margin: 0 auto">
  <h3 class="wa-heading-m">Applicant Info</h3>
  <p class="wa-caption-m">Personal details.</p>
  <wa-divider></wa-divider>
  <dl class="wa-stack wa-gap-2xl">
    <div class="wa-align-items-start wa-flank" style="--flank-size: 15%;">
      <dt class="wa-heading-xs">Full name</dt>
      <dd class="wa-caption-m">Bucky Barnes</dd>
    </div>
    <div class="wa-align-items-start wa-flank" style="--flank-size: 15%;">
      <dt class="wa-heading-xs">Application for</dt>
      <dd class="wa-caption-m">Machine Learning Engineer</dd>
    </div>
    <div class="wa-align-items-start wa-flank" style="--flank-size: 15%;">
      <dt class="wa-heading-xs">Email address</dt>
      <dd class="wa-caption-m">winter_soldier@example.com</dd>
    </div>
    <div class="wa-align-items-start wa-flank" style="--flank-size: 15%;">
      <dt class="wa-heading-xs">Salary expectation</dt>
      <dd class="wa-caption-m">
        $240,00
      </dd>
    </div>
    <div class="wa-align-items-start wa-flank" style="--flank-size: 15%;">
      <dt class="wa-heading-xs">About</dt>
      <dd class="wa-caption-m">After being lost in action and brainwashed into becoming Hydra's ruthless assassin, my journey is one of redemption, healing, and reclaiming my true self. Though burdened with the weight of the past, I remain a fierce warrior, loyal to those I loves, and I'm always striving to atone for those dark days as the Winter Soldier.
      </dd>
    </div>
    <div class="wa-align-items-start wa-flank" style="--flank-size: 15%;">
      <dt class="wa-heading-xs">Attachments</dt>
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

### Two Column
```html{.example}
<div style="max-width: 960px; margin: 0 auto">
  <h2 class="wa-heading-m">Applicant Information</h2>
  <p class="wa-caption-m">Personal details and application.</p>
  <wa-divider></wa-divider>
  <dl class="wa-grid wa-gap-2xl" style="--min-column-size: 40ch;">
    <div class="wa-align-items-start wa-flank" style="--flank-size: 15%;">
      <dt class="wa-heading-xs">Full name</dt>
      <dd class="wa-caption-m">Bucky Barnes</dd>
    </div>
    <div class="wa-align-items-start wa-flank" style="--flank-size: 15%;">
      <dt class="wa-heading-xs">Application for</dt>
      <dd class="wa-caption-m">Machine Learning Engineer</dd>
    </div>
    <div class="wa-align-items-start wa-flank" style="--flank-size: 15%;">
      <dt class="wa-heading-xs">Email address</dt>
      <dd class="wa-caption-m">winter_soldier@example.com</dd>
    </div>
    <div class="wa-align-items-start wa-flank" style="--flank-size: 15%;">
      <dt class="wa-heading-xs">Salary expectation</dt>
      <dd class="wa-caption-m">
        $240,00
      </dd>
    </div>
    <div class="wa-align-items-start wa-flank wa-span-grid" style="--flank-size: 15%;">
      <dt class="wa-heading-xs">About</dt>
      <dd class="wa-caption-m">After being lost in action and brainwashed into becoming Hydra's ruthless assassin, my journey is one of redemption, healing, and reclaiming my true self. Though burdened with the weight of the past, I remain a fierce warrior, loyal to those I loves, and I'm always striving to atone for those dark days as the Winter Soldier.
      </dd>
    </div>
    <div class="wa-align-items-start wa-flank wa-span-grid" style="--flank-size: 15%;">
      <dt class="wa-heading-xs">Attachments</dt>
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
### Multi Column
```html{.example}
<div style="max-width: 960px; margin: 0 auto">
  <h2 class="wa-heading-m">Applicant Information</h2>
  <p class="wa-caption-m">Personal details and application.</p>
  <wa-divider></wa-divider>
  <dl class="wa-stack wa-gap-2xl">
    <div class="wa-align-items-start wa-flank" style="--flank-size: 15%;">
      <dt class="wa-heading-xs">Full name</dt>
      <dd class="wa-caption-m wa-split">
        <span>Bucky Barnes</span>
        <wa-button appearance="plain" variant="brand" size="small">Update</wa-button>
      </dd>
    </div>
    <div class="wa-align-items-start wa-flank" style="--flank-size: 15%;">
      <dt class="wa-heading-xs">Application for</dt>
      <dd class="wa-caption-m wa-split">
        <span>Machine Learning Engineer</span>
        <wa-button appearance="plain" variant="brand" size="small">Update</wa-button>
      </dd>
    </div>
    <div class="wa-align-items-start wa-flank" style="--flank-size: 15%;">
      <dt class="wa-heading-xs">Email address</dt>
      <dd class="wa-caption-m wa-split">
        <span>winter_soldier@example.com</span>
        <wa-button appearance="plain" variant="brand" size="small">Update</wa-button>
        </dd>
    </div>
    <div class="wa-align-items-start wa-flank" style="--flank-size: 15%;">
      <dt class="wa-heading-xs">Salary expectation</dt>
      <dd class="wa-caption-m wa-split">
        <span>$240,00</span>
        <wa-button appearance="plain" variant="brand" size="small">Update</wa-button>
      </dd>
    </div>
    <div class="wa-align-items-start wa-flank" style="--flank-size: 15%;">
      <dt class="wa-heading-xs">About</dt>
      <dd class="wa-caption-m wa-split">
        <p style="max-width: 70ch;">After being lost in action and brainwashed into becoming Hydra's ruthless assassin, my journey is one of redemption, healing, and reclaiming my true self. Though burdened with the weight of the past, I remain a fierce warrior, loyal to those I loves, and I'm always striving to atone for those dark days as the Winter Soldier.</p>
        <wa-button appearance="plain" variant="brand" size="small">Update</wa-button>
      </dd>
    </div>
    <div class="wa-align-items-start wa-flank" style="--flank-size: 15%;">
      <dt class="wa-heading-xs">Attachments</dt>
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
### Narrow with Invoice Details
```html{.example}
<wa-card with-header with-footer class="wa-callout wa-neutral" style="max-width: 480px; margin: 0 auto;">
  <div slot="header" class="wa-split">
    <dl class="wa-stack wa-gap-2xs">
      <dt class="wa-heading-s">Amount</dt>
      <dd class="wa-heading-l">$10,560.00</dd>
    </dl>
    <wa-badge appearance="filled outlined" variant="success">Paid</wa-badge>
  </div>
  <div>
    <dl class="wa-stack" style="margin: 0;">
      <div class="wa-flank wa-align-items-stretch">
        <dt><wa-icon name="user"></wa-icon></dt>
        <dd class="wa-heading-s">Sam Wilson</dd>
      </div>
      <div class="wa-flank wa-align-items-stretch">
        <dt><wa-icon name="calendar-days"></wa-icon></dt>
        <dd class="wa-heading-s">June 8, 2015</dd>
      </div>
      <div class="wa-flank wa-align-items-stretch">
        <dt><wa-icon family="brands" name="cc-visa"></wa-icon></dt>
        <dd class="wa-heading-s">Paid with Visa</dd>
      </div>
    </dl>
  </div>
  <div slot="footer">
    <a href="#" class="wa-flank wa-align-items-center wa-gap-2xs">
      <span>Download Receipt</span>
      <wa-icon name="arrow-right"></wa-icon>
    </a>
  </div>
</wa-card>
```