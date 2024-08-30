export interface ElementAnimation {
    keyframes: Keyframe[];
    rtlKeyframes?: Keyframe[];
    options?: KeyframeAnimationOptions;
}
export interface ElementAnimationMap {
    [animationName: string]: ElementAnimation;
}
export interface GetAnimationOptions {
    /**
     * The component's directionality. When set to "rtl", `rtlKeyframes` will be preferred over `keyframes` where
     * available using getAnimation().
     */
    dir: string;
}
/**
 * Sets a default animation. Components should use the `name.animation` for primary animations and `name.part.animation`
 * for secondary animations, e.g. `dialog.show` and `dialog.overlay.show`. For modifiers, use `drawer.showTop`.
 */
export declare function setDefaultAnimation(animationName: string, animation: ElementAnimation | null): void;
/** Sets a custom animation for the specified element. */
export declare function setAnimation(el: Element, animationName: string, animation: ElementAnimation | null): void;
/** Gets an element's animation. Falls back to the default if no animation is found. */
export declare function getAnimation(el: Element, animationName: string, options: GetAnimationOptions): ElementAnimation;
