import WaRating from './rating.component.js';

export * from './rating.component.js';
export default WaRating;

WaRating.define('wa-rating');

declare global {
  interface HTMLElementTagNameMap {
    'wa-rating': WaRating;
  }
}
