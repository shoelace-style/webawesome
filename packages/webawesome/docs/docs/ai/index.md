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
  <section class="search-list-grid">
    <a class="hover-grow hover-emphasize-border" href="/docs/ai/agent-skills">
      <wa-card>
        <div class="wa-split" style="margin-block-end: var(--wa-space-s);">
          <span class="page-name">Agent Skills</span>
          <wa-badge variant="brand" appearance="accent" pill>Recommended</wa-badge>
        </div>
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

We're a small team, and like most people building things these days, we use AI tools regularly. They help us move faster: exploring ideas, writing boilerplate, catching edge cases, and getting more done in less time.

But Web Awesome is an open-source library that a lot of people rely on, so we want to be clear about how we use AI.

<h3 data-no-anchor>Human-led, AI-assisted</h3>

Everything in Web Awesome is built and owned by humans. AI is a capable assistant, but it never gets the final say. The humans on our team are always responsible for:

- The original ideas and vision
- The architecture and design decisions
- The critical thinking about what's right for the library and its users
- The review, testing, and polish at the end

No component, page, or feature ever ships as pure AI output. There's always substantial human direction, judgment, and final approval behind it.

This lets us ship better work more quickly, without giving up the human judgment that production-ready software demands.

**Human ideas. Human architecture. Human verification.** AI just helps us build what we were going to build anyway… only faster.

<wa-icon name="heart" variant="regular" animation="beat" label="love" style="color: var(--wa-brand-orange);"></wa-icon> The Web Awesome Team
