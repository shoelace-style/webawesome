import '../icon/icon.js';
import { customElement, property, query } from 'lit/decorators.js';
import { getInnerHTML, HasSlotController } from '../../internal/slot.js';
import { html } from 'lit';
import { viewportPropertyConverter } from '../viewport-demo/viewport-demo.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './code-demo.styles.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';

import type { CSSResultGroup, TemplateResult } from 'lit';
import type { ViewportDimensions } from '../viewport-demo/viewport-demo.js';

interface DemoHTMLOptions {
  /**
   * If true, will only start watching after the initial update/render
   */
  type?: string;
  isolated?: boolean;
  absolutize?: boolean | string | URL;
  prettyWhitespace?: boolean;
}

const URL_ATTRIBUTES = ['src', 'href'];

/**
 * @summary Code demos can be used to render code examples as inline live demos.
 * @documentation https://backers.webawesome.com/docs/components/code-demo
 * @status experimental
 * @since 3.0
 *
 * @dependency wa-viewport-demo
 * @dependency wa-icon
 *
 * @slot - The main code example (usually a `<pre>` element).
 * @slot preview - One or more custom elements to display as the code example preview.
 *
 * @csspart preview - The container of the code example preview.
 * @csspart controls - The container of the control buttons.
 * @csspart button - The control buttons.
 * @csspart toggle - The toggle button.
 * @csspart edit - The edit button.
 * @csspart iframe - The iframe that contains the preview (in isolated demos).
 *
 * @cssproperty --preview-backdrop - The color behind the preview, shown when it is resized
 * @cssproperty --preview-background - The background color of the preview.
 * @cssproperty --preview-padding - The padding used for the preview. Defaults to `var(--wa-space-2xl)`.
 * @cssproperty --preview-resize - The CSS `resize` property value used for the preview. Default: `inline`, for horizontal resizing.
 * @cssproperty --viewport-initial-aspect-ratio - The initial aspect ratio of the viewport, when the `viewport` attribute is used. Defaults to `16 / 9`.
 * @cssproperty --preview-max-width - The maximum width of the preview. Defaults to `100%`.
 * @cssproperty --preview-min-width - The minimum width of the preview. Defaults to `min-content`.
 * @cssproperty --divider-width - The width of the divider. Defaults to `var(--wa-border-width-s)`.
 * @cssproperty --code-collapse-duration - The duration of the code collapse animation (for supporting browsers). Defaults to `var(--wa-transition-normal)`.
 *
 */
