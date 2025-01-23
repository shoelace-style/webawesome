// Search data
const res = await Promise.all([import('https://cdn.jsdelivr.net/npm/lunr/+esm'), fetch('/search.json')]);
const lunr = res[0].default;
const searchData = await res[1].json();
const searchIndex = lunr.Index.load(searchData.searchIndex);
const map = searchData.map;
const searchDebounce = 100;
const icons = {
  component: 'puzzle-piece',
  document: 'file',
  home: 'house',
  native: 'code',
  theme: 'palette',
};
let searchTimeout;

// We're using Turbo, so references to these elements aren't guaranteed to remain intact
function getElements() {
  return {
    dialog: document.getElementById('site-search'),
    input: document.getElementById('site-search-input'),
    results: document.getElementById('site-search-listbox'),
  };
}

// Show the search dialog when slash (or CMD+K) is pressed and focus is not inside a form element
document.addEventListener('keydown', event => {
  if (
    (event.key === '/' || (event.key === 'k' && (event.metaKey || event.ctrlKey))) &&
    !event.composedPath().some(el => ['input', 'textarea'].includes(el?.tagName?.toLowerCase()))
  ) {
    event.preventDefault();
    show();
  }
});

// Show the search dialog when clicking on elements with the `data-search` attribute
document.addEventListener('click', event => {
  const searchButton = event.target.closest('[data-search]');
  if (searchButton) {
    show();
  }
});

function show() {
  const { dialog, input, results } = getElements();

  input.addEventListener('input', handleInput);
  results.addEventListener('click', handleSelection);
  dialog.addEventListener('keydown', handleKeyDown);
  dialog.addEventListener('wa-hide', hide, { once: true });
  dialog.open = true;
}

function hide() {
  const { dialog, input, results } = getElements();

  input.removeEventListener('input', handleInput);
  results.removeEventListener('click', handleSelection);
  dialog.removeEventListener('keydown', handleKeyDown);
  dialog.open = false;
}

function handleInput() {
  const { input } = getElements();

  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => updateResults(input.value), searchDebounce);
}

function handleClear() {
  const { input } = getElements();

  input.value = '';
  input.focus();
  updateResults();
}

function handleKeyDown(event) {
  const { input, results } = getElements();

  // Handle keyboard selections
  if (['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter'].includes(event.key)) {
    event.preventDefault();

    const currentEl = results.querySelector('[data-selected="true"]');
    const items = [...results.querySelectorAll('li')];
    const index = items.indexOf(currentEl);
    let nextEl;

    if (items.length === 0) {
      return;
    }

    switch (event.key) {
      case 'ArrowUp':
        nextEl = items[Math.max(0, index - 1)];
        break;
      case 'ArrowDown':
        nextEl = items[Math.min(items.length - 1, index + 1)];
        break;
      case 'Home':
        nextEl = items[0];
        break;
      case 'End':
        nextEl = items[items.length - 1];
        break;
      case 'Enter':
        currentEl?.querySelector('a')?.click();
        break;
    }

    // Update the selected item
    items.forEach(item => {
      if (item === nextEl) {
        input.setAttribute('aria-activedescendant', item.id);
        item.setAttribute('data-selected', 'true');
        nextEl.scrollIntoView({ block: 'nearest' });
      } else {
        item.setAttribute('data-selected', 'false');
      }
    });
  }
}

function handleSelection(event) {
  const link = event.target.closest('a');

  if (link) {
    event.preventDefault();
    hide();
    location.href = link.href;
  }
}

// Queries the search index and updates the results
async function updateResults(query = '') {
  const { dialog, input, results } = getElements();

  try {
    const hasQuery = query.length > 0;
    const searchTokens = query
      .split(' ')
      .map((term, index, arr) => `${term}${index === arr.length - 1 ? `* ${term}~1` : '~1'}`)
      .join(' ');
    const matches = hasQuery ? searchIndex.search(`${query} ${searchTokens}`) : [];
    const hasResults = hasQuery && matches.length > 0;

    dialog.classList.toggle('has-results', hasQuery && hasResults);
    dialog.classList.toggle('no-results', hasQuery && !hasResults);

    input.setAttribute('aria-activedescendant', '');
    results.innerHTML = '';

    matches.forEach((match, index) => {
      const page = map[match.ref];
      const li = document.createElement('li');
      const a = document.createElement('a');
      const displayTitle = page.title ?? '';
      const displayDescription = page.description ?? '';
      const displayUrl = page.url.replace(/^\//, '');
      let icon = icons.document;

      li.classList.add('site-search-result');
      li.setAttribute('role', 'option');
      li.setAttribute('id', `search-result-item-${match.ref}`);
      li.setAttribute('data-selected', index === 0 ? 'true' : 'false');

      if (page.url === '/') icon = icons.home;
      if (page.url.startsWith('/docs/native')) icon = icons.native;
      if (page.url.startsWith('/docs/components')) icon = icons.component;
      if (page.url.startsWith('/docs/theme') || page.url.startsWith('/docs/restyle')) icon = icons.theme;

      a.href = page.url;
      a.innerHTML = `
        <div class="site-search-result-icon" aria-hidden="true">
          <wa-icon name="${icon}"></wa-icon>
        </div>
        <div class="site-search-result-details">
          <div class="site-search-result-title"></div>
          <div class="site-search-result-description"></div>
          <div class="site-search-result-url"></div>
        </div>
      `;
      a.querySelector('.site-search-result-title').textContent = displayTitle;
      a.querySelector('.site-search-result-description').textContent = displayDescription;
      a.querySelector('.site-search-result-url').textContent = displayUrl;

      li.appendChild(a);
      results.appendChild(li);
    });
  } catch {
    // Ignore query errors as the user types
  }
}
