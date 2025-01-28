/**
 * Add tintless variables and OKLCH coords as comments to palette CSS files.
 * Run via node tintless.js
 * Warning: Will overwrite existing files. Check the diff before committing!
 */
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import palettes from './palettes.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const selector = paletteId =>
  [':where(:root)', ':host', ":where([class^='wa-theme-'], [class*=' wa-theme-'])", `.wa-palette-${paletteId}`].join(
    ',\n',
  );

// Default accent tint if all chromas are 0, but also the tint accent colors will be nudged towards (see chromaTolerance)
const defaultAccent = 60;

// Chroma tolerance: Chroma will need to differ more than this to gravitate away from defaultAccent
const chromaTolerance = 0.000001;

// Min and max allowed tints
const minAccentTint = 40;
const maxAccentTint = 90;

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

    let maxChromaTint = defaultAccent;
    let maxChroma = tints[defaultAccent].get('oklch.c');

    let tintCSS = '';

    for (let tint in tints) {
      if (tint === '05') {
        // The object has both '5' and '05' keys, but '05' is out of order
        continue;
      }

      let color = tints[tint];
      let lchColor = color.to('oklch');
      tint = tint.padStart(2, '0');

      if (lchColor.c > maxChroma + chromaTolerance) {
        maxChroma = lchColor.c;
        maxChromaTint = tint;
      }

      let lchComment = `/* ${lchColor.toString()} */`;

      tintCSS = `--wa-color-${hue}-${tint}: ${color} ${lchComment};\n` + tintCSS;
    }

    if (maxChromaTint < minAccentTint || maxChromaTint > maxAccentTint) {
      let fakeMaxChromaTint = clamp(minAccentTint, maxChromaTint, maxAccentTint);
      let huePrefix = hueToChalk(hue)(hue.padEnd(hueMaxChars + 2));

      console.warn(
        `${prefix} ${huePrefix}: Clamping accent color to ${chalk.bold(fakeMaxChromaTint)}, but peak chroma is in ${chalk.bold(maxChromaTint)} (${formatComparison(tints[maxChromaTint].get('oklch.c'), tints[fakeMaxChromaTint].get('oklch.c'))})`,
      );
      issueCount++;
      maxChromaTint = fakeMaxChromaTint;

      if (prefix.trim()) {
        // First time encountering an issue with this palette
        issuePaletteCount++;

        // Don't print palette id multiple times
        prefix = ' '.repeat(paletteIdMaxChars + 2);
      }
    }

    tintCSS += `--wa-color-${hue}: var(--wa-color-${hue}-${maxChromaTint});\n`;
    css += tintCSS + '\n';
  }

  let indent = '  ';
  css = `${selector(paletteId)} {\n${css.trimEnd().replace(/^(?=\S)/gm, indent)}\n}\n`;

  fs.writeFileSync(path.join(__dirname, paletteId + '.css'), css, 'utf8');
}

console.info(
  `🎨 Wrote ${Object.keys(palettes).length} palette files.` +
    (issueCount > 0 ? ` ${chalk.bold(issueCount)} issues found across ${chalk.bold(issuePaletteCount)} palettes.` : ''),
);

function clamp(min, value, max) {
  return Math.min(Math.max(min, value), max);
}

/**
 * Format a comparison by rounding numbers to the lowest number of significant digits that still shows a difference.
 * @param {number} a
 * @param {number} b
 * @returns {string}
 */
function formatComparison(a, b) {
  let op = a < b ? '<' : '>';

  for (let i = 1; i < 10; i++) {
    let roundedA = a.toPrecision(i);
    let roundedB = b.toPrecision(i);

    if (roundedA !== roundedB) {
      return `${roundedA} ${op} ${roundedB}`;
    }
  }

  return `${a} ${op} ${b}`;
}

function hueToChalk(hue) {
  let ret;

  if (hue in chalk) {
    ret = chalk[hue];
  }
  switch (hue) {
    case 'teal':
      ret = chalk.cyan;
      break;
    case 'indigo':
      ret = chalk.hex('#8a8beb');
      break;
    case 'violet':
      ret = chalk.hex('#a94dc6');
      break;
  }

  if (ret) {
    return ret.bold;
  }

  return chalk.bold;
}
