/**
 * CSS parsing utilities
 */

import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import {
  CSS_IMPORT_REGEX,
  CSS_VAR_REGEX,
  SELECTOR_REGEX,
  LIGHT_MODE_SELECTORS,
  DARK_MODE_SELECTORS
} from './constants.js';
import { guessType } from './type-inference.js';
import {
  evaluateCalc,
  evaluateRound,
  convertVarReferencesToCurlyBraces,
  convertNumericValue
} from './calculations.js';

/**
 * Reads a CSS file from the filesystem
 *
 * @param {string} filePath - Absolute path to the CSS file
 * @returns {Promise<string>} File contents
 */
export async function readCSSFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return '';
  }
}

/**
 * Resolves a relative path to an absolute path
 *
 * @param {string} basePath - Base file path
 * @param {string} relativePath - Relative path to resolve
 * @returns {string} Absolute path
 */
export function resolveRelativePath(basePath, relativePath) {
  const cleanPath = relativePath.replace(/['"\`]/g, '');
  return join(dirname(basePath), cleanPath);
}

/**
 * Recursively resolves @import statements in CSS
 *
 * @param {string} content - CSS content
 * @param {string} filePath - Path to the CSS file
 * @returns {Promise<string>} Resolved CSS content with imports inlined
 */
export async function resolveImports(content, filePath) {
  let resolvedContent = content;
  const imports = [...content.matchAll(CSS_IMPORT_REGEX)];

  for (const match of imports) {
    const importPath = match[1];
    const absolutePath = resolveRelativePath(filePath, importPath);
    const importedContent = await readCSSFile(absolutePath);
    const importedResolved = await resolveImports(importedContent, absolutePath);
    resolvedContent = resolvedContent.replace(match[0], importedResolved);
  }

  return resolvedContent;
}

/**
 * Processes a CSS variable declaration
 * Applies calculation evaluation and type inference
 *
 * @param {RegExpMatchArray} match - Regex match for the variable
 * @param {string} selector - CSS selector containing the variable
 * @returns {Object} Processed variable data
 */
export function processVariable(match, selector) {
  const [, varValue] = match;
  const varName = match[0].split(':')[0].trim();
  const fullMatch = match[0];

  // Handle hex color values specially
  const hexMatch = varValue.match(/#[0-9a-fA-F]{5,6}/);
  if (hexMatch && varName.includes('color')) {
    return {
      varName,
      varData: {
        $value: hexMatch[0],
        $type: 'color',
        $description: ''
      }
    };
  }

  const cleanValue = varValue.replace(/\/\*[^*]*\*\//g, '').replace(/;$/, '').trim();

  // Process the value
  let finalValue = cleanValue;

  // Convert var() to curly braces first
  finalValue = convertVarReferencesToCurlyBraces(finalValue);

  // Try to evaluate any calculations that don't contain variables
  if (!finalValue.includes('{')) {
    if (finalValue.includes('calc(')) {
      finalValue = evaluateCalc(finalValue);
    } else if (finalValue.includes('round(')) {
      finalValue = evaluateRound(finalValue);
    }
  } else if (finalValue.includes('calc(')) {
    // Special handling for calc expressions with variables
    finalValue = finalValue.replace(/calc\((.*)\)/, '$1').trim();

    if (finalValue.includes('*')) {
      const [part1, part2] = finalValue.split('*').map(part => part.trim());
      if (part2.endsWith('rem') && !part2.includes('{')) {
        // Case: [value|variable] * Xrem
        const remValue = parseFloat(part2);
        if (!isNaN(remValue)) {
          finalValue = `calc(${part1} * ${remValue * 16})`;
        }
      } else if (part1.endsWith('rem') && !part1.includes('{')) {
        // Case: Xrem * [value|variable]
        const remValue = parseFloat(part1);
        if (!isNaN(remValue)) {
          finalValue = `calc(${remValue * 16} * ${part2})`;
        }
      } else if (part1.match(/\d+(\.\d+)?rem$/) && part2.match(/\d+(\.\d+)?rem$/)) {
        // Case: Xrem * Yrem
        const value1 = parseFloat(part1) * 16;
        const value2 = parseFloat(part2) * 16;
        finalValue = value1 * value2;
      }
    }
  }

  // Determine type and convert numeric values
  const type = guessType(varName, finalValue);
  finalValue = convertNumericValue(finalValue, type);

  // Extract description from comment
  let description = '';
  const commentMatch = fullMatch.match(/\/\*([^*]*)\*\//);
  if (commentMatch) {
    description = commentMatch[1].trim();
  }

  return {
    varName,
    varData: {
      $value: finalValue,
      $type: type,
      $description: description
    }
  };
}

/**
 * Checks if a selector is a light mode selector
 *
 * @param {string[]} selectorParts - Normalized selector parts
 * @returns {boolean} True if light mode selector
 */
export function isLightModeSelector(selectorParts) {
  return selectorParts.some(part => LIGHT_MODE_SELECTORS.includes(part));
}

/**
 * Checks if a selector is a dark mode selector
 *
 * @param {string[]} selectorParts - Normalized selector parts
 * @returns {boolean} True if dark mode selector
 */
export function isDarkModeSelector(selectorParts) {
  return selectorParts.some(part => DARK_MODE_SELECTORS.includes(part));
}

/**
 * Parses CSS content to extract variables organized by theme
 * Uses a three-pass approach:
 * 1. Process scale and dimension variables
 * 2. Process color palette variables
 * 3. Process theme-specific variables
 *
 * @param {string} content - Resolved CSS content
 * @returns {Object} Variables organized by base, light, and dark themes
 */
export function parseVariables(content) {
  const baseVariables = new Map();
  const lightVariables = new Map();
  const darkVariables = new Map();
  const allVariables = new Map();  // Combined map for variable resolution
  const selectorMatches = [...content.matchAll(SELECTOR_REGEX)];

  // First pass: Process scale and dimension variables first
  for (const selectorMatch of selectorMatches) {
    const [, selector, declarations] = selectorMatch;
    const varMatches = [...declarations.matchAll(CSS_VAR_REGEX)];

    for (const match of varMatches) {
      const varName = match[0].split(':')[0].trim();

      // Process scale and dimension variables first
      if (varName.includes('-scale') || varName.match(/-(space|border|radius|width|height)-/)) {
        const { varName: processedVarName, varData } = processVariable(match, selector);
        baseVariables.set(processedVarName, varData);
        allVariables.set(processedVarName, varData.$value);
      }
    }
  }

  // Second pass: Process color palette variables
  for (const selectorMatch of selectorMatches) {
    const [, selector, declarations] = selectorMatch;
    const varMatches = [...declarations.matchAll(CSS_VAR_REGEX)];

    for (const match of varMatches) {
      const varName = match[0].split(':')[0].trim();

      // Only process color palette variables in this pass
      if (!varName.match(/--wa-color-[a-z]+-\d+$/)) {
        continue;
      }

      const { varName: processedVarName, varData } = processVariable(match, selector);
      baseVariables.set(processedVarName, varData);
      allVariables.set(processedVarName, varData.$value);
    }
  }

  // Third pass: Process theme variables
  for (const selectorMatch of selectorMatches) {
    const [, selector, declarations] = selectorMatch;
    const normalizedSelector = selector.replace(/\s+/g, ' ').trim();
    const selectorParts = normalizedSelector.split(',').map(part => part.trim());

    // Check if this is a light or dark mode selector group
    const isLightGroup = isLightModeSelector(selectorParts);
    const isDarkGroup = isDarkModeSelector(selectorParts);

    const varMatches = [...declarations.matchAll(CSS_VAR_REGEX)];
    for (const match of varMatches) {
      const { varName, varData } = processVariable(match, selector);

      // Skip variables that were already processed
      if (baseVariables.has(varName) || lightVariables.has(varName) || darkVariables.has(varName)) {
        continue;
      }

      // Light theme variables
      if (isLightGroup && !lightVariables.has(varName)) {
        lightVariables.set(varName, varData);
        allVariables.set(varName, varData.$value);
      }

      // Dark theme variables
      if (isDarkGroup && !darkVariables.has(varName)) {
        darkVariables.set(varName, varData);
        allVariables.set(varName, varData.$value);
      }
    }
  }

  return {
    baseVariables,
    lightVariables,
    darkVariables,
    allVariables
  };
}
