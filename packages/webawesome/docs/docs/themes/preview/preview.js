import { allHues } from '/assets/data/index.js';
import palettes from '/assets/data/palettes.js';
import themes from '/assets/data/themes.js';
import { getPath, themeConfig, themeDefaults, themeParams } from '/assets/data/theming.js';
import Permalink from '/assets/scripts/permalink.js';
import { getThemeCode } from '/assets/scripts/tweak/code.js';
import { deepClone, deepEach, deepGet, deepMerge } from '/assets/scripts/util/deep.js';
import { domChange } from '/assets/scripts/util/dom-change.js';

const themeIds = Object.keys(themes);
const paletteIds = Object.keys(palettes);
let dummy;

export const aspects = {};

deepEach(themeConfig, (config, aspect, obj, path) => {
  if (!config?.default) {
    // We're not in a config object
    return;
  }

  if (config.url) {
    config.values ??= aspect === 'palette' ? paletteIds : aspect === 'brand' ? allHues : themeIds;
    config.urls ??= config.values.map(id => config.url(id));
    config.selector ??= `link[rel="stylesheet"]:is(${config.urls.map(url => `[href$="/${url}"]`).join(', ')})`;
    config.getValue = RegExp(`/${config.url('([^\\\\]+)')}($|\\?|#)`);
  } else {
    let styleClass = aspect === 'palette' || aspect === 'brand' ? aspect : `theme-${aspect}`;
    config.selector ??= `style.wa-${styleClass}`;
  }
});

/**
 * @typedef {object} Theme
 * @property {string} base
 * @property {string} colors
 * @property {string} palette
 * @property {string} brand
 * @property {string} typography
 */
export const theme = new EventTarget();

// Read base theme from document
// TODO read from non-URL aspects too
for (let aspect of themeParams) {
  let element = document.querySelector(themeConfig[aspect].selector);

  if (element) {
    let value = element.href.match(themeConfig[aspect].getValue)?.[1];
    if (value) {
      theme[aspect] = value;
    }
  }
}

export const documentTheme = { ...theme };

if (location.search) {
  let permalink = new Permalink();
  // Apply any overrides from URL
  let urlOverrides = permalink.toObject({
    ignoreKeys: ['color-scheme'],
    getPath,
  });

  updateTheme(urlOverrides, { silent: true });

  let colorScheme = permalink.get('color-scheme');
  if (colorScheme) {
    document.body.classList.add('wa-' + colorScheme);
  }
}

theme.base ??= 'default';

let isSameOrigin = false;
try {
  isSameOrigin = Boolean(parent.document);
} catch (e) {}

if (isSameOrigin) {
  // We’re in the same origin as the parent, so let’s be proactive about updating the preview.
  // For third-party websites, we wait until a message is sent from the parent
  // to avoid messing up the site for visitors
  updatePreview({ immediate: true });
}

window.addEventListener('message', event => {
  if (!event.data) {
    return;
  }

  let { type, theme, id } = event.data;

  if (type === 'updatePreview') {
    updatePreview({ theme, id });
  }
});

/**
 * Returns a theme object to be fed to `getThemeCode()`,
 * i.e. with empties for aspects that are set to their default values, and a resolved base
 * Does NOT update `theme`, you need to call `updateTheme()` for that.
 * @param {object} newTheme
 * @returns {object}
 */
export function resolveTheme(newTheme) {
  let ret = deepClone(theme);
  ret = deepMerge(ret, newTheme, { emptyValues: [undefined, ''] });

  deepEach(newTheme, (value, key, parent, path) => {
    if (typeof value === 'object') {
      return;
    }

    let defaultValue = deepGet(themeDefaults, path)?.[key];
    defaultValue = typeof defaultValue === 'function' ? defaultValue.call(parent, themes) : defaultValue;

    if (!value || value === defaultValue) {
      delete parent[key];
    }
  });

  return ret;
}

/**
 * Update the current theme and fire a change event on it.
 * Does NOT update the visible preview, you must call `updatePreview()` for that.
 * @param {Theme} newTheme
 * @param {object} options
 * @param {boolean} options.silent - If true, don't fire the change event
 * @returns {Theme & {any: boolean}} - The changed properties
 */
function updateTheme(newTheme, options = {}) {
  let resolvedNewTheme = resolveTheme(newTheme);

  let changed = {};
  let anyChanged = false;

  deepEach(theme, (value, key, parent, path) => {
    if (typeof value === 'object') {
      return;
    }

    let oldValue = deepGet(resolvedNewTheme, path)?.[key];
    if (value !== oldValue) {
      changed[key] = oldValue;
      anyChanged = true;
      parent[key] = value;
    }
  });

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

  let code = getThemeCode(theme, { id: options.id, attributes: ' class="wa-themer"' });

  dummy ??= document.createElement('div');
  dummy.innerHTML = code;

  let allStylesheets = {};

  let first, last;
  let changeDom = false;

  // DOM diffing of old and new <link> elements
  // We want to keep any <link> elements that have not changed,
  // and add any new ones near the old ones, in the right order
  for (let aspect of themeParams) {
    allStylesheets[aspect] ??= {};
    let stylesheets = allStylesheets[aspect];

    // TODO use old values in selector instead of any?
    let selector = themeConfig[aspect].selector;
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
    last = oldStylesheets.at(-1);
  }

  // Replace all themer <style> elements, we don't diff those since it does not involve URL loading

  // First, remove old ones
  for (let oldStyle of document.querySelectorAll('style.wa-themer, style.wa-theme')) {
    oldStyle.remove();
  }
  // Then, insert new ones
  for (let newStyle of dummy.querySelectorAll('style.wa-themer, style.wa-theme')) {
    (last || document.head.lastElementChild).after(newStyle);
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
            // We may still have <style> elements though
            let firstStyleElement = document.querySelector(
              'style:is(.wa-themer, .wa-palette, [class^="wa-theme-"], [class*=" wa-theme-"])',
            );
            if (firstStyleElement) {
              firstStyleElement.before(link);
            } else {
              document.head.append(link);
            }
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
