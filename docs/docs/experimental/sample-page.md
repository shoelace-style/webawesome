---
title: Sample Page
description: TODO
layout: blank
---

<style>
  [slot='banner'] {
    background-color: pink;
  }
  [slot='header'] {
    background-color: peachpuff;
  }
  [slot='subheader'] {
    background-color: papayawhip;
  }
  [slot='navigation-header'] {
    background-color: lemonchiffon;
  }
  [slot='navigation'] {
    background-color: honeydew;
  }
  [slot='navigation-footer'] {
    background-color: paleturquoise;
  }
  [slot='main-header'] {
    background-color: lavenderblush;
  }
  main {
    background-color: lavender;
  }
  [slot='main-footer'] {
    background-color: thistle;
  }
  [slot='aside'] {
    background-color: lightcyan;
  }
  [slot='footer'] {
    background-color: lightsteelblue;
  }
</style>

<wa-page>
  <section slot="banner">Banner</section>
  <header slot="header">Header</header>
  <nav slot="subheader">Subheader</nav>
  <nav slot="navigation-header">Nav Header</nav>
  <nav slot="navigation">Nav</nav>
  <nav slot="navigation-footer">Nav Footer</nav>
  <div slot="main-header">Main Header</div>
  <main>Main</main>
  <div slot="main-footer">Main Footer</div>
  <aside slot="aside">Aside</aside>
  <footer slot="footer">Footer</footer>
</wa-page>