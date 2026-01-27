import { readFileSync } from 'fs';
import { parse } from 'node-html-parser';
import { copyCode } from './copy-code.js';
import { highlightCode } from './highlight-code.js';

/**
 * Eleventy plugin to turn `<code class="example">` blocks into live examples.
 */
export function codeExamplesTransformer(options = {}) {
  options = {
    container: 'body',
    ...options,
  };

  return function (doc) {
    const container = doc.querySelector(options.container);

    if (!container) {
      return;
    }

    // Look for external links
    container.querySelectorAll('code.example').forEach(code => {
      let pre = code.closest('pre');
      const hasButtons = !code.classList.contains('no-buttons');
      const isOpen = code.classList.contains('open') || !hasButtons;
      const noEdit = code.classList.contains('no-edit');
      const uuid = crypto.randomUUID();
      const id = `code-example-${uuid.slice(-12)}`;
      let preview = pre.textContent;

      const langClass = [...code.classList.values()].find(val => val.startsWith('language-'));
      const lang = langClass ? langClass.replace(/^language-/, '') : 'plain';

      code.innerHTML = highlightCode(code.textContent ?? '', lang);

      // Run preview scripts as modules to prevent collisions
      const root = parse(preview, { blockTextElements: { script: true } });
      root.querySelectorAll('script').forEach(script => {
        // Can't use script.type as its always undefined?
        const scriptType = script.getAttribute("type")?.trim()

        if (!scriptType) {
          script.setAttribute('type', 'module');
        }
      });
      preview = root.toString();

      // Show the relevant code for <wa-zoomable-frame data-select-src>
      let framePre, frameCode;
      const frame = root.querySelector('wa-zoomable-frame');
      if (frame?.hasAttribute('data-select-src')) {
        let src = frame.getAttribute('src');
        let source = frame.getAttribute('srcdoc');
        if (!source && src) {
          src += src.match(/\.html$/) ? '' : `${src.endsWith('/') ? '' : '/'}index.html`;
          source = readFileSync(`./docs${src}`, 'utf8');
        }
        const selectors = frame?.getAttribute('data-select-src');
        if (selectors) {
          const sourceNode = parse(source, { comment: true, voidTag: { closingSlash: true } });
          sourceNode.querySelectorAll(selectors).forEach((fragment, i) => {
            // Fix parse() formatting of wrapped first attributes and reduce
            // indentation to match the least-indented line for each fragment
            const html = fragment.outerHTML
              .replace(/<([^\s>]+)(\s{2,})(?=[^\s>])/g, (_, tag, spaces) => `<${tag}\n${spaces.slice(1)}`)
              .split('\n');
            const lastLine = html[html.length - 1] || '';
            const indent = new RegExp(`^${lastLine.match(/^\s*/)?.[0] ?? ''}`);
            source = `${i ? source : ''}${html.map(line => line.replace(indent, '')).join('\n')}\n\n`;
          });
        }
        const highlightedCode = highlightCode(source?.trim(), 'html');
        framePre = parse(`<pre id="code-block-${uuid}"></pre>`).firstChild;
        frameCode = parse(`<code class="example">${highlightedCode}</code>`).firstChild;
        framePre.appendChild(frameCode);
      }

      copyCode(frameCode ?? code);

      const codeExample = parse(`
          <div class="code-example ${isOpen ? 'open' : ''}">
            <div class="code-example-preview">
              <div>
                ${preview}
              </div>
              <div class="code-example-resizer" aria-hidden="true">
                <wa-icon name="grip-lines-vertical"></wa-icon>
              </div>
            </div>
            <div class="code-example-source" id="${id}">
              ${framePre?.outerHTML ?? pre.outerHTML}
            </div>
            ${
              hasButtons
                ? `
                <div class="code-example-buttons">
                  <button
                    class="code-example-toggle"
                    type="button"
                    aria-expanded="${isOpen ? 'true' : 'false'}"
                    aria-controls="${id}"
                  >
                    Code
                    <wa-icon name="chevron-down"></wa-icon>
                  </button>

                  ${
                    noEdit
                      ? ''
                      : `
                        <button class="code-example-pen" type="button">
                          <wa-icon name="pen-to-square"></wa-icon>
                          Edit
                        </button>
                      `
                  }

                `
                : ''
            }
            </div>
          </div>
        `);

      pre.replaceWith(codeExample);
    });
  };
}
