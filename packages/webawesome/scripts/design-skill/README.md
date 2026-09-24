# Web Awesome design skill — source & maintenance

This directory is the **hand-maintained source** for the `webawesome-design` agent skill, the skill
that teaches AI tools _how to design_ with Web Awesome (layouts with `<wa-page>`, theming with
`--wa-*` tokens, and visual composition). It complements the auto-generated `webawesome` skill, which
documents individual component APIs.

> **Note:** This `README.md` is for maintainers. It is **not** shipped with the skill; the copy step
> deliberately excludes it (only `SKILL.md` and `references/` are published).

## How it works

These files are **plain, static Markdown**. There is no templating, no placeholders, and no generation
step. The build copies this directory verbatim into the dist output, then injects the current package
version into the copied `SKILL.md`'s frontmatter so the skill stays in lockstep with releases.

```
scripts/design-skill/                  ← EDIT THESE (source of truth, in git)
  SKILL.md                               entry point: 4-step workflow (discover, layout branch, build
                                         ladder, verify), rules table, search patterns, starting points
  references/
    your-design-system.md                building a project's design system on WA: discovery, layers,
                                         extending without forking, DESIGN.md template, guardrails
    layouts-page.md                      full-page layouts with <wa-page> + wa-page checklist
    layouts-inpage.md                    sections/widgets/embeds (utilities only)
    theming.md                           themes, palettes, light/dark, brand color, tokens
    composition.md                       spacing, layout-utility guide, typography, surfaces,
                                         companion utilities, custom CSS playbook, polish checklist
    patterns.md                          best-practice recipes
    getting-started.md                   the opinionated default
        │
        ▼  copied verbatim + version injected by scripts/design-skill.js (runs in eleventy.after)
dist/skills/webawesome-design/         ← GENERATED, do not edit
dist-cdn/skills/webawesome-design/     ← GENERATED, do not edit
```

## To make a change

1. Edit the relevant Markdown file in this directory. No placeholders to manage.
2. Re-copy into dist:

   ```bash
   # Just the design skill (fast):
   node --input-type=module -e 'import { generateDesignSkill } from "./scripts/design-skill.js"; await generateDesignSkill();'

   # …or as part of a full build:
   npm run build
   ```

3. Run Prettier so source and dist stay byte-identical and formatted:

   ```bash
   npx prettier --write 'scripts/design-skill/**/*.md'
   ```

4. Run the skill verifier (catches drift between hand-authored content and the actual library):

   ```bash
   npm run verify:skills
   ```

**Never edit `dist/skills/webawesome-design/` directly**; every build overwrites it from this source.

## The skill verifier (`npm run verify:skills`)

`scripts/verify-skills.js` cross-checks the skill content against the library so silent drift can't
ship. It runs automatically as part of `npm run verify` (after `build`, before `test`) and can be run
standalone for fast iteration. It catches:

- **Broken `<wa-*>` references** anywhere in the skills — must exist in either `packages/webawesome/src/components/` or `packages/webawesome-pro/src/components/`
- **Wrong Pro/Free classification** — rows marked `**(Pro)**` must point at the pro package; unmarked rows must point at the free package
- **Wrong attribute citations** — every `<wa-tag attr>` or `<wa-tag attr="value">` cited in `agent-skill/choosing-components.md` must reference a real attribute per the CEM. Caught the case where `<wa-tag removable>` should have been `<wa-tag with-remove>`
- **Drift in `<wa-page>`'s API tables** in `layouts-page.md` — every slot, attribute, and CSS custom property cited under `### Slots`, `### Attributes`, and `### CSS custom properties` must exist in `<wa-page>`'s CEM declaration
- **Broken relative markdown links** between skill files

If the verifier fails after a library change, fix the citation (or the library) before merging.

## Keeping content accurate

The verifier catches the structural drift (tag/attribute/slot names, Pro/Free, links). Some content
still needs hand-maintenance because it's curated by design, not derivable from the CEM:

| If you change…                                                                              | Update                                                                   |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Spacing / font-size / radius / shadow / transition tokens (`src/styles/themes/default.css`) | `references/composition.md` (Spacing, Typography, Surfaces tables)       |
| The set of themes (`src/styles/themes/`) or palettes (`src/styles/color/palettes/`)         | `references/theming.md` (theme/palette lists)                            |
| The `<wa-page>` slots, attributes, or CSS custom properties                                 | `references/layouts-page.md` API tables (verifier catches typos/drift)   |
| Layout utility classes (`src/styles/utilities/layout.css`)                                  | `references/composition.md`, `references/layouts-inpage.md`              |
| Companion utility classes (`align-items.css`, `text.css`, `size.css`, etc.)                 | `references/composition.md` (Companion utilities section)                |
| The set of Pro-only components                                                              | `references/choosing-components.md` "A note on Pro" footer + Pro markers |

The reference tables here are intentionally **curated** (the useful values, not a raw dump of every
sub-token). Keep them that way; for the exhaustive, always-current API, the files already point readers
to the docs site and the `webawesome` skill.

## Conventions

- Keep `SKILL.md` short; push detail into `references/`. AI tools load references on demand
  (progressive disclosure), and long rule lists lose their middle. Target under ~250 lines; when a
  section grows, move it to a reference and leave a one-line pointer with "read this when…".
  Reference files over ~100 lines carry a **Contents** list at the top.
- `SKILL.md` is a **four-step workflow**: discover the project's existing decisions, pick the layout
  branch (full page → `<wa-page>`; a piece of a page → utilities only; layouts nest, so re-answer for
  each self-contained inner container), build down the system ladder, verify. Keep the layout gate
  consistent across every file.
- **Every prohibition names its replacement and its reason.** Rules live in "Instead of… / Do this /
  Why" tables; the why is what lets an agent apply a rule to a case the table doesn't list. Avoid
  ALL-CAPS emphasis and stacked "MUST"s; if a rule keeps getting ignored, the file is probably too long,
  not too quiet.
- **Project conventions outrank skill defaults.** Anything that describes a default (theme classes,
  nav placement, primary/secondary button treatment) should say so, and point at
  `your-design-system.md` for the discovery step.
- **Verification is mechanical first, judgment second.** The "Verify before you finish" section keeps a
  table of search patterns (hex, px, self-closed elements, host rules, emojis, bad slots) that can be run
  by hand or wired into a lint/hook, followed by a short checklist. Keep new checks greppable when
  possible.
- **Two self-check passes, scoped distinctly.** `SKILL.md`'s **Final Pass** is the **structural**
  review (markup, slot decisions, rule compliance). `composition.md`'s **Polish Checklist** is the
  **visual quality** pass (spacing rhythm, hierarchy, contrast, surface choices). `layouts-page.md`
  has its own `<wa-page>`-specific structural checklist. Don't let items overlap across the three.
- **Custom CSS playbook lives in `composition.md`.** When agents need to write custom CSS, they
  should follow the 7-point playbook (token-only values, semantic-over-palette for dark mode,
  `*-on-*` pairings, `loud`/`normal`/`quiet` as a contrast lever, reusable classes in `<style>`, no
  token re-aliasing, no shadow-DOM-piercing). Point at it from any new section that touches custom
  CSS.
- **Companion utilities are part of the layout story.** When introducing a layout pattern, name the
  applicable companion utility (`wa-align-items-*`, `wa-justify-content-*`, `wa-text-*`, `wa-size-*`,
  `wa-color-text-*`, `wa-visually-hidden`) so agents don't fall back to inline styles.
- All code examples must use real components/attributes and design tokens, never hardcoded `px`/hex.
  The verifier catches tag and attribute errors; the rest is on you.
