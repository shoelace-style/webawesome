import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Marked } from 'marked';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import styles from './markdown.styles.js';

const sharedMarked = new Marked();
const connectedInstances = new Set<WaMarkdown>();

/**
 * @summary Markdown elements render markdown content as HTML directly in the browser, making it easy to display
 *  user-generated content or documentation without a server-side build step.
 * @documentation https://webawesome.com/docs/components/markdown
 * @status experimental
 * @since 3.4
 *
 * @ssr - `<wa-markdown>` parses the content of its children at runtime, which requires a DOM. It can't render during SSR — use it on the client only.
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

  /** Finds the `<script type="text/markdown">` source element inside this component. */
  private getSourceScript(): HTMLScriptElement | null {
    return this.querySelector('script[type="text/markdown"]');
  }

  /** Reads the script content, normalizes whitespace, parses markdown, and injects the result. */
  public renderMarkdown() {
    const script = this.getSourceScript();

    if (!script) {
      console.warn(
        'No <script type="text/markdown"> found. Provide markdown content inside a <script type="text/markdown"> element.',
        this,
      );
      return;
    }

    const generation = ++this.renderGeneration;
    const raw = script.textContent ?? '';
    const dedented = this.dedent(raw);

    let result: string | Promise<string>;

    try {
      result = sharedMarked.parse(dedented);
    } catch (error) {
      console.error('Failed to parse markdown content.', error, this);
      return;
    }

    const inject = (renderedHtml: string) => {
      // Discard stale results from a previous render that was superseded
      if (generation !== this.renderGeneration) return;

      this.suppressSlotChange = true;

      // Remove previously rendered content but preserve the source script
      for (const child of [...this.childNodes]) {
        if (child !== script) {
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
      result.then(inject).catch(error => {
        console.error('Failed to parse markdown content.', error, this);
      });
    }
  }

  private handleSlotChange() {
    if (this.suppressSlotChange) return;
    if (this.didSSR && !this.hasUpdated) {
      return;
    }
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
