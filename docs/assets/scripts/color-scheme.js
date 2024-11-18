//
// Color scheme selector
//
(() => {
  function setColorScheme(newColorScheme) {
    colorScheme = newColorScheme;
    localStorage.setItem('colorScheme', colorScheme);
    const presetTheme = window.getPresetTheme();

    // Update the UI
    updateSelection();

    // Toggle the dark mode class
    document.documentElement.classList.toggle(`wa-theme-${presetTheme}-dark`, window.isDark());
  }

  function updateSelection() {
    const menu = document.querySelector('#color-scheme-selector wa-menu');
    if (!menu) return;
    [...menu.querySelectorAll('wa-menu-item')].forEach(async item => {
      await customElements.whenDefined(item.localName);
      await item.updateComplete;
      item.checked = item.getAttribute('value') === colorScheme;
    });
  }

  let colorScheme = window.getColorScheme();

  // Selection is not preserved when changing page, so update when opening dropdown
  document.addEventListener('wa-show', event => {
    const colorSchemeSelector = event.target.closest('#color-scheme-selector');
    if (!colorSchemeSelector) return;
    updateSelection();
  });

  // Listen for selections
  document.addEventListener('wa-select', event => {
    const menu = event.target.closest('#color-scheme-selector wa-menu');
    if (!menu) return;
    setColorScheme(event.detail.item.value);
  });

  // Update the color scheme when the preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => setColorScheme(colorScheme));

  // Toggle with backslash
  document.addEventListener('keydown', event => {
    if (
      event.key === '\\' &&
      !event.composedPath().some(el => ['input', 'textarea'].includes(el?.tagName?.toLowerCase()))
    ) {
      event.preventDefault();
      setColorScheme(window.isDark() ? 'light' : 'dark');
    }
  });

  // Set the initial color scheme and sync the UI
  setColorScheme(colorScheme);
})();
