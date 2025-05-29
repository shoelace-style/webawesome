---
title: Comments
description: 'Enable users to engage in discussions, provide feedback, or record their thoughts.'
isPro: true
---

## Card with Header & Footer

```html {.example}
<form style="max-width: 60ch; margin: auto">
  <wa-card>
    <div slot="header" id="comment-area-label">
      <span class="wa-heading-s">Leave a Comment</span>
    </div>
    <wa-textarea aria-labelledby="comment-area-label"></wa-textarea>
    <div slot="footer" class="wa-cluster" style="justify-content: flex-end">
      <wa-button appearance="filled" size="small">
        <wa-icon slot="prefix" name="paperclip" variant="solid"></wa-icon>
        Attach a file
      </wa-button>
      <wa-button variant="brand" size="small">Comment</wa-button>
    </div>
  </wa-card>
</form>
```

## Card with Thread

```html {.example}
<wa-card style="max-width: 60ch; margin: auto">
  <div class="wa-stack">
    <h3 class="wa-heading-m">Comments</h3>
    <wa-textarea aria-label="Comment"></wa-textarea>
    <wa-button variant="brand">Add Comment</wa-button>
    <wa-divider></wa-divider>
    <ul class="wa-stack">
      <li class="wa-stack wa-gap-2xs">
        <div class="wa-flank">
          <wa-avatar initials="RF" label="User avatar"></wa-avatar>
          <div class="wa-cluster">
            <strong>Robert Fox</strong>
            <span class="wa-caption-m"
              >commented <wa-relative-time date="2025-03-31T09:17:00-04:00"></wa-relative-time
            ></span>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras convallis mollis nunc, vel tempor sem faucibus
          nec. Suspendisse potenti. Pellentesque lobortis pulvinar nulla non tempor. Interdum et malesuada fames ac ante
          ipsum primis in faucibus.
        </p>
      </li>
      <div class="wa-flank wa-gap-xl">
        <wa-divider orientation="vertical" style="height: auto; align-self: stretch"></wa-divider>
        <ul class="wa-stack">
          <li class="wa-stack wa-gap-2xs">
            <div class="wa-flank">
              <wa-avatar initials="VF" label="User avatar"></wa-avatar>
              <div class="wa-cluster">
                <strong>Virginia Woolf</strong>
                <span class="wa-caption-m"
                  >commented <wa-relative-time date="2025-03-31T12:32:00-04:00"></wa-relative-time
                ></span>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras convallis mollis nunc, vel tempor sem
              faucibus nec.
            </p>
          </li>
          <li class="wa-stack wa-gap-2xs">
            <div class="wa-flank">
              <wa-avatar initials="CV" label="User avatar"></wa-avatar>
              <div class="wa-cluster">
                <strong>Clarissa Vaughan</strong>
                <span class="wa-caption-m">commented <wa-relative-time></wa-relative-time></span>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras convallis mollis nunc, vel tempor sem
              faucibus nec.
            </p>
          </li>
          <li class="wa-cluster">
            <wa-icon name="reply"></wa-icon>
            <a href="">Leave a reply</a>
          </li>
        </ul>
      </div>
    </ul>
  </div>
</wa-card>
```

## With Avatar & Additional Actions

```html {.example}
<div class="wa-align-items-start wa-flank">
  <wa-avatar
    image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    label="User avatar"
  ></wa-avatar>
  <div class="wa-stack wa-gap-s">
    <wa-textarea placeholder="Add to the conversation..." aria-label="Add comment"></wa-textarea>
    <div class="wa-split">
      <div class="wa-cluster wa-gap-s">
        <wa-icon-button name="paperclip" label="Attach File" id="attach-button"></wa-icon-button>
        <wa-tooltip for="attach-button">Attach File</wa-tooltip>
        <wa-icon-button name="face-smile" label="Add Sticker" id="sticker-button"></wa-icon-button>
        <wa-tooltip for="sticker-button">Add Sticker</wa-tooltip>
      </div>
      <wa-button variant="brand">Comment</wa-button>
    </div>
  </div>
</div>
```

## Rich Card with Multiple Actions

```html {.example}
<wa-card style="max-width: 60ch; margin: auto">
  <div slot="header">
    <h3 class="wa-heading-s">I watched...</h3>
  </div>
  <div class="wa-stack">
    <div class="wa-flank" style="--flank-size: 3rem">
      <div class="wa-frame:portrait wa-border-radius-s">
        <img
          src="https://images.unsplash.com/photo-1607675742178-f616ae75044b?q=80&w=3435&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="the cover image for the film"
        />
      </div>
      <span class="wa-heading-l">Heretic</span>
    </div>
    <wa-divider></wa-divider>
    <dl class="wa-split">
      <dt>Date</dt>
      <dd>
        <wa-format-date
          date="2025-03-13T00:00:00.000-04:00"
          weekday="long"
          month="long"
          day="numeric"
          year="numeric"
          class="wa-caption-m"
        ></wa-format-date>
      </dd>
    </dl>
    <wa-divider></wa-divider>
    <div class="wa-split">
      <wa-rating label="Rating"></wa-rating>
      <wa-checkbox>Loved it!</wa-checkbox>
    </div>
    <wa-divider></wa-divider>
    <wa-textarea placeholder="Add review..." aria-label="Add review"></wa-textarea>
  </div>
  <div slot="footer" class="wa-grid">
    <wa-button appearance="outlined">Cancel</wa-button>
    <wa-button variant="brand">Save</wa-button>
  </div>
</wa-card>
```

## With Preview Pane

```html{.example}
<div style="max-width: 60ch; margin: 0 auto;">
  <wa-card class="wa-border-radius-square">
    <h3 class="wa-heading-m">Add a comment</h3>
    <wa-tab-group>
      <wa-tab panel="write">Write</wa-tab>
      <wa-tab panel="preview">Preview</wa-tab>
      <wa-tab-panel name="write">
        <div class="wa-stack">
          <div class="wa-cluster wa-gap-xs"  style="justify-content: flex-end;">
            <wa-icon-button name="link" label="add link"></wa-icon-button>
            <wa-icon-button name="at" label="mention collaborator"></wa-icon-button>
            <wa-icon-button name="hashtag" label="change heading"></wa-icon-button>
          </div>
          <wa-textarea aria-label="Add a comment"></wa-textarea>
        </div>
      </wa-tab-panel>
      <wa-tab-panel name="preview">Your content will render here.</wa-tab-panel>
    </wa-tab-group>
    <div slot="footer" class="wa-cluster" style="justify-content: flex-end;">
      <wa-button appearance="outlined" size="small">Post</wa-button>
    </div>
  </wa-card>

</div>
```
