# Web Awesome design skill — source & maintenance

This directory is the **hand-maintained source** for the `webawesome-design` agent skill, the skill
that teaches AI tools _how to design_ with Web Awesome (layouts with `<wa-page>`, theming with
`--wa-*` tokens, and visual composition). It complements the auto-generated `webawesome` skill, which
documents individual component APIs.

> **Note:** This `README.md` is for maintainers. It is **not** shipped with the skill; the copy step
> deliberately excludes it (only `SKILL.md` and `references/` are published).

## How it works

These files are **plain, static Markdown**. There is no templating, no placeholders, and no generation
step. The build copies this directory verbatim into the dist output:

```
scripts/design-skill/            ← EDIT THESE (source of truth, in git)
  SKILL.md                         entry point: decision gate, rules, starting points
  references/
    layouts-page.md                full-page layouts with <wa-page>
    layouts-inpage.md              sections/widgets/embeds (utilities only)
    theming.md                     themes, palettes, light/dark, brand color, tokens
    composition.md                 spacing, layout-utility guide, typography, surfaces
    patterns.md                    best-practice recipes
    getting-started.md             the opinionated default
        │
        ▼  copied verbatim by scripts/design-skill.js (runs in eleventy.after)
dist/skills/webawesome-design/        ← GENERATED, do not edit
dist-cdn/skills/webawesome-design/    ← GENERATED, do not edit
```

## To make a change

1. Edit the relevant Markdown file in this directory. That's it; no placeholders to manage.
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

**Never edit `dist/skills/webawesome-design/` directly**; every build overwrites it from this source.

## Keeping content accurate

Because the content is static, the reference data (token values, theme/palette names, the `<wa-page>`
API) is **written out by hand** and won't auto-update when the library changes. When you change any of
the following, update the corresponding file here:

| If you change…                                                                              | Update                                                      |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Spacing / font-size / radius / shadow / transition tokens (`src/styles/themes/default.css`) | `references/composition.md`                                 |
| The set of themes (`src/styles/themes/`) or palettes (`src/styles/color/palettes/`)         | `references/theming.md`                                     |
| The `<wa-page>` slots, attributes, or CSS custom properties                                 | `references/layouts-page.md`                                |
| Layout utilities (`src/styles/utilities/layout.css`)                                        | `references/composition.md`, `references/layouts-inpage.md` |

The reference tables here are intentionally **curated** (the useful values, not a raw dump of every
sub-token). Keep them that way; for the exhaustive, always-current API, the files already point readers
to the docs site and the `webawesome` skill.

## Conventions

- Keep `SKILL.md` short; push detail into `references/`. AI tools load references on demand
  (progressive disclosure).
- The first thing `SKILL.md` does is the **STEP 0 layout decision gate** (full page → `<wa-page>`;
  a piece of a page → utilities only). Keep that gate consistent across every file.
- All code examples must use real components/attributes and design tokens, never hardcoded `px`/hex.
