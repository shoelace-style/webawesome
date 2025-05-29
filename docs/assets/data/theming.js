import { deepEach, isPlainObject } from '../scripts/util/deep.js';

/**
 * Data related to themes, theme remixing
 * Must work in both browser and Node.js
 */
export const cdnUrl = globalThis.document ? document.documentElement.dataset.cdnUrl : '/dist/';

// This should eventually replace all uses of `urls` and `themeParams`
export const themeConfig = {
  base: { url: id => `styles/themes/${id}.css`, default: 'default' },
  colors: {
    url: id => `styles/themes/${id}/color.css`,
    docs: '/docs/themes/',
    icon: 'palette',
    default() {
      return this.base;
    },
  },
  palette: {
    url: id => `styles/color/${id}.css`,
    docs: '/docs/palette/',
    icon: 'swatchbook',
    default(baseTheme) {
      return baseTheme?.palette;
    },
  },
  brand: {
    url: id => `styles/brand/${id}.css`,
    icon: 'droplet',
    default(baseTheme) {
      return baseTheme?.brand;
    },
  },
  typography: {
    url: id => `styles/themes/${id}/typography.css`,
    docs: '/docs/themes/',
    icon: 'font-case',
    default() {
      return this.base;
    },
  },
  rounding: {
    cssProperty: '--wa-border-radius-scale',
    default(baseTheme) {
      return baseTheme?.rounding ?? 1;
    },
  },
  spacing: {
    cssProperty: '--wa-space-scale',
    default(baseTheme) {
      return baseTheme?.spacing ?? 1;
    },
  },
  borderWidth: {
    cssProperty: '--wa-border-width-scale',
    default(baseTheme) {
      return baseTheme?.borderWidth ?? 1;
    },
  },
  dimensionality: {
    url: id => `styles/themes/${id}/dimension.css`,
    docs: '/docs/themes/',
    icon: 'cube',
    default() {
      return this.base;
    },
  },
};

export function getPath(key) {
  if (key.startsWith('icon-')) {
    // TODO detect what the nested prefixes are from theme config metadata
    return ['icon', ...key.slice(5)];
  }
}

// Shallow remixing params in correct order
// base must be first. brand needs to come after palette, which needs to come after colors.
export const themeParams = Object.keys(themeConfig).filter(aspect => themeConfig[aspect].url);

export const urls = themeParams.reduce((acc, aspect) => {
  acc[aspect] = themeConfig[aspect].url;
  return acc;
}, {});

export const themeDefaults = { ...themeConfig };

deepEach(themeDefaults, (value, key, parent, path) => {
  if (isPlainObject(value)) {
    // Replace w/ default value or shallow clone
    return value.default ?? { ...value };
  }
});

export const selectors = {
  palette: id =>
    [':where(:root)', ':host', ":where([class^='wa-theme-'], [class*=' wa-theme-'])", `.wa-palette-${id}`].join(',\n'),
  theme: id => [':where(:root)', ':host', `.wa-theme-${id}`].join(',\n'),
};
