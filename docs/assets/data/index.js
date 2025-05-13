export * from './colors.js';
// export * from './fonts.js';
export * from './icons.js';
export * from './theming.js';

export const cdnUrl = globalThis.document ? document.documentElement.dataset.cdnUrl : '/dist/';
