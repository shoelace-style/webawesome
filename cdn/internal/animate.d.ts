/** Same as `el.animate()`, except returns a promise that doesn't throw an error when the animation is canceled. */
export declare function animate(el: Element, keyframes: Keyframe[], options?: KeyframeAnimationOptions): Promise<void | Animation>;
/**
 * Applies a class to the specified element to animate it. The class is removed after the animation finishes and then
 * the promise resolves. If a timeout is provided, the class will be removed and the animation will
 */
export declare function animateWithClass(el: Element, className: string): Promise<void>;
/** Parses a CSS duration and returns the number of milliseconds. */
export declare function parseDuration(duration: number | string): number;
/** Tells if the user has enabled the "reduced motion" setting in their browser or OS. */
export declare function prefersReducedMotion(): boolean;
