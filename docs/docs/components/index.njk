---
title: Components
description: Components are the essential building blocks to create intuitive, cohesive experiences. Browse the library of customizable, framework-friendly web components included in Web Awesome.
layout: page-outline
categories:
  - actions
  - feedback: 'Feedback & Status'
  - imagery
  - inputs
  - navigation
  - organization
  - helpers: 'Utilities'
override:tags: []
---

<div id="component-filter">
  <wa-input type="search" placeholder="Search components" clearable autofocus></wa-input>
</div>

{% set allPages = collections.components %}
{% include "grouped-pages.njk" %}

<div id="component-filter-empty" hidden>
  No results
</div>

<script type="module">
  const container = document.getElementById('component-filter');
  const empty = document.getElementById('component-filter-empty');
  const grid = document.getElementById('content');
  const input = container.querySelector('wa-input');

  function updateResults() {
    const filter = input.value.toLowerCase().trim();

    // Hide headings while filtering
    grid.querySelectorAll('h2').forEach(heading => {
      heading.hidden = filter === '' ? false : true;
    });

    // Show matching components
    grid.querySelectorAll('a:has(> wa-card)').forEach(link => {
      console.log(link);
      const content = link.textContent.toLowerCase();
      const keywords = link.getAttribute('data-keywords') || '';
      const isMatch = filter === '' || (content + keywords).includes(filter);
      link.hidden = !isMatch;
    });

    // Show empty state when there's a search filter and no results
    if (filter !== '' && grid.querySelector('a:not([hidden])') === null) {
      empty.hidden = false;
    } else {
      empty.hidden = true;
    }
  }

  input.addEventListener('wa-input', updateResults);
</script>

<style>
  wa-card#drawer-card::part(header) {
    --spacing: 0;
    justify-content: flex-end;
    overflow: hidden;
  }

  #component-filter {
    margin-block-end: var(--wa-space-xl);
  }

  #component-filter-empty {
    border: dashed var(--wa-border-width-m) var(--wa-color-neutral-border-quiet);
    border-radius: var(--wa-border-radius-l);
    font-size: var(--wa-font-size-l);
    color: var(--wa-color-text-quiet);
    text-align: center;
    padding-block: var(--wa-space-2xl);
    margin-block-start: 0
  }
</style>
