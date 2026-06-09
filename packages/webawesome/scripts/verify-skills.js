/**
 * Verifies skill content stays in sync with the library.
 *
 * Catches the regression we hit when shipping `choosing-components.md`: silent drift between the
 * hand-authored decision tree and the actual component catalog (wrong Pro/Free classification, tags
 * that don't exist, etc.). Also checks relative markdown links inside the skill files resolve.
 *
 * Run: `node scripts/verify-skills.js`. Exits non-zero on any failure so it can be wired into CI.
 *
 * Checks:
 *  1. Every `<wa-*>` tag mentioned in `agent-skill/choosing-components.md` exists either as a Free
 *     component (`src/components/<name>/`) or as a Pro component (`webawesome-pro/src/components/<name>/`).
 *  2. Components marked **(Pro)** in `choosing-components.md` actually live in the Pro package; Free
 *     components aren't marked Pro.
 *  3. Every relative markdown link in `agent-skill/choosing-components.md` and `design-skill/**.md`
 *     resolves to a file that exists.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(PACKAGE_ROOT, '..', '..');

const FREE_COMPONENTS_DIR = path.join(PACKAGE_ROOT, 'src', 'components');
const PRO_COMPONENTS_DIR = path.join(REPO_ROOT, 'packages', 'webawesome-pro', 'src', 'components');

const FREE_CEM = path.join(PACKAGE_ROOT, 'dist', 'custom-elements.json');
const PRO_CEM = path.join(REPO_ROOT, 'packages', 'webawesome-pro', 'dist', 'custom-elements.json');

const CHOOSING_COMPONENTS = path.join(__dirname, 'agent-skill', 'choosing-components.md');
const DESIGN_SKILL_DIR = path.join(__dirname, 'design-skill');

// `choosing-components.md` lives at source in `scripts/agent-skill/` but ships into the same
// `references/` dir as everything else the agent-skill generator produces — so relative links it
// makes to its runtime siblings (form-controls.md, themes.md, etc.) won't resolve against the source
// path. This allowlist captures the sibling refs the generator is known to emit; relative links
// against any of these are accepted.
const AGENT_SKILL_RUNTIME_SIBLINGS = new Set([
  'themes.md',
  'support.md',
  'installation.md',
  'usage.md',
  'form-controls.md',
  'customizing.md',
  'localization.md',
  'choosing-components.md',
]);

const errors = [];
const warnings = [];

function listComponents(dir) {
  if (!fs.existsSync(dir)) return new Set();
  return new Set(
    fs
      .readdirSync(dir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name),
  );
}

const freeComponents = listComponents(FREE_COMPONENTS_DIR);
const proComponents = listComponents(PRO_COMPONENTS_DIR);

if (freeComponents.size === 0) {
  errors.push(`No free components found under ${FREE_COMPONENTS_DIR}`);
}

/**
 * Loads the union of free + pro Custom Elements Manifests into a single tagName → declaration map.
 * Each declaration carries `attributes`, `members`, `events`, etc. — used by the attribute-existence
 * check below. CEMs are produced by the build, so when running `verify:skills` standalone (no build),
 * the maps may be empty; in that case the attribute check is skipped with a warning rather than a hard
 * failure, since `verify` always builds before running this and CI catches it there.
 */
function loadCem(cemPath) {
  if (!fs.existsSync(cemPath)) return null;
  const cem = JSON.parse(fs.readFileSync(cemPath, 'utf-8'));
  const decls = new Map();
  for (const mod of cem.modules || []) {
    for (const decl of mod.declarations || []) {
      if (decl.tagName) decls.set(decl.tagName, decl);
    }
  }
  return decls;
}

const cemByTag = new Map();
for (const cem of [loadCem(FREE_CEM), loadCem(PRO_CEM)]) {
  if (!cem) continue;
  for (const [tag, decl] of cem) cemByTag.set(tag, decl);
}
const cemAvailable = cemByTag.size > 0;
if (!cemAvailable) {
  warnings.push(
    `Custom Elements Manifests not found (run \`npm run build\` first); skipping attribute-existence check.`,
  );
}

