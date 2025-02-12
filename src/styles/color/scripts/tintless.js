/**
 * Add tintless variables and OKLCH coords as comments to palette CSS files.
 * Run via node tintless.js
 * Warning: Will overwrite existing files. Check the diff before committing!
 */
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import palettes, { rawPalettes } from './palettes-analyzed.js';
import { PALETTE_DIR, formatComparison, hueToChalk } from './util.js';

const selector = paletteId =>
  [':where(:root)', ':host', ":where([class^='wa-theme-'], [class*=' wa-theme-'])", `.wa-palette-${paletteId}`].join(
    ',\n',
  );

// Used for formatting warnings
const paletteIdMaxChars = Object.keys(palettes).reduce((max, id) => Math.max(max, id.length), 0);
const hueMaxChars = Object.keys(palettes.default).reduce((max, id) => Math.max(max, id.length), 0);

let issueCount = 0;
let issuePaletteCount = 0;

for (let paletteId in palettes) {
  const tokens = palettes[paletteId];

  let css = '';
  let prefix = `[${paletteId}]`.padEnd(paletteIdMaxChars + 2);

  for (let hue in tokens) {
    let tints = tokens[hue];

    let tintCSS = '';

    for (let tint in tints) {
      if (tint === '05' || !(tint > 0)) {
        // The object has both '5' and '05' keys, but '05' is out of order
        // Also ignore non-tints
        continue;
      }

      let color = tints[tint];
      tint = tint.padStart(2, '0');

      tintCSS =
        `--wa-color-${hue}-${tint}: ${color.toString({ format: 'hex' })} /* ${color.toString()} */;\n` + tintCSS;
    }

    if (tints.maxChromaTint != tints.maxChromaTintRaw) {
      let huePrefix = hueToChalk(hue)(hue.padEnd(hueMaxChars + 2));

      console.warn(
        `${prefix} ${huePrefix}: Clamping accent color to ${chalk.bold(tints.maxChromaTint)}, but peak chroma is in ${chalk.bold(tints.maxChromaTintRaw)} (${formatComparison(tints[tints.maxChromaTintRaw].c, tints[tints.maxChromaTint].c)})`,
      );
      issueCount++;

      if (prefix.trim()) {
        // First time encountering an issue with this palette
        issuePaletteCount++;

        // Don't print palette id multiple times
        prefix = ' '.repeat(paletteIdMaxChars + 2);
      }
    }

    tintCSS += `--wa-color-${hue}: var(--wa-color-${hue}-${tints.maxChromaTint});\n`;
    tintCSS += `--wa-color-${hue}-key: ${tints.maxChromaTint};\n`;
    css += tintCSS + '\n';
  }

  let indent = '  ';
  css = `${selector(paletteId)} {\n${css.trimEnd().replace(/^(?=\S)/gm, indent)}\n}\n`;

  fs.writeFileSync(path.join(PALETTE_DIR, paletteId + '.css'), css, 'utf8');
}

console.info(
  `🎨 Wrote ${Object.keys(palettes).length} palette files.` +
    (issueCount > 0 ? ` ${chalk.bold(issueCount)} issues found across ${chalk.bold(issuePaletteCount)} palettes.` : ''),
);
