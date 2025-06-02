/**
 * Low-level utility to encapsulate a bit of HTML (mainly to apply certain stylesheets to it without them leaking to the rest of the page)
 * Usage: <wa-scoped><template><!-- your HTML here --></template></wa-scoped>
 */
import { discover } from '/dist/webawesome.js';

const imports = new Set();
const fontFaceRules = new Set();

export default class WaScoped extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.observer = new MutationObserver(records => this.render(records));
    this.observer.observe(this, { childList: true, subtree: true, characterData: true });
  }

  connectedCallback() {
    this.render();
    this.ownerDocument.documentElement.addEventListener('wa-color-scheme-change', e =>
      this.#applyDarkMode(e.detail.dark),
    );
  }

  render(records) {
    this.observer.takeRecords();
    this.observer.disconnect();

    this.shadowRoot.innerHTML = '';

    // To avoid mutating this.childNodes while iterating over it
    let nodes = [];

    for (let template of this.childNodes) {
      if (!(template instanceof HTMLTemplateElement)) {
        if (template.nodeType === Node.ELEMENT_NODE) {
          console.warn('<wa-scoped> can only contain <template> elements');
        }
        continue;
      }

      if (template.content.childNodes.length > 0) {
        nodes.push(template.content.cloneNode(true));
      } else if (template.childNodes.length > 0) {
        // Fake template, suck its children out of the light DOM
        nodes.push(...template.childNodes);
      }
    }

    this.shadowRoot.append(...nodes);

    this.#fixStyles();
    this.#applyDarkMode();

    discover(this.shadowRoot);

    this.observer.observe(this, { childList: true, subtree: true, characterData: true });
  }

  #applyDarkMode(isDark = getComputedStyle(this).colorScheme === 'dark') {
    // Hack to make dark mode work
    // NOTE If any child nodes actually have .wa-dark, this will override it
    for (let node of this.shadowRoot.children) {
      node.classList.toggle('wa-dark', isDark);
    }
    this.classList.toggle('wa-dark', isDark);
  }

  /**
   * @font-face does not work in shadow DOM in Chrome & FF, as of March 2025 https://issues.chromium.org/issues/41085401
   * This works around this issue by traversing the shadow DOM CSS looking
   * for @font-face rules or CSS imports to known font providers and copies them to the main document
   */
  async #fixStyles() {
    let styleElements = [...this.shadowRoot.querySelectorAll('link[rel="stylesheet"], style')];

    let loadStates = styleElements.map(element => {
      try {
        if (element.sheet?.cssRules) {
          // Already loaded
          return Promise.resolve(element.sheet);
        }
      } catch (e) {
        // CORS
        return Promise.resolve(null);
      }

      return new Promise((resolve, reject) => {
        element.addEventListener('load', e => resolve(element.sheet));
        element.addEventListener('error', e => reject(null));
      });
    });

    await Promise.allSettled(loadStates);

    let fontRules = findFontFaceRules(...this.shadowRoot.styleSheets);

    if (!fontRules.length) {
      return;
    }

    let doc = this.ownerDocument;
    // Why not adoptedStyleSheets? Can't have @import in those yet
    let id = `wa-scoped-hoisted-fonts`;
    let style = doc.head.querySelector('style#' + id);
    if (!style) {
      style = Object.assign(doc.createElement('style'), { id, textContent: ' ' });
      doc.head.append(style);
    }
    let sheet = style.sheet;

    for (let rule of fontRules) {
      let cssText = rule.cssText;
      if (rule.type === CSSRule.FONT_FACE_RULE) {
        if (fontFaceRules.has(cssText)) {
          continue;
        }
        fontFaceRules.add(cssText);
        sheet.insertRule(cssText);
      } else if (rule.type === CSSRule.IMPORT_RULE) {
        if (imports.has(rule.href)) {
          continue;
        }
        imports.add(rule.href);
        sheet.insertRule(cssText, 0);
      }
    }
  }

  static observedAttributes = [];
}

customElements.define('wa-scoped', WaScoped);

export const WEB_FONT_HOSTS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'use.typekit.net',
  'fonts.adobe.com',
  'kit.fontawesome.com',
  'pro.fontawesome.com',
  'cdn.materialdesignicons.com',
];

function findFontFaceRules(...stylesheets) {
  let ret = [];

  for (let sheet of stylesheets) {
    let rules;
    try {
      rules = sheet.cssRules;
    } catch (e) {
      // CORS
      continue;
    }

    for (let rule of rules) {
      if (rule.type === CSSRule.FONT_FACE_RULE) {
        ret.push(rule);
      } else if (rule.type === CSSRule.IMPORT_RULE) {
        if (WEB_FONT_HOSTS.some(host => rule.href.includes(host))) {
          ret.push(rule);
        } else if (rule.styleSheet) {
          ret.push(...findFontFaceRules(rule.styleSheet));
        }
      }
    }
  }

  return ret;
}
