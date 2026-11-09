import { getDefaultIconFamily, getDefaultIconVariant, setDefaultIconFamily } from '/dist/webawesome.js';

//
// Syncs the icon family selectors with the library's current defaults. The library is the source of truth:
// the blocking script in head.njk gives it this site's default or the visitor's saved style before any icon renders.
//
function syncSelectors() {
  const value = `${getDefaultIconFamily()} ${getDefaultIconVariant()}`;

  document.querySelectorAll('.icon-family-selector input').forEach(input => (input.checked = input.value === value));

  const checkedLabel = document.querySelector('.icon-family-selector input:checked')?.closest('label');
  const styleName = checkedLabel?.querySelector('.wa-visually-hidden').textContent;
  document.querySelectorAll('.icon-family-tooltip .tooltip-value').forEach(el => (el.textContent = styleName));
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

syncSelectors();

document.addEventListener('turbo:render', syncSelectors);
