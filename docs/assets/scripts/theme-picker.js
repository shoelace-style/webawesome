// Listen for selections
document.addEventListener('wa-change', event => {
  for (let aspect of [presetTheme, colorScheme]) {
    const picker = event.target.closest(aspect.picker);
    if (picker) {
      aspect.set(picker.value);
    }
  }
});

class ThemeAspect {
  constructor(options) {
    Object.assign(this, options);
    this.set();

    // Update when local storage changes.
    // That way changes in one window will propagate to others (including iframes).
    window.addEventListener('storage', event => {
      if (event.key === this.key) {
        this.set();
      }
    });
  }

  get() {
    return localStorage.getItem(this.key) ?? this.defaultValue;
  }

  set(value = this.get()) {
    if (value === this.value) {
      return;
    }

    this.value = value;
    localStorage.setItem(this.key, this.value);

    this.applyChange();
    this.syncUI();
  }

  syncUI(container = document) {
    console.log(this.key, this.value);
    for (let picker of container.querySelectorAll(this.picker)) {
      picker.setAttribute('value', this.value);
      picker.value = this.value;
    }
  }
}

const presetTheme = new ThemeAspect({
  defaultValue: 'default',
  key: 'presetTheme',
  picker: 'wa-select.preset-theme-selector',

  applyChange() {
    const stylesheet = document.getElementById('theme-stylesheet');
    window.setStylesheetHref(stylesheet, `/dist/styles/themes/${this.value}.css`, { behavior: 'smooth' });
  },
});

const colorScheme = new ThemeAspect({
  defaultValue: 'auto',
  key: 'colorScheme',
  picker: 'wa-select.color-scheme-selector',

  applyChange() {
    // Toggle the dark mode class
    let dark = window.isDark();
    document.documentElement.classList.toggle(`wa-dark`, dark);

    for (let el of document.querySelectorAll('.wa-invert')) {
      el.classList.toggle('wa-dark', !dark);
      el.classList.toggle('wa-light', dark);
    }
  },
});

// Update the color scheme when the preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => colorScheme.set());

/**
 * Without this, there's a flash of the incorrect preset theme.
 */
function updateSelectionBeforeTurboLoad(e) {
  const newElement = e.detail.newBody || e.detail.newFrame || e.detail.newStream;
  if (newElement) {
    presetTheme.syncUI(newElement);
    colorScheme.syncUI(newElement);
  }
}

['turbo:before-render', 'turbo:before-stream-render', 'turbo:before-frame-render'].forEach(eventName => {
  document.addEventListener(eventName, updateSelectionBeforeTurboLoad);
});

// Toggle with backslash
document.addEventListener('keydown', event => {
  if (
    event.key === '\\' &&
    !event.composedPath().some(el => ['input', 'textarea'].includes(el?.tagName?.toLowerCase()))
  ) {
    event.preventDefault();
    colorScheme.set(window.isDark() ? 'light' : 'dark');
  }
});

window.colorScheme = colorScheme;
window.presetTheme = presetTheme;
