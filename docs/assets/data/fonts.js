// import { themeConfig } from './theming.js';
// import themes from '/docs/docs/themes/data.js';

/**
 * Map of font pairings (body + heading) to the first theme that uses them.
 */
export const pairings = {};
export const sameAsBody = Symbol('same as body');

// for (let id in themes) {
//   let theme = themes[id];
//   let { fonts } = theme;

//   if (fonts) {
//     let { body, heading = sameAsBody } = fonts;

//     pairings[body] ??= {};
//     pairings[body][heading] ??= { id, stylesheet: themeConfig.typography.url(id) };
//   }
// }
