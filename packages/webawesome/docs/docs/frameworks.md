---
title: Frameworks
description: Using Web Awesome with frameworks.
layout: page-outline
hasOutline: false
synonyms:
  - integrations
  - libraries
  - spa
use-cases:
  - react
  - vue
  - angular
  - svelte
  - next.js


frameworks:
  # Angular
  - color: "#dd0031"
    title: Angular
    icon_name: "angular"
    href: "/docs/frameworks/angular"

  # React
  - color: "#61dafb"
    title: React
    icon_name: "react"
    href: "/docs/frameworks/react"

  # Svelte
  - color: "#ff3e00"
    title: Svelte
    icon_name: "svelte"
    href: "/docs/frameworks/svelte"

  # Vue 3
  - color: "#41b883"
    title: Vue 3
    icon_name: "vuejs"
    href: "/docs/frameworks/vue"

  # Nuxt
  - color: "#41b883"
    title: Nuxt
    icon_name: "nuxt"
    href: "/docs/frameworks/nuxt"

  # Express
  - color: "#41b883"
    title: Express
    icon_name: "expressjs"
    href: "/docs/frameworks/express"

  # Astro
  - color: "#41b883"
    title: Astro
    icon_name: "astrojs"
    href: "/docs/frameworks/astro"
---


Web Awesome is designed to work in harmony with various frameworks. We have documented some of the most common ones including setup and limitations.

Select your framework below to get started.

<div class="wa-grid" style="--min-column-size: 20ch;">
  {# sort alphabetically #}
  {%- for framework in frameworks | sort(false, true, 'title') -%}
    <a href="{{ framework.href }}" class="wa-link-plain hover-grow hover-emphasize-border">
      <wa-card appearance="outlined" style="height: 100%;">
        <div class="wa-stack wa-align-items-center">
          <wa-icon
            {% if framework.icon_name -%}
              name="{{ framework.icon_name }}"
              family="brands"
            {% elif framework.icon_src -%}
              src="{{ framework.icon_src }}"
            {% endif -%}
            style="
              font-size: var(--wa-font-size-4xl);
              {% if framework.color -%}
                color: {{ framework.color }};
              {%- endif %}
            "
          ></wa-icon>
          <span class="wa-heading-m">
            {{ framework.title }}
          </span>
        </div>
      </wa-card>
    </a>
  {%- endfor -%}
</div>


<p style="margin-top: 4rem; text-align: center;">
  <a href="https://github.com/shoelace-style/webawesome/discussions/new?category=ideas-suggestions">
    Don't see your framework here? Feel free to open a discussion!
  </a>
</p>