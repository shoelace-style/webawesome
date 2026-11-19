/** Same as `el.animate()`, except returns a promise that doesn't throw an error when the animation is canceled. */
export async function animate(el: Element, keyframes: Keyframe[], options?: KeyframeAnimationOptions) {
  return el.animate(keyframes, options).finished.catch(() => {
    /* suppress errors in Safari */
  });
}

/**
 * Applies a class to the specified element, waits for its finite CSS animations to finish or be canceled, then removes
 * the class. Transitions and animations created with the Web Animations API do not delay completion.
 */
export async function animateWithClass(el: Element, className: string) {
  // Flush a previous class removal so immediately reusing the class starts a fresh animation.
  el.getAnimations();
  el.classList.add(className);

  // Popup activation is reactive; let its display styles render before sampling animations.
  await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));

  const animationPromises: Promise<Animation>[] = [];

  for (const animation of el.getAnimations()) {
    if (animation instanceof CSSAnimation && animation.effect?.getComputedTiming().endTime !== Infinity) {
      animationPromises.push(animation.finished);
    }
  }

  await Promise.allSettled(animationPromises);
  el.classList.remove(className);
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
