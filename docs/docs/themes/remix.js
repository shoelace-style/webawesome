await Promise.all(['wa-select', 'wa-details'].map(tag => customElements.whenDefined(tag)));
const domChange = document.startViewTransition ? document.startViewTransition.bind(document) : fn => fn();

let selects, data, computed;

function selectsChanged(event) {
  console.log('selectsChanged', event);
  data.params[event.target.name] = event.target.value;
  render(event.target.name);
}

function init() {
  console.log('remix init');
  selects = Object.fromEntries(
    [...document.querySelectorAll('#mix_and_match wa-select')].map(select => [select.getAttribute('name'), select]),
  );

  data = {
    baseTheme: '',
    defaultPalettes: {},
    defaultParams: {
      colors: '',
      get palette() {
        let colors = data.params.colors || data.baseTheme;
        return data.defaultPalettes[colors];
      },
      typography: '',
    },
    params: { colors: '', palette: '', typography: '' },
    urlParams: new URLSearchParams(location.search),
  };

  for (let themeOption of selects.colors.querySelectorAll('wa-option[data-palette]')) {
    let id = themeOption.value || themeOption.dataset.id;
    if (themeOption.dataset.id) {
      data.baseTheme = id;
    }

    data.defaultPalettes[id] = themeOption.dataset.palette;
  }

  computed = {
    get isRemixed() {
      return Object.values(data.params).filter(Boolean).length > 0;
    },
  };

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

  render();

  return { selects, data, computed };
}

globalThis.remixApp = init();

function render(changedAspect) {
  let url = new URL(demo.src);

  if (!changedAspect || changedAspect === 'colors') {
    // Update the default palette when the theme colors change to the default palette of that theme
    let oldDefaultPaletteOption = selects.palette.querySelector('wa-option[value=""]');
    let newDefaultPaletteOption = selects.palette.querySelector(`wa-option[value="${data.defaultParams.palette}"]`);

    if (oldDefaultPaletteOption) {
      oldDefaultPaletteOption.value = oldDefaultPaletteOption.dataset.id;
    }

    if (newDefaultPaletteOption) {
      newDefaultPaletteOption.value = '';
    }
  }

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
