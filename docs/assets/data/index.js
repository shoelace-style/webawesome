export * from './colors.js';
export * from './icons.js';
export * from './theming.js';

export const cdnUrl = globalThis.document ? document.documentElement.dataset.cdnUrl : '/dist/';

export const selectors = {
  palette: id =>
    [':where(:root)', ':host', ":where([class^='wa-theme-'], [class*=' wa-theme-'])", `.wa-palette-${id}`].join(',\n'),
  theme: id => [':where(:root)', ':host', `.wa-theme-${id}`].join(',\n'),
};
