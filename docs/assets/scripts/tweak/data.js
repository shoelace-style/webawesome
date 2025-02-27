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

export const HUE_SHIFTS = [
  // Reds
  { range: [0, 25], peak: [10, 25], shift: { dark: 15, light: -18 } },
  // Yellows
  { range: [30, 125], peak: [70, 100], shift: { dark: -48, light: 16 } },

  // Greens
  { range: [140, 160], peak: [145, 155], shift: { dark: 15, light: -5 } },
  // Blues
  { range: [240, 265], peak: [245, 260], shift: { dark: -3, light: -15 } },
];

export const MAX_CHROMA_BOUNDS = { min: 0.08, max: 0.3 };

export const HUE_RANGES = {
  red: { min: 15, max: 35 }, // 20
  // orange: { min: 35, max: 60 }, // 25
  yellow: { min: 60, max: 112 }, // 45
  green: { min: 112, max: 170 }, // 55
  cyan: { min: 170, max: 220 }, // 50
  blue: { min: 220, max: 265 }, // 45
  indigo: { min: 265, max: 290 }, // 25
  purple: { min: 290, max: 320 }, // 30
  pink: { min: 320, max: 375 }, // 55
};

export const L_RANGES = {
  '05': { min: 0.18, max: 0.2 },
  10: { min: 0.23, max: 0.25 },
  20: { min: 0.31, max: 0.35 },
  30: { min: 0.38, max: 0.43 },
  40: { min: 0.45, max: 0.5 },
  50: { min: 0.55, max: 0.6 },
  60: { min: 0.65, max: 0.7 },
  70: { min: 0.73, max: 0.78 },
  80: { min: 0.82, max: 0.85 },
  90: { min: 0.91, max: 0.93 },
  95: { min: 0.95, max: 0.97 },
};

for (let range of [HUE_RANGES, L_RANGES]) {
  for (let key in range) {
    range[key].mid = (range[key].min + range[key].max) / 2;
  }
}

export const moreHue = {
  red: 'Redder',
  orange: 'More orange', // https://www.reddit.com/r/grammar/comments/u9n0uo/is_it_oranger_or_more_orange/
  yellow: 'Yellower',
  green: 'Greener',
  cyan: 'More cyan',
  blue: 'Bluer',
  indigo: 'More indigo',
  purple: 'Purpler',
  pink: 'Pinker',
};

/**
 * Max gray chroma (% of chroma of undertone) per hue
 */
export const maxGrayChroma = {
  red: 0.2,
  orange: 0.2,
  yellow: 0.25,
  green: 0.25,
  cyan: 0.3,
  blue: 0.35,
  indigo: 0.35,
  purple: 0.3,
  pink: 0.25,
};

export const docsURLs = {
  colors: '/docs/themes/',
  palette: '/docs/palettes/',
  typography: '/docs/themes/',
};

export const icons = {
  colors: 'palette',
  palette: 'swatchbook',
  brand: 'droplet',
  typography: 'font-case',
};

export const hues = Object.keys(HUE_RANGES);

export const tints = ['05', '10', '20', '30', '40', '50', '60', '70', '80', '90', '95'];
