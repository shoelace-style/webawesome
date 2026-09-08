/**
 * Live search functionality for in-page lists
 *
 * Required HTML structure:
 * <div class="search-list">
 *   <input class="search-list-input" type="search" placeholder="Search...">
 *
 *   <h2>Category Name</h2>  <!-- Optional heading; h1-h6 all work -->
 *   <section class="search-list-grid">
 *     <a href="...">
 *       <span class="page-name">Component Title</span>
 *     </a>
 *   </section>
 *
 *   <div class="search-list-empty" hidden>No results found</div>
 * </div>
 *
 * Opt-in hooks, all defaulting to the card-grid shape above:
 * - `data-search-list-section` on the container — selector for the filterable groups
 * - `data-search-list-item` on the container — selector for the items inside a group
 * - `.search-list-status` inside the container — live region that receives a match count.
 *   Mark it up visually hidden: the count is for screen readers, and `.search-list-empty`
 *   is what a sighted user sees when a query matches nothing.
 * - `[data-search-list-query]` inside the container — a link that applies its value as a query.
 *   On upgrade it becomes a toggle: role="button" plus aria-pressed while its query is the
 *   active filter, and aria-controls pointing at the results region.
 * - `[data-search-list-results]` inside the container — flag this one wrapper as the results
 *   region instead of the default (every group, plus the empty state). Regions gain
 *   `data-search-list-filtered` on the first application and `data-search-list-updated` on
 *   every one, so CSS can acknowledge an update; docs.css ships the default treatment.
 * - `[data-search-list-with-section]` directly after a group — chrome that hides when its
 *   group does, so a "browse all" link never floats over an empty result.
 *
 * The active query round-trips through the URL's `?q=` parameter, so a filtered view is
 * shareable and a shared one arrives filtered.
 *
 * Shortcuts should ship as ordinary links to the thing they surface, so they still
 * work before this script upgrades them.
 *
 * Usage: import './search-list.js'
 */

// Turbo fires turbo:load on restored pages too, and it caches attributes — so a DOM marker
// would come back already set on a container whose listeners did not survive. Identity in a
// WeakSet is the thing Turbo can't cache.
const initializedContainers = new WeakSet();

let regionCount = 0;

