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
    const target = document.getElementById(decodeURIComponent(id));

    if (target) {
      event.preventDefault();
      // Offset comes from scroll-margin-top on wa-page descendants (library layers.css).
      target.scrollIntoView({ behavior: 'smooth' });
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

// wa-page publishes its sticky-region heights via ResizeObserver, so scroll-margin-top reads
// ~0 for the first frames. Wait for the offset to settle, else the target lands behind the header.
function alignToHashTarget(target) {
  let previousOffset = -1;
  let steadyFrames = 0;
  let attempts = 0;
  const tick = () => {
    const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    steadyFrames = offset === previousOffset ? steadyFrames + 1 : 0;
    previousOffset = offset;
    if (steadyFrames >= 3 || ++attempts > 90) {
      target.scrollIntoView();
    } else {
      requestAnimationFrame(tick);
    }
  };
  requestAnimationFrame(tick);
}

// Restore scroll position after components are defined
allDefined().then(() => {
  const navigationType = getNavigationType();
  const key = `wa-scroll-y-[${location.pathname}]`;
  const scrollY = sessionStorage.getItem(key);
  const hashTarget = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;

  if (hashTarget) {
    // Re-align after hydration; the browser's initial hash jump landed at a stale position.
    alignToHashTarget(hashTarget);
  } else if (navigationType === 'reload' && scrollY) {
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
