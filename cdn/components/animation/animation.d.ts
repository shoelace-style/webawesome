import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';
/**
 * @summary Animate elements declaratively with nearly 100 baked-in presets, or roll your own with custom keyframes. Powered by the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).
 * @documentation https://backers.webawesome.com/docs/components/animation
 * @status stable
 * @since 2.0
 *
 * @event wa-cancel - Emitted when the animation is canceled.
 * @event wa-finish - Emitted when the animation finishes.
 * @event wa-start - Emitted when the animation starts or restarts.
 *
 * @slot - The element to animate. Avoid slotting in more than one element, as subsequent ones will be ignored. To
 *  animate multiple elements, either wrap them in a single container or use multiple `<wa-animation>` elements.
 */
export default class WaAnimation extends WebAwesomeElement {
    static styles: CSSResultGroup;
    private animation?;
    private hasStarted;
    defaultSlot: Promise<HTMLSlotElement>;
    /** The name of the built-in animation to use. For custom animations, use the `keyframes` prop. */
    name: string;
    /**
     * Plays the animation. When omitted, the animation will be paused. This attribute will be automatically removed when
     * the animation finishes or gets canceled.
     */
    play: boolean;
    /** The number of milliseconds to delay the start of the animation. */
    delay: number;
    /**
     * Determines the direction of playback as well as the behavior when reaching the end of an iteration.
     * [Learn more](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction)
     */
    direction: PlaybackDirection;
    /** The number of milliseconds each iteration of the animation takes to complete. */
    duration: number;
    /**
     * The easing function to use for the animation. This can be a Web Awesome easing function or a custom easing function
     * such as `cubic-bezier(0, 1, .76, 1.14)`.
     */
    easing: string;
    /** The number of milliseconds to delay after the active period of an animation sequence. */
    endDelay: number;
    /** Sets how the animation applies styles to its target before and after its execution. */
    fill: FillMode;
    /** The number of iterations to run before the animation completes. Defaults to `Infinity`, which loops. */
    iterations: number;
    /** The offset at which to start the animation, usually between 0 (start) and 1 (end). */
    iterationStart: number;
    /** The keyframes to use for the animation. If this is set, `name` will be ignored. */
    keyframes?: Keyframe[];
    /**
     * Sets the animation's playback rate. The default is `1`, which plays the animation at a normal speed. Setting this
     * to `2`, for example, will double the animation's speed. A negative value can be used to reverse the animation. This
     * value can be changed without causing the animation to restart.
     */
    playbackRate: number;
    /** Gets and sets the current animation time. */
    get currentTime(): CSSNumberish;
    set currentTime(time: number);
    connectedCallback(): void;
    disconnectedCallback(): void;
    private handleAnimationFinish;
    private handleAnimationCancel;
    private handleSlotChange;
    private createAnimation;
    private destroyAnimation;
    handleAnimationChange(): void;
    handlePlayChange(): boolean;
    handlePlaybackRateChange(): void;
    /** Clears all keyframe effects caused by this animation and aborts its playback. */
    cancel(): void;
    /** Sets the playback time to the end of the animation corresponding to the current playback direction. */
    finish(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-animation': WaAnimation;
    }
}
