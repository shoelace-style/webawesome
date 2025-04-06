import { domChange } from '/assets/scripts/theme-picker.js';
import { getThemeCode } from '/assets/scripts/tweak/code.js';
import { allHues, themeParams, urls } from '/assets/scripts/tweak/data.js';
import palettes from '/docs/palettes/data.js';
import themes from '/docs/themes/data.js';

const themeIds = Object.keys(themes);
const paletteIds = Object.keys(palettes);
let dummy;

export const aspects = {};

for (let aspect in urls) {
  let urlFactory = urls[aspect];
  let ids = aspect === 'palette' ? paletteIds : aspect === 'brand' ? allHues : themeIds;
  let allUrls = ids.map(id => urlFactory(id));
  let selector = `link[rel="stylesheet"]:is(${allUrls.map(url => `[href$="/${url}"]`).join(', ')})`;
  let getId = RegExp(`/${urlFactory('([^\\\\]+)')}($|\\?|#)`);
  aspects[aspect] ??= { ids, urls: allUrls, selector, getId };
}

aspects.palette.selector += ', style.wa-palette';

export const theme = new EventTarget();

// Read base theme from document
for (let aspect of themeParams) {
  let element = document.querySelector(aspects[aspect].selector);

  if (element) {
    let value = element.href.match(aspects[aspect].getId)?.[1];
    if (value) {
      theme[aspect] = value;
    }
  }
}

export const documentTheme = { ...theme };

if (location.search) {
  // Apply any overrides from URL
  let urlOverrides = Object.fromEntries(new URLSearchParams(location.search));
  updateTheme(urlOverrides, { silent: true });
}

updatePreview({ immediate: true });

window.addEventListener('message', event => {
  if (event.data?.type === 'updatePreview') {
    updatePreview({ theme: event.data.theme });
  }
});

export function isDefault(aspect, value, base = theme.base || 'default') {
  if (!value) {
    return true;
  }

  switch (aspect) {
    case 'palette':
      return value === themes[base].palette;
    case 'brand':
      return value === themes[base].brand;
  }

  return value === base;
}

/**
 * Returns an object to be fed to `getThemeCode()`, i.e. with empties for aspects that are set to their default values,
 * and a resolved base
 * @param {object} newTheme
 * @returns {object}
 */
export function resolveTheme(newTheme = {}) {
  let base = newTheme.base || theme.base || 'default';
  let ret = { base };

  for (let aspect of themeParams) {
    let value = newTheme[aspect] || theme[aspect];

    if (aspect !== 'base' && !isDefault(aspect, value, base)) {
      ret[aspect] = value;
    }
  }

  return ret;
}

function updateTheme(newTheme, options = {}) {
  let resolvedNewTheme = resolveTheme(newTheme);

  let changed = {};
  let anyChanged = false;

  for (let aspect of themeParams) {
    let oldValue = theme[aspect];
    if (resolvedNewTheme[aspect] !== oldValue) {
      changed[aspect] = oldValue;
      anyChanged = true;
      theme[aspect] = resolvedNewTheme[aspect];
    }
  }

  Object.defineProperty(changed, 'any', { value: anyChanged, enumerable: false });

  if (anyChanged && !options.silent) {
    theme.dispatchEvent(new CustomEvent('change', { detail: changed }));
  }

  return changed;
}

export async function updatePreview(options = {}) {
  if (options.theme) {
    updateTheme(options.theme, options);
  }

  let code = getThemeCode(theme, { attributes: ' class="wa-themer"' });

  dummy ??= document.createElement('div');
  dummy.innerHTML = code;

  let allStylesheets = {};

  let first;
  let changeDom = false;

  // DOM diffing of old and new <link> elements
  for (let aspect of themeParams) {
    allStylesheets[aspect] ??= {};
    let stylesheets = allStylesheets[aspect];

    // TODO use old values in selector instead of any?
    let selector = aspects[aspect].selector;
    let oldStylesheets = [...document.querySelectorAll(selector)];
    let newStylesheets = [...dummy.querySelectorAll(selector)];

    let oldUrls = new Set(oldStylesheets.map(link => link.href));
    let newUrls = new Set(newStylesheets.map(link => link.href));

    stylesheets.elements = new Map();

    for (let link of oldStylesheets) {
      let action = !link.href || newUrls.has(link.href) ? 'keep' : 'remove';
      stylesheets.elements.set(link, action);

      if (action === 'remove') {
        changeDom = true;
      }
    }

    for (let link of newStylesheets) {
      if (!link.href || !oldUrls.has(link.href)) {
        stylesheets.elements.set(link, 'add');
        changeDom = true;
      }
    }

    first ??= oldStylesheets[0];
  }

  if (!changeDom) {
    return;
  }

  let toLoad = [];
  let toRemove = [];

  await domChange(async () => {
    let previous;

    for (let aspect of themeParams) {
      let stylesheets = allStylesheets[aspect];

      for (let [link, action] of stylesheets.elements) {
        if (action === 'remove') {
          toRemove.push(link);
        } else if (action === 'add') {
          toLoad.push(link);

          if (previous) {
            previous.after(link);
          } else if (first) {
            first.before(link);
          } else {
            // If no first, it means we didn't find any theme stylesheets
            document.head.append(link);
          }
        }

        previous = link;
      }
    }

    let promises = toLoad.map(link => new Promise(resolve => (link.onload = resolve)));

    await Promise.all(promises);

    // Remove old stylesheets once the new ones load
    for (let link of toRemove) {
      link.remove();
    }
  }, options);
}
