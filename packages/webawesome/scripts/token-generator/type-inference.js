/**
 * Type inference for CSS variables
 */

/**
 * Guesses the type of a CSS variable based on its name and value
 *
 * @param {string} name - The variable name
 * @param {string|number} value - The variable value
 * @returns {string} The guessed type
 */
export function guessType(name, value) {
  const stringValue = String(value);

  // Type inference based on variable name patterns
  if (name.includes('color')) return 'color';
  if (name.includes('space') || name.includes('size') || name.includes('width') || name.includes('height') || name.includes('offset')) return 'dimension';
  if (name.includes('radius')) return 'borderRadius';
  if (name.includes('shadow')) return 'shadow';
  if (name.includes('font-family')) return 'fontFamilies';
  if (name.includes('font-weight')) return 'fontWeights';
  if (name.includes('line-height')) return 'lineHeight';
  if (name.includes('transition')) return 'transition';
  if (name.includes('easing')) return 'easing';
  if (name.includes('scale')) return 'number';

  // Type inference based on value patterns
  if (stringValue.includes('color-mix') || stringValue.includes('#') || stringValue.includes('rgb') || stringValue.includes('hsl') || stringValue.includes('oklch')) return 'color';
  if (stringValue.includes('px') || stringValue.includes('rem') || stringValue.includes('em')) return 'dimension';
  if (stringValue.includes('ms')) return 'duration';
  if (!isNaN(value)) return 'number';

  return 'unknown';
}
