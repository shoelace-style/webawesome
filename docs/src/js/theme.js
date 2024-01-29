(() => {
  function getTheme() {
    return document.documentElement.getAttribute('data-theme');
  }
  function syncTheme() {
    const theme = getTheme();
    document.documentElement.classList.toggle('wa-theme-default-dark', theme === 'dark');
  }

  function handleThemeChange(e) {
    if (e.target.closest('starlight-theme-select')) {
      requestAnimationFrame(() => syncTheme());
    }
  }

  function handleKeyDown(e) {
    if (e.key === '\\' && !e.composedPath().some(el => ['input', 'textarea'].includes(el?.tagName?.toLowerCase()))) {
      let theme = getTheme() === 'light' ? 'dark' : 'light';

      const option = document.querySelector(`starlight-theme-select select option[value='${theme}']`);

      option.selected = true;

      option.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  document.addEventListener('keydown', handleKeyDown);

  document.addEventListener('change', handleThemeChange);
  document.addEventListener('input', handleThemeChange);
  window.addEventListener('turbo:load', syncTheme);
  syncTheme();
})();
