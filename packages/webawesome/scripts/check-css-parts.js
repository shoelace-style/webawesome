/**
 * Guards the component CSS-part surface statically (no build):
 *   1. every rendered `part=` has a matching `@csspart`, so docs can't drift from render;
 *   2. every `@csspart` is actually rendered, so docs can't promise a part that does nothing;
 *   3. every component that renders `base` also exposes its canonical `<name>` (or `<name>-wrapper`) part;
 *   4. `base` is an anti-pattern: no component outside the legacy list may render, forward, or document one,
 *      and nothing in `src/` may select one. The legacy list only shrinks and is emptied in the next major.
 *
 * Check 2 can't see `part=${expr}`, so any component that builds a part name dynamically is skipped
 * for it rather than reported with false positives.
 */
import { globby } from 'globby';
import { readFile } from 'node:fs/promises';
import { basename, dirname } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = dirname(__dirname);

// Static `part=` attributes only. The lookbehind rejects `exportparts=` and `[part=…]` selectors.
const RENDERED_PART = /(?<![\w[])part=(["'])([^"'$]+)\1/g;
const DECLARED_PART = /@csspart\s+(\S+)/g;
// Tombstones for parts that no longer render, kept so the docs can explain the removal.
const DEPRECATED_PART = /@csspart\s+(\S+)\s*-\s*Deprecated\b/g;
// A part name built from an expression, e.g. `part=${...}` or `part="page ${...}"`.
const DYNAMIC_PART = /(?<![\w[])part=(?:\$\{|(["'])[^"']*\$\{)/;
// `exportparts="inner:outer, bare"` republishes a child's parts under this component's names.
const EXPORTED_PARTS = /exportparts=(["'])([^"'$]+)\1/g;
// A `base` part, or a forwarded name built on one (`close-button__base`, `base__popup`).
export const BASE_PART = /^(?:base|[\w-]+__base|base__[\w-]+)$/;
// A selector or lookup that targets one.
const BASE_SELECTOR = /::part\(\s*(?:base|[\w-]+__base|base__[\w-]+)\s*\)|\[part[~|]?=\s*["']base["']\s*\]/g;

function collect(source, regex, group) {
  const out = new Set();
  for (const match of source.matchAll(regex)) {
    // One attribute can name several parts: `part="foo bar"`.
    for (const token of match[group].trim().split(/\s+/)) if (token) out.add(token);
  }
  return out;
}

// The name a forwarded part is exposed under: the far side of `inner:outer`, or the whole token.
function collectExported(source) {
  const out = new Set();
  for (const match of source.matchAll(EXPORTED_PARTS)) {
    for (const entry of match[2].split(',')) {
      const exposed = entry.split(':').pop().trim();
      if (exposed) out.add(exposed);
    }
  }
  return out;
}

// Both sides of every `exportparts` entry.
function collectExportTokens(source) {
  const out = new Set();
  for (const match of source.matchAll(EXPORTED_PARTS)) {
    for (const entry of match[2].split(',')) {
      for (const token of entry.split(':')) if (token.trim()) out.add(token.trim());
    }
  }
  return out;
}

// Skip tests, styles, and `library.*.ts`: the icon library holds SVG fragments whose `part=`
// belongs to the consuming component (`indeterminate-icon` is a checkbox part, not icon's).
async function readComponentSource(dir) {
  const files = await globby('**/*.ts', { cwd: dir, absolute: true });
  const relevant = files.filter(f => !/\.(test|styles)\.ts$/.test(f) && !/(^|\/)library\.[^/]+\.ts$/.test(f));
  const contents = await Promise.all(relevant.map(f => readFile(f, 'utf8')));
  return contents.join('\n');
}

// Rendered but undocumented on purpose — pre-existing gaps to document separately. Empty here; the
// Pro package passes its own through `check({ allowlist })`.
const DEFAULT_ALLOWLIST = {};

// Components that still carry a deprecated `base` part (rendered, forwarded, or documented as a tombstone).
// Remove entries as they're cleaned up; never add one. The Pro package passes its own through `check({ legacyBase })`.
const DEFAULT_LEGACY_BASE = [
  'accordion-item',
  'badge',
  'breadcrumb',
  'button',
  'button-group',
  'carousel',
  'checkbox',
  'color-picker',
  'comparison',
  'details',
  'dialog',
  'drawer',
  'dropdown',
  'input',
  'known-date',
  'number-input',
  'page',
  'pagination',
  'progress-bar',
  'progress-ring',
  'qr-code',
  'rating',
  'select',
  'slider',
  'spinner',
  'switch',
  'tab',
  'tab-group',
  'tab-panel',
  'tag',
  'tag-input',
  'textarea',
  'time-input',
  'toast-item',
  'tooltip',
  'tree',
  'tree-item',
];

function hasCanonicalPart(name, rendered, declared) {
  return [name, `${name}-wrapper`].some(part => rendered.has(part) && declared.has(part));
}

export async function check(options = {}) {
  const rootDir = options.rootDir || root;
  const allowlist = options.allowlist ?? DEFAULT_ALLOWLIST;
  const legacyBase = new Set(options.legacyBase ?? DEFAULT_LEGACY_BASE);
  const dirs = await globby('src/components/*', {
    cwd: rootDir,
    absolute: true,
    onlyDirectories: true,
  });

  const failures = [];
  const staleAllowlist = [];
  const unverifiable = [];
  const staleLegacyBase = [];

  for (const dir of dirs.sort()) {
    const name = basename(dir);
    const source = await readComponentSource(dir);

    const rendered = collect(source, RENDERED_PART, 2);
    const declared = collect(source, DECLARED_PART, 1);
    const deprecated = collect(source, DEPRECATED_PART, 1);
    const exported = collectExported(source);
    const allowed = new Set(allowlist[name] ?? []);

    const undocumented = [...rendered].filter(part => !declared.has(part));
    const gaps = undocumented.filter(part => !allowed.has(part)).sort();

    // Flag allowlist entries that are now documented, so the list can't rot.
    for (const part of allowed) if (!undocumented.includes(part)) staleAllowlist.push(`${name}: ${part}`);

    const isDynamic = DYNAMIC_PART.test(source);
    if (isDynamic) unverifiable.push({ name, declared: declared.size });

    const phantoms = isDynamic
      ? []
      : [...declared].filter(part => !rendered.has(part) && !exported.has(part) && !deprecated.has(part)).sort();

    const missingCanonical = rendered.has('base') && !hasCanonicalPart(name, rendered, declared);

    const baseParts = [...new Set([...rendered, ...declared, ...collectExportTokens(source)])]
      .filter(part => BASE_PART.test(part))
      .sort();
    if (baseParts.length === 0 && legacyBase.has(name)) staleLegacyBase.push(name);

    const problems = [];
    if (gaps.length > 0) problems.push(`undocumented part(s): ${gaps.join(', ')}`);
    if (phantoms.length > 0) problems.push(`documented but never rendered: ${phantoms.join(', ')}`);
    if (missingCanonical) problems.push(`missing canonical part (\`${name}\` or \`${name}-wrapper\`)`);
    if (baseParts.length > 0 && !legacyBase.has(name)) {
      problems.push(`uses the deprecated \`base\` part: ${baseParts.join(', ')}`);
    }

    if (problems.length > 0) {
      failures.push(name);
      console.log(`❌ ${name} — ${problems.join('; ')}`);
    } else {
      console.log(`✅ ${name}`);
    }
  }

  // Styles and lookups anywhere in src/, outside tests and the generated React wrappers.
  const baseSelectors = [];
  const sourceFiles = await globby('src/**/*.{ts,css}', {
    cwd: rootDir,
    ignore: ['**/*.test.ts', 'src/react/**'],
  });
  for (const file of sourceFiles.sort()) {
    const content = await readFile(`${rootDir}/${file}`, 'utf8');
    for (const match of content.matchAll(BASE_SELECTOR)) {
      const line = content.slice(0, match.index).split('\n').length;
      baseSelectors.push(`${file}:${line} ${match[0]}`);
    }
  }

  console.log('');
  if (baseSelectors.length > 0) {
    console.log(
      `❌ ${baseSelectors.length} selector(s) target the deprecated \`base\` part. Use the named part instead:`,
    );
    for (const entry of baseSelectors) console.log(`      ${entry}`);
    console.log('');
  }

  if (staleLegacyBase.length > 0) {
    console.log(`❌ ${staleLegacyBase.length} legacy \`base\` entr(ies) no longer use it. Remove them from the list:`);
    for (const entry of staleLegacyBase) console.log(`      ${entry}`);
    console.log('');
  }

  if (staleAllowlist.length > 0) {
    console.log(`⚠️  ${staleAllowlist.length} stale allowlist entr(ies) — now documented, remove from ALLOWLIST:`);
    for (const entry of staleAllowlist) console.log(`      ${entry}`);
    console.log('');
  }

  if (unverifiable.length > 0) {
    const total = unverifiable.reduce((sum, entry) => sum + entry.declared, 0);
    const summary = unverifiable.map(entry => `${entry.name} (${entry.declared})`).join(', ');
    console.log(`ℹ️  ${unverifiable.length} component(s) build part names dynamically, so ${total} documented`);
    console.log(`    part(s) can't be verified as rendered: ${summary}`);
    console.log('');
  }

  if (failures.length > 0 || baseSelectors.length > 0 || staleLegacyBase.length > 0) {
    console.log(`FAILED: part issues across ${failures.length} component(s).`);
    console.log('Add a matching `@csspart <name> - <description>` for any stray `part=`. For a documented');
    console.log("part nothing renders, either render it or drop the tag — unless it's forwarded via");
    console.log('`exportparts` or is a `Deprecated.` tombstone, both of which are already exempt. And give');
    console.log('each component a canonical `<name>` (or `<name>-wrapper`) part on its outer element.');
    console.log('Never add a `base` part: name the wrapper after the component and forward named parts.');
    process.exit(1);
  }

  console.log('PASSED: rendered parts and documented parts match, and every component exposes its canonical part.');
}

function isRunAsMain() {
  if (import.meta.url.startsWith('file:')) {
    return process.argv[1] === fileURLToPath(import.meta.url);
  }
  return false;
}

if (isRunAsMain()) {
  await check().catch(error => {
    console.error(error);
    process.exit(1);
  });
}