export function enableSearchLists() {
  document.querySelectorAll('.search-list').forEach(container => {
    if (initializedContainers.has(container)) return;

    const input = container.querySelector('.search-list-input');
    const emptyState = container.querySelector('.search-list-empty');

    if (!input || !emptyState) return;

    initializedContainers.add(container);

    const sectionSelector = container.dataset.searchListSection || '.search-list-grid';
    const itemSelector = container.dataset.searchListItem || 'a';
    const status = container.querySelector('.search-list-status');
    // Regions flagged on every filter run so CSS can acknowledge the update. A page can name
    // one wrapper to flag as a unit; otherwise each group plus the empty state is flagged,
    // which covers the results without touching the field being typed in.
    const namedResults = container.querySelector('[data-search-list-results]');
    const results = namedResults ? [namedResults] : [...container.querySelectorAll(sectionSelector), emptyState];

    // aria-controls needs an id to point at, and the results wrapper is the region a chip
    // rewrites. Only minted when the page didn't author one.
    const resultsRegion = namedResults || container;
    if (!resultsRegion.id) resultsRegion.id = `search-list-results-${++regionCount}`;

    const shortcuts = [...container.querySelectorAll('[data-search-list-query]')];

    function filterSection(section, query) {
      let visible = 0;

      section.querySelectorAll(itemSelector).forEach(item => {
        const name = (item.querySelector('.page-name') || item).textContent || '';
        const haystack = `${name} ${item.dataset.synonyms || ''}`.toLowerCase();
        const isMatch = !query || haystack.includes(query);

        item.style.display = isMatch ? '' : 'none';
        if (isMatch) visible++;
      });

      return visible;
    }

    function applyFilter(term) {
      const query = term.toLowerCase();
      let totalVisible = 0;

      const claimed = new Set();

      // Groups introduced by a heading — the heading hides along with its group.
      // Anchor-link transformers slot a tooltip between the two, so scan forward for
      // the group rather than trusting the heading's immediate sibling.
      container.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
        let section = heading.nextElementSibling;
        while (section && !section.matches(sectionSelector)) {
          section = /^H[1-6]$/.test(section.tagName) ? null : section.nextElementSibling;
        }
        if (!section) return;

        claimed.add(section);
        const sectionVisible = filterSection(section, query);

        heading.style.display = sectionVisible > 0 ? '' : 'none';
        section.style.display = sectionVisible > 0 ? '' : 'none';

        let trailing = section.nextElementSibling;
        while (trailing && trailing.hasAttribute('data-search-list-with-section')) {
          trailing.style.display = sectionVisible > 0 ? '' : 'none';
          trailing = trailing.nextElementSibling;
        }

        totalVisible += sectionVisible;
      });

      container.querySelectorAll(sectionSelector).forEach(section => {
        if (claimed.has(section)) return;

        totalVisible += filterSection(section, query);
      });

      emptyState.hidden = totalVisible > 0;

      // A chip is pressed only while the filter is showing exactly what it asks for, so
      // typing over a chip's term releases it.
      shortcuts.forEach(shortcut => {
        shortcut.setAttribute('aria-pressed', String(query !== '' && shortcut.dataset.searchListQuery === query));
      });

      // The attribute is removed and re-added around a forced reflow so the animation
      // restarts on every application, not just the first. One read for the whole batch —
      // reading per region would lay the page out once per region.
      results.forEach(region => {
        region.setAttribute('data-search-list-filtered', '');
        region.removeAttribute('data-search-list-updated');
      });
      if (results.length > 0) void results[0].offsetWidth;
      results.forEach(region => region.setAttribute('data-search-list-updated', ''));

      // Never toggled hidden — a live region has to stay in the a11y tree to announce.
      if (status) {
        status.textContent = query ? `${totalVisible} ${totalVisible === 1 ? 'match' : 'matches'} for “${term}”` : '';
      }
    }

    // Filtered views are shareable: the query rides in ?q= and the hash is left alone, so a
    // deep link to an answer still points at the answer.
    function syncUrl(term) {
      const url = new URL(window.location.href);
      if (term) {
        url.searchParams.set('q', term);
      } else {
        url.searchParams.delete('q');
      }
      window.history.replaceState(window.history.state, '', url);
    }

    let timeout;

    input.addEventListener('input', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const term = input.value.trim();
        applyFilter(term);
        syncUrl(term);
      }, 300);
    });

    shortcuts.forEach(shortcut => {
      // scroll.js smooth-scrolls every in-page hash link from a document-level listener, and
      // bails on data-smooth-link="off". Opting out there is what keeps the page still —
      // stopPropagation would also blind the document-level click tracking.
      shortcut.dataset.smoothLink = 'off';

      // It ships as a link so it works before this runs; upgraded it toggles a filter in
      // place, which is button behavior, so announce it as a toggle button over that anchor.
      shortcut.setAttribute('role', 'button');
      shortcut.setAttribute('aria-pressed', 'false');
      shortcut.setAttribute('aria-controls', resultsRegion.id);

      shortcut.addEventListener('click', event => {
        event.preventDefault();
        const term = shortcut.dataset.searchListQuery;
        clearTimeout(timeout);
        input.value = term;
        applyFilter(term);
        syncUrl(term);
        // Focus lands on the field so the applied term is editable and the status live region
        // announcing the count sits alongside it.
        input.focus({ preventScroll: true });
      });

      // role="button" takes Space off the anchor's native activation; Enter still works.
      shortcut.addEventListener('keydown', event => {
        if (event.key === ' ') {
          event.preventDefault();
          shortcut.click();
        }
      });
    });

    const incomingQuery = new URL(window.location.href).searchParams.get('q');
    if (incomingQuery) {
      input.value = incomingQuery.trim();
      applyFilter(incomingQuery.trim());
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', enableSearchLists);
} else {
  enableSearchLists();
}

window.addEventListener('turbo:load', enableSearchLists);
