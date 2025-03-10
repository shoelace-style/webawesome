import { stringifyColor } from './util.js';
import { cssImport, cssLiteral, cssRule } from '/assets/scripts/tweak/code.js';
import { selectors, tints, urls } from '/assets/scripts/tweak/data.js';

export function getPaletteCode({ base, slug = base, colors, tweaked, roles, ...options }) {
  let imports = [];

  if (base && options.imports !== false && !tweaked.seedColors) {
    imports.push(urls.palette(base));
  }

  let ret = imports.map(url => cssImport(url, options)).join('\n');

  let declarations = [];
  let prefix = options.prefix ?? 'wa-color';

  let css = '';

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

      let scale = colors[hue];

      for (let tint of tints) {
        let color = scale[tint];
        let stringified = stringifyColor(color);
        declarations.push(`--${prefix}-${hue}-${tint}: ${stringified};`);
      }

      let coreTint = scale.maxChromaTint;
      if (coreTint) {
        declarations.push(
          `--${prefix}-${hue}: var(--${prefix}-${hue}-${coreTint});`,
          `--${prefix}-${hue}-key: ${coreTint};`,
        );
      }

      declarations.push('');
    }
  }

  if (roles) {
    for (let role in roles) {
      let hue = roles[role];
      for (let suffix of [...tints.map(t => '-' + t), '', '-key']) {
        declarations.push(`--${prefix}-${role}${suffix}: var(--${prefix}-${hue}${suffix});`);
      }

      declarations.push('');
    }
  }

  if (declarations.length > 0) {
    let selector = options.selector ?? selectors.palette(slug);
    css += cssRule(selector, declarations);
  }

  if (css) {
    if (imports.length) {
      ret += '\n\n';
    }

    ret += `${cssLiteral(css, options)}`;
  }

  return ret;
}

export default getPaletteCode;
