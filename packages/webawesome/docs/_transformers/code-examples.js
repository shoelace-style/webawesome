import { readFileSync } from 'fs';
import { parse } from 'node-html-parser';
import * as path from 'node:path';
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

  const baseDir = process.env.BASE_DIR;

  /**
   * Return the expanded source code referenced by a `<wa-zoomable-frame>` or `<wa-include>`.
   * Nested instances of `<wa-include>` can be replaced with the referenced source code
   * with the `data-expand-includes` attribute.
   * @param {HTMLElement} element
   * @returns {string}
   */
  const getElementSource = element => {
    const selectSrc = element?.hasAttribute('data-select-src');
    const expandIncludes = element?.hasAttribute('data-expand-includes');
    if (!selectSrc) return;
    let src = element.getAttribute('src');
    let source = element.getAttribute('srcdoc');
    const isInclude = element.tagName?.toLowerCase() === 'wa-include';

    if (!source && src) {
      // For wa-include, read the source file directly
      // For frames, normalize src for file path resolution:
      // - Add index.html if src is a directory
      // - Remove query string and url fragment
      if (!isInclude) {
        src += src.match(/\.html/) ? '' : `${src.endsWith('/') ? '' : '/'}index.html`;
        src = src.split('?')[0].split('#')[0];
      }
      source = readFileSync(path.join(baseDir, src), 'utf8');
    }
    const selectors = element?.getAttribute('data-select-src');
    if (selectors) {
      const sourceNode = parse(source, { comment: true, voidTag: { closingSlash: true } });
      if (expandIncludes) {
        sourceNode.querySelectorAll('wa-include').forEach(e => replaceIncludeWithSource(e));
      }
      sourceNode.querySelectorAll(selectors).forEach((fragment, i) => {
        // Normalize formatting:
        // - Fix bad parse() formatting of wrapped first attributes
        // - Reduce indentation to top-level
        // - Collapse multiple blank lines
        // - Trim trailing whitespace (i.e. newlines)
        const html = fragment.outerHTML
          .replace(/<([^\s>]+)(\s{2,})(?=[^\s>])/g, (_, tag, spaces) => `<${tag}\n${spaces.slice(1)}`)
          .split('\n');
        const lastLine = html[html.length - 1] || '';
        const indent = new RegExp(`^${lastLine.match(/^\s*/)?.[0] ?? ''}`);
        source = `${i ? source : ''}${html
          .map(line => line.replace(indent, ''))
          .join('\n')
          .replace(/(\n\s*){2,}\n/g, '\n\n')}\n\n`;
      });
    }
    return source.trim();
  };

  /**
   * Recursively replace instances of `<wa-include>` with the referenced source code.
   * @param {HTMLElement} include - The `<wa-include>` element to replace.
   */
  const replaceIncludeWithSource = include => {
    const src = include.getAttribute('src');
    if (!src) return;
    const tab = '  ';
    const parent = include.parentNode;
    const parentHtml = parent.outerHTML.split('\n');
    const parentLastLine = parentHtml[parentHtml.length - 1] || '';
    const parentIndent = parentLastLine.match(/^\s*/)?.[0] ?? '';
    const source = readFileSync(path.join(baseDir, src), 'utf8');
    // Normalize formatting:
    // - Trim trailing whitespace (i.e. newlines)
    // - Indent to match the parent plus one additional tab
    const sourceNode = parse(
      source
        .trimEnd()
        .split('\n')
        .map((line, i) => `${i ? `${parentIndent}${tab}` : ''}${line}`)
        .join('\n'),
      {
        comment: true,
        voidTag: { closingSlash: true },
      },
    );
    include.replaceWith(sourceNode);
    sourceNode.querySelectorAll('wa-include').forEach(e => replaceIncludeWithSource(e));
  };

  return function (doc) {
    const container = doc.querySelector(options.container);

    if (!container) {
      return;
    }

    // Look for external links
    container.querySelectorAll('code.example').forEach(code => {
      let pre = code.closest('pre');
      const hasPreview = !code.classList.contains('no-preview');
      const hasButtons = !code.classList.contains('no-buttons');
      const isOpen = code.classList.contains('open') || !hasButtons;
      const noEdit = code.classList.contains('no-edit');
      const noColorScheme = code.classList.contains('no-color-scheme');
      const noDir = code.classList.contains('no-dir');
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
        const scriptType = script.getAttribute('type')?.trim();

        if (!scriptType) {
          script.setAttribute('type', 'module');
        }
      });
      preview = root.toString();

      // A scoped color-scheme/direction toggle can't reach into a separate iframe document,
      // so suppress both toggles for framed examples.
      const hasFrame = !!root.querySelector('wa-zoomable-frame, iframe');

      // Substitute the expanded source code for any `<wa-zoomable-frame data-select-src="...">` or `<wa-include data-select-src="...">` in the preview
      let elementPre, elementCode;
      const targetElement = root.querySelector('wa-zoomable-frame[data-select-src], wa-include[data-select-src]');
      const elementSource = getElementSource(targetElement);
      if (elementSource) {
        const highlightedSource = highlightCode(elementSource, lang);
        elementCode = parse(`<code class="example">${highlightedSource}</code>`).firstChild;
        elementPre = parse(`<pre id="code-block-${uuid}"></pre>`).firstChild;
        elementPre.appendChild(elementCode);
      }

      copyCode(elementCode ?? code);

      const codeExample = parse(`
          <div class="code-example ${isOpen ? 'open' : ''}">
            ${
              hasPreview
                ? `
              <div class="code-example-preview wa-not-prose">
                <div class="code-example-content">${preview}</div>
                <div class="code-example-resizer" aria-hidden="true">
                  <wa-icon src="/assets/images/grip-lines-vertical.svg"></wa-icon>
                </div>
              </div>
              `
                : ''
            }
            <div class="code-example-source" id="${id}" role="region" aria-label="Example source code"${isOpen ? '' : ' aria-hidden="true"'}>
              ${elementPre?.outerHTML ?? pre.outerHTML}
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
                    <wa-icon src="/assets/images/chevron-down.svg"></wa-icon>
                  </button>

                  ${
                    hasPreview && !noColorScheme && !hasFrame
                      ? `
                        <button class="code-example-theme" type="button">
                          <wa-icon class="code-example-theme-to-dark" src="/assets/images/moon-stars.svg" label="Show in dark mode"></wa-icon>
                          <wa-icon class="code-example-theme-to-light" src="/assets/images/sun-bright.svg" label="Show in light mode"></wa-icon>
                        </button>
                      `
                      : ''
                  }

                  ${
                    hasPreview && !noDir && !hasFrame
                      ? `
                        <button class="code-example-dir" type="button">
                          <wa-icon class="code-example-dir-to-rtl" src="/assets/images/align-right.svg" label="Change direction to RTL"></wa-icon>
                          <wa-icon class="code-example-dir-to-ltr" src="/assets/images/align-left.svg" label="Change direction to LTR"></wa-icon>
                        </button>
                      `
                      : ''
                  }

                  ${
                    noEdit
                      ? ''
                      : `
                        <button class="code-example-pen" type="button">
                          <wa-icon src="/assets/images/pen-to-square.svg"></wa-icon>
                          Edit
                        </button>
                      `
                  }
                  </div>
                `
                : ''
            }
          </div>
        `);

      pre.replaceWith(codeExample);
    });
  };
}
