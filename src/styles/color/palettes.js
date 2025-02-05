/**
 * Export data on all color tokens from all palettes
 */

// Get a list of all CSS files in repo
import Color from 'colorjs.io';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export const paletteFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.css'));
export const declarationRegex =
  /^\s*--wa-color-(?<hue>[a-z]+)-(?<level>[0-9]+):\s*(?<color>.+?)\s*(\/\*.+?\*\/)?\s*;$/gm;
export const rawCSS = {};

function parse(contents, file) {
  // Regex for each declaration
  const matches = [...contents.matchAll(declarationRegex)];

  if (matches.length === 0) {
    throw new Error('Cound not extract colors');
  }

  const ret = {};

  for (let match of matches) {
    let { hue, level, color } = match.groups;
    ret[hue] ??= {};

    // Attempt to convert color to Color object, fall back to string if this fails
    // This will happen for e.g. colors defined via color-mix()
    try {
      color = new Color(color);
    } catch (e) {
      console.warn(`[${file}] Unparseable color ${hue}-${level}: ${color}`);
    }

    if (level.startsWith('0')) {
      // Leading zeroes throw off sorting, add both properties
      // NOTE: Ideally one of the two would be added as non-enumerable, but then we cannot access it via 11ty data
      ret[hue][level] = color;

      // Drop leading zeroes
      level = level.replace(/^0+/, '');
    }

    ret[hue][level] = color;
  }

  return ret;
}

const palettes = {};

for (let file of paletteFiles) {
  let css = fs.readFileSync(path.join(__dirname, file), 'utf8');
  rawCSS[file] = css;
  let tokens = parse(css, file);
  let paletteId = file.replace(/\.css$/, '');

  palettes[paletteId] = tokens;
}

export default palettes;
