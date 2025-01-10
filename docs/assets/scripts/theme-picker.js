// Helper for view transitions
export function domChange(fn, { behavior = 'smooth' } = {}) {
  const canUseViewTransitions =
    document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (canUseViewTransitions && behavior === 'smooth') {
    document.startViewTransition(fn);
  } else {
    fn(true);
  }
}

function nextFrame() {
  return new Promise(resolve => requestAnimationFrame(resolve));
}

export class ThemeAspect {
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

    // Listen for selections
    document.addEventListener('wa-change', event => {
      const picker = event.target.closest(this.picker);
      if (picker) {
        this.set(picker.value);
      }
    });
  }

  get() {
    return localStorage.getItem(this.key) ?? this.defaultValue;
  }

  computed = {};

  get computedValue() {
    if (this.value in this.computed) {
      return this.computed[this.value];
    }

    return this.value;
  }

  set(value = this.get()) {
    if (value === this.value) {
      return;
    }

    this.value = value;

    if (this.value === this.defaultValue) {
      localStorage.removeItem(this.key);
    } else {
      localStorage.setItem(this.key, this.value);
    }

    this.applyChange();
    this.syncUI();
  }

  syncUI(container = document) {
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
    const oldStylesheets = [...document.querySelectorAll('#theme-stylesheet')];
    const oldStylesheet = oldStylesheets.pop();

    if (oldStylesheets.length > 0) {
      // Remove all but the last one
      for (let stylesheet of oldStylesheets) {
        stylesheet.remove();
      }
    }

    const href = `/dist/styles/themes/${this.value}.css`;

    if (!oldStylesheet || oldStylesheet.getAttribute('href') !== href) {
      const newStylesheet = document.createElement('link');
      Object.assign(newStylesheet, { href, id: 'theme-stylesheet', rel: 'preload', as: 'style' });
      oldStylesheet.after(newStylesheet);

      newStylesheet.addEventListener(
        'load',
        e => {
          domChange(
            async instant => {
              // Swap stylesheets
              newStylesheet.rel = 'stylesheet';

              if (instant) {
                // If no VT, delay by 1 frame to make it smoother
                await nextFrame();
              }

              oldStylesheet.remove();
            },
            { behavior: 'smooth' },
          );
        },
        { once: true },
      );

      nextFrame().then(_ => updateThemeNameAndDescription());
    }
  },
});

const colorScheme = new ThemeAspect({
  defaultValue: 'auto',
  key: 'colorScheme',
  picker: 'wa-select.color-scheme-selector',

  computed: {
    get auto() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    },
  },

  applyChange() {
    // Toggle the dark mode class
    domChange(() => {
      let dark = this.computedValue === 'dark';
      document.documentElement.classList.toggle(`wa-dark`, dark);

      for (let el of document.querySelectorAll('.wa-invert')) {
        el.classList.toggle('wa-dark', !dark);
        el.classList.toggle('wa-light', dark);
      }
    });
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

document.addEventListener('turbo:render', updateThemeNameAndDescription);

// Toggle color scheme with backslash
document.addEventListener('keydown', event => {
  if (
    event.key === '\\' &&
    !event.composedPath().some(el => ['input', 'textarea'].includes(el?.tagName?.toLowerCase()))
  ) {
    event.preventDefault();
    colorScheme.set(theming.colorScheme.resolvedValue === 'dark' ? 'light' : 'dark');
  }
});

// Temp hack for theme switcher
function updateThemeNameAndDescription() {
  let selectedOption = document.querySelector(`.preset-theme-selector wa-option[value="${presetTheme.value}"]`);

  if (selectedOption) {
    let title = selectedOption.textContent;
    let description = selectedOption.dataset.description;
    for (let element of document.querySelectorAll('[data-theme-name]')) {
      element.textContent = title;
    }
    for (let element of document.querySelectorAll('[data-theme-description]')) {
      element.textContent = description;
    }
  }
}
updateThemeNameAndDescription();

window.presetTheme = presetTheme;
