let initialPageLoadComplete = document.readyState === 'complete';

if (!initialPageLoadComplete) {
  window.addEventListener('load', () => {
    initialPageLoadComplete = true;
  });
}

// Helper for view transitions
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
