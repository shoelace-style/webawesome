---
title: Comments
description: TODO
parent: app
tags: app
---

```html{.example}
<form class="comment-box">
<wa-card with-footer>
  <wa-textarea resize="auto"></wa-textarea>
  <div slot="footer" class="comment-footer">
    <wa-button variant="text">
  <wa-icon slot="prefix" name="paperclip" variant="solid"></wa-icon>
  Attach a file
</wa-button><wa-button>Comment</wa-button>
  </div>
</wa-card>
</form>
<style>
  .comment-box {
    wa-card {
      width: 100%;
    }


    div.comment-footer {
      display: flex;
      justify-content: space-between;

    }
  }
</style>
```