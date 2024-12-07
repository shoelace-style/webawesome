import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, query } from 'lit/decorators.js';
import { getInnerHTML, HasSlotController } from '../../internal/slot.js';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { watch } from '../../internal/watch.js';
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

  /** Includes resources and other elements in the preview */
  @property({ reflect: true }) include?: string;

  private readonly hasSlotController = new HasSlotController(this, 'preview');

  private previewComputedStyle: CSSStyleDeclaration;
  private resizeObserver: ResizeObserver;

  /** Whether the demo is rendered in an iframe */
  public get isolated() {
    return this.viewport !== undefined;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unobserveResize();
  }

  private previewInnerWidth: number;

  private observeResize() {
    if (this.previewElement) {
      this.resizeObserver ??= new ResizeObserver(() => this.handleResize());
      this.updateComplete.then(() => this.resizeObserver.observe(this.previewElement));
    }
  }

  private unobserveResize() {
    if (this.previewElement && this.resizeObserver) {
      this.resizeObserver.unobserve(this.previewElement);
    }
  }

  private handleResize() {
    if (globalThis.window) {
      this.previewComputedStyle ??= window.getComputedStyle(this.previewElement);

      const cs = this.previewComputedStyle;
      this.previewInnerWidth =
        getNumber(cs.width) -
        getNumber(cs.paddingLeft) -
        getNumber(cs.paddingRight) -
        getNumber(cs.borderLeftWidth) -
        getNumber(cs.borderRightWidth);
      this.previewElement.style.setProperty('--preview-width-px', this.previewInnerWidth + '');
    }
  }

  @watch('viewport')
  handleViewportChange() {
    if (this.viewport) {
      this.observeResize();
    } else {
      this.unobserveResize();
    }
  }

  render() {
    const code = this.previewHTML;
    // FIXME Ideally we don't want to render the contents of the code element anywhere if a custom preview is provided.
    // That way, providing a custom preview can also be used to sanitize the code.
    const customPreview = this.hasUpdated ? this.hasSlotController.test('preview') : true;
    const previewStyles: { [key: string | number]: string | number } = {};
    const previewClasses: { [key: string | number]: boolean } = {};

    if (this.isolated) {
      previewStyles['--preview-width-px'] = this.previewInnerWidth;

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
        ${this.isolated ? html`<iframe title="Code preview" srcdoc="${code}" part="iframe"></iframe>` : ''}
        <slot
          name="preview"
          @slotchange=${this.handleSlotChange}
          .innerHTML=${customPreview || this.isolated ? '' : code}
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

  // TODO cache this and only update if:
  // - this.include changes
  //- elements have been added/removed that match the selector
  public get includedHTML(): string | null {
    if (!this.ownerDocument) {
      return null;
    }

    const selectors = ['.wa-code-demo-include'];

    if (this.isolated) {
      selectors.push('.wa-code-demo-include-isolated');
    }

    if (this.include) {
      selectors.push(this.include);
    }

    const ret: string[] = Array.from(this.ownerDocument.querySelectorAll(selectors.join(', ')), el => {
      return el.nodeName === 'TEMPLATE' ? (el as HTMLTemplateElement).innerHTML : el.outerHTML;
    });

    return ret.join('\n');
  }

  private addIncludes(code: string | null): string | null {
    const includedHTML = this.includedHTML;

    if (includedHTML) {
      return includedHTML + '\n\n' + code;
    }

    return code;
  }

  public get demoHTML(): string | null {
    const code = this.querySelector?.('code')?.textContent ?? this.textContent;
    return this.addIncludes(code);
  }

  public get previewHTML(): string | null {
    let code;
    const customPreview = this.hasUpdated ? this.hasSlotController.test('preview') : true;

    if (customPreview && this.previewSlot) {
      code = getInnerHTML(this.previewSlot);
      return this.addIncludes(code);
    }

    return this.demoHTML;
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
    const markup = this.demoHTML;
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

/**
 * Parse a string into a number, or return 0 if it's not a number
 */
function getNumber(value: string | number): number {
  return (typeof value === 'string' ? parseFloat(value) : value) || 0;
}
