import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Marked } from 'marked';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import styles from './markdown.styles.js';

const sharedMarked = new Marked();
const connectedInstances = new Set<WaMarkdown>();

/**
 * @summary Renders markdown content in plain ol' HTML.
 * @documentation https://webawesome.com/docs/components/markdown
 * @status experimental
 * @since 3.4
 */
@customElement('wa-markdown')
export default class WaMarkdown extends WebAwesomeElement {
  static css = styles;

  /** Returns the shared Marked instance used by all `<wa-markdown>` components. */
  static getMarked(): Marked {
    return sharedMarked;
  }

  /** Re-renders all connected `<wa-markdown>` instances. Call this after changing the Marked configuration. */
  static updateAll(): void {
    for (const instance of connectedInstances) {
      instance.renderMarkdown();
    }
  }

  private renderGeneration = 0;
  private suppressSlotChange = false;

  /** The tab stop width used when converting leading tabs to spaces during whitespace normalization. */
  @property({ type: Number, attribute: 'tab-size' }) tabSize = 4;

  /** A reference to the shared Marked instance for convenience. Equivalent to `WaMarkdown.getMarked()`. */
  get marked(): Marked {
    return sharedMarked;
  }

  connectedCallback() {
    super.connectedCallback();
    connectedInstances.add(this);
  }

  disconnectedCallback() {
    connectedInstances.delete(this);
    super.disconnectedCallback();
  }

  /**
   * Normalizes whitespace in the given text by converting leading tabs to spaces, trimming leading/trailing blank
   * lines, and removing the common indentation prefix from all lines.
   */
  private dedent(text: string): string {
    // Step 1: Normalize line endings
    const normalized = text.replace(/\r\n/g, '\n');

    // Step 2: Split into lines and expand leading tabs to spaces (respecting tab stops)
    const lines = normalized.split('\n').map(line => {
      let expanded = '';
      let column = 0;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '\t') {
          const spacesToNextStop = this.tabSize - (column % this.tabSize);
          expanded += ' '.repeat(spacesToNextStop);
          column += spacesToNextStop;
        } else if (char === ' ') {
          expanded += ' ';
          column++;
        } else {
          // Hit non-whitespace — append the rest of the line as-is
          expanded += line.slice(i);
          break;
        }
      }

      return expanded;
    });

    // Step 3: Trim leading and trailing blank lines
    let start = 0;
    while (start < lines.length && lines[start].trim() === '') {
      start++;
    }

    let end = lines.length - 1;
    while (end >= start && lines[end].trim() === '') {
      end--;
    }

    const trimmedLines = lines.slice(start, end + 1);

    if (trimmedLines.length === 0) {
      return '';
    }

    // Step 4: Find minimum indentation (non-empty lines only)
    let minIndent = Infinity;
    for (const line of trimmedLines) {
      if (line.trim() === '') continue;
      const match = line.match(/^( *)/);
      const leadingSpaces = match ? match[1].length : 0;
      minIndent = Math.min(minIndent, leadingSpaces);
    }

    if (minIndent === Infinity) {
      minIndent = 0;
    }

    // Step 5: Slice the common prefix from all lines
    const dedentedLines = trimmedLines.map(line => {
      if (line.trim() === '') return '';
      return line.slice(minIndent);
    });

    // Step 6: Join and return
    return dedentedLines.join('\n');
  }

  /**
   * Serializes a template's content by walking its DOM tree. Text nodes use textContent (which decodes HTML entities
   * like &gt; back to >) but re-escapes < and & so they pass through the markdown parser correctly. Element nodes use
   * outerHTML to preserve inline HTML.
   */
  private serializeTemplate(template: HTMLTemplateElement): string {
    const parts: string[] = [];

    for (const node of template.content.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent ?? '';
        parts.push(text.replace(/&/g, '&amp;').replace(/</g, '&lt;'));
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        parts.push((node as Element).outerHTML);
      }
    }

    return parts.join('');
  }

  /** Reads the template content, normalizes whitespace, parses markdown, and injects the result. */
  public renderMarkdown() {
    const template = this.querySelector('template');
    if (!template) return;

    const generation = ++this.renderGeneration;
    const raw = this.serializeTemplate(template);
    const dedented = this.dedent(raw);
    const result = sharedMarked.parse(dedented);

    const inject = (renderedHtml: string) => {
      // Discard stale results from a previous render that was superseded
      if (generation !== this.renderGeneration) return;

      this.suppressSlotChange = true;

      // Remove previously rendered content but preserve the template
      for (const child of [...this.childNodes]) {
        if (child !== template) {
          child.remove();
        }
      }

      const fragment = document.createRange().createContextualFragment(renderedHtml);
      this.appendChild(fragment);
      // Keep the guard up until after any slotchange microtasks have fired
      queueMicrotask(() => {
        this.suppressSlotChange = false;
      });
    };

    // Handle both sync and async marked configurations
    if (typeof result === 'string') {
      inject(result);
    } else {
      result.then(inject);
    }
  }

  private handleSlotChange() {
    if (this.suppressSlotChange) return;
    this.renderMarkdown();
  }

  render() {
    return html`<slot @slotchange=${this.handleSlotChange}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-markdown': WaMarkdown;
  }
}
