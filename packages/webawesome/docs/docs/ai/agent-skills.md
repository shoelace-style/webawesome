---
title: Agent Skills
description: Two complementary Agent Skills that help AI tools work with Web Awesome — components and design.
layout: page-outline
---

The [Agent Skills specification](https://agentskills.io/) is a standard for providing structured documentation to AI coding assistants. It helps AI tools understand your project's APIs, conventions, and best practices through a well-organized directory of markdown files.

Web Awesome publishes **two complementary Agent Skills** that are designed to work together. If your tool supports loading more than one skill, install both — they cross-reference each other, and the combination covers the full range of design and component work an AI tool will hit on a real task.

| Skill               | Answers the question                             | Reach for it when you're                                                          |
| ------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------- |
| `webawesome`        | "What does this component do?"                   | Working with a specific component's properties, slots, events, or framework setup |
| `webawesome-design` | "How do I build a good-looking page with these?" | Laying out a page (`<wa-page>`), theming on-brand, or composing a polished UI     |

### Which Skill Do I Need?

The simplest way to decide:

- **Reaching for a specific component** (a button, an input, a dialog) and you need its exact API? That's the **`webawesome`** skill.
- **Starting from a goal rather than a component** ("build a landing page", "make this match our brand", "lay out a dashboard")? That's the **`webawesome-design`** skill.

In practice the two overlap on real tasks. "Build a settings page" starts in `webawesome-design` (layout, spacing, theming), then leans on `webawesome` for the exact API of each `wa-input` and `wa-switch` along the way. That's why they cross-reference each other, and why installing both gives AI tools the most complete picture.

If you can only install one, pick `webawesome` for component-heavy work and `webawesome-design` for design-heavy work. Most real tasks benefit from both.

:::warning
This feature is experimental! The Agent Skills format and its contents may change as we refine the output based on feedback and evolving AI capabilities.
:::

## Why Use Them?

When working with AI coding assistants like Claude Code, Cursor, or other tools that support Agent Skills, these skills give the AI deep context about Web Awesome. They cover both the component APIs and how to design with them, which leads to more accurate code suggestions, fewer hallucinations, and output that actually looks designed.

Unlike a single file, Agent Skills use progressive disclosure. The AI loads only the documentation it needs for the current task, so a large reference doesn't bloat the context window. Each skill also triggers on its own kind of request, so the right one loads when you ask for it.

### Skill Quality

Both skills are kept in sync with the library by tooling. The `webawesome` skill is generated from the Custom Elements Manifest on every release, so it matches the current component API exactly. The `webawesome-design` skill is hand-authored but verified — every component tag, attribute, slot, and CSS custom property it cites is cross-checked against the library on every build, so it can't claim something the components don't actually do.

## How to Use Them

Both skills ship in every Web Awesome build and are available in your `node_modules` directory after installing via npm:

```
node_modules/@awesome.me/webawesome/dist/skills/webawesome/
node_modules/@awesome.me/webawesome/dist/skills/webawesome-design/
```

How you reference them depends on your AI tool.

### Claude Code

With [Claude Code](https://claude.ai/code), install either or both skills using the [skills CLI](https://skills.sh/):

```bash
# Install the component skill, the design skill, or both
npx skills add ./node_modules/@awesome.me/webawesome/dist/skills/webawesome
npx skills add ./node_modules/@awesome.me/webawesome/dist/skills/webawesome-design

# Uninstall
npx skills remove webawesome
npx skills remove webawesome-design
```

Once installed, the skills are available to Claude Code automatically, and it loads the right one based on what you ask for. They're installed as symlinks, so they stay up to date when you update Web Awesome via npm.

You can also reference a skill directory manually, or point Claude at a specific reference file:

```
@node_modules/@awesome.me/webawesome/dist/skills/webawesome/
@node_modules/@awesome.me/webawesome/dist/skills/webawesome/references/components/button.md
@node_modules/@awesome.me/webawesome/dist/skills/webawesome-design/references/layouts-page.md
```

### Cursor

In [Cursor](https://cursor.sh/), open **Cursor Settings → Features → Docs**, click **+ Add new doc**, and point it at the skill directory in your `node_modules` folder:

```
node_modules/@awesome.me/webawesome/dist/skills/webawesome/
node_modules/@awesome.me/webawesome/dist/skills/webawesome-design/
```

Add both as separate doc sources if you want both skills available. Cursor will index the markdown and surface it via @-mention or as relevant context.

### Other AI Tools

The skills follow the [Agent Skills specification](https://agentskills.io/), so any tool that supports the spec should be able to use them. We've tested in Claude Code and Cursor. If your tool can load a directory of markdown references on demand, point it at the same `node_modules/@awesome.me/webawesome/dist/skills/` directories shown above.

<div class="wa-flank:end">
  <h2>The Component Skill</h2>
  <code>webawesome</code>
</div>

The `webawesome` skill is the **component reference**. It's generated from the library on every build, so it always matches the current API. Use it when you need to know what a component does: its properties, slots, events, CSS parts, or framework integration.

The skill directory contains:

```
webawesome/
├── SKILL.md                       # Overview, quick start, and component listing
└── references/
    ├── choosing-components.md     # Decision tree by user intent — start here
    ├── components/                # Individual documentation for each component
    ├── frameworks/                # React, Vue, Angular, Svelte guides
    ├── utilities/                 # Layout and styling utilities
    ├── tokens/                    # Design tokens (color, space, typography, etc.)
    ├── installation.md            # Installation guide
    ├── usage.md                   # Usage patterns
    ├── form-controls.md           # Form integration
    ├── themes.md                  # Themes and color palettes
    └── ...
```

It covers:

- **Component decision tree:** a "which component should I use?" reference organized by user intent (pick one, pick many, show feedback, etc.) — closes the most common gap, which is picking the wrong component for the job
- **Component documentation:** every component's full API (properties, slots, methods, events, CSS parts, and customization), with examples
- **Installation & usage:** npm, CDN, and self-hosting options, plus working with attributes, properties, events, methods, and slots
- **Form controls:** form integration and validation
- **Theming & utilities:** themes, color palettes, and layout utilities (stack, cluster, grid, etc.)
- **Framework guides:** integration with React, Vue, Angular, and Svelte

<div class="wa-flank:end">
  <h2>The Design Skill</h2>
  <code>webawesome-design</code>
</div>

The `webawesome-design` skill is the **design companion**. Where the component skill answers "what does this component do?", this one answers "how do I build a good-looking page with these?" It's hand-authored guidance on layout, theming, and visual composition, and it triggers on design requests like "build a landing page," "make an app layout," or "match our brand color."

The skill directory contains:

```
webawesome-design/
├── SKILL.md                  # Layout decision gate, core rules, recommended starting points, structural Final Pass
└── references/
    ├── layouts-page.md       # Full-page layouts with <wa-page> + a <wa-page>-specific structural checklist
    ├── layouts-inpage.md     # Sections, widgets, and embeds (utilities only)
    ├── theming.md            # Themes, palettes, light/dark, brand color, tokens
    ├── composition.md        # Spacing, layout utilities, companion utilities, typography, surfaces, images, custom CSS playbook
    ├── patterns.md           # Best-practice recipes (app shell, login, settings, dashboard, hero)
    └── getting-started.md    # The opinionated default setup
```

It covers:

- **Layout:** when and how to use `<wa-page>` for full-page layouts (with an explicit landing-page vs. app-shell branch to head off the most common sidebar mistake), and how to compose sections, widgets, and forms with layout utilities when `<wa-page>` isn't the right fit
- **Theming:** choosing themes and palettes, light and dark mode, matching a brand color, and customizing with `--wa-*` tokens
- **Composition:** spacing rhythm, the layout-utility decision guide, typography, surfaces, images/placeholders, and a Companion utilities reference (alignment, text, sizing, color, accessibility) so AI tools reach for utility classes instead of inline styles
- **Custom CSS playbook:** a seven-point playbook for the times AI tools genuinely need to write custom CSS — semantic tokens for dark mode, `*-on-*` pairings for WCAG contrast, the `loud`/`normal`/`quiet` step as a contrast lever, and the shadow-DOM cascade boundary so custom rules target your own elements rather than fighting component internals
- **Self-check passes:** a **structural** final pass in the main skill (markup, slot decisions, rule compliance) plus a **visual polish** checklist in composition.md (rhythm, hierarchy, contrast on surfaces) and a `<wa-page>`-specific structural checklist in layouts-page.md
- **Recipes:** best-practice starting points for common screens

## Agent Skills vs llms.txt

Web Awesome provides both an [llms.txt file](/docs/ai/llms) and [Agent Skills](https://agentskills.io/). Here's when to use each:

| Feature       | Agent Skill                              | llms.txt                      |
| ------------- | ---------------------------------------- | ----------------------------- |
| Format        | Directory with multiple markdown files   | Single text file              |
| Best for      | Deep integration, complex tasks          | Quick context, simple queries |
| Context usage | Progressive disclosure (loads as needed) | Loads everything at once      |
| Supported by  | Tools supporting agentskills.io spec     | Most AI tools                 |

:::info
If your AI tool supports Agent Skills, **we recommend using the skills** for better context efficiency. Otherwise, the `llms.txt` file is a great fallback.
:::

## Feedback

Since this is experimental, we'd love to hear how it works for you! If you find issues with the generated content or have suggestions for improvement, please [open an issue on GitHub]({{ site.github.issues }}).