// --- Check 1 + 2: choosing-components.md tag classifications ---
const choosingMd = fs.readFileSync(CHOOSING_COMPONENTS, 'utf-8');

// Tables hold the source-of-truth classifications; prose mentions are looser (e.g. "the chart family"
// lists many tags with one Pro mark), so only table rows are scanned.
const tagPattern = /<wa-([a-z-]+)>/g;
// A row is "marked Pro" when **(Pro)** appears anywhere on that row.
const proPattern = /\*\*\(Pro\)\*\*/;

// Track every (tag, marking) seen so a tag that appears Free in one row and Pro in another is flagged
// as a conflict rather than silently classified by whichever row was seen first.
const seenTags = new Map(); // name -> { markings: Set<'pro' | 'free'>, lines: number[] }

choosingMd.split('\n').forEach((line, idx) => {
  if (!line.startsWith('|') || line.startsWith('| -')) return;
  const markedPro = proPattern.test(line);
  let match;
  const tagRegex = new RegExp(tagPattern.source, 'g');
  while ((match = tagRegex.exec(line)) !== null) {
    const name = match[1];
    if (!seenTags.has(name)) {
      seenTags.set(name, { markings: new Set([markedPro ? 'pro' : 'free']), lines: [idx + 1] });
    } else {
      const entry = seenTags.get(name);
      entry.markings.add(markedPro ? 'pro' : 'free');
      entry.lines.push(idx + 1);
    }
  }
});

for (const [name, info] of seenTags) {
  const isFree = freeComponents.has(name);
  const isPro = proComponents.has(name);

  if (!isFree && !isPro) {
    errors.push(
      `choosing-components.md mentions <wa-${name}> on line ${info.lines.join(', ')} but it doesn't exist in either package`,
    );
    continue;
  }

  if (info.markings.size > 1) {
    errors.push(
      `choosing-components.md lines ${info.lines.join(', ')}: <wa-${name}> appears marked Free in some rows and Pro in others — pick one consistently`,
    );
    continue;
  }
  const marked = [...info.markings][0];

  if (isPro && marked === 'free') {
    errors.push(
      `choosing-components.md line ${info.lines.join(', ')}: <wa-${name}> is Pro but marked Free (missing **(Pro)** on the row)`,
    );
  }
  if (isFree && marked === 'pro') {
    errors.push(`choosing-components.md line ${info.lines.join(', ')}: <wa-${name}> is Free but marked **(Pro)**`);
  }
}

// --- Check 1b: prose mentions of `<wa-*>` tags must also exist in the catalog ---
//
// The table-row scan above also enforces Pro/Free classification; this pass only checks existence,
// because prose mentions are intentionally looser (e.g. "the chart family" lists multiple tags with a
// single Pro mark). Tags already validated by the table-row scan are skipped to avoid double-reporting.
const proseChecked = new Set(seenTags.keys());
const proseTagRegex = /<wa-([a-z][a-z0-9-]*)>/g;
choosingMd.split('\n').forEach((line, idx) => {
  // Table rows are already covered above.
  if (line.startsWith('|') && !line.startsWith('| -')) return;
  let match;
  const re = new RegExp(proseTagRegex.source, 'g');
  while ((match = re.exec(line)) !== null) {
    const name = match[1];
    if (proseChecked.has(name)) continue;
    proseChecked.add(name);
    if (!freeComponents.has(name) && !proComponents.has(name)) {
      errors.push(
        `choosing-components.md:${idx + 1}: prose mentions <wa-${name}> but it doesn't exist in either package`,
      );
    }
  }
});

// --- Check 3: attribute names cited in choosing-components.md exist on those components per CEM ---
//
// Tables and prose make concrete claims like `<wa-tag removable>` and `<wa-button variant="brand">`.
// Catch the case where the cited attribute doesn't actually exist on that component (e.g. the real
// attribute is `with-remove`, not `removable`). Skipped silently when no CEM is available.
//
// `data-*`, `aria-*`, `slot`, and a handful of globals are universal and not always declared in the
// CEM. Skip those rather than false-flag them.
const UNIVERSAL_ATTRS = new Set(['class', 'id', 'style', 'slot', 'role', 'title', 'hidden', 'tabindex']);
function isUniversalAttr(name) {
  return UNIVERSAL_ATTRS.has(name) || name.startsWith('data-') || name.startsWith('aria-') || name.startsWith('on');
}

