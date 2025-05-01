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
    default(themes) {
      return themes?.[this.base]?.palette;
    },
  },
  brand: {
    url: id => `styles/brand/${id}.css`,
    icon: 'droplet',
    default(themes) {
      return themes?.[this.base]?.brand;
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
  icon: {
    library: { cssProperty: '--wa-icon-library', default: 'default' },
    family: { cssProperty: '--wa-icon-family', default: 'classic' },
    style: { cssProperty: '--wa-icon-variant', default: 'solid' },
  },
};

// Shallow remixing params in correct order
// base must be first. brand needs to come after palette, which needs to come after colors.
export const themeParams = Object.keys(themeConfig).filter(aspect => themeConfig[aspect].url);

export const urls = themeParams.reduce((acc, aspect) => {
  acc[aspect] = themeConfig[aspect].url;
  return acc;
}, {});

export const themeDefaults = { ...themeConfig };

deepEach(themeDefaults, (value, key, parent) => {
  if (isPlainObject(value)) {
    // Replace w/ default value or shallow clone
    return value.default ?? { ...value };
  }
});
