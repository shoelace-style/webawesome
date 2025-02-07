await Promise.all(['wa-select', 'wa-option', 'wa-details'].map(tag => customElements.whenDefined(tag)));
const domChange = document.startViewTransition ? document.startViewTransition.bind(document) : fn => fn();

let selects, data, themeDefaults;

let computed = {
  get isRemixed() {
    return Object.values(data.params).filter(Boolean).length > 0;
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

  data = {
    baseTheme: '',
    defaultParams: {
      colors: '',
      get palette() {
        let colors = data.params.colors || data.baseTheme;
        return themeDefaults[colors].palette;
      },
      get brand() {
        let colors = data.params.colors || data.baseTheme;
        return themeDefaults[colors].brand;
      },
      typography: '',
    },
    params: { colors: '', palette: '', brand: '', typography: '' },
    urlParams: new URLSearchParams(location.search),
  };

  if (!themeDefaults) {
    // We only need to do this once
    data.themeDefaults = themeDefaults = {};

    for (let themeOption of selects.colors.querySelectorAll('wa-option[data-palette]')) {
      let id = themeOption.value || themeOption.dataset.id;
      if (themeOption.dataset.id) {
        // Current theme
        data.baseTheme = id;
      }

      let { palette, brand } = themeOption.dataset;
      themeDefaults[id] = { palette, brand };
    }
  }

  // Read URL params and apply them. This facilitates permalinks.
  if (location.search) {
    for (let aspect in data.params) {
      if (data.urlParams.has(aspect)) {
        data.params[aspect] = data.urlParams.get(aspect);
      }
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

  return { selects, data, computed, render };
}

globalThis.remixApp = init();

function setDefault(select, value) {
  let oldDefaultOption = select.querySelector('wa-option[value=""]');
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
  let url = new URL(demo.src);

  if (!changedAspect || changedAspect === 'colors') {
    // Update the default palette when the theme colors change to the default palette of that theme
    setDefault(selects.palette, data.defaultParams.palette);
    setDefault(selects.brand, data.defaultParams.brand);
  }

  let brand = data.params.brand || data.defaultParams.brand;
  selects.brand.style.setProperty('--color', `var(--wa-color-${brand})`);

  for (let aspect in data.params) {
    let value = data.params[aspect];

    if (value) {
      data.urlParams.set(aspect, value);
    } else {
      data.urlParams.delete(aspect);
    }

    selects[aspect].value = value;
  }

  // Update demo URL
  domChange(() => {
    url.search = data.urlParams;
    demo.src = url;
    return new Promise(resolve => (demo.onload = resolve));
  });

  // Update page URL. If there’s already a search, replace it.
  // We don’t want to clog the user’s history while they iterate
  let historyAction = location.search ? 'replaceState' : 'pushState';
  history[historyAction](null, '', `?${data.urlParams}`);
}

addEventListener('turbo:render', event => {
  remixApp = init();
});
