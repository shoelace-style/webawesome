/** @type {import("prettier").Config} */
const config = {
  arrowParens: 'avoid',
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  bracketSameLine: false,
  jsxSingleQuote: false,
  printWidth: 120,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  organizeImportsSkipDestructiveCodeActions: true,
  plugins: ['prettier-plugin-organize-imports'],
};

export default config;
