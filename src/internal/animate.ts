/** Same as `el.animate()`, except returns a promise that doesn't throw an error when the animation is canceled. */
export async function animate(el: Element, keyframes: Keyframe[], options?: KeyframeAnimationOptions) {
  return el.animate(keyframes, options).finished.catch(() => {
    /* suppress errors in Safari */
  });
}

/**
 * Applies a class to the specified element to animate it. The class is removed after the animation finishes and then
 * the promise resolves. If a timeout is provided, the class will be removed and the animation will
 */
export function animateWithClass(el: Element, className: string) {
  return new Promise<void>(resolve => {
    el.classList.remove(className);
    const controller = new AbortController();
    const { signal } = controller;

    el.classList.add(className);
    el.addEventListener(
      'animationend',
      () => {
        el.classList.remove(className);
        resolve();
        controller.abort();
      },
      { once: true, signal },
    );

    el.addEventListener(
      'animationcancel',
      () => {
        el.classList.remove(className);
        resolve();
        controller.abort();
      },
      { once: true, signal },
    );
  });
}

/** Parses a CSS duration and returns the number of milliseconds. */
export function parseDuration(duration: number | string) {
  duration = duration.toString().toLowerCase();

  if (duration.indexOf('ms') > -1) {
    return parseFloat(duration) || 0;
  }

  if (duration.indexOf('s') > -1) {
    return (parseFloat(duration) || 0) * 1000;
  }

  return parseFloat(duration) || 0;
}

/** Tells if the user has enabled the "reduced motion" setting in their browser or OS. */
export function prefersReducedMotion() {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  return query.matches;
}
