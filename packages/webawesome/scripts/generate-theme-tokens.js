/**
 * Theme token generator
 * Parses CSS variables from theme files and generates a tokens.json file
 *
 * This script follows these rules:
 * - Dimension values in rem units are converted to pixels (1rem = 16px)
 * - Values are rounded to the nearest whole number after conversion
 * - Calculations are resolved and output contains rounded pixel values
 * - Alias variables use curly brace syntax: {--variable-name}
 */

import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readCSSFile, resolveImports, parseVariables } from './token-generator/parser.js';
import { generateTokensJSON } from './token-generator/output.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const INPUT_DIR = join(__dirname, '../src/styles');
const ENTRY_FILE = join(INPUT_DIR, 'themes/default.css');
const OUTPUT_FILE = join(__dirname, '../tokens.json');

/**
 * Main execution function
 * Orchestrates the token generation process
 */
async function main() {
  try {
    console.log('Reading CSS files...');
    const content = await readCSSFile(ENTRY_FILE);

    console.log('Resolving imports...');
    const resolvedContent = await resolveImports(content, ENTRY_FILE);

    console.log('Parsing variables...');
    const variables = parseVariables(resolvedContent);

    console.log('Generating tokens JSON...');
    const tokensJSON = generateTokensJSON(variables);

    console.log('Writing output file...');
    await fs.writeFile(
      OUTPUT_FILE,
      JSON.stringify(tokensJSON, null, 2),
      'utf-8'
    );

    console.log(`✓ Successfully generated tokens at ${OUTPUT_FILE}`);
    console.log(`  Base variables: ${variables.baseVariables.size}`);
    console.log(`  Light variables: ${variables.lightVariables.size}`);
    console.log(`  Dark variables: ${variables.darkVariables.size}`);
  } catch (error) {
    console.error('✗ Error generating tokens:', error);
    process.exit(1);
  }
}

main();