/**
 * Get import code for remixed themes.
 */
export const urls = {
  colors: id => `styles/themes/${id}/color.css`,
  palette: id => `styles/color/${id}.css`,
  brand: id => `styles/brand/${id}.css`,
  typography: id => `styles/themes/${id}/typography.css`,
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
