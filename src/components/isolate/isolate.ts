import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import recursiveQSA from '../../internal/recursive-qsa.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';

/**
 * @summary Render a piece of code in shadow DOM. An alternative to DSD that plays nicely with DOM operations like cloning etc.
 * @documentation https://backers.webawesome.com/docs/components/isolate
 * @status experimental
 * @since 3.0
 *
 */
@customElement('wa-isolate')
export default class WaIsolate extends WebAwesomeElement {
  /** Includes resources and other elements from the surrounding page */
  @property({ reflect: true }) include?: string;

  render() {
    return unsafeHTML(this.getShadowHTML());
  }

  // TODO memoize this and only update if:
  // - this.include changes
  // - elements have been added/removed that match the selector
  // - Element contents have changed
  private getShadowHTML(): string {
    let html = '';

    if (this.include) {
      let includedElements = recursiveQSA(this.include, this);
      html += includedElements.map(el => el.outerHTML).join('\n');
    }

    // Get template elements from the light DOM
    const templates = Array.from(this.querySelectorAll(':scope > template'));
    html += templates.map(template => template.innerHTML).join('\n');

    return html;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-isolate': WaIsolate;
  }
}
