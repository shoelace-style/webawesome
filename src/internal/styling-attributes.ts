export { default as appearanceStyles } from '../styles/utilities/appearance.css';
export { default as sizeStyles } from '../styles/utilities/size.css';
export { default as variantStyles } from '../styles/utilities/variants.css';

export type AppearanceAttribute =
  | 'outlined'
  | 'accent'
  | 'outlined accent'
  | 'accent outlined'
  | 'filled'
  | 'outlined filled'
  | 'filled outlined'
  | 'plain';

export type VariantAttribute = 'brand' | 'success' | 'neutral' | 'warning' | 'danger' | 'text';
export type SizeAttribute = 'small' | 'medium' | 'large';
