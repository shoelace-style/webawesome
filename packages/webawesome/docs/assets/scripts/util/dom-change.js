let initialPageLoadComplete = document.readyState === 'complete';

if (!initialPageLoadComplete) {
  window.addEventListener('load', () => {
    initialPageLoadComplete = true;
  });
}

/**
 * Helper for performing a DOM change using a view transition, wherever supported and reduced motion is not desired.
 * @param {function} fn - Function to perform the DOM change. If async, must resolve when the change is complete.
 * @param {object} [options] - Options for the transition
 * @param {'smooth' | 'instant'} [options.behavior] - Transition behavior. Defaults to 'smooth'. 'instant' will skip the transition.
 * @param {boolean} [options.ignoreInitialLoad] - If true, will skip the transition on initial page load. Defaults to true.
 */
export function domChange(fn, { behavior = 'smooth', ignoreInitialLoad = true } = {}) {
  const canUseViewTransitions =
    document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Skip transitions on initial page load
  if (!initialPageLoadComplete && ignoreInitialLoad) {
    fn(false);
    return null;
  }

  if (canUseViewTransitions && behavior === 'smooth') {
    const transition = document.startViewTransition(() => {
      fn(true);
      // Wait a brief delay before finishing the transition to prevent jumpiness
      return new Promise(resolve => setTimeout(resolve, 200));
    });
    return transition;
  } else {
    fn(false);
    return null;
  }
}
