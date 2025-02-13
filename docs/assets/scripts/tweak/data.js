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
  yellow: { min: 60, max: 112 }, // 45
  green: { min: 112, max: 170 }, // 55
  cyan: { min: 170, max: 220 }, // 50
  blue: { min: 220, max: 265 }, // 45
  indigo: { min: 265, max: 290 }, // 25
  purple: { min: 290, max: 320 }, // 30
  pink: { min: 320, max: 365 }, // 45
};

export const hues = Object.keys(hueRanges);

export const tints = ['05', '10', '20', '30', '40', '50', '60', '70', '80', '90', '95'];
