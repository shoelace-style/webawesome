(() => {
  function applyThemeChange(stylesheet, newStylesheet) {
    newStylesheet.rel = 'stylesheet';
    newStylesheet.id = stylesheet.id;
    requestAnimationFrame(() => {
      stylesheet.remove();
    });
  }

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
        const canUseViewTransitions =
          document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (canUseViewTransitions) {
          document.startViewTransition(() => applyThemeChange(stylesheet, newStylesheet));
        } else {
          applyThemeChange(stylesheet, newStylesheet);
        }
      },
      { once: true },
    );

    document.head.append(newStylesheet);
    updateSelection();
    document.documentElement.classList.toggle(`wa-dark`, window.isDark());
  }

  function updateSelection(container = document) {
    const menus = container.querySelectorAll('.preset-theme-selector wa-menu');
    if (!menus) return;

    [...menus].forEach(menu => {
      // Clear all checked states
      [...menu.querySelectorAll('wa-menu-item')].forEach(async item => {
        await customElements.whenDefined(item.localName);
        await item.updateComplete;
        item.checked = false; // Reset all items to unchecked first
      });

      // Then set only the selected item as checked
      const selectedItem = menu.querySelector(`wa-menu-item[value="${presetTheme}"]`);
      if (selectedItem) {
        customElements.whenDefined(selectedItem.localName).then(async () => {
          await selectedItem.updateComplete;
          selectedItem.checked = true;
          container.querySelector('.preset-theme-selector__text').textContent = selectedItem.innerText;
        });
      }
    });
  }

  let presetTheme = window.getPresetTheme();

  // Selection is not preserved when changing page, so update when opening dropdown
  document.addEventListener('wa-show', event => {
    const presetThemeSelector = event.target.closest('.preset-theme-selector');
    if (!presetThemeSelector) return;
    updateSelection();
  });

  // Listen for selections
  document.addEventListener('wa-select', event => {
    const menu = event.target.closest('.preset-theme-selector wa-menu');
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
