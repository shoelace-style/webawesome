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
    title: Vue
    icon_name: "vuejs"
    href: "/docs/frameworks/vue"

  # Vue 2
  - color: "#41b883"
    title: Vue 2
    icon_name: "vuejs"
    href: "/docs/frameworks/vue-2"

  # Express
  - color: "black"
    title: Express
    icon_src: "/assets/images/logos/logo-express-black.svg"
    href: "/docs/frameworks/express"
    dark:
      color: "white"
      icon_src: "/assets/images/logos/logo-express-white.svg"

  # Astro
  - color: "#41b883"
    title: Astro
    icon_src: "/assets/images/logos/astro-logo-dark.svg"
    href: "/docs/frameworks/astro"
    dark:
      icon_src: "/assets/images/logos/astro-logo-light-gradient.svg"

  # Build Awesome
  - color: "#00a776"
    title: Build Awesome (11ty)
    icon_name: "build-awesome"
    href: "/docs/frameworks/buildawesome"
---

<style>
  .framework-icon {
    font-size: var(--wa-font-size-4xl);
    color: var(--color, currentColor);
  }
</style>

Web Awesome is designed to work in harmony with various frameworks. We have documented some of the most common ones including setup and limitations.

Select your framework below to get started.

<div class="wa-grid" style="--min-column-size: 20ch;">
  {# sort alphabetically #}
  {%- for framework in frameworks | sort(false, true, 'title') -%}
    <a href="{{ framework.href }}" class="wa-link-plain hover-grow hover-emphasize-border">
      <wa-card appearance="outlined" style="height: 100%;">
        <div class="wa-stack wa-align-items-center">
          <wa-icon
            class="
              framework-icon
              {% if framework.dark -%}only-light{%- endif -%}
            "
            {% if framework.icon_name -%}
              name="{{ framework.icon_name }}"
              family="brands"
            {% elif framework.icon_src -%}
              src="{{ framework.icon_src }}"
            {% endif -%}
            style="--color: {{ framework.color }};"
          ></wa-icon>
          {%- if framework.dark -%}
            <wa-icon
              class="
                framework-icon
                {% if framework.dark %}only-dark{% endif %}
              "
              {% if framework.dark.icon_name -%}
                name="{{ framework.dark.icon_name }}"
                family="brands"
              {% elif framework.dark.icon_src -%}
                src="{{ framework.dark.icon_src }}"
              {% endif -%}
              style="--color: {{ framework.dark.color or framework.color or "currentColor" }};"
            ></wa-icon>
          {%- endif -%}
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