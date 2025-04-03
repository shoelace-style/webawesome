import { domChange } from '/assets/scripts/theme-picker.js';
import { getThemeCode } from '/assets/scripts/tweak/code.js';
import { allHues, themeParams, urls } from '/assets/scripts/tweak/data.js';
import palettes from '/docs/palettes/data.js';
import themes from '/docs/themes/data.js';

const themeIds = Object.keys(themes);
const paletteIds = Object.keys(palettes);

export const defaults = { base: 'default', palette: '', typography: '', colors: '', brand: '' };
export const theme = {};

export function updateTheme(newTheme, options) {
  let changed = {};
  let anyChanged = false;

  for (let key of themeParams) {
    let value = newTheme[key];

    if (value !== undefined) {
      let newValue = value;
      newValue ||= defaults[key];

      if (theme[key] !== newValue) {
        changed[key] = theme[key];
        anyChanged = true;
      }

      theme[key] = newValue;
    } else if (theme[key] === undefined) {
      // Initialize
      theme[key] = defaults[key];
    }
  }

  if (anyChanged) {
    updatePreview({ changed, ...options });
  }

  return changed;
}

let urlsPossible = {};
let selectors = {};

for (let aspect in urls) {
  let urlFactory = urls[aspect];
  let ids = aspect === 'palette' ? paletteIds : aspect === 'brand' ? allHues : themeIds;
  urlsPossible[aspect] = ids.map(id => urlFactory(id));
  selectors[aspect] = getSelector(urlsPossible[aspect]);
}

selectors.palette += ', style.wa-palette';

function getSelector(urls) {
  urls = typeof urls === 'string' ? [urls] : urls;
  return `link[rel="stylesheet"]:is(${urls.map(url => `[href$="/${url}"]`).join(', ')})`;
}

export async function updatePreview(options = {}) {
  let code = getThemeCode(theme, { attributes: ' class="wa-themer"' });

  let dummy = document.createElement('div');
  dummy.innerHTML = code;

  let allStylesheets = {};

  let params = options.changed ? themeParams.filter(param => param in options.changed) : themeParams;
  let first;
  let toLoad = [];
  let toRemove = [];

  for (let aspect of params) {
    allStylesheets[aspect] ??= {};
    let stylesheets = allStylesheets[aspect];

    // TODO use old values if options.changed is set
    stylesheets.old = [...document.querySelectorAll(selectors[aspect])];
    stylesheets.new = [...dummy.querySelectorAll(selectors[aspect])];

    let oldUrls = new Set(stylesheets.old.map(link => link.href));
    let newUrls = new Set(stylesheets.new.map(link => link.href));

    stylesheets.elements = new Map();

    for (let link of stylesheets.old) {
      stylesheets.elements.set(link, !link.href || newUrls.has(link.href) ? 'keep' : 'remove');
    }

    for (let link of stylesheets.new) {
      if (!link.href || !oldUrls.has(link.href)) {
        stylesheets.elements.set(link, 'add');
      }
    }

    first ??= stylesheets.old[0];
  }

  await domChange(async () => {
    let previous;

    for (let aspect of params) {
      let stylesheets = allStylesheets[aspect];

      for (let [link, action] of stylesheets.elements) {
        if (action === 'remove') {
          toRemove.push(link);
          continue;
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

let changed = updateTheme(Object.fromEntries(new URLSearchParams(location.search)), { immediate: true });

if (Object.keys(changed).length === 0) {
  // Make sure we have a default theme
  updatePreview({ immediate: true });
}

window.addEventListener('message', event => {
  if (event.data?.type === 'updateTheme' && event.data.theme) {
    updateTheme(event.data.theme);
  }
});
