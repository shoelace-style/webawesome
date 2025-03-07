import { cssImport, cssLiteral, cssRule } from '/assets/scripts/tweak/code.js';
import { selectors, tints, urls } from '/assets/scripts/tweak/data.js';

export function getPaletteCode(paletteId, colors, tweaked, options = {}) {
  let imports = [];

  if (paletteId && options.imports !== false && !tweaked.seedColors) {
    imports.push(urls.palette(paletteId));
  }

  let css = '';
  let declarations = [];
  let prefix = options.prefix ?? 'wa-color';

  if (tweaked) {
    for (let hue in colors) {
      if (!tweaked.seedColors) {
        if (hue === 'gray') {
          if (!tweaked.grayChroma && !tweaked.grayColor) {
            continue;
          }
        } else if (!tweaked.chromaScale && !tweaked.hue?.[hue]) {
          continue;
        }
      }

      for (let tint of tints) {
        let color = colors[hue][tint];
        let stringified = color.toString({ format: color.inGamut('srgb') ? 'hex' : undefined });
        declarations.push(`--${prefix}-${hue}-${tint}: ${stringified};`);
      }

      declarations.push('');
    }

    if (declarations.length > 0) {
      let selector = options.selector ?? selectors.palette(paletteId);
      css += cssRule(selector, declarations);
    }
  }

  let ret = '';

  if (imports.length) {
    ret += imports.map(url => cssImport(url, options)).join('\n');

    if (css) {
      ret += '\n\n';
    }
  }

  if (css) {
    ret += `${cssLiteral(css, options)}`;
  }

  return ret;
}

export default getPaletteCode;
