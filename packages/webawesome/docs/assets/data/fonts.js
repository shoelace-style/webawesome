import { deepEntries } from '../scripts/util/deep.js';
import { themeConfig } from './theming.js';
import themes from '/assets/data/themes.js';

/**
 * Map of font pairings (body + heading) to the first theme that uses them.
 */
export const pairings = {};

// NOTE Do not use Symbols, we want these to be enumerable when used as keys
export const sameAs = { body: '$body' };

export const fontNames = {
  'system-ui': 'OS Default',
  'ui-serif': 'OS Default Serif',
  'ui-sans-serif': 'OS Default Sans Serif',
  'ui-monospace': 'OS Default Code Font',
  'ui-monospace': 'OS Default Code Font',
};

export function defaultTitle(fonts) {
  let { body, heading = sameAs.body } = fonts;
  let names = [body];

  if (heading !== sameAs.body) {
    names.unshift(heading);
  }

  return names.map(name => fontNames[name] ?? name).join(' • ');
}

for (let id in themes) {
  let theme = themes[id];
  let { fonts } = theme;

  if (fonts) {
    let { body, heading = sameAs.body } = fonts;

    pairings[body] ??= {};
    pairings[body][heading] ??= {
      id, // First theme that uses this pairing
      ids: new Set([id]), // All themes that use this pairing
      url: themeConfig.typography.url(id), // Stylesheet URL
      fonts,
      get title() {
        return defaultTitle(this.fonts);
      },
    };
    pairings[body][heading].ids.add(id);
  }
}

export const pairingsEntries = deepEntries(pairings, {
  descend(value, key, parent, path) {
    if (value?.fonts) {
      return false; // Don't recurse into pairing objects
    }
  },
  filter(value, key, parent, path) {
    // Only keep 2 levels (body → heading → pairing)
    return path.length === 1;
  },
});

export const pairingsList = pairingsEntries.map(arg => arg.at(-1));
