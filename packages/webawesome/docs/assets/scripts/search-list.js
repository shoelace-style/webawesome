/**
 * Live search functionality for component lists
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
 * Usage: import './search-list.js'
 */
export function enableSearchLists() {
  document.querySelectorAll('.search-list').forEach(container => {
    const input = container.querySelector('.search-list-input');
    const emptyState = container.querySelector('.search-list-empty');

    if (!input || !emptyState) return;

    let timeout;

    input.addEventListener('input', e => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const query = e.target.value.toLowerCase().trim();
        let totalVisible = 0;

        // Handle sections with headings
        container.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
          const section = heading.nextElementSibling;
          if (!section) return;

          let sectionVisible = 0;

          section.querySelectorAll('a').forEach(card => {
            const title = card.querySelector('.page-name')?.textContent?.toLowerCase() || '';
            const visible = !query || title.includes(query);
            card.style.display = visible ? '' : 'none';
            if (visible) sectionVisible++;
          });

          heading.style.display = sectionVisible > 0 ? '' : 'none';
          section.style.display = sectionVisible > 0 ? '' : 'none';
          totalVisible += sectionVisible;
        });

        // Handle standalone sections without headings
        container.querySelectorAll('.search-list-grid').forEach(section => {
          const prevElement = section.previousElementSibling;
          const hasHeading = prevElement && /^H[1-6]$/.test(prevElement.tagName);

          if (!hasHeading) {
            section.querySelectorAll('a').forEach(card => {
              const title = card.querySelector('.page-name')?.textContent?.toLowerCase() || '';
              const visible = !query || title.includes(query);
              card.style.display = visible ? '' : 'none';
              if (visible) totalVisible++;
            });
          }
        });

        emptyState.hidden = totalVisible > 0;
      }, 300);
    });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', enableSearchLists);
} else {
  enableSearchLists();
}

window.addEventListener('turbo:load', enableSearchLists);
