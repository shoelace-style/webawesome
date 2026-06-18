import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getCdnDir, getDistDir } from './utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = path.resolve(__dirname, '..');

// The design skill is authored as static Markdown in `scripts/design-skill/` and maintained by hand.
// There is no generation step — the build simply copies these files into the dist output. To edit the
// skill, change the Markdown here and rebuild (or run this script directly). See the README in that
// directory for the maintenance workflow.
const SOURCE_DIR = path.join(__dirname, 'design-skill');

/**
 * Inserts `version: "<pkgVersion>"` into the SKILL.md frontmatter's `metadata:` block so the design
 * skill stays in lockstep with the package release (mirrors the auto-injected version on the generated
 * `webawesome` skill). No-op if a version already exists. Source SKILL.md is left untouched; this only
 * rewrites the copied output.
 */
function injectVersion(skillPath, version) {
  const content = fs.readFileSync(skillPath, 'utf-8');
  const updated = content.replace(/(\nmetadata:\n)((?:[ \t]+[^\n]+\n)+)/, (match, prefix, body) => {
    // Already has a version inside the metadata block — leave it alone.
    if (/^\s+version:/m.test(body)) return match;
    // Insert version as the first key inside metadata (matches the webawesome SKILL ordering).
    return `${prefix}  version: "${version}"\n${body}`;
  });
  if (updated === content) {
    // Either the metadata block wasn't found, or it already had a version key — both no-ops, but
    // surface a warning for the missing-metadata case since it usually means the frontmatter shape
    // has drifted.
    if (!/\nmetadata:\n/.test(content)) {
      console.warn(`Warning: could not find metadata block in ${skillPath}; version not injected.`);
    }
    return;
  }
  fs.writeFileSync(skillPath, updated, 'utf-8');
}

/**
 * Copies the static Web Awesome design skill into the build output. Mirrors the source directory
 * verbatim to `dist/skills/webawesome-design/` and `dist-cdn/skills/webawesome-design/`, then injects
 * the current package version into the copied SKILL.md so it stays in sync with releases.
 */
export async function generateDesignSkill(options = {}) {
  const {
    sourceDir = SOURCE_DIR,
    outDirs = [path.join(getDistDir(), 'skills/webawesome-design'), path.join(getCdnDir(), 'skills/webawesome-design')],
  } = options;

  if (!fs.existsSync(sourceDir)) {
    console.warn(`Warning: design skill source not found at ${sourceDir}. Skipping.`);
    return;
  }

  const packageData = JSON.parse(fs.readFileSync(path.join(PACKAGE_ROOT, 'package.json'), 'utf-8'));
  const version = packageData.version || '0.0.0';

  for (const dest of outDirs) {
    fs.rmSync(dest, { recursive: true, force: true });
    // Copy everything except the maintainer README, which isn't part of the shipped skill.
    fs.cpSync(sourceDir, dest, {
      recursive: true,
      filter: src => path.basename(src) !== 'README.md',
    });
    injectVersion(path.join(dest, 'SKILL.md'), version);
  }

  console.log(`Copied design skill (v${version}) to ${outDirs.length} location(s).`);
}
