---
title: Comments
description: TODO
parent: app
tags: app
---

```html{.example}
<form class="comment-box" style="max-width: 960px; margin: 0 auto;">
<wa-card with-footer>
  <wa-textarea resize="horizontal"></wa-textarea>
  <div slot="footer" class="comment-footer">
    <wa-button variant="text">
  <wa-icon slot="prefix" name="paperclip" variant="solid"></wa-icon>
  Attach a file
</wa-button><wa-button>Comment</wa-button>
  </div>
</wa-card>
</form>
```

```html{.example}
<div class="wa-callout wa-neutral wa-outlined" style="max-width: 960px; margin: 0 auto;">
  <div class="wa-align-items-start wa-flank">
    <wa-avatar image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" label="User avatar"></wa-avatar>
    <div class="wa-stack wa-gap-s">
      <wa-textarea placeholder="Medium" size="medium"></wa-textarea>
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