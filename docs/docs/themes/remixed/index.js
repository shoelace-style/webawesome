let params = { base: 'default', palette: '', color: '', typography: '' };

// Find usage code snippet and prepare it
let snippets = document.querySelectorAll('#remixed-usage ~ wa-tab-group pre > code');
let copyButtons = document.querySelectorAll('#remixed-usage ~ wa-tab-group pre > wa-copy-button');
let codeExamples = [];

for (let snippet of snippets) {
  let tokens = [...snippet.children];
  let base = tokens.shift();
  let [palette, color, typography] = tokens;

  codeExamples.push({ snippet, base, palette, color, typography });

  // Remove non-base tokens
  for (let token of tokens) {
    let whitespace = token.previousSibling;

    if (whitespace.nodeType === Node.TEXT_NODE) {
      // Move whitespace to beginning of node
      token.prepend(token.previousSibling);
    }
  }
}

// Read URL params and apply them. This facilitates permalinks.
if (location.search) {
  let urlParams = new URLSearchParams(location.search);

  for (let aspect in params) {
    if (urlParams.has(aspect)) {
      params[aspect] = urlParams.get(aspect);
    }
  }
}

const selects = Object.fromEntries(
  [...document.querySelectorAll('#mix_and_match wa-select')].map(select => [select.getAttribute('name'), select]),
);

document.querySelector('#mix_and_match').addEventListener(
  'change',
  function (event) {
    for (let name in selects) {
      params[name] = selects[name].value;
    }

    render();
  },
  { capture: true },
);

function hasOverride(name) {
  if (!params[name]) {
    return false;
  }

  if (name === 'palette') {
    return params[name] !== defaultPalettes[params.base];
  }

  if (name !== 'base') {
    return params[name] !== params.base;
  }

  return true;
}

function render() {
  let demoUrl = new URL(`/docs/themes/${params.base}/demo.html`, location);
  let pageParams = new URLSearchParams(params);

  for (let aspect in params) {
    if (aspect !== 'base' && params[aspect]) {
      demoUrl.searchParams.set(aspect, params[aspect]);
    }

    if (!params[aspect] || (aspect === 'base' && params[aspect] === 'default') || !hasOverride(aspect)) {
      pageParams.delete(aspect);
    }

    // Output code snippet
    if (aspect !== 'base') {
      for (let codeExample of codeExamples) {
        let token = codeExample[aspect];
        let value = params[aspect];

        if (hasOverride(aspect)) {
          // Update code example
          let valueToken = [...token.querySelectorAll('.code-attr-value, .code-url')].pop();
          valueToken.textContent = replaceStyleSheetURL(valueToken.textContent, aspect, value);

          // Add code example to <pre>
          codeExample.snippet.append(token);
        } else {
          token.remove();
        }
      }
    }

    // Update selects
    if (selects[aspect].value === undefined) {
      selects[aspect].setAttribute('value', params[aspect]);
    } else {
      selects[aspect].value = params[aspect];
    }
  }

  // Update code snippet copy buttons
  for (let copyButton of copyButtons) {
    copyButton.value = copyButton.nextElementSibling.textContent;
  }

  // Update demo URL
  demo.src = demoUrl;

  // Update page URL. If there’s already a search, replace it.
  // We don’t want to clog the user’s history while they iterate
  let historyAction = location.search ? 'replaceState' : 'pushState';
  history[historyAction](null, '', `?${pageParams}`);
}

const regexes = {
  base: /\/themes\/([a-z-]+)\.css/,
  palette: /\/color\/([a-z-]+)\.css/,
  color: /\/themes\/([a-z-]+)\/color\.css/,
  typography: /\/themes\/([a-z-]+)\/typography\.css/,
};

function replaceStyleSheetURL(url, name, value) {
  let regex = regexes[name];
  return url.replace(regex, (match, oldValue) => {
    return match.replace(oldValue, value);
  });
}

globalThis.params = params;
render();
