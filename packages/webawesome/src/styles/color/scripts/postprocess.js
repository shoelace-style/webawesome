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
const mixPercentage = { orange: 0.6 };
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

    if (scale.maxChromaTint != scale.maxChromaTintRaw) {
      reportPaletteIssue(
        `Clamping accent color to ${chalk.bold(scale.maxChromaTint)}, but peak chroma is in ${chalk.bold(scale.maxChromaTintRaw)} (${formatComparison(scale[scale.maxChromaTintRaw].c, scale[scale.maxChromaTint].c)})`,
        { paletteId, hue: hue },
      );
    }

    hueCSS[hue] += scaleCSS(hue, scale);
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

    reportPaletteIssue(`Missing hue. Generating from ${prevHue} and ${nextHue}`, { paletteId, hue });

    let prevScale = palette[prevHue];
    let nextScale = palette[nextHue];

    let progress = mixPercentage[hue] ?? 0.5;
    let scale = (palette[hue] = {});

    scale.maxChromaTint = (1 - progress) * prevScale.maxChromaTint + progress * nextScale.maxChromaTint;
    scale.maxChromaTint = Math.round(scale.maxChromaTint / 10) * 10;

    for (let tint in prevScale) {
      if (tint === '05' || !(tint > 0)) {
        continue;
      }

      let prevColor = palette[prevHue][tint];
      let nextColor = palette[nextHue][tint];

      let color = prevColor.mix(nextColor, progress, { space: 'oklch' });
      scale[tint] = color;
    }

    // Ensure core color has the max chroma
    let coreColor = scale[scale.maxChromaTint];
    coreColor.c = Math.max(...Object.values(scale).map(color => color.c || 0)) + 0.0002;

    hueCSS[hue] += scaleCSS(hue, scale);
  }

  hueCSS = Object.values(hueCSS).filter(Boolean).join('\n\n');
  // TODO apply Prettier instead of faking it
  paletteCSS = `${selector(paletteId)} {\n${hueCSS.trimEnd().replace(/^(?=\S)/gm, indent)}\n}\n`;

  fs.writeFileSync(path.join(PALETTE_DIR, paletteId + '.css'), paletteCSS, 'utf8');
}

let issuePaletteCount = Object.keys(paletteIssues).length - 1;
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

function scaleCSS(hue, scale) {
  let ret = [];
  for (let tint in scale) {
    if (tint === '05' || !(tint > 0)) {
      // The object has both '5' and '05' keys, but '05' is out of order
      // Also ignore non-tints
      continue;
    }

    let color = scale[tint];
    ret.push(declareColor(color, hue, tint));
  }
  ret.reverse();

  ret.push(`--wa-color-${hue}: var(--wa-color-${hue}-${scale.maxChromaTint});`);
  ret.push(`--wa-color-${hue}-key: ${scale.maxChromaTint};`);
  return ret.join('\n');
}
