/**
 * Fails when a component doc flags an anatomy example the diagram can't use — the flagged block doesn't
 * contain the component's tag (the clone falls back), the page has no diagram (`hasAnatomy: false` / a
 * `parent` sub-component) so an `.anatomy-only` flag hides the example for nothing, or a multi-instance
 * example doesn't mark exactly one `data-anatomy-subject` (the diagram would silently pick the first).
 * Static analysis, no build.
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
  if (/(^|\n)hasAnatomy:\s*true\b/.test(fm)) return false; // opt-in override for sub-components
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
      const tagPattern = new RegExp(`<${tag}(?![\\w-])`, 'g');
      for (const [index, block] of blocks.entries()) {
        const tagCount = (block.match(tagPattern) || []).length;
        const markedCount = (block.match(/data-anatomy-subject/g) || []).length;
        if (tagCount === 0) {
          problems.push(`anatomy example #${index + 1} has no <${tag}> to render`);
        } else if (markedCount > 1) {
          problems.push(`anatomy example #${index + 1} marks ${markedCount} subjects (need exactly one)`);
        } else if (tagCount > 1 && markedCount === 0) {
          // Several instances but no marker → the diagram would silently pick the first. Force a choice.
          problems.push(`anatomy example #${index + 1} has ${tagCount} <${tag}> but none marked data-anatomy-subject`);
        }
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
