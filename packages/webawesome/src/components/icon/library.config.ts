//
// Default icon family and variant. This is a leaf module so the built-in libraries can read it without importing
// library.ts, which imports them.
//
let defaultIconFamily = '';
let defaultIconVariant = '';

/** @internal Sets the default icon family and, optionally, the default variant. */
export function setDefaultIconFamilyAndVariant(family: string, variant?: string) {
  defaultIconFamily = family;
  if (variant !== undefined) {
    defaultIconVariant = variant;
  }
}

/**
 * Gets the default icon family. Unless set with `setDefaultIconFamily()`, this is read from the first element with a
 * `data-fa-family` attribute, falling back to `classic`.
 */
export function getDefaultIconFamily() {
  if (!defaultIconFamily) {
    defaultIconFamily = document.querySelector('[data-fa-family]')?.getAttribute('data-fa-family') || 'classic';
  }
  return defaultIconFamily;
}

/**
 * Gets the default icon variant. Unless set with `setDefaultIconFamily()`, this is read from the first element with a
 * `data-fa-variant` attribute, falling back to `solid`.
 */
export function getDefaultIconVariant() {
  if (!defaultIconVariant) {
    defaultIconVariant = document.querySelector('[data-fa-variant]')?.getAttribute('data-fa-variant') || 'solid';
  }
  return defaultIconVariant;
}
