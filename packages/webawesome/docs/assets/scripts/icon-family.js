import { getDefaultIconFamily, getDefaultIconVariant, setDefaultIconFamily } from '/dist/webawesome.js';

//
// Syncs the icon family selectors and tooltips with the library's current defaults. The library is the source of truth:
// the blocking script in head.njk gives it this site's default or the visitor's saved style before any icon renders.
//
function syncSelectors() {
  const value = `${getDefaultIconFamily()} ${getDefaultIconVariant()}`;
  const name = value.replaceAll('-', ' ').replace(/\b\w/g, letter => letter.toUpperCase());

  document.querySelectorAll('.icon-family-selector input').forEach(input => (input.checked = input.value === value));
  document.querySelectorAll('.icon-family-tooltip').forEach(tooltip => (tooltip.textContent = `${name} Icons`));
}

// Handle changes
document.addEventListener('change', event => {
  if (event.target.matches('.icon-family-selector input')) {
    const [family, variant] = event.target.value.split(' ');

    localStorage.setItem('icon-family', event.target.value);
    setDefaultIconFamily(family, variant);
    syncSelectors();
  }
});

// Keep the tooltip from covering the selector while it's open
for (const type of ['wa-show', 'wa-after-hide']) {
  document.addEventListener(type, event => {
    if (event.target.matches('.icon-family-selector')) {
      event.target.previousElementSibling.disabled = type === 'wa-show';
    }
  });
}

syncSelectors();

document.addEventListener('turbo:render', syncSelectors);
