import { parse } from 'node-html-parser';
import { v4 as uuid } from 'uuid';

const templates = {
  old(pre, { open, buttons, edit }) {
    const id = `code-example-${uuid().slice(-12)}`;
    let preview = pre.textContent;

    // Run preview scripts as modules to prevent collisions
    const root = parse(preview, { blockTextElements: { script: true } });
    root.querySelectorAll('script').forEach(script => script.setAttribute('type', 'module'));
    preview = root.toString();

    return `
      <div class="code-example ${open ? 'open' : ''}">
        <div class="code-example-preview">
          ${preview}
        </div>
        <div class="code-example-source" id="${id}">
          ${pre.outerHTML}
        </div>
        ${
          buttons
            ? `
            <div class="code-example-buttons">
              <button
                class="code-example-toggle"
                type="button"
                aria-expanded="${open ? 'true' : 'false'}"
                aria-controls="${id}"
              >
                Code
                <wa-icon name="chevron-down"></wa-icon>
              </button>
              ${
                edit
                  ? `
                    <button class="code-example-pen" type="button">
                      <wa-icon name="pen-to-square"></wa-icon>
                      Edit
                    </button>
                  `
                  : ''
              }
            `
            : ''
        }
        </div>
      </div>
    `;
  },
  new(pre, { isOpen }) {
    const preview = pre.textContent;

    return `
      <wa-code-demo${isOpen ? ' open' : ''} includes="link[rel=stylesheet]">
        <div style="display:contents" slot="preview">${preview}</div>
        ${pre.outerHTML}
      </wa-code-demo>
    `;
  }
};

/**
 * Eleventy plugin to turn `<code class="example">` blocks into live examples.
 */
export function codeExamplesPlugin(options = {}) {
  options = {
    container: 'body',
    ...options
  };

  return function (eleventyConfig) {
    eleventyConfig.addTransform('code-examples', content => {
      const doc = parse(content, { blockTextElements: { code: true } });
      const container = doc.querySelector(options.container);

      if (!container) {
        return content;
      }

      // Look for external links
      container.querySelectorAll('code.example').forEach(code => {
        const pre = code.closest('pre');
        const localOptions = {
          ...options,
          // Defaults
          edit: true,
          buttons: true,
          new: true // comment this line to default back to the old demos
        };

        for (const prop of ['new', 'open', 'buttons', 'edit']) {
          if (code.classList.contains(prop)) {
            localOptions[prop] = true;
          } else if (code.classList.contains(`no-${prop}`)) {
            localOptions[prop] = false;
          }
        }

        const template = localOptions.new ? 'new' : 'old';
        const codeExample = parse(templates[template](pre, localOptions));

        pre.replaceWith(codeExample);
      });

      return doc.toString();
    });
  };
}
