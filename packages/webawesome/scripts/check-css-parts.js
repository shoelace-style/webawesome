/**
 * Fails when a component renders a `part=` with no matching `@csspart`, so the rendered and
 * documented part surfaces can't drift. Static analysis, no build.
 *
 * Rendered-but-undocumented only. The reverse has too many false positives: the host `base` part
 * carries no `part=`, and `part=${expr}` can't be resolved without running the component.
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
const ALLOWLIST = {
  'color-picker': ['form-control', 'form-control-input', 'form-control-label', 'hint'],
  input: ['form-control-label'],
  page: ['skip-to-content'],
  select: ['label'],
  textarea: ['form-control-label'],
  'time-input': ['label'],
};

export async function check(options = {}) {
  const rootDir = options.rootDir || root;
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
    const allowed = new Set(ALLOWLIST[name] ?? []);

    const undocumented = [...rendered].filter(part => !declared.has(part));
    const gaps = undocumented.filter(part => !allowed.has(part)).sort();

    // Flag allowlist entries that are now documented, so the list can't rot.
    for (const part of allowed) if (!undocumented.includes(part)) staleAllowlist.push(`${name}: ${part}`);

    if (gaps.length > 0) {
      failures.push({ name, gaps });
      console.log(`❌ ${name} — undocumented part(s): ${gaps.join(', ')}`);
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
    const total = failures.reduce((sum, f) => sum + f.gaps.length, 0);
    console.log(`FAILED: ${total} undocumented part(s) across ${failures.length} component(s).`);
    console.log('Add a matching `@csspart <name> - <description>` tag, or remove the stray `part=`.');
    process.exit(1);
  }

  console.log('PASSED: every rendered part is documented (or explicitly allowlisted).');
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
