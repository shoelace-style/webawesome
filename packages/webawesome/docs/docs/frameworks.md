---
title: Frameworks
description: Using Web Awesome with frameworks.
layout: docs
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
  - color: "#ff5d01"
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

Web Awesome is built on standard web components, so it works with any framework. These guides cover setup and known limitations for the most common ones.

<div class="modern-card-list">
  <section class="search-list-grid">
  {%- for framework in frameworks | sort(false, true, 'title') -%}
    <a href="{{ framework.href }}" class="wa-link-plain hover-grow hover-emphasize-border">
      <wa-card class="framework-card">
        <div class="framework-logo">
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
        </div>
        <span class="page-name">
          {{ framework.title }}
        </span>
      </wa-card>
    </a>
  {%- endfor -%}
  </section>
</div>


<div class="wa-placeholder wa-stack wa-gap-2xl wa-align-items-center wa-justify-content-center wa-text-center">
  <div class="wa-stack wa-align-items-center">
    <wa-icon name="puzzle" variant="regular" class="wa-font-size-3xl"></wa-icon>
    <h3 class="font-brand wa-heading-xl" data-no-anchor>Don't See Your Framework?</h3>
    <p class="text-wrap-balance line-length line-length-m">We document the most common frameworks, but we're always adding more. Tell us what you're building with and we'll consider a guide.</p>
  </div>
  <wa-button href="{{ site.github.ideas }}">
    <wa-icon name="lightbulb-on" slot="start" variant="regular"></wa-icon>
    Request a Framework
  </wa-button>
</div>
