// Search data
const version = document.documentElement.getAttribute('data-version') || '';
const res = await Promise.all([
  import('https://cdn.jsdelivr.net/npm/minisearch@7/+esm'),
  fetch(`/search.json?v=${version}`),
  import('/assets/scripts/track.js').catch(() => null),
]);
const MiniSearch = res[0].default;
const searchData = await res[1].json();
const searchIndex = MiniSearch.loadJSON(JSON.stringify(searchData.searchIndex), {
  fields: ['t', 'h', 'c'],
});
const map = searchData.map;
const searchDebounce = 200;
const queryTrackDelay = 1000;
let searchTimeout;
let queryTrackTimeout;
let lastTrackedQuery = '';
let resultSelected = false;

// Optional event tracking - works standalone if track.js isn't available
const trackModule = res[2];
const trackEvent = trackModule?.trackEvent || window.trackEvent || (() => {});

const iconByPrefix = [
  ['/license', 'file-contract'],
  ['/tos', 'file-contract'],
  ['/privacy', 'file-contract'],
  ['/refunds', 'file-contract'],
  ['/dpa', 'file-contract'],
  ['/docs/color-palettes', 'palette'],
  ['/docs/themes', 'palette'],
  ['/docs/layout', 'ruler-combined'],
  ['/docs/utilities/align-items', 'ruler-combined'],
  ['/docs/utilities/justify-content', 'ruler-combined'],
  ['/docs/utilities/flex-wrap', 'ruler-combined'],
  ['/docs/utilities/gap', 'ruler-combined'],
  ['/docs/utilities/cluster', 'ruler-combined'],
  ['/docs/utilities/flank', 'ruler-combined'],
  ['/docs/utilities/frame', 'ruler-combined'],
  ['/docs/utilities/grid', 'ruler-combined'],
  ['/docs/utilities/split', 'ruler-combined'],
  ['/docs/utilities/stack', 'ruler-combined'],
  ['/docs/utilities/native', 'code'],
  ['/docs/utilities', 'brush'],
  ['/docs/usage', 'rocket-launch'],
  ['/docs/customizing', 'rocket-launch'],
  ['/docs/form-controls', 'rocket-launch'],
  ['/docs/localization', 'rocket-launch'],
  ['/docs/components/chart', 'chart-area'],
  ['/docs/components/bar-chart', 'chart-area'],
  ['/docs/components/line-chart', 'chart-area'],
  ['/docs/components/bubble-chart', 'chart-area'],
  ['/docs/components/doughnut-chart', 'chart-area'],
  ['/docs/components/pie-chart', 'chart-area'],
  ['/docs/components/polar-area-chart', 'chart-area'],
  ['/docs/components/radar-chart', 'chart-area'],
  ['/docs/components/scatter-chart', 'chart-area'],
  ['/docs/components/sparkline', 'chart-area'],
  ['/docs/components', 'trowel-bricks'],
  ['/docs/patterns', 'block-brick'],
  ['/docs/patterns/layouts', 'table-layout'],
  ['/docs/frameworks', 'puzzle'],
  ['/docs/tokens', 'coin-front'],
  ['/docs/resources/agent-skills', 'sparkles'],
  ['/docs/resources/llms', 'sparkles'],
  ['/docs/resources', 'book-spine'],
].sort((a, b) => b[0].length - a[0].length);

// We're using Turbo, so references to these elements aren't guaranteed to remain intact
function getElements() {
  return {
    dialog: document.getElementById('site-search'),
    input: document.getElementById('site-search-input'),
    results: document.getElementById('site-search-listbox'),
  };
}

function trackQuerySubmit(query, resultSelectedValue) {
  if (!query || query.length === 0) return;

  const { results } = getElements();
  if (!results) return;

  const matches = results.querySelectorAll('li').length;
  const truncatedQuery = query.length > 500 ? query.substring(0, 500) : query;

  trackEvent('navigation:search_query_submit', {
    query: truncatedQuery,
    query_length: query.length,
    result_count: matches,
    has_results: matches > 0,
    result_selected: resultSelectedValue,
  });
}

