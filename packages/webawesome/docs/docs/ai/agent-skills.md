---
title: Agent Skills
description: Two complementary Agent Skills that help AI tools work with Web Awesome, one for components and one for design.
layout: page-outline
---

The [Agent Skills specification](https://agentskills.io/) is a standard for providing structured documentation to AI coding assistants. It helps AI tools understand your project's APIs, conventions, and best practices through a well-organized directory of markdown files.

Web Awesome publishes **two complementary Agent Skills** that are designed to work together. If your tool supports loading more than one skill, install both. They cross-reference each other, and the combination covers the full range of design and component work an AI tool will hit on a real task.

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

The `webawesome` skill is generated at build time from the docs and the Custom Elements Manifest, so it matches the release it ships with. The `webawesome-design` skill is hand-authored. Before publishing, a [verification script](https://github.com/shoelace-style/webawesome/blob/next/packages/webawesome/scripts/verify-skills.js) checks both skills: frontmatter, relative links, and size budgets; the components and attributes named in the decision tree; the design skill's `<wa-page>` API tables against the Custom Elements Manifest; and that no deprecated sizes or members appear. The rest of the design guidance is reviewed by hand. Each `SKILL.md` records the Web Awesome version it came from in `metadata.version`.

## How to Use Them

Both skills ship in the npm package and are available in your `node_modules` directory after you install Web Awesome:

```
node_modules/@awesome.me/webawesome/dist/skills/webawesome/
node_modules/@awesome.me/webawesome/dist/skills/webawesome-design/
```

Web Awesome Pro ships the same skills, with Pro components added to `webawesome`, under `node_modules/@web.awesome.me/webawesome-pro/dist/skills/`. With Pro, use that path in the commands below so the skills import from the Pro package.

### Installing with the Skills CLI

The [skills CLI](https://skills.sh/) installs skills for Claude Code, Cursor, Codex, and other tools that support the specification. Run it from your project after installing Web Awesome:

```bash
npx skills add ./node_modules/@awesome.me/webawesome/dist/skills/webawesome
npx skills add ./node_modules/@awesome.me/webawesome/dist/skills/webawesome-design
```

The CLI copies each skill into `.agents/skills/` and links it into each tool's skills directory, such as `.claude/skills/`. Add `-g` to install them for your user account in `~/.agents/skills/` instead. Once installed, your AI tool loads the right skill based on what you ask for.

The path assumes Web Awesome is installed in the folder you run the command from. In a monorepo, run it from the folder whose `node_modules` contains `@awesome.me/webawesome`. Yarn Plug'n'Play doesn't create `node_modules`, so run `yarn unplug @awesome.me/webawesome` first and use the package's path under `.yarn/unplugged/`.

To uninstall, run the following. Add `-g` if you installed them globally.

```bash
npx skills remove webawesome
npx skills remove webawesome-design
```

### Keeping Skills Up to Date

Installed skills are copies, so they don't change when you upgrade Web Awesome. Run the same `npx skills add` commands again after each upgrade. `npx skills update` skips skills installed from a local path, so it won't refresh them.

To see which release a skill came from, check `metadata.version` in the installed `SKILL.md`, such as `.agents/skills/webawesome/SKILL.md` or `.claude/skills/webawesome/SKILL.md`.

### The skills.sh Registry

The [skills.sh](https://skills.sh/) registry lists `webawesome-design` under `shoelace-style/webawesome`. That copy comes from the repository's development branch, has no version stamp, and can describe features your installed version doesn't have. The `webawesome` skill isn't listed because it's generated at build time and isn't in the repository. Install both from your package, as shown above, so they match the version you use.

### Referencing Files Directly

In Claude Code, you can also reference a skill directory without installing it, or point Claude at a specific reference file:

```
@node_modules/@awesome.me/webawesome/dist/skills/webawesome/
@node_modules/@awesome.me/webawesome/dist/skills/webawesome/references/components/button.md
@node_modules/@awesome.me/webawesome/dist/skills/webawesome-design/references/layouts-page.md
```

### Other AI Tools

The skills follow the [Agent Skills specification](https://agentskills.io/), so any tool that supports the spec should be able to use them. Cursor and Codex load skills from `.agents/skills/`, so the CLI install above covers them. We've tested in Claude Code and Cursor. If your tool can load a directory of markdown references on demand, point it at the same `node_modules/@awesome.me/webawesome/dist/skills/` directories shown above.

<div class="wa-flank:end">
  <h2>The Component Skill</h2>
  <code>webawesome</code>
</div>

The `webawesome` skill is the **component reference**. It's generated from the docs and the Custom Elements Manifest at build time, so it matches the release it ships with. Use it when you need to know what a component does: its properties, slots, events, CSS parts, or framework integration.

The skill directory contains:

```
webawesome/
├── SKILL.md                       # Overview, quick start, and component listing
└── references/
    ├── choosing-components.md     # Decision tree by user intent; start here
    ├── components/                # Individual documentation for each component
    ├── frameworks/                # React, Vue, Angular, Svelte guides
    ├── utilities/                 # Layout and styling utilities
    ├── tokens/                    # Design tokens (color, space, typography, etc.)
    ├── installation.md            # Installation guide
    ├── usage.md                   # Usage patterns
    ├── form-controls.md           # Form integration
    ├── customizing.md             # Light and dark mode, theme CSS, parts, custom properties, states
    ├── themes.md                  # Themes and color palettes
    ├── localization.md            # Languages, translations, and registering your own
    └── support.md                 # Where to report bugs and ask questions
```

It covers:

- **Component decision tree:** a "which component should I use?" reference organized by user intent (pick one, pick many, show feedback, etc.). It closes the most common gap, which is picking the wrong component for the job
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
├── SKILL.md                    # Four-step workflow, core rules, verification command and checklist, starting points
└── references/
    ├── your-design-system.md   # Discovering and extending a project's own design system, DESIGN.md template
    ├── layouts-page.md         # Full-page layouts with <wa-page>, nav shapes, a <wa-page> checklist, API tables
    ├── layouts-inpage.md       # Sections, widgets, and embeds (utilities only)
    ├── theming.md              # Themes, palettes, light/dark, brand color, tokens
    ├── composition.md          # Spacing, layout and companion utilities, typography, icons, surfaces, custom CSS playbook
    ├── principles.md           # The design judgment behind the tokens: color, depth, hierarchy, spacing, type
    ├── patterns.md             # Recipes: app shell, landing page, login, settings, dashboard grid
    └── getting-started.md      # The opinionated default setup
```

It covers:

- **Layout:** when and how to use `<wa-page>` for full-page layouts (with an explicit landing-page vs. app-shell branch to head off the most common sidebar mistake), and how to compose sections, widgets, and forms with layout utilities when `<wa-page>` isn't the right fit
- **Theming:** choosing themes and palettes, light and dark mode, matching a brand color, and customizing with `--wa-*` tokens
- **Composition:** spacing rhythm, the layout-utility decision guide, typography, surfaces, images/placeholders, and a Companion utilities reference (alignment, text, sizing, color, accessibility) so AI tools reach for utility classes instead of inline styles
- **Design system discovery:** how to find a project's existing theme, token overrides, and house recipes before building, and how to extend them without forking
- **Custom CSS playbook:** an eight-point playbook for the times AI tools genuinely need to write custom CSS: semantic tokens for dark mode, `*-on-*` pairings for WCAG contrast, the `loud`/`normal`/`quiet` step as a contrast lever, and the shadow-DOM cascade boundary so custom rules target your own elements rather than fighting component internals
- **Self-check passes:** a "Verify before you finish" section in the main skill with one search command and a structural checklist, plus a **visual polish** checklist in composition.md (rhythm, hierarchy, contrast on surfaces) and a `<wa-page>` checklist in layouts-page.md
- **Recipes:** best-practice starting points for common screens

## Agent Skills vs llms.txt

Web Awesome provides both an [llms.txt file](/docs/ai/llms) and [Agent Skills](https://agentskills.io/). Which one to use depends on how your tool loads documentation:

| If your tool                                                   | Use                         | Why                                                                                                |
| -------------------------------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------- |
| Supports Agent Skills (Claude Code, Cursor, Codex, and others) | The skills                  | The tool reads `SKILL.md` first and opens references only when a task needs them                   |
| Takes one file, a URL, or pasted context                       | [`llms.txt`](/docs/ai/llms) | It's a single file with the full component API                                                     |
| Loads a whole folder into context at once                      | [`llms.txt`](/docs/ai/llms) | The `webawesome` skill has a reference file for every component and is much larger than `llms.txt` |

## Feedback

Since this is experimental, we'd love to hear how it works for you! If you find issues with the generated content or have suggestions for improvement, please [open an issue on GitHub]({{ site.github.issues }}).
