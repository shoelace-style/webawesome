---
title: Test page Page
description: A sample page for a media app using Web Awesome's page component.
layout: blank
eleventyExcludeFromCollections: true
---
<wa-page>
  <div slot="menu" style="background: red; height: 100%;">
    Hello World
  </div>
  <header slot="header" style="">Brand</header>
  <main>
    <p>Short content</p>
  </main>
  <footer slot="footer" style="">© Footer</footer>
</wa-page>