// Show the search dialog when slash (or CMD+K) is pressed and focus is not inside a form element
document.addEventListener('keydown', event => {
  if (
    (event.key === 'k' && (event.metaKey || event.ctrlKey)) ||
    (event.key === '/' &&
      !event.composedPath().some(el => {
        const tag = el?.tagName?.toLowerCase();
        return tag === 'textarea' || (tag === 'input' && !['checkbox', 'radio'].includes(el.type));
      }))
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
  if (!dialog || !input || !results) return;

  const wasAlreadyOpen = dialog.open;

  // Remove existing listeners before adding to prevent duplicates
  input.removeEventListener('input', handleInput);
  results.removeEventListener('click', handleSelection);
  dialog.removeEventListener('keydown', handleKeyDown);
  dialog.removeEventListener('wa-hide', handleClose);
  resultSelected = false;
  lastTrackedQuery = '';
  input.addEventListener('input', handleInput);
  results.addEventListener('click', handleSelection);
  dialog.addEventListener('keydown', handleKeyDown);
  dialog.addEventListener('wa-hide', handleClose);
  dialog.open = true;
  if (!wasAlreadyOpen) {
    trackEvent('navigation:search_dialog_open');
  }
}

function cleanup() {
  const { dialog, input, results } = getElements();
  if (!dialog || !input || !results) return;
  clearTimeout(searchTimeout);
  clearTimeout(queryTrackTimeout);
  input.removeEventListener('input', handleInput);
  results.removeEventListener('click', handleSelection);
  dialog.removeEventListener('keydown', handleKeyDown);
  dialog.removeEventListener('wa-hide', handleClose);

  // Reset state to prevent leakage between dialog sessions
  resultSelected = false;
  lastTrackedQuery = '';
}

async function handleClose() {
  const { dialog, input } = getElements();
  if (!dialog || !input) return;
  clearTimeout(queryTrackTimeout);
  queryTrackTimeout = null;
  dialog.removeEventListener('wa-hide', handleClose);
  if (!resultSelected) {
    const query = (input.value || '').trim();
    if (query.length > 0 && query !== lastTrackedQuery) {
      trackQuerySubmit(query, false);
      lastTrackedQuery = query;
    }
  }

  input.value = '';
  try {
    await updateResults();
  } catch (error) {
    // Silently handle errors - UI cleanup should continue
  }
  cleanup();
  trackEvent('navigation:search_dialog_close');
}

function handleInput() {
  const { input } = getElements();
  if (!input) return;
  clearTimeout(searchTimeout);
  clearTimeout(queryTrackTimeout);

  const query = input.value.trim();

  if (query.length === 0) {
    lastTrackedQuery = '';
  }

  searchTimeout = setTimeout(async () => {
    await updateResults(query);
    if (query.length > 0 && query !== lastTrackedQuery) {
      queryTrackTimeout = setTimeout(() => {
        const { input: currentInput, results } = getElements();
        if (!currentInput || resultSelected) return;

        const currentQuery = currentInput.value.trim();
        if (currentQuery === query && currentQuery !== lastTrackedQuery) {
          trackQuerySubmit(currentQuery, false);
          lastTrackedQuery = currentQuery;
        }
      }, queryTrackDelay);
    }
  }, searchDebounce);
}

function handleKeyDown(event) {
  const { input, results } = getElements();
  if (!input || !results) return;

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
        if (currentEl) {
          const link = currentEl.querySelector('a');
          if (link) {
            selectResult(link, 'keyboard_enter');
          }
        }
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

function selectResult(link, selectionMethod) {
  const { input, results } = getElements();
  if (!input || !link) return;

  // Clear pending query tracking timeout to prevent duplicate events
  clearTimeout(queryTrackTimeout);
  queryTrackTimeout = null;
  resultSelected = true; // Set immediately so timeout callback (if executing) sees it

  const query = input.value.trim();
  if (!link.dataset.searchResultIndex) return;
  const resultIndex = parseInt(link.dataset.searchResultIndex, 10);
  if (isNaN(resultIndex) || resultIndex < 1) return;

  const resultUrl = link.dataset.searchResultUrl || link.getAttribute('href');
  if (!resultUrl) return;
  lastTrackedQuery = query;
  trackQuerySubmit(query, true);
  trackEvent('navigation:search_result_click', {
    query,
    result_index: resultIndex,
    result_url: resultUrl,
    selection_method: selectionMethod,
  });

  const { dialog } = getElements();
  if (dialog) {
    dialog.removeEventListener('wa-hide', handleClose);
    cleanup();
    trackEvent('navigation:search_dialog_close');
    dialog.open = false;
  }

  if (window.Turbo) {
    Turbo.visit(resultUrl);
  } else {
    location.href = resultUrl;
  }
}

function handleSelection(event) {
  const link = event.target.closest('a');

  if (link) {
    event.preventDefault();
    selectResult(link, 'mouse_click');
  }
}

// Queries the search index and updates the results
async function updateResults(query = '') {
  const { dialog, input, results } = getElements();
  if (!dialog || !input || !results) return;
  try {
    const trimmedQuery = query.trim();
    const hasQuery = trimmedQuery.length > 0;
    let matches = [];

    if (hasQuery) {
      matches = searchIndex.search(trimmedQuery, {
        prefix: true,
        fuzzy: 0.2,
        boost: { t: 20, h: 10 },
      });

      // Re-rank results to prioritize title matches. Searches don't account for where in a title a match occurs, so
      // "change" can rank "pagination" above "changelog". This applies a bonus to results whose title contains the
      // query as a word boundary match.
      const queryLower = trimmedQuery.toLowerCase();
      matches.sort((a, b) => {
        const titleA = (map[a.id]?.title ?? '').toLowerCase();
        const titleB = (map[b.id]?.title ?? '').toLowerCase();

        const rankTitle = title => {
          if (title === queryLower) return 3;
          if (title.startsWith(queryLower)) return 2;
          // Match query at a word boundary (e.g. "change" matches "price change")
          if (new RegExp(`\\b${queryLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(title)) return 1;
          return 0;
        };

        const rankDiff = rankTitle(titleB) - rankTitle(titleA);
        if (rankDiff !== 0) return rankDiff;

        // Preserve MiniSearch's original score ordering within the same rank
        return b.score - a.score;
      });
    }

    const hasResults = hasQuery && matches.length > 0;

    dialog.classList.toggle('has-results', hasQuery && hasResults);
    dialog.classList.toggle('no-results', hasQuery && !hasResults);
    input.setAttribute('aria-activedescendant', '');
    results.innerHTML = '';
    matches.forEach((match, index) => {
      const page = map[match.id];
      if (!page || !page.url) return;

      const li = document.createElement('li');
      const a = document.createElement('a');
      const displayTitle = page.title ?? '';
      const displayDescription = page.description ?? '';
      const displayUrl = page.url.replace(/^\//, '');
      let icon = 'file-text';

      li.classList.add('site-search-result');
      li.setAttribute('role', 'option');
      li.setAttribute('id', `search-result-item-${match.id}`);
      li.setAttribute('data-selected', index === 0 ? 'true' : 'false');
      if (page.url === '/') icon = 'home';
      else if (page.url === '/docs') icon = 'rocket-launch';
      else {
        for (const [prefix, name] of iconByPrefix) {
          if (page.url.startsWith(prefix)) {
            icon = name;
            break;
          }
        }
      }
      a.href = page.url;
      a.innerHTML = `
        <div class="site-search-result-icon" aria-hidden="true">
          <wa-icon name="${icon}" variant="regular"></wa-icon>
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

      // Use 1-based indexing for analytics
      a.dataset.searchResultIndex = (index + 1).toString();
      a.dataset.searchResultUrl = page.url;
      li.appendChild(a);
      results.appendChild(li);
    });
  } catch {
    // Ignore query errors as the user types
  }
}