if (cemAvailable) {
  // Match the tag and everything between the tag name and the closing `>` so we can pull attributes
  // off the rest. Tag names use lowercase + hyphen only.
  const tagWithAttrsRegex = /<wa-([a-z][a-z0-9-]*)((?:\s+[^>]+)?)>/g;
  // Inside the attributes blob, attribute names are tokens that precede `=` or whitespace/EOS.
  const attrNameRegex = /\s+([a-z][a-z0-9-]*)(?==|\s|$)/g;

  choosingMd.split('\n').forEach((line, idx) => {
    let tagMatch;
    const tagRegex = new RegExp(tagWithAttrsRegex.source, 'g');
    while ((tagMatch = tagRegex.exec(line)) !== null) {
      const [, tagSuffix, rest] = tagMatch;
      if (!rest || !rest.trim()) continue;
      const tagName = `wa-${tagSuffix}`;
      const decl = cemByTag.get(tagName);
      if (!decl) continue; // tag-existence check already errored above
      const declAttrs = new Set((decl.attributes || []).map(a => a.name));

      let attrMatch;
      const attrRegex = new RegExp(attrNameRegex.source, 'g');
      while ((attrMatch = attrRegex.exec(rest)) !== null) {
        const attr = attrMatch[1];
        if (isUniversalAttr(attr)) continue;
        if (!declAttrs.has(attr)) {
          // Surface a helpful hint when a near-name exists (often a JS-property vs HTML-attribute mismatch).
          const memberNames = (decl.members || [])
            .filter(m => m.kind === 'field' && m.privacy !== 'private')
            .map(m => m.name);
          const hint = memberNames.find(m => m.toLowerCase().replace(/[^a-z0-9]/g, '') === attr.replace(/-/g, ''));
          const hintText = hint ? ` (did you mean the HTML attribute for the JS property \`${hint}\`?)` : '';
          errors.push(
            `choosing-components.md:${idx + 1}: <${tagName}> doesn't have an attribute named \`${attr}\`${hintText}`,
          );
        }
      }
    }
  });
}

