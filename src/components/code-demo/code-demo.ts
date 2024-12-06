import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query } from 'lit/decorators.js';
import { getInnerHTML, HasSlotController } from '../../internal/slot.js';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import componentStyles from '../../styles/component.styles.js';
import styles from './code-demo.styles.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import type { CSSResultGroup } from 'lit';

/**
 * @summary Code demos can be used to render code examples as inline live demos.
 * @documentation https://backers.webawesome.com/docs/components/code-demo
 * @status experimental
 * @since 3.0
 *
 * @slot - The main code example (usually a `<pre>` element).
 * @slot preview - One or more custom elements to display as the code example preview.
 *
 * @csspart preview - The container of the code example preview.
 * @csspart controls - The container of the control buttons.
 * @csspart button - The control buttons.
 *
 */
@customElement('wa-code-demo')
export default class WaCodeDemo extends WebAwesomeElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  @query('slot[name=preview]')
  private previewSlot: HTMLSlotElement;

  @query('#preview')
  private previewElement: HTMLElement;

  /** Opens the code example */
  @property({ attribute: 'open', type: Boolean, reflect: true }) open = false;

  /** Renders in an iframe */
  @property({ reflect: true }) viewport?: string;

  private readonly hasSlotController = new HasSlotController(this, 'preview');

  private previewComputedStyle: CSSStyleDeclaration;

  render() {
    let code = this.textContent;
    // FIXME Ideally we don't want to render the contents of the code element anywhere if a custom preview is provided.
    // That way, providing a custom preview can also be used to sanitize the code.
    const customPreview = this.hasUpdated ? this.hasSlotController.test('preview') : true;
    const isolated = this.viewport !== undefined;
    const previewStyles: { [key: string | number]: string | number } = {};
    const previewClasses: { [key: string | number]: boolean } = {};

    if (isolated) {
      if (customPreview && this.previewSlot) {
        code = getInnerHTML(this.previewSlot);
      }

      if (globalThis.window) {
        const cs = (this.previewComputedStyle ??= window.getComputedStyle(this.previewElement));
        previewStyles['--preview-width-inner-px'] =
          getNumber(cs.width) -
          getNumber(cs.paddingLeft) -
          getNumber(cs.paddingRight) -
          getNumber(cs.borderLeftWidth) -
          getNumber(cs.borderRightWidth);
      }

      if (this.viewport) {
        // Viewport emulation

        // TODO move to a converter or something, we shouldn't parse this on every render
        const [width, height] = this.viewport.trim().split(/\s*x\s*/);
        previewStyles['--viewport-width-px'] = width;
        if (height) {
          previewStyles['--viewport-height-px'] = height;
        }
        previewClasses.zoomed = true;
      }
    }

    return html`
      <div id="preview" part="preview" style="${styleMap(previewStyles)}" class="${classMap(previewClasses)}">
        ${isolated ? html`<iframe title="Code preview" srcdoc="${code}" part="iframe"></iframe>` : ''}
        <slot
          name="preview"
          @slotchange=${this.handleSlotChange}
          .innerHTML=${customPreview || isolated ? '' : code}
        ></slot>
      </div>
      <slot class="source" id="source"></slot>
      <div id="buttons" part="controls">
        <button
          class="toggle"
          type="button"
          aria-expanded="${this.open ? 'true' : 'false'}"
          aria-controls="source"
          part="toggle button"
          @click=${this.toggle}
        >
          Code
          <wa-icon name="chevron-down"></wa-icon>
        </button>
        <button class="pen" type="button" part="edit button" @click=${this.edit}>
          <wa-icon name="pen-to-square"></wa-icon>
          Edit
        </button>
      </div>
    `;
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

  /**
   * Opens the code example in CodePen
   */
  public edit() {
    let markup = this.querySelector('code')?.textContent ?? this.textContent;
    const cdnUrl = document.documentElement.dataset.cdnUrl;
    markup =
      `<script type="module" src="${cdnUrl}webawesome.loader.js"></script>\n` +
      `<link rel="stylesheet" href="${cdnUrl}themes/default.css">\n\n` +
      `<link rel="stylesheet" href="${cdnUrl}themes/applied.css">\n\n` +
      `${markup}`;
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

function getNumber(value: string | number): number {
  return (typeof value === 'string' ? parseFloat(value) : value) || 0;
}
