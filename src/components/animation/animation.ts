import WaAnimation from './animation.component.js';

export * from './animation.component.js';
export default WaAnimation;

WaAnimation.define('wa-animation');

declare global {
  interface HTMLElementTagNameMap {
    'wa-animation': WaAnimation;
  }
}
