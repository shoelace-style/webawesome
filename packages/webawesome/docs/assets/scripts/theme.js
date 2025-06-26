import { doViewTransition } from '../scripts/view-transitions.js';

//
// Updates the theme when a theme selector changes
//
async function updateTheme(value, isInitialLoad = false) {
  const body = document.body;

  if (!isInitialLoad) {
    // Add fade-out class
    body.classList.add('theme-transitioning');

    // Wait for fade-out to complete
    await new Promise(resolve => {
      const handleTransitionEnd = event => {
        if (event.target === body && event.propertyName === 'opacity') {
          body.removeEventListener('transitionend', handleTransitionEnd);
          resolve();
        }
      };
      body.addEventListener('transitionend', handleTransitionEnd);
    });
  }

  localStorage.setItem('theme', value);

  // Get brand and palette from the selected option
  const themeSelector = document.querySelector('.theme-selector');
  const selectedOption = themeSelector?.querySelector(`wa-option[value="${value}"]`);
  const brand = selectedOption?.getAttribute('data-brand') || 'blue';
  const palette = selectedOption?.getAttribute('data-palette') || 'default';
  const htmlElement = document.documentElement;

  localStorage.setItem('brand', brand);
  localStorage.setItem('palette', palette);

  // Update theme classes
  const classesToRemove = Array.from(htmlElement.classList).filter(
    className =>
      className.startsWith('wa-theme-') || className.startsWith('wa-brand-') || className.startsWith('wa-palette-'),
  );
  const themeStylesheet = document.getElementById('theme-stylesheet');
  const href = `/dist/styles/themes/${value}.css`;

  doViewTransition(() => {
    // Update the theme
    if (themeStylesheet) {
      themeStylesheet.href = href;
    }

    htmlElement.classList.remove(...classesToRemove);

    // Add the new theme, brand, and palette classes
    htmlElement.classList.add(`wa-theme-${value}`);
    htmlElement.classList.add(`wa-brand-${brand}`);
    htmlElement.classList.add(`wa-palette-${palette}`);

    // Sync all theme selectors
    document.querySelectorAll('.theme-selector').forEach(el => (el.value = value));
  });

  if (!isInitialLoad) {
    // Waiting for the stylesheet and all it's imports to load is tricky. Preloading doesn't work for most themes
    // because applying the new stylesheet to the document, even without adding the `wa-theme-*` class, causes jank.
    // Suggestions welcome.
    setTimeout(() => {
      body.classList.remove('theme-transitioning');
    }, 500);
  }
}

// Handle changes
document.addEventListener('input', event => {
  if (event.target.matches('.theme-selector')) {
    updateTheme(event.target.value);
  }
});

// Initialize
const savedTheme = localStorage.getItem('theme') || 'default';
updateTheme(savedTheme, true);
