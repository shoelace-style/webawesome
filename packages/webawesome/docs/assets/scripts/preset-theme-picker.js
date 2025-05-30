import { domChange, nextFrame, ThemeAspect } from './theme-picker.js';

const presetTheme = new ThemeAspect({
  defaultValue: 'default',
  key: 'presetTheme',
  picker: 'wa-select.preset-theme-selector',

  applyChange(options = {}) {
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
            { behavior: 'smooth', ...options },
          );
        },
        { once: true },
      );
    }
  },
});

window.addEventListener('turbo:render', e => {
  presetTheme.applyChange({ behavior: 'instant' });
});
