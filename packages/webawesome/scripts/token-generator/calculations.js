/**
 * Utilities for unit conversion and calculation evaluation
 */

import { BASE_PIXEL_VALUE, CSS_VAR_REFERENCE_REGEX } from './constants.js';

/**
 * Evaluates a simple mathematical expression
 * Handles unit conversion (rem/em/px) and returns numeric result
 *
 * @param {string} expression - The expression to evaluate
 * @returns {number|null} The calculated value or null if evaluation fails
 */
export function evaluateSimpleExpression(expression) {
  const hasRem = expression.includes('rem');
  const hasEm = expression.includes('em');

  // Convert units to pixels for evaluation
  const withConvertedUnits = expression
    .replace(/(\d*\.?\d+)rem/g, (_, num) => String(parseFloat(num) * BASE_PIXEL_VALUE))
    .replace(/(\d*\.?\d+)em/g, (_, num) => String(parseFloat(num) * BASE_PIXEL_VALUE))
    .replace(/(\d*\.?\d+)px/g, (_, num) => String(parseFloat(num)));

  try {
    const result = new Function(`return ${withConvertedUnits}`)();
    const calculatedValue = Math.round(result * 10000) / 10000;

    // For rem values, convert back from pixels
    if (hasRem || hasEm) {
      return calculatedValue / BASE_PIXEL_VALUE;
    }

    return calculatedValue;
  } catch (error) {
    return null;
  }
}

/**
 * Converts var() references to curly brace syntax {--variable}
 *
 * @param {string} expression - Expression containing var() references
 * @returns {string} Expression with curly brace syntax
 */
export function convertVarReferencesToCurlyBraces(expression) {
  if (!expression.includes('var(')) {
    return expression;
  }

  return expression.replace(CSS_VAR_REFERENCE_REGEX, (_, varName) => {
    const trimmedVarName = varName.trim().split(',')[0].trim();
    return `{${trimmedVarName}}`;
  });
}

/**
 * Evaluates calc() expressions following the instructions:
 * - Dimension values in rem units should be converted to pixels (1rem = 16px)
 * - Round to nearest whole number after conversion
 * - Resolve calculations and return rounded pixel values
 *
 * @param {string} expression - The calc expression to evaluate
 * @returns {string|number} Evaluated value or original expression if can't evaluate
 */
export function evaluateCalc(expression) {
  // First convert any var() references to curly braces
  let processedExpression = convertVarReferencesToCurlyBraces(expression);

  // Remove calc() wrapper if present
  let calc = processedExpression.replace(/calc\((.*)\)/, '$1').trim();

  // Handle multiplication with variables and units
  if (calc.includes('*')) {
    const [part1, part2] = calc.split('*').map(part => part.trim());

    if (part1.includes('{') && part2.match(/\d+(\.\d+)?rem$/)) {
      // Case: {variable} * Xrem - convert rem to pixels
      const remValue = parseFloat(part2);
      if (!isNaN(remValue)) {
        const pxValue = remValue * BASE_PIXEL_VALUE;
        return pxValue.toString();
      }
    } else if (part2.includes('{') && part1.match(/\d+(\.\d+)?rem$/)) {
      // Case: Xrem * {variable} - convert rem to pixels
      const remValue = parseFloat(part1);
      if (!isNaN(remValue)) {
        const pxValue = remValue * BASE_PIXEL_VALUE;
        return pxValue.toString();
      }
    } else if (part2 === '1rem' && part1.includes('{')) {
      // Case: {variable} * 1rem
      return part1;
    } else if (part1 === '1rem' && part2.includes('{')) {
      // Case: 1rem * {variable}
      return part2;
    } else if (!part1.includes('{') && !part2.includes('{')) {
      // Case: numeric * numeric with units - convert rem to px first
      let num1 = parseFloat(part1);
      let num2 = parseFloat(part2);

      // Convert rem values to pixels
      if (part1.includes('rem')) {
        num1 = num1 * BASE_PIXEL_VALUE;
      }
      if (part2.includes('rem')) {
        num2 = num2 * BASE_PIXEL_VALUE;
      }

      if (!isNaN(num1) && !isNaN(num2)) {
        return Math.round(num1 * num2);
      }
    }
  }

  // For expressions with units at the end
  const unitMatch = calc.match(/(.*?)(rem|em|px|\%)$/);
  if (unitMatch && !calc.includes('{')) {
    const [, expression] = unitMatch;
    const result = evaluateSimpleExpression(expression);
    if (result !== null) {
      // Convert to pixels and round
      const pxValue = result * BASE_PIXEL_VALUE;
      return Math.round(pxValue);
    }
  }

  // For other expressions without units or variables
  if (!calc.includes('{')) {
    const result = evaluateSimpleExpression(calc);
    if (result !== null) {
      return Math.round(result);
    }
  }

  // Keep calc() for anything else
  return `calc(${calc})`;
}

