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

export const selectors = {
  palette: id =>
    [':where(:root)', ':host', ":where([class^='wa-theme-'], [class*=' wa-theme-'])", `.wa-palette-${id}`].join(',\n'),
};

export const HUE_RANGES = {
  red: { min: 15, max: 35 }, // 20
  orange: { min: 35, max: 60 }, // 25
  yellow: { min: 60, max: 112 }, // 45
  green: { min: 112, max: 170 }, // 55
  cyan: { min: 170, max: 220 }, // 50
  blue: { min: 220, max: 265 }, // 45
  indigo: { min: 265, max: 290 }, // 25
  purple: { min: 290, max: 320 }, // 30
  pink: { min: 320, max: 375 }, // 55
};

export const hues = Object.keys(HUE_RANGES);
export const tints = ['05', '10', '20', '30', '40', '50', '60', '70', '80', '90', '95'];

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

/**
 * Most common tint per hue.
 * Largely the statistical mode, but also informed by the average and median.
 */
export const HUE_TOP_TINT = {
  red: 50,
  orange: 70,
  yellow: 80,
  green: 80,
  cyan: 70,
  blue: 50,
  indigo: 40,
  purple: 50,
  pink: 50,
  gray: 40,
};

/*
┌─────────┬──────┬──────┬────────┬──────┬────────┬───────┐
│ (index) │ min  │ max  │ median │ avg  │ stddev │ count │
├─────────┼──────┼──────┼────────┼──────┼────────┼───────┤
│ red     │ 0.74 │ 1    │ 0.92   │ 0.88 │ 0.085  │ 9     │
│ yellow  │ 0.72 │ 1    │ 0.98   │ 0.92 │ 0.11   │ 8     │
│ green   │ 0.55 │ 0.93 │ 0.75   │ 0.75 │ 0.1    │ 8     │
│ cyan    │ 0.7  │ 0.88 │ 0.82   │ 0.81 │ 0.053  │ 8     │
│ blue    │ 0.54 │ 1    │ 0.83   │ 0.82 │ 0.15   │ 9     │
│ indigo  │ 0.63 │ 1    │ 0.87   │ 0.86 │ 0.13   │ 8     │
│ purple  │ 0.58 │ 0.99 │ 0.86   │ 0.84 │ 0.11   │ 8     │
│ pink    │ 0.74 │ 1    │ 0.93   │ 0.89 │ 0.089  │ 8     │
└─────────┴──────┴──────┴────────┴──────┴────────┴───────┘
*/
/** Max(Average, Median) % of max P3 chroma per hue, relative to palette maximum and capped to 0.8 */
export const HUE_CHROMA_SCALE = {
  red: 0.92,
  orange: 0.96, // interpolated
  yellow: 1,
  green: 0.8,
  cyan: 0.81,
  blue: 0.83,
  indigo: 0.87,
  purple: 0.86,
  pink: 0.92,
};

export const CHROMA_SCALE_LIGHTEST = {
  95: 1,
  90: 0.8,
  80: 0.5,
  70: 0.2,
  60: 0.2,
  50: 0.15,
  40: 0.1,
};

export const MAX_CHROMA_BY_TINT = {
  95: 0.11,
};

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

export const HUE_SHIFTS = [
  // Reds
  { range: [0, 25], peak: [10, 25], shift: { dark: 15, light: -18 }, maxConsecutive: { dark: 4, light: -2 } },
  // Yellows
  { range: [30, 112], peak: [70, 100], shift: { dark: -48, light: 16 }, maxConsecutive: { dark: -20, light: 4 } },

  // Greens
  { range: [140, 160], peak: [145, 155], shift: { dark: 15, light: -5 }, maxConsecutive: { dark: 7, light: -5 } },
  // Blues
  { range: [240, 265], peak: [245, 260], shift: { dark: -3, light: -15 }, maxConsecutive: { dark: -3, light: -4 } },
];

export const CHROMA_CURVES = {
  50: { dark: 0.9, light: 0.8 },
  60: { dark: 1, light: 1.2 },
  70: { light: 1.2 },
  80: { dark: 1.1, light: 2 },
  90: { dark: 3, light: 2 },
};

export const MAX_CHROMA_BOUNDS = { min: 0.08, max: 0.3 };

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

/** Default accent tint if all chromas are 0, but also the tint accent colors will be nudged towards (see chromaTolerance) */
export const DEFAULT_ACCENT = 60;

/** Min and max allowed tints */
export const MIN_ACCENT = 40;
export const MAX_ACCENT = 90;

/** Chroma tolerance: Chroma will need to differ more than this to gravitate away from defaultAccent */
export const CHROMA_TOLERANCE = 0.000001;
