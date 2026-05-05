---
title: Agent Skills
description: Web Awesome publishes an Agent Skill to help AI coding assistants understand and work with our components.
layout: page-outline
---

The [Agent Skills specification](https://agentskills.io/) is a standard for providing structured documentation to AI coding assistants. It helps AI tools understand your project's APIs, conventions, and best practices through a well-organized directory of markdown files.

{{ site.name }} publishes an Agent Skill that provides AI tools with comprehensive information about our components, including their APIs, usage patterns, theming options, and more.

:::warning
This feature is experimental! The Agent Skills format and its contents may change as we refine the output based on feedback and evolving AI capabilities.
:::

## Why Use It?

When working with AI coding assistants like Claude Code, Cursor, or other tools that support Agent Skills, you can reference the {{ site.name }} skill to give the AI deep context about our components. This leads to more accurate code suggestions, better understanding of component APIs, and fewer hallucinations when generating {{ site.name }} code.

Unlike a single file, the Agent Skill uses progressive disclosure — the AI loads only the documentation it needs for the current task, making it more efficient for complex projects.

## Accessing the Skill

The Agent Skill is available in every {{ site.name }} build at:

```
/dist/skills/webawesome/
/dist-cdn/skills/webawesome/
```

You can also find it in your `node_modules` directory if you've installed {{ site.name }} via npm:

```
node_modules/@awesome.me/webawesome/dist/skills/webawesome/
```

The skill directory contains:

```
webawesome/
├── SKILL.md              # Main skill file with overview and quick reference
└── references/
    ├── components/       # Individual documentation for each component
    ├── frameworks/       # React, Vue, Angular, Svelte guides
    ├── utilities/        # Layout and styling utilities
    ├── installation.md   # Installation guide
    ├── usage.md          # Usage patterns
    ├── form-controls.md  # Form integration
    ├── themes.md         # Themes and color palettes
    └── ...
```

## How to Use It

How you reference the skill depends on which AI tool you're using.

### Claude Code

If you're using [Claude Code](https://claude.ai/code), you can install the {{ site.name }} skill locally using the [skills CLI](https://skills.sh/):

```bash
# Install the skill
npx skills add ./node_modules/@awesome.me/webawesome/dist/skills/webawesome

# Uninstall the skill
npx skills remove webawesome
```

Once installed, the skill will be available to Claude Code automatically. The skill is installed as a symlink, so it will automatically stay up to date when you update {{ site.name }} via npm.

You can also reference the skill directory manually:

```
@node_modules/@awesome.me/webawesome/dist/skills/webawesome/
```

Or ask Claude to read specific reference files:

```
@node_modules/@awesome.me/webawesome/dist/skills/webawesome/references/components/button.md
```

Claude Code can also discover and use the skill automatically if it's in your project.

### Cursor

In [Cursor](https://cursor.sh/), you can add the skill directory to your project's documentation sources via **Cursor Settings > Features > Docs**. Point it to the `dist/skills/webawesome/` directory in your `node_modules` folder.

### Other AI Tools

Most AI coding assistants that support the Agent Skills specification can use this skill. Check your tool's documentation for how to add custom skills or documentation sources.

## What's Included

The Agent Skill contains:

- **SKILL.md** — Overview of {{ site.name }}, quick start guide, component listing, theming information, and links to detailed references
- **Component documentation** — Individual files for each component with full API details, examples, slots, properties, methods, events, and CSS customization options
- **Installation guide** — npm, CDN, and self-hosting options
- **Usage patterns** — Working with attributes, properties, events, methods, and slots
- **Form controls** — Form integration and validation
- **Theming** — Free and Pro themes, color palettes, and customization
- **Utilities** — Layout utilities (stack, cluster, grid, etc.) and native styles
- **Framework guides** — Integration with React, Vue, Angular, and Svelte

## Agent Skills vs llms.txt

{{ site.name }} provides both an [llms.txt file](/docs/ai/llms) and an [Agent Skill](https://agentskills.io/). Here's when to use each:

| Feature | Agent Skill | llms.txt |
|---------|-------------|----------|
| Format | Directory with multiple markdown files | Single text file |
| Best for | Deep integration, complex tasks | Quick context, simple queries |
| Context usage | Progressive disclosure (loads as needed) | Loads everything at once |
| Supported by | Tools supporting agentskills.io spec | Most AI tools |

If your AI tool supports Agent Skills, we recommend using the skill for better context efficiency. Otherwise, the llms.txt file is a great fallback.

## Feedback

Since this is experimental, we'd love to hear how it works for you! If you find issues with the generated content or have suggestions for improvement, please [open an issue on GitHub]({{ site.github.issues }}).
