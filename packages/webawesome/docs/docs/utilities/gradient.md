---
title: Color Gradients
description: TBD
layout: docs
tags: styleUtilities
synonyms:
  - text color
  - foreground color
  - colour
  - color utility
  - semantic color
use-cases:
  - brand color
  - status color
  - theme color
  - background color
  - danger color
  - success color
---

{% set gradientClasses = ["wa-gradient-rainbow", "wa-gradient-warm", "wa-gradient-cool", "wa-gradient-brand"] %}

<div class="wa-grid">
  {%- for class in gradientClasses -%}
    <div class="{{ class }}" style="inline-size: 100%; aspect-ratio: 1; border-radius: 0.5rem;"></div>
  {%- endfor -%}
</div>
<div class="wa-grid">
  {%- for class in gradientClasses -%}
    <h2 class="{{ class }} wa-text-gradient wa-font-size-4xl">Gradient</h2>
  {%- endfor -%}
</div>