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

  // Lifecycle for listeners (e.g. code-example previews): tag elements before the transition captures,
  // update state inside it, clean up after it settles.
  document.dispatchEvent(new Event('color-scheme-change'));
  await doViewTransition(() => {
    document.documentElement.classList.toggle('wa-dark', isDark);
    document.dispatchEvent(new Event('color-scheme-applied'));
  });
  document.dispatchEvent(new Event('color-scheme-settled'));

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
document.addEventListener('input', event => {
  if (event.target.matches('.color-scheme-selector')) {
    updateTheme(event.target.value);
  }
});

// Handle backslash key toggle
document.addEventListener('keydown', event => {
  // The shortcut must not fire from within editables (inputs, textareas, contenteditable hosts like code editors)
  if (
    event.key === '\\' &&
    !event.composedPath().some(el => el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)
  ) {
    const current = localStorage.getItem('color-scheme') || 'auto';
    const isDark =
      current === 'dark' || (current === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    updateTheme(isDark ? 'light' : 'dark');
  }
});

// Initialize
const saved = localStorage.getItem('color-scheme') || 'auto';
updateTheme(saved);
