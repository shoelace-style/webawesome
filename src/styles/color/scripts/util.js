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

export function normalizeAngles(angles) {
  // First, normalize
  angles = angles.map(h => ((h % 360) + 360) % 360);

  // Remove top and bottom 25% and find average
  let averageHue =
    angles
      .toSorted((a, b) => a - b)
      .slice(angles.length / 4, -angles.length / 4)
      .reduce((a, b) => a + b, 0) / angles.length;

  for (let i = 0; i < angles.length; i++) {
    let h = angles[i];
    let prevHue = angles[i - 1];
    let delta = h - prevHue;

    if (Math.abs(delta) > 180) {
      let equivalent = [h + 360, h - 360];
      // Offset hue to minimize difference in the direction that brings it closer to the average
      let delta = h - averageHue;

      if (Math.abs(equivalent[0] - prevHue) <= Math.abs(equivalent[1] - prevHue)) {
        angles[i] = equivalent[0];
      } else {
        angles[i] = equivalent[1];
      }
    }
  }

  return angles;
}

export const aggregates = {
  min: values => Math.min(...values),
  max: values => Math.max(...values),
  avg: values => values.reduce((a, b) => a + b, 0) / values.length,
  count: values => values.length,
  values: values => values,
  median: values => {
    let sorted = values.slice().sort((a, b) => a - b);
    let mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
  },
  extent: (values, { min, max }) => max - min,
  mid: (values, { min, max }) => (max + min) / 2,
};
