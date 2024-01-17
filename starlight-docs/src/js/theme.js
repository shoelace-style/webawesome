(() => {
  function getTheme () {
    return document.documentElement.getAttribute("data-theme")
  }
  function syncTheme () {
    const theme = getTheme()
    document.documentElement.classList.toggle("wa-theme-default-dark", theme === "dark")
  }

  function handleThemeChange (e) {
    if (e.target.closest("starlight-theme-select")) {
      requestAnimationFrame(() => syncTheme())
    }
  }

  document.addEventListener("change", handleThemeChange)
  document.addEventListener("input", handleThemeChange)
  window.addEventListener('turbo:load', syncTheme);
  syncTheme()
})();
