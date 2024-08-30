import Component from '../../components/tab/tab.js';
/**
 * @summary Tabs are used inside [tab groups](/docs/components/tab-group) to represent and activate [tab panels](/docs/components/tab-panel).
 * @documentation https://backers.webawesome.com/docs/components/tab
 * @status stable
 * @since 2.0
 *
 * @slot - The tab's label.
 *
 * @cssproperty --active-tab-color - The color of the active tab's label.
 *
 * @csspart base - The component's base wrapper.
 * @csspart close-button - The close button, an `<wa-icon-button>`.
 * @csspart close-button__base - The close button's exported `base` part.
 */
declare const reactWrapper: import("@lit/react").ReactWebComponent<Component, {}>;
export default reactWrapper;
