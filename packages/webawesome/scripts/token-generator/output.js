/**
 * Token output generation
 */

/**
 * Resolves a variable reference by looking it up in the variable maps
 *
 * @param {string} varName - Variable name like {--wa-space-scale}
 * @param {Map} baseVariables - Base theme variables
 * @param {Map} lightVariables - Light theme variables
 * @param {Map} darkVariables - Dark theme variables
 * @param {Set} visited - Set of visited variables to prevent circular references
 * @returns {string|number|null} Resolved value or null if not found
 */
function resolveVariableReference(varName, baseVariables, lightVariables, darkVariables, visited = new Set()) {
  // Remove curly braces
  const cleanVarName = varName.replace(/[{}]/g, '');

  // Prevent circular references
  if (visited.has(cleanVarName)) {
    return null;
  }
  visited.add(cleanVarName);

  // Look up in base, light, then dark
  const varData = baseVariables.get(cleanVarName) || lightVariables.get(cleanVarName) || darkVariables.get(cleanVarName);

  if (!varData) {
    return null;
  }

  const value = varData.$value;

  // If the value itself is a reference, resolve it recursively
  if (typeof value === 'string' && value.includes('{')) {
    const refMatch = value.match(/^\{([^}]+)\}$/);
    if (refMatch) {
      return resolveVariableReference(refMatch[1], baseVariables, lightVariables, darkVariables, visited);
    }
  }

  return value;
}

/**
 * Attempts to resolve calc() or round() expressions
 * Converts em/rem units to pixels and evaluates if possible
 *
 * @param {string} value - The value that may contain calc() or round()
 * @param {Map} baseVariables - Base theme variables
 * @param {Map} lightVariables - Light theme variables
 * @param {Map} darkVariables - Dark theme variables
 * @returns {string|number} Resolved value or original if can't resolve
 */
