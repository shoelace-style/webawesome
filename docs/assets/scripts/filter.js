function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function updateResults(input) {
  const filter = input.value.toLowerCase().trim();
  let filtered = Boolean(filter);

  for (let grid of document.querySelectorAll('.index-grid')) {
    grid.classList.toggle('filtered', filtered);

    for (let item of grid.querySelectorAll('a:has(> wa-card)')) {
      let isMatch = true;

      if (filter) {
        const content = item.textContent.toLowerCase() + ' ' + (item.getAttribute('data-keywords') + ' ');
        isMatch = content.includes(filter);
      }

      item.hidden = !isMatch;
    }
  }
}

const debouncedUpdateResults = debounce(updateResults, 300);

document.documentElement.addEventListener('input', e => {
  if (e.target?.matches('#block-filter wa-input')) {
    debouncedUpdateResults(e.target);
  }
});
