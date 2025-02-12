import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

let url = new URL('.', import.meta.url);
// One level up
url.pathname = path.join(url.pathname, '..');
export const PALETTE_DIR = fileURLToPath(url);

export function clamp(min, value, max) {
  return Math.min(Math.max(min, value), max);
}

/**
 * Format a comparison by rounding numbers to the lowest number of significant digits that still shows a difference.
 * @param {number} a
 * @param {number} b
 * @returns {string}
 */
export function formatComparison(a, b) {
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

export function hueToChalk(hue) {
  let ret;

  if (hue in chalk) {
    ret = chalk[hue];
  }
  switch (hue) {
    case 'indigo':
      ret = chalk.hex('#8a8beb');
      break;
    case 'purple':
      ret = chalk.hex('#a94dc6');
      break;
  }

  if (ret) {
    return ret.bold;
  }

  return chalk.bold;
}

export function toPrecision(value, precision = 2) {
  return +Number(value).toPrecision(precision);
}