/**
 * Evaluates round() expressions
 * Follows instructions: round dimension values to nearest whole number in pixels
 *
 * @param {string} expression - The round expression to evaluate
 * @returns {string|number} Evaluated value or original expression if can't evaluate
 */
export function evaluateRound(expression) {
  // Extract round() with proper handling of nested parentheses
  if (!expression.startsWith('round(')) {
    return expression;
  }

  // Find the matching closing parenthesis for round()
  let depth = 0;
  let start = 6; // After 'round('
  let valueEnd = -1;

  for (let i = start; i < expression.length; i++) {
    if (expression[i] === '(') depth++;
    if (expression[i] === ')') {
      if (depth === 0) {
        valueEnd = i;
        break;
      }
      depth--;
    } else if (expression[i] === ',' && depth === 0) {
      valueEnd = i;
      break;
    }
  }

  if (valueEnd === -1) return expression;

  let value = expression.substring(start, valueEnd).trim();
  let unit = '1px';

  // Check if there's a unit parameter after the comma
  if (expression[valueEnd] === ',') {
    const afterComma = expression.substring(valueEnd + 1);
    const unitMatch = afterComma.match(/^\s*([^)]+)\)/);
    if (unitMatch) {
      unit = unitMatch[1].trim();
    }
  }

  // Handle nested calc() expressions
  if (value.startsWith('calc(') && value.endsWith(')')) {
    value = value.substring(5, value.length - 1).trim();
  }

  // Handle variable references
  value = convertVarReferencesToCurlyBraces(value);

  // If there are variables, keep the round() wrapper
  if (value.includes('{')) {
    return `round(${value}, ${unit})`;
  }

  // Try to evaluate the expression
  const numValue = evaluateSimpleExpression(value);
  if (numValue !== null) {
    // Convert to pixels first (if value has rem/em it's already converted)
    const valueInPx = numValue * BASE_PIXEL_VALUE;

    // Parse unit value and convert to pixels if needed
    const unitValue = unit.endsWith('rem') ?
      parseFloat(unit) * BASE_PIXEL_VALUE :
      parseFloat(unit);

    if (!isNaN(valueInPx) && !isNaN(unitValue)) {
      // Round to the nearest unit value
      const rounded = Math.round(valueInPx / unitValue) * unitValue;
      // Return rounded pixel value
      return Math.round(rounded);
    }
  }

  return `round(${value}, ${unit})`;
}

/**
 * Converts a numeric value to its final format
 * Dimensions are stored as numbers (pixels), percentages keep the % suffix
 *
 * @param {string} value - The value to convert
 * @param {string} type - The type of the value
 * @returns {string|number} Converted value
 */
export function convertNumericValue(value, type) {
  if (typeof value === 'string' && !value.includes('color-mix(')) {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      // For dimensions, store the numeric value without units (in pixels)
      if (type === 'dimension') {
        if (value.endsWith('%')) {
          return `${numValue}%`; // Keep % units for percentages
        } else if (value.endsWith('rem') || value.endsWith('em')) {
          // Convert rem/em to pixels and round
          return Math.round(numValue * BASE_PIXEL_VALUE);
        } else {
          // Already in pixels or unitless, round it
          return Math.round(numValue);
        }
      } else if (!value.match(/[a-z%]+$/)) {
        return String(numValue); // Keep as string for non-dimension numbers
      }
    }
  }
  return value;
}
