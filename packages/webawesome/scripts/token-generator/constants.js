/**
 * Constants for CSS token generation
 */

export const BASE_PIXEL_VALUE = 16; // Base pixel value for rem conversion (1rem = 16px)

// Regular expressions for parsing
export const CSS_IMPORT_REGEX = /@import\s+url\(['"]?([^'"\)]+)['"]?\);/g;
export const CSS_VAR_REGEX = /--[\w-]+:\s*([^;]+);/g;
export const CSS_VAR_REFERENCE_REGEX = /var\(([^)]+)\)/g;
export const CALCULATION_REGEX = /calc\(([^)]+)\)/g;
export const ROUND_REGEX = /round\(([^)]+)\)/g;
export const SELECTOR_REGEX = /([^{]+?)\s*{([^}]+)}/gs;

// Selector patterns for theme detection
export const LIGHT_MODE_SELECTORS = [
  ':where(:root)',
  '.wa-theme-default',
  '.wa-light',
  '.wa-dark .wa-invert',
  '.wa-light .wa-theme-default',
  '.wa-dark .wa-theme-default.wa-invert',
  '.wa-dark .wa-theme-default .wa-invert'
];

export const DARK_MODE_SELECTORS = [
  '.wa-dark',
  '.wa-invert',
  '.wa-dark .wa-theme-default',
  '.wa-light .wa-theme-default.wa-invert',
  '.wa-light .wa-theme-default .wa-invert'
];
