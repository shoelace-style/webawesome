export const cdnUrl = document.documentElement.dataset.cdnUrl;

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

export const HUE_RANGES = {
  red: { min: 15, max: 35 },
  // gap: 35 - 60, will be filled by orange
  yellow: { min: 60, max: 95 },
  // gap: 95 - 130
  green: { min: 130, max: 170 },
  // gap: 170 - 190
  cyan: { min: 190, max: 220 },
  // gap: 220 - 240
  blue: { min: 240, max: 260 },
  // gap: 260 - 270
  indigo: { min: 270, max: 290 },
  purple: { min: 290, max: 310 },
  pink: { min: 310, max: 365 },
  // gap: 5-15
};

// Spread hue ranges to cover gaps
let previousRange = HUE_RANGES.pink;

for (let hue in HUE_RANGES) {
  let bound = previousRange.max % 360;
  let range = HUE_RANGES[hue];

  if (range.min > bound) {
    let gap = range.min - bound;
    previousRange.max += gap / 2;
    range.min -= gap / 2;
  }

  previousRange = range;
}

export const hues = Object.keys(HUE_RANGES);
