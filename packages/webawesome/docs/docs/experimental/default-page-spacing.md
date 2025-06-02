---
title: Default Layout and Spacing
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
    height: 100%;
  }
  [slot='main-footer'] {
    background-color: thistle;
  }
  [slot='aside'] {
    background-color: lightcyan;
    height: 100%;
  }
  [slot='footer'] {
    background-color: lightsteelblue;
  }
</style>

<wa-page>
  <section slot="banner">
    <strong>Banner</strong>
    <span>Banner</span>
    <span>Banner</span>
  </section>
  <header slot="header">
    <strong>Header</strong>
    <span>Header</span>
    <span>Header</span>
  </header>
  <nav slot="subheader">
    <strong>Subheader</strong>
    <span>Subheader</span>
    <span>Subheader</span>
  </nav>
  <nav slot="navigation-header">
    <strong>Nav Header</strong>
    <span>Nav Header</span>
    <span>Nav Header</span>
  </nav>
  <nav slot="navigation">
    <strong>Navigation</strong>
    <span>Navigation</span>
    <span>Navigation</span>
  </nav>
  <nav slot="navigation-footer">
    <strong>Nav Footer</strong>
    <span>Nav Footer</span>
    <span>Nav Footer</span>
  </nav>
  <div slot="main-header">
    <strong>Main Header</strong>
    <span>Main Header</span>
    <span>Main Header</span>
  </div>
  <main>
    <h1>Main</h1>
    <p>No flex properties here! The author can specify their own preferred content flow and layout in the default slot.</p>
  </main>
  <div slot="main-footer">
    <strong>Main Footer</strong>
    <span>Main Footer</span>
    <span>Main Footer</span>
  </div>
  <aside slot="aside">
    <strong>Aside</strong>
    <span>Aside</span>
    <span>Aside</span>
  </aside>
  <footer slot="footer">
    <strong>Footer</strong>
    <span>Footer</span>
    <span>Footer</span>
  </footer>
</wa-page>