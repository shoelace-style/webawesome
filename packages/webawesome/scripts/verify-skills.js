/**
 * Verifies skill content stays in sync with the library.
 *
 * Catches silent drift between the hand-authored skill files and the component catalog, and regressions
 * in the generated `webawesome` skill.
 *
 * Run: `node scripts/verify-skills.js`. Exits non-zero on any failure so it can be wired into CI. Checks that
 * read `dist/` (the built skill, llms.txt, and the CEM) are skipped with a warning when it hasn't been built.
 *
 * Checks:
 *  1. Every `<wa-*>` tag in `agent-skill/choosing-components.md` exists in the core or Pro package, rows
 *     marked **(Pro)** are Pro components and unmarked rows are core, and cited attributes exist per the CEM.
 *  2. The tables at the end of the design skill's `layouts-page.md` cite only slots, attributes, CSS custom
 *     properties, and CSS parts that `<wa-page>` has, and no part the CEM marks deprecated.
 *  3. Skill frontmatter: `name` is lowercase-hyphenated, 64 characters or fewer, and matches the skill's
 *     directory; `description` is 1024 characters or fewer with no `<`, `>`, `&lt;`, or `&gt;`.
 *  4. No deprecated long-form size values (a size attribute set to one, the long-form union, or the
 *     "long-form values" sentence) in the built skill, llms.txt, the design skill, or the docs (the changelog
 *     and the Shoelace migration guide excepted).
 *  5. No CEM item flagged deprecated and no static member appears as a row in a component reference.
 *  6. Relative markdown links resolve, in the hand-authored skill files and in the built `webawesome` skill.
 *     A link to a directory is an error.
 *  7. Budgets: each SKILL.md should stay under 500 lines and 24 KB and each reference under 100 KB
 *     (warnings); a line over 2,000 characters anywhere in skill output is an error.
 */

import fs from 'fs';
import matter from 'gray-matter';
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
const DIST_SKILLS_DIR = path.join(PACKAGE_ROOT, 'dist', 'skills');
const AGENT_SKILL_DIST = path.join(DIST_SKILLS_DIR, 'webawesome');
const LLMS_TXT = path.join(PACKAGE_ROOT, 'dist', 'llms.txt');
const DOCS_DIR = path.join(PACKAGE_ROOT, 'docs', 'docs');
const DESIGN_SKILL_DIR = path.join(__dirname, 'design-skill');
const DESIGN_SKILL = path.join(DESIGN_SKILL_DIR, 'SKILL.md');

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

const rel = file => path.relative(PACKAGE_ROOT, file);

// --- Check 3: skill frontmatter must be accepted by Claude.ai Skills ---
function checkFrontmatter(file, expectedName) {
  if (!fs.existsSync(file)) return;
  const { name, description } = matter(fs.readFileSync(file, 'utf-8')).data;
  const where = rel(file);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(String(name || ''))) {
    errors.push(`${where}: frontmatter name "${name}" must be lowercase words joined by hyphens`);
  }
  if (String(name || '').length > 64) errors.push(`${where}: frontmatter name is over 64 characters`);
  if (name !== expectedName) errors.push(`${where}: frontmatter name "${name}" should be "${expectedName}"`);
  const text = String(description || '');
  if (!text.trim()) errors.push(`${where}: frontmatter description is empty`);
  if (text.length > 1024) errors.push(`${where}: frontmatter description is ${text.length} characters (max 1024)`);
  if (/[<>]|&lt;|&gt;/.test(text)) {
    errors.push(`${where}: frontmatter description contains < or >; use plain names such as \`wa-page\``);
  }
}

checkFrontmatter(DESIGN_SKILL, 'webawesome-design');
if (fs.existsSync(DIST_SKILLS_DIR)) {
  for (const entry of fs.readdirSync(DIST_SKILLS_DIR, { withFileTypes: true })) {
    if (entry.isDirectory()) checkFrontmatter(path.join(DIST_SKILLS_DIR, entry.name, 'SKILL.md'), entry.name);
  }
}

// --- Check 1a: choosing-components.md tag classifications ---
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

// --- Check 1c: attribute names cited in choosing-components.md exist on those components per CEM ---
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

// --- Check 2: layouts-page.md API tables match wa-page CEM declaration ---
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
    // Deprecated parts are left out so citing one fails like citing a missing part.
    const cemCssParts = new Set((waPageDecl.cssParts || []).filter(p => !p.deprecated).map(p => p.name));

    const sections = {
      '### Slots': cemSlots,
      '### Attributes': cemAttrs,
      '### CSS custom properties': cemCssProps,
      '### CSS parts': cemCssParts,
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
          const deprecated = heading === '### CSS parts' && waPageDecl.cssParts?.some(p => p.name === name);
          errors.push(
            `layouts-page.md:${i + 1}: "${name}" cited under ${heading} but ${deprecated ? 'the CEM marks it deprecated' : "not in <wa-page>'s CEM declaration"}`,
          );
        }
      }
    }
  }
}

// --- Check 6: relative markdown links resolve ---
function* walkMarkdown(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walkMarkdown(p);
    else if (entry.isFile() && entry.name.endsWith('.md')) yield p;
  }
}

const linkRegex = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const filesToScan = [CHOOSING_COMPONENTS, ...walkMarkdown(DESIGN_SKILL_DIR), ...walkMarkdown(AGENT_SKILL_DIST)];
if (!fs.existsSync(AGENT_SKILL_DIST)) {
  warnings.push(
    `${rel(AGENT_SKILL_DIST)} not found (run \`npm run build\` first); skipping checks of the built skill.`,
  );
}

