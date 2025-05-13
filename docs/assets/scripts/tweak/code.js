/**
 * Get import code for remixed themes and tweaked palettes.
 */
import { selectors, themeConfig } from '../../data/theming.js';
import { deepEach, deepGet } from '/assets/scripts/util/deep.js';

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
    return `<style${options.attributes ?? ''}>\n${value}\n</style>`;
  }
}

/**
 * Get code for a theme, including tweaks
 * @param {*} theme
 * @param {*} options
 * @returns
 */
export function getThemeCode(theme, options = {}) {
  let urls = [];
  let declarations = [];
  let id = options.id ?? theme.base ?? 'default';

  deepEach(themeConfig, (config, aspect, obj, path) => {
    if (!config?.default) {
      // We're not in a config object
      return;
    }

    let value = deepGet(theme, [...path, aspect]);

    if (!value && value !== 0) {
      return;
    }

    if (config.url) {
      // This is implemented by pulling in different CSS files
      urls.push(config.url(value));
    } else {
      if (config.cssProperty) {
        declarations.push(`${config.cssProperty}: ${value};`);
      }
    }
  });

  let ret = urls.map(url => cssImport(url, options)).join('\n');

  if (declarations.length > 0) {
    let cssCode = cssRule(selectors.theme(id), declarations, options);

    if (theme.icon?.kit) {
      let faKitAttribute = ` data-fa-kit-code="${theme.icon.kit}"`;
      options.attributes ??= '';
      options.attributes += faKitAttribute;
      cssCode =
        `/* Note: To use Font Awesome Pro icons,\n   set ${faKitAttribute} on the <link> (or any other) element */\n\n` +
        cssCode;
    }

    cssCode = cssLiteral(cssCode, options);

    if (ret) {
      ret += '\n\n' + cssCode;
    }
  }

  return ret;
}

export function cssRule(selector, declarations, { indent = '  ' } = {}) {
  selector = Array.isArray(selector) ? selector.flat().join(',\n') : selector;
  declarations = Array.isArray(declarations) ? declarations.flat() : declarations;
  declarations = declarations.map(declaration => indent + declaration.trim()).join('\n');
  return `${selector} {\n${declarations.trimEnd()}\n}`;
}
