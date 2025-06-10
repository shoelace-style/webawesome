let initialPageLoadComplete = document.readyState === 'complete';

if (!initialPageLoadComplete) {
  window.addEventListener('load', () => {
    initialPageLoadComplete = true;
  });
}

/**
 * A wrapper around `document.startViewTransition()` that falls back to no transitions in unsupportive browsers.
 */
export function doViewTransition(callback, { behavior = 'smooth', ignoreInitialLoad = true } = {}) {
  const canUseViewTransitions =
    document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Skip transitions on initial page load
  if (!initialPageLoadComplete && ignoreInitialLoad) {
    callback(false);
    return null;
  }

  if (canUseViewTransitions && behavior === 'smooth') {
    const transition = document.startViewTransition(() => {
      callback(true);
      // Wait a brief delay before finishing the transition to prevent jumpiness
      return new Promise(resolve => setTimeout(resolve, 200));
    });
    return transition;
  } else {
    callback(false);
    return null;
  }
}
