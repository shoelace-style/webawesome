let initialPageLoadComplete = document.readyState === 'complete';

if (!initialPageLoadComplete) {
  window.addEventListener('load', () => {
    initialPageLoadComplete = true;
  });
}

/**
 * A wrapper around `document.startViewTransition()` that fails gracefully in unsupportive browsers.
 */
export async function doViewTransition(callback, { ignoreInitialLoad = true } = {}) {
  // Skip transitions on initial page load
  if (!initialPageLoadComplete && ignoreInitialLoad) {
    callback();
    return;
  }

  const canUseViewTransitions =
    document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (canUseViewTransitions) {
    await document.startViewTransition(callback).finished;
  } else {
    callback();
  }
}
