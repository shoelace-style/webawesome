//
// Preset theme selector
//
(() => {
  function setPresetTheme(newPresetTheme) {
    presetTheme = newPresetTheme;
    localStorage.setItem('presetTheme', presetTheme);

    const stylesheet = document.getElementById('theme-stylesheet');

    const newStylesheet = Object.assign(document.createElement('link'), {
      href: `/dist/styles/themes/${presetTheme}.css`,
      rel: 'preload',
      as: 'style',
    });

    newStylesheet.addEventListener(
      'load',
      () => {
        newStylesheet.rel = 'stylesheet';
        newStylesheet.id = stylesheet.id;
        requestAnimationFrame(() => {
          stylesheet.remove();
        });
      },
      { once: true },
    );

    document.head.append(newStylesheet);

    // Update the UI
    updateSelection();

    // Toggle the dark mode class
    document.documentElement.classList.toggle(`wa-theme-${presetTheme}-dark`, window.isDark());
  }

  function updateSelection(container = document) {
    const menu = container.querySelector('#preset-theme-selector wa-menu');
    if (!menu) return;
    [...menu.querySelectorAll('wa-menu-item')].forEach(async item => {
      const isChecked = item.getAttribute('value') === presetTheme;
      if (isChecked) {
        container.querySelector('#preset-theme-selector__text').textContent = item.innerText;
      }
      await customElements.whenDefined(item.localName);
      await item.updateComplete;
      item.checked = isChecked;
    });
  }

  let presetTheme = window.getPresetTheme();

  // Selection is not preserved when changing page, so update when opening dropdown
  document.addEventListener('wa-show', event => {
    const presetThemeSelector = event.target.closest('#preset-theme-selector');
    if (!presetThemeSelector) return;
    updateSelection();
  });

  // Listen for selections
  document.addEventListener('wa-select', event => {
    const menu = event.target.closest('#preset-theme-selector wa-menu');
    if (!menu) return;
    setPresetTheme(event.detail.item.value);
  });

  // Update the color scheme when the preference changes
  window.matchMedia('(prefers-preset-theme: dark)').addEventListener('change', () => setPresetTheme(presetTheme));
  updateSelection();

  /**
   * Without this, there's a flash of the incorrect preset theme.
   */
  function updateSelectionBeforeTurboLoad(e) {
    const newElement = e.detail.newBody || e.detail.newFrame || e.detail.newStream;
    if (!newElement) {
      return;
    }
    updateSelection(newElement);
  }

  ['turbo:before-render', 'turbo:before-stream-render', 'turbo:before-frame-render'].forEach(eventName => {
    document.addEventListener(eventName, updateSelectionBeforeTurboLoad);
  });
})();