for (const file of filesToScan) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  let inFence = false;
  lines.forEach((line, idx) => {
    // Code blocks hold example markup, not links.
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (inFence) return;
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
        errors.push(`${rel(file)}:${idx + 1}: broken link to '${href}' (resolved to ${rel(resolved)})`);
      } else if (fs.statSync(resolved).isDirectory()) {
        errors.push(`${rel(file)}:${idx + 1}: link to directory '${href}'; link to the files in it instead`);
      }
    }
  });
}

// --- Check 4: no deprecated long-form size values ---
const DEPRECATED_SIZE_PATTERNS = [
  [/\bsize=["'](small|medium|large)["']/, 'a size attribute with a long-form value'],
  [/["'](small|medium|large)["']\s*\|\s*["'](small|medium|large)["']/, 'the long-form size union'],
  [/long-form values/, 'the "long-form values" deprecation sentence'],
];
const SIZE_SCAN_EXCLUDES = new Set([
  path.join(DOCS_DIR, 'resources', 'changelog.md'),
  path.join(DOCS_DIR, 'resources', 'migrating-from-shoelace.md'),
]);

function* walkFiles(dir, extensions) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walkFiles(p, extensions);
    else if (extensions.some(ext => entry.name.endsWith(ext))) yield p;
  }
}

const sizeScanFiles = [
  ...walkFiles(DIST_SKILLS_DIR, ['.md']),
  ...(fs.existsSync(LLMS_TXT) ? [LLMS_TXT] : []),
  ...walkFiles(DESIGN_SKILL_DIR, ['.md']),
  ...walkFiles(DOCS_DIR, ['.md']),
].filter(file => !SIZE_SCAN_EXCLUDES.has(file));

for (const file of sizeScanFiles) {
  fs.readFileSync(file, 'utf-8')
    .split('\n')
    .forEach((line, idx) => {
      for (const [pattern, label] of DEPRECATED_SIZE_PATTERNS) {
        if (pattern.test(line)) errors.push(`${rel(file)}:${idx + 1}: ${label}; use xs, s, m, l, or xl`);
      }
    });
}

// --- Check 5: no deprecated items or static members in component reference tables ---
//
// Each API section of a component reference lists names in its first cell (or, for slots, as bullets).
// Anything the CEM flags deprecated, and any static member, must not be listed there.
const SECTION_ITEMS = {
  Slots: decl => decl.slots,
  'Attributes & Properties': decl => (decl.members || []).filter(m => m.kind === 'field'),
  Methods: decl => (decl.members || []).filter(m => m.kind === 'method'),
  Events: decl => decl.events,
  'CSS Custom Properties': decl => decl.cssProperties,
  'Custom States': decl => decl.cssStates,
  'CSS Parts': decl => decl.cssParts,
};
const componentRefsDir = path.join(AGENT_SKILL_DIST, 'references', 'components');
if (cemAvailable && fs.existsSync(componentRefsDir)) {
  for (const file of walkFiles(componentRefsDir, ['.md'])) {
    const decl = cemByTag.get(`wa-${path.basename(file, '.md')}`);
    if (!decl) continue;
    let section = null;
    fs.readFileSync(file, 'utf-8')
      .split('\n')
      .forEach((line, idx) => {
        const heading = line.match(/^#{2,3} (.+)$/);
        if (heading) {
          section = SECTION_ITEMS[heading[1].trim()] ? heading[1].trim() : null;
          return;
        }
        if (!section) return;
        const name = (line.match(/^\| `([^`]+?)(?:\(\))?` \|/) || line.match(/^- `([^`]+)` —/))?.[1];
        if (!name) return;
        const item = (SECTION_ITEMS[section](decl) || []).find(i => (i.name || '(default)') === name);
        if (item?.deprecated)
          errors.push(`${rel(file)}:${idx + 1}: ${section} lists \`${name}\`, which the CEM marks deprecated`);
        if (item?.static) errors.push(`${rel(file)}:${idx + 1}: ${section} lists static member \`${name}\``);
      });
  }
}

// --- Check 7: budgets ---
const skillMds = [DESIGN_SKILL, path.join(AGENT_SKILL_DIST, 'SKILL.md')].filter(file => fs.existsSync(file));
for (const file of skillMds) {
  const content = fs.readFileSync(file, 'utf-8');
  const lineCount = content.split('\n').length;
  const kb = Buffer.byteLength(content) / 1024;
  if (lineCount > 500) warnings.push(`${rel(file)} is ${lineCount} lines (budget 500)`);
  if (kb > 24) warnings.push(`${rel(file)} is ${kb.toFixed(1)} KB (budget 24 KB)`);
}
for (const file of [...walkFiles(DIST_SKILLS_DIR, ['.md']), ...walkFiles(DESIGN_SKILL_DIR, ['.md'])]) {
  const content = fs.readFileSync(file, 'utf-8');
  if (path.basename(file) !== 'SKILL.md' && Buffer.byteLength(content) > 100 * 1024) {
    warnings.push(`${rel(file)} is ${(Buffer.byteLength(content) / 1024).toFixed(0)} KB (budget 100 KB)`);
  }
  content.split('\n').forEach((line, idx) => {
    if (line.length > 2000) errors.push(`${rel(file)}:${idx + 1}: line is ${line.length} characters (max 2,000)`);
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
