/**
 * Post-process palette CSS files to add core colors, oklch coordinates etc.
 * Run via node postprocess.js
 * Warning: Will overwrite existing files. Check the diff before committing!
 */
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import palettes from './palettes-analyzed.js';
import { PALETTE_DIR, formatComparison, hueToChalk } from './util.js';

// TODO import from global data file instead of duplicating this data
const hues = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'indigo', 'purple', 'pink', 'gray'];
const huesChromatic = hues.slice(0, -1);

/** If a hue is missing, how should it be generated from the neighboring hues? */
const mixPercentage = { orange: 0.7 };
const selector = paletteId =>
  [':where(:root)', ':host', ":where([class^='wa-theme-'], [class*=' wa-theme-'])", `.wa-palette-${paletteId}`].join(
    ',\n',
  );

// Used for formatting warnings
const paletteIdMaxChars = Object.keys(palettes).reduce((max, id) => Math.max(max, id.length), 0);
const hueMaxChars = Object.keys(palettes.default).reduce((max, id) => Math.max(max, id.length), 0);

const indent = '  ';

const paletteIssues = { total: 0 };

for (let paletteId in palettes) {
  const palette = palettes[paletteId];

  let paletteCSS = '';
  let hueCSS = Object.fromEntries(hues.map(hue => [hue, '']));

  for (let hue in palette) {
    let scale = palette[hue];

    for (let tint in scale) {
      if (tint === '05' || !(tint > 0)) {
        // The object has both '5' and '05' keys, but '05' is out of order
        // Also ignore non-tints
        continue;
      }

      let color = scale[tint];
      hueCSS[hue] = declareColor(color, hue, tint) + '\n' + hueCSS[hue];
    }

    if (scale.maxChromaTint != scale.maxChromaTintRaw) {
      reportPaletteIssue(
        `Clamping accent color to ${chalk.bold(scale.maxChromaTint)}, but peak chroma is in ${chalk.bold(scale.maxChromaTintRaw)} (${formatComparison(scale[scale.maxChromaTintRaw].c, scale[scale.maxChromaTint].c)})`,
        { paletteId, hue: hue },
      );
    }

    hueCSS[hue] += `--wa-color-${hue}: var(--wa-color-${hue}-${scale.maxChromaTint});\n`;
    hueCSS[hue] += `--wa-color-${hue}-key: ${scale.maxChromaTint};\n`;
  }

  // Generate missing hues
  for (let i = 0; i < hues.length; i++) {
    let hue = hues[i];
    if (hueCSS[hue]) {
      continue;
    }

    // Find previous and next hue to interpolate
    // We assume gaps will always be at most 1 hue wide
    let prevHue = huesChromatic[i - 1] ?? huesChromatic.at(-1);
    let nextHue = huesChromatic[i + 1] ?? huesChromatic[0];

    reportPaletteIssue(`Missing hue ${hue}. Generating from ${prevHue} and ${nextHue}`, { paletteId, hue });

    for (let tint in palette[prevHue]) {
      if (tint === '05' || !(tint > 0)) {
        continue;
      }

      let prevColor = palette[prevHue][tint];
      let nextColor = palette[nextHue][tint];

      let color = prevColor.mix(nextColor, mixPercentage[hue] ?? 0.5, { space: 'oklch' });
      hueCSS[hue] = declareColor(color, hue, tint) + '\n' + hueCSS[hue];
    }
  }

  hueCSS = Object.values(hueCSS).join('\n');
  // TODO apply Prettier instead of faking it
  paletteCSS = `${selector(paletteId)} {\n${hueCSS.trimEnd().replace(/^(?=\S)/gm, indent)}\n}\n`;

  fs.writeFileSync(path.join(PALETTE_DIR, paletteId + '.css'), paletteCSS, 'utf8');
}

let issuePaletteCount = Object.keys(paletteIssues).length;
console.info(
  `🎨 Wrote ${Object.keys(palettes).length} palette files.` +
    (paletteIssues.total > 0
      ? ` ${chalk.bold(paletteIssues.total)} issues found across ${chalk.bold(issuePaletteCount)} palettes.`
      : ''),
);

function reportPaletteIssue(issue, { paletteId, hue }) {
  let palettePrefix = `[${paletteId}]`.padEnd(paletteIdMaxChars + 2);

  if (!paletteIssues[paletteId]) {
    // First time encountering an issue with this palette
    paletteIssues[paletteId] = { count: 0 };
  } else {
    // Don't print palette id multiple times
    palettePrefix = ' '.repeat(paletteIdMaxChars + 2);
  }

  paletteIssues[paletteId].count++;
  paletteIssues.total++;

  let msg = palettePrefix;
  let huePrefix = '';

  if (hue) {
    huePrefix = hueToChalk(hue)(hue.padEnd(hueMaxChars + 2));
  }

  console.warn(`${msg}${huePrefix}${issue}`);
}

function declareColor(color, hue, tint) {
  tint = tint.padStart(2, '0');
  let ret = `--wa-color-${hue}-${tint}: `;

  if (color.inGamut('srgb')) {
    ret += `${color.toString({ format: 'hex' })} /* ${color.toString()} */;`;
  } else {
    ret += `${color.toString()};`;
  }

  return ret;
}