// --- Check 4: layouts-page.md API tables match wa-page CEM declaration ---
//
// The design skill's `layouts-page.md` ends with hand-authored summary tables of `<wa-page>`'s slots,
// attributes, and CSS custom properties. These drift the same way `choosing-components.md` did — the
// maintainer README explicitly calls this out as a known risk. Cross-check every cited name against
// the actual CEM declaration so renames or removals upstream don't silently outlive the doc.
//
// Forward direction only: every cited name must exist in the CEM. The reverse (every CEM entry must
// appear in the doc) is intentionally NOT enforced — the design skill curates, omitting internal-only
// slots/attrs like `dir`, `lang`, `did-ssr`.
const LAYOUTS_PAGE = path.join(DESIGN_SKILL_DIR, 'references', 'layouts-page.md');
if (cemAvailable && fs.existsSync(LAYOUTS_PAGE)) {
  const waPageDecl = cemByTag.get('wa-page');
  if (!waPageDecl) {
    warnings.push(`wa-page not found in CEM; skipping layouts-page.md API table cross-check`);
  } else {
    const cemSlots = new Set((waPageDecl.slots || []).map(s => s.name || '_default'));
    const cemAttrs = new Set((waPageDecl.attributes || []).map(a => a.name));
    const cemCssProps = new Set((waPageDecl.cssProperties || []).map(p => p.name));

    // Attributes the wa-page component reads via CSS selectors (`:host([disable-sticky~='banner'])`
    // in page.styles.ts) but doesn't expose via a `@property` decorator, so they don't appear in the
    // CEM. The design skill correctly documents them; the CEM is the one out of sync. Allowlisted here
    // so a real bug elsewhere isn't drowned out. Re-evaluate if/when the component adds the missing
    // `@property` declarations.
    const CSS_ONLY_ATTRS = new Set(['disable-sticky']);
    for (const a of CSS_ONLY_ATTRS) cemAttrs.add(a);

    const sections = {
      '### Slots': cemSlots,
      '### Attributes': cemAttrs,
      '### CSS custom properties': cemCssProps,
    };

    const layoutsLines = fs.readFileSync(LAYOUTS_PAGE, 'utf-8').split('\n');

    for (const [heading, validSet] of Object.entries(sections)) {
      const startIdx = layoutsLines.findIndex(l => l.trim() === heading);
      if (startIdx === -1) {
        warnings.push(`layouts-page.md missing expected heading "${heading}"`);
        continue;
      }
      // Find the table's separator row (| --- | --- |) following the heading.
      let sepIdx = startIdx + 1;
      while (sepIdx < layoutsLines.length && !/^\|\s*-+/.test(layoutsLines[sepIdx])) {
        if (/^#{1,4}\s/.test(layoutsLines[sepIdx])) {
          sepIdx = -1;
          break;
        }
        sepIdx++;
      }
      if (sepIdx === -1 || sepIdx >= layoutsLines.length) continue;

      // Walk the data rows until we leave the table.
      for (let i = sepIdx + 1; i < layoutsLines.length; i++) {
        const line = layoutsLines[i];
        if (!line.startsWith('|')) break;
        const firstCell = line.split('|')[1]?.trim();
        if (!firstCell) continue;
        let name;
        if (firstCell === '_(default)_') {
          name = '_default';
        } else {
          const m = firstCell.match(/^`([^`]+)`$/);
          if (!m) continue;
          name = m[1];
        }
        if (!validSet.has(name)) {
          errors.push(
            `layouts-page.md:${i + 1}: "${name}" cited under ${heading} but not in <wa-page>'s CEM declaration`,
          );
        }
      }
    }
  }
}

// --- Check 5: relative markdown links resolve ---
function* walkMarkdown(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walkMarkdown(p);
    else if (entry.isFile() && entry.name.endsWith('.md')) yield p;
  }
}

const linkRegex = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const filesToScan = [CHOOSING_COMPONENTS, ...walkMarkdown(DESIGN_SKILL_DIR)];

for (const file of filesToScan) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    let m;
    const re = new RegExp(linkRegex.source, 'g');
    while ((m = re.exec(line)) !== null) {
      const href = m[2];
      // Skip http(s), mailto, anchors, and template placeholders
      if (/^(https?:|mailto:|#)/.test(href) || href.startsWith('${')) continue;
      // Strip any fragment
      const [pathPart] = href.split('#');
      if (!pathPart) continue;
      // Files in `agent-skill/` ship into the generated `references/` dir alongside other refs the
      // generator produces. Accept links that target those known runtime siblings.
      if (file.startsWith(path.join(__dirname, 'agent-skill')) && AGENT_SKILL_RUNTIME_SIBLINGS.has(pathPart)) {
        continue;
      }
      // Resolve relative to the file's directory
      const resolved = path.resolve(path.dirname(file), pathPart);
      if (!fs.existsSync(resolved)) {
        errors.push(
          `${path.relative(PACKAGE_ROOT, file)}:${idx + 1}: broken link to '${href}' (resolved to ${path.relative(PACKAGE_ROOT, resolved)})`,
        );
      }
    }
  });
}

// --- Report ---
if (warnings.length > 0) {
  console.warn('Warnings:');
  for (const w of warnings) console.warn(`  ${w}`);
}

if (errors.length > 0) {
  console.error(`\nFound ${errors.length} skill verification error(s):`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}

console.log(`✓ Skill verification passed.`);
console.log(
  `  ${seenTags.size} <wa-*> tags checked against ${freeComponents.size} free + ${proComponents.size} pro components`,
);
console.log(`  ${filesToScan.length} markdown files scanned for broken relative links`);
