import { parse } from 'node-html-parser';
import { v4 as uuid } from 'uuid';

const templates = {
  old(pre, code, { open, buttons, edit }) {
    const id = `code-example-${uuid().slice(-12)}`;
    let preview = code.textContent;

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
  new(pre, code, { open, first, attributes }) {
    attributes = {
      open,
      include: `link[rel=stylesheet][href^='/dist/']`,
      ...attributes,
    };

    const attributesString = Object.entries(attributes)
      .map(([key, value]) => {
        if (value === true) {
          return key;
        }
        if (value === false || value === null) {
          return '';
        }
        return `${key}="${value}"`;
      })
      .join(' ');

    let includes = '';
    if (first) {
      includes = `
        <template class="wa-code-demo-include-isolated">
          <script src="/dist/webawesome.loader.js" type="module"></script>
        </template>`;
    }

    let preview = '';
    if (attributes.viewport === undefined) {
      // Slot in pre-rendered preview
      preview = `<div style="display:contents" slot="preview">${code.textContent}</div>`;

      // Run preview scripts as modules to prevent collisions
      const root = parse(preview, { blockTextElements: { script: true } });
      root.querySelectorAll('script').forEach(script => script.setAttribute('type', 'module'));
      preview = root.toString();
    }

    return `${includes}
      <wa-code-demo ${attributesString}>
        ${preview}
        ${pre.outerHTML}
      </wa-code-demo>
    `;
  },
};

/**
 * Eleventy plugin to turn `<code class="example">` blocks into live examples.
 */
export function codeExamplesPlugin(eleventyConfig, options = {}) {
  const defaultOptions = {
    container: 'body',
    defaultOpen: () => false,
  };
  options = { ...defaultOptions, ...options };

  const stats = {
    inputPaths: {},
    outputPaths: {},
  };

  eleventyConfig.addTransform('code-examples', function (content) {
    const { inputPath, outputPath } = this.page;

    const doc = parse(content, { blockTextElements: { code: true } });
    const container = doc.querySelector(options.container);

    if (!container) {
      return content;
    }

    // Look for external links
    container.querySelectorAll('code.example').forEach(code => {
      stats.inputPaths[inputPath] ??= 0;
      stats.outputPaths[outputPath] ??= 0;
      stats.inputPaths[inputPath]++;
      stats.outputPaths[outputPath]++;

      const pre = code.closest('pre');
      const first = stats.inputPaths[inputPath] === 1;

      const localOptions = {
        ...options,
        first,

        // Modifier defaults
        edit: true,
        buttons: true,
        new: true, // comment this line to default back to the old demos
        attributes: {},
      };

      for (const prop of ['new', 'open', 'buttons', 'edit']) {
        if (code.classList.contains(prop)) {
          localOptions[prop] = true;
        } else if (code.classList.contains(`no-${prop}`)) {
          localOptions[prop] = false;
        }
      }

      for (const attribute of ['viewport', 'include']) {
        if (code.hasAttribute(attribute)) {
          localOptions.attributes[attribute] = code.getAttribute(attribute);
          code.removeAttribute(attribute);
        }
      }

      if (Object.keys(localOptions.attributes).length > 0) {
        // attributes only work on the new syntax
        localOptions.new = true;
      }

      if (localOptions.open === undefined) {
        if (localOptions.defaultOpen === true) {
          localOptions.open = localOptions.defaultOpen;
        } else if (typeof localOptions.defaultOpen === 'function') {
          localOptions.open = localOptions.defaultOpen(code, {
            pre,
            inputPathIndex: stats.inputPaths[inputPath],
            outputPathIndex: stats.outputPaths[outputPath],
          });
        }
      }

      const template = localOptions.new ? 'new' : 'old';
      const codeExample = parse(templates[template](pre, code, localOptions));

      pre.replaceWith(codeExample);
    });

    return doc.toString();
  });
}
