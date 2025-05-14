import Prism from '/assets/scripts/prism.js';
import { cdnUrl, getThemeCode, Permalink } from '/assets/scripts/tweak.js';
await Promise.all(['wa-select', 'wa-option', 'wa-details'].map(tag => customElements.whenDefined(tag)));

const domChange = document.startViewTransition ? document.startViewTransition.bind(document) : fn => fn();

let selects, data, codeSnippets;

let computed = {
  get isRemixed() {
    return Object.values(data.params).filter(Boolean).length > 0;
  },
  get palette() {
    return data.params.palette || data.defaultParams.palette;
  },
  get brand() {
    return data.params.brand || data.defaultParams.brand;
  },
};

function selectsChanged(event) {
  data.params[event.target.name] = event.target.value;
  render(event.target.name);
}

function init() {
  selects = Object.fromEntries(
    [...document.querySelectorAll('#mix_and_match wa-select')].map(select => [select.getAttribute('name'), select]),
  );

  codeSnippets = document.querySelector('#usage ~ wa-tab-group.import-stylesheet-code:first-of-type');
  codeSnippets = {
    html: codeSnippets?.querySelector('code.language-html'),
    css: codeSnippets?.querySelector('code.language-css'),
  };

  data = {
    baseTheme: wa_data.baseTheme,
    themes: wa_data.themes,
    palettes: wa_data.palettes,
    defaultParams: {
      colors: '',
      get palette() {
        let colors = data.params.colors || data.baseTheme;
        return data.themes[colors].palette;
      },
      get brand() {
        let colors = data.params.colors || data.baseTheme;
        return data.themes[colors].brand;
      },
      typography: '',
    },
    params: { colors: '', palette: '', brand: '', typography: '' },
    urlParams: new Permalink(),
  };

  // Apply params from permalink
  for (let key in data.params) {
    if (data.urlParams.has(key)) {
      data.params[key] = data.urlParams.get(key);
    }
  }

  if (computed.isRemixed) {
    // Start with the remixing UI open if the theme has been remixed
    mix_and_match.setAttribute('open', '');
    mix_and_match.open = true;
  }

  for (let name in selects) {
    selects[name].addEventListener('change', selectsChanged);
  }

  Promise.all(Object.values(selects).map(select => select.updateComplete)).then(() => render());

  globalThis.remixApp = { selects, codeSnippets, data, computed, render };
}

init();
// Async load CSS for other themes *before* current theme stylesheet
let themeStylesheet = document.querySelector('#theme-stylesheet');

for (const theme in data.themes) {
  themeStylesheet.insertAdjacentHTML(
    'beforebegin',
    `<link rel="preload" as="style" href="/dist/styles/themes/${theme}/color.css" onload="this.rel = 'stylesheet'" />
    <link rel="preload" as="style" href="/dist/styles/themes/${theme}/typography.css" onload="this.rel = 'stylesheet'" />`,
  );
}

for (const palette in data.palettes) {
  themeStylesheet.insertAdjacentHTML(
    'beforebegin',
    `<link rel="preload" as="style" href="/dist/styles/color/${palette}.css" onload="this.rel = 'stylesheet'" />`,
  );
}

function setDefault(select, value) {
  let oldDefaultOption = select.querySelector(`wa-option[value=""]:not([data-id="${value}"])`);
  let newDefaultOption = select.querySelector(`wa-option[value="${value}"]`);

  if (oldDefaultOption) {
    oldDefaultOption.value = oldDefaultOption.dataset.id;
  }

  if (newDefaultOption) {
    newDefaultOption.dataset.id ??= newDefaultOption.value;
    newDefaultOption.value = '';
  }
}

function render(changedAspect) {
  if (!globalThis.demo) {
    return;
  }

  let url = new URL(demo.src);

  if (!changedAspect || changedAspect === 'colors') {
    // Update the default palette when the theme colors change to the default palette of that theme
    setDefault(selects.palette, data.defaultParams.palette);
    setDefault(selects.brand, data.defaultParams.brand);
  }

  let brand = data.params.brand || data.defaultParams.brand;
  selects.brand.style.setProperty('--color', `var(--wa-color-${brand})`);
  selects.brand.className = `wa-palette-${computed.palette}`;

  for (let aspect in data.params) {
    let value = data.params[aspect];
    selects[aspect].value = value;
  }

  for (let key in data.params) {
    if (data.params[key]) {
      data.urlParams.set(key, data.params[key]);
    }
  }

  // Update demo URL
  domChange(() => {
    url.search = data.urlParams;
    demo.src = url;
    return new Promise(resolve => (demo.onload = resolve));
  });

  // Update page URL
  data.urlParams.updateLocation();

  // Update code snippets
  for (let language in codeSnippets) {
    let codeSnippet = codeSnippets[language];
    if (!codeSnippet) {
      continue;
    }

    let code = getThemeCode(data.baseTheme, data.params, { language, cdnUrl });
    codeSnippet.textContent = code;
    Prism.highlightElement(codeSnippet);
  }
}

addEventListener('turbo:render', init);
