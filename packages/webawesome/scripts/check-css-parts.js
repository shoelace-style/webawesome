/**
 * Guards the component CSS-part surface statically (no build):
 *   1. every rendered `part=` has a matching `@csspart`, so docs can't drift from render;
 *   2. every component that renders `base` also exposes its canonical `<name>` (or `<name>-wrapper`) part.
 *
 * Documented-but-unrendered isn't checked — `part=${expr}` can't be resolved statically, so it
 * produces too many false positives.
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

function collect(source, regex, group) {
  const out = new Set();
  for (const match of source.matchAll(regex)) {
    // One attribute can name several parts: `part="foo bar"`.
    for (const token of match[group].trim().split(/\s+/)) if (token) out.add(token);
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

// Rendered but undocumented on purpose — pending API-shape decisions (form-control label naming;
// `page` renders `skip-to-content` but documents `skip-link`). Drop each as it's resolved.
const DEFAULT_ALLOWLIST = {
  'color-picker': ['form-control', 'form-control-input', 'form-control-label', 'hint'],
  input: ['form-control-label'],
  page: ['skip-to-content'],
  select: ['label'],
  textarea: ['form-control-label'],
  'time-input': ['label'],
};

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

  for (const dir of dirs.sort()) {
    const name = basename(dir);
    const source = await readComponentSource(dir);

    const rendered = collect(source, RENDERED_PART, 2);
    const declared = collect(source, DECLARED_PART, 1);
    const allowed = new Set(allowlist[name] ?? []);

    const undocumented = [...rendered].filter(part => !declared.has(part));
    const gaps = undocumented.filter(part => !allowed.has(part)).sort();

    // Flag allowlist entries that are now documented, so the list can't rot.
    for (const part of allowed) if (!undocumented.includes(part)) staleAllowlist.push(`${name}: ${part}`);

    const missingCanonical =
      rendered.has('base') && !SLOT_BASE.has(name) && !hasCanonicalPart(name, rendered, declared);

    const problems = [];
    if (gaps.length > 0) problems.push(`undocumented part(s): ${gaps.join(', ')}`);
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

  if (failures.length > 0) {
    console.log(`FAILED: part issues across ${failures.length} component(s).`);
    console.log('Add a matching `@csspart <name> - <description>` for any stray `part=`, and give each');
    console.log('component a canonical `<name>` (or `<name>-wrapper`) part on its outer element.');
    process.exit(1);
  }

  console.log('PASSED: every rendered part is documented, and every component exposes its canonical part.');
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
