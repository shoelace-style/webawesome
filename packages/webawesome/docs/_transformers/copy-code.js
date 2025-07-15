export function copyCode(code) {
  const pre = code.closest('pre');
  let preId = pre.getAttribute('id') || `code-block-${crypto.randomUUID()}`;
  let codeId = code.getAttribute('id') || `${preId}-inner`;

  if (!code.getAttribute('id')) {
    code.setAttribute('id', codeId);
  }
  if (!pre.getAttribute('id')) {
    pre.setAttribute('id', preId);
  }

  // Add a copy button
  pre.innerHTML += `<wa-copy-button from="${codeId}" class="copy-button wa-dark"></wa-copy-button>`;
}

/**
 * Eleventy plugin to add copy buttons to code blocks.
 */
export function copyCodeTransformer(options = {}) {
  options = {
    container: 'body',
    ...options,
  };

  return function (doc) {
    const container = doc.querySelector(options.container);

    if (!container) {
      return;
    }

    // Look for code blocks
    container.querySelectorAll('pre > code').forEach(code => {
      copyCode(code);
    });
  };
}
