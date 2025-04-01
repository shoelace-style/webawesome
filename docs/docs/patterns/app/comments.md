---
title: Comments
description: 'For feedback forms and message boxes'
---

## In card with footer
```html{.example}
<form class="comment-box" style="max-width: 960px; margin: 0 auto;">
  <wa-card with-footer>
    <wa-textarea resize="horizontal"></wa-textarea>
    <div slot="footer" class="wa-cluster" style="justify-content: flex-end;">
      <wa-button appearance="outlined">
        <wa-icon slot="prefix" name="paperclip" variant="solid"></wa-icon>
        Attach a file
      </wa-button>
      <wa-button variant="success">Comment</wa-button>
    </div>
  </wa-card>
</form>
```

## with avatar and icon buttons
```html{.example}
<div class="wa-callout wa-neutral wa-outlined" style="max-width: 960px; margin: 0 auto;">
  <div class="wa-align-items-start wa-flank">
    <wa-avatar image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" label="User avatar"></wa-avatar>
    <div class="wa-stack wa-gap-s">
      <wa-textarea placeholder="Add to the conversation..." size="medium"></wa-textarea>
      <div class="wa-split">
        <div>
          <wa-icon-button name="link" variant="solid" label="Bold"></wa-icon-button>
          <wa-icon-button name="face-smile" variant="solid" label="Italic"></wa-icon-button>
        </div>
        </wa-button><wa-button>Comment</wa-button>
      </div>
    </div>
  </div>
</div>
```

## With multiple actions

```html{.example}
<wa-card with-header with-footer style="max-width: 640px; margin: 0 auto;">
  <div slot="header">
    <h2 class="wa-heading-s">I watched...</h2>
  </div>
  <div class="wa-stack">
    <div class="wa-flank">
      <div>
        <img src="https://a.ltrbxd.com/resized/film-poster/1/0/2/5/3/3/1/1025331-heretic-2024-0-1000-0-1500-crop.jpg?v=c79c5c8121" width="40"/>
      </div>
        <span class="wa-heading-l">Heretic</span>
    </div>
    <wa-divider></wa-divider>
    <div class="wa-split">
      <span class="wa-heading-s">Date</span><span class="wa-caption-m">Thursday, March 13, 2025</span>
    </div>
    <wa-divider></wa-divider>
    <div class="wa-split">
      <wa-rating label="Rating"></wa-rating>
      <wa-checkbox>Loved it!</wa-checkbox>
    </div>
    <wa-divider></wa-divider>
    <wa-textarea placeholder="Add review..."></wa-textarea>
  </div>
  <div slot="footer" class="wa-grid">
    <wa-button appearance="outlined">Cancel</wa-button>
    <wa-button variant="brand">Save</wa-button>
  </div>
</wa-card>
```
## with preview
```html{.example}
<div style="max-width: 60ch; margin: 0 auto;">
  <wa-card class="wa-border-radius-square" with-footer>
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
          <wa-textarea></wa-textarea>
        </div>
      </wa-tab-panel>
      <wa-tab-panel name="preview">Your content will be will render here.</wa-tab-panel>
    </wa-tab-group>
    <div slot="footer" class="wa-cluster" style="justify-content: flex-end;">
      <wa-button size="small">Post</wa-button>
    </div>
  </wa-card>

</div>
```