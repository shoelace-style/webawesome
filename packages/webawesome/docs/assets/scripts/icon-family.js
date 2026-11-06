import { getDefaultIconFamily, getDefaultIconVariant, setDefaultIconFamily } from '/dist/webawesome.js';

//
// Syncs the icon family selectors with the library's current defaults. The library is the source of truth:
// the blocking script in head.njk gives it this site's default or the visitor's saved style before any icon renders.
//
function syncSelectors() {
  const value = `${getDefaultIconFamily()} ${getDefaultIconVariant()}`;

  document.querySelectorAll('.icon-family-selector input').forEach(input => (input.checked = input.value === value));
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
