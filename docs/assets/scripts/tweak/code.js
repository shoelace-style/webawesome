/**
 * Get import code for remixed themes and tweaked palettes.
 */
import { urls } from './data.js';

export function cssImport(url, options = {}) {
  let { language = 'html', cdnUrl = '/dist/', attributes } = options;
  url = cdnUrl + url;

  if (language === 'css') {
    return `@import url('${url}');`;
  } else {
    attributes = attributes ? ` ${attributes}` : '';
    return `<link rel="stylesheet" href="${url}"${attributes} />`;
  }
}

export function cssLiteral(value, options = {}) {
  let { language = 'html' } = options;

  if (language === 'css') {
    return value;
  } else {
    return `<style>\n${value}\n</style>`;
  }
}

// Params in correct order
export const themeParams = ['colors', 'palette', 'brand', 'typography'];

export function getThemeCode(base, params, options) {
  let ret = [];

  if (base) {
    ret.push(urls.theme(base));
  }

  for (let aspect of themeParams) {
    let value = params[aspect];

    if (value) {
      ret.push(urls[aspect](value));
    }
  }

  return ret.map(url => cssImport(url, options)).join('\n');
}

export function cssRule(selector, declarations, { indent = '  ' } = {}) {
  selector = Array.isArray(selector) ? selector.flat().join(',\n') : selector;
  declarations = Array.isArray(declarations) ? declarations.flat() : declarations;
  declarations = declarations.map(declaration => indent + declaration.trim()).join('\n');
  return `${selector} {\n${declarations.trimEnd()}\n}`;
}
