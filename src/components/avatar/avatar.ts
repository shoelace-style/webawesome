import WaAvatar from './avatar.component.js';

export * from './avatar.component.js';
export default WaAvatar;

WaAvatar.define('wa-avatar');

declare global {
  interface HTMLElementTagNameMap {
    'wa-avatar': WaAvatar;
  }
}
