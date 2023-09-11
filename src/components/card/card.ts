import WaCard from './card.component.js';

export * from './card.component.js';
export default WaCard;

WaCard.define('wa-card');

declare global {
  interface HTMLElementTagNameMap {
    'wa-card': WaCard;
  }
}
