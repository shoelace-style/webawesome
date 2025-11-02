# Theme Token Generator

This module generates a `tokens.json` file from CSS theme files, following specific rules for unit conversion and calculation resolution.

## Structure

The token generator is split into modular components for better maintainability:

```
token-generator/
├── constants.js       # Regular expressions and configuration constants
├── calculations.js    # Unit conversion and calculation evaluation utilities
├── type-inference.js  # CSS variable type detection
├── parser.js          # CSS parsing and variable extraction
└── output.js          # Token JSON generation
```

## Rules

Based on `.github/instructions/css-variables.instructions.md`:

1. **Dimension values** in rem and em units are converted to pixels using `BASE_PIXEL_VALUE = 16` (1rem = 1em = 16px)
2. **Rounding** is applied to dimension values to the nearest whole number (after conversion to pixels)
3. **Calculations** are resolved and the JSON output contains rounded pixel values
4. **Alias variables** are referenced using curly braces: `{--variable-name}`

## Modules

### constants.js
Defines regular expressions, selector patterns, and configuration values.

### calculations.js
Handles mathematical operations and unit conversions:
- `evaluateSimpleExpression()` - Evaluates basic math with unit handling
- `evaluateCalc()` - Processes calc() expressions, converts rem to pixels
- `evaluateRound()` - Handles round() functions
- `convertVarReferencesToCurlyBraces()` - Converts var() to {--var} syntax
- `convertNumericValue()` - Converts values to their final format (rounded pixels)

### type-inference.js
Contains the `guessType()` function that infers CSS variable types based on:
- Variable name patterns (e.g., `-color`, `-space`, `-radius`)
- Value patterns (e.g., `#hex`, `rgb()`, `rem`, `px`)

### parser.js
Core CSS parsing functionality:
- `readCSSFile()` - Reads CSS files from filesystem
- `resolveImports()` - Recursively resolves @import statements
- `processVariable()` - Processes individual CSS variable declarations
- `parseVariables()` - Three-pass parsing strategy:
  1. Scale and dimension variables
  2. Color palette variables
  3. Theme-specific variables (light/dark)

### output.js
Generates the final tokens.json structure with proper metadata. Includes post-processing to:
- Resolve `calc()` expressions that reference other variables
- Evaluate expressions when all variable references resolve to numeric values
- Example: `calc({--wa-space-scale} * 12)` where `--wa-space-scale` is `1` resolves to `12`

## Usage

```bash
npm run tokens
```

Or directly:

```bash
node scripts/generate-theme-tokens.js
```

## Example

Input CSS:
```css
:root {
  --wa-space-xs: 0.5rem; /* 8px */
  --wa-color-brand: #ff0000;
  --wa-size-button: calc({--wa-space-xs} * 2); /* 16px */
}
```

Output JSON:
```json
{
  "Base": {
    "--wa-space-xs": {
      "$value": 8,
      "$type": "dimension",
      "$description": ""
    },
    "--wa-color-brand": {
      "$value": "#ff0000",
      "$type": "color",
      "$description": ""
    },
    "--wa-size-button": {
      "$value": "calc({--wa-space-xs} * 2)",
      "$type": "dimension",
      "$description": ""
    }
  }
}
```

## Maintenance

To add new functionality:
- **New calculation types**: Update `calculations.js`
- **New variable types**: Update `type-inference.js`
- **New CSS patterns**: Update `parser.js` and `constants.js`
- **Output format changes**: Update `output.js`