@customElement('wa-code-demo')
export default class WaCodeDemo extends WebAwesomeElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  @query('slot[name=preview]')
  private previewSlot: HTMLSlotElement;

  /** Opens the code example */
  @property({ attribute: 'open', type: Boolean, reflect: true }) open = false;

  /** Renders in an iframe */
  @property({
    reflect: true,
    converter: viewportPropertyConverter
  })
  viewport?: boolean | ViewportDimensions;

  /** Includes resources and other elements in the preview */
  @property({ reflect: true }) include?: string;

  private readonly hasSlotController = new HasSlotController(this, 'preview');

  render() {
    const code = this.getDemoHTML({ type: 'preview' });
    // FIXME Ideally we don't want to render the contents of the code element anywhere if a custom preview is provided.
    // That way, providing a custom preview can also be used to sanitize the code.
    const customPreview = this.hasUpdated ? this.hasSlotController.test('preview') : true;

    let viewportHTML: string | TemplateResult = '';

    if (this.viewport) {
      // Viewport emulation
      viewportHTML = html`
        <wa-viewport-demo .viewport=${this.viewport}>
          <iframe title="Code preview" srcdoc="${code}" part="iframe"></iframe>
        </wa-viewport-demo>
      `;
    }

    return html`
      <div id="preview" part="preview">
        ${viewportHTML}
        <slot
          name="preview"
          @slotchange=${this.handleSlotChange}
          .innerHTML=${customPreview || this.viewport ? '' : code}
        ></slot>
      </div>
      <slot id="source"></slot>
      <div id="buttons" part="controls">
        <button
          type="button"
          part="toggle button"
          aria-expanded="${this.open ? 'true' : 'false'}"
          aria-controls="source"
          @click=${this.toggle}
        >
          Code
          <wa-icon name="chevron-down"></wa-icon>
        </button>
        ${this.viewport
          ? html`<button type="button" part="open button" @click=${this.openInNewTab}>
              <wa-icon name="arrow-up-right-from-square"></wa-icon>
              Open
            </button>`
          : ''}
        <button type="button" part="edit button" @click=${this.edit}>
          <wa-icon name="pen-to-square"></wa-icon>
          Edit
        </button>
      </div>
    `;
  }

  // TODO memoize this and only update if:
  // - this.include changes
  //- elements have been added/removed that match the selector
  public getIncludedHTML({ isolated = Boolean(this.viewport), absolutize, prettyWhitespace }: DemoHTMLOptions = {}):
    | string
    | null {
    if (!this.ownerDocument) {
      return null;
    }

    const selectors = ['.wa-code-demo-include'];

    if (isolated) {
      selectors.push('.wa-code-demo-include-isolated');
    }

    if (this.include) {
      selectors.push(this.include);
    }

    const elements = recursiveQSA(selectors.join(', '), this);

    return Array.from(elements, (el: Element) => {
      const isTemplate = el.nodeName === 'TEMPLATE';
      let source = el;

      if (absolutize) {
        // Absolutize URLs. Useful for opening in a new tab or code playgrounds.
        const base = absolutize ? location.href : absolutize;
        source = source.cloneNode(true) as Element;
        absolutizeURLs(isTemplate ? (source as HTMLTemplateElement).content : source, base);
      }

      if (isTemplate) {
        let ret = (source as HTMLTemplateElement).innerHTML;

        if (prettyWhitespace) {
          ret = dedent(ret);
        }

        return ret;
      }

      return source.outerHTML;
    }).join('\n');
  }

  public getDemoHTML(options: DemoHTMLOptions = {}): string | null {
    let code;
    const customPreview = this.hasUpdated ? this.hasSlotController.test('preview') : true;
    if (options.type === 'preview' && customPreview && this.previewSlot) {
      code = getInnerHTML(this.previewSlot);
    } else {
      code = this.querySelector?.('code')?.textContent ?? this.textContent;
    }

    const includedHTML = this.getIncludedHTML(options);

    if (includedHTML) {
      return includedHTML + '\n\n' + code;
    }

    return code;
  }

  private handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;

    if (slot.name === 'preview') {
      const assignedNodes = slot.assignedNodes();

      for (const node of assignedNodes) {
        if (node.nodeName === 'TEMPLATE') {
          const content = (node as HTMLTemplateElement).content;
          const clone = content.cloneNode(true);
          slot.after(clone);
        }
      }
    }
  }

  /**
   * Toggles visibility of the code example
   */
  public toggle() {
    this.open = !this.open;
  }
  /** Opens the code example in a new tab */
  public openInNewTab() {
    const markup = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      ${this.getDemoHTML({ isolated: true, absolutize: true, prettyWhitespace: true })}
    </body>
    </html>`;

    const blob = new Blob([markup], { type: 'text/html' });
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(blob),
      target: '_blank'
    });
    document.documentElement.append(a);
    a.click();
    a.remove();
  }

  /**
   * Opens the code example in CodePen
   */
  public edit() {
    const markup = this.getDemoHTML({ isolated: true, absolutize: true, prettyWhitespace: true });
    const css = 'body {\n  font: 16px sans-serif;\n  padding: 2rem;\n}';
    const js = '';

    const form = Object.assign(document.createElement('form'), {
      action: 'https://codepen.io/pen/define',
      method: 'POST',
      target: '_blank'
    });

    const data = {
      title: '',
      description: '',
      tags: ['webawesome'],
      editors: '1000',
      head: '<meta name="viewport" content="width=device-width">',
      html_classes: '',
      css_external: '',
      js_external: '',
      js_module: true,
      js_pre_processor: 'none',
      html: markup,
      css,
      js
    };

    const input = Object.assign(document.createElement('input'), {
      type: 'hidden',
      name: 'data',
      value: JSON.stringify(data)
    });
    form.append(input);

    document.documentElement.append(form);
    form.submit();
    form.remove();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-code-demo': WaCodeDemo;
  }
}

// Private helpers

/**
 * Convert URLs to absolute URLs on an element and any relevant elements within it
 * @param root - The root element to start the search from
 * @param base
 */
function absolutizeURLs(root: Element | DocumentFragment, base = location.href) {
  const selector = URL_ATTRIBUTES.map(attr => `[${attr}]`).join(', ');
  const elements = [];

  if (root instanceof Element && root.matches(selector)) {
    elements.push(root);
  }
  elements.push(...root.querySelectorAll(selector));

  for (const element of elements) {
    for (const attributeName of URL_ATTRIBUTES) {
      if (element.hasAttribute(attributeName)) {
        const url = element.getAttribute(attributeName) || '';
        const absoluteURL = new URL(url, base).href;
        element.setAttribute(attributeName, absoluteURL);
      }
    }
  }
}

/**
 * Get elements that match a selector within an element’s shadow tree
 * and any parent shadow trees, all the way up to the light DOM
 * @param selector
 * @param node - The node to start the search from
 */
function recursiveQSA(selector: string, node: Node) {
  const ret: Element[] = [];

  for (let root = node; root.nodeType !== Node.DOCUMENT_NODE; ) {
    root = root.getRootNode();
    const elements = (root as ShadowRoot | Document).querySelectorAll(selector);

    ret.push(...elements);
  }

  return ret;
}

function dedent(code: string) {
  // Remove blank lines at the start and end
  code = code.replace(/^\s*\n|\n\s*$/g, '');

  if (/^\S/gm.test(code)) {
    // There are non-indented lines, so we can't dedent
    return code;
  }

  // Find the smallest indentation
  const lines = code.split(/\r?\n/);
  const indents = lines.map(line => line.match(/^\s*/)?.[0]).filter(Boolean) as string[];
  const minIndent = indents.reduce(
    (minIndentSoFar, indent) => (minIndentSoFar.length < indent.length ? minIndentSoFar : indent),
    indents[0]
  );

  if (!minIndent || lines.some(line => !line.startsWith(minIndent))) {
    // Inconsistent indentation, can't dedent
    return code;
  }

  return code.replace(new RegExp(`^${minIndent}`, 'gm'), '');
}
