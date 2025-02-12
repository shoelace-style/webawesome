/**
 * Data related to theme remixing and palette tweaking
 * Must work in both browser and Node.js
 */
export const cdnUrl = globalThis.document ? document.documentElement.dataset.cdnUrl : '/dist/';

export const urls = {
  theme: id => `styles/themes/${id}.css`,
  colors: id => `styles/themes/${id}/color.css`,
  palette: id => `styles/color/${id}.css`,
  brand: id => `styles/brand/${id}.css`,
  typography: id => `styles/themes/${id}/typography.css`,
};

export const selectors = {
  palette: id =>
    [':where(:root)', ':host', ":where([class^='wa-theme-'], [class*=' wa-theme-'])", `.wa-palette-${id}`].join(',\n'),
};

export const hueRanges = {
  red: { min: 5, max: 35 }, // 30
  orange: { min: 35, max: 60 }, // 25
  yellow: { min: 60, max: 120 }, // 60
  green: { min: 120, max: 170 }, // 50
  cyan: { min: 170, max: 220 }, // 50
  blue: { min: 220, max: 260 }, // 40
  indigo: { min: 260, max: 290 }, // 30
  purple: { min: 290, max: 320 }, // 30
  pink: { min: 320, max: 365 }, // 45
};

// Spread hue ranges to cover gaps
let previousRange = hueRanges.pink;

for (let hue in hueRanges) {
  let bound = previousRange.max % 360;
  let range = hueRanges[hue];

  if (range.min > bound) {
    let gap = range.min - bound;
    previousRange.max += gap / 2;
    range.min -= gap / 2;
  }

  previousRange = range;
}

export const hues = Object.keys(hueRanges);
