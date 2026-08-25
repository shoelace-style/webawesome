/**
 * Guards the component CSS-part surface statically (no build):
 *   1. every rendered `part=` has a matching `@csspart`, so docs can't drift from render;
 *   2. every `@csspart` is actually rendered, so docs can't promise a part that does nothing;
 *   3. every component that renders `base` also exposes its canonical `<name>` (or `<name>-wrapper`) part.
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

// These render `base` on a `<slot>` rather than a wrapper element. Parts don't belong on slots, and
// the host does the styling, so they get no component-named part until the legacy `base` is removed.
const SLOT_BASE = new Set(['button-group', 'tab-panel']);

function hasCanonicalPart(name, rendered, declared) {
  return [name, `${name}-wrapper`].some(part => rendered.has(part) && declared.has(part));
}

export async function check(options = {}) {
  const rootDir = options.rootDir || root;
  const allowlist = options.allowlist ?? DEFAULT_ALLOWLIST;
  const dirs = await globby('src/components/*', {
    cwd: rootDir,
    absolute: true,
    onlyDirectories: true,
  });

  const failures = [];
  const staleAllowlist = [];
  const unverifiable = [];

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

    const missingCanonical =
      rendered.has('base') && !SLOT_BASE.has(name) && !hasCanonicalPart(name, rendered, declared);

    const problems = [];
    if (gaps.length > 0) problems.push(`undocumented part(s): ${gaps.join(', ')}`);
    if (phantoms.length > 0) problems.push(`documented but never rendered: ${phantoms.join(', ')}`);
    if (missingCanonical) problems.push(`missing canonical part (\`${name}\` or \`${name}-wrapper\`)`);

    if (problems.length > 0) {
      failures.push(name);
      console.log(`❌ ${name} — ${problems.join('; ')}`);
    } else {
      console.log(`✅ ${name}`);
    }
  }

  console.log('');
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

  if (failures.length > 0) {
    console.log(`FAILED: part issues across ${failures.length} component(s).`);
    console.log('Add a matching `@csspart <name> - <description>` for any stray `part=`. For a documented');
    console.log("part nothing renders, either render it or drop the tag — unless it's forwarded via");
    console.log('`exportparts` or is a `Deprecated.` tombstone, both of which are already exempt. And give');
    console.log('each component a canonical `<name>` (or `<name>-wrapper`) part on its outer element.');
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
