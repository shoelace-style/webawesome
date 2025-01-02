---
title: Layout
description: Browse Web Awesome's components and utilities for creating responsive web layouts.
layout: page-outline
categories: ["components", "utilities"]
---

<style>
  wa-page > main {
    max-width: 120ch;
    margin-inline: auto;
  }
  .index-grid wa-card::part(header) {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-bottom: none;
  }
  wa-card .component-name,
  wa-card .page-name {
    font-size: var(--wa-font-size-s);
    font-weight: var(--wa-font-weight-action);
  }
</style>

<p style="max-width: 80ch">Layout components and utility classes help you organize content that can adapt to any device or screen size. Browse the collection of responsive layout tools included in Web Awesome Pro.</p>

{% set allPages = collections.layout %}
{% include "grouped-pages.njk" %}
