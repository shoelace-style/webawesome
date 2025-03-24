import { getThemeCode } from '/assets/scripts/tweak/code.js';
// import { docsURLs, icons, urls as stylesheetURLs } from '/assets/scripts/tweak/data.js';

function domChange(fn, options = {}) {
  if (options.immediate || !document.startViewTransition) {
    return fn();
  }

  document.startViewTransition(fn);
}

export const defaultParams = { base: 'default', palette: '', typography: '' };
export const params = { ...defaultParams };

export function readUrlParams() {
  let newParams = new URLSearchParams(window.location.search);
  let changed = false;

  for (let [key, value] of newParams.entries()) {
    if (value) {
      let newValue = value;
      newValue ||= defaultParams[key];

      if (params[key] !== newValue) {
        changed = true;
      }

      params[key] = newValue;
    }
  }

  if (changed) {
    updateTheme();
  }
}

export function updateTheme(options = {}) {
  let code = getThemeCode(params.base, params, { attributes: ' class="wa-themer"' });
  let dummy = document.createElement('div');

  domChange(() => {
    for (let style of document.querySelectorAll('.wa-themer')) {
      style.remove();
    }

    dummy.innerHTML = code;
    let promises = [...dummy.querySelectorAll('link.wa-themer')].map(
      link => new Promise(resolve => (link.onload = resolve)),
    );
    document.head.append(...dummy.children);
    return Promise.all(promises);
  }, options);
}

readUrlParams();
updateTheme({ immediate: true });

// Object.assign(globalThis, { params, updateTheme });
