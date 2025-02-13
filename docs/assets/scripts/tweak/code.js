/**
 * Get import code for remixed themes and tweaked palettes.
 */
import { selectors, urls } from './data.js';

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

export function theme(base, params, options) {
  let ret = [];

  if (base) {
    ret.push(urls.theme(base));
  }

  ret.push(
    ...Object.entries(params)
      .filter(([aspect, id]) => Boolean(id))
      .map(([aspect, id]) => urls[aspect](id)),
  );

  return ret.map(url => cssImport(url, options)).join('\n');
}

export function palette(paletteId, tweaks, options) {
  let imports = [];

  if (paletteId) {
    imports.push(urls.palette(paletteId));
  }

  let css = '';

  if (tweaks) {
    let { hueShifts, chromaScale = 1 } = tweaks;
    let declarations = [];

    if (chromaScale !== 1) {
      declarations.push(`--wa-chroma-scale: ${chromaScale};`);
    }

    if (hueShifts || chromaScale !== 1) {
      let element = document.querySelector(`.wa-palette-${paletteId}`) ?? document.documentElement;
      let cs = getComputedStyle(element);

      for (let hue in hueShifts) {
        let shift = hueShifts[hue];

        if ((!shift && chromaScale === 1) || hue === 'orange') {
          continue;
        }

        let shiftCode = shift > 0 ? `+ ${shift}` : `- ${-shift}`;
        let c = chromaScale === 1 ? 'c' : `calc(c * var(--wa-chroma-scale))`;
        let h = shift ? `calc(h ${shiftCode})` : 'h';
        declarations.push(`--wa-color-${hue}-tweak: l ${c} ${h});`);

        for (let suffix of ['', '-05', '-10', '-20', '-30', '-40', '-50', '-60', '-70', '-80', '-90', '-95']) {
          let baseColor = cs.getPropertyValue(`--wa-color-${hue}${suffix}`);
          // Work around https://bugs.webkit.org/show_bug.cgi?id=287637
          let colorSpace = ['-95', '-90'].includes(suffix) ? '  lch' : 'oklch';
          let value = `${colorSpace}(from ${baseColor.padEnd(7)} var(--wa-color-${hue}-tweak))`;
          suffix = (suffix + ':').padEnd(4);
          declarations.push(`--wa-color-${hue}${suffix} ${value};`);
        }

        declarations.push('');
      }
    }

    if (declarations.length > 0) {
      css += cssRule(selectors.palette(paletteId), declarations);
    }
  }

  let ret = imports.map(url => cssImport(url, options)).join('\n');

  if (css) {
    ret += `\n\n${cssLiteral(css, options)}`;
  }

  return ret;
}

export function cssRule(selector, declarations, { indent = '  ' } = {}) {
  selector = Array.isArray(selector) ? selector.flat().join(',\n') : selector;
  declarations = Array.isArray(declarations) ? declarations.flat() : declarations;
  declarations = declarations.map(declaration => indent + declaration.trim()).join('\n');
  return `${selector} {\n${declarations.trimEnd()}\n}`;
}
