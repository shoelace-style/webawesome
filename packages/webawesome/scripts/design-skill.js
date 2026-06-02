import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getCdnDir, getDistDir } from './utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The design skill is authored as static Markdown in `scripts/design-skill/` and maintained by hand.
// There is no generation step — the build simply copies these files into the dist output. To edit the
// skill, change the Markdown here and rebuild (or run this script directly). See the README in that
// directory for the maintenance workflow.
const SOURCE_DIR = path.join(__dirname, 'design-skill');

/**
 * Copies the static Web Awesome design skill into the build output. Mirrors the source directory
 * verbatim to `dist/skills/webawesome-design/` and `dist-cdn/skills/webawesome-design/`.
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

  for (const dest of outDirs) {
    fs.rmSync(dest, { recursive: true, force: true });
    // Copy everything except the maintainer README, which isn't part of the shipped skill.
    fs.cpSync(sourceDir, dest, {
      recursive: true,
      filter: src => path.basename(src) !== 'README.md',
    });
  }

  console.log(`Copied design skill to ${outDirs.length} location(s).`);
}
