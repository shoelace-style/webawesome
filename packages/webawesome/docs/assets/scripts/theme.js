import { doViewTransition } from '../scripts/view-transitions.js';

//
// Updates the theme when a theme selector changes
//
async function updateTheme(value, isInitialLoad = false) {
  const body = document.body;

  // Get brand, palette, and theme name from the selected option
  const themeSelector = document.querySelector('.theme-selector');
  const selectedOption = themeSelector?.querySelector(`wa-dropdown-item[value="${value}"]`);
  let brand = selectedOption?.getAttribute('data-brand') || 'blue';
  let palette = selectedOption?.getAttribute('data-palette') || 'default';
  let themeName = selectedOption?.textContent.trim() || 'Unknown';

  if (!isInitialLoad) {
    // Disable tooltip during theme transition
    const tooltip = document.querySelector('#theme-tooltip');
    if (tooltip) {
      tooltip.disabled = true;
    }

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

  // Handle site theme vs regular theme
  let href = `/dist/styles/themes/${value}.css`;

  if (document.querySelector('wa-page')?.dataset.pageType === 'site') {
    brand = 'orange';
    href = `/assets/styles/theme-site.css`;
    palette = 'default';
    value = 'site';
  } else {
    localStorage.setItem('brand', brand);
    localStorage.setItem('palette', palette);
    localStorage.setItem('theme', value);
  }

  // Update theme classes
  const htmlElement = document.documentElement;
  const classesToRemove = Array.from(htmlElement.classList).filter(
    className =>
      className.startsWith('wa-theme-') || className.startsWith('wa-brand-') || className.startsWith('wa-palette-'),
  );
  const themeStylesheet = document.getElementById('theme-stylesheet');

  await doViewTransition(() => {
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
    document.querySelectorAll('.theme-selector').forEach(el => {
      el.value = value;
      el.setAttribute('value', value);
    });

    // Update tooltip content to reflect the new theme
    const tooltip = document.querySelector('#theme-tooltip');
    if (tooltip) {
      tooltip.textContent = `${themeName} Theme`;
    }
  });

  if (!isInitialLoad) {
    // Remove transition class and re-enable tooltip after view transition completes
    body.classList.remove('theme-transitioning');

    const tooltip = document.querySelector('#theme-tooltip');
    if (tooltip) {
      tooltip.disabled = false;
    }
  }
}

// Handle changes
document.addEventListener('input', event => {
  if (event.target.matches('.theme-selector')) {
    updateTheme(event.target.value);
  }
});

// Initialize
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'default';
  updateTheme(savedTheme, true);
}

initializeTheme();

document.addEventListener('turbo:render', initializeTheme);
