import { html, isServer, nothing, type PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { normalizeLanguage } from 'microlighter/grammar-dependencies.js';
import cssGrammar from 'microlighter/grammars/css.js';
import htmlGrammar from 'microlighter/grammars/html.js';
import javascriptGrammar from 'microlighter/grammars/javascript.js';
import jsonGrammar from 'microlighter/grammars/json.js';
import typescriptGrammar from 'microlighter/grammars/typescript.js';
import { WaErrorEvent } from '../../events/error.js';
import { WaLoadEvent } from '../../events/load.js';
import { dedent } from '../../internal/dedent.js';
import { tokenize } from '../../internal/textmate.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import { LocalizeController } from '../../utilities/localize.js';
import '../copy-button/copy-button.js';
import styles from './code-highlighter.styles.js';
import {
  loadCodeGrammars,
  preloadCodeGrammars,
  unwatchCodeHighlighter,
  watchCodeHighlighter,
  type Grammar,
  type LoadedGrammars,
} from './grammars.js';

// Common grammars ship with the component so they highlight before the first paint
preloadCodeGrammars({
  css: cssGrammar,
  html: htmlGrammar,
  javascript: javascriptGrammar,
  json: jsonGrammar,
  typescript: typescriptGrammar,
});

const supportsHighlights = !isServer && typeof CSS !== 'undefined' && 'highlights' in CSS;

// One shared highlight per token category, registered as wa-<category> so it can't collide with other highlighters
const highlights = new Map<string, Highlight>();

function getHighlight(category: string) {
  let highlight = highlights.get(category);

  if (!highlight) {
    highlight = new Highlight();
    highlights.set(category, highlight);
    CSS.highlights.set(`wa-${category}`, highlight);
  }

  return highlight;
}

/**
 * @summary Code highlighters display syntax-highlighted code with a copy button. Use them for code samples, install
 *  commands, and configuration snippets.
 * @documentation https://webawesome.com/docs/components/code-highlighter
 * @status experimental
 * @since 3.15
 *
 * @dependency wa-copy-button
 *
 * @slot - The code to display. It's parsed as HTML, so escape `<` as `&lt;` and `&` as `&amp;` where the parser
 *  would read them as markup, or wrap the code in a `<script type="text/plain">` element to skip escaping. Slotted code
 *  is dedented automatically unless `without-dedent` is set.
 *
 * @event wa-load - Emitted when the grammar for the current language has loaded and the code has been highlighted.
 * @event wa-error - Emitted when no grammar exists for the current language. The code renders as plain text.
 *
 * @csspart pre - The `<pre>` element that acts as the scroll container.
 * @csspart code - The `<code>` element that contains the code.
 * @csspart copy-button - The `<wa-copy-button>` element.
 * @csspart copy-button__button - The copy button's `button` part.
 * @csspart copy-button__copy-icon - The copy button's `copy-icon` part.
 * @csspart copy-button__success-icon - The copy button's `success-icon` part.
 * @csspart copy-button__error-icon - The copy button's `error-icon` part.
 * @csspart copy-button__feedback - The copy button's `feedback` part.
 *
 * @cssstate loading - Applied while the grammar for the current language is loading.
 * @cssstate error - Applied when no grammar exists for the current language.
 * @cssstate highlighted - Applied once the code has been highlighted.
 *
 * @cssproperty [--comment-color=light-dark(var(--wa-color-gray-40), var(--wa-color-gray-60))] - The color of comments
 *  and quotes.
 * @cssproperty [--keyword-color=light-dark(var(--wa-color-purple-40), var(--wa-color-purple-60))] - The color of
 *  keywords, storage modifiers, at-rules, doctypes, `!important`, and sections.
 * @cssproperty [--operator-color=light-dark(var(--wa-color-gray-30), var(--wa-color-gray-80))] - The color of operators
 *  and punctuation.
 * @cssproperty [--string-color=light-dark(var(--wa-color-green-40), var(--wa-color-green-60))] - The color of strings,
 *  regular expressions, attribute values, links, and raw text.
 * @cssproperty [--constant-color=light-dark(var(--wa-color-orange-40), var(--wa-color-orange-60))] - The color of
 *  numbers, booleans, constants, symbols, and entities.
 * @cssproperty [--function-color=light-dark(var(--wa-color-blue-40), var(--wa-color-blue-60))] - The color of
 *  functions, decorators, and animation names.
 * @cssproperty [--type-color=light-dark(var(--wa-color-blue-40), var(--wa-color-blue-60))] - The color of types and
 *  built-ins.
 * @cssproperty [--variable-color=light-dark(var(--wa-color-blue-40), var(--wa-color-blue-60))] - The color of
 *  variables and interpolations.
 * @cssproperty [--property-color=light-dark(var(--wa-color-blue-40), var(--wa-color-blue-60))] - The color of
 *  properties, keys, and attribute names.
 * @cssproperty [--tag-color=light-dark(var(--wa-color-purple-40), var(--wa-color-purple-60))] - The color of tags.
 * @cssproperty [--selector-color=light-dark(var(--wa-color-purple-40), var(--wa-color-purple-60))] - The color of CSS
 *  selectors.
 * @cssproperty [--inserted-color=light-dark(var(--wa-color-green-40), var(--wa-color-green-60))] - The color of
 *  inserted lines in diffs.
 * @cssproperty [--deleted-color=light-dark(var(--wa-color-red-40), var(--wa-color-red-60))] - The color of deleted
 *  lines in diffs.
 *
 * @ssr - `<wa-code-highlighter>` renders an empty code block during SSR. The code and its highlighting appear after the
 *  component hydrates, because the Custom Highlight API needs a DOM.
 */
@customElement('wa-code-highlighter')
export default class WaCodeHighlighter extends WebAwesomeElement {
  static css = styles;

  private readonly localize = new LocalizeController(this);
  private mutationObserver: MutationObserver | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private hasWarnedAboutElements = false;
  private ranges: [Highlight, Range][] = [];

  @query('code') private codeElement: HTMLElement;
  @query('pre') private pre: HTMLElement;

  @state() private canScroll = false;

  /** @internal The loaded grammar plus the grammars it includes, which the tokenizer needs to resolve includes. */
  @state() loadedGrammar: { grammar: Grammar; grammars: LoadedGrammars } | null = null;

  /**
   * The code to display. It takes precedence over slotted content and renders verbatim, without dedenting. Use it when
   * the code is dynamic or when escaping slotted content is impractical.
   */
  @property() code = '';

  /**
   * The language of the code, e.g. `html`, `css`, `js`, or `python`. Common languages are bundled and the rest load on
   * demand. Leave it empty to display plain text.
   */
  @property() language = '';

  /** An accessible label for the code region. When omitted, a localized "Code" label is used. */
  @property() label = '';

  /** Removes the copy button. */
  @property({ attribute: 'without-copy', type: Boolean, reflect: true }) withoutCopy = false;

  /**
   * Preserves slotted code exactly as written instead of dedenting it, like a `<pre>` element. A single newline right
   * after the opening tag is ignored. Has no effect on the `code` property, which always renders verbatim.
   */
  @property({ attribute: 'without-dedent', type: Boolean, reflect: true }) withoutDedent = false;

  /** Wraps long lines instead of scrolling horizontally. */
  @property({ type: Boolean, reflect: true }) wrap = false;

  /** @internal The grammar name the current language resolves to. */
  get grammarName() {
    return normalizeLanguage(this.language.toLowerCase());
  }

  connectedCallback() {
    super.connectedCallback();

    // SSR guard: observers aren't available during server-side rendering
    if (!isServer) {
      watchCodeHighlighter(this);

      // There's no slot in the template, so observe the light DOM to pick up code changes
      this.mutationObserver = new MutationObserver(() => this.requestUpdate());
      this.mutationObserver.observe(this, { childList: true, characterData: true, subtree: true });
      this.resizeObserver = new ResizeObserver(() => this.updateCanScroll());
      this.resizeObserver.observe(this);
    }

    // A reconnected element keeps its code, so restore its ranges
    if (this.hasUpdated) {
      this.highlight();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    unwatchCodeHighlighter(this);
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
    this.clearHighlights();
  }

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);

    if (changedProperties.has('language') && !isServer) {
      this.ensureGrammar();
    }
  }

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    // The code is set imperatively so the ranges can target a lone text node inside <code>
    const code = this.displayedCode;
    const codeChanged = this.codeElement.textContent !== code;

    if (codeChanged) {
      this.codeElement.textContent = code;
    }

    if (codeChanged || changedProperties.has('loadedGrammar')) {
      this.highlight();
    }

    this.updateCanScroll();
  }

  /** The code that's shown: the code property, or the slotted code. */
  private get displayedCode(): string {
    return this.code || this.slottedCode;
  }

  /** Gets the code from the light DOM, dedented unless `without-dedent` is set. */
  private get slottedCode(): string {
    if (isServer) return '';

    // Script content is never parsed as HTML, so code inside one needs no escaping
    const script = this.querySelector<HTMLScriptElement>(':scope > script[type="text/plain"]');

    if (!script && this.firstElementChild && !this.hasWarnedAboutElements) {
      this.hasWarnedAboutElements = true;
      console.warn(
        `<wa-code-highlighter> found HTML elements in its content, which usually means the code wasn't escaped. ` +
          `Escape "<" as "&lt;" and "&" as "&amp;", wrap the code in <script type="text/plain">, or set the code ` +
          `property instead.`,
        this,
      );
    }

    const text = script ? script.text : (this.textContent ?? '');

    // The HTML parser drops a newline right after <pre>, but not after custom elements, so do it here
    if (this.withoutDedent) {
      return text.replace(/^\r?\n/, '');
    }

    return dedent(text);
  }

  /** @internal Loads the grammar for the current language and reports the outcome with a state and an event. */
  async ensureGrammar() {
    const language = this.language.toLowerCase();
    const grammarName = this.grammarName;

    this.loadedGrammar = null;
    this.customStates.set('error', false);
    this.customStates.set('loading', Boolean(language));

    if (!language) return;

    const grammars = await loadCodeGrammars([grammarName]);
    const grammar = grammars.languages[grammarName];

    // The language changed while loading
    if (this.language.toLowerCase() !== language) return;

    this.customStates.set('loading', false);

    if (!grammar) {
      this.customStates.set('error', true);
      console.warn(
        `<wa-code-highlighter> has no grammar for "${this.language}". The code renders as plain text.`,
        this,
      );
      this.dispatchEvent(new WaErrorEvent());
      return;
    }

    // The next update highlights the code
    this.loadedGrammar = { grammar, grammars };
    await this.updateComplete;
    this.dispatchEvent(new WaLoadEvent());
  }

  /** Replaces this element's highlight ranges with ranges for the current code and grammar. */
  private highlight() {
    if (!supportsHighlights) return;

    this.clearHighlights();

    const node = this.codeElement?.firstChild;
    const canHighlight = Boolean(this.loadedGrammar) && this.isConnected && node?.nodeType === Node.TEXT_NODE;
    this.customStates.set('highlighted', canHighlight);
    if (!canHighlight) return;

    const text = (node as Text).data;
    const { grammar, grammars } = this.loadedGrammar!;

    for (const token of tokenize(text, grammar, grammars)) {
      const range = new Range();
      const highlight = getHighlight(token.category);

      range.setStart(node, token.start);
      range.setEnd(node, token.end);
      highlight.add(range);
      this.ranges.push([highlight, range]);
    }
  }

  /** Removes this element's ranges from the shared highlights. */
  private clearHighlights() {
    for (const [highlight, range] of this.ranges) {
      highlight.delete(range);
    }

    this.ranges = [];
  }

  /** Keeps the copy button's composed events from reaching this element, where they'd look like grammar events. */
  private handleCopyButtonEvent(event: Event) {
    event.stopPropagation();
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Home') {
      event.preventDefault();
      this.pre.scrollTo({ left: 0, top: 0 });
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.pre.scrollTo({ left: this.pre.scrollWidth, top: this.pre.scrollHeight });
    }
  }

  private updateCanScroll() {
    if (!this.pre) return;
    this.canScroll = this.pre.scrollWidth > this.pre.clientWidth || this.pre.scrollHeight > this.pre.clientHeight;
  }

  render() {
    // The copy button's value is a property binding because hydration doesn't commit attribute bindings
    return html`
      <pre
        part="pre"
        role="region"
        aria-label=${this.label || this.localize.term('code')}
        tabindex=${this.canScroll ? '0' : '-1'}
        @keydown=${this.handleKeyDown}
      ><code part="code"></code></pre>
      ${this.withoutCopy
        ? nothing
        : html`
            <wa-copy-button
              part="copy-button"
              exportparts="
                button:copy-button__button,
                copy-icon:copy-button__copy-icon,
                success-icon:copy-button__success-icon,
                error-icon:copy-button__error-icon,
                feedback:copy-button__feedback
              "
              .value=${this.displayedCode}
              @wa-load=${this.handleCopyButtonEvent}
              @wa-error=${this.handleCopyButtonEvent}
            ></wa-copy-button>
          `}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-code-highlighter': WaCodeHighlighter;
  }
}
