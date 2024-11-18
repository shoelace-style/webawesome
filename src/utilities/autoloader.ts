import { getBasePath } from './base-path.js';

const observer = new MutationObserver(mutations => {
  for (const { addedNodes } of mutations) {
    for (const node of addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        discover(node as Element);
      }
    }
  }
});

/** Starts the autoloader. */
export function startLoader() {
  // Initial discovery
  discover(document.body);

  // Listen for new undefined elements
  observer.observe(document.documentElement, { subtree: true, childList: true });
}

/** Stops the autoloader */
export function stopLoader() {
  observer.disconnect();
}

/**
 * Checks a node for undefined elements and attempts to register them.
 */
export async function discover(root: Element | ShadowRoot) {
  const rootTagName = root instanceof Element ? root.tagName.toLowerCase() : '';
  const rootIsWebAwesomeComponent = rootTagName?.startsWith('wa-');
  const tags = [...root.querySelectorAll(':not(:defined)')]
    .map(el => el.tagName.toLowerCase())
    .filter(tag => tag.startsWith('wa-'));

  // If the root element is an undefined Web Awesome component, add it to the list
  if (rootIsWebAwesomeComponent && !customElements.get(rootTagName)) {
    tags.push(rootTagName);
  }

  // Make the list unique
  const tagsToRegister = [...new Set(tags)];

  const imports = await Promise.allSettled(tagsToRegister.map(tagName => register(tagName)));

  // When an import fails, show a warning
  for (const imp of imports) {
    if (imp.status === 'rejected') {
      console.warn(imp.reason); // eslint-disable-line no-console
    }
  }
}

/**
 * Registers an element by tag name.
 */
function register(tagName: string): Promise<void> {
  // If the element is already defined, there's nothing more to do
  if (customElements.get(tagName)) {
    return Promise.resolve();
  }

  const tagWithoutPrefix = tagName.replace(/^wa-/i, '');
  const path = getBasePath(`components/${tagWithoutPrefix}/${tagWithoutPrefix}.js`);

  // Register it
  return new Promise((resolve, reject) => {
    import(path).then(() => resolve()).catch(() => reject(new Error(`Unable to autoload <${tagName}> from ${path}`)));
  });
}