function resolveCalcExpression(value, baseVariables, lightVariables, darkVariables) {
  if (typeof value !== 'string' || (!value.includes('calc(') && !value.includes('round('))) {
    return value;
  }

  const BASE_PIXEL_VALUE = 16;

  // Normalize whitespace for easier parsing (collapse newlines and multiple spaces)
  const normalizedValue = value.replace(/\s+/g, ' ').trim();

  let expression = normalizedValue;
  let isRoundFunction = false;

  // Handle special case: calc(round(expression), unit) - nested and reversed from CSS
  const calcRoundWithUnitMatch = normalizedValue.match(/^calc\(round\(([^)]+)\),\s*(.+)\)$/);
  if (calcRoundWithUnitMatch) {
    // This is calc(round(expression), unit) - extract just the inner expression
    expression = calcRoundWithUnitMatch[1].trim();
    isRoundFunction = true;
  } else {
    // Handle special case: round(expression), unit format (comma outside round())
    const roundWithUnitOutsideMatch = normalizedValue.match(/^round\(([^)]+)\),\s*(.+)$/);
    if (roundWithUnitOutsideMatch) {
      // This is round(expression), unit - extract just the expression
      expression = roundWithUnitOutsideMatch[1].trim();
      isRoundFunction = true;
    } else {
      // Handle special case: round(expression, unit) format (comma inside round())
      // Use a more careful regex that handles nested parentheses
      const roundMatch = normalizedValue.match(/^round\(([\s\S]+)\)$/);
      if (roundMatch) {
        const content = roundMatch[1];
        // Find the last comma that's not inside nested parentheses
        let depth = 0;
        let commaIndex = -1;
        for (let i = content.length - 1; i >= 0; i--) {
          if (content[i] === ')') depth++;
          else if (content[i] === '(') depth--;
          else if (content[i] === ',' && depth === 0) {
            commaIndex = i;
            break;
          }
        }

        if (commaIndex > -1) {
          // Has a comma - round(expression, unit) format
          expression = content.substring(0, commaIndex).trim();
          isRoundFunction = true;
        } else {
          // No comma - just round(expression)
          expression = content.trim();
          isRoundFunction = true;
        }
      } else {
        // Extract the main expression (calc)
        const calcMatch = normalizedValue.match(/^calc\((.+)\)$/);

        if (calcMatch) {
          expression = calcMatch[1];
        } else {
          return value;
        }
      }
    }
  }

  // Find all variable references
  const varRefs = expression.match(/\{[^}]+\}/g);

  // Resolve variable references if any
  if (varRefs) {
    let resolvedExpression = expression;
    for (const varRef of varRefs) {
      let resolvedValue = resolveVariableReference(varRef, baseVariables, lightVariables, darkVariables);

      // If the resolved value itself contains calc/round, resolve that too
      if (typeof resolvedValue === 'string' && (resolvedValue.includes('calc(') || resolvedValue.includes('round('))) {
        resolvedValue = resolveCalcExpression(resolvedValue, baseVariables, lightVariables, darkVariables);
      }

      // If we can't resolve or it's not a number, keep the original
      if (resolvedValue === null || (typeof resolvedValue !== 'number' && isNaN(parseFloat(resolvedValue)))) {
        return value;
      }

      // Replace the variable reference with its value
      resolvedExpression = resolvedExpression.replace(varRef, String(resolvedValue));
    }
    expression = resolvedExpression;
  }

  // Convert em and rem units to pixels (1em = 1rem = 16px)
  expression = expression
    .replace(/(\d*\.?\d+)em\b/g, (_, num) => String(parseFloat(num) * BASE_PIXEL_VALUE))
    .replace(/(\d*\.?\d+)rem\b/g, (_, num) => String(parseFloat(num) * BASE_PIXEL_VALUE));

  // Try to evaluate the expression
  try {
    // Handle nested structures
    let cleanExpression = expression;

    // Handle: round(calc(...), unit) or calc(round(...), unit) or calc(round(...))
    // Extract the innermost mathematical expression
    const calcRoundMatch = expression.match(/(?:calc|round)\((?:calc|round)\(([^)]+)\)/);
    if (calcRoundMatch) {
      cleanExpression = calcRoundMatch[1]; // Get the innermost expression
    } else {
      // Remove calc() and round() wrappers
      cleanExpression = cleanExpression
        .replace(/round\(([^,)]+)(?:,\s*[^)]+)?\)/g, '$1')
        .replace(/calc\(([^)]+)\)/g, '$1');
    }

    cleanExpression = cleanExpression.trim();
    const result = new Function(`return ${cleanExpression}`)();

    if (!isNaN(result)) {
      return Math.round(result);
    }
  } catch (error) {
    // If evaluation fails, return original
  }

  return value;
}

/**
 * Generates the tokens.json structure from parsed variables
 *
 * @param {Object} variables - Parsed variables object
 * @param {Map} variables.baseVariables - Base theme variables
 * @param {Map} variables.lightVariables - Light theme variables
 * @param {Map} variables.darkVariables - Dark theme variables
 * @returns {Object} Tokens JSON structure
 */
export function generateTokensJSON({ baseVariables, lightVariables, darkVariables }) {
  const processMap = (variables) => {
    return Object.fromEntries(
      [...variables].map(([varName, varData]) => {
        const { $selector, ...cleanVarData } = varData;

        // Try to resolve calc or round expressions
        if (typeof cleanVarData.$value === 'string' &&
            (cleanVarData.$value.includes('calc(') || cleanVarData.$value.includes('round('))) {
          cleanVarData.$value = resolveCalcExpression(
            cleanVarData.$value,
            baseVariables,
            lightVariables,
            darkVariables
          );
        }        return [varName, cleanVarData];
      })
    );
  };

  const tokenSets = {
    Base: processMap(baseVariables),
    Light: processMap(lightVariables),
    Dark: processMap(darkVariables)
  };

  return {
    ...tokenSets,
    $themes: [],
    $metadata: {
      tokenSetOrder: ['Base', 'Light', 'Dark'],
      activeThemes: [],
      activeSets: ['Base', 'Light', 'Dark']
    }
  };
}
