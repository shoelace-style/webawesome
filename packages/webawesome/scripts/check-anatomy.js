/**
 * Fails when a component doc flags an anatomy example the diagram can't use — the flagged block doesn't
 * contain the component's tag (the clone falls back), or the page has no diagram (`hasAnatomy: false` / a
 * `parent` sub-component) so an `.anatomy-only` flag hides the example for nothing. Static analysis, no build.
 */
import { globby } from 'globby';
import { readFile } from 'node:fs/promises';
import { basename, dirname } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = dirname(__dirname);

// A fenced block flagged `.anatomy`/`.anatomy-only`; captures its body up to the closing fence.
const ANATOMY_FENCE = /^```.*\.anatomy.*\n([\s\S]*?)^```/gm;

function frontMatter(source) {
  return source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
}

function hasNoDiagram(fm) {
  return /(^|\n)hasAnatomy:\s*false\b/.test(fm) || /(^|\n)parent:\s*\S/.test(fm);
}

export async function check(options = {}) {
  const rootDir = options.rootDir || root;
  const files = await globby('docs/docs/components/*.md', { cwd: rootDir, absolute: true });

  const failures = [];

  for (const file of files.sort()) {
    const slug = basename(file, '.md');
    const tag = `wa-${slug}`;
    const source = await readFile(file, 'utf8');
    const fm = frontMatter(source);

    const blocks = [...source.matchAll(ANATOMY_FENCE)].map(match => match[1]);
    const problems = [];

    if (hasNoDiagram(fm)) {
      if (blocks.length > 0) problems.push('flagged an anatomy example, but this page has no diagram');
    } else {
      // Boundary guard so `wa-input` doesn't match `wa-input-foo`.
      const hasTag = new RegExp(`<${tag}(?![\\w-])`);
      for (const [index, block] of blocks.entries()) {
        if (!hasTag.test(block)) problems.push(`anatomy example #${index + 1} has no <${tag}> to render`);
      }
    }

    if (problems.length > 0) {
      failures.push({ slug, problems });
      console.log(`❌ ${slug} — ${problems.join('; ')}`);
    } else {
      console.log(`✅ ${slug}`);
    }
  }

  console.log('');
  if (failures.length > 0) {
    const total = failures.reduce((sum, f) => sum + f.problems.length, 0);
    console.log(`FAILED: ${total} anatomy issue(s) across ${failures.length} page(s).`);
    console.log('Flag the example that contains the component, or drop the flag on pages with no diagram.');
    process.exit(1);
  }

  console.log('PASSED: every flagged anatomy example resolves to a subject.');
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
