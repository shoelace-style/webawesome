---
title: Using Web Awesome with AI
description: Web Awesome publishes llms.txt and Agent Skills to help AI coding assistants understand and work with the library.
layout: page-outline
hasBreadcrumbs: false
---

Web Awesome publishes machine-readable documentation so AI coding assistants can understand its components and help you write better code. Whether you're using Claude, ChatGPT, Copilot, Cursor, or another tool, you can give it context about Web Awesome's APIs, properties, events, slots, and more.

## AI-ready Documentation

We provide two formats for giving AI tools context about Web Awesome. Both formats are generated automatically with every Web Awesome build and are available in your `node_modules` directory after installing via npm.

<div class="modern-card-list">
  <section class="search-list-grid" style="grid-template-columns: repeat(2, 1fr);">
    <a class="hover-grow hover-emphasize-border" href="/docs/ai/agent-skills">
      <wa-card>
        <span class="page-name">Agent Skills <wa-badge variant="brand" appearance="accent" pill>Recommended</wa-badge></span>
        <p class="modern-card-summary">A structured directory of markdown files that AI tools load progressively, fetching only the documentation relevant to the current task. The best option for tools that support it, such as Claude Code.</p>
      </wa-card>
    </a>
    <a class="hover-grow hover-emphasize-border" href="/docs/ai/llms">
      <wa-card>
        <span class="page-name">LLMs.txt</span>
        <p class="modern-card-summary">A single text file containing the full API reference for every component. Works with nearly any AI tool that accepts file uploads, URLs, or pasted context.</p>
      </wa-card>
    </a>
  </section>
</div>

## AI Policy

We're a small team maintaining Web Awesome, and like most people building things these days, we use AI tools regularly. They help us move faster, explore ideas, write boilerplate, catch edge cases, and get more done in less time.

That said, we want to be clear about how we use AI, especially since this is an open-source library that a lot of people rely on.

### Human-led, AI-assisted

Everything in Web Awesome is built and owned by humans. AI is a capable assistant, but it never gets the final say. We always bring:

- The original ideas and vision
- The overall architecture and design decisions
- The critical thinking about what makes sense for the library and its users
- The careful review, testing, and polishing at the end

No component, documentation page, or feature ever ships as pure AI output. There's always substantial human direction, judgment, and final approval.

This approach lets us ship better work more quickly without losing the human judgment that production-ready software demands.

**Human ideas. Human architecture. Human verification.** AI just helps us build what we were going to build anyways…just faster.

— The Web Awesome Team
