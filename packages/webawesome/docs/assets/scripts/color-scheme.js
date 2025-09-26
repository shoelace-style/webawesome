import { doViewTransition } from '../scripts/view-transitions.js';

//
// Updates the color scheme when a color scheme selector changes
//
async function updateTheme(value) {
  localStorage.setItem('color-scheme', value);

  const isDark = value === 'dark' || (value === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Disable tooltip during transition
  const tooltip = document.querySelector('#color-scheme-tooltip');
  if (tooltip) {
    tooltip.disabled = true;
  }

  await doViewTransition(() => {
    document.documentElement.classList.toggle('wa-dark', isDark);
  });

  // Sync all selectors and update tooltip
  document.querySelectorAll('.color-scheme-selector').forEach(el => (el.value = value));

  // Update tooltip content and re-enable after transition completes
  if (tooltip) {
    const schemeText = value === 'light' ? 'Light' : value === 'dark' ? 'Dark' : 'System';
    tooltip.textContent = schemeText;
    tooltip.disabled = false;
  }
}

// Handle changes
document.addEventListener('input', e => {
  if (e.target.matches('.color-scheme-selector')) {
    updateTheme(e.target.value);
  }
});

// Handle backslash key toggle
document.addEventListener('keydown', e => {
  if (e.key === '\\' && !e.composedPath().some(el => el.tagName === 'INPUT')) {
    const current = localStorage.getItem('color-scheme') || 'auto';
    const isDark =
      current === 'dark' || (current === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    updateTheme(isDark ? 'light' : 'dark');
  }
});

// Initialize
const saved = localStorage.getItem('color-scheme') || 'auto';
updateTheme(saved);
