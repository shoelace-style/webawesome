/**
 * Export data on all color tokens from all palettes
 */

// Get a list of all CSS files in repo
import Color from 'colorjs.io';
import fs from 'fs';
import path from 'path';
import { PALETTE_DIR } from './util.js';

export const paletteFiles = fs
  .readdirSync(PALETTE_DIR + '/')
  .filter(file => file.endsWith('.css') && !file.endsWith('base.css'));
export const declarationRegex =
  /^\s*--wa-color-(?<hue>[a-z]+)(?:-(?<level>[0-9]+|key))?:\s*(?<color>.+?)\s*(\/\*.+?\*\/)?\s*;$/gm;
export const rawCSS = {};

function parse(contents, file) {
  // Regex for each declaration
  const matches = [...contents.matchAll(declarationRegex)];

  if (matches.length === 0) {
    throw new Error('Cound not extract colors');
  }

  const ret = {};

  for (let match of matches) {
    let { hue, level = '', color } = match.groups;
    ret[hue] ??= {};
    let scale = ret[hue];

    if (level === 'key') {
      scale.maxChromaTint = color;
      continue;
    }

    if (!level) {
      if (color.startsWith('var(')) {
        // Core color aliased to another color, ignore
        continue;
      } else {
        // Custom core color
        level = 'core';
      }
    }

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
      scale[level] = color;

      // Drop leading zeroes
      level = level.replace(/^0+/, '');
    }

    scale[level] = color;
  }

  return ret;
}

const palettes = {};

for (let file of paletteFiles) {
  let css = fs.readFileSync(path.join(PALETTE_DIR, file), 'utf8');
  rawCSS[file] = css;
  let tokens = parse(css, file);
  let paletteId = file.replace(/\.css$/, '');

  palettes[paletteId] = tokens;
}

export default palettes;
