/**
 * Get import code for remixed themes.
 */
export const urls = {
  colors: id => `styles/themes/${id}/color.css`,
  palette: id => `styles/color/${id}.css`,
  brand: id => `styles/brand/${id}.css`,
  typography: id => `styles/themes/${id}/typography.css`,
};

export const selectors = {
  palette: id => `:where(:root),
  :host,
  :where([class^='wa-theme-'], [class*=' wa-theme-']),
  .wa-palette-${id}`,
};

function getImport(url, options = {}) {
  let { language = 'html', cdnUrl = '/dist/', attributes } = options;
  url = cdnUrl + url;

  if (language === 'css') {
    return `@import url('${url}');`;
  } else {
    attributes = attributes ? ` ${attributes}` : '';
    return `<link rel="stylesheet" href="${url}"${attributes} />`;
  }
}

export function getCode(base, params, options) {
  let ret = [];

  if (base) {
    ret.push(`styles/themes/${base}.css`);
  }

  ret.push(
    ...Object.entries(params)
      .filter(([aspect, id]) => Boolean(id))
      .map(([aspect, id]) => urls[aspect](id)),
  );

  return ret.map(url => getImport(url, options)).join('\n');
}

export function getPaletteCode(palette, tweaks, options) {
  let imports = [];

  if (palette) {
    imports.push(urls.palette(palette));
  }

  let css = '';

  if (tweaks) {
    let { hueShifts } = tweaks;
    let declarations = [];

    if (hueShifts) {
      let element = document.querySelector(`.wa-palette-${palette}`) ?? document.documentElement;
      let cs = getComputedStyle(element);

      for (let hue in hueShifts) {
        let shift = hueShifts[hue];

        for (let suffix of ['', '-05', '-10', '-20', '-30', '-40', '-50', '-60', '-70', '-80', '-90', '-95']) {
          let baseColor = cs.getPropertyValue(`--wa-color-${hue}${suffix}`);
          declarations.push(`--wa-color-${hue}: oklch(from ${baseColor} l c calc(h - ${shift}));`);
        }

        declarations.push('');
      }
    }

    css += `
${selectors.palette} {
  ${declarations.join('\n')}
}`;
  }

  let ret = imports.map(url => getImport(url, options)).join('\n');

  if (css) {
    if (options.language === 'css') {
      ret += `\n\n${css}`;
    } else {
      ret += `\n<style>\n${css}\n</style>`;
    }
  }

  return ret;
}
