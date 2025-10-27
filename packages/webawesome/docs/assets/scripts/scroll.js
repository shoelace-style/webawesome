import { allDefined } from '/dist/webawesome.js';

/**
 * Determines how the page was loaded. Possible return values include "reload", "navigate", "back_forward", "prerender",
 * and "unknown".
 */
function getNavigationType() {
  if (performance.getEntriesByType) {
    const navEntries = performance.getEntriesByType('navigation');
    if (navEntries.length > 0) {
      return navEntries[0].type;
    }
  }
  return 'unknown';
}

// Smooth links
document.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link || link.getAttribute('data-smooth-link') === 'off') {
    return;
  }

  const id = (link.hash ?? '').substr(1);

  // Only handle smooth scroll if there's a hash and the link points to the current page
  if (id && link.pathname === window.location.pathname) {
    const target = document.getElementById(id);
    const headerHeight = document.querySelector('wa-page > header').clientHeight;

    if (target) {
      event.preventDefault();
      window.scroll({
        top: target.offsetTop - headerHeight,
        behavior: 'smooth',
      });

      history.replaceState(history.state, '', `#${id}`);
    }
  }
});

// Scroll classes
function updateScrollClass() {
  document.body.classList.toggle('scrolled-down', window.scrollY >= 10);
}

window.addEventListener('scroll', updateScrollClass);
window.addEventListener('turbo:render', updateScrollClass);
updateScrollClass();

// Restore scroll position after components are defined
allDefined().then(() => {
  const navigationType = getNavigationType();
  const key = `wa-scroll-y-[${location.pathname}]`;
  const scrollY = sessionStorage.getItem(key);

  // Only restore when reloading, otherwise clear it
  if (navigationType === 'reload' && scrollY) {
    window.scrollTo(0, scrollY);
  } else {
    sessionStorage.removeItem(key);
  }

  // After restoring, keep tabs on the page's scroll position for next reload
  window.addEventListener(
    'scroll',
    () => {
      sessionStorage.setItem(key, window.scrollY);
    },
    { passive: true },
  );
});
