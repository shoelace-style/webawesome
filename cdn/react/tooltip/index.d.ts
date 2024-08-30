import Component from '../../components/tooltip/tooltip.js';
import { type EventName } from '@lit/react';
import type { WaShowEvent } from '../../events/events.js';
import type { WaAfterShowEvent } from '../../events/events.js';
import type { WaHideEvent } from '../../events/events.js';
import type { WaAfterHideEvent } from '../../events/events.js';
export type { WaShowEvent } from '../../events/events.js';
export type { WaAfterShowEvent } from '../../events/events.js';
export type { WaHideEvent } from '../../events/events.js';
export type { WaAfterHideEvent } from '../../events/events.js';
/**
 * @summary Tooltips display additional information based on a specific action.
 * @documentation https://backers.webawesome.com/docs/components/tooltip
 * @status stable
 * @since 2.0
 *
 * @dependency wa-popup
 *
 * @slot - The tooltip's default slot where any content should live. Interactive content should be avoided.
 *
 * @event wa-show - Emitted when the tooltip begins to show.
 * @event wa-after-show - Emitted after the tooltip has shown and all animations are complete.
 * @event wa-hide - Emitted when the tooltip begins to hide.
 * @event wa-after-hide - Emitted after the tooltip has hidden and all animations are complete.
 *
 * @csspart base - The component's base wrapper, an `<wa-popup>` element.
 * @csspart base__popup - The popup's exported `popup` part. Use this to target the tooltip's popup container.
 * @csspart base__arrow - The popup's exported `arrow` part. Use this to target the tooltip's arrow.
 * @csspart body - The tooltip's body where its content is rendered.
 *
 * @cssproperty --background-color - The tooltip's background color.
 * @cssproperty --border-radius - The radius of the tooltip's corners.
 * @cssproperty --content-color - The color of the tooltip's content.
 * @cssproperty --max-width - The maximum width of the tooltip before its content will wrap.
 * @cssproperty --padding - The padding within the tooltip.
 * @cssproperty --hide-delay - The amount of time to wait before hiding the tooltip when hovering.
 * @cssproperty --show-delay - The amount of time to wait before showing the tooltip when hovering.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {
    onWaShow: EventName<WaShowEvent>;
    onWaAfterShow: EventName<WaAfterShowEvent>;
    onWaHide: EventName<WaHideEvent>;
    onWaAfterHide: EventName<WaAfterHideEvent>;
}>;
export default reactWrapper;
