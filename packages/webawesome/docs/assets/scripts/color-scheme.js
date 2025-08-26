import { doViewTransition } from '../scripts/view-transitions.js';

//
// Updates the color scheme when a color scheme selector changes
//
function updateTheme(value) {
  localStorage.setItem('color-scheme', value);

  const isDark = value === 'dark' || (value === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  doViewTransition(() => {
    document.documentElement.classList.toggle('wa-dark', isDark);
  });

  // Sync all selectors
  document.querySelectorAll('.color-scheme-selector').forEach(el => (el.value = value));
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
