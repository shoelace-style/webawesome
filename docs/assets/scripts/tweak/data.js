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

export const moreHue = {
  red: 'Redder',
  orange: 'More orange', // https://www.reddit.com/r/grammar/comments/u9n0uo/is_it_oranger_or_more_orange/
  yellow: 'Yellower',
  green: 'Greener',
  cyan: 'More cyan',
  blue: 'Bluer',
  indigo: 'More indigo',
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

export const hues = Object.keys(hueRanges);

export const tints = ['05', '10', '20', '30', '40', '50', '60', '70', '80', '90', '95'];
